<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">부킹관리</h1>
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
      <div class="booking_list_contents">
        <!-- 전체선택 -->
        <div class="bl_head">
          <label class="chechbox_basic">
            <input type="checkbox" />
            <span class="checkmark"></span>
            <strong>12</strong> Item
          </label>
        </div>
        <!-- //전체선택 -->
        <!-- 확정 -->
        <swiper class="booking_section swiper" :options="swiperOption" ref="swiper" v-for="index in 1" :key="index">
          <swiper-slide class="quick_btns02">
            <button class="btn_quick btn_call in_img" @click="touch">
              <img src="@m/assets/img/icon_call_w.png" />
              <span>전화</span>
            </button>
          </swiper-slide>
          <swiper-slide class="booking_box quote_complete">
            <div class="bb_head">
              <label class="chechbox_solo">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <button class="btn_po" @click="bookingManageOpen = !bookingManageOpen">
                <span>BK</span>
                <i> I0020220728</i>
              </button>
              <a href="" class="ml-a btn_booking btn_complete">확정</a>
            </div>
            <div class="booking_info">
              <span class="quote_item_num">FDM0011414</span>
              <span>MDF Regular 25T E1 35 (1220*2440) </span>
            </div>
            <div class="table_s02">
              <table>
                <colgroup>
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">부킹일</th>
                    <td class="t-l">22-07-2022</td>
                    <th class="t-l"></th>
                    <td class="t-r"></td>
                  </tr>
                  <tr>
                    <th class="t-l">Booking Unit Price</th>
                    <td class="t-l">90,000</td>
                    <th class="t-l">Booking Vol</th>
                    <td class="t-r">10,000/<i class="fr">100</i></td>
                  </tr>
                  <tr>
                    <th class="t-l">Freight Cost Balance</th>
                    <td class="t-l">90,000</td>
                    <th class="t-l">배송가능</th>
                    <td class="t-r fr">30/<i class="fr">100</i></td>
                  </tr>
                  <tr>
                    <td colspan="4" class="price_txt t-r"><strong>Booking Total Amount</strong><i>100,000</i><small>(VAT 포함)</small></td>
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
        <div class="booking_section" :style="`height:${booking_box_height}`">
          <div class="booking_box quote_complete" ref="booking_box_height" :style="`height:${booking_box_height}`">
            <div class="bb_head">
              <label class="chechbox_solo">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <button class="btn_po" @click="bookingManageOpen = !bookingManageOpen">
                <span>BK</span>
                <i> I0020220728</i>
              </button>
              <a href="" class="ml-a btn_booking btn_complete">확정</a>
            </div>
            <div class="booking_info">
              <span class="quote_item_num">FDM0011414</span>
              <span>MDF Regular 25T E1 35 (1220*2440) </span>
            </div>
            <div class="table_s02">
              <table>
                <colgroup>
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">부킹일</th>
                    <td class="t-l">22-07-2022</td>
                    <th class="t-l"></th>
                    <td class="t-r"></td>
                  </tr>
                  <tr>
                    <th class="t-l">Booking Unit Price</th>
                    <td class="t-l">90,000</td>
                    <th class="t-l">Booking Vol</th>
                    <td class="t-r">10,000/<i class="fr">100</i></td>
                  </tr>
                  <tr>
                    <th class="t-l">Freight Cost Balance</th>
                    <td class="t-l">90,000</td>
                    <th class="t-l">배송가능</th>
                    <td class="t-r fr">30/<i class="fr">100</i></td>
                  </tr>
                  <tr>
                    <td colspan="4" class="price_txt t-r"><strong>Booking Total Amount</strong><i>100,000</i><small>(VAT 포함)</small></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- 진행중 -->
        <div class="booking_section" :style="`height:${booking_box_height}`">
          <div class="booking_box" ref="booking_box_height" :style="`height:${booking_box_height}`">
            <div class="bb_head">
              <label class="chechbox_solo">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <button class="btn_po">
                <span>BK</span>
                <i> I0020220728</i>
              </button>
              <a href="" class="ml-a btn_booking btn_complete">진행중</a>
            </div>
            <div class="booking_info">
              <span class="quote_item_num">FDM0011414</span>
              <span>MDF Regular 25T E1 35 (1220*2440) </span>
            </div>
            <div class="table_s02">
              <table>
                <colgroup>
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">부킹일</th>
                    <td class="t-l">22-07-2022</td>
                    <th class="t-l"></th>
                    <td class="t-r"></td>
                  </tr>
                  <tr>
                    <th class="t-l">Booking Unit Price</th>
                    <td class="t-l">90,000</td>
                    <th class="t-l">Booking Vol</th>
                    <td class="t-r">10,000/<i class="fr">100</i></td>
                  </tr>
                  <tr>
                    <th class="t-l">Freight Cost Balance</th>
                    <td class="t-l">90,000</td>
                    <th class="t-l">배송가능</th>
                    <td class="t-r fr">30/<i class="fr">100</i></td>
                  </tr>
                  <tr>
                    <td colspan="4" class="price_txt t-r"><strong>Booking Total Amount</strong><i>100,000</i><small>(VAT 포함)</small></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- 완료 -->
        <div class="booking_section" :style="`height:${booking_box_height}`">
          <div class="booking_box quote_complete" ref="booking_box_height" :style="`height:${booking_box_height}`">
            <div class="bb_head">
              <button class="btn_po">
                <span>BK</span>
                <i> I0020220728</i>
              </button>
              <a href="" class="ml-a btn_booking btn_quote_complete">완료</a>
            </div>
            <div class="booking_info">
              <span class="quote_item_num">FDM0011414</span>
              <span>MDF Regular 25T E1 35 (1220*2440) </span>
            </div>
            <div class="table_s02">
              <table>
                <colgroup>
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">부킹일</th>
                    <td class="t-l">22-07-2022</td>
                    <th class="t-l"></th>
                    <td class="t-r"></td>
                  </tr>
                  <tr>
                    <th class="t-l">Booking Unit Price</th>
                    <td class="t-l">90,000</td>
                    <th class="t-l">Booking Vol</th>
                    <td class="t-r">10,000/<i class="fr">100</i></td>
                  </tr>
                  <tr>
                    <th class="t-l">Freight Cost Balance</th>
                    <td class="t-l">90,000</td>
                    <th class="t-l">배송가능</th>
                    <td class="t-r fr">30/<i class="fr">100</i></td>
                  </tr>
                  <tr>
                    <td colspan="4" class="price_txt t-r"><strong>Booking Total Amount</strong><i>100,000</i><small>(VAT 포함)</small></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- 취소 -->
        <div class="booking_section" :style="`height:${booking_box_height}`">
          <div class="booking_box" ref="booking_box_height" :style="`height:${booking_box_height}`">
            <div class="bb_head">
              <button class="btn_po">
                <span>BK</span>
                <i> I0020220728</i>
              </button>
              <a href="" class="ml-a btn_booking btn_quote_cancle">취소</a>
            </div>
            <div class="booking_info">
              <span class="quote_item_num">FDM0011414</span>
              <span>MDF Regular 25T E1 35 (1220*2440) </span>
            </div>
            <div class="table_s02">
              <table>
                <colgroup>
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">부킹일</th>
                    <td class="t-l">22-07-2022</td>
                    <th class="t-l"></th>
                    <td class="t-r"></td>
                  </tr>
                  <tr>
                    <th class="t-l">Booking Unit Price</th>
                    <td class="t-l">90,000</td>
                    <th class="t-l">Booking Vol</th>
                    <td class="t-r">10,000/<i class="fr">100</i></td>
                  </tr>
                  <tr>
                    <th class="t-l">Freight Cost Balance</th>
                    <td class="t-l">90,000</td>
                    <th class="t-l">배송가능</th>
                    <td class="t-r fr">30/<i class="fr">100</i></td>
                  </tr>
                  <tr>
                    <td colspan="4" class="price_txt t-r"><strong>Booking Total Amount</strong><i>100,000</i><small>(VAT 포함)</small></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- 결재필요 -->
        <div class="booking_section" :style="`height:${booking_box_height}`">
          <div class="booking_box" ref="booking_box_height" :style="`height:${booking_box_height}`">
            <div class="bb_head">
              <label class="chechbox_solo">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <button class="btn_po">
                <span>BK</span>
                <i> I0020220728</i>
              </button>
              <a href="" class="ml-a btn_booking btn_complete">결재필요</a>
            </div>
            <div class="booking_info">
              <span class="quote_item_num">FDM0011414</span>
              <span>MDF Regular 25T E1 35 (1220*2440) </span>
            </div>
            <div class="table_s02">
              <table>
                <colgroup>
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">부킹일</th>
                    <td class="t-l">22-07-2022</td>
                    <th class="t-l"></th>
                    <td class="t-r"></td>
                  </tr>
                  <tr>
                    <th class="t-l">Booking Unit Price</th>
                    <td class="t-l">90,000</td>
                    <th class="t-l">Booking Vol</th>
                    <td class="t-r">10,000/<i class="fr">100</i></td>
                  </tr>
                  <tr>
                    <th class="t-l">Freight Cost Balance</th>
                    <td class="t-l">90,000</td>
                    <th class="t-l">배송가능</th>
                    <td class="t-r fr">30/<i class="fr">100</i></td>
                  </tr>
                  <!-- 영업담당자 로그인 노출-->
                  <tr>
                    <th class="t-l">Booking Unit Price</th>
                    <td><input type="number" pattern="[0-9]*" class="d_input" /></td>
                    <th class="t-l">Booking Vol</th>
                    <td class="t-r">10,000 /<i class="fr">100</i></td>
                  </tr>
                  <tr>
                    <th class="t-l">Freight Cost Balance</th>
                    <td><input type="number" pattern="[0-9]*" class="d_input" /></td>
                    <th class="t-l">배송가능</th>
                    <td class="t-r fr">10,000 /100</td>
                  </tr>
                  <!-- //영업담당자 로그인 노출-->
                  <tr>
                    <td colspan="4" class="price_txt t-r"><strong>Booking Total Amount</strong><i>100,000</i><small>(VAT 포함)</small></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents">
        <div class="btn_box">
          <button class="btn_end">저장</button>
          <button class="btn_save">부킹확정</button>
          <button class="btn_green">재고할당요청</button>
        </div>
      </div>
    </div>
    <BookingManageModal :bookingManageOpen="bookingManageOpen" @closebookingManage="bookingManageOpen = !bookingManageOpen" />
    <!-- //컨텐츠 바디 -->
  </div>
</template>

<script>
import BookingManageModal from '@mb/components/modal/quote/BookingManageModal'; //부킹관리 하단모달
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  components: {
    BookingManageModal,
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
      booking_box_height: '',
      bookingManageOpen: false,
      swiperOption: {
        initialSlide: 1,
        resistanceRatio: 0,
        slidesPerView: 'auto',
      },
    };
  },
  computed: {
    getBookingBoxWidth: () => {
      const bookingWidth = document.querySelector('.booking_box').offsetWidth;
      return {
        bookingWidth,
      };
    },
  },
  mounted: function () {
    // this.bookingSection = document.querySelector('.booking_section');
    // this.booking = document.querySelector('.booking_box');
    // this.btnQuick = document.querySelector('.btn_quick');
    // this.booking.addEventListener('touchstart', this.touch_start);
    // this.booking.addEventListener('touchend', this.touch_end);
    // this.btnQuick.addEventListener('touchend', this.touch_end);
    // this.getInfoHeight();
  },
  methods: {
    getInfoHeight() {
      let val = this.$refs.booking_box_height.scrollHeight;
      // search_box_height 의 높이값 받아온다
      this.booking_box_height = `${val}px`;
      this.bookingSection = `${val}px`;
    },
    prev() {
      console.log('이전');
      this.booking.style.transform = `translateX(${12}rem)`;
    },
    next() {
      console.log('다음');
      this.booking.style.transform = `translateX(${-6}rem)`;
    },
    home() {
      console.log('홈');
      this.booking.style.transform = `translateX(${0})`;
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
  },
};
</script>

<style></style>
