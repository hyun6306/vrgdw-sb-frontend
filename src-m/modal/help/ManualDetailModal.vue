<template>
  <modal name="ManualDetailModal" width="100%" height="100%" :adaptive="true">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.manualTitle') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="closeModal"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <!-- 상세 -->
        <div class="notice_detail_contents">
          <div class="notice_head">
            <div class="notice_title">
              <a href="javascript:void(0)" class="go_notice">
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
          <div class="notice_document" v-html="article.contents"></div>
        </div>
        <!-- // 상세 -->

        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_add" @click="closeModal">
              {{ $t('message.btnList') }}
            </button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'ManualDetailModal',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      noData: '',
    };
  },
  filters: {
    dateFormat: (value, format) => {
      if (!value) {
        return '';
      }
      return dayjs(value).format(format);
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeManualDetail');
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
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
