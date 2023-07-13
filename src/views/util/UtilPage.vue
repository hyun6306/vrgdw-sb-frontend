<template>
  <div>
    <UtilSearch ref="UtilSearch" :page="page" @sendUtilListRows="getUtilListRows" @sendPageInfo="getPageInfo" :changePageNumber="pageNumber" />
    <!-- 공지사항 리스트 -->
    <div class="realgrid_container realgrid_container10">
      <div class="real_head">
        <div class="real_head_left">
          <small>
            {{ $t('message.totalSelection1') }} <i>{{ pageInfo.totalCount }}</i> {{ $t('message.totalSelection2') }}
          </small>
        </div>
        <!-- <small>검색 <i>4</i> 건</small> -->
        <div class="real_head_right"></div>
      </div>
      <div class="real_body real_body08 notice_section">
        <UtilNoticeGrid ref="UtilGrid" v-if="page === 'utilNotice'" :page="page" style="height: 100%" :utilListRows="utilListRows" @sendPostId="sendPostId" :gridLang="gridLang" />
        <UtilManualGrid ref="UtilGrid" v-else-if="page === 'utilManual'" :page="page" style="height: 100%" :utilListRows="utilListRows" @sendPostId="sendPostId" :gridLang="gridLang" />
      </div>
      <div class="real_footer">
        <div class="footer_left"></div>
        <div class="footer_right">
          <button class="btn_default btn_critical_process" v-if="authButton.savAuth === 'Y'" @click="$modal.show('NoticeModal')">{{ $t('message.btnRegistration') }}</button>
          <button class="btn_default btn_function" v-if="authButton.delAuth === 'Y'" @click="deletePostModal">{{ $t('message.btnDelete') }}</button>
        </div>
      </div>
    </div>
    <PagIng :pageInfo="pageInfo" :length="utilListRows.length" ref="PagIng" @alterPageNumber="alterPageNumber" />
    <!-- //공지사항 리스트 -->
    <NoticeModal :page="page" @savePost="savePost" @bbsPostFileRemove="bbsPostFileRemove" />
    <AlarmModal @okOrNo="okOrNo" />
  </div>
</template>

<script>
import UtilNoticeGrid from '@/components/gridView/util/UtilNoticeGrid';
import UtilManualGrid from '@/components/gridView/util/UtilManualGrid';
import UtilSearch from '@/components/util/UtilSearch';
import utilApi from '@/api/util/utility';
// import fileDownload from '@/mixins/fileDownload';
import NoticeModal from '@/modal/util/NoticeModal';

import { mapGetters } from 'vuex';
import AlarmModal from '@/modal/util/AlarmModal';

import languageApi from '@/api/language';

import PagIng from '@/components/commonComponent/PagIng';

export default {
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  components: { UtilNoticeGrid, UtilManualGrid, UtilSearch, NoticeModal, AlarmModal, PagIng },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  data() {
    return {
      utilListRows: [],
      pageInfo: {},
      pageNumber: 0,
      gridLang: [],
    };
  },
  methods: {
    async getGridMutiLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage(this.routerPath, this.menuId, this.userLocale, 'Y');
        this.gridLang = resp.data.rs.language;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    getUtilListRows(utilListRows) {
      this.utilListRows = utilListRows;
    },
    getPageInfo(pageInfo) {
      this.pageInfo = pageInfo;
    },
    alterPageNumber(pageNumber) {
      this.pageNumber = pageNumber;
    },
    resetPageNumber() {
      this.$refs.PagIng.resetPageNumber();
    },
    // 23. 2. 17 파일다운로드 방식 변경으로 인한 주석 처리
    // async fileDownload(data) {
    //   const param = {
    //     fileKey: data.fileKey,
    //   };
    //   const resp = await utilApi.saveFileUtility(param);
    //   if (resp.data.status === 200) {
    //     fileDownload.downloadFile(resp, param.fileNm);
    //   } else {
    //     this.$EventBus.$emit('openYesModal', resp.data.message);
    //   }
    // },
    deletePostModal() {
      const rows = this.$refs.UtilGrid.sendJsonRows();
      const isChecked = this.$refs.UtilGrid.sendChecked();
      if (rows.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoNotice');
        return false;
      } else if (!isChecked) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoItem');
        return false;
      } else {
        this.$modal.show('UtilAlarmModal', { ment: 'message.msgAskDelete' });
      }
    },
    okOrNo(result) {
      if (result) {
        this.deletePost();
      }
    },
    async deletePost() {
      try {
        const param = [];
        const rows = this.$refs.UtilGrid.sendCheckedData();
        rows.forEach(row => {
          const data = {
            bbsId: row.bbsId,
            id: row.id,
            fileKey: row.fileKey,
          };
          param.push(data);
        });

        const resp = await utilApi.removeBbsPost(param);
        if (resp.data.status === 200) {
          this.$refs.UtilGrid.deleteRows();
          this.$refs.UtilSearch.getList();
        } else {
          this.$EventBus.$emit('openYesModal', resp.data.message);
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
    async savePost(data) {
      try {
        const resp = await utilApi.saveBbsPost(data);
        if (resp.data.status === 200) {
          this.$EventBus.$emit('openYesModal', resp.data.message);
          this.$refs.UtilSearch.getList();
        } else {
          this.$EventBus.$emit('openYesModal', resp.data.message);
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
    async sendPostId(param) {
      try {
        let resp = '';
        if (this.page === 'utilNotice') {
          resp = await utilApi.getNotice(param);
        } else if (this.page === 'utilManual') {
          resp = await utilApi.getManual(param);
        }

        if (resp.data.status === 200) {
          this.$modal.show('NoticeModal', { data: resp.data.rs });
        } else {
          this.$EventBus.$emit('openYesModal', resp.data.message);
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
    async bbsPostFileRemove(fileInfo) {
      try {
        const param = {
          fileKey: fileInfo.fileKey ? fileInfo.fileKey : '',
          savePath: fileInfo.savePath,
        };

        await utilApi.removeBbsPostFile(param);
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
  created() {},
  destroyed() {},
  mounted() {
    this.getGridMutiLanguage();
  },
};
</script>

<style></style>
