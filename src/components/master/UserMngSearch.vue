<template>
  <div>
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.menuGrp') }}</span>
              <div class="form_input">
                <MultiSelect id="Material_Group" style="width: 100%" v-model="typeValue" :options="menuTypeOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.roles') }}</span>
              <div class="form_input">
                <MultiSelect id="Material_Group" style="width: 100%" v-model="authGroup" :options="authGroupOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.searchTerm') }}</span>
              <div class="form_input">
                <input type="text" class="w_100" :placeholder="$t('message.msgPlaceUser')" v-model="filter" ref="filter" @keyup.enter="userSearch('search')" />
              </div>
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" v-if="authButton.schAuth == 'Y'" @click="userSearch('reset')">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" v-if="authButton.schAuth == 'Y'" @click="userSearch('search')">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.job') }}</span>
              <div class="form_input">
                <MultiSelect id="Material_Group" style="width: 100%" v-model="degree" :options="degreeOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonApi from '@/api/common';

export default {
  props: ['authButton'],
  data() {
    return {
      typeValue: { value: '', text: this.$t('message.all') },
      authGroup: { value: '', text: this.$t('message.all') },
      degree: { value: '', text: this.$t('message.all') },
      menuTypeOptions: [],
      authGroupOptions: [],
      degreeOptions: [],
      filter: '',
    };
  },
  methods: {
    userSearch(type) {
      this.$refs.filter.blur();
      if (type == 'reset') {
        this.typeValue = { value: '', text: this.$t('message.all') };
        this.tauthGroup = { value: '', text: this.$t('message.all') };
        this.degree = { value: '', text: this.$t('message.all') };
        this.filter = '';
      } else {
        let param = {
          filter: this.filter,
          menuGrpCd: this.typeValue.value,
          roles: this.authGroup.value,
          degreeCd: this.degree.value,
        };
        this.$parent.userSearch(param);
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
        if (groupCd === 'MENU_GROUP') {
          this.menuTypeOptions = response.data.ds;
          // if (this.menuGrpOptions.length > 0) this.menuGrpCd = this.menuGrpOptions[0];
        } else if (groupCd === 'AUTH_GROUP') {
          this.authGroupOptions = response.data.ds;
        } else if (groupCd === 'DEGREE_CD') {
          this.degreeOptions = response.data.ds;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getCommonCodeCombo('MENU_GROUP');
    this.getCommonCodeCombo('AUTH_GROUP');
    this.getCommonCodeCombo('DEGREE_CD');
  },
};
</script>

<style></style>
