/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'prdtClsCd', name: 'prdtClsCd', header: { text: '제품 분류 코드' }, dataType: ValueType.TEXT, visible: false },
  { fieldName: 'prdtClsNm', name: 'prdtClsNm', header: { text: '제품 분류 명' }, dataType: ValueType.TEXT, objectKey: 'orderMonthMngGrid01' },
  {
    fieldName: 'aplySttDt',
    name: 'aplySttDt',
    header: { text: '적용 시작 일자' },
    dataType: 'text',
    editable: false,
    renderer: 'calendarImgbtn',
    // lookupDisplay: true,
    // renderer: 'calendarImgbtn',
    // editable: true,
    // objectKey: 'orderMonthMngGrid02',
    // editor: {
    //   type: 'date',
    //   datetimeFormat: 'yyyy-MM-dd',
    //   yearNavigation: true,
    //   minDate: new Date(),
    // },
    // editButtonVisibility: 'always',
  },
  { fieldName: 'aplySttTi', name: 'aplySttTi', header: { text: '적용 시작 시간' }, dataType: ValueType.TEXT, visible: false },
  {
    fieldName: 'aplySttHh',
    name: 'aplySttHh',
    header: { text: '시' },
    editable: true,
    dataType: ValueType.TEXT,
    objectKey: 'orderMonthMngGrid03',
    editor: {
      // type: 'number',
      // maxIntegerLength: 2,
      // max: 23,
      // positiveOnly: true,
      type: 'text',
      maxLength: 2,
      inputCharacters: '0-9',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        if (cell.value) str = cell.value;
        str = `<div class='real_form_input'><input type='text' value='${str}' /></div>`;
        return str;
      },
    },
    width: 50,
    styleName: 't-r',
  },
  {
    fieldName: 'aplySttMi',
    name: 'aplySttMi',
    header: { text: '분' },
    editable: true,
    dataType: ValueType.TEXT,
    objectKey: 'orderMonthMngGrid04',
    editor: {
      // type: 'number',
      // maxIntegerLength: 2,
      // max: 59,
      // positiveOnly: true,
      type: 'text',
      maxLength: 2,
      inputCharacters: '0-9',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        if (cell.value) str = cell.value;
        str = `<div class='real_form_input'><input type='text' value='${str}' /></div>`;
        return str;
      },
    },
    width: 50,
    styleName: 't-l',
  },
  {
    fieldName: 'aplySttColon',
    name: 'aplySttColon',
    header: {
      text: '마감 시간(콜론)',
    },
    width: 10,
  },
  {
    fieldName: 'aplyPropDt',
    name: 'aplyPropDt',
    header: { text: '적용 제안 일' },
    dataType: 'text',
    editable: false,
    renderer: 'calendarImgbtn',
    // editable: true,
    // dataType: ValueType.TEXT,
    // objectKey: 'orderMonthMngGrid05',
    // editor: {
    //   type: 'date',
    //   datetimeFormat: 'yyyy-MM-dd',
    //   yearNavigation: true,
    // },
    // editButtonVisibility: 'always',
  },
  { fieldName: 'updatedAt', name: 'updatedAt', header: { text: '수정일' }, dataType: ValueType.TEXT, visible: false },
  { fieldName: 'updatedBy', name: 'updatedBy', header: { text: '수정자' }, dataType: ValueType.TEXT, visible: false },
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

export const layout = [
  'prdtClsNm',
  'aplySttDt',
  {
    name: 'orderMonthMngGridGroup01',
    direction: 'horizontal',
    hideChildHeaders: true,
    items: ['aplySttHh', 'aplySttColon', 'aplySttMi'],
    header: {
      text: '적용 시작 시간',
    },
  },
  'aplyPropDt',
];
