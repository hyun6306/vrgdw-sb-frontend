<template>
  <div>
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.clientComp') }}</span>
              <div class="form_inputnbtn">
                <input type="text" @keyup.enter="clientSearch" ref="filter" v-model="custNm" class="t-l" id="clientSearch" />
                <button style="height: 26px" class="btn_search_basic_info" @click="clientSearch"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.closureYn') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="useYn" :options="useYnSelect" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </label>
            <button class="btn_reset" @click="custSearch('reset')" v-if="authButton.schAuth == 'Y'">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text ml-0" @click="custSearch('search')" v-if="authButton.schAuth == 'Y'">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
    </div>
    <ClientSearchModal @sendCustInfo="getCustInfo" ref="ClientSearchModal" @sendInfoInput="sendInfoInput" />
  </div>
</template>

<script>
import ClientSearchModal from '@/modal/sales/ClientSearchModal';

export default {
  components: {
    ClientSearchModal,
  },
  props: ['authButton'],
  data() {
    return {
      useYn: { text: 'ALL', value: '' },
      useYnSelect: [
        { text: 'ALL', value: '' },
        { text: this.$i18n.t('message.operate'), value: 'Y' },
        { text: this.$i18n.t('message.closure'), value: 'N' },
      ],
      custNm: '',
      custId: '',
      custInfo: '',
    };
  },
  methods: {
    getCustInfo(custInfo) {
      if (custInfo === '') {
        this.custNm = this.custInfo.custNm;
      } else {
        this.custId = custInfo.custId;
        this.custNm = custInfo.custNm;
        this.custInfo = custInfo;
      }
    },
    sendInfoInput(result) {
      if (result.length === 1) {
        this.custId = result[0].custId;
        this.custNm = result[0].custNm;
        this.custInfo = result[0];
      } else {
        this.$modal.show('PriceClientSearchModal', { custNm: this.custNm });
      }
    },
    clientSearch() {
      // 고객사검색
      if (!this.custNm || this.custNm === '') {
        this.$modal.show('PriceClientSearchModal');
      } else {
        this.$refs.ClientSearchModal.customerList(this.custNm, 'info');
      }
    },
    custSearch(type) {
      this.$refs.filter.blur();
      if (type == 'reset') {
        this.useYn = { text: 'ALL', value: '' };
        this.filter = '';
        this.custNm = '';
        this.custId = '';
        this.custInfo = '';
      } else {
        let param = {
          custId: this.custId,
          useYn: this.useYn.value,
          custCls: '',
          custType: '',
          operClsCd: '',
          filter: '',
        };
        this.$parent.searchList(param);
      }
    },
  },
};
</script>

<style></style>
