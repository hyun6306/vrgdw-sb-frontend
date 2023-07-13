import { ValueType } from 'realgrid';
export const fields = [
  {
    fieldName: 'trncusCd',
    dataType: 'text',
  },
  {
    fieldName: 'compCd',
    dataType: 'text',
  },
  {
    fieldName: 'compNm',
    dataType: 'text',
  },
  {
    fieldName: 'trncusNm',
    dataType: 'text',
  },
  {
    fieldName: 'trnPrice',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'carCount',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnDt',
    dataType: 'text',
  },
];
export const columns = [
  {
    fieldName: 'trncusCd',
    name: 'trncusCd',
    header: {
      text: '운송사 코드',
    },
  },
  {
    fieldName: 'compCd',
    name: 'compCd',
    header: {
      text: '회사 코드',
    },
  },
  {
    fieldName: 'compNm',
    name: 'compNm',
    header: {
      text: '회사 명',
    },
    visible: false,
  },
  {
    fieldName: 'trncusNm',
    name: 'trncusNm',
    header: {
      text: '운송사 명',
    },
  },
  {
    fieldName: 'trnPrice',
    name: 'trnPrice',
    header: {
      text: '운송 비',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
  },
  {
    fieldName: 'carCount',
    name: 'carCount',
    header: {
      text: '배차 대수',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
  },
  {
    fieldName: 'trnDt',
    name: 'trnDt',
    header: {
      text: '배차 일',
    },
  },
];
export const layout = ['trnDt', 'trnPrice', 'carCount'];
