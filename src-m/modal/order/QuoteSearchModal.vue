<template>
  <modal name="QuoteSearchModal" width="100%" height="100%" :adaptive="true" @before-close="close()">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.quoteSearch') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('QuoteSearchModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="quote_search_contents">
          <div class="list_form_section">
            <ul class="list_ul">
              <li class="list_li" v-if="(page == 'order' && authButton.fn4 == 'Y') || (page == 'sample' && authButton.fn1 == 'Y')">
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
                <label class="list_title">{{ $t('message.offrStatNm') }}</label>
                <MultipleSelect :default="dashFilter" :options="offrStatCdOptions" :all="true" @select="cds => setCd(cds, 'offrStat')" :isBefore="offrStatCd" />
              </li>
              <li class="list_li" v-if="userMenuGrpCd !== 'CUSTOMER'">
                <label class="list_title">{{ $t('message.sales') }}</label>
                <MultipleSelect :options="staffOptions" :all="false" :default="email" @select="cds => setCd(cds, 'staff')" :isBefore="salesUsers" />
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.searchWord') }}</label>
                <span class="list_form"><input type="text" class="d_input" :placeholder="$t('message.placeholderOrderList')" v-model="filter" /></span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_cancle" @click="$modal.hide('QuoteSearchModal')">{{ $t('message.btnCancel') }}</button>
            <button class="btn_add" @click="getQuoteManageList(true)">{{ $t('message.btnSearch') }}</button>
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
import orderApi from '@/api/order/order';
import commonApi from '@/api/common';
import DateRangePickerModal from '@m/modal/DateRangePickerModal';
import MultipleSelect from '@m/components/commonComponent/MultipleSelect';
import CustomerSearchModal from '@m/modal/order/CustomerSearchModal';

export default {
  //  name: 'ProductSearchModal',
  props: ['offrClsCd', 'pageNumber', 'page', 'dashFilter'],
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
      offrStatCd: '',
      offrStatCdOptions: [],
      custNm: '',
      userInfo: {},
      maxDays: 365,
      staffOptions: [],
      salesUsers: '',
      count: 0,
    };
  },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
      userCustId: 'userInfo/getUserCustId',
      email: 'userInfo/getUserEmail',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  watch: {
    pageNumber() {
      if (this.pageNumber > 0) this.getQuoteManageList();
    },
  },
  methods: {
    close() {
      this.count = 0;
    },
    selectDateRange(date) {
      this.date = date;
    },
    async getQuoteManageList(click = false, reload = false) {
      try {
        if (click && this.pageNumber !== 0) {
          this.$emit('resetPageNum');
        }
        const param = {
          custId: Object.keys(this.userInfo).length > 0 ? this.userInfo.custId : this.userCustId,
          sttDt: this.date.time ? this.date.time[0] : dayjs().add(-this.maxDays, 'day').format('YYYY-MM-DD'),
          endDt: this.date.time ? this.date.time[1] : dayjs().format('YYYY-MM-DD'),
          prdtClsCd: (this.prdtClsCd.match(/,/g) || []).length === 2 ? '' : this.prdtClsCd.replaceAll(',', ''),
          offrStatusCds: this.offrStatCd === '' ? '' : this.offrStatCd,
          offrClsCd: this.offrClsCd,
          filter: this.filter,
          pageNumber: click ? 0 : this.pageNumber,
          pageSize: 10,
          salesUsers: this.salesUsers,
        };
        const resp = await orderApi.getQuoteManageList(param);
        this.$emit('sendQuoteList', { list: resp.data.ds, click, reload, page: resp.data.page });
        this.$modal.hide('QuoteSearchModal');
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
        if (groupCd === 'OFFER_STATUS') {
          this.offrStatCdOptions = [{ value: '00', text: this.$t('message.all') }, ...resp.data.ds];
          // this.offrStatCdOptions.splice(1, 1);
          if (this.dashFilter) this.offrStatCd = this.offrStatCdOptions.find(option => option.value == this.dashFilter)?.value;
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
      if (type === 'offrStat') {
        if (this.offrStatCd.length > 1 && this.count < 3) {
          const backOfftStatCd = this.offrStatCd;
          this.offrStatCd = backOfftStatCd;
        } else {
          this.offrStatCd = cd;
        }
        this.count++;
      } else if (type === 'prdtClsCd') {
        if (this.prdtClsCd.length > 1 && this.count < 3) {
          const backPrdtClsCd = this.prdtClsCd;
          this.prdtClsCd = backPrdtClsCd;
        } else {
          this.prdtClsCd = cd;
        }
        this.count++;
      } else if (type === 'staff') {
        if (this.salesUsers.length > 1 && this.count < 3) {
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
  async mounted() {
    await this.getCommonCodeCombo('OFFER_STATUS');
    await this.getCommonCodeCombo('PRDT_CLS_CD');
    if (this.userMenuGrpCd !== 'CUSTOMER') this.getStaffCombo();
    this.getQuoteManageList();
  },
};
</script>

<style></style>
