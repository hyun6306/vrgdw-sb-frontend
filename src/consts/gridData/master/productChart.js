/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';
export const fields = [
  {
    fieldName: 'cdLvl',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'groupCd',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'groupNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'code',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'korCdNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'engCdNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'vnmCdNm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'sort',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'useYn',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'remark',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'data1',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'data2',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'data3',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'data4',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'data5',
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    fieldName: 'cdLvl',
    name: 'cdLvl',
    header: {
      text: 'cdLvl',
    },
    visible: false,
  },
  {
    fieldName: 'groupCd',
    name: 'groupCd',
    header: {
      text: '분류코드',
    },
    editable: true,
  },
  {
    fieldName: 'groupNm',
    name: 'groupNm',
    header: {
      text: '분류명',
    },
    editable: true,
  },
  {
    fieldName: 'code',
    name: 'code',
    header: {
      text: '코드',
    },
    editable: true,
  },
  {
    fieldName: 'korCdNm',
    name: 'korCdNm',
    header: {
      text: '한국',
    },
    editable: true,
  },
  {
    fieldName: 'engCdNm',
    name: 'engCdNm',
    header: {
      text: '영어',
    },
    editable: true,
  },
  {
    fieldName: 'vnmCdNm',
    name: 'vnmCdNm',
    header: {
      text: '베트남',
    },
    editable: true,
  },
  {
    fieldName: 'sort',
    name: 'sort',
    header: {
      text: '정렬',
    },
    editor: {
      type: 'text',
      inputCharacters: '0-9',
    },
    editable: true,
  },
  {
    fieldName: 'useYn',
    name: 'useYn',
    renderer: {
      type: 'check',
      trueValues: 'Y',
      falseValues: 'N',
    },
    header: {
      text: '사용여부',
    },
  },
  {
    fieldName: 'remark',
    name: 'remark',
    header: {
      text: '비고란',
    },
    editable: true,
  },
  {
    fieldName: 'data1',
    name: 'data1',
    header: {
      text: 'data1',
    },
    editable: true,
  },
  {
    fieldName: 'data2',
    name: 'data2',
    header: {
      text: 'data2',
    },
    editable: true,
  },
  {
    fieldName: 'data3',
    name: 'data3',
    header: {
      text: 'data3',
    },
    editable: true,
  },
  {
    fieldName: 'data4',
    name: 'data4',
    header: {
      text: 'data4',
    },
    editable: true,
  },
  {
    fieldName: 'data5',
    name: 'data5',
    header: {
      text: 'data5',
    },
    editable: true,
  },
];
