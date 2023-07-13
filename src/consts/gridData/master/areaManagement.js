/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'cdLvl', name: 'cdLvl', header: { text: 'cdLvl' }, visible: false, dataType: ValueType.TEXT },
  { fieldName: 'groupCd', name: 'groupCd', header: { text: '분류코드' }, visible: false, editable: false, dataType: ValueType.TEXT },
  { fieldName: 'groupNm', name: 'groupNm', header: { text: '분류명' }, visible: false, editable: false, dataType: ValueType.TEXT },
  { fieldName: 'prntCd', name: 'prntCd', header: { text: '상위코드' }, visible: false, editable: false, dataType: ValueType.TEXT },

  { fieldName: 'code', name: 'code', header: { text: '코드' }, editable: true, dataType: ValueType.TEXT, objectKey: 'areaMngGrid01', width: 50 },
  { fieldName: 'korCdNm', name: 'korCdNm', header: { text: '한국' }, editable: true, dataType: ValueType.TEXT, objectKey: 'areaMngGrid02' },
  { fieldName: 'engCdNm', name: 'engCdNm', header: { text: '영어' }, editable: true, dataType: ValueType.TEXT, objectKey: 'areaMngGrid03' },
  { fieldName: 'vnmCdNm', name: 'vnmCdNm', header: { text: '베트남' }, editable: true, dataType: ValueType.TEXT, objectKey: 'areaMngGrid04' },
  { fieldName: 'sort', name: 'sort', header: { text: '정렬' }, editable: true, dataType: ValueType.TEXT, objectKey: 'areaMngGrid05', width: 50 },
  {
    fieldName: 'useYn',
    name: 'useYn',
    renderer: { type: 'check', trueValues: 'Y', falseValues: 'N' },
    header: { text: '사용여부' },
    dataType: ValueType.TEXT,
    objectKey: 'areaMngGrid06',
    width: 50,
  },
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
