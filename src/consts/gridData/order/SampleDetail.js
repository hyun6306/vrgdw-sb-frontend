import { ValueType } from 'realgrid';
export let labels = [];
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
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'vtclSpec',
    dataType: ValueType.NUMBER,
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
    dataType: 'text',
  },
  {
    fieldName: 'prdtQtyAmt',
    dataType: 'text',
  },
  {
    fieldName: 'cfmQtyAmt',
    dataType: 'text',
  },
  {
    fieldName: 'cfmTrnAmt',
    dataType: 'text',
  },
  {
    fieldName: 'chgQtyAmt',
    dataType: 'text',
  },
  {
    fieldName: 'trnAddAmt',
    dataType: 'text',
  },
  {
    fieldName: 'chgRate',
    dataType: 'text',
  },
  {
    fieldName: 'offrDtlsTotal',
    dataType: 'text',
  },
  {
    fieldName: 'cfmOffrPrice',
    dataType: 'text',
  },
  {
    fieldName: 'vatRate',
    dataType: 'text',
  },
  {
    fieldName: 'cfmOffrVat',
    dataType: 'text',
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
  // {
  //   fieldName: 'apprDocNum',
  //   dataType: 'text',
  // },
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
    fieldName: 'lpmFrtPttnNm',
    dataType: 'text',
  },
  {
    fieldName: 'lpmBckPttnNm',
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

  {
    fieldName: 'trnExptDt',
    dataType: 'text',
  },
  //샘플상세
  {
    fieldName: 'costCntrCd',
    dataType: 'text',
  },
  {
    fieldName: 'costCntrNm',
    dataType: 'text',
  },
  {
    fieldName: 'apprDocNum',
    dataType: 'text',
  },
  {
    fieldName: 'salesResultCommt',
    dataType: 'text',
  },
  {
    fieldName: 'apprId',
    dataType: 'text',
  },
  {
    fieldName: 'prdtId',
  },
  {
    fieldName: 'smplEndTrnType',
    dataType: 'text',
  },
];

export const columns = [
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: '견적 상세 ID',
    },
  },
  {
    fieldName: 'offrId',
    name: 'offrId',
    header: {
      text: '견적 ID',
    },
  },
  {
    fieldName: 'apprId',
    name: 'apprId',
    header: {
      text: '결재 ID',
    },
  },
  {
    fieldName: 'prdtId',
    name: 'prdtId',
    header: {
      text: '제품ID',
    },
    visible: false,
  },
  {
    fieldName: 'itemNum',
    name: 'itemNum',
    header: {
      text: '아이템 번호',
    },
    width: 100,
    numberFormat: '#',
  },
  {
    fieldName: 'productInfo',
    name: 'productInfo',
    header: {
      text: '아이템 정보',
    },
  },
  {
    fieldName: 'prdtClsNm',
    name: 'prdtClsNm',
    header: {
      text: '제품품목',
    },
  },
  {
    fieldName: 'prdtCd',
    name: 'prdtCd',
    header: {
      text: '제품코드',
    },
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
  },
  {
    fieldName: 'ecoNm',
    name: 'ecoNm',
    header: {
      text: '친환경',
    },
  },
  {
    fieldName: 'tskSpec',
    name: 'tskSpec',
    header: {
      text: '두께',
    },
  },
  {
    fieldName: 'hrsnSpec',
    name: 'hrsnSpec',
    header: {
      text: '가로',
    },
    numberFormat: '#,##0',
  },
  {
    fieldName: 'vtclSpec',
    name: 'vtclSpec',
    header: {
      text: '세로',
    },
    numberFormat: '#,##0',
  },
  {
    fieldName: 'sizeChgYn',
    name: 'sizeChgYn',
    header: {
      // text: ' ',
      text: '사이즈변경',
    },
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let cellValue = cell.value;
        let str = '';
        if (cellValue == 'Y') {
          str = labels[1];
          return str;
        } else {
          str = labels[0];
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
    styleName: 't-c',
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnit2',
    header: {
      text: '단위',
    },
    styleName: 't-c',
  },
  {
    fieldName: 'baseUnitNm',
    name: 'baseUnit3',
    header: {
      text: '단위',
    },
    styleName: 't-c',
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnit',
    header: {
      text: '단위(번들)',
    },
    styleName: 't-c',
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnit2',
    header: {
      text: '단위(번들)',
    },
    styleName: 't-c',
  },
  {
    fieldName: 'ordUnitNm',
    name: 'ordUnit3',
    header: {
      text: '단위(번들)',
    },
    styleName: 't-c',
  },
  {
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: '납품희망월',
    },
    styleName: 't-c',
    width: 225,
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
      text: '진행상태',
    },
  },
  {
    fieldName: 'apprStatCd',
    name: 'apprStatCd',
    header: {
      text: '진행상태코드',
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
  },
  {
    fieldName: 'prdtQtyAmt',
    name: 'prdtQtyAmt',
    header: {
      text: '견적단가',
    },
    styleName: 't-r',
  },
  {
    fieldName: 'cfmQtyAmt',
    name: 'cfmQtyAmt',
    header: {
      text: '확정 수량 단가',
    },
    styleName: 't-r',
  },
  {
    fieldName: 'cfmTrnAmt',
    name: 'cfmTrnAmt',
    header: {
      text: '확정 배송 단가',
    },
    styleName: 't-r',
  },
  {
    fieldName: 'chgQtyAmt',
    name: 'chgQtyAmt',
    header: {
      text: '견적조정 판매가',
    },
    styleName: 't-r',
  },
  {
    fieldName: 'trnAddAmt',
    name: 'trnAddAmt',
    header: {
      text: '운임 조정액',
    },
    styleName: 't-r',
  },
  {
    fieldName: 'chgRate',
    name: 'chgRate',
    header: {
      text: '조정 율',
    },
  },
  {
    fieldName: 'offrDtlsTotal',
    name: 'offrDtlsTotal',
    header: {
      text: '견적총액',
      styleName: 't-r',
    },
  },
  {
    fieldName: 'cfmOffrPrice',
    name: 'cfmOffrPrice',
    header: {
      text: '견적 금액',
    },
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
    styleName: 't-r',
    numberFormat: '#,##0.###',
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
    fieldName: 'canBaseQty',
    name: 'canBaseQty2',
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
    fieldName: 'canOrdQty',
    name: 'canOrdQty2',
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
    styleName: 't-r',
    numberFormat: '#,##0',
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
  // {
  //   fieldName: 'apprDocNum',
  //   name: 'apprDocNum',
  //   header: {
  //     text: '결재문서번호',
  //   },
  //   editable: false,
  // },
  {
    fieldName: 'createdByNm',
    name: 'createdByNm',
    header: {
      text: '등록자',
    },
  },
  {
    fieldName: 'updatedByNm',
    name: 'updatedByNm',
    header: {
      text: '수정자',
    },
  },
  {
    fieldName: 'rmnCanBaseQty',
    name: 'rmnCanBaseQty',
    header: {
      text: '남은량 취소 기본 수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    fieldName: 'rmnCanOrdQty',
    name: 'rmnCanOrdQty',
    header: {
      text: '남은량 취소 주문 수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
  },
  {
    fieldName: 'rmnCanDt',
    name: 'rmnCanDt',
    header: {
      text: '견적 취소일',
    },
  },
  {
    fieldName: 'rmnCanByNm',
    name: 'rmnCanByNm',
    header: {
      text: '견적 취소자',
    },
  },
  //경면판, 패턴
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

  //샘플상세 costcenter
  {
    fieldName: 'costCntrCd',
    name: 'costCntrCd',
    header: {
      text: '코스트센터 코드',
    },
  },
  {
    fieldName: 'costCntrNm',
    name: 'costCntrNm',
    header: {
      text: '코스트센터 명',
    },
    styleName: 't-l',
  },
  {
    fieldName: 'apprDocNum',
    name: 'apprDocNum',
    header: {
      text: '결재문서번호',
    },
    editable: true,
    width: 150,
    renderer: {
      type: 'html',
      // inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        // let sizeYn = grid.getValue(cell.index.itemIndex, 'sizeChgYn');
        let offrStat = grid.getValue(cell.index.itemIndex, 'offrDtlsStatCd');
        // if (sizeYn == 'Y' || offrStat !== 'CFM') {
        if (offrStat !== 'REQ') {
          str = cell.value.replace(/^0+|\D+/g, '').replace(/^(\d{0,8})(\d{0,8})(\d{0,4})$/g, '$1-$2-$3');
        } else {
          let apprNum = '';
          if (cell.value == '' || cell.value == null) {
            apprNum = '';
          } else {
            apprNum = cell.value.replace(/^0+|\D+/g, '').replace(/^(\d{0,8})(\d{0,8})(\d{0,4})$/g, '$1-$2-$3');
          }
          str = `<div class='real_form_input'><input type='text' value='${apprNum}' /></div>`;
        }
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let sizeYn = grid.getValue(dataCell.index.itemIndex, 'sizeChgYn');
      let offrStat = grid.getValue(dataCell.index.itemIndex, 'offrDtlsStatCd');

      let ret = {};
      if (offrStat !== 'REQ') {
        ret.editable = false;
      } else if (sizeYn == 'N' || sizeYn == 'Y') {
        ret.editable = true;
      }
      return ret;
    },
  },
  {
    fieldName: 'trnExptDt',
    name: 'trnExptDt',
    header: {
      text: '납품 예정 월',
    },
    styleName: 't-r',
  },
  {
    fieldName: 'salesResultCommt',
    name: 'salesResultCommt',
    header: {
      text: '영업처리결과 코멘트',
    },
    renderer: 'imgbtn',
    width: 200,
  },
  {
    fieldName: 'smplEndTrnType',
    name: 'smplEndTrnType',
    header: {
      text: '배송방법',
    },
    renderer: 'imgbtn',
    width: 200,
  },
];

export const layout = [
  'itemNum',
  'offrDtlsStatNm',
  'trnHopeDt',
  'prdtClsNm',
  {
    name: 'itemInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '제품정보',
    },
    items: [
      { column: 'prdtCd', groupShowMode: 'always' },
      { column: 'prdtNm', groupShowMode: 'always' },
      { column: 'brandNm', groupShowMode: 'expand' },
      { column: 'hvSpec', groupShowMode: 'expand' },
      { column: 'lpmFrtPttnNm', groupShowMode: 'expand' },
      { column: 'lpmBckPttnNm', groupShowMode: 'expand' },
      { column: 'prsUpPttnNm', groupShowMode: 'expand' },
      { column: 'prsDwPttnNm', groupShowMode: 'expand' },
    ],
  },
  {
    name: 'sampleSize',
    direction: 'horizontal',
    header: {
      text: '샘플사이즈',
    },
    items: ['sizeChgYn', 'hrsnSpec', 'vtclSpec', 'tskSpec'],
    // 사이즈변경, 가로, 세로, 두께
  },
  {
    name: 'unitRequest',
    direction: 'horizontal',
    header: {
      text: '요청단위',
    },
    items: ['reqBaseQty', 'reqOrdQty', 'baseUnit', 'ordUnit'],
    // 기본, 주문, 매, 번들
  },
  {
    name: 'statusCompletion',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '완료량',
    },
    items: [
      { column: 'progEndBaseTotQty', groupShowMode: 'always' },
      { column: 'progEndOrdTotQty', groupShowMode: 'always' }, // 진행완료합계
      { column: 'baseUnit2', groupShowMode: 'always' },
      { column: 'ordUnit2', groupShowMode: 'always' }, // 단위
      { column: 'canBaseQty', groupShowMode: 'expand' },
      { column: 'canOrdQty', groupShowMode: 'expand' }, // 취소량
      { column: 'rmnEndBaseQty', groupShowMode: 'expand' },
      { column: 'rmnEndOrdQty', groupShowMode: 'expand' }, // 잔량종료량
      { column: 'trnEndBaseQty', groupShowMode: 'expand' },
      { column: 'trnEndOrdQty', groupShowMode: 'expand' }, // 배송완료량
    ],
  },
  {
    name: 'statusProgressing',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '진행중량',
    },
    items: [
      { column: 'progIngBaseTotQty', groupShowMode: 'always' },
      { column: 'progIngOrdTotQty', groupShowMode: 'always' }, // 합계
      { column: 'baseUnit3', groupShowMode: 'always' },
      { column: 'ordUnit3', groupShowMode: 'always' }, // 단위
      { column: 'trnIngBaseQty', groupShowMode: 'expand' },
      { column: 'trnIngOrdQty', groupShowMode: 'expand' }, // 배송중량
      { column: 'trnReqBaseQty', groupShowMode: 'expand' },
      { column: 'trnReqOrdQty', groupShowMode: 'expand' }, // 배송요청량
      { column: 'trnPsbBaseQty', groupShowMode: 'expand' },
      { column: 'trnPsbOrdQty', groupShowMode: 'expand' }, // 배송요청가능량
    ],
  },
  'costCntrNm', // 코스트센터
  'apprDocNum', // 결재문서번호
  'smplEndTrnType',
  'salesResultCommt', // 완료처리 코멘트
  'createdByNm', // 생성자
  'updatedByNm', // 수정자
  {
    groupShowMode: 'expand',
    name: 'sampleCancel',
    direction: 'horizontal',
    header: {
      text: '샘플취소',
    },
    items: ['rmnCanDt', 'rmnCanByNm'], // 취소일, 취소자
  },
];

// export const custSampleLayout = [
//   'itemNum',
//   'prdtClsNm',
//   'prdtCd',
//   'prdtNm',
//   {
//     name: '샘플사이즈',
//     direction: 'horizontal',
//     header: {
//       text: '샘플사이즈',
//     },
//     items: ['sizeChgYn', 'hrsnSpec', 'vtclSpec', 'tskSpec'],
//   },
//   {
//     name: '요청단위',
//     direction: 'horizontal',
//     header: {
//       text: '요청단위',
//     },
//     items: [
//       {
//         name: '수량',
//         direction: 'horizontal',
//         header: {
//           text: '수량',
//         },
//         hideChildHeaders: true,
//         items: ['reqBaseQty', 'reqOrdQty'],
//       },
//       {
//         name: '단위',
//         direction: 'horizontal',
//         header: {
//           text: '단위',
//         },
//         hideChildHeaders: true,
//         items: ['baseUnit', 'ordUnit'],
//       },
//     ],
//   },
//   'trnHopeDt',
//   'offrDtlsStatNm',
//   // 'progRate',
//   // {
//   //   name: '총 부킹량',
//   //   direction: 'horizontal',
//   //   header: {
//   //     text: '총 부킹량',
//   //   },
//   //   hideChildHeaders: true,
//   //   items: ['bokngBaseQty', 'bokngOrdQty'],
//   // },
//   // {
//   //   name: '남은량   ',
//   //   direction: 'horizontal',
//   //   header: {
//   //     text: '요청남은량',
//   //   },
//   //   hideChildHeaders: true,
//   //   items: ['rmnBaseQty', 'rmnOrdQty'],
//   // },
//   {
//     groupShowMode: 'expand',
//     name: '진행 상세',
//     direction: 'horizontal',

//     header: {
//       text: '진행 상세',
//     },
//     items: [
//       {
//         groupShowMode: 'always',
//         name: '진행완료합계',
//         direction: 'horizontal',
//         header: {
//           text: '진행완료합계',
//         },
//         hideChildHeaders: true,
//         items: ['progEndBaseTotQty', 'progEndOrdTotQty'],
//       },
//       {
//         groupShowMode: 'always',
//         name: '단위',
//         direction: 'horizontal',
//         header: {
//           text: '단위',
//         },
//         hideChildHeaders: true,
//         items: ['baseUnit2', 'ordUnit2'],
//       },
//       {
//         groupShowMode: 'always',
//         name: '샘플 취소량',
//         direction: 'horizontal',
//         header: {
//           text: '샘플 취소량',
//         },
//         hideChildHeaders: true,
//         items: ['canBaseQty', 'canOrdQty'],
//       },
//       {
//         groupShowMode: 'always',
//         name: '잔량 종료량',
//         direction: 'horizontal',
//         header: {
//           text: '잔량 종료량',
//         },
//         hideChildHeaders: true,
//         items: ['rmnEndBaseQty', 'rmnEndOrdQty'],
//       },
//       {
//         groupShowMode: 'always',
//         name: '배송 완료량',
//         direction: 'horizontal',
//         header: {
//           text: '배송 완료량',
//         },
//         hideChildHeaders: true,
//         items: ['trnEndBaseQty', 'trnEndOrdQty'],
//       },
//       {
//         groupShowMode: 'expand',
//         name: '진행중 합계',
//         direction: 'horizontal',
//         header: {
//           text: '진행중 합계',
//         },
//         hideChildHeaders: true,
//         items: ['progIngBaseTotQty', 'progIngOrdTotQty'],
//       },
//       {
//         groupShowMode: 'expand',
//         name: '단위',
//         direction: 'horizontal',
//         header: {
//           text: '단위',
//         },
//         hideChildHeaders: true,
//         items: ['baseUnit3', 'ordUnit3'],
//       },
//       {
//         groupShowMode: 'expand',
//         name: '배송중량',
//         direction: 'horizontal',
//         header: {
//           text: '배송중량',
//         },
//         hideChildHeaders: true,
//         items: ['trnIngBaseQty', 'trnIngOrdQty'],
//       },
//       {
//         groupShowMode: 'expand',
//         name: '배송요청가능량',
//         direction: 'horizontal',
//         header: {
//           text: '배송요청가능량',
//         },
//         hideChildHeaders: true,
//         items: ['trnPsbBaseQty', 'trnPsbOrdQty'],
//       },
//     ],
//   },
//   {
//     groupShowMode: 'expand',
//     name: '샘플취소',
//     direction: 'horizontal',

//     header: {
//       text: '샘플취소',
//     },
//     items: ['rmnCanDt', 'rmnCanByNm'],
//   },
//   'createdByNm',
//   'updatedByNm',
//   'salesResultCommt',
// ];

// export const custBaseColumn = ['baseUnit3', 'baseUnit2', 'reqBaseQty', 'baseUnit', 'progEndBaseTotQty', 'canBaseQty', 'rmnEndBaseQty', 'trnEndBaseQty', 'progIngBaseTotQty', 'trnIngBaseQty', 'trnPsbBaseQty'];
// export const custOrdColumn = ['ordUnit3', 'ordUnit2', 'reqOrdQty', 'ordUnit', 'progEndOrdTotQty', 'canOrdQty', 'rmnEndOrdQty', 'trnEndOrdQty', 'progIngOrdTotQty', 'trnIngOrdQty', 'trnPsbOrdQty'];
export const baseColumn = ['reqBaseQty', 'baseUnit', 'progEndBaseTotQty', 'baseUnit2', 'canBaseQty', 'rmnEndBaseQty', 'trnEndBaseQty', 'progIngBaseTotQty', 'baseUnit3', 'trnIngBaseQty', 'trnPsbBaseQty', 'trnReqBaseQty'];
export const ordColumn = ['reqOrdQty', 'ordUnit', 'progEndOrdTotQty', 'ordUnit2', 'canOrdQty', 'rmnEndOrdQty', 'trnEndOrdQty', 'progIngOrdTotQty', 'ordUnit3', 'trnIngOrdQty', 'trnPsbOrdQty', 'trnReqOrdQty'];
export const rows = [];
