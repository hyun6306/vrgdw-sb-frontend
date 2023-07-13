<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">{{ $t('message.manualTitle') }}</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img" @click="backButton"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right"></div>
    </div>
    <!-- //상단 헤더 -->
    <!-- 컨텐츠 바디 -->
    <div class="container" @scroll="handleScroll">
      <div class="member_search_contents">
        <!-- 검색 -->
        <div class="search_form">
          <input type="text" v-model.trim="filter" class="" @keyup.enter="articleSearch" :placeholder="$t('message.msgInfoSearch')" />
          <button class="btn_search" @click="articleSearch" v-if="authButton.schAuth == 'Y'">
            {{ $t('message.btnSearch') }}
          </button>
          <button class="btn_reset" @click="articleSearch(false)">
            {{ $t('message.btnInit') }}
          </button>
        </div>
        <!-- 검색결과 -->
        <div class="member_search_result" v-if="searchFlag">
          {{ $t('message.searchWord') }}
          <i>{{ pageInfo.totalCount }}</i>
          {{ $t('message.totalSelection2') }}
        </div>
        <!-- //검색결과 -->
      </div>

      <div class="no_result" v-if="manualList.length == 0">
        <span>
          {{ $t('message.msgInconsistentCriteria') }}
        </span>
      </div>

      <!-- 글목록 -->
      <div class="notice_list_contents">
        <div class="notice_list" v-for="(article, index) in manualList" :key="index">
          <div class="notice_title">
            <a href="#" class="go_notice" @click="manualDetail(article)">
              <i class="icon_new" v-if="checkNewArticle(article.updatedAt)">N</i>
              {{ article.title }}
            </a>
          </div>
          <div class="notice_info">
            <span>{{ article.updatedByNm }}</span>
            <span>{{ article.updatedAt | dateFormat('YYYY-MM-DD') }}</span>
            <span>
              {{ $t('message.hitsCount') }}
              <i class="ml-5">{{ article.qryCnt }}</i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- //컨텐츠 바디 -->

    <ManualDetailModal :article="article" @closeManualDetail="closeManualDetail" />
    <HomeTap @goToTop="goToTop" :showMain="showMain" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import utilApi from '@/api/util/utility';
import HomeTap from '@m/components/HomeTap';
import ManualDetailModal from '@m/modal/help/ManualDetailModal';

export default {
  components: {
    HomeTap,
    ManualDetailModal,
  },
  data() {
    return {
      el: '',
      contents: '',
      showMain: true,

      filter: '',
      pageNumber: 0,
      pageSize: 10,
      pageInfo: {},

      manualList: [],
      searchFlag: false,
      article: {},
    };
  },
  watch: {
    pageNumber() {
      this.getManualList();
    },
  },
  filters: {
    dateFormat: (value, format) => {
      if (!value) {
        return '';
      }
      return dayjs(value).format(format);
    },
  },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
    }),
  },
  methods: {
    goToTop() {
      if (Object.keys(this.el).length > 0) this.el.target.scrollTop = 0;
    },
    handleScroll(el) {
      this.el = el;
      if (Math.ceil(el.target.offsetHeight + el.target.scrollTop) >= el.target.scrollHeight) {
        if (this.pageInfo.finalPageNo - 1 > this.pageNumber) this.pageNumber++;
      }
    },
    backButton() {
      this.$router.go(-1);
    },
    async getManualList() {
      try {
        const param = {
          filter: this.filter,
          pageNumber: this.pageNumber,
          pageSize: 10,
          showYn: 'Y',
        };
        const resp = await utilApi.getManualList(param);
        this.manualList.push(...resp.data.ds);
        this.pageInfo = resp.data.page;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    checkNewArticle(dt) {
      if (dt) {
        let sdt = new Date(dt);
        let edt = new Date();
        let dateDiff = Math.ceil((edt.getTime() - sdt.getTime()) / (1000 * 3600));
        return dateDiff < 24;
      } else {
        return false;
      }
    },
    articleSearch(tp = true) {
      this.searchFlag = tp;
      if (this.searchFlag) {
        if (this.filter == '') {
          this.searchFlag = false;
          this.$EventBus.$emit('openYesModal', 'message.msgInfoSearch');
          return false;
        }
      } else {
        this.filter = '';
      }
      this.manualList.length = 0;
      this.pageNumber = 0;
      this.getManualList();
    },
    manualDetail(article) {
      this.article = article;
      this.$modal.show('ManualDetailModal');
    },
    closeManualDetail() {
      this.article = {};
      this.$modal.hide('ManualDetailModal');
    },
  },
  mounted() {
    this.getManualList();
  },
  created() {},
};
</script>

<style></style>
