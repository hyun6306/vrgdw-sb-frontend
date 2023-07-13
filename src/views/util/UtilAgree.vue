<template>
  <div>
    <!-- 검색필터 영역 -->
    <!-- <div class="search_content"></div> -->
    <!-- //검색필터 영역 -->

    <!-- 이용약관 -->
    <div class="privacy_section">
      <p v-html="contents"></p>
    </div>
    <!--    <div class="privacy_section_footer">-->
    <!--      <button class="">최신 이용약관 보기</button>-->
    <!--      <button class="">이전 이용약관 보기(2021.7.31 ~ 2022.5)</button>-->
    <!--    </div>-->
    <!-- //이용약관 -->
  </div>
</template>

<script>
import utilApi from '@/api/util/utility';

export default {
  components: {},
  data() {
    return {
      contents: '',
    };
  },
  methods: {
    async getPrivacy() {
      try {
        const resp = await utilApi.getAgree();
        this.contents = resp.data.rs?.contents;
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
  mounted() {
    this.getPrivacy();
  },
  destroyed() {},
};
</script>

<style></style>
