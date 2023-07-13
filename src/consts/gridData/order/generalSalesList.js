import { ValueType } from 'realgrid';

//  고객의견 컬럼 추가 필요
export const fields = [
  {
    fieldName: 'id', // ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custId', // ID
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
    fieldName: 'apprCfmYn', // 결재필요 Y/N
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrDt', // 견적요청일
    dataType: ValueType.TEXT,
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
    dataType: ValueType.TEXT, // 견적번호
  },
  {
    fieldName: 'trnHopeDt',
    dataType: ValueType.TEXT, // 납품희망월
  },
  {
    fieldName: 'prdtItemQty',
    dataType: ValueType.NUMBER, // 아이템건수
  },
  {
    fieldName: 'currency',
    dataType: ValueType.TEXT, // 통화
  },
  {
    fieldName: 'reqTotal',
    dataType: ValueType.NUMBER, // 판매총액 // 10번
  },
  {
    fieldName: 'offrTotal',
    dataType: ValueType.NUMBER, // 견적총액
  },
  {
    fieldName: 'offrTotPrice',
    dataType: ValueType.NUMBER, // 견적금액
  },
  {
    fieldName: 'offrTotVat',
    dataType: ValueType.NUMBER, // VAT 부가가치세
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
    dataType: ValueType.TEXT, // 배송지 주소 아이콘
  },
  {
    fieldName: 'paymentCond',
    dataType: ValueType.TEXT, // 결제조건 // 20번
  },
  {
    fieldName: 'custReqRemarkYn',
    dataType: ValueType.TEXT, // 고객의견
  },
  {
    fieldName: 'salesMngRemarkYn',
    dataType: ValueType.TEXT, // 영업의견
  },
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
    dataType: ValueType.TEXT, // 담당영업조직
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
  {
    fieldName: 'trnReqOrdQty',
    dataType: ValueType.NUMBER, // 배송 요청 수량
  },
  {
    fieldName: 'trnReqBaseQty',
    dataType: ValueType.NUMBER, // 배송 요청 수량
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
      text: '진행율(%)', // 속성 확장 가능
    },
    styleName: 't-c',
    editable: false,
  },
  {
    name: 'apprCfmYn',
    fieldName: 'apprCfmYn',
    header: {
      text: '결재필요', // 결재필요 Y/N
    },
    editable: false,
  },
  {
    name: 'offrDt',
    fieldName: 'offrDt',
    header: {
      text: '견적요청일', // 속성 확장 가능Y
    },
    visible: true,
    editable: false,
  },
  {
    name: 'custNm',
    fieldName: 'custNm',
    header: {
      text: '고객사명',
    },
    editable: false,
    width: 300,
  },
  {
    name: 'custCd',
    fieldName: 'custCd',
    header: {
      text: '고객사코드',
    },
    editable: false,
  },
  {
    name: 'cityNm',
    fieldName: 'cityNm',
    header: {
      text: '고객지역구분',
    },
    editable: false,
    width: 200,
  },
  {
    name: 'custType',
    fieldName: 'custType',
    header: {
      text: '고객그룹',
    },
    editable: false,
  },
  {
    name: 'custPoNum',
    fieldName: 'custPoNum',
    header: {
      text: '고객po번호',
    },
    width: 250,
    editable: false,
  },
  {
    name: 'offrNum',
    fieldName: 'offrNum',
    header: {
      text: '견적번호',
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
    name: 'trnHopeDt',
    fieldName: 'trnHopeDt',
    header: {
      text: 'asdfasdfasdfasdf',
    },
    editable: false,
    width: 200,
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
    name: 'currency',
    fieldName: 'currency',
    header: {
      text: '통화',
    },
    editable: false,
  },
  {
    name: 'reqTotal',
    fieldName: 'reqTotal',
    header: {
      text: '판매총액', //
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
    width: 200,
  },
  {
    name: 'offrTotal',
    fieldName: 'offrTotal',
    header: {
      text: '견적총액',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    name: 'offrTotPrice',
    fieldName: 'offrTotPrice',
    header: {
      text: '견적금액',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    name: 'offrTotVat',
    fieldName: 'offrTotVat',
    header: {
      text: '부가가치세',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    name: 'reqBaseTotQty',
    fieldName: 'reqBaseTotQty',
    header: {
      text: '견적요쳥량 주문단위',
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
    name: 'trnReqBaseQty',
    fieldName: 'trnReqBaseQty',
    header: {
      text: '배송 요청 수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    name: 'trnReqOrdQty',
    fieldName: 'trnReqOrdQty',
    header: {
      text: '배송 요청 수량',
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
    name: 'baseUnitNm5',
    fieldName: 'baseUnitNm',
    header: {
      text: '매',
    },
    styleName: 't-C',
    editable: false,
  },
  {
    name: 'ordUnitNm5',
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
  },
  {
    name: 'paymentCond',
    fieldName: 'paymentCond',
    header: {
      text: '결제조건',
    },
    width: 250,
    editable: false,
  },
  {
    name: 'custReqRemarkYn',
    fieldName: 'custReqRemarkYn',
    header: {
      text: '고객의견',
    },
    editable: false,
    renderer: 'imgbtn',
    width: 150,
  },
  {
    name: 'salesMngRemarkYn',
    fieldName: 'salesMngRemarkYn',
    header: {
      text: '영업의견',
    },

    editable: false,
    renderer: 'imgbtn',
  },
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
      text: '담당 영업조직', // 담당 영업 조직
    },
  },
  {
    name: 'salesMngNm',
    fieldName: 'salesMngNm',
    header: {
      text: '담당 영업사원',
    },
    editable: false,
    width: 300,
  },
  {
    name: 'salesMngPhoneNum',
    fieldName: 'salesMngPhoneNum',
    header: {
      text: '담당 영업사원 연락처',
    },
    editable: false,
  },
  {
    name: 'salesMngEmail',
    fieldName: 'salesMngEmail',
    header: {
      text: '담당 영업사원 메일',
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
    width: 300,
  },
  {
    name: 'salesSuptPhoneNum',
    fieldName: 'salesSuptPhoneNum',
    header: {
      text: '담당 영업지원 연락처',
    },
    editable: false,
    width: 200,
  },
  {
    name: 'salesSuptEmail',
    fieldName: 'salesSuptEmail',
    header: {
      text: '담당 영업지원 메일',
    },
    editable: false,
    width: 200,
  },
  {
    name: 'offrEndDt',
    fieldName: 'offrEndDt',
    header: {
      text: '진행완료일',
    },
    editable: false,
  },
  {
    name: 'updatedAt',
    fieldName: 'updatedAt',
    header: {
      text: '마지막 수정일',
    },
    editable: false,
  },
  {
    name: 'updatedByNm',
    fieldName: 'updatedByNm',
    header: {
      text: '수정자',
    },
    editable: false,
  },
];

export const rows = [];

export const layout = [
  'id',
  'custId',
  'offrStatCd',
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
      { column: 'custNm', groupShowMode: 'always' },
      { column: 'custCd', groupShowMode: 'expand' },
      { column: 'cityNm', groupShowMode: 'expand' },
      { column: 'custType', groupShowMode: 'expand' },
    ],
  },
  'offrDt',
  'offrStatNm',
  'apprCfmYn',
  'offrNum',
  'custPoNum', // po번호
  {
    name: 'deliveryInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: 'deliveryInfo',
      tooltip: '배송 정보입니다',
      showTooltip: true,
    },
    items: [
      { column: 'trnHopeDt', groupShowMode: 'always' },
      { column: 'addrInfo', groupShowMode: 'expand' },
    ],
  },
  'prdtItemQty',
  'currency',
  'reqTotal',
  {
    name: 'qtyInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: 'qtyInfo',
      tooltip: '금액 정보입니다',
      showTooltip: true,
    },
    items: [
      { column: 'offrTotal', groupShowMode: 'always' },
      { column: 'offrTotPrice', groupShowMode: 'expand' },
      { column: 'offrTotVat', groupShowMode: 'expand' },
    ],
  },
  'paymentCond',
  'custReqRemarkYn',
  'salesMngRemarkYn',
  'progRate',
  // 견적요청량 주문단위 변경 =>
  {
    name: 'reqOrdQty', // 견적요청수량
    direction: 'horizontal',
    expandable: false,
    header: {
      text: 'reqOrdQty',
      tooltip: '견적요청량 단위입니다',
      showTooltip: true,
    },
    items: [
      { column: 'reqOrdTotQty', groupShowMode: 'expand' }, // 주문
      { column: 'reqBaseTotQty', groupShowMode: 'expand' }, // 기본
      { column: 'baseUnitNm', groupShowMode: 'expand' }, // 단위 매
      { column: 'ordUnitNm', groupShowMode: 'expand' }, // 단위 번들
    ],
  },
  // 배송완료량 주문단위 변경 =>
  {
    name: 'trnEndQty', // 배송완료
    direction: 'horizontal',
    expandable: false,
    header: {
      text: 'trnEndQty',
      tooltip: '배송완료량 단위입니다',
      showTooltip: true,
    },
    items: [
      { column: 'trnEndOrdTotQty', groupShowMode: 'expand' }, // 주문
      { column: 'trnEndBaseTotQty', groupShowMode: 'expand' }, // 기본
      { column: 'baseUnitNm2', groupShowMode: 'expand' }, // 단위 매
      { column: 'ordUnitNm2', groupShowMode: 'expand' }, // 단위 번들
    ],
  },
  // 배송가능량 주문단위 변경 =>
  {
    name: 'trnPsbTotQty', // 배송가능량
    direction: 'horizontal',
    expandable: false,
    header: {
      text: 'trnPsbTotQty',
      tooltip: '배송가능 단위입니다',
      showTooltip: true,
    },
    items: [
      { column: 'trnPsbOrdTotQty', groupShowMode: 'expand' }, // 주문
      { column: 'trnPsbBaseTotQty', groupShowMode: 'expand' }, // 기본
      { column: 'baseUnitNm3', groupShowMode: 'expand' }, // 단위 매
      { column: 'ordUnitNm3', groupShowMode: 'expand' }, // 단위 번들
    ],
  },
  {
    name: 'trnReqQty', // 배송 요청 수량
    direction: 'horizontal',
    expandable: false,
    header: {
      text: 'trnReqQty',
      tooltip: '배송 요청 수량',
      showTooltip: true,
    },
    items: [
      { column: 'trnReqOrdQty', groupShowMode: 'expand' }, // 주문
      { column: 'trnReqBaseQty', groupShowMode: 'expand' }, // 기본
      { column: 'baseUnitNm4', groupShowMode: 'expand' }, // 단위 매
      { column: 'ordUnitNm4', groupShowMode: 'expand' }, // 단위 번들
    ],
  },
  // 배송중 량 주문단위 변경 =>
  {
    name: 'trnIngQty', // 배송중 량
    direction: 'horizontal',
    expandable: false,
    header: {
      text: 'trnIngQty',
      tooltip: '배송중 단위입니다',
      showTooltip: true,
    },
    items: [
      { column: 'trnIngOrdTotQty', groupShowMode: 'expand' }, // 주문
      { column: 'trnIngBaseTotQty', groupShowMode: 'expand' }, // 기본
      { column: 'baseUnitNm5', groupShowMode: 'expand' }, // 단위 매
      { column: 'ordUnitNm5', groupShowMode: 'expand' }, // 단위 번들
    ],
  },
  {
    name: 'salesUserNm',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '영업사원',
      tooltip: '영업사원입니다.',
      showTooltip: true,
    },
    items: [
      { column: 'salesMngNm', groupShowMode: 'always' },
      { column: 'salesGroup', groupShowMode: 'expand' },
      { column: 'salesMngPhoneNum', groupShowMode: 'expand' },
      { column: 'salesMngEmail', groupShowMode: 'expand' },
    ],
  },
  {
    name: 'salesSupport',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '영업지원',
      tooltip: '영업지원입니다.',
      showTooltip: true,
    },
    items: [
      { column: 'salesSuptNm', groupShowMode: 'always' },
      { column: 'salesSuptPhoneNum', groupShowMode: 'expand' },
      { column: 'salesSuptEmail', groupShowMode: 'expand' },
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
      { column: 'createdByNm', groupShowMode: 'always' },
      { column: 'createdByPhone', groupShowMode: 'expand' },
    ],
  },
  'updatedAt',
  'updatedByNm',
  'offrEndDt',
];

export const baseColumn = ['reqBaseTotQty', 'trnEndBaseTotQty', 'trnPsbBaseTotQty', 'trnReqBaseQty', 'trnIngBaseTotQty', 'baseUnitNm', 'baseUnitNm2', 'baseUnitNm3', 'baseUnitNm4', 'baseUnitNm5'];
export const ordColumn = ['reqOrdTotQty', 'trnEndOrdTotQty', 'trnPsbOrdTotQty', 'trnReqOrdQty', 'trnIngOrdTotQty', 'ordUnitNm', 'ordUnitNm2', 'ordUnitNm3', 'ordUnitNm4', 'ordUnitNm5'];
