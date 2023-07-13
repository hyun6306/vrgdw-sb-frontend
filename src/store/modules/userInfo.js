const state = {
  authorization: '',
  token: '',
  userInfo: [],
  authButton: [],
  savePage: [],
  browser: '',
  shortUrl: '',
  backUpToken: {},
};

const getters = {
  getAuthorization(state) {
    return state.authorization;
  },
  getRefreshToken(state) {
    return state.token;
  },
  getUserInfo(state) {
    return state.userInfo;
  },
  getUserMenuGrpCd(state) {
    return state.userInfo.menuGrpCd;
  },
  getUserCustId(state) {
    return state.userInfo.custId;
  },
  getUserLocale(state) {
    return state.userInfo.locale;
  },
  getAuthButton(state) {
    return state.authButton;
  },
  getBrowser(state) {
    return state.browser;
  },
  getSavePage(state) {
    return state.savePage;
  },
  getLogitsRegYn(state) {
    return state.logitsRegYn;
  },
  getUserEmail(state) {
    return state.userInfo.email;
  },
  getUserNm(state) {
    return state.userInfo.userNm;
  },
  getTrncusId(state) {
    return state.userInfo.trncusId;
  },
  getShortUrl(state) {
    return state.shortUrl;
  },
  getBackUpToken(state) {
    return state.backUpToken;
  },
};

const mutations = {
  setAuthorization(state, auth) {
    state.authorization = auth;
  },
  setRefreshToken(state, token) {
    state.token = token;
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  reset(state, isUserInfo) {
    state.authorization = undefined;
    state.token = undefined;
    state.backUpToken = {};
    if (isUserInfo) state.userInfo = undefined;
  },
  setAuthButton(state, button) {
    state.authButton = button;
  },
  setSavePage(state, savePage) {
    state.savePage = savePage;
  },
  setBrowser(state) {
    const agent = navigator.userAgent.toUpperCase();
    if (agent.indexOf('TRIDENT') >= 0) {
      state.browser = 'IE';
    } else if (agent.indexOf('FIREFOX') >= 0) {
      state.browser = 'FIREFOX';
      // Chrome과 Safari, Edge는 같이 웹킷을 사용한다. 역순으로 배치.
    } else if (agent.indexOf('EDG') >= 0) {
      state.browser = 'EDGE';
    } else if (agent.indexOf('SAFARI') >= 0) {
      state.browser = 'SAFARI';
    } else if (agent.indexOf('CHROME') >= 0) {
      state.browser = 'CHROME';
    } else {
      state.browser = '';
    }
  },
  setShortUrl(state, shortUrl) {
    state.shortUrl = shortUrl;
  },
  setMenuGrpCd(state, menuGrpCd) {
    state.userInfo.menuGrpCd = menuGrpCd;
  },
  setBackUpToken(state, token) {
    state.backUpToken = {
      authorization: state.authorization,
      token: state.token,
      menuGrpCd: state.userInfo.menuGrpCd,
    };
    state.authorization = token.Authorization;
    state.token = token.Token;
    state.userInfo.menuGrpCd = token.menuGrpCd;
    if (token.menuGrpCd === 'TRANSCUS') {
      state.userInfo.trncusId = token.id;
    } else if (token.menuGrpCd === 'CUSTOMER') {
      state.userInfo.custId = token.id;
    }
  },
  setRevertToken(state) {
    state.authorization = state.backUpToken.authorization;
    state.token = state.backUpToken.token;
    state.userInfo.menuGrpCd = state.backUpToken.menuGrpCd;
    if (state.backUpToken.menuGrpCd === 'TRANCUS') {
      state.userInfo.trncusId = undefined;
    } else if (state.backUpToken.menuGrpCd === 'CUSTOMER') {
      state.userInfo.custId = 0;
    }
    state.backUpToken = {};
  },
};

const actions = {};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
