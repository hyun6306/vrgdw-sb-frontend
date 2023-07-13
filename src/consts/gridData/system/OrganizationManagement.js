/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'deptNm', name: 'deptNm', dataType: ValueType.TEXT, header: { text: '부서 명' }, width: 300, visible: true, objectKey: 'OrganizationMngGrid01' },
  { fieldName: 'deptCd', name: 'deptCd', dataType: ValueType.TEXT, header: { text: '부서 코드' }, width: 150, visible: true, objectKey: 'OrganizationMngGrid02' },

  { fieldName: 'comNm', name: 'comNm', dataType: ValueType.TEXT, header: { text: '회사 명' }, width: 150, visible: true, objectKey: 'OrganizationMngGrid03' },
  { fieldName: 'comCd', name: 'comCd', dataType: ValueType.TEXT, header: { text: '회사 코드' }, width: 150, visible: true, objectKey: 'OrganizationMngGrid04' },
  { fieldName: 'managerNm', name: 'managerNm', dataType: ValueType.TEXT, header: { text: '매니저 명' }, width: 150, visible: true, objectKey: 'OrganizationMngGrid05' },
  { fieldName: 'managerId', name: 'managerId', dataType: ValueType.TEXT, header: { text: '매니저 ID' }, width: 100, visible: true, objectKey: 'OrganizationMngGrid06' },
  { fieldName: 'useYn', name: 'useYn', dataType: ValueType.TEXT, header: { text: '사용 Y/N' }, width: 60, visible: true, objectKey: 'OrganizationMngGrid07' },
  { fieldName: 'cvt_updatedAt', name: 'updatedAt', dataType: ValueType.TEXT, header: { text: '수정 일시' }, width: 150, visible: true, objectKey: 'OrganizationMngGrid08' },
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
