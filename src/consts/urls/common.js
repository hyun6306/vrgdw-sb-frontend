const FILE = {
  UPLOAD: '/v1/upload',
  DOWNLOAD: '/v1/download?savePath=${savePath}&fileNm=${fileNm}',
};

const COMMON = {
  REFRESH: '/v2/refresh',
  MENU_LIST: '/v1/common/userMenu',
  ROUTER_LANGUAGE: '/v1/common/router?routerPath=${routerPath}&menuId=${menuId}&gridYn=${gridYn}',
  GET_COMMON_CODE: '/v1/common/combo?groupCd=${groupCd}&useYn=${useYn}&prntCd=${prntCd}',
  FILE,
  GET_FAVORITES_LIST: '/v1/common/favorites',
  PUT_FAVORITES_SAVE: '/v1/common/favorites',
  GET_USERINFO: '/v1/common/sideMenu',
  SET_CHANGE_LANGUAGE: '/v1/common/changeLanguage',
  GET_ADDRINFO: '/v1/offer/trnInfo?offrId=${offrId}',
  PUT_SAVE_UI: '/v1/common/uiStore',
  GET_PLANT_COMBO: '/delivery/plantCombo',
  GET_TRAN_LSIT: '/system/transcus/list',
  GET_STAFF_COMBO: '/vrgdw/staffCombo?degreeCd=D01',
  GET_SHORT_URL: '/v2/shortUrl/${shortUrl}',

  GET_CUST_LIST: '/master/customer?custCls=${custCls}&custType=${custType}&operClsCd=${operClsCd}&filter=${filter}&custId=${custId}&useYn=${useYn}',
  GET_CARRIERS_LIST: '/master/transcus?trncusId=${trncusId}&trncusNm=${trncusNm}',
  GET_GREENNET_LIST: '/master/greennet?filter=${filter}&compCd=${compCd}&deptCd=${deptCd}',
};
export { COMMON };
