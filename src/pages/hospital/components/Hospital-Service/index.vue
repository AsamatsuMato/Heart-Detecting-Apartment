<template>
	<view class="hospital_info">
		<view class="label">
            <view class="icon"></view>
            <text class="title">医院服务</text>
        </view>
        <view class="grid">
            <view class="grid_item">
                <image src="@/static/icon/hospital/hospital-service/hospital-dynamics.png" mode="widthFix"></image>
                <text>医院动态</text>
            </view>
            <view class="grid_item">
                <image src="@/static/icon/hospital/hospital-service/navigation.png" mode="widthFix"></image>
                <text>医院导航</text>
            </view>
            <view class="grid_item">
                <image src="@/static/icon/hospital/hospital-service/medical-guide.png" mode="widthFix"></image>
                <text>就医指南</text>
            </view>
            <view class="grid_item">
                <image src="@/static/icon/hospital/hospital-service/health-encyclopedia.png" mode="widthFix"></image>
                <text>健康百科</text>
            </view>
        </view>
	</view>
</template>

<script setup lang="ts">
	
</script>

<style lang="scss" scoped>
	.hospital_info {
		.label {
            margin: 20rpx 0;
            display: flex;
            align-items: center;

            .icon {
                background-color: #226BF3;
                width: 40rpx;
                height: 13rpx;
                border-radius: 10rpx;
                margin-right: 20rpx;
            }

            .title {
                font-size: 20px;
            }
        }

        .grid {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            font-size: 14px;

            .grid_item {
                height: 150rpx;
                padding: 10rpx 0;
                margin: 10rpx;
                display: flex;
                flex: 0 0 calc(25% - 25rpx);
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                border: 0.5rpx solid #EAEAEA;
                background-color: #FFF;
                border-radius: 7rpx;
                box-shadow: 0rpx 0rpx 20rpx 10rpx #F5F9FF;

                image {
                    width: 80rpx;
                }
            }
        }
	}
</style>