<template>
  <view class="dialysis_prepayment">
    <view class="info">
      <view class="card_no">
        <text>就诊卡号:</text>
        <text>{{ userInfo.medicalCardNo }}</text>
      </view>
      <view class="balance">
        <text>卡内余额</text>
        <text>￥{{ userInfo.balance }}</text>
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
        <text>￥{{ item.value }}</text>
      </view>
      <view
        class="item"
        :class="isDiy ? 'active' : ''"
        @click="selectAmount(6)"
      >
        <text v-if="!isDiy">自定义</text>
        <input
          v-else
          type="number"
          maxlength="8"
          focus
          v-model.number="diyAmount"
        />
      </view>
    </view>
    <custom-button content="确认缴费" @click="pwdDrawer = true" />
    <custom-button
      content="设置支付密码"
      background="#E5F0FE"
      border="1rpx solid #CFD8E5"
      color="#226BF3"
      @click="settingDrawer = true"
    />
  </view>
  <view class="pwd_drawer">
    <Drawer v-model="pwdDrawer" :height="350">
      <template #title>
        <text>透析预缴</text>
      </template>
      <template #content>
        <view class="tip">
          <text>请输入支付密码</text>
          <image
            v-if="!isShowPwd"
            src="@/static/icon/eyes/eye-false.svg"
            mode="widthFix"
            @click="changePwdStatus"
          ></image>
          <image
            v-else
            src="@/static/icon/eyes/eye-true.svg"
            mode="widthFix"
            @click="changePwdStatus"
          ></image>
        </view>
        <pwd-input
          v-model="password"
          :show-val="isShowPwd"
          @confirm="confirmPayment"
        />
      </template>
    </Drawer>
  </view>
  <view class="pwd_drawer">
    <Drawer v-model="settingDrawer" :height="350">
      <template #title>
        <text>设置密码</text>
      </template>
      <template #content>
        <view class="tip">
          <text>请设置您的支付密码</text>
          <image
            v-if="!settingIsShowPwd"
            src="@/static/icon/eyes/eye-false.svg"
            mode="widthFix"
            @click="changeSettingPwdStatus"
          ></image>
          <image
            v-else
            src="@/static/icon/eyes/eye-true.svg"
            mode="widthFix"
            @click="changeSettingPwdStatus"
          ></image>
        </view>
        <pwd-input
          v-model="settingPassword"
          :show-val="settingIsShowPwd"
          @confirm="confirmSetting"
        />
      </template>
    </Drawer>
  </view>
</template>

<script setup lang="ts">
import CustomButton from "@/components/Custom-Button/index.vue";
import { dialysisPrepaymentApi } from "@/apis/prepayment/index";
import { settingPaymentPwdApi } from "@/apis/user/index";
import { getUserInfoApi } from "@/apis/user/index";
import { onLoad } from "@dcloudio/uni-app";
import Drawer from "@/components/Drawer/index.vue";
import PwdInput from "@/components/PwdInput/index.vue";
import { encrypt } from "@/utils/cryptoEncipher";

const pwdDrawer = ref(false);
const password = ref("");
const isShowPwd = ref(false);

function changePwdStatus() {
  isShowPwd.value = !isShowPwd.value;
}

const settingDrawer = ref(false);
const settingPassword = ref("");
const settingIsShowPwd = ref(false);

function changeSettingPwdStatus() {
  settingIsShowPwd.value = !settingIsShowPwd.value;
}
onLoad(() => {
  getUserInfo();
});

const userInfo = ref({
  medicalCardNo: uni.getStorageSync("medicalCardNo"),
  balance: 0,
});

async function getUserInfo() {
  try {
    const res: any = await getUserInfoApi();
    userInfo.value.balance = res.balance;
  } catch (err) {
    console.log(err);
  }
}

const amountList = ref([
  {
    id: 1,
    value: 50,
    isActive: true,
  },
  {
    id: 2,
    value: 100,
    isActive: false,
  },
  {
    id: 3,
    value: 200,
    isActive: false,
  },
  {
    id: 4,
    value: 500,
    isActive: false,
  },
  {
    id: 5,
    value: 1000,
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

async function confirmPayment() {
  if (isDiy.value) {
    if (diyAmount.value) {
      dialysisPrepayment(diyAmount.value);
    } else {
      uni.showToast({
        title: "请输入金额",
        icon: "fail",
      });
    }
  } else {
    amountList.value.forEach(async (item: any) => {
      if (item.isActive) {
        dialysisPrepayment(item.value);
      }
    });
  }
}

async function dialysisPrepayment(rechargeAmount: number) {
  const data = {
    rechargeAmount,
    paymentPwd: password.value,
  };
  try {
    await dialysisPrepaymentApi(data);
    uni.redirectTo({
      url: "/pages/dialysis-prepayment/index",
    });
    uni.showToast({
      title: "预缴费成功",
    });
  } catch (err) {
    console.log(err);
  }
}

async function confirmSetting() {
  try {
    await settingPaymentPwdApi(encrypt(settingPassword.value));
    uni.redirectTo({
      url: "/pages/dialysis-prepayment/index",
    });
    uni.showToast({
      title: "支付密码设置成功",
    });
  } catch (err) {
    console.log(err);
  }
}
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
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card_no {
      text:nth-child(1) {
        margin-right: 20rpx;
      }
    }

    .balance {
      background-color: #f2f2f2;

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
    margin: 20rpx 0 100rpx;

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

  :deep(.custom_button) {
    margin-bottom: 40rpx;
  }
}

.pwd_drawer {
  :deep(.drawer) {
    .title {
      padding: 20rpx 0;
    }

    .content {
      flex-direction: column;
      font-size: 28rpx;

      .tip {
        display: flex;
        justify-content: center;
        align-items: center;

        text {
          margin-right: 50rpx;
        }

        image {
          width: 30rpx;
        }
      }
    }
  }
}
</style>
