<template>
  <modal name="MainPushModal" width="100%" height="100%" :adaptive="true" @before-open="open">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">{{ $t('message.pushList') }}</h1>
      </div>
      <div class="header_left"></div>
      <div class="header_right">
        <button class="btn_header btn_close" @click="$modal.hide('MainPushModal')"></button>
      </div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <section class="alarm_contents">
        <div class="alarm_list" v-for="(list, index) in pushList" :key="index" @click="choosePush(list)">
          <a class="alarm_title"> {{ list.contents }} </a>
          <p class="alarm_info">
            <span class="alarm_date">{{ list.createdAt | vnDateFormatD }}</span>
            <span class="alarm_kind">{{ list.alarmNm }}</span>
          </p>
        </div>
        <!--        <button class="btn_more_alarm">더보기</button>-->
      </section>
    </div>
  </modal>
</template>
<script>
import { mapGetters } from 'vuex';
import mainApi from '@/api/main';

export default {
  name: 'MainPushModal',
  components: {},
  data() {
    return {
      pushList: [],
    };
  },
  watch: {},
  computed: {
    ...mapGetters({}),
  },
  methods: {
    async getPushList() {
      try {
        const resp = await mainApi.getPushList();
        this.pushList = resp.data.ds;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    choosePush(list) {
      this.$emit('choosePush', list.shortUrl);
      this.$modal.hide('MainPushModal');
    },
    open() {
      this.getPushList();
    },
  },
  created() {
    this.getPushList();
  },
};
</script>

<style></style>
