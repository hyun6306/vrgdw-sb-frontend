<template>
  <modal name="CostcenterSearchModal" width="100%" height="100%" :adaptive="true">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">코스트센터 검색</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('CostcenterSearchModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <!-- 배코스트센터송지 검색 -->
        <div class="delivery_search_contents">
          <input type="text" id="" class="" />
          <button class="btn_search">sự tìm kiếm</button>
        </div>
        <!-- //코스트센터 검색 -->
        <!-- 코스트센터 검색결과 목록 -->
        <div class="customer_search_list_contents">
          <div class="table">
            <table>
              <colgroup>
                <col style="width: 100%" />
              </colgroup>
              <tbody>
                <tr>
                  <!-- 요기 td v-for 하시면 됩니다. -->
                  <td class="pa-0">
                    <ul class="customer_slc_list">
                      <li class="customer_slc_list_check">
                        <label class="chechbox_solo">
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                      </li>
                      <li class="customer_slc_list_info">
                        <strong>K1F003</strong>
                        <span>베트남 남부대리점</span>
                      </li>
                    </ul>
                  </td>
                  <!-- //요기 td v-for 하시면 됩니다. -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- //코스트센터 검색결과 목록 -->
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
