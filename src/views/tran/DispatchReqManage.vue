<template>
  <div>
    <DispatchReqSearch ref="DispatchReqSearch" :authButton="authButton" :menuId="menuId" :page="page" :openInfo="openInfo" @sendDispatchReqList="sendDispatchReqList" />
    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container06">
      <div class="real_head">
        <div class="real_head_left">
          <small>
            {{ $t('message.totalSelection1') }}
            <i>{{ dispatchReqList.length }}</i>
            {{ $t('message.totalSelection2') }}
          </small>
          <small class="ml-30">
            {{ $t('message.ordQty') }}
            <i>{{ trnReqOrdQty }}</i>
          </small>
          <small class="ml-30">
            {{ $t('message.trnOrgWght') }} <i> {{ trnOrgWght }}</i
            >T
          </small>
          <small class="ml-30">
            {{ $t('message.trnOrgVol') }} <i> {{ trnOrgVol }}</i
            >M3
          </small>
        </div>
        <div class="real_head_right">
          <!--          <button class="btn_default btn_deep_green" @click="clickBtn('invoice')">{{ $t('message.btnInvoiceNum') }}</button>-->
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
            <span v-if="isFixColumn">{{ $t('message.btnUnfixColumn') }}</span>
            <span v-else>{{ $t('message.btnFixColumn') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="fixGrid('row')">
            <img src="@/assets/img/icon_hori.png" />
            <span v-if="isFixRow">{{ $t('message.btnUnfixRow') }}</span>
            <span v-else>{{ $t('message.btnFixRow') }}</span>
          </button>
          <!-- MultiSelect -->
          <MultiSelect id="Material_Group" v-model="layoutValue" :allow-empty="false" :close-on-select="true" :options="layoutOptions" :searchable="false" :show-labels="false" class="btn_select_layout" label="text" style="width: 100%" @input="layoutBtn"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body04">
        <DispatchRequestGrid ref="DispatchRequestGrid" :carInfo="carInfo" :dispatchReqList="dispatchReqList" :gridLang="gridLang" :gridName="'DispatchRequestGrid'" :menuId="menuId" :page="page" :savePage="savePage" :selectDate="selectDate" :selectDateShow="selectDateShow" style="height: 100%" @checkedInfo="selectTotal" @openForwardingCustCar="openForwardingCustCar" @openForwardingDetail="openForwardingDetail" @sendGridCarInfo="sendGridCarInfo" @sendGridData="sendGridData" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button v-if="authButton.exlAuth === 'Y'" class="btn_default btn_function" @click="excelDownload()">
            {{ $t('message.btnDownloadExcel') }}
          </button>
        </div>
        <div class="footer_right">
          <button v-if="authButton.delAuth === 'Y'" class="btn_default btn_function" @click="clickBtn('cancel')">{{ $t('message.btnCancelLorry') }}</button>
          <button v-if="authButton.savAuth === 'Y'" class="btn_default btn_function" @click="clickBtn('save')">
            {{ $t('message.btnSave') }}
          </button>
          <button v-if="authButton.fn1Auth === 'Y'" class="btn_default btn_critical_process" @click="clickBtn('end')">{{ $t('message.btnCompleteDispatch') }}</button>
          <!-- <button class="btn_default btn_temp" @click="$modal.show('CarNumSearchGridModal')">{{ $t('message.btnSelVehiNum') }}</button> -->
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <TranAlarmModal :ment="ment" :type="type" @okOrNo="okOrNo" />
    <DatePickerModal :currentDate="currentDate" :openSelectDate="openSelectDate" @selectDate="showSelectDate" />
    <CarNumSearchGridModal ref="CarNumSearchGridModal" :page="page" @sendCarInfo="sendCarInfo" />
    <!-- 고객차량 선택 -->
    <ForwardingCustCarModal :menuId="menuId" :page="page" />
    <!-- 출고상세 -->
    <ForwardingDetailModal :menuId="menuId" :page="page" />
    <DeliveryInfoModal :page="page" :menuId="menuId" />
  </div>
</template>

<script>
import DispatchReqSearch from '@/components/tran/DispatchReqSearch';
import DispatchRequestGrid from '@/components/gridView/tran/DispatchRequestGrid';
import TranAlarmModal from '@/modal/tran/TranAlarmModal';
import DatePickerModal from '@/modal/tran/DatePickerModal';
import tranApi from '@/api/tran/tran';
import languageApi from '@/api/language';
import CarNumSearchGridModal from '@/modal/tran/CarNumSearchGridModal';
import ForwardingCustCarModal from '@/modal/tran/ForwardingCustCarModal';
import ForwardingDetailModal from '@/modal/tran/ForwardingDetailModal';
import defs from '@/consts/defs';
import DeliveryInfoModal from '@/modal/tran/DeliveryInfoModal';

export default {
  components: {
    DispatchRequestGrid,
    DispatchReqSearch,
    TranAlarmModal,
    DatePickerModal,
    CarNumSearchGridModal,
    ForwardingCustCarModal,
    ForwardingDetailModal,
    DeliveryInfoModal,
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
  data() {
    return {
      filterOn: true,
      isFixRow: false,
      isFixColumn: false,
      layoutValue: { text: this.$t('message.btnLayout'), value: '' },
      layoutOptions: [
        { text: this.$t('message.btnSave'), value: 'save' },
        { text: this.$t('message.btnInit'), value: 'reset' },
      ],
      type: '',
      ment: '',
      result: '',
      dispatchReqList: [],
      selectDate: '',
      gridData: [],
      currentDate: '',
      openSelectDate: '',
      currentNum: '',
      openSelectNum: '',
      ids: [],
      isSearch: false,
      trnReqOrdQty: 0,
      trnOrgWght: 0,
      trnOrgVol: 0,
      selectProductRows: [],
      selectDateShow: '',
      gridLang: [],
      default: 'today',
      selectCarShow: '',
      carInfo: [],
    };
  },
  watch: {},
  methods: {
    fwdDtlsModal(trnPlnNum) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnNum, readOnly: true });
    },
    deliveryInfoModal(trnNum) {
      this.$modal.show(`DeliveryInfoModal${this.page}`, { trnNum: trnNum });
    },
    async getRouterLanguage() {
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
    validation(type) {
      const result = { validation: true };
      if (this.dispatchReqList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
        result.validation = false;
      } else if (this.selectProductRows.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
        result.validation = false;
      } else {
        if (type === 'is') {
          this.selectProductRows.forEach(row => {
            if (row.outStatCd === defs.outStatCd.disEnd) {
              this.$EventBus.$emit('openYesModal', 'message.msgAlredyDispatchEnd');
              result.validation = false;
            } else if (!row.trnCarNum || row.trnCarNum === '') {
              this.$EventBus.$emit('openYesModal', 'message.msgNoCilckCarNum');
              result.validation = false;
            } else if (!row.inExptDt || row.inExptDt === '') {
              this.$EventBus.$emit('openYesModal', 'message.msgNoClickSelected');
              result.validation = false;
            } else if (!row.inExptTi || row.inExptTi === '') {
              this.$EventBus.$emit('openYesModal', 'message.msgNoClickInExptTi');
              result.validation = false;
            } else if (row.outStatCd !== defs.outStatCd.disReq) {
              this.$EventBus.$emit('openYesModal', 'message.msgNoDispatchRequest');
              result.validation = false;
            }
          });
        } else if (type === 'invoice') {
          let trnPlnNum = '';
          let notSameTrnPlnNum = false;
          let trnPlnNumIsNull = false;
          this.selectProductRows.forEach((row, index) => {
            if (index === 0) {
              trnPlnNum = row.trnPlnNum;
            } else if (trnPlnNum == null || trnPlnNum == '') {
              result.validation = false;
              trnPlnNumIsNull = true;
            } else if (trnPlnNum !== row.trnPlnNum) {
              result.validation = false;
              notSameTrnPlnNum = true;
            }
          });
          if (trnPlnNumIsNull) {
            this.$EventBus.$emit('openYesModal', 'message.msgValidTrnPlnNum2');
          } else if (notSameTrnPlnNum) {
            this.$EventBus.$emit('openYesModal', 'message.msgValidOnePlnInvoice');
          }
        }
        return result;
      }
      return result;
    },
    selectTotal(data) {
      if (data) {
        if (data.all) {
          if (data.checked) {
            parseFloat((this.trnReqOrdQty = data.trnReqOrdQty.toFixed(3)));
            parseFloat((this.trnOrgWght = data.trnOrgWght.toFixed(3)));
            parseFloat((this.trnOrgVol = data.trnOrgVol.toFixed(3)));
          } else {
            this.trnReqOrdQty = 0;
            this.trnOrgWght = 0;
            this.trnOrgVol = 0;
          }
        } else {
          if (data.checked) {
            this.trnReqOrdQty = (this.trnReqOrdQty * 1000 + data.trnReqOrdQty * 1000) / 1000;
            this.trnOrgWght = (this.trnOrgWght * 1000 + data.trnOrgWght * 1000) / 1000;
            this.trnOrgVol = (this.trnOrgVol * 1000 + data.trnOrgVol * 1000) / 1000;
          } else {
            this.trnReqOrdQty = parseFloat(((this.trnReqOrdQty * 1000 - data.trnReqOrdQty * 1000) / 1000).toFixed(3));
            this.trnOrgWght = parseFloat(((this.trnOrgWght * 1000 - data.trnOrgWght * 1000) / 1000).toFixed(3));
            this.trnOrgVol = parseFloat(((this.trnOrgVol * 1000 - data.trnOrgVol * 1000) / 1000).toFixed(3));
          }
        }
      } else {
        this.trnReqOrdQty = 0;
        this.trnOrgWght = 0;
        this.trnOrgVol = 0;
      }
    },
    showSelectDate(selectDate) {
      this.selectDate = selectDate;
      this.selectDateShow = this.$vnDateFormatD(this.selectDate);
    },
    sendGridData(gridData) {
      this.gridData = gridData;
      if (this.gridData.inExptDt) {
        this.currentDate = this.$revertDateFormatD(this.gridData.inExptDt);
      }
      this.$modal.show('DatePicker', { page: this.page });
    },
    sendGridCarInfo(jsonRow) {
      jsonRow ? jsonRow : '';
      this.$modal.show('CarNumSearchGridModal', { jsonRow: jsonRow });
    },
    sendCarInfo(carInfo) {
      this.carInfo = carInfo;
    },
    sendDispatchReqList(data) {
      this.dispatchReqList = data;
    },
    okOrNo(result) {
      if (result) {
        if (this.type === 'save') {
          this.$refs.DispatchRequestGrid.saveLayout();
        } else if (this.type === 'reset') {
          this.$refs.DispatchRequestGrid.resetLayout();
        }
      }
    },
    layoutBtn(status) {
      this.ment = '';
      this.type = '';
      if (status.value === 'save') {
        this.type = 'save';
        this.ment = 'message.msgAskSave';
        this.$modal.show('TranAlarmModal');
      } else {
        this.type = 'reset';
        this.ment = 'message.msgAskRefresh';
        this.$modal.show('TranAlarmModal');
      }
      this.layoutValue = { text: this.$t('message.btnLayout'), value: '' };
    },
    fixGrid(type) {
      const rows = this.$refs.DispatchRequestGrid.sendJsonRows();
      const isChooseCell = this.$refs.DispatchRequestGrid.isChooseCell();

      if (this.dispatchReqList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (!isChooseCell) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
      } else {
        if (rows.length > 0) {
          this.$refs.DispatchRequestGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
          if (type === 'column') {
            this.isFixColumn = !this.isFixColumn;
          } else if (type === 'row') {
            this.isFixRow = !this.isFixRow;
          }
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
        }
      }
    },
    clickBtn(btn) {
      this.selectProductRows = this.$refs.DispatchRequestGrid.sendCheckedData();
      if (btn === 'cancel') {
        this.dispatchCancel();
      } else if (btn === 'save') {
        this.dispatcSave();
      } else if (btn === 'end') {
        this.dispatchEnd();
      } else if (btn === 'invoice') {
        this.saveInvoiceNum(btn);
      }
    },
    async reSearch() {
      // this.isReSearch = true;
      // this.$emit('isReSearch', this.isReSearch);
      this.$refs.DispatchReqSearch.search();
    },
    setData() {
      this.ids = [];
      this.selectProductRows.forEach(row => {
        this.ids.push(row.id);
      });
    },
    async dispatchCancel() {
      this.setData();
      this.result = this.validation();
      if (this.result.validation) {
        try {
          const param = {
            ids: this.ids,
          };
          const response = await tranApi.cancelEndDipatch(param);
          this.ment = '';
          if (response.data.rs) {
            await this.reSearch();
            this.$EventBus.$emit('openYesModal', 'message.msgCancelDispatch');
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
    async dispatcSave() {
      this.result = this.validation('is');
      if (this.result.validation) {
        try {
          const paramData = [];
          this.selectProductRows.forEach(list => {
            paramData.push({
              trnPlanId: list.id,
              trnCarNum: list.trnCarNum,
              driverPhoneNum: list.driverPhoneNum,
              driverNm: list.driverNm,
              inExptDt: this.$revertDateFormatD(list.inExptDt),
              inExptTi: list.inExptTi ? JSON.parse(list.inExptTi).value : '',
              trnPlnNum: list.trnPlnNum,
            });
          });
          const param = JSON.parse(JSON.stringify(paramData));
          const response = await tranApi.saveReqDipatch(param);
          this.ment = '';
          if (response.data.rs) {
            await this.reSearch();
            this.$EventBus.$emit('openYesModal', 'message.msgSave');
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
    async dispatchEnd() {
      const rows = this.$refs.DispatchRequestGrid.getNewAndChangeData();
      this.result = this.validation('is');
      if (this.result.validation) {
        try {
          if (rows.length > 0) {
            const paramData = [];
            this.selectProductRows.forEach(list => {
              paramData.push({
                trnPlanId: list.id,
                trnCarNum: list.trnCarNum,
                driverPhoneNum: list.driverPhoneNum,
                driverNm: list.driverNm,
                inExptDt: this.$revertDateFormatD(list.inExptDt),
                inExptTi: list.inExptTi ? JSON.parse(list.inExptTi).value : '',
                trnPlnNum: list.trnPlnNum,
              });
            });
            const param = JSON.parse(JSON.stringify(paramData));
            const response = await tranApi.saveReqDipatch(param);
            this.ment = '';
            if (response.data.rs) {
              this.endSave();
            }
          } else {
            this.endSave();
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
    async endSave() {
      this.setData();
      const param = {
        ids: this.ids,
      };
      try {
        const response = await tranApi.saveEndDipatch(param);
        this.ment = '';
        if (response.data.rs) {
          await this.reSearch();
          this.$EventBus.$emit('openYesModal', 'message.msgSuccesDispatchRequest');
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
    async excelDownload() {
      if (this.dispatchReqList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else {
        const excelData = {
          fileNm: 'DispatchRequest-Excel.xlsx',
          showProgress: true,
          progressMessage: 'Exporting..',
          indicator: 'hidden',
          header: 'default',
          footer: 'hidden',
          compatibility: true,
          exportTemplate: true,
        };
        this.$refs.DispatchRequestGrid.excelExport(excelData);
      }
    },
    openForwardingDetail(trnPlnInfo) {
      if (trnPlnInfo.outStatCd !== defs.outStatCd.trnReq) {
        this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnInfo.trnPlnNum, readOnly: true });
      } else {
        this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnInfo.trnPlnNum, readOnly: false });
      }
    },
    openForwardingCustCar(trnPlnInfo) {
      this.$modal.show(`ForwardingCustCarModal${this.page}`, { info: trnPlnInfo });
    },
    async reloadSearch() {
      await this.reSearch();
    },
    async saveInvoiceNum(type) {
      let result = this.validation(type);
      if (result.validation) {
        try {
          const param = {
            trnPlnNum: this.selectProductRows[0].trnPlnNum,
          };
          await tranApi.saveInvoiceNum(param);
          await this.reSearch();
          this.$EventBus.$emit('openYesModal', 'message.msgSaveInvoiceNum');
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
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.DispatchRequestGrid.setFilter(this.filterOn);
    },
  },
  created() {},
  mounted() {
    this.getRouterLanguage();
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
