<template>
  <modal name="PriceExcelUploadModal" width="840" height="auto" @before-close="close()" :clickToClose="false">
    <div class="modal" id="ShippingAddress">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('PriceExcelUploadModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.excelUpload') }}</p>
      <div class="modal_content excel_content">
        <span class="title">{{ $t('message.uploadData') }}</span>
        <span class="sub_txt">{{ $t('message.msgEssentialField') }}</span>
        <div class="excel_t">
          <table class="">
            <colgroup>
              <col style="width: 120px" />
              <col style="width: calc(100% - 120px)" />
            </colgroup>
            <tr>
              <th>{{ $t('message.uploadTemplate') }}</th>
              <td>
                <button @click="downloadExcel()">
                  {{ $t('message.btnDownloadTemplate') }}
                </button>
              </td>
            </tr>
            <tr>
              <th>{{ $t('message.uploadTemplate') }}<i class="important">*</i></th>
              <td>
                <div class="a-l">
                  <div class="file_regist_box">
                    <div class="btn_regist"><input type="file" ref="files" name="images" @change="getval()" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />{{ $t('message.btnSelectFile') }}</div>
                    <div class="registerd_box" v-for="(name, index) in fileNm" :key="index">{{ name }}<button class="btn_delete_file" @click="deletor(index)"></button></div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <span class="sub_txt" v-if="errorList.length > 0">{{ $t('message.msgCheckError') }}</span>
        <div class="modal_btn_contents_t04">
          <button class="btn_default btn_primary" @click="upload()">
            {{ $t('message.btnExcelUpload') }}
          </button>
        </div>
        <span class="title" v-if="errorList.length > 0">{{ $t('message.errorList') }}</span>
        <div class="excel_t" v-if="errorList.length > 0">
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
        <div>{{ message }}</div>
        <!-- <div class="modal_btn_contents_t04">
          <button class="btn_default">
            {{ $t('message.btnClose') }}
          </button>
        </div> -->
      </div>
    </div>
  </modal>
</template>

<script>
// import find from '@/mixins/style.js'; // js 추가
import salesApi from '@/api/sales/sales';

export default {
  name: 'PriceExcelUploadModal',
  props: {
    excelUploadAfter: {
      type: Object,
    },
    page: {
      type: String,
    },
  },
  data() {
    return {
      fileNm: [],
      errorList: [],
      file: undefined,
      message: '',
    };
  },
  methods: {
    close() {
      this.fileNm = [];
      this.errorList = [];
      this.file = undefined;
      this.message = '';
    },
    getval() {
      if (this.$refs.files && this.$refs.files.files[0]) {
        this.fileNm = [];
        this.fileNm.push(this.$refs.files.files[0].name);
        this.file = this.$refs.files.files[0];
      }
    },
    async upload() {
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        let resp = '';
        if (this.page === 'itemPriceList') {
          resp = await salesApi.excelUploadItem(formData);
        } else if (this.page === 'salePriceList') {
          resp = await salesApi.excelUploadClient(formData);
        }
        this.errorList = resp.data.ds;
        this.message = resp.data.message;
      } catch (e) {
        console.log(e);
        this.errorList = [];
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    deletor(index) {
      // find.deletor(id);
      this.fileNm.splice(index, 1);
      this.$refs.files.value = null;
    },
    downloadExcel() {
      this.$emit('downloadExcel');
    },
  },
};
</script>

<style></style>
