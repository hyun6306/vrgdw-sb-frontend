<template>
  <div>
    <!-- <div :class="[userId ? 'form_box on' : 'form_box']"> -->
    <div class="form_box">
      <input id="normal_login_userName2" type="text" :class="[userCd ? 'on' : '']" placeholder="" v-model="userCd" />
      <label for="normal_login_userName2" class="label_id">{{ $t('message.id') }}</label>
      <span class="form_border"></span>
    </div>
    <!-- <div :class="[userNm ? 'form_box on' : 'form_box']"> -->
    <div class="form_box">
      <input id="normal_login_name" :type="nmType" :class="[userNm ? 'on' : '']" placeholder="" v-model="userNm" @keyup.enter="$parent.search()" />
      <label for="normal_login_name" class="label_pw">{{ $t('message.nm') }}</label>
      <span class="form_border"></span>
      <button :class="nmIcon" @click="iconUserNm" v-if="browser !== 'EDGE'"></button>
    </div>
    <!-- <p class="login_alert" v-if="alert">등록한 정보가 일치 하지 않습니다.</p> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import stringUtil from '@/utils/stringUtil';

export default {
  name: 'pwSearch',
  watch: {
    userId() {
      this.$parent.alertRefresh();
    },
    userNm() {
      this.$parent.alertRefresh();
    },
  },
  computed: {
    ...mapGetters({
      browser: 'userInfo/getBrowser',
    }),
  },
  data() {
    return {
      pwInfo: {
        userCd: '',
        userNm: '',
      },
      userCd: '',
      userNm: '',
      nmType: 'password',
      nmIcon: 'btn_view_password on',
    };
  },
  methods: {
    searchInfo() {
      let info = {
        userCd: this.userCd,
        userNm: this.userNm,
      };
      return info;
    },
    iconUserNm() {
      const showType = stringUtil.dataShowBtn(this.nmType);
      this.nmType = showType.type;
      this.nmIcon = showType.ynShow;
    },
  },
};
</script>

<style></style>
