<template>
  <div>
    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container09">
      <!-- <div class="real_top_filter"></div> -->
      <div class="real_head">
        <div class="real_head_left"></div>
        <div class="real_head_right">
          <button class="btn_default btn_function" @click="addRow()">{{ $t('message.btnAddRow') }}</button>
          <button class="btn_default btn_function" @click="deleteRow()">{{ $t('message.btnDeleteRow') }}</button>
        </div>
      </div>
      <div class="real_body real_body13">
        <ProductLevelGrid style="height: 100%" :gridName="'ProductLevelGrid'" ref="ProductLevelGrid" :levelList="levelList" :gridLang="gridLang" :page="page" @sendClickData="sendClickData" @sendChildrenData="sendChildrenData" @sendClickJsonRow="sendClickJsonRow" @isLookup="isLookup" />
      </div>
      <div class="real_footer">
        <div class="footer_left"></div>
        <div class="footer_right">
          <button v-if="this.authButton.savAuth === 'Y'" class="btn_default btn_critical_process" @click="saveProductLevel()">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>

    <!-- //리얼그리드 -->
    <MasterAlarmModal :ment="ment" @okOrNo="okOrNo" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import commonApi from '@/api/common';
import languageApi from '@/api/language';
import masterApi from '@/api/master/master';
import ProductLevelGrid from '@/components/gridView/master/ProductLevelGrid';
import MasterAlarmModal from '@/modal/master/MasterAlarmModal';

export default {
  components: {
    ProductLevelGrid,
    MasterAlarmModal,
  },
  props: {
    routerPath: {
      type: String,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    authButton: {
      type: Object,
    },
  },
  data() {
    return {
      gridLang: [],
      filter: '',
      levelList: {},
      result: '',
      changeLevelRows: [],
      clickData: {},
      children: [],
      compCdOptions: [],
      compCd: '',
      ment: '',
      clickJsonRow: {},
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    isLookup() {
      this.getProductLevelList();
    },
    sendClickData(clickData) {
      this.clickData = clickData;
    },
    sendChildrenData(children) {
      this.children = children;
    },
    sendClickJsonRow(clickJsonRow) {
      this.clickJsonRow = clickJsonRow;
    },
    validation(type) {
      const result = { validation: true };
      this.$refs.ProductLevelGrid.gridCommit();
      this.changeLevelRows = [];
      this.changeLevelRows = this.$refs.ProductLevelGrid.getNewAndChangeData();
      const isChooseCell = this.$refs.ProductLevelGrid.isChooseCell();
      this.$refs.ProductLevelGrid.getRowData();

      if (this.levelList.length === 0) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else {
        if (type === 'add') {
          if (!isChooseCell) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
          } else if (!this.clickJsonRow.lvlNm) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNewCreateRow');
          } else if (this.clickJsonRow.level == 3) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgLastRow');
          }
        } else if (type === 'delete') {
          let newRow = this.$refs.ProductLevelGrid.newRowDelete();
          if (!isChooseCell) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
          } else if (newRow) {
            result.validation = false;
          } else if (this.children && this.children.length > 0) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgValidCategory');
          }
        } else if (type === 'save') {
          if (this.changeLevelRows.length === 0) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoChange');
          } else {
            this.changeLevelRows.forEach(row => {
              if (!row.lvlCd || row.lvlCd == '') {
                result.validation = false;
                this.$EventBus.$emit('openYesModal', 'message.msgNoCode');
              } else if (!row.lvlKorNm || row.lvlKorNm == '' || !row.lvlEngNm || row.lvlEngNm == '' || !row.lvlVnmNm || row.lvlVnmNm == '') {
                result.validation = false;
                this.$EventBus.$emit('openYesModal', 'message.msgNoLangage');
              } else if (!row.sort || row.sort == '') {
                result.validation = false;
                this.$EventBus.$emit('openYesModal', 'message.msgNoSort');
              }
            });
          }
        }
      }
      return result;
    },
    addRow() {
      this.result = this.validation('add');
      if (this.result.validation) {
        this.$refs.ProductLevelGrid.addRow();
      }
    },
    deleteRow() {
      this.result = this.validation('delete');
      if (this.result.validation) {
        this.ment = 'message.msgAskDelete';
        this.$modal.show('MasterAlarmModal');
      }
    },
    okOrNo(result) {
      if (result) {
        this.$refs.ProductLevelGrid.deleteRow();
      }
    },
    async getRouterLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage(this.routerPath, this.menuId, this.userLocale, 'Y');
        this.gridLang = resp.data.rs.language;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async saveProductLevel() {
      this.$refs.ProductLevelGrid.gridCommit();
      this.result = this.validation('save');
      if (this.result.validation) {
        const list = [];
        this.changeLevelRows.forEach(row => {
          list.push({
            lvlId: row.lvlId,
            level: row.level,
            lvlCd: row.lvlCd,
            lvlKorNm: row.lvlKorNm,
            lvlEngNm: row.lvlEngNm,
            lvlVnmNm: row.lvlVnmNm,
            parentId: row.parentId,
            sort: row.sort,
            useYn: JSON.parse(row.useYn).value,
            // children: [],
          });
        });
        const paramData = {
          list,
        };
        const param = JSON.parse(JSON.stringify(paramData));
        try {
          const response = await masterApi.saveProductLevel(param);
          if (response.data.rs) {
            await this.getProductLevelList();
            this.$EventBus.$emit('openYesModal', 'message.msgSaveChange');
          }
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    async getProductLevelList() {
      try {
        const resp = await masterApi.getProductLevelList();
        // this.levelList = { children: resp.data.ds };
        this.levelList = { children: [{ lvlNm: this.compCd.text, level: 'top', children: resp.data.ds }] };
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getCommonCodeCombo() {
      const param = {
        groupCd: 'COMP_CD',
        useYn: 'Y',
        prntCd: '',
      };
      try {
        const response = await commonApi.getCommonCodeCombo(param);
        this.compCdOptions = response.data.ds;
        this.compCd = this.compCdOptions[0];
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  created() {},
  async mounted() {
    await this.getCommonCodeCombo();
    await this.getRouterLanguage();
    await this.getProductLevelList();
  },
  destroyed() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
