<template>
  <div>
    <DispatchConfirmSearch ref="DispatchConfirmSearch" :authButton="authButton" :page="page" :openInfo="openInfo" @sendDipatchConfirmList="sendDipatchConfirmList" />
    <!-- 리얼그리드 -->
    <!--    <div :class="[searchOpen ? 'realgrid_container realgrid_container09' : 'realgrid_container realgrid_container09 padding-on']">-->
    <div class="realgrid_container realgrid_container09">
      <div class="real_head">
        <div class="real_head_left">
          <!-- <small>{{ $t('message.disComplList') }}</small> -->
          <small
            >{{ $t('message.totalSelection1') }}
            <i>{{ dispatchConfirmList.length }}</i>
            {{ $t('message.totalSelection2') }}
          </small>
        </div>
        <div class="real_head_right">
          <button v-if="authButton.fn2Auth === 'Y'" class="btn_default btn_print_fuction" @click="clickBtn('invoice')">{{ $t('message.btnInvoiceNum') }}</button>
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
          <MultiSelect id="Material_Group" v-model="layoutValue" :allow-empty="false" :close-on-select="true" :options="layoutOptions" :searchable="false" :show-labels="false" class="btn_select_layout" label="text" style="width: 100%" @input="layoutBtn"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body04">
        <DispatchConfirmGrid ref="DispatchConfirmGrid" :dispatchConfirmList="dispatchConfirmList" :gridLang="gridLang" :gridName="'DispatchConfirmGrid'" :menuId="menuId" :page="page" :savePage="savePage" style="height: 100%" @sendGridtrnPlnInfo="sendGridtrnPlnInfo" @openForwardingCustCar="openForwardingCustCar" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button v-if="authButton.exlAuth === 'Y'" class="btn_default btn_function" @click="excelDownload()">
            {{ $t('message.btnDownloadExcel') }}
          </button>
        </div>
        <div class="footer_right">
          <button v-if="authButton.delAuth === 'Y'" class="btn_default btn_function" @click="clickBtn('cancel')">{{ $t('message.btnCancelDo') }}</button>
          <button v-if="authButton.savAuth === 'Y'" class="btn_default btn_function" @click="clickBtn('save')">
            {{ $t('message.btnSave') }}
          </button>
          <button v-if="authButton.fn1Auth === 'Y'" class="btn_default btn_critical_process" @click="clickBtn('confirm')">{{ $t('message.btnDispatchConfirmed') }}</button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <TranAlarmModal :ment="ment" :type="type" @okOrNo="okOrNo" />
    <ForwardingDetailModal :menuId="menuId" :page="page" />
    <!-- 고객차량 선택 -->
    <ForwardingCustCarModal :menuId="menuId" :page="page" />
    <!-- <DatePickerModal @selectDate="showSelectDate" :currentDate="currentDate" :openSelectDate="openSelectDate" /> -->
    <DeliveryInfoModal :page="page" :menuId="menuId" />
  </div>
</template>

<script>
import DispatchConfirmSearch from '@/components/tran/DispatchConfirmSearch';
import DispatchConfirmGrid from '@/components/gridView/tran/DispatchConfirmGrid';
import TranAlarmModal from '@/modal/tran/TranAlarmModal';
import languageApi from '@/api/language';
import defs from '@/consts/defs';
import tranApi from '@/api/tran/tran';
import ForwardingDetailModal from '@/modal/tran/ForwardingDetailModal';
import ForwardingCustCarModal from '@/modal/tran/ForwardingCustCarModal';
import DeliveryInfoModal from '@/modal/tran/DeliveryInfoModal';

export default {
  components: {
    DispatchConfirmSearch,
    TranAlarmModal,
    DispatchConfirmGrid,
    ForwardingDetailModal,
    ForwardingCustCarModal,
    DeliveryInfoModal,
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
      dispatchConfirmList: [],
      isFixRow: false,
      isFixColumn: false,
      layoutValue: { text: this.$t('message.btnLayout'), value: '' },
      layoutOptions: [
        { text: this.$t('message.btnSave'), value: 'save' },
        { text: this.$t('message.btnInit'), value: 'reset' },
      ],
      type: '',
      ment: '',
      result: '',
      searchOpen: false,
      gridLang: [],
      ids: [],
      selectProductRows: [],
    };
  },
  methods: {
    deliveryInfoModal(trnNum) {
      this.$modal.show(`DeliveryInfoModal${this.page}`, { trnNum: trnNum });
    },
    fwdDtlsModal(trnPlnNum) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnNum, readOnly: true });
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
    validation(type) {
      this.selectProductRows = this.$refs.DispatchConfirmGrid.sendCheckedData();
      const result = { validation: true };
      if (this.dispatchConfirmList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
        result.validation = false;
      } else if (this.selectProductRows.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
        result.validation = false;
      } else {
        if (type === 'cancel') {
          // this.selectProductRows.forEach(row => {
          //   if (row.trnClsCd === defs.trnClsCd.deposit) {
          //     this.$EventBus.$emit('openYesModal', 'message.msgNoDeposit');
          //     result.validation = false;
          //   }
          // });
        } else if (type === 'save') {
          let notExistOutTypeCd = false;
          this.selectProductRows.forEach(row => {
            if (row.outStatCd === defs.outStatCd.disCon) {
              this.$EventBus.$emit('openYesModal', 'message.msgNoSaveConfirm');
              result.validation = false;
            } else if (!row.outTypeCd || row.outTypeCd === '') {
              notExistOutTypeCd = true;
              result.validation = false;
            }
          });
          if (notExistOutTypeCd) {
            this.$EventBus.$emit('openYesModal', 'message.msgNoForwardingType');
          }
        } else if (type === 'confirm') {
          // if (this.selectProductRows.length > 1) {
          //   this.$EventBus.$emit('openYesModal', 'message.msgSelectDispatchOnlyOne');
          //   result.validation = false;
          // else if (this.selectProductRows) {
          //   this.$EventBus.$emit('openYesModal', 'msg.smaller.forwardingQty');
          //   result.validation = false;
          // }
          // } else {
          let trnPlnNum = '';
          let isConfirm = false;
          let diffTrnPlnNum = false;
          let notExistOutTypeCd = false;
          let isExistDoNum = false;
          this.selectProductRows.forEach((row, index) => {
            if (index === 0) {
              trnPlnNum = row.trnPlnNum;
            }
            if (row.outStatCd === defs.outStatCd.disCon) {
              isConfirm = true;
              result.validation = false;
            } else if (trnPlnNum !== '' && trnPlnNum !== row.trnPlnNum) {
              diffTrnPlnNum = true;
              result.validation = false;
            } else if (!row.outTypeCd || row.outTypeCd === '') {
              notExistOutTypeCd = true;
              result.validation = false;
            }

            if (row.trnClsCd !== defs.trnClsCd.deposit && row.trnDoNum) {
              isExistDoNum = true;
              result.validation = false;
            }
          });
          if (isConfirm) {
            this.$EventBus.$emit('openYesModal', 'message.msgAlreadyDispatchConfirm');
          } else if (diffTrnPlnNum) {
            this.$EventBus.$emit('openYesModal', 'message.msgSelectDispatchOnlyOne');
          } else if (notExistOutTypeCd) {
            this.$EventBus.$emit('openYesModal', 'message.msgNoForwardingType');
          } else if (isExistDoNum) {
            this.$EventBus.$emit('openYesModal', 'message.msgCheckDoNum');
          }
          // }
        } else if (type === 'invoice') {
          let trnPlnNum = '';
          let notSameTrnPlnNum = false;
          let trnPlnNumIsNull = false;
          this.selectProductRows.forEach((row, index) => {
            if (index === 0) {
              trnPlnNum = row.trnPlnNum;
            } else if (trnPlnNum == null || trnPlnNum == '') {
              result.validation = false;
              trnPlnNumIsNull = true;
            } else if (trnPlnNum !== row.trnPlnNum) {
              result.validation = false;
              notSameTrnPlnNum = true;
            }
          });
          if (trnPlnNumIsNull) {
            this.$EventBus.$emit('openYesModal', 'message.msgValidTrnPlnNum2');
          } else if (notSameTrnPlnNum) {
            this.$EventBus.$emit('openYesModal', 'message.msgValidOnePlnInvoice');
          }
        }
        return result;
      }
      return result;
    },
    sendGridtrnPlnInfo(trnPlnInfo) {
      this.$modal.show(`ForwardingDetailModal${this.page}`, { trnPlnNum: trnPlnInfo.trnPlnNum, readOnly: true });
    },
    sendDipatchConfirmList(data) {
      this.dispatchConfirmList = data;
    },
    okOrNo(result) {
      if (result) {
        if (this.type === 'save') {
          this.$refs.DispatchConfirmGrid.saveLayout();
        } else if (this.type === 'reset') {
          this.$refs.DispatchConfirmGrid.resetLayout();
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
      const rows = this.$refs.DispatchConfirmGrid.sendJsonRows();
      const isChooseCell = this.$refs.DispatchConfirmGrid.isChooseCell();

      if (this.dispatchConfirmList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (!isChooseCell) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
      } else {
        if (rows.length > 0) {
          this.$refs.DispatchConfirmGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
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
    clickBtn(btn) {
      if (btn === 'cancel') {
        this.dispatchCancel();
      } else if (btn === 'save') {
        this.dispatchSave();
      } else if (btn === 'confirm') {
        this.dispatchConfirm();
      } else if (btn === 'invoice') {
        this.saveInvoiceNum(btn);
      }
    },
    setData() {
      this.ids = [];
      this.selectProductRows.forEach(row => {
        this.ids.push(row.id);
      });
    },
    async reSearch() {
      this.$refs.DispatchConfirmSearch.search();
    },
    async dispatchCancel() {
      this.result = this.validation('cancel');
      this.setData();
      if (this.result.validation) {
        const param = {
          ids: this.ids,
        };
        try {
          const response = await tranApi.cancelEndDipatchConfirm(param);
          this.ment = '';
          if (response.data.rs) {
            await this.reSearch();
            this.$EventBus.$emit('openYesModal', 'message.msgCancelConfirmation');
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
    async dispatchSave() {
      this.result = this.validation('save');
      if (this.result.validation) {
        const paramData = [];
        this.selectProductRows.forEach(list => {
          paramData.push({
            trnPlanId: list.id,
            outTypeCd: JSON.parse(list.outTypeCd).value,
          });
        });
        const param = JSON.parse(JSON.stringify(paramData));
        try {
          const response = await tranApi.saveDipatchConfirm(param);
          this.ment = '';
          if (response.data.rs) {
            await this.reSearch();
            this.$EventBus.$emit('openYesModal', 'message.msgSaveDispatchConfirm');
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
    async dispatchConfirm() {
      const rows = this.$refs.DispatchConfirmGrid.getNewAndChangeData();
      this.result = this.validation('confirm');
      if (this.result.validation) {
        try {
          if (rows.length > 0) {
            const paramData = [];
            this.selectProductRows.forEach(list => {
              paramData.push({
                trnPlanId: list.id,
                outTypeCd: list.outTypeCd ? JSON.parse(list.outTypeCd).value : '',
              });
            });
            const param = JSON.parse(JSON.stringify(paramData));
            const response = await tranApi.saveDipatchConfirm(param);
            this.ment = '';
            if (response.data.rs) {
              this.confirmSave();
            }
          } else {
            this.confirmSave();
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
    async confirmSave() {
      this.setData();
      const param = {
        ids: this.ids,
      };
      try {
        const response = await tranApi.saveDipatchAfter(param);
        this.ment = '';
        if (response.data.rs) {
          await this.reSearch();
          this.$EventBus.$emit('openYesModal', 'message.msgOkDispatchConfirm');
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
    async excelDownload() {
      if (this.dispatchConfirmList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else {
        const excelData = {
          fileNm: 'DispatchConfirm-Excel.xlsx',
          showProgress: true,
          progressMessage: 'Exporting..',
          indicator: 'hidden',
          header: 'default',
          footer: 'hidden',
          compatibility: true,
          exportTemplate: true,
        };
        this.$refs.DispatchConfirmGrid.excelExport(excelData);
      }
    },
    openForwardingCustCar(trnPlnInfo) {
      this.$modal.show(`ForwardingCustCarModal${this.page}`, { info: trnPlnInfo });
    },
    async saveInvoiceNum(type) {
      let result = this.validation(type);
      if (result.validation) {
        try {
          const param = {
            trnPlnNum: this.selectProductRows[0].trnPlnNum,
          };
          await tranApi.saveInvoiceNum(param);
          await this.reSearch();
          this.$EventBus.$emit('openYesModal', 'message.msgSaveInvoiceNum');
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
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.DispatchConfirmGrid.setFilter(this.filterOn);
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
