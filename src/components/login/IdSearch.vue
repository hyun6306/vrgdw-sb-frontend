<template>
  <div>
    <!-- <div :class="[userNm ? 'form_box on' : 'form_box']"> -->
    <div class="form_box">
      <input id="normal_login_userName" type="text" :class="[userNm ? 'on' : '']" placeholder="" v-model="userNm" />
      <label for="normal_login_userName" class="label_id">{{ $t('message.nm') }}</label>
      <span class="form_border"></span>
    </div>
    <!-- <div :class="[businessNum ? 'form_box on' : 'form_box']"> -->
    <div class="form_box">
      <input id="business_number" :type="type.business" :class="[businessNum ? 'on' : '']" placeholder="" v-model="businessNum" />
      <label for="business_number" class="label_pw">{{ $t('message.bizNum') }}</label>
      <span class="form_border"></span>
      <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
      <!-- <span class="pw_check_active on"><img src="@/assets/img/icon_check.png" /></span> -->
      <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
      <button :class="icon.business" @click="iconBusiness" v-if="browser !== 'EDGE'"></button>
      <!-- <button :class="[icon.business ? 'btn_view_password on see' : 'btn_view_password on']" @click="iconBusiness" :disabled="businessNum == ''"></button> -->
    </div>
    <!-- <div :class="[clientCode ? 'form_box on' : 'form_box']"> -->
    <div class="form_box">
      <input id="client_code" :type="type.client" :class="[clientCode ? 'on' : '']" placeholder="" v-model="clientCode" @keyup.enter="$parent.search()" />
      <label for="client_code" class="label_pw">{{ $t('message.custCd') }}</label>
      <span class="form_border"></span>
      <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
      <!-- <span class="pw_check_active on"><img src="@/assets/img/icon_check.png" /></span> -->
      <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
      <button :class="icon.client" @click="iconClient" v-if="browser !== 'EDGE'"></button>
      <!-- <button :class="[icon.client ? 'btn_view_password on see' : 'btn_view_password on']" @click="iconClient" :disabled="clientCode == ''"></button> -->
    </div>
    <!-- <p class="login_alert" v-if="alert">등록하신 정보와 일치하는 정보가 없습니다.</p> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import stringUtil from '@/utils/stringUtil';

export default {
  created() {},
  data() {
    return {
      userNm: '',
      businessNum: '',
      clientCode: '',
      icon: {
        business: 'btn_view_password on',
        client: 'btn_view_password on',
      },
      type: {
        business: 'password',
        client: 'password',
      },
      idInfo: {
        userNm: '',
        businessNum: '',
        clientCode: '',
      },
      showId: true,
    };
  },
  computed: {
    ...mapGetters({
      browser: 'userInfo/getBrowser',
    }),
  },
  props: ['searchType'],
  watch: {
    userNm() {
      this.$parent.alertRefresh();
    },
    businessNum() {
      this.$parent.alertRefresh();
    },
    clientCode() {
      this.$parent.alertRefresh();
    },
  },

  methods: {
    searchInfo() {
      let info = {
        userNm: this.userNm,
        bizNum: this.businessNum,
        custCd: this.clientCode,
      };
      return info;
    },
    iconBusiness() {
      const showType = stringUtil.dataShowBtn(this.type.business);
      this.type.business = showType.type;
      this.icon.business = showType.ynShow;
    },
    iconClient() {
      const showType = stringUtil.dataShowBtn(this.type.client);
      this.type.client = showType.type;
      this.icon.client = showType.ynShow;
    },
  },
};
</script>

<style></style>
