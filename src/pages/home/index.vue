<template>
  <view class="home">
    <carousel :urlList="urlList" />
    <outpatient-service />
    <hospital-service />
    <copyright />
  </view>
</template>

<script setup lang="ts">
import Carousel from "@/components/Carousel/index.vue";
import Copyright from "@/components/Copyright/index.vue";
import OutpatientService from "./components/Outpatient-Service.vue";
import HospitalService from "./components/Hospital-Service.vue";
import { getCarouselApi } from "@/apis/home/index";

onMounted(() => {
  getCarousel();
});

const urlList = ref<Array<string>>([]);
async function getCarousel() {
  const res: any = await getCarouselApi();
  urlList.value = res;
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20rpx;
  background: linear-gradient(to bottom, #226bf3, #fff 300rpx);
  min-height: 97vh;
}
</style>
