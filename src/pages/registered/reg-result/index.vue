<template>
  <view class="reg_result">
    <view class="reg_status_info">
      <image src="@/static/icon/reg-result/success.svg" mode="widthFix"></image>
      <view class="status">预约成功</view>
      <view class="extra">您已预约成功，请您持本人身份证按时就诊</view>
      <view class="extra">到院就诊时请先到自助机取号排队</view>
    </view>
    <custom-button content="查看预约详情"></custom-button>
    <custom-button
      content="返回首页"
      @click="backToHome"
      background="#E5F0FE"
      border="1rpx solid #CFD8E5"
      color="#226BF3"
    ></custom-button>
  </view>
</template>

<script setup lang="ts">
import CustomButton from "@/components/Custom-Button/index.vue";

function backToHome() {
  uni.reLaunch({
    url: "/pages/home/index",
  });
}
</script>

<style lang="scss" scoped>
.reg_result {
  padding: 100rpx 20rpx;

  .reg_status_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 400rpx;
    margin-bottom: 100rpx;

    image {
      width: 200rpx;
    }

    .status {
      font-size: 40rpx;
    }

    .extra {
      font-size: 36rpx;
      color: #aaa;
    }
  }

  :deep(.custom_button) {
    margin-bottom: 20rpx;
  }
}
</style>
