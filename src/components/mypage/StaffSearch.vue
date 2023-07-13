<template>
  <div>
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.withRetire') }}</span>
              <MultiSelect id="" style="width: 100%" v-model="useYn" :options="useYnOption" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
              <div class="form_input">
                <input type="text" style="width: 100%" class="" id="" placeholder="" v-model="filter" ref="filter" @keyup.enter="staffSearch('reset')" />
              </div>
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="staffSearch('reset')" v-if="authButton.schAuth == 'Y'">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="staffSearch('search')" v-if="authButton.schAuth == 'Y'">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: '',
      useYn: { text: this.$i18n.t('message.inclusionN'), value: 'Y' },
      useYnOption: [
        { text: this.$i18n.t('message.inclusionY'), value: '' }, //퇴사자 포함
        { text: this.$i18n.t('message.inclusionN'), value: 'Y' }, //퇴사마 미포함
      ],
    };
  },
  props: ['authButton'],
  methods: {
    staffSearch(type) {
      this.$refs.filter.blur();
      if (type == 'reset') {
        this.filter = '';
        this.useYn = { text: this.$i18n.t('message.inclusionN'), value: 'Y' };
      } else {
        let param = {
          useYn: this.useYn.value,
          filter: this.filter,
        };
        this.$parent.staffSearch(param);
      }
    },
  },
};
</script>

<style></style>
