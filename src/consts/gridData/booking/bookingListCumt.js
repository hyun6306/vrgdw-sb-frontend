/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
export const fields = [
  {
    fieldName: 'id', //부킹 ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrId', //견적 ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrClsNm', //견적 구분 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrClsCd', //견적 구분 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngClsNm', //부킹 유형 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngClsCd', //부킹 유형 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'exptStatNm', //예탁 상태 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'exptStatCd', //예탁 상태 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngDt', //부킹일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngNum', //부킹번호
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
    fieldName: 'bokngSeq', //부킹회차
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngStatNm', //진행상태 . 부킹상태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngStatCd', //진행상태 . 부킹상태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'lstTrnReqDt', //마지막 배송요청일

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
    fieldName: 'prdtNm', //제품명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtCd', //제품코드
    ddataType: ValueType.TEXT,
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
    fieldName: 'addrInfo', //배송지 주소
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
    fieldName: 'bokngPrdtQtyAmt', //부킹단가
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
  {
    fieldName: 'bokngRmnBaseQty', //잔량 (부킹 남은 수량-기본단위)
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'bokngRmnOrdQty', //잔량 (부킹 남은 수량-주문단위)
    dataType: ValueType.NUMBER,
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
    fieldName: 'baseUnitNm', //단위 - 진행완료-기본
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ordUnitNm', //단위 - 진행완료-주문
    dataType: ValueType.TEXT,
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
    fieldName: 'dfcEndRemark', //잔량 종료 코멘트
    dataType: ValueType.TEXT,
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
    fieldName: 'lstTrnStatNm', //배송상태
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
    fieldName: 'outBaseQty', //출고 요청 수량
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'currency', //통화
    dataType: ValueType.TEXT,
    text: 'VND',
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
    fieldName: 'custId', //고객아이디
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'offrDtlsId', //견적 상세 ID
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
    fieldName: 'apprId', //결제아이디
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'plntCd', //플랜트
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'savPosCd', //저장 위치 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custPoNum', // P/O번호
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
    visible: false,
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
    visible: true,
    numberFormat: '#',
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
    editable: false,
    width: 250,
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
    fieldName: 'lstTrnReqDt',
    name: 'lstTrnReqDt',
    header: {
      text: '마지막 배송요청일',
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
    fieldName: 'addrInfo',
    name: 'addrInfo',
    header: {
      text: '배송지주소',
    },
    editable: false,
    renderer: 'imgbtn',
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
      text: 'Vat',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
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
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    //부킹량 (부킹 주문 수량)
    fieldName: 'bokngOrdQty',
    name: 'bokngOrdQty',
    header: {
      text: '부킹량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    //견적 요청 남은수량-기본
    fieldName: 'reqRmnBaseQty',
    name: 'reqRmnBaseQty',
    header: {
      text: '견적요청수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
    width: 150,
    visible: false,
  },
  {
    //견적 요청 남은수량-주문
    fieldName: 'reqRmnOrdQty',
    name: 'reqRmnOrdQty',
    header: {
      text: '견적요청수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
    width: 150,
    visible: false,
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
    //합계 (진행 완료 기본 합계 수량)
    fieldName: 'progEndBaseTotQty',
    name: 'progEndBaseTotQty',
    header: {
      text: '합계',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    //합계 (진행 완료 주문 합계 수량)
    fieldName: 'progEndOrdTotQty',
    name: 'progEndOrdTotQty',
    header: {
      text: '합계',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
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
    //잔량 종료-기본 수량
    fieldName: 'dfcEndBaseQty',
    name: 'dfcEndBaseQty',
    header: {
      text: '잔량종료',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    //잔량종료-주문 수량
    fieldName: 'dfcEndOrdQty',
    name: 'dfcEndOrdQty',
    header: {
      text: '잔량종료',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    //배송완료-기본
    fieldName: 'trnEndBaseQty',
    name: 'trnEndBaseQty',
    header: {
      text: '배송완료',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    //배송완료-주문
    fieldName: 'trnEndOrdQty',
    name: 'trnEndOrdQty',
    header: {
      text: '배송완료',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    //합계 (진행 중 기본 합계 수량)
    fieldName: 'progIngBaseTotQty',
    name: 'progIngBaseTotQty',
    header: {
      text: '합계',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    //합계 (진행 중 주문 합계 수량)
    fieldName: 'progIngOrdTotQty',
    name: 'progIngOrdTotQty',
    header: {
      text: '합계',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    //배송중-기본
    fieldName: 'trnIngBaseQty',
    name: 'trnIngBaseQty',
    header: {
      text: '배송중',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    //배송중-주문
    fieldName: 'trnIngOrdQty',
    name: 'trnIngOrdQty',
    header: {
      text: '배송중',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
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
      text: '배송요청량',
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
      text: '배송가능',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
  },
  {
    //배송가능수량-주문
    fieldName: 'trnPsbOrdQty',
    name: 'trnPsbOrdQty',
    header: {
      text: '배송가능',
    },
    styleName: 't-r',
    numberFormat: '#,##0.###',
    editable: false,
  },
  {
    fieldName: 'lstTrnStatNm',
    name: 'lstTrnStatNm',
    header: {
      text: '배송상태',
    },
    editable: false,
    visible: false,
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
      text: '잔량종료일',
    },
    editable: false,
  },
  {
    fieldName: 'dfcEndByNm',
    name: 'dfcEndByNm',
    header: {
      text: '잔량종료자',
    },
    editable: false,
    width: 200,
  },
  {
    fieldName: 'dfcEndTypeNm',
    name: 'dfcEndTypeNm',
    header: {
      text: '잔량종료사유명',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'dfcEndTypeCd',
    name: 'dfcEndTypeCd',
    header: {
      text: '잔량종료사유(텍스트 + 아이콘)',
    },
    visible: true,
    renderer: 'imgbtn',
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
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: '납품 희망 일',
    },
    visible: true,
    width: 200,
  },
  {
    fieldName: 'trnExpctDt',
    name: 'trnExpctDt',
    header: {
      text: '요구되는 납품일자',
    },
    width: '200',
    editable: false,
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
    fieldName: 'offrDtlsId',
    name: 'offrDtlsId',
    header: {
      text: 'offrDtlsId',
    },
    visible: false,
  },
  {
    fieldName: 'bokngSoNum',
    name: 'bokngSoNum',
    header: {
      text: 'bokngSoNum',
    },
    visible: false,
  },
  {
    fieldName: 'bokngSoItemNum',
    name: 'bokngSoItemNum',
    header: {
      text: 'bokngSoItemNum',
    },
    numberFormat: '#',
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
    fieldName: 'plntCd',
    name: 'plntCd',
    header: {
      text: 'plntCd',
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
    name: 'deliverDate',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '132',
      tooltip: '333',
      showTooltip: true,
    },
    items: [
      { column: 'trnExpctDt', groupShowMode: 'always' }, // 필수납기일, 3
      { column: 'trnHopeDt', groupShowMode: 'expand' }, // 배송희망일, 4
    ],
  },
  'bokngStatNm', // 진행상태, 5
  'bokngNum', // 부킹번호, 6
  'itemNum', // 아이템번호, 7
  'bokngSeq', // 부킹회차, 8
  'offrNum', // 견적번호, 9
  'custPoNum', // P/O번호, 10
  'prdtClsNm', // 제품그룹, 11
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
      { column: 'prdtCd', groupShowMode: 'always' }, // 제품코드, 12
      { column: 'prdtNm', groupShowMode: 'always' }, // 제품명, 13
      { column: 'brandNm', groupShowMode: 'expand' }, // 브랜드, 14
      { column: 'dnstType', groupShowMode: 'expand' }, // 밀도, 15
      { column: 'ecoNm', groupShowMode: 'expand' }, // 친환경, 16
      { column: 'tskSpec', groupShowMode: 'expand' }, // 두께, 17
      { column: 'hvSpec', groupShowMode: 'expand' }, // 사이즈, 18
      { column: 'brdGradeNm', groupShowMode: 'expand' }, // 등급, 19
      { column: 'lpmFrtPttnNm', groupShowMode: 'expand' }, // 패턴 전면, 20
      { column: 'lpmBckPttnNm', groupShowMode: 'expand' }, // 패턴 후면, 21
      // { column: 'prsUpPttnNm', groupShowMode: 'expand' }, // 경면판 전면
      { column: 'prsDwPttnNm', groupShowMode: 'expand' }, // 경면판 후면, 22
    ],
  },
  'bokngPrdtQtyAmt', // 부킹단가, 23
  {
    name: 'bookingPriceLay',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '부킹가격',
      tooltip: '부킹가격',
      showTooltip: true,
    },
    items: [
      { column: 'bokngOffrTotal', groupShowMode: 'always' }, // 부킹총액, 24
      { column: 'bokngOffrPrice', groupShowMode: 'expand' }, // 부킹금액, 25
      { column: 'bokngOffrVat', groupShowMode: 'expand' }, // 부가가치세, 26
      // { column: 'vatRate', groupShowMode: 'expand' }, // VAT(%)
    ],
  },
  {
    name: 'estRequestQty',
    direction: 'horizontal',
    header: {
      text: '견적요청수량',
    },
    hideChildHeaders: true,
    items: ['reqBaseQty', 'reqOrdQty'], // 견적요청수량, 주문량, 27
  },
  {
    name: 'bookingVol',
    direction: 'horizontal',

    header: {
      text: '부킹량',
    },
    hideChildHeaders: true,
    items: ['bokngBaseQty', 'bokngOrdQty'], // 부킹량, 주문량, 28
  },
  {
    name: 'bokngRmnBaseQty',
    direction: 'horizontal',

    header: {
      text: '남은량',
    },
    hideChildHeaders: true,
    items: ['bokngRmnBaseQty1', 'bokngRmnOrdQty1'], // 남은량, 29
  },
  {
    name: 'unit',
    direction: 'horizontal',

    header: {
      text: '단위',
    },
    hideChildHeaders: true,
    items: ['baseUnitNm', 'ordUnitNm'], // 단위, 30
  },
  {
    name: 'statusCompletion',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '진행완료',
      tooltip: '진행완료',
      showTooltip: true,
    },
    items: [
      { column: 'progEndBaseTotQty', groupShowMode: 'always' },
      { column: 'progEndOrdTotQty', groupShowMode: 'always' }, // 합계, 31
      { column: 'dfcEndBaseQty', groupShowMode: 'expand' },
      { column: 'dfcEndOrdQty', groupShowMode: 'expand' }, // 잔량종료량, 32
      { column: 'trnEndBaseQty', groupShowMode: 'expand' },
      { column: 'trnEndOrdQty', groupShowMode: 'expand' }, // 배송완료량, 33
    ],
  },
  {
    name: 'statusProgressingInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '진행중',
      tooltip: '진행중',
      showTooltip: true,
    },
    items: [
      { column: 'progIngBaseTotQty', groupShowMode: 'always' },
      { column: 'progIngOrdTotQty', groupShowMode: 'always' }, // 합계, 34
      { column: 'trnIngBaseQty', groupShowMode: 'always' },
      { column: 'trnIngOrdQty', groupShowMode: 'always' }, // 배송 중 량, 35
      { column: 'trnReqBaseQty', groupShowMode: 'always' },
      { column: 'trnReqOrdQty', groupShowMode: 'always' }, // 배송요청량
      { column: 'trnPsbBaseQty', groupShowMode: 'always' },
      { column: 'trnPsbOrdQty', groupShowMode: 'always' }, // 배송가능량, 36
      { column: 'lstTrnReqDt', groupShowMode: 'expand' }, // 마지막 배송요청일, 37
    ],
  },
  'addrInfo', // 배송지 아이콘, 38
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
      { column: 'dfcEndDt', groupShowMode: 'always' }, // 잔량종료일, 39
      { column: 'dfcEndByNm', groupShowMode: 'expand' }, // 잔량종료자, 40
      { column: 'dfcEndTypeCd', groupShowMode: 'expand' }, // 잔량종료사유(텍스트 + 아이콘), 41
    ],
  },
  'bokngClsNm',
  'offrClsCd',
  'bokngClsCd',
  'exptStatCd',
  'bokngDt', // 부킹일
  'prdtClsCd',
  'bokngStatCd',
  'dfcEndTypeNm',
  'outBaseQty',
  'currency',
  'id',
  'offrId',
  'custId',
  'offrDtlsId',
  'bokngSoNum',
  'apprId',
  'plntCd',
  'savPosCd',
  'bokngSoItemNum',
  // 요청량, 부킹량, 남은량, 재고 미할당
  // {
  //   name: 'quoReqRemQty',
  //   direction: 'horizontal',

  //   header: {
  //     text: '견적 요청 남은수량',
  //   },
  //   hideChildHeaders: true,
  //   items: ['reqRmnBaseQty', 'reqRmnOrdQty'], // 견적 잔량, 주문량
  // },
  // 'lstTrnStatNm',
  // {
  //   name: 'productCalender',
  //   direction: 'horizontal',
  //   header: {
  //     text: '생산일정',
  //     tooltip: '생산일정',
  //     showTooltip: true,
  //   },
  //   items: ['prdcExpctDt', 'prdcSttDt'],
  // },
];

export const baseColumn = ['trnEndBaseQty', 'dfcEndBaseQty', 'bokngRmnBaseQty1', 'bokngBaseQty', 'reqBaseQty', 'progEndBaseTotQty', 'baseUnitNm', 'progIngBaseTotQty', 'trnIngBaseQty', 'trnPsbBaseQty', 'trnReqBaseQty'];
// 'reqRmnBaseQty',

export const ordColumn = ['trnEndOrdQty', 'dfcEndOrdQty', 'bokngRmnOrdQty1', 'bokngOrdQty', 'reqOrdQty', 'progEndOrdTotQty', 'ordUnitNm', 'progIngOrdTotQty', 'trnIngOrdQty', 'trnPsbOrdQty', 'trnReqOrdQty'];
//  'reqRmnOrdQty',
