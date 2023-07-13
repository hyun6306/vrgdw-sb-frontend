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
    fieldName: 'offrNum',
    dataType: 'text',
  },
  {
    fieldName: 'offrId',
    dataType: 'text',
  },
  {
    fieldName: 'ordUnitNmrtr',
    dataType: 'text',
  },
  {
    fieldName: 'ordUnitDenom',
    dataType: 'text',
  },
  {
    fieldName: 'prdtId',
    dataType: 'text',
  },
  {
    fieldName: 'favoritYn',
    dataType: 'text',
  },
  {
    fieldName: 'prdtClsCd',
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
    fieldName: 'lpmFrtPttn',
    dataType: 'text',
  },
  {
    fieldName: 'lpmBckPttn',
    dataType: 'text',
  },
  {
    fieldName: 'prsUpPttn',
    dataType: 'text',
  },
  {
    fieldName: 'prsDwPttn',
    dataType: 'text',
  },
  {
    fieldName: 'lpmFrtPttnNm',
    dataType: 'text',
  },
  {
    fieldName: 'lpmBckPttnNm',
    dataType: 'text',
  },
  {
    fieldName: 'prsUpPttnNm',
    dataType: 'text',
  },
  {
    fieldName: 'prsDwPttnNm',
    dataType: 'text',
  },
  {
    fieldName: 'trnPropDt',
    dataType: 'text',
  },
  {
    fieldName: 'trnHopeDt',
    // dataType: ValueType.DATE,
    dataType: 'text',
  },
  {
    fieldName: 'reqBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'baseUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'reqOrdQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'ordUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'priceStat',
    dataType: ValueType.OBJECT,
    objectKey: 'aplyPrice',
  },
  {
    fieldName: 'currency',
    dataType: 'text',
  },
  {
    fieldName: 'reqOffrPrice',
    dataType: ValueType.NUMBER,
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
];

export const columns = [
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: 'id',
    },
    visible: false,
  },
  {
    fieldName: 'offrNum',
    name: 'offrNum',
    header: {
      text: 'offrNum',
    },
    visible: false,
  },
  {
    fieldName: 'offrId',
    name: 'offrId',
    header: {
      text: 'offrId',
    },
    visible: false,
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
      text: 'prdtClsCd',
    },
    visible: false,
  },
  {
    fieldName: 'favoritYn',
    dataType: 'text',
    header: {
      template: "<img src='/static/img/icon_fav_on.png'/>",
    },
    renderer: 'favoriteImgbtn',
    width: 30,
    editable: false,
    sortable: false,
  },
  {
    fieldName: 'prdtCd',
    name: 'prdtCd',
    header: {
      text: '제품코드',
    },
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = cell.value;
        str = `<div class='real_form_input'><input type='text' value='${str}' /></div>`;
        return str;
      },
    },
    styleName: 't-c',
  },
  {
    fieldName: 'prdtNm',
    name: 'prdtNm',
    header: {
      text: '제품명',
    },
    width: '300',
    editable: false,
    styleName: 't-l',
  },
  {
    fieldName: 'lpmFrtPttn',
    name: 'lpmFrtPttn',
    header: {
      text: '전면(내)',
    },
    width: 130,
    editable: false,
    visible: false,
  },
  {
    fieldName: 'lpmBckPttn',
    name: 'lpmBckPttn',
    header: {
      text: '후면(내)',
    },
    width: 130,
    editable: false,
    visible: false,
  },
  {
    fieldName: 'prsUpPttn',
    name: 'prsUpPttn',
    header: {
      text: '전면',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'prsDwPttn',
    name: 'prsDwPttn',
    header: {
      text: '후면',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'lpmFrtPttnNm',
    name: 'lpmFrtPttnNm',
    header: {
      text: '전면(내)',
    },
    width: 130,
    editable: false,
  },
  {
    fieldName: 'lpmBckPttnNm',
    name: 'lpmBckPttnNm',
    header: {
      text: '후면(내)',
    },
    width: 130,
    editable: false,
  },
  {
    fieldName: 'prsUpPttnNm',
    name: 'prsUpPttnNm',
    header: {
      text: '전면',
    },
    editable: false,
  },
  {
    fieldName: 'prsDwPttnNm',
    name: 'prsDwPttnNm',
    header: {
      text: '후면',
    },
    editable: false,
  },
  {
    fieldName: 'trnPropDt',
    name: 'trnPropDt',
    header: {
      text: '납품예상월',
    },
    editable: false,
  },
  {
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: '납품희망월',
    },
    editable: false,
    // editor: {
    //   type: 'date',
    //   maxLength: 6,
    //   yearNavigation: true,
    // },
    // editButtonVisibility: 'always',
    renderer: 'calendarImgbtn',
  },
  {
    fieldName: 'reqOrdQty',
    name: 'reqOrdQty',
    header: {
      text: '수량',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      numberFormat: '#,##0.###',
      positiveOnly: true,
    },
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = '';
        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        } else {
          str = 0;
        }
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
        return str;
      },
    },
    styleName: 't-r',
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnitNm',
    header: {
      text: '단위',
    },
    editable: false,
  },
  {
    fieldName: 'reqBaseQty',
    name: 'reqBaseQty',
    header: {
      text: '수량',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      positiveOnly: true,
    },
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = '';
        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        } else {
          str = 0;
        }
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
        return str;
      },
    },
    styleName: 't-r',
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm',
    header: {
      text: '단위',
    },
    editable: false,
  },
  {
    fieldName: 'priceStat',
    name: 'priceStat',
    objectKey: 'aplyPrice',
    header: {
      text: '판매단가',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
    },
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = '';
        // if (grid._dataProvider.getJsonRow(cell.index.dataRow).priceStatus === 'up') {
        //   str = `<p style='red'>${cell.value}</p>`;
        // } else if (grid._dataProvider.getJsonRow(cell.index.dataRow).priceStatus === 'down') {
        //   str = `<p style='blue'>${cell.value}</p>`;
        // } else {
        //   str = cell.value;
        // }
        if (cell.value.aplyPrice) {
          str = Number(cell.value.aplyPrice).toLocaleString('en');
        }
        if (cell.value.updwn === 'up') {
          str = `<p class='up_price'><img src='/static/img/icon_up.png'>${str}</p>`;
        } else if (cell.value.updwn === 'down') {
          str = `<p class='down_price'><img src='/static/img/icon_down.png'>${str}</p>`;
        }
        // str = cell.value.price;
        return str;
      },
    },
    numberFormat: '#,##0.##;.;,',
    editable: false,
    styleName: 't-r',
    visible: false,
  },
  {
    fieldName: 'currency',
    name: 'currency',
    header: {
      text: '통화단위',
    },
    editable: false,
  },
  {
    fieldName: 'reqOffrPrice',
    name: 'reqOffrPrice',
    header: {
      text: '판매금액',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
    },
    numberFormat: '#,##0.##;.;,',
    editable: false,
    styleName: 't-r',
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
];

export const layout = [
  'prdtClsCd',
  'favoritYn',
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
  'trnPropDt',
  'trnHopeDt',
  {
    name: 'ordHeader',
    direction: 'horizontal',
    header: {
      text: '요청수량 주문단위',
      tooltip: '주문단위 입니다',
      showTooltip: true,
    },
    items: ['reqOrdQty', 'ordUnitNm'],
  },
  {
    name: 'baseHeader',
    direction: 'horizontal',
    header: {
      text: '요청수량 기본단위',
      tooltip: '기본단위 입니다',
      showTooltip: true,
    },
    items: ['reqBaseQty', 'baseUnitNm'],
  },
  'currency',
  'priceStat',
  'reqOffrPrice',
];

export const rows = [
  // {
  //   ordUnitNmrtr: 1,
  //   ordUnitDenom: 130,
  //   prdtId: 89,
  //   favorite: 'Y',
  //   prdtCd: 'FDM100089',
  //   prdtNm: 'FB,MBR,E2,N,(5.5*1525*2440),P',
  //   lpmFrtPttn: '',
  //   lpmBckPttn: '',
  //   prsUpPttn: '',
  //   prsDwPttn: '',
  //   reqOrdQty: 0,
  //   ordUnitNm: '번들',
  //   reqBaseQty: 0,
  //   baseUnitNm: '매',
  //   priceStat: {
  //     applyPrice: '10000',
  //     updwn: '',
  //     disble: '',
  //   },
  //   // priceStatus: 'up',
  //   trnPropDt: '2022-10',
  //   trnHopeDt: '2022-07',
  //   reqOffrPrice: '',
  //   currency: 'VMD',
  // },
  // {
  //   ordUnitNmrtr: 1,
  //   ordUnitDenom: 130,
  //   prdtId: 89,
  //   favorite: 'Y',
  //   prdtCd: 'FDM100089',
  //   prdtNm: 'FB,MBR,E2,N,(5.5*1525*2440),P',
  //   lpmFrtPttn: '',
  //   lpmBckPttn: '',
  //   prsUpPttn: '',
  //   prsDwPttn: '',
  //   reqOrdQty: 0,
  //   ordUnitNm: '번들',
  //   reqBaseQty: 0,
  //   baseUnitNm: '매',
  //   priceStat: {
  //     applyPrice: '10000',
  //     updwn: '',
  //     disble: '',
  //   },
  //   // priceStatus: 'up',
  //   trnPropDt: '2022-10',
  //   trnHopeDt: '2022-07',
  //   reqOffrPrice: '',
  //   currency: 'VMD',
  // },
];
