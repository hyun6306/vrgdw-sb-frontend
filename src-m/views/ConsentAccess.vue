<template>
  <div class="wrap">
    <div class="container" id="container_consent">
      <div class="contents">
        <section class="consent_title">
          <span class="logo in_img"><img src="@m/assets/img/logo_header.svg" alt="VRG Dongwha D-Sales" /></span>
        </section>
        <span class="consent_subtxt">{{ $t('message.msgAllowPermission') }}</span>
        <section class="consent_box">
          <p class="consent_box_title">{{ $t('message.msgEssentialAuth') }}</p>
          <div class="consent_box_kind">
            <i class="in_img"><img src="@m/assets/img/icon_phone.png" /></i>
            <span>
              <strong>{{ $t('message.deviceHistory') }}</strong>
              <small>{{ $t('message.msgRequireAccess') }}</small>
            </span>
          </div>
          <p class="consent_box_title">{{ $t('message.msgChoiceAccess2') }}</p>
          <div class="consent_box_kind">
            <i class="in_img"><img src="@m/assets/img/icon_phone.png" /></i>
            <span>
              <strong>{{ $t('message.photoMedia') }}</strong>
              <small>{{ $t('message.msgRequireFile') }}</small>
            </span>
          </div>
          <div class="consent_box_kind">
            <i class="in_img"><img src="@m/assets/img/icon_alarm.png" /></i>
            <span>
              <strong>{{ $t('message.alert') }}</strong>
              <small>{{ $t('message.msgRequireEvent') }}</small>
            </span>
          </div>
          <div class="consent_box_kind">
            <i class="in_img"><img src="@m/assets/img/icon_camera.png" /></i>
            <span>
              <strong>{{ $t('message.camera') }}</strong>
              <small>{{ $t('message.msgInspectRegist') }}</small>
            </span>
          </div>
          <div class="consent_box_kind">
            <i class="in_img"><img src="@m/assets/img/icon_normal_phone.png" /></i>
            <span>
              <strong>{{ $t('message.call') }}</strong>
              <small>{{ $t('message.msgRequireCall') }}</small>
            </span>
          </div>
        </section>
        <div class="consent_footer">
          <button class="btn_check" @click="check()">{{ $t('message.btnYes') }}</button>
          <p class="">
            <strong>{{ $t('message.msgBetterService') }}</strong>
            <small>{{ $t('message.msgChoiceAccess') }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    check() {
      if (this.$DWAPI) {
        let data = {
          notFirst: 'Y',
        };
        this.$DWAPI.post(['setStorageData', 'loginInfo', JSON.stringify(data)], res => this.respo(res));
      }
      this.$router.push('/signin');
    },
    respo(res, type = '') {
      if (type === 'get' && res.notFirst === 'Y' && !res.userCd) {
        this.$router.push('/signin');
      }
    },
  },
  created() {
    if (this.$DWAPI) {
      this.$DWAPI.post(['getStorageData', 'loginInfo'], res => this.respo(res, 'get'));
    }
  },
};
</script>
