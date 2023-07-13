/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'id', name: 'id', objectKey: 'scheduleLogGrid01', dataType: ValueType.TEXT, header: { text: 'ID' }, width: 10 },
  { fieldName: 'schCd', name: 'schCd', objectKey: 'scheduleLogGrid02', dataType: ValueType.TEXT, header: { text: '스케줄 코드' }, width: 40 },
  { fieldName: 'schCdNm', name: 'schCdNm', objectKey: 'scheduleLogGrid03', dataType: ValueType.TEXT, header: { text: '스케줄 명' } },
  { fieldName: 'sttDt', name: 'sttDt', objectKey: 'scheduleLogGrid04', dataType: ValueType.TEXT, header: { text: '시작일' }, width: 20 },
  { fieldName: 'delayMi', name: 'delayMi', objectKey: 'scheduleLogGrid05', dataType: ValueType.TEXT, header: { text: '지연시간' }, width: 20 },
  { fieldName: 'scssYn', name: 'scssYn', objectKey: 'scheduleLogGrid06', dataType: ValueType.TEXT, header: { text: '성공여부' }, width: 20 },
  { fieldName: 'updatedAt', name: 'updatedAt', objectKey: 'scheduleLogGrid07', dataType: ValueType.TEXT, header: { text: '수정일' }, width: 20 },
  { fieldName: 'updatedByNm', name: 'updatedByNm', objectKey: 'scheduleLogGrid08', dataType: ValueType.TEXT, header: { text: '수정자' }, width: 20 },
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
