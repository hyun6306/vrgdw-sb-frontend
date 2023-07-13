<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box" ref="search_box_height" :class="{ search_close_01: searchOpen }" :style="`height:${search_box_height}`">
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <label for="" class="filter_type">
              <!-- 플랜트 -->
              <span class="filter_type_title">{{ $t('message.plant') }}</span>
              <MultipleSelect ref="outStatMulti1" v-model="plntCd" :all="true" id="Material_Group" class="essential" style="width: 100%" @select="setPlant" :options="selectPlnt" :searchable="false" :close-on-select="false" :show-labels="false" :allow-empty="false" label="text" />
            </label>
            <!-- SB 기준 고객사검색 -->
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.cust') }}</span>
              <div class="form_inputnbtn">
                <input type="text" @keyup.enter="clientSearch" v-model="custNm" class="t-l" id="clientSearch" />
                <button style="height: 26px" class="btn_search_basic_info" @click="clientSearch"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
            <!-- 영업로그인 -->
            <!-- <label for="" class="filter_type">
              <span class="filter_type_title">고객사</span>
              <input type="text" id="postal_code" style="" class="t-r" placeholder="000000" />
              <button class="btn_search"><img src="@/assets/img/icon_search_w.png" /></button>
            </label> -->
            <label for="" class="filter_type">
              <!-- 출고상태 -->
              <span class="filter_type_title">{{ $t('message.outStat') }}</span>
              <MultipleSelect ref="outStatMulti2" :default="this.default" @select="setOutStat" :all="true" id="" style="width: 305px" :options="outStatList" :searchable="false" :close-on-select="false" :show-labels="false" :allow-empty="false" label="text" />
            </label>
            <div v-if="authButton.schAuth === 'Y'" style="display: flex; margin-left: auto">
              <!-- 초기화 -->
              <button class="btn_reset" style="margin-right: 10px" @click="defaultFilter('resetSearch')">{{ $t('message.btnInit') }}</button>
              <!-- 검색 -->
              <button class="btn_search_text" @click="getList">{{ $t('message.search') }}</button>
            </div>
          </div>
        </div>
        <div class="search_box_filter c_action c_action03">
          <div class="filter_list">
            <label for="" class="filter_type">
              <!-- 운송사 -->
              <span class="filter_type_title">{{ $t('message.tranNm') }}</span>
              <input type="text" v-model="trncusNm" v-if="this.userMenuGrpCd == 'TRANSCUS'" style="" class="disabled t-l" disabled placeholder="" />
              <MultipleSelect ref="outStatMulti3" v-else v-model="trnCd" :all="true" id="trnCd" class="" style="width: 305px" @select="setTrnCd" :options="tranCusList" :searchable="false" :close-on-select="false" :show-labels="false" :allow-empty="false" label="text" />
            </label>
            <label for="" class="filter_type">
              <!-- 배송형태 -->
              <span class="filter_type_title">{{ $t('message.deliveryType') }}</span>
              <MultipleSelect ref="outStatMulti4" v-model="trnCarCd" :all="true" id="offrClsCd" class="" style="width: 100%" @select="setTrnCar" :options="trnCarList" :searchable="false" :close-on-select="false" :show-labels="false" :allow-empty="false" label="text" />
            </label>
            <label for="" class="filter_type">
              <!-- 주문유형 -->
              <span class="filter_type_title">{{ $t('message.offrCls') }}</span>
              <MultipleSelect ref="outStatMulti5" v-model="offrClsCd" :all="true" id="Material_Group" class="" style="width: 100%" @select="setOfrrCls" :options="offrClsList" :searchable="false" :close-on-select="false" :show-labels="false" :allow-empty="false" label="text" />
            </label>
          </div>
        </div>
        <!-- 배차계획번호 원주문번호 배송번호 -->
        <div class="search_box_filter c_action c_action02">
          <div class="filter_list">
            <label for="" class="filter_type">
              <!-- 배차계획번호 -->
              <span class="filter_type_title">{{ $t('message.trnPlnNum') }}</span>
              <input type="text" id="" style="width: 100%" class="t-l" v-model="trnPlnNum" :placeholder="$t('message.msgEnterFull')" ref="filter" @keyup.enter="getList()" />
            </label>
            <!-- 원주문번호 -->
            <!-- <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.offrNum') }}</span>
              <input type="text" id="" style="width: 100%" class="t-l" v-model="offrNum" />
            </label> -->
            <label for="" class="filter_type filter_type_double">
              <!-- 배송희망일 -->
              <span class="filter_type_title filter_type_title_multiselect">
                <MultiSelect id="" style="width: 100%" v-model="hopeDtCd" :options="selectHopeDt" track-by="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" label="text" />
              </span>
              <!-- 데이트피커 -->
              <div class="form_calendar w_100 essential ml-25" @click="datePicker('DatePicker')">
                <input type="text" v-model="datesDtls" readonly />
                <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
              </div>
            </label>
          </div>
        </div>
        <!-- <label for="" class="filter_type filter_type_double"> -->
        <!-- <span class="filter_type_title filter_type_title_multiselect">  -->
        <!-- 배송희망일 데이트피커 -->
        <div class="search_box_filter c_action c_action01">
          <div class="filter_list">
            <label for="" class="filter_type filter_type_double">
              <!-- 배송번호 -->
              <span class="filter_type_title">{{ $t('message.trnNum') }}</span>
              <input type="text" id="" style="width: 100%" class="t-l" v-model="trnNum" ref="filter2" @keyup.enter="getList()" />
            </label>
          </div>
        </div>
      </div>
      <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container09">
      <div class="real_head">
        <div class="real_head_left">
          <small
            >{{ $t('message.totalSelection1') }} <i> {{ totalCount }} </i> {{ $t('message.totalSelection2') }}</small
          >
        </div>
        <div class="real_head_right">
          <button v-if="authButton.fn1Auth === 'Y'" class="btn_default btn_print_fuction" @click="validation('invoice')">{{ $t('message.btnInvoiceNum') }}</button>
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
          <!-- 레이아웃!!!! -->
          <MultiSelect id="Material_Group" class="btn_select_layout" style="width: 100%" v-model="layoutValue" :options="layoutOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @input="layoutBtn" label="text"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body04">
        <ForwardingStatusGrid @openForwardingCustCar="openForwardingCustCar" @openForwardingDetail="openForwardingDetail" :menuId="menuId" :statList="statList" :savePage="savePage" @count="setCount" style="height: 100%" :gridLang="gridLang" ref="ForwardingStat" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button v-if="authButton.exlAuth === 'Y'" class="btn_default btn_function" @click="excelDownload">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right"></div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <ClientSearchModal @sendCustId="sendCustId" ref="ClientSearchModal" />
    <DateRangePickerModal :page="page" @selectDate="showSelectDate" @setDefaultDates="setDefaultDates" :oldDate="oldDate" ref="DateRangePicker" />
    <NoticeModal :ment="ment" />
    <BookingAlarmModal :ment="ment" @okOrNo="okOrNo" :page="page" />
    <!-- 고객차량 선택 -->
    <ForwardingCustCarModal :menuId="menuId" :page="page" />
    <!-- 출고상세 -->
    <ForwardingDetailModal :menuId="menuId" :page="page" />
    <DeliveryInfoModal :page="page" :menuId="menuId" />
  </div>
</template>

<script>
import MultipleSelect from '@/components/commonComponent/MultipleSelect';
import commonApi from '@/api/common';
import { mapGetters } from 'vuex';
import ClientSearchModal from '@/modal/order/ClientSearchModal.vue';
import BookingAlarmModal from '@/modal/booking/BookingAlarmModal';
import ForwardingCustCarModal from '@/modal/tran/ForwardingCustCarModal';
import ForwardingDetailModal from '@/modal/tran/ForwardingDetailModal';
import orderApi from '@/api/order/order.js';
import DateRangePickerModal from '@/modal/DateRangePickerModal.vue';
import ForwardingStatusGrid from '@/components/gridView/tran/ForwardingStatusGrid.vue';
import languageApi from '@/api/language';
import tranApi from '@/api/tran/tran.js';
import NoticeModal from '@/modal/order/NoticeModal.vue';
import DeliveryInfoModal from '@/modal/tran/DeliveryInfoModal';

export default {
  components: {
    MultipleSelect,
    ClientSearchModal,
    ForwardingStatusGrid,
    DateRangePickerModal,
    ForwardingDetailModal,
    BookingAlarmModal,
    NoticeModal,
    DeliveryInfoModal,
    ForwardingCustCarModal,
  },
  props: {
    openInfo: {
      type: Object,
    },
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
    routerPath: {
      type: String,
    },
  },
  data() {
    return {
      custCdList: [],
      filterOn: true,
      trncusNm: '',
      layoutValue: { value: '', text: this.$t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$t('message.btnSave') },
        { value: 'reset', text: this.$t('message.btnInit') },
      ],
      trnPlnNum: '',
      offrNum: '',
      trnNum: '',
      custNm: '',
      custId: '',
      selectHopeDt: [
        { value: 'hopeDt', text: this.$t('message.hopeDt') },
        { value: 'offrDt', text: this.$t('message.offrDt') },
        { value: 'overDt', text: this.$t('message.overDt') },
      ],
      plntCd: [],
      outStatCd: [],
      hopeDtCd: [],
      trnCd: [],
      offrClsCd: [],
      trnCarCd: [],
      selectPlnt: [],
      offrClsList: [],
      tranCusList: [],
      outStatList: [],
      trnCarList: [],
      oldDate: [],
      sttDt: '',
      endDt: '',
      datesDtls: '',
      bizDepartment: '',
      ment: '',
      whatIs: '',
      isFixColumn: false,
      isFixRow: false,
      costList: [], // 운송비조회 목록
      gridLang: [],
      totalCount: 0,
      dateClsCd: [],
      searchDate: [
        { value: 'cfmDt', text: this.$t('message.trnCfmDt') },
        { value: 'outDt', text: this.$t('message.outDt') },
      ],
      searchOpen: true,
      search_box_height: '',
      value: [],
      statList: [],
      checkedRows: [],
      default: {},
    };
  },
  watch: {
    openInfo(info) {
      this.default = info.etcData.outStat ?? '';
      this.default !== '' ? this.defaultFilter('dashFilter') : this.defaultFilter('resetList');
    },
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
      trncusId: 'userInfo/getTrncusId',
    }),
  },
  methods: {
    fwdDtlsModal(trnPlnNum) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnNum, readOnly: true });
    },
    deliveryInfoModal(trnNum) {
      this.$modal.show(`DeliveryInfoModal${this.page}`, { trnNum: trnNum });
    },
    // 배차계획번호 클릭 시,
    async openDipatchDetail(trnPlnInfo) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnInfo.trnPlnNum, readOnly: true });
    },
    validation(is = '') {
      const rows = this.$refs.ForwardingStat.sendJsonRows();
      const isChecked = this.$refs.ForwardingStat.sendChecked();
      this.checkedRows = this.$refs.ForwardingStat.sendCheckedData();
      if (rows.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
        return false;
      } else if (!isChecked && is !== '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoItem');
        return false;
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
    getInfoHeight() {
      let val = this.$refs.search_box_height.scrollHeight + 17;
      // search_box_height 의 높이값 받아온다
      this.search_box_height = `${val}px`;
    },
    okOrNo(result, type) {
      if (result) {
        if (type === 'reset') {
          this.$refs.ForwardingStat.resetLayout();
        } else {
          this.$refs.ForwardingStat.saveLayout();
        }
      }
    },
    layoutBtn(status) {
      this.ment = '';
      if (status.value === 'save') {
        this.ment = 'message.msgAskSave';
        this.$modal.show(`BookingAlarmModal${this.page}`, { type: 'save' });
      } else {
        this.ment = 'message.msgAskRefresh';
        this.$modal.show(`BookingAlarmModal${this.page}`, { type: 'reset' });
      }
      this.layoutValue = { text: this.$t('message.btnLayout'), value: '' };
    },
    async defaultFilter(type) {
      await this.setTrnCd();
      await this.setTrnCar();
      await this.setOfrrCls();
      await this.setPlant();
      await this.setDefaultDates();
      this.custNm = '';
      this.custId = '';
      this.trnPlnNum = '';
      this.trnNum = '';
      this.hopeDtCd = this.selectHopeDt[0];
      // this.ment = 'message.msgClearRefresh';
      // await this.$modal.show('NoticeModal');
      this.$refs.DateRangePicker.init();
      this.$refs.outStatMulti1.select({ value: 'reset' });
      this.$refs.outStatMulti4.select({ value: 'reset' });
      this.$refs.outStatMulti5.select({ value: 'reset' });
      // 초기화 버튼 클릭 시 reset
      if (type == 'resetSearch') {
        this.$refs.outStatMulti2.select({ value: 'reset' });
        this.default = '';
        if (this.userMenuGrpCd === 'VRGDW_TRAN' || this.userMenuGrpCd === 'SYSTEM_MANAGER') this.$refs.outStatMulti3.select({ value: 'reset' });
        // 대시보드 접근 시 dashFilter
      } else if (type == 'dashFilter') {
        this.getList();
      } else if (type == 'resetList') {
        this.$refs.outStatMulti2.select({ value: 'reset' });
        this.default = '';
        this.outStatCd = '';
        if (this.userMenuGrpCd === 'VRGDW_TRAN' || this.userMenuGrpCd === 'SYSTEM_MANAGER') this.$refs.outStatMulti3.select({ value: 'reset' });
        this.getList();
      }
    },
    // 출고상태조회 목록
    async getList() {
      if (this.authButton.schAuth === 'Y') {
        try {
          this.$refs.filter.blur();
          this.$refs.filter2.blur();
          this.$refs.ForwardingStat.clearCurrent();
        } catch (e) {
          console.log(e);
        }
        this.custNm ? this.custCd : (this.custCd = '');
        const param = {
          plntCd: this.plntCd,
          outStatCd: this.default != '' ? this.default : this.outStatCd,
          trncusId: this.userMenuGrpCd === 'TRANSCUS' ? this.trncusId : this.trnCd,
          trnCarType: this.trnCarCd,
          offrCls: this.offrClsCd,
          trnPlnNum: this.trnPlnNum,
          offrNum: this.offrNum,
          trnNum: this.trnNum,
          custCd: this.custCd,
          dateCls: this.hopeDtCd.value,
          sttDt: this.sttDt,
          endDt: this.endDt,
        };
        if (this.default != '') {
          for (let i = 0; i < this.outStatCd.length; i++) {
            if (this.outStatCd[i] !== this.default) param.outStatCd = this.outStatCd;
          }
        }
        this.userMenuGrpCd === 'TRANSCUS' ? (param.trncusId = this.trncusId) : (param.trncusId = this.trnCd);
        try {
          const response = await tranApi.getForwardStatus(param);
          this.statList = response.data.ds;
          if (this.statList.length == 0) this.totalCount = 0;
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    // 엑셀다운로드
    async excelDownload() {
      if (this.itemCount === 0) {
        this.ment = 'message.msgCannotExport';
        this.$modal.show('NoticeModal');
      } else {
        const excelData = {
          fileNm: 'Forwarding_StatusList-Excel.xlsx',
          showProgress: true,
          progressMessage: 'Exporting..',
          indicator: 'hidden',
          header: 'default',
          footer: 'hidden',
          compatibility: true,
        };
        this.$refs.ForwardingStat.excelExport(excelData);
      }
    },
    // 접속일 기준 지난 365일 설정
    async setDefaultDates(time) {
      if (time) {
        this.time = time;
        this.sttDt = time[0];
        this.endDt = time[1];
        this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      }
    },
    // 달력
    datePicker() {
      this.oldDate = this.time;
      this.$modal.show('DateRangePicker');
    },
    // 달력 선택 날짜 노출
    showSelectDate(selectDate) {
      this.time = selectDate;
      this.oldDate = selectDate;
      this.sttDt = this.time[0];
      this.endDt = this.time[1];
      this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
    },
    // 플랜트 다중선택
    setPlant(plant) {
      if (plant) {
        const pushArr = [];
        plant.forEach(item => {
          pushArr.push(item.value);
        });
        pushArr[0] == 'PLNT00' ? (this.plntCd = '') : (this.plntCd = pushArr);
      } else {
        this.$refs.outStatMulti1.statCd = this.selectPlnt;
      }
    },
    // 운송사 다중선택
    setTrnCd(cd) {
      if (cd) {
        this.trnCd = [];
        cd.forEach(code => {
          this.trnCd.push(code.value);
        });
        this.trnCd[0] == 'TR00' ? (this.trnCd = '') : this.trnCd;
      } else {
        if (this.userMenuGrpCd === 'VRGDW_TRAN' || this.userMenuGrpCd === 'SYSTEM_MANAGER') {
          this.$refs.outStatMulti3.statCd = this.tranCusList;
          this.trnCd = '';
        } else this.trnCd = '';
        this.trnCd = '';
      }
    },
    // 배송형태 다중선택
    setTrnCar(car) {
      if (car) {
        const pushArr = [];
        car.forEach(carType => {
          pushArr.push(carType.value);
        });
        pushArr[0] == 'CAR00' ? (this.trnCarCd = '') : (this.trnCarCd = pushArr);
      } else {
        this.$refs.outStatMulti4.statCd = this.trnCarList;
      }
    },
    // 주문유형 다중선택
    setOfrrCls(offr) {
      if (offr) {
        const pushArr = [];
        offr.forEach(offrCode => {
          pushArr.push(offrCode.value);
        });
        pushArr[0] == 'OF00' ? (this.offrClsCd = '') : (this.offrClsCd = pushArr);
      } else {
        this.$refs.outStatMulti5.statCd = this.offrClsList;
      }
    },
    // 출고상태 다중선택
    setOutStat(stat) {
      if (stat) {
        const pushArr = [];
        stat.forEach(outStat => {
          pushArr.push(outStat.value);
        });
        pushArr[0] == 'OUT00' ? (this.outStatCd = '') : (this.outStatCd = pushArr);
      }
    },
    // 공통코드조회 => 출고상태, 운송사목록, 배송형태, 주문유형
    async getTranCusList() {
      const allGroup = { text: this.$t('message.all'), value: 'PLNT00' };
      try {
        const response = await tranApi.getPlantCombo();
        if (response.data.ds.length === 4) {
          this.selectPlnt = await response.data.ds;
          this.selectPlnt.unshift(allGroup);
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }

      if (this.selectPlnt.length !== 0) {
        const allGroup = { text: this.$t('message.all'), value: 'TR00' };
        try {
          const response = await tranApi.getTranList();
          this.tranCusList = response.data.ds;
          this.tranCusList.unshift(allGroup);
          if (this.userMenuGrpCd === 'TRANSCUS') {
            this.tranCusList.forEach(list => {
              if (this.trncusId == list.value) {
                this.trncusNm = list.text;
              }
            });
          }
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
      const groupCds = ['COMP_CD', 'OUT_STATUS', 'CAR_TYPE_SAMPLE', 'OFFR_CLS_CD'];
      for (let i = 0; i < groupCds.length; i++) {
        const param = {
          groupCd: groupCds[i],
          useYn: 'Y',
          prntCd: '',
        };
        try {
          const response = await commonApi.getCommonCodeCombo(param);
          if (param.groupCd == 'COMP_CD') this.bizDepartment = response.data.ds[0].text;
          if (param.groupCd == 'OUT_STATUS') {
            const allGroup = { text: this.$t('message.all'), value: 'OUT00' };
            this.outStatList = response.data.ds;
            this.outStatList.unshift(allGroup);
          }
          if (param.groupCd == 'CAR_TYPE_SAMPLE') {
            const allGroup = { text: this.$t('message.all'), value: 'CAR00' };
            this.trnCarList = response.data.ds;
            this.trnCarList.unshift(allGroup);
          }
          if (param.groupCd == 'OFFR_CLS_CD') {
            const allGroup = { text: this.$t('message.all'), value: 'OF00' };
            this.offrClsList = response.data.ds;
            this.offrClsList.unshift(allGroup);
          }
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    // 행고정, 열고정
    fixGrid(type) {
      this.$refs.ForwardingStat.isChooseCell();
      if (this.$refs.ForwardingStat.isChooseCell() == true) {
        this.$refs.ForwardingStat.fixGrid(type, this.isFixColumn, this.isFixRow);
        if (type === 'column') {
          this.isFixColumn = !this.isFixColumn;
        } else if (type === 'row') {
          this.isFixRow = !this.isFixRow;
        }
      } else {
        this.ment = 'message.msgNoSelection';
        this.$modal.show('NoticeModal');
      }
    },
    // 아이템카운트 확인
    setCount(itemCount) {
      if (itemCount) this.totalCount = itemCount;
    },
    // 그리드 다국어
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
    async getUserOfferInfo() {
      try {
        const param = this.userInfo.menuGrpCd === 'CUSTOMER' ? { custId: this.userInfo.custId } : { custId: this.custId };
        const response = await orderApi.getUserOfferInfo(param);
        const userOfferInfo = response.data.rs;
        this.custNm = userOfferInfo.custNm;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 고객사검색
    clientSearch() {
      this.$refs.ClientSearchModal.customerList(this.custNm, 'info');
      if (this.custNm === '') {
        this.$modal.show('ClientSearchModal');
      }
    },
    // 고객사검색
    // sendInfoInput(result) {
    //   if (result.length === 1) {
    //     this.sendCustId(result[0].custId);
    //   } else {
    //     this.$modal.show('ClientSearchModal', { custNm: this.custNm });
    //   }
    // },
    // 고객사검색
    sendCustId(id) {
      if (typeof id === 'object') {
        if (id.length > 1 || id.length === 0) {
          this.custCdList = id;
          this.$modal.show('ClientSearchModal', { custNm: this.custNm });
        } else {
          this.custId = id[0].custId;
          this.custCd = id[0].custCd;
          this.getUserOfferInfo();
        }
      } else if (id !== '') {
        this.custId = id;
        // this.custCd = custCd;
        this.custCdList.forEach(row => {
          if (row.custId == this.custId) {
            this.custCd = row.custCd;
          }
        });
        this.getUserOfferInfo();
      }
    },
    async saveInvoiceNum() {
      try {
        const param = {
          trnPlnNum: this.checkedRows[0].trnPlnNum,
        };
        await tranApi.saveInvoiceNum(param);
        await this.getList();
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
      this.$refs.ForwardingStat.setFilter(this.filterOn);
    },
    openForwardingDetail(trnPlnInfo) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnInfo.trnPlnNum, readOnly: true });
    },
    openForwardingCustCar(trnPlnInfo) {
      this.$modal.show(`ForwardingCustCarModal${this.page}`, { info: trnPlnInfo });
    },
  },
  created() {
    this.getGridMutiLanguage();
  },
  async mounted() {
    this.default = this.openInfo.etcData.outStat ?? '';
    this.getInfoHeight();

    // [0]배송희망일 / [1]주문일 / [2]인수일
    // 배송희망일 >> 기본으로 수정요청 [20230216]
    this.hopeDtCd = this.selectHopeDt[0];
    await this.getTranCusList();
    await this.getList();
    this.default != '' ? this.defaultFilter('dashFilter') : this.defaultFilter('resetSearch');
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
