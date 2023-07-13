/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
export const fields = [
  {
    fieldName: 'offrNum', //견적번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'itemNum', //아이템번호
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngSoNum', //S/O NO
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngNum', //부킹번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtCd', //제품코드
    ddataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtNm', //제품명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'exptStatNm', //예탁구분
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'exptStatCd', //예탁구분
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPsbOrdQty', //배송가능수량-주문
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'ordUnitNm', //단위-주문
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPsbBaseQty', //배송가능수량-기본
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'baseUnitNm', //단위-기본
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngBaseQty', //부킹량 (부킹 기본 수량)
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'outBaseQty', //출고 요청 수량
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngPrdtQtyAmt', //부킹단가
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'currency', //통화
    dataType: ValueType.TEXT,
    text: 'VND',
  },
  {
    fieldName: 'bokngOffrPrice', //부킹금액
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'vatRate', //Vat(%)
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngOffrVat', //Vat
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'prdtClsCd', //요청품목
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'id', //부킹 ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custId', //고객 ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrClsCd', //견적 구분
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrDtlsId', //견적 상세 ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngSoItemNum', //부킹 SO ITEM 번호
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'custPoNum', //분모
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'offrNum',
    name: 'offrNum',
    header: {
      text: '견적번호',
    },
    editable: false,
  },
  {
    fieldName: 'itemNum',
    name: 'itemNum',
    header: {
      text: '아이템번호',
    },
    numberFormat: '#',
    visible: false,
  },
  {
    fieldName: 'bokngSoNum',
    name: 'bokngSoNum',
    header: {
      text: 'S/O NO',
    },
    editable: false,
  },
  {
    fieldName: 'bokngNum',
    name: 'bokngNum',
    header: {
      text: '부킹번호',
    },
    editable: false,
  },
  {
    fieldName: 'prdtCd',
    name: 'prdtCd',
    header: {
      text: '제품코드',
    },
    editable: false,
  },
  {
    fieldName: 'prdtNm',
    name: 'prdtNm',
    header: {
      text: '제품명',
    },
    width: 350,
    styleName: 't-l',
    editable: false,
  },
  {
    fieldName: 'exptStatNm',
    name: 'exptStatNm',
    header: {
      text: '예탁구분',
    },
    editable: false,
  },
  {
    fieldName: 'exptStatCd',
    name: 'exptStatCd',
    header: {
      text: 'exptStatCd',
    },
    visible: false,
  },
  {
    fieldName: 'trnPsbOrdQty',
    name: 'trnPsbOrdQty',
    header: {
      text: '배송가능수량 주문수량',
    },
    styleName: 't-r',
    numberFormat: '#,###.###',
    editable: false,
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnitNm',
    header: {
      text: '단위',
    },
    width: 70,
    editable: false,
  },
  {
    fieldName: 'trnPsbBaseQty',
    name: 'trnPsbBaseQty',
    header: {
      text: '배송가능수량 기본수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm1',
    header: {
      text: '단위',
    },
    width: 70,
    editable: false,
  },
  {
    fieldName: 'bokngBaseQty',
    name: 'bokngBaseQty',
    header: {
      text: 'bokngBaseQty',
    },
    visible: false,
  },
  {
    fieldName: 'outBaseQty',
    name: 'outBaseQty',
    header: {
      text: '출고 요청 수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm2',
    header: {
      text: '단위',
    },
    width: 70,
    editable: false,
  },
  {
    fieldName: 'bokngPrdtQtyAmt',
    name: 'bokngPrdtQtyAmt',
    header: {
      text: '부킹단가',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
    editable: false,
  },
  {
    fieldName: 'currency',
    name: 'currency',
    header: {
      text: '통화',
    },
    editable: false,
  },
  {
    fieldName: 'bokngOffrPrice',
    name: 'bokngOffrPrice',
    header: {
      text: '금액',
    },
    numberFormat: '#,##0',
    editable: false,
  },
  {
    fieldName: 'vatRate',
    name: 'vatRate',
    header: {
      text: 'vatRate',
    },
    visible: false,
  },
  {
    fieldName: 'bokngOffrVat',
    name: 'bokngOffrVat',
    header: {
      text: 'bokngOffrVat',
    },
    visible: false,
  },
  {
    fieldName: 'prdtClsCd',
    name: 'prdtClsCd',
    header: {
      text: 'prdtClsCd',
    },
    visible: false,
  },
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: 'id',
    },
    visible: false,
  },
  {
    fieldName: 'custId',
    name: 'custId',
    header: {
      text: 'custId',
    },
    visible: false,
  },
  {
    fieldName: 'offrClsCd',
    name: 'offrClsCd',
    header: {
      text: 'offrClsCd',
    },
    visible: false,
  },
  {
    fieldName: 'offrDtlsId',
    name: 'offrDtlsId',
    header: {
      text: 'offrDtlsId',
    },
    visible: false,
  },
  {
    fieldName: 'bokngSoItemNum',
    name: 'bokngSoItemNum',
    header: {
      text: 'bokngSoItemNum',
    },
    numberFormat: '#',
    visible: false,
  },
  {
    fieldName: 'custPoNum',
    name: 'custPoNum',
    header: {
      text: 'custPoNum',
    },
    visible: false,
  },
];

export const layout = ['offrNum', 'itemNum', 'bokngSoNum', 'bokngNum', 'prdtCd', 'prdtNm', 'exptStatCd', 'exptStatNm', 'trnPsbOrdQty', 'ordUnitNm', 'trnPsbBaseQty', 'baseUnitNm1', 'bokngBaseQty', 'outBaseQty', 'baseUnitNm2', 'bokngPrdtQtyAmt', 'currency', 'bokngOffrPrice', 'vatRate', 'bokngOffrVat', 'prdtClsCd', 'id', 'custId', 'offrClsCd', 'offrDtlsId', 'bokngSoItemNum', 'custPoNum'];
