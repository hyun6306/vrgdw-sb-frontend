<template>
  <div class="search_content">
    <div ref="search_box_height" :class="{ search_close_01: searchOpen }" :style="`height:${search_box_height}`" class="search_box">
      <div class="search_box_filter always_exposure">
        <div class="filter_list">
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.outStat') }}</span>
            <MultiSelect id="OutStatCd" v-model="outStatCd" :allow-empty="false" :close-on-select="true" :options="outStatOptions" :searchable="false" :show-labels="false" label="text" placeholder="Pick a value" style="width: 100%" />
          </label>
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.plant') }}</span>
            <MultipleSelect ref="plntCd" :all="true" :options="plntOptions" class="essential" @select="cds => setCd(cds, 'plntCd')" />
          </label>
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
            <input id="keyWord" ref="filter" :placeholder="$t('message.msgPlaceForwardingReq')" v-model="filter" class="t-l" @keyup.enter="search" />
          </label>
          <div v-if="authButton.schAuth === 'Y'" style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" @click="search">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
      <div class="search_box_filter f_action c_action02">
        <div class="filter_list">
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.trnCarType') }}</span>
            <MultiSelect id="Material_Group" v-model="trnCarType" :allow-empty="false" :close-on-select="true" :options="trnCarTypeOptions" :searchable="false" :show-labels="false" label="text" placeholder="Pick a value" style="width: 100%" />
          </label>
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.trnCls') }}</span>
            <MultiSelect id="Material_Group" v-model="trnCls" :allow-empty="false" :close-on-select="true" :options="trnClsOptions" :searchable="false" :show-labels="false" label="text" placeholder="Pick a value" style="width: 100%" />
          </label>
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.cust') }}</span>
            <div class="form_inputnbtn">
              <input id="customer_name" v-model="custNm" style="" type="text" @keyup.enter="clientSearch" />
              <button class="btn_search_basic_info" @click="clientSearch"><img src="@/assets/img/icon_search.png" /></button>
            </div>
          </label>
        </div>
      </div>
      <div class="search_box_filter f_action c_action01">
        <div class="filter_list">
          <!--          <label for="" class="filter_type">-->
          <!--            <span class="filter_type_title">{{ $t('message.offrCls') }}</span>-->
          <!--            <MultipleSelect class="" ref="offrCls" style="z-index: 30" :options="offrClsOptions" :all="true" @select="cds => setCd(cds, 'offrCls')" />-->
          <!--          </label>-->
          <label class="filter_type filter_type_double" for="">
            <span class="filter_type_title filter_type_title_multiselect">
              <MultiSelect id="" v-model="dateCls" :allow-empty="false" :close-on-select="true" :options="dateClsOptions" :searchable="false" :show-labels="false" label="text" style="width: 100%" track-by="text" />
            </span>
            <!-- 데이터피커 -->
            <div class="form_calendar w_100 essential ml-25" @click="datePicker">
              <input v-model="datesDtls" :placeholder="$t('message.msgSelectPeriod')" readonly type="text" />
              <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
            </div>
          </label>
        </div>
      </div>
    </div>
    <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button>
    <DateRangePickerModal :oldDate="oldDate" :page="`forwardingReq`" @selectDate="showSelectDate" @setDefaultDates="setDefaultDates" />
    <ClientSearchModal ref="PriceClientSearchModal" @sendCustInfo="getCustInfo" @sendInfoInput="sendInfoInput" />
  </div>
</template>

<script>
import DateRangePickerModal from '@/modal/DateRangePickerModal';
import ClientSearchModal from '@/modal/sales/ClientSearchModal';
import MultipleSelect from '@/components/commonComponent/MultipleSelect';
import days from 'dayjs';

export default {
  name: 'ForwardingSearch',
  components: {
    DateRangePickerModal,
    ClientSearchModal,
    MultipleSelect,
  },
  props: ['commonCodes', 'authButton', 'openInfo'],
  data() {
    return {
      searchOpen: true,
      search_box_height: '',
      outStatCd: '',
      outStatOptions: [],
      plntCd: '',
      plntOptions: [],
      dateCls: { text: this.$t('message.hopeDt'), value: 'hopeDt' },
      dateClsOptions: [
        { text: this.$t('message.hopeDt'), value: 'hopeDt' },
        { text: this.$t('message.reqDt'), value: 'reqDt' },
        // { text: this.$t('message.offrDt'), value: 'offrDt' },
        // { text: this.$t('message.overDt'), value: 'overDt' },
      ],
      sttDt: '',
      endDt: '',
      time: [],
      datesDtls: '',
      oldDate: [],
      trnCarType: '',
      trnCarTypeOptions: [],
      trnCls: '',
      trnClsOptions: [],
      custInfo: {},
      custNm: '',
      offrCls: '',
      offrClsOptions: [],
      filter: '',
    };
  },
  watch: {
    searchOpen() {
      this.$emit('searchOpenChange', this.searchOpen);
    },
    commonCodes() {
      this.setCommonCode(this.commonCodes);
    },
    openInfo() {
      this.setCommonCode(this.commonCodes);
    },
  },
  methods: {
    getInfoHeight() {
      let val = this.$refs.search_box_height.scrollHeight + 9;
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
      this.sttDt = this.time[0];
      this.endDt = this.time[1];
      this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
    },
    setDefaultDates(time) {
      if (time) {
        this.time = time;
        this.sttDt = this.time[0];
        this.endDt = this.time[1];
        this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      }
    },
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
    getCustInfo(custInfo) {
      if (custInfo === '') {
        this.custNm = this.custInfo.custNm;
      } else {
        this.custInfo = custInfo;
        this.custNm = custInfo.custNm;
      }
    },
    setOutStatCd() {
      this.outStatCd = {
        value: this.outStatOptions[0].value,
        text: this.outStatOptions[0].text,
      };
    },
    setPlntCd() {
      this.plntCd = {
        value: this.plntOptions[0].value,
        text: this.plntOptions[0].text,
      };
    },
    setTrnCarType() {
      if (this.trnCarTypeOptions) {
        this.trnCarType = {
          value: this.trnCarTypeOptions[0].value,
          text: this.trnCarTypeOptions[0].text,
        };
      }
    },
    setTrnCls() {
      this.trnCls = {
        value: this.trnClsOptions[0].value,
        text: this.trnClsOptions[0].text,
      };
    },
    setOfferCls() {
      this.offrCls = {
        value: this.offrClsOptions[0].value,
        text: this.offrClsOptions[0].text,
      };
    },
    reset() {
      this.setOutStatCd();
      this.setPlntCd();
      this.setTrnCarType();
      this.setTrnCls();
      this.setOfferCls();
      this.$refs.offrCls?.select({ value: 'reset' });
      this.$refs.plntCd?.select({ value: 'reset' });

      this.dateCls = { text: this.$t('message.hopeDt'), value: 'hopeDt' };
      this.custInfo = {};
      this.custNm = '';
      this.filter = '';

      this.setDefaultDates([days().subtract(1, 'month').format('YYYY-MM-DD'), days().add(1, 'month').format('YYYY-MM-DD')]);
    },
    search() {
      if (this.authButton.schAuth === 'Y') {
        this.$refs.filter.blur();
        this.$emit('onSearch', {
          outStatCd: this.outStatCd?.value.includes('00') ? '' : this.outStatCd?.value,
          upPlntCd: this.plntCd?.value === '00' ? '' : this.plntCd.vlaue,
          dateCls: this.dateCls.value,
          sttDt: this.sttDt,
          endDt: this.endDt,
          trnCarType: this.trnCarType?.value.includes('00') ? '' : this.trnCarType?.value,
          trnClsCd: this.trnCls?.value.includes('00') ? '' : this.trnCls?.value,
          custCd: this.custInfo.custCd,
          offrClsCd: this.offrCls?.value,
          filter: this.filter,
        });
      }
    },
    setCd(cds, type) {
      if (type === 'plntCd') {
        this.plntCd = cds;
      } else if (type === 'offrCls') {
        this.offrCls = cds;
      }
    },
    setCommonCode(codes) {
      if (Object.keys(codes).length > 0) {
        this.plntOptions = JSON.parse(JSON.stringify(codes.plntOptions));
        this.plntOptions.unshift({ text: this.$t('message.all'), value: '00' });
        this.trnClsOptions = JSON.parse(JSON.stringify(codes.trnClsOptions));
        this.trnClsOptions.unshift({ text: this.$t('message.all'), value: '00' });
        this.offrClsOptions = JSON.parse(JSON.stringify(codes.offrClsOptions));
        this.offrClsOptions.unshift({ text: this.$t('message.all'), value: '00' });
        this.trnCarTypeOptions = JSON.parse(JSON.stringify(codes.carTypeOptions));
        this.trnCarTypeOptions.unshift({ text: this.$t('message.all'), value: '00' });

        // codes.outStatOptions.splice(0, 1);
        this.outStatOptions = JSON.parse(JSON.stringify(codes.outStatOptions));
        this.outStatOptions.unshift({ text: this.$t('message.all'), value: '00' });
        this.reset();
        if (this.openInfo.etcData) {
          this.outStatCd = this.outStatOptions.find(option => option.value === this.openInfo.etcData.outStat);
        }
        this.search();
      }
    },
  },
  created() {},
  mounted() {
    this.getInfoHeight();
    if (this.commonCodes) this.setCommonCode(this.commonCodes);
  },
};
</script>

<style scoped></style>
