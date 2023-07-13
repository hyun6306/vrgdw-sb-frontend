/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'id', name: 'id', dataType: ValueType.TEXT, header: { text: '번호' }, width: 10 }, // : 번호"
  { fieldName: 'user', name: 'user', dataType: ValueType.TEXT, header: { text: '사용자 ID' }, width: 20 }, // : 사용자 ID",
  { fieldName: 'userNm', name: 'userNm', dataType: ValueType.TEXT, header: { text: '사용자 이름' }, width: 20 }, // : 사용자 이름",
  { fieldName: 'method', name: 'method', dataType: ValueType.TEXT, header: { text: 'method' }, width: 10 }, // : method",
  { fieldName: 'path', name: 'path', dataType: ValueType.TEXT, header: { text: 'path' } }, // : path",
  {
    fieldName: 'parameter',
    name: 'parameter',
    dataType: ValueType.TEXT,
    header: { text: 'parameter' },
    renderer: 'imgbtn',
  }, // : 파라미터",
  { fieldName: 'createdAt', name: 'createdAt', dataType: ValueType.TEXT, header: { text: 'createdAt' }, width: 20 }, // : createdAt",
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
