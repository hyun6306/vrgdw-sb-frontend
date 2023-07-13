<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.grpNm') }}</span>
              <MultiSelect id="" style="width: 100%" label="text" v-model="code" :options="codeOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" :allow-empty="false"></MultiSelect>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.selectLevel') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" label="text" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" :allow-empty="false"></MultiSelect>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
              <input type="text" id="postal_code" style="width: 100%" class="t-l" v-model="filter" ref="filter" @keyup.enter="getProductChartList('', '', filter)" :placeholder="$t('message.nm')" />
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset()">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="[getProductChartList('', '', filter), checked()]">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- //검색필터 영역 -->
    <div class="setting_section" style="height: calc(100% - 56px)">
      <div class="menu_manage_box">
        <div class="content_head">
          <span class="subTitle">{{ $t('message.itemManage') }}</span>
          <!-- <div class="btn_box">
            <button class="btn_default btn_function" @click="addCodeGroupRow(1)">{{ $t('message.btnAdd') }}</button>
            <button class="btn_default btn_function" @click="getNewAndChangeDataCodeGroup()">{{ $t('message.btnSave') }}</button>
          </div> -->
        </div>
        <div class="codeGroupGrid">
          <ProductChartGroupGrid ref="ProductChartGroupGrid" :codeGroupList="codeGroupList" :gridLang="gridLang" @codeGroup="setCodeGroup" />
        </div>
      </div>

      <div class="program_box">
        <div class="content_head">
          <span class="subTitle">{{ $t('message.itemManageList') }}</span>
          <div class="btn_box">
            <!-- <button class="btn_add" @click="excelDownload()">Excel Download</button> -->
            <button class="btn_default btn_process" @click="openPop()">{{ $t('message.btnRegistCodeProperty') }}</button>
            <button class="btn_default btn_function" @click="addRow(1)">{{ $t('message.btnAdd') }}</button>
            <!-- <button class="btn_add" @click="removeCommonCodeList()">{{ $t('message.btnDelete') }}</button> -->
            <button class="btn_default btn_function" @click="saveProductChartList()">{{ $t('message.btnSave') }}</button>
          </div>
        </div>
        <div class="" style="width: 100%; height: calc(100% - 52px)">
          <ProductChartGrid ref="ProductChartGrid" :chartList="chartList" :gridLang="gridLang" />
        </div>
      </div>
    </div>
    <PropertyCodeModal :row="slaveRow" :menuId="menuId" :page="page" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import masterApi from '@/api/master/master';
import ProductChartGrid from '@/components/gridView/master/ProductChartGrid';
import ProductChartGroupGrid from '@/components/gridView/master/ProductChartGroupGrid';
import PropertyCodeModal from '@/modal/system/PropertyCodeModal';
import commonJs from '@/mixins/system/common';

import languageApi from '@/api/language';

export default {
  props: {
    authButton: {
      type: Object,
    },
    savePage: {
      type: Array,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    openInfo: {
      type: Object,
    },
    routerPath: {
      type: String,
    },
  },
  components: {
    ProductChartGrid,
    ProductChartGroupGrid,
    PropertyCodeModal,
  },
  mixins: [commonJs],
  data() {
    return {
      selectValue: { value: '1', text: '1Lv' },
      selectOptions: [
        // { value: '', text: 'ALL' },
        { value: '1', text: '1Lv' },
        { value: '2', text: '2Lv' },
        { value: '3', text: '3Lv' },
      ],
      codeOptions: [
        { value: 'BRAND_CD', text: '브랜드 코드' },
        { value: 'BRD_GRADE', text: '보드 등급' },
        { value: 'DNST_TYPE', text: '밀도 타입' },
        { value: 'ECO_CD', text: '친환경 코드' },
        { value: 'PRDT_CLS_CD', text: '제품 분류 코드' },
        { value: 'PRDT_SPECS', text: '제품 규격' },
        { value: 'PRDT_TSK', text: '제품 두께' },
        { value: 'UNIT_CD', text: '단위 코드' },
        { value: 'LPM_PTTN', text: 'LPM 패턴' },
        { value: 'PRS_PTTN', text: '경면판 패턴' },
      ],
      code: {},
      chartList: [],
      codeGroupList: [],
      commonCodeList: [],
      commonCodeListValidation: ['code', 'korCdNm', 'engCdNm', 'vnmCdNm', 'sort'],
      slaveRow: {},
      gridLang: [],
      filter: '',
      isChecked: false,
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  watch: {},
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
      this.code = this.codeOptions[0];
      this.selectValue = this.selectOptions[0];
      this.filter = '';
    },
    checked() {
      this.isChecked = true;
    },
    async getProductChartList(groupCd = '', groupNm = '', filter = '', useYn = '', prntCd = 'ALL') {
      this.$refs.ProductChartGrid.gridCommit();
      this.$refs.ProductChartGroupGrid.gridCommit();
      this.$refs.filter.blur();
      try {
        const param = {
          groupCd: groupCd ? groupCd : this.code.value,
          groupNm,
          filter,
          useYn,
          prntCd,
          cdLvl: this.selectValue.value,
        };
        const resp = await masterApi.getProductChartList(param);
        this.chartList = resp.data.ds;

        if (this.isChecked) {
          this.codeGroupList.forEach((list, index) => {
            if (list.groupCd == this.code.value) {
              this.$refs.ProductChartGroupGrid.disptColor(index);
            }
          });
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
    //     this.getProductChartList(groupCd);
    //   }
    // },
    openPop() {
      const rows = this.$refs.ProductChartGrid.checkedRows();
      if (rows.length === 1) {
        this.slaveRow = rows[0];
        this.$modal.show(`PropertyCodeModal${this.page}`);
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgValidOneCode');
      }
    },
    addRow(num) {
      this.$refs.ProductChartGrid.addRow(num);
    },
    async saveProductChartList() {
      const rows = this.$refs.ProductChartGrid.getNewAndChangeData();
      try {
        const param = rows;
        const resp = await masterApi.saveProductChartList(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // async removeCommonCodeList() {
    //   const rows = this.$refs.ProductChartGrid.getCheckedData();
    //   try {
    //     const param = rows;
    //     const resp = await masterApi.removeCommonCodeList(param);
    //     this.$EventBus.$emit('openYesModal', resp.data.message);
    //   } catch (e) {
    //     if (e && e.err && e.err.data && e.err.data.message) {
    //       this.$EventBus.$emit('openYesModal', e.err.data.message);
    //     } else {
    //       this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
    //     }
    //   }
    // },
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
      this.$refs.ProductChartGrid.excelExport(excelData);
    },
    setCodeGroup(groupCd) {
      this.isChecked = false;
      this.getProductChartList(groupCd);
    },
  },
  created() {},
  mounted() {
    this.codeOptions.forEach(list => {
      this.codeGroupList.push({ groupCd: list.value, groupNm: list.text });
    });
    if (this.codeGroupList.length > 0) this.$refs.ProductChartGroupGrid.disptColor(0);
    this.code = this.codeOptions[0];
    this.getProductChartList(this.code.value);
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
</style>
