<template>
  <modal name="StaffSearchModal" width="100%" height="100%" :adaptive="true" @before-close="close()">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.staffSearch') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('StaffSearchModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="quote_search_contents">
          <div class="list_form_section">
            <ul class="list_ul">
              <li class="list_li">
                <label class="list_title">{{ $t('message.searchWord') }}</label>
                <span class="list_form"><input type="text" class="d_input" placeholder="" v-model="filter" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">{{ $t('message.withRetire') }}</label>
                <span class="list_form mail_form">
                  <label class="chechbox_basic">
                    <input id="checkBox" ref="checkBox" type="checkbox" v-model="useYn" true-value="" false-value="Y" />
                    <span class="checkmark"></span>
                  </label>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_cancle" @click="$modal.hide('StaffSearchModal')">{{ $t('message.btnCancel') }}</button>
            <button class="btn_add" @click="staffSearch">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      filter: '',
      useYn: 'Y',
    };
  },
  methods: {
    close() {
      // this.filter = '';
      // this.useYn = 'Y';
    },
    staffSearch() {
      let param = {
        filter: this.filter,
        useYn: this.useYn,
      };
      this.$parent.loadStaffList(param);
    },
  },
};
</script>

<style></style>
