<template>
  <div style="width: 100%; height: 100%">
    <img src="@m/assets/img/splash.jpg" style="width: 100%; height: 100%" />
    <AlarmYesReturnModal @confirm="confirm" />
  </div>
</template>

<script>
import loginJs from '@m/mixins/login';
import AlarmYesReturnModal from '@m/modal/AlarmYesReturnModal';
export default {
  mixins: [loginJs],
  components: { AlarmYesReturnModal },
  methods: {
    respo(res, type = '') {
      if (type === 'get' && !res.notFirst && !res.userCd) {
        this.$router.push('/consentAccess');
      } else if (type === 'get' && res.notFirst === 'Y' && !res.userCd) {
        this.$router.push('/signin');
      } else if (type === 'get' && res.notFirst === 'Y' && res.userCd && res.autoLogin) {
        this.userCd = res.userCd;
        this.userPs = res.userPs;
        this.autoLogin = res.autoLogin;
        this.validation();
      }
    },
    confirm() {
      let data = {
        notFirst: 'Y',
      };
      if (this.$DWAPI) {
        this.$DWAPI.post(['setStorageData', 'loginInfo', JSON.stringify(data)]);
      }
      this.$router.push('/signin');
    },
  },
  created() {
    if (this.$DWAPI) {
      this.$DWAPI.post(['getStorageData', 'loginInfo'], res => this.respo(res, 'get'));
    } else {
      this.$router.push('/consentAccess');
    }
  },
};
</script>

<style></style>
