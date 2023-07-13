<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">공지사항</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right"></div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <div class="member_search_contents">
        <!-- 직원검색 -->
        <div class="search_form">
          <input type="text" id="" class="" placeholder="검색어를 입력하세요." />
          <button class="btn_search">검색</button>
        </div>
        <!-- 검색결과 -->
        <div class="member_search_result">검색<i>0</i>건</div>
        <!-- //검색결과 -->
      </div>

      <!-- 검색결과가 없습니다. -->
      <div class="no_result">
        <span>검색결과가 없습니다.</span>
      </div>
      <!-- //검색결과가 없습니다. -->
      <!-- 직원목록 -->
      <div class="notice_list_contents">
        <div class="notice_list head_notice">
          <div class="notice_title">
            <a href="" class="go_notice">
              <strong class="icon_notice">공지</strong>
              <i class="icon_new">N</i>
              모바일 공지사항 제목길다면 2줄 말줄임모바일 공지사항 제목길다면 2줄 말줄임
            </a>
          </div>
          <div class="notice_info">
            <span>관리자</span>
            <span>2022-12-20</span>
            <span>조회수<i class="ml-5">20</i></span>
            <span class="icon_file in_img border_0"><img src="@m/assets/img/icon_file.png" alt="" /></span>
          </div>
        </div>
      </div>
    </div>
    <!-- //컨텐츠 바디 -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      quoteOpen: false,
      selectOptions: ['KOR', 'ENG', 'VET'],
    };
  },
  computed: {},
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
