<template>
	<view class="select_dept">
		<scroll-view 
            scroll-y="true" 
            class="left"
        >
            <view class="item">就诊科室</view>
        </scroll-view>
		<scroll-view 
            scroll-y="true" 
            class="right"
        >
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
            <view class="item">肿瘤科</view>
            <view class="item">中心门诊</view>
        </scroll-view>
	</view>
</template>

<script setup lang="ts">
	
</script>

<style lang="scss" scoped>
	.select_dept {
		display: flex;

        .left {
            width: 30vw;
            height: 100vh;
            background-color: #F2F2F2;

            .item {
                height: 130rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #4186FB;
                background-color: #FFF;
            }
        }

        .right {
            width: 70vw;
            height: 100vh;
            padding: 0 20rpx;
            background-color: #FFF;

            .item {
                height: 130rpx;
                display: flex;
                align-items: center;
                border-bottom: 1rpx solid #D7D7D7;
            }
        }
	}
</style>