<template>
  <modal name="QuoteSearchModal" width="100%" height="100%" :adaptive="true">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">견적서 검색</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('QuoteSearchModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="quote_search_contents">
          <div class="list_form_section">
            <ul class="list_ul">
              <li class="list_li">
                <label class="list_title">견적서 작성일</label>
                <div class="form_calendar">
                  <input type="text" placeholder="" readonly />
                  <button class="icon_calendar" @click="datePicker('DateMonthPicker')"><img src="@m/assets/img/icon_calendar.png" /></button>
                </div>
              </li>
              <li class="list_li">
                <label class="list_title">품목</label>
                <MultiSelect id="" style="100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="전체"></MultiSelect>
              </li>
              <li class="list_li">
                <label class="list_title">상태</label>
                <!-- 체크박스 멀티 셀렉트 -->
                <div class="mcheckbox_multiselect">
                  <button class="select_default" @click="checkboxMultiselect = !checkboxMultiselect">
                    <div class="select_title">
                      <span>다중선택</span>
                      <span>다중선택</span>
                      <span>다중선택</span>
                      <span>다중선택</span>
                      <span>다중선택</span>
                      <span>다중선택</span>
                      <span>다중선택</span>
                      <span>다중선택</span>
                      <span>다중선택</span>
                      <span>다중선택</span>
                      <span>다중선택</span>
                      <span>다중선택</span>
                    </div>
                    <i :class="{ on: checkboxMultiselect }"></i>
                  </button>
                  <ul class="dropdown" :class="{ on: checkboxMultiselect }">
                    <li>
                      <label class="chechbox_basic">
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                        선택 1선택 1선택 1선택 1선택 1선택 1
                      </label>
                    </li>
                    <li>
                      <label class="chechbox_basic">
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                        선택 2
                      </label>
                    </li>
                  </ul>
                </div>
                <!-- //체크박스 멀티 셀렉트 -->
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
