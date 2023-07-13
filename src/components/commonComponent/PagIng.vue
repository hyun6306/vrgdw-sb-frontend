<template>
  <div class="page_num_box">
    <div class="btn_page_nums" v-show="length > 0">
      <a v-if="pageNumber != 0" @click="pageChange('first')" class="first_p"><img src="@/assets/img/arrow_first.png" alt="처음" /></a>
      <a v-if="pageNumber != 0" @click="pageChange('pre')" class="prev_p"><img src="@/assets/img/arrow_prev.png" alt="이전" /></a>
      <a :class="[pageNumber + 1 === num ? 'on' : '']" v-for="num in range(pageBlockSize - pageDefaultBlockSize - 1, pageBlockSize)" :key="num" @click="[(pageNumber = num - 1), alterPageNumber()]">{{ num }}</a>
      <a v-if="pageNumber < pageInfo.finalPageNo - 1" @click="pageChange('next')"><img src="@/assets/img/arrow_next.png" alt="다음" /></a>
      <a v-if="pageNumber < pageInfo.finalPageNo - 1" @click="pageChange('last')"><img src="@/assets/img/arrow_end.png" alt="끝" /></a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pageInfo', 'length'],
  data() {
    return {
      pageNumber: 0,
      pageBlockSize: 5,
      pageDefaultBlockSize: 5,
    };
  },
  watch: {
    pageInfo() {
      if (this.pageBlockSize > this.pageInfo.finalPageNo) {
        this.pageBlockSize = this.pageInfo.finalPageNo;
      }
    },
  },
  methods: {
    resetPageNumber() {
      this.pageNumber = 0;
      this.pageBlockSize = 5;
    },
    pageChange(type) {
      if (type === 'next') {
        this.pageNumber++;
        if (this.pageNumber > this.pageBlockSize - 1) {
          this.pageBlockSize = this.pageBlockSize + this.pageDefaultBlockSize;
          if (this.pageBlockSize > this.pageInfo.finalPageNo) {
            this.pageBlockSize = this.pageInfo.finalPageNo;
          }
        }
      } else if (type === 'pre') {
        this.pageNumber--;
        if (this.pageNumber < this.pageBlockSize - this.pageDefaultBlockSize) {
          this.pageBlockSize = this.pageBlockSize - this.pageDefaultBlockSize;
        }
      } else if (type === 'last') {
        this.pageNumber = this.pageInfo.finalPageNo - 1;
        this.pageBlockSize = this.pageInfo.finalPageNo;
      } else if (type === 'first') {
        this.pageNumber = this.pageInfo.firstPageNo - 1;
        this.pageBlockSize = this.pageInfo.firstPageNo * this.pageDefaultBlockSize;
      }
      this.alterPageNumber();
    },
    alterPageNumber() {
      this.$emit('alterPageNumber', this.pageNumber);
    },
    range(start, end) {
      if (start < 0) {
        start = 1;
      }
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    },
  },
};
</script>

<style></style>
