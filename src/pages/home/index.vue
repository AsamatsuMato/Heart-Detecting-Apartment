<template>
	<view class="home">
		<Carousel/>
		<OutpatientService/>
		<InpatientService/>
		<view class="footer">
			<view>—— &copy;2024 AsamatsuMato ——</view>
			<view>由 Vue3 & Uniapp & TypeScript & Vite 强力驱动</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import Carousel from "./components/Carousel/index.vue";
	import OutpatientService from "./components/Outpatient-Service/index.vue";
	import InpatientService from "./components/Inpatient-service/index.vue";
</script>

<style lang="scss" scoped>
	.home {
		padding: 20rpx;
		background: linear-gradient(to bottom, #226BF3, #FFF 20%);

		.footer {
			font-size: 12px;
			width: 100%;
			color: #AAAAAA;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>