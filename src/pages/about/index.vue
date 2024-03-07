<template>
	<view class="">
		<personal-info/>
		<options-list/>
		<copyright/>
	</view>
</template>

<script setup lang="ts">
	import Copyright from "@/components/Copyright/index.vue";
	import PersonalInfo from "./components/Personal-Info/index.vue";
	import OptionsList from "./components/Options-List/index.vue";
</script>

<style lang="scss" scoped>
	
</style>