<template>
  <div>
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.tranNm') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="trnCustNm" :options="trnCustOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </label>
            <button class="btn_reset" @click="trnSearch('reset')" v-if="authButton.schAuth == 'Y'">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text ml-0" @click="trnSearch('search')" v-if="authButton.schAuth == 'Y'">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tranApi from '@/api/tran/tran';
export default {
  data() {
    return {
      trnCustNm: { text: 'ALL', value: '' },
      trnCustOptions: [],
    };
  },
  props: ['authButton'],
  methods: {
    trnSearch(type) {
      if (type == 'reset') {
        this.trnCustNm = { text: 'ALL', value: '' };
      } else {
        let param = {
          trncusId: this.trnCustNm.value,
          trncusNm: '',
        };
        this.$parent.searchList(param);
      }
    },
    async tranList() {
      //운송사목록
      const response = await tranApi.getTranList();
      this.trnCustOptions = response.data.ds;
      const all = { value: '', text: 'ALL' };
      this.trnCustOptions.splice(0, 0, all);
    },
  },
  mounted() {
    this.tranList();
  },
};
</script>

<style></style>
