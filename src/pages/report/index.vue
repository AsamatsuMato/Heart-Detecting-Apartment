<template>
  <view class="report">
    <view class="item" v-for="item in reportList" :key="item.phyExaCode">
      <view class="nav">
        <image
          class="logo"
          :src="`${url_config}${hospitalInfo.logo}`"
          mode="widthFix"
        ></image>
        <text>{{ hospitalInfo.name }}</text>
      </view>
      <view
        class="status"
        v-for="status in statusList"
        :style="{ color: status.color }"
      >
        <template v-if="item.status === status.key">
          {{ status.value }}
        </template>
      </view>
      <view class="content">
        <view class="content_left">
          <view class="package_name">{{ item.packageName }}</view>
          <view class="name">
            <text>体&nbsp;&nbsp;检&nbsp;&nbsp;人:</text>
            <text>{{ item.name }}</text>
          </view>
          <view class="date">
            <text>体检时间:</text>
            <text>{{ item.date }}</text>
          </view>
        </view>
        <view class="content_right">
          <button
            v-if="item.status === 1 || item.status === 2"
            @click="goToPay(item.phyExaCode)"
          >
            查看详情
          </button>
          <button v-if="item.status === 3" @click="viewReport(item.reportUrl)">
            查看报告
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { url_config } from "@/apis/config";
import { onLoad } from "@dcloudio/uni-app";
import { getReservedListApi } from "@/apis/physicalExamination/index";
import { getRegStatusListApi } from "@/apis/registered/index";
import { getHospitalInfoApi } from "@/apis/hospital/index";
import { navigateTo } from "@/router";
import { type ReportListInter } from "./types";

onLoad(async () => {
  await getHospitalInfo();
  await getRegStatusList();
  getReservedList();
});

async function getReservedList() {
  try {
    const res: any = await getReservedListApi();
    reportList.value = res;
  } catch (err) {
    console.log(err);
  }
}

let statusList: Array<any> = [];
async function getRegStatusList() {
  try {
    statusList = (await getRegStatusListApi()) as any;
  } catch (err) {
    console.log(err);
  }
}

const hospitalInfo = ref<any>({
  logo: "",
  name: "",
  phone: "",
  location: "",
  introduce: "",
});
async function getHospitalInfo() {
  const res: any = await getHospitalInfoApi();
  hospitalInfo.value = res;
}

const reportList = ref<Array<ReportListInter>>([]);

function goToPay(phyExaCode: string) {
  navigateTo(
    `/pages/physical-examination/result/index?phyExaCode=${phyExaCode}&flag=1`
  );
}

function viewReport(url: string) {
  uni.downloadFile({
    url: `${url_config}${url}`,
    success: (res) => {
      let tempFilePath = res.tempFilePath;
      uni.saveFile({
        tempFilePath,
        success: (res) => {
          let filePath = res.savedFilePath;
          uni.openDocument({
            filePath,
            showMenu: true,
            fail: (err) => {
              console.log(err);
            },
          });
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
    fail: (err) => {
      console.log(err);
    },
  });
}
</script>

<style lang="scss" scoped>
.report {
  min-height: 100vh;
  padding: 20rpx;
  background-color: #f6f6f6;

  .item {
    padding: 80rpx 40rpx 30rpx;
    margin-bottom: 20rpx;
    border-radius: 5px;
    background-color: #fff;
    height: 150rpx;
    position: relative;

    .nav {
      width: 200rpx;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #f7fbff;
      color: #666;
      padding: 10rpx 0;
      border-bottom-right-radius: 10px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      font-size: 28rpx;

      image {
        width: 50rpx;
        border-radius: 50%;
      }
    }

    .status {
      position: absolute;
      top: 20rpx;
      right: 40rpx;
    }

    .content {
      display: flex;
      justify-content: space-between;
      height: 100%;

      .content_left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .package_name {
          font-weight: bold;
          font-size: 34rpx;
        }

        .name,
        .date {
          font-size: 30rpx;
          text:nth-child(1) {
            color: #999999;
            margin-right: 20rpx;
          }
        }
      }

      .content_right {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;

        button {
          padding: 20rpx;
          width: 175rpx;
          height: 75rpx;
          font-size: 30rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #7b81ff;
          border-color: #7b81ff;
          color: #fff;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
