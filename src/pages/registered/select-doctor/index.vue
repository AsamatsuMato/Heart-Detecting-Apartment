<template>
	<view class="select_doctor">
		<date-selector ref="dateSelectorRef"/>
		<doctor-list ref="doctorListRef"/>
	</view>
</template>

<script setup lang="ts">
    import DateSelector from './components/Date-Selector.vue';
    import DoctorList from './components/Doctor-List.vue';
    import { onLoad } from '@dcloudio/uni-app';
    import { getCurrentMonth, getSevenDays } from './getDate';

    const dateSelectorRef = ref();
    const doctorListRef = ref();

    onMounted(() => {
        dateSelectorRef.value.deptInfo = {
            deptCode: uni.getStorageSync('deptCode'),
            deptName: uni.getStorageSync('deptName'),
        };

        const monthRes = getCurrentMonth();
        dateSelectorRef.value.monthInfo = monthRes;

        const selectorRes = getSevenDays();
        dateSelectorRef.value.selectorInfo = selectorRes;
    })
</script>

<style lang="scss" scoped>
	
</style>