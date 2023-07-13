/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
export const fields = [
  {
    fieldName: 'id',
    dataType: 'text',
  },
  {
    fieldName: 'offrDtlsId',
    dataType: 'text',
  },
  {
    fieldName: 'bokngId',
    dataType: 'text',
  },
  {
    fieldName: 'bokngSoNum',
    dataType: 'text',
  },
  {
    fieldName: 'bokngSoItemNum',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnNum',
    dataType: 'text',
  },
  {
    fieldName: 'reqDt',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnReqOrdQty',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqWght',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqVol',
    dataType: 'text',
  },
  {
    fieldName: 'bokngPrdtQtyAmt',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngPrdtTotAmt',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnHopeDt',
    dataType: 'text',
  },
  {
    fieldName: 'trnHopeTi',
    dataType: 'text',
  },
  {
    fieldName: 'trnHopeTiNm',
    dataType: 'text',
  },
  {
    fieldName: 'logitsAlias',
    dataType: 'text',
  },
  {
    fieldName: 'trnCarType',
    dataType: 'text',
  },
  {
    fieldName: 'trnCarTypeNm',
    dataType: 'text',
  },
  {
    fieldName: 'cityCd',
    dataType: 'text',
  },
  {
    fieldName: 'cityNm',
    dataType: 'text',
  },
  {
    fieldName: 'distrCd',
    dataType: 'text',
  },
  {
    fieldName: 'distrNm',
    dataType: 'text',
  },
  {
    fieldName: 'postNum',
    dataType: 'text',
  },
  {
    fieldName: 'addr',
    dataType: 'text',
  },
  {
    fieldName: 'addrDtls',
    dataType: 'text',
  },
  {
    fieldName: 'logitsPhoneNum1',
    dataType: 'text',
  },
  {
    fieldName: 'logitsPhoneNum2',
    dataType: 'text',
  },
  {
    fieldName: 'logitsMngNm',
    dataType: 'text',
  },
  {
    fieldName: 'trnCarNum',
    dataType: 'text',
  },
  {
    fieldName: 'driverPhoneNum',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqRemark',
    dataType: 'text',
  },
  {
    fieldName: 'offrNum',
    dataType: 'text',
  },
  {
    fieldName: 'prdtCd',
    dataType: 'text',
  },
  {
    fieldName: 'prdtNm',
    dataType: 'text',
  },
  {
    fieldName: 'baseUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'ordUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'wghtUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'volUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'itemNum',
    dataType: 'text',
  },
  {
    fieldName: 'bokngNum',
    dataType: 'text',
  },
  {
    fieldName: 'currency', //통화
    dataType: ValueType.TEXT,
    text: 'VND',
  },
];

export const columns = [
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: 'id',
    },
  },
  {
    fieldName: 'offrDtlsId',
    name: 'offrDtlsId',
    header: {
      text: '견적 상세 ID',
    },
  },
  {
    fieldName: 'bokngId',
    name: 'bokngId',
    header: {
      text: '부킹 ID',
    },
  },
  {
    fieldName: 'bokngSoNum',
    name: 'bokngSoNum',
    header: {
      text: 'S/O NO',
    },
  },
  {
    fieldName: 'bokngSoItemNum',
    name: 'bokngSoItemNum',
    header: {
      text: '부킹 SO 아이템 번호',
    },
    numberFormat: '#',
  },
  {
    fieldName: 'trnNum',
    name: 'trnNum',
    header: {
      text: '배송 번호',
    },
  },
  {
    fieldName: 'reqDt',
    name: 'reqDt',
    header: {
      text: '요청 일',
    },
  },
  {
    fieldName: 'trnReqBaseQty',
    name: 'trnReqBaseQty',
    header: {
      text: '배송 요청 기본 수량',
    },
    numberFormat: '#,###',
    styleName: 't-r',
  },
  {
    fieldName: 'trnReqOrdQty',
    name: 'trnReqOrdQty',
    header: {
      text: ' 배송 요청 주문 수량',
    },
    styleName: 't-r',
    numberFormat: '#,###.###',
  },
  {
    fieldName: 'trnReqWght',
    name: 'trnReqWght',
    header: {
      text: '배송 요청 중량',
    },
  },
  {
    fieldName: 'trnReqVol',
    name: 'trnReqVol',
    header: {
      text: '배송 요청 부피',
    },
  },
  {
    fieldName: 'bokngPrdtQtyAmt',
    name: 'bokngPrdtQtyAmt',
    header: {
      text: '부킹 단가',
    },
    numberFormat: '#,###',
  },
  {
    fieldName: 'bokngPrdtTotAmt',
    name: 'bokngPrdtTotAmt',
    header: {
      text: '부킹 총액',
    },
    numberFormat: '#,###',
  },
  {
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: '배송 희망 일',
    },
  },
  {
    fieldName: 'trnHopeTi',
    name: 'trnHopeTi',
    header: {
      text: '배송 희망 시간',
    },
  },
  {
    fieldName: 'trnHopeTiNm',
    name: 'trnHopeTiNm',
    header: {
      text: '배송 희망 시간 명',
    },
  },
  {
    fieldName: 'logitsAlias',
    name: 'logitsAlias',
    header: {
      text: '배송지 명',
    },
  },
  {
    fieldName: 'trnCarType',
    name: 'trnCarType',
    header: {
      text: '배송 차량 유형',
    },
  },
  {
    fieldName: 'trnCarTypeNm',
    name: 'trnCarTypeNm',
    header: {
      text: '배송 차량 유형 명',
    },
  },
  {
    fieldName: 'cityCd',
    name: 'cityCd',
    header: {
      text: '시도 코드',
    },
  },
  {
    fieldName: 'cityNm',
    name: 'cityNm',
    header: {
      text: '시도 명',
    },
  },
  {
    fieldName: 'distrCd',
    name: 'distrCd',
    header: {
      text: '구군 코드',
    },
  },
  {
    fieldName: 'distrNm',
    name: 'distrNm',
    header: {
      text: '구군 명',
    },
  },
  {
    fieldName: 'distrNm',
    name: 'postNum',
    header: {
      text: '우편 번호',
    },
  },
  {
    fieldName: 'addr',
    name: 'addr',
    header: {
      text: '주소',
    },
  },
  {
    fieldName: 'addrDtls',
    name: 'addrDtls',
    header: {
      text: '주소 상세',
    },
  },
  {
    fieldName: 'logitsPhoneNum1',
    name: 'logitsPhoneNum1',
    header: {
      text: '배송지 전화 번호1',
    },
  },
  {
    fieldName: 'logitsPhoneNum2',
    name: 'logitsPhoneNum2',
    header: {
      text: '배송지 전화 번호2',
    },
  },
  {
    fieldName: 'logitsMngNm',
    name: 'logitsMngNm',
    header: {
      text: '배송지 담당 명',
    },
  },
  {
    fieldName: 'trnCarNum',
    name: 'trnCarNum',
    header: {
      text: '배송 차량 번호',
    },
  },
  {
    fieldName: 'driverPhoneNum',
    name: 'driverPhoneNum',
    header: {
      text: '기사 전화 번호',
    },
  },
  {
    fieldName: 'trnReqRemark',
    name: 'trnReqRemark',
    header: {
      text: '배송 요청 코멘트',
    },
  },
  {
    fieldName: 'offrNum',
    name: 'offrNum',
    header: {
      text: '주문번호',
    },
  },
  {
    fieldName: 'prdtCd',
    name: 'prdtCd',
    header: {
      text: '제품코드',
    },
  },
  {
    fieldName: 'prdtNm',
    name: 'prdtNm',
    header: {
      text: '제품명',
    },
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm',
    header: {
      text: '기본 단위 명',
    },
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnitNm',
    header: {
      text: '주문 단위 명',
    },
  },
  {
    fieldName: 'wghtUnitNm',
    name: 'wghtUnitNm',
    header: {
      text: '무게 단위 명',
    },
  },
  {
    fieldName: 'volUnitNm',
    name: 'volUnitNm',
    header: {
      text: '부피 단위 명',
    },
  },
  {
    fieldName: 'itemNum',
    name: 'itemNum',
    header: {
      text: '주문 아이템 번호',
    },
  },
  {
    fieldName: 'bokngNum',
    name: 'bokngNum',
    header: {
      text: '부킹 번호',
    },
  },
  {
    fieldName: 'currency',
    name: 'currency',
    header: {
      text: '통화',
    },
  },
];

export const layout = ['trnNum', 'bokngSoItemNum', 'prdtCd', 'prdtNm', 'trnReqBaseQty', 'baseUnitNm', 'trnReqOrdQty', 'ordUnitNm', 'bokngPrdtQtyAmt', 'currency', 'bokngPrdtTotAmt'];
