import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import userInfo from '@/store/modules/userInfo';
import menuList from '@/store/modules/menuList';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    isNetworkError: false,
    timer: null,
  },
  mutations: {
    loading(state, isLoading) {
      if (isLoading) {
        state.isLoading = isLoading;
        clearTimeout(state.timer);
      } else {
        state.timer = setTimeout(() => {
          state.isLoading = isLoading;
        }, 300);
      }
    },
    networkError(state, isError) {
      state.isNetworkError = isError;
    },
  },
  modules: {
    userInfo,
    menuList,
  },

  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      key: 'vrgdwInfo',
      paths: ['userInfo', 'menuList'],
    }),
  ],
});
