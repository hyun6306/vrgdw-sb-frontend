/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
export const fields = [
  { fieldName: 'groupCd', dataType: 'text' },
  { fieldName: 'groupNm', dataType: 'text' },
];

export const columns = [
  { fieldName: 'groupCd', name: 'groupCd', header: { text: '분류코드' }, editable: true },
  { fieldName: 'groupNm', name: 'groupNm', header: { text: '분류명' }, editable: true },
];
