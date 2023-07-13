const DEPOSIT_MANAGE = {
  //예탁출고요청관리
  GET_DEPOSIT_MANAGE_LIST: '/delivery/exptRequstList?upPlntCd=${upPlntCd}&sttDt=${sttDt}&endDt=${endDt}&reqStatCd=${reqStatCd}',
  //예탁출고요청 저장
  PUT_EXPT_CONFIRM: '/delivery/exptConfirm',
  //예탁출고요청취소 저장
  PUT_EXPT_REQUEST_CANCEL: '/delivery/exptRequstCancel',
};

const CAR_MANAGE = {
  //차량관리 목록
  GET_CAR_MANAGE_LIST: '/v1/carDriver/carDriverList?trncusId=${trncusId}&tranCarNum=${tranCarNum}&useYn=${useYn}',
  //차량관리 저장
  PUT_CAR_MANAGE_SAVE: '/v1/carDriver',
  //차량관리 삭제 저장
  PUT_CAR_MANG_DELETE: '/v1/carDriver/delete',
  //차량유형 목록
  GET_CAR_TYPE_LIST: '/v1/carDriver/carTypeList',
  //운송사 목록
  GET_TRAN_LIST: '/delivery/trancus',
};

const PO_FORWARDING_REQ = {
  GET_POREQUEST_LIST: '/delivery/poRequstList?sttDt=${sttDt}&endDt=${endDt}&upPlntCd=${upPlntCd}',
  // GET_REQUEST_LIST: '/delivery/requstList?outStatCd=${outStatCd}&upPlntCd=${upPlntCd}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}&trnCarType=${trnCarType}&trnClsCd=${trnClsCd}&custCd=${custCd}&offrClsCd=${offrClsCd}&filter=${filter}',
  // GET_POREQUEST_LIST: '/delivery/poRequstList?upPlntCd=${upPlntCd}&sttDt=${sttDt}&endDt=${endDt}',
  SAVE_POREQUEST: '/delivery/poConfirm',
  SAVE_POREQUEST_BATCH: '/delivery/poLogits',
  GET_PLANTADDR_INQUIRY: '/delivery/plantAddr?plntCd=${plntCd}',
};

const TRANCOST_MANAGE = {
  //운송사별 운송비 목록
  GET_TRANCOMP_COST_LIST: '/deliveryPlan/trncus/trnPriceList?trncusId=${trncusId}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}&compCd=${compCd}',
  //일별 운송비 목록
  GET_TRANDAILY_COST_LIST: '/deliveryPlan/trncus/day/trnPriceList?trncusCd=${trncusCd}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}',
  //일별 배차내역 목록
  GET_TRANDISPT_COST_LIST: '/deliveryPlan/trncus/day/trnCarList?trncusCd=${trncusCd}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}',
  //배차계획별 출고상세 목록
  GET_TRANDISPT_DETAIL_LIST: '/delivery/requst/planDtlsList?trnPlnNum=${trnPlnNum}',
  //운송비 조정 저장
  PUT_TRANCOST_SAVE: '/deliveryPlan/trncus/etcTrnPrice',
  //운송비 마감 저장
  PUT_TRANCOST_CLOSE: '/deliveryPlan/trncus/trnPrice/close',
  //운송비 마감취소 저장
  PUT_TRANCOST_CANCEL: '/deliveryPlan/trncus/trnPrice/cancel',
};

//배송현황
const DELIVERY_STATUS = {
  GET_DELIVERY_STATUS_LIST: '/v1/deliveryRequst/trnStatList?custId=${custId}&offrCls=${offrCls}&prdtClsCd=${prdtClsCd}&trnCarType=${trnCarType}&prdtCd=${prdtCd}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}&filter=${filter}&salesUsers=${salesUsers}&outStatCd=${outStatCd}&trnStatCd=${trnStatCd}',
  GET_DELIVERY_REQUEST_LIST: '/v1/deliveryRequst/trnNumList?trnNum=${trnNum}',
};

const TRANCOST_LIST = {
  // 운송비조회 목록
  GET_TRANCOST_LIST: '/deliveryPlan/trnPriceList?trncusId=${trncusId}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}',
};

const FORWARDING_REQ = {
  // 출고요청 목록
  GET_REQUEST_LIST: '/delivery/requstList?outStatCd=${outStatCd}&upPlntCd=${upPlntCd}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}&trnCarType=${trnCarType}&trnClsCd=${trnClsCd}&custCd=${custCd}&filter=${filter}&ids=${ids}',
  // 운송사 운임 누적 목록
  GET_TRAN_CUST_SUMMARY: '/delivery/transcus/summary?compCd=${compCd}',
  // 운송사 기본 운임 조회
  GET_AREA_PRICE: '/delivery/transcus/areaPrice?cityCd=${cityCd}&distrCd=${distrCd}&carType=${carType}',
  // 배차계획별 출고 상세 목록
  GET_DISPATCH_PLAN_DETAIL_LIST: '/delivery/requst/planDtlsList?trnPlnNum=${trnPlnNum}',
  // 배차 요청 저장
  SAVE_DISPATCH_REQ: '/delivery/requst/planRequst',
  // 운송사 선택 저장
  SAVE_TRAN_CUST_SET: '/delivery/requst/transcus',
  // 출고수량분할 저장
  SAVE_QTY_SPLIT: '/delivery/requst/split',
  // 출고요청저장
  SAVE_FORWARDING_REQ: '/delivery/requst',
  // 출고요청취소 저장
  SAVE_FORWARDING_REQ_CANCEL: '/delivery/requst/cancel',
  // 기타출고 업로드 저장
  UPLOAD_ETC_FORWARDING: '/delivery/etcRequst/upload',
  // 기타출고요청 저장
  SAVE_ETC_FORWARDING_REQ: '/delivery/etcRequst',
  // 운송사 저장
  UPDATE_TRAN_CUST: '/delivery/requst/transcus/update',
  // 운송사 취소
  CANCEL_TRAN_CUST: '/delivery/requst/transcus/cancel',
  // 고객차량 배차계획번호 저장
  SAVE_CUST_CAR: '/delivery/requst/transcus/customer',
  // 고객차량 배차계획번호 취소
  CANCEL_CUST_CAR: '/delivery/requst/transcus/customer/cancel',
};

const MONTH_CLOSE = {
  // 운송비월마감조회 목록
  GET_MONTH_CLOSE_LIST: '/deliveryPlan/trnPriceCloseList?compCd=${compCd}&closeMonth=${closeMonth}&filter=${filter}',
};

const FORWARD_STAUTS = {
  // 출고상태조회 목록
  GET_FORWARD_STATUS: '/delivery/requstStatList?plntCd=${plntCd}&outStatCd=${outStatCd}&trncusId=${trncusId}&trnCarType=${trnCarType}&offrCls=${offrCls}&trnPlnNum=${trnPlnNum}&offrNum=${offrNum}&trnNum=${trnNum}&custCd=${custCd}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}',
  GET_PLANT_COMBO: '/delivery/plantCombo',
};
const CAR_INOUT = {
  // 차량입출차 목록
  GET_CAR_INOUT: '/deliveryPlan/inout/list?trncusIds=${trncusIds}&trnCarNum=${trnCarNum}&trnPlnNum=${trnPlnNum}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}&inYn=${inYn}&outYn=${outYn}',
  PUT_CAR_IN_SAVE: '/deliveryPlan/inout/in',
  PUT_CAR_OUT_SAVE: '/deliveryPlan/inout/out',
};

const DIPATCH = {
  GET_DIPATCH_REQ_LIST: '/deliveryPlan/requst/list?trncusId=${trncusId}&outStatCd=${outStatCd}&trnCarType=${trnCarType}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}&compCd=${compCd}&trnPlnNum=${trnPlnNum}', // 배차요청목록
  CANCEL_END_DIPATCH: '/deliveryPlan/requst/cancel', // 배차완료 취소
  SAVE_DIPATCH_REQ: '/deliveryPlan/requst/save', // 배차요청 저장
  SAVE_DIPATCH_END: '/deliveryPlan/complete', // 배차완료 저장
  GET_DIPATCH_CONFRIM__LIST: '/deliveryPlan/confirm/list?upPlntCd=${upPlntCd}&trncusId=${trncusId}&outStatCd=${outStatCd}&trnCarType=${trnCarType}&offrClsCd=${offrClsCd}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}&filter=${filter}', // 배차확정목록
  SAVE_DIPATCH_CONFRIM_CANCEL: '/deliveryPlan/confirm/cancel', //배차확정 취소
  SAVE_DIPATCH_CONFIRM: '/deliveryPlan/confirm/save', // 배차확정
  SAVE_DIPATCH_CONFIRM_AFTER: '/deliveryPlan/confirm', // 배차확정 처리
  SAVE_INVOICE_NUM: '/deliveryPlan/invoice/save', // Invoice 번호 저장
};

const TAKE_OVER = {
  GET_TAKE_OVER_LIST: '/deliveryPlan/takeOver/list?trncusId=${trncusId}&trnCarNum=${trnCarNum}&trnPlnNum=${trnPlnNum}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}&outStatCd=${outStatCd}',
  SAVE_TAKE_OVER_CONFRIM: '/deliveryPlan/takeOver/Confirm',
  PRINT_DELIVERY_NOTE: '/deliveryPlan/takeOver/print?trnPlnNum=${trnPlnNum}&langList=${langList}',
};

const TRAN = {
  DEPOSIT_MANAGE,
  CAR_MANAGE,
  PO_FORWARDING_REQ,
  TRANCOST_MANAGE,
  DELIVERY_STATUS,
  TRANCOST_LIST,
  FORWARDING_REQ,
  MONTH_CLOSE,
  FORWARD_STAUTS,
  CAR_INOUT,
  DIPATCH,
  TAKE_OVER,
};

export { TRAN };
