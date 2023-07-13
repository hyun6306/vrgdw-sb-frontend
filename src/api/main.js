import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';
function getCustomerCnt() {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MAIN.CUSTOMER_CNT);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getCustomerBooking(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MAIN.CUSTOMER_BOOKING, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getCustomerDelivery() {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MAIN.CUSTOMER_DELIVERY);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getVrgdwCnt() {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MAIN.VRGDW_CNT);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getVrgdwBooking() {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MAIN.VRGDW_BOOKING);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getVrgdwDelivery() {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MAIN.VRGDW_DELIVERY);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getTranscusCnt(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MAIN.TRANSCUS_CNT, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getTranCnt() {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MAIN.TRAN_CNT);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getPushList() {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MAIN.PUSH_LIST);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}
export default {
  getCustomerCnt,
  getCustomerBooking,
  getCustomerDelivery,
  getVrgdwCnt,
  getVrgdwBooking,
  getVrgdwDelivery,
  getTranscusCnt,
  getTranCnt,
  getPushList,
};
