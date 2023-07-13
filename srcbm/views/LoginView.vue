<template>
  <div class="wrap">
    <div class="container" id="container_login">
      <div class="contents login_contents">
        <section class="login_title">
          <span class="logo in_img"><img src="@m/assets/img/login_title.png" /></span>
          <span class="logo_subtxt">D-Sales에 오신 것을 환영합니다.</span>
        </section>
        <section class="login_form">
          <div class="form_box">
            <input id="" type="text" class="login_input on" placeholder="아이디를 입력하세요" />
            <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
            <span class="pw_check_active in_img on"><img src="@m/assets/img/icon_check.png" /></span>
          </div>
          <div class="form_box">
            <input id="normal_login_pw" type="password" class="login_input" placeholder="비밀번호를 입력하세요" />

            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button class="btn_view_password"></button>
          </div>
          <div class="check_idpw">
            <label class="chechbox_basic">
              <input type="checkbox" />
              <span class="checkmark"></span> 자동 로그인
            </label>
            <a class="login-form-forgot">아이디/비밀번호 찾기</a>
          </div>
          <button class="btn_login">LOG-IN</button>
          <p class="alert_txt">
            <i class="icon_warning"></i>
            !Alert message area
          </p>
        </section>
        <p class="login_footer">Copyright VRG Dongwha MDF. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
