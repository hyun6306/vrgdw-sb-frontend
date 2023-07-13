/**
 * 견적 요청 관련 API Path 작성
 * 고객사 CUSTOMER
 * 영업 미정
 */
const CUSTOMER = {
  GET_USER_OFFER_INFO: '/v1/offer/customer?custId=${custId}',
  SAVE_USER_LOGITS_BASE_ADDR: '/v1/offer/baseLogits',
  DELETE_USER_LOGITS_BASE_ADDR: '/v1/offer/baseLogits/remove',
  SAVE_OFFER: '/v1/offer/save',
  SAVE_USER_OFFER_EXCEL: '/v1/offer/upload',
  GET_USER_LOGITS: '/v1/offer/logits?custId=${custId}&filter=${filter}&cityCd=${cityCd}&distrCd=${distrCd}',
  GET_OFFER_DETAIL: '/v1/offer/dtls?custId=${custId}&id=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}',
};

const DETAIL = {
  GET_QUOTE_DETAIL: '/v1/offerMng/dtls?custId=${custId}&id=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}',
  POST_QUOTE_EXCEL: '/v1/offerMng/excel',
  PUT_QUOTE_CANCEL: '/v1/offerMng/cancel', //견적취소
  PUT_IS_CANCEL: '/v1/offerMng/isCancel', //견적취소 가능여부
  PUT_RMD_CANCEL: '/v1/offerMng/rmdCancel', //남은량취소
  PUT_SAVE_UI: '/v1/common/uiStore',
  GET_OFFR_MNG: '/v1/offerMng/${id}?custId=${custId}', //견적관리 조회
  GET_TRN_INFO: '/v1/offer/trnInfo?offrId=${offrId}', //배송지 정보 조회
  GET_OFFR_MEMO: '/v1/offerMng/memo?id=${id}&memoType=${memoType}&custId=${custId}', //메모
  PUT_OFFR_CHG_SAVE: '/sales/offerChgSave', //견적단가수량 저장
  PUT_BOKNG_CONFIRM: '/sales/booking/sampleConfirm', //부킹확정
  PUT_SAMPLE_END: '/sales/sampleEnd', //샘플완료 저장
  GET_COSTCENTER: '/v1/offer/costCenter?ordErpCls=${ordErpCls}',
  GET_SALES_MEMO: '/v1/offerMng/sampleEndMemo?id=${id}&offrId=${offrId}&custId=${custId}', //샘플메모 조회
  PUT_SAMPLE_APPR: '/sales/sampleAppr', //샘플 저장
  PUT_SAMPLE_CONFIRM: '/sales/sampleConfirm', //샘플확정
  PUT_APPRNUM_SAVE: '/sales/appr/offer', //결재문서번호 저장
};

const PRODUCT = {
  GET_PRODUCT_CODE: '/v1/common/productSearch',
  SEARCH_PRODUCT_CODE: '/v1/common/product?prdtClsCd=${prdtClsCd}&prdtSpecs=${prdtSpecs}&filter=${filter}&tskSpecs=${tskSpecs}&brandCds=${brandCds}&ecoCds=${ecoCds}&brdGrades=${brdGrades}&custId=${custId}&dnstTypes=${dnstTypes}&pageNumber=${pageNumber}&pageSize=${pageSize}',
  SEARCH_PRODUCT_SIZE: '/v1/common/productSize?hrsnSpec=${hrsnSpec}&vtclSpec=${vtclSpec}',
  SEARCH_PRODUCT_TSK: '/v1/common/productTsk?tskSpec=${tskSpec}',
  GET_PRODUCT_FAVORITE: '/v1/user/favorite?custId=${custId}&filter=${filter}&pageNumber=${pageNumber}&pageSize=${pageSize}',
  SAVE_PRODUCT_FAVORITE: '/v1/user/favorite',
  GET_PRODUCT_PRE: '/v1/common/preOffer?custId=${custId}&filter=${filter}&pageNumber=${pageNumber}&pageSize=${pageSize}',
};

const EXCEL = {
  OFFR_BOOKING_EXCEL_DOWNLOAD: '/v1/offerMng/excel',
  SAVE_BOOKING_EXCEL: '/sales/booking',
  POST_BOOKING_UPLOAD: '/sales/booking', //부킹업로드 저장
};

const BOOKING = {
  GET_BOOKING_LIST: '/v1/booking?custId=${custId}&prdtClsCd=${prdtClsCd}&bokngStatCd=${bokngStatCd}&filter=${filter}&sttDt=${sttDt}&endDt=${endDt}&plant=${plant}&prdcReqYn=${prdcReqYn}&sttCfmDt=${sttCfmDt}&endCfmDt=${endCfmDt}&soYn=${soYn}&pageNumber=${pageNumber}&pageSize=${pageSize}&salesUsers=${salesUsers}',
  GET_BOOKING_PRINT: '/v1/booking/print?offrId=1&id=1&custId=${custId}', //데빗노트출력조회
  SAVE_BOOKING_CONFIRM: '/sales/booking/confirm', //부킹확정
  SAVE_APPRREQ: '/sales/apprReq', //결제상신
  SAVE_BOOKING_SALE: '/sales/booking', //저장
  SAVE_BOOKING_DFCEND: '/sales/booking/dfcEnd', //부킹잔량종료
  SAVE_BOOKING_REMOVE: '/sales/booking/remove', //부킹선택삭제
  SAVE_BOOKING_CANCEL: '/sales/booking/cancel', //부킹선택취소
  SAVE_BOOKING_ASSIGN: '/sales/stockAssign', //재고할당요청
  SAVE_BOOKING_CHANGE: '/sales/booking/exptChange', //예탁전환
  SAVE_BOOKING_REQUEST: '/sales/booking/exptRequst', //예탁배송요청
  SAVE_BOOKING_DELVRY: '/v1/deliveryRequst', //배송요청
  GET_BOOKING_CREDIT: '/v1/common/credit?custId=${custId}', //여신조회
  GET_BOOKING_OFFRPRINT: '/v1/booking/offer/print?offrIdList=${offrIdList}&bokngIdList=${bokngIdList}&langList=${langList}', //부킹견적서 출력
  PUT_BOOKING_INQUIRY: '/v1/deliveryRequst/date', //최초배송가능일 조회
  PRINT_DEBIT_NOTE: '/v1/booking/debitNote/print?custId=${custId}&bokngIdList=${bokngIdList}&langList=${langList}&signYn=${signYn}',
  POST_DEBIT_NOTE: '/v1/booking/debitNote/custom/print',
  SAVE_BOOKING_APPR: '/sales/appr/booking', //결재문서번호 저장
  GET_ALLOCATION_LIST: '/v1/booking/stockAllocation?custId=${custId}&prdtClsCd=${prdtClsCd}&bokngStatCd=${bokngStatCd}&filter=${filter}&sttDt=${sttDt}&endDt=${endDt}&plant=${plant}&prdcReqYn=${prdcReqYn}&sttCfmDt=${sttCfmDt}&endCfmDt=${endCfmDt}&soYn=${soYn}&pageNumber=${pageNumber}&pageSize=${pageSize}&salesUsers=${salesUsers}',
};

const SOP = {
  SAVE_PLANT: '/sales/stockAssign/plant',
  CREATE_SO: '/sales/booking/soCreate',
  GET_PLANT_QTY: '/sales/booking/plntStock',
  SAVE_BOOKING_ASSIGN_END: '/sales/stockAssign/end',
  SAVE_BOOKING_QTY: '/sales/booking/updateQty',
  DELETE_SO: '/sales/booking/soDelete',
  QTY_RELOAD: '/sales/stockAssign/reCal',
};

const SALES = {
  GET_CUSTOMER_SEARCH: '/sales/customer?filter=${filter}&useYn=${useYn}&custType=${custType}',
};

const PRODUCT_MANAGEMENT = {
  GET_PRODUCT_MANAGE_LIST: '/v1/offerMng?custId=${custId}&sttDt=${sttDt}&endDt=${endDt}&prdtClsCd=${prdtClsCd}&offrStatusCds=${offrStatusCds}&offrClsCd=${offrClsCd}&filter=${filter}&pageNumber=${pageNumber}&pageSize=${pageSize}&salesUsers=${salesUsers}',
  GET_SEARCH_RESULT: '/v1/offerMng?custId=${custId}&sttDt=${sttDt}&endDt=${endDt}&prdtClsCd=${prdtClsCd}&offrStatusCds=${offrStatusCds}&offrClsCd=${offrClsCd}&filter=${filter}&pageNumber=${pageNumber}&pageSize=${pageSize}&salesUsers=${salesUsers}',
  GET_PRODUCT_DTAILS: '/v1/offerMng/dtls?custId=${custId}&id=${id}',
  GET_DOWNLOAD_PRODUCT_MANAGE_LIST: '/v1/offerMng/excel?prdtClsCd&offrStatusCd&filter&sttDt&endDt',
  SAVE_CANCEL_PRODUCT: '/v1/offerMng/cancel',
  SAVE_COPY_PRODUCT: '/v1/offerMng/copy',
  SAVE_DELETE_PRODUCT_SELECTION: '/v1/offerMng/remove',
  GET_PRINT_QUOTATION: '/v1/offerMng/offer/print?id=${id}&langList=${langList}',
  GET_PRINT_CONTRACT: '/v1/offerMng/contract?id=${id}&langList=${langList}&signYn=${signYn}',
  SAVE_CANCEL_REMAIN: '/v1/offerMng/rmdCancel',
  PUT_CONFIRM_QUOTE: '/sales/confirm',
  PUT_SUBMIT_APPROVAL: '/sales/apprReqBulk',
  PUT_SEND_QUOTATION: '/sales/offrMng/send',
  PUT_SALES_MEMO: '/sales/salesMemo',
};

const SAMPLE_MANAGEMENT = {
  SAVE_CANCEL_SAMPLE: '/v1/offerMng/cancel',
};

const MOBILE_DELIVERY = {
  GET_DELIVERY_STATUS_LIST: '/v1/deliveryRequst/trnStatList?custId=${custId}&offrCls=${offrCls}&prdtClsCd=${prdtClsCd}&trnCarType=${trnCarType}&prdtCd=${prdtCd}&dateCls=${dateCls}&sttDt=${sttDt}&endDt=${endDt}&salesUsers=${salesUsers}&filter=${filter}&outStatCd=${outStatCd}&trnStatCd=${trnStatCd}&pageSize=${pageSize}&pageNumber=${pageNumber}',
  GET_DRIVER_DELIVERY_STATUS_LIST: '/v1/deliveryRequst/mobile/trnStatProcList?searchCls=${searchCls}&trnCarNum=${trnCarNum}&pageSize=${pageSize}&pageNumber=${pageNumber}',
  PUT_SAVE_TAKE_OVER: 'v1/deliveryRequst/mobile/takeOver/Confirm',
  GET_DRIVER_COUNT: '/v1/deliveryRequst/mobile/trnStatProcCount?trnCarNum=${trnCarNum}',
};

const ORDER = {
  SAMPLE_MANAGEMENT,
  CUSTOMER,
  PRODUCT,
  SALES,
  BOOKING,
  EXCEL,
  PRODUCT_MANAGEMENT,
  DETAIL,
  SOP,
  MOBILE_DELIVERY,
};

export { ORDER };
