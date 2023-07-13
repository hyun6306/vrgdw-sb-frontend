export const fields = [
  {
    fieldName: 'compCd',
    dataType: 'text',
  },
  {
    fieldName: 'empNum',
    dataType: 'text',
  },
  {
    fieldName: 'email',
    dataType: 'text',
  },
  {
    fieldName: 'userKorNm',
    dataType: 'text',
  },
  {
    fieldName: 'userEngNm',
    dataType: 'text',
  },
  {
    fieldName: 'userNm',
    dataType: 'text',
  },
  {
    fieldName: 'deptCd',
    dataType: 'text',
  },
  {
    fieldName: 'deptKorNm',
    dataType: 'text',
  },
  {
    fieldName: 'deptEngNm',
    dataType: 'text',
  },
  {
    fieldName: 'deptNm',
    dataType: 'text',
  },
  {
    fieldName: 'retDt',
    dataType: 'text',
  },
  {
    fieldName: 'dutyCd',
    dataType: 'text',
  },
  {
    fieldName: 'dutyKorNm',
    dataType: 'text',
  },
  {
    fieldName: 'dutyEngNm',
    dataType: 'text',
  },
  {
    fieldName: 'dutyNm',
    dataType: 'text',
  },
  {
    fieldName: 'dutySort',
    dataType: 'text',
  },
  {
    fieldName: 'positCd',
    dataType: 'text',
  },
  {
    fieldName: 'positKorNm',
    dataType: 'text',
  },
  {
    fieldName: 'positEngNm',
    dataType: 'text',
  },
  {
    fieldName: 'positNm',
    dataType: 'text',
  },
  {
    fieldName: 'positSort',
    dataType: 'text',
  },
  {
    fieldName: 'degreeCd',
    dataType: 'text',
  },
  {
    fieldName: 'degreeKorNm',
    dataType: 'text',
  },
  {
    fieldName: 'degreeEngNm',
    dataType: 'text',
  },
  {
    fieldName: 'degreeNm',
    dataType: 'text',
  },
  {
    fieldName: 'phoneNum',
    dataType: 'text',
  },
  {
    fieldName: 'phoneNumCt',
    dataType: 'text',
  },
  {
    fieldName: 'mobileNum',
    dataType: 'text',
  },
  {
    fieldName: 'mobileNumCt',
    dataType: 'text',
  },
  {
    fieldName: 'useYn',
    dataType: 'text',
  },
  {
    fieldName: 'parentCd',
    dataType: 'text',
  },
  {
    fieldName: 'updatedAt',
    dataType: 'text',
  },
  {
    fieldName: 'cfmYn',
    dataType: 'text',
  },
  {
    fieldName: 'children',
    dataType: 'text',
  },
  {
    fieldName: 'new',
    dataType: 'text',
  },
  {
    fieldName: 'inlineNum',
    dataType: 'text',
  },
  {
    fieldName: 'language',
    dataType: 'text',
  },
  {
    fieldName: 'menuGrpCd',
    dataType: 'text',
  },
  {
    fieldName: 'menuGrpInfo',
    dataType: 'text',
  },
];
export const columns = [
  {
    fieldName: 'compCd',
    name: 'compCd',
    header: {
      text: '회사코드',
    },
  },
  {
    fieldName: 'empNum',
    name: 'empNum',
    header: {
      text: '사원번호',
    },
  },
  {
    fieldName: 'email',
    name: 'email',
    header: {
      text: '이메일',
    },
    width: 180,
  },
  {
    fieldName: 'userKorNm',
    name: 'userKorNm',
    header: {
      text: '사용자 한국어 명',
    },
  },
  {
    fieldName: 'userEngNm',
    name: 'userEngNm',
    header: {
      text: '사용자 영어 명',
    },
  },
  {
    fieldName: 'userNm',
    name: 'userNm',
    header: {
      text: '사용자 명',
    },
    width: 250,
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
    fieldName: 'deptCd',
    name: 'deptCd',
    header: {
      text: '부서 코드',
    },
  },
  {
    fieldName: 'deptKorNm',
    name: 'deptKorNm',
    header: {
      text: '부서 한국어 명',
    },
  },
  {
    fieldName: 'deptEngNm',
    name: 'deptEngNm',
    header: {
      text: '부서 영어 명',
    },
  },
  {
    fieldName: 'deptNm',
    name: 'deptNm',
    header: {
      text: '부서 명',
    },
    width: 120,
  },
  {
    fieldName: 'retDt',
    name: 'retDt',
    header: {
      text: 'retDt',
    },
  },
  {
    fieldName: 'dutyCd',
    name: 'dutyCd',
    header: {
      text: 'dutyCd',
    },
  },
  {
    fieldName: 'dutyKorNm',
    name: 'dutyKorNm',
    header: {
      text: 'dutyKorNm',
    },
  },
  {
    fieldName: 'dutyEngNm',
    name: 'dutyEngNm',
    header: {
      text: 'dutyEngNm',
    },
  },
  {
    fieldName: 'dutyNm',
    name: 'dutyNm',
    header: {
      text: 'dutyNm',
    },
  },
  {
    fieldName: 'dutySort',
    name: 'dutySort',
    header: {
      text: 'dutySort',
    },
  },
  {
    fieldName: 'positCd',
    name: 'positCd',
    header: {
      text: '직급 코드',
    },
  },
  {
    fieldName: 'positKorNm',
    name: 'positKorNm',
    header: {
      text: '직급 한국어 명',
    },
  },
  {
    fieldName: 'positEngNm',
    name: 'positEngNm',
    header: {
      text: '직급 영어 명',
    },
  },
  {
    fieldName: 'positNm',
    name: 'positNm',
    header: {
      text: '직급 명',
    },
    width: 120,
  },
  {
    fieldName: 'positSort',
    name: 'positSort',
    header: {
      text: '직급 정렬',
    },
  },
  {
    fieldName: 'degreeCd',
    name: 'degreeCd',
    header: {
      text: '직종 코드',
    },
  },
  {
    fieldName: 'degreeKorNm',
    name: 'degreeKorNm',
    header: {
      text: '직종 한국어 명',
    },
  },
  {
    fieldName: 'degreeEngNm',
    name: 'degreeEngNm',
    header: {
      text: '직종 영어 명',
    },
  },
  {
    fieldName: 'degreeNm',
    name: 'degreeNm',
    header: {
      text: '직종 명',
    },
    width: 120,
  },
  {
    fieldName: 'mobileNumCt',
    name: 'mobileNumCt',
    header: {
      text: '휴대폰 번호 국가코드',
    },
    width: 50,
  },
  {
    fieldName: 'mobileNum',
    name: 'mobileNum',
    header: {
      text: '휴대폰 번호',
    },
    width: 120,
  },
  {
    fieldName: 'phoneNumCt',
    name: 'phoneNumCt',
    header: {
      text: '전화번호 국가코드',
    },
    width: 50,
  },
  {
    fieldName: 'phoneNum',
    name: 'phoneNum',
    header: {
      text: '전화번호',
      width: 120,
    },
  },
  {
    fieldName: 'inlineNum',
    name: 'inlineNum',
    header: {
      text: '내선번호',
    },
  },
  {
    fieldName: 'useYn',
    name: 'useYn',
    header: {
      text: '사용여부',
    },
  },
  {
    fieldName: 'parentCd',
    name: 'parentCd',
    header: {
      text: 'parentCd',
    },
  },
  {
    fieldName: 'updatedAt',
    name: 'updatedAt',
    header: {
      text: 'updatedAt',
    },
  },
  {
    fieldName: 'cfmYn',
    name: 'cfmYn',
    header: {
      text: '확인Y/N',
    },
  },
  {
    fieldName: 'children',
    name: 'children',
    header: {
      text: 'children',
    },
  },
  {
    fieldName: 'new',
    name: 'new',
    header: {
      text: 'new',
    },
  },
  {
    fieldName: 'language',
    name: 'language',
    header: {
      text: '언어',
    },
  },
  {
    fieldName: 'menuGrpCd',
    name: 'menuGrpCd',
    header: {
      text: '메뉴그룹',
    },
    width: 180,
  },
  {
    fieldName: 'menuGrpInfo',
    name: 'menuGrpInfo',
    header: {
      text: '메뉴그룹',
    },
  },
];
export const layout = [
  'cfmYn',
  'compCd',
  'empNum',
  'userNm',
  'deptNm',
  // 'positNm',
  'degreeNm',
  // 'menuGrpCd',
  'email',
  // {
  //   name: 'phoneNum',
  //   hideChildHeaders: true,
  //   direction: 'horizontal',
  //   header: {
  //     text: '전화번호',
  //   },
  //   items: [
  //     { column: 'phoneNumCt', groupShowMode: 'always' },
  //     { column: 'phoneNum', groupShowMode: 'always' },
  //   ],
  // },
  {
    name: 'mobileNum',
    hideChildHeaders: true,
    direction: 'horizontal',
    header: {
      text: '휴대폰번호',
    },
    items: [
      { column: 'mobileNumCt', groupShowMode: 'always' },
      { column: 'mobileNum', groupShowMode: 'always' },
    ],
  },
  // 'inlineNum',
  // 'language',
];
