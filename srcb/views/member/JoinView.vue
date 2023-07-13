<template>
  <div class="join_wrap">
    <div class="join_container">
      <span class="logo"><img src="@/assets/img/logo.png" /></span>
      <h1>Sign Up</h1>
      <small>To complete the D-Sales online membership, please agree to the policy below and change the password</small>

      <div class="join_agree">
        <h2>Membership agreement information</h2>
        <ul>
          <li class="check_agree">
            <label class="chechbox_basic">
              <input type="checkbox" />
              <span class="checkmark"></span> Consent to service terms and conditions
            </label>
            <a class="btn_gray">
              View the full text
              <i class="icon_go"></i>
            </a>
          </li>
          <li class="check_agree">
            <label class="chechbox_basic">
              <input type="checkbox" />
              <span class="checkmark"></span> Consent to use personal information
            </label>
            <a class="btn_gray">
              View the full text
              <i class="icon_go"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="join_form">
        <h2>Customer Basic Information</h2>

        <div class="join_form_table">
          <table>
            <colgroup>
              <col style="width: 18%" />
              <col style="width: 30%" />
              <col style="width: 22%" />
              <col style="width: 30%" />
            </colgroup>
            <tr>
              <th><label class="list_title" for="customer-name">Customer Name</label></th>
              <td>
                <div class="form_input"><input type="text" id="customer-name" class="t-l solo_input disabled" disabled placeholder="Company" /></div>
              </td>
              <th><label class="list_title" for="customer-code">Customer Code</label></th>
              <td>
                <div class="form_input"><input type="text" id="customer-code" class="t-r solo_input disabled" disabled placeholder="0000" /></div>
              </td>
            </tr>
            <tr>
              <th><label class="list_title" for="business-number">Business Number</label></th>
              <td>
                <div class="form_input"><input type="text" id="business-number" style="width: 70%" class="t-r solo_input disabled" disabled placeholder="000-00-0000" /></div>
              </td>
              <th><label class="list_title" for="representative">Representative</label></th>
              <td>
                <div class="form_input"><input type="text" id="representative" class="t-l solo_input disabled" disabled placeholder="Dongwha Enterprise" /></div>
              </td>
            </tr>
            <tr>
              <th><label class="list_title" for="pnone-number01">Phone Number</label></th>
              <td>
                <div class="form_input">
                  <input type="text" id="pnone-number01" class="t-c three_input" placeholder="0651" />
                  <i>-</i>
                  <input type="text" id="pnone-number02" class="t-c three_input" placeholder="0651" />
                  <i>-</i>
                  <input type="text" id="pnone-number03" class="t-c three_input" placeholder="0651" />
                </div>
              </td>
              <th><label class="list_title" for="mobile-phone-number01">Mobile Phone Number</label></th>
              <td>
                <div class="form_input">
                  <input type="text" id="mobile-phone-number01" class="t-c three_input" placeholder="0651" />
                  <i>-</i>
                  <input type="text" id="mobile-phone-number01" class="t-c three_input" placeholder="0651" />
                  <i>-</i>
                  <input type="text" id="mobile-phone-number01" class="t-c three_input" placeholder="0651" />
                </div>
              </td>
            </tr>
            <tr>
              <th><label class="list_title" for="subscriber-name">Subscriber Name</label></th>
              <td colspan="3">
                <div class="form_input"><input type="text" id="subscriber-naqme" style="width: 241px" class="t-r solo_input" disabled placeholder="000-00-0000" /></div>
              </td>
            </tr>
            <tr>
              <th><label class="list_title" for="address">Address</label></th>
              <td colspan="3">
                <div class="form_input_multy">
                  <div class="form_input">
                    <label class="title-post" for="postal-code">Postal Code</label>
                    <input type="text" id="postal-code" style="width: 60px" class="t-r solo_input" />
                  </div>
                  <div class="form_input form_row">
                    <MultiSelect style="width: 160px" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                    <MultiSelect style="width: 160px" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>

                    <input type="text" id="postal-code" style="width: 369px" class="t-l" placeholder="ksjfkwejf" />
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="join_regsit">
        <h2>Password Registration</h2>
        <div class="join_regsit_content">
          <div class="join_id">
            <span class="title_id">ID</span>
            <span class="id_txt">VRGDW@gmail.com</span>
          </div>
          <div class="form_box">
            <input id="temporary_password" type="password" class="on" placeholder="" />
            <label for="temporary_password" class="label_pw">Temporary Password</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
            <span class="pw_check_active on"><img src="@/assets/img/icon_check.png" /></span>
            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button class="btn_view_password on see"></button>
          </div>
          <div class="form_box">
            <input id="new_password" type="password" class="" placeholder="" />
            <label for="new_password" class="label_pw">New Password</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
            <span class="pw_check_active on"><img src="@/assets/img/icon_check.png" /></span>
            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button class="btn_view_password on see"></button>
          </div>
          <div class="form_box">
            <input id="confirm_password" type="password" class="" placeholder="" />
            <label for="confirm_password" class="label_pw">Confirm Password</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
            <span class="pw_check_active on"><img src="@/assets/img/icon_check.png" /></span>
            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button class="btn_view_password on see"></button>
          </div>
          <p class="login_alert">*The password must be registered as (English uppercase/lowercase letters & at least 8 characters)</p>
          <button class="btn_join">Confirmation</button>
        </div>
      </div>
      <p class="login_footer">Copyright VRG Dongwha MDF. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectValue: '',
      selectOptions: ['Select option', 'options', 'selected'],
      formLayout: 'horizontal',
      disabled: true,
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      other: '',
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        date1: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
          },
        ],
        resource: [{ required: true, message: 'Please select activity resource', trigger: 'change' }],
        desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
      },
    };
  },
  computed: {
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="scss"></style>
