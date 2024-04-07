<template>
  <view class="reg_result">
    <view class="reg_status_info">
      <image src="@/static/icon/reg-result/success.svg" mode="widthFix"></image>
      <view class="status">{{ title }}</view>
      <view class="extra" v-html="content"></view>
    </view>
    <custom-button :content="mainButtonMessage"></custom-button>
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
import CustomButton from "../Custom-Button/index.vue";

const props = defineProps({
  title: {
    type: String,
    default: "成功",
  },
  content: {
    type: String,
    default: "",
  },
  mainButtonMessage: {
    type: String,
    default: "查看详情",
  },
});

function backToHome() {
  uni.reLaunch({
    url: "/pages/home/index",
  });
}
</script>

<style lang="scss" scoped>
.reg_result {
  padding: 100rpx 20rpx;
  color: #313131;

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
      font-weight: bold;
    }

    .extra {
      font-size: 28rpx;
      margin: 0 40rpx;
      text-align: center;
    }
  }

  :deep(.custom_button) {
    margin-bottom: 20rpx;
  }
}
</style>
