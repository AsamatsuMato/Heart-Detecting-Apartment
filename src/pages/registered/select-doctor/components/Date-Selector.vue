<template>
  <view class="date_selector">
    <view class="date">
      <view>
        <text style="font-size: 35px; margin-right: 10rpx">{{
          currentMonth
        }}</text>
        <text>月</text>
      </view>
      <view style="font-size: 12px">
        {{ monthInfo.EnglishName }}
      </view>
    </view>
    <view class="selector">
      <view
        class="item"
        v-for="item in selectorInfo"
        :key="item.week"
        @click="handleSelect(item.week)"
      >
        <view>{{ item.week }}</view>
        <view class="btn" :class="item.isActive ? 'active' : ''">{{
          item.date
        }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { type SelectorInfoInter } from "./types";
import $bus from "@/bus/index";

const monthInfo = ref({
  currentMonth: 0,
  EnglishName: "",
});

const currentMonth = computed(() => {
  return `${monthInfo.value.currentMonth < 10 ? "0" : ""}${
    monthInfo.value.currentMonth
  }`;
});

const selectorInfo = ref<Array<SelectorInfoInter>>([]);

function handleSelect(params: string) {
  selectorInfo.value.forEach((item: SelectorInfoInter) => {
    if (item.week === params) {
      item.isActive = true;
    } else {
      item.isActive = false;
    }
  });
}

watch(
  () => selectorInfo,
  (newVal) => {
    nextTick(() => {
      newVal.value.forEach((item: SelectorInfoInter) => {
        if (item.isActive) {
          $bus.emit("dateSelect", item.completeDate);
        }
      });
    });
  },
  { deep: true },
);

defineExpose({
  monthInfo,
  selectorInfo,
});
</script>

<style lang="scss" scoped>
.date_selector {
  display: flex;
  padding: 40rpx 20rpx;
  margin: 20rpx 0;
  background-color: #fff;

  .date {
    color: #3e8bfb;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .selector {
    display: flex;
    flex: 1;
    justify-content: space-evenly;

    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .btn {
        border-radius: 5px;
        width: 40rpx;
        height: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .active {
        background-color: #226bf3;
        color: #fff;
      }
    }
  }
}
</style>
