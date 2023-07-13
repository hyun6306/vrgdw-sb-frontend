<template>
  <div>
    <ProductCategorySearch ref="ProductCategorySearch" @sendCategoryList="sendCategoryList" :authButton="authButton" :page="page" :routerPath="routerPath" :menuId="menuId" />
    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container16">
      <div class="real_head">
        <div class="real_head_left">
          <small class="">
            {{ $t('message.totalSelection1') }}
            <i>{{ categoryList.length }}</i>
            {{ $t('message.totalSelection2') }}
          </small>
        </div>
        <div class="real_head_right">
          <button class="btn_default btn_process" @click="$modal.show('CategorySaveModal')">{{ $t('message.btnRegist') }}</button>
          <button v-if="this.authButton.delAuth === 'Y'" class="btn_default btn_function" @click="removeCategory()">{{ $t('message.btnDelete') }}</button>
        </div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left"></div>
        <div class="real_top_right">
          <button class="btn_default btn_filter" @click="setFilter">
            <!-- <img src="@/assets/img/icon_vertical.png" /> -->
            <span v-if="!filterOn">{{ $t('message.btnFilterOn') }}</span>
            <span v-else>{{ $t('message.btnFilterOff') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="fixGrid('column')">
            <img src="@/assets/img/icon_vertical.png" />
            <span v-if="isFixColumn">{{ $t('message.btnUnfixColumn') }}</span>
            <span v-else>{{ $t('message.btnFixColumn') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="fixGrid('row')">
            <img src="@/assets/img/icon_hori.png" />
            <span v-if="isFixRow">{{ $t('message.btnUnfixRow') }}</span>
            <span v-else>{{ $t('message.btnFixRow') }}</span>
          </button>
          <!-- MultiSelect -->
          <MultiSelect id="Material_Group" class="btn_select_layout" style="width: 100%" v-model="layoutValue" :options="layoutOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @input="layoutBtn" label="text"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body14">
        <ProductCategoryGrid style="height: 100%" :gridName="'ProductCategoryGrid'" ref="ProductCategoryGrid" :categoryList="categoryList" :menuId="menuId" :gridLang="gridLang" :savePage="savePage" :page="page" />
      </div>
    </div>
    <!-- 검색필터 영역 -->
    <BatchCategoryModify ref="BatchCategoryModify" :authButton="authButton" @sendSalesList="sendSalesList" @sendTeamList="sendTeamList" @sendSuppList="sendSuppList" :page="page" :routerPath="routerPath" :menuId="menuId" />
    <div class="board_footer board_footer02">
      <div class="footer_left">
        <button v-if="this.authButton.exlAuth === 'Y'" @click="excelDownload()" class="btn_default btn_function">{{ $t('message.btnDownloadExcel') }}</button>
      </div>
      <div class="footer_right">
        <!-- <button class="btn_default btn_temp">담당지정</button> -->
        <button v-if="this.authButton.savAuth === 'Y'" class="btn_default btn_critical_process" @click="batchCategory()">{{ $t('message.btnSave') }}</button>
      </div>
    </div>
    <MasterAlarmModal :ment="ment" @okOrNo="okOrNo" :type="type" />
    <CategorySaveModal :authButton="authButton" :routerPath="routerPath" :menuId="menuId" :page="page" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import masterApi from '@/api/master/master';
import ProductCategorySearch from '@/components/master/ProductCategorySearch';
import BatchCategoryModify from '@/components/master/BatchCategoryModify';
import ProductCategoryGrid from '@/components/gridView/master/ProductCategoryGrid';
import MasterAlarmModal from '@/modal/master/MasterAlarmModal';
import CategorySaveModal from '@/modal/master/CategorySaveModal';

export default {
  components: {
    ProductCategorySearch,
    BatchCategoryModify,
    ProductCategoryGrid,
    MasterAlarmModal,
    CategorySaveModal,
  },
  props: {
    routerPath: {
      type: String,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    authButton: {
      type: Object,
    },
    savePage: {
      type: Array,
    },
  },
  data() {
    return {
      filterOn: true,
      categoryList: [],
      checkRows: [],
      type: '',
      ment: '',
      isFixColumn: false,
      isFixRow: false,
      gridLang: [],
      layoutValue: { value: '', text: this.$t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$t('message.btnSave') },
        { value: 'reset', text: this.$t('message.btnInit') },
      ],
      result: '',
      salesList: [],
      teamList: [],
      suppList: [],
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
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    validation() {
      this.checkRows = this.$refs.ProductCategoryGrid.sendCheckedData();
      const result = { validation: true };

      if (this.categoryList.length === 0) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (this.checkRows.length === 0) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
      }
      return result;
    },
    async batchCategory() {
      const batchValidation = this.$refs.BatchCategoryModify.batchValidation();
      this.result = this.validation();
      if (this.result.validation && batchValidation.validation) {
        const customerManagerDtoList = [];
        this.checkRows.forEach(rows => {
          customerManagerDtoList.push({ custId: rows.custId, prdtClsCd: rows.prdtClsCd });
        });
        const paramData = {
          customerManagerDtoList,
          salesMngCd: this.salesList[0].userCd,
          salesOffice: this.teamList[0].code,
          salesSuptCd: this.suppList[0].userCd,
        };
        const param = JSON.parse(JSON.stringify(paramData));
        try {
          const response = await masterApi.saveCategoryBatch(param);
          if (response.data.rs) {
            await this.reset();
            await this.search();
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
    async removeCategory() {
      this.result = this.validation();
      if (this.result.validation) {
        const paramData = [];
        this.checkRows.forEach(rows => {
          paramData.push({ custId: rows.custId, prdtClsCd: rows.prdtClsCd });
        });
        const param = JSON.parse(JSON.stringify(paramData));
        try {
          const response = await masterApi.saveCategoryRemove(param);
          if (response.data.rs) {
            await this.search();
            this.$EventBus.$emit('openYesModal', 'message.msgSelectDelete');
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
    async search() {
      this.$refs.ProductCategorySearch.search();
    },
    async reset() {
      this.$refs.BatchCategoryModify.reset();
    },
    sendCategoryList(list) {
      this.categoryList = list;
      this.$refs.ProductCategoryGrid.gridCommit();
    },
    sendSalesList(list) {
      this.salesList = list;
    },
    sendTeamList(list) {
      this.teamList = list;
    },
    sendSuppList(list) {
      this.suppList = list;
    },
    okOrNo(result) {
      if (result) {
        if (this.type === 'reset') {
          this.$refs.ProductCategoryGrid.resetLayout();
        } else {
          this.$refs.ProductCategoryGrid.saveLayout();
        }
      }
    },
    layoutBtn(status) {
      this.ment = '';
      this.type = '';
      if (status.value === 'save') {
        this.type = 'save';
        this.ment = 'message.msgAskSave';
        this.$modal.show('MasterAlarmModal');
      } else {
        this.type = 'reset';
        this.ment = 'message.msgAskRefresh';
        this.$modal.show('MasterAlarmModal');
      }
      this.layoutValue = { text: this.$t('message.btnLayout'), value: '' };
    },
    fixGrid(type) {
      const rows = this.$refs.ProductCategoryGrid.sendJsonRows();
      const isChooseCell = this.$refs.ProductCategoryGrid.isChooseCell();
      if (this.categoryList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (!isChooseCell) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
      } else {
        if (rows.length > 0) {
          this.$refs.ProductCategoryGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
          if (type === 'column') {
            this.isFixColumn = !this.isFixColumn;
          } else if (type === 'row') {
            this.isFixRow = !this.isFixRow;
          }
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
        }
      }
    },
    async excelDownload() {
      if (this.categoryList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else {
        const excelData = {
          fileNm: 'ProductCategory-Excel.xlsx',
          showProgress: true,
          progressMessage: 'Exporting..',
          indicator: 'hidden',
          header: 'default',
          footer: 'hidden',
          compatibility: true,
        };
        this.$refs.ProductCategoryGrid.excelExport(excelData);
      }
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.ProductCategoryGrid.setFilter(this.filterOn);
    },
  },
  created() {},
  mounted() {
    this.getRouterLanguage();
    this.setFilter();
  },
  destroyed() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
