<template>
  <div class="wrap">
    <!-- 상단 헤더 -->
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">{{ $t('message.searchPrivacy') }}</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img" @click="pageMove('/signin')"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right"></div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <div class="idpw_contents">
        <span class="logo in_img"><img src="@m/assets/img/logo_header.svg" alt="VRG Dongwha D-Sales" /></span>
        <div id="TabS">
          <ul class="tab-menu">
            <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
              <a @click="[reset(), (currentTab = index)]">{{ tab }}</a>
            </li>
          </ul>
          <div class="tab-content tab-idpw-content">
            <div>
              <section class="login_form idpw_form">
                <div class="form_box" v-show="currentTab === 1">
                  <input id="" type="text" class="login_input" :placeholder="$t('message.inputId')" v-model="userCd" @blur="checkUserCd" />
                  <span class="pw_check_active in_img on" v-show="isShow.userCd"><img src="@m/assets/img/icon_check.png" /></span>
                </div>
                <div class="form_box">
                  <input id="" type="text" class="login_input" :placeholder="$t('message.inputName')" v-model="userNm" />
                  <!-- <span class="pw_check_active in_img on"><img src="@m/assets/img/icon_check.png" /></span> -->
                </div>
                <div class="form_box" v-show="currentTab === 0">
                  <input id="normal_login_pw" :type="[isShow.bizNum ? 'text' : 'password']" class="login_input" :placeholder="$t('message.inputBizNum')" v-model="bizNum" />
                  <button :class="[isShow.bizNum ? 'btn_view_password see' : 'btn_view_password']" @click="isShow.bizNum = !isShow.bizNum"></button>
                </div>
                <div class="form_box" v-show="currentTab === 0">
                  <input id="normal_login_pw" :type="[isShow.custCd ? 'text' : 'password']" class="login_input" :placeholder="$t('message.inputCustCd')" v-model="custCd" />
                  <button :class="[isShow.custCd ? 'btn_view_password see' : 'btn_view_password']" @click="isShow.custCd = !isShow.custCd"></button>
                </div>
                <button class="btn_search_idpw" @click="validation">{{ $t('message.btnSearch') }}</button>
                <p class="alert_txt">
                  <i class="icon_warning" v-show="message !== ''"></i>
                  {{ message }}
                </p>
                <div class="search_result" v-show="serverMessage !== ''">
                  <p class="result_id" v-html="serverMessage"></p>
                  <a class="btn_login_s" @click="pageMove('/signin')">{{ $t('message.loginLink') }}</a>
                </div>
              </section>
            </div>
            <!-- <div v-show="currentTab == 1">
              <section class="login_form idpw_form">
                <div class="form_box">
                  <input id="" type="text" class="login_input on" placeholder="이름을 입력하세요" />
                  <span class="pw_check_active in_img on"><img src="@m/assets/img/icon_check.png" /></span>
                </div>

                <button class="btn_search_idpw">검색</button>
                <p class="alert_txt">
                  <i class="icon_warning"></i>
                  입력하신 정보와 일치하는 정보가 없습니다.
                </p>
                <div class="search_result">
                  <p class="result_id">
                    임시 비밀번호가 등록된
                    <br />이메일 주소로 발송 되었습니다.
                  </p>
                  <a class="btn_login_s" @click="pageMove('/signin')">로그인하기</a>
                </div>
              </section>
            </div> -->
          </div>
        </div>
        <p class="login_footer">Copyright VRG Dongwha MDF. All rights reserved.</p>
      </div>
    </div>
    <!-- //컨텐츠 바디 -->
  </div>
</template>

<script>
import loginApi from '@/api/login';

export default {
  data() {
    return {
      currentTab: 0,
      tabs: [this.$t('message.searchId'), this.$t('message.searchPwd')],
      isShow: {
        userCd: false,
        bizNum: false,
        custCd: false,
      },
      userCd: '',
      userNm: '',
      bizNum: '',
      custCd: '',
      message: '',
      serverMessage: '',
      // eslint-disable-next-line
      idValid: /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/
    };
  },
  methods: {
    reset() {
      this.isShow = {
        userCd: false,
        bizNum: false,
        custCd: false,
      };
      this.userCd = '';
      this.userNm = '';
      this.bizNum = '';
      this.custCd = '';
      this.message = '';
      this.serverMessage = '';
    },
    pageMove(routerPath) {
      this.$router.push(routerPath);
    },
    checkUserCd() {
      // 모바일은 아이디가 이메일 형식만이 아닌것으로 알고있어서 주석 처리, 추후 이메일 형식만으로 변경 시 주석만 제거하면 됨.
      // if (this.userCd.match(this.idValid) === null) {
      //   this.isShow.userCd = false;
      // } else {
      //   this.isShow.userCd = true;
      // }
    },
    validation() {
      if (this.currentTab === 0) {
        if (this.userNm === '') {
          this.message = 'message.inputId';
          return;
        } else if (this.bizNum === '') {
          this.message = 'message.inputBizNum';
          return;
        } else if (this.custCd === '') {
          this.message = 'message.inputCustCd';
          return;
        }
        this.idSearch();
      } else if (this.currentTab === 1) {
        if (this.userCd === '') {
          this.message = 'message.inputId';
          return;
        } else if (this.userNm === '') {
          this.message = 'message.inputName';
          return;
        }
        // 모바일은 아이디가 이메일 형식만이 아닌것으로 알고있어서 주석 처리, 추후 이메일 형식만으로 변경 시 주석만 제거하면 됨.
        // else if (this.userCd.match(this.idValid) === null) {
        //   this.message = '아이디 형식이 올바르지 않습니다.';
        //   return;
        // }
        this.pwSearch();
      }
    },
    async idSearch() {
      try {
        const param = {
          userNm: this.userNm,
          bizNum: this.bizNum,
          custCd: this.custCd,
        };
        const resp = await loginApi.idSearch(param);
        this.serverMessage = `messageYourId1 <br/> <span>${resp.data.rs.userCd}</span> messageYourId2`;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async pwSearch() {
      try {
        const param = {
          userCd: this.userCd,
          userNm: this.userNm,
        };
        const resp = await loginApi.pwSearch(param);
        this.serverMessage = `${resp.data.message}`;
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
};
</script>

<style></style>
