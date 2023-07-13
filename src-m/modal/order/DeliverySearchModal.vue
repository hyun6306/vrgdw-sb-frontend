<template>
  <modal name="DeliverySearchModal" @before-open="open" width="100%" height="100%" :adaptive="true" :clickToClose="false">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.search') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('DeliverySearchModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="quote_search_contents">
          <div class="list_form_section">
            <ul class="list_ul">
              <!-- 일자검색구분 -->
              <li class="list_li">
                <label class="list_title">{{ $t('message.selectPeriod') }}</label>
                <MultiSelect id="" style="width: 100%" v-model="hopeDtCd" :options="selectHopeDt" track-by="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" label="text" />
              </li>
              <!-- 달력 -->
              <li class="list_li">
                <label class="list_title not_see">{{ $t('message.selectPeriod') }}</label>
                <div class="form_calendar">
                  <input type="text" placeholder="" readonly v-model="date.show" />
                  <button class="icon_calendar" @click="$modal.show('DateRangePicker')"><img src="@m/assets/img/icon_calendar.png" /></button>
                </div>
              </li>
              <!-- 고객사검색 -->
              <li class="list_li" v-if="authButton.fn1Auth == 'Y'">
                <label class="list_title">{{ $t('message.custNm') }}</label>
                <div class="form_searchm">
                  <input v-bind:readonly="this.userCustId !== 0" type="text" placeholder="" v-model="custNm" />
                  <button v-bind:disabled="this.userCustId !== 0" class="icon_search in_img" @click="searchCustomer"><img src="@m/assets/img/icon_search_w.png" /></button>
                </div>
              </li>
              <!-- 23.02.01 추가, 주문유형 -->
              <li class="list_li">
                <label class="list_title">{{ $t('message.offrCls') }}</label>
                <MultipleSelect ref="offrClsMulti2" @select="stat => setOutStat(stat, 'offrCls')" :all="true" :options="offrClsList" label="text" />
              </li>
              <!-- 23.02.01 추가, 제품그룹 -->
              <li class="list_li">
                <label class="list_title">{{ $t('message.categorySubject') }}</label>
                <MultiSelect id="" style="width: 100%" v-model="prdtCategoryCd" :options="prdtCategoryCdList" track-by="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" label="text" />
              </li>
              <!-- 23.02.01 추가, 배송방법 -->
              <li class="list_li">
                <label class="list_title">{{ $t('message.trnCarNm') }}</label>
                <MultiSelect id="" style="width: 100%" v-model="carTypeCd" :options="carTypeList" track-by="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" label="text" />
              </li>
              <!-- 제품코드검색 -->
              <li class="list_li">
                <label class="list_title">{{ $t('message.materialCode') }}</label>
                <div class="form_searchm">
                  <input type="text" v-model="prdtCd" :placeholder="$t('message.msgRequirePrdtCd')" />
                  <!-- <button class="icon_search"><img src="@m/assets/img/icon_search_w.png" /></button> -->
                </div>
              </li>
              <!-- 23.02.01 추가, 영업사원 -->
              <li class="list_li" v-if="this.userMenuGrpCd !== 'CUSTOMER'">
                <label class="list_title">{{ $t('message.sales') }}</label>
                <MultipleSelect :default="this.staffCd" ref="staffMulti2" @select="stat => setOutStat(stat, 'staff')" :all="true" :options="staffOptions" label="text" />
              </li>
              <!-- 배송상태 -->
              <li class="list_li">
                <label class="list_title">{{ $t('message.outStat') }}</label>
                <MultipleSelect :default="dashFilter" ref="outStatMulti2" @select="stat => setOutStat(stat, 'outStat')" :all="true" :options="outStatList" label="text" />
              </li>
              <!-- 검색영역 -->
              <li class="list_li">
                <label class="list_title">{{ $t('message.searchWord') }}</label>
                <span class="list_form"><input type="text" :placeholder="$t('message.msgInputNum3')" class="d_input" v-model="filter" /></span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_cancle" @click="$modal.hide('DeliverySearchModal')">{{ $t('message.btnCancel') }}</button>
            <button class="btn_add" @click="setSearchResult">{{ $t('message.search') }}</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
        <CustomerSearchModal ref="CustomerSearch" @sendCustInfo="getCustInfo" />
        <DateRangePickerModal :page="page" :maxDays="maxDays" @selectDateRange="selectDateRange" ref="dateRangeModal" />
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>
<script>
import { mapGetters } from 'vuex';
import CustomerSearchModal from '@m/modal/order/CustomerSearchModal';
import DateRangePickerModal from '@m/modal/DateRangePickerModal';
import commonApi from '@/api/common';
import MultipleSelect from '@m/components/commonComponent/MultipleSelect';
import dayjs from 'dayjs';

export default {
  name: 'DeliverySearchModal',
  props: ['page', 'dashFilter'],
  components: {
    CustomerSearchModal,
    DateRangePickerModal,
    MultipleSelect,
  },
  data() {
    return {
      filter: '',
      pageSize: '',
      pageNumber: '',
      trnStatCd: '',
      dateCls: '',
      prdtCd: '',
      custInfo: {},
      custId: '',
      custNm: '',
      custCd: '',
      custUserInfo: {},
      date: {},
      maxDays: 62,
      outStatList: [],
      outStatCd: [],
      offrClsList: [],
      offrClsCd: [],
      prdtList: [],
      prdtCategoryCdList: [],
      prdtCategoryCd: [],
      carTypeList: [],
      carTypeCd: [],
      staffOptions: [],
      staffCd: [],
      selectHopeDt: [
        { text: this.$t('message.fwdReqDt'), value: 'reqDt' },
        { text: this.$t('message.hopeDt'), value: 'hopeDt' },
        { text: this.$t('message.offrDt'), value: 'offrDt' },
      ],
      hopeDtCd: [],
      registClose: false,
      currentTab: 0,
    };
  },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
      userCustId: 'userInfo/getUserCustId',
      email: 'userInfo/getUserEmail',
      getUserNm: 'userInfo/getUserNm',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  methods: {
    async getStaffCombo() {
      if (this.userMenuGrpCd !== 'CUSTOMER') {
        try {
          const resp = await commonApi.getStaffCombo();

          this.staffOptions = resp.data.ds;
          this.staffOptions.unshift({ text: this.$t('message.all'), value: '00' });
          this.staffCd = this.userMenuGrpCd == 'VRGDW_SALES' ? this.userInfo.userCd : this.staffOptions[0];
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
    // 검색 조건 초기화
    async closeReset() {
      this.hopeDtCd = this.selectHopeDt[0];
      this.outStatCd = '';
      this.filter = '';
      this.custCd = '';
      this.custNm = '';
      this.prdtCd = '';
      this.offrClsCd = '';
      this.prdtCategoryCd = this.prdtCategoryCdList[0];
      this.carTypeCd = this.carTypeList[0];
      this.staffCd = this.userMenuGrpCd !== 'VRGDW_SALES' ? '' : this.userInfo.userCd;
      this.$modal.hide('DeliverySearchModal');
    },
    async setSearchResult() {
      const newParam = {
        custId: this.custId ? this.custId : this.userCustId,
        offrCls: this.offrClsCd[0] == 'OUT00' ? '' : this.offrClsCd,
        prdtClsCd: this.prdtCategoryCd.value == 'OUT00' ? '' : this.prdtCategoryCd.value,
        trnCarType: this.carTypeCd.value == 'OUT00' ? '' : this.carTypeCd.value,
        prdtCd: this.prdtCd,
        dateCls: this.hopeDtCd.value ? this.hopeDtCd.value : this.selectHopeDt[0].value,
        sttDt: this.date.time ? this.date.time[0] : dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        endDt: this.date.time ? this.date.time[1] : dayjs().add(1, 'month').format('YYYY-MM-DD'),
        salesUsers: this.staffCd,
        filter: this.filter,
        pageSize: 10,
        pageNumber: 0,
        outStatCd: this.userMenuGrpCd == 'CUSTOMER' ? '' : this.outStatCd,
        trnStatCd: this.userMenuGrpCd !== 'CUSTOMER' ? '' : this.outStatCd,
      };
      this.$emit('setSearchResult', newParam);
      this.$modal.hide('DeliverySearchModal');
      // if (type !== 'listSetting') await this.closeReset();
    },
    searchCustomer() {
      if (this.custNm === '') {
        this.$modal.show('CustomerSearchModal');
      } else {
        this.$refs.CustomerSearch.custSearch(this.custNm, 'info');
      }
    },
    getCustInfo(selectCust) {
      if (selectCust.length && selectCust.length === 1) {
        this.custUserInfo = selectCust;
        this.custNm = this.custUserInfo.custNm;
        this.custInfo = selectCust;
      } else if (selectCust.length && (selectCust.length > 1 || selectCust.length === 0)) {
        this.$modal.show('CustomerSearchModal', { filter: this.custNm });
      } else {
        this.custNm = selectCust.custNm;
        selectCust.custId ? (this.custId = selectCust.custId) : this.custId;
        selectCust.custCd ? (this.custCd = selectCust.custCd) : this.custCd;
        this.custInfo = selectCust;
      }
    },
    selectDateRange(date) {
      this.date = date;
    },
    // 공통코드조회 => 출고상태
    async getCommonCode() {
      // const allGroup = { text: this.$t('message.all'), value: 'PLNT00' };
      const groupCds = ['OFFR_CLS_CD', 'PRDT_CLS_CD', 'CAR_TYPE'];
      if (this.userMenuGrpCd === 'CUSTOMER') groupCds.push('TRAN_STATUS');
      else groupCds.push('OUT_STATUS');
      for (let i = 0; i < groupCds.length; i++) {
        const param = {
          groupCd: groupCds[i],
          useYn: 'Y',
          prntCd: '',
        };
        try {
          const response = await commonApi.getCommonCodeCombo(param);
          const allGroup = { text: this.$t('message.all'), value: 'OUT00' };
          if (param.groupCd == 'OUT_STATUS' || param.groupCd === 'TRAN_STATUS') {
            this.outStatList = response.data.ds;
            this.outStatList.unshift(allGroup);
            // this.outStatCd = this.outStatList[0];
            if (this.dashFilter != null) this.outStatCd = this.outStatList.find(option => option.value == this.dashFilter)?.value;
          } else if (param.groupCd == 'OFFR_CLS_CD') {
            this.offrClsList = response.data.ds;
            this.offrClsList.unshift(allGroup);
            // this.offrClsCd = this.offrClsList[0];
          } else if (param.groupCd == 'PRDT_CLS_CD') {
            this.prdtCategoryCdList = response.data.ds;
            this.prdtCategoryCdList.unshift(allGroup);
            this.prdtCategoryCd = this.prdtCategoryCdList[0];
          } else if (param.groupCd == 'CAR_TYPE') {
            this.carTypeList = response.data.ds;
            this.carTypeList.unshift(allGroup);
            this.carTypeCd = this.carTypeList[0];
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
    // 출고상태 다중선택
    setOutStat(stat, type) {
      if (stat) {
        const pushArr = [];
        stat.forEach(outStat => {
          pushArr.push(outStat.value);
        });
        if (type === 'staff') {
          pushArr[0] == '00' ? (this.staffCd = '') : (this.staffCd = pushArr);
        } else if (type === 'offrCls') {
          pushArr[0] == 'OUT00' ? (this.offrClsCd = '') : (this.offrClsCd = pushArr);
        } else if (type === 'outStat') {
          pushArr[0] == 'OUT00' ? (this.outStatCd = '') : (this.outStatCd = pushArr);
        }
      }
    },
    open() {},
  },
  async mounted() {
    await this.closeReset();
    await this.getCommonCode();
    await this.getStaffCombo();
    this.userCustId !== 0 ? (this.custNm = this.getUserNm) : this.custNm;
    this.hopeDtCd = this.selectHopeDt[0];
    if (this.dashFilter != null) this.setSearchResult('listSetting');
  },
  created() {},
};
</script>

<style></style>
