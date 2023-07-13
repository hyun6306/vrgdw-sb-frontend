<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">{{ $t('message.privatePolicy') }}</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img" @click="backButton"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right"></div>
    </div>
    <!-- //상단 헤더 -->
    <!-- 컨텐츠 바디 -->
    <div class="container" @scroll="handleScroll">
      <!-- 개인정보취급방침 -->
      <div class="document_contents">
        <p v-html="contents"></p>
      </div>
      <!-- 개인정보취급방침 -->
    </div>
    <!-- //컨텐츠 바디 -->
    <HomeTap @goToTop="goToTop" :showMain="showMain" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import utilApi from '@/api/util/utility';
import HomeTap from '@m/components/HomeTap';

export default {
  components: {
    HomeTap,
  },
  data() {
    return {
      el: '',
      contents: '',
      showMain: true,
    };
  },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
    }),
  },
  methods: {
    goToTop() {
      if (Object.keys(this.el).length > 0) this.el.target.scrollTop = 0;
    },
    handleScroll(el) {
      this.el = el;
    },
    backButton() {
      this.$router.go(-1);
    },
    async getPrivacy() {
      try {
        const resp = await utilApi.getPrivacy();
        this.contents = resp.data.rs.contents;
        this.contents = this.contents.replaceAll('&lt;p', '<p');
        this.contents = this.contents.replaceAll('&lt;P', '<P');
        this.contents = this.contents.replaceAll('&lt;&#x2F;p&gt;', '</p>');
        this.contents = this.contents.replaceAll('&lt;&#x2F;P&gt;', '</P>');
        this.contents = this.contents.replaceAll('&gt;', '>');
        this.contents = this.contents.replaceAll('&lt;br&gt;', '<br>');
        this.contents = this.contents.replaceAll('&lt;br>', '<br>');
        this.contents = this.contents.replaceAll('&lt;BR&gt;', '<BR>');
        this.contents = this.contents.replaceAll('&lt;img', '<img');
        this.contents = this.contents.replaceAll('&gt;', '>');
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  mounted() {
    this.getPrivacy();
  },
  created() {},
};
</script>

<style></style>
