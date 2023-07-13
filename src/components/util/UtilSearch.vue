<template>
  <!-- 검색필터 영역 -->
  <div class="search_content">
    <div class="search_box">
      <div class="search_box_filter">
        <div class="filter_list">
          <label for="" class="filter_type filter_type02">
            <span class="filter_type_title none-display">검색</span>
            <!-- <MultiSelect id="Material_Group" style="width: 137px" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Pick a value"></MultiSelect> -->
            <input type="text" id="postal_code" style="width: 550px" class="t-l" :placeholder="$t('message.msgInfoSearch')" v-model="filter" ref="filter" @keyup.enter="getList" />
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="getList">{{ $t('message.btnSearch') }}</button>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
  <!-- //검색필터 영역 -->
</template>

<script>
import utilApi from '@/api/util/utility';

export default {
  props: ['savePage', 'menuId', 'page', 'changePageNumber'],
  data() {
    return {
      // selectValue: '전체',
      // selectOptions: ['전체', '제목+내용', '작성자'],
      filter: '',
      pageNumber: 0,
      pageSize: 15,
      pageInfo: {},
    };
  },
  watch: {
    changePageNumber() {
      this.pageNumber = this.changePageNumber;
      this.getList();
    },
  },
  methods: {
    reset() {
      this.filter = '';
    },
    async getList() {
      this.$refs.filter.blur();
      try {
        const param = {
          filter: this.filter,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          showYn: 'Y',
        };
        let resp = '';
        if (this.page === 'utilNotice') {
          resp = await utilApi.getNoticeList(param);
        } else if (this.page === 'utilManual') {
          resp = await utilApi.getManualList(param);
        }
        if (resp.data.status === 200) {
          this.utilListRows = resp.data.ds;
          this.pageInfo = resp.data.page;
          this.$emit('sendUtilListRows', this.utilListRows);
          this.$emit('sendPageInfo', this.pageInfo);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style></style>
