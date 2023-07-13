// 운송비 조회
import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'trnCloseNum', // 마감번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnClsCd', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnClsNm', // 출고구분
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'compCd', // 사업부코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'compNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upPlntCd', // 플랜트코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'plntNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'closeMonth', // 정산년월
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trncusId', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trncusNm', // 운송사
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngSoNum', // ERP주문번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngSoItemNum', // ERP품목번호
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnPlnNum', // 배차계획번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPrice', // 총 운송비
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'currency', // 통화
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'closeDt', // 마감일자
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'closeTi', // 마감시간
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'crtBy', // 생성자ID
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: 'trnCloseNum',
    fieldName: 'trnCloseNum',
    header: {
      text: 'trnCloseNum', // 마감번호
    },
    editable: false,
    visible: true,
    width: 150,
  },
  {
    name: 'trnClsCd',
    fieldName: 'trnClsCd',
    header: {
      text: 'trnClsCd', //
    },
    editable: false,
    visible: false,
  },
  {
    name: 'trnClsNm',
    fieldName: 'trnClsNm',
    header: {
      text: 'trnClsNm', // 출고구분
    },
    editable: false,
    visible: true,
  },
  {
    name: 'compCd',
    fieldName: 'compCd',
    header: {
      text: 'compCd', // 사업부코드
    },
    editable: false,
    visible: true,
  },
  {
    name: 'compNm',
    fieldName: 'compNm',
    header: {
      text: 'compNm', // 사업부코드
    },
    editable: false,
    visible: false,
  },
  {
    name: 'upPlntCd',
    fieldName: 'upPlntCd',
    header: {
      text: 'upPlntCd', // 플랜트코드
    },
    editable: false,
    visible: true,
  },
  {
    name: 'plntNm',
    fieldName: 'plntNm',
    header: {
      text: 'plntNm', //
    },
    editable: false,
    visible: false,
  },
  {
    name: 'closeMonth',
    fieldName: 'closeMonth',
    header: {
      text: 'closeMonth', // 정산년월
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trncusId',
    fieldName: 'trncusId',
    header: {
      text: 'trncusId', //
    },
    editable: false,
    visible: false,
  },
  {
    name: 'trncusNm',
    fieldName: 'trncusNm',
    header: {
      text: 'trncusNm', // 운송사
    },
    editable: false,
    visible: true,
    width: 300,
    styleName: 't-l',
  },
  {
    name: 'bokngSoNum',
    fieldName: 'bokngSoNum',
    header: {
      text: 'bokngSoNum', // ERP주문번호
    },
    editable: false,
    visible: true,
    width: 150,
  },
  {
    name: 'bokngSoItemNum',
    fieldName: 'bokngSoItemNum',
    header: {
      text: 'bokngSoItemNum', // ERP품목번호
    },
    editable: false,
    visible: true,
    width: 150,
    numberFormat: '#',
  },
  {
    name: 'trnPlnNum',
    fieldName: 'trnPlnNum',
    header: {
      text: 'trnPlnNum', // 배차계획번호
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'trnPrice',
    fieldName: 'trnPrice',
    header: {
      text: 'trnPrice', // 총 운송비
    },
    editable: false,
    visible: true,
    numberFormat: '#,##0',
    styleName: 't-r',
    width: 300,
  },
  {
    name: 'currency',
    fieldName: 'currency',
    header: {
      text: 'currency', // 통화
    },
    editable: false,
    visible: true,
  },
  {
    name: 'closeDt',
    fieldName: 'closeDt',
    header: {
      text: 'closeDt', // 마감일자
    },
    editable: false,
    visible: true,
    width: 150,
  },
  {
    name: 'closeTi',
    fieldName: 'closeTi',
    header: {
      text: 'closeTi', // 마감시간
    },
    editable: false,
    visible: true,
    width: 150,
  },
  {
    name: 'crtBy',
    fieldName: 'crtBy',
    header: {
      text: '생성자ID', // 생성자ID
    },
    editable: false,
    visible: true,
  },
];

export const rows = [];

export const layout = [
  'trnCloseNum', //
  'trnClsCd',
  'trnClsNm',
  'compCd',
  'compNm',
  'upPlntCd',
  'plntNm',
  'closeMonth',
  'trncusId',
  'trncusNm',
  'bokngSoNum',
  'bokngSoItemNum',
  'trnPlnNum',
  'trnPrice',
  'currency',
  {
    name: 'closeDtHeader',
    direction: 'logitsCd',
    hideChildHeaders: false,
    header: {
      text: '월마감',
      tooltip: '월마감',
      showTooltip: true,
    },
    items: ['closeDt', 'closeTi'],
  },
  'crtBy',
];
// 마감 번호1
