/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

export const cityCdCodes = { id: 'cityCd', levels: 1, keys: [], values: [] };
// eslint-disable-next-line no-unused-vars
export const distrCdCodes = { id: 'distrCd', levels: 2, tags: [], keys: [], values: [] };

const _columns = [
  { fieldName: 'id', name: 'id', dataType: ValueType.NUMBER, header: { text: '번호' }, visible: false }, // : 번호"
  { fieldName: 'trnClsCd', name: 'trnClsCd', dataType: ValueType.TEXT, header: { text: '배송유형코드' }, visible: false }, // : 배송유형코드",
  { fieldName: 'trnClsNm', name: 'trnClsNm', dataType: ValueType.TEXT, header: { text: '배송유형' } }, // : 배송유형",
  {
    fieldName: 'trnCarType',
    name: 'trnCarType',
    dataType: ValueType.TEXT,
    header: { text: '배송형태' },
    editButtonVisibility: 'always',
    updatable: true,
    editable: false,
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
  }, // : 배송형태 명",
  { fieldName: 'custNm', name: 'custNm', dataType: ValueType.TEXT, header: { text: '고객' }, styleName: 't-l' }, // : 고객",
  { fieldName: 'custCd', name: 'custCd', dataType: ValueType.TEXT, header: { text: '고객코드' } }, // : 고객",
  { fieldName: 'poRegStaffNm', name: 'poRegStaffNm', dataType: ValueType.TEXT, header: { text: 'P/O생성자' } }, // : P/O생성자",
  { fieldName: 'bokngNum', name: 'bokngNum', dataType: ValueType.TEXT, header: { text: '부킹번호' } }, // : 부킹번호",
  { fieldName: 'bokngSoNum', name: 'bokngSoNum', dataType: ValueType.TEXT, header: { text: 'ERP S/O번호' } }, // : ERP S/O번호",
  { fieldName: 'bokngSoItemNum', name: 'bokngSoItemNum', dataType: ValueType.NUMBER, header: { text: 'Item No.' }, numberFormat: '#' }, // : 부킹 SO 아이템 번호 (Item No.)",
  { fieldName: 'prdtCd', name: 'prdtCd', dataType: ValueType.TEXT, header: { text: '제품코드' } }, // : 제품코드",
  { fieldName: 'prdtNm', name: 'prdtNm', dataType: ValueType.TEXT, header: { text: '제품명' }, width: 200, styleName: 't-l' }, // : 제품명",
  {
    fieldName: 'trnReqOrdQty',
    name: 'trnReqOrdQty',
    dataType: ValueType.NUMBER,
    header: { text: '주문수량' },
    numberFormat: '#,##0.###',
    styleName: 't-r',
  }, // : 주문수량",
  { fieldName: 'ordUnitNm', name: 'ordUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // "ordUnitNm : 주문 단위 명",
  {
    fieldName: 'trnReqBaseQty',
    name: 'trnReqBaseQty',
    dataType: ValueType.NUMBER,
    header: { text: '출고수량' },
    numberFormat: '#,##0',
    styleName: 't-r',
  }, // : 배송 요청 기본 수량 > '출고수량' (기본단위 일때) -> 단위선택이 없으므로 기본단위로 사용", "trnReqOrdQty : 배송 요청 주문 수량 > '출고수량'",
  {
    fieldName: 'trnSpltQty',
    name: 'trnSpltQty',
    dataType: ValueType.NUMBER,
    header: { text: '출고분할수량' },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      positiveOnly: true,
      numberFormat: '#,##0',
    },
    width: 200,
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let trnPlnNum = grid.getValue(cell.index.itemIndex, 'trnPlnNum');
        let str = cell.value;
        if (cell.value !== null && cell.value) {
          str = cell.value;
        } else {
          str = '';
        }

        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        if (trnPlnNum === '') str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
        return str;
      },
    },
    styleName: 't-r',
  }, // : 출고분할수량"
  { fieldName: 'baseUnitNm', name: 'baseUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // "baseUnitNm : 주문 단위 명",
  { fieldName: 'trnSpltNum', name: 'trnSpltNum', dataType: ValueType.TEXT, header: { text: '분할번호' } }, // : 배송 분할 번호",
  {
    fieldName: 'trnReqRemark',
    name: 'trnReqRemark',
    dataType: ValueType.TEXT,
    header: { text: '주문특이사항' },
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let trnPlnNum = grid.getValue(cell.index.itemIndex, 'trnPlnNum');
        let str = cell.value;
        if (cell.value !== null && cell.value) {
          str = cell.value;
        } else {
          str = '';
        }

        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        if (trnPlnNum === '') str = `<div class='real_form_input'><input type='text' style='text-align:left' value='${str}' /></div>`;
        return str;
      },
    },
    width: 500,
    styleName: 't-l',
  }, // : 배송 요청 코멘트 (주문특이사항)",
  { fieldName: 'inPsbDt', name: 'inPsbDt', dataType: ValueType.TEXT, header: { text: '희망일' }, renderer: 'calendarImgbtn', width: 110 }, // : 입차 희망 일",
  {
    fieldName: 'inPsbTi',
    name: 'inPsbTi',
    dataType: ValueType.TEXT,
    header: { text: '시간' },
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
  }, // : 입차 희망 시간",
  { fieldName: 'trnPsbDt', name: 'trnPsbDt', dataType: ValueType.TEXT, header: { text: '가능일' }, renderer: 'calendarImgbtn', width: 110 }, // : 배송 가능 일",
  {
    fieldName: 'trnPsbTi',
    name: 'trnPsbTi',
    dataType: ValueType.TEXT,
    header: { text: '시간' },
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
  }, // : 배송 가능 시간",
  { fieldName: 'trnHopeDt', name: 'trnHopeDt', dataType: ValueType.TEXT, header: { text: '요청일' } }, // : 배송 희망 일",
  { fieldName: 'trnHopeTi', name: 'trnHopeTi', dataType: ValueType.OBJECT, header: { text: '시간' }, objectKey: 'text' }, // : 배송 희망 시간",
  {
    fieldName: 'logitsAlias',
    name: 'logitsAlias',
    dataType: ValueType.TEXT,
    header: { text: '배송지명' },
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let trnPlnNum = grid.getValue(cell.index.itemIndex, 'trnPlnNum');
        let str = cell.value;
        if (cell.value !== null && cell.value) {
          str = cell.value;
        } else {
          str = '';
        }

        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        if (trnPlnNum === '') str = `<div class='real_form_input'><input type='text' style='text-align:left' value='${str}' /></div>`;
        return str;
      },
    },
    width: 200,
    styleName: 't-l',
  }, // : 배송지 명",
  {
    fieldName: 'postNum',
    name: 'postNum',
    dataType: ValueType.TEXT,
    header: { text: '우편번호' },
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let trnPlnNum = grid.getValue(cell.index.itemIndex, 'trnPlnNum');
        let str = cell.value;
        if (cell.value !== null && cell.value) {
          str = cell.value;
        } else {
          str = '';
        }

        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        if (trnPlnNum === '') str = `<div class='real_form_input'><input type='text' value='${str}' /></div>`;
        return str;
      },
    },
    styleName: 't-c',
  }, // : 우편 번호",
  {
    fieldName: 'cityCd',
    name: 'cityCd',
    header: {
      text: '대권역',
    },
    dataType: 'text',
    values: cityCdCodes.keys,
    labels: cityCdCodes.values,
    lookupDisplay: true,
    editButtonVisibility: 'always',
    editable: true,
    width: 200,
  },
  {
    fieldName: 'distrCd',
    name: 'distrCd',
    dataType: 'text',
    header: { text: '중권역' },
    lookupSourceId: 'distrCd',
    lookupKeyFields: ['cityCd', 'distrCd'],
    lookupDisplay: true,
    editButtonVisibility: 'always',
    editable: true,
    width: 200,
  }, // : 중권역 명",
  {
    fieldName: 'addr',
    name: 'addr',
    dataType: ValueType.TEXT,
    header: { text: '상세주소' },
    editable: true,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let trnPlnNum = grid.getValue(cell.index.itemIndex, 'trnPlnNum');
        let str = cell.value;
        if (cell.value !== null && cell.value) {
          str = cell.value;
        } else {
          str = '';
        }

        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        if (trnPlnNum === '') str = `<div class='real_form_input'><input type='text' style='text-align:left' value='${str}' /></div>`;
        return str;
      },
    },
    width: 500,
    styleName: 't-l',
  }, // : 주소 (상세주소)",
  {
    fieldName: 'phoneNum1',
    name: 'phoneNum1',
    dataType: ValueType.TEXT,
    header: { text: '전화번호' },
    editable: true,
    editor: {
      type: 'text',
      maxLength: 4,
      inputCharacters: '0-9',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let trnPlnNum = grid.getValue(cell.index.itemIndex, 'trnPlnNum');
        let str = cell.value;
        if (cell.value !== null && cell.value) {
          str = cell.value;
        } else {
          str = '';
        }

        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        if (trnPlnNum === '') str = `<div class='real_form_input'><input type='text' style='text-align:center' value='${str}' /></div>`;
        return str;
      },
    },
    styleName: 't-c',
  }, // : 배송지 전화 번호1 (전화번호)",
  {
    fieldName: 'phoneNum2',
    name: 'phoneNum2',
    dataType: ValueType.TEXT,
    header: { text: '전화번호' },
    editable: true,
    editor: {
      type: 'text',
      maxLength: 4,
      inputCharacters: '0-9',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let trnPlnNum = grid.getValue(cell.index.itemIndex, 'trnPlnNum');
        let str = cell.value;
        if (cell.value !== null && cell.value) {
          str = cell.value;
        } else {
          str = '';
        }

        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        if (trnPlnNum === '') str = `<div class='real_form_input'><input type='text'   value='${str}' /></div>`;
        return str;
      },
    },
    styleName: 't-c',
  }, // : 배송지 전화 번호1 (전화번호)",
  {
    fieldName: 'phoneNum3',
    name: 'phoneNum3',
    dataType: ValueType.TEXT,
    header: { text: '전화번호' },
    editable: true,
    editor: {
      type: 'text',
      maxLength: 4,
      inputCharacters: '0-9',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let trnPlnNum = grid.getValue(cell.index.itemIndex, 'trnPlnNum');
        let str = cell.value;
        if (cell.value !== null && cell.value) {
          str = cell.value;
        } else {
          str = '';
        }

        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        if (trnPlnNum === '') str = `<div class='real_form_input'><input type='text'  value='${str}' /></div>`;
        return str;
      },
    },
    styleName: 't-c',
  }, // : 배송지 전화 번호1 (전화번호)",
  { fieldName: 'outStatNm', name: 'outStatNm', dataType: ValueType.TEXT, header: { text: '출고상태' } }, // : 출고상태 명",
  {
    fieldName: 'trnPlnNum',
    name: 'trnPlnNum',
    dataType: ValueType.TEXT,
    header: { text: '배차계획번호' },
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = '';
        if (cell.value !== null && cell.value) {
          str = cell.value;
        } else {
          str = '';
        }
        str = '<p class="underline">' + cell.value + '</p>';
        return str;
      },
    },
    // mergeRule: {
    //   criteria: 'value',
    // },
  }, // : 배송 계획 번호 (배차계획번호) -> 배차계획번호가 있으면 운송사명까지 머지",
  { fieldName: 'trncusNm', name: 'trncusNm', dataType: ValueType.TEXT, header: { text: '운송사명' }, styleName: 't-l', width: 300 }, // : 운송사명",
  { fieldName: 'carType', name: 'carType', dataType: ValueType.TEXT, header: { text: '차량유형' }, visible: false }, // : 배송 차량 유형",
  { fieldName: 'carTypeNm', name: 'carTypeNm', dataType: ValueType.TEXT, header: { text: '차량유형' } }, // : 배송 차량 유형",
  { fieldName: 'plntNm', name: 'plntNm', dataType: ValueType.TEXT, header: { text: '플랜트' } }, // : 상차 플랜트 명 (플랜트)",
  { fieldName: 'upSiteNm', name: 'upSiteNm', dataType: ValueType.TEXT, header: { text: '상차지' } }, // : 상차지",
  { fieldName: 'userNm', name: 'userNm', dataType: ValueType.TEXT, header: { text: '영업사원명' } }, // : 영업사원명",
  { fieldName: 'reqDt', name: 'reqDt', dataType: ValueType.TEXT, header: { text: '출고요청일' } }, // : 요청 일",
  {
    fieldName: 'trnReqVol',
    name: 'trnReqVol',
    dataType: ValueType.NUMBER,
    header: { text: '부피' },
    numberFormat: '#,##0.###',
    styleName: 't-r',
  }, // : 배송 요청 부피",
  { fieldName: 'volUnitNm', name: 'volUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 부피 단위 명",
  {
    fieldName: 'trnReqWght',
    name: 'trnReqWght',
    dataType: ValueType.NUMBER,
    header: { text: '무게' },
    numberFormat: '#,##0.###',
    styleName: 't-r',
  }, // : 배송 요청 중량",
  { fieldName: 'wghtUnitNm', name: 'wghtUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 무게 단위 명",

  { fieldName: 'offrClsNm', name: 'offrClsNm', dataType: ValueType.TEXT, header: { text: '주문유형' }, visible: false }, // : 주문유형 명",
  { fieldName: 'offrNum', name: 'offrNum', dataType: ValueType.TEXT, header: { text: '주문번호' }, visible: false }, // : 주문번호",
  { fieldName: 'offrId', name: 'offrId', dataType: ValueType.TEXT, header: { text: 'offrId' }, visible: false }, // : offrId",
  { fieldName: 'totalTrnOrgOrdQty', name: 'totalTrnOrgOrdQty', dataType: ValueType.NUMBER, header: { text: '총수량' }, numberFormat: '#,##0.###', styleName: 't-r', visible: false }, // : 총수량",
  { fieldName: 'baseUnitNm2', name: 'baseUnitNm2', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 기본 단위 명
  { fieldName: 'totalTrnReqVol', name: 'totalTrnReqVol', dataType: ValueType.NUMBER, header: { text: '총부피' }, numberFormat: '#,##0.###', styleName: 't-r', visible: false }, // : 총부피",
  { fieldName: 'volUnitNm2', name: 'volUnitNm2', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 부피 단위 명",
  { fieldName: 'totalTrnReqWght', name: 'totalTrnReqWght', dataType: ValueType.TEXT, header: { text: '총무게' }, numberFormat: '#,##0.###', styleName: 't-r', visible: false }, // : 총중량"",
  { fieldName: 'wghtUnitNm2', name: 'wghtUnitNm2', dataType: ValueType.TEXT, header: { text: '단위' }, visible: false }, // : 무게 단위 명",
  { fieldName: 'savPosNm', name: 'savPosNm', dataType: ValueType.TEXT, header: { text: '상차지저장위치' }, visible: false }, // : 저장 위치 명 (상차지저장위치)",
  { fieldName: 'compNm', name: 'compNm', dataType: ValueType.TEXT, header: { text: '사업부' }, visible: false }, // : 사업부",
  {
    fieldName: 'trnNum',
    name: 'trnNum',
    dataType: ValueType.TEXT,
    header: { text: '배송번호' },
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = '';
        if (cell.value !== null) {
          str = cell.value;
          str = '<p class="underline">' + cell.value + '</p>';
        } else {
          str = '';
        }
        return str;
      },
    },
  }, // : 배송 번호",
  { fieldName: 'outStatCd', name: 'outStatCd', dataType: ValueType.TEXT, header: { text: 'outStatCd' }, visible: false }, // : 출고상태",
  { fieldName: 'trnCarNum', name: 'trnCarNum', dataType: ValueType.TEXT, header: { text: 'trnCarNum' }, visible: false }, // : trnCarNum",
  { fieldName: 'driverPhoneNum', name: 'driverPhoneNum', dataType: ValueType.TEXT, header: { text: 'driverPhoneNum' }, visible: false }, // : driverPhoneNum",
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
  'id',
  'trnClsCd',
  'trnClsNm', // 배송유형, 1
  'trnCarType', // 배송방법, 2
  'trnPlnNum', // 출고계획번호, 3
  'trncusNm', // 운송사, 4
  'userNm', // 영업사원명, 5
  'custCd', // 고객코드, 6
  'custNm', // 고객, 7
  'trnNum', // 배송요청번호, 8
  'plntNm', // 플랜트, 9
  'prdtCd', // 제품코드, 10
  'prdtNm', // 제품명, 11
  {
    name: 'forwardingOrd', // 주문단위
    direction: 'horizontal',
    header: {
      text: '주문단위',
      tooltip: '주문단위',
      showTooltip: true,
    },
    items: ['trnReqOrdQty', 'ordUnitNm'], // 수량, 단위, 12, 13
  },
  {
    name: 'forwardingQtyHeader', // 출고단위
    direction: 'horizontal',
    header: {
      text: '출고수량정보',
      tooltip: '출고수량정보',
      showTooltip: true,
    },
    items: ['trnReqBaseQty', 'trnSpltQty', 'baseUnitNm'], // 수량, 분할수량, 단위, 14, 15, 16
  },
  'trnSpltNum', // 분할번호,
  {
    name: 'volHeader', // 부피
    direction: 'horizontal',
    header: {
      text: '부피',
      tooltip: '부피',
      showTooltip: true,
    },
    items: ['trnReqVol', 'volUnitNm'], // 수량, 단위, 17, 18
  },
  {
    name: 'wghtHeader', // 중량
    direction: 'horizontal',
    header: {
      text: '중량',
      tooltip: '중량',
      showTooltip: true,
    },
    items: ['trnReqWght', 'wghtUnitNm'], // 수량, 단위, 19, 20
  },
  'trnReqRemark', // 특이사항, 21
  'reqDt', // 배송요청일(고객), 22
  {
    name: 'trnHope', // 배송희망일(고객)
    direction: 'horizontal',
    header: {
      text: '고객배송희망일시',
      tooltip: '고객배송희망일시',
      showTooltip: true,
    },
    items: ['trnHopeDt', 'trnHopeTi'], // 날짜, 시간, 23, 24
  },
  {
    name: 'trnPsb', // 배송계획일(물류)
    direction: 'horizontal',
    header: {
      text: '최종배송가능일시',
      tooltip: '최종배송가능일시',
      showTooltip: true,
    },
    items: ['trnPsbDt', 'trnPsbTi'], // 날짜, 시간, 25, 26
  },
  {
    name: 'inPsb', // 입차희망일(물류)
    direction: 'horizontal',
    header: {
      text: '입차희망일시',
      tooltip: '입차희망일시',
      showTooltip: true,
    },
    items: ['inPsbDt', 'inPsbTi'], // 날짜, 시간, 27, 28
  },
  'bokngNum', // 부킹번호, 29
  'bokngSoNum', // ERP S/O 번호, 30
  'bokngSoItemNum', // 품번, 31
  'logitsAlias', // 배송지, 34
  'postNum', // 우편번호, 35
  {
    name: 'cityDistr', // 주소
    direction: 'logitsCd',
    hideChildHeaders: false,
    header: {
      text: '배송지 권역',
      tooltip: '배송지 권역',
      showTooltip: true,
    },
    items: ['cityCd', 'distrCd'], // 대권역, 중권역, 36, 37
  },
  'addr', // 주소, 38
  {
    name: 'logitsPhoneNum1', // 연락처
    direction: 'horizontal',
    hideChildHeaders: true,
    header: {
      text: '전화번호',
      tooltip: '전화번호',
      showTooltip: true,
    },
    items: ['phoneNum1', 'phoneNum2', 'phoneNum3'], // 연락처, 39
  },
  'outStatNm', // 출고상태, 40
  'carTypeNm', // 차량유형, 41
  'upSiteNm', // 상차지, 42
  'poRegStaffNm', // P/O 생성자, 43
  'carType',
  'offrClsNm',
  'offrNum',
  'offrId',
  'totalTrnOrgOrdQty',
  // 'baseUnitNm2',
  'totalTrnReqVol',
  // 'volUnitNm2',
  'totalTrnReqWght',
  'wghtUnitNm2',
  'savPosNm',
  'compNm',
];
