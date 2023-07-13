import { ValueType } from 'realgrid';
export const fields = [
  {
    fieldName: 'favoritYn',
    dataType: 'text',
  },
  {
    fieldName: 'prdtId',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtClsCd',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtCd',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'lpmFrtPttn',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'lpmBckPttn',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'lpmFrtPttnNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'lpmBckPttnNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'sizeChgYn',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'hrsnSpec',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'vtclSpec',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'tskSpec',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prsUpPttn',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prsDwPttn',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prsUpPttnNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prsDwPttnNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ordUnitNmrtr',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ordUnitDenom',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'aplyPrice',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'orderYn',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'baseUnitNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ordUnitNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrYm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'brandNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dnstType',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ecoNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'brdGradeNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'currency',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnExptDt',
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'favoritYn',
    dataType: 'text',
    header: {
      template: "<img src='/static/img/icon_fav_on.png'/>",
    },
    renderer: 'favoriteImgbtn',
    width: 30,
  },
  {
    fieldName: 'prdtId',
    name: 'prdtId',
    header: {
      text: 'prdtId',
    },
    visible: false,
  },
  {
    fieldName: 'prdtClsCd',
    name: 'prdtClsCd',
    header: {
      text: '품목',
    },
  },
  {
    fieldName: 'prdtCd',
    name: 'prdtCd',
    header: {
      text: '제품 코드',
    },
  },
  {
    fieldName: 'prdtNm',
    name: 'prdtNm',
    header: {
      text: '제품명',
    },
    width: 350,
    styleName: 't-l',
  },
  {
    fieldName: 'lpmFrtPttn',
    name: 'lpmFrtPttn',
    header: {
      text: '패턴전면',
    },
    visible: false,
  },
  {
    fieldName: 'lpmBckPttn',
    name: 'lpmBckPttn',
    header: {
      text: '패턴후면',
    },
    visible: false,
  },
  {
    fieldName: 'lpmFrtPttnNm',
    name: 'lpmFrtPttnNm',
    header: {
      text: '패턴전면',
    },
  },
  {
    fieldName: 'lpmBckPttnNm',
    name: 'lpmBckPttnNm',
    header: {
      text: '패턴후면',
    },
  },
  {
    fieldName: 'sizeChgYn',
    name: 'sizeChgYn',
    header: {
      text: '사이즈 변경(Y/N)',
    },
    visible: false,
  },
  {
    fieldName: 'hrsnSpec',
    name: 'hrsnSpec',
    header: {
      text: '가로 규격',
    },
    visible: false,
  },
  {
    fieldName: 'vtclSpec',
    name: 'vtclSpec',
    header: {
      text: '세로 규격',
    },
    visible: false,
  },
  {
    fieldName: 'tskSpec',
    name: 'tskSpec',
    header: {
      text: '두께',
    },
    visible: false,
  },
  {
    fieldName: 'prsUpPttn',
    name: 'prsUpPttn',
    header: {
      text: '경면판전면',
    },
    visible: false,
  },
  {
    fieldName: 'prsDwPttn',
    name: 'prsDwPttn',
    header: {
      text: '경면판후면',
    },
    visible: false,
  },
  {
    fieldName: 'prsUpPttnNm',
    name: 'prsUpPttnNm',
    header: {
      text: '경면판전면',
    },
  },
  {
    fieldName: 'prsDwPttnNm',
    name: 'prsDwPttnNm',
    header: {
      text: '경면판후면',
    },
  },
  {
    fieldName: 'ordUnitNmrtr',
    name: 'ordUnitNmrtr',
    header: {
      text: 'ordUnitNmrtr',
    },
    visible: false,
  },
  {
    fieldName: 'ordUnitDenom',
    name: 'ordUnitDenom',
    header: {
      text: 'ordUnitDenom',
    },
    visible: false,
  },
  {
    fieldName: 'aplyPrice',
    name: 'aplyPrice',
    header: {
      text: 'aplyPrice',
    },
    visible: false,
  },
  {
    fieldName: 'orderYn',
    name: 'orderYn',
    header: {
      text: 'orderYn',
    },
    visible: false,
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm',
    header: {
      text: '기본단위',
    },
    visible: false,
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnitNm',
    header: {
      text: '주문단위',
    },
    visible: false,
  },
  {
    fieldName: 'offrYm',
    name: 'offrYm',
    header: {
      text: 'offrYm',
    },
    visible: false,
  },
  {
    fieldName: 'brandNm',
    name: 'brandNm',
    header: {
      text: '브랜드',
    },
    // visible: false,
  },
  {
    fieldName: 'dnstType',
    name: 'dnstType',
    header: {
      text: '밀도',
    },
    // visible: false,
  },
  {
    fieldName: 'ecoNm',
    name: 'ecoNm',
    header: {
      text: '친환경',
    },
    // visible: false,
  },
  {
    fieldName: 'brdGradeNm',
    name: 'brdGradeNm',
    header: {
      text: '등급',
    },
    // visible: false,
  },
  {
    fieldName: 'currency',
    name: 'currency',
    header: {
      text: '통화단위',
    },
    visible: false,
  },
  {
    fieldName: 'trnExptDt',
    name: 'trnExptDt',
    header: {
      text: '납품예상월',
    },
    visible: false,
  },
];

export const layout = [
  'favoritYn',
  'prdtClsCd',
  'prdtCd',
  'prdtNm',
  'brandNm',
  'dnstType',
  'ecoNm',
  'brdGradeNm',
  {
    name: 'pattern',
    direction: 'horizontal',

    header: {
      text: '패턴',
      tooltip: '패턴 입니다',
      showTooltip: true,
    },
    items: ['lpmFrtPttnNm', 'lpmBckPttnNm'],
  },
  {
    name: 'prs',
    direction: 'horizontal',
    header: {
      text: '경면판',
      tooltip: '경면판 입니다',
      showTooltip: true,
    },
    items: ['prsUpPttnNm', 'prsDwPttnNm'],
  },
  'trnExptDt',
  'orderYn',
];
