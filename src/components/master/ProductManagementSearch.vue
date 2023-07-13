<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <div class="search_box">
      <div class="search_box_filter">
        <div class="filter_list">
          <label for="" class="filter_type">
            <!-- 제품분류 -->
            <span class="filter_type_title">{{ $t('message.prdtClsCd') }}</span>
            <!-- <MultipleSelect ref="multi_prdtClsCd" v-model="prdtClsCd" :all="true" @select="setSearchMultiCd" :options="prdtClsCdOptions" :dataKey="'prdtClsCd'" /> -->
            <MultiSelect id="" ref="multi_prdtClsCd" style="width: 100%" v-model="prdtClsCd" :options="prdtClsCdOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
          </label>
          <label for="" class="filter_type">
            <!-- 운영구분 -->
            <span class="filter_type_title">{{ $t('message.operClsCd') }}</span>
            <MultipleSelect ref="multi_operClsCd" v-model="operClsCd" :all="true" @select="setSearchMultiCd" :options="operClsCdOptions" :dataKey="'operClsCd'" />
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
            <div class="form_input">
              <input type="text" style="" id="custoer_name" :placeholder="$t('message.placeholderPrdtMng')" v-model="filter" ref="filter" @keyup.enter="[resetPageNumber(), getProductList()]" />
              <!-- <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" @click="[resetPageNumber(), getProductList()]" /></button> -->
            </div>
          </label>
          <div style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" @click="[resetPageNumber(), getProductList()]">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- //검색필터 영역 -->
</template>

<script>
import masterApi from '@/api/master/master';
import commonApi from '@/api/common';
import MultipleSelect from '@/components/commonComponent/MultipleSelect';
export default {
  props: ['page', 'changePageNumber', 'authButton'],
  components: { MultipleSelect },
  data() {
    return {
      prdtClsCd: { text: this.$t('message.all'), value: '' },
      prdtClsCdOptions: [],
      operClsCd: [],
      operClsCdOptions: [],

      filter: '',
      pageNumber: 0,
      pageSize: 20,
      pageInfo: {},
    };
  },
  watch: {
    changePageNumber() {
      this.pageNumber = this.changePageNumber;
      this.getProductList();
    },
  },
  methods: {
    setSearchMultiCd(cd, dataKey = '') {
      if (dataKey != '') {
        if (cd) {
          this[dataKey] = [];
          cd.forEach(code => {
            this[dataKey].push(code.value);
          });
          this[dataKey][0] == '' ? (this[dataKey] = '') : this[dataKey];
        } else {
          this.$refs['multi_' + dataKey].statCd = this[dataKey + 'Options'];
        }
      }
    },

    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const allItem = { text: this.$t('message.all'), value: '' };
        const response = await commonApi.getCommonCodeCombo(param);

        if (groupCd == 'PRDT_CLS_CD') {
          this.prdtClsCdOptions = response.data.ds;
          this.prdtClsCdOptions.unshift(allItem);
        } else if (groupCd == 'OPER_CLS_CD') {
          this.operClsCdOptions = response.data.ds;
          this.operClsCdOptions.unshift(allItem);
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
    //그리드 데이터 조회
    async getProductList() {
      this.$refs.filter.blur();
      try {
        const param = {
          prdtClsCd: this.prdtClsCd.value,
          operClsCd: this.operClsCd.length > 0 ? this.operClsCd.join(',') : '',
          filter: this.filter,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        };
        const resp = await masterApi.getProductList(param);
        this.$emit('sendSearchList', resp.data.ds);
        this.pageInfo = resp.data.page;
        this.$emit('sendPageInfo', this.pageInfo);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    resetPageNumber() {
      this.pageNumber = 0;
      this.$emit('resetPageNumber', 0);
    },
    reset() {
      this.filter = '';
      this.prdtClsCd = { text: this.$t('message.all'), value: '' };
      this.setSearchMultiCd(null, 'prdtClsCd');
      this.setSearchMultiCd(null, 'operClsCd');
    },
  },
  mounted() {
    this.getProductList();
  },
  created() {
    this.getCommonCodeCombo('PRDT_CLS_CD');
    this.getCommonCodeCombo('OPER_CLS_CD');
  },
};
</script>

<style></style>
