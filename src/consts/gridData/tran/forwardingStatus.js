// 운송비 조회
import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'trnNum', // trnNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnSpltNum', // trnSpltNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outStatNm', // outStatNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPlnNum', // trnPlnNum
    dataType: ValueType.TEXT,
  },
  // {
  //   fieldName: 'offrNum', // offrNum
  //   dataType: ValueType.TEXT,
  // },
  {
    fieldName: 'offrItemNum', // offrItemNum
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngSoNum', // bokngSoNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnDoNum', // trnDoNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnDoItemNum', // trnDoItemNum
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'invoiceNum', // invoiceNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outTypeNm', // outTypeNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarNm', // trnCarNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarType', // trnCarNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upSiteNm', // upSiteNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custNm', // custNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custPhoneNum', // custPhoneNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trncusNm', // trncusNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarNum', // trnCarNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'driverPhoneNum', // driverPhoneNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'driverNm', // driverNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'logitsAlias', // logitsAlias
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'postNum', // postNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cityNm', // postNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'distrNm', // postNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addrDtls', // addrDtls
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'logitsPhoneNum1', // logitsPhoneNum1
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeDt', // trnHopeDt
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeTiNm', // trnHopeTiNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqAt', // trnReqAt
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqBy', // trnReqBy
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCmplAt', // trnCmplAt
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custCd', // custCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCfmAt', // trnCfmAt
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inAt', // inAt
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outAt', // outAt
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'takeOverAt', // takeOverAt
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'plntNm', // plntNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtCd', // prdtCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtNm', // prdtNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqBaseQty', // trnReqBaseQty
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'baseUnitNm', // baseUnitNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqOrdQty', // trnReqOrdQty
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'ordUnitNm', // ordUnitNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqVol', // trnReqVol
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'volUnitNm', // volUnitNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqWght', // trnReqWght
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'wghtUnitNm', // wghtUnitNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custReqRemark', // custReqRemark
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngSoItemNum', // Item No.
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngNum', // 부킹번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'itemNum', // Item No.
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'reqDt', // 배송요청일(고객)
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPsbDt', // 배송계획일(날짜).
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPsbTiNm', // 배송계획일(시간).
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inPsbDt', // 입차희망일(날짜).
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inPsbTiNm', // 입차희망일(시간).
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inExptDt', // 입차예정일(날짜).
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inExptTiNm', // 입차예정일(시간).
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnClsNm', // 배송유형
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnClsCd', // 배송유형
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: 'trnNum',
    fieldName: 'trnNum',
    header: {
      text: 'trnNum', // 배송번호
    },
    editable: false,
    visible: true,
    width: 150,
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = '';
        if (cell.value !== null) {
          str = cell.value;
          str = '<p class="underline">' + cell.value + '</p>';
        } else {
          str = '';
        }
        return str;
      },
    },
  },
  {
    name: 'trnSpltNum',
    fieldName: 'trnSpltNum',
    header: {
      text: 'trnSpltNum', // 분할번호
    },
    editable: false,
    visible: true,
  },
  {
    name: 'outStatNm',
    fieldName: 'outStatNm',
    header: {
      text: 'outStatNm', // 출고상태
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnPlnNum',
    fieldName: 'trnPlnNum',
    header: {
      text: 'trnPlnNum', // 배차계획번호
    },
    editable: false,
    visible: true,
    width: 150,
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = cell.value;
        if (str !== null && str !== undefined) {
          str = '<p class="underline">' + cell.value + '</p>';
          return str;
        }
      },
    },
  },
  // {
  //   name: 'offrNum',
  //   fieldName: 'offrNum',
  //   header: {
  //     text: 'offrNum', // 원주문번호
  //   },
  //   editable: false,
  //   visible: true,
  //   width: 150,
  // },
  {
    name: 'offrItemNum',
    fieldName: 'offrItemNum',
    header: {
      text: 'offrItemNum', // ItemNo.
    },
    editable: false,
    visible: false,
    numberFormat: '#',
  },
  {
    name: 'bokngSoNum',
    fieldName: 'bokngSoNum',
    header: {
      text: 'bokngSoNum', // SAP주문번호
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnDoNum',
    fieldName: 'trnDoNum',
    header: {
      text: 'trnDoNum', // D/O번호
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnDoItemNum',
    fieldName: 'trnDoItemNum',
    header: {
      text: 'trnDoItemNum', // D/OItemNo.
    },
    editable: false,
    visible: true,
    numberFormat: '#',
  },
  {
    name: 'invoiceNum',
    fieldName: 'invoiceNum',
    header: {
      text: 'invoiceNum', // 송장번호
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'outTypeNm',
    fieldName: 'outTypeNm',
    header: {
      text: 'outTypeNm', // 출고유형
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnCarType',
    fieldName: 'trnCarType',
    header: {
      text: 'trnCarType', // 배송형태
    },
    editable: false,
    visible: false,
  },
  {
    name: 'trnCarNm',
    fieldName: 'trnCarNm',
    header: {
      text: 'trnCarNm', // 배송형태
    },
    editable: false,
    visible: true,
  },
  {
    name: 'upSiteNm',
    fieldName: 'upSiteNm',
    header: {
      text: 'upSiteNm', // 상차지
    },
    editable: false,
    visible: true,
    styleName: 't-l',
  },
  {
    name: 'custNm',
    fieldName: 'custNm',
    header: {
      text: 'custNm', // 고객명
    },
    editable: false,
    visible: true,
    styleName: 't-l',
    width: 300,
  },
  {
    name: 'custPhoneNum',
    fieldName: 'custPhoneNum',
    header: {
      text: 'custPhoneNum', // 고객사전화번호
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'trncusNm',
    fieldName: 'trncusNm',
    header: {
      text: 'trncusNm', // 운송사
    },
    editable: false,
    visible: true,
    styleName: 't-l',
    width: 300,
  },
  {
    name: 'trnCarNum',
    fieldName: 'trnCarNum',
    header: {
      text: 'trnCarNum', // 차량번호
    },
    editable: false,
    visible: true,
    width: 150,
  },
  {
    name: 'driverPhoneNum',
    fieldName: 'driverPhoneNum',
    header: {
      text: 'driverPhoneNum', // 기사핸드폰번호
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'driverNm',
    fieldName: 'driverNm',
    header: {
      text: 'driverNm', // 기사명
    },
    editable: false,
    visible: true,
    width: 300,
    styleName: 't-l',
  },
  {
    name: 'logitsAlias',
    fieldName: 'logitsAlias',
    header: {
      text: 'logitsAlias', // 배송지명
    },
    editable: false,
    visible: true,
    width: 300,
    styleName: 't-l',
  },
  {
    name: 'postNum',
    fieldName: 'postNum',
    header: {
      text: 'postNum', // 우편번호
    },
    editable: false,
    visible: true,
  },
  {
    name: 'cityNm2',
    fieldName: 'cityNm',
    header: {
      text: 'cityNm2', // 대권역2 => 배송지권역 포함용
    },
    editable: false,
    width: 150,
    styleName: 't-l',
  },
  {
    name: 'distrNm2',
    fieldName: 'distrNm',
    header: {
      text: 'distrNm2', // 중권역2 => 배송지권역 포함용
    },
    editable: false,
    width: 150,
    styleName: 't-l',
  },
  {
    name: 'cityNm',
    fieldName: 'cityNm',
    header: {
      text: 'cityNm', // cityNm
    },
    editable: false,
    visible: true,
  },
  {
    name: 'distrNm',
    fieldName: 'distrNm',
    header: {
      text: 'distrNm', // distrNm
    },
    editable: false,
    visible: true,
  },
  {
    name: 'addrDtls',
    fieldName: 'addrDtls',
    header: {
      text: 'addrDtls', // 배송지상세주소
    },
    editable: false,
    visible: true,
    styleName: 't-l',
    width: 600,
  },
  {
    name: 'logitsPhoneNum1',
    fieldName: 'logitsPhoneNum1',
    header: {
      text: 'logitsPhoneNum1', // 배송지전화번호1
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'trnHopeDt',
    fieldName: 'trnHopeDt',
    header: {
      text: 'trnHopeDt', // 배송희망일
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnHopeTiNm',
    fieldName: 'trnHopeTiNm',
    header: {
      text: 'trnHopeTiNm', // 배송희망시간
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnReqAt',
    fieldName: 'trnReqAt',
    header: {
      text: 'trnReqAt', // 배차요청일시
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'trnReqBy',
    fieldName: 'trnReqBy',
    header: {
      text: 'trnReqBy', // 배차요청자
    },
    editable: false,
    visible: true,
    styleName: 't-l',
    width: 200,
  },
  {
    name: 'trnCmplAt',
    fieldName: 'trnCmplAt',
    header: {
      text: 'trnCmplAt', // 배차완료일시
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'custCd',
    fieldName: 'custCd',
    header: {
      text: 'custCd', // 고객코드
    },
    editable: false,
    visible: false,
    width: 200,
  },
  {
    name: 'trnCfmAt',
    fieldName: 'trnCfmAt',
    header: {
      text: 'trnCfmAt', // 배차확정일
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'inAt',
    fieldName: 'inAt',
    header: {
      text: 'inAt', // 입차일시
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'outAt',
    fieldName: 'outAt',
    header: {
      text: 'outAt', // 출차일시
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'takeOverAt',
    fieldName: 'takeOverAt',
    header: {
      text: 'takeOverAt', // takeOverAt
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'plntNm',
    fieldName: 'plntNm',
    header: {
      text: 'plntNm', // 플랜트
    },
    editable: false,
    visible: true,
    width: 150,
    styleName: 't-l',
  },
  {
    name: 'prdtCd',
    fieldName: 'prdtCd',
    header: {
      text: 'prdtCd', // 제품코드
    },
    editable: false,
    visible: true,
  },
  {
    name: 'prdtNm',
    fieldName: 'prdtNm',
    header: {
      text: 'prdtNm', // 제품명
    },
    editable: false,
    visible: true,
    styleName: 't-l',
    width: 300,
  },
  {
    name: 'trnReqBaseQty',
    fieldName: 'trnReqBaseQty',
    header: {
      text: 'trnReqBaseQty', // 수량(배송요청기본수량)
    },
    editable: false,
    visible: true,
    numberFormat: '#,##0',
    styleName: 't-r',
    width: 150,
  },
  {
    name: 'baseUnitNm',
    fieldName: 'baseUnitNm',
    header: {
      text: 'baseUnitNm', // 단위(매)
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnReqOrdQty',
    fieldName: 'trnReqOrdQty',
    header: {
      text: 'trnReqOrdQty', // 수량(배송요청주문수량)
    },
    editable: false,
    visible: true,
    numberFormat: '#,##0.###',
    styleName: 't-r',
    width: 150,
  },
  {
    name: 'ordUnitNm',
    fieldName: 'ordUnitNm',
    header: {
      text: 'ordUnitNm', // 단위(번들)
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnReqVol',
    fieldName: 'trnReqVol',
    header: {
      text: 'trnReqVol', // 부피(배송요청부피)
    },
    editable: false,
    visible: true,
    numberFormat: '#,##0.###',
    styleName: 't-r',
    width: 150,
  },
  {
    name: 'volUnitNm',
    fieldName: 'volUnitNm',
    header: {
      text: 'volUnitNm', // 단위(M3)
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnReqWght',
    fieldName: 'trnReqWght',
    header: {
      text: 'trnReqWght', // 중량(배송요청중량)
    },
    editable: false,
    visible: true,
    numberFormat: '#,##0.###',
    styleName: 't-r',
    width: 150,
  },
  {
    name: 'wghtUnitNm',
    fieldName: 'wghtUnitNm',
    header: {
      text: 'wghtUnitNm', // 단위(KG)
    },
    editable: false,
    visible: true,
  },
  {
    name: 'custReqRemark',
    fieldName: 'custReqRemark',
    header: {
      text: 'custReqRemark', // 주문특이사항
    },
    editable: false,
    visible: true,
    styleName: 't-l',
    width: 600,
  },
  {
    fieldName: 'bokngSoItemNum', // Item No.
    name: 'bokngSoItemNum',
    header: {
      text: 'Item No.', //
    },
    numberFormat: '#',
  },
  {
    fieldName: 'bokngNum', // 부킹번호
    name: 'bokngNum',
    header: {
      text: '부킹번호', //
    },
    visible: true,
  },
  {
    fieldName: 'itemNum', // Item No.
    name: 'itemNum',
    header: {
      text: 'Item No.', //
    },
    numberFormat: '#',
    visible: true,
  },
  {
    fieldName: 'reqDt', // 배송요청일(고객)
    name: 'reqDt',
    header: {
      text: '배송요청일', //
    },
  },
  {
    fieldName: 'trnPsbDt', // 배송계획일(날짜).
    name: 'trnPsbDt',
    header: {
      text: '날짜', //
    },
  },
  {
    fieldName: 'trnPsbTiNm', // 배송계획일(시간).
    name: 'trnPsbTiNm',
    header: {
      text: '시간', //
    },
  },
  {
    fieldName: 'inPsbDt', // 입차희망일(날짜).
    name: 'inPsbDt',
    header: {
      text: '날짜', //
    },
  },
  {
    fieldName: 'inPsbTiNm', // 입차희망일(시간).
    name: 'inPsbTiNm',
    header: {
      text: '시간', //
    },
  },
  {
    fieldName: 'inExptDt', // 입차예정일(날짜).
    name: 'inExptDt',
    header: {
      text: '날짜', //
    },
  },
  {
    fieldName: 'inExptTiNm', // 입차예정일(시간).
    name: 'inExptTiNm',
    header: {
      text: '시간', //
    },
  },
  {
    fieldName: 'trnClsNm', // 배송유형
    name: 'trnClsNm',
    header: {
      text: '배송유형', // 배송유형
    },
  },
  {
    fieldName: 'trnClsCd', // 배송유형
    name: 'trnClsCd',
    header: {
      text: '배송유형', // 배송유형
    },
  },
];

export const rows = [];

export const layout = [
  'trnClsNm', // 배송유형, 1
  'outTypeNm', // 출고유형, 2
  'outStatNm', // 출고상태, 3
  'bokngNum', // 부킹번호, 4
  'itemNum', // 견적품번, 5
  'bokngSoNum', // ERP S/O 번호, 6
  'bokngSoItemNum', // 부킹품번, 7
  'trnNum', // 배송요청번호, 8
  'trnSpltNum', // 분할번호, 9
  'trnPlnNum', // 출고계획번호, 10
  'offrItemNum', // 품번, 11
  // 'offrNum',
  'trnDoNum', // D/O번호, 12
  'trnDoItemNum', // D/O 아이템번호, 13
  'invoiceNum', // 송장번호, 14
  'trnCarNm', // 배송방법, 15
  'trnCarType',
  'trncusNm', // 운송사, 16
  'trnCarNum', // 차량번호, 17
  'driverNm', // 운송기사, 18
  'driverPhoneNum', // 운송기사 연락처, 19
  'reqDt', // 배송요청일(고객), 20
  {
    name: 'costDtTi', // 배송희망일
    direction: 'horizontal',
    header: {
      text: '고객 배송 요청 일시',
      tooltip: '고객 배송 요청 일시',
      showTooltip: true,
    },
    items: ['trnHopeDt', 'trnHopeTiNm'], // 날짜, 시간, 21, 22
  },
  {
    name: 'finalDtTi', // 배송계획일
    direction: 'horizontal',
    header: {
      text: '최종 배송 가능 일시',
      tooltip: '최종 배송 가능 일시',
      showTooltip: true,
    },
    items: ['trnPsbDt', 'trnPsbTiNm'], // 날짜, 시간, 23, 24
  },
  'trnReqAt', // 배차요청일, 25
  'trnReqBy', // 배차요청자, 26
  {
    name: 'hopeDtTi', // 입차희망일
    direction: 'horizontal',
    header: {
      text: '입차 희망 일시',
      tooltip: '입차 희망 일시',
      showTooltip: true,
    },
    items: ['inPsbDt', 'inPsbTiNm'], // 날짜, 시간, 27, 28
  },
  'trnCmplAt', // 배차완료일, 29
  {
    name: 'inExptDtHeader', // 입차예정일
    direction: 'horizontal',
    header: {
      text: '입차예정일 (운송사)',
      tooltip: '입차예정일 (운송사)',
      showTooltip: true,
    },
    items: ['inExptDt', 'inExptTiNm'], // 날짜, 시간, 30, 31
  },
  'trnCfmAt', // 배차확정일
  'inAt', // 입차일
  'outAt', // 출차일
  'takeOverAt', // 배송완료일
  'custCd',
  'custNm', // 고객
  'custPhoneNum', // 고객연락처
  'logitsAlias',
  'postNum',
  {
    name: 'cityDistr',
    direction: 'logitsCd',
    hideChildHeaders: false,
    header: {
      text: '배송지 권역',
      tooltip: '배송지 권역',
      showTooltip: true,
    },
    items: ['cityNm', 'distrNm'],
  },
  'addrDtls',
  'logitsPhoneNum1',
  'plntNm',
  'upSiteNm', // 상차지
  'prdtCd',
  'prdtNm',
  {
    name: 'orderUnit', // 주문단위
    direction: 'horizontal',
    expandable: false,
    header: {
      text: 'orderUnit',
      tooltip: '운송비조회 주문단위입니다',
      showTooltip: true,
    },
    items: [
      { column: 'trnReqOrdQty', groupShowMode: 'collapse' }, // 주문 === 배송요청주문수량
      { column: 'ordUnitNm', groupShowMode: 'collapse' }, // 단위 BDL
    ],
  },
  // 출고단위 === 배송요청기본수량
  {
    name: 'fowardUnit', // 출고단위
    direction: 'horizontal',
    expandable: false,
    header: {
      text: 'fowardUnit',
      tooltip: '운송비조회 출고단위입니다',
      showTooltip: true,
    },
    items: [
      { column: 'trnReqBaseQty', groupShowMode: 'collapse' }, // 기본 === 배송요청기본수량
      { column: 'baseUnitNm', groupShowMode: 'collapse' }, // 단위 매
    ],
  },
  // 부피단위 === 배송요청부피
  {
    name: 'volUnit', // 부피단위
    direction: 'horizontal',
    expandable: false,
    header: {
      text: 'volUnit',
      tooltip: '운송비조회 부피단위입니다',
      showTooltip: true,
    },
    items: [
      { column: 'trnReqVol', groupShowMode: 'collapse' }, // 부피 === 배송요청부피
      { column: 'volUnitNm', groupShowMode: 'collapse' }, // 단위 M3
    ],
  },
  // 중량단위 === 배송요청중량
  {
    name: 'wghtUnit', // 중량단위
    direction: 'horizontal',
    expandable: false,
    header: {
      text: 'wghtUnit',
      tooltip: '운송비조회 중량단위입니다',
      showTooltip: true,
    },
    items: [
      { column: 'trnReqWght', groupShowMode: 'collapse' }, // 중량 === 배송요청중량
      { column: 'wghtUnitNm', groupShowMode: 'collapse' }, // 단위 KG
    ],
  },
  'custReqRemark',

  // 주문단위 === 배송요청주문수량
];
