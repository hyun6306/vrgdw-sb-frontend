<template>
  <modal name="SearchModal" width="100%" height="100%" :adaptive="true">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">검색</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('SearchModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="quote_search_contents">
          <div class="list_form_section">
            <ul class="list_ul">
              <li class="list_li">
                <label class="list_title">고객명</label>
                <div class="form_searchm">
                  <input type="text" placeholder="" readonly />
                  <button class="icon_search in_img"><img src="@m/assets/img/icon_search_w.png" /></button>
                </div>
              </li>
              <li class="list_li">
                <label class="list_title">제품명</label>
                <div class="form_searchm">
                  <input type="text" placeholder="" readonly />
                  <button class="icon_search"><img src="@m/assets/img/icon_search_w.png" /></button>
                </div>
              </li>
              <li class="list_li">
                <label class="list_title">기간선택</label>
                <MultiSelect id="" style="100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="전체"></MultiSelect>
              </li>
              <li class="list_li">
                <label class="list_title not_see">기간선택</label>
                <div class="form_calendar">
                  <input type="text" placeholder="" readonly />
                  <button class="icon_calendar" @click="datePicker('DateMonthPicker')"><img src="@m/assets/img/icon_calendar.png" /></button>
                </div>
              </li>
              <li class="list_li">
                <label class="list_title">출고상태</label>
                <MultiSelect id="" style="100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="전체"></MultiSelect>
              </li>
              <li class="list_li">
                <label class="list_title">검색어</label>
                <span class="list_form"><input type="text" class="d_input" placeholder="" /></span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_cancle">취소</button>
            <button class="btn_add">검색</button>
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
