<template>
  <div class="login_wrap">
    <div class="login_container">
      <span class="logo"><img src="@/assets/img/logo.png" /></span>
      <h1><img src="@/assets/img/login_subtitle.png" alt="D-Sales & LOGISTCS SYSTEM" /></h1>
      <small>Welcome to D-Sales </small>
      <div class="idpw_form">
        <div id="TabS">
          <ul class="tab-menu">
            <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
              <a v-on:click="currentTab = index">{{ tab }}</a>
            </li>
          </ul>
          <div class="tab-content tab-idpw-content">
            <div v-show="currentTab == 0">
              <div class="form_box on">
                <input id="normal_login_userName" type="text" class="" placeholder="" />
                <label for="normal_login_userName" class="label_id">이름</label>
                <span class="form_border"></span>
              </div>
              <div class="form_box">
                <input id="business_number" type="password" class="" placeholder="" />
                <label for="business_number" class="label_pw">사업자등록번호</label>
                <span class="form_border"></span>
                <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
                <span class="pw_check_active on"><img src="@/assets/img/icon_check.png" /></span>
                <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
                <button class="btn_view_password on see"></button>
              </div>
              <div class="form_box">
                <input id="client_code" type="password" class="" placeholder="" />
                <label for="client_code" class="label_pw">고객사코드</label>
                <span class="form_border"></span>
                <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
                <span class="pw_check_active on"><img src="@/assets/img/icon_check.png" /></span>
                <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
                <button class="btn_view_password on see"></button>
              </div>
              <p class="login_alert">!Alert message area</p>
            </div>
          </div>
          <div class="tab-content">
            <div v-show="currentTab == 1">
              <div class="form_box">
                <input id="normal_login_userName02" type="text" class="" placeholder="example@dongwha.com" />
                <label for="normal_login_userName02" class="label_id">ID</label>
                <span class="form_border"></span>
              </div>
              <div class="form_box">
                <input id="normal_login_name" type="text" class="" placeholder="" />
                <label for="normal_login_name" class="label_pw">이름</label>
                <span class="form_border"></span>
                <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
              </div>
              <p class="login_alert">!Alert message area</p>
            </div>
          </div>
        </div>
        <button class="btn_login">SEARCH</button>
        <div class="id_search_result_box">
          <p class="user_id">
            고객님의 아이디는
            <span>woodnati**@gmail.com</span>
            입니다
          </p>
          <a>로그인하기</a>
        </div>
      </div>
      <p class="login_footer">Copyright VRG Dongwha MDF. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  data() {
    return {
      currentTab: 0,
      tabs: ['아이디찾기', '비밀번호 검색'],
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>

<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
