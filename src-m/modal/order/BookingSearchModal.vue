<template>
  <modal name="BookingSearchModal" width="100%" height="100%" :adaptive="true" @before-close="close()">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.searchBooking') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('BookingSearchModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="quote_search_contents">
          <div class="list_form_section">
            <ul class="list_ul">
              <li class="list_li" v-if="authButton.fn5Auth === 'Y'">
                <label class="list_title">{{ $t('message.custNm') }}</label>
                <div class="form_searchm">
                  <input type="text" placeholder="" v-model="custNm" />
                  <button class="icon_search in_img" @click="searchCustomer"><img src="@m/assets/img/icon_search_w.png" /></button>
                </div>
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.quoteWriteDt') }}</label>
                <div class="form_calendar" @click="$modal.show('DateRangePicker')">
                  <input type="text" placeholder="" readonly v-model="date.show" />
                  <button class="icon_calendar"><img src="@m/assets/img/icon_calendar.png" /></button>
                </div>
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.categorySubject') }}</label>
                <MultipleSelect :options="prdtClsCdOptions" :all="true" @select="cds => setCd(cds, 'prdtClsCd')" :isBefore="prdtClsCd" />
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.deliveryStatus') }}</label>
                <MultipleSelect :default="dashFilters" :options="bookginStatCdOptions" :all="true" @select="cds => setCd(cds, 'bokngStat')" :isBefore="bookingStatCd" />
              </li>
              <li class="list_li" v-if="authButton.fn5Auth === 'Y'">
                <label class="list_title">{{ $t('message.sales') }}</label>
                <MultipleSelect :options="staffOptions" :all="false" :default="email" @select="cds => setCd(cds, 'staff')" :isBefore="salesUsers" />
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.searchWord') }}</label>
                <span class="list_form"><input type="text" class="d_input" :placeholder="$t('message.placeholderBkngList')" v-model="filter" /></span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_cancle" @click="$modal.hide('BookingSearchModal')">{{ $t('message.btnCancel') }}</button>
            <button class="btn_add" @click="getBookingList(true)">{{ $t('message.search') }}</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
    <DateRangePickerModal :maxDays="maxDays" @selectDateRange="selectDateRange" />
    <CustomerSearchModal ref="CustomerSearch" @sendCustInfo="getCustInfo" />
  </modal>
</template>
<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import bookingApi from '@/api/order/booking';
import commonApi from '@/api/common';
import DateRangePickerModal from '@m/modal/DateRangePickerModal';
import MultipleSelect from '@m/components/commonComponent/MultipleSelect';
import CustomerSearchModal from '@m/modal/order/CustomerSearchModal';

export default {
  //  name: 'ProductSearchModal',
  props: ['offrClsCd', 'pageNumber', 'dashFilter'],
  components: {
    DateRangePickerModal,
    MultipleSelect,
    CustomerSearchModal,
  },
  data() {
    return {
      date: {},
      filter: '',
      prdtClsCd: '',
      prdtClsCdOptions: [],
      bookingStatCd: '',
      bookginStatCdOptions: [],
      custNm: '',
      userInfo: {},
      maxDays: 365,
      staffOptions: [],
      salesUsers: '',
      count: 0,
      dashFilters: '',
    };
  },
  watch: {
    pageNumber() {
      if (this.pageNumber > 0) this.getBookingList();
    },
    dashFilter() {
      this.dashFilters = this.dashFilter.split(',');
    },
  },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
      userCustId: 'userInfo/getUserCustId',
      email: 'userInfo/getUserEmail',
    }),
  },
  methods: {
    close() {
      this.count = 0;
    },
    selectDateRange(date) {
      this.date = date;
    },
    async getBookingList(click = false, reload = false) {
      try {
        if (click && this.pageNumber !== 0) {
          this.$emit('resetPageNum');
        }
        const param = {
          custId: Object.keys(this.userInfo).length > 0 ? this.userInfo.custId : this.userCustId,
          // custId: this.custId,
          prdtClsCd: (this.prdtClsCd.match(/,/g) || []).length === 2 ? '' : this.prdtClsCd.replaceAll(',', ''),
          bokngStatCd: this.bookingStatCd === '' ? '' : this.bookingStatCd,
          filter: this.filter,
          sttDt: this.date.time ? this.date.time[0] : dayjs().add(-this.maxDays, 'day').format('YYYY-MM-DD'),
          endDt: this.date.time ? this.date.time[1] : dayjs().format('YYYY-MM-DD'),
          plant: '',
          prdcReqYn: '',
          sttCfmDt: '',
          endCfmDt: '',
          soYn: '',
          pageNumber: click ? 0 : this.pageNumber,
          pageSize: 10,
          salesUsers: this.salesUsers,
        };
        const resp = await bookingApi.getBookingList(param);
        const bookingList = [];
        resp.data.ds.forEach(ds => {
          const orignal = ds;
          const customerInfo = orignal.customerInfo;
          const productInfo = orignal.productInfo;

          delete orignal['customerInfo'];
          delete orignal['productInfo'];

          bookingList.push({ ...orignal, ...customerInfo, ...productInfo });
        });
        this.$emit('searchBookingList', { list: bookingList, click, reload, page: resp.data.page });
        this.$modal.hide('BookingSearchModal');
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getCommonCodeCombo(groupCd) {
      try {
        const param = {
          groupCd,
          useYn: 'Y',
          prntCd: '',
        };
        const resp = await commonApi.getCommonCodeCombo(param);
        // const all = {
        //   value: '전체',
        //   text: 'ALL',
        // };
        if (groupCd === 'BOOKING_STATUS' || groupCd === 'BOOKING_STATUS_CUSTOMER') {
          this.bookginStatCdOptions = [{ value: '00', text: this.$t('message.all') }, ...resp.data.ds];
          // if (groupCd === 'BOOKING_STATUS_CUSTOMER') this.bookginStatCdOptions.splice(0, 0, all);
          if (this.dashFilter) {
            this.bookingStatCd = this.bookginStatCdOptions.filter(option => {
              let value = option.value;
              return this.dashFilter.includes(value);
            });
            this.bookingStatCd = this.makeCd(this.bookingStatCd);
          }
        } else if (groupCd === 'PRDT_CLS_CD') {
          this.prdtClsCdOptions = [{ value: '00', text: this.$t('message.all') }, ...resp.data.ds];
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
    setCd(cds, type) {
      let cd = this.makeCd(cds);
      if (type === 'bokngStat') {
        if (this.bookingStatCd?.length > 1 && this.count < 3) {
          const backBookingStatCd = this.bookingStatCd;
          this.bookingStatCd = backBookingStatCd;
        } else {
          this.bookingStatCd = cd;
        }
        this.count++;
      } else if (type === 'prdtClsCd' && this.count < 3) {
        if (this.prdtClsCd?.length > 1) {
          const backPrdtClsCd = this.prdtClsCd;
          this.prdtClsCd = backPrdtClsCd;
        } else {
          this.prdtClsCd = cd;
        }
        this.count++;
      } else if (type === 'staff') {
        if (this.salesUsers?.length > 1 && this.count < 3) {
          const backSalesUsers = this.salesUsers;
          this.salesUsers = backSalesUsers;
        } else {
          this.salesUsers = cd;
        }
        this.count++;
      }
    },
    makeCd(cds) {
      let cd = '';
      for (let i = 0; i < cds.length; i++) {
        if (cds[i].value.includes('00') || cds[i].value === '전체') {
          cd = '';
          break;
        } else {
          cd = cd + cds[i].value + ',';
        }
      }
      return cd;
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
        this.userInfo = selectCust[0];
        this.custNm = this.userInfo.custNm;
      } else if (selectCust.length && (selectCust.length > 1 || selectCust.length === 0)) {
        this.$modal.show('CustomerSearchModal', { filter: this.custNm });
      } else {
        this.custNm = this.userInfo.custNm;
      }
    },
    async getStaffCombo() {
      try {
        const resp = await commonApi.getStaffCombo();

        this.staffOptions = resp.data.ds;
        this.staffOptions.unshift({ text: this.$t('message.all'), value: '00' });
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  async created() {
    if (this.authButton.fn5Auth === 'Y') {
      await this.getCommonCodeCombo('BOOKING_STATUS');
    } else {
      await this.getCommonCodeCombo('BOOKING_STATUS_CUSTOMER');
    }
    this.getCommonCodeCombo('PRDT_CLS_CD');
    if (this.authButton.fn5Auth === 'Y') this.getStaffCombo();
    this.getBookingList();
  },
};
</script>

<style></style>
