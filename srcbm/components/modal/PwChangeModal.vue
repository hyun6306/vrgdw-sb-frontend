<template>
  <modal name="PwChangeModal" width="90%" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('PwChangeModal')"></button>
      </div>
      <!-- <p class="modal_title">임시비밀번호 로그인</p> -->
      <div class="modal_content">
        <div class="new_password">
          <p class="new_password_title">고객님께서는 비밀번호를 설정한지 <i class="fr">90일</i>이 경과 하였습니다.</p>
          <small class="new_password_subtxt"> 서비스의 안전한 사용 및 개인정보보호를 위해 비밀번호를 변경 하시기 바랍니다. </small>
          <section class="login_form idpw_form">
            <stron class="idpw_form_title">현재 비밀번호</stron>
            <div class="form_box">
              <input id="new-password" type="password" class="login_input" placeholder="비밀번호를 입력해주세요." />
              <!-- 패스워드 보기 버튼
                    패스워드 입력시 on 클래스 추가
                    버튼 클릭시 see 클래스 추가
                    -->
              <button class="btn_view_password"></button>
            </div>
            <p class="alert_txt">비밀번호를 잘못 입력하셨습니다. 다시 입력해주세요.</p>
          </section>
          <section class="login_form idpw_form">
            <stron class="idpw_form_title">변경 비밀번호 </stron>
            <small class="idpw_form_subtxt">비밀번호는 (영문 대/소문자 + 숫자 8자 이상) 으로 등록해주세요</small>
            <div class="form_box">
              <input id="new-password-check" type="password" class="login_input" placeholder="비밀번호를 입력해주세요." />
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
            <div class="form_box">
              <input id="new-password" type="password" class="login_input" placeholder="비밀번호를 입력해주세요." />
              <!-- 패스워드 보기 버튼
                    패스워드 입력시 on 클래스 추가
                    버튼 클릭시 see 클래스 추가
                    -->
              <button class="btn_view_password"></button>
            </div>
            <p class="alert_txt">변경 비밀번호와 일치하지 않습니다.</p>
          </section>
        </div>
        <div class="modal_btn_contents">
          <button class="btn_next_change">다음에 변경</button>
          <button class="btn_primary">비밀번호 변경</button>
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
  name: 'PwChangeModal',
};
</script>

<style></style>
