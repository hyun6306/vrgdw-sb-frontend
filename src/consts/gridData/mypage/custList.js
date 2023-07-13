export const fields = [
  {
    fieldName: 'id',
    dataType: 'text',
  },
  {
    fieldName: 'compCd',
    dataType: 'text',
  },
  {
    fieldName: 'salesArea',
    dataType: 'text',
  },
  {
    fieldName: 'crdtArea',
    dataType: 'text',
  },
  {
    fieldName: 'custCd',
    dataType: 'text',
  },
  {
    fieldName: 'bizNum',
    dataType: 'text',
  },
  {
    fieldName: 'custNm',
    dataType: 'text',
  },
  {
    fieldName: 'custKorNm',
    dataType: 'text',
  },
  {
    fieldName: 'custEngNm',
    dataType: 'text',
  },
  {
    fieldName: 'custVnmNm',
    dataType: 'text',
  },
  {
    fieldName: 'erpCustCd',
    dataType: 'text',
  },
  {
    fieldName: 'ceoNm',
    dataType: 'text',
  },
  {
    fieldName: 'ceoKorNm',
    dataType: 'text',
  },
  {
    fieldName: 'ceoEngNm',
    dataType: 'text',
  },
  {
    fieldName: 'ceoVnmNm',
    dataType: 'text',
  },
  {
    fieldName: 'ceoPositNm',
    dataType: 'text',
  },
  {
    fieldName: 'cityCd',
    dataType: 'text',
  },
  {
    fieldName: 'cityNm',
    dataType: 'text',
  },
  {
    fieldName: 'cityKorNm',
    dataType: 'text',
  },
  {
    fieldName: 'cityEngNm',
    dataType: 'text',
  },
  {
    fieldName: 'cityVnmNm',
    dataType: 'text',
  },
  {
    fieldName: 'distrCd',
    dataType: 'text',
  },
  {
    fieldName: 'distrNm',
    dataType: 'text',
  },
  {
    fieldName: 'distrKorNm',
    dataType: 'text',
  },
  {
    fieldName: 'distrEngNm',
    dataType: 'text',
  },
  {
    fieldName: 'distrVnmNm',
    dataType: 'text',
  },
  {
    fieldName: 'postNum',
    dataType: 'text',
  },
  {
    fieldName: 'addr',
    dataType: 'text',
  },
  {
    fieldName: 'addrKor',
    dataType: 'text',
  },
  {
    fieldName: 'addrEng',
    dataType: 'text',
  },
  {
    fieldName: 'addrVnm',
    dataType: 'text',
  },
  {
    fieldName: 'addrDtls',
    dataType: 'text',
  },
  {
    fieldName: 'addrDtlsKor',
    dataType: 'text',
  },
  {
    fieldName: 'addrDtlsEng',
    dataType: 'text',
  },
  {
    fieldName: 'addrDtlsVnm',
    dataType: 'text',
  },
  {
    fieldName: 'email',
    dataType: 'text',
  },
  {
    fieldName: 'phoneNumCt',
    dataType: 'text',
  },
  {
    fieldName: 'phoneNum',
    dataType: 'text',
  },
  {
    fieldName: 'mobileNumCt',
    dataType: 'text',
  },
  {
    fieldName: 'mobileNum',
    dataType: 'text',
  },
  {
    fieldName: 'faxNumCt',
    dataType: 'text',
  },
  {
    fieldName: 'faxNum',
    dataType: 'text',
  },
  {
    fieldName: 'erpSalesMngCd',
    dataType: 'text',
  },
  {
    fieldName: 'useYn',
    dataType: 'text',
  },
  {
    fieldName: 'prdtClsNm',
    dataType: 'text',
  },
  {
    fieldName: 'prdtClsKorNm',
    dataType: 'text',
  },
  {
    fieldName: 'prdtClsEngNm',
    dataType: 'text',
  },
  {
    fieldName: 'prdtClsVnmNm',
    dataType: 'text',
  },
  {
    fieldName: 'test1',
    dataType: 'text',
  },
  {
    fieldName: 'test2',
    dataType: 'text',
  },
];

export const columns = [
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: 'ID',
    },
  },
  {
    fieldName: 'compCd',
    name: 'compCd',
    header: {
      text: '회사 코드',
    },
  },
  {
    fieldName: 'salesArea',
    name: 'salesArea',
    header: {
      text: '영업 지역',
    },
  },
  {
    fieldName: 'crdtArea',
    name: 'crdtArea',
    header: {
      text: '여신 지역',
    },
  },
  {
    fieldName: 'custCd',
    name: 'custCd',
    header: {
      text: '고객사 코드',
    },
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
    fieldName: 'bizNum',
    name: 'bizNum',
    header: {
      text: '사업자 번호',
    },
    width: 120,
  },
  {
    fieldName: 'custNm',
    name: 'custNm',
    header: {
      text: '고객사 명',
    },
    styleName: 't-l',
    width: 300,
  },
  {
    fieldName: 'custKorNm',
    name: 'custKorNm',
    header: {
      text: '고객사 한국어 명',
    },
  },
  {
    fieldName: 'custEngNm',
    name: 'custEngNm',
    header: {
      text: '고객사 영어 명',
    },
  },
  {
    fieldName: 'custVnmNm',
    name: 'custVnmNm',
    header: {
      text: '고객사 베트남 명',
    },
  },
  {
    fieldName: 'erpCustCd',
    name: 'erpCustCd',
    header: {
      text: '고객사 ERP 코드',
    },
  },
  {
    fieldName: 'ceoNm',
    name: 'ceoNm',
    header: {
      text: '대표자 명',
    },
    styleName: 't-l',
    width: 120,
  },
  {
    fieldName: 'ceoKorNm',
    name: 'ceoKorNm',
    header: {
      text: '대표자 한국어 명',
    },
  },
  {
    fieldName: 'ceoEngNm',
    name: 'ceoEngNm',
    header: {
      text: '대표자 영어 명',
    },
  },
  {
    fieldName: 'ceoVnmNm',
    name: 'ceoVnmNm',
    header: {
      text: '대표자 베트남 명',
    },
  },
  {
    fieldName: 'ceoPositNm',
    name: 'ceoPositNm',
    header: {
      text: '대표자 직위 명',
    },
  },
  {
    fieldName: 'cityCd',
    name: 'cityCd',
    header: {
      text: '시도 코드',
    },
  },
  {
    fieldName: 'cityNm',
    name: 'cityNm',
    header: {
      text: '시도 명',
    },
    styleName: 't-l',
    width: 150,
  },
  {
    fieldName: 'cityKorNm',
    name: 'cityKorNm',
    header: {
      text: '시도 한국어 명',
    },
  },
  {
    fieldName: 'cityEngNm',
    name: 'cityEngNm',
    header: {
      text: '시도 영어 명',
    },
  },
  {
    fieldName: 'cityVnmNm',
    name: 'cityVnmNm',
    header: {
      text: '시도 베트남 명',
    },
  },
  {
    fieldName: 'distrCd',
    name: 'distrCd',
    header: {
      text: '구군 코드',
    },
  },
  {
    fieldName: 'distrNm',
    name: 'distrNm',
    header: {
      text: '구군 명',
    },
    styleName: 't-l',
    width: 150,
  },
  {
    fieldName: 'distrKorNm',
    name: 'distrKorNm',
    header: {
      text: '구군 한국어 명',
    },
  },
  {
    fieldName: 'distrEngNm',
    name: 'distrEngNm',
    header: {
      text: '구군 영어 명',
    },
  },
  {
    fieldName: 'distrVnmNm',
    name: 'distrVnmNm',
    header: {
      text: '구군 베트남 명',
    },
  },
  {
    fieldName: 'postNum',
    name: 'postNum',
    header: {
      text: '우편 번호',
    },
  },
  {
    fieldName: 'addr',
    name: 'addr',
    header: {
      text: '주소',
    },
    styleName: 't-l',
    width: 700,
  },
  {
    fieldName: 'addrKor',
    name: 'addrKor',
    header: {
      text: '주소 한국어',
    },
  },
  {
    fieldName: 'addrEng',
    name: 'addrEng',
    header: {
      text: '주소 영어',
    },
  },
  {
    fieldName: 'addrVnm',
    name: 'addrVnm',
    header: {
      text: '주소 베트남',
    },
  },
  {
    fieldName: 'addrDtls',
    name: 'addrDtls',
    header: {
      text: '주소 상세',
    },
  },
  {
    fieldName: 'addrDtlsKor',
    name: 'addrDtlsKor',
    header: {
      text: '주소 상세 한국어',
    },
  },
  {
    fieldName: 'addrDtlsEng',
    name: 'addrDtlsEng',
    header: {
      text: '주소 상세 영어',
    },
  },
  {
    fieldName: 'addrDtlsVnm',
    name: 'addrDtlsVnm',
    header: {
      text: '주소 상세 베트남',
    },
  },
  {
    fieldName: 'email',
    name: 'email',
    header: {
      text: '이메일',
    },
    styleName: 't-l',
    width: 200,
  },
  {
    fieldName: 'phoneNumCt',
    name: 'phoneNumCt',
    header: {
      text: '전화 번호 국가',
    },
    width: 50,
  },
  {
    fieldName: 'phoneNum',
    name: 'phoneNum',
    header: {
      text: '전화 번호',
    },
    width: 120,
  },
  {
    fieldName: 'mobileNumCt',
    name: 'mobileNumCt',
    header: {
      text: '휴대전화 번호 국가',
    },
    width: 50,
  },
  {
    fieldName: 'mobileNum',
    name: 'mobileNum',
    header: {
      text: '휴대전화 번호',
    },
    width: 120,
  },
  {
    fieldName: 'faxNumCt',
    name: 'faxNumCt',
    header: {
      text: '팩스 번호 국가',
    },
    width: 50,
  },
  {
    fieldName: 'faxNum',
    name: 'faxNum',
    header: {
      text: '팩스 번호',
    },
    width: 120,
  },
  {
    fieldName: 'erpSalesMngCd',
    name: 'erpSalesMngCd',
    header: {
      text: 'ERP 영업 담당 코드',
    },
  },
  {
    fieldName: 'useYn',
    name: 'useYn',
    header: {
      text: '사용 Y/N',
    },
  },
  {
    fieldName: 'prdtClsNm',
    name: 'prdtClsNm',
    header: {
      text: '취급 품목',
    },
  },
  {
    fieldName: 'prdtClsKorNm',
    name: 'prdtClsKorNm',
    header: {
      text: '취급 품목 한국어',
    },
  },
  {
    fieldName: 'prdtClsEngNm',
    name: 'prdtClsEngNm',
    header: {
      text: '취급 품목 영어',
    },
  },
  {
    fieldName: 'prdtClsVnmNm',
    name: 'prdtClsVnmNm',
    header: {
      text: '취급 품목 베트남',
    },
  },
  {
    fieldName: 'test1',
    name: 'test1',
    header: {
      text: '대리점담당자',
    },
  },
  {
    fieldName: 'test2',
    name: 'test2',
    header: {
      text: '연락처',
    },
  },
];

export const layout = [
  'custCd',
  'erpCustCd',
  'custNm',
  'prdtClsNm',
  'bizNum',
  'ceoNm',
  {
    name: 'phoneNum',
    direction: 'horizontal',
    hideChildHeaders: true,
    header: {
      text: '전화번호',
    },
    items: [
      { column: 'phoneNumCt', groupShowMode: 'always' },
      { column: 'phoneNum', groupShowMode: 'always' },
    ],
  },
  {
    name: 'faxNum',
    direction: 'horizontal',
    hideChildHeaders: true,
    header: {
      text: '팩스번호',
    },
    items: [
      { column: 'faxNumCt', groupShowMode: 'always' },
      { column: 'faxNum', groupShowMode: 'always' },
    ],
  },
  {
    name: 'mobileNum',
    direction: 'horizontal',
    hideChildHeaders: true,
    header: {
      text: '휴대폰번호',
    },
    items: [
      { column: 'mobileNumCt', groupShowMode: 'always' },
      { column: 'mobileNum', groupShowMode: 'always' },
    ],
  },
  'postNum',
  {
    name: 'addrInfo',
    direction: 'horizontal',
    hideChildHeaders: true,
    header: {
      text: '주소',
    },
    items: [
      { column: 'cityNm', groupShowMode: 'always' },
      { column: 'distrNm', groupShowMode: 'always' },
      { column: 'addr', groupShowMode: 'always' },
    ],
  },
  'test1', //대리담당자명
  'test2', //연락처
  'email',
  'useYn',
];
