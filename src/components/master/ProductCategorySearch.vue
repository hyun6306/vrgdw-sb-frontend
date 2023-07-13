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
              <span class="filter_type_title">{{ $t('message.clientComp') }}</span>
              <div class="form_inputnbtn">
                <input type="text" style="width: 100%" id="custoer_name" v-model="custNm" @keyup.enter="clientGridSearch" />
                <button class="btn_search_basic_info" @click="clientGridSearch">
                  <img src="@/assets/img/icon_search.png" />
                </button>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.salesMngNm') }}</span>
              <div class="form_inputnbtn">
                <input type="text" style="width: 100%" id="custoer_name" v-model="saleNm" @keyup.enter="salesSearch" />
                <button class="btn_search_basic_info" @click="salesSearch">
                  <img src="@/assets/img/icon_search.png" />
                </button>
              </div>
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset()">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="search()">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.salesTeam') }}</span>
              <div class="form_inputnbtn">
                <input type="text" style="width: 100%" id="custoer_name" v-model="saleTeamNm" @keyup.enter="salesTeamSearch" />
                <button class="btn_search_basic_info" @click="salesTeamSearch">
                  <img src="@/assets/img/icon_search.png" />
                </button>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.productLevel') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="prdtClsCd" :options="prdtClsOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->
    <SalesGridModal ref="SalesGridModal" @sendSalesRow="sendSalesRow" :page="page" :routerPath="routerPath" :menuId="menuId" :modalNm="modalNm" />
    <SalesTeamGridModal ref="SalesTeamGridModal" @sendTeamRow="sendTeamRow" :page="page" :routerPath="routerPath" :menuId="menuId" :modalNm="modalNm" />
    <ClientGridSearchModal ref="ClientGridSearchModal" @sendClientRow="sendClientRow" :page="page" :routerPath="routerPath" :menuId="menuId" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import commonApi from '@/api/common';
import masterApi from '@/api/master/master';
import SalesGridModal from '@/modal/master/SalesGridModal';
import SalesTeamGridModal from '@/modal/master/SalesTeamGridModal';
import ClientGridSearchModal from '@/modal/master/ClientGridSearchModal';

export default {
  components: {
    SalesGridModal,
    SalesTeamGridModal,
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
      custNm: '',
      saleNm: '',
      saleTeamNm: '',
      custRow: [],
      salesRow: [],
      teamRow: [],
      categoryList: [],
      prdtClsOptions: [],
      compCdOptions: [],
      prdtClsCd: '',
      compCd: '',
      modalNm: 'ProductCategoryList',
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  methods: {
    clientGridSearch() {
      if (this.custNm === '') {
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
        }
      } else if (this.custRow !== '') {
        this.custNm = this.custRow[0].custNm;
      }
    },
    salesSearch() {
      if (this.saleNm === '') {
        this.$modal.show(`SalesGridModal${this.modalNm}`);
      } else {
        this.$refs.SalesGridModal.salesListSearch(this.saleNm, 'info');
      }
    },
    sendSalesRow(cd) {
      this.salesRow = cd;
      if (typeof this.salesRow === 'object') {
        if (this.salesRow.length > 1 || this.salesRow.length === 0) {
          this.$modal.show(`SalesGridModal${this.modalNm}`, { saleNm: this.saleNm });
        } else {
          this.saleNm = this.salesRow[0].userNm;
        }
      } else if (this.salesRow !== '') {
        this.saleNm = this.salesRow[0].userNm;
      }
    },
    salesTeamSearch() {
      if (this.saleTeamNm === '') {
        this.$modal.show(`SalesTeamGridModal${this.modalNm}`);
      } else {
        this.$refs.SalesTeamGridModal.teamListSearch(this.saleTeamNm, 'info');
      }
    },
    sendTeamRow(nm) {
      this.teamRow = nm;
      if (typeof this.teamRow === 'object') {
        if (this.teamRow.length > 1 || this.teamRow.length === 0) {
          this.$modal.show(`SalesTeamGridModal${this.modalNm}`, { saleTeamNm: this.saleTeamNm });
        } else {
          this.saleTeamNm = this.teamRow[0].korCdNm;
        }
      } else if (this.teamRow !== '') {
        this.saleTeamNm = this.teamRow[0].korCdNm;
      }
    },
    async search() {
      this.getProductCategoryList();
    },
    reset() {
      this.custNm = '';
      this.saleNm = '';
      this.saleTeamNm = '';
      this.custRow = [];
      this.salesRow = [];
      this.teamRow = [];
      this.prdtClsCd = this.prdtClsOptions[0];
    },
    async getCommonCodeCombo(groupCd = '') {
      const param = {
        groupCd: groupCd,
        useYn: 'Y',
        prntCd: '',
      };
      const response = await commonApi.getCommonCodeCombo(param);
      let all = { text: this.$t('message.all'), value: '' };
      if (groupCd === 'COMP_CD') {
        this.compCdOptions = response.data.ds;
        this.compCd = this.compCdOptions[0];
      } else if (groupCd === 'PRDT_CLS_CD') {
        this.prdtClsOptions = response.data.ds;
        this.prdtClsOptions.unshift(all);
        this.prdtClsCd = this.prdtClsOptions[0];
      }
    },
    async getProductCategoryList() {
      try {
        const param = {
          compCd: this.compCd.value,
          erpCustCd: this.custNm ? this.custRow[0].erpCustCd : '',
          erpSalesMngCd: this.saleNm ? this.salesRow[0].erpEmpNum : '',
          erpSalesSuptCd: '',
          salesOfficeCd: this.saleTeamNm ? this.teamRow[0].code : '',
          prdtClsCd: this.prdtClsCd ? this.prdtClsCd.value : '',
        };
        const response = await masterApi.getProductCategoryList(param);
        this.categoryList = response.data.ds;
        this.$emit('sendCategoryList', this.categoryList);
      } catch (e) {
        console.log(e);
        this.$EventBus.$emit('openYesModal', e.err.data.message);
      }
    },
  },
  created() {},
  async mounted() {
    await this.getCommonCodeCombo('COMP_CD');
    await this.getCommonCodeCombo('PRDT_CLS_CD');
    await this.search();
  },
};
</script>

<style></style>
