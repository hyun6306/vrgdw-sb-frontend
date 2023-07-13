<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <div ref="search_box_height" :class="{ search_close_01: searchOpen }" :style="`height:${search_box_height}`" class="search_box">
      <div class="search_box_filter always_exposure">
        <div class="filter_list">
          <label for="" class="filter_type" v-if="this.authButton.schAuth === 'Y'">
            <span class="filter_type_title">{{ $t('message.custNm') }}</span>
            <!-- 데이터피커 -->
            <div class="form_inputnbtn">
              <input type="text" style="" id="custoer_name" placeholder="" v-model="custNm" @keyup.enter="clientSearch" />
              <button class="btn_search_basic_info" @click="clientSearch"><img src="@/assets/img/icon_search.png" /></button>
            </div>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.categorySubject') }}</span>
            <MultipleSelect :options="prdtClsCdOptions" :all="true" @select="cds => setCd(cds, 'prdtClsCd')" ref="prdtClsCdOptions" />
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.soYn') }}</span>
            <MultiSelect id="Material_Group" style="width: 100%" v-model="soYn" :options="soOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
          </label>

          <div style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset" v-if="this.authButton.schAuth === 'Y'">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" v-if="this.authButton.schAuth === 'Y'" @click="getAllocationList">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
      <div class="search_box_filter f_action c_action02">
        <div class="filter_list">
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.asgnStatus') }}</span>
            <MultipleSelect :options="bookingStatSopOptions" :all="true" @select="cds => setCd(cds, 'bookingStatCd')" ref="bookingStatSopOptions" />
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.plant') }}</span>
            <MultipleSelect :options="plntCdOptions" :all="true" @select="cds => setCd(cds, 'plntCd')" ref="plntCdOptions" />
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.bokngCfmDt') }}</span>
            <!-- 데이터피커 -->
            <div class="form_calendar w_100" @click="$modal.show('PriceDateRangePicker')">
              <input type="text" v-model="timeInfo.show" />
              <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
            </div>
          </label>
        </div>
      </div>
      <div class="search_box_filter f_action c_action01">
        <div class="filter_list">
          <label for="" class="filter_type filter_type_double">
            <span class="filter_type_title">{{ $t('message.keyword') }}</span>
            <!-- 데이터피커 -->
            <div class="form_input">
              <input type="text" style="" id="custoer_name" ref="filter" v-model="filter" @keyup.enter="getAllocationList" :placeholder="$t('message.placeholderBkngList')" />
              <!-- <button class="btn_search_basic_info" v-if="this.authButton.schAuth === 'Y'" @click="getBookingList"><img src="@/assets/img/icon_search.png" /></button> -->
            </div>
          </label>
        </div>
      </div>
    </div>
    <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button>
    <ClientSearchModal @sendCustInfo="getCustInfo" ref="ClientSearchModal" @sendInfoInput="sendInfoInput" />
    <DateRangePickerModal @selectDateRange="getDate" :maxDays="365" ref="rangeDate" />
  </div>
  <!-- //검색필터 영역 -->
</template>

<script>
import MultipleSelect from '@/components/commonComponent/MultipleSelect';
import ClientSearchModal from '@/modal/sales/ClientSearchModal';
import commonApi from '@/api/common';
import bookingApi from '@/api/order/booking';
import DateRangePickerModal from '@/modal/sales/DateRangePickerModal';

export default {
  props: ['page', 'authButton'],
  components: {
    MultipleSelect,
    ClientSearchModal,
    DateRangePickerModal,
  },
  data() {
    return {
      searchOpen: true,
      search_box_height: '',
      custId: 0,
      custNm: '',
      filter: '',
      prdtClsCdOptions: [],
      bookingStatSopOptions: [],
      plntCdOptions: [],
      prdtClsCd: '',
      bookingStatCd: '',
      plntCd: '',
      timeInfo: {},
      soOptions: [
        { text: this.$t('message.all'), value: '' },
        { text: this.$t('Y'), value: 'Y' },
        { text: this.$t('N'), value: 'N' },
      ],
      soYn: {},
      intervalId: '',
      custInfo: {},
    };
  },
  methods: {
    getInfoHeight() {
      let val = this.$refs.search_box_height.scrollHeight + 18;
      // search_box_height 의 높이값 받아온다
      this.search_box_height = `${val}px`;
    },
    clientSearch() {
      this.$refs.ClientSearchModal.customerList(true, this.custNm);
      if (this.custNm === '') {
        this.$modal.show('PriceClientSearchModal');
      }
    },
    sendInfoInput(result) {
      if (result.length === 1) {
        this.custId = result[0].custId;
        this.custNm = result[0].custNm;
        this.custInfo = result[0];
      } else {
        this.$modal.show('PriceClientSearchModal', { custNm: this.custNm });
      }
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);

        if (groupCd === 'PRDT_CLS_CD') {
          this.prdtClsCdOptions = response.data.ds;
        } else if (groupCd === 'BOOKING_STATUS_SOP') {
          this.bookingStatSopOptions = response.data.ds;
          this.bookingStatSopOptions.unshift({ text: this.$t('message.all'), value: '00' });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getPlantCombo() {
      try {
        const param = {};

        const resp = await commonApi.getPlantCombo(param);
        this.plntCdOptions = resp.data.ds;
        this.plntCdOptions.unshift({ text: this.$t('message.all'), value: '00' });
        this.$emit('sendPlntCdOptions', this.plntCdOptions);
      } catch (e) {
        console.log(e);
      }
    },
    async getAllocationList(type = '') {
      if (this.authButton.schAuth === 'Y') {
        this.$refs.filter.blur();
        try {
          const param = {
            custId: this.custId === 0 ? '' : this.custId,
            // custId: this.custId,
            prdtClsCd: (this.prdtClsCd.match(/,/g) || []).length === 2 ? '' : this.prdtClsCd.replaceAll(',', ''),
            bokngStatCd: this.bookingStatCd === '' ? this.bookingStatSopOptions.map(data => data.value).join(',') : this.bookingStatCd,
            filter: this.filter,
            sttDt: '',
            endDt: '',
            plant: this.plntCd,
            prdcReqYn: '',
            sttCfmDt: this.timeInfo.time[0],
            endCfmDt: this.timeInfo.time[1],
            soYn: this.soYn.value,
            pageNumber: '',
            pageSize: '',
            salesUsers: '',
          };
          const resp = await bookingApi.getAllocationList(param);
          if (resp.data.status === 200) {
            const bookingList = [];
            resp.data.ds.forEach(ds => {
              const orignal = ds;
              const customerInfo = orignal.customerInfo;
              const productInfo = orignal.productInfo;

              delete orignal['customerInfo'];
              delete orignal['productInfo'];

              bookingList.push({ ...orignal, ...customerInfo, ...productInfo });
            });
            const noneExptBookingList = bookingList.filter(list => list.exptStatCd === null || list.exptStatCd === '' || list.exptStatCd === undefined);
            this.$emit('searchBookingList', { bookingList: noneExptBookingList, type });
          }
          resp;
        } catch (e) {
          console.log(e);
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        }
      }
    },
    setCd(cds, kind) {
      let cd = this.makeCd(cds);
      if (kind === 'prdtClsCd') {
        this.prdtClsCd = cd;
      } else if (kind === 'bookingStatCd') {
        this.bookingStatCd = cd;
      } else if (kind === 'plntCd') {
        this.plntCd = cd;
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
    getDate(timeInfo) {
      this.timeInfo = timeInfo;
    },
    getCustInfo(custInfo) {
      if (custInfo === '') {
        this.custNm = this.custInfo.custNm;
      } else {
        this.custId = custInfo.custId;
        this.custNm = custInfo.custNm;
        this.custInfo = custInfo;
        // this.$emit('sendCustInfo', custInfo);
      }
    },
    reset() {
      this.custNm = '';
      this.custId = 0;
      this.filter = '';
      this.soYn = this.soOptions[0];
      this.$refs.plntCdOptions.select({ value: 'reset' });
      this.$refs.prdtClsCdOptions.select({ value: 'reset' });
      this.$refs.bookingStatSopOptions.select({ value: 'reset' });
      this.$refs.rangeDate.init();
    },
    searchReady() {
      if (this.prdtClsCdOptions.length > 0 && this.bookingStatSopOptions.length > 0 && this.plntCdOptions.length > 0) {
        this.getAllocationList();
        clearInterval(this.intervalId);
      }
    },
  },
  created() {
    this.soYn = this.soOptions[0];
  },
  mounted() {
    this.getInfoHeight();
    this.getCommonCodeCombo('PRDT_CLS_CD'); // 품목
    this.getCommonCodeCombo('BOOKING_STATUS_SOP'); // 할당상태
    this.getPlantCombo(); // 플랜트
    this.intervalId = setInterval(this.searchReady, 100);
  },
};
</script>

<style></style>
