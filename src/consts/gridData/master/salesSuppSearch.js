/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'userCd', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'compNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'compCd', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'userPs', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'userNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'menuGrpCd', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'mobileNumCt', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'mobileNum', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'email', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'deptNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'positNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'degreeCd', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'language', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'timeZone', //
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'useYn', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'pushYn', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'emailYn', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'delYn', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'userStatus', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'tmpPsYn', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'psUptAt', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'roles', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'roleList', //
    dataType: ValueType.LIST,
  },
  {
    fieldName: 'erpDeptCd', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'erpEmpNum', //
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'compNm',
    name: 'compNm',
    header: {
      text: '조직',
    },
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
    fieldName: 'userNm',
    name: 'userNm',
    header: {
      text: '이름',
    },
  },
  {
    fieldName: 'deptNm',
    name: 'deptNm',
    header: {
      text: '호칭',
    },
  },
  {
    fieldName: 'roles',
    name: 'roles',
    header: {
      text: '사용자그룹',
    },
    width: 200,
  },
  {
    fieldName: 'roleList',
    name: 'roleList',
    header: {
      text: 'roleList',
    },
    visible: false,
  },
  {
    fieldName: 'email',
    name: 'email',
    header: {
      text: 'E-mail',
    },
    width: 150,
  },
  {
    fieldName: 'mobileNumCt',
    name: 'mobileNumCt',
    header: {
      text: '핸드폰 번호1',
    },
    width: 50,
  },
  {
    fieldName: 'mobileNum',
    name: 'mobileNum',
    header: {
      text: '핸드폰 번호2',
    },
  },
  {
    fieldName: 'menuGrpCd',
    name: 'menuGrpCd',
    header: {
      text: 'menuGrpCd',
    },
    visible: false,
  },
  {
    fieldName: 'userCd',
    name: 'userCd',
    header: {
      text: 'userCd',
    },
    visible: false,
  },
  {
    fieldName: 'userPs',
    name: 'userPs',
    header: {
      text: 'userPs',
    },
    visible: false,
  },
  {
    fieldName: 'positNm',
    name: 'positNm',
    header: {
      text: 'positNm',
    },
    visible: true,
  },
  {
    fieldName: 'degreeCd',
    name: 'degreeCd',
    header: {
      text: 'degreeCd',
    },
    visible: false,
  },
  {
    fieldName: 'language',
    name: 'language',
    header: {
      text: 'language',
    },
    visible: false,
  },
  {
    fieldName: 'timeZone',
    name: 'timeZone',
    header: {
      text: 'timeZone',
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
    fieldName: 'pushYn',
    name: 'pushYn',
    header: {
      text: 'pushYn',
    },
    visible: false,
  },
  {
    fieldName: 'emailYn',
    name: 'emailYn',
    header: {
      text: 'emailYn',
    },
    visible: false,
  },
  {
    fieldName: 'delYn',
    name: 'delYn',
    header: {
      text: 'delYn',
    },
    visible: false,
  },
  {
    fieldName: 'userStatus',
    name: 'userStatus',
    header: {
      text: 'userStatus',
    },
    visible: false,
  },
  {
    fieldName: 'tmpPsYn',
    name: 'tmpPsYn',
    header: {
      text: 'tmpPsYn',
    },
    visible: false,
  },
  {
    fieldName: 'psUptAt',
    name: 'psUptAt',
    header: {
      text: 'psUptAt',
    },
    visible: false,
  },
  {
    fieldName: 'erpDeptCd',
    name: 'erpDeptCd',
    header: {
      text: 'erpDeptCd',
    },
    visible: false,
  },
  {
    fieldName: 'erpEmpNum',
    name: 'erpEmpNum',
    header: {
      text: 'erpEmpNum',
    },
    visible: false,
  },
];

export const layout = [
  'compNm',
  'compCd',
  'userNm',
  'deptNm',
  'positNm',
  'roles',
  'roleList',
  'email',
  {
    name: 'phoneNum',
    direction: 'mobile',
    hideChildHeaders: true,
    header: {
      text: '핸드폰번호',
      tooltip: '핸드폰번호',
      showTooltip: true,
    },
    items: ['mobileNumCt', 'mobileNum'],
  },
  'menuGrpCd',
  'userCd',
  'userPs',
  'degreeCd',
  'language',
  'timeZone',
  'useYn',
  'pushYn',
  'emailYn',
  'delYn',
  'userStatus',
  'tmpPsYn',
  'psUptAt',
  'erpDeptCd',
  'erpEmpNum',
];
