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
    <router-view></router-view>
    <router-view name="footer"></router-view>
    <button class="btn-report" @click="pageMove('/b/index')">현황판 바로가기</button>
    <!-- 홈버튼 -->
    <a href="" class="btn_home"><img src="@m/assets/img/icon_home.png" alt="홈으로 이동" /></a>
    <!-- 탑버튼 -->
    <a href="" class="btn_top"><img src="@m/assets/img/icon_top.png" alt="최상단으로 이동" /></a>
    <!-- 상단 헤더 -->
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
@import '@m/assets/scss/index.scss';
</style>
