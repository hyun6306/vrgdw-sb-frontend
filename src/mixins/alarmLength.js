export default {
  computed: {
    maxLength() {
      if (this.ment && this.ment !== '') return this.$t(this.ment).length > 50;
      else if (this.text && this.text !== '') return this.text.length > 50;
      else false;
    },
  },
};
