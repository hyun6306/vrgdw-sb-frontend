/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns01 = [
  { fieldName: 'trncusId', name: 'trncusId', header: { text: '운송사 ID' }, dataType: ValueType.TEXT, visible: false }, //운송사 ID
  { fieldName: 'trncusCd', name: 'trncusCd', header: { text: '운송사 코드' }, dataType: ValueType.TEXT, width: 50, objectKey: 'tranAreaMngGrid01_01' }, //운송사 코드
  { fieldName: 'trncusNm', name: 'trncusNm', header: { text: '운송사 명' }, dataType: ValueType.TEXT, objectKey: 'tranAreaMngGrid01_02' }, //운송사 명
  // { fieldName: 'carType', name: 'carType', header: { text: '차량 유형' }, dataType: ValueType.TEXT }, //차량 유형
  { fieldName: 'carTypeNm', name: 'carTypeNm', header: { text: '차량 유형 명' }, dataType: ValueType.TEXT, width: 50, objectKey: 'tranAreaMngGrid01_03' }, //차량 유형 명
];

export const fields01 = _columns01.map(({ fieldName, dataType }) => ({
  fieldName,
  dataType,
}));

export const columns01 = _columns01.map(({ fieldName, name, header, ...rest }) => ({
  fieldName,
  name,
  header,
  ...rest,
}));

const _columns02 = [
  { fieldName: 'id', name: 'id', header: { text: '운임상세 ID' }, dataType: ValueType.TEXT, width: 50, visible: false }, //ID
  { fieldName: 'cityNm', name: 'cityNm', header: { text: '대권역 명' }, dataType: ValueType.TEXT, objectKey: 'tranAreaMngGrid02_01' },
  { fieldName: 'cityCd', name: 'cityCd', header: { text: '대권역 코드' }, dataType: ValueType.TEXT, width: 50, objectKey: 'tranAreaMngGrid02_02' }, //시도 코드
  { fieldName: 'distrNm', name: 'distrNm', header: { text: '중권역 명' }, dataType: ValueType.TEXT, objectKey: 'tranAreaMngGrid02_03' },
  { fieldName: 'distrCd', name: 'distrCd', header: { text: '중권역 코드' }, dataType: ValueType.TEXT, width: 50, objectKey: 'tranAreaMngGrid02_04' }, //구군 코드
  { fieldName: 'trncusCd', name: 'trncusCd', header: { text: '운송사 코드' }, dataType: ValueType.TEXT, width: 70, objectKey: 'tranAreaMngGrid02_05' }, //운송사 코드
  { fieldName: 'carType', name: 'carType', header: { text: '차량 유형' }, dataType: ValueType.TEXT, width: 50, objectKey: 'tranAreaMngGrid02_06' }, //차량 유형
  { fieldName: 'currCd', name: 'currCd', header: { text: '통화' }, dataType: ValueType.TEXT, width: 50, objectKey: 'tranAreaMngGrid02_07' }, //통화 코드
  { fieldName: 'areaPrice', name: 'areaPrice', header: { text: '권역 운임' }, dataType: ValueType.NUMBER, numberFormat: '#,##0', width: 50, editable: true, objectKey: 'tranAreaMngGrid02_08' }, //운송권역 운임
  {
    fieldName: 'useYn',
    name: 'useYn',
    renderer: { type: 'check', trueValues: 'Y', falseValues: 'N' },
    header: { text: '사용여부' },
    dataType: ValueType.TEXT,
    width: 40,
    editable: true,
    objectKey: 'tranAreaMngGrid02_09',
  },
];

export const fields02 = _columns02.map(({ fieldName, dataType }) => ({
  fieldName,
  dataType,
}));

export const columns02 = _columns02.map(({ fieldName, name, header, ...rest }) => ({
  fieldName,
  name,
  header,
  ...rest,
}));
