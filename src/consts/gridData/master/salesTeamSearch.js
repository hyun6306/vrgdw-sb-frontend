/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'createdAt', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedAt', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedBy', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'updatedByNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'groupCd', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'groupNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cdLvl', //
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'code', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'korCdNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'engCdNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'vnmCdNm', //
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'sort', //
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'useYn', //
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'code',
    name: 'code',
    header: {
      text: '회사코드',
    },
    // visible: false,
  },
  {
    fieldName: 'groupCd',
    name: 'groupCd',
    header: {
      text: '영업팀코드',
    },
    visible: false,
  },
  {
    fieldName: 'groupNm',
    name: 'groupNm',
    header: {
      text: 'groupNm',
    },
    visible: false,
  },
  {
    fieldName: 'korCdNm',
    name: 'korCdNm',
    header: {
      text: '영업팀명',
    },
    // visible: false,
  },
  {
    fieldName: 'engCdNm',
    name: 'engCdNm',
    header: {
      text: 'engCdNm',
    },
    visible: false,
  },
  {
    fieldName: 'vnmCdNm',
    name: 'vnmCdNm',
    header: {
      text: 'vnmCdNm',
    },
    visible: false,
  },
  {
    fieldName: 'createdAt',
    name: 'createdAt',
    header: {
      text: 'createdAt',
    },
    visible: false,
    // editable: false,
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
    fieldName: 'updatedBy',
    name: 'updatedBy',
    header: {
      text: 'updatedBy',
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
    fieldName: 'cdLvl',
    name: 'cdLvl',
    header: {
      text: 'cdLvl',
    },
    visible: false,
  },
  {
    fieldName: 'sort',
    name: 'sort',
    header: {
      text: 'sort',
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
];

export const layout = ['code', 'groupCd', 'groupNm', 'korCdNm', 'engCdNm', 'vnmCdNm', 'createdAt', 'updatedAt', 'updatedBy', 'updatedByNm', 'cdLvl', 'sort', 'useYn'];
