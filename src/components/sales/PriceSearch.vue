<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <div class="search_box">
      <div class="search_box_filter">
        <div class="filter_list">
          <label for="" class="filter_type" v-if="page === 'salePriceList'">
            <span class="filter_type_title">{{ $t('message.custNm') }}</span>
            <!-- 데이터피커 -->
            <div class="form_inputnbtn essential">
              <input type="text" style="" id="custoer_name" placeholder="" v-model="custNm" @keyup.enter="clientSearch" />
              <button class="btn_search_basic_info" @click="clientSearch"><img src="@/assets/img/icon_search.png" /></button>
            </div>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.categorySubject') }}</span>
            <MultipleSelect :options="prdtClsCdOptions" :all="true" @select="setPrdtClsCd" ref="prdtClsCdOptions" />
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.materialCode') }}</span>
            <!-- 데이터피커 -->
            <div class="form_inputnbtn">
              <input type="text" style="" id="custoer_name" placeholder="" ref="filter" v-model="filter" @keyup.enter="[search(), resetPageNumber()]" />
              <button class="btn_search_basic_info" v-if="this.authButton.schAuth === 'Y'" @click="[search(), resetPageNumber()]">
                <!-- <img src="@/assets/img/icon_search.png" /> -->
              </button>
            </div>
          </label>
          <label for="" class="filter_type" v-if="page === 'itemPriceList'">
            <span class="filter_type_title">{{ $t('message.selectPeriod') }}</span>
            <!-- 데이터피커 -->
            <div class="form_calendar w_100" @click="$modal.show('PriceDateRangePicker')">
              <input type="text" v-model="showDate" />
              <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
            </div>
          </label>
          <div style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" v-if="this.authButton.schAuth === 'Y'" @click="[search(), resetPageNumber()]">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
        <div class="filter_list">
          <label for="" class="filter_type" v-if="page === 'salePriceList'">
            <span class="filter_type_title">{{ $t('message.selectPeriod') }}</span>
            <!-- 데이터피커 -->
            <div class="form_calendar w_100" @click="$modal.show('PriceDateRangePicker')">
              <input type="text" v-model="showDate" />
              <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
            </div>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.status') }}</span>
            <MultipleSelect :options="priceApprStatCdOptions" :all="true" @select="setPriceApprCd" ref="priceApprStatCdOptions" />
          </label>
        </div>
      </div>
    </div>
    <PriceDateRangePicker @selectDateRange="selectDateRange" ref="rangeDate" />
    <ClientSearchModal @sendCustInfo="getCustInfo" ref="PriceClientSearchModal" @sendInfoInput="sendInfoInput" />
  </div>
  <!-- //검색필터 영역 -->
</template>

<script>
import MultipleSelect from '@/components/commonComponent/MultipleSelect';
import PriceDateRangePicker from '@/modal/sales/DateRangePickerModal';
import ClientSearchModal from '@/modal/sales/ClientSearchModal';
import commonApi from '@/api/common';
import salesApi from '@/api/sales/sales';

export default {
  props: ['page', 'changePageNumber', 'authButton'],
  data() {
    return {
      filter: '',
      prdtClsCd: [],
      priceApprStatCd: [],
      prdtClsCdOptions: [],
      priceApprStatCdOptions: [
        { text: this.$t('message.all'), value: '전체' },
        { text: this.$t('Y'), value: 'Y' },
        { text: this.$t('N'), value: 'N' },
      ],
      checkboxMultiselect: false,
      showDate: '',
      time: [],
      priceListRows: [],
      custInfo: {},
      pageNumber: 0,
      pageSize: 15,
      pageInfo: {},
      custNm: '',
    };
  },
  watch: {
    changePageNumber() {
      this.pageNumber = this.changePageNumber;
      this.search();
    },
  },
  components: {
    MultipleSelect,
    PriceDateRangePicker,
    ClientSearchModal,
  },
  methods: {
    clientSearch() {
      this.$refs.PriceClientSearchModal.customerList(true, this.custNm);
      if (!this.custNm || this.custNm === '') {
        this.$modal.show('PriceClientSearchModal');
      }
    },
    sendInfoInput(result) {
      if (result.length === 1) {
        this.custInfo = result[0];
        this.custNm = this.custInfo.custNm;
        this.$emit('sendCustInfo', this.custInfo);
      } else {
        this.$modal.show('PriceClientSearchModal', { custNm: this.custNm });
      }
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd,
          useYn: 'Y',
          prntCd,
        };
        const resp = await commonApi.getCommonCodeCombo(param);
        if (resp.data.status === 200) {
          if (groupCd === 'PRDT_CLS_CD') {
            this.prdtClsCdOptions = resp.data.ds;
            // this.prdtClsCdOptions.unshift({ text: '전체', value: '전체' });
          }
          // else if (groupCd === 'PRICE_APPR_STAT_CD') {
          //   this.priceApprStatCdOptions = resp.data.ds;
          //   this.$emit('priceApprStatCdOptions', this.priceApprStatCdOptions);
          // }
        }
      } catch (e) {
        console.log(e);
      }
    },
    setPrdtClsCd(cd) {
      this.prdtClsCd = cd;
    },
    setPriceApprCd(cd) {
      this.priceApprStatCd = cd;
    },
    selectDateRange(date) {
      this.showDate = date.show;
      this.time = date.time;
    },
    resetPageNumber() {
      this.$emit('resetPageNumber', 0);
    },
    search() {
      if (this.page === 'itemPriceList') {
        this.getItemBasePriceList();
      } else if (this.page === 'salePriceList') {
        this.getClientItemPriceList();
      }
    },
    setParam() {
      let prdtClsCd = '';
      let apprYn = '';
      this.prdtClsCd.forEach(cd => {
        if (cd.value !== '전체') {
          prdtClsCd += cd.value + ',';
        }
      });
      for (let i = 0; i < this.priceApprStatCd.length; i++) {
        if (this.priceApprStatCd[i].value === '전체') {
          apprYn = '';
          break;
        } else {
          apprYn += this.priceApprStatCd[i].value + ',';
        }
      }

      const param = {
        sttDt: this.time.length > 0 ? this.time[0] : '',
        endDt: this.time.length > 0 ? this.time[1] : '',
        filter: this.filter,
        apprYn: (apprYn.match(/,/g) || []).length > 0 ? apprYn.replaceAll(',', '') : '',
        prdtClsCd: (prdtClsCd.match(/,/g) || []).length === 2 ? '' : prdtClsCd.replaceAll(',', ''),
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      };
      return param;
    },
    async getItemBasePriceList() {
      try {
        const param = this.setParam();

        const resp = await salesApi.getItemBasePriceList(param);
        this.$refs.filter.blur();
        this.priceListRows = resp.data.ds;
        this.$emit('sendSearchList', this.priceListRows);
        this.pageInfo = resp.data.page;
        this.$emit('sendPageInfo', this.pageInfo);
      } catch (e) {
        console.log(e);
      }
    },
    async getClientItemPriceList() {
      if (this.custInfo.custId) {
        this.$refs.filter.blur();
        try {
          const param = this.setParam();
          param.custId = this.custInfo.custId;

          const resp = await salesApi.getClientItemPriceList(param);
          this.priceListRows = resp.data.ds;
          this.$emit('sendSearchList', this.priceListRows);
          this.pageInfo = resp.data.page;
          this.$emit('sendPageInfo', this.pageInfo);
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
      }
    },
    getCustInfo(custInfo) {
      if (custInfo === '') {
        this.custNm = this.custInfo.custNm;
      } else {
        this.custInfo = custInfo;
        this.custNm = this.custInfo.custNm;
        this.$emit('sendCustInfo', custInfo);
      }
    },
    reset() {
      this.filter = '';
      this.custInfo = {};
      this.custNm = '';
      this.$refs.prdtClsCdOptions.select({ value: 'reset' });
      this.$refs.priceApprStatCdOptions.select({ value: 'reset' });
      this.$refs.rangeDate.init();
    },
    getTime() {
      return this.time;
    },
  },
  created() {
    this.getCommonCodeCombo('PRDT_CLS_CD');
    this.$emit('priceApprStatCdOptions', this.priceApprStatCdOptions);
    if (this.page === 'itemPriceList') {
      this.search();
    }
    // this.getCommonCodeCombo('PRICE_APPR_STAT_CD');
  },
};
</script>

<style></style>
