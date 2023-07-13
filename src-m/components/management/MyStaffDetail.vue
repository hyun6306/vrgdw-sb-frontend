<template>
  <div>
    <div class="memberinfoset_contents">
      <div class="list_form_section shipping_section">
        <ul class="list_ul">
          <li class="list_li">
            <label class="list_title">{{ $t('message.id') }}</label>
            <span class="list_form essential">
              <input type="text" class="d_input t-l" placeholder="" v-model="userCd" />
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.registPwd') }}</label>
            <span class="list_form essential">
              <div class="form_box">
                <input id="normal_login_pw" :type="[pwdShow.new ? 'text' : 'password']" class="d_input t-l" :placeholder="$t('message.errorsVaildPwd')" v-model="newPassWord" />
                <button :class="[pwdShow.new ? 'btn_view_password on see' : 'btn_view_password on']" v-if="browser !== 'EDGE'" @click="pwdIcon('new')"></button>
              </div>
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.changeCheck2') }}</label>
            <span class="list_form essential">
              <div class="form_box">
                <input id="normal_login_pw" :type="[pwdShow.temp ? 'text' : 'password']" class="d_input t-l" :placeholder="$t('message.errorsVaildPwd')" v-model="tempPassWord" />
                <button :class="[pwdShow.temp ? 'btn_view_password on see' : 'btn_view_password on']" v-if="browser !== 'EDGE'" @click="pwdIcon('temp')"></button>
              </div>
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.nm') }}</label>
            <span class="list_form essential">
              <input type="text" class="d_input t-l" placeholder="" v-model="userNm" />
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.phoneNumCt') }}</label>
            <span class="list_form essential">
              <MultiSelect id="" style="100%" class="essential" v-model="phoneNumCt" :options="numOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" track-by="text" label="text"></MultiSelect>
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.phoneNum') }}</label>
            <span class="list_form phone_form essential">
              <input type="text" class="d_input" placeholder="0" v-model="phoneNum[0]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              <i> - </i>
              <input type="text" class="d_input" placeholder="0" v-model="phoneNum[1]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              <i> - </i>
              <input type="text" class="d_input" placeholder="0" v-model="phoneNum[2]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.mobileNumCt') }}</label>
            <span class="list_form essential">
              <MultiSelect id="" style="100%" class="essential" v-model="mobileNumCt" :options="numOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" track-by="text" label="text"></MultiSelect>
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.cellNum') }}</label>
            <span class="list_form phone_form essential">
              <input type="text" class="d_input" placeholder="0" v-model="mobileNum[0]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              <i> - </i>
              <input type="text" class="d_input" placeholder="0" v-model="mobileNum[1]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
              <i> - </i>
              <input type="text" class="d_input" placeholder="0" v-model="mobileNum[2]" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
            </span>
          </li>
          <li class="list_li">
            <label class="list_title">{{ $t('message.useYn') }}</label>
            <span class="list_form essential">
              <MultiSelect id="" style="width: 100%" class="" label="text" v-model="useYn" :options="useOptions" :searchable="false" :close-on-select="true" :allow-empty="false" :show-labels="false" placeholder=""></MultiSelect>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 하단 버튼 -->
    <div class="bottom_select_result_contents">
      <div class="btn_box">
        <button class="btn_reset" @click="infoReset">{{ $t('message.btnInit') }}</button>
        <button class="btn_tempsave" @click="staffSave">{{ $t('message.btnSave') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import commonApi from '@/api/common';
import mypageApi from '@/api/mypage/staff';
import stringUtil from '@/utils/stringUtil';

export default {
  data() {
    return {
      infoData: {},
      userCd: '',
      //비밀번호
      pwdShow: {
        new: false,
        temp: false,
      },
      newPassWord: '',
      tempPassWord: '',
      userNm: '', //이름
      //번호
      numOptions: [],
      phoneNumCt: { value: '', text: this.$t('message.choice') },
      phoneNum: [],
      mobileNumCt: { value: '', text: this.$t('message.choice') },
      mobileNum: [],
      //
      useYn: { text: this.$t('message.work'), value: 'Y' },
      useOptions: [
        { text: this.$t('message.work'), value: 'Y' },
        { text: this.$t('message.resignation'), value: 'N' },
      ],
      isNew: 'Y',
    };
  },
  computed: {
    ...mapGetters({
      browser: 'userInfo/getBrowser',
    }),
  },
  methods: {
    pwdIcon(type) {
      //비밀번호 아이콘
      if (type == 'new') {
        this.pwdShow.new = !this.pwdShow.new;
      } else {
        this.pwdShow.temp = !this.pwdShow.temp;
      }
    },
    vaild() {
      let vaildCheck = true;

      const idFormat = stringUtil.emailFormatCheck(this.userCd);
      const pwdFormat = stringUtil.pwdFormatCheck(this.newPassWord);
      if (this.userCd == '') {
        vaildCheck = false;
        this.$EventBus.$emit('openYesModal', 'message.errorsValidIdCheck');
      } else if (idFormat == false) {
        this.$EventBus.$emit('openYesModal', 'message.errorsValidIdForm');
        vaildCheck = false;
      } else if (this.newPassWord == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildPwd');
        vaildCheck = false;
      } else if (this.tempPassWord == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsValidConfirmPwd');
        vaildCheck = false;
      } else if (pwdFormat == false) {
        this.$EventBus.$emit('openYesModal', 'message.msgPwdRule');
        vaildCheck = false;
      } else if (this.newPassWord !== this.tempPassWord) {
        this.$EventBus.$emit('openYesModal', 'message.msgMatchNew');
        vaildCheck = false;
      } else if (this.userNm == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsValidUserNm');
        vaildCheck = false;
      } else if (this.phoneNumCt.value == '' || this.phoneNumCt == undefined || this.phoneNum.join('-').length < 1) {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildPhoneNum');
        vaildCheck = false;
      } else if (this.mobileNumCt.value == '' || this.mobileNumCt == undefined || this.mobileNum.join('-').length < 1) {
        this.$EventBus.$emit('openYesModal', 'message.msgRequireMobileNum');
        vaildCheck = false;
      } else if (this.useYn.value == '' || this.useYn == undefined) {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildUseYn');
        vaildCheck = false;
      }

      return vaildCheck;
    },
    async staffSave() {
      if (this.vaild() == true) {
        try {
          let param = {
            userCd: this.userCd,
            newPassWord: this.newPassWord,
            tempPassWord: this.tempPassWord,
            userNm: this.userNm,
            phoneNumCt: this.phoneNumCt.value,
            phoneNum: this.phoneNum.join('-'),
            mobileNumCt: this.mobileNumCt.value,
            mobileNum: this.mobileNum.join('-'),
            useYn: this.useYn.value,
            isNew: this.isNew,
          };
          await mypageApi.saveStaffList(param);
          this.$EventBus.$emit('openYesModal', 'message.msgSave');
          this.$parent.clickBack();
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    setting(info) {
      if (info !== null) {
        //데이터 세팅
        this.userCd = info.userCd;
        this.userNm = info.userNm;
        if (info.phoneNumCt !== null && info.phoneNumCt !== undefined) this.phoneNumCt = this.numOptions.find(option => option.value == info.phoneNumCt);
        if (info.phoneNum) this.phoneNum = info.phoneNum.split('-');
        if (info.mobileNumCt !== null && info.mobileNumCt !== undefined) this.mobileNumCt = this.numOptions.find(option => option.value == info.mobileNumCt);
        if (info.mobileNum) this.mobileNum = info.mobileNum.split('-');
        if (info.useYn !== null && info.useYn !== undefined) this.useYn = this.useOptions.find(option => option.value == info.useYn);
        this.isNew = 'N';
      } else {
        this.isNew = 'Y';
        this.infoReset();
      }
    },
    infoReset() {
      //초기화
      this.userCd = '';
      this.newPassWord = '';
      this.tempPassWord = '';
      this.userNm = '';
      this.phoneNumCt = { text: this.$t('message.choice'), value: 'Y' };
      this.phoneNum = [];
      this.mobileNumCt = { text: this.$t('message.choice'), value: 'Y' };
      this.mobileNum = [];
      this.useYn = { text: this.$t('message.work'), value: 'Y' };
      this.pwdShow = {
        new: false,
        temp: false,
      };
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
  },
};
</script>

<style></style>
