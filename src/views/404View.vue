<template>
  <div class="four_notpage_wrap">
    <div class="in_box">
      <span>404</span>
      <small>Page not found</small>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.four_notpage_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .in_box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: column wrap;
    width: 100%;
    height: 100%;
    color: #333;
    padding-top: 15vh;

    > span {
      font-size: 150px;
      font-weight: bold;
    }

    > small {
      font-size: 30px;
    }
  }
}
</style>
