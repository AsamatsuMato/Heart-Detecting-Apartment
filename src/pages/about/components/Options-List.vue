<template>
  <view class="options-list">
    <view class="item">
      <view class="item_left">
        <image
          src="@/static/icon/outpatient-service/patient-management.png"
          mode="widthFix"
        ></image>
        <text>管理就诊人</text>
      </view>
      <view class="item_right">
        <image
          src="@/static/icon/about/arrow-right.svg"
          mode="widthFix"
        ></image>
      </view>
    </view>
    <view class="item">
      <view class="item_left">
        <image
          src="@/static/icon/outpatient-service/registration-record.png"
          mode="widthFix"
        ></image>
        <text>预约挂号记录</text>
      </view>
      <view class="item_right">
        <image
          src="@/static/icon/about/arrow-right.svg"
          mode="widthFix"
        ></image>
      </view>
    </view>
    <view class="item">
      <view class="item_left">
        <image
          src="@/static/icon/outpatient-service/payment-record.png"
          mode="widthFix"
        ></image>
        <text>门诊缴费记录</text>
      </view>
      <view class="item_right">
        <image
          src="@/static/icon/about/arrow-right.svg"
          mode="widthFix"
        ></image>
      </view>
    </view>
    <view class="item">
      <view class="item_left">
        <image
          src="@/static/icon/inpatient-service/deposit-record.png"
          mode="widthFix"
        ></image>
        <text>住院缴费记录</text>
      </view>
      <view class="item_right">
        <image
          src="@/static/icon/about/arrow-right.svg"
          mode="widthFix"
        ></image>
      </view>
    </view>
    <view class="item">
      <view class="item_left">
        <image
          src="@/static/icon/about/my-collection.png"
          mode="widthFix"
        ></image>
        <text>我的收藏</text>
      </view>
      <view class="item_right">
        <image
          src="@/static/icon/about/arrow-right.svg"
          mode="widthFix"
        ></image>
      </view>
    </view>
    <view class="item">
      <view class="item_left">
        <image
          src="@/static/icon/about/satisfaction-survey.png"
          mode="widthFix"
        ></image>
        <text>满意度调查</text>
      </view>
      <view class="item_right">
        <image
          src="@/static/icon/about/arrow-right.svg"
          mode="widthFix"
        ></image>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.options-list {
  border: 1rpx solid #d7d7d7;
  border-radius: 20rpx;
  margin: -50rpx 20rpx 50rpx 20rpx;
  background-color: #fff;

  .item {
    padding: 20rpx 30rpx;
    border-bottom: 1rpx solid #d7d7d7;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item_left {
      display: flex;
      align-items: center;
      image {
        width: 80rpx;
        margin-right: 30rpx;
      }
    }

    .item_right {
      image {
        width: 20rpx;
      }
    }

    &:nth-last-of-type(1) {
      border: none;
    }
  }
}
</style>
