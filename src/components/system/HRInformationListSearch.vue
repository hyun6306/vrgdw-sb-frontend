<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <div class="search_box">
      <div class="search_box_filter">
        <div class="filter_list">
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.companyType') }}</span>
            <MultiSelect id="companyType" class="" style="width: 100%" v-model="companyType" track-by="text" label="text" :options="companyTypeOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.useYn') }}</span>
            <MultiSelect id="useYn" class="" style="width: 100%" v-model="useYn" track-by="text" label="text" :options="useYnOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
            <input type="text" style="" :placeholder="$t('message.msgPlaceHr')" v-model="filter" ref="filter" @keyup.enter="getDeptTree()" />
          </label>
          <div style="display: flex; margin-left: auto">
            <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text" @click="[getDeptTree()]">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- //검색필터 영역 -->
</template>

<script>
import { mapGetters } from 'vuex';
import systemApi from '@/api/system/system';
export default {
  props: ['page', 'authButton'],
  components: {},
  data() {
    return {
      compCd: '',
      filter: '',
      companyType: { text: this.$t('message.all'), value: '' },
      companyTypeOptions: [],
      useYn: { text: this.$t('message.all'), value: '' },
      useYnOptions: [
        { text: this.$t('message.all'), value: '' },
        { text: 'Y', value: 'Y' },
        { text: 'N', value: 'N' },
      ],
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    async getCommonCodeList(groupCd = 'COMP_CD', groupNm = '', filter = '', useYn = 'Y', prntCd = 'ALL') {
      try {
        const param = {
          groupCd,
          groupNm,
          filter,
          useYn,
          prntCd,
          cdLvl: 1,
        };

        const resp = await systemApi.getCommonCodeList(param);
        const textKey = this.userLocale && this.userLocale == 'en' ? 'engCdNm' : 'korCdNm';
        this.companyTypeOptions = resp.data.ds.map(cd => {
          return { text: cd[textKey], value: cd.code };
        });
        const allGroup = { text: this.$t('message.all'), value: '' };
        this.companyTypeOptions.unshift(allGroup);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getDeptTree() {
      this.$refs.filter.blur();
      try {
        const param = {
          //검색조건 확인
          compCd: this.companyType.value,
          filter: this.filter,
          useYn: this.useYn.value,
        };
        const resp = await systemApi.getHRInfoTree(param);
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
      this.useYn = this.useYnOptions[0];
    },
  },
  mounted() {
    this.getDeptTree();
    this.getCommonCodeList();
  },
};
</script>

<style></style>
