<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">배송요청</h1>
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
      <div class="delivery_request_contents">
        <button class="btn_folding" @click="quoteOpen = !quoteOpen" :class="{ quote_open: quoteOpen }">
          <strong>주문기본정보</strong>
          <MultiSelect id="" style="100%" class="ml-a essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="고객차량"></MultiSelect>
          <i class="in_img"><img src="@m/assets/img/icon_up.png" /></i>
        </button>
        <!-- 폴딩영역 기본정보 배송지 정보 -->
        <section class="default_info_section" :class="{ quote_open: quoteOpen }">
          <!-- 배송정보 -->
          <p class="select_destination">
            <span class="fr">배송형태 정보가 없습니다.</span>
            <button class="btn_destination">Select Destination</button>
          </p>
          <div class="list_form_section shipping_section">
            <ul class="list_ul">
              <li class="list_li">
                <label class="list_title">차량정보</label>
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
                <label class="list_title">연락처1</label>
                <span class="list_form phone_form essential">
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                </span>
              </li>
              <li class="list_li">
                <label class="list_title">연락처2</label>
                <span class="list_form phone_form">
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                  <input type="text" class="d_input" placeholder="0" />
                </span>
              </li>
              <li class="list_li">
                <label class="list_title">배송 요청사항</label>
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
      <div class="dr_list_contents">
        <!-- 배송예정일 -->
        <div class="delivery_select">
          <label class="chechbox_basic">
            <input type="checkbox" />
            <span class="checkmark"></span>
            <strong>12</strong>Item
          </label>
          <span class="ds_title ml-a">배송예정일</span>
          <strong>01-09-2022</strong>
        </div>
        <div class="delivery_select">
          <span class="ds_title ml-a">희망 배송일</span>
          <div class="form_calendar">
            <input type="text" placeholder="2022-12-12" readonly />
            <button class="icon_calendar" @click="datePicker('DateMonthPicker')"><img src="@m/assets/img/icon_calendar.png" /></button>
          </div>
        </div>
        <!-- //배송예정일 -->
        <!-- 리스트 -->
        <section class="quote_list_section">
          <div class="quote_list_box">
            <div class="check_product">
              <label class="chechbox_basic">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <span class="product_txt">PO No : <i>QT0000005</i></span>
              <p class="product_txt ml-a"><small>BK No.</small>BK00000001</p>
              <!-- 삭제버튼 추가 -->
              <button class="btn_delete_delivery in_img"><img src="@m/assets/img/icon_close.png" /></button>
              <!-- //삭제버튼 추가 -->
            </div>
            <p class="product_info">
              <span class="product_txt">MDF Regular 25T E1 35 (1220*2440)</span>
              <span class="product_num">FDM0011414</span>
            </p>
            <div class="table">
              <table>
                <tr>
                  <th colspan="4">có thể vận chuyển được</th>
                </tr>
                <tr>
                  <th colspan="2">배송가능 주문 수량</th>
                  <th colspan="2">배송가능 기준 수량</th>
                </tr>
                <tr>
                  <td>100</td>
                  <td>번들</td>
                  <td>100</td>
                  <td>매</td>
                </tr>
                <tr>
                  <th colspan="2">출고 요청 수량</th>
                  <th>부킹단가</th>
                  <th>금액</th>
                </tr>
                <tr>
                  <td><input type="number" pattern="[0-9]*" class="d_input t-r" /></td>
                  <td>번들</td>
                  <td class="t-r">900,000</td>
                  <td class="t-r">900,000</td>
                </tr>
                <tr>
                  <th colspan="2">합계금액(VAT 포함,VND)</th>
                  <td colspan="2" class="t-r">49,500,000</td>
                </tr>
              </table>
            </div>
          </div>
        </section>
      </div>
      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents03">
        <button class="btn_over" @click="priceSellOpen = !priceSellOpen" :class="{ priceSell_open: priceSellOpen }"><img src="@m/assets/img/btn_over_up.png" /></button>
        <div class="price_sell_section" :class="{ priceSell_open: priceSellOpen }">
          <div class="price_sell_box">
            <p class="guide_txt">
              <span>배송요청금액</span>
              <small>(VND)</small>
            </p>
            <ul class="price_result">
              <li class="price_txt">
                <small>VAT 별도</small>
                <strong>847,230,000</strong>
              </li>
              <li>
                <button class="btn_quote_request">
                  배송요청
                  <span>아이템:<i>5</i></span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="btn_box">
          <button class="btn_tempsave">배송요청</button>
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
ㄴ
