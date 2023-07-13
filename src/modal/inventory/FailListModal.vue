<template>
  <modal name="FailListModal" width="840" height="auto" :clickToClose="false" @before-open="open">
    <div class="modal" id="ShippingAddress">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('FailListModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.soCreateResult') }}</p>
      <div class="modal_content excel_content">
        <div class="excel_t" v-if="errorList.length > 0" style="margin-bottom: 20px">
          <table class="">
            <colgroup>
              <col style="width: 40%" />
              <col style="width: 60%" />
            </colgroup>
            <thead>
              <th class="t-c">{{ $t('message.offrNum') }}</th>
              <th class="t-c">{{ $t('message.message') }}</th>
            </thead>
            <tbody v-for="(error, index) in errorList" :key="index">
              <td class="t-c">{{ error.offerNum }}</td>
              <td class="t-c">{{ error.message }}</td>
            </tbody>
          </table>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="$modal.hide('FailListModal')">{{ $t('message.btnClose') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'FailListModal',
  data() {
    return {
      errorList: [],
    };
  },
  methods: {
    open(event) {
      this.errorList = event.params.errorList;
    },
  },
};
</script>

<style></style>
