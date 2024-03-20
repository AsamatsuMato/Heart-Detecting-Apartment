<template>
  <view class="hospital">
    <carousel />
    <hospital-info />
    <hospital-service />
    <hospital-introduction />
    <copyright />
  </view>
</template>

<script setup lang="ts">
import Carousel from "@/components/Carousel/index.vue";
import Copyright from "@/components/Copyright/index.vue";
import HospitalInfo from "./components/Hospital-Info.vue";
import HospitalService from "./components/Hospital-Service.vue";
import HospitalIntroduction from "./components/Hospital-Introduction.vue";
</script>

<style lang="scss" scoped>
.hospital {
  padding: 20rpx;
  background: linear-gradient(to bottom, #226bf3, #fff 300rpx);
}
</style>
