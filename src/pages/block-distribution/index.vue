<template>
  <view class="block_distribution">
    <image
      class="logo"
      :src="`${url_config}/images/hospital/block-distribution.jpg`"
      mode="widthFix"
    ></image>
  </view>
</template>

<script setup lang="ts">
import { url_config } from "@/apis/config";
</script>

<style lang="scss" scoped>
.block_distribution {
  padding: 20rpx;

  image {
    width: 100%;
  }
}
</style>
