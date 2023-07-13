export const authBtn = { auth: [] };

export const fields = [
  {
    fieldName: 'trnClsCd',
    dataType: 'text',
  },
  {
    fieldName: 'trnClsNm',
    dataType: 'text',
  },
  {
    fieldName: 'trnDoNum',
    dataType: 'text',
  },
  {
    fieldName: 'trnPlnNum',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqBaseQty',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqOrdQty',
    dataType: 'number',
  },
  {
    fieldName: 'trnReqWght',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqVol',
    dataType: 'number',
  },
  {
    fieldName: 'logitsAlias',
    dataType: 'text',
  },
  {
    fieldName: 'trnCarType',
    dataType: 'text',
  },
  {
    fieldName: 'trncusId',
    dataType: 'text',
  },
  {
    fieldName: 'areaPriceAmt',
    dataType: 'number',
  },
  {
    fieldName: 'etcTrnPriceAmt',
    dataType: 'number',
  },
  {
    fieldName: 'totTrnPrice',
    dataType: 'number',
  },
  {
    fieldName: 'modiReasonCd',
    dataType: 'text',
  },
  {
    fieldName: 'modiReasonNm',
    dataType: 'text',
  },
  {
    fieldName: 'etcModiReason',
    dataType: 'text',
  },
  {
    fieldName: 'trnCarNum',
    dataType: 'text',
  },
  {
    fieldName: 'driverPhoneNum',
    dataType: 'text',
  },
  {
    fieldName: 'driverNm',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqRemark',
    dataType: 'text',
  },
  {
    fieldName: 'trnReqDt',
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
    fieldName: 'compNm',
    dataType: 'text',
  },
  {
    fieldName: 'deliCarTypeCd',
    dataType: 'text',
  },
  {
    fieldName: 'deliCarTypeNm',
    dataType: 'text',
  },
  {
    fieldName: 'custCd',
    dataType: 'text',
  },
  {
    fieldName: 'custNm',
    dataType: 'text',
  },
  {
    fieldName: 'deliveryCloseId',
    dataType: 'text',
  },
  {
    fieldName: 'closeYn',
    dataType: 'text',
  },
  {
    fieldName: 'modiYn',
    dataType: 'text',
  },
  {
    fieldName: 'inDt',
    dataType: 'text',
  },
  {
    fieldName: 'outDt',
    dataType: 'text',
  },
  {
    fieldName: 'takeOverDt',
    dataType: 'text',
  },
];

export const columns = [
  {
    fieldName: 'trnClsCd',
    name: 'trnClsCd',
    header: {
      text: '출고 구분 코드',
    },
  },
  {
    fieldName: 'trnClsNm',
    name: 'trnClsNm',
    header: {
      text: '출고 구분 명',
    },
  },
  {
    fieldName: 'trnDoNum',
    name: 'trnDoNum',
    header: {
      text: '출고 DO 번호',
    },
  },
  {
    fieldName: 'trnPlnNum',
    name: 'trnPlnNum',
    header: {
      text: '배송 계획 번호',
    },
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
    fieldName: 'trnReqBaseQty',
    name: 'trnReqBaseQty',
    header: {
      text: '배송 요청 기본 수량',
    },
  },
  {
    fieldName: 'trnReqOrdQty',
    name: 'trnReqOrdQty',
    header: {
      text: '배송 요청 주문 수량',
    },
    numberFormat: '#,###.###',
  },
  {
    fieldName: 'trnReqWght',
    name: 'trnReqWght',
    header: {
      text: '배송 요청 중량',
    },
    styleName: 't-r',
  },
  {
    fieldName: 'trnReqVol',
    name: 'trnReqVol',
    header: {
      text: '배송 요청 부피',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    fieldName: 'logitsAlias',
    name: 'logitsAlias',
    header: {
      text: '배송지 명',
    },
  },
  {
    fieldName: 'trnCarType',
    name: 'trnCarType',
    header: {
      text: '배송 차량 유형',
    },
    visible: false,
  },
  {
    fieldName: 'trncusId',
    name: 'trncusId',
    header: {
      text: '운송사 ID',
    },
  },
  {
    fieldName: 'areaPriceAmt',
    name: 'areaPriceAmt',
    header: {
      text: '운송권역 운임 단가',
    },
    styleName: 't-r',
    width: 200,
    numberFormat: '#,##0',
  },
  {
    fieldName: 'etcTrnPriceAmt',
    name: 'etcTrnPriceAmt',
    header: {
      text: '기타 운임 단가',
    },
    width: 200,
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = '';
        let closeYn = grid.getValue(cell.index.itemIndex, 'closeYn');
        if (closeYn == 'N' && authBtn.auth.fn1Auth === 'Y') {
          str = `<div class=''>${cell.value}<span class='etc_search'></span></div>`;
        } else {
          str = `<div class=''>${cell.value}</div>`;
        }
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
  },
  {
    fieldName: 'totTrnPrice',
    name: 'totTrnPrice',
    header: {
      text: '총 운임',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
    width: 200,
  },
  {
    fieldName: 'modiReasonCd',
    name: 'modiReasonCd',
    header: {
      text: '조정 사유 코드',
    },
  },
  {
    fieldName: 'modiReasonNm',
    name: 'modiReasonNm',
    header: {
      text: '운임 조정 사유 명',
    },
    styleName: 't-l',
    width: 150,
  },
  {
    fieldName: 'etcModiReason',
    name: 'etcModiReason',
    header: {
      text: '기타 조정 사유',
    },
    styleName: 't-l',
    width: 250,
  },
  {
    fieldName: 'trnCarNum',
    name: 'trnCarNum',
    header: {
      text: '배송 차량 번호',
    },
  },
  {
    fieldName: 'driverPhoneNum',
    name: 'driverPhoneNum',
    header: {
      text: '기사 전화 번호',
    },
    width: 150,
  },
  {
    fieldName: 'driverNm',
    name: 'driverNm',
    header: {
      text: '기사 명',
    },
    styleName: 't-l',
    width: 350,
  },
  {
    fieldName: 'trnReqRemark',
    name: 'trnReqRemark',
    header: {
      text: '배송 요청 코멘트',
    },
    styleName: 't-l',
    width: 300,
  },
  {
    fieldName: 'trnReqDt',
    name: 'trnReqDt',
    header: {
      text: '배차 요청 일',
    },
    width: 200,
  },
  {
    fieldName: 'updatedByNm',
    name: 'updatedByNm',
    header: {
      text: '작업자',
    },
  },
  {
    fieldName: 'updatedAt',
    name: 'updatedAt',
    header: {
      text: '최종수정',
    },
  },
  {
    fieldName: 'compCd',
    name: 'compCd',
    header: {
      text: '회사 코드',
    },
    visible: false,
  },
  {
    fieldName: 'compNm',
    name: 'compNm',
    header: {
      text: '사업부 명',
    },
    styleName: 't-l',
    width: 350,
    visible: false,
  },
  {
    fieldName: 'deliCarTypeCd',
    name: 'deliCarTypeCd',
    header: {
      text: '차량 유형 코드',
    },
  },
  {
    fieldName: 'deliCarTypeNm',
    name: 'deliCarTypeNm',
    header: {
      text: '차량 유형 명',
    },
    width: 150,
  },
  {
    fieldName: 'custCd',
    name: 'custCd',
    header: {
      text: '고객사',
    },
  },
  {
    fieldName: 'custNm',
    name: 'custNm',
    header: {
      text: '고객사 명',
    },
    styleName: 't-l',
    width: 350,
  },
  {
    fieldName: 'deliveryCloseId',
    name: 'deliveryCloseId',
    header: {
      text: '배차 마감 ID',
    },
  },
  {
    fieldName: 'closeYn',
    name: 'closeYn',
    header: {
      text: '마감 여부',
    },
    width: 200,
  },
  {
    fieldName: 'modiYn',
    name: 'modiYn',
    header: {
      text: '조정 여부',
    },
    width: 200,
  },
  {
    fieldName: 'inDt',
    name: 'inDt',
    header: {
      text: '입차일',
    },
    width: 200,
  },
  {
    fieldName: 'outDt',
    name: 'outDt',
    header: {
      text: '출차일',
    },
    width: 200,
  },
  {
    fieldName: 'takeOverDt',
    name: 'takeOverDt',
    header: {
      text: '인수완료일',
    },
    width: 200,
  },
];

export const layout = [
  //
  'closeYn', // 마감여부, 1
  'modiYn', // 조정여부, 2
  'compNm',
  'trnClsNm', // 배송유형, 3
  'trnCarType',
  'trnReqDt', // 배차요청일, 4
  'inDt', // 입차일, 5
  'outDt', // 출차일, 6
  'takeOverDt', // 배송완료일, 7
  'trnPlnNum', // 출고계획번호, 8
  'trnCarNum', // 차량번호, 9
  'totTrnPrice', // 최종운송비, 10
  'areaPriceAmt', // 기본운송비, 11
  'etcTrnPriceAmt', // 기타운송비, 12
  'driverNm', // 운송기사, 13
  'driverPhoneNum', // 운송기사연락처, 14
  'modiReasonNm', // 운송비조정유형,15
  'etcModiReason', // 조정사유, 16
  'custCd', // 고객코드, 17
  'custNm', // 고객, 18
  'trnReqRemark', // 특이사항, 19
  'trnReqVol', // 총부피, 20
  'trnReqWght', // 총중량, 21
  'deliCarTypeNm', // 차량유형, 22
];
