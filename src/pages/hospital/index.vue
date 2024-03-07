<template>
	<view class="hospital">
		<carousel/>
		<hospital-info/>
		<hospital-service/>
		<hospital-introduction/>
		<copyright/>
	</view>
</template>

<script setup lang="ts">
	import Carousel from "@/components/Carousel/index.vue";
	import Copyright from "@/components/Copyright/index.vue";
	import HospitalInfo from "./components/Hospital-Info/index.vue";
	import HospitalService from "./components/Hospital-Service/index.vue";
	import HospitalIntroduction from "./components/Hospital-Introduction/index.vue";
</script>

<style lang="scss" scoped>
	.hospital {
		padding: 20rpx;
		background: linear-gradient(to bottom, #226BF3, #FFF 300rpx);
	}
</style>