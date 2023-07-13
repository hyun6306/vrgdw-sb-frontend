/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
export const fields = [
  {
    fieldName: 'compCd', //회사 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'sapPoNum', //주문번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'itemNum', //주문 라인번호
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'rtnYn', //반품 여부
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'staffNum', //PO 출고등록 직원번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'staffNm', //PO 출고등록 직원명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upPlntCd', //상차 플랜트 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upSiteNm', //상차지
    dataType: ValueType.TEXT,
  },
  // {
  //   fieldName: 'upSavePos', //상차지 저장위치
  //   dataType: ValueType.TEXT,
  // },
  {
    fieldName: 'upStoreNm', //상차 창고 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarType', //배송형태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarNm', //배송형태 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dwPlntCd', //도착플랜트
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'compCd',
    name: 'compCd',
    header: {
      text: 'compCd',
    },
    visible: false,
  },
  {
    fieldName: 'sapPoNum',
    name: 'sapPoNum',
    header: {
      text: 'ERP주문번호',
    },
    editable: false,
  },
  {
    fieldName: 'itemNum',
    name: 'itemNum',
    header: {
      text: '주문 라인번호',
    },
    numberFormat: '#',
    editable: false,
  },
  {
    fieldName: 'rtnYn',
    name: 'rtnYn',
    header: {
      text: '반품여부',
    },
    editable: false,
  },
  {
    fieldName: 'staffNum',
    name: 'staffNum',
    header: {
      text: 'staffNum',
    },
    visible: false,
  },
  {
    fieldName: 'staffNm',
    name: 'staffNm',
    header: {
      text: 'PO출고등록 직원명',
    },
    width: '200',
    editable: false,
  },
  {
    fieldName: 'upPlntCd',
    name: 'upPlntCd',
    header: {
      text: '플랜트',
    },
    editable: false,
  },
  {
    fieldName: 'upSiteNm',
    name: 'upSiteNm',
    header: {
      text: '상차지',
    },
    editable: false,
  },
  // {
  //   fieldName: 'upSavePos',
  //   name: 'upSavePos',
  //   header: {
  //     text: '상차지 저장위치',
  //   },
  //   editable: false,
  // },
  {
    fieldName: 'upStoreNm',
    name: 'upStoreNm',
    header: {
      text: 'upStoreNm',
    },
    visible: false,
  },
  {
    fieldName: 'trnCarNm',
    name: 'trnCarNm',
    header: {
      text: '배송형태',
    },
    editable: false,
  },
  {
    fieldName: 'trnCarType',
    name: 'trnCarType',
    header: {
      text: 'trnCarType',
    },
    visible: false,
  },
  {
    fieldName: 'dwPlntCd',
    name: 'dwPlntCd',
    header: {
      text: '도착플랜트',
    },
    editable: false,
  },
];

export const layout = ['compCd', 'sapPoNum', 'itemNum', 'rtnYn', 'staffNum', 'staffNm', 'upPlntCd', 'upSiteNm', 'upStoreNm', 'trnCarNm', 'trnCarType', 'dwPlntCd'];
// 'upSavePos',
