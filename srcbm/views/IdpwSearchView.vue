<template>
  <div class="wrap">
    <!-- 상단 헤더 -->
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">내정보 검색</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right"></div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <div class="idpw_contents">
        <span class="logo_gray in_img"><img src="@m/assets/img/logo_header.svg" alt="VRG Dongwha D-Sales" /></span>
        <div id="TabS">
          <ul class="tab-menu">
            <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
              <a v-on:click="currentTab = index">{{ tab }}</a>
            </li>
          </ul>
          <div class="tab-content tab-idpw-content">
            <div v-show="currentTab == 0">
              <section class="login_form idpw_form">
                <div class="form_box">
                  <input id="" type="text" class="login_input on" placeholder="아이디를 입력하세요" />
                  <!-- 체크 확인상태 
                    패스워드 입력시 on 클래스 추가
                    -->
                  <span class="pw_check_active in_img on"><img src="@m/assets/img/icon_check.png" /></span>
                </div>
                <div class="form_box">
                  <input id="normal_login_pw" type="password" class="login_input" placeholder="사업자등록번호를 입력하세요" />
                  <!-- 패스워드 보기 버튼
                    패스워드 입력시 on 클래스 추가
                    버튼 클릭시 see 클래스 추가
                    -->
                  <button class="btn_view_password"></button>
                </div>
                <div class="form_box">
                  <input id="normal_login_pw" type="password" class="login_input" placeholder="고객사 코드를 입력하세요" />
                  <!-- 패스워드 보기 버튼
                    패스워드 입력시 on 클래스 추가
                    버튼 클릭시 see 클래스 추가
                    -->
                  <button class="btn_view_password"></button>
                </div>
                <button class="btn_search_idpw">검색</button>
                <p class="alert_txt">
                  <i class="icon_warning"></i>
                  입력하신 정보와 일치하는 정보가 없습니다.
                </p>
                <div class="search_result">
                  <p class="result_id">
                    고객님의 아이디는
                    <br /><span>Hwoodnati**@gmail.com </span>입니다.
                  </p>
                  <a href="" class="btn_login_s">로그인하기</a>
                </div>
              </section>
            </div>
            <div v-show="currentTab == 1">
              <section class="login_form idpw_form">
                <div class="form_box">
                  <input id="" type="text" class="login_input on" placeholder="아이디를 입력하세요" />
                  <!-- 체크 확인상태 
                    패스워드 입력시 on 클래스 추가
                    -->
                  <span class="pw_check_active in_img on"><img src="@m/assets/img/icon_check.png" /></span>
                </div>
                <div class="form_box">
                  <input id="" type="text" class="login_input on" placeholder="이름을 입력하세요" />
                  <!-- 체크 확인상태 
                    패스워드 입력시 on 클래스 추가
                    -->
                  <span class="pw_check_active in_img on"><img src="@m/assets/img/icon_check.png" /></span>
                </div>

                <button class="btn_search_idpw">검색</button>
                <p class="alert_txt">
                  <i class="icon_warning"></i>
                  입력하신 정보와 일치하는 정보가 없습니다.
                </p>
                <div class="search_result">
                  <p class="result_id">
                    임시 비밀번호가 등록된
                    <br />이메일 주소로 발송 되었습니다.
                  </p>
                  <a href="" class="btn_login_s">로그인하기</a>
                </div>
              </section>
            </div>
          </div>
        </div>
        <p class="login_footer">Copyright VRG Dongwha MDF. All rights reserved.</p>
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
