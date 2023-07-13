/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'custId', //견적 구분 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custCd', //영업파트너코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custNm', //영업파트너명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'erpSalesCd', //ERP영업사원번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesMngNm', //ERP영업사원명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesSuptNm', //ERP영업사원명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtClsNm', //품목명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtClsCd', //품목코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'erpCustCd', //사번
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'custId',
    name: 'custId',
    header: {
      text: 'custId',
    },
    visible: false,
  },
  {
    fieldName: 'custCd',
    name: 'custCd',
    header: {
      text: '영업파트너코드',
    },
    editable: false,
  },
  {
    fieldName: 'custNm',
    name: 'custNm',
    header: {
      text: '영업파트너명',
    },
    width: 160,
    editable: false,
  },
  {
    fieldName: 'erpSalesCd',
    name: 'erpSalesCd',
    header: {
      text: 'ERP영업사원번호',
    },
    visible: false,
  },
  {
    fieldName: 'salesMngNm',
    name: 'salesMngNm',
    header: {
      text: 'ERP영업사원명',
    },
    visible: false,
  },
  {
    fieldName: 'salesSuptNm',
    name: 'salesSuptNm',
    header: {
      text: 'ERP영업사원명',
    },
    visible: false,
  },
  {
    fieldName: 'prdtClsNm',
    name: 'prdtClsNm',
    header: {
      text: '품목명',
    },
    visible: false,
  },
  {
    fieldName: 'prdtClsCd',
    name: 'prdtClsCd',
    header: {
      text: 'prdtClsCd',
    },
    visible: false,
  },
  {
    fieldName: 'erpCustCd',
    name: 'erpCustCd',
    header: {
      text: '사번',
    },
    visible: false,
  },
];

export const layout = ['custId', 'custCd', 'custNm', 'erpSalesCd', 'salesMngNm', 'salesSuptNm', 'prdtClsNm', 'prdtClsCd', 'erpCustCd'];
