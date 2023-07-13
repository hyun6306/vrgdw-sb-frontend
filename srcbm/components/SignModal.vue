<template>
  <modal name="SignModal" width="100%" height="100%" :adaptive="true">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">서명</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('SignModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="endcomplete_contents">
          <!-- 완료처리 코멘트 -->
          <div class="endcomplete_coment">
            <div class="sign_box"></div>
          </div>
          <!-- //완료처리 코멘트 -->
        </div>

        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_tempsave">저장</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>

<script>
export default {
  data() {
    return {
      priceSellOpen: false,
      quoteOpen: false,
      bookmark: false,
      selectOptions: ['KOR', 'ENG', 'VET'],
    };
  },
};
</script>

<style></style>
