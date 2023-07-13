<template>
  <modal name="NoticeModal" width="750" height="auto" @before-open="open" :clickToClose="false">
    <div class="modal" id="NoticeRegist">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="close"></button>
      </div>
      <p class="modal_title_t02" v-if="page === 'utilNotice' || page === 'dash'">{{ $t('message.noticeTitle') }}</p>
      <p class="modal_title_t02" v-else>{{ $t('message.manualTitle') }}</p>
      <div class="modal_content">
        <div class="result_box">
          <div class="address_info">
            <p class="company_title" v-if="page === 'utilNotice' && userInfo.menuGrpCd === 'SYSTEM_MANAGER'">
              <label class="chechbox_basic">
                <input type="checkbox" v-model="isNotice" true-value="Y" false-value="N" @change="setRangeMonth" />
                <span class="checkmark"></span>
                {{ $t('message.notice') }}
              </label>
            </p>
            <ul>
              <li class="address_list">
                <div class="multi_line" v-if="isNotice === 'Y'">
                  <p class="address_list_title">{{ $t('message.showRangeDt') }}</p>
                  <div class="form_calendar" @click="openCalendar()">
                    <input type="text" v-model="showDate" :disabled="isNotice === 'N' || userInfo.menuGrpCd !== 'SYSTEM_MANAGER'" />
                    <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
                  </div>
                  <span class="address_list_info"> {{ $t('message.msgShowRangeDtMax') }}</span>
                </div>
                <div class="multi_line">
                  <p class="address_list_title">{{ $t('message.hitsCount') }}</p>
                  <span class="address_list_info">{{ qryCnt }}</span>
                </div>
              </li>
              <li class="address_list">
                <p class="address_list_title">{{ $t('message.title') }}</p>
                <div class="form_input">
                  <input type="text" placeholder="" style="width: 100%" v-model="title" :disabled="userInfo.menuGrpCd !== 'SYSTEM_MANAGER'" />
                </div>
              </li>
              <li class="address_list">
                <div class="multi_line">
                  <p class="address_list_title">{{ $t('message.writer') }}</p>
                  <div class="form_input">
                    <input type="text" :placeholder="userInfo.userNm" class="disabled" disabled v-model="postUserNm" />
                  </div>
                </div>
                <div class="multi_line">
                  <p class="address_list_title">{{ $t('message.writeDt') }}</p>
                  <div class="form_input">
                    <input type="text" :placeholder="registDate" class="disabled" disabled />
                  </div>
                </div>
              </li>
              <li class="address_list">
                <p class="address_list_title">{{ $t('message.attachedFile') }}</p>
                <div class="form_input">
                  <div class="file_regist_box">
                    <div class="btn_regist" v-if="userInfo.menuGrpCd === 'SYSTEM_MANAGER'"><input type="file" ref="files" name="images" @change="getFile()" accept="application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/haansoftpdf,image/gif,image/jpeg,image/png,video/avi,video/mp4,video/mov,.hwp,.pdf,.ppt,.pptx,.docx,.doc,.xlxs,.xls" />{{ $t('message.chooseFile') }}</div>
                    <div class="registerd_box" @click="downloadFile(index, $event)" v-for="(name, index) in fileNm" :key="index">
                      {{ name }}
                      <button class="btn_delete_file" @click="deletor(index)" v-if="userInfo.menuGrpCd === 'SYSTEM_MANAGER'"></button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="board_write" v-if="userInfo.menuGrpCd === 'SYSTEM_MANAGER'">
          <DEXT5Editor :Id="`${page}dext5editor1`" Runtimes="html5" Width="100%" Height="400px" Lang="en-us" ref="editor" :contents="contents" :page="page" />
        </div>
        <div class="board_write" v-else>
          <div v-html="contents"></div>
        </div>
      </div>
      <div class="modal_btn_contents_t05 mb-20">
        <button class="btn_default" @click="close">{{ $t('message.btnClose') }}</button>
        <button class="btn_primary" @click="savePost" v-if="userInfo.menuGrpCd === 'SYSTEM_MANAGER'">{{ $t('message.btnRegistration') }}</button>
      </div>
    </div>
    <DateRangePickerModal @selectDateRange="selectDateRange" />
  </modal>
</template>

<script>
import DateRangePickerModal from '@/modal/util/DateRangePickerModal';
import dayjs from 'dayjs';
import { mapGetters } from 'vuex';
import DEXT5Editor from '@/components/DEXT5Editor';
import fileApi from '@/api/file';
import fileDownload from '@/mixins/fileDownload';

export default {
  name: 'NoticeModal',
  props: ['page'],
  components: {
    DateRangePickerModal,
    DEXT5Editor,
  },
  data() {
    return {
      showDate: '',
      time: [],
      registDate: '',
      isNotice: 'N',
      title: '',
      qryCnt: 0,
      postUserNm: '',
      loadDataId: '',
      contents: '',
      fileList: [],
      fileNm: [],
      fileUploadList: [],
      fileKey: '',
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  methods: {
    async downloadFile(index, event) {
      if (!event.target.classList.contains('btn_delete_file')) {
        const file = this.fileUploadList[index];
        const fileNm = file.fileNm;
        const savePath = file.savePath;
        try {
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
      }
    },
    open(event) {
      if (!event.params) {
        this.registDate = dayjs().format('DD-MM-YYYY');
      } else {
        const data = event.params.data;
        this.time[0] = data.postSttDt;
        this.time[1] = data.postEndDt;
        this.showDate = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
        this.isNotice = data.noticeYn;
        this.qryCnt = data.qryCnt;
        this.title = data.title;
        this.postUserNm = data.updatedByNm;
        this.loadDataId = data.id;
        this.contents = data.contents;
        this.registDate = dayjs(data.updatedAt).format('DD-MM-YYYY');
        data.fileUploadList.forEach(list => {
          this.fileNm.push(list.fileNm);
          this.fileList.push({});
        });
        this.fileUploadList = data.fileUploadList;
        this.fileKey = data.fileKey;
      }
    },
    selectDateRange(date) {
      this.showDate = date.show;
      this.time = date.time;
    },
    setRangeMonth() {
      if (this.time.length === 0) {
        this.time[0] = dayjs().format('YYYY-MM-DD');
        this.time[1] = dayjs(this.time[0]).add(1, 'M').format('YYYY-MM-DD');
        this.showDate = this.$vnDateFormatD(this.time[0]) + ' ~ ' + this.$vnDateFormatD(this.time[1]);
      }
    },
    openCalendar() {
      if (this.userInfo.menuGrpCd === 'SYSTEM_MANAGER') {
        this.$modal.show('UtilDateRangePicker', { time: this.time, showDate: this.showDate });
      }
    },
    close() {
      this.showDate = '';
      this.time = [];
      this.registDate = '';
      this.isNotice = 'N';
      this.title = '';
      this.qryCnt = 0;
      this.postUserNm = '';
      this.loadDataId = '';
      this.contents = '';
      this.fileList = [];
      this.fileNm = [];
      // this.fileUploadList.forEach(list => {
      //   this.$emit('bbsPostFileRemove', list);
      // });
      this.fileUploadList = [];
      this.fileKey = '';

      this.$modal.hide('NoticeModal');
    },
    savePost() {
      // this.$refs.editor.getImages();
      // this.$refs.editor.getContentUrl();
      let contents = this.$refs.editor.getBodyValue();

      const data = {
        id: this.loadDataId,
        bbsId: this.page === 'utilNotice' ? 'NOTICE' : this.page === 'utilManual' ? 'MANUAL' : '',
        title: this.title,
        contents,
        postSttDt: this.isNotice === 'Y' ? this.time[0] : dayjs().format('YYYY-MM-DD'),
        postEndDt: this.isNotice === 'Y' ? this.time[1] : dayjs().add(1, 'M').format('YYYY-MM-DD'),
        fileKey: this.fileKey,
        fileUploadList: this.fileUploadList,
        noticeYn: this.isNotice,
      };
      this.$emit('savePost', data);
      this.close();
    },
    getFile() {
      // find.getval(this.$refs.files);
      // 파일 확장자 확인.
      if (this.$refs.files && this.$refs.files.files[0]) {
        const fileStat = this.$refs.files.accept;
        const statCheck = fileStat.includes(this.$refs.files.files[0].type);
        if (statCheck) {
          this.fileNm.push(this.$refs.files.files[0].name);
          this.fileList.push(this.$refs.files.files[0]);
          this.upload();
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgUploadNotice');
          return;
        }
      }
    },
    deletor(index) {
      this.fileNm.splice(index, 1);
      this.fileList.splice(index, 1);

      this.$emit('bbsPostFileRemove', this.fileUploadList[index]);
      if (this.fileUploadList[index].mineType.includes('image')) {
        let contents = this.$refs.editor.getBodyValue();
        const src = `<img src="${this.fileUploadList[index].url}">`;
        contents = contents.replace(src, '');
        this.$refs.editor.setBodyValue(contents);
      }

      this.fileUploadList.splice(index, 1);
      this.$refs.files.value = null;
    },
    async upload() {
      const formData = new FormData();
      //   formData.append('file', this.setFile);
      formData.append('file', this.fileList[this.fileList.length - 1]);
      try {
        const resp = await fileApi.upload(formData);
        if (resp.data.status === 200) {
          this.fileUploadList.push(resp.data.rs.fileInfo);
          if (this.fileUploadList[this.fileUploadList.length - 1].mineType.includes('image')) {
            const src = `<img src='${this.fileUploadList[this.fileUploadList.length - 1].url}'>`;
            this.$refs.editor.setInsertHtml(src);
          }
        }
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
