<template>
  <modal name="IdPwModal" width="90%" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('IdPwModal')"></button>
      </div>
      <!-- <p class="modal_title">임시비밀번호 로그인</p> -->
      <div class="modal_content">
        <div class="new_password">
          <p class="new_password_title">고객님께서는 임시비밀번호로<br />로그인을 하셨습니다.</p>
          <small class="new_password_subtxt">비밀번호를 변경해주세요</small>
          <section class="login_form idpw_form">
            <stron class="idpw_form_title">신규비밀번호</stron>
            <small class="idpw_form_subtxt">비밀번호는 (영문 대/소문자 + 숫자 8자 이상) 으로 등록해주세요</small>
            <div class="form_box">
              <input id="new-password" type="password" class="login_input" placeholder="비밀번호를 입력해주세요." />
              <!-- 패스워드 보기 버튼
                    패스워드 입력시 on 클래스 추가
                    버튼 클릭시 see 클래스 추가
                    -->

              <button class="btn_view_password"></button>
            </div>
            <p class="alert_txt">비밀번호 규칙에 맞지 않습니다.</p>
          </section>
          <section class="login_form idpw_form">
            <stron class="idpw_form_title">비밀번호 확인</stron>
            <small class="idpw_form_subtxt">비밀번호는 (영문 대/소문자 + 숫자 8자 이상) 으로 등록해주세요</small>
            <div class="form_box">
              <input id="new-password-check" type="password" class="login_input" placeholder="비밀번호를 입력해주세요." />
              <!-- 패스워드 보기 버튼
                    패스워드 입력시 on 클래스 추가
                    버튼 클릭시 see 클래스 추가
                    -->

              <button class="btn_view_password"></button>
            </div>
            <p class="alert_txt">신규 비밀번호 규칙에 맞지 않습니다.</p>
          </section>
        </div>
        <div class="modal_btn_contents">
          <button class="btn_primary">{{ $t('button.ok') }}</button>
        </div>
        <p class="alert_txt">
          <i class="icon_warning"></i>
          입력하신 정보와 일치하는 정보가 없습니다.
        </p>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'IdPwModal',
};
</script>

<style></style>
