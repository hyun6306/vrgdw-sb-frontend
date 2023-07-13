<template>
  <modal name="PrivacyModal" width="100%" height="100%" :adaptive="true">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <!-- <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.quoteSearch') }}</h1>
        </div> -->
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('PrivacyModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <PrivacyComponent />
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>
<script>
import PrivacyComponent from '@m/views/PrivacyComponent';
export default {
  components: {
    PrivacyComponent,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
};
</script>

<style></style>
