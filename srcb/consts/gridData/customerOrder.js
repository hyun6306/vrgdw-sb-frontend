/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
export const fields = [
  {
    fieldName: 'favorite',
    dataType: 'text',
  },
  {
    fieldName: 'prdtClsCd',
    dataType: ValueType.TEXT,
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
    fieldName: 'patFront',
    dataType: 'text',
  },
  {
    fieldName: 'patBack',
    dataType: 'text',
  },
  {
    fieldName: 'prsFront',
    dataType: 'text',
  },
  {
    fieldName: 'prsBack',
    dataType: 'text',
  },
  {
    fieldName: 'reqUnit',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'reqQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'reqQtyNm',
    dataType: 'text',
  },
  {
    fieldName: 'reqBndl',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'reqBndlNm',
    dataType: 'text',
  },
  {
    fieldName: 'reqQtyPrice',
    dataType: ValueType.OBJECT,
    objectKey: 'price',
  },
  {
    fieldName: 'currencyUnit',
    dataType: 'text',
  },
  {
    fieldName: 'tranPropMonth',
    dataType: 'text',
  },
  {
    fieldName: 'tranHopeMonth',
    // dataType: ValueType.DATE,
    dataType: 'text',
  },
  {
    fieldName: 'reqOffrPrice',
    dataType: ValueType.NUMBER,
  },
];

export const columns = [
  {
    fieldName: 'favorite',
    dataType: 'text',
    header: {
      template: "<img src='/static/img/icon_fav_on.png'/>",
    },
    renderer: 'favoriteImgbtn',
    width: 30,
  },
  {
    fieldName: 'prdtClsCd',
    header: {
      text: '품목',
    },
    visible: false,
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
      text: '제품명',
    },
    width: '300',
  },
  {
    fieldName: 'patFront',
    name: 'patFront',
    header: {
      text: '전면(내)',
    },
  },
  {
    fieldName: 'patBack',
    name: 'patBack',
    header: {
      text: '후면(내)',
    },
  },
  {
    fieldName: 'prsFront',
    name: 'prsFront',
    header: {
      text: '전면',
    },
  },
  {
    fieldName: 'prsBack',
    name: 'prsBack',
    header: {
      text: '후면',
    },
  },
  {
    fieldName: 'reqQty',
    name: 'reqQty',
    header: {
      text: '수량',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
    },
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = '';
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        str = `<div class='real_form_input'><input type='text' value='${cell.value}' /></div>`;
        return str;
      },
    },
    numberFormat: '#,##0',
  },
  {
    fieldName: 'reqQtyNm',
    name: 'reqQtyNm',
    header: {
      text: '단위',
    },
  },
  {
    fieldName: 'reqBndl',
    name: 'reqBndl',
    header: {
      text: '수량',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0.0',
    },
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = '';
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        str = `<div class='real_form_input'><input type='text' value='${cell.value}' /></div>`;
        return str;
      },
    },
  },
  {
    fieldName: 'reqBndlNm',
    name: 'reqBndlNm',
    header: {
      text: '단위',
    },
  },
  {
    fieldName: 'reqQtyPrice',
    name: 'reqQtyPrice',
    objectKey: 'price',
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
        //cell.index.dataRow;
        let str = '';
        // console.log(grid._dataProvider.getJsonRow(cell.index.dataRow));
        // if (grid._dataProvider.getJsonRow(cell.index.dataRow).priceStatus === 'up') {
        //   str = `<p style='red'>${cell.value}</p>`;
        // } else if (grid._dataProvider.getJsonRow(cell.index.dataRow).priceStatus === 'down') {
        //   str = `<p style='blue'>${cell.value}</p>`;
        // } else {
        //   str = cell.value;
        // }
        if (cell.value.priceStatus === 'up') {
          str = `<p class='up_price'><img src='/static/img/icon_up.png'>${cell.value.price}</p>`;
        } else if (cell.value.priceStatus === 'down') {
          str = `<p class='down_price'><img src='/static/img/icon_down.png'>${cell.value.price}</p>`;
        } else {
          str = cell.value.price;
        }
        // str = cell.value.price;
        return str;
      },
    },
    numberFormat: '#,##0.##;.;,',
  },
  {
    fieldName: 'currencyUnit',
    name: 'currencyUnit',
    header: {
      text: '통화단위',
    },
  },
  {
    fieldName: 'tranPropMonth',
    name: 'tranPropMonth',
    header: {
      text: '납품예상월',
    },
  },
  {
    fieldName: 'tranHopeMonth',
    name: 'tranHopeMonth',
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
  },
];

export const layout = [
  'favorite',
  'prdtClsCd',
  'prdtCd',
  'prdtNm',
  {
    name: 'pattern',
    direction: 'horizontal',

    header: {
      text: '패턴',
      tooltip: '패턴 입니다',
      showTooltip: true,
    },
    items: ['patFront', 'patBack'],
  },
  {
    name: 'prs',
    direction: 'horizontal',
    header: {
      text: '경면판',
      tooltip: '경면판 입니다',
      showTooltip: true,
    },
    items: ['prsFront', 'prsBack'],
  },
  {
    name: 'qtyHeader',
    direction: 'horizontal',
    header: {
      text: '요청수량 주문단위',
      tooltip: '경면판 입니다',
      showTooltip: true,
    },
    items: ['reqQty', 'reqQtyNm'],
  },
  {
    name: 'bndlHeader',
    direction: 'horizontal',
    header: {
      text: '요청수량 기본단위',
      tooltip: '경면판 입니다',
      showTooltip: true,
    },
    items: ['reqBndl', 'reqBndlNm'],
  },
  'reqQtyPrice',
  'currencyUnit',
  'tranPropMonth',
  'tranHopeMonth',
  'reqOffrPrice',
];

export const rows = [
  {
    favorite: 'Y',
    prdtCd: 'prdt1',
    prdtClsCd: 'MDF',
    prdtNm: '제품1',
    patFront: '패턴 앞1',
    patBack: '패턴 뒤1',
    prsFront: '경면 앞1',
    prsBack: '경면 뒤1',
    reqUnit: '1100',
    reqQty: '101',
    reqQtyNm: '매',
    reqBndl: '10.1',
    reqBndlNm: '번들',
    reqQtyPrice: {
      price: '4',
      priceStatus: 'up',
    },
    // priceStatus: 'up',
    tranPropMonth: '2022.10.01',
    tranHopeMonth: '2022.10.01',
    reqOffrPrice: '3434565465',
    currencyUnit: 'VMD',
  },
  {
    favorite: 'N',
    prdtCd: 'prdt1',
    prdtClsCd: 'MFB',
    prdtNm: '제품1',
    patFront: '패턴 앞1',
    patBack: '패턴 뒤1',
    prsFront: '경면 앞1',
    prsBack: '경면 뒤1',
    reqUnit: '1100',
    reqQty: '101',
    reqQtyNm: '매',
    reqBndl: '10.1',
    reqBndlNm: '번들',
    reqQtyPrice: {
      price: '1',
      priceStatus: 'down',
    },
    // priceStatus: 'down',
    tranPropMonth: '2022.10.01',
    tranHopeMonth: '2022.10.01',
    reqOffrPrice: '3434565465',
    currencyUnit: 'VMD',
  },
  {
    favorite: 'Y',
    prdtCd: 'prdt1',
    prdtClsCd: 'MDF',
    prdtNm: '제품1',
    patFront: '패턴 앞1',
    patBack: '패턴 뒤1',
    prsFront: '경면 앞1',
    prsBack: '경면 뒤1',
    reqUnit: '1100',
    reqQty: '101',
    reqQtyNm: '매',
    reqBndl: '10.1',
    reqBndlNm: '번들',
    reqQtyPrice: {
      price: '2',
    },
    tranPropMonth: '2022.10.01',
    tranHopeMonth: '2022.10.01',
    reqOffrPrice: '3434565465',
    currencyUnit: 'VMD',
  },
  {
    favorite: 'Y',
    prdtCd: 'prdt1',
    prdtClsCd: 'MDF',
    prdtNm: '제품1',
    patFront: '패턴 앞1',
    patBack: '패턴 뒤1',
    prsFront: '경면 앞1',
    prsBack: '경면 뒤1',
    reqUnit: '1100',
    reqQty: '101',
    reqQtyNm: '매',
    reqBndl: '10.1',
    reqBndlNm: '번들',
    reqQtyPrice: {
      price: '3',
      disble: true,
    },
    tranPropMonth: '2022.10.01',
    tranHopeMonth: '2022.10.01',
    reqOffrPrice: '3434565465',
    currencyUnit: 'VMD',
  },
];
