// 샘플관리 / 고객
import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'id', // ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custId', // custId
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrStatCd', // 진행상태 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrStatNm', // 진행상태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'progRate', // 진행율
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'offrDt',
    dataType: ValueType.TEXT, // 샘플요청일
  },
  {
    fieldName: 'custNm',
    dataType: ValueType.TEXT, // 고객사명
  },
  {
    fieldName: 'custCd',
    dataType: ValueType.TEXT, // 고객사코드
  },
  {
    fieldName: 'cityNm',
    dataType: ValueType.TEXT, // 고객지역구분
  },
  {
    fieldName: 'custType',
    dataType: ValueType.TEXT, // 고객그룹
  },
  {
    fieldName: 'custPoNum',
    dataType: ValueType.TEXT, // 고객po번호
  },
  {
    fieldName: 'offrNum',
    dataType: ValueType.TEXT, // 샘플 번호
  },
  {
    fieldName: 'prdtItemQty',
    dataType: ValueType.NUMBER, // 아이템건수
  },
  {
    fieldName: 'reqBaseTotQty',
    dataType: ValueType.NUMBER, // 견적요청량
  },
  {
    fieldName: 'reqOrdTotQty',
    dataType: ValueType.NUMBER, // 견적요청량 주문단위
  },
  {
    fieldName: 'baseUnitNm',
    dataType: ValueType.TEXT, // 견적요청량 단위
  },
  {
    fieldName: 'ordUnitNm',
    dataType: ValueType.TEXT, // 견적요청량 단위
  },
  {
    fieldName: 'trnEndBaseTotQty',
    dataType: ValueType.NUMBER, // 배송완료량 기본단위
  },
  {
    fieldName: 'trnEndOrdTotQty',
    dataType: ValueType.NUMBER, // 배송완료량 주문단위
  },
  {
    fieldName: 'trnPsbBaseTotQty',
    dataType: ValueType.NUMBER, // 배송가능량
  },
  {
    fieldName: 'trnPsbOrdTotQty',
    dataType: ValueType.NUMBER, // 배송가능량 주문단위
  },
  {
    fieldName: 'trnIngBaseTotQty',
    dataType: ValueType.NUMBER, // 배송중량
  },
  {
    fieldName: 'trnIngOrdTotQty',
    dataType: ValueType.NUMBER, // 배송중량 주문단위
  },
  {
    fieldName: 'addrInfo',
    dataType: ValueType.TEXT, // 배송지 주소 1
  },
  {
    fieldName: 'custReqRemarkYn',
    dataType: ValueType.TEXT, // 고객의견
  },
  // {
  //   fieldName: 'salesMngRemarkYn',
  //   dataType: ValueType.TEXT, // 고객의견
  // },
  {
    fieldName: 'createdByNm',
    dataType: ValueType.TEXT, // 작성자
  },
  {
    fieldName: 'createdByPhone',
    dataType: ValueType.TEXT, // 연락처
  },
  {
    fieldName: 'salesGroup',
    dataType: ValueType.TEXT, // 영업조직
  },
  {
    fieldName: 'salesMngNm',
    dataType: ValueType.TEXT, // 영업사원
  },
  {
    fieldName: 'salesMngPhoneNum',
    dataType: ValueType.TEXT, // 연락처(영업사원)
  },
  {
    fieldName: 'salesMngEmail',
    dataType: ValueType.TEXT, // E-Mail(영업사원)
  },
  {
    fieldName: 'salesSuptNm',
    dataType: ValueType.TEXT, // 담당 영업지원
  },
  {
    fieldName: 'salesSuptPhoneNum',
    dataType: ValueType.TEXT, // 연락처(담당 영업지원)
  },
  {
    fieldName: 'salesSuptEmail',
    dataType: ValueType.TEXT, // E-Mail(담당 영업지원)
  },
  {
    fieldName: 'offrEndDt',
    dataType: ValueType.TEXT, // 진행완료일 // 30번
  },
  {
    fieldName: 'updatedAt',
    dataType: ValueType.TEXT, // 마지막 수정일
  },
  {
    fieldName: 'updatedByNm',
    dataType: ValueType.TEXT, // 수정자
  },
];

export const columns = [
  {
    name: 'id',
    fieldName: 'id',
    header: {
      text: 'id', // id
    },
    editable: false,
    visible: false,
  },
  {
    name: 'custId',
    fieldName: 'custId',
    header: {
      text: 'custId', // custId
    },
    editable: false,
    visible: false,
  },
  {
    name: 'offrStatCd',
    fieldName: 'offrStatCd',
    header: {
      text: '진행상태코드', // 속성 확장 가능
    },
    editable: false,
    visible: false,
  },
  {
    name: 'offrStatNm',
    fieldName: 'offrStatNm',
    header: {
      text: '진행상태', // 속성 확장 가능
    },
    editable: false,
  },
  {
    name: 'progRate',
    fieldName: 'progRate',
    header: {
      text: '진행율(%)', // 진행율
    },
    styleName: 't-c',
    editable: false,
  },
  {
    name: 'offrDt',
    fieldName: 'offrDt',
    header: {
      text: '샘플요청일', //샘플요청일
    },
    editable: false,
  },
  {
    name: 'custNm',
    fieldName: 'custNm',
    header: {
      text: '고객사명', // 고객사명
    },
    editable: false,
    styleName: 't-l',
    width: 400,
  },
  {
    name: 'custCd',
    fieldName: 'custCd',
    header: {
      text: '고객사코드', // 고객사코드
    },
    visible: true,
    editable: false,
  },
  {
    name: 'cityNm',
    fieldName: 'cityNm',
    header: {
      text: '고객 지역구분', // 고객그룹
    },
    editable: false,
    width: 250,
  },
  {
    name: 'custType',
    fieldName: 'custType',
    header: {
      text: '고객 그룹', // 고객그룹
    },
    editable: false,
    wdith: 200,
  },
  {
    name: 'custPoNum',
    fieldName: 'custPoNum',
    header: {
      text: '고객PO번호', // 고객PO번호
    },
    editable: false,
    width: 250,
  },
  {
    name: 'offrNum',
    fieldName: 'offrNum',
    header: {
      text: '샘플번호', // 샘플번호
    },
    editable: false,
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
    name: 'prdtItemQty',
    fieldName: 'prdtItemQty',
    header: {
      text: '아이템건수',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    name: 'reqBaseTotQty',
    fieldName: 'reqBaseTotQty',
    header: {
      text: '견적요청량 기본단위',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    name: 'reqOrdTotQty',
    fieldName: 'reqOrdTotQty',
    header: {
      text: '견적요쳥량 주문단위',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    name: 'baseUnitNm',
    fieldName: 'baseUnitNm',
    header: {
      text: '매',
    },
    styleName: 't-C',
    editable: false,
  },
  {
    name: 'ordUnitNm',
    fieldName: 'ordUnitNm',
    header: {
      text: '번들',
    },
    styleName: 't-C',
    editable: false,
  },
  {
    name: 'trnEndBaseTotQty',
    fieldName: 'trnEndBaseTotQty',
    header: {
      text: '배송완료량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    name: 'trnEndOrdTotQty',
    fieldName: 'trnEndOrdTotQty',
    header: {
      text: '배송완료량 주문단위',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    name: 'baseUnitNm2',
    fieldName: 'baseUnitNm',
    header: {
      text: '매',
    },
    styleName: 't-C',
    editable: false,
  },
  {
    name: 'ordUnitNm2',
    fieldName: 'ordUnitNm',
    header: {
      text: '번들',
    },
    styleName: 't-C',
    editable: false,
  },
  {
    name: 'trnPsbBaseTotQty',
    fieldName: 'trnPsbBaseTotQty',
    header: {
      text: '배송가능량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    name: 'trnPsbOrdTotQty',
    fieldName: 'trnPsbOrdTotQty',
    header: {
      text: '배송가능량 주문단위',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    name: 'baseUnitNm3',
    fieldName: 'baseUnitNm',
    header: {
      text: '매',
    },
    styleName: 't-C',
    editable: false,
  },
  {
    name: 'ordUnitNm3',
    fieldName: 'ordUnitNm',
    header: {
      text: '번들',
    },
    styleName: 't-C',
    editable: false,
  },
  {
    name: 'trnIngBaseTotQty',
    fieldName: 'trnIngBaseTotQty',
    header: {
      text: '배송중량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    name: 'trnIngOrdTotQty',
    fieldName: 'trnIngOrdTotQty',
    header: {
      text: '배송중량 주문단위',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    name: 'baseUnitNm4',
    fieldName: 'baseUnitNm',
    header: {
      text: '매',
    },
    styleName: 't-C',
    editable: false,
  },
  {
    name: 'ordUnitNm4',
    fieldName: 'ordUnitNm',
    header: {
      text: '번들',
    },
    styleName: 't-C',
    editable: false,
  },
  {
    fieldName: 'addrInfo',
    name: 'addrInfo',
    header: {
      text: '배송지정보',
    },
    editable: false,
    renderer: 'imgbtn',
    width: 200,
  },
  {
    name: 'custReqRemarkYn',
    fieldName: 'custReqRemarkYn',
    header: {
      text: '고객 의견',
    },
    editable: false,
    renderer: 'imgbtn',
    width: 150,
  },
  // {
  //   name: 'salesMngRemarkYn',
  //   fieldName: 'salesMngRemarkYn',
  //   header: {
  //     text: '영업 의견',
  //   },
  //   editable: false,
  //   renderer: 'imgbtn',
  //   width: 150,
  // },
  {
    name: 'createdByNm',
    fieldName: 'createdByNm',
    header: {
      text: '작성자',
    },
    editable: false,
  },
  {
    name: 'createdByPhone',
    fieldName: 'createdByPhone',
    header: {
      text: '연락처',
    },
    editable: false,
  },
  {
    name: 'salesGroup',
    fieldName: 'salesGroup',
    header: {
      text: '영업조직', // 담당 영업 조직
    },
  },
  {
    name: 'salesMngNm',
    fieldName: 'salesMngNm',
    header: {
      text: '영업사원', // 영업사원
    },
    editable: false,
    width: 250,
  },
  {
    name: 'salesMngPhoneNum',
    fieldName: 'salesMngPhoneNum',
    header: {
      text: '연락처', // 연락처(영업사원)
    },
    editable: false,
  },
  {
    name: 'salesMngEmail',
    fieldName: 'salesMngEmail',
    header: {
      text: '담당 영업사원 이메일', // 이메일(영업사원)
    },
    editable: false,
    width: 200,
  },
  {
    name: 'salesSuptNm',
    fieldName: 'salesSuptNm',
    header: {
      text: '담당 영업지원',
    },
    editable: false,
    width: 250,
  },
  {
    name: 'salesSuptPhoneNum',
    fieldName: 'salesSuptPhoneNum',
    header: {
      text: '담당 영업지원 연락처', // 연락처(담당영업지원)
    },
    editable: false,
  },
  {
    name: 'salesSuptEmail',
    fieldName: 'salesSuptEmail',
    header: {
      text: '담당 영업지원 메일', // 이메일(담당영업지원)
    },
    editable: false,
    width: 200,
  },
  {
    name: 'offrEndDt',
    fieldName: 'offrEndDt',
    header: {
      text: '진행 완료일', // 진행완료일
    },
    editable: false,
  },
  {
    name: 'updatedAt',
    fieldName: 'updatedAt',
    header: {
      text: '마지막 수정일', // 마지막 수정일
    },
    editable: false,
  },
  {
    name: 'updatedByNm',
    fieldName: 'updatedByNm',
    header: {
      text: '수정자', // 수정자
    },
    editable: false,
    width: 250,
  },
];

export const rows = [];

export const layout = [
  'id',
  'custId',
  {
    name: 'customerInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: 'customerInfo',
      tooltip: '고객 정보입니다',
      showTooltip: true,
    },
    items: [
      { column: 'custNm', groupShowMode: 'always' }, // 이름, 1
      { column: 'custCd', groupShowMode: 'expand' }, // 아이디, 2
      { column: 'cityNm', groupShowMode: 'expand' }, // 지역구분, 3
      { column: 'custType', groupShowMode: 'expand' }, // 그룹, 4
    ],
  },
  'offrStatCd',
  'offrDt', // 요청일,5
  'offrStatNm', // 진행상태, 6
  'offrNum', // 샘플번호, 7
  'custPoNum', // P/O번호, 8
  'prdtItemQty', // 총 아이템 수, 9
  'progRate', // 진행율, 10
  // 견적요청량 주문단위 변경 =>
  {
    name: 'reqOrdQty', // 견적요청수량
    direction: 'horizontal',
    expandable: false,
    header: {
      text: 'reqOrdQty',
      tooltip: '샘플요청량 단위입니다',
      showTooltip: true,
    },
    items: [
      { column: 'reqOrdTotQty', groupShowMode: 'expand' }, // 주문, 11
      { column: 'reqBaseTotQty', groupShowMode: 'expand' }, // 기본, 12
      { column: 'baseUnitNm', groupShowMode: 'expand' }, // 단위 매
      { column: 'ordUnitNm', groupShowMode: 'expand' }, // 단위 번들
    ],
  },
  // 배송완료량 주문단위 변경 =>
  // {
  //   name: 'trnEndQty', // 배송완료
  //   direction: 'horizontal',
  //   expandable: false,
  //   header: {
  //     text: 'trnEndQty',
  //     tooltip: '배송완료량 단위입니다',
  //     showTooltip: true,
  //   },
  //   items: [
  //     { column: 'trnEndOrdTotQty', groupShowMode: 'expand' }, // 주문
  //     { column: 'trnEndBaseTotQty', groupShowMode: 'expand' }, // 기본
  //     { column: 'baseUnitNm2', groupShowMode: 'expand' }, // 단위 매
  //     { column: 'ordUnitNm2', groupShowMode: 'expand' }, // 단위 번들
  //   ],
  // },
  // 배송가능량 주문단위 변경 =>
  // {
  //   name: 'trnPsbTotQty', // 배송가능량
  //   direction: 'horizontal',
  //   expandable: false,
  //   header: {
  //     text: 'trnPsbTotQty',
  //     tooltip: '배송가능 단위입니다',
  //     showTooltip: true,
  //   },
  //   items: [
  //     { column: 'trnPsbOrdTotQty', groupShowMode: 'expand' }, // 주문
  //     { column: 'trnPsbBaseTotQty', groupShowMode: 'expand' }, // 기본
  //     { column: 'baseUnitNm3', groupShowMode: 'expand' }, // 단위 매
  //     { column: 'ordUnitNm3', groupShowMode: 'expand' }, // 단위 번들
  //   ],
  // },
  // 배송중 량 주문단위 변경 =>
  // {
  //   name: 'trnIngQty', // 배송중 량
  //   direction: 'horizontal',
  //   expandable: false,
  //   header: {
  //     text: 'trnIngQty',
  //     tooltip: '배송중 단위입니다',
  //     showTooltip: true,
  //   },
  //   items: [
  //     { column: 'trnIngOrdTotQty', groupShowMode: 'expand' }, // 주문
  //     { column: 'trnIngBaseTotQty', groupShowMode: 'expand' }, // 기본
  //     { column: 'baseUnitNm4', groupShowMode: 'expand' }, // 단위 매
  //     { column: 'ordUnitNm4', groupShowMode: 'expand' }, // 단위 번들
  //   ],
  // },
  'custReqRemarkYn', // 고객메모, 13
  // 'salesMngRemarkYn', // 영업메모, 14
  'addrInfo', // 주소, 15
  {
    name: 'salesMngNm',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '영업사원',
      tooltip: '영업사원 정보입니다.',
      showTooltip: true,
    },
    items: [
      { column: 'salesMngNm', groupShowMode: 'always' }, // 영업사원, 16
      { column: 'salesGroup', groupShowMode: 'expand' }, // 영업팀, 17
      { column: 'salesMngPhoneNum', groupShowMode: 'expand' }, // 영업사원 연락처, 18
      { column: 'salesMngEmail', groupShowMode: 'expand' }, // 영업사원 이메일, 19
    ],
  },
  {
    name: 'salesSuptNm',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '영업지원',
      tooltip: '영업지원 정보입니다.',
      showTooltip: true,
    },
    items: [
      { column: 'salesSuptNm', groupShowMode: 'always' }, // 담당 영업지원, 20
      { column: 'salesSuptPhoneNum', groupShowMode: 'expand' }, // 담당 영업지원 연락처, 21
      { column: 'salesSuptEmail', groupShowMode: 'expand' }, // 담당 영업지원 이메일, 22
    ],
  },
  {
    name: 'writerInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: 'writerInfo',
      tooltip: '작성자 정보입니다',
      showTooltip: true,
    },
    items: [
      { column: 'createdByNm', groupShowMode: 'always' }, // 생성자, 23
      { column: 'createdByPhone', groupShowMode: 'expand' }, // 생성자 연락처, 24
    ],
  },
  'updatedAt', // 마지막 수정일, 25
  'updatedByNm', // 수정자, 26
  'offrEndDt', // 완료일, 27
];

export const baseColumn = ['reqBaseTotQty', 'baseUnitNm'];
export const ordColumn = ['reqOrdTotQty', 'ordUnitNm'];
