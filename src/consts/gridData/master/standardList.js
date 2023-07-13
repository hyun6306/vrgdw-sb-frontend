/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
export const fields = [
  {
    fieldName: 'prdtClsNm', //제품 품목 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtClsCd', //제품 분류 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cityNm', //시도 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cityCd', //시도 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'distrNm', //구군 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'distrCd', //구군 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'closeTi', //마감 시간
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'closeTiHour', //마감 시간 (시간)
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'closeTiMin', //마감 시간 (분)
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'closeTiColon', //마감 시간 (콜론)
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnBfor', //운송 이전
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnAftr', //운송 이후
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHour', //운송 시간
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedByNm', //작업자
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedAt', //최종수정
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'prdtClsNm',
    name: 'prdtClsNm',
    header: {
      text: '제품 품목',
    },
    editable: false,
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
    fieldName: 'cityNm',
    name: 'cityNm',
    header: {
      text: '시도 명',
    },
    editable: false,
  },
  {
    fieldName: 'cityCd',
    name: 'cityCd',
    header: {
      text: 'cityCd',
    },
    visible: false,
  },
  {
    fieldName: 'distrNm',
    name: 'distrNm',
    header: {
      text: '구군 명',
    },
    editable: false,
  },
  {
    fieldName: 'distrCd',
    name: 'distrCd',
    header: {
      text: 'distrCd',
    },
    visible: false,
  },
  {
    fieldName: 'closeTi',
    name: 'closeTi',
    header: {
      text: 'closeTi',
    },
    visible: false,
  },
  {
    fieldName: 'closeTiHour',
    name: 'closeTiHour',
    header: {
      text: '마감 시간 (시간)',
    },
    editor: {
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
    editable: true,
  },
  {
    fieldName: 'closeTiMin',
    name: 'closeTiMin',
    header: {
      text: '마감 시간(분)',
    },
    editor: {
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
    editable: true,
  },
  {
    fieldName: 'closeTiColon',
    name: 'closeTiColon',
    header: {
      text: '마감 시간(콜론)',
    },
    width: 10,
  },
  {
    fieldName: 'trnBfor',
    name: 'trnBfor',
    header: {
      text: '운송 이전',
    },
    editor: {},
    editButtonVisibility: 'always',
    updatable: true,
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        try {
          if (cell.value) {
            const option = JSON.parse(cell.value);
            str = option.text;
          }
        } catch (e) {
          if (cell.value) {
            str = cell.value;
          }
        }
        return str;
      },
    },
  },
  {
    fieldName: 'trnAftr',
    name: 'trnAftr',
    header: {
      text: '운송 이후',
    },
    editor: {},
    editButtonVisibility: 'always',
    updatable: true,
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        try {
          if (cell.value) {
            const option = JSON.parse(cell.value);
            str = option.text;
          }
        } catch (e) {
          if (cell.value) {
            str = cell.value;
          }
        }
        return str;
      },
    },
  },
  {
    fieldName: 'trnHour',
    name: 'trnHour',
    header: {
      text: '운송 시간',
    },
    editor: {},
    editButtonVisibility: 'always',
    updatable: true,
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        try {
          if (cell.value) {
            const option = JSON.parse(cell.value);
            str = option.text;
          }
        } catch (e) {
          if (cell.value) {
            str = cell.value;
          }
        }
        return str;
      },
    },
  },
  {
    fieldName: 'updatedByNm',
    name: 'updatedByNm',
    header: {
      text: 'updatedByNm',
    },
    visible: false,
  },
  {
    fieldName: 'updatedAt',
    name: 'updatedAt',
    header: {
      text: 'updatedAt',
    },
    visible: false,
  },
];

export const layout = [
  'prdtClsNm',
  'prdtClsCd',
  'cityNm',
  'cityCd',
  'distrNm',
  'distrCd',
  'closeTi',
  {
    name: 'tranCloseTi',
    direction: 'horizontal',
    hideChildHeaders: true,
    header: {
      text: '마감 시간',
      tooltip: '마감 시간',
      showTooltip: true,
    },
    items: ['closeTiHour', 'closeTiColon', 'closeTiMin'],
  },
  'trnBfor',
  'trnAftr',
  'trnHour',
  'updatedByNm',
  'updatedAt',
];
