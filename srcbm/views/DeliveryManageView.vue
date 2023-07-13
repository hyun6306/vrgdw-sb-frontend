<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">배송현황</h1>
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
      <div class="delivery_manage_contents">
        <!-- 전체선택 -->
        <div class="dm_head">
          <p class="dm_num_item"><strong>12</strong> Item</p>

          <MultiSelect id="" style="width: 15rem" class="ml-a" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="배송상태"></MultiSelect>
        </div>

        <!-- //전체선택 -->
        <!-- 확정 -->

        <div class="dm_section">
          <div class="dm_box">
            <div class="db_head">
              <button class="btn_po" @click="bookingManageOpen = !bookingManageOpen">
                <span>BK No. :</span>
                <i> I0020220728</i>
              </button>
              <a href="" class="ml-a btn_delivery btn_complete">배송시작</a>
            </div>
            <div class="table_s02">
              <table>
                <colgroup>
                  <col style="width: calc(40%)" />
                  <col style="width: calc(60%)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">배송희망일</th>
                    <td class="t-r">22-07-2022</td>
                  </tr>
                  <tr>
                    <th class="t-l">출차일</th>
                    <td class="t-r">22-07-2022</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <colgroup>
                  <col style="width: calc(20%)" />
                  <col style="width: calc(30%)" />
                  <col style="width: calc(25%)" />
                  <col style="width: calc(25%)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">차량번호</th>
                    <td class="t-r">30F-11-11</td>
                    <th class="t-l">운전기사 연락처</th>
                    <td class="t-r">000-0000-0000</td>
                  </tr>
                  <tr>
                    <th class="t-l">출차일</th>
                    <td class="t-l">000-0000-0000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BookingManageModal :bookingManageOpen="bookingManageOpen" @closebookingManage="bookingManageOpen = !bookingManageOpen" />
    <!-- //컨텐츠 바디 -->
  </div>
</template>

<script>
import BookingManageModal from '@mb/components/modal/quote/BookingManageModal'; //부킹관리 하단모달

export default {
  components: {
    BookingManageModal,
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
