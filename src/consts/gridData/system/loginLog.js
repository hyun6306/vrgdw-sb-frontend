/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'id', name: 'id', objectKey: 'loginLogGrid01', dataType: ValueType.TEXT, header: { text: '번호' }, width: 10 }, // : 번호"
  { fieldName: 'userCd', name: 'userCd', objectKey: 'loginLogGrid02', dataType: ValueType.TEXT, header: { text: '로그인 ID' }, width: 20 }, // : 로그인 ID",
  { fieldName: 'userAgent', name: 'userAgent', objectKey: 'loginLogGrid03', dataType: ValueType.TEXT, header: { text: '접속 agent' } }, // : 접속 agent",
  { fieldName: 'ipAddr', name: 'ipAddr', objectKey: 'loginLogGrid04', dataType: ValueType.TEXT, header: { text: 'IP' }, width: 20 }, // : IP",
  { fieldName: 'loginAt', name: 'loginAt', objectKey: 'loginLogGrid05', dataType: ValueType.TEXT, header: { text: '로그인일시' }, width: 20 }, // : 로그인일시"
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
