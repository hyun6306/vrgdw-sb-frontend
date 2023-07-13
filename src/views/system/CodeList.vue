<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.selectLevel') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" label="text" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" :allow-empty="false"></MultiSelect>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
              <input type="text" id="postal_code" style="width: 100%" class="t-l" :placeholder="$t('message.msgPlaceCommonCode')" ref="filter" v-model="filter" @keyup.enter="getCommonCodeList(comp_groupCd, '', filter)" />
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset()">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="getCommonCodeList(comp_groupCd, '', filter)">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <div class="setting_section" style="height: calc(100% - 56px)">
      <div class="menu_manage_box">
        <div class="content_head">
          <span class="subTitle">{{ $t('message.manageCmmCd') }}</span>
          <div class="btn_box">
            <button class="btn_default btn_function" @click="addCodeGroupRow(1)">{{ $t('message.btnAdd') }}</button>
            <button class="btn_default btn_function" @click="getNewAndChangeDataCodeGroup()">{{ $t('message.btnSave') }}</button>
          </div>
        </div>
        <div class="codeGroupGrid">
          <CodeGroupGrid ref="codeGroupGrid" :codeGroupList="codeGroupList" :gridLang="gridLang" @codeGroup="setCodeGroup" />
        </div>
      </div>

      <div class="program_box">
        <div class="content_head">
          <span class="subTitle">{{ $t('message.cmmCdList') }}</span>
          <div class="btn_box">
            <!-- <button class="btn_add" @click="excelDownload()">Excel Download</button> -->
            <button class="btn_default btn_process" @click="openPop()">{{ $t('message.btnRegistCodeProperty') }}</button>
            <button class="btn_default btn_function" @click="addRow(1, codeDefaultData)">{{ $t('message.btnAdd') }}</button>
            <button class="btn_default btn_function" @click="deleteRow()">{{ $t('message.btnDelete') }}</button>
            <button class="btn_default btn_function" @click="getNewAndChangeData()">{{ $t('message.btnSave') }}</button>
          </div>
        </div>
        <div class="" style="width: 100%; height: calc(100% - 52px)">
          <CommonCodeGrid ref="commonCodeGrid" :commonCodeList="commonCodeList" :gridLang="gridLang" :validation="commonCodeListValidation" />
        </div>
      </div>
    </div>
    <PropertyCodeModal :row="slaveRow" :menuId="menuId" :page="page" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import systemApi from '@/api/system/system';
import CodeGroupGrid from '@/components/gridView/system/CodeGroupGrid';
import CommonCodeGrid from '@/components/gridView/system/CommonCodeGrid';
import PropertyCodeModal from '@/modal/system/PropertyCodeModal';
import commonJs from '@/mixins/system/common';

import languageApi from '@/api/language';

export default {
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  components: {
    CodeGroupGrid,
    CommonCodeGrid,
    PropertyCodeModal,
  },
  mixins: [commonJs],
  data() {
    return {
      selectValue: { value: '', text: 'ALL' },
      selectOptions: [
        { value: '', text: 'ALL' },
        { value: '1', text: '1Lv' },
        { value: '2', text: '2Lv' },
        { value: '3', text: '3Lv' },
      ],
      codeGroupList: [],
      commonCodeList: [],
      commonCodeListValidation: ['code', 'korCdNm', 'engCdNm', 'vnmCdNm', 'sort'],
      slaveRow: {},
      gridLang: [],
      filter: '',
      codeGroupObj: {},
      backUpCommonCodeList: [],
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
    comp_groupCd() {
      return this.codeGroupObj.groupCd ? this.codeGroupObj.groupCd : '';
    },
    codeDefaultData() {
      return this.codeGroupObj.groupCd ? this.codeGroupObj : {};
    },
  },
  watch: {
    codeGroupObj() {
      this.getCommonCodeList(this.codeGroupObj.groupCd);
    },
  },
  methods: {
    async getGridMutiLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage(this.routerPath, this.menuId, this.userLocale, 'Y');
        this.gridLang = resp.data.rs.language;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    reset() {
      this.getCodeGroupList();
      this.codeGroupObj = {};
      this.selectValue = this.selectOptions[0];
      this.filter = '';
      this.$refs.codeGroupGrid.disptColor();
    },
    async getCommonCodeList(groupCd = '', groupNm = '', filter = '', useYn = '', prntCd = 'ALL') {
      // this.$refs.CommonCodeGrid.gridCommit();
      this.$refs.filter.blur();
      try {
        const param = {
          groupCd,
          groupNm,
          filter,
          useYn,
          prntCd,
          cdLvl: this.selectValue.value,
        };
        const resp = await systemApi.getCommonCodeList(param);
        this.commonCodeList = resp.data.ds;
        if (groupCd === '') {
          this.backUpCommonCodeList = JSON.parse(JSON.stringify(this.commonCodeList));
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // callCommonCodeList(groupCd = '') {
    //   if (groupCd !== '') {
    //     this.filter = '';
    //     this.selectValue = { value: '1', text: '1Lv' };
    //     this.getCommonCodeList(groupCd);
    //   }
    // },
    openPop() {
      const rows = this.$refs.commonCodeGrid.checkedRows();
      if (rows.length === 1) {
        this.slaveRow = rows[0];
        this.$modal.show(`PropertyCodeModal${this.page}`);
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgValidOneCode');
      }
    },
    excelDownload() {
      const excelData = {
        fileNm: `excel.xlsx`,
        showProgress: true,
        progressMessage: 'Exporting..',
        indicator: 'hidden',
        header: 'default',
        footer: 'hidden',
        compatibility: true,
      };
      this.$refs.commonCodeGrid.excelExport(excelData);
    },

    //code group grid method 20221228
    async getCodeGroupList() {
      try {
        const resp = await systemApi.getCodeGroupList();
        this.codeGroupList = resp.data.ds;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setCodeGroup(codeGroupObj) {
      this.codeGroupObj = codeGroupObj;
    },

    addCodeGroupRow(num, data = {}) {
      this.$refs.codeGroupGrid.addRow(num, data);
    },
    getNewAndChangeDataCodeGroup() {
      this.$refs.codeGroupGrid.gridCommit();
      const rows = this.$refs.codeGroupGrid.getNewAndChangeData();
      if (rows.length > 0) {
        const defaultValue = {
          code: 'defaultCode',
          korCdNm: '',
          engCdNm: '',
          vnmCdNm: '',
          cdLvl: 1,
          sort: 1,
          useYn: 'Y',
        };
        let checkValidation = rows.every(r => r.groupCd && r.groupNm);
        if (checkValidation) {
          const mnpl_rows = rows.map(r => {
            r = { ...r, ...defaultValue };
            return r;
          });
          // console.table(mnpl_rows);
          this.setCodeGroupList(mnpl_rows);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgValidEssential');
        }
      } else {
        this.$EventBus.$emit('openYesModal', 'message.noDataValidation');
      }
    },
    async setCodeGroupList(rows) {
      try {
        const param = rows;
        const resp = await systemApi.setCodeGroupList(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);
        this.getCodeGroupList();
        this.codeGroupObj = {
          groupCd: rows[0].groupCd,
          groupNm: rows[0].groupNm,
        };
      } catch (e) {
        console.log(e);

        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else if (e && e.errMsg) {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    deleteRow() {
      this.$refs.commonCodeGrid.deleteRows();
    },
  },
  created() {},
  mounted() {
    this.getCodeGroupList();
    // this.getCommonCodeList();
    this.getGridMutiLanguage();
  },
  destroyed() {},
};
</script>

<style>
.subTitle {
  font-size: 1em;
  font-weight: bold;
}
.menu_manage_box {
  height: 100% !important;
}
.codeGroupGrid {
  width: 450px;
  height: calc(100% - 52px);
}
</style>
