<template>
  <div>
    <TakeOverSearch ref="TakeOverSearch" :page="page" :authButton="authButton" :openInfo="openInfo" @sendListRows="getListRows" />
    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container10">
      <div class="real_head">
        <div class="real_head_left">
          <!-- <small>{{ $t('message.takeOverList') }}</small> -->
          <small
            >{{ $t('message.totalSelection1') }}<i>{{ listRows.length }}</i
            >{{ $t('message.totalSelection2') }}</small
          >
        </div>
        <div class="real_head_right">
          <button v-if="authButton.fn3Auth === 'Y'" class="btn_default btn_print_fuction" @click="validation('invoice')">{{ $t('message.btnInvoiceNum') }}</button>
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
          <MultiSelect id="Material_Group" v-model="selectLayout" :close-on-select="true" :options="selectLayoutOptions" :searchable="false" :show-labels="false" class="btn_select_layout" label="text" placeholder="Layout" style="width: 100%" @input="selectLayoutOne"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body04">
        <TakeOverGrid ref="TakeOverGrid" :gridLang="gridLang" :listRows="listRows" :page="page" :savePage="savePage" style="height: 100%" @openCarInfo="openCarInfo" @openForwardingCustCar="openForwardingCustCar" @openForwardingDetail="openForwardingDetail" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button v-if="authButton.exlAuth === 'Y'" class="btn_default btn_function" @click="excelDownload">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right">
          <button v-if="authButton.fn1Auth === 'Y'" class="btn_default btn_print_fuction" @click="validation('print')">{{ $t('message.btnInvoicePrint') }}</button>
          <button v-if="authButton.fn2Auth === 'Y'" class="btn_default btn_critical_process" @click="validation('takeOver')">{{ $t('message.btnTakeOverConfirm') }}</button>
        </div>
      </div>
    </div>

    <!-- //리얼그리드 -->
    <PriceAlarmModal />
    <TakeOverModal />
    <!-- 고객차량 선택 -->
    <ForwardingCustCarModal :menuId="menuId" :page="page" />
    <!-- 출고상세 -->
    <ForwardingDetailModal :menuId="menuId" :page="page" />
    <CarInfoViewModal ref="CarInfoView" :page="page" />
    <ReportLangSelectModal @printReport="printReport" />
    <DeliveryInfoModal :page="page" :menuId="menuId" />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import commonApi from '@/api/common';
import tranApi from '@/api/tran/tran';
import PriceAlarmModal from '@/modal/sales/PriceAlarmModal';
import TakeOverSearch from '@/components/tran/TakeOverSearch';
import TakeOverGrid from '@/components/gridView/tran/TakeOverGrid';
import TakeOverModal from '@/modal/tran/TakeOverModal';
import defs from '@/consts/defs';
import languageApi from '@/api/language';
import ForwardingCustCarModal from '@/modal/tran/ForwardingCustCarModal';
import ForwardingDetailModal from '@/modal/tran/ForwardingDetailModal';
import CarInfoViewModal from '@/modal/tran/CarInfoViewModal';
import ReportLangSelectModal from '@/modal/ReportLangSelect';
import reportPrintJs from '@/mixins/reportPrint';
import DeliveryInfoModal from '@/modal/tran/DeliveryInfoModal';

export default {
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  components: {
    TakeOverGrid,
    PriceAlarmModal,
    TakeOverSearch,
    TakeOverModal,
    ForwardingCustCarModal,
    ForwardingDetailModal,
    CarInfoViewModal,
    ReportLangSelectModal,
    DeliveryInfoModal,
  },
  mixins: [reportPrintJs],
  data() {
    return {
      filterOn: true,
      isFixRow: false,
      isFixColumn: false,
      selectLayout: { text: this.$i18n.t('message.btnLayout'), value: '' },
      selectLayoutOptions: [
        { text: this.$i18n.t('message.btnSave'), value: 'SAVE' },
        { text: this.$i18n.t('message.btnInit'), value: 'RESET' },
      ],
      listRows: [],
      checkedRows: [],
      outStatCd: defs.outStatCd,
      gridLang: [],
    };
  },
  methods: {
    fwdDtlsModal(trnPlnNum) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnNum, readOnly: true });
    },
    deliveryInfoModal(trnNum) {
      this.$modal.show(`DeliveryInfoModal${this.page}`, { trnNum: trnNum });
    },
    validation(is = '') {
      const rows = this.$refs.TakeOverGrid.sendJsonRows();
      const isChooseCell = this.$refs.TakeOverGrid.isChooseCell();
      const isChecked = this.$refs.TakeOverGrid.sendChecked();
      this.checkedRows = this.$refs.TakeOverGrid.sendCheckedData();
      if (rows.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
        return false;
      } else if (!isChooseCell && is === '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
        return false;
      } else if (!isChecked && is !== '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoItem');
        return false;
      } else if (is === 'takeOver') {
        let notDelIng = false;
        this.checkedRows.forEach(list => {
          if (list.outStatCd !== this.outStatCd.delIng) {
            notDelIng = true;
          }
        });
        if (notDelIng) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidDelIng');
        } else {
          this.$modal.show('TakeOverModal');
        }
      } else if (is === 'print') {
        let notDo = false;
        let trnPlnNum = '';
        let notSameTrnPlnNum = false;
        this.checkedRows.forEach((list, index) => {
          if (index === 0) {
            trnPlnNum = list.trnPlnNum;
          }
          if (!list.trnNum || list.trnNum === null || list.trnNum === '') {
            notDo = true;
          } else if (trnPlnNum !== list.trnPlnNum) {
            notSameTrnPlnNum = true;
          }
        });
        // todo: do가 있어야만 전자송장이 출력 가능하다면 validation 처리 필요.
        if (notDo) {
          // this.$EventBus.$emit('openYesModal', 'message.msgValidNoDo');
        }
        if (notSameTrnPlnNum) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidOnePln');
          return false;
        } else {
          //
          this.$modal.show('ReportLangSelectModal', { signShow: false, type: 'deliveryNote' });
        }
      } else if (is === 'invoice') {
        let trnPlnNum = '';
        let notSameTrnPlnNum = false;
        let trnPlnNumIsNull = false;
        this.checkedRows.forEach((row, index) => {
          if (index === 0) {
            trnPlnNum = row.trnPlnNum;
          } else if (trnPlnNum == null || trnPlnNum == '') {
            trnPlnNumIsNull = true;
          } else if (trnPlnNum !== row.trnPlnNum) {
            notSameTrnPlnNum = true;
          }
        });
        if (trnPlnNumIsNull) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidTrnPlnNum2');
          return false;
        } else if (notSameTrnPlnNum) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidOnePlnInvoice');
          return false;
        }
        this.saveInvoiceNum();
      } else {
        return true;
      }
    },
    fixGrid(type) {
      if (this.validation()) {
        this.$refs.TakeOverGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
        if (type === 'column') {
          this.isFixColumn = !this.isFixColumn;
        } else if (type === 'row') {
          this.isFixRow = !this.isFixRow;
        }
      }
    },
    selectLayoutOne(value) {
      if (value.value === 'SAVE') {
        this.$modal.show('PriceAlarmModal', { type: 'save' });
      } else if (value.value === 'RESET') {
        this.$modal.show('PriceAlarmModal', { type: 'reset' });
      }
      this.selectLayout = { text: this.$i18n.t('message.btnLayout'), value: '' };
    },
    async layoutSave(type, result) {
      this.layoutOpen = !this.layoutOpen;
      if (result) {
        if (type === 'reset' || type === 'update') {
          this.$refs.TakeOverGrid.resetLayout();
        }
        try {
          const column = this.$refs.TakeOverGrid.getLayout();
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
    excelDownload() {
      const excelData = {
        fileNm: `takeOverExcel${dayjs().format('DD-MM-YYYY')}.xlsx`,
        showProgress: true,
        progressMessage: 'Exporting..',
        indicator: 'hidden',
        header: 'default',
        footer: 'hidden',
        compatibility: true,
      };
      this.$refs.TakeOverGrid.excelExport(excelData);
    },
    getListRows(listRows) {
      this.listRows = JSON.parse(JSON.stringify(listRows));
    },
    async saveTakeOverConfirm(cd) {
      try {
        const param = [];
        this.checkedRows.forEach(list => {
          let data = {
            id: list.id,
            offrNum: list.offrNum,
            offrId: list.offrId,
            offtDtlsId: list.offrDtlsId,
            trnDelayReasonCd: cd.value,
          };
          param.push(data);
        });

        await tranApi.saveTakeOverConfirm(param);
        await this.$refs.TakeOverSearch.getTakeOverList();
        this.$modal.hide('TakeOverModal');
        this.$EventBus.$emit('openYesModal', 'message.msgTakeOverSuccess');
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
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
    openForwardingDetail(trnPlnInfo) {
      if (trnPlnInfo.outStatCd !== this.outStatCd.trnReq && trnPlnInfo.outStatCd !== defs.outStatCd.disReq) {
        this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnInfo.trnPlnNum, readOnly: true });
      } else {
        this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnInfo.trnPlnNum, readOnly: false });
      }
    },
    openForwardingCustCar(trnPlnInfo) {
      this.$modal.show(`ForwardingCustCarModal${this.page}`, { info: trnPlnInfo });
    },
    async reloadSearch() {
      await this.$refs.TakeOverSearch.getTakeOverList();
    },
    async openCarInfo(clickRow) {
      const param = {
        trncusId: clickRow.trncusId, // props로 받은 rowData.trncusId
        tranCarNum: clickRow.trnCarNum, // props로 받은 rowData.trnCarNum
        useYn: '',
      };
      try {
        const response = await tranApi.getCarManageList(param);
        const carInfoList = response.data.ds;
        if (carInfoList.length <= 0) {
          this.ment = 'message.msgNoneInfo';
          this.$modal.show('NoticeModal');
          return;
        } else {
          this.$modal.show('CarInfoViewModal', { carInfoList });
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async printReport(data) {
      if (data.result) {
        try {
          const param = {
            trnPlnNum: this.checkedRows[0].trnPlnNum,
            langList: data.langList,
          };
          const resp = await tranApi.getDeliveryNote(param);

          this.reportPrint(resp.data.ds, data.type);
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
    async saveInvoiceNum() {
      try {
        const param = {
          trnPlnNum: this.checkedRows[0].trnPlnNum,
        };
        await tranApi.saveInvoiceNum(param);
        await this.$refs.TakeOverSearch.getTakeOverList();
        this.$EventBus.$emit('openYesModal', 'message.msgSaveInvoiceNum');
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.TakeOverGrid.setFilter(this.filterOn);
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
