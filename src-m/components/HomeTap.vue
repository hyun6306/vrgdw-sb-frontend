<template>
  <div>
    <!-- 홈버튼 -->
    <a @click="goToMain" class="btn_home" v-if="showHome"><img src="@m/assets/img/icon_home.png" alt="홈으로 이동" /></a>
    <!-- 탑버튼 -->
    <a @click="goToTop" class="btn_top"><img src="@m/assets/img/icon_top.png" alt="최상단으로 이동" /></a>
    <!-- 상단 헤더 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    showHome: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      menuList: 'menuList/getMenuListAll',
    }),
  },
  methods: {
    goToMain() {
      const menuId = this.searchMenuId('/main');
      this.$router.push('/main?menuId=' + menuId);
    },
    goToTop() {
      this.$emit('goToTop');
    },
    searchMenuId(routerPath) {
      let menuId;
      this.menuList.forEach(dept1 => {
        if (dept1.routerPath === routerPath) {
          menuId = dept1.menuId;
        }
        dept1.children.forEach(dept2 => {
          if (dept2.routerPath === routerPath) {
            menuId = dept2.menuId;
          }
          dept2.children.forEach(dept3 => {
            if (dept3.routerPath === routerPath) {
              menuId = dept3.menuId;
            }
          });
        });
      });
      return menuId;
    },
  },
};
</script>

<style></style>
