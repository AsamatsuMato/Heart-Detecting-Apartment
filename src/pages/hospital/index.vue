<template>
  <view class="hospital">
    <carousel :url-list="urlList" />
    <hospital-info :hospital-info="hospitalInfo" />
    <hospital-service />
    <hospital-introduction :hospital-info="hospitalInfo" />
    <copyright />
  </view>
</template>

<script setup lang="ts">
import Carousel from "@/components/Carousel/index.vue";
import Copyright from "@/components/Copyright/index.vue";
import HospitalInfo from "./components/Hospital-Info.vue";
import HospitalService from "./components/Hospital-Service.vue";
import HospitalIntroduction from "./components/Hospital-Introduction.vue";
import { getCarouselApi } from "@/apis/home/index";
import { getHospitalInfoApi } from "@/apis/hospital/index";
import { type HospitalInfoInter } from "./types";

onMounted(() => {
  getCarousel();
  getHospitalInfo();
});

const urlList = ref<Array<string>>([]);
async function getCarousel() {
  const res: any = await getCarouselApi();
  urlList.value = res;
}

const hospitalInfo = ref<HospitalInfoInter>({
  logo: "",
  name: "",
  phone: "",
  location: "",
  introduce: "",
});
async function getHospitalInfo() {
  const res: any = await getHospitalInfoApi();
  hospitalInfo.value = res;
}
</script>

<style lang="scss" scoped>
.hospital {
  padding: 20rpx;
  background: linear-gradient(to bottom, #226bf3, #fff 300rpx);
}
</style>
