<template>
  <div>
    <swiper class="quote_section swiper" :options="swiperOption" ref="swiper" v-for="(list, index) in staffList" :key="index">
      <swiper-slide class="quick_btns02">
        <button class="btn_quick btn_call in_img" @click="slideNext(index)">
          <!-- 국가번호 사용할 경우, 해당 주석 라인 사용, 아닐 경우 기존 라인 유지
          (list.mobileNumCt != undefined ? list.mobileNumCt : list.phoneNumCt != undefined ? list.phoneNumCt : '') + (list.mobileNum ? list.mobileNum : list.phoneNum) -->
          <a v-if="list.mobileNum" :href="`tel:${list.mobileNum ? list.mobileNum : list.phoneNum}`" class="btn_call">
            <img src="@m/assets/img/icon_call_w.png" />
          </a>
          <span>{{ $t('message.call') }}</span>
        </button>
      </swiper-slide>
      <swiper-slide class="quote_box">
        <div @click="$parent.moveDetail(list)">
          <div class="mi_head">
            <span class="work_stats" v-if="list.useYn == 'Y'">{{ $t('message.work') }}</span>
            <span class="work_stats out" v-else>{{ $t('message.resignation') }}</span>
            <i>{{ list.erpEmpNum }}</i>
            <span class="">{{ list.positNm }}</span>
            <span class="border_0">{{ list.userNm }}</span>
            <!-- <span class="vrgdw_stats">VRGDW 허용</span>
              <span class="vrgdw_stats refusal">VRGDW 거부</span> -->
          </div>
          <div class="mi_info">
            <i>{{ list.mobileNumCt }} {{ list.mobileNum }}</i>
            <i>{{ list.phoneNumCt }} {{ list.phoneNum }}</i>
            <span class="border_0">{{ list.email }}</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      staffList: [],
      //
      swiperOption: {
        initialSlide: 1,
        resistanceRatio: 0,
        slidesPerView: 'auto',
      },
    };
  },
  methods: {
    settingList(data) {
      this.staffList = data;
    },
    slideNext(index) {
      this.$refs.swiper[index].swiperInstance.slideNext(100, () => {});
    },
  },
  mounted() {},
};
</script>

<style></style>
