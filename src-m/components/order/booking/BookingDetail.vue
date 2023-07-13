<template>
  <div class="bottom_modal" :class="{ pd_open: bookingManageOpen }" ref="bottom_modal_height" :style="`bottom:-${bottom_modal_height}`">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt"></h1>
      </div>
      <div class="header_left"></div>
      <div class="header_right">
        <button class="btn_header btn_close" @click="$emit('closebookingManage')"></button>
      </div>
    </div>
    <div class="bottom_modal_contents">
      <div class="table">
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
                <strong class="mr-10">{{ $t('message.bokngOffrTotal') }}</strong
                ><i>{{ bokngItem.bokngOffrTotal | priceFormat }}</i> <small>{{ $t('message.includeVat') }}</small>
              </td>
            </tr>
            <tr>
              <td class="price_txt t-r">
                <strong class="mr-10">{{ $t('message.priceInfo') }}</strong
                ><i>{{ bokngItem.reqQtyAmt | priceFormat }}</i>
              </td>
              <td class="price_txt t-r">
                <strong class="mr-10">{{ $t('message.quotePriceLay') }}</strong
                ><i>{{ bokngItem.prdtQtyAmt | priceFormat }}</i>
              </td>
            </tr>

            <tr>
              <td class="price_txt t-r">
                <strong class="mr-10">{{ $t('message.bkQtyUnitPrice') }}</strong
                ><i>{{ bokngItem.bokngQtyAmt | priceFormat }}</i>
              </td>
              <td class="price_txt t-r">
                <strong class="mr-10">{{ $t('message.bokngTotalQty') }}</strong>
                <i v-if="isBase">{{ bokngItem.bokngBaseQty | priceFormat }}</i>
                <i v-show="!isBase">{{ bokngItem.bokngOrdQty | priceFormat }}</i>
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
              <th colspan="6">{{ $t('message.assignInfo') }}</th>
            </tr>
            <tr>
              <td class="">{{ $t('message.assignments') }}</td>
              <td class="">{{ $t('message.elapseAssign') }}</td>
            </tr>
            <tr>
              <td class="fr">{{ bokngItem.asgnReqDt | vnDateFormatD }}</td>
              <td class="fr"><span v-if="bokngItem.asgnProgDays">+</span> {{ bokngItem.asgnProgDays }}</td>
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
              <th colspan="6">{{ $t('message.needReviewRemain') }}</th>
            </tr>
            <tr>
              <td class="">{{ $t('message.remain') }}</td>
              <td class="">{{ $t('message.stockAsgnDt') }}</td>
            </tr>
            <tr>
              <td class="fr" v-if="isBase">{{ bokngItem.dfcEndBaseQty | priceFormat }}</td>
              <td class="fr" v-else>{{ bokngItem.dfcEndOrdQty | priceFormat }}</td>
              <td class="">{{ bokngItem.stockAsgnDt | vnDateFormatD }}</td>
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
              <th colspan="6">{{ $t('message.bkProgressInfo') }}</th>
            </tr>
            <tr>
              <td colspan="2" class="price_txt">
                <div class="a-sb">
                  <strong
                    >{{ $t('message.lstTrnReqDt') }}<i class="ml-10">{{ bokngItem.lstTrnReqDt | vnDateFormatD }} </i></strong
                  >
                  <strong>{{ $t('message.progressTotal') }}</strong>
                  <i v-if="isBase" class="ml-10">{{ bokngItem.progIngBaseTotQty | priceFormat }}</i>
                  <i v-else class="ml-10">{{ bokngItem.progIngOrdTotQty | priceFormat }} </i>
                </div>
              </td>
            </tr>
            <tr>
              <td class="t-r">
                <strong class="mr-10">{{ $t('message.onDeliverQty') }}</strong>
                <i v-if="isBase">{{ bokngItem.trnIngBaseQty | priceFormat }}</i>
                <i v-else>{{ bokngItem.trnIngOrdQty | priceFormat }}</i>
              </td>
              <td class="t-r">
                <strong class="mr-10">{{ $t('message.trnPsbBaseQty') }}</strong>
                <i v-if="isBase">{{ bokngItem.trnPsbBaseQty | priceFormat }}</i>
                <i v-else>{{ bokngItem.trnPsbOrdQty | priceFormat }}</i>
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
              <th colspan="6">{{ $t('message.bkCompleteInfo') }}</th>
            </tr>
            <tr>
              <td colspan="2" class="price_txt t-r">
                <strong class="mr-10">{{ $t('message.completeTotal') }}</strong>
                <i v-if="isBase">{{ bokngItem.progEndBaseTotQty | priceFormat }}</i>
                <i v-else>{{ bokngItem.progEndOrdTotQty | priceFormat }}</i>
              </td>
            </tr>
            <tr>
              <td class="t-r">
                <strong class="mr-10">{{ $t('message.btnCloseRemain') }}</strong>
                <i v-if="isBase">{{ bokngItem.dfcEndBaseQty | priceFormat }}</i>
                <i v-else>{{ bokngItem.dfcEndOrdQty | priceFormat }}</i>
              </td>
              <td class="t-r">
                <strong class="mr-10">{{ $t('message.completeDeliver2') }}</strong>
                <i v-if="isBase">{{ bokngItem.trnEndBaseQty | priceFormat }}</i>
                <i v-else>{{ bokngItem.trnEndOrdQty | priceFormat }}</i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['bookingManageOpen', 'bokngItem', 'isBase'],
  data() {
    return {
      bottom_modal_height: '',
    };
  },
  computed: {},
  methods: {
    getInfoHeight() {
      let val = this.$refs.bottom_modal_height.scrollHeight + 15;
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
