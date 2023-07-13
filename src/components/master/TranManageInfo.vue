<template>
  <div>
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.trncusCd') }}</span>
              <div class="form_inputnbtn">
                <input type="text" @keyup.enter="showModal" v-model="trncusCd" class="t-l" />
                <button class="btn_search_basic_info" @click="showModal">
                  <img src="@/assets/img/icon_search.png" />
                </button>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.manageCls') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="operClsValue" :options="operClsOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              <!-- <span class="filter_type_title">{{ $t('message.trncusNm') }}</span>
              <div class="form_input"><input type="text" @keyup.enter="trnCdSearch('search')" v-model="trncusNm" class="t-l" /></div> -->
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.searchTerm') }}</span>
              <div class="form_input">
                <input type="text" style="width: 100%" class="" id="" :placeholder="$t('message.placeholderTranMng')" v-model="filter" ref="filter" @keyup.enter="trnSearch('search')" />
              </div>
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="trnSearch('reset')" v-if="authButton.schAuth == 'Y'">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="trnSearch('search')" v-if="authButton.schAuth == 'Y'">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>
        </div>
      </div>
      <!-- <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button> -->
    </div>
    <TranSearchModal @sendTrnCustInfo="getTrnCustInfo" />
  </div>
</template>

<script>
import commonApi from '@/api/common';
import TranSearchModal from '@/modal/master/TranSearchModal';

export default {
  data() {
    return {
      trncusId: '', //운송사코드
      trncusNm: '', //운송사명
      filter: '',
      //
      operClsValue: { text: this.$t('message.all'), value: '' },
      operClsOptions: [],
      trncusCd: '',
    };
  },
  props: ['authButton'],
  components: { TranSearchModal },
  methods: {
    getTrnCustInfo(info) {
      this.trncusId = info.id;
      this.trncusCd = info.trncusCd;
    },
    showModal() {
      this.$modal.show('TranSearchModal', { trncusCd: this.trncusCd });
    },
    trnSearch(type) {
      this.$refs.filter.blur();
      if (type == 'reset') {
        this.trncusId = '';
        this.trncusCd = '';
        this.operClsValue = { text: this.$t('message.all'), value: '' };
        this.filter = '';
      } else {
        let param = {
          trncusId: this.trncusId,
          operClsCd: this.operClsValue.value,
          filter: this.filter,
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
        if (groupCd === 'OPER_CLS_CD') {
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
    this.getCommonCodeCombo('OPER_CLS_CD');
  },
};
</script>

<style></style>
