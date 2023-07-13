<template>
  <div id="">
    <div id="document">
      <header style="z-index: 9999">
        <h1>{{ $t('label.publising') }}</h1>
      </header>
      <div id="container" style="width: 1440px; padding-bottom: 20px !important">
        <h2 class="report_title" style="margin-top: 30px">
          {{ $t('label.indexTitle') }}
          <div class="btn_language">
            <button @click="goToWebBoard">모바일 현황판</button>
            <button @click="changeLanguage()">{{ $t('button.chEn') }}</button>
            <button @click="changeLanguage()">{{ $t('button.chKo') }}</button>
          </div>
        </h2>
        <!-- directory -->
        <div class="directory">
          <table border="1" summary="작업 디렉토리구조도입니다." style="width: 100%">
            <caption>
              디렉토리 구조도
            </caption>
            <colgroup>
              <col width="10%" />
              <col width="12%" />
              <col width="11%" />
              <col width="20%" />
              <col width="15%" />
              <col width="10%" />
              <col width="" />
            </colgroup>
            <thead>
              <tr>
                <th>1 Depth</th>
                <th>2 Depth</th>
                <th>3 Depth</th>
                <th>{{ $t('label.fileNm') }}</th>
                <th>{{ $t('label.viewNm') }}</th>
                <th>{{ $t('label.pubEndDt') }}</th>
                <th>{{ $t('label.etc') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">{{ $t('label.common') }}</td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.common') }}</td>
                <td>{{ $t('label.modal') }}</td>
                <td></td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.modalZip') }}</a>
                </td>
                <td class="tc"></td>
                <td></td>
              </tr>

              <tr class="">
                <td class="mtr">{{ $t('label.common') }}</td>
                <td>{{ $t('label.modal') }}</td>
                <td>{{ $t('label.datePicker') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.datePicker') }}</a>
                </td>
                <td class="tc">7.13</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr"></td>
                <td></td>
                <td></td>
                <td>views/404View.vue</td>
                <td>
                  <a @click="pageMove('/b/ffpage')" target="_blank">404page</a>
                </td>
                <td class="tc">23.01.16</td>
                <td></td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">{{ $t('label.main') }}</td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.main') }}</td>
                <td></td>
                <td></td>
                <td>views/MainView.vue</td>
                <td>
                  <a @click="pageMove('/b/main')" target="_blank">{{ $t('label.mainView') }}</a>
                </td>
                <td class="tc">7.6</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.header') }}</td>
                <td>{{ $t('label.rightDropDown') }}</td>
                <td></td>
                <td>views/MainView.vue</td>
                <td>
                  <a @click="pageMove('/b/main')" target="_blank">{{ $t('label.rightDropDown') }}</a>
                </td>
                <td class="tc">7.11</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.header') }}</td>
                <td>{{ $t('label.myInfo') }}</td>
                <td>{{ $t('label.favoriteModal') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.myInfoFavoriteModal') }}</a>
                </td>
                <td class="tc">7.11</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.main') }}</td>
                <td></td>
                <td></td>
                <td>views/dashboard/DashBoardView.vue</td>
                <td>
                  <a @click="pageMove('/b/dashboard')" target="_blank">대시보드</a>
                </td>
                <td class="tc"></td>
                <td></td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">{{ $t('label.loginAndReg') }}</td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.login') }}</td>
                <td>{{ $t('label.login') }}</td>
                <td></td>
                <td>views/member/LoginView.vue</td>
                <td>
                  <a @click="pageMove('/b/Login')" target="_blank">{{ $t('label.login') }}</a>
                </td>
                <td class="tc">7.5</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.login') }}</td>
                <td>{{ $t('label.idPwFind') }}</td>
                <td></td>
                <td>views/member/IdpwSearchView.vue</td>
                <td>
                  <a @click="pageMove('/b/Idpw')" target="_blank">{{ $t('label.idPwFind') }}</a>
                </td>
                <td class="tc">7.6</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.login') }}</td>
                <td>{{ $t('label.register') }}</td>
                <td></td>
                <td>views/member/JoinView.vue</td>
                <td>
                  <a @click="pageMove('/b/Join')" target="_blank">{{ $t('label.register') }}</a>
                </td>
                <td class="tc">7.6</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.login') }}</td>
                <td>{{ $t('label.idPwFind') }}</td>
                <td>{{ $t('label.modal') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.idPwFindModal') }}</a>
                </td>
                <td class="tc">7.6</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.login') }}</td>
                <td>{{ $t('label.tempPwLogin') }}</td>
                <td>{{ $t('label.modal') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.tempPwLogin') }}</a>
                </td>
                <td class="tc">7.6</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.login') }}</td>
                <td>{{ $t('label.oldPwLogin') }}</td>
                <td>{{ $t('label.modal') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.oldPwLogin') }}</a>
                </td>
                <td class="tc">7.6</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.login') }}</td>
                <td>{{ $t('label.register') }}</td>
                <td>{{ $t('label.clauseModal') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.clauseModal') }}</a>
                </td>
                <td class="tc">7.26</td>
                <td>현재 약관내용 없음</td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.login') }}</td>
                <td>{{ $t('label.register') }}</td>
                <td>{{ $t('label.personalInfoModal') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.personalInfoModal') }}</a>
                </td>
                <td class="tc">7.26</td>
                <td>현재 개인정보 내용 없음</td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">{{ $t('label.order') }}</td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>{{ $t('label.orderGeneral') }}</td>
                <td>{{ $t('label.orderGeneralRequest') }}</td>
                <td>views/order/OrderView.vue</td>
                <td>
                  <a @click="pageMove('/b/order')" target="_blank">{{ $t('label.orderGeneralRequest') }}</a>
                </td>
                <td class="tc">7.7</td>
                <td>버튼 기능정의 클래스 적용</td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>{{ $t('label.orderGeneral') }}</td>
                <td>{{ $t('label.shippingChooseModal') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.shippingChooseModal') }}</a>
                </td>
                <td class="tc">7.8</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>{{ $t('label.orderGeneral') }}</td>
                <td>{{ $t('label.productSearchModal') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.productSearchModal') }}</a>
                </td>
                <td class="tc">7.8</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>{{ $t('label.orderGenral') }}</td>
                <td>{{ $t('label.excelUploadModal') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.excelUploadModal') }}</a>
                </td>
                <td class="tc">7.8</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>{{ $t('label.orderGeneral') }}</td>
                <td>{{ $t('label.sampleCriteriaModal') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.sampleCriteriaModal') }}</a>
                </td>
                <td class="tc">7.8</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>{{ $t('label.orderSampleRequest') }}</td>
                <td></td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/sample')" target="_blank">{{ $t('label.orderSampleRequest') }}</a>
                </td>
                <td class="tc">7.20</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>샘플상세</td>
                <td></td>
                <td>views/sample-detail/SampleDetailView.vue</td>
                <td>
                  <a @click="pageMove('/b/sample-detail')" target="_blank">샘플상세</a>
                </td>
                <td class="tc">10.17</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>{{ $t('label.orderQuote') }}</td>
                <td></td>
                <td>views/quote-manage/ManageView.vue</td>
                <td>
                  <a @click="pageMove('/b/quote-manage')" target="_blank">{{ $t('label.orderQuote') }}</a>
                </td>
                <td class="tc">7.25</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>{{ $t('label.orderDtl') }}</td>
                <td></td>
                <td>views/quote-detail/QuoteDetailView.vue</td>
                <td>
                  <a @click="pageMove('/b/quote-detail')" target="_blank">{{ $t('label.orderDtl') }}</a>
                </td>
                <td class="tc">7.25</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>{{ $t('label.bookingDtl') }}</td>
                <td></td>
                <td>views/BookingView.vue</td>
                <td>
                  <a @click="pageMove('/b/booking')" target="_blank">{{ $t('label.bookingDtl') }}</a>
                </td>
                <td class="tc">7.25</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>{{ $t('label.bookingDtl') }}</td>
                <td>{{ $t('label.shippingReqModal') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.shippingReqModal') }}</a>
                </td>
                <td class="tc">7.25</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>{{ $t('label.order') }}</td>
                <td>{{ $t('label.searchCustomModal') }}</td>
                <td>views/ModalView.vue</td>
                <td>
                  <a @click="pageMove('/b/modal')" target="_blank">{{ $t('label.searchCustomModal') }}</a>
                </td>
                <td class="tc">7.28</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">{{ $t('label.order') }}</td>
                <td>{{ $t('label.orderQuote') }}</td>
                <td>{{ $t('label.dtl') }}</td>
                <td>views/quote-manage-detail/ManageDetailView.vue</td>
                <td>
                  <a @click="pageMove('/b/quote-manage-detail')" target="_blank">{{ $t('label.orderQuoteDtl') }}</a>
                </td>
                <td class="tc">7.28</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">주문</td>
                <td>주문관리</td>
                <td>배송현황</td>
                <td>views/delivery-status/DeliveryStatusView.vue</td>
                <td>
                  <a @click="pageMove('/b/delivery-status')" target="_blank">배송현황</a>
                </td>
                <td class="tc">8.17</td>
                <td></td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">{{ $t('label.system') }}</td>
              </tr>
              <tr class="">
                <td class="mtr">관리자</td>
                <td>프로그램관리</td>
                <td class="mtr">{{ $t('label.menuManage') }}</td>
                <td>views/program/ProgramView.vue</td>
                <td>
                  <a @click="pageMove('/b/program')" target="_blank">{{ $t('label.menuManage') }}</a>
                </td>
                <td class="tc">8.03</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">관리자</td>
                <td>공통코드관리</td>
                <td></td>
                <td>views/common-code/CommonCodeView.vue</td>
                <td><a @click="pageMove('/b/common-code')" target="_blank">공통코드관리</a></td>
                <td class="tc">8.10</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">관리자</td>
                <td>공통코드관리</td>
                <td>팝업</td>
                <td>views/ModalView.vue</td>
                <td><a @click="pageMove('/b/modal')" target="_blank">속성코드 등록 팝업</a></td>
                <td class="tc">8.10</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">관리자</td>
                <td>프로그램 목록</td>
                <td></td>
                <td>views/program-list/ProgramListView.vue</td>
                <td><a @click="pageMove('/b/program-list')" target="_blank">프로그램 목록</a></td>
                <td class="tc">8.10</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">관리자</td>
                <td>API 관리</td>
                <td></td>
                <td>views/apimanage/ApiManageView.vue</td>
                <td><a @click="pageMove('/b/apimanage')" target="_blank">API관리</a></td>
                <td class="tc">8.11</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">관리자</td>
                <td>다국어 관리</td>
                <td></td>
                <td>views/language/LanguageView.vue</td>
                <td><a @click="pageMove('/b/language')" target="_blank">다국어 관리</a></td>
                <td class="tc">8.17</td>
                <td></td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">S&OP</td>
              </tr>
              <tr class="">
                <td class="mtr">S&OP</td>
                <td>재고할당관리</td>
                <td></td>
                <td>views/Inventory-manage/InventoryManageView.vue</td>
                <td>
                  <a @click="pageMove('/b/Inventory-manage')" target="_blank">재고할당관리</a>
                </td>
                <td class="tc">8.17</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">S&OP</td>
                <td>예탁처리</td>
                <td></td>
                <td>views/depository/DepositoryView.vue</td>
                <td>
                  <a @click="pageMove('/b/depository')" target="_blank">예탁처리</a>
                </td>
                <td class="tc">8.17</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">S&OP</td>
                <td>기준판가관리</td>
                <td></td>
                <td>views/standard-price/StandardPriceView.vue</td>
                <td>
                  <a @click="pageMove('/b/standard-price')" target="_blank">기준판가관리</a>
                </td>
                <td class="tc">8.18</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">S&OP</td>
                <td>거래처별 적용판가관리</td>
                <td></td>
                <td>views/client-draft-price/ClientDraftPriceView.vue</td>
                <td>
                  <a @click="pageMove('/b/client-draft-price')" target="_blank">거래처별 적용판가관리</a>
                </td>
                <td class="tc">8.18</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">S&OP</td>
                <td>예정월관리</td>
                <td></td>
                <td>views/scheduled-month/ScheduledMonthView.vue</td>
                <td>
                  <a @click="pageMove('/b/scheduled-month')" target="_blank">예정월관리</a>
                </td>
                <td class="tc">10.20</td>
                <td></td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">UTILITY</td>
              </tr>
              <tr class="">
                <td class="mtr">UTILITY</td>
                <td>공지사항</td>
                <td></td>
                <td>views/notice/NoticeView.vue</td>
                <td>
                  <a @click="pageMove('/b/notice')" target="_blank">공지사항</a>
                </td>
                <td class="tc">8.22</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">UTILITY</td>
                <td>메뉴얼</td>
                <td></td>
                <td>views/manual/ManualView.vue</td>
                <td>
                  <a @click="pageMove('/b/manual')" target="_blank">메뉴얼</a>
                </td>
                <td class="tc">8.22</td>
                <td></td>
              </tr>

              <tr class="">
                <td class="mtr">UTILITY</td>
                <td>개인정보취급방침</td>
                <td></td>
                <td>views/privacy/PrivacyView.vue</td>
                <td>
                  <a @click="pageMove('/b/privacy')" target="_blank">개인정보취급방침</a>
                </td>
                <td class="tc">8.23</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">UTILITY</td>
                <td>이용약관</td>
                <td></td>
                <td>views/terms/TermsView.vue</td>
                <td>
                  <a @click="pageMove('/b/terms')" target="_blank">이용약관</a>
                </td>
                <td class="tc">8.23</td>
                <td></td>
              </tr>

              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">마이페이지</td>
              </tr>
              <tr class="">
                <td class="mtr">마이페이지</td>
                <td>고객사, 운송사 목록</td>
                <td></td>
                <td>views/client-list/ClientListView.vue</td>
                <td>
                  <a @click="pageMove('/b/client-list')" target="_blank">고객사, 운송사 목록</a>
                </td>
                <td class="tc">8.22</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마이페이지</td>
                <td>고객사 상세</td>
                <td></td>
                <td>views/client-detail/ClientDetailView.vue</td>
                <td>
                  <a @click="pageMove('/b/client-detail')" target="_blank">고객사 상세</a>
                </td>
                <td class="tc">8.22</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마이페이지</td>
                <td>회원정보설정</td>
                <td></td>
                <td>views/member-info-set/MemberInfoSetView.vue</td>
                <td>
                  <a @click="pageMove('/b/member-info-set')" target="_blank">회원정보설정</a>
                </td>
                <td class="tc">8.23</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마이페이지</td>
                <td>회원정보설정 운송</td>
                <td></td>
                <td>views/member-info-set-transit/MemberInfoSetTransitView.vue</td>
                <td>
                  <a @click="pageMove('/b/member-info-set-transit')" target="_blank">회원정보설정 운송</a>
                </td>
                <td class="tc">8.23</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마이페이지</td>
                <td>배송지목록</td>
                <td></td>
                <td>views/shipping-list/ShippinglistView.vue</td>
                <td>
                  <a @click="pageMove('/b/shipping-list')" target="_blank">배송지목록</a>
                </td>
                <td class="tc">8.23</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마이페이지</td>
                <td>직원관리</td>
                <td></td>
                <td>views/worker-list/WorkerlistView.vue</td>
                <td>
                  <a @click="pageMove('/b/worker-list')" target="_blank">직원관리</a>
                </td>
                <td class="tc">8.23</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마이페이지</td>
                <td>직원등록</td>
                <td></td>
                <td>views/worker-regist/WorkerRegistView.vue</td>
                <td>
                  <a @click="pageMove('/b/worker-regist')" target="_blank">직원등록</a>
                </td>
                <td class="tc">8.23</td>
                <td></td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">클레임 관리</td>
              </tr>
              <tr class="">
                <td class="mtr">클레임 관리</td>
                <td>접수관리</td>
                <td></td>
                <td>views/claim-receive/ClaimReceiveView.vue</td>
                <td>
                  <a @click="pageMove('/b/claim-receive')" target="_blank">접수관리</a>
                </td>
                <td class="tc"></td>
                <td></td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">배차계획</td>
              </tr>
              <tr class="">
                <td class="mtr">배차계획</td>
                <td>예탁출고 요청관리</td>
                <td></td>
                <td>views/dispatch-deposit/DispatchDepositView.vue</td>
                <td>
                  <a @click="pageMove('/b/dispatch-deposit')" target="_blank">예탁출고 요청관리</a>
                </td>
                <td class="tc">9.16</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">배차계획</td>
                <td>PO출고 요청관리</td>
                <td></td>
                <td>views/dispatch-po/DispatchPoView.vue</td>
                <td>
                  <a @click="pageMove('/b/dispatch-po')" target="_blank">PO출고 요청관리</a>
                </td>
                <td class="tc">9.16</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">배차계획</td>
                <td>출고 요청관리</td>
                <td></td>
                <td>views/dispatch-release/DispatchReleaseView.vue</td>
                <td>
                  <a @click="pageMove('/b/dispatch-release')" target="_blank">출고 요청관리</a>
                </td>
                <td class="tc">9.16</td>
                <td></td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">운송실행</td>
              </tr>
              <tr class="">
                <td class="mtr">운송실행</td>
                <td>차량관리</td>
                <td></td>
                <td>views/car-manage/CarManageView.vue</td>
                <td>
                  <a @click="pageMove('/b/car-manage')" target="_blank">차량관리</a>
                </td>
                <td class="tc">9.16</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">운송실행</td>
                <td>배차 확정관리</td>
                <td></td>
                <td>views/car-confirm/CarConfirmView.vue</td>
                <td>
                  <a @click="pageMove('/b/car-confirm')" target="_blank">배차 확정관리</a>
                </td>
                <td class="tc">9.16</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">운송실행</td>
                <td>배차요청관리</td>
                <td></td>
                <td>views/car-request/CarRequestView.vue</td>
                <td>
                  <a @click="pageMove('/b/car-request')" target="_blank">배차 요청관리</a>
                </td>
                <td class="tc">9.16</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">운송실행</td>
                <td>입/출차관리</td>
                <td></td>
                <td>views/car-inout/CarInOutView.vue</td>
                <td>
                  <a @click="pageMove('/b/car-inout')" target="_blank">입/출차관리</a>
                </td>
                <td class="tc">9.16</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">운송실행</td>
                <td>인수관리</td>
                <td></td>
                <td>views/car-takeover/CarTakeOverView.vue</td>
                <td>
                  <a @click="pageMove('/b/car-takeover')" target="_blank">인수관리</a>
                </td>
                <td class="tc">9.19</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">운송실행</td>
                <td>반품 입고 수량확정</td>
                <td></td>
                <td>views/car-return-in/CarReturnInDetailView.vue</td>
                <td>
                  <a @click="pageMove('/b/car-return-in')" target="_blank">반품 입고 수량확정</a>
                </td>
                <td class="tc">9.22</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">운송실행</td>
                <td>반품 입고 수량확정</td>
                <td>반품 입고 상세</td>
                <td>views/car-return-in-d/CarReturnInDetailView.vue</td>
                <td>
                  <a @click="pageMove('/b/car-return-in-d')" target="_blank">반품 입고 상세</a>
                </td>
                <td class="tc">9.22</td>
                <td></td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">운송실적</td>
              </tr>
              <tr class="">
                <td class="mtr">운송실적</td>
                <td>출고 상태조회</td>
                <td></td>
                <td>views/release-state/ReleaseStateView.vue</td>
                <td>
                  <a @click="pageMove('/b/release-state')" target="_blank">출고 상태조회</a>
                </td>
                <td class="tc">9.23</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">운송실적</td>
                <td>운송비 관리</td>
                <td></td>
                <td>views/transport-cost/TransportCostView.vue</td>
                <td>
                  <a @click="pageMove('/b/transport-cost')" target="_blank">운송비 관리</a>
                </td>
                <td class="tc">9.23</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">운송실적</td>
                <td>운송비 조회</td>
                <td></td>
                <td>views/transport-cost-inquiry/TransportCostInquiryView.vue</td>
                <td>
                  <a @click="pageMove('/b/transport-cost-inquiry')" target="_blank">운송비 조회</a>
                </td>
                <td class="tc">9.24</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">운송실적</td>
                <td>운송비 월마감 조회</td>
                <td></td>
                <td>views/transport-cost-inquiry-month/TransportCostInquiryMonthView.vue</td>
                <td>
                  <a @click="pageMove('/b/transport-cost-inquiry-month')" target="_blank">운송비 월마감 조회</a>
                </td>
                <td class="tc">9.25</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">운송실적</td>
                <td>출고현황 세부내역</td>
                <td></td>
                <td>views/release-state-detail/ReleaseStateDetailView.vue</td>
                <td>
                  <a @click="pageMove('/b/release-state-detail')" target="_blank">출고현황 세부내역</a>
                </td>
                <td class="tc">9.25</td>
                <td></td>
              </tr>
              <tr class="mtr milestone">
                <td colspan="7" id="item1" class="tit">마스터</td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>파트너관리</td>
                <td></td>
                <td>views/master/partner-manage/PartnerMView.vue</td>
                <td>
                  <a @click="pageMove('/b/master/partner-m')" target="_blank">파트너관리</a>
                </td>
                <td class="tc">10.11</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>파트너등록</td>
                <td></td>
                <td>views/master/partner-regist/PartnerRView.vue</td>
                <td>
                  <a @click="pageMove('/b/master/partner-r')" target="_blank">파트너등록</a>
                </td>
                <td class="tc">10.12</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>표준배송납기관리</td>
                <td></td>
                <td>views/master/standardshipping/StandardShippingView.vue</td>
                <td>
                  <a @click="pageMove('/b/master/standardshipping')" target="_blank">표준배송납기관리</a>
                </td>
                <td class="tc">10.13</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>주문제어품목관리</td>
                <td></td>
                <td>views/master/ordercontrol/OrderControlRequest.vue</td>
                <td>
                  <a @click="pageMove('/b/master/ordercontrol')" target="_blank">주문제어품목관리</a>
                </td>
                <td class="tc">10.13</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>품목군별 담당영업사원관리</td>
                <td></td>
                <td>views/master/itemgroup/ItemGroupRequest.vue</td>
                <td>
                  <a @click="pageMove('/b/master/itemgroup')" target="_blank">품목군별 담당영업사원관리</a>
                </td>
                <td class="tc">10.13</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>제품관리</td>
                <td>목록</td>
                <td>views/master/productmanage/ProductManageRequest.vue</td>
                <td>
                  <a @click="pageMove('/b/master/productmanage')" target="_blank">제품관리</a>
                </td>
                <td class="tc">10.13</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>제품관리</td>
                <td>상세</td>
                <td>views/master/productmdetail/ProductmDetailRequest.vue</td>
                <td>
                  <a @click="pageMove('/b/master/productmdetail')" target="_blank">제품관리 상세</a>
                </td>
                <td class="tc">10.13</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>특성항목정보</td>
                <td></td>
                <td>views/master/specialiteminfo/SpecialItemInfoRequest.vue</td>
                <td>
                  <a @click="pageMove('/b/master/specialiteminfo')" target="_blank">특성항목정보</a>
                </td>
                <td class="tc">10.14</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>계층구조관리</td>
                <td></td>
                <td>views/master/treemanage/TreeManageRequest.vue</td>
                <td>
                  <a @click="pageMove('/b/master/treemanage')" target="_blank">계층구조관리</a>
                </td>
                <td class="tc">10.14</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>운송</td>
                <td>운송권역관리</td>
                <td>views/master/transportarea/TransportAreaRequest.vue</td>
                <td>
                  <a @click="pageMove('/b/master/transportarea')" target="_blank">운송권역관리</a>
                </td>
                <td class="tc">10.14</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>운송</td>
                <td>운임마스터관리</td>
                <td>views/master/faremaster/FareMasterRequest.vue</td>
                <td>
                  <a @click="pageMove('/b/master/faremaster')" target="_blank">운임마스터관리</a>
                </td>
                <td class="tc">10.14</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>운송</td>
                <td>플랜트관리</td>
                <td>views/master/plantmanage/PlantManageRequest.vue</td>
                <td>
                  <a @click="pageMove('/b/master/plantmanage')" target="_blank">플랜트관리</a>
                </td>
                <td class="tc">10.14</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>AD사용자관리</td>
                <td></td>
                <td>views/master/aduser/AdUserRequest.vue</td>
                <td>
                  <a @click="pageMove('/b/master/aduser')" target="_blank">AD사용자관리</a>
                </td>
                <td class="tc">11.01</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>AD사용자관리</td>
                <td>사용자 등록</td>
                <td>views/master/aduser-regist/AdUserRRequest.vue</td>
                <td>
                  <a @click="pageMove('/b/master/aduser-regist')" target="_blank">AD사용자등록</a>
                </td>
                <td class="tc">11.01</td>
                <td></td>
              </tr>
              <tr class="">
                <td class="mtr">마스터</td>
                <td>휴일달력관리</td>
                <td></td>
                <td>views/master/calendar/CalendarRequest.vue</td>
                <td>
                  <a @click="pageMove('/b/master/calendar')" target="_blank">휴일달력관리</a>
                </td>
                <td class="tc">11.01</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- //directory -->
      </div>
    </div>

    <!-- <button @click="pageMove('/b/login')">Login</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      tabs: ['Web', 'Mobile'],
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
      window.open('https://mdsalesvrgdwdev.dongwha.com/b', '_self');
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/report.scss';
</style>
