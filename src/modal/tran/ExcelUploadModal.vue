<template>
  <modal name="ExcelUploadModal" width="840" height="auto" @before-close="close()" :clickToClose="false">
    <div class="modal" id="ShippingAddress">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ExcelUploadModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.bookingExcelUpload') }}</p>
      <div class="modal_content excel_content">
        <span class="title">{{ $t('message.bookingExcelUpload') }}</span>
        <span class="sub_txt">{{ $t('message.msgEssentialField') }}</span>
        <div class="excel_t">
          <table class="">
            <colgroup>
              <col style="width: 120px" />
              <col style="width: calc(100% - 120px)" />
            </colgroup>
            <tr>
              <th>{{ $t('message.uploadTemplate') }}<i class="important">*</i></th>
              <td>
                <div class="a-l">
                  <div class="file_regist_box">
                    <div class="btn_regist"><input type="file" ref="files" name="images" @change="getval()" accept=".xlsx" />{{ $t('message.btnSelectFile') }}</div>
                    <div class="registerd_box" v-for="(name, index) in fileNm" :key="index">{{ name }}<button class="btn_delete_file" @click="deletor(index)"></button></div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <span class="sub_txt" v-if="errorList.length > 0 && file">{{ $t('message.msgCheckError') }}</span>
        <div class="modal_btn_contents_t04">
          <button class="btn_default btn_primary" @click="upload()">
            {{ $t('message.btnUploadBooking') }}
          </button>
        </div>
        <span class="title" v-if="errorList.length > 0 && file">{{ $t('message.errorList') }}</span>
        <div class="excel_t" v-if="errorList.length > 0 && file">
          <table class="">
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 60%" />
              <col style="width: 20%" />
            </colgroup>
            <thead>
              <th class="t-c">{{ $t('message.errorLine') }}</th>
              <th class="t-c">{{ $t('message.message') }}</th>
              <th class="t-c">{{ $t('message.errorInput') }}</th>
            </thead>
            <tbody v-for="(error, index) in errorList" :key="index">
              <td class="t-c">{{ error.lineNum }}</td>
              <td class="t-c">{{ error.message }}</td>
              <td class="t-c">{{ error.value }}</td>
            </tbody>
          </table>
        </div>
        <span class="sub_txt">{{ ment }}</span>
        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="$modal.hide('ExcelUploadModal')">{{ $t('message.btnClose') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import tranApi from '@/api/tran/tran';

export default {
  name: 'ExcelUploadModal',
  props: {
    excelUploadAfter: {
      type: Object,
    },
  },
  data() {
    return {
      fileNm: [],
      file: null,
      errorList: [],
      ment: '',
    };
  },
  methods: {
    clear() {
      this.fileNm = [];
      this.file = null;
      this.errorList = [];
      this.ment = '';
    },
    close() {
      this.clear();
    },
    getval() {
      let chooseFile = this.$refs.files.files[0];
      if (this.$refs.files && chooseFile) {
        if (chooseFile.name.substr(chooseFile.name.length - 4) == 'xlsx') {
          this.ment = '';
          this.fileNm = [];
          this.fileNm.push(chooseFile.name);
          this.file = chooseFile;
        } else {
          this.clear();
          this.$EventBus.$emit('openYesModal', 'message.msgChooseExcelFile');
        }
      }
    },
    async upload() {
      this.ment = '';
      const formData = new FormData();
      formData.append('file', this.file);
      if (!this.file) {
        this.ment = this.$t('message.msgNoFile');
      } else {
        try {
          const resp = await tranApi.saveForwardingEtcExcel(formData);
          this.errorList = resp.data.ds;
          this.ment = resp.data.message;
          if (this.errorList.length === 0) {
            this.$parent.reloadSearch();
          }
        } catch (e) {
          console.log(e);
          this.errorList = [];
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    deletor(index) {
      this.fileNm.splice(index, 1);
      this.$refs.files.value = null;
      this.file = '';
    },
    downloadExcel() {
      this.$emit('downloadExcel');
    },
  },
};
</script>

<style></style>
