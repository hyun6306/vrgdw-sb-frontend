<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">직원목록</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right"></div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <!-- 직원검색 -->
      <div class="member_search_contents">
        <div class="search_form">
          <input type="text" id="" class="" placeholder="검색어를 입력하세요." />
          <button class="btn_search">검색</button>
        </div>
        <label class="chechbox_basic">
          <input type="checkbox" />
          <span class="checkmark"></span>
          퇴사자 포함
        </label>
        <!-- 검색결과 -->
        <div class="delivery_search_result">검색<i>0</i>건</div>
        <!-- //검색결과 -->
      </div>
      <!-- 검색결과가 없습니다. -->
      <div class="no_result">
        <span>검색결과가 없습니다.</span>
      </div>
      <!-- //검색결과가 없습니다. -->
      <!-- 직원목록 -->
      <div class="quote_list_contents deliverylist_contents">
        <swiper class="deliverylist_section swiper" :options="swiperOption" ref="swiper" v-for="index in 2" :key="index">
          <swiper-slide class="quick_btns02">
            <button class="btn_quick btn_call in_img">
              <img src="@m/assets/img/icon_call_w.png" />
              <span>전화</span>
            </button>
          </swiper-slide>
          <swiper-slide class="deliverylist_box">
            <ul class="mi_head">
              <li>
                <span class="work_stats">재직중</span>
                <!-- <span class="work_stats out">퇴사</span> -->
              </li>
              <li class="ranknname">
                <p class="member_info">
                  <i>E00145</i>
                  <span class="">부장</span>
                </p>
                <span class="border_0">홍길동</span>
              </li>
              <li class="ml-a">
                <span class="vrgdw_stats">VRGDW 허용</span>
                <!-- <span class="vrgdw_stats refusal">VRGDW 거부</span> -->
              </li>
            </ul>
            <div class="mi_info">
              <i>010-0000-0000</i>
              <i>000000</i>
              <span class="border_0">hong01@dongwha.com</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- //컨텐츠 바디 -->
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
      priceSellOpen: false,
      quoteOpen: false,
      bookmark: false,
      productDetailOpen: false,
      selectOptions: ['KOR', 'ENG', 'VET'],
      curPos: 0,
      postion: 0,
      start_x: 0,
      end_x: 0,
      quote_box_height: '',
      swiperOption: {
        initialSlide: 1,
        resistanceRatio: 0,
        slidesPerView: 'auto',
      },
    };
  },
  computed: {
    getQuoteBoxWidth: () => {
      const quoteWidth = document.querySelector('.quote_box').offsetWidth;
      return {
        quoteWidth,
      };
    },
  },
  mounted: function () {
    // this.quoteSection = document.querySelector('.quote_section');
    // this.quote = document.querySelector('.quote_box');
    // this.btnQuick = document.querySelector('.btn_quick');
    // this.quote.addEventListener('touchstart', this.touch_start);
    // this.quote.addEventListener('touchend', this.touch_end);
    // this.btnQuick.addEventListener('touchend', this.touch_end);
    // this.getInfoHeight();
  },
  methods: {
    getInfoHeight() {
      let val = this.$refs.quote_box_height.scrollHeight;
      // search_box_height 의 높이값 받아온다
      this.quote_box_height = `${val}px`;
      this.quoteSection = `${val}px`;
    },
    prev() {
      console.log('이전');
      this.quote.style.transform = `translateX(${12}rem)`;
    },
    next() {
      console.log('다음');
      this.quote.style.transform = `translateX(${-12}rem)`;
    },
    home() {
      console.log('홈');
      this.quote.style.transform = `translateX(${0})`;
    },
    touch_start(event) {
      this.start_x = event.touches[0].pageX;
      console.log('시작');
    },
    touch_end(event) {
      this.end_x = event.changedTouches[0].pageX;
      if (this.start_x > this.end_x) this.next();
      else if (this.start_x < this.end_x) this.prev();
      //else if ((this.start_x = this.end_x)) this.home();
      else this.home();
      console.log('끝');
    },
    touch() {
      this.home();
      console.log('클릭');
    },
    test() {
      console.log('테스트');
    },
  },
};
</script>

<style lang="scss" scoped>
// @import './base.scss';
// .swiper-container {
//   &::before {
//     position: absolute;
//     display: block;
//     content: '';
//     padding-top: 100%;
//   }
// }
// .swiper {
//   .menu {
//     position: relative;
//     min-width: 100px;
//     width: 40%;
//     max-width: 320px;
//     height: 100%;
//     background-color: #2c8dfb !important;
//     color: #fff;
//   }

// .content {
//   width: 100%;
// }

// .menu-button {
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   padding: 15px;
//   cursor: pointer;
//   transition: 0.3s;
//   background-color: #2c8dfb;

//   .bar {
//     position: relative;
//     display: block;
//     width: 50px;
//     height: 5px;
//     margin: 10px auto;
//     background-color: #fff;
//     border-radius: 10px;
//     transition: 0.3s;

//     &:nth-of-type(1) {
//       margin-top: 0px;
//     }
//     &:nth-of-type(3) {
//       margin-bottom: 0px;
//     }
//   }

//   &:hover {
//     .bar:nth-of-type(1) {
//       transform: translateY(1.5px) rotate(-4.5deg);
//     }
//     .bar:nth-of-type(2) {
//       opacity: 0.9;
//     }
//     .bar:nth-of-type(3) {
//       transform: translateY(-1.5px) rotate(4.5deg);
//     }
//   }

//   &.opened {
//     .bar:nth-of-type(1) {
//       transform: translateY(15px) rotate(-45deg);
//     }
//     .bar:nth-of-type(2) {
//       opacity: 0;
//     }
//     .bar:nth-of-type(3) {
//       transform: translateY(-15px) rotate(45deg);
//     }

//     &:hover {
//       .bar:nth-of-type(1) {
//         transform: translateY(13.5px) rotate(-40.5deg);
//       }
//       .bar:nth-of-type(2) {
//         opacity: 0.1;
//       }
//       .bar:nth-of-type(3) {
//         transform: translateY(-13.5px) rotate(40.5deg);
//       }
//     }
//   }
// }
//}
</style>
