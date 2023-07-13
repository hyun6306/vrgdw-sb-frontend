<template>
  <modal :name="`AddressInfoModal${page}`" width="900" height="auto" @opened="getAddrInfo()" :clickToClose="false">
    <div class="modal" id="ShippingAddress">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="[$modal.hide(`AddressInfoModal${page}`)]"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.addrList') }}</p>
      <div class="modal_content">
        <div class="result_box">
          <div class="address_info" v-if="userAddrInfo.length < 0">
            <p class="not_search_result">{{ $t('message.msgNoDeliver') }}</p>
          </div>
          <p class="company_title">{{ userAddrInfo.logitsAlias }}</p>
          <div class="table">
            <table>
              <colgroup>
                <col style="width: 30%" />
                <col style="width: 70%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>{{ $t('message.postNum') }}</th>
                  <td class="t-l">{{ userAddrInfo.postNum }}</td>
                </tr>
                <tr>
                  <th>{{ $t('message.addr') }}</th>
                  <td class="t-l">{{ userAddrInfo.addr }}, {{ userAddrInfo.distrNm }}, {{ userAddrInfo.cityNm }}</td>
                </tr>
                <tr>
                  <th>{{ $t('message.callNum1') }}</th>
                  <td class="t-l">{{ userAddrInfo.phoneNum1 }}</td>
                </tr>
                <tr v-if="userAddrInfo.phoneNum2">
                  <th>{{ $t('message.callNum2') }}</th>
                  <td class="t-l">{{ userAddrInfo.phoneNum2 }}</td>
                </tr>
                <tr>
                  <th>{{ $t('message.picNm') }}</th>
                  <td class="t-l">{{ userAddrInfo.trnMngNm }}</td>
                </tr>
                <tr v-if="page === 'bookingOrder'">
                  <th>{{ $t('message.logitsRemark') }}</th>
                  <td class="t-l">{{ userAddrInfo.logitsRemark }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div class="address_info" v-if="userAddrInfo.length < 0">
            <p class="not_search_result">{{ $t('message.msgNoDeliver') }}</p>
          </div> -->
          <!-- <div class="address_info">
            <p class="company_title">{{ userAddrInfo.logitsAlias }}</p>
            <ul>
              <li class="address_list">
                <p class="address_list_title">{{ $t('message.picNm') }}</p>
                <span class="address_list_info">{{ userAddrInfo.trnMngNm }}</span>
              </li>
              <li class="address_list">
                <p class="address_list_title">{{ $t('message.postNum') }}</p>
                <span class="address_list_info">{{ userAddrInfo.postNum }}</span>
              </li>
              <li class="address_list">
                <p class="address_list_title">{{ $t('message.addr') }}</p>
                <span class="address_list_info">{{ userAddrInfo.addr }}</span>
              </li>
              <li class="address_list">
                <div class="align_row">
                  <p class="address_list_title">{{ $t('message.callNum1') }}</p>
                  <span class="address_list_info">{{ userAddrInfo.phoneNum1 }}</span>
                </div>
                <div v-if="userAddrInfo.phoneNum2" class="align_row">
                  <p class="address_list_title">{{ $t('message.callNum2') }}</p>
                  <span class="address_list_info">{{ userAddrInfo.phoneNum2 }}</span>
                </div>
              </li>
              <li class="address_list" v-if="page === 'bookingOrder'">
                <p class="address_list_title" style="width: 150px">
                  {{ $t('message.logitsRemark') }}
                </p>
                <span class="address_list_info">{{ userAddrInfo.logitsRemark }}</span>
              </li>
            </ul>
          </div> -->
          <!-- </div> -->
          <div class="modal_btn_contents_t05">
            <button @click="[$modal.hide(`AddressInfoModal${page}`)]" class="btn_primary">
              {{ $t('message.btnClose') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import commonApi from '@/api/common';

export default {
  name: 'AddressInfoModal',
  props: {
    addrOffrId: {
      type: Number,
    },
    page: {
      type: String,
    },
  },
  data() {
    return {
      userAddrInfo: [],
    };
  },
  methods: {
    async getAddrInfo() {
      try {
        const param = {
          offrId: this.addrOffrId,
        };
        const response = await commonApi.getAddrInfo(param);
        this.userAddrInfo = response.data.rs;
        this.$modal.show(`AddressInfoModal${this.page}`);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
};
</script>

<style></style>
