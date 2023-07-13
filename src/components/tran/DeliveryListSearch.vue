<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <div ref="search_box_height" :class="{ search_close_01: searchOpen }" :style="`height:${search_box_height}`" class="search_box">
      <div class="search_box_filter always_exposure">
        <div class="filter_list">
          <label for="" class="filter_type filter_type_double essential">
            <span class="filter_type_title filter_type_title_multiselect">
              <MultiSelect id="Material_Group" v-model="dateOption" :options="dateOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </span>
            <!-- 데이터피커 -->
            <div class="form_calendar w_100 essential ml-25" @click="datePicker('DatePicker')">
              <input type="text" :placeholder="$t('message.selectPeriod')" v-model="datesDtls" />
              <button class="icon_calendar">
                <img src="@/assets/img/icon_calendar.png" />
              </button>
            </div>
          </label>
          <label for="" class="filter_type" v-if="authButton.fn1Auth !== 'Y'">
            <span class="filter_type_title">{{ $t('message.outStat') }}</span>
            <MultipleSelect class="" :default="statusDefault" :options="outStatOptions" :all="true" @select="cds => setCd(cds, 'outStat')" ref="outStatOption" />
          </label>
          <label for="" class="filter_type" v-if="authButton.fn1Auth === 'Y'">
            <span class="filter_type_title">{{ $t('message.custNm') }}</span>
            <!-- 고객사검색 -->
            <div class="form_inputnbtn">
              <!-- <span class="essential w_100"> -->
              <input type="text" style="" id="custoer_name" v-model="custNm" @keyup.enter="clientSearch" placeholder="" />
              <button class="btn_search_basic_info" @click="clientSearch">
                <img src="@/assets/img/icon_search.png" />
              </button>
              <!-- </span> -->
            </div>
          </label>
          <div style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset" v-if="this.authButton.schAuth === 'Y'">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" v-if="this.authButton.schAuth === 'Y'" @click="search()">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
      <div class="search_box_filter f_action c_action02">
        <div class="filter_list">
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.offrCls') }}</span>
            <MultipleSelect class="" :options="offrOptions" :all="true" @select="cds => setCd(cds, 'offrCls')" ref="offrOptions" />
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.categorySubject') }}</span>
            <MultiSelect id="Material_Group" style="width: 100%" v-model="prdtClsCd" :options="prdtClsOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.deliveryType') }}</span>
            <MultiSelect id="Material_Group" style="width: 100%" v-model="carTypeCd" :options="carTypeOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
          </label>
        </div>
      </div>
      <div class="search_box_filter f_action c_action01">
        <div class="filter_list">
          <!-- 제품명검색 -->
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.materialCode') }}</span>
            <input type="text" style="" id="custoer_name" v-model="prdtCd" :placeholder="$t('message.msgRequirePrdtCd')" @keyup.enter="search()" ref="prdtCd" />
          </label>
          <!-- 영업사원 -->
          <label for="" class="filter_type" v-show="authButton.fn1Auth === 'Y'">
            <span class="filter_type_title">{{ $t('message.sales') }}</span>
            <MultipleSelect :options="staffOptions" :all="true" :default="userInfo.userCd" @select="cds => setCd(cds, 'staff')" ref="staffOptions" />
          </label>
          <!-- 키워드 -->
          <label for="" class="filter_type filter_type_double" v-if="authButton.fn1Auth !== 'Y'">
            <span class="filter_type_title">{{ $t('message.keyword') }}</span>
            <div class="form_input">
              <input type="text" id="postal_code" v-model="filter" style="width: 100%" class="t-l" :placeholder="$t('message.msgInputNum3')" @keyup.enter="search()" ref="filter" />
            </div>
          </label>
          <label for="" class="filter_type" v-if="authButton.fn1Auth === 'Y'">
            <span class="filter_type_title">{{ $t('message.outStat') }}</span>
            <MultipleSelect class="" :options="outStatOptions" :all="true" @select="cds => setCd(cds, 'outStat')" ref="outStatOption" />
          </label>
        </div>
      </div>
      <div class="search_box_filter f_action c_action01" v-if="authButton.fn1Auth === 'Y'">
        <div class="filter_list">
          <!-- 키워드 -->
          <label for="" class="filter_type filter_type_double">
            <span class="filter_type_title">{{ $t('message.keyword') }}</span>
            <div class="form_input">
              <input type="text" id="postal_code" v-model="filter" style="width: 100%" class="t-l" :placeholder="$t('message.msgInputNum3')" @keyup.enter="search()" ref="filter" />
            </div>
          </label>
        </div>
      </div>
    </div>
    <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button>
    <!-- //검색필터 영역 -->
    <DateRangePickerModal @setDefaultDates="setDefaultDates" @selectDate="showSelectDate" :oldDate="oldDate" :page="page" ref="rangeDate" />
    <ClientSearchModal @sendCustId="sendCustId" @sendInfoInput="sendInfoInput" ref="ClientSearchModal" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import orderApi from '@/api/order/order';
import commonApi from '@/api/common';
import tranApi from '@/api/tran/tran';
import MultipleSelect from '@/components/commonComponent/MultipleSelect';
import DateRangePickerModal from '@/modal/DateRangePickerModal';
import ClientSearchModal from '@/modal/order/ClientSearchModal';

export default {
  components: {
    MultipleSelect,
    DateRangePickerModal,
    ClientSearchModal,
  },
  props: {
    page: {
      type: String,
    },
    authButton: {
      type: Object,
    },
    openInfo: {
      type: Object,
    },
  },
  data() {
    return {
      searchOpen: true,
      search_box_height: '',
      custId: 0,
      prdtClsCd: {},
      carTypeCd: {},
      offrCls: [],
      offrClsCd: [],
      prdtCd: '',
      staff: [],
      staffCd: [],
      filter: '',
      offrOptions: [],
      prdtClsOptions: [],
      carTypeOptions: [],
      staffOptions: [],
      custNm: '',
      default: 'today',
      date: {},
      dateOption: {},
      dateOptions: [
        { text: this.$t('message.fwdReqDt'), value: 'reqDt' },
        { text: this.$t('message.hopeDt'), value: 'hopeDt' },
        { text: this.$t('message.offrDt'), value: 'offrDt' },
      ],
      time: [],
      oldDate: [],
      datesDtls: '',
      intervalId: '',
      outStatOptions: [],
      outStatCd: [],
      statusDefault: {},
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      email: 'userInfo/getUserEmail',
    }),
  },
  watch: {
    custNm(nm) {
      if (nm == '') {
        this.custNm = '';
        this.custId = 0;
      }
    },
    openInfo() {
      this.setOpenInfoData();
    },
    outStatCd() {
      console.log('check', this.outStatCd);
    },
  },
  methods: {
    getInfoHeight() {
      let val = this.$refs.search_box_height.scrollHeight + 17;
      // search_box_height 의 높이값 받아온다
      this.search_box_height = `${val}px`;
    },
    datePicker() {
      this.oldDate = this.time;
      this.$modal.show('DateRangePicker');
    },
    showSelectDate(selectDate) {
      this.time = selectDate;
      this.oldDate = selectDate;
      this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
    },
    setDefaultDates(time) {
      if (time) {
        this.time = time;
        this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      }
    },
    clientSearch() {
      this.userMenuGrpCd === 'CUSTOMER' ? (this.custId = this.userInfo.custId) : this.custId;
      this.$refs.ClientSearchModal.customerList(this.custNm, 'info');
      if (this.custNm === '') {
        this.$modal.show('ClientSearchModal');
      }
    },
    sendInfoInput(result) {
      if (result.length === 1) {
        this.sendCustId(result[0].custId);
      } else {
        this.$modal.show('ClientSearchModal', { custNm: this.custNm });
      }
    },
    sendCustId(id) {
      if (typeof id === 'object') {
        if (id.length > 1 || id.length === 0) {
          this.$modal.show('ClientSearchModal', { custNm: this.custNm });
        } else {
          this.custId = id[0].custId;
          this.getUserOfferInfo();
        }
      } else if (id !== '') {
        this.custId = id;
        this.getUserOfferInfo();
      }
    },
    async getUserOfferInfo() {
      try {
        const param = this.userMenuGrpCd === 'CUSTOMER' ? { custId: this.userInfo.custId } : { custId: this.custId };
        const response = await orderApi.getUserOfferInfo(param);
        const userOfferInfo = response.data.rs;
        this.custNm = userOfferInfo.custNm;
      } catch (e) {
        console.log(e);
      }
    },
    async getCommonCodeCombo(groupCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: '',
        };
        const response = await commonApi.getCommonCodeCombo(param);
        let all = { text: this.$t('message.all'), value: '' };
        let all00 = { text: this.$t('message.all'), value: '00' };
        if (groupCd === 'OFFR_CLS_CD') {
          this.offrOptions = response.data.ds;
          this.offrOptions.unshift(all00);
          this.offrClsCd = this.offrOptions[0];
        } else if (groupCd === 'PRDT_CLS_CD') {
          this.prdtClsOptions = response.data.ds;
          this.prdtClsOptions.unshift(all);
          this.prdtClsCd = this.prdtClsOptions[0];
        } else if (groupCd === 'CAR_TYPE') {
          this.carTypeOptions = response.data.ds;
          this.carTypeOptions.unshift(all);
          this.carTypeCd = this.carTypeOptions[0];
        } else if (groupCd === 'OUT_STATUS' || groupCd === 'TRAN_STATUS') {
          this.outStatOptions = response.data.ds;
          this.outStatOptions.unshift(all);
          this.outStatCd = this.outStatOptions[0];
          console.log('getCommonCombo', this.outStatCd);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getStaffCombo() {
      try {
        const resp = await commonApi.getStaffCombo();

        this.staffOptions = resp.data.ds;
        this.staffOptions.unshift({ text: this.$t('message.all'), value: '00' });
        this.staffCd = this.staffOptions[0];
      } catch (e) {
        console.log(e);
        this.$EventBus.$emit('openYesModal', e.err.data.message);
      }
    },
    setCd(cds, type) {
      if (type === 'offrCls') {
        this.offrClsCd = cds;
        this.offrCls = [];
        this.offrClsCd.forEach(cd => {
          this.offrCls.push(cd.value);
        });
      } else if (type === 'staff') {
        this.staffCd = cds;
        this.staff = [];
        this.staffCd.forEach(cd => {
          this.staff.push(cd.value);
        });
        if (this.staff.some(one => one.includes('00') && !one.includes('D'))) {
          this.staff = [];
        }
      } else if (type === 'outStat') {
        this.outStatCd = [];
        cds.forEach(cd => {
          this.outStatCd.push(cd.value);
        });
        console.log('setCd', this.outStatCd);
      }
    },
    async getDeliveryList() {
      try {
        this.userMenuGrpCd === 'CUSTOMER' ? (this.custId = this.userInfo.custId) : this.custId;
        const param = {
          custId: this.custId === 0 ? '' : this.custId,
          offrCls: this.offrCls[0] === '00' ? '' : this.offrCls,
          prdtClsCd: this.prdtClsCd.value,
          trnCarType: this.carTypeCd.value,
          prdtCd: this.prdtCd,
          dateCls: this.dateOption.value,
          sttDt: this.time[0],
          endDt: this.time[1],
          filter: this.filter,
          salesUsers: this.staff[0] === '00' ? '' : this.staff,
          // outStatCd: this.outStatCd[0] === '00' ? '' : this.outStatCd,
        };
        if (this.userMenuGrpCd === 'CUSTOMER') {
          param.outStatCd = '';
          param.trnStatCd = this.outStatCd[0] === '00' ? '' : this.outStatCd;
          console.log('this.oustStatCd', this.outStatCd, this.outStatCd[0]);
        } else {
          param.trnStatCd = '';
          param.outStatCd = this.outStatCd[0] === '00' ? '' : this.outStatCd;
        }
        const response = await tranApi.getDeliveryList(param);
        console.log('getList', param);
        this.deliveryStatusList = response.data.ds;
        this.$emit('sendDeliveryStatusList', this.deliveryStatusList);
      } catch (e) {
        console.log(e);
      }
    },
    async search() {
      if (this.authButton.schAuth === 'Y') {
        this.deliveryStatusList = [];
        // if (this.userMenuGrpCd !== 'CUSTOMER') {
        //   if (this.custId == 0) {
        //     this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
        //   } else {
        //     this.$refs.filter.blur();
        //     this.$refs.prdtCd.blur();
        //     this.getDeliveryList();
        //   }
        // } else {
        this.$refs.filter.blur();
        this.$refs.prdtCd.blur();
        this.getDeliveryList();
        // }
      }
    },
    async reset() {
      this.statusDefault = '';
      this.prdtCd = '';
      this.filter = '';
      this.prdtClsCd = this.prdtClsOptions[0];
      this.carTypeCd = this.carTypeOptions[0];
      this.dateOption = this.dateOptions[0];
      this.custNm = '';
      this.custId = 0;
      this.userMenuGrpCd === 'CUSTOMER' ? (this.custId = this.userInfo.custId) : 0;
      await this.$refs.offrOptions.select({ value: 'reset' });
      await this.$refs.staffOptions.select({ value: 'reset' });
      this.$refs.outStatOption.select({ value: 'reset' });
      this.$refs.rangeDate.init();
    },
    searchReady() {
      if (this.offrOptions.length > 0 && this.prdtClsOptions.length > 0 && this.carTypeOptions.length > 0 && this.staffOptions.length > 0 && this.userMenuGrpCd !== 'CUSTOMER') {
        // this.search();
        clearInterval(this.intervalId);
        this.intervalId = '';
      } else if (this.offrOptions.length > 0 && this.prdtClsOptions.length > 0 && this.carTypeOptions.length > 0 && this.userMenuGrpCd === 'CUSTOMER') {
        this.search();
        clearInterval(this.intervalId);
        this.intervalId = '';
      }
    },
    setOpenInfoData() {
      this.reset();
      this.statusDefault = this.openInfo.etcData.trnStatus ?? '';
      this.outStatCd.push(this.statusDefault === '' ? '00' : this.statusDefault);
      console.log('setOpenInfoData', this.outStatCd);
      if (this.intervalId === '') {
        this.intervalId = setInterval(this.searchReady, 100);
      }
    },
  },
  async created() {
    this.dateOption = this.dateOptions[0];

    if (this.userMenuGrpCd === 'CUSTOMER') {
      this.staff = '';
      this.getCommonCodeCombo('OFFR_CLS_CD');
      this.getCommonCodeCombo('PRDT_CLS_CD');
      this.getCommonCodeCombo('CAR_TYPE');
      this.getCommonCodeCombo('TRAN_STATUS');
      // await this.search();
    } else {
      this.getCommonCodeCombo('OFFR_CLS_CD');
      this.getCommonCodeCombo('PRDT_CLS_CD');
      this.getCommonCodeCombo('CAR_TYPE');
      await this.getCommonCodeCombo('OUT_STATUS');
      this.getStaffCombo();
    }
  },
  mounted() {
    this.getInfoHeight();
    this.setOpenInfoData();
  },
};
</script>
