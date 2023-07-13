// 운송비 조회
import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'id', // ID
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'offrDtlsId', // offrDtlsId
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngId', // bokngId
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'deliveryCloseId', // deliveryCloseId
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'closeYn', // closeYn
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'modiYn', // modiYn
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trncusId', // trncusId
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trncusNm', // trncusNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCfmDt', // trnCfmDt
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outDt', // outDt
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPlnNum', // trnPlnNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outTypeNm', // outTypeNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarNum', // trnCarNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'deliCarTypeCd', // deliCarTypeCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'deliCarTypeNm', // deliCarTypeNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outTypeCd', // outTypeCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'totTrnPrice', // totTrnPrice
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'areaPriceAmt', // areaPriceAmt
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'etcTrnPriceAmt', // etcTrnPriceAmt
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnNum', // trnNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnSpltNum', // trnSpltNum
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'offrNum', // offrNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrItemNum', // offrItemNum
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngSoNum', // bokngSoNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngNum', // bokngNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'itemNum', // itemNum
    dataType: ValueType.NUMBER,
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
    fieldName: 'procesResult', // procesResult
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnClsCd', // trnClsCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnClsNm', // trnClsNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeDt', // trnHopeDt
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeTi', // trnHopeTi
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeTiNm', // trnHopeTiNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upSiteCd', // upSiteCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upSiteNm', // upSiteNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'poRegStaffNm', // poRegStaffNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custNm', // custNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custCd', // custCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custCls', // custCls
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custClsNm', // custClsNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'poDwPlntCd', // poDwPlntCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'poDwPlntNm', // poDwPlntNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cityCd', // cityCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cityNm', // cityNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'distrCd', // distrCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'distrNm', // distrNm
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
    fieldName: 'addr', // addr
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
    fieldName: 'logitsPhoneNum2', // logitsPhoneNum2
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'invoiceNum', // invoiceNum
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'compCd', // compCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'compNm', // compNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upPlntCd', // upPlntCd
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
    fieldName: 'trnReqOrdQty', // trnReqOrdQty
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'ordUnitNm', // ordUnitNm
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
    fieldName: 'trnOffrPrice', // trnOffrPrice
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'custReqRemark', // custReqRemark
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesTeamNm', // salesTeamNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesTeamEngNm', // salesTeamEngNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'costCntrCd', // costCntrCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'costCntrNm', // costCntrNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'areaOrEtc', // areaOrEtc
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'modiReasonCd', // modiReasonCd
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'modiReasonNm', // modiReasonNm
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'etcModiReason', // etcModiReason
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: 'id',
    fieldName: 'id',
    header: {
      text: 'id', // id
    },
    editable: false,
    visible: false,
  },
  {
    name: 'offrDtlsId',
    fieldName: 'offrDtlsId',
    header: {
      text: 'offrDtlsId', // offrDtlsId
    },
    editable: false,
    visible: false,
  },
  {
    name: 'bokngId',
    fieldName: 'bokngId',
    header: {
      text: 'bokngId', // bokngId
    },
    editable: false,
    visible: false,
  },
  {
    name: 'deliveryCloseId',
    fieldName: 'deliveryCloseId',
    header: {
      text: 'deliveryCloseId', // deliveryCloseId
    },
    editable: false,
    visible: false,
  },
  {
    name: 'closeYn',
    fieldName: 'closeYn',
    header: {
      text: 'closeYn', // 마감여부
    },
    editable: false,
    visible: true,
  },
  {
    name: 'modiYn',
    fieldName: 'modiYn',
    header: {
      text: 'modiYn', // 조정여부
    },
    editable: false,
    visible: true,
    width: 150,
  },
  {
    name: 'trncusId',
    fieldName: 'trncusId',
    header: {
      text: 'trncusId', // trncusId
    },
    editable: false,
    visible: false,
  },
  {
    name: 'trncusNm',
    fieldName: 'trncusNm',
    header: {
      text: 'trncusNm', // 운송사
    },
    editable: false,
    visible: true,
    width: 400,
    styleName: 't-l',
  },
  {
    name: 'trnCfmDt',
    fieldName: 'trnCfmDt',
    header: {
      text: 'trnCfmDt', // 배차확정일자
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'outDt',
    fieldName: 'outDt',
    header: {
      text: 'outDt', // 출차일자
    },
    editable: false,
    visible: true,
    width: 200,
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
    mergeRule: {
      criteria: 'value',
    },
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
    name: 'outTypeNm',
    fieldName: 'outTypeNm',
    header: {
      text: 'outTypeNm', // 출고유형
    },
    editable: false,
    visible: true,
    width: 120,
  },
  {
    name: 'trnCarNum',
    fieldName: 'trnCarNum',
    header: {
      text: 'trnCarNum', // 차량번호
    },
    editable: false,
    visible: true,
  },
  {
    name: 'deliCarTypeCd',
    fieldName: 'deliCarTypeCd',
    header: {
      text: 'deliCarTypeCd', // deliCarTypeCd
    },
    editable: false,
    visible: false,
  },
  {
    name: 'deliCarTypeNm',
    fieldName: 'deliCarTypeNm',
    header: {
      text: 'deliCarTypeNm', // 차량유형
    },
    editable: false,
    visible: true,
  },
  {
    name: 'outTypeCd',
    fieldName: 'outTypeCd',
    header: {
      text: 'outTypeCd', // outTypeCd
    },
    editable: false,
    visible: false,
  },
  {
    name: 'totTrnPrice',
    fieldName: 'totTrnPrice',
    header: {
      text: 'totTrnPrice', // 총운송비
    },
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        const replT = cell.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
        let str = cell.value;
        str = '<p class="underline">' + replT + '</p>';

        return str;
      },
    },
    editable: false,
    visible: true,
    styleName: 't-r',
    width: 300,
  },
  {
    name: 'areaPriceAmt',
    fieldName: 'areaPriceAmt',
    header: {
      text: 'areaPriceAmt', // 기본운송비
    },
    editable: false,
    visible: true,
    styleName: 't-r',
    width: 200,
    numberFormat: '#,##0',
  },
  {
    name: 'etcTrnPriceAmt',
    fieldName: 'etcTrnPriceAmt',
    header: {
      text: 'etcTrnPriceAmt', // 기타운송비
    },
    editable: false,
    visible: true,
    styleName: 't-r',
    width: 200,
    numberFormat: '#,##0',
  },
  {
    name: 'trnNum',
    fieldName: 'trnNum',
    header: {
      text: 'trnNum', // 배송번호
    },
    editable: false,
    visible: true,
    width: 130,
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
    numberFormat: '#,##0',
    visible: true,
    width: 180,
  },
  {
    name: 'offrNum',
    fieldName: 'offrNum',
    header: {
      text: 'offrNum', // 주문번호
    },
    editable: false,
    visible: false,
  },
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
    width: 200,
  },
  {
    fieldName: 'bokngNum', // bokngNum
    name: 'bokngNum',
    header: {
      text: 'bokngNum', // SAP주문번호
    },
  },
  {
    fieldName: 'itemNum', // itemNum
    name: 'itemNum',
    header: {
      text: 'itemNum', // SAP주문번호
    },
    numberFormat: '#',
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
    width: 150,
    numberFormat: '#',
  },
  {
    name: 'procesResult',
    fieldName: 'procesResult',
    header: {
      text: 'procesResult', // procesResult
    },
    visible: false,
    editable: false,
  },
  {
    name: 'trnClsCd',
    fieldName: 'trnClsCd',
    header: {
      text: 'trnClsCd', // trnClsCd
    },
    editable: false,
    visible: false,
  },
  {
    name: 'trnClsNm',
    fieldName: 'trnClsNm',
    header: {
      text: 'trnClsNm', // 출고구분
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
    width: 200,
  },
  {
    name: 'trnHopeTi',
    fieldName: 'trnHopeTi',
    header: {
      text: 'trnHopeTi', // trnHopeTi
    },
    editable: false,
    visible: false,
  },
  {
    name: 'trnHopeTiNm',
    fieldName: 'trnHopeTiNm',
    header: {
      text: 'trnHopeTiNm', // 배송희망시간
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'upSiteCd',
    fieldName: 'upSiteCd',
    header: {
      text: 'upSiteCd', // upSiteCd
    },
    editable: false,
    visible: false,
  },
  {
    name: 'upSiteNm',
    fieldName: 'upSiteNm',
    header: {
      text: 'upSiteNm', // 상차지
    },
    editable: false,
    visible: true,
    width: 200,
    styleName: 't-l',
  },
  {
    name: 'poRegStaffNm',
    fieldName: 'poRegStaffNm',
    header: {
      text: 'poRegStaffNm', // PO출고등록담당자
    },
    editable: false,
    visible: true,
    width: 200,
    styleName: 't-l',
  },
  {
    name: 'custNm',
    fieldName: 'custNm',
    header: {
      text: 'custNm', // 고객사명
    },
    editable: false,
    visible: true,
    width: 300,
    styleName: 't-l',
  },
  {
    name: 'custCd',
    fieldName: 'custCd',
    header: {
      text: 'custCd', // 고객사코드
    },
    editable: false,
    visible: true,
  },
  {
    name: 'custCls',
    fieldName: 'custCls',
    header: {
      text: 'custCls', // custCls
    },
    editable: false,
    visible: false,
  },
  {
    name: 'custClsNm',
    fieldName: 'custClsNm',
    header: {
      text: 'custClsNm', // 고객사구분
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'poDwPlntCd',
    fieldName: 'poDwPlntCd',
    header: {
      text: 'poDwPlntCd', // poDwPlntCd
    },
    editable: false,
    visible: false,
  },
  {
    name: 'poDwPlntNm',
    fieldName: 'poDwPlntNm',
    header: {
      text: 'poDwPlntNm', // PO도착플랜트
    },
    editable: false,
    visible: true,
    styleName: 't-l',
    width: 150,
  },
  {
    name: 'cityCd',
    fieldName: 'cityCd',
    header: {
      text: 'cityCd', // cityCd
    },
    editable: false,
    visible: false,
  },
  {
    name: 'cityNm',
    fieldName: 'cityNm',
    header: {
      text: 'cityNm', // 대권역
    },
    editable: false,
    visible: true,
    width: 150,
    styleName: 't-l',
  },
  {
    name: 'distrCd',
    fieldName: 'distrCd',
    header: {
      text: 'distrCd', // distrCd
    },
    editable: false,
    visible: false,
  },
  {
    name: 'distrNm',
    fieldName: 'distrNm',
    header: {
      text: 'distrNm', // 중권역
    },
    editable: false,
    visible: true,
    width: 150,
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
    name: 'addr',
    fieldName: 'addr',
    header: {
      text: 'addr', // addr
    },
    editable: false,
    visible: false,
  },
  {
    name: 'addrDtls',
    fieldName: 'addrDtls',
    header: {
      text: 'addrDtls', // 배송지상세주소
    },
    editable: false,
    visible: true,
    width: 400,
    styleName: 't-l',
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
    name: 'logitsPhoneNum2',
    fieldName: 'logitsPhoneNum2',
    header: {
      text: 'logitsPhoneNum2', // logitsPhoneNum2
    },
    editable: false,
    visible: false,
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
    name: 'compCd',
    fieldName: 'compCd',
    header: {
      text: 'compCd', // 사업부(코드노출)
    },
    editable: false,
    visible: false,
    width: 150,
  },
  {
    name: 'compNm',
    fieldName: 'compNm',
    header: {
      text: 'compNm', // compNm
    },
    editable: false,
    visible: false,
  },
  {
    name: 'upPlntCd',
    fieldName: 'upPlntCd',
    header: {
      text: 'upPlntCd', // 플랜트코드(서버에서 내려주는 형식: V113, 스토리보드에 있는 형식: V120으로 upPlntCd를 그냥 사용함)
    },
    editable: false,
    visible: true,
  },
  {
    name: 'plntNm',
    fieldName: 'plntNm',
    header: {
      text: 'plntNm', // plntNm
    },
    editable: false,
    visible: false,
  },
  {
    name: 'prdtCd',
    fieldName: 'prdtCd',
    header: {
      text: 'prdtCd', // 제품코드(코드로 노출)
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
    width: 400,
    styleName: 't-l',
  },
  {
    name: 'trnReqOrdQty',
    fieldName: 'trnReqOrdQty',
    header: {
      text: 'trnReqOrdQty', // 배송요청주문수량(수량으로 노출)
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
      text: 'ordUnitNm', // 주문단위(단위, BDL로 노출)
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnReqBaseQty',
    fieldName: 'trnReqBaseQty',
    header: {
      text: 'trnReqBaseQty', // 배송요청기본수량(수량으로 노출)
    },
    editable: false,
    visible: true,
    styleName: 't-r',
    width: 150,
    numberFormat: '#,##0',
  },
  {
    name: 'baseUnitNm',
    fieldName: 'baseUnitNm',
    header: {
      text: 'baseUnitNm', // 기본단위(단위, 매로 노출)
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnReqVol',
    fieldName: 'trnReqVol',
    header: {
      text: 'trnReqVol', // 배송요청부피(부피, 숫자로 노출)
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
      text: 'volUnitNm', // 부피단위(단위, M3로 노출)
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnReqWght',
    fieldName: 'trnReqWght',
    header: {
      text: 'trnReqWght', // 배송요청중량(중량, 숫자로 노출)
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
      text: 'wghtUnitNm', // 배송요청중량(단위, KG로 노출)
    },
    editable: false,
    visible: true,
  },
  {
    name: 'trnOffrPrice',
    fieldName: 'trnOffrPrice',
    header: {
      text: 'trnOffrPrice', // 주문금액
    },
    editable: false,
    visible: true,
    styleName: 't-r',
    numberFormat: '#,##0',
    width: 300,
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
    width: 300,
  },
  {
    name: 'salesTeamNm',
    fieldName: 'salesTeamNm',
    header: {
      text: 'salesTeamNm', // 영업팀명
    },
    editable: false,
    visible: false,
    width: 150,
    styleName: 't-l',
  },
  {
    name: 'salesTeamEngNm',
    fieldName: 'salesTeamEngNm',
    header: {
      text: 'salesTeamEngNm', // salesTeamEngNm
    },
    editable: false,
    visible: false,
  },
  {
    name: 'costCntrCd',
    fieldName: 'costCntrCd',
    header: {
      text: 'costCntrCd', // 코스트센터코드
    },
    editable: false,
    visible: true,
    width: 150,
  },
  {
    name: 'costCntrNm',
    fieldName: 'costCntrNm',
    header: {
      text: 'costCntrNm', // 코스트센터명
    },
    editable: false,
    visible: true,
    width: 200,
    styleName: 't-l',
  },
  {
    name: 'areaOrEtc',
    fieldName: 'areaOrEtc',
    header: {
      text: 'areaOrEtc', // 운송비유형
    },
    editable: false,
    visible: false,
  },
  {
    name: 'modiReasonCd',
    fieldName: 'modiReasonCd',
    header: {
      text: 'modiReasonCd', // modiReasonCd
    },
    editable: false,
    visible: false,
  },
  {
    name: 'modiReasonNm',
    fieldName: 'modiReasonNm',
    header: {
      text: 'modiReasonNm', // 운송비조정사유
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'etcModiReason',
    fieldName: 'etcModiReason',
    header: {
      text: 'etcModiReason', // etcModiReason
    },
    editable: false,
    visible: false,
  },
];

export const rows = [];

export const layout = [
  {
    name: 'costDtTi',
    direction: 'horizontal',
    header: {
      text: '고객 배송 요청 일시',
      tooltip: '고객 배송 요청 일시',
      showTooltip: true,
    },
    items: ['trnHopeDt', 'trnHopeTi', 'trnHopeTiNm'],
  },
  'trnCfmDt',
  'outDt',
  'bokngNum',
  'itemNum',
  'bokngSoNum', // erp번호, 7
  'trnClsNm',
  'trnNum',
  'trnSpltNum',
  'trnPlnNum',
  'trnDoNum',
  'trnDoItemNum',
  'invoiceNum',
  'outTypeNm', // 출고유형, 15
  'closeYn',
  'modiYn',
  'trnOffrPrice',
  'totTrnPrice',
  'areaPriceAmt',
  'etcTrnPriceAmt',
  'areaOrEtc', // 운송비유형, 22
  'modiReasonNm',
  'trncusNm',
  'trnCarNum',
  'deliCarTypeNm',
  'custClsNm', // 고객그룹
  'salesTeamNm',
  'custCd',
  'custNm',
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
  'logitsPhoneNum1', // 연락처
  'upPlntCd', // 플랜트
  'upSiteNm',
  'prdtCd',
  'prdtNm', // 제품명
  // 주문단위 === 배송요청주문수량
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
  'custReqRemark', // 특이사항
  'poRegStaffNm',
  'poDwPlntNm',
  'costCntrCd',
  'costCntrNm',
  'id',
  'offrDtlsId',
  'bokngId',
  'deliveryCloseId',
  'trncusId',
  'deliCarTypeCd',
  'outTypeCd',
  'offrNum',
  'offrItemNum',
  'procesResult',
  'trnClsCd',
  'upSiteCd',
  'poDwPlntCd',
  'cityCd',
  'distrCd',
  'addr',
  'logitsPhoneNum2',
  'compCd',
  'compNm',
  'plntNm',
  'salesTeamEngNm',
  'modiReasonCd',
  'etcModiReason',
  'custCls',
];

// export const baseColumn = ['reqBaseTotQty', 'trnEndBaseTotQty', 'trnPsbBaseTotQty', 'trnIngBaseTotQty', 'baseUnitNm', 'baseUnitNm2', 'baseUnitNm3', 'baseUnitNm4'];
// export const ordColumn = ['reqOrdTotQty', 'trnEndOrdTotQty', 'trnPsbOrdTotQty', 'trnIngOrdTotQty', 'ordUnitNm', 'ordUnitNm2', 'ordUnitNm3', 'ordUnitNm4'];
