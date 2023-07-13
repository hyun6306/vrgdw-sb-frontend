/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
const _columns = [
  { fieldName: 'id', name: 'id', dataType: ValueType.NUMBER, header: { text: '번호' }, visible: false }, // : 번호"
  { fieldName: 'upSiteNm', name: 'upSiteNm', dataType: ValueType.TEXT, header: { text: '상차지' }, styleName: 't-l' }, // : 상차지"
  { fieldName: 'logitsAlias', name: 'logitsAlias', dataType: ValueType.TEXT, header: { text: '배송지' }, styleName: 't-l' }, // : 배송지"
  { fieldName: 'postNum', name: 'postNum', dataType: ValueType.TEXT, header: { text: '우편번호' }, styleName: 't-c' }, // : 우편번호"
  { fieldName: 'plntNm', name: 'plntNm', dataType: ValueType.TEXT, header: { text: '플랜트' } }, // : 플랜트"
  { fieldName: 'custNm', name: 'custNm', dataType: ValueType.TEXT, header: { text: '고객명' }, styleName: 't-l' }, // : 고객명"
  { fieldName: 'cityNm', name: 'cityNm', dataType: ValueType.TEXT, header: { text: '대권역' }, styleName: 't-l' }, // : 대권역"
  { fieldName: 'distrNm', name: 'distrNm', dataType: ValueType.TEXT, header: { text: '중권역' }, styleName: 't-l' }, // : 중권역"
  { fieldName: 'prdtNm', name: 'prdtNm', dataType: ValueType.TEXT, header: { text: '제품명' }, styleName: 't-l', width: 200 }, // : 제품명"
  { fieldName: 'trnReqRemark', name: 'trnReqRemark', dataType: ValueType.TEXT, header: { text: '특이사항' }, styleName: 't-l', width: 200 }, // : 특이사항"
  { fieldName: 'ordUnitNm', name: 'ordUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 단위"
  { fieldName: 'trnReqOrdQty', name: 'trnReqOrdQty', dataType: ValueType.NUMBER, header: { text: '수량' }, styleName: 't-r', numberFormat: '#,###.###' }, // : 수량"
  { fieldName: 'baseUnitNm', name: 'baseUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 단위"
  { fieldName: 'trnReqBaseQty', name: 'trnReqBaseQty', dataType: ValueType.NUMBER, header: { text: '수량' }, styleName: 't-r', numberFormat: '#,###.###' }, // : 수량"
  { fieldName: 'volUnitNm', name: 'volUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 단위"
  { fieldName: 'trnReqVol', name: 'trnReqVol', dataType: ValueType.NUMBER, header: { text: '부피' }, styleName: 't-r', numberFormat: '#,###.###' }, // : 부피"
  { fieldName: 'wghtUnitNm', name: 'wghtUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 단위"
  { fieldName: 'trnReqWght', name: 'trnReqWght', dataType: ValueType.NUMBER, header: { text: '중량' }, styleName: 't-r', numberFormat: '#,###.###' }, // : 중량"
  { fieldName: 'addr', name: 'addr', dataType: ValueType.TEXT, header: { text: '상세주소' }, styleName: 't-l', width: 200 }, // : 상세주소"
  { fieldName: 'custCd', name: 'custCd', dataType: ValueType.TEXT, header: { text: '고객코드' } }, // : 고객코드"
  { fieldName: 'prdtCd', name: 'prdtCd', dataType: ValueType.TEXT, header: { text: '제품코드' } }, // : 제품코드"
  { fieldName: 'trnNum', name: 'trnNum', dataType: ValueType.TEXT, header: { text: '배송번호' } }, // : 배송번호"
  { fieldName: 'trnSpltNum', name: 'trnSpltNum', dataType: ValueType.TEXT, header: { text: '분할번호' } }, // : 분할번호"
  { fieldName: 'compCd', name: 'compCd', dataType: ValueType.TEXT, header: { text: '사업부코드' }, visible: false }, // : 사업부코드"
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

export const layout = [
  'id',
  'custCd', // 고객코드, 1
  'custNm', // 고객, 2
  'logitsAlias', // 배송지, 3
  'postNum', // 우편번호, 4
  {
    name: 'cityDistr', // 주소
    direction: 'horizontal',
    hideChildHeaders: false,
    header: {
      text: '주소지권역',
      tooltip: '주소지권역',
    },
    items: ['cityNm', 'distrNm'], // 대권역, 중권역, 5, 6
  },
  'addr', // 주소, 7
  'trnReqRemark', // 특이사항, 8
  'plntNm', // 플랜트, 9
  'upSiteNm', // 상차지. 10
  'prdtCd', // 제품코드, 11
  'prdtNm', // 제품명, 12
  {
    name: 'forwardingOrd', // 주문단위
    direction: 'forwardingOrd',
    header: {
      text: '출고주문단위',
    },
    items: ['trnReqOrdQty', 'ordUnitNm'], // 수량, 단위, 13, 14
  },
  {
    name: 'forwardingBase', // 기본단위
    direction: 'forwardingBase',

    header: {
      text: '출고기본단위',
    },
    items: ['trnReqBaseQty', 'baseUnitNm'], // 수량, 단위, 15, 16
  },
  {
    name: 'forwardingVol', // 부피단위
    direction: 'forwardingVol',
    header: {
      text: '부피단위',
    },
    items: ['trnReqVol', 'volUnitNm'], // 수량, 단위, 17, 18
  },
  {
    name: 'forwardingWght', // 중량단위
    direction: 'forwardingWght',
    header: {
      text: '중량단위',
    },
    items: ['trnReqWght', 'wghtUnitNm'], // 수량, 단위, 19, 20
  },
  'trnNum', // 배송요청번호, 21
  'trnSpltNum', // 분할번호, 22
  'compCd',
];
