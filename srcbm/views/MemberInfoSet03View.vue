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
              <label class="list_title">운송사</label>
              <span class="list_form"><input type="text" class="disdabled d_input t-l" disdabled placeholder="동화베트남운용사" /></span>
            </li>
            <li class="list_li">
              <label class="list_title">운송사코드</label>
              <span class="list_form"><input type="text" class="disdabled d_input t-l" disdabled placeholder="AX300001" /></span>
            </li>
            <li class="list_li">
              <label class="list_title">사업자명</label>
              <span class="list_form"><input type="text" class="disdabled d_input t-l" disdabled placeholder="동화베트남" /></span>
            </li>
            <li class="list_li">
              <label class="list_title">사업자번호</label>
              <span class="list_form"><input type="text" class="disdabled d_input t-l" disdabled placeholder="00-000-000" /></span>
            </li>
            <li class="list_li">
              <label class="list_title">담당자명</label>
              <span class="list_form"><input type="text" class="disdabled d_input t-l" disdabled placeholder="홍길동" /></span>
            </li>
            <li class="list_li">
              <label class="list_title">재직구분</label>
              <span class="list_form"><input type="text" class="disdabled d_input t-l" disdabled placeholder="재직" /></span>
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
              <label class="list_title">E-mail</label>
              <span class="list_form mail_form">
                <input type="text" class="disdabled d_input t-l" disdabled placeholder="" />
                <i>@</i>
                <input type="text" class="disdabled d_input t-l" disdabled placeholder="" />
              </span>
            </li>
            <li class="list_li">
              <label class="list_title">입사일</label>
              <span class="list_form">
                <input type="text" class="disdabled d_input t-l" disdabled placeholder="" />
              </span>
            </li>
            <li class="list_li">
              <label class="list_title">퇴직일</label>
              <span class="list_form">
                <input type="text" class="disdabled d_input t-l" disdabled placeholder="" />
              </span>
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
            <li class="list_li">
              <label class="list_title">휴대폰 번호</label>
              <span class="list_form phone_form">
                <input type="text" class="disdabled d_input t-l" disdabled placeholder="000" />
                <input type="text" class="disdabled d_input t-l" disdabled placeholder="000" />
                <input type="text" class="disdabled d_input t-l" disdabled placeholder="000" />
              </span>
            </li>
            <li class="list_li">
              <label class="list_title">전화 번호</label>
              <span class="list_form phone_form">
                <input type="text" class="disdabled d_input t-l" disdabled placeholder="000" />
                <input type="text" class="disdabled d_input t-l" disdabled placeholder="000" />
                <input type="text" class="disdabled d_input t-l" disdabled placeholder="000" />
              </span>
            </li>

            <li class="list_li">
              <label class="list_title">우편번호</label>
              <span class="list_form">
                <input type="text" class="disdabled d_input t-l" disdabled placeholder="" />
              </span>
            </li>
            <li class="list_li">
              <label class="list_title">주소</label>
              <input type="text" class="disdabled d_input t-l" disdabled placeholder="" />
            </li>
            <li class="list_li">
              <label class="list_title not_see"></label>
              <input type="text" class="disdabled d_input t-l" disdabled placeholder="" />
            </li>
            <li class="list_li">
              <label class="list_title">상세주소</label>
              <span class="list_form">
                <input type="text" class="disdabled d_input t-l" disdabled placeholder="" />
              </span>
            </li>
          </ul>
        </div>
      </div>
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
