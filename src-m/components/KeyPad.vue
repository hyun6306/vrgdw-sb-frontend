<template>
  <div class="bottom_modal calculator_modal" :class="{ pd_open: sendKeyPad.open }" ref="bottom_modal_height" :style="`bottom:-${bottom_modal_height}`">
    <div class="calculator_modal_contents">
      <div class="calculator_section">
        <p class="calculator_price">{{ inputQty }}</p>
        <div class="calculator_box">
          <div class="calculator_num">
            <button class="btn_ca_num" @click="addNum('1')">1</button>
            <button class="btn_ca_num" @click="addNum('2')">2</button>
            <button class="btn_ca_num" @click="addNum('3')">3</button>
            <button class="btn_ca_num" @click="addNum('4')">4</button>
            <button class="btn_ca_num" @click="addNum('5')">5</button>
            <button class="btn_ca_num" @click="addNum('6')">6</button>
            <button class="btn_ca_num" @click="addNum('7')">7</button>
            <button class="btn_ca_num" @click="addNum('8')">8</button>
            <button class="btn_ca_num" @click="addNum('9')">9</button>
            <button class="btn_ca_num"></button>
            <button class="btn_ca_num" @click="addNum('0')">0</button>
            <button class="btn_ca_num"></button>
          </div>
          <div class="calculator_value">
            <button class="btn_ca_num in_img" @click="backKey"><img src="@m/assets/img/icon_back_ca.png" /></button>
            <button class="btn_ca_num" @click="sendQty(false, true)">{{ $t('message.btnCancel') }}</button>
            <button class="btn_ca_enter" @click="sendQty(true)">{{ $t('message.btnCheck') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['sendKeyPad'],
  data() {
    return {
      bottom_modal_height: '',
      inputQty: '',
    };
  },
  watch: {
    'sendKeyPad.currentQty'() {
      if (this.sendKeyPad.currentQty) this.inputQty = Math.floor(this.sendKeyPad.currentQty) + '';
    },
  },
  computed: {},
  methods: {
    getInfoHeight() {
      let val = this.$refs.bottom_modal_height.scrollHeight;
      // search_box_height 의 높이값 받아온다
      this.bottom_modal_height = `${val}px`;
    },
    sendQty(confirm, cancel = false) {
      const data = {
        index: this.sendKeyPad.index,
        inputQty: this.inputQty,
        confirm,
        cancel,
        currentQty: this.sendKeyPad.currentQty,
      };
      this.$emit('sendQty', data);
      if (confirm || cancel) {
        this.inputQty = '';
      }
    },
    backKey() {
      this.inputQty = this.inputQty.slice(0, this.inputQty.length - 1);
      this.sendQty(false);
    },
    addNum(num) {
      if (this.inputQty === '0') {
        this.inputQty = num;
      } else {
        this.inputQty += num;
      }
      this.sendQty(false);
    },
  },
  mounted: function () {
    this.getInfoHeight();
  },
};
</script>

<style></style>
