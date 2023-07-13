<template>
  <modal name="DashboardOutDetailModal" width="100%" height="100%" :adaptive="true">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">
            <MultiSelect id="" style="100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="전체"></MultiSelect>
          </h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('DashboardOutDetailModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="dashboard_detail_contents">
          <section class="section_ inc">
            <p class="dashboard_detail_title">WOOD INC</p>
            <div class="detail_box">
              <strong>MDF 레귤러 25T E1 35형 (1220*2440)</strong>
              <strong>DE00000001</strong>
              <p class="delivery_info">
                <span><i>10</i> BDL</span>
                <span>배송지명 : Thành</span>
              </p>
              <span class="delivery_address">주소 : Thành phố Hà Nội Quận Ba Đình</span>
            </div>
            <div class="detail_box">
              <strong>MDF 레귤러 25T E1 35형 (1220*2440)</strong>
              <strong>DE00000001</strong>
              <p class="delivery_info">
                <span><i>10</i> BDL</span>
                <span>배송지명 : Thành</span>
              </p>
              <span class="delivery_address">주소 : Thành phố Hà Nội Quận Ba Đình</span>
            </div>
            <div class="detail_box">
              <strong>MDF 레귤러 25T E1 35형 (1220*2440)</strong>
              <strong>DE00000001</strong>
              <p class="delivery_info">
                <span><i>10</i> BDL</span>
                <span>배송지명 : Thành</span>
              </p>
              <span class="delivery_address">주소 : Thành phố Hà Nội Quận Ba Đình</span>
            </div>
          </section>
          <section class="section_viet">
            <p class="dashboard_detail_title">WOOD INC</p>
            <div class="detail_box">
              <strong>MDF 레귤러 25T E1 35형 (1220*2440)</strong>
              <strong>DE00000001</strong>
              <p class="delivery_info">
                <span><i>10</i> BDL</span>
                <span>배송지명 : Thành</span>
              </p>
              <span class="delivery_address">주소 : Thành phố Hà Nội Quận Ba Đình</span>
            </div>
            <div class="detail_box">
              <strong>MDF 레귤러 25T E1 35형 (1220*2440)</strong>
              <strong>DE00000001</strong>
              <p class="delivery_info">
                <span><i>10</i> BDL</span>
                <span>배송지명 : Thành</span>
              </p>
              <span class="delivery_address">주소 : Thành phố Hà Nội Quận Ba Đình</span>
            </div>
          </section>
        </div>
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>
<script>
export default {
  //  name: 'ProductSearchModal',
  components: {},
  data() {
    return {
      registClose: false,
      selectOptions: ['선택1', '선택2', '선택3'],
      currentTab: 0,
      tabs: ['분류검색', '즐겨찾기', '이전주문'],
    };
  },
};
</script>

<style></style>
