<template>
  <view class="home">
    <carousel :urlList="urlList" />
    <outpatient-service />
    <hospital-service ref="hospitalServiceRef" />
    <copyright />
  </view>
</template>

<script setup lang="ts">
import Carousel from "@/components/Carousel/index.vue";
import Copyright from "@/components/Copyright/index.vue";
import OutpatientService from "./components/Outpatient-Service.vue";
import HospitalService from "./components/Hospital-Service.vue";
import { getCarouselApi } from "@/apis/home/index";
import { getHospitalInfoApi } from "@/apis/hospital/index";

onMounted(() => {
  getCarousel();
  getHospitalInfo();
});

const urlList = ref<Array<string>>([]);
async function getCarousel() {
  const res: any = await getCarouselApi();
  urlList.value = res;
}

const hospitalServiceRef = ref(HospitalService);

async function getHospitalInfo() {
  try {
    const res: any = await getHospitalInfoApi();
    hospitalServiceRef.value.hospitalInfo.latitude = res.latitude;
    hospitalServiceRef.value.hospitalInfo.longitude = res.longitude;
    hospitalServiceRef.value.hospitalInfo.name = res.name;
    hospitalServiceRef.value.hospitalInfo.address = res.location;
  } catch (err) {
    console.log(err);
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20rpx;
  background: linear-gradient(to bottom, #226bf3, #fff 300rpx);
  min-height: 97vh;
}
</style>
