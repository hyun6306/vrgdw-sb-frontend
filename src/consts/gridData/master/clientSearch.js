/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'id', //ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'compCd', //회사 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesArea', //영업 지역
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'crdtArea', //여신 지역
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custCd', //고객사 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custId', //고객사 ID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custCls', //고객사 구분
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'tempPassWord', //임시비밀번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custType', //고객사 타입
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bizNum', //사업자 번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'erpCustCd', //고객사 ERP 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'erpCustNm', //고객사 ERP 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custNm', //고객사 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'analTypeCd', //분석 유형 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'biztype', //업태
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bizcate', //업종
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ceoKorNm', //대표자 한국어 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ceoEngNm', //대표자 영어 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ceoVnmNm', //대표자 베트남 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ceoPositNm', //대표자 직위 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cityCd', //시도 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cityNm', //시도 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'distrCd', //구군 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'distrNm', //구군 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'postNum', //우편 번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addrKor', //주소 한국어
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addrEng', //주소 영어
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addrVnm', //주소 베트남
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addrDtlsKor', //주소 상세 한국어
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addrDtlsEng', //주소 상세 영어
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addrDtlsVnm', //주소 상세 베트남
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'email', //이메일
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'phoneNumCt', //전화 번호 국가
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'phoneNum', //전화 번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'mobileNumCt', //휴대전화 번호 국가
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'mobileNum', //휴대전화 번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'faxNumCt', //팩스 번호 국가
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'faxNum', //팩스 번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesMngCd', //영업 담당 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesSuptCd', //영업 지원 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'erpSalesMngCd', //ERP 영업 담당 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'homepageUrl', //홈페이지 URL
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'custRemark', //고객사 특이사항
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'attchFileUuid', //첨부 파일 UUID
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'operClsCd', //운영 구분 코드
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'apprCond', //결재 조건
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'taxType', //세금 타입
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bankNm', //은행 명
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'accntNum', //계좌 번호
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'accntNm', //예금 주
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'useYn', //사용 Y/N
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'logitsRegYn', //배송지 등록 Y/N
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedByNm', //작업자
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedBy', //최종수정
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedAt', //최종수정
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addr', //주소
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'addrDtls', //상세주소
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'trnInfoYn', //배송지 정보 Y/N
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'mainAreaNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'midlAreaNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesEmail', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'salesMobileNum', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'erpSalesNm', //
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'custNm',
    name: 'custNm',
    header: {
      text: '고객',
    },
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
      text: '고객ID',
    },
  },
  {
    fieldName: 'bizNum',
    name: 'bizNum',
    header: {
      text: '사업자등록번호',
    },
  },
  {
    fieldName: 'addrKor',
    name: 'addrKor',
    header: {
      text: '주소',
    },
  },
  {
    fieldName: 'addrEng',
    name: 'addrEng',
    header: {
      text: 'addrEng',
    },
    visible: false,
  },
  {
    fieldName: 'addrVnm',
    name: 'addrVnm',
    header: {
      text: 'addrVnm',
    },
    visible: false,
  },
  {
    fieldName: 'addrDtlsKor',
    name: 'addrDtlsKor',
    header: {
      text: 'addrDtlsKor',
    },
    visible: false,
  },
  {
    fieldName: 'addrDtlsEng',
    name: 'addrDtlsEng',
    header: {
      text: 'addrDtlsEng',
    },
    visible: false,
  },
  {
    fieldName: 'addrDtlsVnm',
    name: 'addrDtlsVnm',
    header: {
      text: 'addrDtlsVnm',
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
    fieldName: 'compCd',
    name: 'compCd',
    header: {
      text: 'compCd',
    },
    visible: false,
  },
  {
    fieldName: 'salesArea',
    name: 'salesArea',
    header: {
      text: 'salesArea',
    },
    visible: false,
  },
  {
    fieldName: 'crdtArea',
    name: 'crdtArea',
    header: {
      text: 'crdtArea',
    },
    visible: false,
  },
  {
    fieldName: 'custCls',
    name: 'custCls',
    header: {
      text: 'custCls',
    },
    visible: false,
  },
  {
    fieldName: 'tempPassWord',
    name: 'tempPassWord',
    header: {
      text: 'tempPassWord',
    },
    visible: false,
  },
  {
    fieldName: 'custType',
    name: 'custType',
    header: {
      text: 'custType',
    },
    visible: false,
  },
  {
    fieldName: 'erpCustCd',
    name: 'erpCustCd',
    header: {
      text: 'erpCustCd',
    },
    visible: false,
  },
  {
    fieldName: 'erpCustNm',
    name: 'erpCustNm',
    header: {
      text: 'erpCustNm',
    },
    visible: false,
  },
  {
    fieldName: 'custKorNm',
    name: 'custKorNm',
    header: {
      text: 'custKorNm',
    },
    visible: false,
  },
  {
    fieldName: 'custEngNm',
    name: 'custEngNm',
    header: {
      text: 'custEngNm',
    },
    visible: false,
  },
  {
    fieldName: 'custVnmNm',
    name: 'custVnmNm',
    header: {
      text: 'custVnmNm',
    },
    visible: false,
  },
  {
    fieldName: 'analTypeCd',
    name: 'analTypeCd',
    header: {
      text: 'analTypeCd',
    },
    visible: false,
  },
  {
    fieldName: 'biztype',
    name: 'biztype',
    header: {
      text: 'biztype',
    },
    visible: false,
  },
  {
    fieldName: 'bizcate',
    name: 'bizcate',
    header: {
      text: 'bizcate',
    },
    visible: false,
  },
  {
    fieldName: 'ceoKorNm',
    name: 'ceoKorNm',
    header: {
      text: 'ceoKorNm',
    },
    visible: false,
  },
  {
    fieldName: 'ceoEngNm',
    name: 'ceoEngNm',
    header: {
      text: 'ceoEngNm',
    },
    visible: false,
  },
  {
    fieldName: 'ceoVnmNm',
    name: 'ceoVnmNm',
    header: {
      text: 'ceoVnmNm',
    },
    visible: false,
  },
  {
    fieldName: 'ceoPositNm',
    name: 'ceoPositNm',
    header: {
      text: 'ceoPositNm',
    },
    visible: false,
  },
  {
    fieldName: 'cityCd',
    name: 'cityCd',
    header: {
      text: 'cityCd',
    },
    visible: false,
  },
  {
    fieldName: 'cityNm',
    name: 'cityNm',
    header: {
      text: 'cityNm',
    },
    visible: false,
  },
  {
    fieldName: 'distrCd',
    name: 'distrCd',
    header: {
      text: 'distrCd',
    },
    visible: false,
  },
  {
    fieldName: 'distrNm',
    name: 'distrNm',
    header: {
      text: 'distrNm',
    },
    visible: false,
  },
  {
    fieldName: 'postNum',
    name: 'postNum',
    header: {
      text: 'postNum',
    },
    visible: false,
  },
  {
    fieldName: 'email',
    name: 'email',
    header: {
      text: 'email',
    },
    visible: false,
  },
  {
    fieldName: 'phoneNumCt',
    name: 'phoneNumCt',
    header: {
      text: 'phoneNumCt',
    },
    visible: false,
  },
  {
    fieldName: 'phoneNum',
    name: 'phoneNum',
    header: {
      text: 'phoneNum',
    },
    visible: false,
  },
  {
    fieldName: 'mobileNumCt',
    name: 'mobileNumCt',
    header: {
      text: 'mobileNumCt',
    },
    visible: false,
  },
  {
    fieldName: 'mobileNum',
    name: 'mobileNum',
    header: {
      text: 'mobileNum',
    },
    visible: false,
  },
  {
    fieldName: 'faxNumCt',
    name: 'faxNumCt',
    header: {
      text: 'faxNumCt',
    },
    visible: false,
  },
  {
    fieldName: 'faxNum',
    name: 'faxNum',
    header: {
      text: 'faxNum',
    },
    visible: false,
  },
  {
    fieldName: 'salesMngCd',
    name: 'salesMngCd',
    header: {
      text: 'salesMngCd',
    },
    visible: false,
  },
  {
    fieldName: 'salesSuptCd',
    name: 'salesSuptCd',
    header: {
      text: 'salesSuptCd',
    },
    visible: false,
  },
  {
    fieldName: 'erpSalesMngCd',
    name: 'erpSalesMngCd',
    header: {
      text: 'erpSalesMngCd',
    },
    visible: false,
  },
  {
    fieldName: 'homepageUrl',
    name: 'homepageUrl',
    header: {
      text: 'homepageUrl',
    },
    visible: false,
  },
  {
    fieldName: 'custRemark',
    name: 'custRemark',
    header: {
      text: 'custRemark',
    },
    visible: false,
  },
  {
    fieldName: 'attchFileUuid',
    name: 'attchFileUuid',
    header: {
      text: 'attchFileUuid',
    },
    visible: false,
  },
  {
    fieldName: 'operClsCd',
    name: 'operClsCd',
    header: {
      text: 'operClsCd',
    },
    visible: false,
  },
  {
    fieldName: 'apprCond',
    name: 'apprCond',
    header: {
      text: 'apprCond',
    },
    visible: false,
  },
  {
    fieldName: 'taxType',
    name: 'taxType',
    header: {
      text: 'taxType',
    },
    visible: false,
  },
  {
    fieldName: 'bankNm',
    name: 'bankNm',
    header: {
      text: 'bankNm',
    },
    visible: false,
  },
  {
    fieldName: 'accntNum',
    name: 'accntNum',
    header: {
      text: 'accntNum',
    },
    visible: false,
  },
  {
    fieldName: 'accntNm',
    name: 'accntNm',
    header: {
      text: 'accntNm',
    },
    visible: false,
  },
  {
    fieldName: 'useYn',
    name: 'useYn',
    header: {
      text: 'useYn',
    },
    visible: false,
  },
  {
    fieldName: 'logitsRegYn',
    name: 'logitsRegYn',
    header: {
      text: 'logitsRegYn',
    },
    visible: false,
  },
  {
    fieldName: 'updatedByNm',
    name: 'updatedByNm',
    header: {
      text: 'updatedByNm',
    },
    visible: false,
  },
  {
    fieldName: 'updatedBy',
    name: 'updatedBy',
    header: {
      text: 'updatedBy',
    },
    visible: false,
  },
  {
    fieldName: 'updatedAt',
    name: 'updatedAt',
    header: {
      text: 'updatedAt',
    },
    visible: false,
  },
  {
    fieldName: 'addr',
    name: 'addr',
    header: {
      text: 'addr',
    },
    visible: false,
  },
  {
    fieldName: 'addrDtls',
    name: 'addrDtls',
    header: {
      text: 'addrDtls',
    },
    visible: false,
  },
  {
    fieldName: 'trnInfoYn',
    name: 'trnInfoYn',
    header: {
      text: 'trnInfoYn',
    },
    visible: false,
  },
  {
    fieldName: 'mainAreaNm',
    name: 'mainAreaNm',
    header: {
      text: 'mainAreaNm',
    },
    visible: false,
  },
  {
    fieldName: 'midlAreaNm',
    name: 'midlAreaNm',
    header: {
      text: 'midlAreaNm',
    },
    visible: false,
  },
  {
    fieldName: 'salesNm',
    name: 'salesNm',
    header: {
      text: 'salesNm',
    },
    visible: false,
  },
  {
    fieldName: 'salesEmail',
    name: 'salesEmail',
    header: {
      text: 'salesEmail',
    },
    visible: false,
  },
  {
    fieldName: 'salesMobileNum',
    name: 'salesMobileNum',
    header: {
      text: 'salesMobileNum',
    },
    visible: false,
  },
  {
    fieldName: 'erpSalesNm',
    name: 'erpSalesNm',
    header: {
      text: 'erpSalesNm',
    },
    visible: false,
  },
];

export const layout = ['custNm', 'custId', 'custCd', 'bizNum', 'addrKor', 'addrEng', 'addrVnm', 'addrDtlsKor', 'addrDtlsEng', 'addrDtlsVnm', 'id', 'compCd', 'salesArea', 'crdtArea', 'custCls', 'tempPassWord', 'custType', 'erpCustCd', 'erpCustNm', 'custKorNm', 'custEngNm', 'custVnmNm', 'analTypeCd', 'biztype', 'bizcate', 'ceoKorNm', 'ceoEngNm', 'ceoVnmNm', 'ceoPositNm', 'cityCd', 'cityNm', 'distrCd', 'distrNm', 'postNum', 'email', 'phoneNumCt', 'phoneNum', 'mobileNumCt', 'mobileNum', 'faxNumCt', 'faxNum', 'salesMngCd', 'salesSuptCd', 'erpSalesMngCd', 'homepageUrl', 'custRemark', 'attchFileUuid', 'operClsCd', 'apprCond', 'taxType', 'bankNm', 'accntNum', 'accntNm', 'useYn', 'logitsRegYn', 'updatedByNm', 'updatedBy', 'updatedAt', 'addr', 'addrDtls', 'trnInfoYn', 'mainAreaNm', 'midlAreaNm', 'salesNm', 'salesEmail', 'salesMobileNum', 'erpSalesNm'];
