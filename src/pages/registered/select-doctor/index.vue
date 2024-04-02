<template>
  <view class="select_doctor">
    <date-selector ref="dateSelectorRef" />
    <doctor-list ref="doctorListRef" />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import DateSelector from "./components/Date-Selector.vue";
import DoctorList from "./components/Doctor-List.vue";
import { getCurrentMonth, getSevenDays } from "./getDate";

const dateSelectorRef = ref();
const doctorListRef = ref();

onLoad((option: any) => {
  nextTick(() => {
    doctorListRef.value.deptCode = option.deptCode;

    const monthRes = getCurrentMonth();
    dateSelectorRef.value.monthInfo = monthRes;

    const selectorRes = getSevenDays();
    dateSelectorRef.value.selectorInfo = selectorRes;
  });
});
</script>

<style lang="scss" scoped>
.select_doctor {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
