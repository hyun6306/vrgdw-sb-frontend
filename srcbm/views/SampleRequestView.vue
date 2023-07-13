<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">샘플요청</h1>
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
      <div class="default_info_contents">
        <button class="btn_folding" @click="quoteOpen = !quoteOpen" :class="{ quote_open: quoteOpen }">
          <strong>주문기본정보</strong>
          <span> 2022-09-02</span>
          <i class="in_img"><img src="@m/assets/img/icon_up.png" /></i>
        </button>
        <!-- 폴딩영역 기본정보 배송지 정보 -->
        <section class="default_info_section" :class="{ quote_open: quoteOpen }">
          <!-- 기본정보 -->
          <div class="list_form_section">
            <ul class="list_ul">
              <li class="list_li">
                <label class="list_title">고객명</label>
                <span class="list_form"><input type="text" class="d_input" placeholder="동화기업 베트남 법인" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">PO No</label>
                <span class="list_form essential"><input type="text" class="d_input" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">결재조건</label>
                <span class="list_form"><input type="text" class="d_input" placeholder="Red-bill" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">Credit Balance</label>
                <span class="list_form"><input type="text" class="d_input t-r" placeholder="0" /></span>
              </li>
            </ul>
          </div>
          <!-- //기본정보 -->
          <!-- 배송정보 -->
          <p class="select_destination">
            <span>배송지 정보</span>
            <button class="btn_destination">Select Destination</button>
          </p>
          <div class="list_form_section shipping_section">
            <ul class="list_ul">
              <li class="list_li">
                <label class="list_title">배송형태</label>
                <MultiSelect id="" style="100%" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="고객차량"></MultiSelect>
              </li>
              <li class="list_li">
                <label class="list_title">차량번호</label>
                <span class="list_form essential"><input type="text" class="d_input t-r" placeholder="0" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">기사 연락처</label>
                <span class="list_form phone_form essential">
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                </span>
              </li>
              <li class="list_li">
                <label class="list_title">배송형태</label>
                <MultiSelect id="" style="100%" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="고객차량"></MultiSelect>
              </li>
              <li class="list_li">
                <label class="list_title">배송지명</label>
                <span class="list_form essential"><input type="text" class="d_input t-r" placeholder="0" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">우편번호</label>
                <span class="list_form post_form">
                  <input type="text" class="d_input t-r" placeholder="0" />
                  <label class="chechbox_basic"><input type="checkbox" /><span class="checkmark"></span> 기본 배송지로 선택합니다. </label>
                </span>
              </li>
              <li class="list_li">
                <label class="list_title">주소</label>
                <MultiSelect id="" style="100%" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="cities and provinces"></MultiSelect>
              </li>
              <li class="list_li">
                <label class="list_title not_see">주소</label>
                <MultiSelect id="" style="100%" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="county districts"></MultiSelect>
              </li>
              <li class="list_li">
                <label class="list_title not_see">주소</label>
                <span class="list_form essential"><input type="text" class="d_input" placeholder="" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">담당자명</label>
                <span class="list_form essential"><input type="text" class="d_input" placeholder="" /></span>
              </li>
              <li class="list_li">
                <label class="list_title">배송지 연락처1</label>
                <span class="list_form phone_form essential">
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                </span>
              </li>
              <li class="list_li">
                <label class="list_title">배송지 연락처2</label>
                <span class="list_form phone_form essential">
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                </span>
              </li>
              <li class="list_li">
                <label class="list_title">특이사항</label>
                <span class="list_form textarea_form">
                  <textarea name="" id=""></textarea>
                </span>
              </li>
            </ul>
          </div>
          <!-- //배송정보 -->
        </section>
      </div>
      <!-- 리스트영역 -->
      <div class="quote_list_contents">
        <!-- 납품희망월 선택 -->
        <div class="delivery_month_select">
          <label class="chechbox_solo">
            <input type="checkbox" />
            <span class="checkmark"></span>
          </label>
          <span class="dms_title">납품희망월 일괄적용</span>
          <div class="form_calendar form_month">
            <input type="text" placeholder="달 선택" readonly />
            <button class="icon_calendar" @click="datePicker('DateMonthPicker')"><img src="@m/assets/img/icon_calendar.png" /></button>
          </div>
        </div>
        <!-- 리스트 -->
        <section class="sample_list_section">
          <div class="quote_list_box">
            <div class="a-r">
              <button class="btn_list_bookmark" :class="{ bookmark_on: bookmark }" @click="bookmark = !bookmark"></button>
              <button class="btn_detail" @click="productDetailOpen = !productDetailOpen">FDM0011415</button>
              <ProductDetailModal :productDetailOpen="productDetailOpen" />
              <span class="delivery_month">
                <i class="in_img"><img src="@m/assets/img/icon_truck.png" /></i>
                07-2022
              </span>
              <div class="form_calendar form_month ml-a">
                <input type="text" placeholder="달 선택" readonly />
                <button class="icon_calendar" @click="datePicker('DateMonthPicker')"><img src="@m/assets/img/icon_calendar.png" /></button>
              </div>
            </div>
            <div class="check_product">
              <label class="chechbox_basic">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <span class="product_txt">MDF Regular 25T E1 35 (1220*2440)MDF Regular 25T E1 35 (1220*2440)</span>
            </div>
            <div class="order_count_box">
              <span>단가</span>
              <div class="order_count">
                <button>-</button>
                <input type="number" pattern="\d*" placeholder="number" id="" class="t-r" />
                <button>+</button>
              </div>
              <div class="btns_unit">
                <button class="on">매</button>
                <!-- <button class="">번들</button> -->
              </div>
              <button class="btn_delete_quote in_img"><img src="@m/assets/img/icon_close.png" /></button>
            </div>
            <div class="price_box">
              <MultiSelect id="" style="width: 40%" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="고객차량"></MultiSelect>
              <span class="essential" style="width: 20%">
                <input type="number" class="d_input disabled" disabled readonly />
              </span>
              <input type="number" class="d_input disabled" style="width: 20%" disabled readonly />
              <input type="number" class="d_input disabled" style="width: 20%" disabled readonly />
              <button class="btn_delete_quote in_img"><img src="@m/assets/img/icon_close.png" /></button>
            </div>
          </div>

          <div class="quote_list_box">
            <div class="a-r">
              <button class="btn_list_bookmark" :class="{ bookmark_on: bookmark }" @click="bookmark = !bookmark"></button>
              <button class="btn_detail" @click="productDetailOpen = !productDetailOpen">FDM0011415</button>
              <ProductDetailModal :productDetailOpen="productDetailOpen" />
              <span class="delivery_month">
                <i class="in_img"><img src="@m/assets/img/icon_truck.png" /></i>
                07-2022
              </span>
              <div class="form_calendar form_month ml-a">
                <input type="text" placeholder="달 선택" readonly />
                <button class="icon_calendar" @click="datePicker('DateMonthPicker')"><img src="@m/assets/img/icon_calendar.png" /></button>
              </div>
            </div>
            <div class="check_product">
              <label class="chechbox_basic">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <span class="product_txt">MDF Regular 25T E1 35 (1220*2440)MDF Regular 25T E1 35 (1220*2440)</span>
            </div>
            <div class="order_count_box">
              <span>단가</span>
              <div class="order_count">
                <button>-</button>
                <input type="number" pattern="\d*" placeholder="number" id="" class="t-r" />
                <button>+</button>
              </div>
              <div class="btns_unit">
                <button class="on">매</button>
                <!-- <button class="">번들</button> -->
              </div>
              <button class="btn_delete_quote in_img"><img src="@m/assets/img/icon_close.png" /></button>
            </div>
            <div class="price_box">
              <MultiSelect id="" style="width: 40%" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="고객차량"></MultiSelect>
              <span class="essential" style="width: 20%">
                <input type="text" class="d_input t-r" />
              </span>
              <input type="text" class="d_input t-r" style="width: 20%" />
              <input type="number" id="" style="width: 20%" class="t-r" placeholder="" readonly />
              <button class="btn_delete_quote in_img"><img src="@m/assets/img/icon_close.png" /></button>
            </div>
          </div>
        </section>
      </div>
      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents">
        <button class="btn_over" @click="priceSellOpen = !priceSellOpen" :class="{ priceSell_open: priceSellOpen }"><img src="@m/assets/img/btn_over_up.png" /></button>
        <div class="price_sell_section" :class="{ priceSell_open: priceSellOpen }">
          <div class="price_sell_box">
            <p class="guide_txt">
              <span>판매금액</span>
              <small>(VND)</small>
            </p>
            <ul class="price_result">
              <li class="price_txt">
                <small>VAT 별도</small>
                <strong>847,230,000</strong>
              </li>
              <li>
                <button class="btn_quote_request">
                  견적요청
                  <span>아이템:<i>5</i></span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="btn_box">
          <button class="btn_reset">초기화</button>
          <button class="btn_stock_request">임시저장</button>
          <button class="btn_tempsave">샘플요청</button>
        </div>
      </div>
    </div>
    <!-- //컨텐츠 바디 -->
  </div>
</template>

<script>
import ProductDetailModal from '@mb/components/modal/quote/ProductDetailModal'; //제품상세

export default {
  components: {
    ProductDetailModal,
  },
  data() {
    return {
      priceSellOpen: false,
      quoteOpen: false,
      bookmark: false,
      productDetailOpen: false,
      selectOptions: ['KOR', 'ENG', 'VET'],
    };
  },
};
</script>

<style></style>
