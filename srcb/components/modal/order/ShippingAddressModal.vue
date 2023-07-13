<template>
  <modal name="ShippingAddressModal" width="750" height="auto">
    <div class="modal" id="ShippingAddress">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ShippingAddressModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('label.deliveryList') }}</p>
      <div class="modal_content">
        <div class="search_box">
          <input type="text" class="form_txt" :placeholder="$t('label.inputDeliveryNm')" />
          <button class="">
            <img src="@/assets/img/icon_search_w.png" alt="검색" />
          </button>
        </div>
        <div class="result_box">
          <!-- 배송지 검색결과가없을때 -->
          <div class="address_info">
            <p class="not_search_result">{{ $t('label.noDelivery') }}</p>
          </div>
          <!-- //배송지 검색결과가없을때 -->
          <div class="address_info choice_address">
            <div class="address_check">
              <label class="chechbox_basic">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
            </div>
            <p class="company_title">콱자 대리점</p>
            <ul>
              <li class="address_list">
                <p class="address_list_title">{{ $t('label.postCd') }}</p>
                <span class="address_list_info">000000</span>
              </li>
              <li class="address_list">
                <p class="address_list_title">{{ $t('label.address') }}</p>
                <span class="address_list_info">서울시 강남구 </span>
              </li>
              <li class="address_list">
                <div class="align_row">
                  <p class="address_list_title">{{ $t('label.phone1') }}</p>
                  <span class="address_list_info">010-0000-0000</span>
                </div>
                <div class="align_row">
                  <p class="address_list_title">{{ $t('label.phone2') }}</p>
                  <span class="address_list_info">010-0000-0000</span>
                </div>
              </li>
              <li class="address_list">
                <p class="address_list_title">{{ $t('label.speciText') }}</p>
                <input type="text" />
              </li>
            </ul>
          </div>
          <div class="address_info">
            <div class="address_check">
              <label class="chechbox_basic">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
            </div>
            <p class="company_title">콱자 대리점</p>
            <ul>
              <li class="address_list">
                <p class="address_list_title">{{ $t('label.postCd') }}</p>
                <span class="address_list_info">000000</span>
              </li>
              <li class="address_list">
                <p class="address_list_title">{{ $t('label.address') }}</p>
                <span class="address_list_info">서울시 강남구 </span>
              </li>
              <li class="address_list">
                <div class="align_row">
                  <p class="address_list_title">{{ $t('label.phone1') }}</p>
                  <span class="address_list_info">010-0000-0000</span>
                </div>
                <div class="align_row">
                  <p class="address_list_title">{{ $t('label.phone2') }}</p>
                  <span class="address_list_info">010-0000-0000</span>
                </div>
              </li>
              <li class="address_list">
                <p class="address_list_title">{{ $t('label.speciText') }}</p>
                <input type="text" />
              </li>
            </ul>
          </div>
          <div class="address_info">
            <div class="address_check">
              <label class="chechbox_basic">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
            </div>
            <p class="company_title">콱자 대리점</p>
            <ul>
              <li class="address_list">
                <p class="address_list_title">{{ $t('label.postCd') }}</p>
                <span class="address_list_info">000000</span>
              </li>
              <li class="address_list">
                <p class="address_list_title">{{ $t('label.address') }}</p>
                <span class="address_list_info">서울시 강남구 </span>
              </li>
              <li class="address_list">
                <div class="align_row">
                  <p class="address_list_title">{{ $t('label.phone1') }}</p>
                  <span class="address_list_info">010-0000-0000</span>
                </div>
                <div class="align_row">
                  <p class="address_list_title">{{ $t('label.phone2') }}</p>
                  <span class="address_list_info">010-0000-0000</span>
                </div>
              </li>
              <li class="address_list">
                <p class="address_list_title">{{ $t('label.speciText') }}</p>
                <input type="text" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="modal_btn_contents_t02">
        <button class="btn_primary">{{ $t('button.ok') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ShippingAddressModal',
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
  },
};
</script>

<style></style>
