<template>
  <view class="personal-info">
    <view class="container" @click="goToLogin">
      <image class="avatar" :src="loginStatus.avatar" mode="widthFix"></image>
      <view class="info"> {{ loginStatus.nickName }} </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const loginStatus = ref({
  isLogin: false,
  avatar:
    uni.getStorageSync("avatar") || "../../static/icon/about/default-head.svg",
  nickName: uni.getStorageSync("nickName") || "点击登录支付宝账号",
});

onMounted(() => {
  if (uni.getStorageSync("avatar") || uni.getStorageSync("nickName")) {
    loginStatus.value.isLogin = true;
  }
});

function goToLogin() {
  if (loginStatus.value.isLogin) {
    uni.navigateTo({
      url: "/pages/logout/index",
    });
  } else {
    uni.navigateTo({
      url: "/pages/login/index",
    });
  }
}
</script>

<style lang="scss" scoped>
.personal-info {
  padding: 40rpx 20rpx;
  background: #226bf3;
  height: 200rpx;

  .container {
    display: flex;
    align-items: center;
    color: #fff;

    .avatar {
      width: 150rpx;
      margin-right: 40rpx;
      border-radius: 50%;
    }

    .info {
      font-size: 32rpx;
    }
  }
}
</style>
