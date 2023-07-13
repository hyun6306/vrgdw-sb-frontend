/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
export const fields = [
  {
    fieldName: 'id',
    dataType: 'number',
  },
  {
    fieldName: 'formKey',
    dataType: 'text',
  },
  {
    fieldName: 'langCls',
    dataType: 'text',
  },
  {
    fieldName: 'kor',
    dataType: 'text',
  },
  {
    fieldName: 'eng',
    dataType: 'text',
  },
  {
    fieldName: 'vnm',
    dataType: 'text',
  },
  {
    fieldName: 'remark',
    dataType: 'text',
  },
  {
    fieldName: 'text',
    dataType: 'text',
  },
  {
    fieldName: 'value',
    dataType: 'number',
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
    fieldName: 'formKey',
    name: 'formKey',
    header: {
      text: '폼 키',
    },
    width: 200,
  },
  {
    fieldName: 'langCls',
    name: 'langCls',
    header: {
      text: '분류',
    },
  },
  {
    fieldName: 'kor',
    name: 'kor',
    header: {
      text: '한국어',
    },
    width: 200,
  },
  {
    fieldName: 'eng',
    name: 'eng',
    header: {
      text: '영어',
    },
    width: 200,
  },
  {
    fieldName: 'vnm',
    name: 'vnm',
    header: {
      text: '베트남어',
    },
    width: 200,
  },
  {
    fieldName: 'remark',
    name: 'remark',
    header: {
      text: 'remark',
    },
  },
  {
    fieldName: 'text',
    name: 'text',
    header: {
      text: 'text',
    },
    visible: false,
  },
  {
    fieldName: 'value',
    name: 'value',
    header: {
      text: 'value',
    },
    visible: false,
  },
];
