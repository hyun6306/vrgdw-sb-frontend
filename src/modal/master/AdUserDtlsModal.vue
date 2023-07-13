<template>
  <modal name="AdUserDtlsModal" width="1500" height="auto" :adaptive="true" :clickToClose="false" @before-open="open" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('AdUserDtlsModal')"></button>
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
                  <label class="list_title" for="">{{ $t('message.userCd') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" style="width: 100%" class="t-l solo_input disabled" placeholder="" v-model="userCd" disabled />
                  </div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.nm') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <span class="essential" style="width: 100%">
                      <input type="text" id="" style="width: 100%" class="t-l solo_input" placeholder="" v-model="userNm" />
                    </span>
                  </div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.menuGrp') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <!-- <MultiSelect v-if="this.id !== null" id="" style="width: 100%" class="" label="text" v-model="menuGrpCd" :disabled="this.custYn == true" :options="reqMenuGrpOptions" :searchable="false" :close-on-select="true" :allow-empty="false" :show-labels="false" placeholder="선택"></MultiSelect> -->
                    <span class="essential" style="width: 100%">
                      <MultipleSelect v-if="this.id !== null" style="width: 100%" :options="reqMenuGrpOptions" :default="this.default" :page="'ad'" @select="cds => setCd(cds, 'menuGrpCd')" v-model="menuGrpCd" ref="multi_menuGrpCd" :searchable="false" :close-on-select="false" :show-labels="false" :allow-empty="false" label="text" />
                      <MultipleSelect v-if="!this.id && this.rowData && !this.custYn" style="width: 100%" :options="menuGrpOptions" :default="this.default" :page="'ad'" @select="cds => setCd(cds, 'menuGrpCd')" v-model="menuGrpCd" ref="multi_menuGrpCd" :searchable="false" :close-on-select="false" :show-labels="false" :allow-empty="false" label="text" />
                      <MultipleSelect v-if="!this.id && this.rowData && this.custYn" style="width: 100%" :options="custMenuGrpOptions" :default="this.default" :page="'ad'" @select="cds => setCd(cds, 'menuGrpCd')" :disabled="this.custYn" v-model="menuGrpCd" ref="multi_menuGrpCd" :searchable="false" :close-on-select="false" :show-labels="false" :allow-empty="false" label="text" />
                    </span>
                    <!-- <MultipleSelect style="width: 100%" :class="[this.custYn == true ? 'disabled' : '']" ref="multi_menuGrpCd" v-model="menuGrpCd" @select="cds => setCd(cds, 'menuGrpCd')" :options="menuGrpOptions" :dataKey="'menuGrpCd'" /> -->
                    <!-- <MultiSelect id="" style="width: 100%" label="text" v-model="menuGrpCd" :disabled="this.custYn == true" :options="menuGrpOptions" :searchable="false" :close-on-select="true" :allow-empty="false" :show-labels="false" placeholder="선택"></MultiSelect> -->
                  </div>
                </td>
              </tr>
              <tr>
                <th>
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
                    <input type="text" style="width: 31%" id="phone-number01" class="t-c" placeholder="" maxlength="4" v-model="phoneNum[0]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    <i> - </i>
                    <input type="text" style="width: 31%" id="phone-number02" class="t-c" placeholder="" maxlength="4" v-model="phoneNum[1]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    <i> - </i>
                    <input type="text" style="width: 31%" id="phone-number03" class="t-c" placeholder="" maxlength="4" v-model="phoneNum[2]" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  </div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.dept') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="t-l solo_input" placeholder="" v-model="deptNm" />
                    <!-- <MultiSelect id="" style="width: 100%" class="" label="text" v-model="deptCd" :options="deptOptions" :searchable="false" :close-on-select="true" :allow-empty="false" :show-labels="false" placeholder="선택"></MultiSelect> -->
                  </div>
                </td>
              </tr>
              <tr>
                <th>
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
                <th>
                  <label class="list_title" for="">{{ $t('message.inlineNum') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <input type="text" id="phone-number" class="t-c solo_input" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="inlineNum" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <label class="list_title" for="">{{ $t('message.email') }}</label>
                </th>
                <td style="width: 100%; text-align: center" colspan="3">
                  <div class="form_input" style="width: 100%">
                    <input type="text" id="mobile-number01" class="" placeholder="" v-model="email[0]" oninput="this.value = this.value.replace(/[^0-9a-zA-Z._-]/g, '');" />
                    <i>@ </i>
                    <MultiSelect id="" style="width: 100%" class="" v-model="domainValue" :options="domainOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                    <input type="text" id="mobile-number03" :class="this.domainValue.value !== 'EAIL02' ? 'disabled' : ''" v-model="domain" :disabled="this.domainValue.value !== 'EAIL02'" oninput="this.value = this.value.replace(/[^0-9a-zA-Z.]/g, '');" />
                  </div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.position') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" style="width: 100%" class="t-l solo_input" placeholder="" v-model="positNm" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <label class="list_title" for="">{{ $t('message.companyCode') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <!-- <span class="essential" style="width: 100%"> -->
                    <input type="text" id="" style="width: 100%" class="t-l solo_input disabled" disabled placeholder="" v-model="compCd" />
                    <!-- </span> -->
                  </div>
                </td>
                <th v-if="custYn == false">
                  <label class="list_title" for="">{{ $t('message.compId') }}</label>
                </th>
                <td v-if="custYn == false">
                  <div class="form_input">
                    <!-- <span class="essential" style="width: 100%"> -->
                    <input type="text" id="" style="width: 100%" class="t-c disabled" disabled :placeholder="$t('message.exceptD')" v-model="erpEmpNum" maxlength="7" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    <!-- </span> -->
                  </div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.job') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <!-- <span class="essential" style="width: 100%"> -->
                    <MultiSelect id="" style="width: 100%" class="" label="text" v-model="degreeCd" :options="degreeOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="선택"></MultiSelect>
                    <!-- </span> -->
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <label class="list_title" for="">{{ $t('message.useLang') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <span class="essential" style="width: 100%">
                      <MultiSelect id="" label="text" style="width: 100%" class="" v-model="langCd" :options="langOptions" :searchable="false" :close-on-select="true" :allow-empty="false" :show-labels="false" placeholder="선택"></MultiSelect>
                    </span>
                  </div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.useYn') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <MultiSelect id="" style="width: 100%" class="" label="text" v-model="useCd" :options="useOptions" :searchable="false" :close-on-select="true" :allow-empty="false" :show-labels="false" placeholder=""></MultiSelect>
                  </div>
                </td>
                <!--                <th>-->
                <!--                  <label class="list_title" for="">{{ $t('message.roles') }}</label>-->
                <!--                </th>-->
                <!--                <td>-->
                <!--                  <div class="form_input">-->
                <!--                    <MultipleSelect style="width: 100%" :options="authGroupOptions" :default="roleList" :page="'ad'" v-model="roleList" @select="cds => setRoles(cds)" />-->
                <!--                  </div>-->
                <!--                </td>-->
              </tr>
              <tr>
                <th>
                  <label class="list_title" for="">{{ $t('message.remark') }}</label>
                </th>
                <td colspan="3">
                  <div class="form_input">
                    <input type="text" id="" style="width: 100%" class="t-l solo_input" placeholder="" v-model="remark" />
                  </div>
                </td>
                <td colspan="2">
                  <label class="chechbox_basic" style="float: left; margin-left: 50px">
                    <input id="checkBox" ref="checkBox" type="checkbox" v-model="pushYn" true-value="Y" false-value="N" />
                    <span class="checkmark"></span>
                    PUSH
                  </label>
                  <label class="chechbox_basic" style="float: left; margin-left: 50px">
                    <input id="checkBox" ref="checkBox" type="checkbox" v-model="emailYn" true-value="Y" false-value="N" />
                    <span class="checkmark"></span>
                    EMAIL
                  </label>
                </td>
              </tr>
            </table>
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_default" @click="$modal.hide('AdUserDtlsModal')">{{ $t('message.btnCancel') }}</button>
            <button class="btn_primary" @click="saveInfo">{{ $t('message.btnSave') }}</button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import commonApi from '@/api/common';
import masterApi from '@/api/master/master';
import MultipleSelect from '@/components/commonComponent/MultipleSelect';

export default {
  name: 'AdUserDtlsModal',
  components: { MultipleSelect },
  data() {
    return {
      id: null,
      rowData: {},
      loadData: '',
      custYn: false,
      //
      userNm: '', //이름
      userCd: '', //???
      //메뉴그룹
      reqMenuGrpOptions: [],
      custMenuGrpOptions: [],
      menuGrpOptions: [],
      menuGrpCd: '',
      //번호
      numOptions: [],
      phoneNumCt: { value: '', text: this.$t('message.choice') },
      phoneNum: [],
      mobileNumCt: { value: '', text: this.$t('message.choice') },
      mobileNum: [],
      inlineNum: '',
      //부서
      // deptOptions: [],
      // deptCd: { value: '', text: this.$t('message.choice') },
      deptNm: '',
      //이메일
      email: [],
      domainOptions: [],
      domainValue: { value: '', text: this.$t('message.choice') },
      domain: '',
      //
      positNm: '', //직급명
      compCd: '',
      erpEmpNum: '', //사번
      //직종
      degreeOptions: [],
      degreeCd: { value: '', text: this.$t('message.choice') },
      //사용언어
      langCd: { text: 'KOREA', value: 'ko' },
      langOptions: [
        { text: 'KOREA', value: 'ko' },
        { text: 'ENGLISH', value: 'en' },
        { text: 'VIETNAM', value: 'vn' },
      ],
      //사용여부
      useOptions: [
        { text: 'Y', value: 'Y' },
        { text: 'N', value: 'N' },
      ],
      useCd: { text: 'Y', value: 'Y' },
      //
      remark: '',
      pushYn: 'N',
      emailYn: 'N',
      default: [],
      authGroupOptions: [],
      roleList: [],
    };
  },
  watch: {
    userCd(data) {
      let regex = new RegExp('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
      if (!regex.test(data) && data[0] === 'D') {
        this.custYn = false;
        this.authGroupOptions.forEach(opt => (opt.$isDisabled = false));
      } else {
        this.custYn = true;
        // 사용자 롤 옵션
        this.authGroupOptions.forEach(opt => {
          if (opt.value !== 'ROLE_USER') {
            opt.$isDisabled = true;
          }
        });
      }
    },
    /*
    // custYn 체크는 로드 시 userCd로 대체(userCd 가 이메일형태가 아니고 앞자리 "D" 내부사용자) : 20221226
    default(data) {
      this.custYn = false;
      data.forEach(menu => {
        if (!this.custYn) {
          if (menu == 'CUSTOMER' || menu == 'TRANSCUS' || menu == 'CAR_DRIVER') {
            //메뉴그룹이 고객이면
            this.custYn = true;
          } else {
            this.custYn = false;
          }
        }
      });
    },
    */
    loadData() {
      this.setData();
    },
    domainValue() {
      if (this.domainValue.value !== 'EAIL02') {
        this.domain = '';
        this.email[1] = this.domainValue.text;
      }
    },
    domain() {
      if (this.domainValue.value == 'EAIL02') {
        this.email[1] = this.domain;
      }
    },
    phoneNum() {
      if (this.phoneNum.length > 3 && Array.isArray(this.phoneNum) == true) {
        this.phoneNum.shift();
      }
    },
    mobileNum() {
      if (this.mobileNum.length > 3 && Array.isArray(this.mobileNum) == true) {
        this.mobileNum.shift();
      }
    },
  },
  methods: {
    async getInfo() {
      try {
        let param = { id: this.id };
        const response = await masterApi.getReqUserInfo(param);
        this.loadData = response.data.rs;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setRoles(cds) {
      let roles = cds.map(obj => obj.value);
      this.roleList = roles;
    },
    setCd(cds, kind) {
      let cd = this.makeCd(cds);
      kind;
      this.menuGrpCd = cd;
    },
    makeCd(cds) {
      let cd = '';
      for (let i = 0; i < cds.length; i++) {
        cd = cd + cds[i].value + ',';
      }
      return cd;
    },
    SetRowData() {
      this.userCd = this.rowData.userCd;
      this.compCd = this.rowData.compCd;
      this.userNm = this.rowData.userNm;
      this.phoneNumCt = this.numOptions.find(option => option.value == this.rowData.phoneNumCt);
      if (this.rowData.phoneNum) this.phoneNum = this.rowData.phoneNum.split('-');
      this.mobileNumCt = this.numOptions.find(option => option.value == this.rowData.mobileNumCt);
      if (this.rowData.mobileNum) this.mobileNum = this.rowData.mobileNum.split('-');
      this.inlineNum = this.rowData.inlineNum;
      if (this.rowData.email) {
        this.email = this.rowData.email.split('@');
        this.domainValue = this.domainOptions.find(option => option.text == this.email[1]);
        if (this.domainValue == undefined || this.domainValue.value == '') {
          this.domain = this.email[1];
          this.domainValue = this.domainOptions.find(option => option.value == 'EAIL02');
        }
      }
      this.deptNm = this.rowData.deptNm;
      // this.deptCd = this.deptOptions.find(option => option.value == this.rowData.erpDeptCd);
      this.positNm = this.rowData.positNm;
      this.degreeCd = this.degreeOptions.find(option => option.value == this.rowData.degreeCd);
      this.langCd = this.langOptions.find(option => option.value == this.rowData.language);
      this.useCd = this.useOptions.find(option => option.value == this.rowData.useYn);
      this.pushYn = this.rowData.pushYn;
      this.emailYn = this.rowData.emailYn;
      this.remark = this.rowData.remark;
      this.erpEmpNum = this.rowData.erpEmpNum;
      if (this.rowData.menuGrpInfo) {
        this.default = [];
        const menuGrpInfo = this.rowData.menuGrpInfo.split(',').filter(ele => ele !== '');
        this.default.push(...menuGrpInfo);
      } else {
        this.default = [];
        // this.menuGrpCd = this.menuGrpOptions.find(option => option.value == this.rowData.menuGrpCd);
        this.default.push(this.rowData.menuGrpCd);
      }
      this.roleList = [];
      if (this.rowData.roleList) {
        let rl = this.rowData.roleList.split(',').filter(ele => ele !== '');
        this.roleList = [...rl];
      }
    },
    setData() {
      this.custYn = false;
      this.userCd = 'D' + this.loadData.empNum;
      this.userNm = this.loadData.userNm;
      if (this.menuGrpInfo) {
        this.default = this.rowData.menuGrpInfo.split(',');
      } else if (this.custYn) {
        //custMenuGrpOptions
        this.custMenuGrpOptions = this.menuGrpOptions.find(option => option.value == this.loadData.menuGrpCd);
      } else {
        this.menuGrpCd = this.menuGrpOptions.find(option => option.value == this.loadData.menuGrpCd);
      }
      this.phoneNumCt = this.numOptions.find(option => option.value == this.loadData.phoneNumCt);
      if (this.loadData.phoneNum) this.phonesNum = this.loadData.phoneNum.split('-');
      this.mobileNumCt = this.numOptions.find(option => option.value == this.loadData.mobileNumCt);
      if (this.loadData.mobileNum) this.mobileNum = this.loadData.mobileNum.split('-');
      this.inlineNum = this.loadData.inlineNum;
      if (this.loadData.email) {
        this.email = this.loadData.email.split('@');
        this.domainValue = this.domainOptions.find(option => option.text == this.email[1]);
        if (this.domainValue == undefined || this.domainValue.value == '') {
          this.domain = this.email[1];
          this.domainValue = this.domainOptions.find(option => option.value == 'EAIL02');
        }
      }
      this.deptNm = this.loadData.deptNm;
      // this.deptCd = this.deptOptions.find(option => option.value == this.loadData.deptCd);
      this.positNm = this.loadData.positNm;
      this.compCd = this.loadData.compCd;
      this.erpEmpNum = this.loadData.empNum;
      this.degreeCd = this.degreeOptions.find(option => option.value == this.loadData.degreeCd);
      this.remark = this.loadData.remark;
      this.langCd = this.langOptions.find(option => option.value == this.loadData.language);
      this.pushYn = this.loadData.pushYn ?? 'N';
      this.emailYn = this.loadData.emailYn ?? 'N';
      this.useCd = this.useOptions.find(option => option.value == this.loadData.useYn);
    },
    vaild() {
      let vaildCheck = true;

      if (this.userNm == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsValidUserNm');
        vaildCheck = false;
      } else if (this.menuGrpCd == '' || !this.menuGrpCd) {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildMenuGrp');
        vaildCheck = false;
        // } else if (this.deptNm == '') {
        //   // } else if (this.deptCd == undefined || this.deptCd.value == '') {
        //   this.$EventBus.$emit('openYesModal', 'message.errorsVaukdDeotCd');
        //   vaildCheck = false;
      } else if (this.compCd == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildCompCd');
        vaildCheck = false;
      } else if (this.erpEmpNum == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildEmpNum');
        vaildCheck = false;
        // } else if (this.degreeCd == undefined || this.degreeCd.value == '') {
        //   this.$EventBus.$emit('openYesModal', 'message.errorsVaildDegree');
        //   vaildCheck = false;
      } else if (this.langCd == undefined || this.langCd.value == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildLang');
        vaildCheck = false;
        // } else if (this.roleList.length == 0) {
        //   this.$EventBus.$emit('openYesModal', 'message.errorsVaildRole');
        //   vaildCheck = false;
      }

      return vaildCheck;
    },
    async saveInfo() {
      if (this.vaild()) {
        try {
          let param = {
            userCd: this.userCd,
            userNm: this.userNm,
            menuGrpCd: this.menuGrpCd.split(',')[0],
            menuGrpInfo: this.menuGrpCd
              .split(',')
              .filter(cd => cd != '')
              .join(','),
            phoneNum: this.phoneNum.join('-'),
            mobileNum: this.mobileNum.join('-'),
            inlineNum: this.inlineNum,
            email: this.email.join('@'),
            deptNm: this.deptNm,
            // deptNm: this.deptCd.text,
            positNm: this.positNm,
            compCd: this.compCd,
            // erpDeptCd: this.deptCd.value,
            erpEmpNum: this.erpEmpNum,
            degreeCd: this.degreeCd ? this.degreeCd.value : '',
            remark: this.remark,
            language: this.langCd.value,
            pushYn: this.pushYn,
            emailYn: this.emailYn,
            useYn: this.useCd.value,
            // roles: this.roleList.join(',') || '',
          };
          if (this.phoneNumCt) param = { ...param, ...{ phoneNumCt: this.phoneNumCt.value } };
          if (this.mobileNumCt) param = { ...param, ...{ mobileNumCt: this.mobileNumCt.value } };
          await masterApi.putUserSave(param);
          this.$parent.showModal('suss');
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    open(event) {
      this.id = event.params.id;
      this.rowData = event.params.rowData;
      if (this.id !== null) {
        this.getInfo();
      } else if (this.rowData !== null) {
        this.SetRowData();
      }
    },
    close() {
      this.userCd = '';
      this.userNm = '';
      // this.menuGrpCd = { value: '', text: this.$t('message.choice') };
      this.menuGrpCd = '';
      this.phoneNumCt = { value: '', text: this.$t('message.choice') };
      this.phoneNum = [];
      this.mobileNumCt = { value: '', text: this.$t('message.choice') };
      this.mobileNum = [];
      this.inlineNum = '';
      this.deptNm = '';
      // this.deptCd = { value: '', text: this.$t('message.choice') };
      this.email = [];
      this.domainValue = { value: '', text: this.$t('message.choice') };
      this.domain = '';
      this.positNm = '';
      this.compCd = '';
      this.erpEmpNum = '';
      this.degreeCd = { value: '', text: this.$t('message.choice') };
      this.langCd = { text: 'KOREA', value: 'ko' };
      this.useCd = { text: 'Y', value: 'Y' };
      this.remark = '';
      this.emailYn = 'N';
      this.pushYn = 'N';

      this.rowData = {};
      this.default = [];
      // this.roleList = { value: '', text: this.$t('message.choice') };
      // this.authGroupOptions = [];
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'DEGREE_CD') {
          this.degreeOptions = response.data.ds;
          // if (this.degreeOptions.length > 0) this.degreeCd = this.degreeOptions[0];
        } else if (groupCd === 'MENU_GROUP') {
          let menuGroup = response.data.ds;
          // this.menuGrpOptions = response.data.ds;
          menuGroup.forEach(menu => {
            // if (menu.value === 'SYSTEM_MANAGER' || menu.value == 'VRGDW_SALES' || menu.value == 'VRGDW_SNOP' || menu.value == 'VRGDW_TRAN') {
            //   this.reqMenuGrpOptions.push(menu);
            //   this.menuGrpOptions.push(menu);
            // } else
            if (menu.value !== 'CUSTOMER' && menu.value !== 'TRANSCUS' && menu.value !== 'CAR_DRIVER') {
              this.reqMenuGrpOptions.push(menu);
              this.menuGrpOptions.push(menu);
            } else {
              this.custMenuGrpOptions.push(menu);
            }
          });
        } else if (groupCd == 'PHONE_CT') {
          this.numOptions = response.data.ds;
        } else if (groupCd === 'EMAIL_DOMAIN') {
          //이메일주소
          this.domainOptions = response.data.ds;
        } else if (groupCd === 'AUTH_GROUP') {
          this.authGroupOptions = response.data.ds;
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // async getDeptCombo() {
    //   try {
    //     const resp = await masterApi.getDeptCombo();
    //     this.deptOptions = resp.data.ds;
    //     // this.deptCd = this.deptOptions[0];
    //   } catch (e) {
    //     if (e && e.err && e.err.data && e.err.data.message) {
    //       this.$EventBus.$emit('openYesModal', e.err.data.message);
    //     } else {
    //       this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
    //     }
    //   }
    // },
  },
  async mounted() {
    await this.getCommonCodeCombo('DEGREE_CD');
    await this.getCommonCodeCombo('MENU_GROUP');
    await this.getCommonCodeCombo('PHONE_CT');
    await this.getCommonCodeCombo('EMAIL_DOMAIN', '');
    await this.getCommonCodeCombo('AUTH_GROUP');
    // await this.getDeptCombo();
  },
};
</script>

<style></style>
