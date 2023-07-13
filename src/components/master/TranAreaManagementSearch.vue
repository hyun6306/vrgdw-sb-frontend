<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <div class="search_box">
      <div class="search_box_filter">
        <div class="filter_list">
          <label for="" class="filter_type">
            <!-- 운송사 -->
            <span class="filter_type_title">{{ $t('message.tranNm') }}</span>
            <MultipleSelect ref="multiTrnCd" v-model="trnCd" :all="true" style="width: 305px" @select="setTrnCd" :options="tranCusList" />
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
            <div class="form_input">
              <input type="text" :placeholder="$t('message.placeholderTrnArea')" v-model="filter" ref="filter" @keyup.enter="getAreaPriceList" />
              <!-- <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" @click="getAreaPriceList" /></button> -->
            </div>
          </label>
          <div style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" @click="getAreaPriceList">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- //검색필터 영역 -->
</template>

<script>
// import commonApi from '@/api/common';
import masterApi from '@/api/master/master';
import tranApi from '@/api/tran/tran.js';
import MultipleSelect from '@/components/commonComponent/MultipleSelect';

export default {
  props: ['page', 'authButton'],
  components: {
    MultipleSelect,
  },
  data() {
    return {
      trnCd: [],
      tranCusList: [],
      filter: '',
    };
  },
  watch: {},
  methods: {
    // 운송사 다중선택
    setTrnCd(cd) {
      if (cd) {
        this.trnCd = [];
        cd.forEach(code => {
          this.trnCd.push(code.value);
        });
        this.trnCd[0] == '' ? (this.trnCd = '') : this.trnCd;
      } else {
        this.$refs.multiTrnCd.statCd = this.tranCusList;
      }
    },
    async getTranCusList() {
      const allGroup = { text: this.$t('message.all'), value: '' };
      try {
        const response = await tranApi.getTranList();
        this.tranCusList = response.data.ds;
        this.tranCusList.unshift(allGroup);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getAreaPriceList() {
      this.$refs.filter.blur();
      try {
        const param = {
          trncusId: this.trnCd.length > 0 ? this.trnCd.join(',') : '',
          filter: this.filter,
        };
        const resp = await masterApi.getAreaPriceList(param);
        this.$emit('sendSearchList', resp.data.ds);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    reset() {
      this.filter = '';
      // this.trnCd = '';
      this.setTrnCd();
    },
  },
  mounted() {
    this.getAreaPriceList();
  },
  created() {
    this.getTranCusList();
  },
};
</script>

<style></style>
