<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">배송지목록</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right">
        <button class="btn_header btn_add_address">배송지 추가</button>
      </div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <!-- 배송지 검색 -->
      <div class="deliverylist_search_contents">
        <div class="delivery_area">
          <span>배송권역</span>
          <MultiSelect id="" style="30%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="선택"></MultiSelect>
          <MultiSelect id="" style="60%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="선택"></MultiSelect>
        </div>
        <div class="search_form">
          <input type="text" id="" class="" placeholder="검색어를 입력하세요." />
          <button class="btn_search">검색</button>
        </div>
        <!-- 검색결과 -->
        <div class="delivery_search_result">검색<i>0</i>건</div>
        <!-- //검색결과 -->
      </div>

      <!-- 검색결과가 없습니다. -->
      <div class="no_result">
        <span>검색결과가 없습니다.</span>
      </div>
      <!-- //검색결과가 없습니다. -->
      <!-- 배송지 목록 -->
      <div class="quote_list_contents deliverylist_contents">
        <swiper class="deliverylist_section swiper" :options="swiperOption" ref="swiper" v-for="index in 2" :key="index">
          <swiper-slide class="quick_btns02">
            <button class="btn_quick btn_call in_img">
              <img src="@m/assets/img/icon_call_w.png" />
              <span>전화</span>
            </button>
          </swiper-slide>
          <swiper-slide class="deliverylist_box">
            <div class="deliverylist_head">
              <p class="deliverylist_head_info">
                <span class="address_default">기본배송지</span>
                <span class="point">대리점 A</span>
              </p>
              <p class="deliverylist_head_info">
                <span class="manager">담당자명</span>
                <span class="manager_name">Destination A</span>
              </p>
            </div>
            <div class="deliverylist_info">
              <p class="detail_info">
                <span>서울특별시</span>
                <span>영등포구</span>
              </p>
              <span>여의나루로 1234 1203동 201호</span>
              <span>
                <i>000-0000-0000</i>
                <i>000-0000-0000</i>
              </span>
              <div class="special_note">
                <span>[특이사항]</span>
                <strong>문앞에 놓아주세요.</strong>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="quick_btns02">
            <button class="btn_quick btn_trash in_img">
              <img src="@m/assets/img/icon_trash.png" />
              <span>삭제</span>
            </button>
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
