<template>
  <div class="wrap">
    <!-- 상단 헤더 -->
    <div class="header header_dirver">
      <div class="header_left">
        <h1 class="logo in_img"><img src="@m/assets/img/logo_header.svg" /></h1>
      </div>
      <div class="header_right">
        <!-- 로그인유저차량번호 -->
        <span class="car_number">{{ userInfo.userCd }}</span>
        <!-- 로그아웃 -->
        <button class="btn_logout" @click="logout">{{ $t('message.userLogout') }}</button>
      </div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <div class="product_s_contents">
        <div id="TabS">
          <ul class="car_tabs_ul">
            <li :class="{ active: currentTab === 0 }" @click="currentTab = 0">
              <a>
                <div class="tab_icon">
                  <span class="icon_exit"></span>
                  <i>{{ count.outCnt }}</i>
                </div>
                <!-- 출차처리 -->
                <span class="tab_title">{{ $t('message.outProcess') }}</span>
              </a>
            </li>
            <li :class="{ active: currentTab === 1 }" @click="currentTab = 1">
              <a>
                <div class="tab_icon">
                  <span class="icon_sign"></span>
                  <i>{{ count.signCnt }}</i>
                </div>
                <!-- 인수서명 -->
                <span class="tab_title">{{ $t('message.acceptSign') }}</span>
              </a>
            </li>
            <li :class="{ active: currentTab === 2 }" @click="currentTab = 2">
              <a>
                <div class="tab_icon">
                  <span class="icon_dispatch"></span>
                  <i>{{ count.allCnt }}</i>
                </div>
                <!-- 배차이력 -->
                <span class="tab_title">{{ $t('message.dispatchHistory') }}</span>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div v-show="currentTab == 0">
              <ExitProcessingTab ref="exit" :userCd="userInfo.userCd" @reloadCount="getDriverCount" />
            </div>
            <div v-show="currentTab == 1">
              <SignatureTab ref="sign" :userCd="userInfo.userCd" @changeTab="changeTab" @reloadCount="getDriverCount" />
            </div>
            <div v-show="currentTab == 2">
              <DispatchResumeTab ref="dispatch" :userCd="userInfo.userCd" @reloadCount="getDriverCount" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //컨텐츠 바디 -->
  </div>
</template>
<script>
import ExitProcessingTab from '@m/components/driver/ExitProcessingTab'; //출차처리
import SignatureTab from '@m/components/driver/SignatureTab'; //인수서명
import DispatchResumeTab from '@m/components/driver/DispatchResumeTab'; //배차이력
import { mapGetters, mapMutations } from 'vuex';
import orderApi from '@/api/order/order';

export default {
  components: {
    ExitProcessingTab,
    SignatureTab,
    DispatchResumeTab,
  },
  data() {
    return {
      registClose: false,
      currentTab: 0,
      count: {},
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
    }),
  },
  watch: {
    currentTab(tab) {
      try {
        if (tab == 0) {
          this.$refs.exit.getList();
        } else if (tab == 1) {
          this.$refs.sign.getList();
        } else if (tab == 2) {
          this.$refs.dispatch.getList();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  methods: {
    logout() {
      this.reset();
      let data = {
        notFirst: 'Y',
      };
      if (this.$DWAPI) {
        this.$DWAPI.post(['setStorageData', 'loginInfo', JSON.stringify(data)]);
      }
      this.$router.push('/');
    },
    changeTab(tabNumber) {
      this.currentTab = tabNumber;
    },
    async getDriverCount() {
      try {
        const param = {
          trnCarNum: this.userInfo.userCd,
        };
        const resp = await orderApi.getDriverCount(param);
        this.count = resp.data.rs;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    ...mapMutations('userInfo', ['reset']),
  },
  mounted() {
    this.getDriverCount();
  },
};
</script>

<style></style>
