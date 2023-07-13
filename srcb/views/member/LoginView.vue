<template>
  <div class="login_wrap">
    <div class="login_container">
      <span class="logo"><img src="@/assets/img/logo.png" /></span>
      <h1><img src="@/assets/img/login_subtitle.png" alt="D-Sales & LOGISTCS SYSTEM" /></h1>
      <small>Welcome to D-Sales </small>

      <div class="login_form">
        <div class="form_box">
          <input id="normal_login_userName" type="text" class="on" placeholder="example@dongwha.com" />
          <label for="normal_login_userName" class="label_id">Please enter an email</label>
          <span class="form_border"></span>
        </div>
        <div class="form_box">
          <input id="normal_login_pw" type="password" class="" placeholder="" />
          <label for="normal_login_pw" class="label_pw">Password</label>
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
        <button class="btn_login">LOG-IN</button>
        <div class="check_idpw">
          <label class="chechbox_basic">
            <input type="checkbox" />
            <span class="checkmark"></span> Save ID
          </label>
          <a class="login-form-forgot"> Do you forget your ID or Password?</a>
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
