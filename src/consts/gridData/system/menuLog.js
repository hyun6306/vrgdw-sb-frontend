/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'id', name: 'id', dataType: ValueType.TEXT, header: { text: '번호' }, width: 10 }, // : 번호"
  { fieldName: 'userCd', name: 'userCd', dataType: ValueType.TEXT, header: { text: '사용자 ID' }, width: 60 }, // : 사용자 ID",
  { fieldName: 'userNm', name: 'userNm', dataType: ValueType.TEXT, header: { text: '사용자 이름' }, width: 60 }, // : 사용자 이름",
  { fieldName: 'menuId', name: 'menuId', dataType: ValueType.TEXT, header: { text: 'menuId' }, width: 30 }, // : menuId",
  { fieldName: 'level', name: 'level', dataType: ValueType.TEXT, header: { text: 'level' }, width: 30 }, // : level",
  { fieldName: 'menuGrpCd', name: 'menuGrpCd', dataType: ValueType.TEXT, header: { text: 'menuGrpCd' }, width: 30 }, // : menuGrpCd",
  { fieldName: 'menuNm', name: 'menuNm', dataType: ValueType.TEXT, header: { text: 'menuNm' } }, // : menuNm",
  { fieldName: 'vistiDt', name: 'vistiDt', dataType: ValueType.TEXT, header: { text: 'vistiDt' }, width: 50 }, // : menuNm",
  { fieldName: 'createdAt', name: 'createdAt', dataType: ValueType.TEXT, header: { text: 'createdAt' }, width: 50 }, // : createdAt",
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
