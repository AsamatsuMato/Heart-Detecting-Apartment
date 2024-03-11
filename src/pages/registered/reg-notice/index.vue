<template>
	<view class="reg_notice">
		<view class="title">预约挂号须知</view>
        <view class="content">
            挂号须知:<br>
            1. 预约挂号前请先选择就诊人。<br>
            2. 您可预约当天以及未来一周内的医生号源。<br>
            3. 如需取消预约，请在就诊前一天在挂号单页面进行退号。<br>
            4. 如遇医生停诊，将以微信信息方式通知或客服通知。<br>
            5. 当天挂号成功后，可凭挂号单到诊室就诊。
        </view>
        <button @click="confirm">确认</button>
	</view>
</template>

<script setup lang="ts">
    function confirm() {
        uni.navigateBack();
    }
</script>

<style lang="scss" scoped>
	.reg_notice {
        padding: 40rpx;

        .content {
            margin: 50rpx 0 20rpx;
            color: #aaa;
            line-height: 1.5em;
        }

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #226BF3;
            color: #FFF;
        }
    }
</style>