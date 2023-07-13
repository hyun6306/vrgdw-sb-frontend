const LANGUAGE = {
  GET_LANGUAGE: '/system/language?filter=${filter}&searchLangCls=${searchLangCls}&formKey=${formKey}',
  SET_LANGUAGE: '/system/language',
  REMOVE_LANGUAGE: '/system/language/remove',
  GET_ROUTER_URL_LANGUAGE_LIST: '/system/pageLanguage?filter=${filter}',
  GET_LIST_OF_ROUTER_URL_SET_LANG: '/system/routers/lang?routerPath=${routerPath}&langCls=${langCls}',
  SET_ROUTER_URL_LANGUAGE: '/system/pageLanguage',
  REMOVE_ROUTER_URL_LANGUAGE: '/system/pageLanguage/remove',
  GET_LANG_FIND: '/v2/language/find?filter=${filter}',
};
const ROUTER = {
  GET_ROUTER_URL_LIST: '/system/routers?filter=${filter}',
  SET_ROUTER_URL: '/system/routers',
};
const MENU = {
  GET_MENU_LIST: '/system/menu?menuGrpCd=${menuGrpCd}',
  GET_MENU_DETAIL: '/system/menu/${menuId}',
  GET_MENU_BTN_AUTH: '/system/menu/auth?menuId=${menuId}&grpAuthCd=${grpAuthCd}',
  GET_USER_MENU_LIST: '/system/menu/user?userCd=${userCd}',
  SET_MENU: '/system/menu',
  SET_MENU_DETAIL: '/system/menu/${menuId}',
  SET_MENU_BTN_AUTH: '/system/menu/auth',
};
const COMMON = {
  GET_COMMON_CODE_LIST: '/system/commonCodes?groupCd=${groupCd}&groupNm=${groupNm}&filter=${filter}&useYn=${useYn}&prntCd=${prntCd}&cdLvl=${cdLvl}',
  SET_COMMON_CODE: '/system/commonCodes',
  REMOVE_COMMON_CODE: '/system/commonCodes/remove',
  GET_CODE_GROUP_LIST: '/system/commonCodes/group',
  SET_CODE_GROUP_LIST: '/system/commonCodes/group',
};

const API = {
  SET_API: '/v1/apiMenu',
  GET_API: '/v1/apiMenu/${menuId}',
  SET_MEMO: '/v1/apiMenu/memo',
  REMOVE_MEMO: '/v1/apiMenu/memo/remove',
  GET_DEPT_TREE: '/master/dept?filter=${filter}&useYn=${useYn}',
  GET_HR_INFO_TREE: '/master/greennet?filter=${filter}&useYn=${useYn}&compCd=${compCd}',
};

const LOG = {
  GET_API_LOG: '/system/logs/api?filter=${filter}&sttDt=${sttDt}&endDt=${endDt}&pageNumber=${pageNumber}&pageSize=${pageSize}',
  GET_MENU_LOG: '/system/logs/menu?filter=${filter}&sttDt=${sttDt}&endDt=${endDt}&pageNumber=${pageNumber}&pageSize=${pageSize}',
  GET_INTERFACE_LOG: '/system/logs/delay?filter=${filter}&sttDt=${sttDt}&endDt=${endDt}&result=${result}&pageNumber=${pageNumber}&pageSize=${pageSize}',
  GET_LOGIN_LOG: '/system/logs/login?filter=${filter}&sttDt=${sttDt}&endDt=${endDt}',
  GET_SEND_LOG: '/system/logs/send?sttDt=${sttDt}&endDt=${endDt}&alarmCd=${alarmCd}&sendType=${sendType}&filter=${filter}&pageNumber=${pageNumber}&pageSize=${pageSize}',
  GET_SCHEDULE_LOG: '/system/logs/schedule?filter=${filter}&sttDt=${sttDt}&endDt=${endDt}&schCd=${schCd}&pageNumber=${pageNumber}&pageSize=${pageSize}',
};

const PRIVACY = {
  GET_PRIVACY_LIST: '/system/privacy?filter=${filter}&pageNumber=${pageNumber}&pageSize=${pageSize}&bbsId=${bbsId}',
  GET_PRIVACY_DETAIL: '/system/privacy/${id}?bbsId=${bbsId}',
  PUT_PRIVACY_SVAE: '/system/privacy',
  PUT_PRIVACY_REMOVE: '/system/privacy/remove',
};

const ADMIN = {
  LANGUAGE,
  ROUTER,
  MENU,
  COMMON,
  API,
  LOG,
  PRIVACY,
};

export { ADMIN };
