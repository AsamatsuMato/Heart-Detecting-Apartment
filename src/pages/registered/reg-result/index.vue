<template>
	<view class="reg_result">
		<view class="reg_status_info">
            <image src="@/static/icon/reg-result/success.svg" mode="widthFix"></image>
            <view class="status">预约成功</view>
            <view class="extra">您已预约成功，请您持本人身份证按时就诊</view>
            <view class="extra">到院就诊时请先到自助机取号排队</view>
        </view>
        <button class="details_btn">查看预约详情</button>
        <button class="index_btn">返回首页</button>
	</view>
</template>

<script setup lang="ts">
    
</script>

<style lang="scss" scoped>
	.reg_result {
        padding: 100rpx 20rpx;

        .reg_status_info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 400rpx;
            margin-bottom: 100rpx;

            image {
                width: 200rpx;
            }

            .status {
                font-size: 40rpx;
            }

            .extra {
                font-size: 36rpx;
                color: #AAA;
            }
        }

        .details_btn {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #226BF3;
            color: #FFF;
            margin-bottom: 20rpx;
        }

        .index_btn {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #E5F0FE;
            color: #226BF3;
            border: 1rpx solid #CFD8E5;
        }
    }
</style>