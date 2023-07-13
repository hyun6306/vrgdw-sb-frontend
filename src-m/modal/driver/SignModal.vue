<template>
  <modal name="SignModal" width="100%" height="100%" @before-close="close" @before-open="open" :adaptive="true" :clickToClose="false" @opened="opened">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.sign') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('SignModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="">
        <div class="sign_box">
          <canvas id="myCanvas" width="350px" height="400px" v-touch:start="beginDrawing" v-touch:moving="keepDrawing" v-touch:end="stopDrawing" />
        </div>

        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_tempsave" @click="takeOverComplete">{{ $t('message.btnSave') }}</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>

<script>
// import DrawinigCanvas from '@m/modal/driver/DrawinigCanvas.vue';
import orderApi from '@/api/order/order.js';
import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(Vue2TouchEvents);

export default {
  components: {
    // DrawinigCanvas,
  },
  data() {
    return {
      priceSellOpen: false,
      quoteOpen: false,
      bookmark: false,
      selectOptions: ['KOR', 'ENG', 'VET'],
      trnInvoiceNum: '',
      signDataUrl: '',
      x: 0,
      y: 0,
      isDrawing: false,
      canvas: null,
      realCanvas: null,
      signFlag: '',
    };
  },
  methods: {
    close() {
      this.x = 0;
      this.y = 0;
      this.trnInvoiceNum = '';
    },
    open(event) {
      this.trnInvoiceNum = event.params.trnInvoiceNum;
    },
    opened() {
      this.realCanvas = document.getElementById('myCanvas');
      this.canvas = this.realCanvas.getContext('2d');
      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;
    },
    async takeOverComplete() {
      this.save();
      if (this.signFlag == true) {
        const param = {
          trnInvoiceNum: this.trnInvoiceNum,
          takeOverSign: this.signDataUrl,
        };
        try {
          const response = await orderApi.saveTakeOver(param);
          if (response.data.status == 200) {
            this.$emit('successTakeOver');
          }
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgRequireSign');
        return;
      }
    },
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas;
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    beginDrawing(e) {
      this.x = e.touches[0].clientX - e.target.offsetLeft;
      this.y = e.touches[0].clientY - e.target.offsetTop;
      this.isDrawing = true;
    },
    keepDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.touches[0].clientX - e.target.offsetLeft, e.touches[0].clientY - e.target.offsetTop);
        this.x = e.touches[0].clientX - e.target.offsetLeft;
        this.y = e.touches[0].clientY - e.target.offsetTop;
      }
    },
    stopDrawing() {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y);
        this.isDrawing = false;
      }
    },

    save() {
      if (this.x == 0 && this.y == 0) {
        // this.$EventBus.$emit('openYesModal', 'message.msgRequireSign');
        this.signFlag = false;
        return;
      } else {
        this.signDataUrl = this.realCanvas.toDataURL('image/png');
        this.signFlag = true;
      }
      // document.getElementById('output').src = dataurl;
    },
  },
  mounted() {},
};
</script>

<style></style>
