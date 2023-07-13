import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getCommonCodeCombo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_COMMON_CODE, param);
  return axios.get(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getCommonFavoritesList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_FAVORITES_LIST, param);
  return axios.get(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function setCommonFavoritesSave(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.PUT_FAVORITES_SAVE, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getCommonUserInfo() {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_USERINFO);
  return axios.get(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setCommonChangeLanguage(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.SET_CHANGE_LANGUAGE, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getAddrInfo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_ADDRINFO, param);
  return axios.get(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putSaveUi(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.PUT_SAVE_UI, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getPlantCombo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_PLANT_COMBO, param);
  return axios.get(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getTranList() {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_TRAN_LSIT);
  return axios.get(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getCredit(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.GET_BOOKING_CREDIT, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getStaffCombo(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_STAFF_COMBO, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getCustList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_CUST_LIST, param);
  return axios.get(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getCarruersList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_CARRIERS_LIST, param);
  return axios.get(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getStaffList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_GREENNET_LIST, param);
  return axios.get(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getShortUrl(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_SHORT_URL, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

export default {
  getCommonCodeCombo,
  getCommonFavoritesList,
  setCommonFavoritesSave,
  getCommonUserInfo,
  setCommonChangeLanguage,
  getAddrInfo,
  putSaveUi,
  getPlantCombo,
  getTranList,
  getCredit,
  getStaffCombo,
  getCustList,
  getCarruersList,
  getStaffList,
  getShortUrl,
};
