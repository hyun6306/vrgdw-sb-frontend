<template>
  <modal name="DeliverAlarmModal" width="90%" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('DeliverAlarmModal')"></button>
      </div>
      <p class="modal_title" v-if="ment === 'Network Error'">{{ $t('message.alert') }}</p>
      <p class="modal_title" v-else>{{ $t('message.alert') }}</p>
      <div class="modal_content">
        <p :class="[maxLength ? 'txt_onboard' : 'txt_onboard']" v-html="$t(ment)"></p>
      </div>
      <div class="modal_btn_contents">
        <button class="btn_primary" @click="$modal.hide('DeliverAlarmModal')" v-if="ment === 'Network Error'">{{ $t('message.btnCheck') }}</button>
        <button class="btn_primary" @click="$modal.hide('DeliverAlarmModal')" v-else>
          {{ $t('message.btnCheck') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import alarmLength from '@/mixins/alarmLength';
export default {
  name: 'DeliverAlarmModal',
  props: ['ment'],
  mixins: [alarmLength],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
