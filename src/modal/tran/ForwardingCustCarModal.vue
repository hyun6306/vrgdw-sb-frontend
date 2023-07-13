<template>
  <modal :name="`ForwardingCustCarModal${page}`" width="1210" height="800" :adaptive="true" @before-open="beforeOpen" @close="close" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide(`ForwardingCustCarModal${page}`)"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        {{ $t('message.custCar') }}
      </p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>{{ $t('message.clientNm') }}</span>
          <!-- <div class="a-l">
                <button class="btn_default btn_deep_green">선택삭제</button>
          </div> -->
        </h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 50%" />
              <col style="width: 25%" />
              <col style="width: 25%" />
            </colgroup>
            <thead>
              <tr>
                <th>{{ $t('message.clientNm') }}</th>
                <th>{{ $t('message.carNum') }}</th>
                <th>{{ $t('message.driverPhoneNum') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ info.custNm }}</td>
                <td>{{ info.trnCarNum }}</td>
                <td>{{ info.driverPhoneNum }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 리얼그리드 -->
        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid04 mt-20">
          <div class="real_head">
            <div class="real_head_left">
              <!-- <small>{{ $t('message.fwdInfo') }}</small> -->
              <small class=""
                >{{ $t('message.totalSelection1') }}<i>{{ qtyInfo.length }}</i
                >{{ $t('message.totalSelection2') }}</small
              >
              <small class="ml-30"
                >{{ $t('message.fwdQty') }} <i>{{ qtyInfo.checkedQty }}</i></small
              >
              <small class="ml-30"
                >{{ $t('message.trnOrgWght') }}<i>{{ qtyInfo.checkedWght }}</i></small
              >
              <small class="ml-30"
                >{{ $t('message.trnOrgVol') }}<i>{{ qtyInfo.checkedVol }}</i></small
              >
            </div>
            <div class="real_head_right">
              <button class="btn_default btn_function" v-if="!info.trnPlnNum" @click="validation('delete')">{{ $t('message.btnDelete') }}</button>
            </div>
          </div>
          <div class="real_body">
            <!-- <CustomerOrderGrid style="height: 100%" :gridName="'ProductFavorite'" /> -->
            <TranCustSelectGrid ref="TranCustSelectGrid" :gridName="`${page}tGrid`" style="height: 100%" :listRows="listRows" @sendQtyInfo="info => (qtyInfo = info)" :gridLang="gridLang" :trnPlnNum="info.trnPlnNum" />
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_default" @click="$modal.hide(`ForwardingCustCarModal${page}`)">{{ $t('message.btnClose') }}</button>
            <button class="btn_primary" v-if="!info.trnPlnNum" @click="validation('save')">{{ $t('message.btnSave') }}</button>
            <button class="btn_primary" v-else-if="info.outStatCd === defsOutStatCd.trnReq" @click="validation('cancel')">{{ $t('message.btnCancelCustCar') }}</button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import tranApi from '@/api/tran/tran';
import languageApi from '@/api/language';
// import commonApi from '@/api/common';
import TranCustSelectGrid from '@/components/gridView/tran/TranCustSelectGrid';
import defs from '@/consts/defs';

export default {
  name: 'ForwardingCustCar',
  components: { TranCustSelectGrid },
  props: ['menuId', 'page'],
  data() {
    return {
      tranCusSum: [],
      listRows: [],
      addrInfo: {},
      qtyInfo: {},
      checkedRows: {},
      intervalId: '',
      gridLang: [],
      info: {},
      defsOutStatCd: defs.outStatCd,
    };
  },
  computed: {
    lessThan() {
      let min = Math.min(...this.tranCusSum.map(list => list.trnPrice));
      return this.tranCusSum.map(list => list.trnPrice).indexOf(min);
    },
  },
  methods: {
    close() {
      if (this.intervalId !== '') {
        clearInterval(this.intervalId);
      }
    },
    validation(is = '') {
      const isChecked = this.$refs.TranCustSelectGrid.sendChecked();
      let rows = this.$refs.TranCustSelectGrid.sendJsonRows();
      if (!isChecked && is === 'delete') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoItem');
        return false;
      } else if (rows.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
      } else if (is === 'delete') {
        this.$refs.TranCustSelectGrid.deleteRows();
      } else if (is === 'save') {
        this.saveCustCar(rows);
      } else if (is === 'cancel') {
        this.cancelCustCar(rows);
      } else {
        return true;
      }
    },
    async saveCustCar(rows) {
      try {
        const param = { ids: [] };
        rows.forEach(list => {
          param.ids.push(list.id);
        });
        await tranApi.saveCustCar(param);
        this.$parent.reloadSearch('save');
        this.$modal.hide(`ForwardingCustCarModal${this.page}`);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else if (e && e.errMsg) {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async cancelCustCar(rows) {
      try {
        const param = { ids: [] };
        rows.forEach(list => {
          param.ids.push(list.id);
        });
        await tranApi.cancelCustCar(param);
        this.$parent.reloadSearch('cancel');
        this.$modal.hide(`ForwardingCustCarModal${this.page}`);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else if (e && e.errMsg) {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    beforeOpen(event) {
      this.info = event.params.info;
      if (event.params.ids) {
        this.getRequestList(event.params.ids);
      } else {
        this.getDispatchPlanDetailList();
      }
    },
    async getDispatchPlanDetailList() {
      try {
        const param = {
          trnPlnNum: this.info.trnPlnNum,
        };
        const resp = await tranApi.getDispatchPlanDetailList(param);
        if (resp.data.ds.length > 0) {
          this.listRows = resp.data.ds[0].deliveryPlanDtlsList;
          if (!this.info.custNm && this.listRows.length > 0 && this.listRows[0].custNm) {
            this.info.custNm = this.listRows[0].custNm;
          }
          if (!this.info.driverPhoneNum && this.listRows.length > 0 && this.listRows[0].driverPhoneNum) {
            this.info.driverPhoneNum = this.listRows[0].driverPhoneNum;
          }
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
    async getRequestList(ids) {
      try {
        const response = await tranApi.getRequestList({
          outStatCd: '',
          upPlntCd: '',
          dateCls: '',
          sttDt: '',
          endDt: '',
          trnCarType: '',
          trnClsCd: '',
          custCd: '',
          offrClsCd: '',
          filter: '',
          ids,
        });
        this.listRows = response.data.ds;
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
        const resp = await languageApi.getRouterLanguage('/modal/tran-cust-select', this.menuId, this.userLocale, 'Y');
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
  },
  mounted() {
    this.getGridMutiLanguage();
  },
  destroyed() {},
};
</script>

<style></style>
