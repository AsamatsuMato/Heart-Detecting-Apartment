<template>
  <view class="Outpatient_Service">
    <view class="label">
      <view class="icon"></view>
      <text class="title">住院服务</text>
    </view>
    <view class="grid">
      <view class="grid_item">
        <image
          src="@/static/icon/inpatient-service/deposit-payment.png"
          mode="widthFix"
        ></image>
        <text>押金缴纳</text>
      </view>
      <view class="grid_item">
        <image
          src="@/static/icon/inpatient-service/admission-list.png"
          mode="widthFix"
        ></image>
        <text>住院日清单</text>
      </view>
      <view class="grid_item">
        <image
          src="@/static/icon/inpatient-service/deposit-record.png"
          mode="widthFix"
        ></image>
        <text>押金记录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.Outpatient_Service {
  margin: 50rpx 0;
  .label {
    margin: 20rpx 0;
    display: flex;
    align-items: center;

    .icon {
      background-color: #226bf3;
      width: 40rpx;
      height: 13rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
    }

    .title {
      font-size: 20px;
    }
  }

  .grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    font-size: 14px;

    .grid_item {
      height: 150rpx;
      padding: 10rpx 0;
      margin: 10rpx;
      display: flex;
      flex: 0 0 calc(25% - 25rpx);
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border: 0.5rpx solid #eaeaea;
      background-color: #fff;
      border-radius: 7rpx;
      box-shadow: 0rpx 0rpx 20rpx 10rpx #f5f9ff;

      image {
        width: 80rpx;
      }
    }
  }
}
</style>
