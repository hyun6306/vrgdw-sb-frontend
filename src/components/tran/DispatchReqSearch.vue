<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <div class="search_box">
      <div class="search_box_filter">
        <div class="filter_list">
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.tranNm') }}</span>
            <!-- 운송사 로그인시 선택 불가 -->
            <input v-if="userMenuGrpCd == 'TRANSCUS'" id="담당자명" v-model="trncusNm" class="disabled t-l" disabled placeholder="" style="" type="text" />
            <!-- 물류담당자 로그인시 선택 가능 -->
            <MultiSelect v-else id="Material_Group" v-model="selectTran" :allow-empty="false" :close-on-select="true" :options="tranList" :searchable="false" :show-labels="false" class="essential" label="text" placeholder="" style="width: 100%" track-by="text"></MultiSelect>
          </label>
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.outStat') }}</span>
            <!-- 데이터피커 -->
            <MultiSelect id="" v-model="outStatus" :allow-empty="false" :close-on-select="true" :options="outStatOptions" :searchable="false" :show-labels="false" class="essential" label="text" placeholder="" style="width: 100%" track-by="text"></MultiSelect>
          </label>
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.deliveryType') }}</span>
            <MultiSelect id="Material_Group" v-model="carTypeCd" :allow-empty="false" :close-on-select="true" :options="carTypeOptions" :searchable="false" :show-labels="false" label="text" placeholder="" style="width: 100%" track-by="text"></MultiSelect>
          </label>
          <!-- <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.compNm') }}</span>
            <input type="text" id="" style="width: 100%" class="disabled t-l" disabled placeholder="" v-model="compCd.text" />
          </label> -->
          <div v-if="authButton.schAuth === 'Y'" style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset()">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" @click="search()">
              {{ $t('message.btnSearch') }}
            </button>
          </div>
        </div>
      </div>
      <div class="search_box_filter">
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
          <label class="filter_type" for="">
            <span class="filter_type_title">{{ $t('message.dispaPlanNum') }}</span>
            <input id="" ref="filter" v-model="dipatchNum" class="t-l" placeholder="" style="width: 100%" type="text" @keyup.enter="search()" />
          </label>
        </div>
      </div>
    </div>
    <DateRangePickerModal :default="this.default" :maxDays="62" @selectDateRange="selectDateRange" />
  </div>
  <!-- //검색필터 영역 -->
</template>

<script>
import { mapGetters } from 'vuex';
import tranApi from '@/api/tran/tran';
import commonApi from '@/api/common';
import DateRangePickerModal from '@/modal/sales/DateRangePickerModal';
import days from 'dayjs';
import defs from '@/consts/defs';

export default {
  components: {
    DateRangePickerModal,
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
      tranList: [],
      selectTran: {},
      outStatOptions: [],
      carTypeOptions: [],
      outStatus: {},
      carTypeCd: {},
      carType: '',
      dateOptions: [
        { text: this.$t('message.reqDt'), value: 'reqDt' },
        { text: this.$t('message.hopeDt'), value: 'hopeDt' },
      ],
      dateOption: {},
      compCdOptions: [],
      compCd: '',
      dipatchNum: '',
      date: {},
      default: 'aroundMonth',
      dispatchReqList: [],
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
    isReSearch(is) {
      if (is) {
        this.search;
      }
    },
    selectDateRange(data) {
      this.default = '';
      this.date = data;
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
        if (groupCd === 'OUT_STATUS') {
          const outStatOp = resp.data.ds;
          this.outStatOptions.push(outStatOp.find(op => op.value === this.defsOutStatCd.disReq));
          this.outStatOptions.push(outStatOp.find(op => op.value === this.defsOutStatCd.disEnd));
          this.outStatOptions.unshift(allGroup);
          if (this.outStatOptions.length > 0) this.outStatus = this.outStatOptions[0];
        } else if (groupCd === 'CAR_TYPE_SAMPLE') {
          let carTypes = resp.data.ds;
          carTypes.forEach(type => {
            if (type.value == 'VRGDW') this.carTypeOptions.push(type);
          });
          this.carTypeCd = this.carTypeOptions[0];
        } else if (groupCd === 'COMP_CD') {
          this.compCdOptions = resp.data.ds;
          this.compCd = this.compCdOptions[0];
        }
      } catch (e) {
        console.log(e);
      }
    },
    reset() {
      this.selectTran = this.tranList[0];
      this.outStatus = this.outStatOptions[0];
      this.dateOption = this.dateOptions[0];
      const sttDt = this.$vnDateFormatD(days().subtract(1, 'month').format('YYYY-MM-DD'));
      const endDt = this.$vnDateFormatD(days().add(1, 'month').format('YYYY-MM-DD'));
      this.date.show = sttDt + ' ~ ' + endDt;
      this.default = 'aroundMonth';
      this.carType = this.carTypeOptions[0];
      //사업부
      this.dipatchNum = '';
    },
    async search() {
      if (this.authButton.schAuth === 'Y') {
        try {
          this.$refs.filter.blur();
        } catch (e) {
          console.log(e);
        }
        this.dispatchReqList = [];
        this.getDipatchReqList();
      }
    },
    async getDipatchReqList() {
      try {
        let trncusId = '';
        if (this.userMenuGrpCd === 'TRANSCUS') {
          trncusId = this.trncusId;
        } else {
          trncusId = this.selectTran.value ? this.selectTran.value : '';
        }

        const param = {
          trncusId: trncusId,
          outStatCd: this.outStatus.value,
          trnCarType: this.carTypeCd.value,
          dateCls: this.dateOption.value,
          sttDt: this.date.time[0],
          endDt: this.date.time[1],
          compCd: this.compCd.value,
          trnPlnNum: this.dipatchNum,
        };
        const response = await tranApi.getDipatchReqList(param);
        this.dispatchReqList = response.data.ds;
        this.$emit('sendDispatchReqList', this.dispatchReqList);
      } catch (e) {
        console.log(e);
      }
    },
    setOpenInfoData() {
      if (this.openInfo.etcData) {
        this.reset();
        this.outStatus = this.outStatOptions.find(option => option.value === this.openInfo.etcData.outStat);
        this.search();
      } else {
        this.reset();
        this.search();
      }
    },
  },
  async created() {
    this.dateOption = this.dateOptions[0];
    await this.getTranList();
    await this.getCommonCodeCombo('OUT_STATUS');
    await this.getCommonCodeCombo('CAR_TYPE_SAMPLE');
    await this.getCommonCodeCombo('COMP_CD');
    this.setOpenInfoData();
  },
  async mounted() {},
};
</script>

<style></style>
