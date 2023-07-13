<template>
  <div>
    <div class="table">
      <table>
        <colgroup>
          <col style="width: 15%" />
          <col style="width: " />
          <col style="width: " />
          <col style="width: " />
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>{{ $t('message.kor') }}</th>
            <th>{{ $t('message.eng') }}</th>
            <th>{{ $t('message.vnm') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t('message.clientNm') }}</td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" id="" class="t-l solo_input" placeholder="" v-model="custNmKr" />
                </span>
              </div>
            </td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" id="" class="t-l solo_input" placeholder="" v-model="custNmEn" />
                </span>
              </div>
            </td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" id="" class="t-l solo_input" placeholder="" v-model="custNmVm" />
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>{{ $t('message.ceoNm') }}</td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" id="" class="t-l solo_input" placeholder="" v-model="ceoKorNm" />
                </span>
              </div>
            </td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" id="" class="t-l solo_input" placeholder="" v-model="ceoEngNm" />
                </span>
              </div>
            </td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" id="" class="t-l solo_input" placeholder="" v-model="ceoVnmNm" />
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>{{ $t('message.addrDtlsInfo') }}</td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" id="" class="t-l solo_input" placeholder="" v-model="addrKor" />
                </span>
              </div>
            </td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" id="" class="t-l solo_input" placeholder="" v-model="addrEng" />
                </span>
              </div>
            </td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" id="" class="t-l solo_input" placeholder="" v-model="addrVnm" />
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //고객사명
      custNmKr: '',
      custNmEn: '',
      custNmVm: '',
      //대표자명
      ceoKorNm: '',
      ceoEngNm: '',
      ceoVnmNm: '',
      //상세주소 정보
      addrKor: '',
      addrEng: '',
      addrVnm: '',
    };
  },
  props: ['listData', 'erpInfo'],
  watch: {
    // listData() {
    //   this.dataSetting();
    // },
    erpInfo(info) {
      this.addrVnm = info.addrVnm;
    },
  },
  methods: {
    valid() {
      let validCheck = true;
      if (this.custNmKr == '' || this.custNmEn == '' || this.custNmVm == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildCustNm');
        validCheck = false;
      } else if (this.ceoKorNm == '' || this.ceoEngNm == '' || this.ceoVnmNm == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildCeoNm');
        validCheck = false;
      } else if (this.addrKor == '' || this.addrEng == '' || this.addrVnm == '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoAddr');
        validCheck = false;
      }
      return validCheck;
    },
    dataSave() {
      //저장
      if (this.valid() == true) {
        let custSave = {
          //고객사명
          custKorNm: this.custNmKr,
          custEngNm: this.custNmEn,
          custVnmNm: this.custNmVm,
          //대표자명
          ceoKorNm: this.ceoKorNm,
          ceoEngNm: this.ceoEngNm,
          ceoVnmNm: this.ceoVnmNm,
          //상세주소 정보
          addrKor: this.addrKor,
          addrEng: this.addrEng,
          addrVnm: this.addrVnm,
        };
        return custSave;
      } else {
        return false;
      }
    },
    dataSetting(data) {
      //고객사명
      this.custNmKr = data.custKorNm;
      this.custNmEn = data.custEngNm;
      this.custNmVm = data.custVnmNm;
      //대표자명
      this.ceoKorNm = data.ceoKorNm;
      this.ceoEngNm = data.ceoEngNm;
      this.ceoVnmNm = data.ceoVnmNm;
      //상세주소 정보
      this.addrKor = data.addrKor;
      this.addrEng = data.addrEng;
      this.addrVnm = data.addrVnm;
    },
    reset() {
      //초기화

      //고객사명
      this.custNmKr = '';
      this.custNmEn = '';
      this.custNmVm = '';
      //대표자명
      this.ceoKorNm = '';
      this.ceoEngNm = '';
      this.ceoVnmNm = '';
      //상세주소 정보
      this.addrKor = '';
      this.addrEng = '';
      this.addrVnm = '';
    },
  },
};
</script>

<style></style>
