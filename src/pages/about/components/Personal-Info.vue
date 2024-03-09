<template>
	<view class="personal-info">
        <view class="container">
            <image class="avatar" src="@/static/icon/about/default-head.svg" mode="widthFix"></image>
            <view class="info">
                点击登录支付宝账号
            </view>
        </view>
	</view>
</template>

<script setup lang="ts">
	
</script>

<style lang="scss" scoped>
	.personal-info {
        padding: 40rpx 20rpx;
		background: #226BF3;
        height: 200rpx;

        .container {
            display: flex;
            align-items: center;
            color: #FFF;

            .avatar {
                width: 150rpx;
                margin-right: 40rpx;
            }
        }
    }
</style>