<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box" ref="search_box_height" :class="{ search_close_01: searchOpen }" :style="`height:${search_box_height}`">
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <label for="" class="filter_type">
              <!-- 운송사 -->
              <span class="filter_type_title">{{ $t('message.tranNm') }}</span>
              <!-- 운송사 로그인시 선택 불가 -->
              <input type="text" id="담당자명" v-model="tranOne.text" v-if="this.userMenuGrpCd == 'TRANSCUS'" style="" class="disabled t-l" disabled placeholder="" />
              <!-- 물류담당자 로그인시 선택 가능 -->
              <MultiSelect v-else id="Material_Group" class="essential" style="width: 100%" label="text" v-model="tranOne" :options="tranCusList" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </label>
            <!-- 입차구분 -->
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.inType') }}</span>
              <MultiSelect id="" style="width: 100%" v-model="inTypeCd" :options="selectInType" track-by="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" label="text" />
            </label>
            <!-- 출차구분 -->
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.outType') }}</span>
              <MultiSelect id="" style="width: 100%" v-model="outTypeCd" :options="selectOutType" track-by="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" label="text" />
            </label>
            <div v-if="authButton.schAuth === 'Y'" style="display: flex; margin-left: auto">
              <!-- 초기화 -->
              <button class="btn_reset" style="margin-right: 10px" @click="resetFilter">{{ $t('message.btnInit') }}</button>
              <!-- 검색 -->
              <button class="btn_search_text" @click="getList">{{ $t('message.search') }}</button>
            </div>
          </div>
        </div>
        <div class="search_box_filter f_action c_action02">
          <div class="filter_list">
            <label for="" class="filter_type">
              <!-- 차량번호 -->
              <span class="filter_type_title">{{ $t('message.tranCarNum') }}</span>
              <div class="form_inputnbtn">
                <input ref="filter" type="text" @keyup.enter="sendGridCarInfo" class="t-l" v-model="trnCarNum" style="" id="custoer_name" placeholder="" />
                <button class="btn_search_basic_info" @click="sendGridCarInfo"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
            <label for="" class="filter_type filter_type_double">
              <span class="filter_type_title filter_type_title_multiselect">
                <!-- 배송희망일 -->
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
        <div class="search_box_filter f_action c_action01">
          <div class="filter_list">
            <label for="" class="filter_type filter_type_double">
              <!-- 배차계획번호 -->
              <span class="filter_type_title">{{ $t('message.trnPlnNum') }}</span>
              <input type="text" id="" ref="filter" style="width: 100%" class="t-l" v-model="trnPlnNum" @keyup.enter="getList()" />
            </label>
          </div>
        </div>
      </div>
      <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div :class="[searchOpen ? 'realgrid_container realgrid_container09' : 'realgrid_container realgrid_container09 padding-on']">
      <div class="real_head">
        <div class="real_head_left">
          <!-- <small>{{ $t('message.inOutInfo') }}</small> -->
          <small
            >{{ $t('message.totalSelection1') }}<i> {{ this.itemCount }} </i>{{ $t('message.totalSelection2') }}</small
          >
        </div>
        <div class="real_head_right"></div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left"></div>
        <div class="real_top_right">
          <!-- 열고정, 행고정 -->
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
        <CarInOutGrid :carInfo="carInfo" @sendGridCarInfo="sendGridCarInfo" @openForwardingCustCar="openForwardingCustCar" @openForwardingDetail="openForwardingDetail" @showPop="openCarInfo" :gridLang="gridLang" @sendCheckedData="setCheckedData" :inOutList="inOutList" :menuId="menuId" :savePage="savePage" @count="setCount" ref="CarInOut" style="height: 100%" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <!-- 엑셀다운로드 -->
          <button class="btn_default btn_function" @click="excelDownload">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right">
          <!-- 입차확정 -->
          <button class="btn_default btn_critical_process" @click="confirmEntry">{{ $t('message.inCfm') }}</button>
          <!-- 출차확정 -->
          <button class="btn_default btn_critical_process" @click="confirmDeparture">{{ $t('message.outCfm') }}</button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <DateRangePickerModal ref="DateRange" :page="page" @selectDate="showSelectDate" @setDefaultDates="setDefaultDates" :oldDate="oldDate" />
    <CarInfoViewModal ref="CarInfoView" :page="page" />
    <BookingAlarmModal :ment="ment" @okOrNo="okOrNo" :page="page" />
    <CarNumSearchModal @sendCarInfo="sendCarInfo" :tranSelect="tranOne" :page="page" ref="CarNumSearchModal" />
    <NoticeModal :ment="ment" />

    <!-- 고객차량 선택 -->
    <ForwardingCustCarModal :menuId="menuId" :page="page" />
    <!-- 출고상세 -->
    <ForwardingDetailModal :menuId="menuId" :page="page" />
  </div>
</template>

<script>
import commonApi from '@/api/common';
import CarNumSearchModal from '@/modal/tran/CarNumSearchModal';
import ForwardingCustCarModal from '@/modal/tran/ForwardingCustCarModal';
import ForwardingDetailModal from '@/modal/tran/ForwardingDetailModal';
// import defs from '@/consts/defs.js';
import DateRangePickerModal from '@/modal/DateRangePickerModal.vue';
import CarInfoViewModal from '@/modal/tran/CarInfoViewModal';
import { mapGetters } from 'vuex';
import CarInOutGrid from '@/components/gridView/tran/CarInOutGrid.vue';
import NoticeModal from '@/modal/order/NoticeModal.vue';
import BookingAlarmModal from '@/modal/booking/BookingAlarmModal';
import languageApi from '@/api/language';
import tranApi from '@/api/tran/tran.js';
// import orderApi from '@/api/order/order.js';

export default {
  components: {
    CarInOutGrid,
    CarInfoViewModal,
    BookingAlarmModal,
    CarNumSearchModal,
    NoticeModal,
    ForwardingDetailModal,
    DateRangePickerModal,
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
  // (입차일:inDt, 출차일:outDt, 배차완료일(Default):cmplDt, 배차확정일:cfmDt)
  data() {
    return {
      filterOn: true,
      inOutYn: [],
      rowData: [],
      carInfo: [],
      trnInfo: [],
      currentNum: '',
      openSelectNum: '',
      checkedRows: [],
      trnCarNum: '',
      oldDate: [],
      sttDt: '',
      endDt: '',
      datesDtls: '',
      trnPlnNum: '',
      inTypeCd: [],
      selectInType: [
        { value: '', text: this.$t('message.all') },
        { value: 'Y', text: this.$t('message.justIn') },
        { value: 'N', text: this.$t('message.noIn') },
      ],
      outTypeCd: [],
      selectOutType: [
        { value: '', text: this.$t('message.all') },
        { value: 'Y', text: this.$t('message.justOut') },
        { value: 'N', text: this.$t('message.noOut') },
      ],
      hopeDtCd: [],
      selectHopeDt: [
        { value: 'inDt', text: this.$t('message.inDt') },
        { value: 'outDt', text: this.$t('message.outDt') },
        { value: 'cmplDt', text: this.$t('message.trnCmplDt') },
        { value: 'cfmDt', text: this.$t('message.trnCfmDt') },
      ],
      trnCd: [],
      tranCusList: [],
      bizDepartment: '',
      gridLang: [],
      inOutList: [],
      ment: '',
      layoutValue: { value: '', text: this.$t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$t('message.btnSave') },
        { value: 'reset', text: this.$t('message.btnInit') },
      ],
      isFixColumn: false,
      isFixRow: false,
      itemCount: 0,
      searchOpen: true,
      search_box_height: '',
      value: [],
      tranOne: {},
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
      trncusId: 'userInfo/getTrncusId',
    }),
  },
  watch: {
    openInfo() {
      this.setOpenInfoData();
    },
  },
  methods: {
    sendGridCarInfo() {
      this.$modal.show('CarNumSearchModal', { trnCarNum: this.trnCarNum });
    },
    sendCarInfo(carInfo) {
      // this.carInfo = carInfo;
      if (carInfo) {
        this.trnCarNum = carInfo.tranCarNum;
      } else {
        this.trnCarNum;
      }
    },
    async openModal(event) {
      this.$modal.show(event);
    },
    // openSingleSearch(clickRow) {
    // this.currentNum = currentNum;
    // this.openSelectNum = selectNum;
    //   this.$modal.show('CarNumSearchModal');
    // },
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
          const custCarInfo = clickRow;
          // 고객명 바인딩 위한 배차계획번호 상세 목록 호출
          try {
            const resp = await tranApi.getDispatchPlanDetailList({
              trnPlnNum: custCarInfo.trnPlnNum,
            });
            const custNm = resp.data.ds[0].deliveryPlanDtlsList[0].custNm;
            this.$modal.show('CarInfoViewModal', { custCarInfo, custNm });
          } catch (e) {
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
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
    // 배차계획번호 클릭 시,
    async openDipatchDetail(trnPlnInfo) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnInfo.trnPlnNum, readOnly: true });
    },
    setCheckedData(selectProductRows) {
      this.checkedRows = selectProductRows;
    },
    // 입차확정, 확정이 아닌 항목만 입차확정 가능
    async confirmEntry() {
      this.checkedRows = this.$refs.CarInOut.sendCheckedData();
      this.inOutYn = [];
      const param = {
        ids: [],
      };
      this.checkedRows.forEach(ele => {
        param.ids.push(ele.id);
        this.inOutYn.push({ inYn: ele.inYn, outYn: ele.outYn });
      });
      // [VALID] 선택 항목 없을 경우, return
      if (param.ids.length == 0) {
        this.ment = 'message.msgNoProduct';
        this.$modal.show('NoticeModal');
        return;
      }
      // [VALID] 선택항목 중 입차확정 || 출차확정된 항목 포함 시
      for (let i = 0; i < this.inOutYn.length; i++) {
        if (this.inOutYn[i].inYn == 'Y' || this.inOutYn[i].outYn == 'Y') {
          this.ment = 'message.msgIncludeConfirm';
          this.$modal.show('NoticeModal');
          return;
        }
      }
      // defs.offrStatCd.proceed;
      try {
        await tranApi.putCarInSave(param);

        this.ment = 'message.msgResultInCfm';
        await this.getList();
        await this.openModal('NoticeModal');
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 출차확정, 입차확정된 항목만 출차확정 가능
    async confirmDeparture() {
      this.checkedRows = this.$refs.CarInOut.sendCheckedData();
      this.inOutYn = [];
      const param = [];
      this.checkedRows.forEach(ele => {
        param.push({ id: ele.id, offrNum: ele.offrNum, offrId: ele.offrId, outCls: 'MNG' });
        this.inOutYn.push({ inYn: ele.inYn, outYn: ele.outYn });
      });
      // [VALID] 선택항목 없을 경우, return
      if (this.checkedRows.length == 0) {
        this.ment = 'message.msgNoProduct';
        this.$modal.show('NoticeModal');
        return;
      }
      // [VALID] 선택항목 중 입차확정이 아닌 건 포함 시
      for (let i = 0; i < this.inOutYn.length; i++) {
        if (this.inOutYn[i].inYn == 'N') {
          this.ment = 'message.msgRequireInCfm';
          this.$modal.show('NoticeModal');
          return;
        }
        // [VALID] 선택항목 중 출차확정된 항목 포함 시
        else if (this.inOutYn[i].outYn == 'Y') {
          this.ment = 'message.msgIncludeConfirm';
          this.$modal.show('NoticeModal');
          return;
        }
      }
      try {
        await tranApi.putCarOutSave(param);

        this.ment = 'message.msgResultOutCfm';
        await this.getList();
        await this.openModal('NoticeModal');
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // 접속일 기준 지난 365일 설정
    setDefaultDates(time) {
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
    // 초기화, 운송사, 입차구분, 출차구분, 차량번호, 배차계획번호, 일자검색구분
    async resetFilter() {
      if (this.userMenuGrpCd !== 'TRANSCUS') this.tranOne = this.tranCusList[0]; // 운송사
      this.$refs.DateRange.init();
      this.inTypeCd = this.selectInType[0]; // 입차구분
      this.outTypeCd = this.selectOutType[0]; // 출차구분
      this.trnCarNum = ''; // 차량번호
      this.trnPlnNum = ''; // 배차계획번호
      this.hopeDtCd = this.selectHopeDt[2]; // 일자검색구분
    },
    // 공통코드조회 => 출고상태, 운송사목록, 배송형태, 주문유형
    async getCommonCode() {
      const allGroup = { text: this.$t('message.all'), value: '' };
      try {
        const response = await tranApi.getTranList();
        this.tranCusList = response.data.ds;
        this.tranCusList.unshift(allGroup);
        this.tranOne = this.tranCusList[0];
        if (this.userMenuGrpCd === 'TRANSCUS') {
          this.tranCusList.forEach(list => {
            if (this.trncusId == list.value) {
              this.tranOne = list;
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

      const groupCds = ['COMP_CD'];
      for (let i = 0; i < groupCds.length; i++) {
        const param = {
          groupCd: groupCds[i],
          useYn: 'Y',
          prntCd: '',
        };
        try {
          const response = await commonApi.getCommonCodeCombo(param);
          if (param.groupCd == 'COMP_CD') this.bizDepartment = response.data.ds[0].text;

          this.hopeDtCd = this.selectHopeDt[2];
          this.inTypeCd = this.selectInType[0];
          this.outTypeCd = this.selectOutType[0];
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    async getList() {
      if (this.authButton.schAuth === 'Y') {
        this.$refs.CarInOut.clearCurrent();
        this.$refs.filter.blur();
        const param = {
          trncusIds: this.tranOne.value,
          trnCarNum: this.trnCarNum,
          trnPlnNum: this.trnPlnNum,
          dateCls: this.hopeDtCd.value,
          sttDt: this.sttDt,
          endDt: this.endDt,
          inYn: this.inTypeCd.value,
          outYn: this.outTypeCd.value,
        };
        try {
          const response = await tranApi.getCarInOut(param);
          this.inOutList = response.data.ds;
          if (response.data.ds.length == 0) this.itemCount = 0;
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
          fileNm: 'Car_InOut-Excel.xlsx',
          showProgress: true,
          progressMessage: 'Exporting..',
          indicator: 'hidden',
          header: 'default',
          footer: 'hidden',
          compatibility: true,
        };
        this.$refs.CarInOut.excelExport(excelData);
      }
    },
    // 아이템카운트 확인
    setCount(itemCount) {
      if (itemCount) this.itemCount = itemCount;
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
    okOrNo(result, type) {
      if (result) {
        if (type === 'reset') {
          this.$refs.CarInOut.resetLayout();
        } else {
          this.$refs.CarInOut.saveLayout();
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
    // 행고정, 열고정
    fixGrid(type) {
      this.$refs.CarInOut.isChooseCell();
      if (this.$refs.CarInOut.isChooseCell() == true) {
        this.$refs.CarInOut.fixGrid(type, this.isFixColumn, this.isFixRow);
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
    async getInfoHeight() {
      let val = this.$refs.search_box_height.scrollHeight + 17;
      // search_box_height 의 높이값 받아온다
      this.search_box_height = `${val}px`;
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.CarInOut.setFilter(this.filterOn);
    },
    openForwardingDetail(trnPlnInfo) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnInfo.trnPlnNum, readOnly: true });
    },
    openForwardingCustCar(trnPlnInfo) {
      this.$modal.show(`ForwardingCustCarModal${this.page}`, { info: trnPlnInfo });
    },
    setOpenInfoData() {
      this.resetFilter();
      if (this.openInfo.etcData) {
        this.inTypeCd = this.selectInType.find(option => option.value === this.openInfo.etcData.inType);
        this.getList();
      } else {
        this.getList();
      }
    },
  },
  created() {
    this.getGridMutiLanguage();
  },
  async mounted() {
    await this.getInfoHeight();
    await this.getCommonCode();
    this.setOpenInfoData();
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
