<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">견적요청</h1>
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
      <div class="product_s_contents">
        <div id="TabS">
          <ul class="tab-menu">
            <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
              <a v-on:click="currentTab = index">{{ tab }}</a>
            </li>
          </ul>
          <div class="tab-content">
            <div v-show="currentTab == 0">
              <div class="default_info_contents">
                <!-- 폴딩영역 기본정보 배송지 정보 -->
                <section class="default_info_section dis_block">
                  <!-- 기본정보 -->
                  <div class="list_form_section">
                    <ul class="list_ul">
                      <li class="list_li">
                        <label class="list_title">고객명</label>
                        <span class="list_form"><input type="text" class="d_input" placeholder="동화기업 베트남 법인" /></span>
                        <!-- 영업로그인 시 -->
                        <!-- <div class="form_searchm">
                            <input type="text" placeholder="" readonly />
                            <button class="icon_search in_img"><img src="@m/assets/img/icon_search_w.png" /></button>
                          </div> -->
                        <!-- //영업로그인 시 -->
                      </li>
                      <li class="list_li">
                        <label class="list_title">PO No</label>
                        <span class="list_form essential"><input type="text" class="d_input" readonly /></span>
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
                        <span class="list_form textarea_form essential">
                          <textarea name="" id=""></textarea>
                        </span>
                        <!-- <span class="list_form essential"><input type="text" class="d_input" placeholder="" /></span> -->
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
                    </ul>
                  </div>
                  <!-- //배송정보 -->
                </section>
              </div>
            </div>
            <div v-show="currentTab == 1">
              <!-- 리스트영역 -->
              <div class="quote_list_contents">
                <div class="item_add_bar">
                  <span>배송지 정보</span>
                  <button class="btn_item_add">아이템 추가</button>
                </div>
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
                <section class="quote_list_section">
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
                      <span>주문수량</span>
                      <div class="order_count">
                        <button class="btn_minus"></button>
                        <input type="number" pattern="\d*" placeholder="number" id="" class="t-r" />
                        <button class="btn_plus"></button>
                      </div>
                      <div class="btns_unit">
                        <button class="on">매</button>
                        <button class="">번들</button>
                      </div>
                      <button class="btn_delete_quote in_img"><img src="@m/assets/img/icon_close.png" /></button>
                    </div>
                    <!-- <div class="price_box">
                        <span class="price_box_title">단가</span>
                        <div class="list_form unit_price">
                          <span class="arrow in_img">
                            <img src="@m/assets/img/arrow_down.png" />
                          </span>

                          <input type="number" id="" class="t-r price_down" placeholder="1,000,000" readonly />
                        </div>
                        <span class="price_box_title">금액</span>
                        <div class="list_form total_price">
                          <input type="number" id="" class="t-r" placeholder="10,000,000,000" readonly />
                        </div>
                        <span class="sub_txt">VAT 별도</span>
                        <button class="btn_delete_quote in_img"><img src="@m/assets/img/icon_close.png" /></button>
                      </div> -->
                  </div>
                  <div class="quote_list_box">
                    <div class="a-r">
                      <button class="btn_list_bookmark" :class="{ bookmark_on: bookmark }" @click="bookmark = !bookmark"></button>
                      <button class="btn_detail">FDM0011414</button>
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
                      <span>주문수량</span>
                      <div class="order_count">
                        <button class="btn_minus"></button>
                        <input type="number" pattern="\d*" placeholder="number" id="" class="t-r" />
                        <button class="btn_plus"></button>
                      </div>
                      <div class="btns_unit">
                        <button class="on">매</button>
                        <button class="">번들</button>
                      </div>
                      <button class="btn_delete_quote in_img"><img src="@m/assets/img/icon_close.png" /></button>
                    </div>
                    <!-- <div class="price_box">
                        <span class="price_box_title">단가</span>
                        <div class="list_form unit_price">
                          <span class="arrow in_img">
                            
                            <img src="@m/assets/img/arrow_up.png" />
                          </span>
                          
                          <input type="number" id="" class="t-r price_up" placeholder="1,000,000" readonly />
                        </div>
                        <span class="price_box_title">금액</span>
                        <div class="list_form total_price">
                          <input type="number" id="" class="t-r" placeholder="10,000,000,000" readonly />
                        </div>
                        <span class="sub_txt">VAT 별도</span>
                        <button class="btn_delete_quote in_img"><img src="@m/assets/img/icon_close.png" /></button>
                      </div> -->
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents">
        <button class="btn_over" @click="priceSellOpen = !priceSellOpen" :class="{ priceSell_open: priceSellOpen }"><img src="@m/assets/img/btn_over_up.png" /></button>
        <div class="price_sell_section" :class="{ priceSell_open: priceSellOpen }">
          <div class="price_sell_box">
            <!-- <p class="guide_txt">
              <span>판매금액</span>
              <small>(VND)</small>
            </p> -->
            <ul class="price_result">
              <!-- <li class="price_txt">
                <small>VAT 별도</small>
                <strong>847,230,000</strong>
              </li> -->
              <li class="quote_request_box">
                <button class="btn_quote_request">견적요청</button>
                <span class="quote_item">아이템 <i>999</i></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="btn_box">
          <button class="btn_reset">초기화</button>
          <button class="btn_tempsave">임시저장</button>
        </div>
      </div>
      <!-- //하단 버튼 -->
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
      registClose: false,
      currentTab: 0,
      tabs: ['주문기본정보', '제품목록'],
    };
  },
};
</script>

<style></style>
ㄴ
