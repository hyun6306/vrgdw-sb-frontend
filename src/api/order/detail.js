import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getQuoteDetail(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.GET_QUOTE_DETAIL, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getOffrMng(param) {
  //견적관리 조회
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.GET_OFFR_MNG, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getTrnInfo(offrId) {
  //배송지 정보 조회
  let param = {
    offrId: offrId,
  };
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.GET_TRN_INFO, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putBokngConfirm(param) {
  //부킹확정
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_BOKNG_CONFIRM, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putSampleEnd(param) {
  //샘플완료 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_SAMPLE_END, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putSampleSave(param) {
  //샘플견적 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_SAMPLE_APPR, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getCostcenter(filterData) {
  //코스트센터 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.GET_COSTCENTER, filterData);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getSalesMemo(param) {
  //샘플메모 조회
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.GET_SALES_MEMO, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putApprReq(param) {
  //결재상신
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.SAVE_APPRREQ, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putSampleConfirm(param) {
  //샘플확정
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_SAMPLE_CONFIRM, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putApprNumSave(param) {
  //결재문서번호 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_APPRNUM_SAVE, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}
export default {
  getQuoteDetail,
  getOffrMng,
  getTrnInfo,
  putBokngConfirm,
  putSampleEnd,
  getCostcenter,
  putSampleSave,
  getSalesMemo,
  putApprReq,
  putSampleConfirm,
  putApprNumSave,
};
