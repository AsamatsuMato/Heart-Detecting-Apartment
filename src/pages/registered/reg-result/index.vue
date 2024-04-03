<template>
  <Result
    title="预约成功"
    :content="content"
    main-button-message="查看预约详情"
  />
</template>

<script setup lang="ts">
import Result from "@/components/Result/index.vue";

const content = ref(
  `您已预约成功<br>请您使用本人身份证或电子健康码等凭证按时就诊<br>到院就诊请先到自助机取号排队!`,
);
</script>

<style lang="scss" scoped></style>
