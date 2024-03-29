<template>
  <view class="hospital_info">
    <view class="name">
      <image
        class="logo"
        :src="`${url_config}${props.hospitalInfo.logo}`"
        mode="widthFix"
      ></image>
      <text>{{ props.hospitalInfo.name }}</text>
    </view>
    <view class="phone">
      <image
        class="icon"
        src="@/static/icon/hospital/phone.png"
        mode="widthFix"
      ></image>
      <text>{{ props.hospitalInfo.phone }}</text>
    </view>
    <view class="location">
      <image
        class="icon"
        src="@/static/icon/hospital/location.png"
        mode="widthFix"
      ></image>
      <text>{{ props.hospitalInfo.location }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { url_config } from "@/apis/config";
import { type HospitalInfoInter } from "../types";
import { PropType } from "vue";

const props = defineProps({
  hospitalInfo: {
    type: Object as PropType<HospitalInfoInter>,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.hospital_info {
  margin: 40rpx 0;

  .name {
    display: flex;
    align-items: center;

    .logo {
      width: 150rpx;
      border-radius: 50%;
      margin-right: 40rpx;
    }

    text {
      font-size: 22px;
    }
  }

  .phone,
  .location {
    display: flex;
    align-items: center;
    margin: 20rpx 0;
    .icon {
      width: 50rpx;
      margin: 0 40rpx 0 20rpx;
    }
  }
}
</style>
