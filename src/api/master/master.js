import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

//플랜트 관리
function getPlantList(param) {
  //플랜트관리 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PLANT_MANAGE.GET_PLANT_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putPlantSave(param) {
  //플랜트관리 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.PLANT_MANAGE.PUT_PLANT_SAVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putPlantRemove(param) {
  //플랜트관리 삭제
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.PLANT_MANAGE.PUT_PLANT_REMOVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getDeptCombo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.COMBO.GET_DEPT_COMBO, param);
  return axios.get(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//공휴일관리
function getHolidayList(param) {
  //공휴일 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.CALENDAR.GET_HOLIDAY_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putHolidaySave(param) {
  //공휴일 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.CALENDAR.PUT_HOLIDAY_SAVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putHolidayRemove(param) {
  //공휴일 삭제
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.CALENDAR.PUT_HOLIDAY_REMOVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//출고제한일관리
function getTtrnBlockList(param) {
  //제안일 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.CALENDAR.GET_TRNBLOCK_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putTtrnBlockSave(param) {
  //제안일 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.CALENDAR.PUT_TRNBLOCK_SAVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putTtrnBlockRemove(param) {
  //제안일 삭제
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.CALENDAR.PUT_TRNBLOCK_REMOVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//권역관리
function getCommonCodeListAreaLv1(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.COMMON.GET_COMMON_CODE_LIST_AREA1, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getCommonCodeListAreaLv2(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.COMMON.GET_COMMON_CODE_LIST_AREA2, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putCommonCodeListAreaSave(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.COMMON.PUT_COMMON_CODE_LIST_AREA_SAVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putCommonCodeListAreaRemove(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.COMMON.PUT_COMMON_CODE_LIST_AREA_REMOVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//운송권역관리
function getAreaPriceList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.TRAN_AREA_MNG.GET_AREA_PRICE_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getAreaPriceListDetail(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.TRAN_AREA_MNG.GET_AREA_PRICE_LIST_DETAIL, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putAreaPriceSave(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.TRAN_AREA_MNG.PUT_AREA_PRICE_SAVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function postAreaPriceExcelUpload(file) {
  const { httpUrl, params, headers } = responseUtil.setHttpUrlReplace(urls.MASTER.TRAN_AREA_MNG.POST_AREA_PRICE_EXCEL_UPLOAD, file, 'formData');
  return axios.post(httpUrl, params, headers).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getAreaPriceExcelTemplateDownload(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.TRAN_AREA_MNG.GET_AREA_PRICE_EXCEL_TEMPLATE_DOWNLOAD, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//제품관리
function getProductList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_MNG.GET_PRODUCT_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getProductDetail(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_MNG.GET_PRODUCT_DETAIL, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getProductLevel(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_MNG.GET_PRODUCT_LEVEL, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getProductVolCal(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_MNG.GET_PRODUCT_VOL_CAL, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putProductDetail(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_MNG.PUT_PRODUCT_DETAIL, param);
  return axios.put(httpUrl, param).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getProductExcel(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_MNG.PRODUCT_EXCEL, param);
  return axios.get(httpUrl, { responseType: 'blob', responseFileNm: param.fileNm });
}

//제품계층구조관리
function getProductLevelList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_LEVEL.GET_PRODUCT_LEVEL, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function saveProductLevel(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_LEVEL.SAVE_PRODUCT_LEVEL, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//품목군별 영업사원 관리
function getProductCategoryList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CATEGORY.GET_PRODUCT_CATEGORY, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function salesSearch(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CATEGORY.GET_SALES_SEARCH, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function salesSupporterSearch(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CATEGORY.GET_SALES_SUPPORTER_SEARCH, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function salesTeamSearch(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CATEGORY.GET_SALES_TEAM_SEARCH, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function salesCustomerSearch(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CATEGORY.GET_SALES_CUSTOMER_SEARCH, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function saveProductCategoryList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CATEGORY.SAVE_SALES_CATEGORY, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function saveCategoryBatch(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CATEGORY.SAVE_SALES_BATCH, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function saveCategoryRemove(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CATEGORY.SAVE_SALES_REMOVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//주문제어품목관리
function getProductControlList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CONTROL.GET_PRODUCT_CONTROL, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function saveProductControlList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CONTROL.SAVE_PRODUCT_CONTROL, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//표준배송납기관리
function getTranStandardList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.STANDARD.GET_STANDARD_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function saveTranStandardList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.STANDARD.PUT_STANDARD_SAVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getStandardExcelDownload(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.STANDARD.GET_STANDARD_EXCEL, param);
  return axios.get(httpUrl, { responseType: 'blob', responseFileNm: param.fileNm });
}
function postStandardExcelUpload(file) {
  const { httpUrl, params, headers } = responseUtil.setHttpUrlReplace(urls.MASTER.STANDARD.POST_STANDARD_EXCEL_UPLOAD, file, 'formData');
  return axios.post(httpUrl, params, headers).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

//파트너 목록
function putAccAplyInfo(param) {
  //계정신청
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.PARTNER.PUT_APLY_INFO, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getErpInfo(param) {
  //erp정보조회
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PARTNER.GET_ERP_INFO, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getCustMngList(param) {
  //고객사관리 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PARTNER.GET_CUST_MANAGE_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getCustMngDtls(param) {
  //고객사관리 상세
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PARTNER.GET_CUST_MANAGE_DETAIL, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putCustMngSave(param) {
  //고객사관리 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.PARTNER.PUT_CUST_MANAGE_SAVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getCustMangListAll(param) {
  //고객사관리 전체
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PARTNER.GET_CUST_MANAGE_LIST_ALL, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getTranMngList(param) {
  //운송사관리 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PARTNER.GET_TRAN_MANAGE_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getTranMngDtls(param) {
  //운송사관리 목록 상세
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PARTNER.GET_TRAN_MANAGE_DETAIL, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putTranMngSave(param) {
  //운송사관리 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.PARTNER.PUT_TRAN_MANAGE_SAVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//사용자관리
function getUserList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.USER_MANAGE.GET_USER_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putUserSave(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.USER_MANAGE.PUT_USER_SAVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getReqUserInfo(param) {
  //AD사용신청 조회
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.USER_MANAGE.GET_REQ_USER_INFO, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function getReqUserList(param) {
  //AD사용신청 목록
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.USER_MANAGE.GET_REQ_USER_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getOtherLogin(param) {
  //다른 사용자 로그인
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.USER_MANAGE.GET_OTHER_LOGIN, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//특성항목관리
function getProductChartList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CHART.GET_CHART_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function saveProductChartList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CHART.PUT_CHART_SAVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function saveProductChartRemove(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.PRODUCT_CHART.PUT_CHART_REMOVE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

//주문월관리
function getOrderMonthMngList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MASTER.ORDER_MONTH.GET_ORDER_MONTH_MANAGEMENT_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
function putOrderMonthMngList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MASTER.ORDER_MONTH.PUT_ORDER_MONTH_MANAGEMENT_LIST, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

export default {
  getPlantList,
  putPlantSave,
  putPlantRemove,
  getDeptCombo,
  getHolidayList,
  putHolidaySave,
  putHolidayRemove,
  getTtrnBlockList,
  putTtrnBlockSave,
  putTtrnBlockRemove,
  getCommonCodeListAreaLv1,
  getCommonCodeListAreaLv2,
  putCommonCodeListAreaSave,
  putCommonCodeListAreaRemove,
  getAreaPriceList,
  getAreaPriceListDetail,
  putAreaPriceSave,
  postAreaPriceExcelUpload,
  getAreaPriceExcelTemplateDownload,
  getProductList,
  getProductDetail,
  getProductLevel,
  getProductVolCal,
  putProductDetail,
  getProductLevelList,
  saveProductLevel,
  getProductCategoryList,
  salesSearch,
  salesSupporterSearch,
  salesTeamSearch,
  salesCustomerSearch,
  saveProductCategoryList,
  saveCategoryBatch,
  saveCategoryRemove,
  getProductControlList,
  saveProductControlList,
  putAccAplyInfo,
  getErpInfo,
  getCustMngList,
  getCustMngDtls,
  putCustMngSave,
  getCustMangListAll,
  getTranMngList,
  getTranMngDtls,
  putTranMngSave,
  getTranStandardList,
  saveTranStandardList,
  postStandardExcelUpload,
  getStandardExcelDownload,
  getProductChartList,
  saveProductChartList,
  saveProductChartRemove,
  getUserList,
  putUserSave,
  getReqUserList,
  getReqUserInfo,
  getOtherLogin,
  getOrderMonthMngList,
  putOrderMonthMngList,
  getProductExcel,
};
