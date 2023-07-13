<template>
  <div class="driver_contents">
    <div class="driver_box">
      <div class="driver_box_head">
        <span class="car_number_txt">
          <i>2021002-00001</i>
        </span>
        <button class="btn_call_driver">
          <img src="@m/assets/img/icon_tab_sign_w.png" />
          서명
        </button>
      </div>
      <div class="driver_box_body">
        <ul class="driver_bb_list">
          <li>
            <span class="driver_bb_title">sứ mệnh của khách hàng </span>
            <p class="driver_bb_info">
              đại lý miền Nam Hà Nội
              <button class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></button>
            </p>
          </li>
          <li>
            <span class="driver_bb_title">địa chỉ vận chuyển </span>
            <p class="driver_bb_info">cities and provinces county districts Hïu Bang, Huyen Th¡ch Thât,Thành phô</p>
          </li>
          <li>
            <span class="driver_bb_title">hạng mục đặc biệt</span>
            <p class="driver_bb_info">Trước khi giao hàng nhớ gọi điện trước khi đến nhé Lái xe cẩn thận nhé</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="driver_box">
      <!-- 출차 처리 -->
      <div class="exit_car">
        <strong>Tôi cần xử lý xuất phát. </strong>
        <i> (20221002-000001) </i>
        <button>출차처리하러 가기</button>
      </div>
      <!-- //출차 처리 -->
      <div class="driver_box_head">
        <span class="car_number_txt">
          <i>2021002-00001</i>
        </span>
        <button class="btn_call_driver">
          <img src="@m/assets/img/icon_tab_sign_w.png" />
          서명
        </button>
      </div>
      <div class="driver_box_body">
        <ul class="driver_bb_list">
          <li>
            <span class="driver_bb_title">sứ mệnh của khách hàng </span>
            <p class="driver_bb_info">
              đại lý miền Nam Hà Nội
              <button class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></button>
            </p>
          </li>
          <li>
            <span class="driver_bb_title">địa chỉ vận chuyển </span>
            <p class="driver_bb_info">cities and provinces county districts Hïu Bang, Huyen Th¡ch Thât,Thành phô</p>
          </li>
          <li>
            <span class="driver_bb_title">hạng mục đặc biệt</span>
            <p class="driver_bb_info">Trước khi giao hàng nhớ gọi điện trước khi đến nhé Lái xe cẩn thận nhé</p>
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
