import Vue from 'vue';
import VueRouter from 'vue-router';
import routerUtils from '@mb/utils/routerUtils';

Vue.use(VueRouter);

const routes = [
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  {
    path: '/b',
    redirect: '/b/index',
  },
  {
    path: '/b/index', //현황판
    component: routerUtils.importComponentFile('IndexView'),
  },
  {
    path: '/b/main', //메인
    component: routerUtils.importComponentFile('MainView'),
  },
  {
    path: '/b/modal', //모달
    component: routerUtils.importComponentFile('ModalView'),
  },
  {
    path: '/b/login', //로그인
    component: routerUtils.importComponentFile('LoginView'),
  },
  {
    path: '/b/consent', //접근권한동의
    component: routerUtils.importComponentFile('ConsentAccessView'),
  },
  {
    path: '/b/alarm', //알람
    component: routerUtils.importComponentFile('AlarmView'),
  },
  {
    path: '/b/idpw', //아이디,비번찾기
    component: routerUtils.importComponentFile('IdpwSearchView'),
  },
  {
    path: '/b/quote-r', //견적요청
    component: routerUtils.importComponentFile('QuoteRequestView'),
  },
  {
    path: '/b/quote-m', //견적관리
    component: routerUtils.importComponentFile('QuoteManageView'),
  },
  {
    path: '/b/quote-s', //견적서 검색
    component: routerUtils.importComponentFile('QuoteSearchView'),
  },
  {
    path: '/b/quote-d', //견적상세
    component: routerUtils.importComponentFile('QuoteDetailView'),
  },
  {
    path: '/b/booking-m', //부킹관리
    component: routerUtils.importComponentFile('BookingManageView'),
  },
  {
    path: '/b/delivery-s', //배송지 선택
    component: routerUtils.importComponentFile('DeliverySelectView'),
  },
  {
    path: '/b/delivery-a', //배송지
    component: routerUtils.importComponentFile('DeliveryAddressView'),
  },
  {
    path: '/b/delivery-m', //배송현황
    component: routerUtils.importComponentFile('DeliveryManageView'),
  },
  {
    path: '/b/delivery-r', //배송요청
    component: routerUtils.importComponentFile('DeliveryRequestView'),
  },
  {
    path: '/b/product-s', //상품검색
    component: routerUtils.importComponentFile('ProductSearchView'),
  },
  {
    path: '/b/sample-d', //샘플상세
    component: routerUtils.importComponentFile('SampleDetailView'),
  },
  {
    path: '/b/sample-m', //샘플관리
    component: routerUtils.importComponentFile('SampleManageView'),
  },
  {
    path: '/b/sample-r', //샘플요청
    component: routerUtils.importComponentFile('SampleRequestView'),
  },
  {
    path: '/b/customer-s', //고객사검색
    component: routerUtils.importComponentFile('CustomerSearchView'),
  },
  {
    path: '/b/costcenter-s', //코스트센터검색
    component: routerUtils.importComponentFile('CostcenterSearchView'),
  },
  {
    path: '/b/endcomplete', //완료처리
    component: routerUtils.importComponentFile('EndCompleteView'),
  },
  {
    path: '/b/salesopinion', //영업의견
    component: routerUtils.importComponentFile('SalesOpinionView'),
  },
  {
    path: '/b/driver-v', //배송기사 /배송현황
    component: routerUtils.importComponentFile('driver/DriverView'),
  },
  {
    path: '/b/delivery-sa', //배송기사 /배송현황
    component: routerUtils.importComponentFile('DeliveryStatusView'),
  },
  {
    path: '/b/dashboard', //대시보드
    component: routerUtils.importComponentFile('DashBoardView'),
  },
  {
    path: '/b/memberinfoset01', //회원정보설정 로그인
    component: routerUtils.importComponentFile('MemberInfoSet01View'),
  },
  {
    path: '/b/memberinfoset02', //회원정보설정 - 고객사
    component: routerUtils.importComponentFile('MemberInfoSet02View'),
  },
  {
    path: '/b/memberinfoset03', //회원정보설정 - 운송사
    component: routerUtils.importComponentFile('MemberInfoSet03View'),
  },
  {
    path: '/b/memberlist', //직원목록
    component: routerUtils.importComponentFile('MemberListView'),
  },
  {
    path: '/b/deliverylist', //배송지목록
    component: routerUtils.importComponentFile('DeliveryListView'),
  },
  {
    path: '/b/setting', //알람설정
    component: routerUtils.importComponentFile('SettingView'),
  },
  {
    path: '/b/privacy', //개인정보취급방침
    component: routerUtils.importComponentFile('PrivacyView'),
  },
  {
    path: '/b/terms', //이용약관
    component: routerUtils.importComponentFile('TermsOfServiceView'),
  },
  {
    path: '/b/notice', //공지사항
    component: routerUtils.importComponentFile('NoticeView'),
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
