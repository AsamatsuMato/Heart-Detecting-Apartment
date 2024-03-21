<template>
  <Result
    title="缴费成功"
    :content="content"
    main-button-message="查看缴费详情"
  />
</template>

<script setup lang="ts">
import Result from "@/components/Result/index.vue";

const content = ref(`您已成功缴费，可在个人中心查看缴费记录`);
</script>

<style lang="scss" scoped></style>
