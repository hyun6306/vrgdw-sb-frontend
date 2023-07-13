<template>
  <div id="canvas">
    <canvas class="sign_box" id="myCanvas" v-touch:start="beginDrawing" v-touch:moving="keepDrawing" v-touch:end="stopDrawing" />
    <button @click="save">save</button>
    <!-- <img src="" id="output" /> -->
  </div>
</template>

<script>
import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(Vue2TouchEvents);

export default {
  data() {
    return {
      x: 0,
      y: 0,
      isDrawing: false,
      canvas: null,
      realCanvas: null,
    };
  },
  methods: {
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
      // this.x = e.offsetX;
      // this.y = e.offsetY;
      this.x = e.touches[0].clientX;
      this.y = e.touches[0].clientY;
      this.isDrawing = true;
    },
    keepDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.touches[0].clientX, e.touches[0].clientY);
        this.x = e.touches[0].clientX;
        this.y = e.touches[0].clientY;
      }
    },
    stopDrawing(e) {
      try {
        if (this.isDrawing === true) {
          this.drawLine(this.x, this.y, e.touches[0].clientX, e.touches[0].clientY);
          this.x = 0;
          this.y = 0;
          this.isDrawing = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    save() {
      let dataurl = this.realCanvas.toDataURL('image/png');
      this.$emit('canvasImg', dataurl);
    },
  },
  mounted() {
    this.realCanvas = document.getElementById('myCanvas');
    this.canvas = this.realCanvas.getContext('2d');
    // Resize canvas

    // this.canvas.height = '150';
    // this.canvas.width = '150';
  },
};
</script>

<style scope>
#myCanvas {
  border: 1px solid grey;
}
#canvas {
  margin: -30px;
  padding: 20px;
}
</style>
