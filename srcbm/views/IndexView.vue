<template>
  <div id="">
    <div id="document">
      <header style="z-index: 99">
        <h1>{{ $t('label.publising') }}</h1>
      </header>
      <div id="container" style="display: block; width: 100%; height: 100vh; padding: 1.5rem; margin: 0 auto; overflow: auto">
        <h2 class="report_title">
          {{ $t('label.indexTitle') }}
          <div class="btn_language">
            <button @click="changeLanguage()">{{ $t('button.chEn') }}</button>
            <button @click="changeLanguage()">{{ $t('button.chKo') }}</button>
            <button @click="goToWebBoard">PC 현황판</button>
          </div>
        </h2>

        <!-- directory -->
        <div class="directory">
          <table border="1" summary="작업 디렉토리구조도입니다." style="width: 100%">
            <caption>
              디렉토리 구조도
            </caption>
            <colgroup>
              <col width="50%" />
              <col width="35%" />
              <col width="15%" />
            </colgroup>
            <thead>
              <tr>
                <th>{{ $t('label.fileNm') }}</th>
                <th>{{ $t('label.viewNm') }}</th>
                <th>{{ $t('label.pubEndDt') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="mtr milestone">
                <td colspan="3" id="item1" class="tit">{{ $t('label.common') }}</td>
              </tr>
              <tr class="">
                <td class="tl">views/MainView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/main')" target="_blank">main</a>
                </td>
                <td class="tl"></td>
              </tr>
              <tr class="">
                <td class="tl">views/Modal.View.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/modal')" target="_blank">모달</a>
                </td>
                <td class="tc">9.14</td>
              </tr>
              <tr class="">
                <td class="tl">views/LoginView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/login')" target="_blank">로그인</a>
                </td>
                <td class="tc">9.14</td>
              </tr>
              <tr class="">
                <td class="tl">views/ConsentAccessView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/consent')" target="_blank">접근권한동의</a>
                </td>
                <td class="tc">9.14</td>
              </tr>
              <tr class="">
                <td class="tl">views/AlarmView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/alarm')" target="_blank">알람</a>
                </td>
                <td class="tc">9.14</td>
              </tr>
              <tr class="">
                <td class="tl">views/IDpwSearchView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/idpw')" target="_blank">아이디,비밀번호 찾기</a>
                </td>
                <td class="tc">9.14</td>
              </tr>
              <tr class="">
                <td class="tl">views/DashBoardView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/dashboard')" target="_blank">대시보드</a>
                  <DashboardOutDetailModal />
                </td>
                <td class="tc"></td>
              </tr>
              <tr class="">
                <td class="tl">components/DashboardOutDetailModal.vue</td>
                <td class="tl">
                  <!-- <a @click="pageMove('/b/quote-s')" target="_blank">견적서 검색</a> -->
                  <button class="btn_page" type="primary" @click="dboutdetail">대시보드 출고예정현황 상세모달</button>
                  <QuoteSearchModal />
                </td>
                <td class="tc">9.29</td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="3" id="item1" class="tit">견적</td>
              </tr>
              <tr class="">
                <td class="tl">views/QuoteRequestView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/quote-r')" target="_blank">견적요청</a>
                </td>
                <td class="tc">9.27</td>
              </tr>
              <tr class="">
                <td class="tl">views/QuoteManageView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/quote-m')" target="_blank">견적관리</a>
                </td>
                <td class="tc">9.29</td>
              </tr>
              <tr class="">
                <td class="tl">components/QuoteSearchModal.vue</td>
                <td class="tl">
                  <!-- <a @click="pageMove('/b/quote-s')" target="_blank">견적서 검색</a> -->
                  <button class="btn_page" type="primary" @click="quotesearch">견적서 검색</button>
                  <QuoteSearchModal />
                </td>
                <td class="tc">9.29</td>
              </tr>
              <tr class="">
                <td class="tl">views/QuoteDetailView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/quote-d')" target="_blank">견적상세</a>
                </td>
                <td class="tc">9.30</td>
              </tr>
              <tr class="">
                <td class="tl">views/DeliveryRequestView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/delivery-r')" target="_blank">배송요청</a>
                </td>
                <td class="tc">9.30</td>
              </tr>
              <tr class="">
                <td class="tl">components/DeliverySelectModal.vue</td>
                <td class="tl">
                  <!-- <a @click="pageMove('/b/delivery-s')" target="_blank">배송지 선택</a> -->
                  <button class="btn_page" type="primary" @click="deliveryselect">배송지 선택</button>
                  <DeliverySelectModal />
                </td>
                <td class="tc">9.27</td>
              </tr>
              <tr class="">
                <td class="tl">components/DeliveryAddressModal.vue</td>
                <td class="tl">
                  <!-- <a @click="pageMove('/b/delivery-a')" target="_blank">배송지</a> -->
                  <button class="btn_page" type="primary" @click="deliveryaddress">배송지</button>
                  <DeliveryAddressModal />
                </td>
                <td class="tc">10.06</td>
              </tr>
              <tr class="">
                <td class="tl">views/DeliveryManageView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/delivery-m')" target="_blank">배송현황</a>
                </td>
                <td class="tc">10.06</td>
              </tr>
              <tr class="">
                <td class="tl">components/ProductSearchModal.vue</td>
                <td class="tl">
                  <!-- <a @click="pageMove('/b/product-s')" target="_blank">상품검색</a> -->
                  <button class="btn_page" type="primary" @click="productsearch">상품검색</button>
                  <ProductSearchModal />
                </td>
                <td class="tc">10.05</td>
              </tr>
              <tr class="">
                <td class="tl">components/ProductSearchModal.vue</td>
                <td class="tl">
                  <!-- <a @click="pageMove('/b/product-s')" target="_blank">즐겨찾기</a> -->
                  <button class="btn_page" type="primary" @click="productsearch">즐겨찾기</button>
                </td>
                <td class="tc">9.28</td>
              </tr>
              <tr class="">
                <td class="tl">components/ProductSearchModal.vue</td>
                <td class="tl">
                  <!-- <a @click="pageMove('/b/product-s')" target="_blank">이전주문</a> -->
                  <button class="btn_page" type="primary" @click="productsearch">이전주문</button>
                </td>
                <td class="tc">9.28</td>
              </tr>

              <tr class="">
                <td class="tl">views/BookikngManageView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/booking-m')" target="_blank">부킹관리</a>
                </td>
                <td class="tc">9.30</td>
              </tr>
              <tr class="">
                <td class="tl">views/SampleDetailView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/sample-d')" target="_blank">샘플상세</a>
                </td>
                <td class="tc">10.05</td>
              </tr>
              <tr class="">
                <td class="tl">views/SampleManageView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/sample-m')" target="_blank">샘플관리</a>
                </td>
                <td class="tc">10.05</td>
              </tr>
              <tr class="">
                <td class="tl">views/SampleRequestView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/sample-r')" target="_blank">샘플요청</a>
                </td>
                <td class="tc">10.05</td>
              </tr>

              <tr class="">
                <td class="tl">components/CustomerSearchModal.vue</td>
                <td class="tl">
                  <!-- <a @click="pageMove('/b/customer-s')" target="_blank">고객사 검색</a> -->
                  <button class="btn_page" type="primary" @click="customersearch">고객사검색</button>
                  <CustomerSearchModal />
                </td>
                <td class="tc">10.04</td>
              </tr>
              <tr class="">
                <td class="tl">components/CostcenterSearchModal.vue</td>
                <td class="tl">
                  <!-- <a @click="pageMove('/b/costcenter-s')" target="_blank">코스트센터 검색</a> -->
                  <button class="btn_page" type="primary" @click="costcentersearch">코스트센터검색</button>
                  <CostcenterSearchModal />
                </td>
                <td class="tc">10.04</td>
              </tr>
              <tr class="">
                <td class="tl">components/EndCompleteModal.vue</td>
                <td class="tl">
                  <!-- <a @click="pageMove('/b/endcomplete')" target="_blank">완료처리</a> -->
                  <button class="btn_page" type="primary" @click="endcomplete">완료처리</button>
                  <EndCompleteModal />
                </td>
                <td class="tc">10.06</td>
              </tr>
              <tr class="">
                <td class="tl">components/SalesOpinionModal.vue</td>
                <td class="tl">
                  <!-- <a @click="pageMove('/b/salesopinion')" target="_blank">영업의견</a> -->
                  <button class="btn_page" type="primary" @click="salesopinion">영업의견</button>
                  <SalesOpinionModal />
                </td>
                <td class="tc">10.07</td>
              </tr>
              <tr class="">
                <td class="tl">components/SearchModal.vue</td>
                <td class="tl">
                  <button class="btn_page" type="primary" @click="searchm">배송현황 > 검색</button>
                  <SearchModal />
                </td>
                <td class="tc">10.07</td>
              </tr>
              <tr class="">
                <td class="tl">views/DeliveryStatusView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/delivery-sa')" target="_blank">배송현황</a>
                </td>
                <td class="tc">10.05</td>
              </tr>
              <tr class="">
                <td class="tl">components/SearchModal.vue</td>
                <td class="tl">
                  <!-- <button class="btn_page" type="primary" @click="searchm">계산기</button> -->
                  <button class="btn_page" type="primary" @click="calculatorOpen = !calculatorOpen">계산기</button>
                  <CalculatorModal :calculatorOpen="calculatorOpen" @closecalculator="calculatorOpen = !calculatorOpen" />
                  <CalculatorModal />
                </td>
                <td class="tc">10.07</td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="3" id="item1" class="tit">운전기사 배송현황</td>
              </tr>
              <tr class="">
                <td class="tl">views/driver/DriverView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/driver-v')" target="_blank">배송현황</a>
                </td>
                <td class="tc">10.19</td>
              </tr>
              <tr class="">
                <td class="tl">components/SignModal.vue</td>
                <td class="tl">
                  <button class="btn_page" type="primary" @click="signm">인수서명</button>
                  <SignModal />
                </td>
                <td class="tc">10.19</td>
              </tr>
              <tr class="">
                <td class="tl">components/InvoiceModal.vue</td>
                <td class="tl">
                  <button class="btn_page" type="primary" @click="invoicem">송장</button>
                  <InvoiceModal />
                </td>
                <td class="tc">11.01</td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="3" id="item1" class="tit">마이페이지</td>
              </tr>
              <tr class="">
                <td class="tl">views/MemberInfoSet01View.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/memberinfoset01')" target="_blank">회원정보설정 로그인</a>
                </td>
                <td class="tc">12-20</td>
              </tr>
              <tr class="">
                <td class="tl">views/MemberInfoSet02View.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/memberinfoset02')" target="_blank">회원정보설정 - 고객사</a>
                </td>
                <td class="tc">12-20</td>
              </tr>
              <tr class="">
                <td class="tl">views/MemberInfoSet03View.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/memberinfoset03')" target="_blank">회원정보설정 - 운송사</a>
                </td>
                <td class="tc">12-20</td>
              </tr>
              <tr class="">
                <td class="tl">views/DeliveryRegistModal.vue</td>
                <td class="tl">
                  <button class="btn_page" type="primary" @click="deliveryregist">배송지등록</button>
                  <DeliveryRegistModal />
                </td>
                <td class="tc">12-20</td>
              </tr>
              <tr class="">
                <td class="tl">views/MemberListView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/memberlist')" target="_blank">직원목록</a>
                </td>
                <td class="tc">12-20</td>
              </tr>
              <tr class="">
                <td class="tl">views/DeliveryListView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/deliverylist')" target="_blank">배송지목록</a>
                </td>
                <td class="tc">12-20</td>
              </tr>
              <tr class="">
                <td class="tl">views/SettingView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/setting')" target="_blank">알림설정</a>
                </td>
                <td class="tc">12-20</td>
              </tr>
              <tr class="">
                <td class="tl">views/PrivacyView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/privacy')" target="_blank">개인정보취급방침</a>
                </td>
                <td class="tc">12-20</td>
              </tr>
              <tr class="">
                <td class="tl">views/TermsOfServiceView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/terms')" target="_blank">이용약관</a>
                </td>
                <td class="tc">12-20</td>
              </tr>
              <tr class="">
                <td class="tl">views/NoticeView.vue</td>
                <td class="tl">
                  <a @click="pageMove('/b/notice')" target="_blank">공지사항</a>
                </td>
                <td class="tc">12-20</td>
              </tr>
              <tr class="">
                <td class="tl">views/DeliveryRegistModal.vue</td>
                <td class="tl">
                  <button class="btn_page" type="primary" @click="noticedetail">공지사항 상세</button>
                  <NoticeDetailModal />
                </td>
                <td class="tc">12-20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- //directory -->
      </div>
    </div>
  </div>
</template>

<script>
import ProductSearchModal from '@mb/components/ProductSearchModal'; //견적요청 상품검색
import QuoteSearchModal from '@mb/components/QuoteSearchModal'; //견적요청 견적서검색
import DeliverySelectModal from '@mb/components/DeliverySelectModal'; //견적 배송지선택
import DeliveryAddressModal from '@mb/components/DeliveryAddressModal'; //견적 배송지
import CustomerSearchModal from '@mb/components/CustomerSearchModal'; //고객사 검색
import CostcenterSearchModal from '@mb/components/CostcenterSearchModal'; //코스트센터 검색
import EndCompleteModal from '@mb/components/EndCompleteModal'; //완료처리
import SalesOpinionModal from '@mb/components/SalesOpinionModal'; //영업의견
import SearchModal from '@mb/components/SearchModal'; //배송현황 > 검색
import CalculatorModal from '@mb/components/modal/CalculatorModal'; //계산기
import SignModal from '@mb/components/SignModal'; //영업의견
import InvoiceModal from '@mb/components/InvoiceModal'; //송장
import DashboardOutDetailModal from '@mb/components/DashboardOutDetailModal'; //송장
import DeliveryRegistModal from '@mb/components/DeliveryRegistModal'; //배송지 등록/ 마이페이지
import NoticeDetailModal from '@mb/components/NoticeDetailModal'; //공지사항 상세/ 마이페이지

export default {
  components: {
    ProductSearchModal,
    QuoteSearchModal,
    DeliverySelectModal,
    DeliveryAddressModal,
    CustomerSearchModal,
    CostcenterSearchModal,
    EndCompleteModal,
    SalesOpinionModal,
    SearchModal,
    CalculatorModal,
    SignModal,
    InvoiceModal,
    DashboardOutDetailModal,
    DeliveryRegistModal,
    NoticeDetailModal,
  },
  data() {
    return {
      currentTab: 0,
      calculatorOpen: false,
      tabs: ['Mobile'],
    };
  },
  methods: {
    pageMove(path) {
      this.$router.push(path);
    },
    changeLanguage() {
      if (this.$i18n.locale === 'ko') {
        this.$i18n.locale = 'en';
      } else {
        this.$i18n.locale = 'ko';
      }
    },
    goToWebBoard() {
      window.open('https://dsalesvrgdwdev.dongwha.com/b', '_self');
    },
    productsearch() {
      this.$modal.show('ProductSearchModal');
    },
    quotesearch() {
      this.$modal.show('QuoteSearchModal');
    },
    deliveryselect() {
      this.$modal.show('DeliverySelectModal');
    },
    deliveryaddress() {
      this.$modal.show('DeliveryAddressModal');
    },
    customersearch() {
      this.$modal.show('CustomerSearchModal');
    },
    costcentersearch() {
      this.$modal.show('CostcenterSearchModal');
    },
    endcomplete() {
      this.$modal.show('EndCompletehModal');
    },
    salesopinion() {
      this.$modal.show('SalesOpinionModal');
    },
    searchm() {
      this.$modal.show('SearchModal');
    },
    signm() {
      this.$modal.show('SignModal');
    },
    invoicem() {
      this.$modal.show('InvoiceModal');
    },
    dboutdetail() {
      this.$modal.show('DashboardOutDetailModal');
    },
    deliveryregist() {
      this.$modal.show('DeliveryRegistModal');
    },
    noticedetail() {
      this.$modal.show('NoticeDetailModal');
    },
  },
};
</script>
<style lang="scss" scoped>
@charset "utf-8";

/**************************************
** Basic Styling
***************************************/

.report_title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  .btn_language {
    margin-left: auto;

    > button {
      padding: 5px 10px;
      margin-left: 5px;
      border: 1px solid #999;
      background: #fff;
      border-radius: 3px;
      -webkit-border-radius: 3px;
    }
  }
}

header {
  background: #30373c;
  width: 100%;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

header h1 {
  padding: 15px;
  font-size: 26px;
  color: #d5e5f1;
  text-align: center;
}

header h1 strong {
  margin: 0px 0 10px;
  padding: 15px;
  font-size: 26px;
  color: #fff;
}

.gnb {
  position: relative;
  overflow: hidden;
  background: #fff;
  margin: 10px 0 20px;
  border-bottom: 2px solid #596770;
}

.gnb li {
  float: left;
}

.gnb li a {
  display: block;
  color: #fff;
  height: 40px;
  line-height: 40px;
  padding: 0px 20px;
  margin: 1px 1px 5px;
  border-radius: 3px;
  background: #009bfa;
}

.gnb li a:hover {
  color: #fff;
  background: #4a575f;
}
#container .report_title {
  font-size: 25px;
  border-bottom: 3px solid #373737;
  margin-bottom: 10px;
  padding: 70px 0 5px;
}

#container h3 {
  font-size: 15px;
  padding-bottom: 5px;
}

#container > .directory {
  overflow: hidden;
  margin-top: 20px;

  .info {
    overflow: hidden;
    padding-bottom: 10px;
  }
  > table {
    border: 1px solid #ccc;

    thead th {
      font-weight: bold;
      background-color: #eee;
      text-align: center;
      padding: 10px 0px;
      font-size: 1rem;
    }
    tbody {
      th {
        padding: 5px;
        border: 1px solid #ddd;
      }
      td {
        border: 1px solid #ccc;
        padding: 10px 5px;
        font-size: 1rem;

        > a {
          display: block;
        }
      }
      tr:hover {
        background-color: #f7f7f7;
      }
    }
  }
}

#container .directory table tbody tr.milestone td {
  border-top: 2px solid #8172ce;
}

.tit {
  background-color: #f9f9fd;
  text-align: center;
  font-size: 16px !important;
}

.pdt100 {
  padding-top: 100px;
}
.btn_page {
  font-size: 1rem;
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
}
</style>
