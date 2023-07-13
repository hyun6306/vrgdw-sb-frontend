/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

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
    fieldName: 'outStatCd', //출고 상태 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outStatNm', //출고상태 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCfmAt', //배차확정일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCmplAt', //배차완료일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqAt', //배차요청일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarType',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarNm', //배송형태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'plntNm', //배송형태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outTypeCd', //출고유형
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outTypeNm', //출고유형 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeDt', //배송희망일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeTi', //배송희망시간
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inPsbDt', //입차희망일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inPsbTiNm', //입차희망시간
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inExptDt', //입차예정일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inExptTiNm', //입차예정시간
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeTiNm', //배송희망시간
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnNum', //배송번호
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
    fieldName: 'bokngSoItemNum', //Item No.
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngSoNum', //SAP주문번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnDoNum', //D/O 번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnDoItemNum', //D/O Item 번호
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
    fieldName: 'upSiteNm', //상차지
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'poRegStaffNm', //PO 출고등록 직원명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custCd', //고객사 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custNm', //고객사명
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
    fieldName: 'cityNm', //배송지 권역
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'distrNm', //배송지 권역
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addrDtls', //배송지 상세주소
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addr', //배송지 상세주소
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'logitsPhoneNum1', //배송지 전화번호1
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'invoiceNum', //송장번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'compNm', //사업부
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtCd', //제품코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtNm', //제품명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqOrdQty', //수량-주문단위
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'ordUnitNm', //주문 단위 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqBaseQty', //수량-출고단위
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'baseUnitNm', //기본 단위 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqVol', //부피-부피단위
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'volUnitNm', //단위-부피단위
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqWght', //중량-중량단위
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'wghtUnitNm', //단위-중량단위
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnOrgBaseQty', //단위-재고 할당된 수량
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqRemark', //주문특이사항
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'id', //주문특이사항
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trncusNm', // 운송사
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngNum', // 부킹번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'itemNum', // 아이템번호
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
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = cell.value;
        str = '<p class="underline">' + cell.value + '</p>';

        return str;
      },
    },
    width: 130,
    editable: false,
    mergeRule: {
      criteria: 'value',
    },
  },
  {
    fieldName: 'trnCarNum',
    name: 'trnCarNum',
    header: {
      text: '차량번호',
    },
    // renderer: {
    //   type: 'html',
    //   callback: function (grid, cell) {
    //     let str = cell.value;
    //     str = '<p class="underline">' + cell.value + '</p>';

    //     return str;
    //   },
    // },
    width: 120,
    editable: false,
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
    fieldName: 'trnCfmAt',
    name: 'trnCfmAt',
    header: {
      text: '배차확정일시',
    },
    width: 160,
    editable: false,
  },
  {
    fieldName: 'trnCmplAt',
    name: 'trnCmplAt',
    header: {
      text: '배차완료일시',
    },
    width: 160,
    editable: false,
  },
  {
    fieldName: 'trnReqAt',
    name: 'trnReqAt',
    header: {
      text: '배차요청일시',
    },
    width: 160,
    editable: false,
  },
  {
    fieldName: 'trnCarType',
    name: 'trnCarType',
    header: {
      text: 'trnCarType',
    },
    editable: false,
    visible: false,
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
    fieldName: 'plntNm',
    name: 'plntNm',
    header: {
      text: '플랜트',
    },
    editable: false,
  },
  {
    fieldName: 'outTypeCd',
    name: 'outTypeCd',
    header: {
      text: '출고유형',
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
  // {
  //   fieldName: 'outTypeCd',
  //   name: 'outTypeCd',
  //   header: {
  //     text: 'outTypeCd',
  //   },
  //   visible: false,
  // },
  {
    fieldName: 'outTypeNm',
    name: 'outTypeNm',
    header: {
      text: '출고유형',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: '배송희망일',
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
    fieldName: 'inPsbDt',
    name: 'inPsbDt',
    header: {
      text: '입차희망일(물류)',
    },
    editable: false,
  },
  {
    fieldName: 'inPsbTiNm',
    name: 'inPsbTiNm',
    header: {
      text: '입차희망시간(물류)',
    },
    editable: false,
  },
  {
    fieldName: 'inExptDt',
    name: 'inExptDt',
    header: {
      text: '입차예정일(물류)',
    },
    editable: false,
  },
  {
    fieldName: 'inExptTiNm',
    name: 'inExptTiNm',
    header: {
      text: '입차예정시간(물류)',
    },
    editable: false,
  },
  {
    fieldName: 'trnHopeTiNm',
    name: 'trnHopeTiNm',
    header: {
      text: '배송희망시간',
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
    fieldName: 'trnSpltNum',
    name: 'trnSpltNum',
    header: {
      text: '분할번호',
    },
    editable: false,
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
    fieldName: 'bokngSoItemNum',
    name: 'bokngSoItemNum',
    header: {
      text: 'Item No.',
    },
    numberFormat: '#',
    editable: false,
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
      text: 'D/O Item 번호',
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
    visible: true,
  },
  {
    fieldName: 'upSiteNm',
    name: 'upSiteNm',
    header: {
      text: '상차지',
    },
    styleName: 't-l',
    width: 120,
    editable: false,
  },
  {
    fieldName: 'poRegStaffNm',
    name: 'poRegStaffNm',
    header: {
      text: 'PO 출고등록 직원명',
    },
    styleName: 't-l',
    width: 180,
    editable: false,
  },
  {
    fieldName: 'custCd',
    name: 'custCd',
    header: {
      text: '고객사 코드',
    },
    editable: false,
  },
  {
    fieldName: 'custNm',
    name: 'custNm',
    header: {
      text: '고객사명',
    },
    styleName: 't-l',
    width: 200,
    editable: false,
  },
  {
    fieldName: 'logitsAlias',
    name: 'logitsAlias',
    header: {
      text: '배송지명',
    },
    styleName: 't-l',
    width: 140,
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
    fieldName: 'invoiceNum',
    name: 'invoiceNum',
    header: {
      text: '송장번호',
    },
    editable: false,
  },
  {
    fieldName: 'compNm',
    name: 'compNm',
    header: {
      text: '사업부',
    },
    styleName: 't-l',
    width: 120,
    editable: false,
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
    fieldName: 'trnReqOrdQty',
    name: 'trnReqOrdQty',
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
    fieldName: 'trnReqBaseQty',
    name: 'trnReqBaseQty',
    header: {
      text: '수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
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
    fieldName: 'trnReqVol',
    name: 'trnReqVol',
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
    fieldName: 'trnReqWght',
    name: 'trnReqWght',
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
    fieldName: 'trnOrgBaseQty',
    name: 'trnOrgBaseQty',
    header: {
      text: '수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
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
    fieldName: 'trnReqRemark',
    name: 'trnReqRemark',
    header: {
      text: '주문특이사항',
    },
    width: 230,
    styleName: 't-l',
    editable: false,
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
    fieldName: 'trncusNm', // 운송사
    name: 'trncusNm',
    header: {
      text: '운송사',
    },
  },
  {
    fieldName: 'bokngNum', // 부킹번호
    name: 'bokngNum',
    header: {
      text: '부킹번호',
    },
  },
  {
    fieldName: 'itemNum', // 아이템번호
    name: 'itemNum',
    header: {
      text: '아이템번호',
    },
    numberFormat: '#',
  },
];

export const layout = [
  'trnClsNm', // 배송유형, (기타, 이동, 일반, 예탁), 1
  'trnCarType', //
  'trnCarNm', // 배송방법, 2
  'trnPlnNum', // 출고계획번호, 3
  'trnDoNum', // D/O번호, 5
  'trnDoItemNum', // D/O 아이템 번호, 6
  'trncusNm', // 운송사, 7
  'trnCarNum', // 차량번호, 8
  'driverPhoneNum', // 운송기사 연락처, 9
  {
    name: 'costDtTi', // 배송희망일(고객)
    direction: 'horizontal',
    header: {
      text: '고객 배송 요청 일시',
      tooltip: '고객 배송 요청 일시',
      showTooltip: true,
    },
    items: ['trnHopeDt', 'trnHopeTi', 'trnHopeTiNm'], // 날짜, 시간, 10, 11
  },
  'trnReqAt', // 배차요청일시, 12, 13
  'trnCfmAt', // 배차확정일시, 14
  {
    name: 'inPsb', // 입차희망일(물류)
    direction: 'horizontal',
    header: {
      text: '입차희망일(물류)',
      tooltip: '입차희망일(물류)',
      showTooltip: true,
    },
    items: ['inPsbDt', 'inPsbTiNm'], // 날짜, 시간, 15, 16
  },
  'trnCmplAt', // 배차완료일시, 17,18
  {
    name: 'inExptDtHeader', // 입차예정일(운송사)
    direction: 'horizontal',
    header: {
      text: '입차예정일(운송사)',
      tooltip: '입차예정일(운송사)',
      showTooltip: true,
    },
    items: ['inExptDt', 'inExptTiNm'], // 날짜, 시간, 19, 20
  },
  'plntNm', // 플랜트, 21
  'upSiteNm', // 상차지, 22
  'prdtCd', // 제품코드, 23
  'prdtNm', // 제품명, 24
  {
    name: 'orderUnit', // 주문단위
    direction: 'horizontal',
    header: {
      text: '주문단위',
      tooltip: '주문단위',
      showTooltip: true,
    },
    items: ['trnReqOrdQty', 'ordUnitNm'], // 수량, 단위, 25, 26
  },
  {
    name: 'fowardUnit', // 기본단위
    direction: 'horizontal',
    header: {
      text: '출고단위',
      tooltip: '출고단위',
      showTooltip: true,
    },
    items: ['trnReqBaseQty', 'baseUnitNm1'], // 수량, 단위, 27, 28
  },
  // {
  //   name: 'inventAssQty', // 출고요청된 수량
  //   direction: 'horizontal',
  //   header: {
  //     text: '출고요청된 수량',
  //     tooltip: '출고요청된 수량',
  //     showTooltip: true,
  //   },
  //   items: ['trnOrgBaseQty', 'baseUnitNm2'], // 수량, 단위, 29, 30
  // },
  {
    name: 'volUnit', // 부피
    direction: 'horizontal',
    header: {
      text: '부피단위',
      tooltip: '부피단위',
      showTooltip: true,
    },
    items: ['trnReqVol', 'volUnitNm'], // 수량, 단위, 31, 32
  },
  {
    name: 'weightUnit', // 중량
    direction: 'horizontal',
    header: {
      text: '중량단위',
      tooltip: '중량단위',
      showTooltip: true,
    },
    items: ['trnReqWght', 'wghtUnitNm'], // 수량, 단위, 33, 34
  },
  'custCd', // 고객코드, 35
  'custNm', // 고객, 36
  'logitsAlias', // 배송지, 37
  'postNum', // 우편번호, 38
  {
    name: 'cityDistr', // 주소
    direction: 'logitsCd',
    hideChildHeaders: false,
    header: {
      text: '배송지 권역',
      tooltip: '배송지 권역',
      showTooltip: true,
    },
    items: ['cityNm', 'distrNm'], // 대권역, 중권역, 39, 40
  },
  'addrDtls', // 배송지 상세주소, 41
  'logitsPhoneNum1', // 연락처, 42
  'trnReqRemark', // 특이사항, 43
  'bokngNum', // 부킹번호, 44
  'itemNum', // 아이템번호, 45
  'bokngSoNum', // ERP S/O 번호, 46
  'bokngSoItemNum', // 아이템번호, 47
  'trnNum', // 배송요청번호, 48
  'trnSpltNum', // 분할번호, 49
  'invoiceNum', // 송장번호, 50
  'outStatNm', // 출고상태, 51
  'poRegStaffNm', // P/O 생성자, 52
  'outStatCd',
  'trnClsCd',
  'outTypeCd',
  'outTypeNm',
  'addr',
  'offrNum',
  'compNm',
  'id',
];
