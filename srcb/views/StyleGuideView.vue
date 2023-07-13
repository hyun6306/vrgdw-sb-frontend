<template>
  <div id="container">
    <div class="wrap">
      <h1>스타일 가이드</h1>

      <div class="list_box">
        <div class="list_title">
          탭메뉴 스타일
          <button class="" @click="listOpen = !listOpen">Style 보기</button>
        </div>
        <div class="list_body" :class="{ list_body_open: listOpen }">wefwfwefq</div>
      </div>
      <div class="list_box">
        <div class="list_title">
          상단 헤더스타일
          <button class="" @click="listOpen = !listOpen">Style 보기</button>
        </div>
        <div class="list_body" :class="{ list_body_open: listOpen }">wefwfwefq</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      visible: false,
      loading: false,
      listOpen: false,
      dateRange: {
        startDate: '2022-07-07',
        endDate: '2022-07-15',
      },
      datepicker: {
        startDate: '2022-07-07',
      },
      localeData: {
        direction: 'ltr',
        format: 'yyyy/mm/dd',
        separator: ' - ',
        applyLabel: ' 확인',
        cancelLabel: 'Cancel',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        // monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        firstDay: 0,
      },
    };
  },
  methods: {
    datePicker(value) {
      this.$modal.show(value);
    },
    pageMove(path) {
      this.$router.push(path);
    },
    salesmanage() {
      this.$modal.show('SalesManageModal');
    },
  },
};
</script>
<style lang="scss" scoped>
#container {
  width: 100%;
}
.wrap {
  width: 800px;

  .list_box {
    width: 100%;
    background: #f1f1f1;
    .list_title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      width: 100%;
      font-size: 14px;
      color: #333;
      padding: 0px 0;
      border-bottom: 1px solid #666;
      background: #fff;

      > button {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 13px;
        margin-left: auto;
        padding: 5px 10px;
        background: #43852f;
        border: 0;

        &:hover {
          background: #2b5e1c;
        }
      }
    }
    .list_body {
      display: none;

      &.list_body_code {
      }

      &_open {
        display: block;
        padding: 20px;
      }
    }
  }
}
</style>
