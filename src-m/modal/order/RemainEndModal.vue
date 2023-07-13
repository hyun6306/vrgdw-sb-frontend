<template>
  <modal name="RemainEndModal" width="100%" height="100%" :adaptive="true" @before-open="open">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">"{{ $t('message.btnCloseRemain') }}"</h1>
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
                <label class="list_title">{{ $t('message.rmnEndTypeNm') }}</label>
                <span class="list_form post_form">
                  <label class="radio_t" v-for="(option, index) in rmnOptions" :key="index">
                    <input type="radio" name="radio" v-model="dfcEndTypeCd" :value="option.value" />
                    <span class="checkmark"></span>
                    {{ option.text }}
                  </label>
                </span>
              </li>
            </ul>
          </div>
          <!-- 완료처리 코멘트 -->
          <div class="endcomplete_coment">
            <label>{{ $t('message.rmnEndTypeNm') }}</label>
            <textarea v-model="dfcEndRemark"></textarea>
          </div>
          <!-- //완료처리 코멘트 -->
        </div>

        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_tempsave" @click="saveBookingEnd">{{ $t('message.btnYes') }}</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>

<script>
import commonApi from '@/api/common';
import bookingApi from '@/api/order/booking';
export default {
  data() {
    return {
      dfcEndTypeCd: '',
      dfcEndRemark: '',
      dfcList: [],
      rmnOptions: [],
    };
  },
  methods: {
    async saveBookingEnd() {
      try {
        if (!this.dfcEndRemark) {
          this.$EventBus.$emit('openYesModal', 'message.msgRemainEndRemark');
        } else {
          const param = [];
          this.dfcList.forEach(list => {
            param.push({
              id: list.id,
              offrId: list.offrId,
              offrNum: list.offrNum,
              offrDtlsId: list.offrDtlsId,
              prdtCd: list.prdtCd,
              dfcEndTypeCd: this.dfcEndTypeCd.replace(/ /gi, ''),
              dfcEndRemark: this.dfcEndRemark,
            });
          });
          await bookingApi.saveBookingEnd(param);
          await this.$parent.reLoad();
          this.$EventBus.$emit('openYesModal', 'message.msgSelectRemainEnd');
          this.close();
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
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);

        if (groupCd === 'RMN_END_REMARK') {
          this.rmnOptions = response.data.ds;
          if (this.rmnOptions.length > 0) this.dfcEndTypeCd = this.rmnOptions[0].value;
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
    close() {
      this.dfcList = [];
      this.dfcEndTypeCd = '';
      this.dfcEndRemark = '';
      this.dfcEndTypeCd = this.rmnOptions[0].value;
      this.$modal.hide('RemainEndModal');
    },
    open(event) {
      this.dfcList = event.params.dfcList;
    },
  },
  mounted() {
    this.getCommonCodeCombo('RMN_END_REMARK');
  },
};
</script>

<style></style>
