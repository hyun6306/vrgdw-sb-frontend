<template>
  <div class="bottom_modal" :class="{ pd_open: bookingManageOpen }" ref="bottom_modal_height" :style="`bottom:-${bottom_modal_height}`">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt"></h1>
      </div>
      <div class="header_left"></div>
      <div class="header_right">
        <button class="btn_header btn_close" @click="$emit('closebookingManage', false)"></button>
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
              <th colspan="6">가격 정보</th>
            </tr>
            <tr>
              <td class="t-r price_txt" colspan="2"><strong class="mr-10">Booking Total Amount </strong> <i>1,210,000,000</i> <small>(VAT 포함)</small></td>
            </tr>
            <tr>
              <td class="price_txt t-r"><strong class="mr-10">Sales Unit Price </strong><i>110,000</i></td>
              <td class="price_txt t-r"><strong class="mr-10">Quotation Unit Price </strong><i>110,000</i></td>
            </tr>

            <tr>
              <td class="price_txt t-r"><strong class="mr-10">Booking Unit Price</strong><i>110,000</i></td>
              <td class="price_txt t-r"><strong class="mr-10">Booking QTY</strong><i>110,000</i></td>
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
              <th colspan="6">할당 정보</th>
            </tr>
            <tr>
              <td class="">할당 요청일</td>
              <td class="">할당 경과일</td>
            </tr>
            <tr>
              <td class="">2022-09-11</td>
              <td class="fr">17</td>
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
              <th colspan="6">잔량종료 검토 필요</th>
            </tr>
            <tr>
              <td class="">잔량</td>
              <td class="">마지막 재고할당일</td>
            </tr>
            <tr>
              <td class="fr">17</td>
              <td class="">2022-09-11</td>
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
              <th colspan="6">부킹 진행 정보</th>
            </tr>
            <tr>
              <td colspan="2" class="price_txt">
                <div class="a-sb">
                  <strong>마지막 배송요청일<i class="ml-10">11-04-2022</i></strong>
                  <strong>진행 합계 <i class="ml-10">110</i></strong>
                </div>
              </td>
            </tr>
            <tr>
              <td class="t-r"><strong class="mr-10">잔량종료 </strong><i>11</i></td>
              <td class="t-r"><strong class="mr-10">배송완료 </strong><i>110</i></td>
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
              <th colspan="6">부킹 완료 정보</th>
            </tr>
            <tr>
              <td colspan="2" class="price_txt t-r"><strong class="mr-10">완료 합계</strong><i>110</i></td>
            </tr>
            <tr>
              <td class="t-r"><strong class="mr-10">잔량종료 </strong><i>11</i></td>
              <td class="t-r"><strong class="mr-10">배송완료 </strong><i>110</i></td>
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
  props: ['bookingManageOpen'],
  data() {
    return {
      bottom_modal_height: '',
      //bookingManageOpen: false,
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
