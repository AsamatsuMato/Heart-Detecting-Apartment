<template>
  <view class="physical_examinations">
    <view
      class="item"
      v-for="item in packageList"
      :key="item.packageCode"
      @click="goToPackageDetails(item.packageCode)"
    >
      <view class="left">
        <view class="name">{{ item.packageName }}</view>
        <view class="tags">
          <text class="tag" v-for="(tag, index) in item.tags" :key="index">{{
            tag
          }}</text>
        </view>
        <view class="intro">{{ item.packageIntro }}</view>
      </view>
      <view class="right">
        <view class="original_price">￥{{ item.originalPrice }}</view>
        <view class="preferential_price">￥{{ item.preferentialPrice }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { getPhysicalExaminationListApi } from "@/apis/physicalExamination/index";
import { type PackageListInter } from "./types";
import { navigateTo } from "@/router/index";

onLoad(() => {
  getPhysicalExaminationList();
});

async function getPhysicalExaminationList() {
  try {
    const res: any = await getPhysicalExaminationListApi();
    packageList.value = res;
  } catch (err) {
    console.log(err);
  }
}

const packageList = ref<Array<PackageListInter>>([]);

function goToPackageDetails(params: string) {
  navigateTo(
    `/pages/physical-examination/package-details/index?packageCode=${params}`
  );
}
</script>

<style lang="scss" scoped>
.physical_examinations {
  padding: 20rpx;
  background: linear-gradient(to bottom, #7b81ff, #f2f3ff 50vh);
  font-size: 30rpx;
  min-height: 97vh;

  .item {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20rpx;

    .left,
    .right {
      display: flex;
      flex-direction: column;

      view {
        height: 60rpx;
        display: flex;
        align-items: center;
      }
    }

    .left {
      .name {
        font-size: 36rpx;
        font-weight: bold;
      }

      .tag {
        padding: 5rpx 10rpx;
        color: #7b81ff;
        margin-right: 10rpx;
        border-radius: 5rpx;
        background: rgba($color: #7b81ff, $alpha: 0.1);
        font-size: 20rpx;
      }

      .intro {
        font-size: 28rpx;
      }
    }

    .right {
      .original_price {
        justify-content: flex-end;
        font-size: 26rpx;
        color: #999;
        text-decoration: line-through;
      }

      .preferential_price {
        justify-content: flex-end;
        font-size: 36rpx;
        color: #7b81ff;
        font-weight: bold;
      }
    }
  }
}
</style>
