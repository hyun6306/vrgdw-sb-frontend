<template>
  <div>
    <DeliveryListSearch ref="DeliveryListSearch" @sendDeliveryStatusList="sendDeliveryStatusList" :authButton="authButton" :page="page" :openInfo="openInfo" />
    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container09">
      <div class="real_head">
        <div class="real_head_left">
          <small>
            {{ $t('message.totalSelection1') }} <i>{{ deliveryStatusList.length }}</i> {{ $t('message.totalSelection2') }}
          </small>
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
      <div class="real_body real_body04">
        <DeliveryListGrid style="height: 100%" :gridName="'DeliveryListGrid'" ref="DeliveryListGrid" :deliveryStatusList="deliveryStatusList" :savePage="savePage" :menuId="menuId" :page="page" :gridLang="gridLang" @openAddrInfo="openAddrInfo" @sendCheckedData="sendCheckedData" @sendTrnReqRemark="sendTrnReqRemark" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <!-- 배송현황 단위변환 -->
          <MultiSelect id="Material_Group" class="btn_select" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @input="changeUnit" label="text"></MultiSelect>
          <button v-if="this.authButton.exlAuth === 'Y'" @click="excelDownload()" class="btn_default btn_function">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right">
          <!-- <button class="btn_default btn_temp" @click="requestCancel()">{{ $t('message.btnCancelDelivery') }}</button> -->
          <!-- <button class="btn_default btn_temp" @click="deliveryRequest()">{{ $t('message.btnRequestDeliver') }}</button> -->
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <TranAlarmModal :ment="ment" @okOrNo="okOrNo" :type="type" />
    <AddressInfoModal :addrOffrId="addrOffrId" :page="page" />
    <!-- <DeliveryRequestModal :deliveryRows="selectProductRows" :menuId="menuId" :custId="custId" :page="page" :authButton="authButton" @isReSearch="isReSearch" /> -->
    <DetailCommentModal :ment="ment" :modalType="'message.trnReqRemark'" />
    <DeliveryInfoModal :page="page" :menuId="menuId" />
    <ForwardingDetailModal :menuId="menuId" :page="page" />
  </div>
</template>

<script>
import DeliveryListSearch from '@/components/tran/DeliveryListSearch';
import { loadLanguageAsync } from '@/plugins/i18n';
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import DeliveryListGrid from '@/components/gridView/tran/DeliveryListGrid';
import TranAlarmModal from '@/modal/tran/TranAlarmModal';
import AddressInfoModal from '@/modal/order/AddressInfoModal';
// import DeliveryRequestModal from '@/modal/booking/DeliveryRequestModal';
import DetailCommentModal from '@/modal/detail/DetailCommentModal';
import defs from '@/consts/defs';
import DeliveryInfoModal from '@/modal/tran/DeliveryInfoModal';
import ForwardingDetailModal from '@/modal/tran/ForwardingDetailModal';

export default {
  components: {
    DeliveryListGrid,
    TranAlarmModal,
    // DeliveryRequestModal,
    DetailCommentModal,
    AddressInfoModal,
    DeliveryListSearch,
    DeliveryInfoModal,
    ForwardingDetailModal,
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
    openInfo: {
      type: Object,
    },
  },
  data() {
    return {
      filterOn: true,
      selectValue: { text: this.$t('message.order') },
      selectOptions: [
        { value: false, text: this.$t('message.order') },
        { value: true, text: this.$t('message.base') },
      ],
      deliveryStatusList: [],
      isFixRow: false,
      isFixColumn: false,
      gridLang: [],
      layoutValue: { text: this.$t('message.btnLayout'), value: '' },
      layoutOptions: [
        { text: this.$t('message.btnSave'), value: 'save' },
        { text: this.$t('message.btnInit'), value: 'reset' },
      ],
      ment: '',
      selectProductRows: [],
      type: '',
      deliveryRows: [],
      result: '',
      addrOffrId: 0,
      custId: 0,
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    fwdDtlsModal(trnPlnNum) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnNum, readOnly: true });
    },
    deliveryInfoModal(trnNum) {
      this.$modal.show(`DeliveryInfoModal${this.page}`, { trnNum: trnNum });
    },
    changeUnit(type) {
      this.$refs.DeliveryListGrid.layoutState(type.value);
    },
    isReSearch() {
      this.$refs.DeliveryListSearch.search();
    },
    validation() {
      const result = { validation: true, ment: '' };
      if (this.deliveryStatusList.length === 0) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (this.selectProductRows.length === 0) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
      } else {
        this.selectProductRows.forEach(list => {
          if (list.outStatCd === defs.outStatCd.delIng || list.outStatCd === defs.outStatCd.delEnd) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgCheckDeliveryStatus');
          } else if (this.selectProductRows[0].custId !== list.custId) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgCheckCustId');
          } else if (this.selectProductRows[0].offrClsCd !== list.offrClsCd) {
            result.validation = false;
            this.$EventBus.$emit('openYesModal', 'message.msgSameOffer');
          }
        });
      }
      return result;
    },
    async deliveryRequest() {
      this.$refs.DeliveryListGrid.sendCheckedData();
      this.result = this.validation();
      if (this.result.validation) {
        this.custId = Number(this.selectProductRows[0].custId);
        await loadLanguageAsync('/modal/delivery', this.menuId);
        this.$modal.show('DeliveryRequestModal', { type: 'delivery' });
      }
    },
    sendCheckedData(selectProductRows) {
      this.selectProductRows = selectProductRows;
    },
    sendTrnReqRemark(ment) {
      this.ment = '';
      this.ment = ment;
      this.$modal.show('DetailCommentModal');
    },
    openAddrInfo(offrId) {
      this.addrOffrId = Number(offrId);
      this.$modal.show(`AddressInfoModal${this.page}`);
    },
    sendDeliveryStatusList(list) {
      this.deliveryStatusList = list;
    },
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
    okOrNo(result) {
      if (result) {
        if (this.type === 'reset') {
          this.$refs.DeliveryListGrid.resetLayout();
        } else {
          this.$refs.DeliveryListGrid.saveLayout();
        }
      }
    },
    layoutBtn(status) {
      this.ment = '';
      this.type = '';
      if (status.value === 'save') {
        this.type = 'save';
        this.ment = 'message.msgAskSave';
        this.$modal.show('TranAlarmModal');
      } else {
        this.type = 'reset';
        this.ment = 'message.msgAskRefresh';
        this.$modal.show('TranAlarmModal');
      }
      this.layoutValue = { text: this.$t('message.btnLayout'), value: '' };
    },
    fixGrid(type) {
      const rows = this.$refs.DeliveryListGrid.sendJsonRows();
      const isChooseCell = this.$refs.DeliveryListGrid.isChooseCell();

      if (this.deliveryStatusList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (!isChooseCell) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
      } else {
        if (rows.length > 0) {
          this.$refs.DeliveryListGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
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
      if (this.deliveryStatusList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else {
        const excelData = {
          fileNm: 'DeliveryList-Excel.xlsx',
          showProgress: true,
          progressMessage: 'Exporting..',
          indicator: 'hidden',
          header: 'default',
          footer: 'hidden',
          compatibility: true,
        };
        this.$refs.DeliveryListGrid.excelExport(excelData);
      }
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.DeliveryListGrid.setFilter(this.filterOn);
    },
  },
  created() {
    this.getRouterLanguage();
  },
  mounted() {
    this.selectValue = this.selectOptions[0];
    this.changeUnit(this.selectValue);
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
