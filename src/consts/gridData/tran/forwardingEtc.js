/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
const _columns = [
  {
    fieldName: 'trnReqRemark',
    name: 'trnReqRemark',
    dataType: ValueType.TEXT,
    header: { text: '특이사항' },
    width: 200,
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = cell.value;
        if (cell.value !== null && cell.value) {
          str = cell.value;
        } else {
          str = '';
        }

        str = `<div class='real_form_input'><input type='text' style='text-align:left' value='${str}' /></div>`;
        return str;
      },
    },
  }, // : 특이사항"
  {
    fieldName: 'etcOutItemNm',
    name: 'etcOutItemNm',
    dataType: ValueType.TEXT,
    header: { text: '제품명' },
    width: 150,
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = cell.value;
        if (cell.value !== null && cell.value) {
          str = cell.value;
        } else {
          str = '';
        }

        str = `<div class='real_form_input'><input type='text' style='text-align:left' value='${str}' /></div>`;
        return str;
      },
    },
  }, // : 제품명"
  {
    fieldName: 'trnReqQty',
    name: 'trnReqQty',
    dataType: ValueType.NUMBER,
    header: { text: '출고수량' },
    editor: {
      type: 'number',
      editFormat: '#,###',
      positiveOnly: true,
      numberFormat: '#,###',
    },
    styleName: 't-r',
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = cell.value;
        if (cell.value !== null && cell.value) {
          str = Number(cell.value).toLocaleString('en');
        } else {
          str = 0;
        }

        str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
        return str;
      },
    },
    width: 60,
  }, // : 출고수량"
  { fieldName: 'baseUnitNm', name: 'baseUnitNm', dataType: ValueType.TEXT, header: { text: '단위' }, width: 30 }, // : 단위
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

export const layout = ['etcOutItemNm', 'trnReqQty', 'baseUnitNm', 'trnReqRemark'];
