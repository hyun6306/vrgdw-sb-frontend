import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import userInfo from '@wb/store/modules/userInfo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userInfo,
  },

  plugins: [
    createPersistedState({
      paths: ['userInfo'],
    }),
  ],
});
