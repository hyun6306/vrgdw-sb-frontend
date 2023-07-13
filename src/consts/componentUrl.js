/**
 * 라우터 Path 별로 관려있는 컴포넌트 이름 관리를 위해 등록이 필요함.
 * 메뉴 선택 시 탭에 추가되며 컴포넌트가 유지되게 하기 위해 필요함.
 * componentList.js 와 value 연관되어 작업되어야 함.
 */
export const compoentUrl = {
  '/main': { componentNm: 'DashBoard', page: 'dash' }, // 메인(대시보드)
  '/order/general': { componentNm: 'OrderGeneral', page: 'order' }, // 주문 - 견적관리 - 견적요청

  '/order/general-list': { componentNm: 'GeneralList', page: 'management' }, // 주문 - 견적관리 - 견적현황
  '/order/general-dtls-list': { componentNm: 'QuoteDetail', page: 'orderDtls' }, //  주문 - 견적관리 - 견적상세
  '/order/sample': { componentNm: 'OrderGeneral', page: 'sample' }, // 주문 - 생픔관리 - 샘플요청
  '/order/sample-list': { componentNm: 'sampleList', page: 'sampleList' }, // 주문 - 생픔관리 - 샘플 관리
  '/order/sample-dtls-list': { componentNm: 'QuoteDetail', page: 'sampleDtls' }, //  주문 - 생픔관리 - 샘플상세

  '/order/booking-list': { componentNm: 'BookingOrder', page: 'bookingOrder' }, // 주문 - 부킹관리 - 부킹상세
  '/order/inventory-allocation-list': { componentNm: 'InventoryAllocationList', page: 'inventoryAllocationList' }, // 주문 - 부킹관리 - 재고할당관리

  '/report/order-list': { componentNm: 'OrderList', page: 'orderList' }, // 주문 - 레포트 - 거래내역조회
  '/report/credit': { componentNm: 'CreditCurrent', page: 'creditCurrent' }, // 주문 - 레포트 - 여신현황
  '/tran/delivery-list': { componentNm: 'DeliveryList', page: 'deliveryList' }, // 배송- 배송관리 - 배송현황
  '/serv/claim': { componentNm: 'ClaimRegist', page: 'claimRegist' }, // 서비스 - 클레임관리 - 클레임등록
  '/serv/claim-list': { componentNm: 'ClaimList', page: 'claimList' }, // 서비스 - 클레임관리 - 클레임목록

  '/util/notice': { componentNm: 'UtilPage', page: 'utilNotice' }, // utility - 공지사항
  '/util/manual': { componentNm: 'UtilPage', page: 'utilManual' }, // utility - 메뉴얼
  '/util/private': { componentNm: 'UtilPrivate', page: 'utilPrivate' }, // utility - 개인정보처리방침
  '/util/agree-view': { componentNm: 'UtilAgree', page: 'utilAgree' }, // utility - 이용약관

  '/mypage/info': { componentNm: 'MyInfo', page: 'myInfo' }, // mypage - 회원정보 설정
  '/mypage/staffs': { componentNm: 'StaffList', page: 'staffList' }, // mypage - 직원관리 - 직원목록
  '/mypage/delivery': { componentNm: 'MyDeliveryList', page: 'myDeliveryList' }, // mypage - 배송지목록
  '/mypage/tran/list-of-carriers': { componentNm: 'CustList', page: 'carriersList' }, // mypage - 운송사관리 - 운송사목록
  '/mypage/cust/cust-list': { componentNm: 'CustList', page: 'custList' }, // mypage - 고객사목록
  '/mypage/cust/cust-dtls-list': { componentNm: 'CustDtls', page: 'custDtls' }, // mypage - 고객사성세

  // 운송사 메뉴
  '/tran/plan/deposit-forwarding-request-manage': { componentNm: 'DepositFwReqManage', page: 'depositFwReqManage' }, // 운송 - 배차계획 - 예탁출고요청관리
  '/tran/plan/po-forwarding-request-manage': { componentNm: 'PoForwardingRequest', page: 'poForwardingRequest' }, // 운송 - 배차계획 - PO출고요청관리
  '/tran/forwarding-req-manage': { componentNm: 'ForwardingReqManage', page: 'ForwardingReqManage' }, // 운송 - 배차계획 - 출고요청관리
  '/tran/car-manage': { componentNm: 'CarManage', page: 'carManage' }, // 운송 - 운송실행 - 차량관리
  '/tran/dispatch-req-manage': { componentNm: 'DispatchReqManage', page: 'dispatchReqManage' }, // 운송 - 운송실행 - 배차요청관리
  '/tran/dispatch-confirm-manage': { componentNm: 'DispatchConfirmManage', page: 'dispatchConfirmManage' }, // 운송 - 운송실행 - 배차확정관리
  '/tran/car-in-out-manage': { componentNm: 'CarInOutManage', page: 'carInOutManage' }, // 운송 - 운송실행 - 차량 입/출차관리
  '/tran/take-over-manage': { componentNm: 'TakeOverManage', page: 'takeOverManage' }, // 운송 - 운송실행 - 인수관리
  // '/tran/return-in-amount-confirm': { componentNm: 'ReturnInAmountConfirm', page: 'returnInAmountConfirm' }, // 운송 - 운송실행 - 반품 입고수량 확정
  '/tran/forwarding-status-list': { componentNm: 'ForwardingStatList', page: 'forwardingStatList' }, // 운송 - 운송실적 - 출고상태조회
  '/tran/tran-cost-manage': { componentNm: 'TranCostManage', page: 'tranCostManage' }, // 운송 - 운송실적 - 운송비 관리
  '/tran/tran-cost-list': { componentNm: 'TranCostList', page: 'tranCostList' }, // 운송 - 운송실적 - 운송비 조회
  '/tran/tran-cost-month-closing-list': { componentNm: 'TranCostMonthClosingList', page: 'tranCostMonthClosingList' }, // 운송 - 운송실적 - 운송비 월 마감 조회
  // '/mypage/main': { componentNm: 'MypageMain', page: 'mypageMain' }, // 운송 - 운송실적 - 출고현황 세부내역(BI)

  // 영업직원 메뉴
  '/cust/cust-card-list': { componentNm: 'CustCardList', page: 'custCardList' }, // 영업활동 - 고객관리 - 고객카드
  '/order/item-price-list': { componentNm: 'PriceList', page: 'itemPriceList' }, // 영업활동 - 판가관리 - 기준 판가 관리
  '/cust/sale-price-list': { componentNm: 'PriceList', page: 'salePriceList' }, // 영업활동 - 판가관리 - 거래처별 판가 관리
  // '/order/item-price-dtls-list': { componentNm: 'ItemPriceDtlsList', page: 'itemPriceDtlsList' }, // 영업활동 - 판가관리 - 판가 관리 상세
  '/bi/main': { componentNm: 'BiMain', page: 'biMain' }, // 영업활동 - 영업 BI - view
  '/order/free-return': { componentNm: 'FreeReturn', page: 'freeReturn' }, // 견적요청 - 견적관리 - 무상/반품 주문 등록

  '/tran/partner-list': { componentNm: 'PartnerList', page: 'partnerList' }, // 마스터 - 고객관리 - 파트너 목록
  '/tran/outsourcing-list': { componentNm: 'OutsourcingList', page: 'outsourcingList' }, // 마스터 - 고객관리 - 외주 업체 관리
  '/master/product-list': { componentNm: 'ProductList', page: 'productList' }, // 마스터 - 제품관리 - 제품목록
  '/master/product-chart-list': { componentNm: 'ProductChartList', page: 'productChartList' }, // 마스터 - 제품관리 - 특성항목관리
  '/master/product-level-list': { componentNm: 'ProductLevelList', page: 'productLevelList' }, // 마스터 - 제품관리 - 제품계층구조관리
  '/master/product-category-list': { componentNm: 'ProductCategoryList', page: 'productCategoryList' }, // 마스터 - 제품관리 - 품목군별 영업사원 관리
  '/master/tran-standard-list': { componentNm: 'TranStandardList', page: 'tranStandardList' }, // 마스터 - 주문관리 - 배송 납기 표준 관리
  '/master/product-control-list': { componentNm: 'ProductControlList', page: 'productControlList' }, // 마스터 - 주문관리 - 주문제어품목관리
  '/master/area-management': { componentNm: 'AreaManagement', page: 'AreaManagement' }, // 마스터 - 운송기준관리 - 권역 관리
  '/master/tran-area-management': { componentNm: 'TranAreaManagement', page: 'TranAreaManagement' }, // 마스터 - 운송기준관리 - 운송권역 관리
  '/tran/logits-area-list': { componentNm: 'LogitsAreaList', page: 'logitsAreaList' }, // 마스터 - 운송기준관리 - 물류 창고 관리
  '/tran/car-type-list': { componentNm: 'CarTypeList', page: 'carTypeList' }, // 마스터 - 운송기준관리 - 차량 유형 관리
  '/tran/logits-list': { componentNm: 'LogitsList', page: 'logitsList' }, // 마스터 - 운송기준관리 - 상차지 관리
  '/base/country-list': { componentNm: 'CountryList', page: 'countryList' }, // 마스터 - 공통기준관리 - 국가코드 관리
  '/base/company-list': { componentNm: 'CompanyList', page: 'companyList' }, // 마스터 - 공통기준관리 - 회사코드 관리
  '/base/exchange-rate-list': { componentNm: 'ExchangeRateList', page: 'exchangeRateList' }, // 마스터 - 공통기준관리 - 환율관리
  '/base/plant-list': { componentNm: 'PlantList', page: 'plantList' }, // 마스터 - 공통기준관리 - 플랜트관리
  '/base/storage-list': { componentNm: 'StorageList', page: 'storageList' }, // 마스터 - 공통기준관리 - 저장위치관리
  '/base/currency-list': { componentNm: 'CurrencyList', page: 'currencyList' }, // 마스터 - 공통기준관리 - 통화관리
  '/base/holiday-list': { componentNm: 'HolidayList', page: 'holidayList' }, // 마스터 - 공통기준관리 - 휴무일 관리
  '/base/trnBlock-list': { componentNm: 'TrnBlockList', page: 'trnBlockList' }, // 마스터 - 공통기준관리 - 출고제한일 관리
  '/master/ad-request-list': { componentNm: 'UserList', page: 'adUserReqList' }, // 마스터 - ADUser - AD 사용자 등록
  '/master/user-list': { componentNm: 'UserList', page: 'userMng' }, // 마스터 - ADUser - 사용자 관리
  '/master/order-month-management': { componentNm: 'OrderMonthManagement', page: 'OrderMonthManagement' }, // 마스터 - 주문관리 - 주문 월 관리
  '/master/product-management': { componentNm: 'ProductManagement', page: 'ProductManagement' }, // 제품관리
  '/master/product-management-detail': { componentNm: 'ProductManagementDetail', page: 'ProductManagementDetail' }, // 제품관리(상세)
  '/master/cust-manage': { componentNm: 'PartnerList', page: 'custManage' }, // 마스터 - 파트너목록 - 고객관리
  '/master/cust-manage-dtls': { componentNm: 'PartnerDtls', page: 'custManageDtls' }, // 마스터 - 파트너목록 - 고객관리 상세
  '/master/tran-manage': { componentNm: 'PartnerList', page: 'tranManage' }, // 마스터 - 파트너목록 - 운송사관리
  '/master/tran-manage-dtls': { componentNm: 'PartnerDtls', page: 'tranManageDtls' }, // 마스터 - 파트너목록 - 운송사관리 상세

  // 물류직원(배차) 메뉴

  '/system/menu-list': { componentNm: 'MenuGroup', page: 'menuGroup' }, // 메뉴그룹
  '/system/router-list': { componentNm: 'RouterList', page: 'routerList' }, // 프로그램 관리
  '/system/code-list': { componentNm: 'CodeList', page: 'codeList' }, // 공통 코드
  '/system/language/lang': { componentNm: 'LanguageLang', page: 'slang' }, // 다국어 단어사전
  '/system/language/page': { componentNm: 'LanguagePage', page: 'sPage' }, // 다국어 라우터 단어 연결
  '/system/common/agree': { componentNm: 'AgreeManage', page: 'agree' }, // 개인정보활용동의 관리
  '/system/common/privacy': { componentNm: 'PrivacyManage', page: 'privacy' }, // 약관관리
  '/system/log/api': { componentNm: 'LogManage', page: 'apiLogManage' }, // API 로그 관리
  '/system/log/menu': { componentNm: 'LogManage', page: 'menuLogManage' }, // 메뉴 로그 관리
  '/system/log/interface': { componentNm: 'LogManage', page: 'interfaceLogManage' }, // 인터페이스 로그 관리
  '/system/log/login-list': { componentNm: 'LoginList', page: 'LoginList' }, // 로그인 로그 관리
  '/system/log/integrated-notification-list': { componentNm: 'IntegratedNotificationList', page: 'integratedNotificationList' }, // 통합알림관리
  '/system/organization-management': { componentNm: 'OrganizationManagement', page: 'OrganizationManagement' }, // 조직관리
  '/system/hr-information-list': { componentNm: 'HRInformationList', page: 'HRInformationList' }, // 인사정보 변경 조회
  '/system/log/schedule-log': { componentNm: 'ScheduleLog', page: 'ScheduleLog' }, // 스케줄 로그

  '/dev/sample/grid': { componentNm: 'RealGridSample', page: 'DevSampleGrid' }, // 개발 가이드
  '/dev/sample/tree-grid': { componentNm: 'RealGridSample', page: 'DevSampleTreeGrid' }, // 개발 가이드
  '/dev/sample/test': { componentNm: 'TestRealGridSample', page: 'DevSampleGrid' }, // test
};
