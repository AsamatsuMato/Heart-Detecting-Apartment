<template>
  <view class="carousel">
    <swiper
      class="swiper"
      circular
      :indicator-dots="carouselConfig.indicatorDots"
      :autoplay="carouselConfig.autoplay"
      :interval="carouselConfig.interval"
      :duration="carouselConfig.duration"
    >
      <swiper-item
        class="swiper_item"
        v-for="item in props.urlList"
        :key="item._id"
      >
        <image
          class="img"
          :src="`${url_config}${item.url}`"
          mode="scaleToFill"
        ></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { url_config } from "@/apis/config";
const props = defineProps({
  urlList: {
    type: Array<any>,
    default: [],
  },
});
const carouselConfig = ref({
  indicatorDots: false,
  autoplay: true,
  interval: 2000,
  duration: 500,
});
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  height: 300rpx;
  .swiper {
    height: 300rpx;
    .swiper_item {
      height: 300rpx;

      .img {
        border-radius: 4px;
        width: 100%;
        height: 300rpx;
      }
    }
  }
}
</style>
