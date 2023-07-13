import Vue from 'vue';
import VueRouter from 'vue-router';
import routerUtils from '@/utils/routerUtils';
import { loadLanguageAsync } from '@/plugins/i18n';
import store from '@/store';
import defs from '@/consts/defs';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    component: routerUtils.importComponentFile('404View'),
  },
  {
    path: '/',
    redirect: '/signin',
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
    components: routerUtils.importComponentsFile('MainView'),
  },
  {
    path: '/signup',
    query: ['userCd', 'trnYn'],
    name: 'Signup',
    // aplyUserCd를 파라미터로 받아 회원가입 대상자의 소속 및 정보 조회하기 위함.
    component: routerUtils.importComponentFile('SignupView'),
  },
  {
    path: '/report',
    name: 'report',
    // aplyUserCd를 파라미터로 받아 회원가입 대상자의 소속 및 정보 조회하기 위함.
    component: routerUtils.importComponentFile('popup/ReportPopup'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path.includes('shortUrl')) {
    let shortUrl = to.path.split('/');
    store.commit('userInfo/setShortUrl', shortUrl[2]);
    if (store.getters['userInfo/getRefreshToken'] !== 'undefined' && store.getters['userInfo/getRefreshToken']) {
      next('/main');
    } else {
      next('/signin');
    }
  } else if (defs.v2RouterPath.includes(to.path)) {
    //현재 이동하는 경로가, 토큰 없이 다국어를 불러와야할 경로 목록에 포함되는 경우
    if (store.getters['userInfo/getRefreshToken'] !== 'undefined' && store.getters['userInfo/getRefreshToken']) {
      next('/main');
    } else {
      loadLanguageAsync(to.path).then(() => next());
    }
  } else {
    if (store.getters['userInfo/getRefreshToken'] !== 'undefined' && store.getters['userInfo/getRefreshToken']) {
      next();
    } else {
      next('/signin');
    }
  }
  return false;
});

export default router;
