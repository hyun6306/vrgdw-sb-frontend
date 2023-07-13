<template>
  <modal name="DeliveryAddressModal" width="100%" height="100%" :adaptive="true" @before-open="open">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.addrNm') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('DeliveryAddressModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <!-- 배송지 -->
        <div class="delivery_search_list_contents">
          <section class="address_section address_default_section">
            <p class="as_title">{{ info.logitsAlias }}</p>
            <ul class="address_info_box">
              <li>
                <strong>{{ $t('message.postNum') }}</strong>
                <span>{{ info.postNum }}</span>
              </li>
              <li>
                <strong>{{ $t('message.addr') }}</strong>
                <span>{{ info.addr }} </span>
              </li>
              <li>
                <strong>{{ $t('message.picNm2') }}</strong>
                <span>{{ info.trnMngNm }}</span>
              </li>
              <li>
                <strong>{{ $t('message.callNum1') }}</strong>
                <span>{{ info.phoneNum1 }}</span>
              </li>
              <li>
                <strong>{{ $t('message.callNum2') }}</strong>
                <span>{{ info.phoneNum2 }}</span>
              </li>
              <li>
                <span class="note_box">{{ info.logitsRemark }}</span>
              </li>
            </ul>
          </section>
        </div>
        <!-- //배송지 -->
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_tempsave" @click="$modal.hide('DeliveryAddressModal')">{{ $t('message.btnYes') }}</button>
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
  data() {
    return {
      info: {},
    };
  },
  methods: {
    open(event) {
      this.info = event.params.deliveryInfo;
    },
  },
};
</script>

<style></style>
