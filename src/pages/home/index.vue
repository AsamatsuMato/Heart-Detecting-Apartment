<template>
	<view class="home">
		<carousel/>
		<outpatient-service/>
		<inpatient-service/>
		<copyright/>
	</view>
</template>

<script setup lang="ts">
	import Carousel from "@/components/Carousel/index.vue";
	import Copyright from "@/components/Copyright/index.vue";
	import OutpatientService from "./components/Outpatient-Service.vue";
	import InpatientService from "./components/Inpatient-Service.vue";
</script>

<style lang="scss" scoped>
	.home {
		padding: 20rpx;
		background: linear-gradient(to bottom, #226BF3, #FFF 300rpx);
	}
</style>