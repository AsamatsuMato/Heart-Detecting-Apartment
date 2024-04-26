<template>
  <view class="container">
    <view class="content">
      <view class="success" v-if="flag === '1'">
        <text class="submit_time">
          {{ detailsInfo.appointmentTime }}
        </text>
        <image
          class="mar"
          src="@/static/icon/reg-result/success.svg"
          mode="widthFix"
        ></image>
        <text class="status mar">预约成功</text>
        <text class="tips mar">请将此信息二维码出示给工作人员录入</text>
        <tki-qrcode
          ref="qrcode"
          :val="detailsInfo.idCard"
          :onval="true"
          :iconSize="40"
          :size="400"
          unit="rpx"
        />
        <view class="user_info">
          <view class="title"> 体检人信息 </view>
          <view class="item">
            <text class="item_title">姓名</text>
            <text>{{ detailsInfo.name }}</text>
          </view>
          <view class="item">
            <text class="item_title">身份证号码</text>
            <text>{{
              detailsInfo.idCard.replace(
                /^(.{4})(?:\d+)(.{4})$/,
                "$1**********$2"
              )
            }}</text>
          </view>
          <view class="item">
            <text class="item_title">套餐名称</text>
            <text>{{ detailsInfo.packageName }}</text>
          </view>
        </view>
      </view>
    </view>
    <custom-button
      content="缴 费"
      @click="pwdDrawer = true"
      v-if="detailsInfo.status === 1"
      background="#7b81ff"
      border="1rpx solid #7b81ff"
    ></custom-button>
    <custom-button
      content="取 消 预 约"
      v-if="detailsInfo.status === 1"
      background="#F4F4FF"
      border="1rpx solid #7b81ff"
      color="#7b81ff"
      @click="cancelPhyExaAppointment"
    ></custom-button>
  </view>
  <view class="pwd_drawer">
    <Drawer v-model="pwdDrawer" :height="350">
      <template #title>
        <text>体检缴费</text>
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
</template>

<script lang="ts" setup>
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
import Drawer from "@/components/Drawer/index.vue";
import PwdInput from "@/components/PwdInput/index.vue";
import CustomButton from "@/components/Custom-Button/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import {
  getReservedDetailsApi,
  phyExaPaymentApi,
  cancelPhyExaAppointmentApi,
} from "@/apis/physicalExamination/index";
import { reLaunch } from "@/router";
import { encrypt } from "@/utils/cryptoEncipher";

const phyExaCode = ref("");
const flag = ref("");

const pwdDrawer = ref(false);
const password = ref("");
const isShowPwd = ref(false);

function changePwdStatus() {
  isShowPwd.value = !isShowPwd.value;
}

async function confirmPayment() {
  const data = {
    phyExaCode: phyExaCode.value,
    price: detailsInfo.value.price,
    paymentPwd: encrypt(password.value),
  };
  try {
    await phyExaPaymentApi(data);
    reLaunch("/pages/home/index");
    uni.showToast({
      title: "缴费成功",
      icon: "success",
    });
  } catch (err) {
    console.log(err);
  }
}

const qrcode = ref();

onLoad((option: any) => {
  phyExaCode.value = option.phyExaCode;
  flag.value = option.flag;
  getReservedDetails();
});

const detailsInfo = ref({
  allergicHistoryContent: "",
  appointmentTime: "",
  birthPlace: "",
  birthday: "",
  date: "",
  gender: undefined,
  idCard: "",
  maritalStatus: undefined,
  name: "",
  packageCode: "",
  packageName: "",
  pastMedicalHistoryContent: "",
  phone: "",
  phyExaCode: "",
  price: undefined,
  status: undefined,
});

async function getReservedDetails() {
  try {
    const res: any = await getReservedDetailsApi(phyExaCode.value);
    detailsInfo.value = res;
    nextTick(() => {
      qrcode.value._makeCode();
    });
  } catch (err) {
    console.log(err);
  }
}

function cancelPhyExaAppointment() {
  uni.showModal({
    title: "提示",
    content: "是否取消预约",
    success: async (res: any) => {
      if (res.confirm) {
        const { packageCode, phyExaCode, date } = detailsInfo.value;
        const data = {
          packageCode,
          phyExaCode,
          date,
        };
        try {
          await cancelPhyExaAppointmentApi(data);
          reLaunch("/pages/home/index");
          uni.showToast({
            title: "取消预约成功",
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
  });
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx 20rpx;
  background: linear-gradient(to bottom, #7b81ff, #f2f3ff 50vh);
  min-height: 97vh;

  .content {
    border-radius: 10rpx;
    background-color: #fff;
    padding: 40rpx;
    position: relative;

    .success,
    .fail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

    .submit_time {
      padding: 10rpx 20rpx;
      color: #7b81ff;
      background: rgba($color: #7b81ff, $alpha: 0.1);
      border-radius: 10rpx;
      align-self: flex-start;
      font-size: 28upx;
    }

    image {
      width: 150rpx;
      height: 150rpx;
    }

    .status {
      font-weight: bold;
      font-size: 40upx;
    }

    .tips {
      color: #666;
      font-size: 28upx;
    }

    :deep(.tki-qrcode) {
      margin: 20rpx 0;
    }

    .user_info {
      background-color: #f9f9f9;
      padding: 0 30rpx;
      margin-top: 25rpx;
      align-self: stretch;

      view {
        border-bottom: 1rpx solid #e7e7e7;
        padding: 30rpx 0;
        display: flex;
        align-items: center;
        font-size: 34upx;

        &:nth-last-child(1) {
          border: none;
        }
      }

      .title {
        font-weight: bold;
      }

      .item {
        display: flex;
        justify-content: space-between;

        .item_title {
          color: #585858;
        }
      }
    }

    .mar {
      margin: 10rpx 0;
    }
  }

  :deep(.custom_button) {
    margin: 40rpx 0;
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
