<template>
  <view class="personal-info">
    <view class="container">
      <view class="left" @click="goToLogin">
        <image class="avatar" :src="loginStatus.avatar" mode="widthFix"></image>
        <view class="info"> {{ loginStatus.nickName }} </view>
      </view>
      <view class="right" @click="spreadCode">
        <image src="@/static/icon/qrcode.svg" mode="widthFix"></image>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { navigateTo } from "@/router/index";
import { getPatientInfoApi } from "@/apis/patient/index";

const loginStatus = ref({
  isLogin: false,
  avatar:
    uni.getStorageSync("avatar") || "../../static/icon/about/default-head.svg",
  nickName: uni.getStorageSync("nickName") || "点击登录支付宝账号",
});

onMounted(() => {
  if (uni.getStorageSync("token")) {
    loginStatus.value.isLogin = true;
  }
});

function goToLogin() {
  if (loginStatus.value.isLogin) {
    navigateTo("/pages/logout/index");
  } else {
    navigateTo("/pages/login/index");
  }
}

async function spreadCode() {
  try {
    const res: any = await getPatientInfoApi();
    const { name, idCard, birthday, phone, address, medicalCardNo } = res;
    navigateTo(
      `/pages/patient-management/patient-info/index?name=${name}&idCard=${idCard}&birthday=${birthday}&phone=${phone}&address=${address}&medicalCardNo=${medicalCardNo}`
    );
  } catch (err) {
    console.log(err);
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
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 150rpx;
        margin-right: 40rpx;
        border-radius: 50%;
      }

      .info {
        font-size: 32rpx;
      }
    }

    .right {
      image {
        width: 50rpx;
      }
    }
  }
}
</style>
