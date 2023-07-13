<template>
  <div>
    <p class="sub_title">{{ $t('message.batchModify') }}</p>
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.salesMngNm') }}</span>
              <div class="form_inputnbtn">
                <input type="text" style="width: 100%" id="custoer_name" v-model="saleNm" @keyup.enter="salesSearch" />
                <button class="btn_search_basic_info" @click="salesSearch">
                  <img src="@/assets/img/icon_search.png" />
                </button>
              </div>
            </label>
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
              <span class="filter_type_title">{{ $t('message.saleSupport') }}</span>
              <div class="form_inputnbtn">
                <input type="text" style="width: 100%" id="custoer_name" v-model="saleSuppNm" @keyup.enter="salesSuppSearch" />
                <button class="btn_search_basic_info" @click="salesSuppSearch">
                  <img src="@/assets/img/icon_search.png" />
                </button>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <SalesGridModal ref="SalesGridModal" @sendSalesRow="sendSalesRow" :page="page" :routerPath="routerPath" :menuId="menuId" :modalNm="modalNm" />
    <SalesTeamGridModal ref="SalesTeamGridModal" @sendTeamRow="sendTeamRow" :page="page" :routerPath="routerPath" :menuId="menuId" :modalNm="modalNm" />
    <SalesSuppGridModal ref="SalesSuppGridModal" @sendSuppRow="sendSuppRow" :page="page" :routerPath="routerPath" :menuId="menuId" :modalNm="modalNm" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SalesGridModal from '@/modal/master/SalesGridModal';
import SalesTeamGridModal from '@/modal/master/SalesTeamGridModal';
import SalesSuppGridModal from '@/modal/master/SalesSuppGridModal';

export default {
  components: {
    SalesGridModal,
    SalesTeamGridModal,
    SalesSuppGridModal,
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
      saleCd: '',
      saleNm: '',
      saleTeamNm: '',
      saleSuppCd: '',
      saleSuppNm: '',
      modalNm: 'Modify',
      salesRow: [],
      teamRow: [],
      suppRow: [],
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  methods: {
    batchValidation() {
      const result = { validation: true };

      if (!this.saleNm || this.saleNm == '') {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgSelectSales');
      } else if (!this.saleTeamNm || this.saleTeamNm == '') {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgSelectSalesTeam');
      } else if (!this.saleSuppNm || this.saleSuppNm == '') {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgSelectSalesSupport');
      }
      return result;
    },
    reset() {
      this.saleNm = '';
      this.saleTeamNm = '';
      this.saleSuppNm = '';
      this.salesRow = [];
      this.teamRow = [];
      this.suppRow = [];
    },
    salesSearch() {
      if (this.saleNm === '') {
        this.salesRow = [];
        this.$emit('sendSalesList', this.salesRow);
        this.$modal.show(`SalesGridModal${this.modalNm}`);
      } else {
        this.$refs.SalesGridModal.salesListSearch(this.saleNm, 'info');
      }
    },
    sendSalesRow(cd) {
      this.salesRow = cd;
      if (typeof this.salesRow === 'object') {
        if (this.salesRow.length > 1 || this.salesRow.length === 0) {
          this.salesRow = [];
          this.$emit('sendSalesList', this.salesRow);
          this.$modal.show(`SalesGridModal${this.modalNm}`, { saleNm: this.saleNm });
        } else {
          this.saleCd = this.salesRow[0].userCd;
          this.saleNm = this.salesRow[0].userNm;
          this.$emit('sendSalesList', this.salesRow);
        }
      } else if (this.salesRow !== '') {
        this.saleCd = this.salesRow[0].userCd;
        this.saleNm = this.salesRow[0].userNm;
      }
    },
    salesTeamSearch() {
      if (this.saleTeamNm === '') {
        this.teamRow = [];
        this.$emit('sendTeamList', this.teamRow);
        this.$modal.show(`SalesTeamGridModal${this.modalNm}`);
      } else {
        this.$refs.SalesTeamGridModal.teamListSearch(this.saleTeamNm, 'info');
      }
    },
    sendTeamRow(nm) {
      this.teamRow = nm;
      if (typeof this.teamRow === 'object') {
        if (this.teamRow.length > 1 || this.teamRow.length === 0) {
          this.teamRow = [];
          this.$emit('sendTeamList', this.teamRow);
          this.$modal.show(`SalesTeamGridModal${this.modalNm}`, { saleTeamNm: this.saleTeamNm });
        } else {
          this.saleTeamNm = this.teamRow[0].korCdNm;
          this.$emit('sendTeamList', this.teamRow);
        }
      } else if (this.teamRow !== '') {
        this.saleTeamNm = this.teamRow[0].korCdNm;
      }
    },
    salesSuppSearch() {
      if (this.saleSuppNm === '') {
        this.suppRow = [];
        this.$emit('sendSuppList', this.suppRow);
        this.$modal.show(`SalesSuppGridModal${this.modalNm}`);
      } else {
        this.$refs.SalesSuppGridModal.supportListSearch(this.saleSuppNm, 'info');
      }
    },
    sendSuppRow(cd) {
      this.suppRow = cd;
      if (typeof this.suppRow === 'object') {
        if (this.suppRow.length > 1 || this.suppRow.length === 0) {
          this.suppRow = [];
          this.$emit('sendSuppList', this.suppRow);
          this.$modal.show(`SalesSuppGridModal${this.modalNm}`, { saleSuppNm: this.saleSuppNm });
        } else {
          this.saleSuppCd = this.suppRow[0].userCd;
          this.saleSuppNm = this.suppRow[0].userNm;
          this.$emit('sendSuppList', this.suppRow);
        }
      } else if (this.suppRow !== '') {
        this.saleSuppCd = this.suppRow[0].userCd;
        this.saleSuppNm = this.suppRow[0].userNm;
      }
    },
  },
};
</script>
