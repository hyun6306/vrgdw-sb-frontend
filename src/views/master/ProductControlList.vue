<template>
  <div>
    <ProductControlSearch ref="ProductControlSearch" @sendSalesInsertList="sendSalesInsertList" :authButton="authButton" :page="page" :routerPath="routerPath" :menuId="menuId" />
    <!-- 리얼그리드 -->
    <div class="realgrid_container_row" style="height: calc(100% - 81px)">
      <div class="realgrid_container realgrid_container14">
        <div class="real_head">
          <div class="real_head_left">
            <span class="subTitle">{{ $t('message.agencyList') }}</span>
            <small class="ml-10">
              {{ $t('message.totalSelection1') }}
              <i>{{ salesInsertList.length }}</i>
              {{ $t('message.totalSelection2') }}
            </small>
          </div>
        </div>
        <div class="real_top_filter"></div>
        <div class="real_body real_body12">
          <ProductClientListGrid style="height: 100%" :gridName="'ProductClientListGrid'" ref="ProductClientListGrid" :salesInsertList="salesInsertList" @sendJsonRowClick="sendJsonRowClick" :gridLang="gridLang" />
        </div>
      </div>
      <div class="realgrid_container realgrid_container14">
        <div class="real_head">
          <div class="real_head_left">
            <span class="subTitle">{{ $t('message.restrictedItem') }}</span>
            <small class="ml-10">
              {{ $t('message.totalSelection1') }}
              <i>{{ controlList.length }}</i>
              {{ $t('message.totalSelection2') }}
            </small>
          </div>
        </div>
        <div class="real_top_filter"></div>
        <div class="real_body real_body12">
          <ProductControlGrid style="height: 100%" :gridName="'ProductControlGrid'" ref="ProductControlGrid" :controlList="controlList" :gridLang="gridLang" />
        </div>
      </div>
      <div class="real_footer">
        <div class="footer_left"></div>
        <div class="footer_right">
          <button class="btn_default btn_critical_process" @click="saveControlList()">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import masterApi from '@/api/master/master';
import ProductControlSearch from '@/components/master/ProductControlSearch';
import ProductClientListGrid from '@/components/gridView/master/ProductClientListGrid';
import ProductControlGrid from '@/components/gridView/master/ProductControlGrid';

export default {
  components: {
    ProductControlSearch,
    ProductClientListGrid,
    ProductControlGrid,
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
  },
  data() {
    return {
      salesInsertList: [],
      controlList: [],
      gridLang: [],
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
    validation() {
      const result = { validation: true };
      this.changeRows = this.$refs.ProductControlGrid.getNewAndChangeData();

      if (this.controlList.length === 0) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (this.changeRows.length === 0) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoChange');
      }
      return result;
    },
    async sendJsonRowClick(row) {
      if (row.length !== 0) {
        try {
          const param = { custId: row[0].custId };
          const response = await masterApi.getProductControlList(param);
          this.controlList = response.data.ds;
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    gridCommit() {
      this.$refs.ProductClientListGrid.gridCommit();
      this.$refs.ProductControlGrid.gridCommit();
    },
    sendSalesInsertList(sendSalesInsertList) {
      this.salesInsertList = sendSalesInsertList;
      this.controlList = [];
      this.gridCommit();
      this.sendJsonRowClick(this.salesInsertList);
      this.$refs.ProductClientListGrid.initDisptRow();
    },
    async search() {
      this.$refs.ProductControlSearch.search();
      this.gridCommit();
    },
    async saveControlList() {
      const jsonRows = this.$refs.ProductControlGrid.sendJsonRows();
      this.result = this.validation();
      if (this.result.validation) {
        try {
          const paramData = [];
          this.changeRows.forEach(row => {
            paramData.push({
              custId: row.custId,
              prdtClsCd: row.prdtClsCd,
              useYn: row.useYn,
            });
          });
          const param = JSON.parse(JSON.stringify(paramData));
          const response = await masterApi.saveProductControlList(param);
          if (response.data.rs) {
            await this.sendJsonRowClick(jsonRows);
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
  },
  created() {},
  async mounted() {
    this.getRouterLanguage();
  },
  destroyed() {},
};
</script>

<style>
.subTitle {
  font-size: 1em;
  font-weight: bold;
}
.checkbox-label {
  display: block;
}
</style>
