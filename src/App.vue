<template>
  <div id="app" class="lang_eng">
    <!--
        영역 분리를 위해 header, sideHidenBtn, footer 를 따로 관리한다.
        @/router/index.js 쪽의 component / component's' 를 중점으로 보면 알수있다.
        Google 검색 "vue router 네임드"
        -->
    <!--로딩  -->
    <div :class="[isLoading ? 'loading' : 'loading none-display']">
      <div class="img">
        <div class="sk-fading-circle">
          <div class="sk-circle1 sk-circle"></div>
          <div class="sk-circle2 sk-circle"></div>
          <div class="sk-circle3 sk-circle"></div>
          <div class="sk-circle4 sk-circle"></div>
          <div class="sk-circle5 sk-circle"></div>
          <div class="sk-circle6 sk-circle"></div>
          <div class="sk-circle7 sk-circle"></div>
          <div class="sk-circle8 sk-circle"></div>
          <div class="sk-circle9 sk-circle"></div>
          <div class="sk-circle10 sk-circle"></div>
          <div class="sk-circle11 sk-circle"></div>
          <div class="sk-circle12 sk-circle"></div>
        </div>
      </div>
    </div>
    <!-- //로딩 -->
    <router-view name="header" @choosePage="choosePage"></router-view>
    <router-view name="sideHidenBtn"></router-view>
    <router-view :choosePage="page"></router-view>
    <CommonAlarmYesModal :ment="ment" />
    <CommonAlarmYesWideModal :ment="ment" />
    <!-- <router-view name="footer"></router-view> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import CommonAlarmYesModal from '@/modal/CommonAlarmYesModal';
import CommonAlarmYesWideModal from '@/modal/CommonAlarmYesWideModal';
import commonApi from '@/api/common';

export default {
  components: { CommonAlarmYesModal, CommonAlarmYesWideModal },
  data() {
    return {
      page: null,
      ment: '',
    };
  },
  computed: {
    ...mapState(['isLoading', 'isNetworkError']),
    ...mapGetters({
      shortUrl: 'userInfo/getShortUrl',
    }),
  },
  watch: {
    isNetworkError(value) {
      if (value) {
        this.ment = 'Network Error';
        this.$modal.show('CommonAlarmYesModal');
        this.$store.state.isNetworkError = false;
      }
    },
  },
  methods: {
    /**
     * header에서 올라온 menu 정보를 MainView에 props로 전달
     */
    choosePage(page) {
      this.page = JSON.parse(JSON.stringify(page));
    },
    async getShortUrl() {
      console.log('this.shortUrl:', this.shortUrl);
      try {
        const param = {
          shortUrl: this.shortUrl,
        };
        const resp = await commonApi.getShortUrl(param);
        if (resp.data.rs.paramData) {
          let paramData = JSON.parse(resp.data.rs.paramData);
          let token = paramData.token;
          let useInfo = paramData.userInfo;
          let error = paramData.error;

          if (error) {
            this.ment = 'message.msgSsoLoginFail';
            this.$modal.show('CommonAlarmYesModal');
            this.setShortUrl('');
          } else if (token) {
            const vrgdwInfo = {
              Authorization: token.Authorization,
              Token: token.Token,
            };
            this.setAuthorization(vrgdwInfo.Authorization);
            this.setRefreshToken(vrgdwInfo.Token);
            this.setUserInfo(useInfo);
            this.setShortUrl('');
            this.$router.push('/main');
          }
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
        this.setShortUrl('');
      }
    },
    ...mapMutations('userInfo', ['setBrowser', 'setShortUrl']),
    ...mapMutations('userInfo', ['setAuthorization', 'setRefreshToken', 'setUserInfo']),
  },
  created() {
    this.$EventBus.$on('openYesModal', ment => {
      this.ment = ment;
      this.$modal.show('CommonAlarmYesModal');
    });
    this.$EventBus.$on('openYesWideModal', ment => {
      this.ment = ment;
      this.$modal.show('CommonAlarmYesWideModal');
    });
    this.setBrowser();
  },
  mounted() {
    if (this.shortUrl !== '') this.getShortUrl();
  },
  destroyed() {
    this.$EventBus.$off('openYesModal');
    this.$EventBus.$off('openYesWideModal');
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';
@import '@/assets/fonts/font.css';
</style>
