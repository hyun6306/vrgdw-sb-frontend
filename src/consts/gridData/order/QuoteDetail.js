import { ValueType } from 'realgrid';
import defs from '@/consts/defs';

export const fields = [
  {
    fieldName: 'id',
    dataType: 'text',
  },
  {
    fieldName: 'offrId',
    dataType: 'text',
  },
  {
    fieldName: 'apprId',
    dataType: 'text',
  },
  {
    fieldName: 'itemNum',
    dataType: 'number',
  },
  {
    fieldName: 'productInfo',
    dataType: 'text',
  },
  {
    fieldName: 'prdtClsNm',
    dataType: 'text',
  },
  {
    fieldName: 'prdtCd',
    dataType: 'text',
  },
  {
    fieldName: 'prdtNm',
    dataType: 'text',
  },
  {
    fieldName: 'brandNm',
    dataType: 'text',
  },
  {
    fieldName: 'dnstType',
    dataType: 'text',
  },
  {
    fieldName: 'ecoNm',
    dataType: 'text',
  },
  {
    fieldName: 'tskSpec',
    dataType: 'text',
  },
  {
    fieldName: 'hrsnSpec',
    dataType: 'text',
  },
  {
    fieldName: 'vtclSpec',
    dataType: 'text',
  },
  {
    fieldName: 'sizeChgYn',
    dataType: 'text',
  },
  {
    fieldName: 'hvSpec',
    dataType: 'text',
  },
  {
    fieldName: 'brdGradeNm',
    dataType: 'text',
  },
  {
    fieldName: 'baseUnitNm',
    dataType: 'text',
  },
  {
    fieldName: 'ordUnitNm',
    dataType: 'text',
  },

  {
    fieldName: 'trnHopeDt',
    dataType: 'text',
  },
  {
    fieldName: 'reqBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'reqOrdQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'apprStatNm',
    dataType: 'text',
  },
  {
    fieldName: 'apprStatCd',
    dataType: 'text',
  },
  {
    fieldName: 'currency',
    dataType: 'text',
  },
  {
    fieldName: 'reqQtyAmt',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'prdtQtyAmt',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'cfmQtyAmt',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'cfmTrnAmt',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'chgRate',
    dataType: 'text',
  },
  {
    fieldName: 'offrDtlsTotal',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'cfmOffrPrice',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'vatRate',
    dataType: 'text',
  },
  {
    fieldName: 'cfmOffrVat',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'offrDtlsStatNm',
    dataType: 'text',
  },
  {
    fieldName: 'offrDtlsStatCd',
    dataType: 'text',
  },
  {
    fieldName: 'progRate',
    dataType: 'text',
  },
  {
    fieldName: 'bokngCnt',
    dataType: 'text',
  },
  {
    fieldName: 'bokngBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngOrdQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'rmnBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'rmnOrdQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'progEndBaseTotQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'progEndOrdTotQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'canBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'canOrdQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'rmnEndBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'rmnEndOrdQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnEndBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnEndOrdQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'progIngBaseTotQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'progIngOrdTotQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnIngBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnIngOrdQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnReqBaseQty', //배송요청수량-기본
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnReqOrdQty', //배송요청수량-주문
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnPsbBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnPsbOrdQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'apprDocNum',
    dataType: 'text',
  },
  {
    fieldName: 'rmnCanDt',
    dataType: 'text',
  },
  {
    fieldName: 'rmnCanByNm',
    dataType: 'text',
  },
  {
    fieldName: 'createdByNm',
    dataType: 'text',
  },
  {
    fieldName: 'updatedByNm',
    dataType: 'text',
  },
  {
    fieldName: 'rmnCanBaseQty',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'rmnCanOrdQty',
    dataType: ValueType.NUMBER,
  },
  //패턴 전면,후면 / 경면판 전면,후면
  {
    fieldName: 'lpmFrtPttn',
    dataType: 'text',
  },
  {
    fieldName: 'lpmBckPttn',
    dataType: 'text',
  },
  {
    fieldName: 'lpmFrtPttnNm',
    dataType: 'text',
  },
  {
    fieldName: 'lpmBckPttnNm',
    dataType: 'text',
  },
  {
    fieldName: 'prsUpPttn',
    dataType: 'text',
  },
  {
    fieldName: 'prsDwPttn',
    dataType: 'text',
  },
  {
    fieldName: 'prsUpPttnNm',
    dataType: 'text',
  },
  {
    fieldName: 'prsDwPttnNm',
    dataType: 'text',
  },

  //견적조정판매가,운임조정액
  {
    fieldName: 'trnAddAmt',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'chgQtyAmt',
    dataType: ValueType.NUMBER,
  },
];

export const columns = [
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: '견적 상세 ID',
    },
    visible: false,
  },
  {
    fieldName: 'offrId',
    name: 'offrId',
    header: {
      text: '견적 ID',
    },
    visible: false,
  },
  {
    fieldName: 'apprId',
    name: 'apprId',
    header: {
      text: '결재 ID',
    },
    visible: false,
  },

  {
    fieldName: 'itemNum',
    name: 'itemNum',
    header: {
      text: '아이템 번호',
    },
    width: 150,
    numberFormat: '#',
  },
  {
    fieldName: 'productInfo',
    name: 'productInfo',
    header: {
      text: '아이템 정보',
    },
    visible: false,
  },
  {
    fieldName: 'prdtClsNm',
    name: 'prdtClsNm',
    header: {
      text: '제품그룹',
    },
    width: 150,
  },
  {
    fieldName: 'prdtCd',
    name: 'prdtCd',
    header: {
      text: '제품코드',
    },
    styleName: 't-c',
  },
  {
    fieldName: 'prdtNm',
    name: 'prdtNm',
    header: {
      text: '제품명',
    },
    styleName: 't-l',
    width: 400,
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
    fieldName: 'brandNm',
    name: 'brandNm',
    header: {
      text: '브랜드',
    },
    width: 250,
  },
  {
    fieldName: 'dnstType',
    name: 'dnstType',
    header: {
      text: '밀도',
    },
    width: 100,
  },
  {
    fieldName: 'ecoNm',
    name: 'ecoNm',
    header: {
      text: '친환경',
    },
    width: 100,
  },
  {
    fieldName: 'tskSpec',
    name: 'tskSpec',
    header: {
      text: '두께',
    },
    width: 100,
  },
  {
    fieldName: 'hrsnSpec',
    name: 'hrsnSpec',
    header: {
      text: '가로',
    },
    visible: false,
  },
  {
    fieldName: 'vtclSpec',
    name: 'vtclSpec',
    header: {
      text: '세로',
    },
    visible: false,
  },
  {
    fieldName: 'sizeChgYn',
    name: 'sizeChgYn',
    header: {
      text: ' ',
      // text: "사이즈변경",
    },
    visible: false,
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let cellValue = cell.value;
        let str = '';
        if (cellValue == 'Y') {
          str = `custom`;
          return str;
        } else {
          str = `standard`;
          return str;
        }
      },
    },
  },
  {
    fieldName: 'hvSpec',
    name: 'hvSpec',
    header: {
      text: '사이즈',
    },
  },
  {
    fieldName: 'brdGradeNm',
    name: 'brdGradeNm',
    header: {
      text: '등급',
    },
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnit',
    header: {
      text: '단위',
    },
    width: 50,
    styleName: 't-c',
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnit2',
    header: {
      text: '단위',
    },
    width: 50,
    styleName: 't-c',
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnit3',
    header: {
      text: '단위',
    },
    width: 50,
    styleName: 't-c',
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnit4',
    header: {
      text: '단위',
    },
    width: 50,
    styleName: 't-c',
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnit5',
    header: {
      text: '단위',
    },
    width: 50,
    styleName: 't-c',
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnit',
    header: {
      text: '단위(번들)',
      styleName: 't-c',
    },
    width: 50,
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnit2',
    header: {
      text: '단위(번들)',
      styleName: 't-c',
    },
    width: 50,
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnit3',
    header: {
      text: '단위(번들)',
      styleName: 't-c',
    },
    width: 50,
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnit4',
    header: {
      text: '단위(번들)',
      styleName: 't-c',
    },
    width: 50,
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnit5',
    header: {
      text: '단위(번들)',
      styleName: 't-c',
    },
    width: 50,
  },
  {
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: '납품희망월',
    },
    styleName: 't-c',
    width: 200,
  },
  {
    fieldName: 'reqBaseQty',
    name: 'reqBaseQty',
    header: {
      text: '견적요청수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'reqOrdQty',
    name: 'reqOrdQty',
    header: {
      text: '견적요청수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    //결재상태
    fieldName: 'apprStatNm',
    name: 'apprStatNm',
    header: {
      text: '결재상태',
    },
  },
  {
    fieldName: 'apprStatCd',
    name: 'apprStatCd',
    header: {
      text: '결재상태코드',
    },
    visible: false,
  },
  {
    fieldName: 'currency',
    name: 'currency',
    header: {
      text: '통화',
    },
  },
  {
    fieldName: 'reqQtyAmt',
    name: 'reqQtyAmt',
    header: {
      text: '판매단가',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    visible: false,
  },
  {
    fieldName: 'prdtQtyAmt',
    name: 'prdtQtyAmt',
    header: {
      text: '견적단가',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'prdtQtyAmt',
    name: 'prdtQtyAmt2', // 고객 노출용 견적단가
    header: {
      text: '견적단가',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'cfmQtyAmt',
    name: 'cfmQtyAmt',
    header: {
      text: '확정 수량 단가',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'cfmTrnAmt',
    name: 'cfmTrnAmt',
    header: {
      text: '확정 배송 단가',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'chgRate',
    name: 'chgRate',
    header: {
      text: '조정 율',
    },
    visible: false,
  },
  {
    fieldName: 'offrDtlsTotal',
    name: 'offrDtlsTotal',
    header: {
      text: '견적총액',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'cfmOffrPrice',
    name: 'cfmOffrPrice',
    header: {
      text: '견적 금액',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
  },
  {
    fieldName: 'vatRate',
    name: 'vatRate',
    header: {
      text: 'VAT(%)',
    },
  },
  {
    fieldName: 'cfmOffrVat',
    name: 'cfmOffrVat',
    header: {
      text: 'VAT',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'offrDtlsStatNm',
    name: 'offrDtlsStatNm',
    header: {
      text: '진행상태',
    },
  },
  {
    fieldName: 'offrDtlsStatCd',
    name: 'offrDtlsStatCd',
    header: {
      text: '진행상태 코드',
    },
    visible: false,
  },
  {
    fieldName: 'progRate',
    name: 'progRate',
    header: {
      text: '진행율(%)',
    },
    width: 100,
  },
  {
    fieldName: 'bokngCnt',
    name: 'bokngCnt',
    header: {
      text: '총 부킹 횟수',
    },
  },
  {
    fieldName: 'bokngBaseQty',
    name: 'bokngBaseQty',
    header: {
      text: '총 부킹량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'bokngOrdQty',
    name: 'bokngOrdQty',
    header: {
      text: '총 부킹량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    fieldName: 'rmnBaseQty',
    name: 'rmnBaseQty',
    header: {
      text: '남은량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'rmnOrdQty',
    name: 'rmnOrdQty',
    header: {
      text: '남은량',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
  },
  {
    fieldName: 'progEndBaseTotQty',
    name: 'progEndBaseTotQty',
    header: {
      text: '합계',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'progEndOrdTotQty',
    name: 'progEndOrdTotQty',
    header: {
      text: '합계',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    fieldName: 'canBaseQty',
    name: 'canBaseQty',
    header: {
      text: '견적 취소량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'canOrdQty',
    name: 'canOrdQty',
    header: {
      text: '견적 취소량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    fieldName: 'rmnEndBaseQty',
    name: 'rmnEndBaseQty',
    header: {
      text: '잔량 종료량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'rmnEndOrdQty',
    name: 'rmnEndOrdQty',
    header: {
      text: '잔량 종료량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    fieldName: 'trnEndBaseQty',
    name: 'trnEndBaseQty',
    header: {
      text: '배송 완료량',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
  },
  {
    fieldName: 'trnEndOrdQty',
    name: 'trnEndOrdQty',
    header: {
      text: '배송 완료량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    fieldName: 'progIngBaseTotQty',
    name: 'progIngBaseTotQty',
    header: {
      text: '합계',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'progIngOrdTotQty',
    name: 'progIngOrdTotQty',
    header: {
      text: '합계',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    fieldName: 'trnIngBaseQty',
    name: 'trnIngBaseQty',
    header: {
      text: '배송중량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'trnIngOrdQty',
    name: 'trnIngOrdQty',
    header: {
      text: '배송중량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    //배송요청수량-기본
    fieldName: 'trnReqBaseQty',
    name: 'trnReqBaseQty',
    header: {
      text: '배송요청량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    //배송요청수량-주문
    fieldName: 'trnReqOrdQty',
    name: 'trnReqOrdQty',
    header: {
      text: '배송요청량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    fieldName: 'trnPsbBaseQty',
    name: 'trnPsbBaseQty',
    header: {
      text: ' 배송요청가능량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
  },
  {
    fieldName: 'trnPsbOrdQty',
    name: 'trnPsbOrdQty',
    header: {
      text: '배송요청가능량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    fieldName: 'apprDocNum',
    name: 'apprDocNum',
    header: {
      text: '결재문서번호',
    },
    width: 200,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = '';
        let apprStat = grid.getValue(cell.index.itemIndex, 'apprStatCd');
        if (apprStat == defs.apprStatCd.need) {
          str = `<div class='real_form_input'><input type='text' style='text-align:right' /></div>`;
        } else {
          str = cell.value;
        }
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        return str;
      },
    },
  },
  {
    fieldName: 'createdByNm',
    name: 'createdByNm',
    header: {
      text: '등록자',
    },
    width: 250,
  },
  {
    fieldName: 'updatedByNm',
    name: 'updatedByNm',
    header: {
      text: '수정자',
    },
    width: 250,
  },
  {
    fieldName: 'rmnCanBaseQty',
    name: 'rmnCanBaseQty',
    header: {
      text: '남은량 취소 기본 수량',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
  },
  {
    fieldName: 'rmnCanOrdQty',
    name: 'rmnCanOrdQty',
    header: {
      text: '남은량 취소 주문 수량',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
  },
  {
    fieldName: 'rmnCanDt',
    name: 'rmnCanDt',
    header: {
      text: '견적 취소일',
    },
    styleName: 't-c',
  },
  {
    fieldName: 'rmnCanByNm',
    name: 'rmnCanByNm',
    header: {
      text: '견적 취소자',
    },
    width: 250,
  },
  //경면판, 패턴
  {
    fieldName: 'lpmFrtPttn',
    name: 'lpmFrtPttn',
    header: {
      text: '패턴 전면',
    },
    styleName: 't-c',
    visible: false,
  },
  {
    fieldName: 'lpmBckPttn',
    name: 'lpmBckPttn',
    header: {
      text: '패턴 후면',
    },
    styleName: 't-c',
    visible: false,
  },
  {
    fieldName: 'lpmFrtPttnNm',
    name: 'lpmFrtPttnNm',
    header: {
      text: '패턴 전면',
    },
    styleName: 't-c',
    width: 250,
  },
  {
    fieldName: 'lpmBckPttnNm',
    name: 'lpmBckPttnNm',
    header: {
      text: '패턴 후면',
    },
    styleName: 't-c',
    width: 250,
  },
  {
    fieldName: 'prsUpPttn',
    name: 'prsUpPttn',
    header: {
      text: '경면판 전면',
    },
    styleName: 't-c',
    visible: false,
  },
  {
    fieldName: 'prsDwPttn',
    name: 'prsDwPttn',
    header: {
      text: '경면판 후면',
    },
    styleName: 't-c',
    visible: false,
  },
  {
    fieldName: 'prsUpPttnNm',
    name: 'prsUpPttnNm',
    header: {
      text: '경면판 전면',
    },
    styleName: 't-c',
    width: 250,
  },
  {
    fieldName: 'prsDwPttnNm',
    name: 'prsDwPttnNm',
    header: {
      text: '경면판 후면',
    },
    styleName: 't-c',
    width: 250,
  },

  //견적조정판매가, 운임조정액
  {
    fieldName: 'trnAddAmt',
    name: 'trnAddAmt',
    header: {
      text: '운임 조정액',
    },
    editable: false,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        let offrStat = grid.getValue(cell.index.itemIndex, 'offrDtlsStatCd');
        let apprStat = grid.getValue(cell.index.itemIndex, 'apprStatCd');

        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        } else {
          str = 0 + '';
        }
        if (offrStat == defs.offrDtlsStatCd.request) {
          if (apprStat !== defs.apprStatCd.report && apprStat !== defs.apprStatCd.end) {
            str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
          }
        }
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let offrStat = grid.getValue(dataCell.index.itemIndex, 'offrDtlsStatCd');
      let apprStat = grid.getValue(dataCell.index.itemIndex, 'apprStatCd');
      let ret = {};
      if (offrStat == defs.offrDtlsStatCd.request) {
        if (apprStat !== defs.apprStatCd.report && apprStat !== defs.apprStatCd.end) {
          ret.editable = true;
        }
      }
      return ret;
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      positiveOnly: true,
    },
    numberFormat: '#,##0',
    styleName: 't-r',
  },
  {
    fieldName: 'chgQtyAmt',
    name: 'chgQtyAmt',
    header: {
      text: '견적조정 판매가',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      positiveOnly: true,
    },
    editable: false,
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        //cell.index.dataRow;
        let str = '';
        let offrStat = grid.getValue(cell.index.itemIndex, 'offrDtlsStatCd');
        let apprStat = grid.getValue(cell.index.itemIndex, 'apprStatCd');

        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        } else {
          str = 0;
        }
        if (offrStat == defs.offrDtlsStatCd.request) {
          if (apprStat !== defs.apprStatCd.report && apprStat !== defs.apprStatCd.end) {
            str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
          }
        }
        // str = `<div class='real_form_input'><input type='text' value='${cell.value}' onblur='valuecheck(" + ${cell.index.dataRow} + ", event)'/></div>`;
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let offrStat = grid.getValue(dataCell.index.itemIndex, 'offrDtlsStatCd');
      let apprStat = grid.getValue(dataCell.index.itemIndex, 'apprStatCd');
      let ret = {};
      if (offrStat == defs.offrDtlsStatCd.request) {
        if (apprStat !== defs.apprStatCd.report && apprStat !== defs.apprStatCd.end) {
          ret.editable = true;
        }
      }
      return ret;
    },
    numberFormat: '#,##0',
    styleName: 't-r',
  },
];

export const layout = [
  'itemNum', // 아이템번호, 1
  'offrDtlsStatNm', // 진행상태, 2
  'apprStatNm', // 결재상태, 3
  'apprDocNum', // 결재번호, 4
  'trnHopeDt', // 배송희망일, 5
  'prdtClsNm', // 제품그룹, 6
  {
    name: 'itemInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '아이템 정보',
    },
    items: [
      { column: 'prdtCd', groupShowMode: 'always' }, // 제품코드, 7
      { column: 'prdtNm', groupShowMode: 'always' }, // 제품설명, 8
      { column: 'brandNm', groupShowMode: 'expand' }, // 브랜드, 9
      { column: 'dnstType', groupShowMode: 'expand' }, // 밀도, 9
      { column: 'ecoNm', groupShowMode: 'expand' }, // 친환경, 10
      { column: 'tskSpec', groupShowMode: 'expand' }, // 두께, 11
      { column: 'hvSpec', groupShowMode: 'expand' }, // 사이즈, 12
      { column: 'brdGradeNm', groupShowMode: 'expand' }, // 등급, 13
      { column: 'lpmFrtPttnNm', groupShowMode: 'expand' }, // 패턴전면, 14
      { column: 'lpmBckPttnNm', groupShowMode: 'expand' }, // 패턴후면, 15
      { column: 'prsUpPttnNm', groupShowMode: 'expand' }, // 경면판전면, 16
      { column: 'prsDwPttnNm', groupShowMode: 'expand' }, // 경면판후면, 17
    ],
  },
  'currency', // 통화, 18
  'prdtQtyAmt2', // 고객 견적단가(합계), 19
  {
    name: 'priceInfo',
    direction: 'horizontal', // 단가
    expandable: true,
    expanded: false,
    header: {
      text: '단가',
    },
    items: [
      { column: 'prdtQtyAmt', groupShowMode: 'always' }, // 고객 견적단가(합계), 19
      { column: 'trnAddAmt', groupShowMode: 'expand' }, // 운임조정액, 22
      { column: 'chgQtyAmt', groupShowMode: 'expand' }, // 견적조정 판매가(서버) == 기준단가, 20
      { column: 'reqQtyAmt', groupShowMode: 'expand' }, // 판매단가(서버) == 기본단가, 21
    ],
  },
  {
    name: 'justPrice',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '금액',
    },
    items: [
      { column: 'offrDtlsTotal', groupShowMode: 'always' }, // 합계금액, 23
      { column: 'cfmOffrPrice', groupShowMode: 'expand' }, // 공급가액, 24
      { column: 'cfmOffrVat', groupShowMode: 'expand' }, // 부가가치세, 25
    ],
  },
  // 'vatRate',
  {
    name: 'Requested Vol',
    direction: 'horizontal',
    header: {
      text: '요청수량',
    },
    items: ['reqBaseQty', 'reqOrdQty', 'baseUnit3', 'ordUnit3'], // 요청량, 단위, 26, 27
  },
  'progRate', // 진행율, 28
  {
    name: 'totalBokngQty',
    direction: 'horizontal',
    header: {
      text: '총 부킹량',
    },
    items: ['bokngBaseQty', 'bokngOrdQty', 'baseUnit4', 'ordUnit4'], // 부킹량, 단위, 29, 30
  },
  {
    name: 'rmnQty',
    direction: 'horizontal',
    header: {
      text: '남은량',
    },
    items: ['rmnBaseQty', 'rmnOrdQty', 'baseUnit5', 'ordUnit5'], // 남은량, 단위, 31, 32
  },
  {
    name: 'progEnd',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '진행완료',
    },
    items: [
      { column: 'progEndBaseTotQty', groupShowMode: 'always' },
      { column: 'progEndOrdTotQty', groupShowMode: 'always' }, // 합계, 33
      { column: 'baseUnit', groupShowMode: 'always' },
      { column: 'ordUnit', groupShowMode: 'always' }, // 단위, 34
      { column: 'canBaseQty', groupShowMode: 'expand' },
      { column: 'canOrdQty', groupShowMode: 'expand' }, // 견적취소량, 35
      { column: 'rmnEndBaseQty', groupShowMode: 'expand' },
      { column: 'rmnEndOrdQty', groupShowMode: 'expand' }, // 잔량종료량, 36
      { column: 'trnEndBaseQty', groupShowMode: 'expand' },
      { column: 'trnEndOrdQty', groupShowMode: 'expand' }, // 배송완료량, 37
    ],
  },
  {
    name: 'statusProgressing',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '진행중',
    },
    items: [
      { column: 'progIngBaseTotQty', groupShowMode: 'always' },
      { column: 'progIngOrdTotQty', groupShowMode: 'always' }, // 합계, 38
      { column: 'baseUnit2', groupShowMode: 'always' },
      { column: 'ordUnit2', groupShowMode: 'always' }, // 단위, 39
      { column: 'trnIngBaseQty', groupShowMode: 'expand' },
      { column: 'trnIngOrdQty', groupShowMode: 'expand' }, // 배송중량, 40
      { column: 'trnReqBaseQty', groupShowMode: 'expand' },
      { column: 'trnReqOrdQty', groupShowMode: 'expand' }, // 배송요청량
      { column: 'trnPsbBaseQty', groupShowMode: 'expand' },
      { column: 'trnPsbOrdQty', groupShowMode: 'expand' }, // 배송가능량, 41
    ],
  },
  'createdByNm', // 생성자, 42
  'updatedByNm', // 수정자, 43
  'rmnCanDt', // 견적취소일, 44
  'rmnCanByNm', // 견적취소자, 45
];

export const baseColumn = ['reqBaseQty', 'bokngBaseQty', 'rmnBaseQty', 'progEndBaseTotQty', 'baseUnit', 'canBaseQty', 'rmnEndBaseQty', 'trnEndBaseQty', 'progIngBaseTotQty', 'baseUnit2', 'baseUnit3', 'baseUnit4', 'baseUnit5', 'trnIngBaseQty', 'trnPsbBaseQty', 'trnReqBaseQty'];
export const ordColumn = ['reqOrdQty', 'bokngOrdQty', 'rmnOrdQty', 'progEndOrdTotQty', 'ordUnit', 'canOrdQty', 'rmnEndOrdQty', 'trnEndOrdQty', 'progIngOrdTotQty', 'ordUnit2', 'ordUnit3', 'ordUnit4', 'ordUnit5', 'trnIngOrdQty', 'trnPsbOrdQty', 'trnReqOrdQty'];
