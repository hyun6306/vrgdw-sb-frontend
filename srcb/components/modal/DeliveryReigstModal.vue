<template>
  <modal name="DeliveryReigstModal" width="750" height="auto">
    <div class="modal" id="NoticeRegist">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DeliveryReigstModal')"></button>
      </div>
      <p class="modal_title_t02">고객사 등록</p>
      <div class="modal_content">
        <div class="result_box result_box02">
          <div class="address_info">
            <p class="company_title">
              <label class="chechbox_basic">
                <input type="checkbox" />
                <span class="checkmark"></span>
                기본 배송지
              </label>
            </p>
            <ul>
              <li class="address_list">
                <p class="address_list_title">배송지명</p>
                <div class="form_input">
                  <input type="text" placeholder="a대리점" style="width: 100%" />
                </div>
              </li>
              <li class="address_list">
                <p class="address_list_title">우편번호</p>
                <div class="form_input">
                  <input type="text" placeholder="00000" style="width: 50%" />
                </div>
              </li>
              <li class="address_list">
                <p class="address_list_title">배송권역</p>
                <MultiSelect id="Material_Group" style="width: 130px" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                <MultiSelect id="Material_Group" style="width: 130px" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
              </li>
              <li class="address_list">
                <p class="address_list_title">상세주소</p>
                <div class="form_input">
                  <input type="text" placeholder="여의나루 1234" style="width: 100%" />
                </div>
              </li>
              <li class="address_list">
                <p class="address_list_title">담당자명</p>
                <div class="form_input">
                  <input type="text" placeholder="담당자" style="width: 100%" />
                </div>
              </li>
              <li class="address_list">
                <div class="multi_line">
                  <p class="address_list_title">연락처1</p>
                  <div class="form_input">
                    <input type="text" id="phone-number01" class="t-c three_input" placeholder="0651" />
                    <i>-</i>
                    <input type="text" id="phone-number02" class="t-c three_input" placeholder="0651" />
                    <i>-</i>
                    <input type="text" id="phone-number03" class="t-c three_input" placeholder="0651" />
                  </div>
                </div>
                <div class="multi_line">
                  <p class="address_list_title">연락처2</p>
                  <div class="form_input">
                    <input type="text" id="phone-number01" class="t-c three_input" placeholder="0651" />
                    <i>-</i>
                    <input type="text" id="phone-number02" class="t-c three_input" placeholder="0651" />
                    <i>-</i>
                    <input type="text" id="phone-number03" class="t-c three_input" placeholder="0651" />
                  </div>
                </div>
              </li>
              <li class="address_list">
                <p class="address_list_title">특이사항</p>
                <div class="form_textarea">
                  <textarea type="text" placeholder="문앞배송" style="width: 100%" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default">닫기</button>
          <button class="btn_primary">{{ $t('button.ok') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'DeliveryReigstModal',
  data() {
    return {
      selectValue: '',
      selectOptions: ['Select option', 'options', 'selected'],
    };
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
  },
};
</script>

<style></style>
