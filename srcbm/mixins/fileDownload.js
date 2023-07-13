function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

/**
 * 파일 다운로드 로직 공통화
 * @param {*} response blob 데이터
 * @param {*} fileNm 저장할 파일 이름
 */
function downloadFile(response, fileNm) {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  const filename = replaceAll(decodeURI(fileNm), '+', ' ');
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
}

export default {
  downloadFile,
};
