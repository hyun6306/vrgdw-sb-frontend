<template>
  <div>
    <!-- 검색필터 영역 -->
    <CustManageInfo v-if="this.page == 'custManage'" ref="custManageInfo" :authButton="authButton" />
    <TranManageInfo v-if="this.page == 'tranManage'" ref="tranManageInfo" :authButton="authButton" />
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div :class="[page === 'custManage' ? 'realgrid_container realgrid_container10' : 'realgrid_container realgrid_container09']">
      <div class="real_head">
        <div class="real_head_left">
          <small
            >{{ $t('message.totalSelection1') }}<i>{{ count }}</i
            >{{ $t('message.totalSelection2') }}</small
          >
        </div>
        <div class="real_head_right"></div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left"></div>
        <div class="real_top_right">
          <button class="btn_default btn_filter" @click="setFilter">
            <!-- <img src="@/assets/img/icon_vertical.png" /> -->
            <span v-if="!filterOn">{{ $t('message.btnFilterOn') }}</span>
            <span v-else>{{ $t('message.btnFilterOff') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="fixGrid('column')">
            <img src="@/assets/img/icon_vertical.png" />
            <span v-if="isFixColumn">{{ $t('message.btnUnfixColumn') }}</span>
            <span v-else>{{ $t('message.btnFixColumn') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="fixGrid('row')">
            <img src="@/assets/img/icon_hori.png" />
            <span v-if="isFixRow">{{ $t('message.btnUnfixRow') }}</span>
            <span v-else>{{ $t('message.btnFixRow') }}</span>
          </button>
          <MultiSelect id="Material_Group" class="btn_select_layout" style="width: 100%" v-model="layoutValue" @input="layoutSave" :options="layoutOptions" label="text" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Layout"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body02" v-if="this.page == 'custManage'">
        <CustManageGrid style="height: 100%" ref="custManageGrid" :gridLang="gridLang" @sendRowCount="getCustRowCount" @sendCheckedData="getCustCheckedData" :menuId="menuId" :savePage="savePage" :authButton="authButton" />
      </div>
      <div class="real_body real_body02" v-if="this.page == 'tranManage'">
        <TranManageGrid style="height: 100%" ref="tranManageGrid" :gridLang="gridLang" @sendRowCount="getTranRowCount" @sendCheckedData="getTranCheckedData" :menuId="menuId" :savePage="savePage" :authButton="authButton" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button class="btn_default btn_function" @click="excelDL" v-if="authButton.exlAuth == 'Y'">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right">
          <!-- <button class="btn_default btn_critical_process" @click="addCeo">{{ $t('message.btnRegistCeo') }}</button> -->
          <button class="btn_default btn_critical_process" @click="addCeo" v-if="authButton.fn1Auth == 'Y'">{{ $t('message.btnRegistCeo') }}</button>
          <button class="btn_default btn_critical_process" @click="addPatner(null)" v-if="authButton.fn2Auth == 'Y'">{{ $t('message.btnRegist') }}</button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <CeoRegistModal />
    <DetailAlarmModal :ment="ment" :type="type" @modalReturn="modalReturn" />
  </div>
</template>

<script>
import CustManageGrid from '@/components/gridView/master/CustManageGrid.vue';
import TranManageGrid from '@/components/gridView/master/TranManageGrid.vue';
import CustManageInfo from '@/components/master/CustManageInfo';
import TranManageInfo from '@/components/master/TranManageInfo';
import CeoRegistModal from '@/modal/master/CeoRegistModal';
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import DetailAlarmModal from '@/modal/detail/DetailAlarmModal';
import masterApi from '@/api/master/master';

export default {
  components: {
    CustManageGrid,
    TranManageGrid,
    CustManageInfo,
    TranManageInfo,
    CeoRegistModal,
    DetailAlarmModal,
  },
  computed: {
    ...mapGetters({
      menuList: 'menuList/getMenuListAll',
      userLocale: 'userInfo/getUserLocale',
    }),
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
    savePage: {
      type: Array,
    },
    openInfo: {
      type: Object,
    },
  },
  watch: {
    openInfo(info) {
      if (info.etcData == 'Update') {
        if (this.page == 'custManage') {
          this.$refs.custManageInfo.custSearch('reset');
          this.$refs.custManageGrid.getList();
        } else {
          this.$refs.tranManageInfo.trnSearch('reset');
          this.$refs.tranManageGrid.getList();
        }
      }
    },
  },
  data() {
    return {
      filterOn: true,
      pageObj: '',
      gridLang: [],
      count: 0,
      ment: '',
      //행,열고정
      isFixColumn: false,
      isFixRow: false,
      //레이아웃
      layoutValue: { value: 'layout', text: this.$i18n.t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$i18n.t('message.btnSave') },
        { value: 'reset', text: this.$i18n.t('message.btnInit') },
      ],
      type: '',
      //
      custCheckedData: [],
      tranCheckedData: [],
    };
  },
  methods: {
    getCustRowCount(count) {
      if (this.page == 'custManage') {
        this.count = count;
      }
    },
    getTranRowCount(count) {
      if (this.page == 'tranManage') {
        this.count = count;
      }
    },
    getCustCheckedData(data) {
      this.custCheckedData = data;
    },
    getTranCheckedData(data) {
      this.tranCheckedData = data;
    },
    async addCeo() {
      if (this.page == 'custManage') {
        //고객사 대표등록
        if (this.custCheckedData.length === 0) {
          this.$EventBus.$emit('openYesModal', 'message.msgNoSelectCust');
        } else if (this.custCheckedData.length > 1) {
          this.$EventBus.$emit('openYesModal', 'message.msgSelectOnlyCust');
        } else if (this.custCheckedData[0].email === null || this.custCheckedData[0].email === undefined) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidExistEmail');
        } else {
          // this.$modal.show('CeoRegistModal', { id: this.custCheckedData[0].id });
          let random = '';
          for (let i = 0; i < 4; i++) {
            random += Math.floor(Math.random() * 10);
          }
          try {
            let param = {
              custId: this.custCheckedData[0].id,
              trancusId: null,
              aplyUserCd: this.custCheckedData[0].email,
              aplyTmpPs: 'Vrgdw' + random,
              saveYn: 'Y',
              testMail: '',
            };
            await masterApi.putAccAplyInfo(param);
            this.$EventBus.$emit('openYesModal', 'message.msgRegistCeo');
          } catch (e) {
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
        }
      } else {
        if (this.tranCheckedData.length === 0) {
          this.$EventBus.$emit('openYesModal', 'message.msgNoSelectCust');
        } else if (this.tranCheckedData.length > 1) {
          this.$EventBus.$emit('openYesModal', 'message.msgSelectOnlyCust');
        } else if (this.tranCheckedData[0].email === null || this.tranCheckedData[0].email === undefined) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidExistEmail');
        } else {
          // this.$modal.show('CeoRegistModal', { id: this.custCheckedData[0].id });
          let random = '';
          for (let i = 0; i < 4; i++) {
            random += Math.floor(Math.random() * 10);
          }
          try {
            let param = {
              // custId: this.custCheckedData[0].id,
              trancusId: this.tranCheckedData[0].id,
              aplyUserCd: this.tranCheckedData[0].email,
              aplyTmpPs: 'Vrgdw' + random,
              saveYn: 'Y',
              testMail: '',
            };
            await masterApi.putAccAplyInfo(param);
            this.$EventBus.$emit('openYesModal', 'message.msgRegistCeo');
          } catch (e) {
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
        }
      }
    },
    // saveCeo(type) {
    //   //대표저장 성공시
    //   if (type == 'error') {
    //     this.$modal.hide('CeoRegistModal');
    //     this.$EventBus.$emit('openYesModal', 'message.msgWrongCustid');
    //   } else {
    //     this.$modal.hide('CeoRegistModal');
    //     this.$EventBus.$emit('openYesModal', 'message.msgRegistCeo');
    //   }
    // },
    addPatner(id) {
      //신규등록 이동
      const thridResult = [];
      this.menuList.forEach(first => {
        first.children.forEach(second => {
          // 1 Depth
          // 2 Depth
          second.children.forEach(thrid => {
            // 3 Depth
            thridResult.push(thrid);
          });
        });
      });
      thridResult.find(element => {
        if (element.routerPath == '/master/cust-manage-dtls' && this.page == 'custManage') {
          this.pageObj = element;
        } else if (element.routerPath == '/master/tran-manage-dtls' && this.page == 'tranManage') {
          this.pageObj = element;
        }
      });
      if (id) {
        this.$emit('setNewObject', this.pageObj, id);
      } else {
        this.$emit('setNewObject', this.pageObj);
      }
    },
    listRefresh(param) {
      if (this.page == 'custManage') {
        this.$refs.custManageGrid.getList(param);
      } else {
        this.$refs.tranManageGrid.getList(param);
      }
    },
    excelDL() {
      //엑셀 다운로드
      this.excelData = {
        showProgress: true,
        progressMessage: 'Exporting..',
        indicator: 'hidden',
        header: 'default',
        footer: 'hidden',
        compatibility: true,
      };
      let fileNm = '';
      if (this.page == 'custManage') {
        //고객관리 페이지 엑셀다운로드
        fileNm = { fileNm: `custManage.xlsx` };
        this.excelData = { ...fileNm, ...this.excelData };
        this.$refs.custManageGrid.excelExport(this.excelData);
      } else if (this.page == 'tranManage') {
        //운송사관리 페이지 엑셀다운로드
        fileNm = { fileNm: `tranManage.xlsx` };
        this.excelData = { ...fileNm, ...this.excelData };
        this.$refs.tranManageGrid.excelExport(this.excelData);
      }
    },
    async getGridMutiLanguage() {
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
    fixGrid(type) {
      if (this.page == 'custManage') {
        if (this.$refs.custManageGrid.focusCheck()) {
          const rows = this.$refs.custManageGrid.sendJsonRows();
          if (rows.length > 0) {
            this.$refs.custManageGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
            if (type === 'column') {
              this.isFixColumn = !this.isFixColumn;
            } else if (type === 'row') {
              this.isFixRow = !this.isFixRow;
            }
          } else {
            this.ment = 'message.msgNoProduct';
            this.$EventBus.$emit('openYesModal', this.ment);
          }
        } else {
          this.ment = 'message.msgNoSelection';
          this.$EventBus.$emit('openYesModal', this.ment);
        }
      } else {
        if (this.$refs.tranManageGrid.focusCheck()) {
          const rows = this.$refs.tranManageGrid.sendJsonRows();
          if (rows.length > 0) {
            this.$refs.tranManageGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
            if (type === 'column') {
              this.isFixColumn = !this.isFixColumn;
            } else if (type === 'row') {
              this.isFixRow = !this.isFixRow;
            }
          } else {
            this.ment = 'message.msgNoProduct';
            this.$EventBus.$emit('openYesModal', this.ment);
          }
        } else {
          this.ment = 'message.msgNoSelection';
          this.$EventBus.$emit('openYesModal', this.ment);
        }
      }
    },
    modalReturn(data) {
      if (data == 'save' || data == 'reset') {
        if (this.page == 'custManage') {
          this.$refs.custManageGrid.saveLayout(data);
        } else {
          this.$refs.tranManageGrid.saveLayout(data);
        }
      }
    },
    layoutSave(type) {
      this.layoutOpen = !this.layoutOpen;
      this.type = type.value;
      if (this.type == 'save') {
        this.ment = 'message.msgAskSave';
      } else if (this.type == 'reset') {
        this.ment = 'message.msgAskRefresh';
      }
      this.$modal.show('DetailAlarmModal');
      this.layoutValue = { value: 'layout', text: this.$i18n.t('message.btnLayout') };
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      if (this.page == 'custManage') this.$refs.custManageGrid.setFilter(this.filterOn);
      if (this.page == 'tranManage') this.$refs.tranManageGrid.setFilter(this.filterOn);
    },
  },
  created() {},
  mounted() {
    this.getGridMutiLanguage();
    this.setFilter();
  },
  destroyed() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
