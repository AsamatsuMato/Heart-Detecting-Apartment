<template>
  <view class="logout">
    <view class="content">
      <view class="item">
        <view class="label">头像</view>
        <image :src="userInfo.avatar" mode="widthFix"></image>
      </view>
      <view class="item">
        <view class="label">用户名</view>
        <view class="value">{{ userInfo.nickName }}</view>
      </view>
      <view class="item">
        <view class="label">就诊卡号</view>
        <view class="value">012937808123</view>
      </view>
    </view>
    <button @click="logout">退出登录</button>
  </view>
</template>

<script setup lang="ts">
const userInfo = ref({
  avatar: uni.getStorageSync("avatar"),
  nickName: uni.getStorageSync("nickName"),
});

function logout() {
  uni.showModal({
    title: "提示",
    content: "是否退出登录",
    success: (res: any) => {
      if (res.confirm) {
        uni.removeStorageSync("avatar");
        uni.removeStorageSync("nickName");
        uni.navigateTo({
          url: "/pages/about/index",
        });
      }
    },
  });
}
</script>

<style lang="scss" scoped>
.logout {
  padding: 20rpx;
  font-size: 30rpx;
  background-color: #f5f5f5;
  min-height: 97vh;

  .content {
    background-color: #fff;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    margin-bottom: 50rpx;

    .item {
      height: 150rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20rpx;

      image {
        width: 80rpx;
        border-radius: 50%;
      }
    }
  }

  button {
    background-color: #226bf3;
    color: #fff;
    border-radius: 50rpx;
  }
}
</style>
