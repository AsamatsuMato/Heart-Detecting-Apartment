<template>
  <Result
    title="预约成功"
    :content="content"
    main-button-message="查看预约详情"
    @go-to-registered-details="goToRegisteredDetails"
  />
</template>

<script setup lang="ts">
import Result from "@/components/Result/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import { navigateTo } from "@/router/index";

const content = ref(
  `您已预约成功<br>请您使用本人身份证或电子健康码等凭证按时就诊<br>到院就诊请先到自助机取号排队!`,
);

const code = ref("");
onLoad((option: any) => {
  code.value = option.regCode;
});

function goToRegisteredDetails() {
  navigateTo(
    `/pages/registration-record/record-details/index?regCode=${code.value}`,
  );
}
</script>

<style lang="scss" scoped></style>
