export const cityCdCodes = { id: 'cityCd', levels: 1, keys: [], values: [] };
export const distrCdCodes = { id: 'distrCd', levels: 2, tags: [], keys: [], values: [] };
// export const clickedRow = { index: [], name: [], areaIndex: [], areaName: [] };

export const fields = [
  {
    fieldName: 'sort',
    dataType: 'text',
  },
  {
    fieldName: 'compCd',
    dataType: 'text',
  },
  {
    fieldName: 'useYn',
    dataType: 'list',
  },
  {
    fieldName: 'plntCd',
    dataType: 'text',
  },
  {
    fieldName: 'plntNm',
    dataType: 'text',
  },
  {
    fieldName: 'plntKorNm',
    dataType: 'text',
  },
  {
    fieldName: 'plntEngNm',
    dataType: 'text',
  },
  {
    fieldName: 'plntVnmNm',
    dataType: 'text',
  },
  {
    fieldName: 'savPosCd',
    dataType: 'text',
  },
  {
    fieldName: 'cityCd',
    dataType: 'text',
  },
  {
    fieldName: 'distrCd',
    dataType: 'text',
  },
  {
    fieldName: 'postNum',
    dataType: 'text',
  },
  {
    fieldName: 'addrKor',
    dataType: 'text',
  },
  {
    fieldName: 'addrEng',
    dataType: 'text',
  },
  {
    fieldName: 'addrVnm',
    dataType: 'text',
  },

  {
    fieldName: 'createdAt',
    dataType: 'text',
  },
  {
    fieldName: 'updatedAt',
    dataType: 'text',
  },
  {
    fieldName: 'updatedBy',
    dataType: 'text',
  },
  {
    fieldName: 'updatedByNm',
    dataType: 'text',
  },
  {
    fieldName: 'id',
    dataType: 'text',
  },
  {
    fieldName: 'addr',
    dataType: 'text',
  },
];

export const columns = [
  {
    fieldName: 'sort',
    name: 'sort',
    header: {
      text: 'sort',
    },
    visible: false,
  },
  {
    fieldName: 'createdAt',
    name: 'createdAt',
    header: {
      text: 'createdAt',
    },
  },
  {
    fieldName: 'updatedAt',
    name: 'updatedAt',
    header: {
      text: 'updatedAt',
    },
  },
  {
    fieldName: 'updatedBy',
    name: 'updatedBy',
    header: {
      text: 'updatedBy',
    },
  },
  {
    fieldName: 'updatedByNm',
    name: 'updatedByNm',
    header: {
      text: 'updatedByNm',
    },
  },
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: 'id',
    },
  },
  {
    fieldName: 'compCd',
    name: 'compCd',
    header: {
      text: '회사코드',
    },
    visible: false,
  },
  {
    fieldName: 'plntCd',
    name: 'plntCd',
    header: {
      text: '플랜트 코드',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = `<div class='real_form_input'><input type='text' style='text-align:center' value='${cell.value}' /></div>`;
        return str;
      },
    },
    editable: true,
  },
  {
    fieldName: 'plntKorNm',
    name: 'plntKorNm',
    header: {
      text: '플랜트명 한국어',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = `<div class='real_form_input'><input type='text' style='text-align:left' value='${cell.value}' /></div>`;
        return str;
      },
    },
    editable: true,
    styleName: 't-l',
    width: 130,
  },
  {
    fieldName: 'plntEngNm',
    name: 'plntEngNm',
    header: {
      text: '플랜트명 영어',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = `<div class='real_form_input'><input type='text' style='text-align:left' value='${cell.value}' /></div>`;
        return str;
      },
    },
    editable: true,
    styleName: 't-l',
    width: 130,
  },
  {
    fieldName: 'plntVnmNm',
    name: 'plntVnmNm',
    header: {
      text: '플랜트명 베트남어',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = `<div class='real_form_input'><input type='text' style='text-align:left' value='${cell.value}' /></div>`;
        return str;
      },
    },
    editable: true,
    styleName: 't-l',
    width: 130,
  },
  {
    fieldName: 'savPosCd',
    name: 'savPosCd',
    header: {
      text: '저장위치',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${cell.value}' /></div>`;
        return str;
      },
    },
    editable: true,
  },
  {
    fieldName: 'cityCd',
    name: 'cityCd',
    header: {
      text: '대권역',
    },
    values: cityCdCodes.keys,
    labels: cityCdCodes.values,
    sortByLabel: true,
    lookupDisplay: true,
    editor: {
      displayLabels: 'label',
      textReadOnly: true,
      type: 'dropdown',
    },
    editButtonVisibility: 'always',
    styleName: 't-l',
    editable: true,
    updatable: true,
    width: 180,
    // renderer: {
    //   type: 'html',
    //   inputFocusable: false,
    //   callback: function (grid, cell) {
    //     let str = '';
    //     str = cell.text;
    //     return str;
    //   },
    // },
  },
  {
    fieldName: 'distrCd',
    name: 'distrCd',
    header: {
      text: '중권역',
    },
    lookupSourceId: 'distrCd',
    lookupKeyFields: ['cityCd', 'distrCd'],
    lookupDisplay: true,
    editor: {
      displayLabels: 'label',
      type: 'dropdown',
      textReadOnly: true,
    },
    editButtonVisibility: 'always',
    updatable: true,
    styleName: 't-l',
    width: 180,
    editable: true,
    // renderer: {
    //   type: 'html',
    //   inputFocusable: false,
    //   callback: function (grid, cell) {
    //     let str = '';
    //     str = cell.value;
    //     return str;
    //   },
    // },
  },
  {
    fieldName: 'postNum',
    name: 'postNum',
    header: {
      text: '우편번호',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = `<div class='real_form_input'><input type='text' style='text-align:center' value='${cell.value}' /></div>`;
        return str;
      },
    },
    editor: {
      maxLength: 20,
      type: 'text',
      inputCharacters: '0-9-',
    },
    editable: true,
  },
  {
    fieldName: 'addr',
    name: 'addr',
    header: {
      text: '주소',
    },
  },
  {
    fieldName: 'addrKor',
    name: 'addrKor',
    header: {
      text: '주소 한국어',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = `<div class='real_form_input'><input type='text' style='text-align:left' value='${cell.value}' /></div>`;
        return str;
      },
    },
    styleName: 't-l',
    width: 350,
    editable: true,
  },
  {
    fieldName: 'addrEng',
    name: 'addrEng',
    header: {
      text: '주소 영어',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = `<div class='real_form_input'><input type='text' style='text-align:left' value='${cell.value}' /></div>`;
        return str;
      },
    },
    editable: true,
    styleName: 't-l',
    width: 350,
  },
  {
    fieldName: 'addrVnm',
    name: 'addrVnm',
    header: {
      text: '주소 베트남어',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = `<div class='real_form_input'><input type='text' style='text-align:left' value='${cell.value}' /></div>`;
        return str;
      },
    },
    styleName: 't-l',
    width: 350,
    editable: true,
  },
  {
    fieldName: 'useYn',
    name: 'useYn',
    header: {
      text: '사용여부',
    },
    editor: {
      type: 'list',
      labels: ['Y', 'N'],
      values: ['Y', 'N'],
      displayLabels: 'label',
      textReadOnly: true,
    },
    editButtonVisibility: 'always',
    editable: true,
  },
  {
    fieldName: 'plntNm',
    name: 'plntNm',
    header: {
      text: '플랜트 명',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = `<div class='real_form_input'><input type='text' style='text-align:left' value='${cell.value}' /></div>`;
        return str;
      },
    },
    editable: true,
    styleName: 't-l',
    width: 130,
  },
];

export const layout = ['sort', 'compCd', 'plntCd', 'plntKorNm', 'plntEngNm', 'plntVnmNm', 'savPosCd', 'cityCd', 'distrCd', 'postNum', 'addrKor', 'addrEng', 'addrVnm', 'useYn'];
