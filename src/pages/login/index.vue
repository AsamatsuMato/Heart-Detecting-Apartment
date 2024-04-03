<template>
  <view class="login">
    <view class="content">
      <view class="top">
        <image
          class="logo"
          src="@/static/images/logo.jpg"
          mode="widthFix"
        ></image>
        <view class="name">心检寓</view>
      </view>
      <view class="bottom">
        <button
          open-type="getAuthorize"
          scope="userInfo"
          @GetAuthorize="getUserInfo"
        >
          支付宝一键登录
        </button>
        <view class="back" @click="back">返回</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { authorizedAccessTokenApi } from "@/apis/login/index";
function getUserInfo() {
  my.getAuthCode({
    scopes: "auth_user",
    success: async (res: any) => {
      const data = {
        authCode: res.authCode,
      };
      const { avatar, nickName, token, medicalCardNo }: any =
        await authorizedAccessTokenApi(data);
      my.setStorageSync({ key: "avatar", data: avatar });
      my.setStorageSync({ key: "nickName", data: nickName });
      my.setStorageSync({ key: "token", data: token });
      if (medicalCardNo) {
        my.setStorageSync({ key: "medicalCardNo", data: medicalCardNo });
      }
      uni.reLaunch({
        url: "/pages/about/index",
      });
    },
    fail: (err: any) => {
      console.log(err);
    },
  });
}

function back() {
  uni.navigateBack();
}
</script>

<style lang="scss" scoped>
.login {
  padding: 20rpx;
  font-size: 30rpx;
  background-color: #f5f5f5;
  min-height: 97vh;

  .content {
    background-color: #fff;
    border-radius: 7rpx;
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 50rpx 50rpx 200rpx;

    .top {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 150rpx;
        border-radius: 50%;
        margin-bottom: 30rpx;
      }
    }

    .bottom {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      button {
        background-color: #226bf3;
        color: #fff;
        border-radius: 50rpx;
        width: 100%;
        margin-bottom: 50rpx;
      }

      .back {
        color: #226bf3;
      }
    }
  }
}
</style>
