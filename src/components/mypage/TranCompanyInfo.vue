<template>
  <!-- 운송사정보수정 this.tranCusCd == true &&  -->
  <div class="client_section">
    <!-- board 리스트 -->
    <div class="notice_section">
      <div class="mypage_form">
        <h2 class="mypage_title">{{ $t('message.modifyInfo') }}</h2>

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
              <!-- 운송사명 -->
              <th>
                <label class="list_title" for="">{{ $t('message.tranNm') }}</label>
              </th>
              <td>
                <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled /></div>
              </td>
              <!-- 운송사코드 -->
              <th>
                <label class="list_title" for="">{{ $t('message.trncusCd') }}</label>
              </th>
              <td>
                <div class="form_input"><input type="text" id="" class="solo_input disabled" disabled /></div>
              </td>
              <!-- 사업자명 -->
              <th>
                <label class="list_title" for="">{{ $t('message.bizNm') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <input type="text" id="" class="t-l solo_input disabled" disabled />
                </div>
              </td>
            </tr>
            <tr>
              <!-- 사업자번호 -->
              <th>
                <label class="list_title" for="">{{ $t('message.bizNum') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <input type="text" id="" class="t-l solo_input disabled" disabled />
                </div>
              </td>
              <!-- 담당자명 -->
              <th>
                <label class="list_title" for="">{{ $t('message.picNm') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <input type="text" id="" class="t-l solo_input disabled" disabled />
                </div>
              </td>
              <!-- 재직구분, 운송사 -->
              <th>
                <label class="list_title" for="">{{ $t('message.workingClass') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <input type="text" id="" class="t-l solo_input disabled" disabled />
                </div>
              </td>
            </tr>
            <tr>
              <!-- 성별, 운송사 -->
              <th>
                <label class="list_title" for="">{{ $t('message.gender') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <label class="radio_t">
                    <input type="radio" name="radio01" />
                    <span class="checkmark"></span>
                    <!-- 남 -->
                    <span class="board_intxt">{{ $t('message.genderMale') }}</span>
                  </label>
                  <label class="radio_t">
                    <input type="radio" name="radio01" />
                    <span class="checkmark"></span>
                    <!-- 여 -->
                    <span class="board_intxt">{{ $t('message.genderFemale') }}</span>
                  </label>
                </div>
              </td>
              <!-- 이메일, 운송사 -->
              <th>
                <label class="list_title" for="">{{ $t('message.email') }}</label>
              </th>
              <td colspan="3">
                <div class="form_input">
                  <input type="text" id="" class="solo_input disabled" disabled style="width: 150px" />
                  <span class="board_intxt">@</span>
                  <input type="text" id="" class="solo_input disabled" disabled style="width: 250px" />
                </div>
              </td>
            </tr>
            <tr>
              <!-- 입사일, 운송사 -->
              <th>
                <label class="list_title" for="">{{ $t('message.joinDate') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <input type="text" id="" class="t-l solo_input disabled" disabled />
                </div>
              </td>
              <!-- 퇴직일, 운송사 -->
              <th>
                <label class="list_title" for="">{{ $t('message.retireDate') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <input type="text" id="" class="t-l solo_input disabled" disabled />
                </div>
              </td>
              <!-- VRGDW 사용여부, 운송사  -->
              <th>
                <label class="list_title" for="">{{ $t('message.vrgdwCheckUse') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <label class="radio_t">
                    <input type="radio" name="radio03" />
                    <span class="checkmark"></span>
                    <span class="board_intxt">{{ $t('message.allowed') }}</span>
                  </label>
                  <label class="radio_t">
                    <input type="radio" name="radio04" checked />
                    <span class="checkmark"></span>
                    <span class="board_intxt">{{ $t('message.refusal') }}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <!-- 휴대폰번호 -->
              <th>
                <label class="list_title" for="">{{ $t('message.mobileNum') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <span class="">
                    <input type="text" id="phone_number_1_01" style="width: 60px" class="t-c three_input disabled" disabled />
                  </span>
                  <i>-</i>
                  <input type="text" id="phone_number_1_02" style="width: 60px" class="t-c three_input disabled" disabled />
                  <i>-</i>
                  <input type="text" id="phone_number_1_03" style="width: 60px" class="t-c three_input disabled" disabled />
                </div>
              </td>
              <th>
                <label class="list_title" for="">{{ $t('message.phoneNum') }}</label>
              </th>
              <td>
                <div class="form_input">
                  <span class="">
                    <input type="text" id="phone_number_2_01" style="width: 60px" class="t-c three_input disabled" disabled />
                  </span>
                  <i>-</i>
                  <input type="text" id="phone_number_2_02" style="width: 60px" class="t-c three_input disabled" disabled />
                  <i>-</i>
                  <input type="text" id="phone_number_2_03" style="width: 60px" class="t-c three_input disabled" disabled />
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <label class="list_title" for="address">{{ $t('message.addr') }}</label>
              </th>
              <td colspan="5">
                <div class="form_input_multy">
                  <div class="form_input form_row">
                    <label class="title-post" for="postal-code">{{ $t('message.postNum') }}</label>
                    <input type="text" maxlength="7" id="postal-code" style="width: 60px" class="t-r solo_input disabled" disabled />
                    <!-- 대권역 서울시 마포구-->
                    <input type="text" id="" style="width: 200px" class="t-l disabled" disabled />
                    <!-- 중권역 도화동 다온빌딩 -->
                    <input type="text" id="" style="width: 200px" class="t-l disabled" disabled />
                    <!-- 상세주소 A02 -->
                    <input type="text" id="" style="width: 400px" class="t-l disabled" disabled />
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="board_footer">
          <div class="footer_left"></div>
          <div class="footer_right">
            <!-- 저장삭제버튼, 운송사 -->
            <button class="btn_default btn_temp">{{ $t('message.btnCancel') }}</button>
            <button class="btn_default btn_quta" @click="saveInfo">{{ $t('message.btnSave') }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- //board 리스트 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  data() {
    return {};
  },
  methods: {
    saveInfo() {},
  },
};
</script>

<style></style>
