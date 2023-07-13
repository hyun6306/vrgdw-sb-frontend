/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
const _columns = [
  { fieldName: 'id', name: 'id', dataType: ValueType.NUMBER, header: { text: '번호' }, visible: false }, // : 번호"
  { fieldName: 'trnNum', name: 'trnNum', dataType: ValueType.TEXT, header: { text: '배송번호' } }, // : 배송번호"
  { fieldName: 'trnCarType', name: 'trnCarType', dataType: ValueType.TEXT, header: { text: '배송방법' } }, // : 배송방법"
  { fieldName: 'salseMngNm', name: 'salseMngNm', dataType: ValueType.TEXT, header: { text: '영업사원' } }, // : 영업사원"
  { fieldName: 'plntNm', name: 'plntNm', dataType: ValueType.TEXT, header: { text: '플랜트' } }, // : 플랜트"
  { fieldName: 'trnSpltNum', name: 'trnSpltNum', dataType: ValueType.TEXT, header: { text: '분할번호' } }, // : 분할번호"
  { fieldName: 'bokngNum', name: 'bokngNum', dataType: ValueType.TEXT, header: { text: '부킹번호' } }, // : 부킹번호
  { fieldName: 'itemNum', name: 'itemNum', dataType: ValueType.NUMBER, header: { text: 'Item No.' }, numberFormat: '#' }, // : Item No.
  { fieldName: 'offrNum', name: 'offrNum', dataType: ValueType.TEXT, header: { text: '주문번호' }, visible: false }, // : 주문번호
  { fieldName: 'bokngSoNum', name: 'bokngSoNum', dataType: ValueType.TEXT, header: { text: 'SAP주문번호' } }, // : SAP주문번호
  { fieldName: 'bokngSoItemNum', name: 'bokngSoItemNum', dataType: ValueType.NUMBER, header: { text: 'Item No.' }, numberFormat: '#' }, // : Item No.
  { fieldName: 'trnDoNum', name: 'trnDoNum', dataType: ValueType.TEXT, header: { text: 'D/O번호' } }, // : D/O번호
  { fieldName: 'trnClsNm', name: 'trnClsNm', dataType: ValueType.TEXT, header: { text: '배송유형' } }, // : 배송유형
  { fieldName: 'trnHopeDt', name: 'trnHopeDt', dataType: ValueType.TEXT, header: { text: '배송희망일' } }, // : 배송희망일
  { fieldName: 'trnHopeTiNm', name: 'trnHopeTiNm', dataType: ValueType.TEXT, header: { text: '배송희망시간' } }, // : 배송희망시간
  { fieldName: 'upSiteNm', name: 'upSiteNm', dataType: ValueType.TEXT, header: { text: '상차지' }, styleName: 't-l' }, // : 상차지"
  { fieldName: 'poRegStaffNm', name: 'poRegStaffNm', dataType: ValueType.TEXT, header: { text: 'PO생성자' }, styleName: 't-l' }, // : PO생성자
  { fieldName: 'custCd', name: 'custCd', dataType: ValueType.TEXT, header: { text: '고객코드' } }, // : 고객코드
  { fieldName: 'custNm', name: 'custNm', dataType: ValueType.TEXT, header: { text: '고객명' }, styleName: 't-l' }, // : 고객명"
  { fieldName: 'logitsAlias', name: 'logitsAlias', dataType: ValueType.TEXT, header: { text: '배송지명' }, styleName: 't-l' }, // : 배송지명
  { fieldName: 'postNum', name: 'postNum', dataType: ValueType.TEXT, header: { text: '우편번호' } }, // : 우편번호
  { fieldName: 'cityNm', name: 'cityNm', dataType: ValueType.TEXT, header: { text: '대권역' }, styleName: 't-l' }, // : 대권역"
  { fieldName: 'distrNm', name: 'distrNm', dataType: ValueType.TEXT, header: { text: '중권역' }, styleName: 't-l' }, // : 중권역"
  { fieldName: 'addr', name: 'addr', dataType: ValueType.TEXT, header: { text: '주소' }, styleName: 't-l', width: 200 }, // : 주소"
  { fieldName: 'logitsPhoneNum1', name: 'logitsPhoneNum1', dataType: ValueType.TEXT, header: { text: '연락처' } }, // : 연락처
  { fieldName: 'compCd', name: 'compCd', dataType: ValueType.TEXT, header: { text: '사업부' }, visible: false }, // : 사업부
  { fieldName: 'prdtCd', name: 'prdtCd', dataType: ValueType.TEXT, header: { text: '제품코드' } }, // : 제품코드"
  { fieldName: 'prdtNm', name: 'prdtNm', dataType: ValueType.TEXT, header: { text: '제품명' }, styleName: 't-l', width: 200 }, // : 제품명"
  { fieldName: 'ordUnitNm', name: 'ordUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 단위"
  { fieldName: 'trnReqOrdQty', name: 'trnReqOrdQty', dataType: ValueType.NUMBER, header: { text: '수량' }, styleName: 't-r', numberFormat: '#,###.###' }, // : 수량"
  { fieldName: 'baseUnitNm', name: 'baseUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 단위"
  { fieldName: 'trnReqBaseQty', name: 'trnReqBaseQty', dataType: ValueType.NUMBER, header: { text: '수량' }, styleName: 't-r', numberFormat: '#,###.###' }, // : 수량"
  { fieldName: 'volUnitNm', name: 'volUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 단위"
  { fieldName: 'trnReqVol', name: 'trnReqVol', dataType: ValueType.NUMBER, header: { text: '부피' }, styleName: 't-r', numberFormat: '#,###.###' }, // : 부피"
  { fieldName: 'wghtUnitNm', name: 'wghtUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 단위"
  { fieldName: 'trnReqWght', name: 'trnReqWght', dataType: ValueType.NUMBER, header: { text: '중량' }, styleName: 't-r', numberFormat: '#,###.###' }, // : 중량"
  { fieldName: 'trnReqRemark', name: 'trnReqRemark', dataType: ValueType.TEXT, header: { text: '특이사항' }, styleName: 't-l', width: 200 }, // : 특이사항"
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
  'trnClsNm', // 배송유형, 1
  'trnCarType', // 배송방법, 2
  'salseMngNm', // 영업사원, 3
  'custCd', // 고객코드, 4
  'custNm', // 고객, 5
  'logitsAlias', // 배송지, 6
  'postNum', // 우편번호, 7
  {
    name: 'cityDistr', // 주소
    direction: 'horizontal',
    hideChildHeaders: false,
    header: {
      text: '주소지권역',
      tooltip: '주소지권역',
    },
    items: ['cityNm', 'distrNm'], // 대권역, 중권역, 8, 9
  },
  'addr', // 주소, 10
  'logitsPhoneNum1', // 연락처, 11
  'trnReqRemark', // 특이사항, 12
  {
    name: 'trnHopeHeader', // 배송희망일(고객)
    direction: 'horizontal',
    hideChildHeaders: false,
    header: {
      text: '배송희망일 (고객)',
      tooltip: '배송희망일 (고객)',
    },
    items: ['trnHopeDt', 'trnHopeTiNm'], // 날짜, 시간, 13, 14
  },
  'plntNm', // 플랜트, 15
  'upSiteNm', // 상차지, 16
  'prdtCd', // 제품코드, 17
  'prdtNm', // 제품명, 18

  {
    name: 'forwardingOrd', // 주문단위
    direction: 'forwardingOrd',
    header: {
      text: '출고주문단위',
    },
    items: ['trnReqOrdQty', 'ordUnitNm'], // 수량, 단위, 19, 20
  },
  {
    name: 'forwardingBase', // 기본단위
    direction: 'forwardingBase',

    header: {
      text: '출고기본단위',
    },
    items: ['trnReqBaseQty', 'baseUnitNm'], // 수량, 단위, 21, 22
  },
  {
    name: 'forwardingVol', // 부피단위
    direction: 'forwardingVol',
    header: {
      text: '부피단위',
    },
    items: ['trnReqVol', 'volUnitNm'], // 수량, 단위, 23, 24
  },
  {
    name: 'forwardingWght', // 중량단위
    direction: 'forwardingWght',
    header: {
      text: '중량단위',
    },
    items: ['trnReqWght', 'wghtUnitNm'], // 수량, 단위, 25, 26
  },
  'bokngNum', // 부킹번호, 27
  'bokngSoItemNum', // 아이템번호, 28
  'bokngSoNum', // ERP 주문 번호, 29
  'itemNum', // 아이템번호, 30
  'trnNum', // 배송요청번호, 31
  'trnSpltNum', // 분할번호, 32
  'trnDoNum', // D/O번호, 33
  'poRegStaffNm', // P/O 생성자, 34
  'compCd',
  'offrNum',
];
