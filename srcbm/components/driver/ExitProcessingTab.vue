<template>
  <div class="driver_contents">
    <div class="driver_box">
      <div class="driver_box_head_exit">
        <p class="car_number_txt">
          <small><img src="@m/assets/img/bulit_01.png" />số xe</small>
          <i>2021002-00001</i>
        </p>
        <p class="car_number_txt">
          <span>sự trao thưởng</span>
          <strong>Nhà máy số một Việt Nam</strong>
        </p>
      </div>
      <div class="driver_box_body">
        <ul class="driver_bb_list">
          <li>
            <span class="driver_bb_title">송장번호</span>
            <p class="driver_bb_info">
              <a href="" class="btn_invoice_number">20221002-00001-001</a>
            </p>
          </li>
          <li>
            <span class="driver_bb_title">배송지명</span>
            <p class="driver_bb_info">
              đại lý miền Nam Hà Nội
              <button class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></button>
            </p>
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
        <div class="dirver_bb_btns">
          <button>상세보기</button>
          <button class="btn_exit">출차처리</button>
        </div>
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
