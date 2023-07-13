const PLANT_MANAGE = {
  //목록
  GET_PLANT_LIST: '/master/plant?filter=${filter}&useYn=${useYn}',
  //저장
  PUT_PLANT_SAVE: '/master/plant',
  //삭제
  PUT_PLANT_REMOVE: '/master/plant/remove',
};

/**
 * 영업 활동
 */
const COMBO = {
  GET_DEPT_COMBO: '/master/dept/combo',
};

const CALENDAR = {
  //공휴일관리
  GET_HOLIDAY_LIST: '/system/holiday?stdYm=${stdYm}',
  PUT_HOLIDAY_SAVE: '/system/holiday',
  PUT_HOLIDAY_REMOVE: '/system/holiday/remove',
  //출고제한일관리
  GET_TRNBLOCK_LIST: '/vrgdwTran/trnBlock?stdYm=${stdYm}',
  PUT_TRNBLOCK_SAVE: '/vrgdwTran/trnBlock',
  PUT_TRNBLOCK_REMOVE: '/vrgdwTran/trnBlock/remove',
};

const COMMON = {
  //권역관리
  GET_COMMON_CODE_LIST_AREA1: '/system/commonCodes?groupCd=VNM_CITY&prntCd=${prntCd}&cdLvl=1',
  GET_COMMON_CODE_LIST_AREA2: '/system/commonCodes?groupCd=VNM_CITY&prntCd=${prntCd}&cdLvl=2',
  //대_중권역 목록 저장
  PUT_COMMON_CODE_LIST_AREA_SAVE: '/system/commonCodes',
  //대_중권역 목록 삭제
  PUT_COMMON_CODE_LIST_AREA_REMOVE: '/system/commonCodes/remove',
};

//운송권역관리
const TRAN_AREA_MNG = {
  GET_AREA_PRICE_LIST: '/vrgdwTran/price/trncusList?trncusId=${trncusId}&filter=${filter}',
  GET_AREA_PRICE_LIST_DETAIL: '/vrgdwTran/price/list?trncusId=${trncusId}',
  //운임표 상세 저장
  PUT_AREA_PRICE_SAVE: '/vrgdwTran/price',
  //운임표 엑셀 업로드
  POST_AREA_PRICE_EXCEL_UPLOAD: '/vrgdwTran/areaPrice/upload',
  //운임표 엑셀 템플릿 다운로드
  GET_AREA_PRICE_EXCEL_TEMPLATE_DOWNLOAD: '/v1/download?savePath=/upload/templete/AreaPrice-Upload.xlsx&fileNm=AreaPrice-Upload.xlsx',
};

//제품관리
const PRODUCT_MNG = {
  GET_PRODUCT_LIST: '/master/product?pageSize=${pageSize}&pageNumber=${pageNumber}&prdtClsCd=${prdtClsCd}&operClsCd=${operClsCd}&filter=${filter}',
  GET_PRODUCT_DETAIL: '/master/product/${prdtCode}',
  // GET_PRODUCT_LEVEL: '/master/productLevelCombo?useYn=Y&level=${level}&parentId=${parentId}',
  GET_PRODUCT_LEVEL: '/master/productLevel?returnType=List&useYn=Y&?&lvlCd=0',
  GET_PRODUCT_VOL_CAL: '/master/productVolCal?prdtCd=${prdtCd}&compCd=${compCd}',
  PUT_PRODUCT_DETAIL: '/master/product',
  PRODUCT_EXCEL: '/master/product/excel?prdtClsCd=${prdtClsCd}&operClsCd=${operClsCd}',
};

//제품계층구조관리
const PRODUCT_LEVEL = {
  GET_PRODUCT_LEVEL: '/master/productLevel',
  SAVE_PRODUCT_LEVEL: '/master/productLevel',
};

//품목군별영업사원관리
const PRODUCT_CATEGORY = {
  GET_PRODUCT_CATEGORY: '/vrgdw/custManager?compCd=${compCd}&erpCustCd=${erpCustCd}&erpSalesMngCd=${erpSalesMngCd}&erpSalesSuptCd=${erpSalesSuptCd}&salesOfficeCd=${salesOfficeCd}&prdtClsCd=${prdtClsCd}',
  GET_SALES_SEARCH: '/v1/user/sales?compCd=${compCd}&filter=${filter}',
  GET_SALES_SUPPORTER_SEARCH: '/v1/user/salesSupt?compCd=${compCd}&filter=${filter}',
  GET_SALES_TEAM_SEARCH: '/v1/user/salesDept?filter=${filter}',
  GET_SALES_CUSTOMER_SEARCH: '/vrgdw/customer/list?custType=${custType}&useYn=${useYn}&custId=${custId}&filter=${filter}',
  SAVE_SALES_CATEGORY: '/vrgdw/custManager',
  SAVE_SALES_BATCH: '/vrgdw/custManager/batch',
  SAVE_SALES_REMOVE: '/vrgdw/custManager/remove',
};

//주문제어품목관리
const PRODUCT_CONTROL = {
  GET_PRODUCT_CONTROL: '/master/ptdtCntr?custId=${custId}',
  SAVE_PRODUCT_CONTROL: '/master/ptdtCntr/useYn',
};

//표준배송납기관리
const STANDARD = {
  GET_STANDARD_LIST: '/master/expireDate?prdtClsCd=${prdtClsCd}&cityCd=${cityCd}&distrCd=${distrCd}&filter=${filter}',
  PUT_STANDARD_SAVE: '/master/expireDate',
  GET_STANDARD_EXCEL: '/master/expireDate/excel?prdtClsCd=${prdtClsCd}&cityCd=${cityCd}&distrCd=${distrCd}',
  POST_STANDARD_EXCEL_UPLOAD: '/master/expireDate/upload',
};

const PARTNER = {
  //계정신청
  PUT_APLY_INFO: '/sales/accAplyInfo',
  //erp정보조회
  GET_ERP_INFO: '/master/customer/${erpCd}',
  //고객관리
  GET_CUST_MANAGE_LIST: '/master/customer?custCls=${custCls}&custType=${custType}&operClsCd=${operClsCd}&filter=${filter}',
  GET_CUST_MANAGE_DETAIL: '/master/customer/detail/${id}',
  PUT_CUST_MANAGE_SAVE: '/master/customer/',
  GET_CUST_MANAGE_LIST_ALL: '/vrgdw/customer/listAllPage',
  //운송사관리
  GET_TRAN_MANAGE_LIST: '/master/transcus?trncusId=${trncusId}&operClsCd=${operClsCd}&filter=${filter}',
  GET_TRAN_MANAGE_DETAIL: '/master/transcus/detail/${id}',
  PUT_TRAN_MANAGE_SAVE: '/master/transcus/',
};

const USER_MANAGE = {
  GET_USER_LIST: '/system/users?filter=${filter}&menuGrpCd=${menuGrpCd}&roles=${roles}&degreeCd=${degreeCd}',
  PUT_USER_SAVE: '/system/users',
  GET_REQ_USER_LIST: '/master/greennet/register?filter=${filter}&compCd=${compCd}&deptCd=${deptCd}&cfmYn=${cfmYn}',
  GET_REQ_USER_INFO: '/master/greennet/register/${id}',
  GET_OTHER_LOGIN: '/system/users/login?userCd=${userCd}',
};

//특성항목관리
const PRODUCT_CHART = {
  GET_CHART_LIST: '/master/commonCodes?groupCd=${groupCd}&groupNm=${groupNm}&filter=${filter}&useYn=${useYn}&prntCd=${prntCd}&cdLvl=${cdLvl}',
  PUT_CHART_SAVE: '/master/commonCodes',
  PUT_CHART_REMOVE: '/master/commonCodes/remove',
};

//특성항목관리
const ORDER_MONTH = {
  GET_ORDER_MONTH_MANAGEMENT_LIST: '/sales/propMonth',
  PUT_ORDER_MONTH_MANAGEMENT_LIST: '/sales/propMonth',
};

const MASTER = {
  PLANT_MANAGE,
  COMBO,
  CALENDAR,
  COMMON,
  TRAN_AREA_MNG,
  PRODUCT_MNG,
  PRODUCT_LEVEL,
  PRODUCT_CATEGORY,
  PRODUCT_CONTROL,
  STANDARD,
  PARTNER,
  USER_MANAGE,
  PRODUCT_CHART,
  ORDER_MONTH,
};

export { MASTER };
