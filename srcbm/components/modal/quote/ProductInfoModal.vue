<template>
  <div class="bottom_modal" :class="{ pd_open: productInfoOpen }" ref="bottom_modal_height" :style="`bottom:-${bottom_modal_height}`">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt"></h1>
      </div>
      <div class="header_left"></div>
      <div class="header_right">
        <button class="btn_header btn_close" @click="$emit('closeproductInfo', false)"></button>
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
              <th colspan="3">아이템 정보</th>
            </tr>
            <tr>
              <td colspan="3">
                <div class="item_info_title">
                  <strong>FDM0011414</strong>
                  <strong>MDF Regular 25T E1 35 (1220*2440)</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="3">MDF-Moisture Resistance</td>
            </tr>
            <tr>
              <td>MD</td>
              <td>E0</td>
              <td>Premium</td>
            </tr>
            <tr>
              <td colspan="3" class="pa-0">
                <div class="half_cell">1220 X 2440</div>
                <div class="half_cell">0.22</div>
              </td>
            </tr>
            <tr>
              <td colspan="3" class="pa-0">
                <div class="half_cell">HK77_WHITE_80</div>
                <div class="half_cell">HK77_WHITE_80</div>
              </td>
            </tr>
            <tr>
              <td colspan="3" class="pa-0">
                <div class="half_cell">PMZZ[BT93MW_COLUMBIA_WALNUT_SA</div>
                <div class="half_cell">PMZZ[BT93MW_COLUMBIA_WALNUT_SA</div>
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
              <th colspan="6">가격 정보</th>
            </tr>
            <tr>
              <td class="t-r price_txt" colspan="2"><strong class="mr-30">Quotation Total Amount </strong> <i>1,210,000,000</i> <small class="ml-5">(VAT bản đồ)</small></td>
            </tr>
            <tr>
              <td colspan="2" class="t-r"><span class="mr-10">Requested Vol</span><i>10,000</i></td>
            </tr>
            <tr>
              <td class="price_txt t-r"><strong class="mr-10">Quotation Unit Price </strong><i>110,000</i></td>
              <td class="price_txt t-r"><strong class="mr-10">Quotation Unit Price </strong><i>110,000</i></td>
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
              <th colspan="6">완료 정보</th>
            </tr>
            <tr>
              <td class="price_txt t-r"><strong class="mr-10">완료 합계 </strong><i>110,000</i></td>
              <td class="t-r"><strong class="mr-10">견적 취소량 </strong><i>110,000</i></td>
            </tr>
            <tr>
              <td class="t-r"><strong class="mr-10">잔량 종료량</strong><i>110,000</i></td>
              <td class="t-r"><strong class="mr-10">배송 완료량</strong><i>110,000</i></td>
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
              <th colspan="6">진행 정보</th>
            </tr>
            <tr>
              <td colspan="2" class="price_txt t-r"><strong class="mr-10">진행 합계</strong><i>110,000</i></td>
            </tr>
            <tr>
              <td class="t-r"><strong class="mr-10">배송 중량</strong><i>110,000</i></td>
              <td class="t-r"><strong class="mr-10">배송 요청 가능량 </strong><i>110,000</i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: ['productInfoOpen'],
  data() {
    return {
      bottom_modal_height: '',
    };
  },
  computed: {
    ...mapGetters({
      notLogin: 'userInfo/getNotLogin',
      menuList: 'userInfo/getMenuList',
    }),
  },
  methods: {
    pageMove(page) {
      this.$router.push(`${page}`);
    },
    getInfoHeight() {
      let val = this.$refs.bottom_modal_height.scrollHeight;
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
