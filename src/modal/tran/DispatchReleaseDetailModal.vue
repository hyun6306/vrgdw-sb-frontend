<template>
  <modal :adaptive="true" :clickToClose="false" height="800" name="DispatchReleaseDetailModal" width="1210" @before-open="open" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DispatchReleaseDetailModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.forwdDetail') }}</p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>{{ $t('message.trnCusCost') }}</span>
        </h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 50%" />
              <!--              <col style="width: 15%" />-->
              <col style="width: 25%" />
              <col style="width: 20%" />
              <!--              <col style="width: 20%" />-->
              <col style="width: 20%" />
            </colgroup>
            <thead>
              <tr>
                <th>{{ $t('message.trncusSelect') }}</th>
                <!--                <th>{{ $t('message.trnAdd') }}</th>-->
                <th>{{ $t('message.destination') }}</th>
                <!--                <th>{{ $t('message.trnAddUnitCd') }}</th>-->
                <th>{{ $t('message.basicTranCost') }}</th>
                <th>{{ $t('message.tranCostInput') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ carrierNm }}</td>
                <!--                <td></td>-->
                <td>{{ this.listData.cityNm }} {{ this.listData.distrNm }}</td>
                <!--                <td></td>-->
                <td>{{ listData.areaPriceBaseAmt | priceFormat }}</td>
                <td>{{ listData.areaPriceAmt | priceFormat }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid04 mt-20">
          <div class="real_head">
            <div class="real_head_left">
              <!-- <small>{{ $t('message.forwardingList') }}</small> -->
              <small
                >{{ $t('message.totalSelection1') }}<i>{{ count }}</i
                >{{ $t('message.totalSelection2') }}</small
              >
            </div>
            <div class="real_head_right"></div>
          </div>
          <div class="real_body">
            <DisptDetailGrid :gridLang="gridLang" :listData="listData.deliveryPlanDtlsList" style="height: 100%" />
          </div>
          <div class="modal_btn_contents_t05">
            <button @click="$modal.hide('DispatchReleaseDetailModal')" class="btn_default">{{ $t('message.btnClose') }}</button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import DisptDetailGrid from '@/components/gridView/tran/DisptDetailGrid.vue';
import tranApi from '@/api/tran/tran';
import languageApi from '@/api/language';
import { mapGetters } from 'vuex';

export default {
  components: { DisptDetailGrid },
  data() {
    return {
      gridLang: [],
      detailData: [],
      listData: [],
      carrierNm: '',
      count: 0,
    };
  },
  props: ['menuId'],
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    async getList(rowData) {
      const param = {
        trnPlnNum: rowData.trnPlnNum,
      };
      try {
        const response = await tranApi.getTranDisptDetailList(param);
        this.listData = response.data.ds[0];
        this.detailData = this.listData.deliveryPlanDtlsList;
        this.count = this.detailData.length;
        this.carrierNm = this.detailData[0].trncusNm;
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
    async open(event) {
      await this.getList(event.params.param);
      await this.getGridMutiLanguage();
    },
    close() {},
  },
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
