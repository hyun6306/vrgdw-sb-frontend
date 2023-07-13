<template>
  <modal name="FavoritesModal" width="650" height="auto" @opened="getCommonFavoritesList()" :clickToClose="false" @closed="close">
    <div class="modal" id="ShippingAddress">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="changeCheck()"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.favoriteMenu') }}</p>
      <!-- 자주찾는 메뉴가 없을 경우 -->
      <div class="modal_content">
        <div class="not_search_result" v-if="enter && favoritesList.length === 0">
          {{ $t('message.msgNoFavorite') }}
        </div>
        <!-- //자주찾는 메뉴가 있을 경우 -->
        <ul class="favori_menu" v-else>
          <li v-for="(list, index) in favoritesList" :key="'list' + index">
            <button @click="changeFavoriteMenu(list)" class="btn_fav" :class="{ fav_on: list.useYn === 'Y' }"></button>
            <a @click="choosePage(list)">{{ list.menuNm }}</a>
          </li>
        </ul>
      </div>
    </div>
  </modal>
</template>

<script>
import commonApi from '@/api/common';

export default {
  name: 'FavoritesModal',
  data() {
    return {
      active: false,
      favoritesList: [],
      isFavoritesMenu: false,
      menuList: {
        menuId: '',
        useYn: '',
      },
      errorList: [],
      enter: false,
    };
  },
  methods: {
    close() {
      this.enter = false;
      this.favoritesList = [];
    },
    async getCommonFavoritesList() {
      try {
        const response = await commonApi.getCommonFavoritesList();
        this.favoritesList = response.data.ds;
        this.enter = true;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
        this.enter = true;
      }
    },
    async setCommonFavoritesSave() {
      try {
        const param = {
          menuId: this.menuList.menuId,
          useYn: this.menuList.useYn,
        };
        await commonApi.setCommonFavoritesSave(param);
        this.$emit('faMe', param);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    pageMove(page) {
      this.$router.push(`${page}`);
    },
    choosePage(page) {
      this.changeCheck();
      this.$emit('choosePage', page);
    },
    changeCheck() {
      // this.getCommonFavoritesList();
      this.$modal.hide('FavoritesModal');
    },
    changeFavoriteMenu(menu) {
      this.menuList = menu;
      if (this.menuList.useYn === 'Y') {
        this.menuList.useYn = 'N';
      } else {
        this.menuList.useYn = 'Y';
      }
      this.setCommonFavoritesSave();
    },
    favoritesMenu() {
      this.isFavoritesMenu = true;
    },
  },
};
</script>

<style></style>
