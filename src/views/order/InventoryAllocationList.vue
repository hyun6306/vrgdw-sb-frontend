<template>
  <div>
    <InventorySearch ref="InventorySearch" :authButton="authButton" :page="page" @searchBookingList="setBookginList" @sendPlntCdOptions="getPlntCdOptions" />
    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container09">
      <div class="real_head">
        <div class="real_head_left">
          <small v-if="selectValue.value">
            {{ $t('message.bokngTotalQty') }}<i>{{ bokngQty.base }}</i> / {{ $t('message.allocationNeedQty') }}
            <i>{{ asgnNeedQty.base }}</i>
          </small>
          <small v-else>
            {{ $t('message.bokngTotalQty') }}<i>{{ bokngQty.ord }}</i> / {{ $t('message.allocationNeedQty') }}
            <i>{{ asgnNeedQty.ord }}</i>
          </small>
        </div>
        <div class="real_head_right">
          <button class="btn_default btn_process" @click="inventoryFn('rfc')" v-if="authButton.fn1Auth === 'Y'">{{ $t('message.btnCallRfc') }}</button>
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
            <span v-if="!isFixColumn">{{ $t('message.btnFixColumn') }}</span>
            <span v-else>{{ $t('message.btnUnfixColumn') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="fixGrid('row')">
            <img src="@/assets/img/icon_hori.png" />
            <span v-if="!isFixRow">{{ $t('message.btnFixRow') }}</span>
            <span v-else>{{ $t('message.btnUnfixRow') }}</span>
          </button>
          <MultiSelect id="Material_Group" v-model="selectLayout" :close-on-select="true" :options="selectLayoutOptions" :searchable="false" :show-labels="false" class="btn_select_layout" label="text" placeholder="Layout" style="width: 100%" @input="selectLayoutOne"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body04">
        <InventoryGrid ref="InventoryGrid" :gridLang="gridLang" :listRows="bookingList" :page="page" :plntCdOptions="plntCdOptions" :savePage="savePage" style="height: 100%" @checkedInfo="setTotalQty" @openAddrInfo="openAddrInfo" @openSalesMemo="openSalesMemo" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <MultiSelect id="Material_Group" v-model="selectValue" :allow-empty="false" :close-on-select="true" :options="selectOptions" :searchable="false" :show-labels="false" class="btn_select" label="text" style="width: 100%" @input="changeUnit"></MultiSelect>
          <button v-if="this.authButton.exlAuth === 'Y'" class="btn_default btn_function" @click="excelDownload">
            {{ $t('message.btnDownloadExcel') }}
          </button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_critical_process" @click="inventoryFn('reloadQty')" v-if="authButton.fn4Auth === 'Y'">{{ $t('message.btnSopReloadQty') }}</button>
          <button class="btn_default btn_critical_process" @click="inventoryFn('deleteSo')" v-if="authButton.fn4Auth === 'Y'">{{ $t('message.btnCancelSo') }}</button>
          <button class="btn_default btn_critical_process" @click="inventoryFn('qty')" v-if="authButton.fn2Auth === 'Y'">{{ $t('message.btnModifyQty') }}</button>
          <button class="btn_default btn_critical_process" @click="inventoryFn('plant')" v-if="authButton.fn3Auth === 'Y'">{{ $t('message.btnSetPlant') }}</button>
          <button class="btn_default btn_critical_process" @click="inventoryFn('so')" v-if="authButton.fn4Auth === 'Y'">{{ $t('message.btnCreateSo') }}</button>
          <!-- <button class="btn_default btn_white" @click="inventoryFn('req')">생산의뢰</button> -->
          <button class="btn_default btn_process" @click="inventoryFn('alEnd')" v-if="authButton.fn5Auth === 'Y'">{{ $t('message.btnAllocationEnd') }}</button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <AddressInfoModal :addrOffrId="addrOffrId" :page="page" />
    <PriceAlarmModal />
    <PlantSelectModal :plntCdOptions="plntCdOptions" @sendPlant="savePlant" />
    <CommentModal :meno="memo" />
    <FailListModal />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import { loadLanguageAsync } from '@/plugins/i18n';
import InventorySearch from '@/components/booking/InventoryAlloSearch';
import InventoryGrid from '@/components/gridView/booking/InventoryAlloListGrid';
import AddressInfoModal from '@/modal/order/AddressInfoModal';
import PriceAlarmModal from '@/modal/sales/PriceAlarmModal';
import PlantSelectModal from '@/modal/inventory/PlantSelectModal';
import CommentModal from '@/modal/inventory/CommentModal';
import commonApi from '@/api/common';
import bookingApi from '@/api/order/booking';
import orderApi from '@/api/order/order';
import languageApi from '@/api/language';
import defs from '@/consts/defs';
import FailListModal from '@/modal/inventory/FailListModal';

export default {
  components: {
    InventorySearch,
    InventoryGrid,
    AddressInfoModal,
    PriceAlarmModal,
    PlantSelectModal,
    CommentModal,
    FailListModal,
  },
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  data() {
    return {
      filterOn: true,
      selectOptions: [
        { value: false, text: this.$i18n.t('message.order') },
        { value: true, text: this.$i18n.t('message.base') },
      ],
      selectValue: { value: true, text: this.$i18n.t('message.base') },

      layoutOpen: false,
      bookingList: [],
      addrOffrId: 0,
      isFixRow: false,
      isFixColumn: false,
      plntCdOptions: [],
      checkedRows: [],
      memo: {},
      gridLang: [],
      selectLayout: { text: this.$i18n.t('message.btnLayout'), value: '' },
      selectLayoutOptions: [
        { text: this.$i18n.t('message.btnSave'), value: 'SAVE' },
        { text: this.$i18n.t('message.btnInit'), value: 'RESET' },
      ],
      bokngQty: { ord: 0, base: 0 },
      asgnNeedQty: { ord: 0, base: 0 },
      soFailList: [],
      defBokngStatCd: defs.bokngStatCd,
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    async saveBookingAssignEnd() {
      try {
        const ids = [];
        this.checkedRows.forEach(row => {
          ids.push(row.id);
        });
        const param = {
          ids,
        };

        await bookingApi.saveBookingAssignEnd(param);
        await this.$refs.InventorySearch.getAllocationList();
        this.$EventBus.$emit('openYesModal', this.$t('message.msgResultAlEnd'));
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getPlantQty() {
      try {
        const param = [];
        let prdtCd = [];
        this.bookingList.forEach(list => {
          prdtCd.push(list.prdtCd);
        });
        prdtCd = [...new Set(prdtCd)];
        prdtCd.forEach(cd => {
          let dataV112 = {
            plntCd: 'V112',
            prdtCd: cd,
          };
          let dataV113 = {
            plntCd: 'V113',
            prdtCd: cd,
          };
          param.push(dataV112);
          param.push(dataV113);
        });

        const resp = await bookingApi.getPlantQty(param);
        resp.data.ds.forEach(qty => {
          this.bookingList.forEach(list => {
            if (list.prdtCd === qty.prdtCd && qty.plntCd === 'V113') {
              list.v113PlntStockBaseQty = qty.plntStockBaseQty;
              list.v113PlntStockOrdQty = qty.plntStockOrdQty;
            }
            if (list.prdtCd === qty.prdtCd && qty.plntCd === 'V112') {
              list.v112PlntStockBaseQty = qty.plntStockBaseQty;
              list.v112PlntStockOrdQty = qty.plntStockOrdQty;
            }
          });
        });

        if (!this.bookingList[0].plantIn) {
          this.bookingList[0].plantIn = true;
        }
        this.bookingList = JSON.parse(JSON.stringify(this.bookingList));
        // this.$EventBus.$emit('openYesModal', resp.data.message);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setTotalQty(data) {
      if (data) {
        if (data.all) {
          if (data.checked) {
            this.bokngQty.base = data.bokngBaseQty.toFixed(3);
            this.bokngQty.ord = parseFloat(data.bokngOrdQty.toFixed(3));
            this.asgnNeedQty.base = data.asgnBaseNedQty.toFixed(3);
            this.asgnNeedQty.ord = parseFloat(data.asgnOrdNedQty.toFixed(3));
          } else {
            this.bokngQty = { ord: 0, base: 0 };
            this.asgnNeedQty = { ord: 0, base: 0 };
          }
        } else {
          if (data.checked) {
            this.bokngQty.base = (this.bokngQty.base * 1000 + data.bokngBaseQty * 1000) / 1000;
            this.bokngQty.ord = (this.bokngQty.ord * 1000 + data.bokngOrdQty * 1000) / 1000;
            this.asgnNeedQty.base = (this.asgnNeedQty.base * 1000 + data.asgnBaseNedQty * 1000) / 1000;
            this.asgnNeedQty.ord = (this.asgnNeedQty.ord * 1000 + data.asgnOrdNedQty * 1000) / 1000;
            // this.bokngQty.base += data.bokngBaseQty;
            // this.bokngQty.ord += data.bokngOrdQty;
            // this.asgnNeedQty.base += data.asgnBaseNedQty;
            // this.asgnNeedQty.ord += data.asgnOrdNedQty;
          } else {
            this.bokngQty.base = (this.bokngQty.base * 1000 - data.bokngBaseQty * 1000) / 1000;
            this.bokngQty.ord = parseFloat(((this.bokngQty.ord * 1000 - data.bokngOrdQty * 1000) / 1000).toFixed(3));
            this.asgnNeedQty.base = (this.asgnNeedQty.base * 1000 - data.asgnBaseNedQty * 1000) / 1000;
            this.asgnNeedQty.ord = parseFloat(((this.asgnNeedQty.ord * 1000 - data.asgnOrdNedQty * 1000) / 1000).toFixed(3));

            // this.bokngQty.base -= data.bokngBaseQty;
            // this.bokngQty.ord -= data.bokngOrdQty;
            // this.asgnNeedQty.base -= data.asgnBaseNedQty;
            // this.asgnNeedQty.ord -= data.asgnOrdNedQty;
          }
        }
      } else {
        this.bokngQty = { ord: 0, base: 0 };
        this.asgnNeedQty = { ord: 0, base: 0 };
      }
    },
    inventoryFn(type) {
      if (this.validation(type)) {
        if (type === 'plant') {
          // 플랜트 변경
          this.$modal.show('PlantSelectModal');
          // this.savePlant();
        } else if (type === 'so') {
          // S/O 생성
          this.createSo();
        } else if (type === 'alEnd') {
          // 재고할당완료
          this.saveBookingAssignEnd();
        } else if (type === 'rfc') {
          this.getPlantQty();
        } else if (type === 'qty') {
          this.saveBookingQty();
        } else if (type === 'deleteSo') {
          this.deleteSo();
        } else if (type === 'reloadQty') {
          this.reloadQty();
        }
      }
    },
    validation(is = '') {
      const rows = this.$refs.InventoryGrid.sendJsonRows();
      const isChooseCell = this.$refs.InventoryGrid.isChooseCell();
      const isChecked = this.$refs.InventoryGrid.sendChecked();
      this.checkedRows = this.$refs.InventoryGrid.sendCheckedData();
      if (rows.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
        return false;
      } else if (!isChooseCell && is === '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
        return false;
      } else if (!isChecked && is !== '' && is !== 'rfc') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoItem');
        return false;
      } else if (is !== '' && is !== 'rfc') {
        let isBK06 = false;
        let existSoNo = false;
        let notExistAsgnNedQty = false;
        let allocationCheck = false;

        if (is === 'reloadQty' && this.checkedRows.length > 1) {
          this.$EventBus.$emit('openYesModal', 'message.msgReloadQtyOneItem');
          return false;
        }

        this.checkedRows.forEach(row => {
          if (row.bokngStatCd === this.defBokngStatCd.assiEnd) {
            isBK06 = true;
          }
          if (row.bokngSoNum && row.bokngSoNum !== '') {
            existSoNo = true;
          }

          if (row.asgnBaseNedQty && row.asgnBaseNedQty === '0') {
            notExistAsgnNedQty = true;
          }

          if (row.asgnBaseTotQty !== 0) {
            allocationCheck = true;
          }
        });
        if (isBK06 && is !== 'reloadQty') {
          this.$EventBus.$emit('openYesModal', 'message.msgValidStatusAssgn');
          return false;
        } else if (existSoNo && is === 'plant') {
          this.$EventBus.$emit('openYesModal', 'message.msgValidChangPlant');
          return false;
        } else if (existSoNo && (is === 'so' || is === 'qty')) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidExistSo');
          return false;
        } else if (notExistAsgnNedQty && is === 'alEnd') {
          this.$EventBus.$emit('openYesModal', 'message.msgValidAllocationQty');
          return false;
        } else if (!existSoNo && is === 'alEnd') {
          this.$EventBus.$emit('openYesModal', 'message.msgValidNotExistSo');
          return false;
        } else if (is === 'deleteSo' && !existSoNo) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidNotExistSo');
          return false;
        } else if (is === 'deleteSo' && allocationCheck) {
          this.$EventBus.$emit('openYesModal', 'message.errorsCannotSoCancel');
          return false;
        } else if (is === 'reloadQty' && !existSoNo) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidNotExistSo');
          return false;
        }
        if (is === 'so') {
          let diffBokngNum = false;
          this.checkedRows.forEach(list => {
            let diff = this.checkedRows.findIndex(list2 => {
              return list2.offrNum === list.offrNum && list2.bokngNum !== list.bokngNum;
            });
            if (diff > 0) {
              diffBokngNum = true;
            }
          });
          if (diffBokngNum) {
            this.$EventBus.$emit('openYesModal', 'message.msgValidCreateSoBokngNum');
            return false;
          }
        }

        return true;

        // return true;
      } else {
        return true;
      }
    },
    fixGrid(type) {
      if (this.validation()) {
        this.$refs.InventoryGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
        if (type === 'column') {
          this.isFixColumn = !this.isFixColumn;
        } else if (type === 'row') {
          this.isFixRow = !this.isFixRow;
        }
      }
    },
    setBookginList(data) {
      this.$refs.InventoryGrid.resetAllChecked();
      if (data.type === 'soReload') {
        this.soFailList.forEach(fail => {
          data.bookingList.forEach(list => {
            if (list.offrNum === fail) {
              list.soFail = 'fail';
            }
          });
        });
      } else {
        this.soFailList = [];
      }
      this.bookingList = JSON.parse(JSON.stringify(data.bookingList));
    },
    async openAddrInfo(offrId) {
      await loadLanguageAsync('/modal/addressInfoList', this.menuId);
      this.addrOffrId = Number(offrId);
      this.$modal.show(`AddressInfoModal${this.page}`);
    },
    changeUnit(choose) {
      this.$refs.InventoryGrid.layoutState(choose.value);
    },
    excelDownload() {
      const excelData = {
        fileNm: `inventoryExcel${dayjs().format('DD-MM-YYYY')}.xlsx`,
        showProgress: true,
        progressMessage: 'Exporting..',
        indicator: 'hidden',
        header: 'default',
        footer: 'hidden',
        compatibility: true,
      };
      this.$refs.InventoryGrid.excelExport(excelData);
    },
    async openSalesMemo(param) {
      try {
        const resp = await orderApi.getOffrMemo(param);
        if (resp.data.status === 200) {
          this.memo = resp.data.rs;
          this.$modal.show('InventoryCommentModal');
        } else {
          this.$EventBus.$emit('openYesModal', resp.data.message);
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async layoutSave(type, result) {
      this.layoutOpen = !this.layoutOpen;
      if (result) {
        if (type === 'reset' || type === 'update') {
          this.$refs.InventoryGrid.resetLayout(this.selectValue.value);
        }
        try {
          const column = this.$refs.InventoryGrid.getLayout();
          const param = {
            menuId: this.menuId,
            storeCls: this.page,
            uiJson: column,
          };
          await commonApi.putSaveUi(param);
          if (type === 'update') {
            this.$EventBus.$emit('openYesModal', 'message.msgLayoutUpdate');
          } else if (type === 'reset') {
            this.$EventBus.$emit('openYesModal', 'message.msgClearRefresh');
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgResultSave');
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

    getPlntCdOptions(plntCdOptions) {
      this.plntCdOptions = plntCdOptions;
    },
    async savePlant(plant) {
      try {
        // const param = [];
        // this.checkedRows.forEach(row => {
        //   let data = {
        //     plntCd: row.plntCd,
        //     id: row.id,
        //   };
        //   param.push(data);
        // });
        const ids = [];
        this.checkedRows.forEach(row => {
          ids.push(row.id);
        });
        const param = {
          plntCd: plant.value,
          ids,
        };
        await bookingApi.savePlant(param);
        this.$refs.InventorySearch.getAllocationList();
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async createSo() {
      try {
        const param = [];
        this.checkedRows.forEach(row => {
          let data = {
            id: row.id,
          };
          param.push(data);
        });

        const resp = await bookingApi.createSo(param);

        if (resp.data.ds.length === 0) {
          await this.$refs.InventorySearch.getAllocationList();
          // this.$EventBus.$emit('openYesModal', resp.data.message);
        } else {
          resp.data.ds.forEach(list => {
            this.soFailList.push(list.offerNum);
          });
          await this.$refs.InventorySearch.getAllocationList('soReload');
          this.$modal.show('FailListModal', { errorList: resp.data.ds });
          // this.$EventBus.$emit('openYesModal', 'message.msgFailSoCreate');
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getGridMutiLanguage() {
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
    selectLayoutOne(value) {
      if (value.value === 'SAVE') {
        this.$modal.show('PriceAlarmModal', { type: 'save' });
      } else if (value.value === 'RESET') {
        this.$modal.show('PriceAlarmModal', { type: 'reset' });
      }
      this.selectLayout = { text: this.$i18n.t('message.btnLayout'), value: '' };
    },
    async saveBookingQty() {
      try {
        const param = [];
        this.checkedRows.forEach(row => {
          let data = {
            id: row.id,
            offrId: row.offrId,
            offrNum: row.offrNum,
            offrDtlsId: row.offrDtlsId,
            bokngBaseQty: row.bokngBaseQty,
            prdtCd: row.prdtCd,
          };
          param.push(data);
        });
        await bookingApi.saveBookingQty(param);
        this.$EventBus.$emit('openYesModal', 'message.msgSave');
        await this.$refs.InventorySearch.getAllocationList();
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
      this.$refs.InventoryGrid.setFilter(this.filterOn);
    },
    async deleteSo() {
      try {
        const param = [];
        this.checkedRows.forEach(row => {
          param.push({ bokngSoNum: row.bokngSoNum });
        });
        await bookingApi.deleteSo(param);
        this.$EventBus.$emit('openYesModal', 'message.msgSuccessDeleteSo');
        await this.$refs.InventorySearch.getAllocationList();
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async reloadQty() {
      try {
        const param = [];
        this.checkedRows.forEach(row => {
          param.push({
            id: row.id,
            offrId: row.offrId,
            offrNum: row.offrNum,
            bokngSoNum: row.bokngSoNum,
            bokngSoItemNum: row.bokngSoItemNum,
          });
        });
        await bookingApi.reloadQty(param);
        this.$EventBus.$emit('openYesModal', 'message.msgReloadQtySuccess');
        await this.$refs.InventorySearch.getAllocationList();
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  created() {},
  mounted() {
    this.getGridMutiLanguage();
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
