/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'custNm', name: 'custNm', dataType: ValueType.TEXT, header: { text: '고객사명' }, styleName: 't-l', width: 200 }, // : 고객사명"
  { fieldName: 'offrClsNm', name: 'offrClsNm', dataType: ValueType.TEXT, header: { text: '진행상태' } }, // : 진행상태",
  { fieldName: 'offrNum', name: 'offrNum', dataType: ValueType.TEXT, header: { text: '견적번호' } }, // : 견적번호",
  { fieldName: 'totItemCnt', name: 'totItemCnt', dataType: ValueType.TEXT, header: { text: '총제품수' }, styleName: 't-r' }, // : 총제품수",
  { fieldName: 'bokngCfmCnt', name: 'bokngCfmCnt', dataType: ValueType.TEXT, header: { text: '총부킹확정건수' }, styleName: 't-r' }, // : 총부킹확정건수",
  { fieldName: 'bokngIngCnt', name: 'bokngIngCnt', dataType: ValueType.TEXT, header: { text: '진행상태건수' }, styleName: 't-r' }, // : 진행상태건수",
  { fieldName: 'bokngEndCnt', name: 'bokngEndCnt', dataType: ValueType.TEXT, header: { text: '완료건수' }, styleName: 't-r' }, // : 완료건수",
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

export const layout = ['custNm', 'offrClsNm', 'offrNum', 'totItemCnt', 'bokngCfmCnt', 'bokngIngCnt', 'bokngEndCnt'];
