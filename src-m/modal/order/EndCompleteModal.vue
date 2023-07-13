<template>
  <modal name="EndCompletehModal" width="100%" height="100%" :adaptive="true" @before-open="open">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.completion') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="close"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="endcomplete_contents">
          <div class="list_form_section">
            <ul class="list_ul">
              <li class="list_li">
                <label class="list_title">{{ $t('message.deliverType') }}</label>
                <span class="list_form post_form">
                  <label class="radio_t">
                    <input type="radio" name="radio" v-model="smplEndTrnType" value="우편" />
                    <span class="checkmark"></span>
                    {{ $t('message.post') }}
                  </label>
                  <label class="radio_t">
                    <input type="radio" name="radio" v-model="smplEndTrnType" value="영업방문" />
                    <span class="checkmark"></span>
                    {{ $t('message.salesVisit') }}
                  </label>
                </span>
              </li>
            </ul>
          </div>
          <!-- 완료처리 코멘트 -->
          <div class="endcomplete_coment">
            <label>{{ $t('message.salesComment') }}}</label>
            <textarea v-model="smplEndRemark"></textarea>
          </div>
          <!-- //완료처리 코멘트 -->
        </div>

        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_tempsave" @click="sampleEnd">{{ $t('message.btnYes') }}</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>

<script>
import detailApi from '@/api/order/detail';
export default {
  data() {
    return {
      smplEndTrnType: '',
      smplEndRemark: '',
      offrId: 0,
      offrDtlsId: 0,
      custId: '',
      offrNum: '',
    };
  },
  methods: {
    async sampleEnd() {
      try {
        //
        const param = {
          id: this.offrId,
          smplEndRemark: this.smplEndRemark,
          smplEndTrnType: this.smplEndTrnType,
          custId: this.custId,
          offrNum: this.offrNum,
          offerDtlsDtoList: [
            {
              id: this.offrDtlsId,
            },
          ],
        };
        const resp = await detailApi.putSampleEnd(param);
        await this.$parent.getQuoteDetail(false, true);
        this.$EventBus.$emit('openYesModal', resp.data.message);
        this.close();
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    close() {
      this.offrId = 0;
      this.offrDtlsId = 0;
      this.smplEndRemark = '';
      this.smplEndTrnType = '';
      this.custId = '';
      this.offrNum = '';
      this.$modal.hide('EndCompletehModal');
    },
    open(event) {
      this.offrId = event.params.offrId;
      this.offrDtlsId = event.params.offrDtlsId;
      this.custId = event.params.custId;
      this.offrNum = event.params.offrNum;
    },
  },
};
</script>

<style></style>
