<template>
  <div>
    <PriceSearch :page="page" ref="PriceSearch" @sendSearchList="getSearchList" @priceApprStatCdOptions="setPriceApprStatCdOptions" @sendCustInfo="getCustInfo" @sendPageInfo="getPageInfo" :changePageNumber="pageNumber" @resetPageNumber="resetPageNumber" :authButton="authButton" />
    <!-- 리얼그리드 -->

    <div class="realgrid_container realgrid_container11">
      <div class="real_head">
        <div class="real_head_left">
          <small
            >{{ $t('message.totalSelection1') }} <i>{{ pageInfo.totalCount }}</i> {{ $t('message.totalSelection2') }}</small
          >
        </div>
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
            <span v-if="!isFixColumn">{{ $t('message.btnFixColumn') }}</span>
            <span v-else>{{ $t('message.btnUnfixColumn') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="fixGrid('row')">
            <img src="@/assets/img/icon_hori.png" />
            <span v-if="!isFixRow">{{ $t('message.btnFixRow') }}</span>
            <span v-else>{{ $t('message.btnUnfixRow') }}</span>
          </button>
          <MultiSelect id="Material_Group" class="btn_select_layout" label="text" style="width: 100%" v-model="selectLayout" :options="selectLayoutOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Layout" @input="selectLayoutOne"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body04" v-if="page === 'itemPriceList'">
        <ItemPriceListGrid ref="PriceGrid" style="height: 100%" :page="page" :priceListRows="priceListRows" @sendInfoPrdtCd="openPriceInfo" :savePage="savePage" :apprDocNumText="apprDocNumText" :gridLang="gridLang" />
      </div>
      <div class="real_body real_body04" v-if="page === 'salePriceList'">
        <SalesPriceListGrid ref="PriceGrid" style="height: 100%" :page="page" :priceListRows="priceListRows" @sendInfoPrdtCd="openPriceInfo" :savePage="savePage" :apprDocNumText="apprDocNumText" :gridLang="gridLang" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button class="btn_default btn_function" v-if="this.authButton.exlAuth === 'Y'" @click="fileUpload">{{ $t('message.btnExcelUpload') }}</button>
          <button class="btn_default btn_function" v-if="this.authButton.exlAuth === 'Y'" @click="fileDownload">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_critical_process" @click="registerApprDocNum">{{ $t('message.btnApprDocNumAdd') }}</button>
        </div>
      </div>
    </div>
    <PagIng :pageInfo="pageInfo" :length="priceListRows.length" ref="PagIng" @alterPageNumber="alterPageNumber" />
    <!-- //리얼그리드 -->
    <DraftDocumentListModal :page="page" />
    <DraftDocumentModal @saveApprDocNum="saveApprDocNum" />
    <PriceAlarmModal />
    <PriceExcelUploadModal @downloadExcel="fileDownload" :page="page" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PriceSearch from '@/components/sales/PriceSearch';
import ItemPriceListGrid from '@/components/gridView/sales/ItemPriceListGrid';
import SalesPriceListGrid from '@/components/gridView/sales/SalesPriceListGrid';
import DraftDocumentListModal from '@/modal/sales/DraftDocumentListModal';
import PriceExcelUploadModal from '@/modal/sales/ExcelUploadModal';
import DraftDocumentModal from '@/modal/sales/DraftDocumentModal';
import PriceAlarmModal from '@/modal/sales/PriceAlarmModal';
import salesApi from '@/api/sales/sales';
// import fileApi from '@/api/file';
import fileDownload from '@/mixins/fileDownload';
import commonApi from '@/api/common';
import languageApi from '@/api/language';
import dayjs from 'dayjs';
import PagIng from '@/components/commonComponent/PagIng';

export default {
  components: { PriceSearch, ItemPriceListGrid, SalesPriceListGrid, DraftDocumentListModal, PriceExcelUploadModal, DraftDocumentModal, PriceAlarmModal, PagIng },
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  data() {
    return {
      filterOn: true,
      priceListRows: [],
      apprList: [],
      layoutOpen: false,
      apprDocNumText: [],
      custInfo: {},
      saveApprDocNumList: [],
      isFixColumn: false,
      isFixRow: false,
      pageInfo: { totalCount: 0 },
      pageNumber: 0,
      // pageBlockSize: 5,
      // pageDefaultBlockSize: 5,
      selectLayout: { text: this.$i18n.t('message.btnLayout'), value: '' },
      selectLayoutOptions: [
        { text: this.$i18n.t('message.btnSave'), value: 'SAVE' },
        { text: this.$i18n.t('message.btnInit'), value: 'RESET' },
      ],
      gridLang: [],
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
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
    validation(is = '') {
      const rows = this.$refs.PriceGrid.sendJsonRows();
      const isChooseCell = this.$refs.PriceGrid.isChooseCell();
      const isChecked = this.$refs.PriceGrid.sendChecked();
      if (rows.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
        return false;
      } else if (!isChooseCell && is !== 'apprDoc') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
        return false;
      } else if (!isChecked && is === 'apprDoc') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoItem');
        return false;
      } else if (isChecked && is === 'apprDoc') {
        const rows = this.$refs.PriceGrid.sendCheckedData();
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].apprDocNum !== '' && rows[i].apprDocNum) {
            this.$EventBus.$emit('openYesModal', 'message.msgExistApprDocNum');
            return false;
          }
        }
        this.saveApprDocNumList = rows;
        return true;
      } else {
        return true;
      }
    },
    fixGrid(type) {
      if (this.validation()) {
        this.$refs.PriceGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
        if (type === 'column') {
          this.isFixColumn = !this.isFixColumn;
        } else if (type === 'row') {
          this.isFixRow = !this.isFixRow;
        }
      }
    },
    registerApprDocNum() {
      if (this.validation('apprDoc')) {
        this.$modal.show('PriceDraftDocumentModal');
      }
    },
    async getItemBasePriceInfo(searchInfo) {
      try {
        const param = {
          prdtCd: searchInfo.prdtCd,
        };

        const resp = await salesApi.getItemBasePriceInfo(param);
        if (resp.data.status === 200) {
          this.apprList = resp.data.ds;
          this.$modal.show(`DraftDocumentListModal${this.page}`, { searchInfo, apprList: this.apprList, apprDocNumText: this.apprDocNumText });
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
    async getClientItemPriceInfo(searchInfo) {
      try {
        const param = {
          custCd: this.custInfo.custCd,
          prdtCd: searchInfo.prdtCd,
        };

        const resp = await salesApi.getClientItemPriceInfo(param);

        if (resp.data.status === 200) {
          this.apprList = resp.data.ds;
          this.$modal.show(`DraftDocumentListModal${this.page}`, { searchInfo, apprList: this.apprList, apprDocNumText: this.apprDocNumText });
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
    getSearchList(result) {
      this.priceListRows = result;
    },
    openPriceInfo(searchInfo) {
      if (this.page === 'itemPriceList') {
        this.getItemBasePriceInfo(searchInfo);
      } else if (this.page === 'salePriceList') {
        this.getClientItemPriceInfo(searchInfo);
      }
    },
    async fileDownload() {
      if (this.page === 'itemPriceList') {
        try {
          let time = this.$refs.PriceSearch.getTime();
          const param = {
            sttDt: time.length > 0 ? time[0] : '',
            endDt: time.length > 0 ? time[1] : '',
            fileNm: `Base-Price-${dayjs().format('YYYYMMDD')}.xlsx`,
          };
          const resp = await salesApi.excelDownloadBasePrice(param);
          fileDownload.downloadFile(resp, param.fileNm);
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      } else if (this.page === 'salePriceList') {
        if (this.custInfo.custId) {
          try {
            const param = {
              custId: this.custInfo.custId,
              fileNm: `Sale Price-${dayjs().format('YYYYMMDD')}.xlsx`,
            };
            const resp = await salesApi.excelDownloadClient(param);
            fileDownload.downloadFile(resp, param.fileNm);
          } catch (e) {
            console.log(e);
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
        }
      }
    },
    fileUpload() {
      if (this.page === 'itemPriceList' || (this.page === 'salePriceList' && this.custInfo.custId)) {
        this.$modal.show('PriceExcelUploadModal');
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
      }
    },
    async layoutSave(type, result) {
      this.layoutOpen = !this.layoutOpen;
      if (result) {
        if (type === 'reset' || type === 'update') {
          this.$refs.PriceGrid.resetLayout();
        }
        try {
          const column = this.$refs.PriceGrid.getLayout();
          const param = {
            menuId: this.menuId,
            storeCls: this.page,
            uiJson: column,
          };
          await commonApi.putSaveUi(param);
          if (type === 'update') {
            this.$EventBus.$emit('openYesModal', 'message.msgLayoutUpdate');
          } else if (type === 'reset') {
            this.$EventBus.$emit('openYesModal', 'message.msgClearRefresh');
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgResultSave');
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
    setPriceApprStatCdOptions(options) {
      let apprDocNumY = '';
      let apprDocNumN = '';
      options.forEach(option => {
        if (option.value === 'Y') {
          apprDocNumY = option.text;
        } else if (option.value === 'N') {
          apprDocNumN = option.text;
        }
      });

      this.apprDocNumText = { apprDocNumY, apprDocNumN };
    },
    getCustInfo(custInfo) {
      this.custInfo = custInfo;
    },
    async saveApprDocNum(apprDocNum) {
      const param = [];
      this.saveApprDocNumList.forEach(list => {
        const data = {
          id: list.id,
          apprDocNum,
        };
        param.push(data);
      });

      try {
        let resp = '';
        if (this.page === 'itemPriceList') {
          resp = await salesApi.saveItemApprDocNum(param);
        } else if (this.page === 'salePriceList') {
          resp = await salesApi.saveClientItemApprDocNum(param);
        }
        if (resp.data.status === 200) {
          this.priceListRows.forEach(row => {
            param.forEach(change => {
              if (row.id * 1 === change.id * 1) {
                row.apprDocNum = apprDocNum;
              }
            });
          });
          this.priceListRows = JSON.parse(JSON.stringify(this.priceListRows));
          this.$EventBus.$emit('openYesModal', resp.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', resp.data.message);
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
    getPageInfo(pageInfo) {
      this.pageInfo = pageInfo;
    },
    alterPageNumber(pageNumber) {
      this.pageNumber = pageNumber;
    },
    resetPageNumber() {
      this.$refs.PagIng.resetPageNumber();
    },
    selectLayoutOne(value) {
      if (value.value === 'SAVE') {
        this.$modal.show('PriceAlarmModal', { type: 'save' });
      } else if (value.value === 'RESET') {
        this.$modal.show('PriceAlarmModal', { type: 'reset' });
      }
      this.selectLayout = { text: this.$i18n.t('message.btnLayout'), value: '' };
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.PriceGrid.setFilter(this.filterOn);
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
