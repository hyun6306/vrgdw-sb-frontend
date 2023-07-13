/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
export let labels = [];
export const fields = [
  {
    fieldName: 'id',
    dataType: 'text',
  },
  {
    fieldName: 'progStatusCd',
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
    fieldName: 'prdtId',
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
  //사이즈 (선택[사이즈디폴트?],가로,세로,두께)
  {
    fieldName: 'sizeChgYn',
    dataType: 'list',
  },
  {
    fieldName: 'smplHrsnSize',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'smplVtclSize',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'smplTsk',
    dataType: ValueType.NUMBER,
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
    fieldName: 'trnPropDt',
    // dataType: ValueType.DATE,
    dataType: 'text',
  },
  {
    fieldName: 'trnHopeDt',
    // dataType: ValueType.DATE,
    dataType: 'text',
  },
  {
    fieldName: 'ordUnitNmrtr',
    // dataType: ValueType.DATE,
    dataType: 'text',
  },
  {
    fieldName: 'ordUnitDenom',
    // dataType: ValueType.DATE,
    dataType: 'text',
  },
  {
    fieldName: 'hrsnSpec',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'vtclSpec',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'tskSpec',
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
    fields: 'id',
    name: 'id',
    header: {
      text: 'ID',
    },
    visible: false,
  },
  {
    fields: 'progStatusCd',
    name: 'progStatusCd',
    header: {
      text: '진행상태코드',
    },
    visible: false,
  },
  {
    fields: 'offrNum',
    name: 'offrNum',
    header: {
      text: '견적번호',
    },
    visible: false,
  },
  {
    fields: 'offrId',
    name: 'offrId',
    header: {
      text: '견적ID',
    },
    visible: false,
  },
  {
    fieldName: 'prdtId',
    name: 'prdtId',
    header: {
      text: '제품ID',
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
        let str = '';
        if (cell.value) {
          str = String(cell.value).toLocaleString('en');
        }
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        str = `<div class='real_form_input'><input type='text' style='text-align:center' value='${str}' /></div>`;
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
    visible: true,
    editable: false,
  },
  {
    fieldName: 'lpmBckPttn',
    name: 'lpmBckPttn',
    header: {
      text: '후면(내)',
    },
    visible: true,
    editable: false,
  },
  {
    fieldName: 'prsUpPttn',
    name: 'prsUpPttn',
    header: {
      text: '전면',
    },
    editable: false,
    visible: true,
  },
  {
    fieldName: 'prsDwPttn',
    name: 'prsDwPttn',
    header: {
      text: '후면',
    },
    visible: true,
    editable: false,
  },
  //사이즈
  {
    fieldName: 'sizeChgYn',
    name: 'sizeChgYn',
    header: {
      text: '사이즈변경',
    },
    editor: {
      type: 'list',
      labels: labels,
      values: ['N', 'Y'],
      displayLabels: 'label',
      textReadOnly: true,
    },
    editButtonVisibility: 'always',
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = '';
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        // if (cell.value == 'Y') {
        //   str = 'CUSTOM';
        // } else {
        //   str = 'STANDARD';
        // }
        str = cell.value == 'Y' ? labels[1] : labels[0];
        return str;
      },
    },
  },
  {
    fieldName: 'smplHrsnSize',
    name: 'smplHrsnSize',
    header: {
      text: '샘플 가로 크기',
    },
    styleName: 't-c',
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = '';
        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        }
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        str = `<div class='real_form_input'><input type='text' style='text-align:center' value='${str}' /></div>`;
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let sizeYn = grid.getValue(dataCell.index.itemIndex, 'sizeChgYn');
      let ret = {};
      if (sizeYn == 'N') {
        ret.editable = false;
      } else if (sizeYn == 'Y') {
        ret.editable = true;
      }
      return ret;
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      positiveOnly: true,
    },
  },
  {
    fieldName: 'smplVtclSize',
    name: 'smplVtclSize',
    header: {
      text: '샘플 세로 크기',
    },
    editable: true,
    styleName: 't-c',
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = '';
        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        }
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        str = `<div class='real_form_input'><input type='text' style='text-align:center' value='${str}' /></div>`;
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let sizeYn = grid.getValue(dataCell.index.itemIndex, 'sizeChgYn');
      let ret = {};
      if (sizeYn == 'N') {
        ret.editable = false;
      } else if (sizeYn == 'Y') {
        ret.editable = true;
      }
      return ret;
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      positiveOnly: true,
    },
  },
  {
    fieldName: 'smplTsk',
    name: 'smplTsk',
    header: {
      text: '샘플 두께',
    },
    editable: true,
    styleName: 't-c',
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = '';
        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        }
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        str = `<div class='real_form_input'><input type='text' style='text-align:center' value='${str}' /></div>`;
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let sizeYn = grid.getValue(dataCell.index.itemIndex, 'sizeChgYn');
      let ret = {};
      if (sizeYn == 'N') {
        ret.editable = false;
      } else if (sizeYn == 'Y') {
        ret.editable = true;
      }
      return ret;
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      positiveOnly: true,
    },
  },
  {
    fieldName: 'hrsnSpec',
    name: 'hrsnSpec',
    visible: false,
  },
  {
    fieldName: 'vtclSpec',
    name: 'hrsnSpec',
    visible: false,
  },
  {
    fieldName: 'tskSpec',
    name: 'hrsnSpec',
    visible: false,
  },
  {
    fieldName: 'reqOrdQty',
    name: 'reqOrdQty',
    header: {
      text: '수량',
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
    editor: {
      type: 'number',
      editFormat: '#,##0',
      numberFormat: '#,##0.###',
      positiveOnly: true,
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
    editor: {
      type: 'number',
      editFormat: '#,##0',
      positiveOnly: true,
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
    fieldName: 'trnPropDt',
    name: 'trnPropDt',
    header: {
      text: '납품예상월',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: '납품희망일',
    },
    editable: false,
    // editor: {
    //   type: 'date',
    //   maxLength: 6,
    //   yearNavigation: true,
    // },
    // editButtonVisibility: 'always',
    renderer: 'calendarImgbtn',
    styleName: 't-c',
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
  'prdtCd', // 제품코드, 1
  'prdtNm', // 제품명, 2
  'brandNm', // 브랜드, 3
  'dnstType', // 밀도, 4
  'ecoNm', // 친환경, 5
  'brdGradeNm', // 등급, 6
  {
    name: 'pattern',
    direction: 'horizontal',
    header: {
      text: '패턴', // 패턴 전/후면 7, 8
    },
    items: ['lpmFrtPttn', 'lpmBckPttn'],
  },
  {
    name: 'prs',
    direction: 'horizontal',
    header: {
      text: '경면판', // 경면판 전/후면, 9, 10
    },
    items: ['prsUpPttn', 'prsDwPttn'],
  },
  //사이즈
  {
    name: 'size',
    direction: 'horizontal',
    header: {
      text: '사이즈', // 사이즈변경, 가로, 세로, 두께, 11, 12, 13, 14
    },
    items: ['sizeChgYn', 'smplHrsnSize', 'smplVtclSize', 'smplTsk'],
  },
  'trnHopeDt', // 배송희망일, 15
  {
    name: 'baseHeader',
    direction: 'horizontal',
    header: {
      text: '요청량', // 단위 pcs.로 고정, 수량, 단위, 16, 17
    },
    items: ['reqBaseQty', 'baseUnitNm'],
  },
];
export const rows = [
  // {
  //   favorite: 'Y',
  //   prdtCd: 'prdt1',
  //   prdtNm: '샘플제품1',
  //   patFront: '패턴 앞1',
  //   patBack: '패턴 뒤1',
  //   prsFront: '경면 앞1',
  //   prsBack: '경면 뒤1',
  //   sizeChgYn: 'STANDARD',
  //   smplHrsnSize: '1220',
  //   smplVtclSize: '2440',
  //   smplTsk: '12',
  //   reqUnit: '1100',
  //   reqQty: '101',
  //   reqQtyNm: '매',
  //   reqBndl: '10.1',
  //   reqBndlNm: '번들',
  //   reqQtyPrice: {
  //     price: '4',
  //     priceStatus: 'up',
  //   },
  //   // priceStatus: 'up',
  //   trnPropDt: '2022.10',
  //   trnHopeDt: '2022.07',
  //   reqOffrPrice: '3434565465',
  //   currencyUnit: 'VMD',
  //   reqPrdt: '3150',
  // },
  // {
  //   favorite: 'N',
  //   prdtCd: 'prdt1',
  //   prdtNm: '제품1',
  //   patFront: '패턴 앞1',
  //   patBack: '패턴 뒤1',
  //   prsFront: '경면 앞1',
  //   prsBack: '경면 뒤1',
  //   reqUnit: '1100',
  //   reqQty: '101',
  //   reqQtyNm: '매',
  //   reqBndl: '10.1',
  //   reqBndlNm: '번들',
  //   reqQtyPrice: {
  //     price: '1',
  //     priceStatus: 'down',
  //   },
  //   // priceStatus: 'down',
  //   trnPropDt: '2022.10',
  //   trnHopeDt: '2022.09',
  //   reqOffrPrice: '3434565465',
  //   currencyUnit: 'VMD',
  // },
];
