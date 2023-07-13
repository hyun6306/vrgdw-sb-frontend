<template>
  <modal name="DeliveryRegistModal" width="100%" height="100%" :adaptive="true">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">배송지 등록</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('DeliveryRegistModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="quote_search_contents">
          <div class="delivery_default">
            <label class="chechbox_basic">
              <input type="checkbox" />
              <span class="checkmark"></span>
              기본 배송지
            </label>
          </div>
          <div class="list_form_section">
            <ul class="list_ul">
              <li class="list_li">
                <label class="list_title">배송지명</label>
                <span class="list_form"><input type="text" class="d_input" placeholder="" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">우편번호</label>
                <span class="list_form"><input type="text" class="d_input" placeholder="" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">배송권역</label>
                <div class="list_form phone_form">
                  <MultiSelect id="" style="100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="전체"></MultiSelect>
                  <MultiSelect id="" style="100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="전체"></MultiSelect>
                </div>
              </li>
              <li class="list_li">
                <label class="list_title">상세주소</label>
                <span class="list_form"><input type="text" class="d_input" placeholder="" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">담당자명</label>
                <span class="list_form"><input type="text" class="d_input" placeholder="" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">연락처1</label>
                <span class="list_form phone_form">
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                </span>
              </li>
              <li class="list_li">
                <label class="list_title">연락처2</label>
                <span class="list_form phone_form">
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                </span>
              </li>
              <li class="list_li">
                <label class="list_title">특이사항</label>
                <span class="list_form textarea_form">
                  <textarea></textarea>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_cancle">취소</button>
            <button class="btn_add">저장</button>
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
    };
  },
};
</script>

<style></style>
