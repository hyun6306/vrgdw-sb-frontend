/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
import defs from '@/consts/defs';
export const fields = [
  {
    fieldName: 'offrClsNm', //견적 구분 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrClsCd', //견적 구분
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngClsCd', //부킹 유형 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngClsNm', //부킹 유형 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'exptStatCd', //예탁 상태 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'exptStatNm', //예탁 상태 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngDt', //부킹일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custNm', //고객명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custCd', //코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cityNm', //지역구분
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custType', //그룹
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrNum', //견적번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'itemNum', //아이템번호
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngNum', //부킹번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngSoNum', //SO번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngSoItemNum', //SO번호
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngSeq', //부킹회차
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngStatCd', //부킹 상태 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngStatNm', //부킹 상태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'asgnReqDt', //할당요청일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'asgnProgDays', //할당경과일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'apprStatNm', //결재상태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'apprStatCd', //결제상태 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'apprDocNum', //결재번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngRmnBaseQty', //잔량 (부킹 남은 수량-기본단위)
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngRmnOrdQty', //잔량 (부킹 남은 수량-주문단위)
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'stockAsgnDt', //마지막 재고할당일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtClsNm', //요청품목 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtClsCd', //요청품목
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'plntCd', //플랜트
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtCd', //제품코드
    ddataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtNm', //제품명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'brandNm', //브랜드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dnstType', //밀도
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ecoNm', //친환경
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'tskSpec', //두께
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'hvSpec', //사이즈
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'brdGradeNm', //등급
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'lpmFrtPttnNm', //패턴전면
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'lpmBckPttnNm', //패턴후면
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prsUpPttnNm', //경면판전면
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prsDwPttnNm', //경면판후면
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'reqQtyAmt', //판매단가
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'prdtQtyAmt', //견적단가
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'chgQtyAmt', //견적조정판매단가
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnAddAmt', //견적운임 조정액
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngPrdtQtyAmt', //부킹단가
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngQtyAmt', //부킹조정 판매가
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngTrnAddAmt', //운임조정액 부킹
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngOffrTotal', //부킹총액
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngOffrPrice', //부킹금액
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'vatRate', //Vat(%)
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngOffrVat', //Vat
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'reqBaseQty', //견적요청수량-기본단위
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'reqOrdQty', //견적요청수량-주문단위
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngBaseQty', //부킹량 (부킹 기본 수량)
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngOrdQty', //부킹량 (부킹 주문 수량)
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'reqRmnBaseQty', //견적 요청 남은수량-기본
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'reqRmnOrdQty', //견적 요청 남은수량-주문
    dataType: ValueType.NUMBER,
  },
  //재고 미 할당수량
  {
    fieldName: 'baseUnitNm', //단위-기본
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ordUnitNm', //단위-주문
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'progEndBaseTotQty', //합계 (진행 완료 기본 합계 수량)
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'progEndOrdTotQty', //합계 (진행 완료 주문 합계 수량)
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'dfcEndBaseQty', //잔량 종료-기본 수량
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'dfcEndOrdQty', //잔량종료-주문 수량
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnEndBaseQty', //배송완료-기본
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnEndOrdQty', //배송완료-주문
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'progIngBaseTotQty', //합계 (진행 중 기본 합계 수량)
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'progIngOrdTotQty', //합계 (진행 중 주문 합계 수량)
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnIngBaseQty', //배송중-기본
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnIngOrdQty', //배송중-주문
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
    fieldName: 'trnPsbBaseQty', //배송가능수량-기본
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnPsbOrdQty', //배송가능수량-주문
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'lstTrnReqDt', //마지막 배송요청일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addrInfo', //배송지정보
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdcExpctDt', //예정일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdcSttDt', //시작일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dfcEndDt', //잔량종료일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dfcEndByNm', //잔량종료자
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dfcEndTypeNm', //잔량종료사유
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dfcEndTypeCd', //잔량종료사유 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'createdByNm', //등록자
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'createdDt', //등록일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedByNm', //수정자
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedDt', //수정일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'canByNm', //취소자
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'canDt', //취소일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeDt', //납품 희망 일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnExpctDt', //요구되는 납품일자
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'id', //부킹 ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrId', //견적 ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrDtlsId', //견적 상세 ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dfcEndRemark', //잔량 종료 코멘트
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'apprId', //결제아이디
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custId', //고객아이디
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'savPosCd', //저장 위치 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outBaseQty', //출고 요청 수량
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'currency', //통화
    dataType: ValueType.TEXT,
    text: 'VND',
  },
  {
    fieldName: 'ordUnitNmrtr', //분자
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'ordUnitDenom', //분모
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'custPoNum', //분모
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'offrClsNm',
    name: 'offrClsNm',
    header: {
      text: '주문유형',
    },
    editable: false,
  },
  {
    fieldName: 'offrClsCd',
    name: 'offrClsCd',
    header: {
      text: 'offrClsCd',
    },
    visible: false,
  },
  {
    fieldName: 'bokngClsNm',
    name: 'bokngClsNm',
    header: {
      text: 'bokngClsNm',
    },
    visible: false,
  },
  {
    fieldName: 'bokngClsCd',
    name: 'bokngClsCd',
    header: {
      text: 'bokngClsCd',
    },
    visible: false,
  },
  {
    fieldName: 'exptStatNm',
    name: 'exptStatNm',
    header: {
      text: '예탁구분',
    },
    editable: false,
  },
  {
    fieldName: 'exptStatCd',
    name: 'exptStatCd',
    header: {
      text: 'exptStatCd',
    },
    visible: false,
  },
  {
    fieldName: 'bokngDt',
    name: 'bokngDt',
    header: {
      text: '부킹일',
    },
    editable: false,
  },
  {
    fieldName: 'custNm',
    name: 'custNm',
    header: {
      text: '고객명',
    },
    width: '350',

    editable: false,
  },
  {
    fieldName: 'custCd',
    name: 'custCd',
    header: {
      text: '코드',
    },
    editable: false,
  },
  {
    fieldName: 'cityNm',
    name: 'cityNm',
    header: {
      text: '지역구분',
    },
    editable: false,
    width: 250,
  },
  {
    fieldName: 'custType',
    name: 'custType',
    header: {
      text: '고객 그룹',
    },
    editable: false,
    width: 200,
  },
  {
    fieldName: 'offrNum',
    name: 'offrNum',
    header: {
      text: '견적번호',
    },

    editable: false,
  },
  {
    fieldName: 'itemNum',
    name: 'itemNum',
    header: {
      text: '아이템번호',
    },
    editable: false,
    numberFormat: '#',
  },
  {
    fieldName: 'bokngNum',
    name: 'bokngNum',
    header: {
      text: '부킹번호',
    },

    editable: false,
  },
  {
    fieldName: 'bokngSoNum',
    name: 'bokngSoNum',
    header: {
      text: 'SO번호',
    },

    editable: false,
  },
  {
    fieldName: 'bokngSoItemNum',
    name: 'bokngSoItemNum',
    header: {
      text: 'S/O아이템번호',
    },
    numberFormat: '#',
    editable: false,
    width: 200,
  },
  {
    fieldName: 'bokngSeq',
    name: 'bokngSeq',
    header: {
      text: '부킹회차',
    },

    editable: false,
  },
  {
    fieldName: 'bokngStatNm',
    name: 'bokngStatNm',
    header: {
      text: '진행상태',
    },
    width: 250,

    editable: false,
  },
  {
    fieldName: 'bokngStatCd',
    name: 'bokngStatCd',
    header: {
      text: 'bokngStatCd',
    },
    visible: false,
  },
  {
    fieldName: 'asgnReqDt',
    name: 'asgnReqDt',
    header: {
      text: '할당요청일',
    },
    editable: false,
  },
  {
    fieldName: 'asgnProgDays',
    name: 'asgnProgDays',
    header: {
      text: '할당경과일',
    },
    styleName: 'f-red',
    width: '140',
    editable: false,
  },
  {
    fieldName: 'apprStatNm',
    name: 'apprStatNm',
    header: {
      text: '결재상태',
    },

    editable: false,
    width: 200,
  },
  {
    fieldName: 'apprStatCd',
    name: 'apprStatCd',
    header: {
      text: 'apprStatCd',
    },
    visible: false,
  },
  {
    fieldName: 'apprDocNum',
    name: 'apprDocNum',
    header: {
      text: '결재번호',
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        let apprStatCd = grid.getValue(cell.index.itemIndex, 'apprStatCd');
        str = str ? str : '';

        if (apprStatCd === defs.apprStatCd.need) {
          str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
        } else {
          str = cell.value;
        }
        return str;
      },
    },
    width: 200,
    editable: false,
    lookupDisplay: true,
  },
  {
    //(부킹 남은 수량-기본단위)
    fieldName: 'bokngRmnBaseQty',
    name: 'bokngRmnBaseQty1',
    header: {
      text: '잔량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    //(부킹 남은 수량-주문단위)
    fieldName: 'bokngRmnOrdQty',
    name: 'bokngRmnOrdQty1',
    header: {
      text: '잔량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    fieldName: 'stockAsgnDt',
    name: 'stockAsgnDt',
    header: {
      text: '마지막 재고할당일',
    },
    width: '120',
    editable: false,
  },
  {
    fieldName: 'prdtClsNm',
    name: 'prdtClsNm',
    header: {
      text: '요청품목',
    },
    editable: false,
  },
  {
    fieldName: 'prdtClsCd',
    name: 'prdtClsCd',
    header: {
      text: 'prdtClsCd',
    },
    visible: false,
  },
  {
    fieldName: 'plntCd',
    name: 'plntCd',
    header: {
      text: '플랜트',
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
    fieldName: 'prdtCd',
    name: 'prdtCd',
    header: {
      text: '제품코드',
    },

    editable: false,
  },
  {
    fieldName: 'brandNm',
    name: 'brandNm',
    header: {
      text: '브랜드',
    },
    width: '200',
    editable: false,
  },
  {
    fieldName: 'dnstType',
    name: 'dnstType',
    header: {
      text: '밀도',
    },
    editable: false,
  },
  {
    fieldName: 'ecoNm',
    name: 'ecoNm',
    header: {
      text: '친환경',
    },
    editable: false,
  },
  {
    fieldName: 'tskSpec',
    name: 'tskSpec',
    header: {
      text: '두께',
    },
    editable: false,
  },
  {
    fieldName: 'hvSpec',
    name: 'hvSpec',
    header: {
      text: '사이즈',
    },
    editable: false,
  },
  {
    fieldName: 'brdGradeNm',
    name: 'brdGradeNm',
    header: {
      text: '등급',
    },
    editable: false,
  },
  {
    fieldName: 'lpmFrtPttnNm',
    name: 'lpmFrtPttnNm',
    header: {
      text: '패턴전면',
    },
    width: '150',
    editable: false,
  },
  {
    fieldName: 'lpmBckPttnNm',
    name: 'lpmBckPttnNm',
    header: {
      text: '패턴후면',
    },
    width: '150',
    editable: false,
  },
  {
    fieldName: 'prsUpPttnNm',
    name: 'prsUpPttnNm',
    header: {
      text: '경면판전면',
    },
    editable: false,
  },
  {
    fieldName: 'prsDwPttnNm',
    name: 'prsDwPttnNm',
    header: {
      text: '경면판후면',
    },
    editable: false,
  },
  {
    fieldName: 'reqQtyAmt',
    name: 'reqQtyAmt',
    header: {
      text: '판매단가',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    fieldName: 'prdtQtyAmt',
    name: 'prdtQtyAmt',
    header: {
      text: '견적단가',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    fieldName: 'chgQtyAmt',
    name: 'chgQtyAmt',
    header: {
      text: '견적조정판매단가',
    },
    width: '120',
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    fieldName: 'trnAddAmt',
    name: 'trnAddAmt',
    header: {
      text: '견적운임 조정액',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    fieldName: 'bokngPrdtQtyAmt',
    name: 'bokngPrdtQtyAmt',
    header: {
      text: '부킹단가',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    fieldName: 'bokngQtyAmt',
    name: 'bokngQtyAmt',
    header: {
      text: '부킹조정 판매가',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      positiveOnly: true,
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        let offrClsCd = grid.getValue(cell.index.itemIndex, 'offrClsCd');
        let bokngStatCd = grid.getValue(cell.index.itemIndex, 'bokngStatCd');
        // let custType = grid.getValue(cell.index.itemIndex, 'custType');
        let apprStatCd = grid.getValue(cell.index.itemIndex, 'apprStatCd');

        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        } else {
          str = 0 + '';
        }

        if (offrClsCd === defs.offrClsCd.order) {
          // if (custType !== 'END USER') {
          if (bokngStatCd === defs.bokngStatCd.payNeed || bokngStatCd === defs.bokngStatCd.confirmNeed) {
            if (apprStatCd !== defs.apprStatCd.report || apprStatCd !== defs.apprStatCd.end) {
              str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
            }
            return str;
          }
          return str;
          // }
          // return str;
        }
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let offrClsCd = grid.getValue(dataCell.index.itemIndex, 'offrClsCd');
      let bokngStatCd = grid.getValue(dataCell.index.itemIndex, 'bokngStatCd');
      // let custType = grid.getValue(dataCell.index.itemIndex, 'custType');
      let apprStatCd = grid.getValue(dataCell.index.itemIndex, 'apprStatCd');
      let ret = {};

      if (offrClsCd === defs.offrClsCd.order) {
        // if (custType !== 'END USER') {
        if (bokngStatCd === defs.bokngStatCd.payNeed || bokngStatCd === defs.bokngStatCd.confirmNeed) {
          if (apprStatCd !== defs.apprStatCd.report || apprStatCd !== defs.apprStatCd.end) {
            ret.editable = true;
          }
          // }
        } else {
          ret.editable = false;
        }
        return ret;
      } else if (offrClsCd === defs.offrClsCd.sample) {
        ret.editable = false;
      }
      return ret;
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    lookupDisplay: true,
  },
  {
    fieldName: 'bokngTrnAddAmt',
    name: 'bokngTrnAddAmt',
    header: {
      text: '운임조정액',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      positiveOnly: true,
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        let offrClsCd = grid.getValue(cell.index.itemIndex, 'offrClsCd');
        let bokngStatCd = grid.getValue(cell.index.itemIndex, 'bokngStatCd');
        // let custType = grid.getValue(cell.index.itemIndex, 'custType');
        let apprStatCd = grid.getValue(cell.index.itemIndex, 'apprStatCd');

        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        } else {
          str = 0 + '';
        }

        if (offrClsCd === defs.offrClsCd.order) {
          // if (custType !== 'END USER') {
          if (bokngStatCd === defs.bokngStatCd.payNeed || bokngStatCd === defs.bokngStatCd.confirmNeed) {
            if (apprStatCd !== defs.apprStatCd.report || apprStatCd !== defs.apprStatCd.end) {
              str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
            }
            return str;
          }
          return str;
          // }
          // return str;
        }
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let offrClsCd = grid.getValue(dataCell.index.itemIndex, 'offrClsCd');
      let bokngStatCd = grid.getValue(dataCell.index.itemIndex, 'bokngStatCd');
      // let custType = grid.getValue(dataCell.index.itemIndex, 'custType');
      let apprStatCd = grid.getValue(dataCell.index.itemIndex, 'apprStatCd');
      let ret = {};

      if (offrClsCd === defs.offrClsCd.order) {
        // if (custType !== 'END USER') {
        if (bokngStatCd === defs.bokngStatCd.payNeed || bokngStatCd === defs.bokngStatCd.confirmNeed) {
          if (apprStatCd !== defs.apprStatCd.report || apprStatCd !== defs.apprStatCd.end) {
            ret.editable = true;
          }
          // }
        } else {
          ret.editable = false;
        }
        return ret;
      } else if (offrClsCd === defs.offrClsCd.sample) {
        ret.editable = false;
      }
      return ret;
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    lookupDisplay: true,
  },
  {
    fieldName: 'bokngOffrTotal',
    name: 'bokngOffrTotal',
    header: {
      text: '부킹총액',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    fieldName: 'bokngOffrPrice',
    name: 'bokngOffrPrice',
    header: {
      text: '부킹금액',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    fieldName: 'vatRate',
    name: 'vatRate',
    header: {
      text: 'Vat(%)',
    },
    numberFormat: '0.##',
    editable: false,
    visible: false,
  },
  {
    fieldName: 'bokngOffrVat',
    name: 'bokngOffrVat',
    header: {
      text: '부가가치세',
    },
    styleName: 't-r',
    numberFormat: '0,##0',
    editable: false,
  },
  {
    //견적요청수량-기본단위
    fieldName: 'reqBaseQty',
    name: 'reqBaseQty',
    header: {
      text: '견적요청수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    //견적요청수량-주문단위
    fieldName: 'reqOrdQty',
    name: 'reqOrdQty',
    header: {
      text: '견적요청수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    //부킹량 (부킹 기본 수량)
    fieldName: 'bokngBaseQty',
    name: 'bokngBaseQty',
    header: {
      text: '부킹량',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      positiveOnly: true,
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        let offrClsCd = grid.getValue(cell.index.itemIndex, 'offrClsCd');
        let bokngStatCd = grid.getValue(cell.index.itemIndex, 'bokngStatCd');
        let apprStatCd = grid.getValue(cell.index.itemIndex, 'apprStatCd');

        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        } else {
          str = 0 + '';
        }

        if (offrClsCd === defs.offrClsCd.order) {
          if (bokngStatCd === defs.bokngStatCd.payNeed || bokngStatCd === defs.bokngStatCd.confirmNeed) {
            if (apprStatCd !== defs.apprStatCd.report || apprStatCd !== defs.apprStatCd.end) {
              str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
            }
          }
          return str;
        }
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let offrClsCd = grid.getValue(dataCell.index.itemIndex, 'offrClsCd');
      let bokngStatCd = grid.getValue(dataCell.index.itemIndex, 'bokngStatCd');
      let apprStatCd = grid.getValue(dataCell.index.itemIndex, 'apprStatCd');
      let ret = {};

      if (offrClsCd === defs.offrClsCd.order) {
        if (bokngStatCd === defs.bokngStatCd.payNeed || bokngStatCd === defs.bokngStatCd.confirmNeed) {
          if (apprStatCd !== defs.apprStatCd.report || apprStatCd !== defs.apprStatCd.end) {
            ret.editable = true;
          }
        } else {
          ret.editable = false;
        }
        return ret;
      } else if (offrClsCd === defs.offrClsCd.sample) {
        ret.editable = false;
      }
      return ret;
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    lookupDisplay: true,
  },
  {
    //부킹량 (부킹 주문 수량)
    fieldName: 'bokngOrdQty',
    name: 'bokngOrdQty',
    header: {
      text: '부킹량',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
      numberFormat: '#,##0.###',
      positiveOnly: true,
    },
    renderer: {
      type: 'html',
      inputFocusable: false,
      callback: function (grid, cell) {
        let str = '';
        let offrClsCd = grid.getValue(cell.index.itemIndex, 'offrClsCd');
        let bokngStatCd = grid.getValue(cell.index.itemIndex, 'bokngStatCd');
        let apprStatCd = grid.getValue(cell.index.itemIndex, 'apprStatCd');

        if (cell.value) {
          str = Number(cell.value).toLocaleString('en');
        } else {
          str = 0 + '';
        }

        if (offrClsCd === defs.offrClsCd.order) {
          if (bokngStatCd === defs.bokngStatCd.payNeed || bokngStatCd === defs.bokngStatCd.confirmNeed) {
            if (apprStatCd !== defs.apprStatCd.report || apprStatCd !== defs.apprStatCd.end) {
              str = `<div class='real_form_input'><input type='text' style='text-align:right' value='${str}' /></div>`;
            }
          }
          return str;
        }
        return str;
      },
    },
    styleCallback: function (grid, dataCell) {
      let offrClsCd = grid.getValue(dataCell.index.itemIndex, 'offrClsCd');
      let bokngStatCd = grid.getValue(dataCell.index.itemIndex, 'bokngStatCd');
      let apprStatCd = grid.getValue(dataCell.index.itemIndex, 'apprStatCd');
      let ret = {};

      if (offrClsCd === defs.offrClsCd.order) {
        if (bokngStatCd === defs.bokngStatCd.payNeed || bokngStatCd === defs.bokngStatCd.confirmNeed) {
          if (apprStatCd !== defs.apprStatCd.report || apprStatCd !== defs.apprStatCd.end) {
            ret.editable = true;
          }
        } else {
          ret.editable = false;
        }
        return ret;
      } else if (offrClsCd === defs.offrClsCd.sample) {
        ret.editable = false;
      }
      return ret;
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    lookupDisplay: true,
  },
  {
    //견적 요청 남은수량-기본
    fieldName: 'reqRmnBaseQty',
    name: 'reqRmnBaseQty',
    header: {
      text: '견적 요청 남은수량',
    },
    width: '120',
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    //견적 요청 남은수량-주문
    fieldName: 'reqRmnOrdQty',
    name: 'reqRmnOrdQty',
    header: {
      text: '견적 요청 남은수량',
    },
    width: '120',
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  //재고 미 할당수량(기본)
  {
    fieldName: 'bokngRmnBaseQty',
    name: 'bokngRmnBaseQty2',
    header: {
      text: '재고 미 할당수량',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
    editable: false,
  },
  //재고 미 할당수량(주문)
  {
    fieldName: 'bokngRmnOrdQty',
    name: 'bokngRmnOrdQty2',
    header: {
      text: '재고 미 할당수량',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
    editable: false,
  },
  {
    //단위-기본
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm',
    header: {
      text: '단위',
    },
    editable: false,
  },
  {
    //단위-주문
    fieldName: 'ordUnitNm',
    name: 'ordUnitNm',
    header: {
      text: '단위',
    },
    editable: false,
  },
  {
    //합계 (진행 완료 기본 합계 수량)
    fieldName: 'progEndBaseTotQty',
    name: 'progEndBaseTotQty',
    header: {
      text: '합계',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
    editable: false,
  },
  {
    //합계 (진행 완료 주문 합계 수량)
    fieldName: 'progEndOrdTotQty',
    name: 'progEndOrdTotQty',
    header: {
      text: '합계',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
    editable: false,
  },
  {
    //잔량 종료-기본 수량
    fieldName: 'dfcEndBaseQty',
    name: 'dfcEndBaseQty',
    header: {
      text: '잔량종료',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
    editable: false,
  },
  {
    //잔량종료-주문 수량
    fieldName: 'dfcEndOrdQty',
    name: 'dfcEndOrdQty',
    header: {
      text: '잔량종료',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
    editable: false,
  },
  {
    //배송완료-기본
    fieldName: 'trnEndBaseQty',
    name: 'trnEndBaseQty',
    header: {
      text: '배송완료',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
    editable: false,
  },
  {
    //배송완료-주문
    fieldName: 'trnEndOrdQty',
    name: 'trnEndOrdQty',
    header: {
      text: '배송완료',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
    editable: false,
  },
  {
    //합계 (진행 중 기본 합계 수량)
    fieldName: 'progIngBaseTotQty',
    name: 'progIngBaseTotQty',
    header: {
      text: '합계',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
    editable: false,
    width: 200,
  },
  {
    //합계 (진행 중 주문 합계 수량)
    fieldName: 'progIngOrdTotQty',
    name: 'progIngOrdTotQty',
    header: {
      text: '합계',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
    editable: false,
    width: 200,
  },
  {
    //배송중-기본
    fieldName: 'trnIngBaseQty',
    name: 'trnIngBaseQty',
    header: {
      text: '배송중',
    },
    numberFormat: '#,##0',
    styleName: 't-r',
    editable: false,
  },
  {
    //배송중-주문
    fieldName: 'trnIngOrdQty',
    name: 'trnIngOrdQty',
    header: {
      text: '배송중',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
    editable: false,
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
      text: '배송가능',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    //배송가능수량-기본
    fieldName: 'trnPsbBaseQty',
    name: 'trnPsbBaseQty',
    header: {
      text: '배송가능수량',
    },
    width: '140',
    numberFormat: '#,##0',
    styleName: 't-r',
    editable: false,
  },
  {
    //배송가능수량-주문
    fieldName: 'trnPsbOrdQty',
    name: 'trnPsbOrdQty',
    header: {
      text: '배송가능수량',
    },
    width: '140',
    numberFormat: '#,##0.###',
    styleName: 't-r',
    editable: false,
  },
  {
    fieldName: 'lstTrnReqDt',
    name: 'lstTrnReqDt',
    header: {
      text: '마지막 배송요청일',
    },
    width: '120',
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
    fieldName: 'prdcExpctDt',
    name: 'prdcExpctDt',
    header: {
      text: '예정일',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'prdcSttDt',
    name: 'prdcSttDt',
    header: {
      text: '시작일',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'dfcEndDt',
    name: 'dfcEndDt',
    header: {
      text: '잔량 종료 일',
    },
    editable: false,
  },
  {
    fieldName: 'dfcEndByNm',
    name: 'dfcEndByNm',
    header: {
      text: '잔량 종료 자',
    },
    editable: false,
    width: 250,
  },
  {
    fieldName: 'dfcEndTypeNm',
    name: 'dfcEndTypeNm',
    header: {
      text: '잔량종료사유명',
    },
    visible: false,
    width: 200,
  },
  {
    fieldName: 'dfcEndTypeCd',
    name: 'dfcEndTypeCd',
    header: {
      text: '잔량 종료 사유(텍스트 + 아이콘)',
    },
    editable: true,
    renderer: 'imgbtn',
  },
  {
    fieldName: 'createdByNm',
    name: 'createdByNm',
    header: {
      text: '등록자',
    },
    editable: false,
    width: 200,
  },
  {
    fieldName: 'createdDt',
    name: 'createdDt',
    header: {
      text: '등록일',
    },
    editable: false,
  },
  {
    fieldName: 'updatedByNm',
    name: 'updatedByNm',
    header: {
      text: '수정자',
    },
    editable: false,
    width: 200,
  },
  {
    fieldName: 'updatedDt',
    name: 'updatedDt',
    header: {
      text: '수정일',
    },
    editable: false,
  },
  {
    fieldName: 'canByNm',
    name: 'canByNm',
    header: {
      text: '취소자',
    },
    editable: false,
    width: 200,
  },
  {
    fieldName: 'canDt',
    name: 'canDt',
    header: {
      text: '취소일',
    },
    editable: false,
  },
  {
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: '납품 희망 일',
    },
    editable: false,
    width: 200,
  },
  {
    fieldName: 'trnExpctDt',
    name: 'trnExpctDt',
    header: {
      text: '요구되는 납품일자',
    },
    width: 200,
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
    fieldName: 'offrId',
    name: 'offrId',
    header: {
      text: 'offrId',
    },
    visible: false,
  },
  {
    fieldName: 'offrDtlsId',
    name: 'offrDtlsId',
    header: {
      text: 'offrDtlsId',
    },
    visible: false,
  },
  {
    fieldName: 'dfcEndRemark',
    name: 'dfcEndRemark',
    header: {
      text: 'dfcEndRemark',
    },
    visible: false,
  },
  {
    fieldName: 'apprId',
    name: 'apprId',
    header: {
      text: 'apprId',
    },
    visible: false,
  },
  {
    fieldName: 'custId',
    name: 'custId',
    header: {
      text: 'custId',
    },
    visible: false,
  },
  {
    fieldName: 'savPosCd',
    name: 'savPosCd',
    header: {
      text: 'savPosCd',
    },
    visible: false,
  },
  {
    fieldName: 'outBaseQty',
    name: 'outBaseQty',
    header: {
      text: 'outBaseQty',
    },
    visible: false,
  },
  {
    fieldName: 'currency',
    name: 'currency',
    header: {
      text: 'currency',
    },
    visible: false,
  },
  {
    fieldName: 'ordUnitNmrtr',
    name: 'ordUnitNmrtr',
    header: {
      text: 'ordUnitNmrtr',
    },
    visible: false,
  },
  {
    fieldName: 'ordUnitDenom',
    name: 'ordUnitDenom',
    header: {
      text: 'ordUnitDenom',
    },
    visible: false,
  },
  {
    fieldName: 'custPoNum',
    name: 'custPoNum',
    header: {
      text: 'custPoNum',
    },
    visible: true,
    width: 250,
  },
];

export const layout = [
  'offrClsNm', // 주문유형, 1
  'exptStatNm', // 예탁구분, 2
  {
    name: 'customer', // 고객
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: 'customer',
      tooltip: '123',
      showTooltip: true,
    },
    items: [
      { column: 'custNm', groupShowMode: 'always' }, // 이름, 3
      { column: 'custCd', groupShowMode: 'expand' }, // ID, 4
      { column: 'cityNm', groupShowMode: 'expand' }, // 지역, 5
      { column: 'custType', groupShowMode: 'expand' }, // 그룹, 6
    ],
  },
  {
    name: 'deliverDate',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '132',
      tooltip: '123',
      showTooltip: true,
    },
    items: [
      { column: 'trnExpctDt', groupShowMode: 'always' }, // 필수납기일, 7
      { column: 'trnHopeDt', groupShowMode: 'expand' }, // 배송희망일, 8
    ],
  },
  'bokngDt', // 부킹일, 9
  {
    name: 'statInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '456',
    },
    items: [
      { column: 'bokngStatNm', groupShowMode: 'always' }, // 진행상태, 10
      { column: 'asgnReqDt', groupShowMode: 'expand' }, // 재고할당요청일, 11
      { column: 'asgnProgDays', groupShowMode: 'expand' }, // 할당 경과일, 12
      { column: 'bokngRmnBaseQty1', groupShowMode: 'expand' }, // 남은량(기본), 13
      { column: 'bokngRmnOrdQty1', groupShowMode: 'expand' }, // 남은량(주문), 13
      { column: 'stockAsgnDt', groupShowMode: 'expand' }, // 마지막 재고할당일, 14
    ],
  },
  {
    name: 'approval',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '999',
    },
    items: [
      { column: 'apprStatNm', groupShowMode: 'always' }, // 결재상태, 15
      { column: 'apprDocNum', groupShowMode: 'expand' }, // 결재문서번호, 16
    ],
  },
  'bokngNum', // 부킹번호, 17
  'itemNum', // 아이템번호, 18
  'bokngSeq', // 부킹회차, 19
  'offrNum', // 견적번호, 20
  'custPoNum', // P/O번호, 21
  {
    name: 'ERP S/O',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: 'ERP S/O',
    },
    items: [
      { column: 'bokngSoNum', groupShowMode: 'always' }, // ERP S/O 번호, 22
      { column: 'bokngSoItemNum', groupShowMode: 'expand' }, // ERP 아이템 번호, 23
    ],
  },
  'plntCd', // 플랜트, 24
  'prdtClsNm', // 제품그룹, 25
  {
    name: 'itemInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '아이템 정보',
      tooltip: '아이템 정보',
      showTooltip: true,
    },
    items: [
      { column: 'prdtCd', groupShowMode: 'always' }, // 제품코드, 26
      { column: 'prdtNm', groupShowMode: 'always' }, // 제품명, 27
      { column: 'brandNm', groupShowMode: 'expand' }, // 브랜드, 28
      { column: 'dnstType', groupShowMode: 'expand' }, // 밀도, 29
      { column: 'ecoNm', groupShowMode: 'expand' }, // 친환경, 30
      { column: 'tskSpec', groupShowMode: 'expand' }, // 두께, 31
      { column: 'hvSpec', groupShowMode: 'expand' }, // 사이즈, 32
      { column: 'brdGradeNm', groupShowMode: 'expand' }, // 등급, 33
      { column: 'lpmFrtPttnNm', groupShowMode: 'expand' }, // 패턴 전면, 34
      { column: 'lpmBckPttnNm', groupShowMode: 'expand' }, // 패턴 후면, 35
      { column: 'prsUpPttnNm', groupShowMode: 'expand' }, // 경면판 전면, 36
      { column: 'prsDwPttnNm', groupShowMode: 'expand' }, // 경면판 후면, 37
    ],
  },
  'reqQtyAmt', // 판매단가, 38
  {
    name: 'quotePriceLay',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '888',
    },
    items: [
      { column: 'prdtQtyAmt', groupShowMode: 'always' }, // 견적단가, 39
      { column: 'chgQtyAmt', groupShowMode: 'expand' }, // 기준단가, 40
      { column: 'trnAddAmt', groupShowMode: 'expand' }, // 운임조정액 - 견적, 41
    ],
  },
  {
    name: 'bookingUnitPrice',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: 'bookingUnitPrice',
    },
    items: [
      { column: 'bokngPrdtQtyAmt', groupShowMode: 'always' }, // 부킹단가, 42
      { column: 'bokngQtyAmt', groupShowMode: 'expand' }, // 기준단가 - 부킹, 43
      { column: 'bokngTrnAddAmt', groupShowMode: 'expand' }, // 운임조정액 - 부킹, 44
    ],
  },
  {
    name: 'bookingPriceLay',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '555',
    },
    items: [
      { column: 'bokngOffrTotal', groupShowMode: 'always' }, // 부킹총액, 45
      { column: 'bokngOffrPrice', groupShowMode: 'expand' }, // 부킹금액, 46
      { column: 'bokngOffrVat', groupShowMode: 'expand' }, // 부가가치세, 47
    ],
  },
  {
    name: 'estRequestQty',
    direction: 'horizontal',
    header: {
      text: '견적요청수량',
    },
    hideChildHeaders: true,
    items: ['reqBaseQty', 'reqOrdQty'], // 견적요청수량, 주문량, 48
  },
  {
    name: 'bookingVol',
    direction: 'horizontal',

    header: {
      text: '부킹량',
    },
    hideChildHeaders: true,
    items: ['bokngBaseQty', 'bokngOrdQty'], // 부킹량, 주문량, 49
  },
  {
    name: 'bokngRmnBaseQty',
    direction: 'horizontal',

    header: {
      text: '남은량',
    },
    hideChildHeaders: true,
    items: ['bokngRmnBaseQty2', 'bokngRmnOrdQty2'], // 남은량, 50
  },
  {
    name: 'unit',
    direction: 'horizontal',

    header: {
      text: '단위',
    },
    hideChildHeaders: true,
    items: ['baseUnitNm', 'ordUnitNm'], // 단위, 51
  },
  // 'apprStatCd',
  // ERP S/O번호 `~ 라인
  // 'bokngStatCd',
  'prdtClsCd',
  // {
  //   name: 'bookingPriceLay',
  //   direction: 'horizontal',
  //   expandable: false,
  //   header: {
  //     text: '부킹가격',
  //     tooltip: '부킹가격',
  //     showTooltip: true,
  //   },
  //   items: [
  //     { column: 'bokngOffrTotal', groupShowMode: 'always' }, // 부킹총액
  //     // { column: 'bokngOffrPrice', groupShowMode: 'expand' }, // 부킹금액
  //     // { column: 'vatRate', groupShowMode: 'expand' }, // 부가가치세
  //     // { column: 'bokngOffrVat', groupShowMode: 'expand' },
  //   ],
  // },
  // 견적요청량, 부킹량, 남은량, 재고 미할당
  // {
  //   name: 'quoReqRemQty',
  //   direction: 'horizontal',

  //   header: {
  //     text: '견적 요청 남은수량',
  //   },
  //   hideChildHeaders: true,
  //   items: ['reqRmnBaseQty', 'reqRmnOrdQty'], // 견적 잔량, 주문량
  // },
  // {
  //   name: 'quoReqRemQty',
  //   direction: 'horizontal',

  //   header: {
  //     text: '남은량',
  //   },
  //   hideChildHeaders: true,
  //   items: ['bokngRmnBaseQty1', 'bokngRmnOrdQty1'], // 부킹 잔량, 주문량
  // },
  // {
  //   name: 'unstockedQuota',
  //   direction: 'horizontal',
  //   header: {
  //     text: '재고 미 할당수량',
  //   },
  //   hideChildHeaders: true,
  //   items: ['bokngRmnBaseQty2', 'bokngRmnOrdQty2'], // 재고 미할당 수량, 주문량
  // },
  {
    name: 'statusCompletion',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '완료량',
      tooltip: '완료량',
      showTooltip: true,
    },
    items: [
      { column: 'progEndBaseTotQty', groupShowMode: 'always' },
      { column: 'progEndOrdTotQty', groupShowMode: 'always' }, // 합계, 52
      { column: 'dfcEndBaseQty', groupShowMode: 'expand' },
      { column: 'dfcEndOrdQty', groupShowMode: 'expand' }, // 잔량종료, 53
      { column: 'trnEndBaseQty', groupShowMode: 'expand' },
      { column: 'trnEndOrdQty', groupShowMode: 'expand' }, // 배송완료, 54
    ],
  },
  {
    name: 'statusProgressingInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '진행중정보',
      tooltip: '진행중정보',
      showTooltip: true,
    },
    items: [
      { column: 'progIngBaseTotQty', groupShowMode: 'always' },
      { column: 'progIngOrdTotQty', groupShowMode: 'always' }, // 합계, 55
      { column: 'trnIngBaseQty', groupShowMode: 'always' },
      { column: 'trnIngOrdQty', groupShowMode: 'always' }, // 배송중, 56
      { column: 'trnReqBaseQty', groupShowMode: 'always' },
      { column: 'trnReqOrdQty', groupShowMode: 'always' }, // 배송요청량
      { column: 'trnPsbBaseQty', groupShowMode: 'always' },
      { column: 'trnPsbOrdQty', groupShowMode: 'always' }, // 배송가능, 57
      { column: 'lstTrnReqDt', groupShowMode: 'expand' }, // 마지막 배송요청일, 58
    ],
  },
  'addrInfo', // 배송지정보, 59
  {
    name: 'remainInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '잔량정보',
      tooltip: '잔량정보',
      showTooltip: true,
    },
    items: [
      { column: 'dfcEndDt', groupShowMode: 'always' }, // 잔량종료일, 60
      { column: 'dfcEndByNm', groupShowMode: 'expand' }, // 잔량종료자, 61
      { column: 'dfcEndTypeCd', groupShowMode: 'expand' }, // 잔량사유(텍스트 + 아이콘), 62
    ],
  },
  'createdByNm', // 생성자, 63
  'createdDt', // 생성일, 64
  'updatedByNm', // 수정자, 65
  'updatedDt', // 수정일, 66
  'canByNm', // 취소자, 67
  'canDt', // 취소일, 68
  // {
  //   name: 'produce',
  //   direction: 'horizontal',
  //   visible: false,
  //   header: {
  //     text: '생산',
  //     tooltip: '생산',
  //     showTooltip: true,
  //   },
  //   items: ['prdcExpctDt', 'prdcSttDt'],
  // },
  'dfcEndTypeNm',
  'id',
  'offrId',
  'offrDtlsId',
  'dfcEndRemark',
  'apprId',
  'custId',
  'savPosCd',
  'outBaseQty',
  'currency',
  'ordUnitNmrtr',
  'ordUnitDenom',
  'offrClsCd',
  'bokngClsNm',
  'bokngClsCd',
  'exptStatCd',
];

export const baseColumn = ['trnEndBaseQty', 'dfcEndBaseQty', 'bokngRmnBaseQty2', 'bokngRmnBaseQty1', 'reqBaseQty', 'bokngBaseQty', 'baseUnitNm', 'progEndBaseTotQty', 'progIngBaseTotQty', 'trnIngBaseQty', 'trnPsbBaseQty', 'trnReqBaseQty'];

export const ordColumn = ['trnEndOrdQty', 'dfcEndOrdQty', 'bokngRmnOrdQty2', 'bokngRmnOrdQty1', 'reqOrdQty', 'bokngOrdQty', 'ordUnitNm', 'progEndOrdTotQty', 'progIngOrdTotQty', 'trnIngOrdQty', 'trnPsbOrdQty', 'trnReqOrdQty'];
