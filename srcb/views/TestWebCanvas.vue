<template>
  <div>
    <canvas @mousedown="startPainting" @mouseup="finishedPainting" @mousemove="draw" id="canvas"></canvas>
    <button @click="save"></button>
    <img src="" id="output" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      vueCanvas: null,
      painting: false,
      canvas: null,
      ctx: null,
    };
  },
  methods: {
    startPainting(e) {
      console.log(e);
      this.painting = true;
      console.log(this.painting);
      this.draw(e);
    },
    finishedPainting() {
      this.painting = false;
      console.log(this.painting);
      this.ctx.beginPath();
    },
    draw(e) {
      if (!this.painting) return;
      this.ctx.lineWidth = 10;
      this.ctx.lineCap = 'round';

      this.ctx.lineTo(e.clientX, e.clientY);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX, e.clientY);
    },
    save() {
      var dataurl = this.canvas.toDataURL('image/png');
      document.getElementById('output').src = dataurl;
    },
  },
  mounted() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.ctx.fill();
    // Resize canvas

    // this.canvas.height = '150';
    // this.canvas.width = '150';
  },
};
</script>

<style scope>
#canvas {
  border: 3px solid black;
  background: #eee;
  /* height: 100px;
  width: 100%; */
}
</style>
