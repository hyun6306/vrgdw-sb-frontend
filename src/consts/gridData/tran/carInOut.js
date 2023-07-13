// 운송비 조회
import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'trncusNm', // 운송사
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnClsNm', // 운송사
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarNum', // 차량번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'carTypeNm', // 차량유형
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'driverNm', // 기사명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'driverPhoneNum', // 운전기사핸드폰번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPlnNum', // 배차계획번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outStatNm', // 배송상태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCmplAt', // 배차완료일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCfmAt', // 배차확정일시
    dataType: ValueType.TEXT,
  },
  // {
  //   fieldName: 'inExptDt', // inExptDt
  //   dataType: ValueType.TEXT,
  // },
  // {
  //   fieldName: 'at', // at
  //   dataType: ValueType.TEXT,
  // },
  {
    fieldName: 'inExptAt', // 입차예정일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inYn', // 입차여부
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'inAt', // 입차일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outYn', // 출차여부
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outAt', // 출차일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'id', // id
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trncusId', // 2
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'outStatCd', // 2
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrNum', // 2
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrId', // 2
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrDtlsId', // 2
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dataStatus', // 2
    dataType: ValueType.TEXT,
  },
  {
    fieldName: '__deleted__', // 2
    dataType: ValueType.TEXT,
  },
  {
    fieldName: '__created__', // 2
    dataType: ValueType.TEXT,
  },
  {
    fieldName: '__modified__', // 2
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: 'trncusNm',
    fieldName: 'trncusNm',
    header: {
      text: 'trncusNm', // 1
    },
    editable: false,
    visible: true,
    styleName: 't-l',
    width: 300,
  },
  {
    name: 'trnClsNm',
    fieldName: 'trnClsNm',
    header: {
      text: 'trnClsNm', // 배송유형
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'trnCarNum',
    fieldName: 'trnCarNum',
    header: {
      text: 'trnCarNum', // 1
    },
    editable: false,
    visible: true,
    width: 200,
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
    name: 'carTypeNm',
    fieldName: 'carTypeNm',
    header: {
      text: 'carTypeNm', // 1
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'driverNm',
    fieldName: 'driverNm',
    header: {
      text: 'driverNm', // 1
    },
    editable: false,
    visible: true,
    width: 250,
    styleName: 't-l',
  },
  {
    name: 'driverPhoneNum',
    fieldName: 'driverPhoneNum',
    header: {
      text: 'driverPhoneNum', // 1
    },
    editable: false,
    visible: true,
    width: 200,
  },
  {
    name: 'trnPlnNum',
    fieldName: 'trnPlnNum',
    header: {
      text: 'trnPlnNum', // 1
    },
    editable: false,
    visible: true,
    width: 200,
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = cell.value;
        str = '<p class="underline">' + cell.value + '</p>';
        return str;
      },
    },
    mergeRule: {
      criteria: 'value',
    },
  },
  {
    name: 'outStatNm',
    fieldName: 'outStatNm',
    header: {
      text: 'outStatNm', // 1
    },
    editable: false,
    visible: true,
    width: 250,
  },
  {
    name: 'trnCmplAt',
    fieldName: 'trnCmplAt',
    header: {
      text: 'trnCmplAt', // 1
    },
    editable: false,
    visible: true,
    width: 300,
  },
  {
    name: 'trnCfmAt',
    fieldName: 'trnCfmAt',
    header: {
      text: 'trnCfmAt', // 1
    },
    editable: false,
    visible: true,
    width: 300,
  },
  // {
  //   name: 'inExptDt',
  //   fieldName: 'inExptDt',
  //   header: {
  //     text: 'inExptDt', // 1
  //   },
  //   editable: false,
  //   visible: true,
  //   width: 130,
  // },
  // {
  //   name: 'at',
  //   fieldName: 'at',
  //   header: {
  //     text: 'at', // 1
  //   },
  //   editable: false,
  //   visible: true,
  //   width: 70,
  // },
  {
    name: 'inExptAt',
    fieldName: 'inExptAt',
    header: {
      text: 'inExptAt', // 1
    },
    editable: false,
    visible: true,
    width: 300,
  },
  {
    name: 'inYn',
    fieldName: 'inYn',
    header: {
      text: 'inYn', // 1
    },
    editable: false,
    visible: true,
    width: 150,
  },
  {
    name: 'inAt',
    fieldName: 'inAt',
    header: {
      text: 'inAt', // 1
    },
    editable: false,
    visible: true,
    width: 300,
  },
  {
    name: 'outYn',
    fieldName: 'outYn',
    header: {
      text: 'outYn', // 1
    },
    editable: false,
    visible: true,
    width: 150,
  },
  {
    name: 'outAt',
    fieldName: 'outAt',
    header: {
      text: 'outAt', // 1
    },
    editable: false,
    visible: true,
    width: 300,
  },
  // {
  //   name: 'id',
  //   fieldName: 'id',
  //   header: {
  //     text: 'id', // 1
  //   },
  //   editable: false,
  //   visible: false,
  // },
  // {
  //   name: 'trncusId',
  //   fieldName: 'trncusId',
  //   header: {
  //     text: 'trncusId', // 1
  //   },
  //   editable: false,
  //   visible: false,
  // },
  // {
  //   name: 'outStatCd',
  //   fieldName: 'outStatCd',
  //   header: {
  //     text: 'outStatCd', // 1
  //   },
  //   editable: false,
  //   visible: false,
  // },
  // {
  //   name: 'offrNum',
  //   fieldName: 'offrNum',
  //   header: {
  //     text: 'offrNum', // 1
  //   },
  //   editable: false,
  //   visible: false,
  // },
  // {
  //   name: 'offrId',
  //   fieldName: 'offrId',
  //   header: {
  //     text: 'offrId', // 1
  //   },
  //   editable: false,
  //   visible: false,
  // },
  // {
  //   name: 'offrDtlsId',
  //   fieldName: 'offrDtlsId',
  //   header: {
  //     text: 'offrDtlsId', // 1
  //   },
  //   editable: false,
  //   visible: false,
  // },
  // {
  //   name: 'dataStatus',
  //   fieldName: 'dataStatus',
  //   header: {
  //     text: 'dataStatus', // 1
  //   },
  //   editable: false,
  //   visible: false,
  // },
  // {
  //   name: '__deleted__',
  //   fieldName: '__deleted__',
  //   header: {
  //     text: '__deleted__', // 1
  //   },
  //   editable: false,
  //   visible: false,
  // },
  // {
  //   name: '__created__',
  //   fieldName: '__created__',
  //   header: {
  //     text: '__created__', // 1
  //   },
  //   editable: false,
  //   visible: false,
  // },
  // {
  //   name: '__modified__',
  //   fieldName: '__modified__',
  //   header: {
  //     text: '__modified__', // 1
  //   },
  //   editable: false,
  //   visible: false,
  // },
];

export const rows = [];

export const layout = [
  'trnClsNm', // 배송유형, 1
  'trnPlnNum', // 출고계획번호, 2
  'trncusNm', // 운송사, 3
  'trnCarNum', // 차량번호, 4
  'carTypeNm', // 차량유형, 5
  'driverNm', // 운송기사, 6
  'driverPhoneNum', // 운송기사 연락처, 7
  'outStatNm', // 출고 상태, 8
  'trnCmplAt', // 배차완료일(운송사), 9
  'trnCfmAt', // 배차확정일(물류), 10
  'inExptAt', // 입차예정일시, 11
  'inYn', // 입차여부, 12
  'inAt', // 입차일, 13
  'outYn', // 출차여부, 14
  'outAt', // 출차일, 15
];
