<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.item') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="prdtClsCd" :options="prdtClsOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" @input="changePrdtClsCd()"></MultiSelect>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.cityNm') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="cityCd" :options="cityOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" @input="changeCityCd()"></MultiSelect>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.distrNm') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="distrCd" :options="distrOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" @input="changeDistrCd()"></MultiSelect>
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset()">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="search()" v-if="this.authButton.schAuth === 'Y'">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>
          <!--          <div class="filter_list">-->
          <!--            <label for="" class="filter_type filter_type_double">-->
          <!--              <span class="filter_type_title">{{ $t('message.searchWord') }}</span>-->
          <!--              <div class="form_input">-->
          <!--                <input type="text" class="w_100" v-model="filter" placeholder="" @keyup.enter="search()" ref="filter" />-->
          <!--              </div>-->
          <!--            </label>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->
  </div>
</template>

<script>
import commonApi from '@/api/common';
import masterApi from '@/api/master/master';

export default {
  components: {},
  props: {
    page: {
      type: String,
    },
    authButton: {
      type: Object,
    },
  },
  data() {
    return {
      standardList: [],
      cityOptions: [],
      distrOptions: [{ text: this.$t('message.all'), value: '' }],
      cityCd: { text: this.$t('message.all'), value: '' },
      distrCd: { text: this.$t('message.all'), value: '' },
      prdtClsOptions: [],
      prdtClsCd: {},
      prdtCd: '',
      filter: '',
      result: '',
    };
  },
  methods: {
    async search() {
      this.$refs.filter.blur();
      this.standardList = [];
      this.getTranStandardList();
    },
    reset() {
      this.cityCd = { text: this.$t('message.all'), value: '' };
      this.distrCd = { text: this.$t('message.all'), value: '' };
      this.prdtClsCd = this.prdtClsOptions[0];
      this.distrOptions = [{ text: this.$t('message.all'), value: '' }];
      this.filter = '';
      this.$emit('sendPrdtClsCd', this.prdtClsCd);
      this.$emit('sendCityCd', this.cityCd);
      this.$emit('sendDistrCd', this.distrCd);
    },
    async getTranStandardList() {
      try {
        const param = {
          prdtClsCd: this.prdtClsCd ? this.prdtClsCd.value : '',
          cityCd: this.cityCd.value ? this.cityCd.value : '',
          distrCd: this.distrCd.value ? this.distrCd.value : '',
          filter: this.filter,
        };
        const response = await masterApi.getTranStandardList(param);
        this.standardList = response.data.ds;
        this.$emit('sendStandardList', this.standardList);
      } catch (e) {
        console.log(e);
        this.$EventBus.$emit('openYesModal', e.err.data.message);
      }
    },
    changePrdtClsCd() {
      this.$emit('sendPrdtClsCd', this.prdtClsCd);
    },
    changeCityCd() {
      this.getCommonCodeCombo('VNM_CITY', this.cityCd.value);
      this.distrCd = { text: this.$t('message.all'), value: '' };
      this.$emit('sendCityCd', this.cityCd);
      this.$emit('sendDistrCd', this.distrCd);
    },
    changeDistrCd() {
      this.$emit('sendDistrCd', this.distrCd);
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'VNM_CITY') {
          if (prntCd !== '') {
            this.distrOptions = response.data.ds;
          } else {
            this.cityOptions = response.data.ds;
          }
        } else if (groupCd === 'PRDT_CLS_CD') {
          this.prdtClsOptions = response.data.ds;
          this.prdtClsOptions.unshift({ text: this.$t('message.all'), value: '' });
          this.prdtClsCd = this.prdtClsOptions[0];
        }
      } catch (e) {
        console.log(e);
        this.$EventBus.$emit('openYesModal', e.err.data.message);
      }
    },
  },
  async created() {
    this.getCommonCodeCombo('VNM_CITY');
    this.getCommonCodeCombo('PRDT_CLS_CD');
    this.getTranStandardList();
  },
  mounted() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
