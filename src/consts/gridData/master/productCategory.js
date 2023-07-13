/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'erpCustCd', //거래처코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custId', //거래처ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custCd', //거래처코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custNm', //거래처명
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
    fieldName: 'salesMngCd', //영업사원사번
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesMngNm', //영업사원명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesSuptCd', //영업지원사번
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesSuptNm', //영업지원사원명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesOffice', //영업팀코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesOfficeNm', //영업팀명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedByNm', //수정자
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedAt', //수정일
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'erpCustCd',
    name: 'erpCustCd',
    header: {
      text: 'erpCustCd',
    },
    visible: false,
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
      text: '거래처코드',
    },
  },
  {
    fieldName: 'custNm',
    name: 'custNm',
    header: {
      text: '거래처명',
    },
    width: 220,
  },
  {
    fieldName: 'prdtClsNm',
    name: 'prdtClsNm',
    header: {
      text: '품목명',
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
    fieldName: 'salesMngCd',
    name: 'salesMngCd',
    header: {
      text: '영업사원사번',
    },
  },
  {
    fieldName: 'salesMngNm',
    name: 'salesMngNm',
    header: {
      text: '영업사원명',
    },
  },
  {
    fieldName: 'salesSuptCd',
    name: 'salesSuptCd',
    header: {
      text: '영업지원사번',
    },
  },
  {
    fieldName: 'salesSuptNm',
    name: 'salesSuptNm',
    header: {
      text: '영업지원사원명',
    },
  },
  {
    fieldName: 'salesOffice',
    name: 'salesOffice',
    header: {
      text: '영업팀코드',
    },
  },
  {
    fieldName: 'salesOfficeNm',
    name: 'salesOfficeNm',
    header: {
      text: '영업팀명',
    },
  },
  {
    fieldName: 'updatedByNm',
    name: 'updatedByNm',
    header: {
      text: '수정자',
    },
  },
  {
    fieldName: 'updatedAt',
    name: 'updatedAt',
    header: {
      text: '수정일',
    },
  },
];

export const layout = ['erpCustCd', 'custId', 'custCd', 'custNm', 'prdtClsNm', 'prdtClsCd', 'salesMngCd', 'salesMngNm', 'salesSuptCd', 'salesSuptNm', 'salesOffice', 'salesOfficeNm', 'updatedByNm', 'updatedAt'];
