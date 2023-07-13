<template>
  <div class="driver_contents">
    <!-- 데이터가 없습니다. -->
    <!-- <div class="nodata">
      <span class="in_img"><img src="@m/assets/img/img_nodata.png" /></span>
      <p>데이터가 없습니다.</p>
    </div> -->
    <!-- //데이터가 없습니다. -->
    <div class="driver_box">
      <div class="driver_box_head">
        <span class="car_number_txt">
          배차번호
          <i>2021002-00001</i>
        </span>
        <button class="btn_call_driver">
          <img src="@m/assets/img/icon_call_w.png" />
          전화
        </button>
      </div>
      <div class="driver_box_body">
        <ul class="driver_bb_list">
          <li>
            <span class="driver_bb_title">송장번호</span>
            <p class="driver_bb_info">
              <a href="" class="btn_invoice_number">20221002-00001-001</a>
              <button class="btn_invoice">전자송장보기</button>
            </p>
          </li>
          <li>
            <span class="driver_bb_title">배송지명</span>
            <p class="driver_bb_info">đại lý miền Nam Hà Nội</p>
          </li>
          <li>
            <span class="driver_bb_title">배송희망일시</span>
            <p class="driver_bb_info">2022-09-09</p>
          </li>
          <li>
            <span class="driver_bb_title">배송지</span>
            <p class="driver_bb_info">
              <span> cities and provinces county districts Hïu Bang, Huyen Th¡ch Thât,Thành phô </span>
            </p>
          </li>
          <li>
            <span class="driver_bb_title">특이사항</span>
            <p class="driver_bb_info">
              <span> Trước khi giao hàng nhớ gọi điện trước khi đến nhé Lái xe cẩn thận nhé</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      current: [],
      ksSelectOpen: false,
      bookmark: false,
      selectValue: '',
      selectOptions: ['KOREA', 'ENGLISH', 'VIETNAM'],
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
  },
};
</script>

<style></style>
