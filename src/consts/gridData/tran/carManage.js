export const fields = [
  {
    fieldName: 'id',
    dataType: 'text',
  },
  {
    fieldName: 'trncusId',
    dataType: 'text',
  },
  {
    fieldName: 'tranCarNum',
    dataType: 'text',
  },
  {
    fieldName: 'carTypeId',
    dataType: 'text',
  },
  {
    fieldName: 'driverNm',
    dataType: 'text',
  },
  {
    fieldName: 'driverMobileNum',
    dataType: 'text',
  },
  {
    fieldName: 'driverPhoneNum',
    dataType: 'text',
  },
  {
    fieldName: 'driverRemark',
    dataType: 'text',
  },
  {
    fieldName: 'useYn',
    dataType: 'list',
  },
  {
    fieldName: 'userStatus',
    dataType: 'text',
  },
  {
    fieldName: 'lastLoginAt',
    dataType: 'text',
  },
  {
    fieldName: 'tokenKey',
    dataType: 'text',
  },
  {
    fieldName: 'language',
    dataType: 'text',
  },
  {
    fieldName: 'timeZone',
    dataType: 'text',
  },
  {
    fieldName: 'siteCd',
    dataType: 'text',
  },
  {
    fieldName: 'trncusNm',
    dataType: 'text',
  },
  {
    fieldName: 'updatedByNm',
    dataType: 'text',
  },
  {
    fieldName: 'updatedAt',
    dataType: 'text',
  },
  {
    fieldName: 'compCd',
    dataType: 'text',
  },
  {
    fieldName: 'carTypeNm',
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
    fieldName: 'trncusId',
    name: 'trncusId',
    header: {
      text: '운송사 ID',
    },
    visible: false,
  },
  {
    fieldName: 'tranCarNum',
    name: 'tranCarNum',
    header: {
      text: '운송 차량 번호',
    },
    visible: true,
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = cell.value;
        str = '<p class="underline">' + cell.value + '</p>';
        return str;
      },
    },
  },
  {
    fieldName: 'carTypeId',
    name: 'carTypeId',
    header: {
      text: '차량 유형 ID',
    },
    visible: false,
  },
  {
    fieldName: 'carTypeNm',
    name: 'carTypeNm',
    header: {
      text: '차량 유형 명',
    },
    visible: true,
  },
  {
    fieldName: 'driverNm',
    name: 'driverNm',
    header: {
      text: '운전자 명',
    },
    visible: true,
    styleName: 't-l',
  },
  {
    fieldName: 'driverMobileNum',
    name: 'driverMobileNum',
    header: {
      text: '운전자 휴대전화 번호',
    },
    visible: true,
  },
  {
    fieldName: 'driverPhoneNum',
    name: 'driverPhoneNum',
    header: {
      text: '운전자 전화 번호',
    },
    visible: true,
  },
  {
    fieldName: 'driverRemark',
    name: 'driverRemark',
    header: {
      text: '사용 불가능 사유',
    },
    styleName: 't-l',
    visible: true,
    width: 200,
    // renderer: {
    //   type: 'html',
    //   // inputFocusable: false,
    //   callback: function (grid, cell) {
    //     let useYn = grid.getValue(cell.index.itemIndex, 'useYn');
    //     let str = '';
    //     if (useYn == 'Y') {
    //       str = '';
    //     } else {
    //       let value = cell.value !== undefined ? cell.value : '';
    //       str = `<div class='real_form_input'><input type='text' value='${value}'/></div>`;
    //     }
    //     return str;
    //   },
    // },
    // styleCallback: function (grid, dataCell) {
    //   let useYn = grid.getValue(dataCell.index.itemIndex, 'useYn');
    //   let ret = {};
    //   if (useYn == 'Y') {
    //     ret.editable = false;
    //   } else if (useYn == 'N') {
    //     ret.editable = true;
    //   }
    //   return ret;
    // },
  },
  {
    name: 'useYn',
    fieldName: 'useYn',
    header: {
      text: '사용 Y/N',
    },
    width: 50,
    // editor: {
    //   type: 'list',
    //   labels: ['N', 'Y'],
    //   values: ['N', 'Y'],
    //   displayLabels: 'label',
    //   textReadOnly: true,
    // },
    // editButtonVisibility: 'always',
    // editable: true,
  },
  {
    fieldName: 'userStatus',
    name: 'userStatus',
    header: {
      text: '사용자 상태',
    },
    visible: false,
  },
  {
    fieldName: 'lastLoginAt',
    name: 'lastLoginAt',
    header: {
      text: '마지막 로그인 일시',
    },
    visible: false,
  },
  {
    fieldName: 'tokenKey',
    name: 'tokenKey',
    header: {
      text: '토큰 키',
    },
    visible: false,
  },
  {
    fieldName: 'language',
    name: 'language',
    header: {
      text: '로케일',
    },
    visible: false,
  },
  {
    fieldName: 'timeZone',
    name: 'timeZone',
    header: {
      text: '타임 존',
    },
    visible: false,
  },
  {
    fieldName: 'siteCd',
    name: 'siteCd',
    header: {
      text: '지역 코드',
    },
    visible: false,
  },
  {
    fieldName: 'trncusNm',
    name: 'trncusNm',
    header: {
      text: '운송사 명',
    },
    visible: true,
    width: 150,
    styleName: 't-l',
  },
  {
    fieldName: 'updatedByNm',
    name: 'updatedByNm',
    header: {
      text: '작업자',
    },
    visible: false,
  },
  {
    fieldName: 'updatedAt',
    name: 'updatedAt',
    header: {
      text: '최종수정',
    },
    visible: false,
  },
  {
    fieldName: 'compCd',
    name: 'compCd',
    header: {
      text: '123123',
    },
    visible: true,
  },
];

export const layout = [
  'trncusNm',
  'tranCarNum',
  'carTypeNm',
  {
    name: 'driverInfo',
    direction: 'horizontal',
    header: {
      text: '기사정보',
    },
    items: ['driverNm', 'compCd', 'driverMobileNum', 'driverPhoneNum'],
  },
  'useYn',
  'driverRemark',
];
