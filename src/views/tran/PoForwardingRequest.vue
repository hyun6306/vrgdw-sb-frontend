<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label class="filter_type" for="">
              <span class="filter_type_title">{{ $t('message.upPlnt') }}</span>
              <!-- <MultipleSelect class="essential" :options="plntOptions" :all="true" @select="setUpPlntCd" /> -->
              <MultiSelect id="Material_Group" v-model="upPlntCd" :allow-empty="false" :close-on-select="true" :options="plntOptions" :searchable="false" :show-labels="false" class="essential" label="text" placeholder="Pick a value" style="width: 100%" track-by="text"></MultiSelect>
              <!-- <MultipleSelect class="essential" :options="plntOptions" :all="true" @select="setPlnt" /> -->
            </label>
            <label class="filter_type" for="">
              <span class="filter_type_title">{{ $t('message.orderDate') }}</span>
              <!-- 데이터피커 -->
              <div class="form_calendar w_100 essential" @click="datePicker('DatePicker')">
                <input v-model="timeInfo.show" :placeholder="$t('message.selectPeriod')" type="text" />
                <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
              </div>
            </label>
            <button v-if="authButton.schAuth === 'Y'" class="btn_reset" @click="reset()">{{ $t('message.btnInit') }}</button>
            <button v-if="authButton.schAuth === 'Y'" ref="filter" class="btn_search_text ml-0" @click="search()">
              {{ $t('message.btnSearch') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container09">
      <div class="real_head">
        <div class="real_head_left">
          <small>
            {{ $t('message.totalSelection1') }} <i>{{ poRequestList.length }}</i
            >{{ $t('message.totalSelection2') }}
          </small>
        </div>
        <div class="real_head_right">
          <button v-if="authButton.fn1Auth == 'Y'" class="btn_default btn_process" @click="deliveryAllRegist()">
            {{ $t('message.deliveryApplication') }} <i>({{ checkRows }})</i>
          </button>
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
        <PoForwardingGrid ref="PoForwardingGrid" :gridLang="gridLang" :gridName="'PoForwardingGrid'" :menuId="menuId" :page="page" :poRequestList="poRequestList" :savePage="savePage" :selectDate="selectDate" :selectDateShow="selectDateShow" style="height: 100%" @openSingleCalendar="openSingleCalendar" @sendSelectProducts="sendSelectProducts" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button v-if="authButton.exlAuth === 'Y'" class="btn_default btn_function" @click="excelDownload()">
            {{ $t('message.btnDownloadExcel') }}
          </button>
        </div>
        <div class="footer_right">
          <button v-if="this.authButton.fn2Auth == 'Y'" class="btn_default btn_critical_process" @click="savePoConfirm()">{{ $t('message.btnRequestForwarding') }}</button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <DeliveryAllRegistModal :forwardingRows="forwardingRows" :menuId="menuId" :page="page" @isReSearch="isReSearch" @setAllRegist="setAllRegist" />
    <TranAlarmModal :ment="ment" :type="type" @okOrNo="okOrNo" />
    <DateRangePickerModal :after="true" :default="this.default" @selectDateRange="selectDateRange" />
    <DatePickerModal :currentDate="currentDate" @selectDate="showSelectDate" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { loadLanguageAsync } from '@/plugins/i18n';
import PoForwardingGrid from '@/components/gridView/tran/PoForwardingGrid';
import DateRangePickerModal from '@/modal/sales/DateRangePickerModal.vue';
import tranApi from '@/api/tran/tran';
import commonApi from '@/api/common';
import languageApi from '@/api/language';
import TranAlarmModal from '@/modal/tran/TranAlarmModal';
import DeliveryAllRegistModal from '@/modal/tran/DeliveryAllRegistModal';
import DatePickerModal from '@/modal/tran/DatePickerModal';
import days from 'dayjs';
// import MultipleSelect from '@/components/commonComponent/MultipleSelect';

export default {
  components: {
    PoForwardingGrid,
    DateRangePickerModal,
    TranAlarmModal,
    DeliveryAllRegistModal,
    DatePickerModal,
    // MultipleSelect,
  },
  props: {
    authButton: {
      type: Object,
    },
    routerPath: {
      type: String,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    savePage: {
      type: Array,
    },
  },
  data() {
    return {
      filterOn: true,
      poRequestList: [],
      plntOptions: [],
      upPlntCd: [],
      forwardingRows: [],
      checkRows: 0,
      result: '',
      ment: '',
      type: '',
      isFixColumn: false,
      isFixRow: false,
      gridLang: [],
      layoutValue: { value: '', text: this.$t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$t('message.btnSave') },
        { value: 'reset', text: this.$t('message.btnInit') },
      ],
      default: 'month',
      timeInfo: {},
      currentDate: '',
      selectDate: '',
      selectDateShow: '',
      phoneNumCheck: false,
      phoneNum: '',
      plntCdValue: [],
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    async isReSearch() {
      this.search();
    },
    showSelectDate(selectDate) {
      this.selectDate = selectDate;
      this.selectDateShow = this.$vnDateFormatD(this.selectDate);
    },
    openSingleCalendar(currentDate) {
      this.currentDate = currentDate;
      this.$modal.show('DatePicker', { page: 'poForwardingRequest' });
    },
    reset() {
      this.upPlntCd = this.plntOptions[0];
      this.default = 'month';
      const monthStt = this.$vnDateFormatD(days().subtract(1, 'month').format('YYYY-MM-DD'));
      const monthEnd = this.$vnDateFormatD(days().format('YYYY-MM-DD'));
      this.timeInfo.show = monthStt + '~' + monthEnd;
    },
    datePicker() {
      this.$modal.show('PriceDateRangePicker');
    },
    selectDateRange(timeInfo) {
      this.default = '';
      this.timeInfo = timeInfo;
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
      this.forwardingRows = this.$refs.PoForwardingGrid.sendCheckedData();
      const result = { validation: true };
      if (this.poRequestList.length === 0) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (this.forwardingRows.length === 0) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
      }

      if (type === 'show') {
        this.forwardingRows.forEach(row => {
          if (this.forwardingRows[0].upPlntCd !== row.upPlntCd) {
            this.$EventBus.$emit('openYesModal', 'message.msgSelectPlant');
            result.validation = false;
          }
        });
      } else if (type === 'confirm') {
        this.forwardingRows.forEach(row => {
          const phoneNum = row.phoneNum1 ? (row.phoneNum1 + row.phoneNum2 + row.phoneNum3).replace(/[^0-9]/g, '') : '';
          if (!row.trnCarType || row.trnCarType === '') {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoDeliveryType');
          } else if (!row.cityCd || row.cityCd === '' || !row.distrCd || row.distrCd === '' || !row.addr || row.addr === '') {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoAddr');
          } else if (!phoneNum || phoneNum.length < 8) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoLogitsPhoneNum1');
          } else if (!row.trnHopeDt || row.trnHopeDt === '') {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoTrnHopeDt');
          } else if (!row.trnHopeTi || row.trnHopeTi === '') {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgNoTrnHopeTi');
          } else if (row.reqBaseQty == 0) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgConfirmReqBaseQty');
          }
        });
      }
      return result;
    },
    async savePoConfirm() {
      // let poResult = this.$refs.PoForwardingGrid.poValidation();
      this.result = this.validation('confirm');
      if (this.result.validation) {
        try {
          const paramData = [];
          this.forwardingRows.forEach(row => {
            paramData.push({
              compCd: row.compCd,
              sapPoNum: row.sapPoNum,
              itemNum: row.itemNum.toString().padStart(6, '0'),
              trnPsbDt: row.trnPsbDt,
              trnPsbTi: row.trnPsbTi,
              prdtId: row.prdtId,
              prdtCd: row.prdtCd,
              upPlntCd: row.upPlntCd,
              upSiteCd: row.upSiteCd,
              upSavePos: row.upSavePos,
              dwPlntCd: row.dwPlntCd,
              dwSavePos: row.dwSavePos,
              trnReqRemark: row.trnReqRemark,
              reqDt: this.$revertDateFormatD(row.reqDt),
              staffNum: row.staffNum,
              staffNm: row.staffNm,
              logitsAlias: row.logitsAlias,
              cityCd: row.cityCd,
              distrCd: row.distrCd,
              postNum: row.postNum,
              addr: row.addr,
              trnCarType: row.trnCarType ? JSON.parse(row.trnCarType).value : '',
              logitsPhoneNum1: row.phoneNum1 + '-' + row.phoneNum2 + '-' + row.phoneNum3,
              logitsPhoneNum2: row.logitsPhoneNum2,
              trnHopeDt: row.trnHopeDt ? this.$revertDateFormatD(row.trnHopeDt) : '',
              trnHopeTi: row.trnHopeTi ? JSON.parse(row.trnHopeTi).value : '',
              reqBaseQty: row.reqBaseQty,
              reqOrdQty: row.reqOrdQty,
            });
          });
          const param = JSON.parse(JSON.stringify(paramData));
          const response = await tranApi.savePoConfirm(param);
          if (response.data.rs) {
            await this.search();
            this.$EventBus.$emit('openYesModal', 'message.msgRequestSuss');
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
    async deliveryAllRegist() {
      this.$refs.PoForwardingGrid.gridCommit();
      this.result = this.validation('show');
      if (this.result.validation) {
        await loadLanguageAsync('/modal/deliveryApplication', this.menuId);
        this.$modal.show('DeliveryAllRegistModal');
      }
    },
    okOrNo(result) {
      if (result) {
        if (this.type === 'reset') {
          this.$refs.PoForwardingGrid.resetLayout();
        } else {
          this.$refs.PoForwardingGrid.saveLayout();
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
      const rows = this.$refs.PoForwardingGrid.sendJsonRows();
      const isChooseCell = this.$refs.PoForwardingGrid.isChooseCell();

      if (this.poRequestList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (!isChooseCell) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
      } else {
        if (rows.length > 0) {
          this.$refs.PoForwardingGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
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
    clear() {
      this.poRequestList = [];
      this.checkRows = 0;
    },
    async search() {
      this.$refs.PoForwardingGrid.gridCommit();
      if (this.upPlntCd.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoPlntCd');
      } else {
        this.clear();
        this.$refs.filter.blur();
        this.$refs.PoForwardingGrid.clearCheckCount();
        this.getPoRequestList();
      }
    },
    async getPoRequestList() {
      try {
        const param = {
          upPlntCd: this.upPlntCd.value,
          sttDt: this.timeInfo.time[0],
          endDt: this.timeInfo.time[1],
        };
        const response = await tranApi.getPoRequestList(param);
        this.poRequestList = response.data.ds;

        this.ment = '';
        if (response.data.status === 500) {
          this.ment = response.data.message;
          this.$EventBus.$emit('openYesModal', this.ment);
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
    async getPlantCombo() {
      try {
        const param = {};
        const response = await commonApi.getPlantCombo(param);
        this.plntOptions = response.data.ds;
        this.upPlntCd = this.plntOptions[0];
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    sendSelectProducts(selectProductRows) {
      this.checkRows = selectProductRows.length;
    },
    async excelDownload() {
      if (this.poRequestList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else {
        const excelData = {
          fileNm: 'PoForwarding-Excel.xlsx',
          showProgress: true,
          progressMessage: 'Exporting..',
          indicator: 'hidden',
          header: 'default',
          footer: 'hidden',
          compatibility: true,
          exportTemplate: true,
        };
        this.$refs.PoForwardingGrid.excelExport(excelData);
      }
    },
    setAllRegist(param) {
      this.forwardingRows = JSON.parse(JSON.stringify(param));

      this.forwardingRows.forEach((row, index) => {
        this.poRequestList.forEach(list => {
          if (index === 0) {
            list.reqDt = this.$revertDateFormatD(list.reqDt);
            if (list.trnHopeTi) list.trnHopeTi = this.$revertDateFormatD(list.trnHopeTi);
          }
          if (list.sapPoNum === row.sapPoNum && list.itemNum * 1 === row.itemNum * 1) {
            list.trnReqRemark = row.trnReqRemark;
            list.trnCarType = row.trnCarType;
            list.cityCd = row.cityCd;
            list.distrCd = row.distrCd;
            list.postNum = row.postNum;
            list.addr = row.addr;
            list.logitsPhoneNum1 = row.logitsPhoneNum1;
            list.logitsAlias = row.logitsAlias;
            list.trnHopeDt = row.trnHopeDt;
            list.trnHopeTi = row.trnHopeTi;
            list.dwPlntCd = row.plntCd.value;
            list.dwPlntNm = row.plntCd.text;
          }
        });
      });
      this.poRequestList = JSON.parse(JSON.stringify(this.poRequestList));
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.PoForwardingGrid.setFilter(this.filterOn);
    },
  },
  async created() {
    this.getRouterLanguage();
    await this.getPlantCombo();
    await this.search();
  },
  mounted() {
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
