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

    // 先用 onLoad 方法获取 query 参数
    const deptInfo = ref();
    onLoad((option: any) => {
        deptInfo.value = option;
    })

    // 在页面全部挂载后再进行数据的传输
    onMounted(() => {
        dateSelectorRef.value.deptInfo = deptInfo.value;

        const monthRes = getCurrentMonth();
        dateSelectorRef.value.monthInfo = monthRes;

        const selectorRes = getSevenDays();
        dateSelectorRef.value.selectorInfo = selectorRes;
    })
</script>

<style lang="scss" scoped>
	
</style>