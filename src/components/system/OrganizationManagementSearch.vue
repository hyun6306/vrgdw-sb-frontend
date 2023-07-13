<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <div class="search_box">
      <div class="search_box_filter">
        <div class="filter_list">
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.useYn') }}</span>
            <MultiSelect id="useYn" class="" style="width: 100%" v-model="useYn" track-by="text" label="text" :options="useYnOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
          </label>
          <label for="" class="filter_type">
            <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
            <input type="text" style="" :placeholder="$t('message.msgPlaceOrganize')" v-model="filter" ref="filter" @keyup.enter="getDeptTree()" />
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
import systemApi from '@/api/system/system';
export default {
  props: ['page', 'authButton'],
  components: {},
  data() {
    return {
      filter: '',
      useYn: { text: 'ALL', value: '' },
      useYnOptions: [
        { text: 'ALL', value: '' },
        { text: 'Y', value: 'Y' },
        { text: 'N', value: 'N' },
      ],
      pageNumber: 0,
      pageSize: 20,
      pageInfo: {},
    };
  },
  watch: {},
  methods: {
    async getDeptTree() {
      this.$refs.filter.blur();
      try {
        const param = {
          filter: this.filter,
          useYn: this.useYn.value,
        };
        const resp = await systemApi.getDeptTree(param);
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
      this.useYn = { text: 'ALL', value: '' };
    },
  },
  mounted() {
    this.getDeptTree();
  },
};
</script>

<style></style>
