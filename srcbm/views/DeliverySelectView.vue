<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">배송지 선택</h1>
      </div>
      <div class="header_left"></div>
      <div class="header_right">
        <button class="btn_header btn_close"></button>
      </div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <!-- 배송지 검색 -->
      <div class="delivery_search_contents">
        <span class="ds_title">검색어</span>
        <input type="text" id="" class="" />
        <button class="btn_search">sự tìm kiếm</button>
      </div>
      <!-- //배송지 검색 -->
      <!-- 배송지 검색결과 목록 -->
      <div class="delivery_search_list_contents">
        <p class="deafult_address">기본 배송지 정보</p>
        <section class="address_section address_default_section">
          <p class="as_title">베트남 남부대리점</p>
          <ul class="address_info_box">
            <li>
              <strong>우편번호</strong>
              <span>00000</span>
            </li>
            <li>
              <strong>주소</strong>
              <span>TÂY NINH / DƯƠNG MÌNH CHÂU 54 P. Liễu Giai, Cống Vị, Ba Đình, Hà Nội </span>
            </li>
            <li>
              <strong>담당자명</strong>
              <span>Dongwha Enterprise</span>
            </li>
            <li>
              <strong>연락처 1</strong>
              <span>000-0000-0000</span>
            </li>
            <li>
              <strong>연락처 2</strong>
              <span>000-0000-0000</span>
            </li>
            <li>
              <span class="note_box">기타사항 입니다.</span>
            </li>
          </ul>
        </section>
        <p class="etc_address">기타 배송지 정보</p>
        <section class="address_section">
          <div class="check_title">
            <label class="chechbox_basic">
              <input type="checkbox" />
              <span class="checkmark"></span>
              베트남 남부대리점
            </label>
          </div>
          <ul class="address_info_box">
            <li>
              <strong>우편번호</strong>
              <span>00000</span>
            </li>
            <li>
              <strong>주소</strong>
              <span>TÂY NINH / DƯƠNG MÌNH CHÂU 54 P. Liễu Giai, Cống Vị, Ba Đình, Hà Nội </span>
            </li>
            <li>
              <strong>담당자명</strong>
              <span>Dongwha Enterprise</span>
            </li>
            <li>
              <strong>연락처 1</strong>
              <span>000-0000-0000</span>
            </li>
            <li>
              <strong>연락처 2</strong>
              <span>000-0000-0000</span>
            </li>
            <li>
              <span class="note_box">기타사항 입니다.</span>
            </li>
          </ul>
        </section>
        <section class="address_section">
          <div class="check_title">
            <label class="chechbox_basic">
              <input type="checkbox" />
              <span class="checkmark"></span>
              베트남 남부대리점
            </label>
          </div>
          <ul class="address_info_box">
            <li>
              <strong>우편번호</strong>
              <span>00000</span>
            </li>
            <li>
              <strong>주소</strong>
              <span>TÂY NINH / DƯƠNG MÌNH CHÂU 54 P. Liễu Giai, Cống Vị, Ba Đình, Hà Nội </span>
            </li>
            <li>
              <strong>담당자명</strong>
              <span>Dongwha Enterprise</span>
            </li>
            <li>
              <strong>연락처 1</strong>
              <span>000-0000-0000</span>
            </li>
            <li>
              <strong>연락처 2</strong>
              <span>000-0000-0000</span>
            </li>
            <li>
              <span class="note_box">기타사항 입니다.</span>
            </li>
          </ul>
        </section>
      </div>
      <!-- //배송지 검색결과 목록 -->
      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents">
        <div class="btn_box">
          <button class="btn_reset">취소</button>
          <button class="btn_tempsave">확인</button>
        </div>
      </div>
      <!-- //하단 버튼 -->
    </div>
    <!-- //컨텐츠 바디 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      priceSellOpen: false,
      quoteOpen: false,
      bookmark: false,
      selectOptions: ['KOR', 'ENG', 'VET'],
    };
  },
};
</script>

<style></style>
