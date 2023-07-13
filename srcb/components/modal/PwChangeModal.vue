<template>
  <modal name="PwChangeModal" width="480" height="auto" :adaptive="true">
    <div class="modal modal_new">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('PwChangeModal')"></button>
      </div>
      <!-- <p class="modal_title">배송지 리스트</p> -->
      <div class="modal_content">
        <div class="modal_form">
          <small> {{ $t('msg.oldPwContent1') }} </small>
          <p class="modal_form_title">{{ $t('msg.tmpContent2') }}</p>
          <div class="form_box">
            <input id="new_password" type="password" class="" placeholder="" />
            <label for="new_password" class="label_pw">{{ $t('label.newPw') }}</label>
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
            <input id="confirm_password01" type="password" class="" placeholder="" />
            <label for="confirm_password01" class="label_pw">{{ $t('label.cfmPw') }}</label>
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
            <input id="confirm_password02" type="password" class="" placeholder="" />
            <label for="confirm_password02" class="label_pw">{{ $t('label.cfmPw') }}</label>
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
          <p class="input_alert">{{ $t('msg.pwCondition') }}</p>
        </div>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_deep_gray">{{ $t('button.afterChangePw') }}</button>
        <button class="btn_primary">{{ $t('button.changePw') }}</button>
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
