<template>
	<view class="hospital_info">
		<view class="name">
			<image class="logo" src="@/static/images/hospital/app-logo.jpg" mode="widthFix"></image>
			<text>心检寓</text>
		</view>
		<view class="phone">
			<image class="icon" src="@/static/icon/hospital/phone.png" mode="widthFix"></image>
			<text>020-2333333</text>
		</view>
		<view class="location">
			<image class="icon" src="@/static/icon/hospital/location.png" mode="widthFix"></image>
			<text>广东省广州市</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	
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

		.phone, .location {
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