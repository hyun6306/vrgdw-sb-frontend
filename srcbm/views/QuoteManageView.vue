<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">견적관리</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right">
        <button class="btn_header in_img"><img src="@m/assets/img/icon_search.png" /></button>
      </div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <div class="quote_list_contents">
        <!-- <div class="quote_section" :style="`height:${quote_box_height}`">
          <div class="quote_box" ref="quote_box_height" :style="`height:${quote_box_height}`">
            <div class="qb_head">
              <label class="chechbox_solo">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <button class="btn_po" @click="test">
                <span>PO No. :</span>
                <i> I0020220728</i>
              </button>
              <button class="btn_paper in_img"><img src="@m/assets/img/icon_paper.png" /></button>
              <a href="" class="btn_quote btn_quote_tempsave">임시저장</a>
            </div>
            <div class="quote_info">
              <span class="quote_item_num">아이템 건수<i>1,000</i></span>
              <p class="quote_ing">
                <span>견적요청일 <i>2022-09-22</i></span>
                <span>진행률<i>0%</i></span>
              </p>
            </div>
            <div class="table">
              <table>
                <colgroup>
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th colspan="4">Quotation Total Amount</th>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <small>VAT 별도</small>
                      <span>60,000,000</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Requested Quantity</th>
                    <th>Delivery Completed</th>
                    <th>Delivery On-Going</th>
                    <th>Delivery Available</th>
                  </tr>
                  <tr>
                    <td class="t-r fblue">200</td>
                    <td class="t-r fg">150</td>
                    <td class="t-r fg">40</td>
                    <td class="t-r fr">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="quick_btns">
            <button class="btn_quick btn_call in_img" @click="touch"><img src="@m/assets/img/icon_call_w.png" /></button>
            <button class="btn_quick btn_delivery in_img" @click="touch"><img src="@m/assets/img/icon_truck_w.png" /></button>
            <button class="btn_quick btn_trash in_img" @click="touch"><img src="@m/assets/img/icon_trash.png" /></button>
            <button class="btn_quick btn_delete in_img" @click="touch"><img src="@m/assets/img/icon_delete.png" /></button>
          </div>
        </div>
        <div class="quote_section" :style="`height:${quote_box_height}`">
          <div class="quote_box quote_complete" ref="quote_box_height" :style="`height:${quote_box_height}`">
            <div class="qb_head">
              <label class="chechbox_solo">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <button class="btn_po">
                <span>PO No. :</span>
                <i> I0020220728</i>
              </button>
              <button class="btn_paper in_img"><img src="@m/assets/img/icon_paper.png" /></button>
              <a href="" class="btn_quote btn_quote_complete">완료</a>
            </div>
            <div class="quote_info">
              <span class="quote_item_num">아이템 건수<i>1,000</i></span>
              <p class="quote_ing">
                <span>견적요청일 <i>2022-09-22</i></span>
                <span>진행률<i>0%</i></span>
              </p>
            </div>
            <div class="table">
              <table>
                <colgroup>
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th colspan="4">Quotation Total Amount</th>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <small>VAT 별도</small>
                      <span>60,000,000</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Requested Quantity</th>
                    <th>Delivery Completed</th>
                    <th>Delivery On-Going</th>
                    <th>Delivery Available</th>
                  </tr>
                  <tr>
                    <td class="t-r fblue">200</td>
                    <td class="t-r fg">150</td>
                    <td class="t-r fg">40</td>
                    <td class="t-r fr">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="quick_btns">
            <button class="btn_quick btn_call in_img" @click="touch"><img src="@m/assets/img/icon_call_w.png" /></button>
            <button class="btn_quick btn_delivery in_img" @click="touch"><img src="@m/assets/img/icon_truck_w.png" /></button>
            <button class="btn_quick btn_trash in_img" @click="touch"><img src="@m/assets/img/icon_trash.png" /></button>
            <button class="btn_quick btn_delete in_img" @click="touch"><img src="@m/assets/img/icon_delete.png" /></button>
          </div>
        </div>
        <div class="quote_section" :style="`height:${quote_box_height}`">
          <div class="quote_box" ref="quote_box_height" :style="`height:${quote_box_height}`">
            <div class="qb_head">
              <label class="chechbox_solo">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <button class="btn_po">
                <span>PO No. :</span>
                <i> I0020220729</i>
              </button>
              <button class="btn_paper in_img"><img src="@m/assets/img/icon_paper.png" /></button>
              <a href="" class="btn_quote btn_quote_cancle">취소</a>
            </div>
            <div class="quote_info">
              <span class="quote_item_num">아이템 건수<i>1,000</i></span>
              <p class="quote_ing">
                <span>견적요청일 <i>2022-09-22</i></span>
                <span>진행률<i>0%</i></span>
              </p>
            </div>
            <div class="table">
              <table>
                <colgroup>
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th colspan="4">Quotation Total Amount</th>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <small>VAT 별도</small>
                      <span>60,000,000</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Requested Quantity</th>
                    <th>Delivery Completed</th>
                    <th>Delivery On-Going</th>
                    <th>Delivery Available</th>
                  </tr>
                  <tr>
                    <td class="t-r fblue">200</td>
                    <td class="t-r fg">150</td>
                    <td class="t-r fg">40</td>
                    <td class="t-r fr">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="quick_btns">
            <button class="btn_quick btn_call in_img" @click="touch"><img src="@m/assets/img/icon_call_w.png" /></button>
            <button class="btn_quick btn_delivery in_img" @click="touch"><img src="@m/assets/img/icon_truck_w.png" /></button>
            <button class="btn_quick btn_trash in_img" @click="touch"><img src="@m/assets/img/icon_trash.png" /></button>
            <button class="btn_quick btn_delete in_img" @click="touch"><img src="@m/assets/img/icon_delete.png" /></button>
          </div>
        </div>-->
        <swiper class="quote_section swiper" :options="swiperOption" ref="swiper" v-for="index in 3" :key="index">
          <swiper-slide class="quick_btns">
            <button class="btn_quick btn_call in_img">
              <img src="@m/assets/img/icon_call_w.png" />
              <span>전화</span>
            </button>
            <button class="btn_quick btn_delivery in_img">
              <img src="@m/assets/img/icon_truck_w.png" />
              <span>배송지</span>
            </button>
          </swiper-slide>
          <swiper-slide class="quote_box">
            <div class="qb_head">
              <label class="chechbox_solo">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <button class="btn_po underline">
                <i> QT00001076</i>
              </button>
              <button class="btn_paper in_img"><img src="@m/assets/img/icon_paper.png" /></button>
              <a href="" class="btn_quote btn_quote_cancle">취소</a>
            </div>
            <div class="quote_info">
              <span class="quote_item_num">아이템 건수<i>1,000</i></span>
              <p class="quote_ing">
                <span>견적요청일 <i>2022-09-22</i></span>
                <span>진행률<i>0%</i></span>
              </p>
            </div>
            <div class="table">
              <table>
                <colgroup>
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th colspan="4">Quotation Total Amount</th>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <div class="a-sb">
                        <small>VAT 별도</small>
                        <span>60,000,000</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Requested Quantity</th>
                    <th>Delivery Completed</th>
                    <th>Delivery On-Going</th>
                    <th>Delivery Available</th>
                  </tr>
                  <tr>
                    <td class="t-r fblue">200</td>
                    <td class="t-r fg">150</td>
                    <td class="t-r fg">40</td>
                    <td class="t-r fr">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </swiper-slide>
          <swiper-slide class="quick_btns">
            <button class="btn_quick btn_trash in_img">
              <img src="@m/assets/img/icon_trash.png" />
              <span>삭제</span>
            </button>
            <button class="btn_quick btn_delete in_img">
              <img src="@m/assets/img/icon_delete.png" />
              <span>취소</span>
            </button>
          </swiper-slide>
        </swiper>
      </div>

      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents">
        <div class="btn_box">
          <button class="btn_stock_request">복사등록</button>
          <button class="btn_tempsave">견적요청 확정</button>
        </div>
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
