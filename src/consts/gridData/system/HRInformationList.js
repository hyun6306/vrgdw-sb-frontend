/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'parentCd', name: 'parentCd', dataType: ValueType.TEXT, header: { text: '상위 부서코드' }, width: 10, visible: false },
  { fieldName: 'deptCd', name: 'deptCd', dataType: ValueType.TEXT, header: { text: '조직코드' }, width: 10, visible: false },
  { fieldName: 'deptNm', name: 'deptNm', dataType: ValueType.TEXT, header: { text: '조직 명' }, width: 300, visible: true, objectKey: 'HRInformationGrid01' },
  { fieldName: 'userNm', name: 'userNm', dataType: ValueType.TEXT, header: { text: '사용자 명' }, width: 150, visible: true, objectKey: 'HRInformationGrid02' },
  { fieldName: 'empNum', name: 'empNum', dataType: ValueType.TEXT, header: { text: '사용자 ID' }, width: 150, visible: true, objectKey: 'HRInformationGrid03' },
  { fieldName: 'dutyCd', name: 'dutyCd', dataType: ValueType.TEXT, header: { text: '그룹코드' }, width: 10, visible: false },
  { fieldName: 'dutyNm', name: 'dutyNm', dataType: ValueType.TEXT, header: { text: '사용자 그룹' }, width: 100, visible: true, objectKey: 'HRInformationGrid04' },
  { fieldName: 'email', name: 'email', dataType: ValueType.TEXT, header: { text: 'E-Mail' }, width: 200, visible: true, objectKey: 'HRInformationGrid05' },
  { fieldName: 'mobileNum', name: 'mobileNum', dataType: ValueType.TEXT, header: { text: '연락처' }, width: 150, visible: true, objectKey: 'HRInformationGrid06' },
  { fieldName: 'useYn', name: 'useYn', dataType: ValueType.TEXT, header: { text: '사용 Y/N' }, width: 60, visible: true, objectKey: 'HRInformationGrid07' },
  { fieldName: 'updatedAt', name: 'updatedAt', dataType: ValueType.DATETIME, header: { text: '수신일시' }, width: 150, visible: true, datetimeFormat: 'dd-MM-yyyy HH:mm:ss', objectKey: 'HRInformationGrid08' },
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
