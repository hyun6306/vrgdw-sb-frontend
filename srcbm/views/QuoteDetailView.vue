<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">견적상세</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right"></div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <div class="quote_detail_contents">
        <button class="btn_folding" @click="quoteOpen = !quoteOpen" :class="{ quote_open: quoteOpen }">
          <p class="quote_title">
            <strong>견적 기본 정보</strong>
            <span>PO No : <i>00000005</i></span>
          </p>
          <button class="btn_request">요청</button>
          <i class="in_img"><img src="@m/assets/img/icon_up.png" /></i>
        </button>
        <!-- 폴딩영역 기본정보 배송지 정보 -->
        <section class="quote_detail_section" :class="{ quote_open: quoteOpen }">
          <div class="quote_detail_box">
            <div class="qd_box_head">
              <div class="qd_box_head_line">
                <p class="">
                  <span>Requested Quantity</span>
                  <strong>10,000</strong>
                </p>
                <button>
                  <span>Customer</span>
                  <img src="@m/assets/img/icon_customer.png" />
                </button>
                <button>
                  <span>Salesman</span>
                  <img src="@m/assets/img/icon_pencil.png" />
                </button>
                <button>
                  <span>Destination</span>
                  <img src="@m/assets/img/icon_customer.png" />
                </button>
              </div>
              <div class="qd_box_head_line">
                <p class="">
                  <span>Payment Terms</span>
                  <strong>은행신용</strong>
                </p>
                <p class="">
                  <span>Currency</span>
                  <strong>VND</strong>
                </p>
              </div>
            </div>
            <div class="table">
              <table>
                <colgroup>
                  <col style="width: calc(25%)" />
                  <col style="width: calc(25%)" />
                  <col style="width: calc(25%)" />
                  <col style="width: calc(25%)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th colspan="4" class="t-r">견적요청일 <i class="ml-5">14-12-2022</i></th>
                  </tr>
                  <tr>
                    <td colspan="4" class="t-r">
                      <span class="intable_title mr-30">총금액</span>
                      <i>53,900,000</i>
                      <small class="ml-5">VAT 포함</small>
                    </td>
                  </tr>
                  <!-- 영업담당자 로그인 노출 -->
                  <tr>
                    <th colspan="2">Sales Total Amount</th>
                    <th colspan="2">Quotation Total Amount</th>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <div class="a-sb">
                        <small>VAT 별도</small>
                        <span>60,000,000</span>
                      </div>
                    </td>
                    <td colspan="2">
                      <div class="a-sb">
                        <small>VAT 포함</small>
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
          </div>
        </section>
      </div>
      <!-- 리스트영역 -->
      <div class="quote_detail_list_contents">
        <!-- 리스트 총 개수 및 요청일 -->
        <div class="qdl_head">
          <label class="chechbox_basic">
            <input type="checkbox" />
            <span class="checkmark"></span>
            <strong>12</strong> Item
          </label>
          <span class="quote_request_date"> 견적 요청일 </span>
          <strong>01-09-2022</strong>
        </div>
        <!-- //리스트 총 개수 및 요청일 -->
        <!-- 리스트 반복 -->
        <swiper class="qdl_section swiper" :options="swiperOption" ref="swiper" v-for="index in 1" :key="index">
          <swiper-slide class="quick_btns">
            <button class="btn_quick btn_call in_img" @click="touch"><img src="@m/assets/img/icon_call_w.png" /></button>
            <button class="btn_quick btn_payment in_img" @click="touch"><img src="@m/assets/img/icon_payment.png" /></button>
          </swiper-slide>
          <swiper-slide class="quote_list_box">
            <div class="check_product">
              <label class="chechbox_solo">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <button @click="productInfoOpen = !productInfoOpen" class="product_txt underline">MDF Regular 25T E1 35 (1220*2440)</button>
              <button class="btn_request ml-a">결재필요</button>
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
                    <th class="t-l">배송 희망일</th>
                    <td class="t-l">14-07-2022</td>
                    <th class="t-l">생산 예정일</th>
                    <td class="t-r">20-07-2022</td>
                  </tr>
                  <tr>
                    <th class="t-l">아이템 번호 No</th>
                    <td class="t-l">10</td>
                    <th class="t-l">요청량</th>
                    <td class="t-r">10,000</td>
                  </tr>
                  <!-- 영업담당자 로그인 노출-->
                  <tr>
                    <th class="t-l">Sales Unit Price</th>
                    <td class="t-l">110,000</td>
                    <th class="t-l">Quotation Unit Price</th>
                    <td class="t-r">110,000</td>
                  </tr>

                  <tr>
                    <th class="t-l">견적 조정가</th>
                    <td colspan="3"><input type="number" class="disabled d_input" disabled /></td>
                  </tr>
                  <tr>
                    <th class="t-l">운임 조정액</th>
                    <td colspan="3"><input type="number" class="disabled d_input" disabled /></td>
                  </tr>

                  <tr>
                    <td colspan="4" class="price_txt t-r">
                      <strong>Quotation Unit Price</strong>
                      <i>100,000</i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </swiper-slide>
          <!-- <swiper-slide class="quick_btns">
            <button class="btn_quick btn_trash in_img" @click="touch"><img src="@m/assets/img/icon_trash.png" /></button>
            <button class="btn_quick btn_delete in_img" @click="touch"><img src="@m/assets/img/icon_delete.png" /></button>
          </swiper-slide> -->
        </swiper>

        <div class="qdl_section" :style="`height:${quote_box_height}`">
          <div class="quote_list_box" ref="quote_box_height" :style="`height:${quote_box_height}`">
            <div class="check_product">
              <label class="chechbox_solo">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <button @click="productInfoOpen = !productInfoOpen" class="product_txt underline">MDF Regular 25T E1 35 (1220*2440)</button>
              <button class="btn_request ml-a">요청</button>
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
                    <th class="t-l">배송 희망일</th>
                    <td class="t-l">14-07-2022</td>
                    <th class="t-l">생산 예정일</th>
                    <td class="t-r">20-07-2022</td>
                  </tr>
                  <tr>
                    <th class="t-l">아이템 번호 No</th>
                    <td class="t-l">10</td>
                    <th class="t-l">요청량</th>
                    <td class="t-r">10,000</td>
                  </tr>
                  <!-- 영업담당자 로그인 노출-->
                  <tr>
                    <th class="t-l">Sales Unit Price</th>
                    <td class="t-l">110,000</td>
                    <th class="t-l">Quotation Unit Price</th>
                    <td class="t-r">110,000</td>
                  </tr>

                  <tr>
                    <th class="t-l">견적 조정가</th>
                    <td colspan="3"><input type="number" class="d_input" /></td>
                  </tr>
                  <tr>
                    <th class="t-l">운임 조정액</th>
                    <td colspan="3"><input type="number" class="d_input" /></td>
                  </tr>

                  <tr>
                    <td colspan="4" class="price_txt t-r">
                      <strong>Quotation Unit Price</strong>
                      <i>100,000</i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="qdl_section" :style="`height:${quote_box_height}`">
          <div class="quote_list_box quote_complete" ref="quote_box_height" :style="`height:${quote_box_height}`">
            <div class="check_product">
              <button @click="productInfoOpen = !productInfoOpen" class="product_txt underline">MDF Regular 25T E1 35 (1220*2440)</button>
              <button class="btn_request btn_quote_complete ml-a">완료</button>
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
                    <th class="t-l">배송 희망일</th>
                    <td class="t-l">14-07-2022</td>
                    <th class="t-l">생산 예정일</th>
                    <td class="t-r">20-07-2022</td>
                  </tr>
                  <tr>
                    <th class="t-l">아이템 번호 No</th>
                    <td class="t-l">10</td>
                    <th class="t-l">요청량</th>
                    <td class="t-r">10,000</td>
                  </tr>
                  <!-- 영업담당자 로그인 노출-->
                  <tr>
                    <th class="t-l">Sales Unit Price</th>
                    <td class="t-l">110,000</td>
                    <th class="t-l">Quotation Unit Price</th>
                    <td class="t-r">110,000</td>
                  </tr>

                  <tr>
                    <th class="t-l">견적 조정가</th>
                    <td colspan="3"><input type="number" class="disabled d_input" disabled /></td>
                  </tr>
                  <tr>
                    <th class="t-l">운임 조정액</th>
                    <td colspan="3"><input type="number" class="disabled d_input" disabled /></td>
                  </tr>

                  <tr>
                    <td colspan="4" class="price_txt t-r">
                      <strong>Quotation Unit Price</strong>
                      <i>100,000</i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="qdl_section" :style="`height:${quote_box_height}`">
          <div class="quote_list_box" ref="quote_box_height" :style="`height:${quote_box_height}`">
            <div class="check_product">
              <button @click="productInfoOpen = !productInfoOpen" class="product_txt underline">MDF Regular 25T E1 35 (1220*2440)</button>
              <button class="btn_quote_cancle ml-a">취소</button>
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
                    <th class="t-l">배송 희망일</th>
                    <td class="t-l">14-07-2022</td>
                    <th class="t-l">생산 예정일</th>
                    <td class="t-r">20-07-2022</td>
                  </tr>
                  <tr>
                    <th class="t-l">아이템 번호 No</th>
                    <td class="t-l">10</td>
                    <th class="t-l">요청량</th>
                    <td class="t-r">10,000</td>
                  </tr>
                  <!-- 영업담당자 로그인 노출-->
                  <tr>
                    <th class="t-l">Sales Unit Price</th>
                    <td class="t-l">110,000</td>
                    <th class="t-l">Quotation Unit Price</th>
                    <td class="t-r">110,000</td>
                  </tr>
                  <tr>
                    <th class="t-l">견적 조정가</th>
                    <td colspan="3"><input type="number" class="disabled d_input" disabled /></td>
                  </tr>
                  <tr>
                    <th class="t-l">운임 조정액</th>
                    <td colspan="3"><input type="number" class="disabled d_input" disabled /></td>
                  </tr>
                  <!-- //영업담당자 로그인 노출-->
                  <tr>
                    <td colspan="4" class="price_txt t-r">
                      <strong>Quotation Unit Price</strong>
                      <i>100,000</i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- //리스트 반복 -->
      </div>
      <!-- //리스트영역 -->

      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents">
        <div class="btn_box">
          <button class="btn_cancle">남은량 취소</button>
          <button class="btn_tempsave">저장</button>
        </div>
      </div>
    </div>
    <!-- //컨텐츠 바디 -->
    <ProductInfoModal :productInfoOpen="productInfoOpen" @closeproductInfo="productInfoOpen = !productInfoOpen" />
  </div>
</template>

<script>
import ProductInfoModal from '@mb/components/modal/quote/ProductInfoModal'; //제품상세
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  components: {
    ProductInfoModal,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      priceSellOpen: false,
      quoteOpen: false,
      bookmark: false,
      productInfoOpen: false,
      selectOptions: ['KOR', 'ENG', 'VET'],
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
      const quoteWidth = document.querySelector('.quote_list_box').offsetWidth;
      return {
        quoteWidth,
      };
    },
  },
  mounted: function () {
    // this.quoteSection = document.querySelector('.quote_section');
    // this.quote = document.querySelector('.quote_list_box');
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

<style></style>
ㄴ
