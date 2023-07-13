import Vue from 'vue';
import VueRouter from 'vue-router';
import routerUtils from '@wb/utils/routerUtils';

Vue.use(VueRouter);

const routes = [
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  {
    path: '/b/',
    redirect: '/b/index',
  },
  {
    path: '/b/index', //현황판
    component: routerUtils.importComponentFile('IndexView'),
  },
  {
    path: '/b/login', //로그인
    component: routerUtils.importComponentFile('member/LoginView'),
  },
  {
    path: '/b/Idpw', //아이디,패스워드찾기
    component: routerUtils.importComponentFile('member/IdpwSearchView'),
  },
  {
    path: '/b/join', //회원가입
    component: routerUtils.importComponentFile('member/JoinView'),
  },
  {
    path: '/b/modal', //모달모음
    components: routerUtils.importComponentsFile('ModalView'),
  },
  {
    path: '/b/ffpage', //404page
    components: routerUtils.importComponentsFile('404View'),
  },
  {
    path: '/b/main', //로그인 후 첫 페이지
    components: routerUtils.importComponentsFile('MainView'),
  },
  {
    path: '/b/sample', //견적요청>샘플견적요청
    components: routerUtils.importComponentsFile('sample/SampleView'),
  },
  {
    path: '/b/sample-detail', //샘플요청>샘플상세
    components: routerUtils.importComponentsFile('sample-detail/SampleDetailView'),
  },
  {
    path: '/b/order', //견적요청>일반견적요청
    components: routerUtils.importComponentsFile('order/OrderView'),
  },
  {
    path: '/b/quote-manage', //견적관리
    components: routerUtils.importComponentsFile('quote-manage/ManageView'),
  },
  {
    path: '/b/quote-manage-detail', //견적관리상세
    components: routerUtils.importComponentsFile('quote-manage-detail/ManageDetailView'),
  },
  {
    path: '/b/quote-detail', //견적상세
    components: routerUtils.importComponentsFile('quote-detail/QuoteDetailView'),
  },
  {
    path: '/b/booking', //부킹상세
    components: routerUtils.importComponentsFile('booking/BookingView'),
  },
  {
    path: '/b/program', //프로그램관리
    components: routerUtils.importComponentsFile('program/ProgramView'),
  },
  {
    path: '/b/common-code', //공통코드관리
    components: routerUtils.importComponentsFile('common-code/CommonCodeView'),
  },
  {
    path: '/b/program-list', //프로그램 목록
    components: routerUtils.importComponentsFile('program-list/ProgramListView'),
  },
  {
    path: '/b/apimanage', //API관리
    components: routerUtils.importComponentsFile('apimanage/ApiManageView'),
  },
  {
    path: '/b/Inventory-manage', //재고할당관리
    components: routerUtils.importComponentsFile('Inventory-manage/InventoryManageView'),
  },
  {
    path: '/b/Language', //다국어관리
    components: routerUtils.importComponentsFile('language/LanguageView'),
  },
  {
    path: '/b/Depository', //예탁처리
    components: routerUtils.importComponentsFile('depository/DepositoryView'),
  },
  {
    path: '/b/delivery-status', //배송현황
    components: routerUtils.importComponentsFile('delivery-status/DeliveryStatusView'),
  },
  {
    path: '/b/standard-price', //기준판가관리
    components: routerUtils.importComponentsFile('standard-price/StandardPriceView'),
  },
  {
    path: '/b/client-draft-price', //거래처별 적용판가관리
    components: routerUtils.importComponentsFile('client-draft-price/ClientDraftPriceView'),
  },
  {
    path: '/b/notice', //공지사항
    components: routerUtils.importComponentsFile('notice/NoticeView'),
  },
  {
    path: '/b/manual', //메뉴얼
    components: routerUtils.importComponentsFile('manual/ManualView'),
  },
  {
    path: '/b/client-list', //고객사 목록
    components: routerUtils.importComponentsFile('client-list/ClientListView'),
  },
  {
    path: '/b/client-detail', //고객사 상세
    components: routerUtils.importComponentsFile('client-detail/ClientDetailView'),
  },
  {
    path: '/b/member-info-set', //회원정보 설정
    components: routerUtils.importComponentsFile('member-info-set/MemberInfoSetView'),
  },
  {
    path: '/b/member-info-set-transit', //회원정보 운송 설정
    components: routerUtils.importComponentsFile('member-info-set-transit/MemberInfoSetTransitView'),
  },
  {
    path: '/b/privacy', //개인정보취급방침
    components: routerUtils.importComponentsFile('privacy/PrivacyView'),
  },
  {
    path: '/b/terms', //이용약관
    components: routerUtils.importComponentsFile('terms/TermsView'),
  },
  {
    path: '/b/shipping-list', //배송지목록
    components: routerUtils.importComponentsFile('shipping-list/ShippinglistView'),
  },
  {
    path: '/b/worker-list', //직원관리
    components: routerUtils.importComponentsFile('worker-list/WorkerlistView'),
  },
  {
    path: '/b/worker-regist', //직원등록
    components: routerUtils.importComponentsFile('worker-regist/WorkerRegistView'),
  },
  {
    path: '/b/dispatch-deposit', //예탁출고 요청관리
    components: routerUtils.importComponentsFile('dispatch-deposit/DispatchDepositView'),
  },
  {
    path: '/b/dispatch-po', //PO출고 요청관리
    components: routerUtils.importComponentsFile('dispatch-po/DispatchPoView'),
  },
  {
    path: '/b/dispatch-release', //출고 요청관리
    components: routerUtils.importComponentsFile('dispatch-release/DispatchReleaseView'),
  },
  {
    path: '/b/claim-receive', //클레임 접수관리
    components: routerUtils.importComponentsFile('claim-receive/ClaimReceiveView'),
  },
  {
    path: '/b/car-manage', //운송실행> 차량관리
    components: routerUtils.importComponentsFile('car-manage/CarManageView'),
  },
  {
    path: '/b/car-request', //운송실행> 배차요청관리
    components: routerUtils.importComponentsFile('car-request/CarRequestView'),
  },
  {
    path: '/b/car-confirm', //운송실행> 배차확정관리
    components: routerUtils.importComponentsFile('car-confirm/CarConfirmView'),
  },
  {
    path: '/b/car-inout', //운송실행> 입출차관리
    components: routerUtils.importComponentsFile('car-inout/CarInOutView'),
  },
  {
    path: '/b/car-takeover', //운송실행> 인수관리
    components: routerUtils.importComponentsFile('car-takeover/CarTakeOverView'),
  },
  {
    path: '/b/car-return-in', //운송실행> 반품입고 수량확정
    components: routerUtils.importComponentsFile('car-return-in/CarReturnInView'),
  },
  {
    path: '/b/car-return-in-d', //운송실행> 반품입고 상세
    components: routerUtils.importComponentsFile('car-return-in-d/CarReturnInDetailView'),
  },
  {
    path: '/b/release-state', //운송실적> 출고 상태조회
    components: routerUtils.importComponentsFile('release-state/ReleaseStateView'),
  },
  {
    path: '/b/transport-cost', //운송실적> 운송비 관리
    components: routerUtils.importComponentsFile('transport-cost/TransportCostView'),
  },
  {
    path: '/b/transport-cost-inquiry', //운송실적> 운송비 조회
    components: routerUtils.importComponentsFile('transport-cost-inquiry/TransportCostInquiryView'),
  },
  {
    path: '/b/transport-cost-inquiry-month', //운송실적> 운송비 월마감 조회
    components: routerUtils.importComponentsFile('transport-cost-inquiry-month/TransportCostInquiryMonthView'),
  },
  {
    path: '/b/release-state-detail', //운송실적> 출고현황 세부내역
    components: routerUtils.importComponentsFile('release-state-detail/ReleaseStateDetailView'),
  },
  {
    path: '/b/master/partner-m', //마스터 > 파트너 관리
    components: routerUtils.importComponentsFile('master/partner-manage/PartnerMView'),
  },
  {
    path: '/b/master/partner-r', //마스터 > 파트너 등록
    components: routerUtils.importComponentsFile('master/partner-regist/PartnerRView'),
  },
  {
    path: '/b/master/standardshipping', //마스터 > 표준배송 납기관리
    components: routerUtils.importComponentsFile('master/standardshipping/StandardShippingView'),
  },
  {
    path: '/b/master/ordercontrol', //마스터 > 주문제어품목관리
    components: routerUtils.importComponentsFile('master/ordercontrol/OrderControlView'),
  },
  {
    path: '/b/master/itemgroup', //마스터 > 품목군별 담당영업사원관리
    components: routerUtils.importComponentsFile('master/itemgroup/ItemGroupView'),
  },
  {
    path: '/b/master/productmanage', //마스터 > 제품관리
    components: routerUtils.importComponentsFile('master/productmanage/ProductManageView'),
  },
  {
    path: '/b/master/productmdetail', //마스터 > 제품관리 상세
    components: routerUtils.importComponentsFile('master/productmdetail/ProductmDetailView'),
  },
  {
    path: '/b/master/specialiteminfo', //마스터 > 특성항목정보
    components: routerUtils.importComponentsFile('master/specialiteminfo/SpecialItemInfoView'),
  },
  {
    path: '/b/master/treemanage', //마스터 > 계층구조관리
    components: routerUtils.importComponentsFile('master/treemanage/TreeManageView'),
  },
  {
    path: '/b/master/transportarea', //마스터 > 운송 > 운송권역관리
    components: routerUtils.importComponentsFile('master/transportarea/TransportAreaView'),
  },
  {
    path: '/b/master/faremaster', //마스터 > 운송 > 운임마스터관리
    components: routerUtils.importComponentsFile('master/faremaster/FareMasterView'),
  },
  {
    path: '/b/master/plantmanage', //마스터 > 운송 > 플랜트관리
    components: routerUtils.importComponentsFile('master/plantmanage/PlantManageView'),
  },
  {
    path: '/b/master/aduser', //마스터 > Ad사용자관리
    components: routerUtils.importComponentsFile('master/aduser/AdUserView'),
  },
  {
    path: '/b/master/aduser-regist', //마스터 > Ad사용자등록
    components: routerUtils.importComponentsFile('master/aduser-regist/AdUserRView'),
  },
  {
    path: '/b/scheduled-month', //s&op > 예정월관리
    components: routerUtils.importComponentsFile('scheduled-month/ScheduledMonthView'),
  },
  {
    path: '/b/master/calendar', //마스터 > 휴일달력관리
    components: routerUtils.importComponentsFile('master/calendar/CalendarView'),
  },
  {
    path: '/b/dashboard', //대시보드
    components: routerUtils.importComponentsFile('dashboard/DashBoardView'),
  },
  {
    path: '/b/test', //현황판
    component: routerUtils.importComponentFile('TestWeb'),
  },
  {
    path: '/b/testCanvas', //현황판
    component: routerUtils.importComponentFile('TestWebCanvas'),
  },
  {
    path: '/b/testCanvas2', //현황판
    component: routerUtils.importComponentFile('TestWebCanvas2'),
  },
  {
    path: '/b/testCalendar', //테스트
    component: routerUtils.importComponentFile('TestCalendar'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // ...
  // explicitly return false to cancel the navigation
  next();
});

export default router;
