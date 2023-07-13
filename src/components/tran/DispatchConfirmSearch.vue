<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <div ref="search_box_height" :class="{ search_close_01: searchOpen }" :style="`height:${search_box_height}`" class="search_box">
      <div class="search_box_filter always_exposure">
        <div class="filter_list">
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.savePlntCd') }}</span>
            <!-- 데이터피커 -->
            <MultipleSelect :all="true" :options="plntOptions" class="essential" @select="setUpPlntCd" />
          </label>
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.trnNm') }}</span>
            <!-- 운송사 로그인시 선택 불가 -->
            <input v-if="this.userMenuGrpCd == 'TRANSCUS'" id="담당자명" v-model="trncusNm" class="disabled t-l" disabled placeholder="" style="" type="text" />
            <!-- 물류담당자 로그인시 선택 가능 -->
            <MultiSelect v-else id="" v-model="selectTran" :allow-empty="false" :close-on-select="true" :options="tranList" :searchable="false" :show-labels="false" class="essential" label="text" placeholder="" style="width: 100%" track-by="text"></MultiSelect>
          </label>
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.trnCarNm') }}</span>
            <MultiSelect id="" v-model="carTypeCd" :allow-empty="false" :close-on-select="true" :options="carTypeOptions" :searchable="false" :show-labels="false" class="" label="text" placeholder="" style="width: 100%" track-by="text"></MultiSelect>
          </label>
          <div v-if="authButton.schAuth === 'Y'" style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset()">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" @click="search()">
              {{ $t('message.btnSearch') }}
            </button>
          </div>
        </div>
      </div>
      <div class="search_box_filter f_action c_action02">
        <div class="filter_list">
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.outStat') }}</span>
            <MultiSelect id="" v-model="outStatus" :allow-empty="false" :close-on-select="true" :options="outStatOptions" :searchable="false" :show-labels="false" class="" label="text" placeholder="" style="width: 100%" track-by="text"></MultiSelect>
          </label>
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.offrCls') }}</span>
            <MultiSelect id="" v-model="offrClsCd" :allow-empty="false" :close-on-select="true" :options="offrClsOptions" :searchable="false" :show-labels="false" class="essential" label="text" placeholder="" style="width: 100%" track-by="text"></MultiSelect>
          </label>
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
            <input id="" ref="filter" v-model="filter" :placeholder="$t('message.msgPlaceholderNum')" class="t-l" style="width: 100%" type="text" @keyup.enter="search()" />
          </label>
        </div>
      </div>
      <div class="search_box_filter f_action c_action01">
        <div class="filter_list">
          <label class="filter_type filter_type_double" for="">
            <span class="filter_type_title filter_type_title_multiselect">
              <MultiSelect id="" v-model="dateOption" :allow-empty="false" :close-on-select="true" :options="dateOptions" :searchable="false" :show-labels="false" class="essential" label="text" placeholder="" style="width: 100%" track-by="text"></MultiSelect>
            </span>
            <!-- 데이터피커 -->
            <div class="form_calendar w_100 essential ml-25" @click="$modal.show('PriceDateRangePicker')">
              <input v-model="date.show" :placeholder="$t('message.selectPeriod')" type="text" />
              <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
            </div>
          </label>
        </div>
      </div>
    </div>
    <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button>
    <DateRangePickerModal :default="this.default" :maxDays="62" @selectDateRange="selectDateRange" ref="datePicker" />
  </div>
  <!-- //검색필터 영역 -->
</template>

<script>
import { mapGetters } from 'vuex';
import tranApi from '@/api/tran/tran';
import commonApi from '@/api/common';
import DateRangePickerModal from '@/modal/sales/DateRangePickerModal';
import MultipleSelect from '@/components/commonComponent/MultipleSelect';
// import days from 'dayjs';
import defs from '@/consts/defs';

export default {
  components: {
    DateRangePickerModal,
    MultipleSelect,
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
      search_box_height: '',
      searchOpen: true,
      dispatchConfirmList: [],
      default: 'aroundMonth',
      date: {},
      plntOptions: [],
      tranList: [],
      carTypeOptions: [],
      outStatOptions: [],
      offrClsOptions: [],
      plntCdValue: [],
      upPlant: [],
      selectTran: {},
      outStatus: {},
      carTypeCd: {},
      offrClsCd: {},
      dateOptions: [
        { text: this.$t('message.hopeDt'), value: 'hopeDt' },
        { text: this.$t('message.reqDt'), value: 'reqDt' },
        { text: this.$t('message.trnCfmDt'), value: 'cfmDt' },
        { text: this.$t('message.inPsbDt'), value: 'inPsbDt' },
      ],
      dateOption: {},
      filter: '',
      trncusNm: '',
      defsOutStatCd: defs.outStatCd,
    };
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      trncusId: 'userInfo/getTrncusId',
    }),
  },
  watch: {
    openInfo() {
      this.setOpenInfoData();
    },
  },
  methods: {
    getInfoHeight() {
      let val = this.$refs.search_box_height.scrollHeight + 9;
      // search_box_height 의 높이값 받아온다
      this.search_box_height = `${val}px`;
    },
    isReSearch(is) {
      if (is) {
        this.search;
      }
    },
    selectDateRange(data) {
      // this.default = '';
      this.date = data;
    },
    setUpPlntCd(upPlntCd) {
      if (upPlntCd) {
        this.upPlant = [];
        upPlntCd.forEach(cd => {
          this.upPlant.push(cd.value);
        });
      }
    },
    async getPlantCombo() {
      try {
        const param = {};
        const response = await commonApi.getPlantCombo(param);
        this.plntOptions = response.data.ds;
        let allGroup = { text: this.$t('message.all'), value: '00' };
        this.plntOptions.unshift(allGroup);
        this.setUpPlntCd();
      } catch (e) {
        console.log(e);
      }
    },
    async getTranList() {
      try {
        const resp = await tranApi.getTranList();
        this.tranList = resp.data.ds;
        if (this.userMenuGrpCd !== 'TRANSCUS') {
          this.tranList.unshift({ text: this.$t('message.all'), value: '' });
          this.selectTran = this.tranList[0];
        } else {
          this.tranList.forEach(list => {
            if (this.trncusId == list.value) {
              this.trncusNm = list.text;
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const resp = await commonApi.getCommonCodeCombo(param);
        let allGroup = { text: this.$t('message.all'), value: '' };
        if (groupCd === 'CAR_TYPE_SAMPLE') {
          this.carTypeOptions = resp.data.ds;
          this.carTypeOptions.unshift(allGroup);
          this.carTypeCd = this.carTypeOptions[0];
        } else if (groupCd === 'OUT_STATUS') {
          const outStatOp = resp.data.ds;
          this.outStatOptions.push(outStatOp.find(op => op.value === this.defsOutStatCd.disEnd));
          this.outStatOptions.push(outStatOp.find(op => op.value === this.defsOutStatCd.disCon));
          this.outStatOptions.unshift(allGroup);
          if (this.outStatOptions.length > 0) this.outStatus = this.outStatOptions[0];
        } else if (groupCd === 'OFFR_CLS_CD') {
          this.offrClsOptions = resp.data.ds;
          this.offrClsOptions.unshift(allGroup);
          this.offrClsCd = this.offrClsOptions[0];
        }
      } catch (e) {
        console.log(e);
      }
    },
    reset() {
      //플랜트 초기화
      this.getPlantCombo();
      this.selectTran = this.tranList[0];
      this.outStatus = this.outStatOptions[0];
      this.carTypeCd = this.carTypeOptions[0];
      this.offrClsCd = this.offrClsOptions[0];
      this.dateOption = this.dateOptions[3];
      // const sttDt = days().subtract(1, 'month').format('YYYY-MM-DD');
      // const endDt = days().add(1, 'month').format('YYYY-MM-DD');
      // this.date.time[0] = sttDt;
      // this.date.time[1] = endDt;
      this.default = 'aroundMonth';
      this.filter = '';
      this.$refs.datePicker.init();
    },
    async search() {
      if (this.authButton.schAuth === 'Y') {
        if (!this.upPlant) {
          this.$EventBus.$emit('openYesModal', 'message.msgNoPlntCd');
        } else {
          this.$refs.filter.blur();
          this.dispatchConfirmList = [];
          this.getDipatchConfirmList();
        }
      }
    },
    async getDipatchConfirmList() {
      try {
        let trncusId = '';
        if (this.userMenuGrpCd === 'TRANSCUS') {
          trncusId = this.trncusId;
        } else {
          trncusId = this.selectTran.value ? this.selectTran.value : '';
        }

        const param = {
          upPlntCd: this.upPlant[0] === '00' ? '' : this.upPlant,
          trncusId: trncusId,
          outStatCd: this.outStatus.value,
          trnCarType: this.carTypeCd === this.carTypeOptions[0] ? '' : this.carTypeCd.value,
          offrClsCd: this.offrClsCd === this.offrClsOptions[0] ? '' : this.offrClsCd.value,
          dateCls: this.dateOption.value,
          sttDt: this.date.time[0],
          endDt: this.date.time[1],
          filter: this.filter,
        };
        const response = await tranApi.getDipatchConfirmList(param);
        this.dispatchConfirmList = response.data.ds;
        this.$emit('sendDipatchConfirmList', this.dispatchConfirmList);
      } catch (e) {
        console.log(e);
      }
    },
    setOpenInfoData() {
      this.reset();
      if (this.openInfo.etcData) {
        this.outStatus = this.outStatOptions.find(option => option.value === this.openInfo.etcData.outStat);
      }
      this.search();
    },
  },
  async created() {
    this.dateOption = this.dateOptions[3];
    await this.getPlantCombo();
    await this.getTranList();
    await this.getCommonCodeCombo('CAR_TYPE_SAMPLE');
    await this.getCommonCodeCombo('OUT_STATUS');
    await this.getCommonCodeCombo('OFFR_CLS_CD');
    this.setOpenInfoData();
  },
  mounted() {
    this.getInfoHeight();
  },
};
</script>

<style></style>
