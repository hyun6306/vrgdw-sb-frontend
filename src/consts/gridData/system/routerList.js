/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
export const fields = [
  { fieldName: 'progCd', dataType: 'text' },
  { fieldName: 'progNm', dataType: 'text' },
  { fieldName: 'progPh', dataType: 'text' },
  { fieldName: 'target', dataType: 'text' },
  { fieldName: 'authCheck', dataType: 'text' },
  { fieldName: 'schAh', dataType: 'text' },
  { fieldName: 'savAh', dataType: 'text' },
  { fieldName: 'exlAh', dataType: 'text' },
  { fieldName: 'delAh', dataType: 'text' },
  { fieldName: 'fn1Ah', dataType: 'text' },
  { fieldName: 'fn2Ah', dataType: 'text' },
  { fieldName: 'fn3Ah', dataType: 'text' },
  { fieldName: 'fn4Ah', dataType: 'text' },
  { fieldName: 'fn5Ah', dataType: 'text' },
  { fieldName: 'id', dataType: 'text' },
  { fieldName: 'dataStatus', dataType: 'text' },
  { fieldName: '__deleted__', dataType: 'text' },
  { fieldName: '__created__', dataType: 'text' },
  { fieldName: '__modified__', dataType: 'text' },
  { fieldName: 'remark', dataType: 'text' },
];

export const columns = [
  { fieldName: 'progCd', name: 'progCd', header: { text: '라우터 코드' }, visible: false },
  { fieldName: 'progNm', name: 'progNm', header: { text: '프로그램명' }, editable: true, width: 100 },
  { fieldName: 'progPh', name: 'progPh', header: { text: '경로' }, width: 100, editable: true },
  {
    fieldName: 'authCheck',
    name: 'authCheck',
    renderer: {
      type: 'check',
      trueValues: 'Y',
      falseValues: 'N',
    },
    header: {
      text: '권한체크',
    },
    width: 70,
    visible: false,
  },
  // { fieldName: 'schAh', name: 'schAh', renderer: { type: 'check', trueValues: 'Y', falseValues: 'N' }, header: { text: '조회' }, width: 70, visible: false },
  { fieldName: 'schAh', name: 'schAh', editable: true, header: { text: '조회' }, width: 60 },
  { fieldName: 'savAh', name: 'savAh', editable: true, header: { text: '저장' }, width: 60 },
  { fieldName: 'exlAh', name: 'exlAh', editable: true, header: { text: '엑셀' }, width: 60 },
  { fieldName: 'delAh', name: 'delAh', editable: true, header: { text: '삭제' }, width: 60 },
  { fieldName: 'fn1Ah', name: 'fn1Ah', editable: true, header: { text: 'FN1' }, width: 60 },
  { fieldName: 'fn2Ah', name: 'fn2Ah', editable: true, header: { text: 'FN2' }, width: 60 },
  { fieldName: 'fn3Ah', name: 'fn3Ah', editable: true, header: { text: 'FN3' }, width: 60 },
  { fieldName: 'fn4Ah', name: 'fn4Ah', editable: true, header: { text: 'FN4' }, width: 60 },
  { fieldName: 'fn5Ah', name: 'fn5Ah', editable: true, header: { text: 'FN5' }, width: 60 },
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: 'id',
    },
    visible: false,
  },
  {
    fieldName: 'dataStatus',
    name: 'dataStatus',
    header: {
      text: 'dataStatus',
    },
    visible: false,
  },
  {
    fieldName: '__deleted__',
    name: '__deleted__',
    header: {
      text: '__deleted__',
    },
    visible: false,
  },
  {
    fieldName: '__created__',
    name: '__created__',
    header: {
      text: '__created__',
    },
    visible: false,
  },
  {
    fieldName: '__modified__',
    name: '__modified__',
    header: {
      text: '__modified__',
    },
    visible: false,
  },
  { fieldName: 'remark', name: 'remark', header: { text: '비고' }, editable: true },
];
