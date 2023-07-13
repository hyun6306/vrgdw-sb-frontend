/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'offrId', name: 'offrId', dataType: ValueType.TEXT, header: { text: 'offrId' }, visible: false }, // : 주문유형"
  { fieldName: 'offrClsNm', name: 'offrClsNm', dataType: ValueType.TEXT, header: { text: '주문유형' } }, // : 주문유형"
  { fieldName: 'custPoNum', name: 'custPoNum', dataType: ValueType.TEXT, header: { text: 'P/O NO.' } }, // : P/O NO.",
  { fieldName: 'offrNum', name: 'offrNum', dataType: ValueType.TEXT, header: { text: '견적번호' } }, // : P/O NO.",
  { fieldName: 'totItemCnt', name: 'totItemCnt', dataType: ValueType.TEXT, header: { text: '총제품수' }, styleName: 't-r' }, // : 총제품수",
  { fieldName: 'bokngCfmCnt', name: 'bokngCfmCnt', dataType: ValueType.TEXT, header: { text: '부킹확정건수(제품)' }, styleName: 't-r' }, // : 부킹확정건수(제품)",
  { fieldName: 'bokngIngCnt', name: 'bokngIngCnt', dataType: ValueType.TEXT, header: { text: '진행상태건수' }, styleName: 't-r' }, // : 진행상태건수",
  { fieldName: 'bokngEndCnt', name: 'bokngEndCnt', dataType: ValueType.TEXT, header: { text: '완료건수' }, styleName: 't-r' }, // : 완료건수",
  { fieldName: 'trnHopeDt', name: 'trnHopeDt', dataType: ValueType.TEXT, header: { text: '배송요청희망일' } }, // : 배송요청희망일",
  { fieldName: 'logitsAlias', name: 'logitsAlias', dataType: ValueType.TEXT, header: { text: '배송지명' }, styleName: 't-l' }, // : 배송지명",
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

export const layout = ['offrClsNm', 'custPoNum', 'offrNum', 'totItemCnt', 'bokngCfmCnt', 'bokngIngCnt', 'bokngEndCnt', 'trnHopeDt', 'logitsAlias'];
