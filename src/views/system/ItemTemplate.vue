<template>
  <div style="background-color: white">
    <span style="background-color: white">{{ item.progNm }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true },
  },
};
</script>
