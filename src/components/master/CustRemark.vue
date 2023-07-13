<template>
  <div>
    <div class="master_form">
      <div class="product_detail_info_section">
        <div class="product_di_box product_di_box04">
          <h2 class="mypage_title">{{ $t('message.noteRemark') }}</h2>
          <div class="form_textarea"><textarea placeholder="" v-model="remark" style="height: 189px"></textarea></div>
        </div>
        <div class="product_di_box product_di_box04">
          <h2 class="mypage_title">
            {{ $t('message.attachedFile') }}
            <div class="btn_s_default btn_function" v-if="authButton.fn2Auth == 'Y'">
              <input type="file" ref="files" name="images" style="display: none" id="inputFile" @change="getval()" />
              <label for="inputFile" class="btn_regist" style="float: right">{{ $t('message.btnUpload') }}</label>
            </div>
          </h2>
          <div class="table master_tabel_scroll">
            <table>
              <colgroup>
                <col style="width: 9%" />
                <col style="width: 82%" />
                <col style="width: 8%" />
              </colgroup>
              <thead>
                <tr>
                  <th>No</th>
                  <th>{{ $t('message.fileNm') }}</th>
                  <th @click="deletor(null)">
                    <img src="@/assets/img/icon_delete.png" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(name, index) in fileNm" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td @click="getDownloadFile(index)">{{ name }}</td>
                  <td @click="deletor(index)">
                    <div><img src="@/assets/img/icon_delete.png" /></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fileApi from '@/api/file';
import fileDownload from '@/mixins/fileDownload';

export default {
  props: ['listData', 'authButton'],
  data() {
    return {
      remark: '',
      file: '',
      fileNm: [],
      fileUploadList: [],
      attchFileUuid: '',
    };
  },
  methods: {
    dataSave() {
      let param = {
        custRemark: this.remark,
        fileUploadList: this.fileUploadList,
      };
      if (this.attchFileUuid !== null) param = { ...param, ...{ attchFileUuid: this.attchFileUuid } };
      return param;
    },
    reset() {
      this.remark = '';
      this.file = [];
      this.fileNm = [];
      this.fileUploadList = [];
    },
    infoUpdata(data) {
      if (data.attchFileUuid !== null) this.attchFileUuid = data.attchFileUuid;
      this.remark = data.custRemark;
      if (data.fileUploadList.length > 0) {
        this.fileUploadList = data.fileUploadList;
        this.fileUploadList.forEach(row => {
          this.fileNm.push(row.fileNm);
        });
      }
    },
    getval() {
      if (this.$refs.files) {
        this.fileNm.push(this.$refs.files.files[0].name);
        this.file = this.$refs.files.files[0];
        this.uploadFile();
      }
    },
    deletor(index) {
      if (index == null) {
        this.fileNm = [];
        this.fileUploadList = [];
        this.$refs.files.value = null;
      } else {
        // find.deletor(id);
        this.fileNm.splice(index, 1);
        this.fileUploadList.splice(index, 1);
        this.$refs.files.value = null;
      }
    },
    async uploadFile() {
      // formData.append('file', this.fileList[this.fileList.length - 1]);
      try {
        const formData = new FormData();
        formData.append('file', this.file);
        const response = await fileApi.upload(formData);
        this.fileUploadList.push(response.data.rs.fileInfo);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getDownloadFile(index) {
      try {
        const fileNm = this.fileUploadList[index].fileNm;
        const savePath = this.fileUploadList[index].savePath;
        const response = await fileApi.download(savePath, fileNm);
        fileDownload.downloadFile(response, fileNm);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
};
</script>

<style></style>
