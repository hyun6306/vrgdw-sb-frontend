<template>
  <div class="bottom_modal calculator_modal" :class="{ pd_open: calculatorOpen }" ref="bottom_modal_height" :style="`bottom:-${bottom_modal_height}`">
    <div class="calculator_modal_contents">
      <div class="calculator_section">
        <p class="calculator_price">13123</p>
        <div class="calculator_box">
          <div class="calculator_num">
            <button class="btn_ca_num">1</button>
            <button class="btn_ca_num">2</button>
            <button class="btn_ca_num">3</button>
            <button class="btn_ca_num">4</button>
            <button class="btn_ca_num">5</button>
            <button class="btn_ca_num">6</button>
            <button class="btn_ca_num">7</button>
            <button class="btn_ca_num">8</button>
            <button class="btn_ca_num">9</button>
            <button class="btn_ca_num">.</button>
            <button class="btn_ca_num">0</button>
            <button class="btn_ca_num"></button>
          </div>
          <div class="calculator_value">
            <button class="btn_ca_num in_img"><img src="@m/assets/img/icon_back_ca.png" /></button>
            <button class="btn_ca_num" @click="$emit('closecalculator', false)">취소</button>
            <button class="btn_ca_enter">확인</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: ['calculatorOpen'],
  data() {
    return {
      bottom_modal_height: '',
    };
  },
  computed: {
    ...mapGetters({
      notLogin: 'userInfo/getNotLogin',
      menuList: 'userInfo/getMenuList',
    }),
  },
  methods: {
    pageMove(page) {
      this.$router.push(`${page}`);
    },
    getInfoHeight() {
      let val = this.$refs.bottom_modal_height.scrollHeight;
      // search_box_height 의 높이값 받아온다
      this.bottom_modal_height = `${val}px`;
    },
  },
  mounted: function () {
    this.getInfoHeight();
  },
};
</script>

<style></style>
