<template>
  <view class="patient_info">
    <view class="content">
      <view class="name">{{ patientInfo.name }}</view>
      <view class="qrcode">
        <tki-qrcode
          ref="qrcode"
          val="445102198712274554"
          icon="../../static/images/WechatIMG302.png"
          :iconSize="100"
          :onval="true"
          :size="400"
          unit="rpx"
        />
      </view>
      <view class="info_table">
        <view class="item">
          <view class="label">就诊卡号</view>
          <view class="val">{{ patientInfo.medicalCardNo }}</view>
        </view>
        <view class="item">
          <view class="label">身份证号</view>
          <view class="val">{{ formattedIdCard }}</view>
        </view>
        <view class="item">
          <view class="label">手机号</view>
          <view class="val">{{ formattedPhone }}</view>
        </view>
        <view class="item">
          <view class="label">住址</view>
          <view class="val">{{ patientInfo.address }}</view>
        </view>
      </view>
    </view>
    <view class="tip">
      如若您输入建档信息有误，请先行解除该就诊人并重新进行建档，以免影响后续的就医诊疗。
    </view>
    <custom-button
      content="解除绑定"
      background="#FFF"
      border="1rpx solid #E6E6E6"
      color="#226BF3"
      @click="handleDelete"
    ></custom-button>
  </view>
</template>

<script setup lang="ts">
import CustomButton from "@/components/Custom-Button/index.vue";
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
import { onLoad } from "@dcloudio/uni-app";
import { deletePatientApi } from "@/apis/patient/index";
import { reLaunch } from "@/router/index";

const qrcode = ref(tkiQrcode);

onLoad((option: any) => {
  patientInfo.value = option;
  nextTick(() => {
    qrcode.value._makeCode();
  });
});

const patientInfo = ref({
  name: "",
  medicalCardNo: "",
  idCard: "",
  phone: "",
  address: "",
  birthday: "",
});

const formattedIdCard = computed(() => {
  const firstFour = patientInfo.value.idCard.substring(0, 4);
  const lastFour = patientInfo.value.idCard.substring(14);

  const middleStars = "*".repeat(patientInfo.value.idCard.length - 8);

  return `${firstFour}${middleStars}${lastFour}`;
});

const formattedPhone = computed(() => {
  const front = patientInfo.value.phone.substring(0, 3);
  const back = patientInfo.value.phone.substring(7);

  const middleStars = "*".repeat(patientInfo.value.phone.length - 7);

  return `${front}${middleStars}${back}`;
});

function handleDelete() {
  uni.showModal({
    title: "提示",
    content: "是否解除绑定该就诊人",
    success: async (res: any) => {
      if (res.confirm) {
        try {
          await deletePatientApi(patientInfo.value.medicalCardNo);
          reLaunch("/pages/patient-management/index");
          uni.showToast({
            title: "解除绑定成功",
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
.patient_info {
  padding: 20rpx;
  min-height: 96vh;
  background: linear-gradient(to bottom, #226bf3, #f5f5f5 500rpx);

  .content {
    background-color: #fff;
    border-radius: 10px;
    padding: 40rpx 20rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .name,
    .qrcode {
      margin-bottom: 40rpx;
    }

    .name {
      font-weight: bold;
      font-size: 36rpx;
    }

    .info_table {
      width: 100%;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid #e1e1e1;
        padding: 20rpx;
        height: 70rpx;
      }

      .item:nth-last-child(1) {
        border: none;
      }
    }
  }

  .tip {
    background-color: #fff;
    line-height: 1.5em;
    font-weight: bold;
    border-radius: 10px;
    padding: 30rpx 20rpx;
    margin: 40rpx 0;
  }
}
</style>
