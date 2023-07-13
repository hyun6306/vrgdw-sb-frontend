<template>
  <div class="wrap">
    <!-- 상단 헤더 -->
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">회원정보설정</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right"></div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <div class="memberinfoset_contents">
        <div class="list_form_section shipping_section">
          <ul class="list_ul">
            <li class="list_li">
              <label class="list_title">파트너명</label>
              <span class="list_form"><input type="text" class="disdabled d_input t-r" disdabled placeholder="동화베트남" /></span>
            </li>
            <li class="list_li">
              <label class="list_title">파트너코드</label>
              <span class="list_form"><input type="text" class="disdabled d_input t-r" disdabled placeholder="AX300001" /></span>
            </li>
            <li class="list_li">
              <label class="list_title">이름</label>
              <span class="list_form essential"><input type="text" class="d_input tlr" placeholder="홍길동" /></span>
            </li>
            <li class="list_li">
              <label class="list_title">사원번호</label>
              <span class="list_form"><input type="text" class="d_input t-l" placeholder="AX300001" /></span>
            </li>
            <li class="list_li">
              <label class="list_title">사원유형</label>
              <MultiSelect id="" style="100%" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="선택"></MultiSelect>
            </li>
            <li class="list_li">
              <label class="list_title">직급</label>
              <MultiSelect id="" style="100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="선택"></MultiSelect>
            </li>
            <li class="list_li">
              <label class="list_title">재직구분</label>
              <MultiSelect id="" style="100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="선택"></MultiSelect>
            </li>
            <li class="list_li">
              <label class="list_title">E-mail</label>
              <span class="list_form mail_form">
                <input type="text" class="d_input t-l" placeholder="" />
                <i>@</i>
                <input type="text" class="d_input t-l" placeholder="" />
              </span>
            </li>

            <li class="list_li">
              <label class="list_title">휴대폰 번호</label>
              <span class="list_form phone_form essential">
                <input type="text" class="d_input" placeholder="0" />
                <input type="text" class="d_input" placeholder="0" />
                <input type="text" class="d_input" placeholder="0" />
              </span>
            </li>
            <li class="list_li">
              <label class="list_title">전화 번호</label>
              <span class="list_form phone_form essential">
                <input type="text" class="d_input" placeholder="0" />
                <input type="text" class="d_input" placeholder="0" />
                <input type="text" class="d_input" placeholder="0" />
              </span>
            </li>
            <li class="list_li">
              <label class="list_title">성별</label>
              <span class="list_form mail_form">
                <label class="radio_t">
                  <input type="radio" name="radio" />
                  <span class="checkmark"></span>
                  남
                </label>
                <label class="radio_t">
                  <input type="radio" name="radio" />
                  <span class="checkmark"></span>
                  여
                </label>
              </span>
            </li>
            <li class="list_li">
              <label class="list_title">입사일</label>
              <div class="form_calendar">
                <input type="text" placeholder="" readonly />
                <button class="icon_calendar" @click="datePicker('DateMonthPicker')"><img src="@m/assets/img/icon_calendar.png" /></button>
              </div>
            </li>
            <li class="list_li">
              <label class="list_title">퇴직일</label>
              <div class="form_calendar">
                <input type="text" placeholder="" readonly />
                <button class="icon_calendar" @click="datePicker('DateMonthPicker')"><img src="@m/assets/img/icon_calendar.png" /></button>
              </div>
            </li>
            <li class="list_li">
              <label class="list_title">은행명</label>
              <span class="list_form"><input type="text" class="d_input t-l" placeholder="" /></span>
            </li>
            <li class="list_li">
              <label class="list_title">계좌번호</label>
              <span class="list_form"><input type="text" class="d_input t-l" placeholder="" /></span>
            </li>
            <li class="list_li">
              <label class="list_title">VRGDW 사용여부</label>
              <span class="list_form mail_form">
                <label class="radio_t">
                  <input type="radio" name="radio" />
                  <span class="checkmark"></span>
                  허용
                </label>
                <label class="radio_t">
                  <input type="radio" name="radio" />
                  <span class="checkmark"></span>
                  거부
                </label>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents">
        <div class="btn_box">
          <button class="btn_reset">취소</button>
          <button class="btn_tempsave">저장</button>
        </div>
      </div>
      <!-- //하단 버튼 -->
    </div>
    <!-- //컨텐츠 바디 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      registClose: false,
      selectOptions: ['KOR', 'ENG', 'VET'],
      currentTab: 0,
      tabs: ['아이디찾기', '비밀번호 검색'],
    };
  },
};
</script>

<style></style>
