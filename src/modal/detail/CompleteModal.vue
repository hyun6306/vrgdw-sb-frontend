<template>
  <modal name="CompleteModal" width="540" height="auto" :adaptive="true" @before-open="beforeOpen" @before-close="close" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CompleteModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.completion') }}</p>
      <div class="modal_content a-c">
        <div class="plant_radio_box">
          <span>{{ $t('message.deliveryType') }}</span>
          <label class="radio_t">
            <input type="radio" name="radio" @change="radioBtn('우편')" />
            <span class="checkmark"></span>
            {{ $t('message.post') }}
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" @change="radioBtn('영업방문')" />
            <span class="checkmark"></span>
            {{ $t('message.salesVisit') }}
          </label>
        </div>
        <div class="form_textarea" style="height: 120px">
          <textarea placeholder="" v-model="comment" />
        </div>
        <span class="sub_txt"> * {{ $t('message.msgReleaseReq') }} </span>
        <div class="modal_btn_contents_t05">
          <button class="btn_default btn_primary" @click="confirm">
            {{ $t('message.btnComplete') }}
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import detailApi from '@/api/order/detail';
export default {
  name: 'CompleteModal',
  data() {
    return {
      checkData: [],
      comment: '',
      radio: '',
    };
  },
  props: ['checkedData', 'openInfo', 'offrInfo'],
  watch: {
    // checkedData(data) {
    //   for (let key in data) {
    //     this.checkData.push({ id: data[key].id });
    //   }
    // },
  },
  methods: {
    radioBtn(data) {
      this.radio = data;
    },
    async confirm() {
      let offrData = {
        id: this.openInfo.id,
        smplEndTrnType: this.radio,
        smplEndRemark: this.comment,
        custId: this.openInfo.custId,
        offrNum: this.offrInfo.offrNum,
      };
      let param = { ...offrData, ...{ offerDtlsDtoList: this.checkData } };
      try {
        await detailApi.putSampleEnd(param);

        await this.$parent.completeModal('reload');
        this.$modal.hide('CompleteModal');
        await this.$parent.completeModal('suss');
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    beforeOpen() {
      for (let key in this.checkedData) {
        this.checkData.push({ id: this.checkedData[key].id });
      }
    },
    close() {
      this.checkData = [];
      this.comment = '';
      this.radio = '';
    },
  },
};
</script>

<style></style>
