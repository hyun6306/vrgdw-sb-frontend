/**
 * 영업 활동
 */
const ITEM = {
  GET_ITEM_BASE_PRICE_LIST: '/salesPrice/base?sttDt=${sttDt}&endDt=${endDt}&filter=${filter}&apprYn=${apprYn}&pageNumber=${pageNumber}&pageSize=${pageSize}&prdtClsCd=${prdtClsCd}',
  GET_ITEM_BASE_PRICE_INFO: '/salesPrice/base/${prdtCd}',
  SAVE_ITEM_APPR_DOC_NUM: '/salesPrice/base/docNum',
};

const CLIENT_ITEM = {
  GET_CLIENT_ITEM_PRICE_LIST: '/salesPrice?sttDt=${sttDt}&endDt=${endDt}&filter=${filter}&custId=${custId}&apprYn=${apprYn}&pageNumber=${pageNumber}&pageSize=${pageSize}&prdtClsCd=${prdtClsCd}',
  GET_CLIENT_ITEM_PRICE_INFO: '/salesPrice/${custCd}/${prdtCd}',
  SAVE_CLIENT_ITEM_APPR_DOC_NUM: '/salesPrice/docNum',
};

const EXCEL = {
  ITEM_EXCEL_UPLOAD: '/salesPrice/baseUpload',
  CLIENT_EXCEL_UPLOAD: '/salesPrice/upload',
  CLIENT_EXCEL_DOWNLOAD: '/salesPrice/excel?custId=${custId}',
  BASE_PRICE_EXCEL_DOWNLOAD: '/salesPrice/base/excel?sttDt=${sttDt}&endDt=${endDt}',
};

const SALES = {
  ITEM,
  CLIENT_ITEM,
  EXCEL,
};

export { SALES };
