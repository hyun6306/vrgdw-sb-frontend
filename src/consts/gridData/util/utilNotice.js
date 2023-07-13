/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */

export const fields = [
  {
    fieldName: 'id', // id
    dataType: 'text',
  },
  {
    fieldName: 'bbsId', // NOTICE OR MANUAL
    dataType: 'text',
  },
  {
    fieldName: 'noticeYn', // NOTICE OR MANUAL
    dataType: 'text',
  },
  {
    fieldName: 'title', // title 제목
    dataType: 'text',
  },
  {
    fieldName: 'contents', //content 내용
    dataType: 'text',
  },
  {
    fieldName: 'postSttDt', // 게시 시작일
    dataType: 'text',
  },
  {
    fieldName: 'postEndDt', // 게시 끝일
    dataType: 'text',
  },
  {
    fieldName: 'fileYn', // 첨부파일
    dataType: 'text',
  },
  {
    fieldName: 'qryCnt', // 조회수
    dataType: 'text',
  },
  {
    fieldName: 'fileKey', // 파일 다운로드 키
    dataType: 'text',
  },
  {
    fieldName: 'fileUploadList', // 업로드 리스트
    dataType: 'object',
  },
  {
    fieldName: 'updatedAt', // 날짜
    dataType: 'text',
  },
  {
    fieldName: 'updatedBy', // update한 사람 id
    dataType: 'text',
  },
  {
    fieldName: 'updatedByNm', // update한 사람 이름
    dataType: 'text',
  },
];

export const columns = [
  {
    fieldName: 'id',
    name: 'id',
    header: {
      text: '번호',
    },
    width: 30,
  },
  {
    fieldName: 'bbsId', // NOTICE OR MANUAL
    name: 'bbsId',
    header: {
      text: '게시물 구분 값 1',
    },
    visible: false,
  },
  {
    fieldName: 'noticeYn', // NOTICE OR MANUAL
    name: 'noticeYn',
    header: {
      text: '공지',
    },
    // visible: false,
    width: 30,
  },
  {
    fieldName: 'title', // title 제목
    name: 'title',
    header: {
      text: '제목',
    },
    width: 300,
    styleName: 't-l',
  },
  {
    fieldName: 'contents', //content 내용
    name: 'contents',
    header: {
      text: '내용',
    },
    visible: false,
  },
  {
    fieldName: 'postSttDt', // 게시 시작일
    name: 'postSttDt',
    header: {
      text: '게시 시작일',
    },
    visible: false,
  },
  {
    fieldName: 'postEndDt', // 게시 끝일
    name: 'postEndDt',
    header: {
      text: '게시 끝일',
    },
    visible: false,
  },
  {
    // 23. 2. 17 파일다운로드 방식 변경으로 인한 visible.false 처리
    fieldName: 'fileYn', // 첨부파일
    name: 'fileYn',
    header: {
      text: '첨부파일',
    },
    width: 30,
    renderer: 'fileImgbtn',
    visible: false,
  },
  {
    fieldName: 'qryCnt', // 조회수
    name: 'qryCnt',
    header: {
      text: '조회수',
    },
    width: 30,
  },
  {
    fieldName: 'fileKey', // 파일 다운로드 키
    name: 'fileKey',
    header: {
      text: '파일 다운로드 키',
    },
    visible: false,
  },
  {
    fieldName: 'fileUploadList', // 업로드 리스트
    name: 'fileUploadList',
    header: {
      text: '업로드 리스트',
    },
    visible: false,
  },
  {
    fieldName: 'updatedAt', // 날짜
    name: 'updatedAt',
    header: {
      text: '날짜',
    },
  },
  {
    fieldName: 'updatedBy', // update한 사람 id
    name: 'updatedBy',
    header: {
      text: 'updatedBy',
    },
    visible: false,
  },
  {
    fieldName: 'updatedByNm', // update한 사람 이름
    name: 'updatedByNm',
    header: {
      text: '작성자',
    },
  },
];

export const layout = ['id', 'noticeYn', 'title', 'updatedByNm', 'updatedAt', 'qryCnt'];
