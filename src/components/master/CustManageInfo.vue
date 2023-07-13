<template>
  <div>
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.custCls') }}</span>
              <MultiSelect id="" style="width: 100%" v-model="custCls" :options="custClsSelect" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.custType') }}</span>
              <MultiSelect id="" style="width: 100%" v-model="custType" :options="custTypeSelect" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Pick a value"></MultiSelect>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.closure') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="operClsValue" :options="operClsOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              <!-- <MultiSelect id="Material_Group" style="width: 100%" v-model="useYn" :options="useYnSelect" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect> -->
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="custSearch('reset')" v-if="authButton.schAuth == 'Y'">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="custSearch('search')" v-if="authButton.schAuth == 'Y'">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>
          <div class="filter_list">
            <label for="" class="filter_type filter_type_double">
              <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
              <div class="form_input">
                <input type="text" style="width: 100%" class="" id="" :placeholder="$t('message.placeholderCustMng')" v-model="filter" ref="filter" @keyup.enter="custSearch('search')" />
              </div>
            </label>
          </div>
        </div>
      </div>
      <!-- <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button> -->
    </div>
  </div>
</template>

<script>
import commonApi from '@/api/common';

export default {
  data() {
    return {
      //고객구분
      custCls: { text: this.$t('message.all'), value: '' },
      custClsSelect: [],
      //
      custType: { text: this.$t('message.all'), value: '' },
      custTypeSelect: [],
      //폐점 여부
      useYn: { text: this.$t('message.all'), value: '' },
      useYnSelect: [
        { text: this.$t('message.all'), value: '' },
        // { text: this.$i18n.t('message.대기'), value: '?' },
        { text: this.$i18n.t('message.operate'), value: 'Y' },
        { text: this.$i18n.t('message.close'), value: 'N' },
      ],
      //
      operClsValue: { text: this.$t('message.all'), value: '' },
      operClsOptions: [],
      //검색
      filter: '',
    };
  },
  props: ['authButton'],
  methods: {
    custSearch(type) {
      this.$refs.filter.blur();
      if (type == 'reset') {
        //고객구분을 사용한다면 고객구분 초기화
        this.custCls = { text: this.$t('message.all'), value: '' };
        this.custType = { text: this.$t('message.all'), value: '' };
        this.operClsValue = { text: this.$t('message.all'), value: '' };
        // this.useYn = { text: this.$t('message.all'), value: '' };
        this.filter = '';
      } else {
        //검색
        let param = {
          custCls: this.custCls.value,
          custType: this.custType.value,
          operClsCd: this.operClsValue.value,
          useYn: '',
          filter: this.filter,
          ownerYn: 'Y',
        };
        this.$parent.listRefresh(param);
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
        if (groupCd === 'CUST_CLS') {
          this.custClsSelect = response.data.ds;
          this.custClsSelect.unshift({ text: this.$t('message.all'), value: '' });
        } else if (groupCd === 'CUST_TYPE') {
          this.custTypeSelect = response.data.ds;
          this.custTypeSelect.unshift({ text: this.$t('message.all'), value: '' });
        } else if (groupCd === 'OPER_CLS_CD') {
          //운영구분
          this.operClsOptions = response.data.ds;
          this.operClsOptions.unshift({ text: this.$t('message.all'), value: '' });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getCommonCodeCombo('CUST_CLS');
    this.getCommonCodeCombo('CUST_TYPE');
    this.getCommonCodeCombo('OPER_CLS_CD');
  },
};
</script>

<style></style>
