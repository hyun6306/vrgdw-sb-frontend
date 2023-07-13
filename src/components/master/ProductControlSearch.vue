<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.compNm') }}</span>
              <div class="form_input">
                <input type="text" class="w_100 t-l disabled" placeholder="" disabled v-model="compCd.text" />
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.agency') }}</span>
              <div class="form_inputnbtn">
                <input type="text" style="" id="custoer_name" v-model="custNm" @keyup.enter="clientGridSearch" ref="filter" placeholder="" />
                <button v-if="this.authButton.schAuth === 'Y'" class="btn_search_basic_info" @click="clientGridSearch">
                  <img src="@/assets/img/icon_search.png" />
                </button>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.useYn') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="operatYn" :options="operatOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset()">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" v-if="this.authButton.schAuth === 'Y'" @click="search()">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->
    <ClientGridSearchModal ref="ClientGridSearchModal" @sendClientRow="sendClientRow" :page="page" :routerPath="routerPath" :menuId="menuId" />
  </div>
</template>

<script>
import commonApi from '@/api/common';
import masterApi from '@/api/master/master';
import ClientGridSearchModal from '@/modal/master/ClientGridSearchModal';

export default {
  components: {
    ClientGridSearchModal,
  },
  props: {
    page: {
      type: String,
    },
    authButton: {
      type: Object,
    },
    routerPath: {
      type: String,
    },
    menuId: {
      type: Number,
    },
  },
  data() {
    return {
      custId: '',
      custNm: '',
      salesInsertList: [],
      operatYn: {},
      operatOptions: [
        // { text: this.$t('message.all'), value: '' },
        // { text: this.$t('message.operate'), value: 'Y' },
        // { text: this.$t('message.close'), value: 'N' },
      ],
      compCdOptions: [],
      compCd: '',
    };
  },
  methods: {
    async search() {
      if (this.custNm === '') this.custId = '';
      this.$refs.filter.blur();
      this.salesInsertList = [];
      this.orderItemList();
    },
    reset() {
      this.custId = '';
      this.custNm = '';
      this.operatYn = this.operatOptions[0];
    },
    async orderItemList() {
      try {
        const param = {
          custType: '',
          custId: this.custId,
          useYn: this.operatYn.value,
          filter: '',
        };
        const response = await masterApi.salesCustomerSearch(param);
        this.salesInsertList = response.data.ds;
        this.$emit('sendSalesInsertList', this.salesInsertList);
      } catch (e) {
        console.log(e);
        this.$EventBus.$emit('openYesModal', e.err.data.message);
      }
    },
    clientGridSearch() {
      if (this.custNm === '') {
        this.custId = '';
        this.$modal.show(`ClientGridSearchModal${this.page}`);
      } else {
        this.$refs.ClientGridSearchModal.clientListSearch(this.custNm, 'info');
      }
    },
    sendClientRow(id) {
      this.custRow = id;
      if (typeof this.custRow === 'object') {
        if (this.custRow.length > 1 || this.custRow.length === 0) {
          this.$modal.show(`ClientGridSearchModal${this.page}`, { custNm: this.custNm });
        } else {
          this.custNm = this.custRow[0].custNm;
          this.custId = this.custRow[0].custId;
        }
      } else if (this.custRow !== '') {
        this.custNm = this.custRow[0].custNm;
        this.custId = this.custRow[0].custId;
      }
    },
    salesSearch() {
      if (this.saleNm === '') {
        this.$modal.show(`SalesGridModal${this.modalNm}`);
      } else {
        this.$refs.SalesGridModal.salesListSearch(this.saleNm, 'info');
      }
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      const param = {
        groupCd: groupCd,
        useYn: 'Y',
        prntCd: prntCd,
      };
      const response = await commonApi.getCommonCodeCombo(param);
      let all = { text: this.$t('message.all'), value: '' };
      if (groupCd === 'COMP_CD') {
        this.compCdOptions = response.data.ds;
        this.compCd = this.compCdOptions[0];
      } else if (groupCd === 'OPER_CLS_CD') {
        this.operatOptions = response.data.ds;
        this.operatOptions.unshift(all);
        this.operatYn = this.operatOptions[0];
      }
    },
  },
  created() {},
  async mounted() {
    this.operatYn = this.operatOptions[0];
    await this.getCommonCodeCombo('COMP_CD');
    await this.getCommonCodeCombo('OPER_CLS_CD');
    await this.search();
  },
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
