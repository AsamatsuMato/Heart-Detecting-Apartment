<template>
  <view class="patient_management">
    <view
      v-if="isHavePatient"
      class="electronic_health_card"
      @click="goToDetails"
    >
      <view class="patient_info">
        <text class="name">{{ patientInfo.name }}</text>
        <text class="outpatientNo"
          >就诊卡号: {{ patientInfo.medicalCardNo }}</text
        >
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
    <custom-button
      content="添加就诊人"
      @click="goToAdd"
      v-if="!isHavePatient"
    ></custom-button>
  </view>
</template>

<script setup lang="ts">
import CustomButton from "@/components/Custom-Button/index.vue";
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
import { navigateTo } from "@/router/index";
import { getPatientInfoApi } from "@/apis/patient/index";
import { onLoad } from "@dcloudio/uni-app";

const qrcode = ref();

onLoad(() => {
  getPatientInfo();
});

const isHavePatient = ref(false);
async function getPatientInfo() {
  try {
    const res: any = await getPatientInfoApi();
    if (res) {
      isHavePatient.value = true;
      patientInfo.value = res;
      uni.setStorageSync("medicalCardNo", res.medicalCardNo);
      nextTick(() => {
        qrcode.value._makeCode();
      });
    } else {
      isHavePatient.value = false;
    }
  } catch (err) {
    console.log(err);
    isHavePatient.value = false;
  }
}

const patientInfo = ref({
  name: "",
  medicalCardNo: "",
  idCard: "",
  birthday: "",
  phone: "",
  address: "",
});

const formattedIdCard = computed(() => {
  const firstFour = patientInfo.value.idCard.substring(0, 4);
  const lastFour = patientInfo.value.idCard.substring(14);

  const middleStars = "*".repeat(patientInfo.value.idCard.length - 8);

  return `${firstFour}${middleStars}${lastFour}`;
});

function goToAdd() {
  navigateTo("/pages/patient-management/add-patient/index");
}

function goToDetails() {
  const { name, idCard, birthday, phone, address, medicalCardNo } =
    patientInfo.value;
  navigateTo(
    `/pages/patient-management/patient-info/index?name=${name}&idCard=${idCard}&birthday=${birthday}&phone=${phone}&address=${address}&medicalCardNo=${medicalCardNo}`
  );
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
      font-size: 32rpx;
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
