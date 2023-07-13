const state = {
  menuList: [],
};

const getters = {
  getMenuListAll(state) {
    return state.menuList;
  },
  getMenuId(state, routerPath) {
    let menuId = 0;
    state.menuList.forEach(list => {
      if (list.routerPath === routerPath) {
        menuId = list.menuId;
      }
    });
    return menuId;
  },
};

const mutations = {
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
