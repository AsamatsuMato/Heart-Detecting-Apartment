<template>
	<view class="hospital">
		<carousel/>
		<hospital-info/>
		<copyright/>
	</view>
</template>

<script setup lang="ts">
	import Carousel from "@/components/Carousel/index.vue";
	import Copyright from "@/components/Copyright/index.vue";
	import HospitalInfo from "./components/HospitalInfo/index.vue";
</script>

<style lang="scss" scoped>
	.hospital {
		padding: 20rpx;
		background: linear-gradient(to bottom, #226BF3, #FFF 20%);
	}
</style>