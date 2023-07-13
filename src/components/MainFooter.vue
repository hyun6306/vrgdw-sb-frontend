<template>
  <div id="footer">
    <div class="copyright">Copyright VRG Dongwha MDF. All rights reserved.</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      current: [],
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
  },
};
</script>

<style></style>
