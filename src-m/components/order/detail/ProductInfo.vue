<template>
  <div class="bottom_modal" :class="{ pd_open: productInfoOpen }" ref="bottom_modal_height" :style="`bottom:-${bottom_modal_height}`" @before-open="open">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt"></h1>
      </div>
      <div class="header_left"></div>
      <div class="header_right">
        <button class="btn_header btn_close" @click="$emit('closeProductInfo', false)"></button>
      </div>
    </div>
    <div class="bottom_modal_contents">
      <div class="table">
        <table>
          <colgroup>
            <col style="width: calc(100% / 3)" />
            <col style="width: calc(100% / 3)" />
            <col style="width: calc(100% / 3)" />
          </colgroup>
          <tbody>
            <tr>
              <th colspan="3">{{ $t('message.itemInfo') }}</th>
            </tr>
            <tr>
              <td colspan="3">
                <div class="item_info_title">
                  <strong>{{ quoteItem.prdtCd }}</strong>
                  <strong>{{ quoteItem.prdtNm }}</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="3">{{ quoteItem.brandNm }}</td>
            </tr>
            <tr>
              <td>{{ quoteItem.dnstType }}</td>
              <td>{{ quoteItem.ecoNm }}</td>
              <td>{{ quoteItem.brdGradeNm }}</td>
            </tr>
            <tr>
              <td colspan="3" class="pa-0">
                <div class="half_cell">{{ quoteItem.hvSpec }}</div>
                <div class="half_cell">{{ quoteItem.tskSpec }}</div>
              </td>
            </tr>
            <tr>
              <td colspan="3" class="pa-0" v-if="quoteItem.prdtClsCd === defsPrdtClsCd.MFB">
                <div class="half_cell">{{ quoteItem.lpmFrtNm }}</div>
                <div class="half_cell">{{ quoteItem.lpmBckNm }}</div>
              </td>
            </tr>
            <tr>
              <td colspan="3" class="pa-0" v-if="quoteItem.prdtClsCd === defsPrdtClsCd.MFB">
                <div class="half_cell">{{ quoteItem.prsUpPttnNm }}</div>
                <div class="half_cell">{{ quoteItem.prsUpPttnprsDwPttnNmNm }}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <colgroup>
            <col style="width: calc(100% / 2)" />
            <col style="width: calc(100% / 2)" />
          </colgroup>
          <tbody>
            <tr>
              <th colspan="6">{{ $t('message.priceInfo') }}</th>
            </tr>
            <tr>
              <td class="t-r price_txt" colspan="2">
                <!--                <strong class="mr-30">{{ $t('message.totalQuotePrice') }}</strong> <i>{{ quoteItem.offrDtlsTotal | priceFormat }}</i> <small class="ml-5">{{ $t('message.includeVat') }}</small>-->
                <strong class="mr-30">{{ $t('message.quotePrice2') }}</strong> <i>{{ quoteItem.cfmOffrPrice | priceFormat }}</i>
              </td>
            </tr>
            <tr>
              <!--              <td colspan="1" class="price_txt t-r" v-if="authButton.fn1Auth === 'Y'">-->
              <!--                <span class="mr-10">{{ $t('message.salesAmount') }}</span-->
              <!--                ><i>{{ quoteItem.cfmOffrPrice | priceFormat }} </i>-->
              <!--              </td>-->
              <td colspan="2" class="price_txt t-r">
                <span class="mr-10">{{ $t('message.quoteRequestQty') }}</span>
                <i v-if="isBase">{{ quoteItem.reqBaseQty | priceFormat }}</i>
                <i v-else>{{ quoteItem.reqOrdQty | priceFormat }}</i>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="price_txt t-r">
                <strong class="mr-10">{{ $t('message.unitPrice') }}</strong
                ><i>{{ quoteItem.prdtQtyAmt | priceFormat }}</i>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <colgroup>
            <col style="width: calc(100% / 2)" />
            <col style="width: calc(100% / 2)" />
          </colgroup>
          <tbody>
            <tr>
              <th colspan="6">{{ $t('message.completeInfo') }}</th>
            </tr>
            <tr>
              <td class="price_txt t-r">
                <strong class="mr-10">{{ $t('message.completeTotal') }}</strong>
                <i v-if="isBase">{{ quoteItem.progEndBaseTotQty | priceFormat }}</i>
                <i v-else>{{ quoteItem.progEndOrdTotQty | priceFormat }}</i>
              </td>
              <td class="t-r">
                <strong class="mr-10">{{ $t('message.cancelAmount') }}</strong>
                <i v-if="isBase">{{ quoteItem.canBaseQty | priceFormat }}</i>
                <i v-else>{{ quoteItem.canOrdQty | priceFormat }}</i>
              </td>
            </tr>
            <tr>
              <td class="t-r">
                <strong class="mr-10">{{ $t('message.rmnEndQty') }}</strong>
                <i v-if="isBase">{{ quoteItem.rmnEndBaseQty | priceFormat }}</i>
                <i v-else>{{ quoteItem.rmnEndOrdQty | priceFormat }}</i>
              </td>
              <td class="t-r">
                <strong class="mr-10">{{ $t('message.completeDeliverQty') }}</strong>
                <i v-if="isBase">{{ quoteItem.trnEndBaseQty | priceFormat }}</i>
                <i v-else>{{ quoteItem.trnEndOrdQty | priceFormat }}</i>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <colgroup>
            <col style="width: calc(100% / 2)" />
            <col style="width: calc(100% / 2)" />
          </colgroup>
          <tbody>
            <tr>
              <th colspan="6">{{ $t('message.progressInfo') }}</th>
            </tr>
            <tr>
              <td colspan="2" class="price_txt t-r">
                <strong class="mr-10">{{ $t('message.progressTotal') }}</strong>
                <i v-if="isBase">{{ quoteItem.progIngBaseTotQty | priceFormat }}</i>
                <i v-else>{{ quoteItem.progIngOrdTotQty | priceFormat }}</i>
              </td>
            </tr>
            <tr>
              <td class="t-r">
                <strong class="mr-10">{{ $t('message.onDeliverQty') }}</strong>
                <i v-if="isBase">{{ quoteItem.trnIngBaseQty | priceFormat }}</i>
                <i v-else>{{ quoteItem.trnIngOrdQty | priceFormat }}</i>
              </td>
              <td class="t-r">
                <strong class="mr-10">{{ $t('message.availableDeliverQty') }}</strong>
                <i v-if="isBase">{{ quoteItem.trnPsbBaseQty | priceFormat }}</i>
                <i v-else>{{ quoteItem.trnPsbOrdQty | priceFormat }}</i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import defs from '@/consts/defs';

export default {
  props: ['productInfoOpen', 'quoteItem', 'isBase'],
  data() {
    return {
      bottom_modal_height: '',
      defsPrdtClsCd: defs.prdtClsCd,
    };
  },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
    }),
  },
  methods: {
    open() {
      this.getInfoHeight();
    },
    getInfoHeight() {
      let val = this.$refs.bottom_modal_height.scrollHeight + 36;
      // search_box_height 의 높이값 받아온다
      this.bottom_modal_height = `${val}px`;
    },
  },
  mounted: function () {
    this.getInfoHeight();
  },
};
</script>

<style></style>
