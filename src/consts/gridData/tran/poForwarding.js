/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

export const cityCdCodes = { id: 'cityCd', levels: 1, keys: [], values: [] };
// eslint-disable-next-line no-unused-vars
export const distrCdCodes = { id: 'distrCd', levels: 2, tags: [], keys: [], values: [] };

export const fields = [
  {
    fieldName: 'compCd', //회사 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'sapPoNum', //SAP PO 번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'itemNum', //아이템 번호
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnPsbDt', //아이템 번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPsbTi', //배송 가능 시간
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'rtnYn', //반품 Y/N
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'staffNum', //직원 번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'staffNm', //직원 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'plntNm', //상차 플랜트 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upPlntCd', //상차 플랜트 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upSiteCd', //상차 지점 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upSiteNm', //상차지
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upSavePos', //상차 저장 위치
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upStoreNm', //상차 창고 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dwPlntCd', //하차 플랜트 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dwPlntNm', // 하차 플랜트 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dwSavePos', //하차 저장 위치
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarNm', //배송형태 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarType', //배송 차량 유형
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'postNum', //우편 번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cityNm', //시도 구분 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cityCd', //시도 구분
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'distrNm', //구군 코드 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'distrCd', //구군 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addr', //주소
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'phoneNum1', //배송지 전화 번호 1
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'phoneNum2', //배송지 전화 번호 2
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'phoneNum3', //배송지 전화 번호 3
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'logitsPhoneNum2', //배송지 전화2
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtId', //제품 ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtCd', //제품 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtNm', //제품 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'sapOrdQty', //SAP 주문 수량
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'sapBaseQty', //SAP 기본 수량
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ordUnitNm', //SAP 주문 수량
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'baseUnitNm', //SAP 기본 수량
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'reqOrdQty', //요청 주문 수량',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'reqBaseQty', //요청 기본 수량
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'reqTotOrdQty', //요청 합계 주문 수량
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'reqTotBaseQty', //요청 합계 기본 수량
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnHopeDt', //배송 희망 일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeTi', //배송 희망 시간
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'reqDt', //요청 일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'logitsAlias', //배송지 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqRemark', //배송 요청 특이사항
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'compCd',
    name: 'compCd',
    header: {
      text: 'compCd',
    },
    visible: false,
  },
  {
    fieldName: 'sapPoNum',
    name: 'sapPoNum',
    header: {
      text: 'ERP주문번호',
    },
    editable: false,
  },
  {
    fieldName: 'itemNum',
    name: 'itemNum',
    header: {
      text: '주문라인번호',
    },
    numberFormat: '#',
    editable: false,
  },
  {
    fieldName: 'trnPsbDt',
    name: 'trnPsbDt',
    header: {
      text: 'trnPsbDt',
    },
    visible: false,
  },
  {
    fieldName: 'trnPsbTi',
    name: 'trnPsbTi',
    header: {
      text: 'trnPsbTi',
    },
    visible: false,
  },
  {
    fieldName: 'rtnYn',
    name: 'rtnYn',
    header: {
      text: '반품여부',
    },
    editable: false,
  },
  {
    fieldName: 'staffNum',
    name: 'staffNum',
    header: {
      text: 'staffNum',
    },
    visible: false,
  },
  {
    fieldName: 'staffNm',
    name: 'staffNm',
    header: {
      text: 'PO출고등록 직원명',
    },
    width: '200',
    editable: false,
  },
  {
    fieldName: 'plntNm',
    name: 'plntNm',
    header: {
      text: '상차플랜트',
    },
    editable: false,
  },
  {
    fieldName: 'upPlntCd',
    name: 'upPlntCd',
    header: {
      text: 'upPlntCd',
    },
    visible: false,
  },
  {
    fieldName: 'upSiteCd',
    name: 'upSiteCd',
    header: {
      text: 'upSiteCd',
    },
    visible: false,
  },
  {
    fieldName: 'upSiteNm',
    name: 'upSiteNm',
    header: {
      text: '상차지',
    },
    editable: false,
  },
  {
    fieldName: 'upSavePos',
    name: 'upSavePos',
    header: {
      text: 'upSavePos',
    },
    visible: false,
  },
  {
    fieldName: 'upStoreNm',
    name: 'upStoreNm',
    header: {
      text: 'upStoreNm',
    },
    visible: false,
  },
  {
    fieldName: 'dwSavePos',
    name: 'dwSavePos',
    header: {
      text: 'dwSavePos',
    },
    visible: false,
  },
  {
    fieldName: 'trnCarNm',
    name: 'trnCarNm',
    header: {
      text: 'trnCarNm',
    },
    visible: false,
  },
  {
    fieldName: 'trnCarType',
    name: 'trnCarType',
    header: {
      text: '배송형태',
    },
    editor: {},
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
  },
  {
    fieldName: 'dwPlntCd',
    name: 'dwPlntCd',
    header: {
      text: '도착플랜트',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'dwPlntNm',
    name: 'dwPlntNm',
    header: {
      text: '도착플랜트명',
    },
    editable: false,
  },
  {
    fieldName: 'postNum',
    name: 'postNum',
    header: {
      text: '배송지우편번호',
    },
    editor: {
      maxLength: 20,
      type: 'text',
      inputCharacters: '0-9-',
    },
    // renderer: {
    //   type: 'html',
    //   inputFocusable: false,
    //   callback: function (grid, cell) {
    //     let str = '';
    //     str = cell.value ? cell.value : '';
    //     str = `<div class='real_form_input'><input type='text' value='${str}' /></div>`;
    //
    //     return str;
    //   },
    // },
    editable: false,
    lookupDisplay: true,
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
      type: 'dropdown',
    },
    editButtonVisibility: 'always',
    editable: false,
    updatable: true,
    width: 200,
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
    fieldName: 'cityNm',
    name: 'cityNm',
    header: {
      text: 'cityNm',
    },
    visible: false,
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
      type: 'dropdown',
    },
    editButtonVisibility: 'always',
    editable: false,
    width: 200,
  },
  {
    fieldName: 'distrNm',
    name: 'distrNm',
    header: {
      text: 'distrNm',
    },
    visible: false,
  },
  {
    fieldName: 'addr',
    name: 'addr',
    header: {
      text: '배송지 상세주소',
    },
    // renderer: {
    //   type: 'html',
    //   inputFocusable: false,
    //   callback: function (grid, cell) {
    //     let str = '';
    //     str = cell.value ? cell.value : '';
    //     str = `<div class='real_form_input'><input type='text' style='text-align:left;' value='${str}' /></div>`;
    //
    //     return str;
    //   },
    // },
    width: 500,
    editable: false,
    lookupDisplay: true,
    styleName: 't-l',
  },
  {
    fieldName: 'phoneNum1',
    name: 'phoneNum1',
    editor: {
      type: 'text',
      maxLength: 4,
      inputCharacters: '0-9',
    },
    // renderer: {
    //   type: 'html',
    //   inputFocusable: false,
    //   callback: function (grid, cell) {
    //     let str = '';
    //     str = cell.value ? cell.value : '';
    //
    //     str = `<div class="form_input"><input type="text" style='text-align:center; width: 100%' value='${str}'/></div>`;
    //     return str;
    //   },
    // },
    editable: false,
    lookupDisplay: true,
  },
  {
    fieldName: 'phoneNum2',
    name: 'phoneNum2',
    editor: {
      type: 'text',
      maxLength: 4,
      inputCharacters: '0-9',
    },
    // renderer: {
    //   type: 'html',
    //   inputFocusable: false,
    //   callback: function (grid, cell) {
    //     let str = '';
    //     str = cell.value ? cell.value : '';
    //
    //     str = `<div class="form_input"><input type="text" style='text-align:center; width: 100%' value='${str}'/></div>`;
    //     return str;
    //   },
    // },
    editable: false,
    lookupDisplay: true,
  },
  {
    fieldName: 'phoneNum3',
    name: 'phoneNum3',
    editor: {
      maxLength: 4,
      type: 'text',
      inputCharacters: '0-9',
    },
    // renderer: {
    //   type: 'html',
    //   inputFocusable: false,
    //   callback: function (grid, cell) {
    //     let str = '';
    //     str = cell.value ? cell.value : '';
    //
    //     str = `<div class="form_input"><input type="text" style='text-align:center; width: 100%' value='${str}'/></div>`;
    //     return str;
    //   },
    // },
    editable: false,
    lookupDisplay: true,
  },
  {
    fieldName: 'logitsPhoneNum2',
    name: 'logitsPhoneNum2',
    header: {
      text: 'logitsPhoneNum2',
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
    fieldName: 'prdtCd',
    name: 'prdtCd',
    header: {
      text: '제품코드',
    },
    editable: false,
  },
  {
    fieldName: 'prdtNm',
    name: 'prdtNm',
    header: {
      text: '제품명',
    },
    width: 350,
    styleName: 't-l',
    editable: false,
  },
  {
    fieldName: 'sapOrdQty',
    name: 'sapOrdQty',
    header: {
      text: '수량',
    },
    styleName: 't-r',
    numberFormat: '#,###.###',
    editable: false,
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
    fieldName: 'sapBaseQty',
    name: 'sapBaseQty',
    header: {
      text: '수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm1',
    header: {
      text: '단위',
    },
    editable: false,
  },
  {
    fieldName: 'reqOrdQty',
    name: 'reqOrdQty',
    header: {
      text: 'reqOrdQty',
    },
    visible: false,
    numberFormat: '#,###.###',
  },
  {
    fieldName: 'reqBaseQty',
    name: 'reqBaseQty',
    header: {
      text: '수량',
    },
    editor: {
      type: 'number',
      positiveOnly: true,
      editFormat: '#,##0',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        } else {
          str = 0;
        }

        str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;

        return str;
      },
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: true,
    lookupDisplay: true,
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm2',
    header: {
      text: '단위',
    },
    editable: false,
  },
  {
    fieldName: 'reqTotOrdQty',
    name: 'reqTotOrdQty',
    header: {
      text: 'reqTotOrdQty',
    },
    visible: false,
    numberFormat: '#,###.###',
  },
  {
    fieldName: 'reqTotBaseQty',
    name: 'reqTotBaseQty',
    header: {
      text: '수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm3',
    header: {
      text: '단위',
    },
    editable: false,
  },
  {
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: '배송희망일',
    },
    width: 120,
    editable: false,
    // renderer: 'calendarImgbtn',
  },
  {
    fieldName: 'trnHopeTi',
    name: 'trnHopeTi',
    header: {
      text: '배송희망시간',
    },
    editor: {},
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
  },
  {
    fieldName: 'reqDt',
    name: 'reqDt',
    header: {
      text: '주문일자',
    },
    editable: false,
  },
  {
    fieldName: 'logitsAlias',
    name: 'logitsAlias',
    header: {
      text: '배송지명',
    },
    // renderer: {
    //   type: 'html',
    //   inputFocusable: false,
    //   callback: function (grid, cell) {
    //     let str = '';
    //     str = cell.value ? cell.value : '';
    //     str = `<div class='real_form_input'><input type='text' style='text-align:left;' value='${str}' /></div>`;
    //
    //     return str;
    //   },
    // },
    width: 250,
    editable: false,
    lookupDisplay: true,
    styleName: 't-l',
  },
  {
    fieldName: 'trnReqRemark',
    name: 'trnReqRemark',
    header: {
      text: '주문특이사항',
    },
    // renderer: {
    //   type: 'html',
    //   inputFocusable: false,
    //   callback: function (grid, cell) {
    //     let str = '';
    //     str = cell.value ? cell.value : '';
    //     str = `<div class='real_form_input'><input type='text' style='text-align:left;' value='${str}' /></div>`;
    //
    //     return str;
    //   },
    // },
    width: 500,
    editable: false,
    lookupDisplay: true,
    styleName: 't-l',
  },
];

export const layout = [
  'compCd',
  'sapPoNum', // ERP P/O No., 1
  'itemNum', // 품번, 2
  'reqDt', // 오더생성일, 3
  {
    name: 'costDtTi', // 배송희망일(고객)
    direction: 'horizontal',
    header: {
      text: '고객 배송 요청 일시',
      tooltip: '고객 배송 요청 일시',
      showTooltip: true,
    },
    items: ['trnHopeDt', 'trnHopeTi'], // 날짜, 시간, 4, 5
  },
  'rtnYn', // 반품여부, 6
  'plntNm', // 출발플랜트, 7
  'upSiteNm', // 상차지, 8
  'trnCarType', // 배송방법, 9
  'prdtCd', // 제품코드, 10
  'prdtNm', // 제품명, 11
  {
    name: 'orderUnit', // 주문단위
    direction: 'horizontal',

    header: {
      text: '주문단위',
      tooltip: '주문단위',
      showTooltip: true,
    },
    items: ['sapOrdQty', 'ordUnitNm'], // 수량, 단위, 12, 13
  },
  {
    name: 'baseUnit', // P/O단위
    direction: 'horizontal',

    header: {
      text: '기본단위',
      tooltip: '기본단위',
      showTooltip: true,
    },
    items: ['sapBaseQty', 'baseUnitNm1'], // 수량, 단위, 14, 15
  },
  {
    name: 'ForwarReqUnit', // 출고요청단위
    direction: 'horizontal',

    header: {
      text: '출고요청단위',
      tooltip: '출고요청단위',
      showTooltip: true,
    },
    items: ['reqBaseQty', 'baseUnitNm2'], // 수량, 단위, 16, 17
  },
  {
    name: 'ForwarAccumUnit', // 출고누적단위
    direction: 'horizontal',

    header: {
      text: '출고누적단위',
      tooltip: '출고누적단위',
      showTooltip: true,
    },
    items: ['reqTotBaseQty', 'baseUnitNm3'], // 수량, 단위, 18, 19
  },
  'staffNm', // PO생성자, 20
  'dwPlntNm', // 도착플랜트, 21
  'logitsAlias', // 배송지, 22
  'postNum', // 우편번호, 23
  {
    name: 'addressArea', // 주소
    direction: 'horizontal',

    header: {
      text: '주소지권역',
      tooltip: '주소지권역',
      showTooltip: true,
    },
    items: ['cityNm', 'cityCd', 'distrNm', 'distrCd'], // 대권역, 중권역, 24, 25
  },
  'addr', // 주소, 26
  {
    name: 'logitsPhoneNum1', // 연락처
    direction: 'logitsPhoneNum1',
    hideChildHeaders: true,
    header: {
      text: '배송지 전화번호1',
      tooltip: '배송지 전화번호1',
      showTooltip: true,
    },
    items: ['phoneNum1', 'phoneNum2', 'phoneNum3'], // 연락처, 27
  },
  'trnReqRemark', // 특이사항, 28
  'trnPsbDt',
  'trnPsbTi',
  'staffNum',
  'upPlntCd',
  'upSiteCd',
  'upSavePos',
  'upStoreNm',
  'dwSavePos',
  'trnCarNm',
  'dwPlntCd',
  'logitsPhoneNum2',
  'prdtId',
];
