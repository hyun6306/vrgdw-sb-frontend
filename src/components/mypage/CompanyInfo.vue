<template>
  <!-- 기본정보수정 -->
  <div class="client_section">
    <!-- board 리스트 -->
    <div class="notice_section">
      <div class="mypage_form">
        <h2 class="mypage_title">고객사 정보</h2>

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
              <!-- 파트너명 -->
              <th>
                <label class="list_title" for="">회사코드</label>
              </th>
              <td>
                <div class="form_input"><input :disabled="true" type="text" id="partnerNm" class="t-l solo_input" v-model="detailData.compCd" /></div>
              </td>
              <!-- 파트너코드 -->
              <th>
                <label class="list_title" for="">고객사코드</label>
              </th>
              <td>
                <div class="form_input"><input :disabled="true" type="text" id="partnerCd" class="solo_input" v-model="detailData.custCd" /></div>
              </td>
              <!-- 이름 -->
              <th>
                <label class="list_title" for="">고객사명</label>
              </th>
              <td>
                <div class="form_input">
                  <span class="essential" style="width: 100%"><input type="text" id="nm" class="t-l solo_input" v-model="detailData.custNm" /></span>
                </div>
              </td>
            </tr>
            <tr>
              <!-- 사원번호 -->
              <th>
                <label class="list_title" for="">대표자명</label>
              </th>
              <td>
                <div class="form_input"><input type="text" id="salesNum" class="t-l solo_input" v-model="detailData.ceoNm" /></div>
              </td>
              <!-- 사원유형 -->
              <th>
                <label class="list_title" for="">대표자 직위명</label>
              </th>
              <td>
                <div class="form_input">
                  {{ detailData.ceoPositNm }}
                  <!-- <MultiSelect :disabled="ceoYn == 'N'" v-model="selectSalesType" :options="salesTypes" :allow-empty="false" id="" class="essential" style="width: 164px" :palceholder="''" :searchable="false" :close-on-select="false" :show-labels="false" /> -->
                </div>
              </td>
              <!-- 직급 -->
              <th>
                <label class="list_title" for="">우편번호</label>
              </th>
              <td>
                <div class="form_input">
                  {{ detailData.postNum }}
                </div>
              </td>
            </tr>
            <tr>
              <!-- 재직구분 -->
              <th>
                <label class="list_title" for="">시</label>
              </th>
              <td>
                <div class="form_input">
                  <!-- <MultiSelect :disabled="ceoYn == 'N'" v-model="selectWork" :options="workClass" :allow-empty="false" id="" class="essential" style="width: 164px" :palceholder="''" :searchable="false" :close-on-select="false" :show-labels="false" /> -->
                  {{ detailData.cityNm }}
                </div>
              </td>
              <!-- 이메일 -->
              <th>
                <label class="list_title" for="">도</label>
              </th>
              <td>
                <div class="form_input">{{ detailData.distrNm }}</div>
              </td>
              <th>
                <label class="list_title" for="">주소</label>
              </th>
              <td>
                <div class="form_input">{{ detailData.addr }}</div>
              </td>
            </tr>
            <tr>
              <th><label class="list_title" for="">전화번호</label></th>
              <td>
                <div class="form_input">
                  <MultiSelect id="" style="width: 100%" class="" label="text" v-model="phoneNum[0]" :options="phoneOptions" :searchable="false" :close-on-select="true" :allow-empty="false" :show-labels="false" placeholder=""></MultiSelect>
                  <input type="text" id="phone-number01" class="t-c three_input" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="phoneNum[1]" />
                  <i>-</i>
                  <input type="text" id="phone-number02" class="t-c three_input" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="phoneNum[2]" />
                  <i>-</i>
                  <input type="text" id="phone-number03" class="t-c three_input" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="phoneNum[3]" />
                </div>
              </td>
              <th><label class="list_title" for="">휴대폰번호</label></th>
              <td>
                <div class="form_input">
                  <MultiSelect id="" style="width: 100%" class="" label="text" v-model="mobileNum[0]" :options="phoneOptions" :searchable="false" :close-on-select="true" :allow-empty="false" :show-labels="false" placeholder=""></MultiSelect>
                  <input type="text" id="phone-number01" class="t-c three_input" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="mobileNum[1]" />
                  <i>-</i>
                  <input type="text" id="phone-number02" class="t-c three_input" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="mobileNum[2]" />
                  <i>-</i>
                  <input type="text" id="phone-number03" class="t-c three_input" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="mobileNum[3]" />
                </div>
              </td>
              <th><label class="list_title" for="">팩스번호</label></th>
              <td>
                <div class="form_input">
                  <MultiSelect id="" style="width: 100%" class="" label="text" v-model="faxNum[0]" :options="phoneOptions" :searchable="false" :close-on-select="true" :allow-empty="false" :show-labels="false" placeholder=""></MultiSelect>
                  <input type="text" id="phone-number01" class="t-c three_input" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="faxNum[1]" />
                  <i>-</i>
                  <input type="text" id="phone-number02" class="t-c three_input" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="faxNum[2]" />
                  <i>-</i>
                  <input type="text" id="phone-number03" class="t-c three_input" placeholder="" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="faxNum[3]" />
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <label class="list_title" for="">홈페이지URL</label>
              </th>
              <td>
                <div class="form_input"></div>
              </td>
              <th>
                <label class="list_title" for="">결제조건</label>
              </th>
              <td>
                <div class="form_input">{{ creditInfo.apprCond }}</div>
              </td>
              <th>
                <label class="list_title" for="">여신잔액</label>
              </th>
              <td>
                <div class="form_input">{{ creditInfo.credit }}</div>
              </td>
            </tr>
          </table>
        </div>
        <div class="board_footer">
          <div class="footer_left"></div>
          <!-- 삭제버튼, 저장버튼 -->
          <div class="footer_right">
            <button class="btn_default btn_temp">{{ $t('message.btnCancel') }}</button>
            <button class="btn_default btn_quta" @click="saveInfo">{{ $t('message.btnSave') }}</button>
          </div>
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

export default {
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
    }),
  },

  data() {
    return {
      phoneOptions: [
        { text: '+82', value: 'ko' },
        { text: '+en', value: 'en' },
        { text: '+vn', value: 'vn' },
      ],
      //
      detailData: '',
      //번호
      phoneNum: [],
      mobileNum: [],
      faxNum: [],
      //여신정보
      creditInfo: '',
    };
  },
  methods: {
    async loadCustList() {
      let param = {
        custId: this.userInfo.custId,
        useYn: '',
      };
      const response = await commonApi.getCustList(param);
      this.detailData = response.data.ds[0];
      this.phoneNum[0] = this.detailData.phoneNumCt ? this.detailData.phoneNumCt : '';
      if (this.detailData.phoneNum && this.detailData.phoneNum !== null) {
        this.phoneNum[1] = this.detailData.phoneNum.substr(0, 3);
        this.phoneNum[2] = this.detailData.phoneNum.substr(3, 4);
        this.phoneNum[3] = this.detailData.phoneNum.substr(7, 4);
      }
      this.faxNum[0] = this.detailData.faxNumCt ? this.detailData.faxNumCt : '';
      if (this.detailData.faxNum && this.detailData.faxNum !== null) {
        this.faxNum[1] = this.detailData.faxNum.substr(0, 3);
        this.faxNum[2] = this.detailData.faxNum.substr(3, 4);
        this.faxNum[3] = this.detailData.faxNum.substr(7, 4);
      }
      this.mobileNum[0] = this.detailData.mobileNumCt ? this.detailData.mobileNumCt : '';
      if (this.detailData.mobileNum && this.detailData.mobileNum !== null) {
        this.mobileNum[1] = this.detailData.mobileNum.substr(0, 3);
        this.mobileNum[2] = this.detailData.mobileNum.substr(3, 4);
        this.mobileNum[3] = this.detailData.mobileNum.substr(7, 4);
      }
    },
    async loadCreditInfo() {
      //여신조회
      let param = {
        custId: this.userInfo.custId,
      };
      const response = await commonApi.getCredit(param);
      this.creditInfo = response.data.rs;
    },
    saveInfo() {},
  },
  mounted() {
    this.loadCustList();
    this.loadCreditInfo();
  },
};
</script>

<style></style>
