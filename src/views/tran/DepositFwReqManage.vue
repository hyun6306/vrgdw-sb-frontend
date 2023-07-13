<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label class="filter_type" for="">
              <span class="filter_type_title">{{ $t('message.plant') }}</span>
              <MultipleSelect ref="plntMultiple" :all="true" :options="plntCdOptions" @select="setPlants" />
            </label>
            <label class="filter_type" for="">
              <span class="filter_type_title">{{ $t('message.orderDate') }}</span>
              <!-- 데이터피커 -->
              <div class="form_calendar w_100 essential" @click="datePicker('DatePicker')">
                <input v-model="orderTime.show" placeholder="" type="text" />
                <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
              </div>
            </label>
            <label class="filter_type" for="">
              <span class="filter_type_title">{{ $t('message.inquireTarget') }}</span>
              <MultipleSelect ref="statMulitple" :all="true" :options="stateOptions" @select="setStatus" />
            </label>
            <button v-if="authButton.schAuth == 'Y'" class="btn_reset" @click="searchList('reset')">
              {{ $t('message.btnInit') }}
            </button>
            <button v-if="authButton.schAuth == 'Y'" class="btn_search_text ml-0" @click="searchList('search')">
              {{ $t('message.btnSearch') }}
            </button>
          </div>
        </div>
      </div>
      <!-- <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button> -->
    </div>
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container09">
      <div class="real_head">
        <div class="real_head_left">
          <small
            >{{ $t('message.totalSelection1') }}<i>{{ totalRowCount }}</i
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
          <!-- <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_filter.png" />
            <span>Filter</span>
          </button> -->
          <!-- <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_trace.png" />
            <span>{{ $t('button.deleteChoose') }}<i>(2)</i></span>
          </button> -->
          <!-- drop down -->
          <MultiSelect id="Material_Group" v-model="layoutValue" :close-on-select="false" :options="layoutOptions" :searchable="false" :show-labels="false" class="btn_select_layout" label="text" style="width: 100%" @input="layoutSave"></MultiSelect>
          <!-- //drop down -->
        </div>
      </div>
      <div class="real_body real_body04">
        <DepositFwReqManageGrid ref="DepositFwReqManageGrid" :defaultDate="orderTime" :gridLang="gridLang" :layoutData="layoutData" :menuId="menuId" :savePage="savePage" style="height: 100%" @gridMent="gridMent" @sendCheckedData="sendCheckedData" @sendRowCount="sendRowCount" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button v-if="authButton.exlAuth == 'Y'" class="btn_default btn_function" @click="excelDL">
            {{ $t('message.btnDownloadExcel') }}
          </button>
        </div>
        <div class="footer_right">
          <!-- <button class="btn_default btn_temp" @click="depFwCancel">예탁출고 확정취소</button> -->
          <button v-if="authButton.fn2Auth == 'Y'" class="btn_default btn_critical_process" @click="validation('cancel')">
            {{ $t('message.btnDepositCancel') }}
          </button>
          <button v-if="authButton.fn1Auth == 'Y'" class="btn_default btn_critical_process" @click="validation('save')">
            {{ $t('message.btnDepositConfirm') }}
          </button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <!-- <DetailAlarmModal :ment="ment" @modalReturn="modalReturn" /> -->
    <DetailCommentModal :ment="ment" :modalType="'message.orderRemark'" />
    <TranAlarmYesModal :ment="ment" />
    <TranAlarmModal :ment="ment" :type="layoutData" @okOrNo="okOrNo" />
    <DateRangePickerModal :after="true" :default="this.default" @selectDateRange="getDate" />
    <AlarmModal :ment="ment" :page="page" @okOrNo="result => warningConfirm(result)" />
  </div>
</template>

<script>
import { loadLanguageAsync } from '@/plugins/i18n';

import DepositFwReqManageGrid from '@/components/gridView/tran/DepositFwReqManageGrid';
// import DetailAlarmModal from '@/modal/detail/DetailAlarmModal';
import TranAlarmModal from '@/modal/tran/TranAlarmModal';
import DetailCommentModal from '@/modal/detail/DetailCommentModal';
import TranAlarmYesModal from '@/modal/tran/TranAlarmYesModal';
import DateRangePickerModal from '@/modal/sales/DateRangePickerModal.vue';
import commonApi from '@/api/common';
import tranApi from '@/api/tran/tran';
import dayjs from 'dayjs';
import MultipleSelect from '@/components/commonComponent/MultipleSelect';
import languageApi from '@/api/language';
import defs from '@/consts/defs';
import AlarmModal from '@/modal/AlarmModal.vue';

export default {
  components: {
    AlarmModal,
    DepositFwReqManageGrid,
    DateRangePickerModal,
    // DetailAlarmModal,
    TranAlarmModal,
    TranAlarmYesModal,
    MultipleSelect,
    DetailCommentModal,
  },
  data() {
    return {
      filterOn: true,
      ment: '',
      checkedData: [],
      //레이아웃
      layoutValue: { value: 'layout', text: this.$i18n.t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$i18n.t('message.btnSave') },
        { value: 'reset', text: this.$i18n.t('message.btnInit') },
      ],
      layoutData: '',
      //플랜트
      plntCdOptions: [],
      plntCd: [],
      //조회대상
      stateOptions: [],
      statCd: [],
      //날짜
      timeInfo: [],
      orderTime: '',
      default: 'aroundMonth',
      //열고정,행고정
      isFixColumn: false,
      isFixRow: false,
      totalRowCount: 0,
      //그리드 다국어
      gridLang: [],
      exptStatCd: defs.exptStatCd,
    };
  },
  props: {
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
    authButton: {
      type: Object,
    },
  },
  watch: {
    timeInfo(time) {
      this.orderTime = time[time.length - 1];
    },
  },
  methods: {
    //기본
    customLabel(option) {
      return `${option.library}`;
    },
    isSelected(option) {
      return this.value.some(op => op.library === option.library);
    },
    datePicker() {
      // this.oldDate = this.time;
      this.$modal.show('PriceDateRangePicker');
    },
    getDate(timeInfo) {
      // this.timeInfo = timeInfo;
      this.default = '';
      this.timeInfo.push(timeInfo);
    },
    sendRowCount(count) {
      //아이템 수
      this.totalRowCount = count;
    },
    sendCheckedData(data) {
      this.checkedData = data;
    },
    gridMent(ment) {
      //주문특이사항 멘트
      this.ment = ment;
      this.$modal.show('DetailCommentModal');
    },
    fixGrid(type) {
      //열고정,행공정
      if (this.$refs.DepositFwReqManageGrid.focusCheck()) {
        const rows = this.$refs.DepositFwReqManageGrid.sendJsonRows();
        if (rows.length > 0) {
          this.$refs.DepositFwReqManageGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
          if (type === 'column') {
            this.isFixColumn = !this.isFixColumn;
          } else if (type === 'row') {
            this.isFixRow = !this.isFixRow;
          }
        } else {
          this.ment = 'message.msgNoProduct';
          this.$modal.show('TranAlarmYesModal');
        }
      } else {
        this.ment = 'message.msgNoSelection';
        this.$modal.show('TranAlarmYesModal');
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
    //추가
    async searchList(type) {
      this.$refs.DepositFwReqManageGrid.focusReset();
      if (type == 'reset') {
        this.$refs.plntMultiple.select({ value: 'reset' });
        this.$refs.statMulitple.select({ value: 'reset' });
        this.default = 'aroundMonth';
        this.orderTime = this.timeInfo[0];
      } else {
        let reqStatCd = [];
        let reqPlntCd = [];
        if (!this.plntCd || this.plntCd.length < 1) {
          this.ment = 'message.msgNoPlntCd';
          this.$modal.show('TranAlarmYesModal');
        } else {
          this.plntCd.forEach(data => {
            reqPlntCd.push(data.value);
          });
          if (!this.statCd || this.statCd.length < 1) {
            this.ment = 'message.msgNoInqurTarget';
            this.$modal.show('TranAlarmYesModal');
          } else {
            this.statCd.forEach(data => {
              reqStatCd.push(data.value);
            });
            let param = {
              upPlntCd: reqPlntCd,
              sttDt: this.orderTime.time[0],
              endDt: this.orderTime.time[1],
              reqStatCd: reqStatCd,
            };
            this.$refs.DepositFwReqManageGrid.getList(param);
          }
        }
      }
    },
    async plantList() {
      let param = {};
      try {
        const resp = await commonApi.getPlantCombo(param);
        this.plntCdOptions = resp.data.ds;
        this.plntCdOptions.unshift({ text: this.$i18n.t('message.all'), value: 'ALL00' });
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setPlants(cd) {
      this.plntCd = cd;
      if (this.plntCdOptions.length === this.plntCd.length) {
        this.plntCd = this.plntCdOptions.slice(1);
      }
    },
    async stateList() {
      let param = {
        groupCd: 'EXPT_STATUS',
        useYn: 'Y',
        prntCd: '',
      };
      try {
        const resp = await commonApi.getCommonCodeCombo(param);

        this.stateOptions = resp.data.ds.filter(option => option.value === this.exptStatCd.request || option.value === this.exptStatCd.confirm);
        this.stateOptions.unshift({ text: this.$i18n.t('message.all'), value: 'ALL00' });
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setStatus(cd) {
      this.statCd = cd;
      if (this.stateOptions.length === this.statCd.length) {
        this.statCd = this.stateOptions.slice(1);
      }
    },
    async depFwSave() {
      this.$refs.DepositFwReqManageGrid.sendCheckedData();
      let param = [];
      this.checkedData.forEach(row => {
        param.push({
          id: row.id,
          bokngId: row.bokngId,
          bokngSoNum: row.bokngSoNum,
          bokngSoItemNum: row.bokngSoItemNum.toString().padStart(6, '0'),
          trnReqBaseQty: row.trnReqBaseQty,
        });
      });
      try {
        await tranApi.putdepFwReqSave(param);
        this.ment = 'message.msgDepsFwConfirm';
        await this.searchList();
        this.$modal.show('TranAlarmYesModal');
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    validation(is) {
      this.$refs.DepositFwReqManageGrid.sendCheckedData();
      let checkedRows = this.$refs.DepositFwReqManageGrid.sendChecked();
      if (!checkedRows) {
        this.ment = 'message.msgNoSelect';
        this.$modal.show('TranAlarmYesModal');
        return false;
      } else {
        let exptConfirm = false;
        this.checkedData.forEach(list => {
          if (list.reqStatCd === defs.exptStatCd.confirm || (list.trnDoNum && list.trnDoNum !== '')) {
            exptConfirm = true;
          }
        });
        if (exptConfirm) {
          this.ment = 'message.msgDepsFwStatusConfirm';
          this.$modal.show('TranAlarmYesModal');
          return false;
        }
        if (is === 'cancel') {
          this.depFwCancel();
        } else if (is === 'save') {
          this.ment = 'message.msgWarnCreatePreGi';
          this.$modal.show(`AlarmModal${this.page}`);
        }
      }
    },
    async depFwCancel() {
      let param = [];
      this.checkedData.forEach(row => {
        param.push({
          id: row.id,
          bokngId: row.bokngId,
        });
      });
      try {
        await tranApi.putdepFwReqCancle(param);

        this.ment = 'message.msgDepsFwCancel';
        await this.searchList();
        this.$modal.show('TranAlarmYesModal');
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    layoutSave(type) {
      //레이아웃 변경
      this.layoutData = type.value;
      if (this.layoutData == 'reset') {
        this.ment = 'message.msgAskRefresh';
      } else {
        this.ment = 'message.msgAskSave';
      }
      this.layoutValue = { value: 'layout', text: this.$i18n.t('message.btnLayout') };
      this.$modal.show('TranAlarmModal');
    },
    okOrNo(Yn) {
      if (Yn) {
        this.$refs.DepositFwReqManageGrid.saveLayout(this.layoutData);
      }
    },
    excelDL() {
      const excelData = {
        fileNm: `depFwReqManageExcel${dayjs().format('DD-MM-YYYY')}.xlsx`,
        showProgress: true,
        progressMessage: 'Exporting..',
        indicator: 'hidden',
        header: 'default',
        footer: 'hidden',
        compatibility: true,
      };
      this.$refs.DepositFwReqManageGrid.excelExport(excelData);
    },
    showModal() {
      this.$modal.show('TranAlarmYesModal');
    },

    async openPopup(modalNm) {
      let url = '/modal/tranModal';
      if (url !== '') {
        try {
          const resp = await loadLanguageAsync(url, this.menuId);
          resp;
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
      this.$modal.show(modalNm);
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.DepositFwReqManageGrid.setFilter(this.filterOn);
    },
    warningConfirm(result) {
      if (result) this.depFwSave();
    },
  },
  created() {
    this.plantList();
    this.stateList();
    this.getGridMutiLanguage();
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
