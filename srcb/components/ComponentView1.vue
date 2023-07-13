<template>
  <div class="dashboard">Component1 ㅈㄹㅈㄷㄹㅈㄷㄹㄷ</div>
</template>

<script>
export default {
  props: {
    authButton: {
      type: Object,
    },
    savePage: {
      type: Array,
    },
  },
  created() {
    console.log('Component1');
  },
};
</script>

<style></style>
