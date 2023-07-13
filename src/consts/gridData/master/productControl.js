/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'custId', //고객사 ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custCd', //고객사 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custNm', //고객사 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtClsNm', //품목 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtClsCd', //품목 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesMngNm', //영업 담당 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesMngCd', //영업 담당 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesSuptNm', //영업 지원 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesSuptCd', //영업 지원 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'erpCustCd', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesOffice', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesOfficeNm', //작업자
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedAt', //최종수정
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedByNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'useYn', //제한여부
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'prdtClsNm',
    name: 'prdtClsNm',
    header: {
      text: '구분',
    },
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
    fieldName: 'useYn',
    name: 'useYn',
    renderer: {
      type: 'check',
      trueValues: 'Y',
      falseValues: 'N',
    },
    header: {
      text: '제한여부',
    },
    width: 60,
  },
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
      text: 'custCd',
    },
    visible: false,
  },
  {
    fieldName: 'custNm',
    name: 'custNm',
    header: {
      text: 'custNm',
    },
    visible: false,
  },
  {
    fieldName: 'salesMngNm',
    name: 'salesMngNm',
    header: {
      text: 'salesMngNm',
    },
    visible: false,
  },
  {
    fieldName: 'salesMngCd',
    name: 'salesMngCd',
    header: {
      text: 'salesMngCd',
    },
    visible: false,
  },
  {
    fieldName: 'salesSuptNm',
    name: 'salesSuptNm',
    header: {
      text: 'salesSuptNm',
    },
    visible: false,
  },
  {
    fieldName: 'salesSuptCd',
    name: 'salesSuptCd',
    header: {
      text: 'salesSuptCd',
    },
    visible: false,
  },
  {
    fieldName: 'erpCustCd',
    name: 'erpCustCd',
    header: {
      text: 'erpCustCd',
    },
    visible: false,
  },
  {
    fieldName: 'salesOffice',
    name: 'salesOffice',
    header: {
      text: 'salesOffice',
    },
    visible: false,
  },
  {
    fieldName: 'salesOfficeNm',
    name: 'salesOfficeNm',
    header: {
      text: 'salesOfficeNm',
    },
    visible: false,
  },
  {
    fieldName: 'updatedAt',
    name: 'updatedAt',
    header: {
      text: 'updatedAt',
    },
    visible: false,
  },
  {
    fieldName: 'updatedByNm',
    name: 'updatedByNm',
    header: {
      text: 'updatedByNm',
    },
    visible: false,
  },
];
