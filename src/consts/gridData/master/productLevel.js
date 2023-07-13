/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'lvlId', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'lvlNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'level', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'levelNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'lvlCd', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'lvlKorNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'lvlEngNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'lvlVnmNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'parentId', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'sort', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'remark', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedByNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedBy', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedAt', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'useYn', //
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'lvlId',
    name: 'lvlId',
    header: {
      text: ' ',
    },
    visible: false,
  },
  {
    fieldName: 'lvlNm',
    name: 'lvlNm',
    header: {
      text: ' ',
    },
    width: 350,
  },
  {
    fieldName: 'level',
    name: 'level',
    header: {
      text: 'level',
    },
    visible: false,
  },
  {
    fieldName: 'levelNm',
    name: 'levelNm',
    header: {
      text: '제품레벨분류',
    },
    width: 140,
    editable: false,
  },
  {
    fieldName: 'lvlCd',
    name: 'lvlCd',
    header: {
      text: '분류코드',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        let level = grid.getValue(cell.index.itemIndex, 'level');
        let lvlNm = grid.getValue(cell.index.itemIndex, 'lvlNm');
        if (level != 'top') {
          if (!lvlNm) {
            if (cell.value) str = cell.value;
            str = `<div class='real_form_input'><input type='text' value='${str}' /></div>`;
          } else {
            if (cell.value) str = cell.value;
          }
        }
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let level = grid.getValue(dataCell.index.itemIndex, 'level');
      let lvlNm = grid.getValue(dataCell.index.itemIndex, 'lvlNm');
      let ret = {};
      if (level != 'top') {
        if (!lvlNm) {
          ret.editable = true;
        }
      } else {
        ret.editable = false;
      }
      return ret;
    },
    width: 200,
  },
  {
    fieldName: 'lvlKorNm',
    name: 'lvlKorNm',
    header: {
      text: '한국어',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        let level = grid.getValue(cell.index.itemIndex, 'level');
        if (level != 'top') {
          if (cell.value) str = cell.value;
          str = `<div class='real_form_input'><input type='text' value='${str}' /></div>`;
        }
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let level = grid.getValue(dataCell.index.itemIndex, 'level');
      let ret = {};
      if (level != 'top') {
        ret.editable = true;
      } else {
        ret.editable = false;
      }
      return ret;
    },
    width: 280,
  },
  {
    fieldName: 'lvlEngNm',
    name: 'lvlEngNm',
    header: {
      text: '영어',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        let level = grid.getValue(cell.index.itemIndex, 'level');
        if (level != 'top') {
          if (cell.value) str = cell.value;
          str = `<div class='real_form_input'><input type='text' value='${str}' /></div>`;
        }
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let level = grid.getValue(dataCell.index.itemIndex, 'level');
      let ret = {};
      if (level != 'top') {
        ret.editable = true;
      } else {
        ret.editable = false;
      }
      return ret;
    },
    width: 280,
  },
  {
    fieldName: 'lvlVnmNm',
    name: 'lvlVnmNm',
    header: {
      text: '베트남어',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        let level = grid.getValue(cell.index.itemIndex, 'level');
        if (level != 'top') {
          if (cell.value) str = cell.value;
          str = `<div class='real_form_input'><input type='text' value='${str}' /></div>`;
        }
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let level = grid.getValue(dataCell.index.itemIndex, 'level');
      let ret = {};
      if (level != 'top') {
        ret.editable = true;
      } else {
        ret.editable = false;
      }
      return ret;
    },
    width: 280,
  },
  {
    fieldName: 'parentId',
    name: 'parentId',
    header: {
      text: 'parentId',
    },
    visible: false,
  },
  {
    fieldName: 'sort',
    name: 'sort',
    header: {
      text: '우선순위',
    },
    editor: {
      type: 'text',
      inputCharacters: '0-9',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        let level = grid.getValue(cell.index.itemIndex, 'level');
        if (level != 'top') {
          if (cell.value) str = cell.value;
          str = `<div class='real_form_input'><input type='text' value='${str}' /></div>`;
        }
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let level = grid.getValue(dataCell.index.itemIndex, 'level');
      let ret = {};
      if (level != 'top') {
        ret.editable = true;
      } else {
        ret.editable = false;
      }
      return ret;
    },
  },
  {
    fieldName: 'remark',
    name: 'remark',
    header: {
      text: 'remark',
    },
    visible: false,
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
    fieldName: 'updatedBy',
    name: 'updatedBy',
    header: {
      text: 'updatedBy',
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
  {
    fieldName: 'useYn',
    name: 'useYn',
    header: {
      text: '사용여부',
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
        let level = grid.getValue(cell.index.itemIndex, 'level');
        try {
          if (level != 'top') {
            if (cell.value) {
              const option = JSON.parse(cell.value);
              str = option.text;
            }
          }
        } catch (e) {
          if (level != 'top') {
            if (cell.value) {
              str = cell.value;
            }
          }
        }
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let level = grid.getValue(dataCell.index.itemIndex, 'level');
      let ret = {};
      if (level != 'top') {
        ret.editable = true;
      } else {
        ret.editable = false;
      }
      return ret;
    },
  },
];

// export const layout = ['lvlId', 'level', 'lvlCd', 'lvlNm', 'lvlKorNm', 'lvlEngNm', 'lvlVnmNm', 'sort', 'remark', 'updatedByNm', 'updatedBy', 'updatedAt', 'useYn'];
