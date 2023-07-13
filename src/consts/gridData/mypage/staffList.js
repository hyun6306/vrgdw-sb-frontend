/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */

export const fields = [
  {
    fieldName: 'userCd',
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
    fieldName: 'userPs',
    dataType: 'text',
  },
  {
    fieldName: 'userNm',
    dataType: 'text',
  },
  {
    fieldName: 'menuGrpCd',
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
    fieldName: 'phoneNumCt',
    dataType: 'text',
  },
  {
    fieldName: 'phoneNum',
    dataType: 'text',
  },
  {
    fieldName: 'inlineNum',
    dataType: 'text',
  },
  {
    fieldName: 'email',
    dataType: 'text',
  },
  {
    fieldName: 'deptCd',
    dataType: 'text',
  },
  {
    fieldName: 'deptNm',
    dataType: 'text',
  },
  {
    fieldName: 'positNm',
    dataType: 'text',
  },
  {
    fieldName: 'degreeCd',
    dataType: 'text',
  },
  {
    fieldName: 'language',
    dataType: 'text',
  },
  {
    fieldName: 'timeZone',
    dataType: 'text',
  },
  {
    fieldName: 'useYn',
    dataType: 'text',
  },
  {
    fieldName: 'pushYn',
    dataType: 'text',
  },
  {
    fieldName: 'emailYn',
    dataType: 'text',
  },
  {
    fieldName: 'delYn',
    dataType: 'text',
  },
  {
    fieldName: 'userStatus',
    dataType: 'text',
  },
  {
    fieldName: 'remark',
    dataType: 'text',
  },
  {
    fieldName: 'tmpPsYn',
    dataType: 'text',
  },
  {
    fieldName: 'lastLoginAt',
    dataType: 'text',
  },
  {
    fieldName: 'psUptAt',
    dataType: 'text',
  },
  {
    fieldName: 'roles',
    dataType: 'text',
  },
  {
    fieldName: 'tokenKey',
    dataType: 'text',
  },
  {
    fieldName: 'custId',
    dataType: 'text',
  },
  {
    fieldName: 'trncusId',
    dataType: 'text',
  },
  {
    fieldName: 'tranCarNum',
    dataType: 'text',
  },
  {
    fieldName: 'carTypeId',
    dataType: 'text',
  },
  {
    fieldName: 'ceoYn',
    dataType: 'text',
  },
  {
    fieldName: 'erpDeptCd',
    dataType: 'text',
  },
  {
    fieldName: 'erpEmpNum',
    dataType: 'text',
  },
];

export const columns = [
  {
    fieldName: 'userCd',
    name: 'userCd',
    header: {
      text: '사용자 코드',
    },
  },
  {
    fieldName: 'compCd',
    name: 'compCd',
    header: {
      text: '회사 코드',
    },
  },
  {
    fieldName: 'compNm',
    name: 'compNm',
    header: {
      text: '회사 명',
    },
  },
  {
    fieldName: 'userPs',
    name: 'userPs',
    header: {
      text: '사용자 비밀번호',
    },
  },
  {
    fieldName: 'userNm',
    name: 'userNm',
    header: {
      text: '사용자 명',
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
    fieldName: 'menuGrpCd',
    name: 'menuGrpCd',
    header: {
      text: '메뉴 그룹 코드',
    },
  },
  {
    fieldName: 'mobileNumCt',
    name: 'mobileNumCt',
    header: {
      text: '휴대전화 번호 국가',
    },
    width: 50,
  },
  {
    fieldName: 'mobileNum',
    name: 'mobileNum',
    header: {
      text: '휴대전화 번호',
    },
    width: 120,
  },
  {
    fieldName: 'phoneNumCt',
    name: 'phoneNumCt',
    header: {
      text: '전화 번호 국가',
    },
    width: 50,
  },
  {
    fieldName: 'phoneNum',
    name: 'phoneNum',
    header: {
      text: '전화 번호',
    },
    width: 120,
  },
  {
    fieldName: 'inlineNum',
    name: 'inlineNum',
    header: {
      text: '내선 번호',
    },
  },
  {
    fieldName: 'email',
    name: 'email',
    header: {
      text: '이메일',
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
    fieldName: 'deptNm',
    name: 'deptNm',
    header: {
      text: '부서 명',
    },
  },
  {
    fieldName: 'positNm',
    name: 'positNm',
    header: {
      text: '직급 명',
    },
    visible: false,
  },
  {
    fieldName: 'degreeCd',
    name: 'degreeCd',
    header: {
      text: '직종 코드',
    },
  },
  {
    fieldName: 'language',
    name: 'language',
    header: {
      text: '로케일',
    },
  },
  {
    fieldName: 'timeZone',
    name: 'timeZone',
    header: {
      text: '타임 존',
    },
  },
  {
    fieldName: 'useYn',
    name: 'useYn',
    header: {
      text: '사용 Y/N',
    },
    width: 60,
  },
  {
    fieldName: 'pushYn',
    name: 'pushYn',
    header: {
      text: 'Push Y/N',
    },
  },
  {
    fieldName: 'emailYn',
    name: 'emailYn',
    header: {
      text: 'Email Y/N',
    },
  },
  {
    fieldName: 'delYn',
    name: 'delYn',
    header: {
      text: '삭제 Y/N',
    },
  },
  {
    fieldName: 'userStatus',
    name: 'userStatus',
    header: {
      text: '사용자 상태',
    },
  },
  {
    fieldName: 'remark',
    name: 'remark',
    header: {
      text: '설명',
    },
  },
  {
    fieldName: 'tmpPsYn',
    name: 'tmpPsYn',
    header: {
      text: '임시 비밀번호 Y/N',
    },
  },
  {
    fieldName: 'lastLoginAt',
    name: 'lastLoginAt',
    header: {
      text: '마지막 로그인 일시',
    },
  },
  {
    fieldName: 'psUptAt',
    name: 'psUptAt',
    header: {
      text: '비밀번호 수정 일시',
    },
  },
  {
    fieldName: 'roles',
    name: 'roles',
    header: {
      text: '역할',
    },
  },
  {
    fieldName: 'tokenKey',
    name: 'tokenKey',
    header: {
      text: 'TOKEN KEY',
    },
  },
  {
    fieldName: 'custId',
    name: 'custId',
    header: {
      text: '고객사 ID',
    },
  },
  {
    fieldName: 'trncusId',
    name: 'trncusId',
    header: {
      text: '운송사 ID',
    },
  },
  {
    fieldName: 'tranCarNum',
    name: 'tranCarNum',
    header: {
      text: '운송 차량 번호',
    },
  },
  {
    fieldName: 'carTypeId',
    name: 'carTypeId',
    header: {
      text: '차량 유형 ID',
    },
  },
  {
    fieldName: 'ceoYn',
    name: 'ceoYn',
    header: {
      text: '대표자 Y/N',
    },
  },
  {
    fieldName: 'erpDeptCd',
    name: 'erpDeptCd',
    header: {
      text: 'ERP 부서 코드',
    },
  },
  {
    fieldName: 'erpEmpNum',
    name: 'erpEmpNum',
    header: {
      text: 'ERP 사원 번호',
    },
    visible: false,
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = cell.value;
        str = '<p class="underline">' + cell.value + '</p>';
        return str;
      },
    },
  },
];

export const layout = [
  'erpEmpNum',
  'userNm',
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
  'email',
  'positNm',
  'useYn',
];
