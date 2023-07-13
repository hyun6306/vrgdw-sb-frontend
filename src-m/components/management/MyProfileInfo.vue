<template>
  <div>
    <div class="memberinfoset_contents">
      <div class="list_form_section shipping_section">
        <ul class="list_ul">
          <li class="list_li">
            <label class="list_title">{{ $t('message.privacyDt') }}</label>
            <span class="list_form">
              <input type="text" class="d_input t-l" placeholder="" :value="infoData.privacyDt | vnDateFormatD" disabled />
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.nm') }}</label>
            <span class="list_form essential">
              <input type="text" class="d_input t-l" placeholder="" v-model="userNm" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" />
            </span>
          </li>
          <!-- <li class="list_li">
            <label class="list_title">{{ $t('message.pwd') }}</label>
            <span class="list_form essential">
              <div class="form_box">
                <input id="normal_login_pw" :type="[pwdShow ? 'text' : 'password']" class="d_input t-l" :placeholder="$t('message.errorsVaildPwd')" v-model="userPw" />
                <button :class="[pwdShow ? 'btn_view_password on see' : 'btn_view_password on']" v-if="browser !== 'EDGE'" @click="pwdIcon"></button>
              </div>
            </span>
          </li> -->
          <li class="list_li">
            <label class="list_title">{{ $t('message.phoneNumCt') }}</label>
            <span class="list_form essential">
              <MultiSelect id="" style="100%" class="essential" v-model="phoneNumCt" :options="numOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" track-by="text" label="text" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'"></MultiSelect>
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.phoneNum') }}</label>
            <span class="list_form phone_form essential">
              <input type="text" class="d_input" placeholder="0" v-model="phoneNum[0]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" />
              <i> - </i>
              <input type="text" class="d_input" placeholder="0" v-model="phoneNum[1]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" />
              <i> - </i>
              <input type="text" class="d_input" placeholder="0" v-model="phoneNum[2]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" />
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.mobileNumCt') }}</label>
            <span class="list_form essential">
              <MultiSelect id="" style="100%" class="essential" v-model="mobileNumCt" :options="numOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" track-by="text" label="text" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'"></MultiSelect>
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.cellNum') }}</label>
            <span class="list_form phone_form essential">
              <input type="text" class="d_input" placeholder="0" v-model="mobileNum[0]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" />
              <i> - </i>
              <input type="text" class="d_input" placeholder="0" v-model="mobileNum[1]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" />
              <i> - </i>
              <input type="text" class="d_input" placeholder="0" v-model="mobileNum[2]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" />
            </span>
          </li>
          <li class="list_li" v-if="infoData.menuGrpCd !== 'CUSTOMER' && infoData.menuGrpCd !== 'TRANSCUS'">
            <label class="list_title">{{ $t('message.menuGrp') }}</label>
            <span class="list_form essential">
              <MultiSelect id="" style="100%" class="essential" v-model="menuGrpCd" :options="menuGrpOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" track-by="text" label="text"></MultiSelect>
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.pushSet') }}</label>
            <span class="list_form mail_form">
              <label class="chechbox_basic">
                <input id="checkBox" ref="checkBox" type="checkbox" v-model="pushYn" true-value="Y" false-value="N" />
                <span class="checkmark"></span>PUSH
              </label>
              <label class="chechbox_basic">
                <input id="checkBox" ref="checkBox" type="checkbox" v-model="emailYn" true-value="Y" false-value="N" />
                <span class="checkmark"></span>EMAIL
              </label>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 하단 버튼 -->
    <div class="bottom_select_result_contents">
      <div class="btn_box">
        <button class="btn_reset" v-if="authButton.fn3Auth == 'Y'" @click="infoReset">{{ $t('message.btnInit') }}</button>
        <button class="btn_change" v-if="authButton.fn4Auth == 'Y'" @click="chgPwd('btn')">{{ $t('message.btnChangePwd') }}</button>
        <button class="btn_tempsave" v-if="authButton.savAuth == 'Y'" @click="infoSave('info')">{{ $t('message.btnSave') }}</button>
      </div>
    </div>
    <PwChangeModal />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import commonApi from '@/api/common';
import myInfoApi from '@/api/mypage/myInfo';
// import stringUtil from '@/utils/stringUtil';
import PwChangeModal from '@m/modal/login/PwChangeModal';
export default {
  data() {
    return {
      infoData: {},
      userNm: '', //이름
      userPw: '', //비밀번호
      // pwdShow: false,
      //번호
      numOptions: [],
      phoneNumCt: { value: '', text: this.$t('message.choice') },
      phoneNum: [],
      mobileNumCt: { value: '', text: this.$t('message.choice') },
      mobileNum: [],
      //
      pushYn: 'N',
      emailYn: 'N',
      menuGrpOptions: [],
      menuGrpCd: { text: '', value: '' },
    };
  },
  props: ['oldPwd'],
  watch: {
    oldPwd() {
      this.userPw = this.oldPwd;
      this.loadInfo();
    },
  },
  components: { PwChangeModal },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
      browser: 'userInfo/getBrowser',
      userMenuGrp: 'userInfo/getUserMenuGrpCd',
    }),
  },
  methods: {
    // pwdIcon() {
    //   //비밀번호 아이콘
    //   this.pwdShow = !this.pwdShow;
    // },
    vaild() {
      let vaildCheck = true;
      // const reg = stringUtil.pwdFormatCheck(this.userPw);
      if (this.userNm == '') {
        vaildCheck = false;
        this.$EventBus.$emit('openYesModal', 'message.errorsValidUserNm');
        // } else if (this.userPw == '') {
        //   vaildCheck = false;
        //   this.$EventBus.$emit('openYesModal', 'message.errorsVaildPwd');
        // } else if (reg == false) {
        //   vaildCheck = false;
        //   this.$EventBus.$emit('openYesModal', 'message.msgPwdNotice');
      }

      return vaildCheck;
    },
    chgPwd(type, pwd = '') {
      if (type == 'btn') {
        this.$modal.show('PwChangeModal', { userPs: this.oldPwd, type: 'myInfo' });
      } else if (type == 'modal') {
        this.infoSave('pwd', pwd);
      }
    },
    async infoSave(type, pwd = '') {
      //저장
      let param = {};
      try {
        if (this.vaild() && type == 'info') {
          param = {
            menuGrpCd: this.menuGrpCd.value,
            userPs: this.userPw,
            userNm: this.userNm,
            phoneNumCt: this.phoneNumCt.value,
            phoneNum: this.phoneNum.join('-'),
            mobileNumCt: this.mobileNumCt.value,
            mobileNum: this.mobileNum.join('-'),
            pushYn: this.pushYn,
            emailYn: this.emailYn,
          };
          await myInfoApi.saveMyInfoSave(param);
          this.loadInfo();
          this.$EventBus.$emit('openYesModal', 'message.msgModifiedInfo');
        } else if (type == 'pwd') {
          param = {
            userPs: pwd,
            userNm: this.infoData.userNm,
            phoneNumCt: this.infoData.phoneNumCt,
            phoneNum: this.infoData.phoneNum,
            mobileNumCt: this.infoData.mobileNumCt,
            mobileNum: this.infoData.mobileNum,
            pushYn: this.infoData.pushYn,
            emailYn: this.infoData.emailYn,
            menuGrpCd: this.infoData.menuGrpCd,
          };
          await myInfoApi.saveMyInfoSave(param);
          this.userPw = pwd;
          this.$modal.hide('PwChangeModal');
          this.loadInfo();
          this.$EventBus.$emit('openYesModal', 'message.msgModifiedInfo');
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async loadInfo() {
      //개인정보상세 조회
      try {
        const response = await myInfoApi.getMyInfo();
        this.infoData = response.data.rs;
        this.setting();
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setting() {
      this.userNm = this.infoData.userNm;
      if (this.infoData.phoneNumCt !== null && this.infoData.phoneNumCt !== undefined) this.phoneNumCt = this.numOptions.find(option => option.value == this.infoData.phoneNumCt);
      if (this.infoData.phoneNum) this.phoneNum = this.infoData.phoneNum.split('-');
      if (this.infoData.mobileNumCt !== null && this.infoData.mobileNumCt !== undefined) this.mobileNumCt = this.numOptions.find(option => option.value == this.infoData.mobileNumCt);
      if (this.infoData.mobileNum) this.mobileNum = this.infoData.mobileNum.split('-');
      this.pushYn = this.infoData.pushYn;
      this.emailYn = this.infoData.emailYn;
      if (this.infoData.menuGrpCd !== 'CUSTOMER' && this.infoData.menuGrpCd !== 'TRANSCUS') {
        if (this.infoData.menuGrpInfo) {
          this.menuGrpOptions = this.menuGrpOptions.filter(option => this.infoData.menuGrpInfo.includes(option.value));
        } else {
          this.menuGrpOptions = this.menuGrpOptions.filter(option => option.value === this.infoData.menuGrpCd);
        }
        this.menuGrpCd = this.menuGrpOptions.find(option => option.value === this.infoData.menuGrpCd);
      } else {
        this.menuGrpCd = this.menuGrpOptions.find(option => option.value === this.infoData.menuGrpCd);
      }
    },
    infoReset() {
      //초기화
      this.userNm = '';
      this.userPw = '';
      this.phoneNumCt = { value: '', text: this.$t('message.choice') };
      this.phoneNum = [];
      this.mobileNumCt = { value: '', text: this.$t('message.choice') };
      this.mobileNum = [];
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: '',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'PHONE_CT') {
          //국가번호
          this.numOptions = response.data.ds;
          this.setting();
        } else if (groupCd === 'MENU_GROUP') {
          this.menuGrpOptions = response.data.ds;
          // this.setting();
        }
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
  async mounted() {
    await this.getCommonCodeCombo('PHONE_CT');
    await this.getCommonCodeCombo('MENU_GROUP');
    await this.loadInfo();
  },
};
</script>

<style></style>
