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
            <swiper-item class="swiper_item">
                <image class="img" src="@/static/images/carousel/carousel1.jpg" mode="scaleToFill"></image>
            </swiper-item>
            <swiper-item class="swiper_item">
                <image class="img" src="@/static/images/carousel/carousel2.jpg" mode="scaleToFill"></image>
            </swiper-item>
        </swiper>
    </view>
</template>

<script setup lang="ts">
	const carouselConfig = ref({
		indicatorDots: false,
		autoplay: true,
		interval: 2000,
		duration: 500
	})
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