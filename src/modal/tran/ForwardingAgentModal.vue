<template>
  <modal :adaptive="true" :clickToClose="false" height="800" name="ForwardingAgentModal" width="1300" @close="close" @opened="getTranCusSummary" @before-open="beforeOpen">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ForwardingAgentModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        {{ $t('message.trncusSelect') }}
      </p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>{{ $t('message.tranCustMonthInfo') }}</span>
          <!-- <div class="a-l">
                <button class="btn_default btn_deep_green">선택삭제</button>
          </div> -->
        </h2>
        <div v-if="tranCusSum.length > 2" class="table">
          <table>
            <colgroup>
              <col style="width: calc(100% / 6)" />
              <col style="width: calc(100% / 6)" />
              <col style="width: calc(100% / 6)" />
              <col style="width: calc(100% / 6)" />
              <col style="width: calc(100% / 6)" />
              <col style="width: calc(100% / 6)" />
            </colgroup>
            <thead>
              <tr>
                <th colspan="2">{{ tranCusSum[0].trncusNm }}</th>
                <th colspan="2">{{ tranCusSum[1].trncusNm }}</th>
                <th colspan="2">{{ tranCusSum[2].trncusNm }}</th>
              </tr>
              <tr>
                <th>{{ $t('message.accrueQty') }}</th>
                <th>{{ $t('message.accrueCost') }}</th>
                <th>{{ $t('message.accrueQty') }}</th>
                <th>{{ $t('message.accrueCost') }}</th>
                <th>{{ $t('message.accrueQty') }}</th>
                <th>{{ $t('message.accrueCost') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td :class="[lessThan === 0 ? 'f-red' : '']">{{ tranCusSum[0].carCount | priceFormat }}</td>
                <td :class="[lessThan === 0 ? 'f-red' : '']">{{ tranCusSum[0].trnPrice | priceFormat }}</td>
                <td :class="[lessThan === 1 ? 'f-red' : '']">{{ tranCusSum[1].carCount | priceFormat }}</td>
                <td :class="[lessThan === 1 ? 'f-red' : '']">{{ tranCusSum[1].trnPrice | priceFormat }}</td>
                <td :class="[lessThan === 2 ? 'f-red' : '']">{{ tranCusSum[2].carCount | priceFormat }}</td>
                <td :class="[lessThan === 2 ? 'f-red' : '']">{{ tranCusSum[2].trnPrice | priceFormat }}</td>
                <!-- <td>
                <div class="essential"><input type="text" id="" placeholder="" style="width: 100%" /></div>
              </td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <TranCustSelect ref="TranCustSelect" :addrInfo="addrInfo" :lessCarrier="tranCusSum[lessThan]" />
        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid02 mt-20">
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
              <button class="btn_default btn_function" @click="validation('delete')">{{ $t('message.btnDelete') }}</button>
            </div>
          </div>
          <div class="real_body" style="height: 350px">
            <!-- <CustomerOrderGrid style="height: 100%" :gridName="'ProductFavorite'" /> -->
            <TranCustSelectGrid ref="TranCustSelectGrid" :gridLang="gridLang" :gridName="`${page}tGrid`" :listRows="listRows" style="height: 100%" @sendQtyInfo="info => (qtyInfo = info)" />
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_default" @click="$modal.hide('ForwardingAgentModal')">{{ $t('message.btnClose') }}</button>
            <button class="btn_primary" @click="validation('save')">{{ $t('message.btnSave') }}</button>
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
import TranCustSelect from '@/components/tran/TranCustSelect';

export default {
  name: 'ForwardingAgent',
  components: { TranCustSelectGrid, TranCustSelect },
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
        this.saveTranCustSet(rows);
      } else {
        return true;
      }
    },
    async saveTranCustSet(rows) {
      try {
        let areaInfo = this.$refs.TranCustSelect.sendAreaInfo();
        const param = {
          trncusId: areaInfo.trncusId * 1,
          carType: areaInfo.carType,
          trncusPrice: areaInfo.areaEtcPrice.replace(/^0+|\D+/g, ''),
          ids: [],
        };
        if (param.trncusPrice == '' || param.trncusPrice == null || !param.trncusPrice) {
          this.$EventBus.$emit('openYesModal', 'message.msgEtcTranCostNull');
          return;
        }
        rows.forEach(list => {
          param.ids.push(list.id);
        });
        await tranApi.saveTranCustSet(param);
        this.$parent.reloadSearch('save');
        this.$modal.hide('ForwardingAgentModal');
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
      this.getRequestList(event.params.ids);
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
        const isExist = element => element.cityCd && element.cityCd !== '' && element.cityNm && element.cityNm !== '' && element.distrCd && element.distrCd !== '' && element.distrNm && element.distrNm !== '';

        let index = this.listRows.findIndex(isExist);
        if (index > -1) {
          this.addrInfo = {
            cityNm: this.listRows[index].cityNm,
            distrNm: this.listRows[index].distrNm,
          };
          this.intervalId = setInterval(this.getAreaPrice, 100, this.listRows[index]);
          // this.$refs.TranCustSelect.getAreaPrice(this.listRows[index]);
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
    getAreaPrice(row) {
      if (this.$refs.TranCustSelect.existCarType) {
        this.$refs.TranCustSelect.getAreaPrice(row);
        clearInterval(this.intervalId);
      }
    },
    async getTranCusSummary() {
      try {
        const param = {
          compCd: '',
        };
        const resp = await tranApi.getTranCusSummary(param);
        this.tranCusSum = JSON.parse(JSON.stringify(resp.data.ds));
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
    // this.getTranCusSummary();
    // this.getCommonCodeCombo('DELI_CAR_TYPE');
    // this.getTranList();
    this.getGridMutiLanguage();
  },
  destroyed() {},
};
</script>

<style></style>
