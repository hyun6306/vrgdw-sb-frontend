<template>
  <div>
    <!-- 검색필터 영역 -->
    <!-- <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type filter_type02">
              <span class="filter_type_title none-display"></span>
              <input type="text" id="postal_code" style="width: 550px" class="t-l" placeholder="" v-model="filter" @keyup.enter="privacyList" />
              <button class="btn_search" @click="privacyList"><img src="@/assets/img/icon_search_w.png" /></button>
            </label>
          </div>
        </div>
      </div>
    </div> -->
    <!-- //검색필터 영역 -->

    <!-- 공지사항 리스트 -->
    <div class="realgrid_container realgrid_container17">
      <div class="real_head">
        <div class="real_head_left">
          <span class="real_title">{{ $t('message.conditionInfo') }}</span>
        </div>
        <div class="real_head_right"></div>
      </div>
      <div class="real_body real_body07 notice_section">
        <div class="board_table table">
          <table>
            <colgroup>
              <col style="width: 70px" />
              <col style="width: 150px" />
              <col style="width: 150px" />
              <col style="width: 769px" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <label class="chechbox_solo"> <input type="checkbox" v-model="allChecked" /><span class="checkmark"></span> </label>
                </th>
                <th>NO</th>
                <th>{{ $t('message.writeDt') }}</th>
                <th>{{ $t('message.title') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(list, index) in this.listData" :key="list.id">
                <td>
                  <label class="chechbox_solo"> <input type="checkbox" v-model="checked" :value="list.id" /><span class="checkmark"></span> </label>
                </td>
                <td>{{ index + 1 }}</td>
                <td>{{ list.updatedAt }}</td>
                <td class="t-l" @click="privacyDetail(list.id)">
                  {{ list.title }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="real_footer">
        <div class="footer_left"></div>
        <div class="footer_right">
          <button class="btn_default btn_process" @click="$modal.show('AgreeModal', { page: 'AGREE', id: null })">{{ $t('message.btnRegist') }}</button>
          <button class="btn_default btn_function" @click="privacyRemove">{{ $t('message.btnDelete') }}</button>
        </div>
      </div>
    </div>
    <!-- <div class="page_num_box">
      <div class="btn_page_nums">
        <a href="" class="first_p"><img src="@/assets/img/arrow_first.png" alt="처음" /></a>
        <a href="" class="prev_p"><img src="@/assets/img/arrow_prev.png" alt="이전" /></a>
        <a href="" class="on">1</a>
        <a href="">2</a>
        <a href="">3</a>
        <a href="">4</a>
        <a href="">5</a>
        <a href="">6</a>
        <a href="">7</a>
        <a href="">8</a>
        <a href="">9</a>
        <a href="">10</a>
        <a href=""><img src="@/assets/img/arrow_next.png" alt="다음" /></a>
        <a href=""><img src="@/assets/img/arrow_end.png" alt="끝" /></a>
      </div>
    </div> -->
    <!-- //공지사항 리스트 -->
    <AgreeModal />
    <QuoteDetailModal :ment="ment" />
    <PersonalModal />
  </div>
</template>

<script>
import systemApi from '@/api/system/system';
import AgreeModal from '@/modal/system/AgreeModal';
import QuoteDetailModal from '@/modal/detail/QuoteDetailModal';
import PersonalModal from '@/modal/system/PersonalModal';

export default {
  components: { AgreeModal, QuoteDetailModal, PersonalModal },
  data() {
    return {
      listData: [],
      ment: '',
      allChecked: '',
      checked: [],
      count: 0,
    };
  },
  watch: {
    listData(data) {
      data.forEach(row => {
        row.updatedAt = this.$vnDateFormatD(row.updatedAt);
      });
    },
    allChecked(check) {
      if (check) {
        this.listData.forEach(data => {
          this.checked.push(data.id);
        });
      } else {
        this.checked = [];
      }
    },
  },
  methods: {
    async privacyList() {
      try {
        //목록
        let param = {
          filter: '',
          pageNumber: 0,
          pageSize: 200,
          bbsId: 'AGREE',
        };
        const response = await systemApi.getPrivacyList(param);
        this.listData = response.data.ds;
        this.count = this.listData.length;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    privacyDetail(id) {
      //세부내용 모달로 이동
      this.$modal.show('AgreeModal', { id: id, page: 'AGREE' });
    },
    async privacyRemove() {
      //삭제
      if (this.checked.length <= 0) {
        this.ment = 'message.msgNoItem';
        this.$modal.show('QuoteDetailModal');
      } else {
        try {
          let param = [];
          this.checked.forEach(id => {
            param.push({
              bbsId: 'AGREE',
              id: id,
            });
          });
          const response = await systemApi.putPrivacyRemoce(param);
          await this.privacyList();
          this.showModal({ resp: response.data.status, type: 'remove' });
          this.checked = [];
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
    async showModal(data) {
      if (data.resp == '200') {
        await this.privacyList();
        if (data.type == 'save') {
          this.ment = 'message.msgSave';
        } else {
          this.ment = 'message.msgResultDelete';
        }
        this.$modal.show('QuoteDetailModal');
      }
    },
  },
  created() {
    this.privacyList();
  },
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
