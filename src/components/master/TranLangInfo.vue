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
            <td>{{ $t('message.trncusNm') }}</td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" v-model="trncusKorNm" id="" class="t-l solo_input" placeholder="" />
                </span>
              </div>
            </td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" v-model="trncusEngNm" id="" class="t-l solo_input" placeholder="" />
                </span>
              </div>
            </td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" v-model="trncusVnmNm" id="" class="t-l solo_input" placeholder="" />
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>{{ $t('message.ceoNm') }}</td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" v-model="ceoKorNm" id="" class="t-l solo_input" placeholder="" />
                </span>
              </div>
            </td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" v-model="ceoEngNm" id="" class="t-l solo_input" placeholder="" />
                </span>
              </div>
            </td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" v-model="ceoVnmNm" id="" class="t-l solo_input" placeholder="" />
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>{{ $t('message.addrDtlsInfo') }}</td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" v-model="addrKor" id="" class="t-l solo_input" placeholder="" />
                </span>
              </div>
            </td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" v-model="addrEng" id="" class="t-l solo_input" placeholder="" />
                </span>
              </div>
            </td>
            <td>
              <div class="form_input">
                <span class="essential" style="width: 100%">
                  <input type="text" v-model="addrVnm" id="" class="t-l solo_input" placeholder="" />
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
  props: ['listData'],
  data() {
    return {
      //운송사명
      trncusKorNm: '',
      trncusEngNm: '',
      trncusVnmNm: '',
      //대표자명
      ceoKorNm: '',
      ceoEngNm: '',
      ceoVnmNm: '',
      //상세주소정보
      addrKor: '',
      addrEng: '',
      addrVnm: '',
    };
  },
  watch: {
    listData() {
      // this.reset();
      // this.dataSetting();
    },
  },
  methods: {
    valid() {
      let validCheck = true;
      if (this.trncusKorNm == '' || this.trncusEngNm == '' || this.trncusVnmNm == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsValidTrnNm');
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
      if (this.valid() == true) {
        let param = {
          trncusKorNm: this.trncusKorNm,
          trncusEngNm: this.trncusEngNm,
          trncusVnmNm: this.trncusVnmNm,
          ceoKorNm: this.ceoKorNm,
          ceoEngNm: this.ceoEngNm,
          ceoVnmNm: this.ceoVnmNm,
          addrKor: this.addrKor,
          addrEng: this.addrEng,
          addrVnm: this.addrVnm,
        };
        return param;
      } else {
        return false;
      }
    },
    dataSetting(data) {
      this.trncusKorNm = data.trncusKorNm;
      this.trncusEngNm = data.trncusEngNm;
      this.trncusVnmNm = data.trncusVnmNm;
      this.ceoKorNm = data.ceoKorNm;
      this.ceoEngNm = data.ceoEngNm;
      this.ceoVnmNm = data.ceoVnmNm;
      this.addrKor = data.addrKor;
      this.addrEng = data.addrEng;
      this.addrVnm = data.addrVnm;
    },
    reset() {
      this.trncusKorNm = '';
      this.trncusEngNm = '';
      this.trncusVnmNm = '';
      this.ceoKorNm = '';
      this.ceoEngNm = '';
      this.ceoVnmNm = '';
      this.addrKor = '';
      this.addrEng = '';
      this.addrVnm = '';
      //
    },
  },
};
</script>

<style></style>
