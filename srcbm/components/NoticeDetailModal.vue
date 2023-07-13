<template>
  <modal name="NoticeDetailModal" width="100%" height="100%" :adaptive="true">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">공지사항</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('NoticeDetailModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <!-- 공지사항 상세 -->
        <div class="notice_detail_contents">
          <div class="notice_head">
            <div class="notice_title">
              <span class="go_notice">
                <strong class="icon_notice">공지</strong>
                <i class="icon_new ml-5">N</i>
                모바일 공지사항 제목길다면 2줄 말줄임모바일 공지사항 제목길다면 2줄 말줄임
              </span>
            </div>
            <div class="notice_info">
              <span>관리자</span>
              <span>2022-12-20</span>
              <span>조회수<i class="ml-5">20</i></span>
              <span class="icon_file in_img border_0"><img src="@m/assets/img/icon_file.png" alt="" /></span>
            </div>
          </div>
          <!-- 공지사항 내용 -->
          <div class="notice_document">
            <span> 내용이 입력되는 부분입니다. 내용이 입력되는 부분입니다. </span>
          </div>
          <!-- 첨부파일 -->
          <button class="notice_file">
            <i class="in_img"><img src="@m/assets/img/icon_file.png" alt="" /></i>
            <span>첨부파일.jpg</span>
          </button>
          <button class="notice_file">
            <i class="in_img"><img src="@m/assets/img/icon_file.png" alt="" /></i>
            <span>첨부파일.jpg</span>
          </button>
        </div>

        <!-- //공지사항 상세 -->

        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_add">목록으로</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>
<script>
export default {
  //  name: 'ProductSearchModal',
  components: {},
  data() {
    return {
      registClose: false,
      selectOptions: ['선택1', '선택2', '선택3'],
      currentTab: 0,
      tabs: ['분류검색', '즐겨찾기', '이전주문'],
    };
  },
};
</script>

<style></style>
