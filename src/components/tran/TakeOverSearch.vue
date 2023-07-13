<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <!-- <div class="search_box" ref="search_box_height" :class="{ search_close_01: searchOpen }" :style="`height:${search_box_height}`"> -->
    <div class="search_box">
      <div class="search_box_filter always_exposure">
        <div class="filter_list">
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.tranNm') }}</span>
            <!-- 운송사 로그인시 선택 불가 -->
            <input v-if="userMenuGrp === 'TRANSCUS'" type="text" id="담당자명" style="" class="disabled t-l" disabled :placeholder="tranOne ? tranOne.text : ''" />
            <!-- 물류담당자 로그인시 선택 가능 -->
            <MultiSelect v-else id="Material_Group" class="essential" style="width: 100%" label="text" v-model="tranOne" :options="tranList" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="선택"></MultiSelect>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.outStat') }}</span>
            <MultiSelect id="" style="width: 100%" label="text" v-model="outStatCd" :options="outStatOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="전체"></MultiSelect>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.tranCarNum') }}</span>
            <div class="form_inputnbtn">
              <input type="text" style="" id="custoer_name" v-model="trnCarNum" ref="trnCarNum" @keyup.enter="$modal.show('CarNumSearchModal', { noRegit: true })" />
              <button class="btn_search_basic_info" @click="$modal.show('CarNumSearchModal', { noRegit: true })"><img src="@/assets/img/icon_search.png" /></button>
            </div>
          </label>
          <div v-if="authButton.schAuth === 'Y'" style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" @click="getTakeOverList">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
      <div class="search_box_filter">
        <div class="filter_list">
          <label for="" class="filter_type filter_type_double">
            <span class="filter_type_title filter_type_title_multiselect">
              <MultiSelect id="" style="width: 100%" label="text" v-model="takeOverCd" :options="takeOverOption" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="출차일"></MultiSelect>
            </span>
            <!-- 데이터피커 -->
            <div class="form_calendar w_100 essential ml-25" @click="datePicker">
              <input type="text" placeholder="기간 선택" v-model="datesDtls" />
              <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
            </div>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.dispaPlanNum') }}</span>
            <input type="text" id="" style="width: 100%" class="t-l" v-model="trnPlnNum" @keyup.enter="getTakeOverList" ref="trnPlnNum" />
          </label>
        </div>
      </div>
    </div>
    <DateRangePickerModal ref="DateRangePicker" @setDefaultDates="setDefaultDates" @selectDate="showSelectDate" :oldDate="oldDate" :page="page" />
    <CarNumSearchModal @sendCarInfo="sendCarInfo" :page="page" :tranSelect="tranOne" ref="CarNumSearchModal" />
  </div>
  <!-- //검색필터 영역 -->
</template>

<script>
import { mapGetters } from 'vuex';
import tranApi from '@/api/tran/tran';
import commonApi from '@/api/common';
import DateRangePickerModal from '@/modal/DateRangePickerModal';
import CarNumSearchModal from '@/modal/tran/CarNumSearchModal';

export default {
  props: ['page', 'authButton', 'openInfo'],
  components: {
    DateRangePickerModal,
    CarNumSearchModal,
  },
  computed: {
    ...mapGetters({
      userMenuGrp: 'userInfo/getUserMenuGrpCd',
      trncusId: 'userInfo/getTrncusId',
    }),
  },
  data() {
    return {
      takeOverCd: {},
      takeOverOption: [
        {
          text: this.$t('message.outDt'),
          value: 'outDt',
        },
        {
          text: this.$t('message.trnCfmDt'),
          value: 'cfmDt',
        },
        {
          text: this.$t('message.takeOverCmfDt'),
          value: 'takeOverDt',
        },
      ],
      tranList: [],
      tranOne: {},
      outStatOptions: [],
      outStatCd: {},
      time: [],
      datesDtls: '',
      oldDate: [],
      trnCarNum: '',
      trnPlnNum: '',
      total: 0,
      intervalId: '',
    };
  },
  watch: {
    openInfo() {
      this.setOpenInfoData();
    },
  },
  methods: {
    async getTranList() {
      try {
        const resp = await tranApi.getTranList();
        this.tranList = resp.data.ds;
        this.tranList.unshift({ text: this.$t('message.all'), value: '' });
        if (this.tranList.length > 0) this.tranOne = this.tranList[0];
        if (this.userMenuGrp === 'TRANSCUS') {
          this.tranList.forEach(list => {
            if (this.trncusId == list.value) {
              this.tranOne = list;
            }
          });
        }
        this.total++;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        }
        this.total++;
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

        if (groupCd === 'OUT_STATUS') {
          this.outStatOptions = response.data.ds;
          this.outStatOptions.unshift({ text: this.$t('message.all'), value: '00' });
          if (this.outStatOptions.length > 0) this.outStatCd = this.outStatOptions[0];
        }
        this.total++;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        }
        this.total++;
      }
    },
    datePicker() {
      this.oldDate = this.time;
      this.$modal.show('DateRangePicker');
    },
    setDefaultDates(time) {
      if (time) {
        this.time = time;
        this.sttDt = this.time[0];
        this.endDt = this.time[1];
        this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      }
    },
    showSelectDate(selectDate) {
      this.time = selectDate;
      this.oldDate = selectDate;
      this.sttDt = this.time[0];
      this.endDt = this.time[1];
      this.datesDtls = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
    },
    async getTakeOverList() {
      if (this.authButton.schAuth === 'Y') {
        this.$refs.trnPlnNum.blur();
        this.$refs.trnCarNum.blur();
        try {
          const param = {
            trncusId: this.trncusId ? this.trncusId : this.tranOne.value,
            trnCarNum: this.trnCarNum,
            trnPlnNum: this.trnPlnNum,
            dateCls: this.takeOverCd.value,
            sttDt: this.time[0],
            endDt: this.time[1],
            outStatCd: this.outStatCd.value.includes('00') ? '' : this.outStatCd.value,
          };
          const resp = await tranApi.getTakeOverList(param);
          this.$emit('sendListRows', resp.data.ds);
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          }
        }
      }
    },
    reset() {
      this.outStatCd = this.outStatOptions[0];
      if (this.userMenuGrp !== 'TRANSCUS') this.tranOne = this.tranList[0];
      this.takeOverCd = this.takeOverOption[1];
      this.trnPlnNum = '';
      this.trnCarNum = '';
      this.$refs.DateRangePicker.init();
    },
    load() {
      if (this.total === 2) {
        this.getTakeOverList();
        clearInterval(this.intervalId);
        this.intervalId = '';
      }
    },
    sendCarInfo(info) {
      this.trnCarNum = info.tranCarNum;
    },
    setOpenInfoData() {
      if (this.openInfo.etcData) {
        this.reset();
        this.outStatCd = this.outStatOptions.find(option => option.value === this.openInfo.etcData.outStat);
        if (this.intervalId === '') {
          this.intervalId = setInterval(this.load, 100);
        }
      } else {
        this.reset();
        this.intervalId = setInterval(this.load, 100);
      }
    },
  },
  async mounted() {
    await this.getTranList();
    await this.getCommonCodeCombo('OUT_STATUS');
    this.takeOverCd = this.takeOverOption[1];
    this.setOpenInfoData();
  },
  create() {},
};
</script>

<style></style>
