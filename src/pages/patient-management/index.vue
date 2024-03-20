<template>
  <view class="patient_management">
    <view class="electronic_health_card" @click="goToDetails">
      <view class="patient_info">
        <text class="name">{{ patientInfo.name }}</text>
        <text class="outpatientNo">门诊号: {{ patientInfo.outpatientNo }}</text>
        <text class="idCard">{{ formattedIdCard }}</text>
      </view>
      <view class="qrcode">
        <tki-qrcode
          ref="qrcode"
          :val="patientInfo.idCard"
          icon="../../static/images/WechatIMG302.png"
          :iconSize="60"
          :onval="true"
          :size="200"
          unit="rpx"
        />
      </view>
    </view>
    <custom-button content="添加就诊人" @click="goToAdd"></custom-button>
  </view>
</template>

<script setup lang="ts">
import CustomButton from "@/components/Custom-Button/index.vue";
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";

const qrcode = ref(tkiQrcode);

onMounted(() => {
  qrcode.value._makeCode();
});

const patientInfo = ref({
  name: "张三",
  outpatientNo: "000140626800",
  idCard: "445102198712274554",
});

const formattedIdCard = computed(() => {
  const firstFour = patientInfo.value.idCard.substring(0, 4);
  const lastFour = patientInfo.value.idCard.substring(14);

  const middleStars = "*".repeat(patientInfo.value.idCard.length - 8);

  return `${firstFour}${middleStars}${lastFour}`;
});

function goToAdd() {
  uni.navigateTo({
    url: "/pages/patient-management/add-patient/index",
  });
}

function goToDetails() {
  uni.navigateTo({
    url: "/pages/patient-management/patient-info/index",
  });
}
</script>

<style lang="scss" scoped>
.patient_management {
  padding: 50rpx 20rpx 0;

  .electronic_health_card {
    width: 100%;
    height: 400rpx;
    background: no-repeat
      url("https://gzzy.wedone.net.cn/AdminApi/chsp/careHeadPhoto/tWdHOCpL.png");
    background-size: 100% 100%;
    background-position: center;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .patient_info {
      margin-left: 40rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      font-size: 36rpx;
      font-weight: bold;
      height: 200rpx;
    }

    .qrcode {
      margin-right: 40rpx;
    }
  }

  :deep(.custom_button) {
    margin-top: 50rpx;
  }
}
</style>
