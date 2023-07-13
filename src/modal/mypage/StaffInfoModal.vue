<template>
  <modal name="StaffInfoModal" width="1440" height="auto" :adaptive="true" :clickToClose="false" @before-close="close" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('StaffInfoModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.info') }}</p>
      <div class="modal_content dr_content">
        <div class="master_form" style="width: ">
          <div class="mypage_form_table" style="width: 99%; margin: 10px">
            <table>
              <colgroup>
                <col style="width: 10%" />
                <col style="width: 23%" />
                <col style="width: 10%" />
                <col style="width: 23%" />
                <col style="width: 10%" />
                <col style="width: 23%" />
              </colgroup>
              <tr>
                <th>
                  <label class="list_title" for="">{{ $t('message.id') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" readonly onfocus="this.removeAttribute('readonly')" autocomplete="one-time-code " style="width: 100%" class="t-c" placeholder="" v-model="userCd" oninput="this.value = this.value.replace(/[^0-9a-zA-Z_-.]/g, '');" />
                    @
                    <MultiSelect id="" class="t-c" v-model="domainValue" :options="domainOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                    <input type="text" id="mobile-number03" :class="this.domainValue.value !== 'EAIL02' ? 't-c disabled' : 't-c'" v-model="domain" :disabled="this.domainValue.value !== 'EAIL02'" oninput="this.value = this.value.replace(/[^0-9a-zA-Z.]/g, '');" />
                  </div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.registPwd') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <input :type="[pwdShow.new ? 'text' : 'password']" id="" style="width: 100%" readonly onfocus="this.removeAttribute('readonly')" autocomplete="one-time-code " class="t-l solo_input" placeholder="" v-model="newPassWord" />
                    <button :class="[pwdShow.new ? 'btn_view_password on see' : 'btn_view_password on']" @click="pwdShow.new = !pwdShow.new" v-if="browser !== 'EDGE'"></button>
                  </div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.changeCheck2') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <input :type="[pwdShow.temp ? 'text' : 'password']" id="" style="width: 100%" readonly onfocus="this.removeAttribute('readonly')" autocomplete="one-time-code " class="t-l solo_input" placeholder="" v-model="tempPassWord" />
                    <button :class="[pwdShow.temp ? 'btn_view_password on see' : 'btn_view_password on']" @click="pwdShow.temp = !pwdShow.temp" v-if="browser !== 'EDGE'"></button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <label class="list_title" for="">{{ $t('message.nm') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" style="width: 100%" class="t-l solo_input" placeholder="" v-model="userNm" readonly onfocus="this.removeAttribute('readonly')" autocomplete="one-time-code " />
                  </div>
                </td>
                <th>
                  <!-- 전화번호 -->
                  <label class="list_title" for="">{{ $t('message.phoneNum') }}</label>
                </th>
                <td>
                  <div class="form_input" style="width: 100%">
                    <MultiSelect id="Material_Group" v-model="phoneNumCt" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                    <!-- <MultiSelect id="" style="width: 100%" class="" v-model="numValue[0]" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect> -->
                  </div>
                </td>
                <td style="width: 100%; text-align: center" colspan="2">
                  <div class="form_input" style="width: 100%">
                    <input type="text" style="width: 31%" id="phone-number01" class="t-c" placeholder="" maxlength="4" v-model="phoneNum[0]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" readonly onfocus="this.removeAttribute('readonly')" autocomplete="one-time-code " />
                    <i> - </i>
                    <input type="text" style="width: 31%" id="phone-number02" class="t-c" placeholder="" maxlength="4" v-model="phoneNum[1]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" readonly onfocus="this.removeAttribute('readonly')" autocomplete="one-time-code " />
                    <i> - </i>
                    <input type="text" style="width: 31%" id="phone-number03" class="t-c" placeholder="" maxlength="4" v-model="phoneNum[2]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" readonly onfocus="this.removeAttribute('readonly')" autocomplete="one-time-code " />
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <label class="list_title" for="">{{ $t('message.useYn') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <MultiSelect id="" style="width: 100%" class="" label="text" v-model="useYn" :options="useOptions" :searchable="false" :close-on-select="true" :allow-empty="false" :show-labels="false" placeholder=""></MultiSelect>
                  </div>
                </td>
                <th>
                  <!-- 휴대폰번호 -->
                  <label class="list_title" for="">{{ $t('message.cellNum') }}</label>
                </th>
                <td>
                  <div class="form_input" style="width: 100%">
                    <MultiSelect id="Material_Group" v-model="mobileNumCt" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                    <!-- <MultiSelect id="" style="width: 100%" class="" v-model="numValue[0]" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect> -->
                  </div>
                </td>
                <td style="width: 100%; text-align: center" colspan="2">
                  <div class="form_input" style="width: 100%">
                    <input type="text" style="width: 31%" id="phone-number01" class="t-c" placeholder="" maxlength="4" v-model="mobileNum[0]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    <i> - </i>
                    <input type="text" style="width: 31%" id="phone-number02" class="t-c" placeholder="" maxlength="4" v-model="mobileNum[1]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    <i> - </i>
                    <input type="text" style="width: 31%" id="phone-number03" class="t-c" placeholder="" maxlength="4" v-model="mobileNum[2]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="$modal.hide('StaffInfoModal')">{{ $t('message.btnCancel') }}</button>
          <button class="btn_primary" @click="staffSave">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';
import commonApi from '@/api/common';
import mypageApi from '@/api/mypage/staff';
import stringUtil from '@/utils/stringUtil';

export default {
  components: {},
  name: 'StaffInfoModal',
  props: [],
  computed: {
    ...mapGetters({
      browser: 'userInfo/getBrowser',
    }),
  },
  data() {
    return {
      info: {},
      //아이디
      userCd: '',
      domain: '',
      domainValue: {},
      domainOptions: [],
      //비밀번호
      pwdShow: {
        new: false,
        temp: false,
      },
      newPassWord: '',
      tempPassWord: '',
      //직원이름
      userNm: '',
      //번호
      numOptions: [],
      phoneNumCt: { text: this.$t('message.choice'), value: 'Y' },
      phoneNum: [],
      mobileNumCt: { text: this.$t('message.choice'), value: 'Y' },
      mobileNum: [],
      //사용여부
      useYn: { text: this.$t('message.work'), value: 'Y' },
      useOptions: [
        { text: this.$t('message.work'), value: 'Y' },
        { text: this.$t('message.resignation'), value: 'N' },
      ],
      //수정/저장 여부
      isNew: 'Y', //Y면 신규, N이면 수정
    };
  },
  watch: {
    info(info) {
      if (info !== null) {
        //데이터 세팅
        let email = info.userCd.split('@');
        this.userCd = email[0];
        if (email[1] !== null && email[1] !== '' && email[1] !== undefined) this.domainValue = this.domainOptions.find(domain => domain.text == email[1]);
        if (this.domainValue == undefined) {
          this.domain = email[1];
          this.domainValue = this.domainOptions.find(domain => domain.value == 'EAIL02');
        }
        this.userNm = info.userNm;
        this.phoneNumCt = this.numOptions.find(option => option.value == info.phoneNumCt);
        if (info.phoneNum) this.phoneNum = info.phoneNum.split('-');
        this.mobileNumCt = this.numOptions.find(option => option.value == info.mobileNumCt);
        if (info.mobileNum) this.mobileNum = info.mobileNum.split('-');
        this.useYn = this.useOptions.find(option => option.text == info.useYn);
        this.isNew = 'N';
      } else {
        this.isNew = 'Y';
        this.close();
      }
    },
    domainValue(domain) {
      if (domain.value !== 'EAIL02') {
        this.domain = domain.text;
      }
    },
  },
  methods: {
    vaild() {
      let vaildCheck = true;

      // const idFormat = stringUtil.emailFormatCheck(this.userCd);
      const pwdFormat = stringUtil.pwdFormatCheck(this.newPassWord);
      if (this.userCd == '' || this.domain == '') {
        vaildCheck = false;
        this.$EventBus.$emit('openYesModal', 'message.errorsValidIdCheck');
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
            userCd: this.userCd + '@' + this.domain,
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
          this.$parent.saveSuss();
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      } else {
        //
      }
    },
    open(event) {
      this.info = event.params.info;
    },
    close() {
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
      this.isNew = 'Y';
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'PHONE_CT') {
          //국가번호
          this.numOptions = response.data.ds;
        } else if (groupCd === 'EMAIL_DOMAIN') {
          //국가번호
          this.domainOptions = response.data.ds;
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  mounted() {
    this.getCommonCodeCombo('PHONE_CT');
    this.getCommonCodeCombo('EMAIL_DOMAIN');
  },
};
</script>

<style></style>
