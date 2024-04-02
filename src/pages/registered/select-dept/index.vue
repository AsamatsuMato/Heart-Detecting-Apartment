<template>
  <view class="select_dept">
    <scroll-view scroll-y="true" class="left">
      <view class="item">就诊科室</view>
    </scroll-view>
    <scroll-view scroll-y="true" class="right">
      <view
        class="item"
        v-for="item in deptList"
        :key="item.deptCode"
        @click="goToSelectDoc(item)"
        >{{ item.deptName }}</view
      >
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { navigateTo } from "@/router/index";
import { getDepartmentListApi } from "@/apis/registered/index";
import { onLoad } from "@dcloudio/uni-app";

onLoad(() => {
  getDepartmentList();
});

async function getDepartmentList() {
  try {
    const res: any = await getDepartmentListApi();
    deptList.value = res;
  } catch (err) {
    console.log(err);
  }
}

interface DeptListInter {
  deptCode: string;
  deptName: string;
}
const deptList = ref<Array<DeptListInter>>([]);

function goToSelectDoc(params: DeptListInter) {
  const { deptCode } = params;
  navigateTo(`/pages/registered/select-doctor/index?deptCode=${deptCode}`);
}
</script>

<style lang="scss" scoped>
.select_dept {
  display: flex;

  .left {
    width: 30vw;
    height: 100vh;
    background-color: #fff;
    font-weight: bold;

    .item {
      height: 130rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #4186fb;
      background-color: #fafafa;
      gap: 10px;
      flex-direction: row;
      box-shadow: inset -5rpx 5rpx 10rpx rgba(148, 148, 148, 0.25);
      background: #fafafa;
      flex: none;
      order: 0;
      flex-grow: 0;
    }
  }

  .right {
    width: 70vw;
    height: 100vh;
    background-color: #fafafa;

    .item {
      height: 130rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1rpx solid #f4f4f4;
      background-color: #fafafa;
    }
  }
}
</style>
