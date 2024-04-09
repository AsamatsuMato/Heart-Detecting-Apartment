<template>
  <view class="registration_record">
    <view
      class="item"
      v-for="item in recordList"
      :key="item.regCode"
      @click="goToDetails(item.regCode)"
    >
      <view class="nav">
        <view class="left">
          <text>{{ item.deptName }}</text>
          <text>{{ item.docName }}</text>
        </view>
        <view class="right">
          <view v-for="status in statusList" :style="{ color: status.color }">
            <template v-if="item.status === status.key">
              {{ status.value }}
            </template>
          </view>
        </view>
      </view>
      <view class="content">
        <view class="line">
          <text>就诊科室</text>
          <text>{{ item.deptName }}</text>
        </view>
        <view class="line">
          <text>就诊时间</text>
          <text>{{ item.date }} {{ item.timePeriod }}</text>
        </view>
        <view class="line">
          <text>就&nbsp;&nbsp;诊&nbsp;&nbsp;人</text>
          <text>{{ item.patientName }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  getRegisteredRecordApi,
  getRegStatusListApi,
} from "@/apis/registered/index";
import { onLoad } from "@dcloudio/uni-app";
import { type RecordListInter } from "./types";
import { navigateTo } from "@/router/index";

onLoad(async () => {
  await getRegStatusList();
  await getRegisteredRecord();
});

async function getRegStatusList() {
  try {
    statusList = (await getRegStatusListApi()) as any;
  } catch (err) {
    console.log(err);
  }
}

async function getRegisteredRecord() {
  const data = {
    medicalCardNo: uni.getStorageSync("medicalCardNo"),
  };
  try {
    recordList.value = (await getRegisteredRecordApi(data)) as any;
  } catch (err) {
    console.log(err);
  }
}

let statusList: Array<any> = [];
const recordList = ref<Array<RecordListInter>>([]);

function goToDetails(regCode: string) {
  navigateTo(
    `/pages/registration-record/record-details/index?regCode=${regCode}`
  );
}
</script>

<style lang="scss" scoped>
.registration_record {
  padding: 20rpx;
  background-color: #f5f5f5;
  font-size: 28rpx;
  min-height: 97vh;

  .item {
    background-color: #fff;
    border-radius: 5px;
    padding: 0 40rpx;
    margin-bottom: 20rpx;

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1rpx solid #cdcdcd;
      height: 100rpx;

      .left {
        text:nth-child(1) {
          margin-right: 20rpx;
        }
      }

      .right {
        color: #999;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      height: 250rpx;
      justify-content: space-evenly;

      .line {
        text:nth-child(1) {
          margin-right: 20rpx;
          color: #999;
        }
      }
    }
  }
}
</style>
