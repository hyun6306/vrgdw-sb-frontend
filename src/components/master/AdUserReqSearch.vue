<template>
  <div>
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <!-- <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.companyCode') }}</span>
              <div class="form_input">
                <input type="text" class="w_100" placeholder="" v-model="compCd" ref="compCd" @keyup.enter="userSearch('search')" />
              </div>
            </label> -->
            <!-- <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.dept') }}</span>
              <div class="form_input">
                <MultiSelect id="Material_Group" style="width: 100%" v-model="deptCd" :options="detpOption" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              </div>
            </label> -->
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.cfmYn') }}</span>
              <div class="form_input">
                <MultiSelect id="Material_Group" style="width: 100%" v-model="cfmValue" :options="cfmOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              </div>
            </label>
            <label for="" class="filter_type filter_type_double">
              <span class="filter_type_title">{{ $t('message.searchTerm') }}</span>
              <div class="form_input">
                <input type="text" class="w_100" :placeholder="$t('message.msgPlaceNoneUser')" v-model="filter" ref="filter" @keyup.enter="userSearch('search')" />
              </div>
            </label>
            <button class="btn_reset" v-if="authButton.schAuth == 'Y'" @click="userSearch('reset')">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text ml-0" v-if="authButton.schAuth == 'Y'" @click="userSearch('search')">{{ $t('message.btnSearch') }}</button>
          </div>
          <!-- <div class="filter_list"> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import masterApi from '@/api/master/master';

export default {
  props: ['authButton'],
  data() {
    return {
      //검색
      // compCd: '',
      // deptCd: { text: this.$t('message.all'), value: '' },
      // detpOption: [],
      cfmValue: { text: this.$t('message.all'), value: '' },
      cfmOptions: [
        { text: this.$t('message.all'), value: '' },
        { text: this.$t('message.regist'), value: 'Y' },
        { text: this.$t('message.request'), value: 'N' },
      ],
      filter: '',
    };
  },
  methods: {
    userSearch(type) {
      // this.$refs.compCd.blur();
      this.$refs.filter.blur();
      if (type == 'reset') {
        // this.compCd = '';
        // this.deptCd = { text: this.$t('message.all'), value: '' };
        this.cfmValue = { text: this.$t('message.all'), value: '' };
        this.filter = '';
      } else {
        let param = {
          compCd: '',
          deptCd: '',
          cfmYn: this.cfmValue.value,
          filter: this.filter,
        };
        this.$parent.userSearch(param);
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
