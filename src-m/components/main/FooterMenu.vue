<template>
  <div class="footer">
    <section class="g_menu_section">
      <!-- 
          터치 한 경우,
          현재 페이지인 경우 "on 클래스 추가"
         -->
      <a class="g_menu" @click="pageMove('/order/general')">
        <i class="in_img"><img src="@m/assets/img/icon_g_menu01.png" alt="견적요청" /></i>
        <span>{{ $t('message.quoteRequest') }}</span>
        <!-- <span>Yêu cầu báo giá</span> -->
      </a>
      <a class="g_menu" @click="pageMove('/order/general-list')">
        <i class="in_img"><img src="@m/assets/img/icon_g_menu02.png" alt="견적관리" /></i>
        <span>{{ $t('message.quoteManagement') }}</span>
        <!-- <span>Quản lý báo giá</span> -->
      </a>
      <a class="g_menu" @click="pageMove('/order/booking-list')">
        <i class="in_img"><img src="@m/assets/img/icon_g_menu03.png" alt="부킹관리" /></i>
        <span>{{ $t('message.managementBooking') }}</span>
        <!-- <span>Quản lý đặt chỗ</span> -->
      </a>
      <a class="g_menu" @click="pageMove('/tran/delivery-list')">
        <i class="in_img"><img src="@m/assets/img/icon_g_menu04.png" alt="배송현황" /></i>
        <span>{{ $t('message.deliveryStatus') }}</span>
        <!-- <span>Tình trạng giao hàng</span> -->
      </a>
      <!-- <a class="g_menu" @click="pageMove('')">
        <i class="in_img"><img src="@m/assets/img/icon_g_menu05.png" alt="배송지관리" /></i>
        <span>{{ $t('message.deliveryManagement') }}</span>
      </a> -->
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      menuList: 'menuList/getMenuListAll',
    }),
  },
  methods: {
    pageMove(routerPath) {
      let menuId = this.searchMenuId(routerPath);
      this.$router.push(`${routerPath}?menuId=${menuId}`);
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
