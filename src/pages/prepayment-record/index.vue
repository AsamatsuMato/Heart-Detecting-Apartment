<template>
  <view class="prepayment_record">
    <uni-swipe-action>
      <uni-swipe-action-item
        :right-options="options"
        class="item"
        v-for="item in recordList"
        :key="item.orderCode"
        @click="del($event, item.orderCode)"
      >
        <view class="row">
          <view class="label">预缴人:</view>
          <view class="value name">{{ item.nickName }}</view>
        </view>
        <view class="row">
          <view class="label">订单号:</view>
          <view class="value order_code">{{ item.orderCode }}</view>
        </view>
        <view class="row">
          <view class="label">订单时间:</view>
          <view class="value">{{ item.orderTime }}</view>
        </view>
        <view class="row">
          <view class="label">预缴金额:</view>
          <view class="value price">￥{{ item.amount }}</view>
        </view>
      </uni-swipe-action-item>
    </uni-swipe-action>
  </view>
</template>

<script setup lang="ts">
import {
  getPrepaymentRecordListApi,
  deletePrepaymentRecordApi,
} from "@/apis/prepayment/index";
import { onLoad } from "@dcloudio/uni-app";
import { type RecordListInter } from "./types";

const options = [
  {
    text: "删除",
    style: {
      backgroundColor: "#f56c6c",
    },
  },
];

onLoad(() => {
  getPrepaymentRecordList();
});

async function getPrepaymentRecordList() {
  try {
    const res: any = await getPrepaymentRecordListApi();
    recordList.value = res;
  } catch (err) {
    console.log(err);
  }
}

const recordList = ref<Array<RecordListInter>>([]);

async function del(_: any, orderCode: string) {
  try {
    await deletePrepaymentRecordApi(orderCode);
    uni.showToast({
      title: "删除成功",
    });
    recordList.value = recordList.value.filter((item: any) => {
      return orderCode !== item.orderCode;
    });
  } catch (err) {
    console.log(err);
  }
}
</script>

<style lang="scss" scoped>
.prepayment_record {
  padding: 20rpx;
  background-color: #f5f5f5;
  font-size: 30rpx;
  min-height: 97vh;

  :deep(.uni-swipe_box) {
    background-color: #fff;
    border-radius: 5px;
    padding: 30rpx 40rpx;
    margin-top: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 150rpx;

    .img {
      width: 100%;
      height: 40rpx;
      display: flex;
      justify-content: flex-end;
      image {
        width: 40rpx;
      }
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60rpx;

      .name {
        font-weight: bold;
      }

      .order_code {
        font-size: 24rpx;
      }

      .price {
        color: #f00;
        font-weight: bold;
      }
    }
  }
}
</style>
