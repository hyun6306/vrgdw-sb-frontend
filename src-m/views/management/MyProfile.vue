<template>
  <div class="wrap">
    <!-- 상단 헤더 -->
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">{{ $t('message.myProfile') }}</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img" @click="$router.go(-1)"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right"></div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <MyProfileCheck @checkSuss="profileCheck" v-show="showProfile == false" />
      <MyProfileInfo v-show="showProfile == true" :oldPwd="oldPwd" />
    </div>
    <!-- //컨텐츠 바디 -->
  </div>
</template>
<script>
import MyProfileCheck from '@m/components/management/MyProfileCheck.vue';
import MyProfileInfo from '@m/components/management/MyProfileInfo.vue';

export default {
  components: { MyProfileCheck, MyProfileInfo },
  data() {
    return {
      showProfile: false,
      oldPwd: '',
    };
  },
  methods: {
    profileCheck(checkData) {
      if (checkData.result == true) {
        this.showProfile = true;
        this.oldPwd = checkData.oldPwd;
      }
    },
  },
};
</script>

<style></style>
