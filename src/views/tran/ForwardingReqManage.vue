<template>
  <div>
    <!-- 검색필터 영역 -->
    <ForwardingSearch ref="search" :commonCodes="commonCodes" :openInfo="openInfo" @onSearch="handleSearch" @searchOpenChange="setSearchOpenChange" :authButton="authButton" />
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div :class="[searchOpen ? 'realgrid_container realgrid_container09' : 'realgrid_container realgrid_container09 padding-on']">
      <div class="real_head">
        <div class="real_head_left">
          <!-- <small>{{ $t('message.fwdReqList') }}</small> -->
          <small class=""
            >{{ $t('message.totalSelection1') }}<i>{{ fwardingRows.length }}</i
            >{{ $t('message.totalSelection2') }}</small
          >
          <small class="ml-30"
            >{{ $t('message.fwdQty') }} <i>{{ checkedQty }}</i></small
          >
          <small class="ml-30"
            >{{ $t('message.trnOrgWght') }}<i>{{ checkedWght }}</i
            >T</small
          >
          <small class="ml-30"
            >{{ $t('message.trnOrgVol') }}<i>{{ checkedVol }}</i
            >M3</small
          >
        </div>
        <!--        <div class="real_head_right">-->
        <!--          <button class="btn_default btn_deep_green">버튼 1</button>-->
        <!--        </div>-->
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
        <ForwardingGrid ref="ForwardingGrid" :commonCodes="commonCodes" :gridLang="gridLang" :gridName="'ForwardingGrid'" :menuId="menuId" :page="page" :requestList="requestList" :savePage="savePage" :selectDate="selectDate" :selectDateShow="selectDateShow" style="height: 100%" @openForwardingCustCar="openForwardingCustCar" @openForwardingDetail="openForwardingDetail" @openSingleCalendar="openSingleCalendar" @sendCheckedData="sendCheckedData" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button v-if="authButton.fn4Auth === 'Y'" class="btn_default btn_function" @click="$modal.show('ForwardingEtcRegistModal')">
            {{ $t('message.btnEtcOrdRegist') }}
          </button>
          <button v-if="authButton.fn4Auth === 'Y'" class="btn_default btn_function" @click="$modal.show('ExcelUploadModal')">
            {{ $t('message.btnEtcOrdUpload') }}
          </button>
          <button v-if="authButton.exlAuth === 'Y'" class="btn_default btn_function" @click="download">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right">
          <button v-if="authButton.delAuth === 'Y'" class="btn_default btn_function" @click="validation('forwardingReqCancel')">
            {{ $t('message.btnCancelFwdReq') }}
          </button>
          <button v-if="authButton.savAuth === 'Y'" class="btn_default btn_function" @click="validation('save')">{{ $t('message.btnSave') }}</button>
          <button v-if="authButton.fn1Auth === 'Y'" class="btn_default btn_function" @click="validation('forwardingSplit')">{{ $t('message.btnFwdQtySplit') }}</button>
          <button v-if="authButton.fn2Auth === 'Y'" class="btn_default btn_process" @click="validation('tranCustSelect')">{{ $t('message.btnTranCusSelect') }}</button>
          <button v-if="authButton.fn2Auth === 'Y'" class="btn_default btn_process" @click="validation('custCarSelect')">{{ $t('message.btnCustCarSelect') }}</button>
          <button v-if="authButton.fn3Auth === 'Y'" class="btn_default btn_critical_process" @click="validation('dispathReq')">{{ $t('message.btnDispatchReq') }}</button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->

    <DatePickerModal :isDefault="false" @chooseDate="chooseDate" />
    <!-- 운송사 선택 -->
    <ForwardingAgentModal :menuId="menuId" :page="page" />
    <!-- 고객차량 선택 -->
    <ForwardingCustCarModal :menuId="menuId" :page="page" />
    <!-- 출고상세 -->
    <ForwardingDetailModal :menuId="menuId" :page="page" />
    <!-- 기타출고 -->
    <ForwardingEtcRegistModal :commonCodes="commonCodes" :menuId="menuId" />
    <PriceAlarmModal />
    <ExcelUpLoadModal />
    <DeliveryInfoModal :page="page" :menuId="menuId" />
  </div>
</template>

<script>
import ForwardingSearch from '@/components/tran/ForwardingSearch';
import ForwardingGrid from '@/components/gridView/tran/ForwardingGrid';
import ForwardingAgentModal from '@/modal/tran/ForwardingAgentModal';
import ForwardingCustCarModal from '@/modal/tran/ForwardingCustCarModal';
import ForwardingDetailModal from '@/modal/tran/ForwardingDetailModal';
import ForwardingEtcRegistModal from '@/modal/tran/ForwardingEtcRegistModal';
import getCommonCodeJs from '@/mixins/tran/getCommonCode';
import PriceAlarmModal from '@/modal/sales/PriceAlarmModal';
import DatePickerModal from '@/modal/DatePickerModal';
import fileDownload from '@/mixins/fileDownload';
import fileApi from '@/api/file';
import tranApi from '@/api/tran/tran';
import commonApi from '@/api/common';
import defs from '@/consts/defs';
import languageApi from '@/api/language';
import ExcelUpLoadModal from '@/modal/tran/ExcelUploadModal';
import DeliveryInfoModal from '@/modal/tran/DeliveryInfoModal';

function roundToTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2');
}

export default {
  components: {
    ForwardingSearch,
    ForwardingGrid,
    DatePickerModal,
    ForwardingAgentModal,
    ForwardingDetailModal,
    ForwardingEtcRegistModal,
    PriceAlarmModal,
    ExcelUpLoadModal,
    ForwardingCustCarModal,
    DeliveryInfoModal,
  },
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  mixins: [getCommonCodeJs],
  computed: {
    checkedQty() {
      return roundToTwo(this.fwardingRows.reduce((acc, curr) => acc + Number(curr.trnReqOrdQty ?? 0), 0));
    },
    checkedWght() {
      return roundToTwo(this.fwardingRows.reduce((acc, curr) => acc + Number(curr.trnReqWght ?? 0), 0));
    },
    checkedVol() {
      return roundToTwo(this.fwardingRows.reduce((acc, curr) => acc + Number(curr.trnReqVol ?? 0), 0));
    },
  },
  data() {
    return {
      filterOn: true,
      searchOpen: true,
      layoutOpen: false,
      value: [],
      //열고정,행고정
      isFixColumn: false,
      isFixRow: false,
      //레이아웃
      selectLayout: { text: this.$i18n.t('message.btnLayout'), value: '' },
      selectLayoutOptions: [
        { text: this.$i18n.t('message.btnSave'), value: 'SAVE' },
        { text: this.$i18n.t('message.btnInit'), value: 'RESET' },
      ],
      layoutData: false,
      totalRowCount: 0,
      ment: '',

      requestList: [],
      selectDate: '',
      selectDateShow: '',
      gridLang: [],
      fwardingRows: [],
      openSelectDate: '',
      currentDate: '',
      outStatCd: defs.outStatCd,
      trnClsCd: defs.trnClsCd,
      isMessage: '',
    };
  },
  methods: {
    fwdDtlsModal(trnPlnNum) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnNum, readOnly: true });
    },
    deliveryInfoModal(trnNum) {
      this.$modal.show(`DeliveryInfoModal${this.page}`, { trnNum: trnNum });
    },
    fixGrid(type) {
      if (this.validation()) {
        this.$refs.ForwardingGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
        if (type === 'column') {
          this.isFixColumn = !this.isFixColumn;
        } else if (type === 'row') {
          this.isFixRow = !this.isFixRow;
        }
      }
    },
    validation(is = '', beforeSave = false) {
      this.$refs.ForwardingGrid.gridCommit();
      const rows = this.$refs.ForwardingGrid.sendJsonRows();
      const isChooseCell = this.$refs.ForwardingGrid.isChooseCell();
      const isChecked = this.$refs.ForwardingGrid.sendChecked();

      let checkedRows = this.$refs.ForwardingGrid.sendCheckedData();
      let distinctCheckedRows = checkedRows.filter((row1, index1) => {
        return (
          checkedRows.findIndex(row2 => {
            return row1.trnPlnNum === row2.trnPlnNum;
          }) === index1
        );
      });
      if (rows.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
        return false;
      } else if (!isChooseCell && is === '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
        return false;
      } else if (!isChecked && is !== '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoItem');
        return false;
      } else if (is === 'forwardingReqCancel' || is === 'save' || is === 'forwardingSplit') {
        let notStat = false;
        let existTrnPlnNum = false;
        let noDtAt = false;
        let isDeposit = false;
        let noSpltQty = false;
        // let isEtc = false;
        let isNotSameDate = false;

        checkedRows.forEach(list => {
          if (list.outStatCd !== this.outStatCd.trnReq) {
            notStat = true;
          } else if (list.trnPlnNum !== '') {
            existTrnPlnNum = true;
          } else if (is === 'save' && (list.trnPsbDt === null || list.trnPsbTi === null || (list.inPsbDt === null) | (list.inPsbTi === null))) {
            noDtAt = true;
          }
          if (!list.trnSpltQty || list.trnSpltQty < 1) {
            noSpltQty = true;
          }
          // if (list.trnClsCd === this.trnClsCd.etc) {
          //   isEtc = true;
          // }
          // if (list.trnClsCd === this.trnClsCd.deposit) {
          //   isDeposit = true;
          // }
          distinctCheckedRows.forEach(row => {
            if (row.trnPlnNum !== '' && row.trnPlnNum === list.trnPlnNum) {
              if (row.trnPsbDt !== list.trnPsbDt || row.trnPsbTi !== list.trnPsbTi || row.inPsbDt !== list.inPsbDt || row.inPsbTi !== list.inPsbTi) {
                isNotSameDate = true;
              }
            }
          });
        });
        if (notStat) {
          this.$EventBus.$emit('openYesWideModal', this.$t('message.msgValidStatusFwd'));
          return false;
        } else if (existTrnPlnNum) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidTrnPlnNum'));
          return false;
        } else if (noDtAt) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidDate'));
          return false;
        } else if (is === 'forwardingReqCancel' && isDeposit) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidCancelDeposit'));
          return false;
        } else if (noSpltQty && is === 'forwardingSplit') {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgNoSplitQty'));
          return false;
        }
        if (is === 'save' && isNotSameDate) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgNotSameDate'));
          return false;
        }
        // else if (isEtc && is === 'forwardingSplit') {
        //   this.$EventBus.$emit('openYesModal', this.$t('message.msgNoSplitEtc'));
        //   return false;
        // }
        if (is === 'forwardingReqCancel') {
          this.saveForwardingReqCancel(checkedRows);
        } else if (is === 'save') {
          this.saveForwardingReq(checkedRows, beforeSave);
        } else if (is === 'forwardingSplit') {
          this.saveQtySplit(checkedRows);
        }
      } else if (is === 'dispathReq') {
        let notStat = false;
        let notTrnPlnNum = false;
        let noDtAt = false;
        let updatedRow = this.$refs.ForwardingGrid.getNewAndChangeData();
        let existUpdatedRow = false;
        let isNotSameDate = false;
        checkedRows.forEach(list => {
          // let trnCarType = JSON.parse(list.trnCarType);
          if (list.outStatCd !== this.outStatCd.trnReq) {
            notStat = true;
          } else if (list.trnPlnNum === null || list.trnPlnNum === '' || !list.trnPlnNum) {
            notTrnPlnNum = true;
          } else if (list.trnPsbDt === null || list.trnPsbTi === null || (list.inPsbDt === null) | (list.inPsbTi === null)) {
            noDtAt = true;
          } else if (updatedRow.some(row => row.id === list.id)) {
            existUpdatedRow = true;
          }
          distinctCheckedRows.forEach(row => {
            if (row.trnPlnNum !== '' && row.trnPlnNum === list.trnPlnNum) {
              if (row.trnPsbDt !== list.trnPsbDt || row.trnPsbTi !== list.trnPsbTi || row.inPsbDt !== list.inPsbDt || row.inPsbTi !== list.inPsbTi) {
                isNotSameDate = true;
              }
            }
          });
        });
        if (notStat) {
          this.$EventBus.$emit('openYesWideModal', this.$t('message.msgValidStatusFwd'));
          return false;
        } else if (notTrnPlnNum) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidTrnPlnNum2'));
          return false;
        } else if (noDtAt) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidDate'));
          return false;
        } else if (existUpdatedRow) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidSave'));
          return false;
        } else if (isNotSameDate) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgNotSameDate'));
          return false;
        }

        this.saveDispatchReq(checkedRows);
      } else if (is === 'tranCustSelect') {
        let notStat = false;
        let existTrnPlnNum = false;
        let cityDistr = {};
        let notSameCityDistr = false;
        let notVrgdw = false;
        let noDtAt = false;
        let updatedRow = this.$refs.ForwardingGrid.getNewAndChangeData();
        // let existUpdatedRow = false;
        let isPo = false;
        let notPo = false;
        checkedRows.forEach((list, index) => {
          if (index === 0) {
            cityDistr.cityCd = list.cityCd;
            cityDistr.distrCd = list.distrCd;
          }
          let trnCarType = JSON.parse(list.trnCarType);
          if (list.outStatCd !== this.outStatCd.trnReq) {
            notStat = true;
          } else if (list.trnPlnNum !== '' || list.trnPlnNum) {
            existTrnPlnNum = true;
          } else if (index > 0 && (cityDistr.cityCd !== list.cityCd || cityDistr.distrCd !== list.distrCd)) {
            notSameCityDistr = true;
          } else if (trnCarType.value !== 'VRGDW') {
            notVrgdw = true;
          } else if (list.trnPsbDt === null || list.trnPsbTi === null || (list.inPsbDt === null) | (list.inPsbTi === null)) {
            noDtAt = true;
          } else if (updatedRow.some(row => row.id === list.id)) {
            // existUpdatedRow = true;
          }
          if (list.trnClsCd === this.trnClsCd.move) {
            isPo = true;
          } else {
            notPo = true;
          }
        });

        if (notStat) {
          this.$EventBus.$emit('openYesWideModal', this.$t('message.msgValidStatusFwd'));
          return false;
        } else if (existTrnPlnNum) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidTrnPlnNum'));
          return false;
        } else if (notSameCityDistr) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidDifCity'));
          return false;
        } else if (notVrgdw) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidCarTypeVrgdw'));
          return false;
        } else if (noDtAt) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidDate'));
          return false;
        }
        // else if (existUpdatedRow) {
        //   this.$EventBus.$emit('openYesModal', this.$t('message.msgValidSave'));
        //   return false;
        // }
        else if (isPo && notPo) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidPoWithOther'));
          return false;
        }

        const ids = [];
        checkedRows.forEach(list => {
          ids.push(list.id);
        });
        this.validation('save', true);
        this.$modal.show('ForwardingAgentModal', { ids });
      } else if (is === 'custCarSelect') {
        let notStat = false;
        let notCustom = false;
        let noDtAt = false;
        let isPo = false;
        let notPo = false;
        let trnCarNum = '';
        let notSameCarNum = false;
        let cityDistr = {};
        let notSameCityDistr = false;
        let existTrnPlnNum = false;

        checkedRows.forEach((list, index) => {
          if (index === 0) {
            trnCarNum = list.trnCarNum;

            cityDistr.cityCd = list.cityCd;
            cityDistr.distrCd = list.distrCd;
          }

          let trnCarType = JSON.parse(list.trnCarType);
          if (list.outStatCd !== this.outStatCd.trnReq) {
            notStat = true;
          } else if (trnCarType.value === 'VRGDW') {
            notCustom = true;
          } else if (list.trnPlnNum !== '' || list.trnPlnNum) {
            existTrnPlnNum = true;
          } else if (list.trnPsbDt === null || list.trnPsbTi === null || (list.inPsbDt === null) | (list.inPsbTi === null)) {
            noDtAt = true;
          } else if (index > 0 && (cityDistr.cityCd !== list.cityCd || cityDistr.distrCd !== list.distrCd)) {
            notSameCityDistr = true;
          }
          if (list.trnClsCd === this.trnClsCd.move) {
            isPo = true;
          } else {
            notPo = true;
          }
          if (trnCarNum !== list.trnCarNum) {
            notSameCarNum = true;
          }
        });

        if (notStat) {
          this.$EventBus.$emit('openYesWideModal', this.$t('message.msgValidStatusFwd'));
          return false;
        } else if (notCustom) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidCarTypeCustom'));
          return false;
        } else if (existTrnPlnNum) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidTrnPlnNum'));
          return false;
        } else if (noDtAt) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidDate'));
          return false;
        } else if (notSameCityDistr) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidDifCity'));
          return false;
        } else if (isPo && notPo) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidPoWithOther'));
          return false;
        } else if (notSameCarNum) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgValidSameCarNum'));
          return false;
        }

        const ids = [];
        checkedRows.forEach(list => {
          ids.push(list.id);
        });
        this.validation('save', true);
        this.$modal.show(`ForwardingCustCarModal${this.page}`, { ids, info: checkedRows[0] });
      } else {
        return true;
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
      if (result) {
        if (type === 'reset' || type === 'update') {
          this.$refs.ForwardingGrid.resetLayout();
        }
        try {
          const column = this.$refs.ForwardingGrid.getLayout();
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
    setSearchOpenChange(searchOpen) {
      this.searchOpen = searchOpen;
    },
    sendCheckedData(selectRows) {
      this.fwardingRows = selectRows;
    },
    showSelectDate(selectDate) {
      this.selectDate = selectDate;
      this.selectDateShow = this.$vnDateFormatD(this.selectDate);
    },

    openSingleCalendar(data) {
      this.$modal.show('DatePicker', { type: data.type, currentDate: data.currentDate, page: this.page });
    },
    chooseDate(date, type) {
      let info = JSON.parse(type);
      this.$refs.ForwardingGrid.setDate(date, info);
    },
    handleSearch(params) {
      this.clear();
      this.$refs.ForwardingGrid.clearAllCheck();
      this.getRequestList(params);
    },
    clear() {
      this.requestList = [];
      this.fwardingRows = [];
    },
    async getRequestList(params = {}) {
      try {
        const response = await tranApi.getRequestList({
          outStatCd: '',
          upPlntCd: '',
          dateCls: '',
          sttDt: '',
          endDt: '',
          trnCarType: '',
          trnClsCd: '',
          custCd: '',
          offrClsCd: '',
          filter: '',
          ids: '',
          ...params,
        });
        this.requestList = response.data.ds;
        if (this.isMessage === 'save') {
          this.$EventBus.$emit('openYesModal', 'message.msgSaveTran');
        } else if (this.isMessage === 'split') {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgSplitQty'));
        } else if (this.isMessage === 'dispatchReq') {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgDispatchReq'));
        } else if (this.isMessage === 'saveInfo') {
          this.$EventBus.$emit('openYesModal', 'message.msgSave');
        } else if (this.isMessage === 'saveEtc') {
          this.$EventBus.$emit('openYesModal', 'message.msgSave');
        } else if (this.isMessage === 'cancel') {
          this.$EventBus.$emit('openYesModal', 'message.msgCancel');
        }
        this.isMessage = '';
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async saveForwardingReqCancel(checkedRows) {
      try {
        const param = [];
        checkedRows.forEach(list => {
          let data = {
            id: list.id,
            offrId: list.offrId,
            offrNum: list.offrNum,
          };
          param.push(data);
        });
        await tranApi.saveForwardingReqCancel(param);
        await this.$refs.search.search();
        this.$EventBus.$emit('openYesModal', this.$t('message.msgFwdReqCancel'));
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async saveDispatchReq(checkedRows) {
      try {
        const param = { ids: [] };
        checkedRows.forEach(list => {
          param.ids.push(list.id);
        });
        await tranApi.saveDispatchReq(param);
        this.$refs.search.search();
        this.isMessage = 'dispatchReq';
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async reloadSearch(type = '') {
      await this.$refs.search.search();
      if (type === 'save') {
        this.isMessage = 'save';
      } else if (type === 'saveEtc') {
        this.isMessage = 'saveEtc';
      } else if (type === 'cancel') {
        this.isMessage = 'cancel';
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
      const rows = this.$refs.ForwardingGrid.sendJsonRows();
      const ids = [];
      rows.forEach(row => {
        if (row.trnPlnNum === trnPlnInfo.trnPlnNum) {
          ids.push(row.id);
        }
      });
      this.$modal.show(`ForwardingCustCarModal${this.page}`, { ids, info: trnPlnInfo });
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
    async saveForwardingReq(checkedRows, beforeSave) {
      try {
        const param = [];
        checkedRows.forEach(list => {
          let trnCarType = list.trnCarType;
          let trnPsbTi = list.trnPsbTi;
          let inPsbTi = list.inPsbTi;
          if (trnCarType && trnCarType !== '') {
            trnCarType = JSON.parse(trnCarType);
          }
          if (trnPsbTi && trnPsbTi !== '') {
            trnPsbTi = JSON.parse(trnPsbTi);
          }
          if (inPsbTi && inPsbTi !== '') {
            inPsbTi = JSON.parse(inPsbTi);
          }
          let phoneNumber = '';
          if (list.phoneNum1 && list.phoneNum2 && list.phoneNum3) {
            phoneNumber = list.phoneNum1 + '-' + list.phoneNum2 + '-' + list.phoneNum3;
          }
          let data = {
            id: list.id,
            trnPsbDt: list.trnPsbDt ? this.$revertDateFormatD(list.trnPsbDt) : '',
            trnPsbTi: trnPsbTi?.value ? trnPsbTi.value : '',
            inPsbDt: list.inPsbDt ? this.$revertDateFormatD(list.inPsbDt) : '',
            inPsbTi: inPsbTi?.value ? inPsbTi.value : '',
            trnReqRemark: list.trnReqRemark,
            trnCarType: trnCarType?.value ? trnCarType.value : '',
            logitsAlias: list.logitsAlias,
            postNum: list.postNum,
            cityCd: list.cityCd,
            distrCd: list.distrCd,
            addr: list.addr,
            logitsPhoneNum1: phoneNumber,
          };
          param.push(data);
        });
        await tranApi.saveForwardingReq(param);
        // this.$refs.search.search();
        if (beforeSave) {
          this.isMessage = `${beforeSave}saveInfo`;
        } else {
          this.$refs.search.search();
          this.isMessage = `saveInfo`;
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
    async saveQtySplit(checkedRows) {
      try {
        const param = [];
        checkedRows.forEach(list => {
          let data = {
            id: list.id,
            trnSpltQty: list.trnSpltQty,
          };
          param.push(data);
        });
        await tranApi.saveQtySplit(param);
        await this.$refs.search.search();
        this.isMessage = 'split';
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async download() {
      try {
        const fileNm = 'EtcTrnRequest-Upload.xlsx';
        const savePath = '/upload/templete/EtcTrnRequest-Upload.xlsx';
        const resp = await fileApi.download(savePath, fileNm);
        fileDownload.downloadFile(resp, fileNm);
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
      this.$refs.ForwardingGrid.setFilter(this.filterOn);
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
