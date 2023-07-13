<template>
  <modal name="PrivacyModal" width="750" height="auto" @before-open="open" @before-close="close" :clickToClose="false">
    <div class="modal" id="NoticeRegist">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('PrivacyModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.privacyAgree') }}</p>
      <div class="modal_content">
        <div class="result_box">
          <div class="address_info">
            <li class="address_list">
              <p class="address_list_title">{{ $t('message.title') }}</p>
              <div class="form_input">
                <input type="text" placeholder="" style="width: 100%" v-model="title" :disabled="userInfo.menuGrpCd !== 'SYSTEM_MANAGER'" />
              </div>
            </li>
          </div>
          <div class="form_textarea" style="height: 400px">
            <div class="board_write" v-if="userInfo.menuGrpCd === 'SYSTEM_MANAGER'">
              <DEXT5Editor :Id="`${page}dext5editor1`" Runtimes="html5" Width="100%" Height="400px" Lang="en-us" ref="editor" :contents="contents" :page="page" />
            </div>
            <div class="board_write" v-else>
              <div v-html="contents"></div>
            </div>
          </div>
        </div>
        <!-- <div class="board_write"></div> -->
      </div>
      <div class="modal_btn_contents_t05 mb-20">
        <button class="btn_default" @click="$modal.hide('PrivacyModal')">{{ $t('message.btnClose') }}</button>
        <button class="btn_primary" @click="privacySave">{{ $t('message.btnSave') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
import systemApi from '@/api/system/system';
import { mapGetters } from 'vuex';
import DEXT5Editor from '@/components/DEXT5Editor';

export default {
  name: 'PrivacyModal',
  data() {
    return {
      title: '',
      contents: '',
      page: '',
      modalTitle: '',
      id: null,
    };
  },
  components: {
    DEXT5Editor,
  },

  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  methods: {
    async privacyDetail() {
      if (this.id !== null) {
        let param = {
          id: this.id,
          bbsId: this.page,
        };
        try {
          const response = await systemApi.getPrivacyDetail(param);
          this.title = response.data.rs.title;
          this.contents = response.data.rs.contents;
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    async privacySave() {
      //저장
      this.contents = this.$refs.editor.getBodyValue();

      let param = {
        bbsId: this.page,
        title: this.title,
        contents: this.contents,
      };
      if (this.id !== null) param = { ...param, ...{ id: this.id } };
      try {
        const response = await systemApi.putPrivacySave(param);
        if (response.data.status == 200) {
          this.$modal.hide('PrivacyModal');
          this.$parent.showModal({ resp: response.data.status, type: 'save' });
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    open(event) {
      this.page = event.params.page;
      this.id = event.params.id;
      this.privacyDetail();
    },
    close() {
      this.id = '';
      this.title = '';
      this.contents = '';
    },
  },
};
</script>

<style></style>
