<template>
  <div class="bottom_modal" :class="{ pd_open: productDetailOpen }" ref="bottom_modal_height" :style="`bottom:-${bottom_modal_height}`">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt"></h1>
      </div>
      <div class="header_left"></div>
      <div class="header_right">
        <button class="btn_header btn_close" @click="$emit('closeProductDetail', false)"></button>
      </div>
    </div>
    <div class="bottom_modal_contents">
      <div class="table">
        <table>
          <colgroup>
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
          </colgroup>
          <tbody>
            <tr>
              <th>브랜드</th>
              <td>HDHMR</td>
              <th>두께</th>
              <td>0.22</td>
            </tr>
            <tr>
              <th>밀도</th>
              <td>HD</td>
              <th>사이즈</th>
              <td>1220 X 2440</td>
            </tr>
            <tr>
              <th>친환경</th>
              <td>E0</td>
              <th>등급</th>
              <td>Premium</td>
            </tr>
            <tr>
              <th class="4">패턴</th>
            </tr>
            <tr>
              <th>전면</th>
              <td>WHITE_100</td>
              <th>후면</th>
              <td>WHITE_100</td>
            </tr>
            <tr>
              <th class="4">경면판</th>
            </tr>
            <tr>
              <th>전면</th>
              <td>WAVE WOOD</td>
              <th>후면</th>
              <td>WAVE WOOD</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: ['productDetailOpen'],
  data() {
    return {
      bottom_modal_height: '',
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
    getInfoHeight() {
      let val = this.$refs.bottom_modal_height.scrollHeight;
      // search_box_height 의 높이값 받아온다
      this.bottom_modal_height = `${val}px`;
    },
  },
  mounted: function () {
    this.getInfoHeight();
  },
};
</script>

<style></style>
