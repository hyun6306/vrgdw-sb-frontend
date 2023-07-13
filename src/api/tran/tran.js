import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

//예탁출고요청관리
function getdepFwReqManageList(param) {
  //예탁출고요청 목록 조회
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.DEPOSIT_MANAGE.GET_DEPOSIT_MANAGE_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function putdepFwReqSave(param) {
  //예탁출고요청 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.DEPOSIT_MANAGE.PUT_EXPT_CONFIRM, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function putdepFwReqCancle(param) {
  //예탁출고요청취소 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.DEPOSIT_MANAGE.PUT_EXPT_REQUEST_CANCEL, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//차량관리
function getCarManageList(param) {
  //차량관리 목록 조회
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.CAR_MANAGE.GET_CAR_MANAGE_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function putCarManageSave(param) {
  //차량관리 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.CAR_MANAGE.PUT_CAR_MANAGE_SAVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function putCarMangDelete(param) {
  //차량관리 삭제 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.CAR_MANAGE.PUT_CAR_MANG_DELETE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getCarTypeList() {
  //차량유형 목록 조회
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.CAR_MANAGE.GET_CAR_TYPE_LIST);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getTranList() {
  //운송사 목록 조회
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.CAR_MANAGE.GET_TRAN_LIST);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//PO출고요청관리
function getPoRequestList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.PO_FORWARDING_REQ.GET_POREQUEST_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function savePoConfirm(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.PO_FORWARDING_REQ.SAVE_POREQUEST, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveExptConfirm(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.PO_FORWARDING_REQ.SAVE_POREQUEST_BATCH, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getPlantInquiry(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.PO_FORWARDING_REQ.GET_PLANTADDR_INQUIRY, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//운송비관리
function getTranCompList(param) {
  //운송사별 운송비 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.TRANCOST_MANAGE.GET_TRANCOMP_COST_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getTranDailyList(param) {
  //일별 운송비 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.TRANCOST_MANAGE.GET_TRANDAILY_COST_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getTranDisptList(param) {
  //일별 배차내역 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.TRANCOST_MANAGE.GET_TRANDISPT_COST_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getTranDisptDetailList(param) {
  //배차계획별 출고상세 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.TRANCOST_MANAGE.GET_TRANDISPT_DETAIL_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function putTranCostSave(param) {
  //운송비 조정 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.TRANCOST_MANAGE.PUT_TRANCOST_SAVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function putTranCostClose(param) {
  //운송비 마감 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.TRANCOST_MANAGE.PUT_TRANCOST_CLOSE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function putTranCostCancel(param) {
  //운송비 마감취소 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.TRANCOST_MANAGE.PUT_TRANCOST_CANCEL, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getDeliveryList(param) {
  //배송현황조회
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.DELIVERY_STATUS.GET_DELIVERY_STATUS_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getDeliveryReqList(param) {
  //배송요청 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.DELIVERY_STATUS.GET_DELIVERY_REQUEST_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

// 운송비조회
function getTranCostList(param) {
  // 운송비조회 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.TRANCOST_LIST.GET_TRANCOST_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getRequestList(param) {
  // 출고요청 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.GET_REQUEST_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getTranCusSummary(param) {
  // 운송사 운임 누적 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.GET_TRAN_CUST_SUMMARY, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getAreaPrice(param) {
  // 운송사 기본운임 조회
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.GET_AREA_PRICE, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getDispatchPlanDetailList(param) {
  // 배차계획별 출고 상세 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.GET_DISPATCH_PLAN_DETAIL_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveDispatchReq(param) {
  // 배차 요청 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.SAVE_DISPATCH_REQ, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveTranCustSet(param) {
  // 운송사 선택 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.SAVE_TRAN_CUST_SET, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveQtySplit(param) {
  // 출고수량분할 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.SAVE_QTY_SPLIT, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveForwardingReq(param) {
  // 출고요청저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.SAVE_FORWARDING_REQ, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveForwardingReqCancel(param) {
  // 출고요청취소 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.SAVE_FORWARDING_REQ_CANCEL, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveEtcForwardingReq(param) {
  // 기타출고요청 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.SAVE_ETC_FORWARDING_REQ, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveForwardingEtcExcel(file) {
  // 기타출고요청 엑셀 업로드
  const { httpUrl, params, headers } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.UPLOAD_ETC_FORWARDING, file, 'formData');
  return axios.post(httpUrl, params, headers).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function saveTranCust(param) {
  // 운송사 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.UPDATE_TRAN_CUST, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function cancelTranCust(param) {
  // 운송사 취소
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.CANCEL_TRAN_CUST, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveCustCar(param) {
  // 운송사 취소
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.SAVE_CUST_CAR, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function cancelCustCar(param) {
  // 운송사 취소
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARDING_REQ.CANCEL_CUST_CAR, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

// 운송비월마감조회
function getMonthCloseList(param) {
  // 운송비월마감조회 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.MONTH_CLOSE.GET_MONTH_CLOSE_LIST, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

// 출고상태조회
function getForwardStatus(param) {
  // 출고상태조회 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARD_STAUTS.GET_FORWARD_STATUS, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getPlantCombo(param) {
  // 출고상태조회 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.FORWARD_STAUTS.GET_PLANT_COMBO, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

// 차량입출차관리
function getCarInOut(param) {
  // 차량입출차 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.CAR_INOUT.GET_CAR_INOUT, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putCarInSave(param) {
  // 차량입차저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.CAR_INOUT.PUT_CAR_IN_SAVE, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putCarOutSave(param) {
  // 차량출차저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.CAR_INOUT.PUT_CAR_OUT_SAVE, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getDipatchReqList(param) {
  // 배차요청목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.DIPATCH.GET_DIPATCH_REQ_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function cancelEndDipatch(param) {
  // 배차완료 취소
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.DIPATCH.CANCEL_END_DIPATCH, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveReqDipatch(param) {
  // 배차요청 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.DIPATCH.SAVE_DIPATCH_REQ, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveEndDipatch(param) {
  // 배차완료 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.DIPATCH.SAVE_DIPATCH_END, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getDipatchConfirmList(param) {
  // 배차확정목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.DIPATCH.GET_DIPATCH_CONFRIM__LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function cancelEndDipatchConfirm(param) {
  // 배차확정 취소
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.DIPATCH.SAVE_DIPATCH_CONFRIM_CANCEL, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveDipatchConfirm(param) {
  // 배차확정
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.DIPATCH.SAVE_DIPATCH_CONFIRM, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveDipatchAfter(param) {
  // 배차확정 처리
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.DIPATCH.SAVE_DIPATCH_CONFIRM_AFTER, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveInvoiceNum(param) {
  // Invoice 번호 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.DIPATCH.SAVE_INVOICE_NUM, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getTakeOverList(param) {
  // 인수 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.TAKE_OVER.GET_TAKE_OVER_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveTakeOverConfirm(param) {
  // 인수확정 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.TAKE_OVER.SAVE_TAKE_OVER_CONFRIM, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getDeliveryNote(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.TAKE_OVER.PRINT_DELIVERY_NOTE, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

export default {
  getdepFwReqManageList,
  putdepFwReqSave,
  putdepFwReqCancle,
  getCarManageList,
  putCarManageSave,
  putCarMangDelete,
  getPoRequestList,
  savePoConfirm,
  saveExptConfirm,
  getPlantInquiry,
  getCarTypeList,
  getTranList,
  getTranCompList,
  getTranDailyList,
  getTranDisptList,
  putTranCostSave,
  putTranCostClose,
  putTranCostCancel,
  getDeliveryList,
  getDeliveryReqList,
  getTranCostList,
  getRequestList,
  getTranCusSummary,
  getAreaPrice,
  getDispatchPlanDetailList,
  saveDispatchReq,
  saveTranCustSet,
  saveTranCust,
  cancelTranCust,
  saveQtySplit,
  saveForwardingReq,
  saveForwardingReqCancel,
  saveEtcForwardingReq,
  getMonthCloseList,
  getForwardStatus,
  getPlantCombo,
  getCarInOut,
  putCarInSave,
  putCarOutSave,
  getDipatchReqList,
  cancelEndDipatch,
  saveReqDipatch,
  saveEndDipatch,
  getDipatchConfirmList,
  cancelEndDipatchConfirm,
  saveDipatchConfirm,
  saveDipatchAfter,
  saveInvoiceNum,
  getTakeOverList,
  saveTakeOverConfirm,
  getTranDisptDetailList,
  saveForwardingEtcExcel,
  saveCustCar,
  cancelCustCar,
  getDeliveryNote,
};
