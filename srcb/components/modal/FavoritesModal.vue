<template>
  <modal name="FavoritesModal" width="650" height="auto">
    <div class="modal" id="Favorites">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('FavoritesModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('label.favoriteMenu') }}</p>
      <div class="modal_content a-c">
        <!-- 자주찾는 메뉴가 없을 경우 -->
        <div class="not_search_result">{{ $t('msg.noFavoriteMenu') }}</div>
        <!-- //자주찾는 메뉴가 없을 경우 -->
        <ul class="favori_menu">
          <li>
            <button @click="active = !active" class="btn_fav" :class="{ fav_on: active }"></button> <a>{{ $t('label.orderGeneral') }}</a>
          </li>
          <li>
            <button @click="active = !active" class="btn_fav" :class="{ fav_on: active }"></button> <a>{{ $t('label.orderGeneralRequest') }}</a>
          </li>
          <li>
            <button @click="active = !active" class="btn_fav" :class="{ fav_on: active }"></button> <a>{{ $t('label.orderQuote') }}</a>
          </li>
          <li>
            <button @click="active = !active" class="btn_fav" :class="{ fav_on: active }"></button> <a>{{ $t('label.orderDtl') }}</a>
          </li>
          <li>
            <button @click="active = !active" class="btn_fav" :class="{ fav_on: active }"></button> <a>{{ $t('label.bookingDtl') }}</a>
          </li>
        </ul>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'FavoritesModal',
  data() {
    return {
      active: false,
    };
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
  },
};
</script>

<style></style>
