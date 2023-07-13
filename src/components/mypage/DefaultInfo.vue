<template>
  <!-- 기본정보수정 -->
  <div class="client_section">
    <!-- board 리스트 -->
    <div class="notice_section">
      <div class="mypage_form">
        <h2 class="mypage_title">{{ $t('message.cusDefault') }}</h2>

        <div class="mypage_form_table">
          <table>
            <colgroup>
              <col style="width: 13.3%" />
              <col style="width: 20%" />
              <col style="width: 13.3%" />
              <col style="width: 20%" />
              <col style="width: 13.3%" />
              <col style="width: 20%" />
            </colgroup>
            <tr>
              <th>
                <label class="list_title" for="">{{ $t('message.privacyDt') }}</label>
              </th>
              <td colspan="5">
                <div class="form_input"><input type="text" id="partnerNm" class="t-l solo_input" :value="infoData.privacyDt | vnDateFormatD" disabled /></div>
              </td>
            </tr>
            <tr>
              <th>
                <label class="list_title" for="">{{ $t('message.nm') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <span class="essential" style="width: 100%"> <input type="text" id="partnerNm" class="t-l solo_input" v-model="userNm" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" /> </span>
                </div>
              </td>
              <th>
                <!-- 전화번호 -->
                <label class="list_title" for="">{{ $t('message.phoneNum') }}</label>
              </th>
              <td>
                <div class="form_input" style="width: 100%">
                  <MultiSelect id="Material_Group" v-model="phoneNumCt" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'"></MultiSelect>
                  <!-- <MultiSelect id="" style="width: 100%" class="" v-model="numValue[0]" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect> -->
                </div>
              </td>
              <td style="width: 100%; text-align: center" colspan="2">
                <div class="form_input" style="width: 100%">
                  <input type="text" style="width: 31%" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" id="phone-number01" class="t-c" placeholder="" maxlength="4" v-model="phoneNum[0]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  <i> - </i>
                  <input type="text" style="width: 31%" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" id="phone-number02" class="t-c" placeholder="" maxlength="4" v-model="phoneNum[1]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  <i> - </i>
                  <input type="text" style="width: 31%" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" id="phone-number03" class="t-c" placeholder="" maxlength="4" v-model="phoneNum[2]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                </div>
              </td>
            </tr>
            <tr>
              <!-- <th>
                <label class="list_title" for="">{{ $t('message.pwd') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <span class="essential" style="width: 100%">
                    <input :type="pwdType" style="width: " :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" id="" class="t-l solo_input" placeholder="" v-model="userPs" />
                  </span>
                  <button :class="pwdIcon" style="width: " @click="iconClick()" v-if="browser !== 'EDGE'"></button>
                </div>
              </td> -->
              <th v-if="infoData.menuGrpCd !== 'CUSTOMER' && infoData.menuGrpCd !== 'TRANSCUS'">
                <label class="list_title" for="">{{ $t('message.menuGrp') }}</label>
              </th>
              <div class="form_input" style="width: 100%" v-if="infoData.menuGrpCd !== 'CUSTOMER' && infoData.menuGrpCd !== 'TRANSCUS'">
                <MultiSelect id="Material_Group" v-model="menuGrpCd" :options="menuGrpOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              </div>
              <th>
                <!-- 휴대폰번호 -->
                <label class="list_title" for="">{{ $t('message.cellNum') }}</label>
              </th>
              <td>
                <div class="form_input" style="width: 100%">
                  <MultiSelect id="Material_Group" v-model="mobileNumCt" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                  <!-- <MultiSelect id="" style="width: 100%" class="" v-model="numValue[0]" :options="numOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect> -->
                </div>
              </td>
              <td style="width: 100%; text-align: center" colspan="2">
                <div class="form_input" style="width: 100%">
                  <input type="text" style="width: 31%" id="phone-number01" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" class="t-c" placeholder="" maxlength="4" v-model="mobileNum[0]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  <i> - </i>
                  <input type="text" style="width: 31%" id="phone-number02" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" class="t-c" placeholder="" maxlength="4" v-model="mobileNum[1]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  <i> - </i>
                  <input type="text" style="width: 31%" id="phone-number03" :disabled="this.userMenuGrp !== 'CUSTOMER' && this.userMenuGrp !== 'TRANSCUS'" class="t-c" placeholder="" maxlength="4" v-model="mobileNum[2]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="board_footer">
          <div class="footer_left"></div>
          <!-- 삭제버튼, 저장버튼 -->
          <!-- <div class="footer_right">
            <button class="btn_default btn_temp" @click="reset">초기화</button>
            <button class="btn_default btn_quta" @click="saveInfo">{{ $t('message.btnSave') }}</button>
          </div> -->
        </div>
      </div>
    </div>
    <!-- //board 리스트 -->
  </div>
  <!-- //기본정보수정 -->
</template>

<script>
import { mapGetters } from 'vuex';
import commonApi from '@/api/common';
// import stringUtil from '@/utils/stringUtil';

export default {
  props: ['infoData'],
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      browser: 'userInfo/getBrowser',
      userMenuGrp: 'userInfo/getUserMenuGrpCd',
    }),
  },
  watch: {
    infoData() {
      this.setting();
    },
  },
  data() {
    return {
      userNm: '', //이름
      // userPs: '', //비밀번호
      // pwdType: 'password',
      // pwdIcon: 'btn_view_password on',
      //번호
      numOptions: [],
      phoneNumCt: {},
      phoneNum: [],
      mobileNumCt: {},
      mobileNum: [],
      menuGrpOptions: [],
      menuGrpCd: { text: '', value: '' },
    };
  },
  methods: {
    reset() {
      //초기화 버튼
      this.userNm = '';
      // this.userPs = '';
      this.phoneNumCt = {};
      this.phoneNum = [];
      this.mobileNumCt = {};
      this.mobileNum = [];
    },
    vaild() {
      let vaildCheck = true;
      // const reg = stringUtil.pwdFormatCheck(this.userPs);
      if (this.userNm == '' && (this.userMenuGrp == 'CUSTOMER' || this.userMenuGrp == 'TRANSCUS')) {
        vaildCheck = false;
        this.$EventBus.$emit('openYesModal', 'message.errorsValidUserNm');
        // } else if (this.userPs == '' && (this.userMenuGrp == 'CUSTOMER' || this.userMenuGrp == 'TRANSCUS')) {
        //   vaildCheck = false;
        //   this.$EventBus.$emit('openYesModal', 'message.errorsVaildPwd');
        // } else if (reg == false && (this.userMenuGrp == 'CUSTOMER' || this.userMenuGrp == 'TRANSCUS')) {
        //   vaildCheck = false;
        //   this.$EventBus.$emit('openYesModal', 'message.msgPwdNotice');
      }
      return vaildCheck;
    },
    save() {
      if (this.vaild() == true) {
        let defaultParam = {
          userNm: this.userNm,
          // userPs: this.userPs,
          phoneNumCt: this.phoneNumCt.value,
          phoneNum: this.phoneNum.join('-'),
          mobileNumCt: this.mobileNumCt.value,
          mobileNum: this.mobileNum.join('-'),
          menuGrpCd: this.menuGrpCd.value,
        };
        return defaultParam;
      } else {
        return false;
      }
    },
    setting() {
      this.userNm = this.infoData.userNm;
      this.phoneNumCt = this.numOptions.find(option => option.value == this.infoData.phoneNumCt);
      if (this.infoData.phoneNum) this.phoneNum = this.infoData.phoneNum.split('-');
      this.mobileNumCt = this.numOptions.find(option => option.value == this.infoData.mobileNumCt);
      if (this.infoData.mobileNum) this.mobileNum = this.infoData.mobileNum.split('-');
      if (this.infoData.menuGrpCd !== 'CUSTOMER' && this.infoData.menuGrpCd !== 'TRANSCUS') {
        if (this.infoData.menuGrpInfo) {
          this.menuGrpOptions = this.menuGrpOptions.filter(option => this.infoData.menuGrpInfo.includes(option.value));
        } else {
          this.menuGrpOptions = this.menuGrpOptions.filter(option => option.value === this.infoData.menuGrpCd);
        }
        this.menuGrpCd = this.menuGrpOptions.find(option => option.value === this.infoData.menuGrpCd);
      } else {
        this.menuGrpCd.value = this.infoData.menuGrpCd;
      }
    },
    // iconClick() {
    //   const showType = stringUtil.dataShowBtn(this.pwdType);
    //   this.pwdType = showType.type;
    //   this.pwdIcon = showType.ynShow;
    // },
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
          this.setting();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  async mounted() {
    await this.getCommonCodeCombo('PHONE_CT');
    await this.getCommonCodeCombo('MENU_GROUP');
  },
};
</script>

<style></style>
