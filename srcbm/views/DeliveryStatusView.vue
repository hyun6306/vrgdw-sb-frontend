<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">배송현황</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right">
        <button class="btn_header in_img"><img src="@m/assets/img/icon_search.png" /></button>
      </div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <!-- 리스트영역 -->
      <div class="driver_contents">
        <!-- 납품희망월 선택 -->
        <div class="delivery_status">
          <label class="chechbox_basic">
            <input type="checkbox" />
            <span class="checkmark"></span>
            <strong>12</strong> Item
          </label>
          <MultiSelect id="" style="width: auto; min-width: 13rem" class="ml-a" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Bắt đầu vận chuyển"></MultiSelect>
        </div>
        <!-- 리스트 -->
        <div class="driver_box02">
          <div class="driver_box_head">
            <span class="car_number_txt underline">
              배차계획번호
              <i>2021002-00001</i>
            </span>
            <button class="btn_call_driver">배송시작</button>
          </div>
          <div class="driver_box_body">
            <ul class="driver_bb_list">
              <li>
                <span class="driver_bb_title">Ngày mong muốn giao hàng</span>
                <p class="driver_bb_info">2022-09-09</p>
              </li>
              <li>
                <span class="driver_bb_title">ngày xuất phát</span>
                <p class="driver_bb_info">2022-09-09</p>
              </li>
              <li>
                <span class="driver_bb_title">số xe</span>
                <p class="driver_bb_info">
                  <span> 30F-111.11 </span>
                </p>
              </li>
              <li>
                <span class="driver_bb_title">Số điện thoại tài xế </span>
                <p class="driver_bb_info">
                  <span>0000-0000-0000 </span>
                  <button class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></button>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="driver_box02">
          <div class="driver_box_head">
            <span class="car_number_txt underline">
              배차계획번호
              <i>2021002-00001</i>
            </span>
            <button class="btn_call_driver btn_driver_expected">배송예정</button>
          </div>
          <div class="driver_box_body">
            <ul class="driver_bb_list">
              <li>
                <span class="driver_bb_title">Ngày mong muốn giao hàng</span>
                <p class="driver_bb_info">2022-09-09</p>
              </li>
              <li>
                <span class="driver_bb_title">ngày xuất phát</span>
                <p class="driver_bb_info">2022-09-09</p>
              </li>
              <li>
                <span class="driver_bb_title">số xe</span>
                <p class="driver_bb_info">
                  <span> 30F-111.11 </span>
                </p>
              </li>
              <li>
                <span class="driver_bb_title">Số điện thoại tài xế </span>
                <p class="driver_bb_info">
                  <span>0000-0000-0000 </span>
                  <button class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></button>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="driver_box02">
          <div class="driver_box_head">
            <span class="car_number_txt underline">
              배차계획번호
              <i>2021002-00001</i>
            </span>
            <button class="btn_call_driver btn_driver_request">배송요청</button>
          </div>
          <div class="driver_box_body">
            <ul class="driver_bb_list">
              <li>
                <span class="driver_bb_title">Ngày mong muốn giao hàng</span>
                <p class="driver_bb_info">2022-09-09</p>
              </li>
              <li>
                <span class="driver_bb_title">ngày xuất phát</span>
                <p class="driver_bb_info">2022-09-09</p>
              </li>
              <li>
                <span class="driver_bb_title">số xe</span>
                <p class="driver_bb_info">
                  <span> 30F-111.11 </span>
                </p>
              </li>
              <li>
                <span class="driver_bb_title">Số điện thoại tài xế </span>
                <p class="driver_bb_info">
                  <span>0000-0000-0000 </span>
                  <button class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></button>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="driver_box02">
          <div class="driver_box_head">
            <span class="car_number_txt underline">
              배차계획번호
              <i>2021002-00001</i>
            </span>
            <button class="btn_call_driver btn_driver_complete">배송완료</button>
          </div>
          <div class="driver_box_body">
            <ul class="driver_bb_list">
              <li>
                <span class="driver_bb_title">Ngày mong muốn giao hàng</span>
                <p class="driver_bb_info">2022-09-09</p>
              </li>
              <li>
                <span class="driver_bb_title">ngày xuất phát</span>
                <p class="driver_bb_info">2022-09-09</p>
              </li>
              <li>
                <span class="driver_bb_title">số xe</span>
                <p class="driver_bb_info">
                  <span> 30F-111.11 </span>
                </p>
              </li>
              <li>
                <span class="driver_bb_title">Số điện thoại tài xế </span>
                <p class="driver_bb_info">
                  <span>0000-0000-0000 </span>
                  <button class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></button>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- //컨텐츠 바디 -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      priceSellOpen: false,
      quoteOpen: false,
      bookmark: false,
      productDetailOpen: false,
      selectOptions: ['Bắt đầu vận chuyển', 'Giao hàng theo lịch trình', 'Giao hàng đã hoàn thành'],
    };
  },
};
</script>

<style></style>
