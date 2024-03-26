<template>
  <view class="dialysis_prepayment">
    <view class="info">
      <view class="card_no">
        <text>就诊卡号:</text>
        <text>78013743123</text>
      </view>
      <view class="balance">
        <text>卡内余额</text>
        <text>￥0</text>
      </view>
    </view>
    <view class="label">在线充值</view>
    <view class="content">
      <view
        class="item"
        :class="item.isActive ? 'active' : ''"
        v-for="item in amountList"
        :key="item.id"
        @click="selectAmount(item.id)"
      >
        <text>{{ item.value }}</text>
      </view>
      <view
        class="item"
        :class="isDiy ? 'active' : ''"
        @click="selectAmount(6)"
      >
        <text v-if="!isDiy">自定义</text>
        <input v-else type="number" maxlength="8" focus v-model="diyAmount" />
      </view>
    </view>
    <custom-button content="确认缴费" />
  </view>
</template>

<script setup lang="ts">
import CustomButton from "@/components/Custom-Button";
const amountList = ref([
  {
    id: 1,
    value: "￥50",
    isActive: false,
  },
  {
    id: 2,
    value: "￥100",
    isActive: false,
  },
  {
    id: 3,
    value: "￥200",
    isActive: false,
  },
  {
    id: 4,
    value: "￥500",
    isActive: false,
  },
  {
    id: 5,
    value: "￥1000",
    isActive: false,
  },
]);

function selectAmount(params: number) {
  diyAmount.value = undefined;
  if (params !== 6) {
    isDiy.value = false;
    amountList.value.forEach((item: any) => {
      if (item.id === params) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });
  } else {
    isDiy.value = true;
    amountList.value.forEach((item: any) => {
      item.isActive = false;
    });
  }
}

const diyAmount = ref(undefined);
const isDiy = ref(false);
</script>

<style lang="scss" scoped>
.dialysis_prepayment {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 97vh;
  font-size: 30rpx;

  .info {
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    height: 180rpx;
    padding: 1px;
    margin: 50rpx 0;

    .card_no,
    .balance {
      flex: 1;
      padding: 0 40rpx;
      border-radius: 5px;
    }

    .card_no {
      display: flex;
      align-items: center;

      text:nth-child(1) {
        margin-right: 20rpx;
      }
    }

    .balance {
      background-color: #f2f2f2;
      display: flex;
      justify-content: space-between;
      align-items: center;

      text:nth-child(2) {
        color: #ee0509;
      }
    }
  }

  .label {
    font-weight: bold;
    font-size: 36rpx;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 20rpx 0;

    .item {
      flex: 0 0 calc(33.3% - 20rpx);
      margin: 10rpx;
      border-radius: 5px;
      background-color: #fff;
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1rpx solid #fff;

      input {
        color: #226bf3;
        text-align: center;
        background-color: #dce7f6;
      }
    }

    .active {
      background-color: #dce7f6;
      border-color: #226bf3;
      color: #226bf3;
    }
  }
}
</style>
