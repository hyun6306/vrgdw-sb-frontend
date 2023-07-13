/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */

export const fields = [
  {
    fieldName: 'id', // id
    dataType: 'text',
  },
  {
    fieldName: 'prdtId', // 제품id
    dataType: 'text',
  },
  {
    fieldName: 'custId', // 업체Id
    dataType: 'text',
  },
  {
    fieldName: 'custNm', // 업체명
    dataType: 'text',
  },
  {
    fieldName: 'custCd', // 업체코드
    dataType: 'text',
  },
  {
    fieldName: 'prdtClsCd', // 품목
    dataType: 'text',
  },
  {
    fieldName: 'prdtCd', // 제품코드
    dataType: 'text',
  },
  {
    fieldName: 'prdtNm', // 제품명
    dataType: 'text',
  },
  {
    fieldName: 'currency', // 단위(통화단위)
    dataType: 'text',
  },
  {
    fieldName: 'basePrice', // 기준판가
    dataType: 'number',
  },
  {
    fieldName: 'aplyPrice', // 적용판가
    dataType: 'number',
  },
  {
    fieldName: 'rangeDt', //  기간(시작일자 ~ 끝일자)
    dataType: 'text',
  },
  {
    fieldName: 'sttDt', //  기간(시작일자)
    dataType: 'text',
  },
  {
    fieldName: 'endDt', // 기간(끝일자)
    dataType: 'text',
  },
  {
    fieldName: 'apprStat', // 결재상태
    dataType: 'text',
  },
  {
    fieldName: 'apprDocNum', // 기안문서번호
    dataType: 'text',
  },
  {
    fieldName: 'info', // 내역
    dataType: 'text',
  },
  {
    fieldName: 'updatedAt', // 날짜
    dataType: 'text',
  },
  {
    fieldName: 'updatedBy', // update한 사람 id
    dataType: 'text',
  },
  {
    fieldName: 'updatedByNm', // update한 사람 이름
    dataType: 'text',
  },
];

export const columns = [
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: 'id',
    },
    visible: false,
  },
  {
    fieldName: 'prdtId', // 제품id
    name: 'prdtId',
    header: {
      text: 'prdtId',
    },
    visible: false,
  },
  {
    fieldName: 'custId', // 업체Id
    dataType: 'text',
    visible: false,
  },
  {
    fieldName: 'custNm', // 업체명
    name: 'custNm',
    header: {
      text: '업체명',
    },
  },
  {
    fieldName: 'custCd', // 업체코드
    name: 'custCd',
    header: {
      text: '업체코드',
    },
  },
  {
    fieldName: 'prdtClsCd', // 품목
    name: 'prdtClsCd',
    header: {
      text: '품목',
    },
  },
  {
    fieldName: 'prdtCd', // 제품코드
    name: 'prdtCd',
    header: {
      text: '제품코드',
    },
  },
  {
    fieldName: 'prdtNm', // 제품명
    name: 'prdtNm',
    header: {
      text: '제품명',
    },
    width: 250,
  },
  {
    fieldName: 'currency', // 단위(통화단위)
    name: 'currency',
    header: {
      text: '통화단위',
    },
  },
  {
    fieldName: 'basePrice', // 기준판가
    name: 'basePrice',
    header: {
      text: '기준판가',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
    },
    numberFormat: '#,##0.##;.;,',
  },
  {
    fieldName: 'aplyPrice', // 적용판가
    name: 'aplyPrice',
    header: {
      text: '적용판가',
    },
    editor: {
      type: 'number',
      editFormat: '#,##0',
    },
    numberFormat: '#,##0.##;.;,',
  },
  {
    fieldName: 'rangeDt', //  기간(시작일자 ~ 끝일자)
    name: 'rangeDt',
    header: {
      text: '기간',
    },
    width: 150,
  },
  {
    fieldName: 'sttDt', //  기간(시작일자)
    name: 'sttDt',
    header: {
      text: 'sttDt',
    },
    visible: false,
  },
  {
    fieldName: 'endDt', // 기간(끝일자)
    name: 'endDt',
    header: {
      text: 'endDt',
    },
    visible: false,
  },
  {
    fieldName: 'apprStat', // 결재상태
    name: 'apprStat',
    header: {
      text: '결재상태',
    },
  },
  {
    fieldName: 'apprDocNum', // 기안문서번호
    name: 'apprDocNum',
    header: {
      text: '기안문서번호',
    },
    width: 150,
  },
  {
    fieldName: 'info', // 내역
    name: 'info',
    header: {
      text: '내역',
    },
    renderer: 'imgbtn',
  },
  {
    fieldName: 'updatedAt', // 날짜
    name: 'updatedAt',
    header: {
      text: '날짜',
    },
  },
  {
    fieldName: 'updatedBy', // update한 사람 id
    name: 'id',
    header: {
      text: 'id',
    },
    visible: false,
  },
  {
    fieldName: 'updatedByNm', // update한 사람 이름
    name: 'id',
    header: {
      text: 'id',
    },
    visible: false,
  },
];

export const layout = ['id', 'prdtId', 'custId', 'custNm', 'custCd', 'prdtClsCd', 'prdtCd', 'prdtNm', 'currency', 'basePrice', 'aplyPrice', 'rangeDt', 'sttDt', 'endDt', 'apprStat', 'apprDocNum', 'info', 'updatedAt', 'updatedBy', 'updatedByNm'];
