/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'id', name: 'id', dataType: ValueType.TEXT, header: { text: '번호' }, width: 15 }, // : 번호"
  { fieldName: 'ifSrvCd', name: 'ifSrvCd', dataType: ValueType.TEXT, header: { text: 'code' }, width: 100 }, // : ifSrvCd",
  { fieldName: 'ifSrvNm', name: 'ifSrvNm', dataType: ValueType.TEXT, header: { text: 'name' }, width: 50 }, // : ifSrvNm",
  { fieldName: 'reqData', name: 'reqData', dataType: ValueType.TEXT, header: { text: '요청 Data' }, width: 20, renderer: 'imgbtn' }, // : reqData",
  { fieldName: 'resData', name: 'resData', dataType: ValueType.TEXT, header: { text: '응답 Data' }, width: 20, renderer: 'imgbtn' }, // : resData",
  { fieldName: 'scssYn', name: 'scssYn', dataType: ValueType.TEXT, header: { text: '성공여부' }, width: 20 }, // : scssYn",
  { fieldName: 'delayMi', name: 'delayMi', dataType: ValueType.TEXT, header: { text: '딜레이' }, width: 20 }, // : delayMi",
  { fieldName: 'sttDt', name: 'sttDt', dataType: ValueType.TEXT, header: { text: '날짜' }, width: 50 }, // : sttDt",
  { fieldName: 'updatedBy', name: 'updatedBy', dataType: ValueType.TEXT, header: { text: 'updatedBy' }, width: 50 }, // : updatedBy",
  { fieldName: 'updatedByNm', name: 'updatedByNm', dataType: ValueType.TEXT, header: { text: 'updatedByNm' }, width: 50 }, // : updatedByNm",
  { fieldName: 'updatedAt', name: 'updatedAt', dataType: ValueType.TEXT, header: { text: 'updatedAt' }, width: 50 }, // : updatedAt",
];

export const fields = _columns.map(({ fieldName, dataType }) => ({
  fieldName,
  dataType,
}));

export const columns = _columns.map(({ fieldName, name, header, ...rest }) => ({
  fieldName,
  name,
  header,
  ...rest,
}));
