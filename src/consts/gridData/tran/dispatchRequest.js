/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
import defs from '@/consts/defs';

export const fields = [
  {
    fieldName: 'trnPlnNum', //배차계획번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarNum', //차량번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'driverPhoneNum', //운전기사핸드폰번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inExptDt', //입차예정일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inExptTi', //입차예정시간
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inExptTiNm', //입차예정시간 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inPsbDt', //희망일-입차 희망 일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inPsbTi', //시간-입차 희망 일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inPsbTiNm', //시간-입차 희망 일시 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPsbDt', //가능일-최종 배송 가능 일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPsbTi', //시간-최종 배송 가능 일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPsbTiNm', //시간-최종 배송 가능 일시 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeDt', //요청일-고객 배송 요청 일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeTi', //시간-고객 배송 요청 일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeTiNm', //시간-고객 배송 요청 일시 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custCd', //고객사 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custNm', //고객사 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'logitsAlias', //배송지명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'postNum', //우편번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cityNm', //배송지 권역-대권역
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'distrNm', //배송지 권역-중권역
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addrDtls', //배송지 상세주소
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addr', //주소
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'logitsPhoneNum1', //배송지 전화번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtNm', //제품명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqBaseQty', //배송 요청 기본 수량
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnReqOrdQty', //배송 요청 주문 수량
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'ordUnitNm', //주문 단위 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'baseUnitNm', //기본 단위 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnOrgVol', //부피-부피단위
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'volUnitNm', //단위-부피단위
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnOrgWght', //중량-중량단위
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'wghtUnitNm', //단위-중량단위
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtCd', //제품코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqAt', //배차요청일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outStatCd', //출고 상태 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outStatNm', //출고상태 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqRemark', //배송특이사항
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarType', //배송형태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarNm', //배송형태 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnNum', //배송번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngNum', //부킹번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'itemNum', //Item No.
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngSoNum', //SAP주문번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngSoItemNum', //Item No.
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnDoNum', //D/O 번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnDoItemNum', //D/O Item번호
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnClsCd', //출고구분
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnClsNm', //출고구분 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'plntNm', //플랜트
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'upSiteNm', //상차지
    dataType: ValueType.TEXT,
  },

  {
    fieldName: 'driverNm', //운전기사이름
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnOrgBaseQty', //배송 원 주문 수량
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnOrgOrdQty', //배송 원 기본 수량
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'compNm', //사업부
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnSpltNum', //분할번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrNum', //주문번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'id', //Id
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trncusNm', //운송사 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trncusId', //운송사 ID
    dataType: ValueType.NUMBER,
  },
];

export const columns = [
  {
    fieldName: 'trnPlnNum',
    name: 'trnPlnNum',
    header: {
      text: '배차계획번호',
    },
    width: 130,
    editable: false,
    mergeRule: {
      criteria: 'value',
    },
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
  },
  {
    fieldName: 'trnCarNum',
    name: 'trnCarNum',
    header: {
      text: '차량번호',
    },
    width: 120,
    editable: false,
    lookupDisplay: true,
    // renderer: 'searchImgbtn',
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let outStatCd = grid.getValue(cell.index.itemIndex, 'outStatCd');
        let str = '';
        str = cell.value ? cell.value : '';

        if (outStatCd !== defs.outStatCd.disEnd) {
          str = `<div class="rg-renderer" style="max-height: 30px; overflow: hidden;">
                  <input class="search_render_span"value='${str}'>
                  <span class="rg_search_btn"></span>
                </div>`;
        }
        return str;
      },
    },
    // styleCallback: function (grid, dataCell) {
    //   let outStatCd = grid.getValue(dataCell.index.itemIndex, 'outStatCd');
    //   let ret = {};

    //   if (outStatCd !== defs.outStatCd.disEnd) {
    //     ret.editable = false;
    //   }
    //   return ret;
    // },
  },
  {
    fieldName: 'driverPhoneNum',
    name: 'driverPhoneNum',
    header: {
      text: '운전기사핸드폰번호',
    },
    width: 120,
    editable: false,
  },
  {
    fieldName: 'inExptDt',
    name: 'inExptDt',
    header: {
      text: '입차예정일',
    },
    width: 120,
    editable: false,
    lookupDisplay: true,
    // renderer: 'calendarImgbtn',
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let outStatCd = grid.getValue(cell.index.itemIndex, 'outStatCd');
        let str = '';
        str = cell.value ? cell.value : '';

        if (outStatCd !== defs.outStatCd.disEnd) {
          str = `<div class="rg-renderer" style="max-height: 30px; overflow: hidden;">
                  <input class="search_render_span"value='${str}'>
                  <span class="rg_caleandar_btn"></span>
                </div>`;
        }
        return str;
      },
    },
    // styleCallback: function (grid, dataCell) {
    //   let outStatCd = grid.getValue(dataCell.index.itemIndex, 'outStatCd');
    //   let ret = {};

    //   if (outStatCd !== defs.outStatCd.disEnd) {
    //     ret.editable = false;
    //   }
    //   return ret;
    // },
  },
  {
    fieldName: 'inExptTi',
    name: 'inExptTi',
    header: {
      text: '입차예정시간',
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
    styleCallback: function (grid, dataCell) {
      let outStatCd = grid.getValue(dataCell.index.itemIndex, 'outStatCd');
      let ret = {};

      if (outStatCd === defs.outStatCd.disEnd) {
        ret.editable = false;
      }
      return ret;
    },
  },
  {
    fieldName: 'inExptTiNm',
    name: 'inExptTiNm',
    header: {
      text: 'inExptTiNm',
    },
    visible: false,
  },
  {
    fieldName: 'inPsbDt',
    name: 'inPsbDt',
    header: {
      text: '희망일',
    },
    editable: false,
  },
  {
    fieldName: 'inPsbTi',
    name: 'inPsbTi',
    header: {
      text: 'inPsbTi',
    },
    visible: false,
  },
  {
    fieldName: 'inPsbTiNm',
    name: 'inPsbTiNm',
    header: {
      text: '시간',
    },
    editable: false,
  },
  {
    fieldName: 'trnPsbDt',
    name: 'trnPsbDt',
    header: {
      text: '가능일',
    },
    editable: false,
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
    fieldName: 'trnPsbTiNm',
    name: 'trnPsbTiNm',
    header: {
      text: '시간',
    },
    editable: false,
  },
  {
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: '요청일',
    },
    editable: false,
  },
  {
    fieldName: 'trnHopeTi',
    name: 'trnHopeTi',
    header: {
      text: 'trnHopeTi',
    },
    visible: false,
  },
  {
    fieldName: 'trnHopeTiNm',
    name: 'trnHopeTiNm',
    header: {
      text: '시간',
    },
    editable: false,
  },
  {
    fieldName: 'custCd',
    name: 'custCd',
    header: {
      text: 'custCd',
    },
  },
  {
    fieldName: 'custNm',
    name: 'custNm',
    header: {
      text: '고객사명',
    },
    styleName: 't-l',
    width: '200',
    editable: false,
  },
  {
    fieldName: 'logitsAlias',
    name: 'logitsAlias',
    header: {
      text: '배송지명',
    },
    styleName: 't-l',
    width: 180,
    editable: false,
  },
  {
    fieldName: 'postNum',
    name: 'postNum',
    header: {
      text: '우편번호',
    },
    editable: false,
  },
  {
    fieldName: 'cityNm',
    name: 'cityNm',
    header: {
      text: '배송지 권역',
    },
    styleName: 't-l',
    editable: false,
  },
  {
    fieldName: 'distrNm',
    name: 'distrNm',
    header: {
      text: '배송지 권역',
    },
    styleName: 't-l',
    editable: false,
  },
  {
    fieldName: 'addrDtls',
    name: 'addrDtls',
    header: {
      text: '배송지 상세주소',
    },
    styleName: 't-l',
    width: 350,
    editable: false,
    visible: false,
  },
  {
    fieldName: 'addr',
    name: 'addr',
    header: {
      text: '배송지 상세주소',
    },
    styleName: 't-l',
    width: 350,
    editable: false,
  },
  {
    fieldName: 'logitsPhoneNum1',
    name: 'logitsPhoneNum1',
    header: {
      text: '배송지 전화번호',
    },
    width: 120,
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
    fieldName: 'trnReqOrdQty',
    name: 'trnReqOrdQty',
    header: {
      text: '수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
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
    fieldName: 'trnReqBaseQty',
    name: 'trnReqBaseQty',
    header: {
      text: '수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
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
    fieldName: 'trnOrgVol',
    name: 'trnOrgVol',
    header: {
      text: '부피',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    fieldName: 'volUnitNm',
    name: 'volUnitNm',
    header: {
      text: '단위',
    },
    editable: false,
  },
  {
    fieldName: 'trnOrgWght',
    name: 'trnOrgWght',
    header: {
      text: '중량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    fieldName: 'wghtUnitNm',
    name: 'wghtUnitNm',
    header: {
      text: '단위',
    },
    editable: false,
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
    fieldName: 'trnReqAt',
    name: 'trnReqAt',
    header: {
      text: '배차요청일시',
    },
    width: 200,
    editable: false,
  },
  {
    fieldName: 'outStatCd',
    name: 'outStatCd',
    header: {
      text: 'outStatCd',
    },
    visible: false,
  },
  {
    fieldName: 'outStatNm',
    name: 'outStatNm',
    header: {
      text: '출고상태',
    },
    editable: false,
  },
  {
    fieldName: 'trnReqRemark',
    name: 'trnReqRemark',
    header: {
      text: '배송특이사항',
    },
    styleName: 't-l',
    width: 180,
    editable: false,
  },
  {
    fieldName: 'trnCarNm',
    name: 'trnCarNm',
    header: {
      text: '배송형태',
    },
    editable: false,
  },
  {
    fieldName: 'trnNum',
    name: 'trnNum',
    header: {
      text: '배송번호',
    },
    editable: false,
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
  },
  {
    fieldName: 'bokngNum',
    name: 'trnNum',
    header: {
      text: '부킹번호',
    },
  },
  {
    fieldName: 'itemNum',
    name: 'trnNum',
    header: {
      text: 'Item No.',
    },
    numberFormat: '#',
  },
  {
    fieldName: 'bokngSoNum',
    name: 'bokngSoNum',
    header: {
      text: 'SAP주문번호',
    },
    editable: false,
  },
  {
    fieldName: 'bokngSoItemNum',
    name: 'bokngSoItemNum',
    header: {
      text: 'Item No.',
    },
    numberFormat: '#',
    editable: false,
  },
  {
    fieldName: 'trnDoNum',
    name: 'trnDoNum',
    header: {
      text: 'D/O 번호',
    },
    editable: false,
  },
  {
    fieldName: 'trnDoItemNum',
    name: 'trnDoItemNum',
    header: {
      text: 'D/O Item번호',
    },
    numberFormat: '#',
    editable: false,
  },
  {
    fieldName: 'trnClsCd',
    name: 'trnClsCd',
    header: {
      text: 'trnClsCd',
    },
    visible: false,
  },
  {
    fieldName: 'trnClsNm',
    name: 'trnClsNm',
    header: {
      text: '출고구분',
    },
    editable: false,
  },
  {
    fieldName: 'plntNm',
    name: 'plntNm',
    header: {
      text: '플랜트',
    },
    styleName: 't-l',
    width: 130,
    editable: false,
  },
  {
    fieldName: 'upSiteNm',
    name: 'upSiteNm',
    header: {
      text: '상차지',
    },
    styleName: 't-l',
    width: 130,
    editable: false,
  },

  {
    fieldName: 'driverNm',
    name: 'driverNm',
    header: {
      text: '운전기사명',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'trnOrgBaseQty',
    name: 'trnOrgBaseQty',
    header: {
      text: '수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
    visible: false,
  },
  {
    fieldName: 'trnOrgOrdQty',
    name: 'trnOrgOrdQty',
    header: {
      text: '수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
    visible: false,
  },
  {
    fieldName: 'trnCarType',
    name: 'trnCarType',
    header: {
      text: 'trnCarType',
    },
    visible: false,
  },
  {
    fieldName: 'compNm',
    name: 'compNm',
    header: {
      text: '사업부',
    },
    width: 150,
    editable: false,
    visible: false,
  },
  {
    fieldName: 'trnSpltNum',
    name: 'trnSpltNum',
    header: {
      text: '분할번호',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'offrNum',
    name: 'offrNum',
    header: {
      text: '주문번호',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: 'id',
    },
    visible: false,
  },
  {
    fieldName: 'trncusNm',
    name: 'trncusNm',
    header: {
      text: 'trncusNm',
    },
    visible: false,
  },
  {
    fieldName: 'trncusId',
    name: 'trncusId',
    header: {
      text: 'trncusId',
    },
    visible: false,
  },
];

export const layout = [
  'trnPlnNum', // 배차계획번호, 1
  'trnCarNum', // 차량번호, 2
  'driverPhoneNum', // 운송기사 연락처, 3
  {
    name: 'costDtTi', // 배송희망일(고객)
    direction: 'horizontal',
    header: {
      text: '고객 배송 요청 일시',
      tooltip: '고객 배송 요청 일시',
      showTooltip: true,
    },
    items: ['trnHopeDt', 'trnHopeTi', 'trnHopeTiNm'], // 날짜, 시간, 4, 5
  },
  {
    name: 'finalDtTi', // 배송계획일(물류)
    direction: 'horizontal',
    header: {
      text: '최종 배송 가능 일시',
      tooltip: '최종 배송 가능 일시',
      showTooltip: true,
    },
    items: ['trnPsbDt', 'trnPsbTi', 'trnPsbTiNm'], // 날짜, 시간, 6, 7
  },
  'trnReqAt', // 배차요청일, 8
  {
    name: 'hopeDtTi', // 입차희망일(물류)
    direction: 'horizontal',
    header: {
      text: '입차 희망 일시',
      tooltip: '입차 희망 일시',
      showTooltip: true,
    },
    items: ['inPsbDt', 'inPsbTi', 'inPsbTiNm'], // 날짜, 시간, 9, 10
  },
  {
    name: 'inExptDtHeader', // 입차예정일
    direction: 'horizontal',
    header: {
      text: '입차예정일 (운송사)',
      tooltip: '입차예정일 (운송사)',
      showTooltip: true,
    },
    items: ['inExptDt', 'inExptTi', 'inExptTiNm'], // 날짜, 시간, 11, 12
  },
  'custCd', // 고객코드, 13
  'custNm', // 고객, 14
  'logitsAlias', // 배송지, 15
  'postNum', // 우편번호, 16
  {
    name: 'cityDistr', // 주소
    direction: 'logitsCd',
    hideChildHeaders: false,
    header: {
      text: '배송지 권역',
      tooltip: '배송지 권역',
      showTooltip: true,
    },
    items: ['cityNm', 'distrNm'], // 대권역, 중권역, 17, 18
  },
  'addr', // 주소, 19
  'logitsPhoneNum1', // 연락처, 20
  'trnReqRemark', // 특이사항, 21
  'plntNm', // 플랜트, 22
  'upSiteNm', // 상차지, 23
  'prdtCd', // 제품코드, 24
  'prdtNm', // 제품명, 25
  {
    name: 'orderUnit', // 주문단위
    direction: 'horizontal',
    header: {
      text: '주문단위',
      tooltip: '주문단위',
      showTooltip: true,
    },
    items: ['trnReqOrdQty', 'ordUnitNm'], // 수량, 단위, 26, 27
  },
  {
    name: 'fowardUnit', // 출고단위
    direction: 'horizontal',
    header: {
      text: '출고단위',
      tooltip: '출고단위',
      showTooltip: true,
    },
    items: ['trnReqBaseQty', 'baseUnitNm'], // 수량, 단위, 28, 29
  },
  {
    name: 'volUnit', // 부피
    direction: 'horizontal',
    header: {
      text: '부피단위',
      tooltip: '부피단위',
      showTooltip: true,
    },
    items: ['trnOrgVol', 'volUnitNm'], // 수량, 단위, 30, 31
  },
  {
    name: 'weightUnit', // 중량
    direction: 'horizontal',
    header: {
      text: '중량단위',
      tooltip: '중량단위',
      showTooltip: true,
    },
    items: ['trnOrgWght', 'wghtUnitNm'], // 수량, 단위, 32, 33
  },
  'outStatNm', // 출고상태, 34
  'bokngNum', // 부킹번호, 35
  'itemNum', // 아이템번호, 36
  'bokngSoNum', // ERP S/O 번호, 37
  'bokngSoItemNum', // 아이템번호, 38
  'trnNum', // 배송요청번호, 39
  'trnDoNum', // D/O 번호, 40
  'trnDoItemNum', // 아이템번호, 41
  'trnClsNm', // 배송유형, 42
  //
  'trnCarType',
  'addrDtls',
  'outStatCd',
  'trnClsCd',
  'trnOrgOrdQty',
  'trnOrgBaseQty',
  'driverNm',
  'compNm',
  'offrNum',
  'id',
  'trncusNm',
  'trncusId',
];
