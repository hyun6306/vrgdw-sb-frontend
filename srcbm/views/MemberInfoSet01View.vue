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
        <span class="memberinfoset_title">회원정보를 수정하시려면<br />비밀번호를 다시 입력해주세요.</span>
        <div class="memberinfoset_box">
          <section class="login_form idpw_form">
            <div class="form_box">
              <span class="id_box">hong01</span>
            </div>
            <div class="form_box">
              <input id="normal_login_pw" type="password" class="login_input" placeholder="비밀번호를 입력하세요" />
              <!-- 패스워드 보기 버튼
                  패스워드 입력시 on 클래스 추가
                  버튼 클릭시 see 클래스 추가
                  -->
              <button class="btn_view_password"></button>
            </div>
            <button class="btn_search_idpw">확인</button>
            <p class="alert_txt">
              <i class="icon_warning"></i>
              입력하신 정보와 일치하는 정보가 없습니다.
            </p>
          </section>
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
