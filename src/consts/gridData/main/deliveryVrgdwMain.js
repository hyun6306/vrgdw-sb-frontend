/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'custNm', name: 'custNm', dataType: ValueType.TEXT, header: { text: '고객사명' }, styleName: 't-l', width: 285 }, // : 고객사명"
  { fieldName: 'trnPlnNum', name: 'trnPlnNum', dataType: ValueType.TEXT, header: { text: '배차계획번호' } }, // : 배차계획번호",
  { fieldName: 'trnStatNm', name: 'trnStatNm', dataType: ValueType.TEXT, header: { text: '배송상태' } }, // : 배송상태",
  { fieldName: 'trnReqVol', name: 'trnReqVol', dataType: ValueType.NUMBER, header: { text: '부피' }, styleName: 't-r', numberFormat: '#,##0.###' }, // : 부피",
  { fieldName: 'trnCarTypeNm', name: 'trnCarTypeNm', dataType: ValueType.TEXT, header: { text: '배송방법' } }, // : 배송방법",
  { fieldName: 'logitsAlias', name: 'logitsAlias', dataType: ValueType.TEXT, header: { text: '배송지명' }, styleName: 't-l', width: 150 }, // : 배송지명",
  { fieldName: 'reqDt', name: 'reqDt', dataType: ValueType.TEXT, header: { text: '배송요청일' } }, // : 배송요청일",
  { fieldName: 'outDt', name: 'outDt', dataType: ValueType.TEXT, header: { text: '배송출발일' } }, // : 배송출발일",
  { fieldName: 'takeOverDt', name: 'takeOverDt', dataType: ValueType.TEXT, header: { text: '배송완료일' } }, // : 배송완료일",
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

export const layout = ['custNm', 'trnPlnNum', 'trnStatNm', 'trnReqVol', 'trnCarTypeNm', 'logitsAlias', 'reqDt', 'outDt', 'takeOverDt'];
