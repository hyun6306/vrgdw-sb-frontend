import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getMenuList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.MENU.GET_MENU_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getMenuDetail(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.MENU.GET_MENU_DETAIL, param);
  return axios.get(httpUrl);
  //.then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getMenuButtonAuth(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.MENU.GET_MENU_BTN_AUTH, param);
  return axios.get(httpUrl);
  //.then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setMenu(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.MENU.SET_MENU, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setMenuDetail(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.MENU.SET_MENU_DETAIL, param);
  return axios.put(httpUrl, param).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setMenuBtnAuth(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.MENU.SET_MENU_BTN_AUTH, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getRouterPathList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.ROUTER.GET_ROUTER_URL_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setRouterPath(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.ROUTER.SET_ROUTER_URL, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getCommonCodeList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.COMMON.GET_COMMON_CODE_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setCommonCodeList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.COMMON.SET_COMMON_CODE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function removeCommonCodeList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.COMMON.REMOVE_COMMON_CODE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getLanguageLangList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.GET_LANGUAGE, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setLanguageLang(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.SET_LANGUAGE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function removeLanguageLang(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.REMOVE_LANGUAGE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setApi(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.SET_API, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getApi(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.API.GET_API, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setMemo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.API.SET_MEMO, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function removeMemo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.API.REMOVE_MEMO, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getRouterUrlLanguageList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.GET_ROUTER_URL_LANGUAGE_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getListOfRouterUrlSetLang(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.GET_LIST_OF_ROUTER_URL_SET_LANG, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getLangFind(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.GET_LANG_FIND, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessfulResult(response));
}

function setRouterUrlLanguage(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.SET_ROUTER_URL_LANGUAGE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function removeRouterUrlLanguage(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.REMOVE_ROUTER_URL_LANGUAGE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getApiLog(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LOG.GET_API_LOG, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getMenuLog(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LOG.GET_MENU_LOG, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getInterfaceLog(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LOG.GET_INTERFACE_LOG, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getPrivacyList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.PRIVACY.GET_PRIVACY_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getPrivacyDetail(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.PRIVACY.GET_PRIVACY_DETAIL, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putPrivacySave(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.PRIVACY.PUT_PRIVACY_SVAE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putPrivacyRemoce(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.PRIVACY.PUT_PRIVACY_REMOVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getLoginLog(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LOG.GET_LOGIN_LOG, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getSendLog(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LOG.GET_SEND_LOG, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getDeptTree(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.API.GET_DEPT_TREE, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getHRInfoTree(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.API.GET_HR_INFO_TREE, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getCodeGroupList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.COMMON.GET_CODE_GROUP_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function setCodeGroupList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.COMMON.SET_CODE_GROUP_LIST, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getScheduleLog(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LOG.GET_SCHEDULE_LOG, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

export default {
  getMenuList,
  getMenuDetail,
  getMenuButtonAuth,
  setMenu,
  setMenuDetail,
  setMenuBtnAuth,
  getRouterPathList,
  setRouterPath,
  getCommonCodeList,
  setCommonCodeList,
  removeCommonCodeList,
  getLanguageLangList,
  setLanguageLang,
  removeLanguageLang,
  setApi,
  getApi,
  setMemo,
  removeMemo,
  getRouterUrlLanguageList,
  getListOfRouterUrlSetLang,
  setRouterUrlLanguage,
  removeRouterUrlLanguage,
  getLangFind,
  getApiLog,
  getMenuLog,
  getInterfaceLog,
  getPrivacyList,
  getPrivacyDetail,
  putPrivacySave,
  putPrivacyRemoce,
  getLoginLog,
  getSendLog,
  getDeptTree,
  getHRInfoTree,
  getCodeGroupList,
  setCodeGroupList,
  getScheduleLog,
};
