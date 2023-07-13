<template>
  <div>
    <input type="file" accept="image/*" capture="camera" ref="images" />
    <button @click="ResizeImage"></button>
    <button @click="checkBlob"></button>
    <img src="" id="output" />
    <!-- <button type="button" class="button is-rounded" :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }" @click="toggleCamera">
      <span v-if="!isCameraOpen">Open Camera</span>
      <span v-else>Close Camera</span>
    </button>
    <div v-show="isCameraOpen && isLoading" class="camera-loading">
      <ul class="loader-circle">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

    <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{ flash: isShotPhoto }">
      <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div>

      <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5" autoplay></video>

      <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="337.5"></canvas>
    </div>

    <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
      <button type="button" class="button" @click="takePhoto">
        <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png" />
      </button>
    </div>

    <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
      <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage"> Download </a>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: '#',
    };
  },
  methods: {
    ResizeImage() {
      console.log(this.$refs.images.files[0]);
      const vm = this;
      // var filesToUpload = document.getElementById('imageFile').files;
      var file = this.$refs.images.files[0];

      // 문서내에 img 객체를 생성합니다
      // var img = document.createElement('img');
      // 파일을 읽을 수 있는 File Reader 를 생성합니다
      var reader = new FileReader();
      // 파일이 읽혀지면 아래 함수가 실행됩니다
      reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;

        image.onload = function () {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');

          // 캔버스에 업로드된 이미지를 그려줍니다
          ctx.drawImage(this, 0, 0);

          // 최대폭을 400 으로 정했다고 가정했을때
          // 최대폭을 넘어가는 경우 canvas 크기를 변경해 줍니다.
          var MAX_WIDTH = 300;
          var MAX_HEIGHT = 300;
          var width = this.width;
          var height = this.height;
          console.log(width);
          console.log(height);
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;

          // canvas에 변경된 크기의 이미지를 다시 그려줍니다.
          ctx = canvas.getContext('2d');
          ctx.drawImage(this, 0, 0, width, height);

          // canvas 에 있는 이미지를 img 태그로 넣어줍니다 vm.$refs.images.files[0].type
          var dataurl = canvas.toDataURL(vm.$refs.images.files[0]);
          document.getElementById('output').src = dataurl;

          vm.blob = vm.dataURItoBlob(dataurl);
        };

        // // HTML5 canvas 객체를 생성합니다
      };
      reader.readAsDataURL(file);
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], { type: mimeString });
      return blob;
    },
    checkBlob() {
      console.log(this.blob);
    },
    pageMove(path) {
      this.$router.push(path);
    },
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },

    async createCameraElement() {
      this.isLoading = true;

      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });

      await navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          this.isLoading = false;
          this.$refs.camera.play();
          this.$refs.camera.srcObject = stream;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
          alert("May the browser didn't support or there is some errors.");
        });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach(track => {
        track.stop();
      });
    },

    takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }

      this.isPhotoTaken = !this.isPhotoTaken;

      const context = this.$refs.canvas.getContext('2d');
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
    },

    downloadImage() {
      const download = document.getElementById('downloadPhoto');
      const canvas = document.getElementById('photoTaken').toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
      download.setAttribute('href', canvas);
    },
  },
};
</script>

<style></style>
