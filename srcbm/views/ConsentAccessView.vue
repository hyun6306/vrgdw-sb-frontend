<template>
  <div class="wrap">
    <div class="container" id="container_consent">
      <div class="contents">
        <section class="consent_title">
          <span class="logo in_img"><img src="@m/assets/img/logo_header.svg" alt="VRG Dongwha D-Sales" /></span>
        </section>
        <span class="consent_subtxt">D-Sales 모바일 서비스를 이용하시려면 아래의 권한을 허용해주세요</span>
        <section class="consent_box">
          <p class="consent_box_title">필수적 접근권한</p>
          <div class="consent_box_kind">
            <i class="in_img"><img src="@m/assets/img/icon_phone.png" /></i>
            <span>
              <strong>기기 및 앱 기록</strong>
              <small>앱 서비스 최적화 및 오류 확인을 위해 접근이 필요합니다.</small>
            </span>
          </div>
          <p class="consent_box_title">선택적 접근권한</p>
          <div class="consent_box_kind">
            <i class="in_img"><img src="@m/assets/img/icon_phone.png" /></i>
            <span>
              <strong>사진/미디어 파일</strong>
              <small>파일 첨부를 위해 기기의 파일에 접근이 필요합니다.</small>
            </span>
          </div>
          <div class="consent_box_kind">
            <i class="in_img"><img src="@m/assets/img/icon_alarm.png" /></i>
            <span>
              <strong>알림</strong>
              <small>이벤트 및 정보알림을 위해 접근이 필요합니다.</small>
            </span>
          </div>
          <div class="consent_box_kind">
            <i class="in_img"><img src="@m/assets/img/icon_camera.png" /></i>
            <span>
              <strong>카메라</strong>
              <small>검사, 등록 시 사진촬영을 위해 사용됩니다. </small>
            </span>
          </div>
          <div class="consent_box_kind">
            <i class="in_img"><img src="@m/assets/img/icon_normal_phone.png" /></i>
            <span>
              <strong>전화</strong>
              <small>전화번호 자동 연결을 위해 접근이 필요합니다.</small>
            </span>
          </div>
        </section>
        <div class="consent_footer">
          <button class="btn_check">확인</button>
          <p class="">
            <strong>앱 접근권한은 더 나은 서비스를 제공하기 위해 사용됩니다</strong>
            <small>선택적접근권한은 해당 기능을 사용할 때 동의를 받고 있으며 동의하지 않아도 해당기능 외 서비스 이용이 가능합니다</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
