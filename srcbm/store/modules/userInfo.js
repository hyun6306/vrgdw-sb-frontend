const state = {
  authorization: '',
  token: '',
  notLogin: false,
  userInfo: [],
  menuList: [],
};

const getters = {
  getAuthorization(state) {
    return state.authorization;
  },
  getRefreshToken(state) {
    return state.token;
  },
  getNotLogin(state) {
    return state.notLogin;
  },
  getUserInfo(state) {
    return state.userInfo;
  },
  getMenuList(state) {
    return state.menuList;
  },
};

const mutations = {
  setAuthorization(state, auth) {
    state.authorization = auth;
  },
  setRefreshToken(state, token) {
    state.token = token;
  },
  setNotLogin(state, login) {
    state.notLogin = login;
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setMenuList(state, menuList) {
    state.menuList = menuList;
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
