const state = {
  authorization: '',
  token: '',
};

const getters = {
  getAuthorization(state) {
    return state.authorization;
  },
  getRefreshToken(state) {
    return state.token;
  },
};

const mutations = {
  setAuthorization(state, auth) {
    state.authorization = auth;
  },
  setRefreshToken(state, token) {
    state.token = token;
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
