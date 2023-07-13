import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'trnNum',
    dataType: 'text',
  },
  {
    fieldName: 'trnSpltNum',
    dataType: 'text',
  },
  {
    fieldName: 'offrNum',
    dataType: 'text',
  },
  {
    fieldName: 'offrItemNum',
    dataType: 'number',
  },
  {
    fieldName: 'bokngSoNum',
    dataType: 'text',
  },
  {
    fieldName: 'trnDoNum',
    dataType: 'text',
  },
  {
    fieldName: 'trnClsNm',
    dataType: 'text',
  },
  {
    fieldName: 'trnHopeDt',
    dataType: 'text',
  },
  {
    fieldName: 'trnHopeTiNm',
    dataType: 'text',
  },
  {
    fieldName: 'upSiteNm',
    dataType: 'text',
  },
  {
    fieldName: 'poRegStaffNum',
    dataType: 'text',
  },
  {
    fieldName: 'custNm',
    dataType: 'text',
  },
  {
    fieldName: 'logitsAlias',
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
    fieldName: 'logitsPhoneNum1',
    dataType: 'text',
  },
  {
    fieldName: 'compNm',
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
    fieldName: 'trnReqBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'ordUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqOrdQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'baseUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqVol',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'volUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqWght',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'wghtUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'custReqRemark',
    dataType: 'text',
  },
  {
    fieldName: 'cityDistr',
    dataType: 'text',
  },
  {
    fieldName: 'cityNm',
    dataType: 'text',
  },
  {
    fieldName: 'distrNm',
    dataType: 'text',
  },
];

export const columns = [
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: 'ID',
    },
    visible: false,
  },
  {
    fieldName: 'trnNum',
    name: 'trnNum',
    header: {
      text: 'trnNum',
    },
  },
  {
    fieldName: 'trnSpltNum',
    name: 'trnSpltNum',
    header: {
      text: 'trnSpltNum',
    },
  },
  {
    fieldName: 'offrNum',
    name: 'offrNum',
    header: {
      text: 'offrNum',
    },
  },
  {
    fieldName: 'offrItemNum',
    name: 'offrItemNum',
    header: {
      text: 'offrItemNum',
    },
    numberFormat: '#',
  },
  {
    fieldName: 'bokngSoNum',
    name: 'bokngSoNum',
    header: {
      text: 'bokngSoNum',
    },
  },
  {
    fieldName: 'trnDoNum',
    name: 'trnDoNum',
    header: {
      text: 'trnDoNum',
    },
  },
  {
    fieldName: 'trnClsNm',
    name: 'trnClsNm',
    header: {
      text: 'trnClsNm',
    },
  },
  {
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: 'trnHopeDt',
    },
    width: 250,
  },
  {
    fieldName: 'trnHopeTiNm',
    name: 'trnHopeTiNm',
    header: {
      text: 'trnHopeTiNm',
    },
    width: 250,
  },
  {
    fieldName: 'upSiteNm',
    name: 'upSiteNm',
    header: {
      text: 'upSiteNm',
    },
    styleName: 't-l',
  },
  {
    fieldName: 'poRegStaffNum',
    name: 'poRegStaffNum',
    header: {
      text: 'poRegStaffNum',
    },
    styleName: 't-l',
    width: 250,
  },
  {
    fieldName: 'custNm',
    name: 'custNm',
    header: {
      text: 'custNm',
    },
    styleName: 't-l',
    width: 350,
  },
  {
    fieldName: 'logitsAlias',
    name: 'logitsAlias',
    header: {
      text: 'logitsAlias',
    },
    styleName: 't-l',
    width: 350,
  },
  {
    fieldName: 'postNum',
    name: 'postNum',
    header: {
      text: 'postNum',
    },
  },
  {
    fieldName: 'addr',
    name: 'addr',
    header: {
      text: 'addr',
    },
    styleName: 't-l',
    width: 350,
  },
  {
    fieldName: 'logitsPhoneNum1',
    name: 'logitsPhoneNum1',
    header: {
      text: 'logitsPhoneNum1',
    },
    width: 100,
  },
  {
    fieldName: 'compNm',
    name: 'compNm',
    header: {
      text: 'compNm',
    },
  },
  {
    fieldName: 'prdtCd',
    name: 'prdtCd',
    header: {
      text: 'prdtCd',
    },
  },
  {
    fieldName: 'prdtNm',
    name: 'prdtNm',
    header: {
      text: 'prdtNm',
    },
    styleName: 't-l',
    width: 350,
  },
  {
    fieldName: 'trnReqBaseQty',
    name: 'trnReqBaseQty',
    header: {
      text: 'trnReqBaseQty',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnitNm',
    header: {
      text: 'ordUnitNm',
    },
  },
  {
    fieldName: 'trnReqOrdQty',
    name: 'trnReqOrdQty',
    header: {
      text: 'trnReqOrdQty',
    },
    styleName: 't-r',
    numberFormat: '#,###.###',
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm',
    header: {
      text: 'baseUnitNm',
    },
  },
  {
    fieldName: 'trnReqVol',
    name: 'trnReqVol',
    header: {
      text: 'trnReqVol',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'volUnitNm',
    name: 'volUnitNm',
    header: {
      text: 'volUnitNm',
    },
  },
  {
    fieldName: 'trnReqWght',
    name: 'trnReqWght',
    header: {
      text: 'trnReqWght',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'wghtUnitNm',
    name: 'wghtUnitNm',
    header: {
      text: 'wghtUnitNm',
    },
  },
  {
    fieldName: 'custReqRemark',
    name: 'custReqRemark',
    header: {
      text: 'custReqRemark',
    },
    width: 250,
    styleName: 't-l',
  },
  {
    fieldName: 'cityDistr',
    name: 'cityDistr',
    header: {
      text: 'cityDistr',
    },
    styleName: 't-l',
    width: 350,
  },
  {
    fieldName: 'cityNm',
    name: 'cityNm',
    header: {
      text: 'cityNm',
    },
  },
  {
    fieldName: 'distrNm',
    name: 'distrNm',
    header: {
      text: 'distrNm',
    },
  },
];

export const layout = [
  'trnNum',
  'trnSpltNum',
  'offrNum',
  'offrItemNum',
  'bokngSoNum',
  'trnDoNum',
  'trnClsNm',
  'trnHopeDt',
  'trnHopeTiNm',
  'upSiteNm',
  'poRegStaffNum',
  'custNm',
  'logitsAlias',
  'postNum',
  'cityDistr',
  'addr',
  'logitsPhoneNum1',
  'compNm',
  'prdtCd',
  'prdtNm',
  {
    name: 'orderUnit',
    direction: 'horizontal',
    header: {
      text: '주문단위',
    },
    items: ['trnReqOrdQty', 'ordUnitNm'],
  },
  {
    name: 'fowardUnit',
    direction: 'horizontal',
    header: {
      text: '출고단위',
    },
    items: ['trnReqBaseQty', 'baseUnitNm'],
  },
  {
    name: 'volUnit',
    direction: 'horizontal',
    header: {
      text: '부피단위',
    },
    items: ['trnReqVol', 'volUnitNm'],
  },
  {
    name: 'weightUnit',
    direction: 'horizontal',
    header: {
      text: '중량단위',
    },
    items: ['trnReqWght', 'wghtUnitNm'],
  },
  'custReqRemark',
];
