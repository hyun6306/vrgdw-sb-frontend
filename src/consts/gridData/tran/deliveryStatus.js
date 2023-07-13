/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
export const fields = [
  {
    fieldName: 'offrClsNm', //주문유형 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrClsCd', //주문유형
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outStatNm', //배송상태 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnStatNm', // trnStatNm 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnStatCd', // trnStatCd 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outStatCd', //배송상태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnClsNm', //출고구분 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnClsCd', //출고구분
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnHopeDt', //배송희망일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'reqDt', //배송요청일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPsbAt', //배송가능 일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCfmAt', //배차확정 일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'outAt', //배송출발 일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'takeOverAt', //배송완료 일시
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custNm', //고객사 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custId', //고객사 ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custCd', //고객사 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'rtnStatNm', //반품 진행상태 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'rtnStatCd', //반품 진행상태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrId', //견적Id
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'offrNum', //견적번호
    dataType: ValueType.TEXT,
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
    fieldName: 'bokngSoItemNum', //SAP ITEM No.
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'custPoNum', // 고객 P/O번호
    ddataType: ValueType.TEXT,
  },
  {
    fieldName: 'itemNum', // 고객 P/O번호
    dataType: 'number',
  },
  {
    fieldName: 'prdtClsNm', //품목 명
    ddataType: ValueType.TEXT,
  },
  {
    fieldName: 'prdtClsCd', //품목
    ddataType: ValueType.TEXT,
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
    fieldName: 'baseUnitNm', //단위-기본
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ordUnitNm', //단위-주문
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPsbBaseQty', //배송 가능 기준수량-기본
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnPsbOrdQty', //배송 가능 기준수량-주문
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnReqBaseQty', //배송 요청 주문수량-기본
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnReqOrdQty', //배송 요청 주문수량-주문
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'plntNm', //플랜트 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'plntCd', //플랜트
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'logitsAlias', //배송지명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addrInfo', //배송지정보
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarNm', //배송형태 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnCarType', //배송형태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnNum', //배송번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnPlnNum', //배차계획번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnDoNum', //DO No.
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnDoItemNum', //DO ITEM No.
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnIngBaseQty', //배송중 기준수량-기본
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnIngOrdQty', //배송중 기준수량-주문
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnEndBaseQty', //배송완료 기준수량-기본
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnEndOrdQty', //배송완료 기준수량-주문
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'trnCarNum', //차량번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'driverNm', //기사명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'driverPhoneNum', //기사연락처
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnReqRemark', //고객요청사항
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesTeamNm', //영업팀
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesUserNm', //영업사원
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesPhomeNum', // 영업연락처
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesEmail', // 영업메일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'id', //부킹 ID
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
    fieldName: 'bokngPrdtQtyAmt', //부킹 단가
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngOffrPrice', //부킹 견적 금액
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bokngOffrVat', //부킹 견적 부가세
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'vatRate', //부가세 율
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
    visible: false,
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
    fieldName: 'outStatNm',
    name: 'outStatNm',
    header: {
      text: '배송상태',
    },
    editable: false,
    width: 250,
  },
  {
    fieldName: 'trnStatNm',
    name: 'trnStatNm',
    header: {
      text: 'TRAN_STATUS 추가 예정',
    },
    editable: false,
    width: 250,
  },
  {
    fieldName: 'trnStatCd',
    name: 'trnStatCd',
    header: {
      text: 'TRAN_STATUS 추가 예정',
    },
    editable: false,
    visible: false,
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
    fieldName: 'trnClsNm',
    name: 'trnClsNm',
    header: {
      text: '출고구분',
    },
    editable: false,
    visible: false,
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
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt',
    header: {
      text: '배송희망일',
    },
    editable: false,
    width: 200,
  },
  {
    fieldName: 'trnHopeDt',
    name: 'trnHopeDt2',
    header: {
      text: '배송희망일',
    },
    editable: false,
    width: 200,
  },
  {
    fieldName: 'reqDt',
    name: 'reqDt',
    header: {
      text: '배송요청일',
    },
    editable: false,
    width: 200,
  },
  {
    fieldName: 'trnPsbAt',
    name: 'trnPsbAt',
    header: {
      text: '배송가능 일시',
    },
    width: 160,
    editable: false,
  },
  {
    fieldName: 'trnPsbAt',
    name: 'trnPsbAt2',
    header: {
      text: '배송가능 일시',
    },
    width: 160,
    editable: false,
  },
  {
    fieldName: 'trnCfmAt',
    name: 'trnCfmAt',
    header: {
      text: '배차확정 일시',
    },
    width: 250,
    editable: false,
  },
  {
    fieldName: 'outAt',
    name: 'outAt',
    header: {
      text: '배송출발 일시',
    },
    width: 160,
    editable: false,
  },
  {
    fieldName: 'outAt',
    name: 'outAt2',
    header: {
      text: '배송출발 일시',
    },
    width: 160,
    editable: false,
  },
  {
    fieldName: 'takeOverAt',
    name: 'takeOverAt',
    header: {
      text: '배송완료 일시',
    },
    width: 160,
    editable: false,
  },
  {
    fieldName: 'takeOverAt',
    name: 'takeOverAt2',
    header: {
      text: '배송완료 일시',
    },
    width: 160,
    editable: false,
  },
  {
    fieldName: 'custNm',
    name: 'custNm',
    header: {
      text: '고객사 명',
    },
    styleName: 't-l',
    width: 400,
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
    fieldName: 'custCd',
    name: 'custCd',
    header: {
      text: 'custCd',
    },
    visible: false,
  },
  {
    fieldName: 'rtnStatNm',
    name: 'rtnStatNm',
    header: {
      text: '반품 진행상태',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'rtnStatCd',
    name: 'rtnStatCd',
    header: {
      text: 'rtnStatCd',
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
    fieldName: 'offrNum',
    name: 'offrNum',
    header: {
      text: '견적번호',
    },
    width: 150,
  },
  {
    fieldName: 'bokngNum',
    name: 'bokngNum',
    header: {
      text: '부킹번호',
    },
    width: 150,
  },
  {
    fieldName: 'bokngSoNum',
    name: 'bokngSoNum',
    header: {
      text: 'S/O NO.',
    },
    editable: false,
  },
  {
    fieldName: 'bokngSoItemNum',
    name: 'bokngSoItemNum',
    header: {
      text: 'SAP ITEM No.',
    },
    numberFormat: '#',
    editable: false,
  },
  {
    fieldName: 'custPoNum',
    name: 'custPoNum',
    header: {
      text: '고객 P/O 번호',
    },
    editable: false,
    width: 250,
  },
  {
    fieldName: 'custPoNum',
    name: 'custPoNum2',
    header: {
      text: '고객 P/O 번호',
    },
    editable: false,
    width: 250,
  },
  {
    fieldName: 'itemNum',
    name: 'itemNum',
    header: {
      text: '아이템번호(부킹)',
    },
    numberFormat: '#',
    editable: false,
  },
  {
    fieldName: 'prdtClsNm',
    name: 'prdtClsNm',
    header: {
      text: '품목',
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
    fieldName: 'brandNm',
    name: 'brandNm',
    header: {
      text: '브랜드',
    },
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
    width: 250,
    editable: false,
  },
  {
    fieldName: 'lpmBckPttnNm',
    name: 'lpmBckPttnNm',
    header: {
      text: '패턴후면',
    },
    width: 250,
    editable: false,
  },
  {
    fieldName: 'prsUpPttnNm',
    name: 'prsUpPttnNm',
    header: {
      text: '경면판전면',
    },
    editable: false,
    width: 250,
  },
  {
    fieldName: 'prsDwPttnNm',
    name: 'prsDwPttnNm',
    header: {
      text: '경면판후면',
    },
    editable: false,
    width: 250,
  },
  {
    //배송 가능 기준수량
    fieldName: 'trnPsbBaseQty',
    name: 'trnPsbBaseQty',
    header: {
      text: '수량',
    },
    numberFormat: '#,##0.##;.;,',
    styleName: 't-r',
    editable: false,
    visible: false,
  },
  {
    //단위-기본
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm1',
    header: {
      text: '단위',
    },
    editable: false,
  },
  {
    //배송가능수량-주문
    fieldName: 'trnPsbOrdQty',
    name: 'trnPsbOrdQty',
    header: {
      text: '배송가능수량',
    },
    numberFormat: '#,##0.###',
    styleName: 't-r',
    editable: false,
    visible: false,
  },
  {
    //단위-주문
    fieldName: 'ordUnitNm',
    name: 'ordUnitNm1',
    header: {
      text: '단위',
    },
    editable: false,
  },
  {
    //배송 요청 주문수량-기본단위
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
    //단위-기본
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm2',
    header: {
      text: '단위',
    },
    editable: false,
  },
  {
    //배송 요청 주문수량-주문단위
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
    //단위-주문
    fieldName: 'ordUnitNm',
    name: 'ordUnitNm2',
    header: {
      text: '단위',
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
    fieldName: 'logitsAlias',
    name: 'logitsAlias',
    header: {
      text: '배송지명',
    },
    editable: false,
    width: 400,
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
    fieldName: 'trnCarNm',
    name: 'trnCarNm',
    header: {
      text: '배송형태',
    },
    editable: false,
  },
  {
    fieldName: 'trnCarType',
    name: 'trnCarType',
    header: {
      text: 'trnCarType',
    },
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
        let str = cell.value;
        str = '<p class="underline">' + cell.value + '</p>';
        return str;
      },
    },
  },
  {
    fieldName: 'trnPlnNum',
    name: 'trnPlnNum',
    header: {
      text: '배차계획번호',
    },
    width: 130,
    editable: false,
  },
  {
    fieldName: 'trnDoNum',
    name: 'trnDoNum',
    header: {
      text: 'DO No.',
    },
    editable: false,
  },
  {
    fieldName: 'trnDoItemNum',
    name: 'trnDoItemNum',
    header: {
      text: 'DO ITEM No.',
    },
    numberFormat: '#',
    editable: false,
  },
  {
    //배송중 기준수량-기본
    fieldName: 'trnIngBaseQty',
    name: 'trnIngBaseQty',
    header: {
      text: '수량',
    },
    numberFormat: '#,##0.##;.;,',
    styleName: 't-r',
    editable: false,
    visible: false,
  },
  {
    //단위-기본
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm3',
    header: {
      text: '단위',
    },
    editable: false,
    visible: false,
  },
  {
    //배송중 기준수량-주문
    fieldName: 'trnIngOrdQty',
    name: 'trnIngOrdQty',
    header: {
      text: '배송가능수량',
    },
    numberFormat: '#,##0.##;.;,',
    styleName: 't-r',
    editable: false,
    visible: false,
  },
  {
    //단위-주문
    fieldName: 'ordUnitNm',
    name: 'ordUnitNm3',
    header: {
      text: '단위',
    },
    editable: false,
    visible: false,
  },
  {
    //배송완료 기준수량-기본
    fieldName: 'trnEndBaseQty',
    name: 'trnEndBaseQty',
    header: {
      text: '수량',
    },
    styleName: 't-r',
    numberFormat: '#,##0',
    editable: false,
    visible: false,
  },
  {
    //단위-기본
    fieldName: 'baseUnitNm',
    name: 'baseUnitNm4',
    header: {
      text: '단위',
    },
    editable: false,
    visible: false,
  },
  {
    //배송완료 기준수량-주문
    fieldName: 'trnEndOrdQty',
    name: 'trnEndOrdQty',
    header: {
      text: '수량',
    },
    styleName: 't-r',
    numberFormat: '#,###.###',
    editable: false,
    visible: false,
  },
  {
    //단위-주문
    fieldName: 'ordUnitNm',
    name: 'ordUnitNm4',
    header: {
      text: '단위',
    },
    editable: false,
    visible: false,
  },
  {
    fieldName: 'trnCarNum',
    name: 'trnCarNum',
    header: {
      text: '차량번호',
    },
    editable: false,
  },
  {
    fieldName: 'driverNm',
    name: 'driverNm',
    header: {
      text: '기사명',
    },
    styleName: 't-l',
    editable: false,
    width: 250,
  },
  {
    fieldName: 'driverPhoneNum',
    name: 'driverPhoneNum',
    header: {
      text: '운전기사연락처',
    },
    width: 180,
    editable: false,
  },
  {
    fieldName: 'trnReqRemark',
    name: 'trnReqRemark',
    header: {
      text: '고객요청사항',
    },
    // styleName: 't-l',
    // width: 250,
    editable: false,
    renderer: 'imgbtn',
    visible: false,
  },
  {
    fieldName: 'salesTeamNm',
    name: 'salesTeamNm',
    header: {
      text: '영업팀',
    },
    editable: false,
  },
  {
    fieldName: 'salesUserNm',
    name: 'salesUserNm',
    header: {
      text: '영업사원',
    },
    editable: false,
    width: 250,
  },
  {
    fieldName: 'salesPhomeNum',
    name: 'salesPhomeNum',
    header: {
      text: '영업사원 연락처 추가예정',
    },
    editable: false,
  },
  {
    fieldName: 'salesEmail',
    name: 'salesEmail',
    header: {
      text: '영업사원 이메일 추가예정',
    },
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
    fieldName: 'bokngClsCd',
    name: 'bokngClsCd',
    header: {
      text: 'bokngClsCd',
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
    fieldName: 'bokngPrdtQtyAmt',
    name: 'bokngPrdtQtyAmt',
    header: {
      text: 'bokngPrdtQtyAmt',
    },
    visible: false,
  },
  {
    fieldName: 'bokngOffrPrice',
    name: 'bokngOffrPrice',
    header: {
      text: 'bokngOffrPrice',
    },
    visible: false,
  },
  {
    fieldName: 'bokngOffrVat',
    name: 'bokngOffrVat',
    header: {
      text: 'bokngOffrVat',
    },
    visible: false,
  },
  {
    fieldName: 'vatRate',
    name: 'vatRate',
    header: {
      text: 'vatRate',
    },
    visible: false,
  },
];

export const layout = [
  // 'offrClsNm', // 주문유형
  'offrClsCd',
  'custNm', // 고객명
  'trnCarNm', // 배송유형
  'outStatNm', // 상태 => OUT_STAUTS
  'trnStatNm', // 상태, TRNA_STATUS 추가 전
  'trnPsbAt2', // 고객 배송계획일
  'trnHopeDt2', // 고객 배송희망일
  'trnNum', // 배송요청번호
  'trnPlnNum', // 배차계획번호
  'custPoNum2', // 고객용 PO번호
  'trnDoNum', // D/O번호
  'trnDoItemNum', // D/O 아이템번호
  // 'rtnStatNm', // 반품진행상태
  {
    name: 'relateInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '연관 주문정보',
      tooltip: '연관 주문정보',
      showTooltip: true,
    },
    items: [
      { column: 'bokngNum', groupShowMode: 'always' },
      { column: 'offrNum', groupShowMode: 'expand' },
    ],
  },
  'itemNum', // 부킹아이템번호, 추가 전
  'custPoNum', // 고객 P/O번호 추가 전
  {
    name: 'ERP S/O',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: 'ERP S/O',
      tooltip: 'ERP S/O',
      showTooltip: true,
    },
    items: [
      { column: 'bokngSoNum', groupShowMode: 'always' }, // S/O번호
      { column: 'bokngSoItemNum', groupShowMode: 'expand' }, // S/O 아이템번호
    ],
  },
  'trnPsbAt', // 배송계획일시
  'trnHopeDt', // 배송희망일
  'reqDt', // 배송요청일
  'takeOverAt', // 배송완료일시
  'outAt', // 배송출발일시
  'trnCfmAt', // 배차확정일시
  'prdtClsNm', // 제품그룹
  'prdtClsCd',
  {
    name: 'itemInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '제품정보',
      tooltip: '제품정보',
      showTooltip: true,
    },
    items: [
      { column: 'prdtCd', groupShowMode: 'always' }, // 제품코드
      { column: 'prdtNm', groupShowMode: 'always' }, // 제품명
      { column: 'brandNm', groupShowMode: 'expand' }, // 브랜드
      { column: 'dnstType', groupShowMode: 'expand' }, // 밀도
      { column: 'ecoNm', groupShowMode: 'expand' }, // 친환경
      { column: 'tskSpec', groupShowMode: 'expand' }, // 두께
      { column: 'hvSpec', groupShowMode: 'expand' }, // 사이즈
      { column: 'brdGradeNm', groupShowMode: 'expand' }, // 등급
      { column: 'lpmFrtPttnNm', groupShowMode: 'expand' }, // 패턴전면
      { column: 'lpmBckPttnNm', groupShowMode: 'expand' }, // 패턴후면
      { column: 'prsUpPttnNm', groupShowMode: 'expand' }, // 경면판전면
      { column: 'prsDwPttnNm', groupShowMode: 'expand' }, // 경면판후면
    ],
  },
  {
    name: 'outBaseQty', // 기준수량만 노출
    direction: 'horizontal',
    header: {
      text: '배송요청량',
      tooltip: '배송요청량',
      showTooltip: true,
    },
    items: [
      { column: 'trnReqOrdQty', groupShowMode: 'expand' }, // 주문
      { column: 'trnReqBaseQty', groupShowMode: 'expand' }, // 기본
      { column: 'baseUnitNm2', groupShowMode: 'expand' }, // 단위 매
      { column: 'ordUnitNm2', groupShowMode: 'expand' }, // 단위 번들
    ],
  },
  'trnCarType', // 배송방법
  {
    name: 'addrInfo2',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '배송지 정보',
      tooltip: '배송지 정보',
      showTooltip: true,
    },
    items: [
      { column: 'logitsAlias', groupShowMode: 'always' }, // 배송지
      { column: 'addrInfo', groupShowMode: 'expand' }, // 배송지주소
    ],
  },
  {
    name: 'carInfo',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '차량정보',
      tooltip: '차량정보',
      showTooltip: true,
    },
    items: [
      { column: 'trnCarNum', groupShowMode: 'always' }, // 차량번호
      { column: 'driverNm', groupShowMode: 'expand' }, // 운송기사
      { column: 'driverPhoneNum', groupShowMode: 'expand' }, // 운송기사 연락처
    ],
  },
  {
    name: 'salesUserNm',
    direction: 'horizontal',
    expandable: true,
    expanded: false,
    header: {
      text: '영업사원',
      tooltip: '영업사원 정보입니다.',
      showTooltip: true,
    },
    items: [
      { column: 'salesUserNm', groupShowMode: 'always' },
      { column: 'salesTeamNm', groupShowMode: 'expand' },
      { column: 'salesPhomeNum', groupShowMode: 'expand' },
      { column: 'salesEmail', groupShowMode: 'expand' },
    ],
  },
  'takeOverAt2',
  'outAt2',
  'outStatCd',
  'trnStatCd',
  'trnClsNm', // 출고구분
  'trnClsCd',
  'custId',
  'custCd',
  'rtnStatCd',
  'offrId',
  // 'trnReqRemark', // 고객요청사항
  // {
  //   name: 'delivAvailBsae',
  //   direction: 'horizontal',
  //   header: {
  //     text: '배송가능 기준수량',
  //     tooltip: '배송가능 기준수량',
  //     showTooltip: true,
  //   },
  //   items: ['trnPsbBaseQty', 'baseUnitNm1'],
  // },
  // {
  //   name: 'delivAvailOrd',
  //   direction: 'horizontal',
  //   header: {
  //     text: '배송가능 주문수량',
  //     tooltip: '배송가능 주문수량',
  //     showTooltip: true,
  //   },
  //   items: ['trnPsbOrdQty', 'ordUnitNm1'],
  // },
  'plntNm', // 플랜트
  'plntCd',
  // {
  //   name: 'delivIngBase',
  //   direction: 'horizontal',
  //   header: {
  //     text: '배송중 기준수량',
  //     tooltip: '배송중 기준수량',
  //     showTooltip: true,
  //   },
  //   items: ['trnIngBaseQty', 'baseUnitNm3'],
  // },
  // {
  //   name: 'delivIngOrd',
  //   direction: 'horizontal',
  //   header: {
  //     text: '배송중 주문수량',
  //     tooltip: '배송중 주문수량',
  //     showTooltip: true,
  //   },
  //   items: ['trnIngOrdQty', 'ordUnitNm3'],
  // },
  // {
  //   name: 'delivEndBase',
  //   direction: 'horizontal',
  //   header: {
  //     text: '배송완료 기준수량',
  //     tooltip: '배송완료 기준수량',
  //     showTooltip: true,
  //   },
  //   items: ['trnEndBaseQty', 'baseUnitNm4'],
  // },
  // {
  //   name: 'delivEndOrd',
  //   direction: 'horizontal',
  //   header: {
  //     text: '배송완료 주문수량',
  //     tooltip: '배송완료 주문수량',
  //     showTooltip: true,
  //   },
  //   items: ['trnEndOrdQty', 'ordUnitNm4'],
  // },
  'id',
  'bokngClsCd', //부킹 유형 코드
  'bokngClsNm', //부킹 유형 명
  'bokngPrdtQtyAmt', //부킹 단가
  'bokngOffrPrice', //부킹 견적 금액
  'bokngOffrVat', //부킹 견적 부가세
  'vatRate', //부가세 율
];
export const baseColumn = ['trnReqBaseQty', 'baseUnitNm2'];
export const ordColumn = ['trnReqOrdQty', 'ordUnitNm2'];
