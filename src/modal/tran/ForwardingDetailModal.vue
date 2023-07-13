<template>
  <modal :name="`ForwardingDetailModal${page}`" width="1260" height="800" :adaptive="true" @before-open="beforeOpen" @opened="getDispatchPlanDetailList" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide(`ForwardingDetailModal${page}`)"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        {{ $t('message.forwdDetail') }}
      </p>
      <div class="modal_content dr_content">
        <TranCustSelect ref="TranCustSelect" :addrInfo="addrInfo" :areaPriceAmt="forwardingDetail.areaPriceAmt" :readOnly="readOnly" />
        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid04 mt-20">
          <div class="real_head">
            <div class="real_head_left">
              <!-- <small>{{ $t('message.forwardingList') }}</small> -->
              <small class=""
                >{{ $t('message.totalSelection1') }}<i>{{ listRows.length }}</i
                >{{ $t('message.totalSelection2') }}</small
              >
            </div>
            <div class="real_head_right">
              <!-- <button class="btn_default btn_deep_green">버튼 1</button> -->
            </div>
          </div>
          <div class="real_body">
            <ForwardingDetailGrid style="height: 100%" :listRows="listRows" :gridLang="gridLang" :gridName="`${page}Grid`" />
            <!-- <CustomerOrderGrid style="height: 100%" :gridName="'ProductFavorite'" /> -->
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_default" @click="$modal.hide(`ForwardingDetailModal${page}`)">{{ $t('message.btnClose') }}</button>
            <button class="btn_primary" @click="saveTranCust" v-if="!readOnly">{{ $t('message.btnSave') }}</button>
            <button class="btn_primary" @click="cancelTranCust" v-if="!readOnly">{{ $t('message.btnCancelTranCust') }}</button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import tranApi from '@/api/tran/tran';
import languageApi from '@/api/language';
import TranCustSelect from '@/components/tran/TranCustSelect';
import ForwardingDetailGrid from '@/components/gridView/tran/ForwardingDetailGrid';
import defs from '@/consts/defs';
// import CustomerOrderGrid from '@wb/components/gridComponent/CustomerOrderGrid.vue';

export default {
  name: 'ForwardingDetail',
  components: { ForwardingDetailGrid, TranCustSelect },
  props: ['menuId', 'page'],
  data() {
    return {
      addrInfo: {},
      trnPlnNum: '',
      listRows: [],
      forwardingDetail: {},
      gridLang: [],
      outStatCd: '',
      defsOutStatCd: defs.outStatCd,
      readOnly: false,
    };
  },
  methods: {
    beforeOpen(event) {
      this.trnPlnNum = event.params.trnPlnNum;
      this.readOnly = event.params.readOnly;
      // this.getDispatchPlanDetailList();
    },
    async getDispatchPlanDetailList() {
      try {
        const param = {
          trnPlnNum: this.trnPlnNum,
        };
        const resp = await tranApi.getDispatchPlanDetailList(param);
        if (resp.data.ds.length > 0) {
          this.forwardingDetail = resp.data.ds[0];
          this.listRows = this.forwardingDetail.deliveryPlanDtlsList;
          if (this.listRows.length > 0) this.outStatCd = this.listRows[0].outStatCd;

          this.addrInfo = {
            cityNm: this.forwardingDetail.cityNm,
            distrNm: this.forwardingDetail.distrNm,
          };
          this.$refs.TranCustSelect.getAreaPrice({ cityCd: this.forwardingDetail.cityCd, distrCd: this.forwardingDetail.distrCd, trncusId: this.forwardingDetail.trncusId });
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
    async saveTranCust() {
      try {
        let areaInfo = this.$refs.TranCustSelect.sendAreaInfo();
        const param = {
          trncusId: areaInfo.trncusId,
          carType: areaInfo.carType,
          trncusPrice: areaInfo.areaEtcPrice.replace(/^0+|\D+/g, ''),
          ids: [],
        };

        this.listRows.forEach(list => {
          param.ids.push(list.id);
        });
        await tranApi.saveTranCust(param);
        this.$parent.reloadSearch();
        this.$EventBus.$emit('openYesModal', '저장됐습니다.');
        this.$modal.hide(`ForwardingDetailModal${this.page}`);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else if (e && e.errMsg) {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async cancelTranCust() {
      try {
        const param = {
          ids: [],
        };
        this.listRows.forEach(list => {
          param.ids.push(list.id);
        });
        await tranApi.cancelTranCust(param);
        this.$parent.reloadSearch();
        this.$EventBus.$emit('openYesModal', 'message.msgCancel');
        this.$modal.hide(`ForwardingDetailModal${this.page}`);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else if (e && e.errMsg) {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getGridMutiLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage('/modal/disptDetail', this.menuId, this.userLocale, 'Y');
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
