export const fields = [
  {
    fieldName: 'id', // 부킹 id
    dataType: 'number',
  },
  {
    fieldName: 'offrId', // 견적 id
    dataType: 'number',
  },
  {
    fieldName: 'offrDtlsId', // 견적 상세 id
    dataType: 'number',
  },
  {
    fieldName: 'offrNum', // 견적번호
    dataType: 'text',
  },
  {
    fieldName: 'itemNum', // 아이템번호
    dataType: 'number',
  },
  {
    fieldName: 'bokngSeq', // 부킹회차
    dataType: 'text',
  },
  {
    fieldName: 'bokngNum', // 부킹번호
    dataType: 'text',
  },
  {
    fieldName: 'bokngSoNum', // S/O no
    dataType: 'text',
  },
  {
    fieldName: 'bokngSoItemNum', // S/O 아이템 Num
    dataType: 'number',
  },
  {
    fieldName: 'cfmDt', // 부킹확정일
    dataType: 'text',
  },
  {
    fieldName: 'asgnReqDt', // 재고할당요청일
    dataType: 'text',
  },
  {
    fieldName: 'bokngBaseQty', // 부킹요청수량 - 기본수량
    dataType: 'number',
  },
  {
    fieldName: 'bokngOrdQty', // 부킹요청수량 - 주문수량
    dataType: 'number',
  },
  {
    fieldName: 'bokngStatCd', // 부킹 상태
    dataType: 'text',
  },
  {
    fieldName: 'bokngStatNm', // 부킹 상태
    dataType: 'text',
  },
  {
    fieldName: 'asgnBaseTotQty', // 할당합계 수량 - 기본단위
    dataType: 'number',
  },
  {
    fieldName: 'asgnOrdTotQty', // 할당합계 수량 - 주문단위
    dataType: 'number',
  },
  {
    fieldName: 'trnPsbBaseQty', // 할당 (배송 가능 수량) - 기본 수량
    dataType: 'number',
  },
  {
    fieldName: 'trnPsbOrdQty', // 할당 (배송 가능 수량) - 주문 수량
    dataType: 'number',
  },
  {
    fieldName: 'asgnBaseNedQty', // 할당필요 수량 - 기본단위
    dataType: 'number',
  },
  {
    fieldName: 'asgnOrdNedQty', // 할당필요 수량 - 주문단위
    dataType: 'number',
  },
  {
    fieldName: 'prdcReqYn', // 생산의뢰 상태
    dataType: 'text',
  },
  {
    fieldName: 'bokngRmnBaseQty', // 할당 잔여완료량 - 잔량종료 수량 - 기본 수량
    dataType: 'number',
  },
  {
    fieldName: 'bokngRmnOrdQty', // 할당 잔여완료량 - 잔량종료 수량 - 주문 수량
    dataType: 'number',
  },
  {
    fieldName: 'salesMngRemarkYn', // 영업의견
    dataType: 'text',
  },
  {
    fieldName: 'plntCd', // 플랜트
    dataType: 'text',
  },
  {
    fieldName: 'v112PlntStockBaseQty', // v112 기본 수량
    dataType: 'number',
  },
  {
    fieldName: 'v112PlntStockOrdQty', // v112 주문수량
    dataType: 'number',
  },
  {
    fieldName: 'v113PlntStockBaseQty', // v113 기본 수량
    dataType: 'number',
  },
  {
    fieldName: 'v113PlntStockOrdQty', // v113 주문수량
    dataType: 'number',
  },
  {
    fieldName: 'baseUnitNm', // 기본단위
    dataType: 'text',
  },
  {
    fieldName: 'ordUnitNm', // 주문단위
    dataType: 'text',
  },
  {
    fieldName: 'prdcExpctDt', // MFB 생산예정일
    dataType: 'text',
  },
  {
    fieldName: 'prdcSttDt', // MFB 생산시작일
    dataType: 'text',
  },
  {
    fieldName: 'prdtClsCd', // 아이템 품목(제품분류코드)
    dataType: 'text',
  },
  {
    fieldName: 'prdtClsNm', // 아이템 품목(제품분류코드)
    dataType: 'text',
  },
  {
    fieldName: 'prdtCd', // 아이템 제품코드
    dataType: 'text',
  },
  {
    fieldName: 'prdtNm', // 아이템 제품명
    dataType: 'text',
  },
  {
    fieldName: 'brandNm', // 아이템 브랜드
    dataType: 'text',
  },
  {
    fieldName: 'hvSpec', // 아이템 사이즈
    dataType: 'text',
  },
  {
    fieldName: 'lpmFrtPttnNm', // 아이템 패턴전면
    dataType: 'text',
  },
  {
    fieldName: 'lpmBckPttnNm', // 아이템 패턴후면
    dataType: 'text',
  },
  {
    fieldName: 'prsUpPttnNm', // 아이템 경면판전면
    dataType: 'text',
  },
  {
    fieldName: 'prsDwPttnNm', // 아이템 경면판 후면
    dataType: 'text',
  },
  {
    fieldName: 'custId', // 고객정보 고객 Id (customerInfo-)
    dataType: 'text',
  },
  {
    fieldName: 'custNm', // 고객정보 고객명 (customerInfo-)
    dataType: 'text',
  },
  {
    fieldName: 'custType', // 고객정보 고객그룹
    dataType: 'text',
  },
  {
    fieldName: 'custCd', // 고객정보 고객코드
    dataType: 'text',
  },
  {
    fieldName: 'cityNm', // 고객정보 지역구분
    dataType: 'text',
  },
  {
    fieldName: 'distrNm', // 고객정보 배송지역군
    dataType: 'text',
  },
  {
    fieldName: 'addrInfo', // 고객정보 상세배송주소
    dataType: 'text',
  },
  {
    fieldName: 'dfcEndTypeCd', // 잔량 종료 유형 코드
    dataType: 'text',
  },
  {
    fieldName: 'dfcEndRemark', // 잔량 종료 코멘트
    dataType: 'text',
  },
  {
    fieldName: 'soFail', // SO생성 실패
    dataType: 'text',
  },
  {
    fieldName: 'ordUnitNmrtr',
    dataType: 'text',
  },
  {
    fieldName: 'ordUnitDenom',
    dataType: 'text',
  },
  {
    fieldName: 'exptStatCd',
    dataType: 'text',
  },
  {
    fieldName: 'update',
    dataType: 'text',
  },
];

export const columns = [
  {
    fieldName: 'id', // 부킹 id
    name: 'id',
    header: {
      text: 'id',
    },
    visible: false,
  },
  {
    fieldName: 'offrId', // 견적 id
    name: 'offrId',
    header: {
      text: 'offrId',
    },
    visible: false,
  },
  {
    fieldName: 'offrDtlsId', // 견적 상세 id
    name: 'offrDtlsId',
    header: {
      text: 'offrDtlsId',
    },
    visible: false,
  },
  {
    fieldName: 'offrNum', // 견적번호
    name: 'offrNum',
    header: {
      text: '견적번호',
    },
    visible: true,
  },
  {
    fieldName: 'itemNum', // 아이템번호
    name: 'itemNum',
    header: {
      text: '아이템번호',
    },
    numberFormat: '#',
  },
  {
    fieldName: 'bokngSeq', // 부킹회차
    name: 'bokngSeq',
    header: {
      text: '부킹회차',
    },
    visible: false,
  },
  {
    fieldName: 'bokngNum', // 부킹번호
    name: 'bokngNum',
    header: {
      text: '부킹번호',
    },
  },
  {
    fieldName: 'bokngSoNum', // S/O no
    name: 'bokngSoNum',
    header: {
      text: 'S/O no',
    },
  },
  {
    fieldName: 'bokngSoItemNum', // S/O 아이템번호
    name: 'bokngSoItemNum',
    header: {
      text: '아이템번호',
    },
    numberFormat: '#',
  },
  {
    fieldName: 'cfmDt', // 부킹확정일
    name: 'cfmDt',
    header: {
      text: '부킹확정일',
    },
  },
  {
    fieldName: 'asgnReqDt', // 재고할당요청일
    name: 'asgnReqDt',
    header: {
      text: '재고할당요청일',
    },
  },
  {
    fieldName: 'bokngBaseQty', // 부킹요청수량 - 기본수량
    name: 'bokngBaseQty',
    header: {
      text: '요청수량',
    },
    editor: {
      type: 'number',
      positiveOnly: true,
      editFormat: '#,##0',
    },
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let bokngSoNum = grid.getValue(cell.index.itemIndex, 'bokngSoNum');
        let str = '';
        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        } else {
          str = 0;
        }
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        if (!bokngSoNum && bokngSoNum !== '') str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
        return str;
      },
    },
    styleName: 't-r',
  },
  {
    fieldName: 'bokngOrdQty', // 부킹요청수량 - 주문수량
    name: 'bokngOrdQty',
    header: {
      text: '요청수량',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      positiveOnly: true,
      numberFormat: '#,##0.###',
    },
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let bokngSoNum = grid.getValue(cell.index.itemIndex, 'bokngSoNum');
        let str = '';
        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        } else {
          str = 0;
        }
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        if (!bokngSoNum && bokngSoNum !== '') str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
        return str;
      },
    },
    styleName: 't-r',
  },
  {
    fieldName: 'bokngStatCd', // 부킹 상태
    name: 'bokngStatCd',
    header: {
      text: '요청상태',
    },
    visible: false,
  },
  {
    fieldName: 'bokngStatNm', // 부킹 상태
    name: 'bokngStatNm',
    header: {
      text: '요청상태',
    },
  },
  {
    fieldName: 'asgnBaseTotQty', // 할당합계 수량 - 기본단위
    name: 'asgnBaseTotQty',
    header: {
      text: '할당합계 수량',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
    visible: true,
  },
  {
    fieldName: 'asgnOrdTotQty', // 할당합계 수량 - 주문단위
    name: 'asgnOrdTotQty',
    header: {
      text: '할당합계 수량',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
    visible: true,
  },
  {
    fieldName: 'trnPsbBaseQty', // 할당 (배송 가능 수량) - 기본 수량
    name: 'trnPsbBaseQty',
    header: {
      text: '할당 수량',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
    visible: false,
  },
  {
    fieldName: 'trnPsbOrdQty', // 할당 (배송 가능 수량) - 주문 수량
    name: 'trnPsbOrdQty',
    header: {
      text: '할당 수량',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
    visible: false,
  },
  {
    fieldName: 'asgnBaseNedQty', // 할당필요 수량 - 기본단위
    name: 'asgnBaseNedQty',
    header: {
      text: '할당필요 수량',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
  },
  {
    fieldName: 'asgnOrdNedQty', // 할당필요 수량 - 주문단위
    name: 'asgnOrdNedQty',
    header: {
      text: '할당필요 수량',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
  },
  {
    fieldName: 'prdcReqYn', // 생산의뢰 상태
    name: 'prdcReqYn',
    header: {
      text: '생산의뢰상태',
    },
    visible: false,
  },
  {
    fieldName: 'bokngRmnBaseQty', // 할당 잔여완료량 - 잔량종료 수량 - 기본 수량
    name: 'bokngRmnBaseQty',
    header: {
      text: '할당 잔여완료량',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
    visible: false,
  },
  {
    fieldName: 'bokngRmnOrdQty', // 할당 잔여완료량 - 잔량종료 수량 - 주문 수량
    name: 'bokngRmnOrdQty',
    header: {
      text: '할당 잔여완료량',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
    visible: false,
  },
  {
    fieldName: 'salesMngRemarkYn', // 영업의견
    name: 'salesMngRemarkYn',
    header: {
      text: '영업의견',
    },
    renderer: 'imgbtn',
  },
  {
    fieldName: 'plntCd', // 플랜트
    name: 'plntCd',
    header: {
      text: '플랜트',
    },
    editor: {
      // type: 'list',
      // labels: ['STANDARD', 'CUSTOM'],
      // values: ['N', 'Y'],
      // displayLabels: 'label',
      // textReadOnly: true,
    },
    editButtonVisibility: 'always',
    // editable: true,
  },
  {
    fieldName: 'v112PlntStockBaseQty', // v112 기본 수량
    name: 'v112PlntStockBaseQty',
    header: {
      text: 'v112 재고 수량',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
  },
  {
    fieldName: 'v112PlntStockOrdQty', // v112 주문수량
    name: 'v112PlntStockOrdQty',
    header: {
      text: 'v112 재고 수량',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
  },
  {
    fieldName: 'v113PlntStockBaseQty', // v113 기본 수량
    name: 'v113PlntStockBaseQty',
    header: {
      text: 'v113 재고 수량',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
  },
  {
    fieldName: 'v113PlntStockOrdQty', // v113 주문수량
    name: 'v113PlntStockOrdQty',
    header: {
      text: 'v113 재고 수량',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
  },
  {
    fieldName: 'baseUnitNm', // 기본단위
    name: 'baseUnitNm',
    header: {
      text: '단위',
    },
  },
  {
    fieldName: 'ordUnitNm', // 주문단위
    name: 'ordUnitNm',
    header: {
      text: '단위',
    },
  },
  {
    fieldName: 'prdcExpctDt', // MFB 생산예정일
    name: 'prdcExpctDt',
    header: {
      text: 'MFB 생산예정일',
    },
    visible: false,
  },
  {
    fieldName: 'prdcSttDt', // MFB 생산시작일
    name: 'prdcSttDt',
    header: {
      text: 'MFB 생산시작일',
    },
    visible: false,
  },
  {
    fieldName: 'prdtClsCd', // 아이템 품목(제품분류코드)
    name: 'prdtClsCd',
    header: {
      text: 'prdtClsCd',
    },
    visible: false,
  },
  {
    fieldName: 'prdtClsNm', // 아이템 품목(제품분류코드)
    name: 'prdtClsNm',
    header: {
      text: '품목',
    },
  },
  {
    fieldName: 'prdtCd', // 아이템 제품코드
    name: 'prdtCd',
    header: {
      text: '제품코드',
    },
  },
  {
    fieldName: 'prdtNm', // 아이템 제품명
    name: 'prdtNm',
    header: {
      text: '제품명',
    },
    styleName: 't-l',
    width: 400,
  },
  {
    fieldName: 'brandNm', // 아이템 브랜드
    name: 'brandNm',
    header: {
      text: '브랜드',
    },
  },
  {
    fieldName: 'hvSpec', // 아이템 사이즈
    name: 'hvSpec',
    header: {
      text: '사이즈',
    },
  },
  {
    fieldName: 'lpmFrtPttnNm', // 아이템 패턴전면
    name: 'lpmFrtPttnNm',
    header: {
      text: '패턴전면',
    },
    width: 200,
  },
  {
    fieldName: 'lpmBckPttnNm', // 아이템 패턴후면
    name: 'lpmBckPttnNm',
    header: {
      text: '패턴후면',
    },
    width: 200,
  },
  {
    fieldName: 'prsUpPttnNm', // 아이템 경면판전면
    name: 'prsUpPttnNm',
    header: {
      text: '경면판전면',
    },
    width: 200,
  },
  {
    fieldName: 'prsDwPttnNm', // 아이템 경면판후면
    name: 'prsDwPttnNm',
    header: {
      text: '경면판후면',
    },
    width: 200,
  },
  {
    fieldName: 'custId', // 고객정보 고객 Id (customerInfo-)
    name: 'custId',
    header: {
      text: 'custId',
    },
    visible: false,
  },
  {
    fieldName: 'custNm', // 고객정보 고객명 (customerInfo-)
    name: 'custNm',
    header: {
      text: '고객명',
    },
    styleName: 't-l',
    width: 400,
  },
  {
    fieldName: 'custType', // 고객정보 고객그룹
    name: 'custType',
    header: {
      text: '고객그룹',
    },
    width: 150,
  },
  {
    fieldName: 'custCd', // 고객정보 고객코드
    name: 'custCd',
    header: {
      text: '고객코드',
    },
  },
  {
    fieldName: 'cityNm', // 고객정보 지역구분
    name: 'cityNm',
    header: {
      text: '지역구분',
    },
    width: 250,
  },
  {
    fieldName: 'distrNm', // 고객정보 배송지역군
    name: 'distrNm',
    header: {
      text: '배송지역군',
    },
    width: 250,
  },
  {
    fieldName: 'addrInfo', // 고객정보 상세배송주소
    name: 'addrInfo',
    header: {
      text: '상세배송주소',
    },
    renderer: 'imgbtn',
  },
  {
    fieldName: 'dfcEndTypeCd', // 잔량 종료 유형 코드
    name: 'dfcEndTypeCd',
    header: {
      text: 'dfcEndTypeCd',
    },
    visible: false,
  },
  {
    fieldName: 'dfcEndRemark', // 잔량 종료 코멘트
    name: 'dfcEndRemark',
    header: {
      text: 'dfcEndRemark',
    },
    visible: false,
  },
  {
    fieldName: 'soFail', // SO생성 실패
    name: 'soFail',
    header: {
      text: 'soFail',
    },
    visible: false,
  },
  {
    fieldName: 'ordUnitNmrtr',
    name: 'ordUnitNmrtr',
    header: {
      text: 'ordUnitNmrtr',
    },
    visible: false,
  },
  {
    fieldName: 'ordUnitDenom',
    name: 'ordUnitDenom',
    header: {
      text: 'ordUnitDenom',
    },
    visible: false,
  },
  {
    fieldName: 'exptStatCd',
    name: 'exptStatCd',
    header: {
      text: 'exptStatCd',
    },
    visible: false,
  },
  {
    fieldName: 'update',
    name: 'update',
    header: {
      text: 'update',
    },
    visible: false,
  },
];

export const layout = [
  'id',
  'offrId',
  'offrDtlsId',

  'bokngSeq',
  'bokngStatCd',
  'bokngStatNm', // 요청상태, 1
  'asgnReqDt', // 재고할당요청일, 2
  'cfmDt', // 부킹확정일, 3
  'bokngNum', // 부킹번호, 4ㅌ
  'offrNum', // 견적번호, 5
  'itemNum', // 아이템번호, 6
  'bokngSoNum', // ERP S/O 번호, 7
  'bokngSoItemNum', // SO 아이템번호, 8
  'prdtClsNm', // 제품그룹, 9
  // 'prdtClsCd', // 제품그룹코드
  // 'prdcReqYn', // 생산의뢰 상태
  // 'bokngRmnBaseQty', // 할당 잔여완료량
  // 'bokngRmnOrdQty', // 할당 잔여완료량
  {
    name: 'materialInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '제품',
      tooltip: '제품 입니다',
      showTooltip: true,
    },
    items: [
      { column: 'prdtCd', groupShowMode: 'always' }, // 제품코드, 10
      { column: 'prdtNm', groupShowMode: 'always' }, // 제품명, 11
      { column: 'brandNm', groupShowMode: 'expand' }, // 브랜드, 12
      { column: 'hvSpec', groupShowMode: 'expand' }, // 사이즈, 13
      { column: 'lpmFrtPttnNm', groupShowMode: 'expand' }, // 패턴전면, 14
      { column: 'lpmBckPttnNm', groupShowMode: 'expand' }, // 패턴후면, 15
      { column: 'prsUpPttnNm', groupShowMode: 'expand' }, // 경면판전면, 16
      { column: 'prsDwPttnNm', groupShowMode: 'expand' }, // 경면판후면, 17
    ],
  },
  'plntCd', // 플랜트, 18
  'v112PlntStockBaseQty', // v112 기본 수량
  'v112PlntStockOrdQty', // v112 주문수량, 18
  'v113PlntStockBaseQty', // v113 기본 수량
  'v113PlntStockOrdQty', // v113 주문수량, 19
  'baseUnitNm', // 기본단위
  'ordUnitNm', // 주문단위, 20
  'bokngBaseQty', // 부킹요청수량
  'bokngOrdQty', // 부킹요청수량, (요청량), 21
  'asgnBaseTotQty', // 할당합계수량
  'asgnOrdTotQty', // 할당합계수량
  // 'trnPsbBaseQty', // 할당수량
  // 'trnPsbOrdQty', // 할당수량, (할당량), 22
  'asgnBaseNedQty', // 할당필요수량
  'asgnOrdNedQty', // 할당필요수량, (할당필요량), 23
  'salesMngRemarkYn', // 영업의견, 24
  // 'prdcExpctDt', // MFB 생산예정일
  // 'prdcSttDt', // MFB 생산시작일
  {
    name: 'customerInfo',
    direction: 'horizontal',
    expandable: true,
    header: {
      text: '고객정보',
      tooltip: '고객 입니다',
      showTooltip: true,
    },
    items: [
      { column: 'custNm', groupShowMode: 'always' }, // 이름, 25
      { column: 'custCd', groupShowMode: 'always' }, // 아이디, 26
      { column: 'custType', groupShowMode: 'expand' }, // 그룹, 27
      { column: 'cityNm', groupShowMode: 'expand' }, // 대권역, 28
      { column: 'distrNm', groupShowMode: 'expand' }, // 중권역, 29
      { column: 'addrInfo', groupShowMode: 'expand' }, // 주소, 30
      // { column: 'custId', groupShowMode: 'always' },
    ],
  },
  // 'dfcEndTypeCd', // 잔량종료사유
  // 'dfcEndRemark', // 잔량종료사유
  'soFail',
  'ordUnitNmrtr',
  'ordUnitDenom',
  'exptStatCd',
  'update',
];

//0923
// export const baseColumns = ['bokngBaseQty', 'asgnBaseTotQty', 'trnPsbBaseQty', 'asgnBaseNedQty', 'bokngRmnBaseQty'];
// export const ordColumns = ['bokngOrdQty', 'asgnOrdTotQty', 'trnPsbOrdQty', 'asgnOrdNedQty', 'bokngRmnOrdQty'];

//0929
export const baseColumns = ['baseUnitNm', 'bokngBaseQty', 'asgnBaseTotQty', 'asgnBaseNedQty', 'v112PlntStockBaseQty', 'v113PlntStockBaseQty'];
export const ordColumns = ['ordUnitNm', 'bokngOrdQty', 'asgnOrdTotQty', 'asgnOrdNedQty', 'v112PlntStockOrdQty', 'v113PlntStockOrdQty'];
