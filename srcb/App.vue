<template>
  <div id="app" class="lang_eng">
    <!--로딩  -->
    <div class="loading" style="display: none">
      <div class="img">
        <div class="sk-fading-circle">
          <div class="sk-circle1 sk-circle"></div>
          <div class="sk-circle2 sk-circle"></div>
          <div class="sk-circle3 sk-circle"></div>
          <div class="sk-circle4 sk-circle"></div>
          <div class="sk-circle5 sk-circle"></div>
          <div class="sk-circle6 sk-circle"></div>
          <div class="sk-circle7 sk-circle"></div>
          <div class="sk-circle8 sk-circle"></div>
          <div class="sk-circle9 sk-circle"></div>
          <div class="sk-circle10 sk-circle"></div>
          <div class="sk-circle11 sk-circle"></div>
          <div class="sk-circle12 sk-circle"></div>
        </div>
      </div>
    </div>
    <!-- //로딩 -->
    <router-view name="header"></router-view>
    <router-view name="sideHidenBtn"></router-view>
    <router-view></router-view>
    <!-- 삭제요청 0901 박왕균수석님 확인
       <router-view name="footer"></router-view> -->
    <button class="btn-report" @click="pageMove('/b/index')">현황판 바로가기</button>
  </div>
</template>

<script>
export default {
  methods: {
    pageMove(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';
@import '@/assets/fonts/font.css';
</style>
