import Vue from 'vue';
import VueRouter from 'vue-router';
import routerUtils from '@m/utils/routerUtils';
import { loadLanguageAsync } from '@m/plugins/i18n';
import store from '@/store';
import defs from '@/consts/defs';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/checkView',
  },
  {
    path: '/privacy',
    component: routerUtils.importComponentFile('PrivacyComponent'),
  },
  {
    path: '/checkView',
    component: routerUtils.importComponentFile('CheckView'),
  },
  {
    path: '/consentAccess',
    component: routerUtils.importComponentFile('ConsentAccess'),
  },
  {
    path: '/signin',
    component: routerUtils.importComponentFile('LoginView'),
  },
  {
    path: '/id-search',
    component: routerUtils.importComponentFile('IdpwSearchView'),
  },
  {
    path: '/main',
    component: routerUtils.importComponentFile('MainView'),
  },
  {
    path: '/order/general', // 견적요청
    component: routerUtils.importComponentFile('order/QuoteRequest'),
  },
  {
    path: '/order/general-list', // 견적현황
    component: routerUtils.importComponentFile('order/QuoteManage'),
  },
  {
    path: '/order/general-dtls-list', // 견적 상세
    component: routerUtils.importComponentFile('order/QuoteDetail'),
  },
  {
    path: '/order/booking-list', // 부킹관리
    component: routerUtils.importComponentFile('order/BookingManage'),
  },
  {
    path: '/order/sample', // 샘플요청
    component: routerUtils.importComponentFile('order/QuoteRequest'),
  },
  {
    path: '/order/sample-list', // 샘플관리
    component: routerUtils.importComponentFile('order/QuoteManage'),
  },
  {
    path: '/order/sample-dtls-list', // 샘플 상세
    component: routerUtils.importComponentFile('order/QuoteDetail'),
  },
  {
    path: '/tran/delivery-list', // 배송현황
    component: routerUtils.importComponentFile('order/DeliveryStatus'),
  },
  {
    path: '/tran/driver', // 배송기사
    component: routerUtils.importComponentFile('driver/DriverView'),
  },
  {
    path: '/util/agree-view', // 이용약관
    component: routerUtils.importComponentFile('help/TermsOfService'),
  },
  {
    path: '/util/private', // 개인정보처리방침
    component: routerUtils.importComponentFile('help/PrivatePolicy'),
  },
  {
    path: '/util/notice', // 공지사항
    component: routerUtils.importComponentFile('help/NoticeList'),
  },
  {
    path: '/util/manual', // 매뉴얼
    component: routerUtils.importComponentFile('help/ManualList'),
  },
  {
    path: '/mypage/info', // 회원정보설정
    component: routerUtils.importComponentFile('management/MyProfile'),
  },
  {
    path: '/mypage/staffs', // 직원목록
    component: routerUtils.importComponentFile('management/MyStaffList'),
  },
  {
    path: '/mypage/delivery', // 배송지목록
    component: routerUtils.importComponentFile('management/DeliveryList'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/checkView' || to.path === '/privacy') {
    next();
  } else if (defs.v2RouterPath.includes(to.path)) {
    //현재 이동하는 경로가, 토큰 없이 다국어를 불러와야할 경로 목록에 포함되는 경우
    if (store.getters['userInfo/getRefreshToken'] !== 'undefined' && store.getters['userInfo/getRefreshToken']) {
      if (store.getters['userInfo/getUserMenuGrpCd'] === 'CAR_DRIVER') {
        next('/tran/driver?menuId=343');
      } else {
        next('/main?menuId=343');
      }
    } else {
      loadLanguageAsync(to.path, to.query.menuId).then(() => next());
    }
  } else {
    if (store.getters['userInfo/getRefreshToken'] !== 'undefined' && store.getters['userInfo/getRefreshToken']) {
      if (to.path.includes('/main')) {
        loadLanguageAsync(to.path, 343).then(() => next());
      } else {
        loadLanguageAsync(to.path, to.query.menuId).then(() => next());
      }
    }
  }
  return false;
});

export default router;
