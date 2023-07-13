import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'id',
    dataType: 'text',
  },
  {
    fieldName: 'offrDtlsId',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngId',
    dataType: 'text',
  },
  {
    fieldName: 'bokngNum',
    dataType: 'text',
  },
  {
    fieldName: 'itemNum',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngSoNum',
    dataType: 'text',
  },
  {
    fieldName: 'bokngSoItemNum',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'offrClsCd',
    dataType: 'text',
  },
  {
    fieldName: 'trnClsCd',
    dataType: 'text',
  },
  {
    fieldName: 'trnDoNum',
    dataType: 'text',
  },
  {
    fieldName: 'trnDoItemNum',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnNum',
    dataType: 'text',
  },
  {
    fieldName: 'reqDt',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnReqOrdQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnReqWght',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnReqVol',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnHopeDt',
    dataType: 'text',
  },
  {
    fieldName: 'trnHopeTi',
    dataType: 'text',
  },
  {
    fieldName: 'areaPriceId',
    dataType: 'text',
  },
  {
    fieldName: 'logitsAlias',
    dataType: 'text',
  },
  {
    fieldName: 'trnCarType',
    dataType: 'text',
  },
  {
    fieldName: 'cityCd',
    dataType: 'text',
  },
  {
    fieldName: 'distrCd',
    dataType: 'text',
  },
  {
    fieldName: 'areaPriceAmt',
    dataType: 'text',
  },
  {
    fieldName: 'postNum',
    dataType: 'text',
  },
  {
    fieldName: 'addr',
    dataType: 'text',
  },
  {
    fieldName: 'addrDtls',
    dataType: 'text',
  },
  {
    fieldName: 'logitsPhoneNum1',
    dataType: 'text',
  },
  {
    fieldName: 'logitsPhoneNum2',
    dataType: 'text',
  },
  {
    fieldName: 'logitsMngNm',
    dataType: 'text',
  },
  {
    fieldName: 'trnCarNum',
    dataType: 'text',
  },
  {
    fieldName: 'driverPhoneNum',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqRemark',
    dataType: 'text',
  },
  {
    fieldName: 'upPlntCd',
    dataType: 'text',
  },
  {
    fieldName: 'savPosCd',
    dataType: 'text',
  },
  {
    fieldName: 'reqStatCd',
    dataType: 'text',
  },
  {
    fieldName: 'updatedByNm',
    dataType: 'text',
  },
  {
    fieldName: 'updatedAt',
    dataType: 'text',
  },
  {
    fieldName: 'custId',
    dataType: 'text',
  },
  {
    fieldName: 'prdtCd',
    dataType: 'text',
  },
  {
    fieldName: 'userNm',
    dataType: 'text',
  },
  {
    fieldName: 'custCd',
    dataType: 'text',
  },
  {
    fieldName: 'custNm',
    dataType: 'text',
  },
  {
    fieldName: 'prdtNm',
    dataType: 'text',
  },
  {
    fieldName: 'custReqRemark',
    dataType: 'text',
  },
  {
    fieldName: 'offrClsNm',
    dataType: 'text',
  },
  {
    fieldName: 'reqStatNm',
    dataType: 'text',
  },
  {
    fieldName: 'trnCarNm',
    dataType: 'text',
  },
  {
    fieldName: 'ordUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'baseUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'volUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'wghtUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'cityNm',
    dataType: 'text',
  },
  {
    fieldName: 'distrNm',
    dataType: 'text',
  },
  {
    fieldName: 'upSiteNm',
    dataType: 'text',
  },
];

export const columns = [
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: 'ID',
    },
    visible: false,
  },
  {
    fieldName: 'offrDtlsId',
    name: 'offrDtlsId',
    header: {
      text: '견적 상세 ID',
    },
    visible: false,
  },
  {
    fieldName: 'bokngId',
    name: 'bokngId',
    header: {
      text: '부킹 ID',
    },
    visible: false,
  },
  {
    fieldName: 'bokngNum',
    name: 'bokngNum',
    header: {
      text: '123123123',
    },
    visible: true,
    width: 250,
  },
  {
    fieldName: 'itemNum',
    name: 'itemNum',
    header: {
      text: '부킹 SO 아이템 번호',
    },
    numberFormat: '#',
  },
  {
    fieldName: 'bokngSoNum',
    name: 'bokngSoNum',
    header: {
      text: '123123123',
    },
    visible: true,
    width: 250,
  },
  {
    fieldName: 'bokngSoItemNum',
    name: 'bokngSoItemNum',
    header: {
      text: '부킹 SO 아이템 번호',
    },
    visible: true,
    numberFormat: '#',
  },
  {
    fieldName: 'offrClsCd',
    name: 'offrClsCd',
    header: {
      text: '견적 구분',
    },
    visible: false,
  },
  {
    fieldName: 'trnClsCd',
    name: 'trnClsCd',
    header: {
      text: '출고 구분 코드',
    },
    visible: false,
  },
  {
    fieldName: 'trnDoNum',
    name: 'trnDoNum',
    header: {
      text: '출고 DO 번호',
    },
    visible: true,
    width: 300,
  },
  {
    fieldName: 'trnDoItemNum',
    name: 'trnDoItemNum',
    header: {
      text: '출고 D/O 아이템 번호',
    },
    visible: true,
    numberFormat: '#',
  },
  {
    fieldName: 'trnNum',
    name: 'trnNum',
    header: {
      text: '배송 번호',
    },
    visible: false,
  },
  {
    fieldName: 'reqDt',
    name: 'reqDt',
    header: {
      text: '요청 일',
    },
    visible: true,
  },
  {
    fieldName: 'trnReqBaseQty',
    name: 'trnReqBaseQty',
    header: {
      text: '배송 요청 기본 수량',
    },
    visible: true,

    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'trnReqOrdQty',
    name: 'trnReqOrdQty',
    header: {
      text: '배송 요청 주문 수량',
    },
    visible: true,
    styleName: 't-r',
    numberFormat: '#,###.###',
  },
  {
    fieldName: 'trnReqWght',
    name: 'trnReqWght',
    header: {
      text: '배송 요청 중량',
    },
    visible: true,

    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    fieldName: 'trnReqVol',
    name: 'trnReqVol',
    header: {
      text: '배송 요청 부피',
    },
    visible: true,

    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: '배송 희망 일',
    },
    visible: false,
  },
  {
    fieldName: 'trnHopeTi',
    name: 'trnHopeTi',
    header: {
      text: '배송 희망 시간',
    },
    visible: false,
  },
  {
    fieldName: 'areaPriceId',
    name: 'areaPriceId',
    header: {
      text: '운송권역 운임 ID',
    },
    visible: false,
  },
  {
    fieldName: 'logitsAlias',
    name: 'logitsAlias',
    header: {
      text: '배송지 명',
    },
    visible: true,
    styleName: 't-l',
  },
  {
    fieldName: 'trnCarType',
    name: 'trnCarType',
    header: {
      text: '배송 차량 유형',
    },
    visible: false,
  },
  {
    fieldName: 'cityCd',
    name: 'cityCd',
    header: {
      text: '시도 코드',
    },
    visible: false,
  },
  {
    fieldName: 'distrCd',
    name: 'distrCd',
    header: {
      text: '구군 코드',
    },
    visible: false,
  },
  {
    fieldName: 'areaPriceAmt',
    name: 'areaPriceAmt',
    header: {
      text: '운송권역 운임 단가',
    },
    visible: false,
  },
  {
    fieldName: 'postNum',
    name: 'postNum',
    header: {
      text: '우편 번호',
    },
    visible: true,
  },
  {
    fieldName: 'addr',
    name: 'addr',
    header: {
      text: '주소',
    },
    visible: true,
    styleName: 't-l',
    width: 400,
  },
  {
    fieldName: 'addrDtls',
    name: 'addrDtls',
    header: {
      text: '주소 상세',
    },
    visible: true,
    styleName: 't-l',
    width: 400,
  },
  {
    fieldName: 'logitsPhoneNum1',
    name: 'logitsPhoneNum1',
    header: {
      text: '배송지 전화 번호1',
    },
    visible: false,
  },
  {
    fieldName: 'logitsPhoneNum2',
    name: 'logitsPhoneNum2',
    header: {
      text: '배송지 전화 번호2',
    },
    visible: false,
  },
  {
    fieldName: 'logitsMngNm',
    name: 'logitsMngNm',
    header: {
      text: '배송지 담당 명',
    },
    visible: false,
  },
  {
    fieldName: 'trnCarNum',
    name: 'trnCarNum',
    header: {
      text: '배송 차량 번호',
    },
    visible: false,
  },
  {
    fieldName: 'driverPhoneNum',
    name: 'driverPhoneNum',
    header: {
      text: '기사 전화 번호',
    },
    visible: false,
  },
  {
    fieldName: 'trnReqRemark',
    name: 'trnReqRemark',
    header: {
      text: '배송 요청 코멘트',
    },
    visible: false,
  },
  {
    fieldName: 'upPlntCd',
    name: 'upPlntCd',
    header: {
      text: '상차 플랜트 코드',
    },
    visible: true,
  },
  {
    fieldName: 'savPosCd',
    name: 'savPosCd',
    header: {
      text: '저장 위치 코드',
    },
    visible: false,
  },
  {
    fieldName: 'reqStatCd',
    name: 'reqStatCd',
    header: {
      text: '요청 상태 코드',
    },
    visible: false,
  },
  {
    fieldName: 'updatedByNm',
    name: 'updatedByNm',
    header: {
      text: '작업자',
    },
    visible: false,
  },
  {
    fieldName: 'updatedAt',
    name: 'updatedAt',
    header: {
      text: '최종수정',
    },
    visible: false,
  },
  {
    fieldName: 'custId',
    name: 'custId',
    header: {
      text: '고객사 ID',
    },
    visible: false,
  },
  {
    fieldName: 'prdtCd',
    name: 'prdtCd',
    header: {
      text: '제품 코드',
    },
    visible: true,
    width: 400,
  },
  {
    fieldName: 'userNm',
    name: 'userNm',
    header: {
      text: '영업사원',
    },
    visible: true,
    styleName: 't-l',
    width: 300,
  },
  {
    fieldName: 'custNm',
    name: 'custNm',
    header: {
      text: '고객사명',
    },
    visible: true,
    styleName: 't-l',
    width: 300,
  },
  {
    fieldName: 'custCd',
    name: 'custCd',
    header: {
      text: '고객사명',
    },
    visible: true,
    // styleName: 't-l',
    width: 300,
  },
  {
    fieldName: 'prdtNm',
    name: 'prdtNm',
    header: {
      text: '제품명',
    },
    visible: true,

    styleName: 't-l',
    width: 200,
  },
  {
    fieldName: 'custReqRemark',
    name: 'custReqRemark',
    header: {
      text: '주문특이사항',
    },

    renderer: 'imgbtn',
  },
  {
    fieldName: 'offrClsNm',
    name: 'offrClsNm',
    header: {
      text: '주문유형명',
    },
    visible: true,
  },
  {
    fieldName: 'reqStatNm',
    name: 'reqStatNm',
    header: {
      text: '예탁처리구분명',
    },
    visible: true,
  },
  {
    fieldName: 'trnCarNm',
    name: 'trnCarNm',
    header: {
      text: '출고형태명',
    },
    visible: true,
  },
  {
    //주문단위(번들)
    fieldName: 'ordUnitNm',
    name: 'ordUnitNm',
    header: {
      text: '단위',
    },
    visible: true,
  },
  {
    //예탁처리단위(매)
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm',
    header: {
      text: '단위',
    },
    visible: true,
  },
  {
    //부피단위(M3)
    fieldName: 'volUnitNm',
    name: 'volUnitNm',
    header: {
      text: '단위',
    },
    visible: true,
  },
  {
    //중량단위(Kg)
    fieldName: 'wghtUnitNm',
    name: 'wghtUnitNm',
    header: {
      text: '단위',
    },
    visible: true,
  },
  {
    fieldName: 'cityNm',
    name: 'cityNm',
    header: {
      text: '대권역 명',
    },
  },
  {
    fieldName: 'distrNm',
    name: 'distrNm',
    header: {
      text: '중권역 명',
    },
  },
  {
    fieldName: 'upSiteNm',
    name: 'upSiteNm',
    header: {
      text: '상차지',
    },
    visible: false,
  },
];

export const layout = [
  'reqStatCd',
  'reqStatNm',
  'reqDt', //주문일자??? 일단 요청일로
  'bokngNum',
  'itemNum',
  'bokngSoNum',
  'bokngSoItemNum',
  'trnDoNum',
  'trnDoItemNum',
  'userNm',
  'custCd',
  'custNm', // 고객
  'custReqRemark',
  'upPlntCd',
  'prdtCd',
  'prdtNm',
  {
    name: 'ordUnit',
    direction: 'horizontal',
    header: {
      text: '주문단위',
    },
    items: [
      'trnReqOrdQty',
      'ordUnitNm', // 주문단위(번들)
    ],
  },
  // 'trnReqBaseQty', // 기본수량
  {
    name: 'reqStatBase',
    direction: 'horizontal',
    header: {
      text: '예탁처리 기본단위',
    },
    items: [
      'trnReqBaseQty', // '예탁처리수량',
      'baseUnitNm', // 예탁처리단위(매)
    ],
  },
  {
    name: 'volUnit',
    direction: 'horizontal',
    header: {
      text: '부피단위',
    },
    items: [
      'trnReqVol',
      'volUnitNm', // 단위 (M3)
    ],
  },
  {
    name: 'wghtUnit',
    direction: 'horizontal',
    header: {
      text: '중량단위',
    },
    items: [
      'trnReqWght',
      'wghtUnitNm', // 단위(Kg)
    ],
  },
  'logitsAlias',
  'postNum',
  {
    name: 'cityDistr',
    direction: 'logitsCd',
    hideChildHeaders: false,
    header: {
      text: '배송지 권역',
      tooltip: '배송지 권역',
      showTooltip: true,
    },
    items: ['cityNm', 'distrNm'],
  },
  'addr',
  'trnCarNm',
  'offrClsNm',
];
