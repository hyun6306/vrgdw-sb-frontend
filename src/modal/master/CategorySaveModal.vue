<template>
  <modal name="CategorySaveModal" width="1440" height="auto" :adaptive="true" @before-open="open" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="closePopUp()"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.salesRegist') }}</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }" :style="`height:${search_box_height}`">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.compNm') }}</span>
                  <div class="form_input">
                    <input type="text" class="w_100 t-l disabled" placeholder="" disabled v-model="compCd.text" />
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
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.salesTeam') }}</span>
                  <div class="form_inputnbtn">
                    <input type="text" style="width: 100%" id="custoer_name" v-model="saleTeamNm" @keyup.enter="salesTeamSearch" />
                    <button class="btn_search_basic_info" @click="salesTeamSearch">
                      <img src="@/assets/img/icon_search.png" />
                    </button>
                  </div>
                </label>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.saleSupport') }}</span>
                  <div class="form_inputnbtn">
                    <input type="text" style="width: 100%" id="custoer_name" v-model="saleSuppNm" @keyup.enter="salesSuppSearch" />
                    <button class="btn_search_basic_info" @click="salesSuppSearch">
                      <img src="@/assets/img/icon_search.png" />
                    </button>
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.productLevel') }}</span>
                  <MultiSelect class="" style="width: 100%" v-model="prdtCls" :options="prdtClsCdOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- 리얼그리드 -->
        <div class="sales_manage_realgrid">
          <div class="realgrid_container realgrid_container17">
            <div class="real_body real_body16">
              <CategoryAllGrid style="height: 100%" :gridName="'CategoryAllGrid'" ref="CategoryAllGrid" :salesInsertList="salesInsertList" @sendInsertRowDbClick="sendInsertRowDbClick" :gridLang="gridLang" />
            </div>
          </div>
          <div class="exchange_box">
            <button class="btn_right" @click="insertRow()">
              <img src="@/assets/img/icon_back_old.png" />
            </button>
            <button class="btn_left" @click="deleteRow()">
              <img src="@/assets/img/icon_back_old.png" />
            </button>
          </div>
          <div class="realgrid_container realgrid_container17">
            <div class="real_body real_body16">
              <CategorySaveGrid style="height: 100%" :gridName="'CategorySaveGrid'" ref="CategorySaveGrid" :insertRows="insertRows" @rowCheck="rowCheck" @sendTotalRows="sendTotalRows" :gridLang="gridLang" />
            </div>
          </div>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="reset()">{{ $t('message.btnInit') }}</button>
          <button class="btn_default" @click="closePopUp()">{{ $t('message.btnClose') }}</button>
          <button class="btn_primary" @click="saveCategory()">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
    <SalesGridModal ref="SalesGridModal" @sendSalesRow="sendSalesRow" :page="page" :routerPath="routerPath" :menuId="menuId" :modalNm="modalNm" />
    <SalesTeamGridModal ref="SalesTeamGridModal" @sendTeamRow="sendTeamRow" :page="page" :routerPath="routerPath" :menuId="menuId" :modalNm="modalNm" />
    <SalesSuppGridModal ref="SalesSuppGridModal" @sendSuppRow="sendSuppRow" :page="page" :routerPath="routerPath" :menuId="menuId" :modalNm="modalNm" />
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';
import commonApi from '@/api/common';
import languageApi from '@/api/language';
import masterApi from '@/api/master/master';
import SalesGridModal from '@/modal/master/SalesGridModal';
import SalesTeamGridModal from '@/modal/master/SalesTeamGridModal';
import SalesSuppGridModal from '@/modal/master/SalesSuppGridModal';
import CategoryAllGrid from '@/components/gridView/master/CategoryAllGrid';
import CategorySaveGrid from '@/components/gridView/master/CategorySaveGrid';

export default {
  components: {
    SalesGridModal,
    SalesTeamGridModal,
    SalesSuppGridModal,
    CategoryAllGrid,
    CategorySaveGrid,
  },
  props: {
    authButton: {
      type: Object,
    },
    routerPath: {
      type: String,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
  },
  data() {
    return {
      search_box_height: '',
      searchOpen: false,
      compCdOptions: [],
      compCd: '',
      prdtClsCdOptions: [],
      prdtCls: '',
      saleNm: '',
      saleTeamNm: '',
      saleSuppNm: '',
      modalNm: 'SearchModal',
      gridLang: [],
      insertRows: [],
      salesRow: [],
      teamRow: [],
      suppRow: [],
      result: '',
      insertCheckedRows: [],
      rowChecked: false,
      totalRows: [],
      salesInsertList: [],
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    async getRouterLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage(this.routerPath, this.menuId, this.userLocale, 'Y');
        this.gridLang = resp.data.rs.language;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    sendTotalRows(rows) {
      this.totalRows = rows;
    },
    rowCheck(check) {
      this.rowChecked = check;
    },
    validation(type) {
      const result = { validation: true };
      this.$refs.CategorySaveGrid.getTotalRows();
      let deleteCheckedRows = this.$refs.CategorySaveGrid.sendSaveGridChecked();
      this.insertCheckedRows = this.$refs.CategoryAllGrid.sendAllGridChecked();

      if (type === 'save') {
        if (this.rowChecked) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
        } else if (!this.saleNm || this.saleNm === '') {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgSelectSales');
        } else if (!this.saleTeamNm || this.saleTeamNm === '') {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgSelectSalesTeam');
        } else if (!this.saleSuppNm || this.saleSuppNm === '') {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgSelectSalesSupport');
        }
      } else if (type === 'insert') {
        if (this.insertCheckedRows.length === 0) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
        }
      } else if (type === 'delete') {
        if (this.rowChecked) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
        } else if (deleteCheckedRows.length === 0) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
        }
      }
      return result;
    },
    async saveCategory() {
      this.result = this.validation('save');
      if (this.result.validation) {
        const custIds = [];
        const prdtClsCds = [];
        this.totalRows.forEach(list => {
          custIds.push(list.custId);
        });
        prdtClsCds.push(this.prdtCls.value);
        const paramData = {
          custIds,
          prdtClsCds,
          salesMngCd: this.salesRow[0].userCd,
          salesOffice: this.teamRow[0].code,
          salesSuptCd: this.suppRow[0].userCd,
        };
        const param = JSON.parse(JSON.stringify(paramData));
        try {
          const response = await masterApi.saveProductCategoryList(param);
          this.ment = '';
          if (response.data.rs) {
            this.closePopUp();
            await this.$parent.search();
            this.$EventBus.$emit('openYesModal', 'message.msgSaveChange');
          }
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    closePopUp() {
      this.reset();
      this.$modal.hide('CategorySaveModal');
    },
    sendInsertRowDbClick(row) {
      this.$refs.CategorySaveGrid.setInsertRows(row);
    },
    insertRow() {
      this.result = this.validation('insert');
      if (this.result.validation) {
        this.$refs.CategorySaveGrid.setInsertRows(this.insertCheckedRows);
        this.$refs.CategoryAllGrid.clearAllCheck();
        this.$refs.CategoryAllGrid.clearCurrent();
      }
    },
    deleteRow() {
      this.result = this.validation('delete');
      if (this.result.validation) {
        this.$refs.CategorySaveGrid.deleteRows();
        this.$refs.CategorySaveGrid.clearAllCheck();
      }
    },
    salesSearch() {
      if (this.saleNm === '') {
        this.salesRow = [];
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
        this.teamRow = [];
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
          this.$modal.show(`SalesTeamGridModal${this.modalNm}`, { saleTeamNm: this.saleTeamNm });
        } else {
          this.saleTeamNm = this.teamRow[0].korCdNm;
        }
      } else if (this.teamRow !== '') {
        this.saleTeamNm = this.teamRow[0].korCdNm;
      }
    },
    salesSuppSearch() {
      if (this.saleSuppNm === '') {
        this.suppRow = [];
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
          this.$modal.show(`SalesSuppGridModal${this.modalNm}`, { saleSuppNm: this.saleSuppNm });
        } else {
          this.saleSuppNm = this.suppRow[0].userNm;
        }
      } else if (this.suppRow !== '') {
        this.saleSuppNm = this.suppRow[0].userNm;
      }
    },
    reset() {
      this.$refs.CategoryAllGrid.clearCurrent();
      this.$refs.CategoryAllGrid.clearAllCheck();
      this.$refs.CategorySaveGrid.clearCurrent();
      this.$refs.CategorySaveGrid.clearAllCheck();
      this.saleNm = '';
      this.saleTeamNm = '';
      this.saleSuppNm = '';
      this.salesRow = [];
      this.teamRow = [];
      this.suppRow = [];
      this.prdtCls = this.prdtClsCdOptions[0];
      this.insertRows = [];
    },
    async getCommonCodeCombo(groupCd = '') {
      const param = {
        groupCd: groupCd,
        useYn: 'Y',
        prntCd: '',
      };
      try {
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'COMP_CD') {
          this.compCdOptions = response.data.ds;
          this.compCd = this.compCdOptions[0];
        } else if (groupCd === 'PRDT_CLS_CD') {
          this.prdtClsCdOptions = response.data.ds;
          this.prdtCls = this.prdtClsCdOptions[0];
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async clientListSearch() {
      try {
        const param = { custType: '', useYn: '', custId: '', filter: '' };
        const response = await masterApi.salesCustomerSearch(param);
        this.salesInsertList = response.data.ds;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    open() {
      this.getRouterLanguage();
      this.getCommonCodeCombo('COMP_CD');
      this.getCommonCodeCombo('PRDT_CLS_CD');
      this.clientListSearch();
    },
    close() {
      this.reset();
    },
  },
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
