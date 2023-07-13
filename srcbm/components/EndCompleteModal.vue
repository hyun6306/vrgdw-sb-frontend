<template>
  <modal name="EndCompletehModal" width="100%" height="100%" :adaptive="true">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">완료처리</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('EndCompletehModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="endcomplete_contents">
          <div class="list_form_section">
            <ul class="list_ul">
              <li class="list_li">
                <label class="list_title">배송유형</label>
                <span class="list_form post_form">
                  <label class="radio_t">
                    <input type="radio" name="radio" @change="radioBtn('우편')" />
                    <span class="checkmark"></span>
                    우편
                  </label>
                  <label class="radio_t">
                    <input type="radio" name="radio" />
                    <span class="checkmark"></span>
                    영업방문
                  </label>
                </span>
              </li>
            </ul>
          </div>
          <!-- 완료처리 코멘트 -->
          <div class="endcomplete_coment">
            <label>영업처리결과 코멘트</label>
            <textarea></textarea>
          </div>
          <!-- //완료처리 코멘트 -->
        </div>

        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_tempsave">확인</button>
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
