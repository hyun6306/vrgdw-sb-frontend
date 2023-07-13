<template>
  <div>
    <ProductManagementSearch :page="page" ref="productSearch" @sendSearchList="getSearchList" @sendPageInfo="getPageInfo" :changePageNumber="pageNumber" @resetPageNumber="resetPageNumber" :authButton="authButton" />

    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container10">
      <div class="real_head">
        <div class="real_head_left">
          <small
            >{{ $t('message.totalSelection1') }} <i>{{ pageInfo.totalCount }}</i> {{ $t('message.totalSelection2') }}</small
          >
        </div>
        <div class="real_head_right"></div>
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
          <!-- 레이아웃!!!! -->
          <MultiSelect id="Material_Group" class="btn_select_layout" style="width: 100%" v-model="layoutValue" :options="layoutOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @input="layoutBtn" label="text"></MultiSelect>
        </div>
      </div>

      <div class="real_body real_body04">
        <ProductManagementGird ref="productManagementGird" :listRows="listRows" :gridLang="gridLang" :page="page" :menuId="menuId" :savePage="savePage" @setObject="setObject" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button class="btn_default btn_function" @click="excelDownload">
            {{ $t('message.btnDownloadExcel') }}
          </button>
        </div>
      </div>
    </div>
    <PagIng :pageInfo="pageInfo" :length="listRows.length" ref="PagIng" @alterPageNumber="alterPageNumber" />
    <!-- //리얼그리드 -->

    <AlarmModal :ment="ment" @okOrNo="okOrNo" :page="page" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { debounce } from 'lodash';
import languageApi from '@/api/language';
import PagIng from '@/components/commonComponent/PagIng';
import ProductManagementSearch from '@/components/master/ProductManagementSearch';
import ProductManagementGird from '@/components/gridView/master/ProductManagementGird';
import AlarmModal from '@/modal/AlarmModal';
import dayjs from 'dayjs';
import masterApi from '@/api/master/master';
import fileDownload from '@/mixins/fileDownload';

export default {
  components: { PagIng, ProductManagementSearch, ProductManagementGird, AlarmModal },
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  data() {
    return {
      filterOn: true,
      pageInfo: { totalCount: 0 },
      pageNumber: 0,
      listRows: [],
      gridLang: [],
      ment: '',
      isFixColumn: false,
      isFixRow: false,
      layoutValue: { value: '', text: this.$t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$t('message.btnSave') },
        { value: 'reset', text: this.$t('message.btnInit') },
      ],
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    layoutBtn(status) {
      this.ment = '';
      if (status.value === 'save') {
        this.ment = 'message.msgAskSave';
        this.$modal.show(`AlarmModal${this.page}`, { type: 'save' });
      } else {
        this.ment = 'message.msgAskRefresh';
        this.$modal.show(`AlarmModal${this.page}`, { type: 'reset' });
      }
      this.layoutValue = { text: this.$t('message.btnLayout'), value: '' };
    },
    fixGrid(type) {
      if (this.$refs.productManagementGird.isChooseCell() == true) {
        this.$refs.productManagementGird.fixGrid(type, this.isFixColumn, this.isFixRow);
        if (type === 'column') {
          this.isFixColumn = !this.isFixColumn;
        } else if (type === 'row') {
          this.isFixRow = !this.isFixRow;
        }
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
      }
    },
    okOrNo(result, type) {
      if (result) {
        if (type === 'reset') {
          this.$refs.productManagementGird.resetLayout();
        } else {
          this.$refs.productManagementGird.saveLayout();
        }
      }
    },

    getSearchList(list) {
      this.listRows = list;
    },
    getPageInfo(pageInfo) {
      this.pageInfo = pageInfo;
    },
    alterPageNumber(pageNumber) {
      this.pageNumber = pageNumber;
    },
    resetPageNumber() {
      this.$refs.PagIng.resetPageNumber();
    },
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
    setObject(pageObj, id, rowData) {
      const vm = this;
      this.sendEmit(vm, pageObj, id, rowData);
    },
    sendEmit: debounce((vm, obj, id = '', rowData = '') => {
      vm.$emit('setNewObject', obj, id, rowData);
    }, 700),
    async excelDownload() {
      const prdtClsCd = this.$refs.productSearch.prdtClsCd.value;
      if (prdtClsCd === '') {
        this.$EventBus.$emit('openYesModal', 'message.msgImpossibleAllDownload');
        return;
      }
      try {
        const param = {
          prdtClsCd: this.$refs.productSearch.prdtClsCd.value,
          operClsCd: this.$refs.productSearch.operClsCd.length > 0 ? this.$refs.productSearch.operClsCd.join(',') : '',
          fileNm: `Product List-${dayjs().format('YYYYMMDD')}.xlsx`,
        };
        const resp = await masterApi.getProductExcel(param);
        fileDownload.downloadFile(resp, param.fileNm);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.productManagementGird.setFilter(this.filterOn);
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
