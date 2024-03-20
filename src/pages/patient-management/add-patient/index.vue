<template>
  <view class="add_patient">
    <view class="patient_info">
      <view class="item">
        <view class="label">姓名</view>
        <input
          v-model="patientInfo.name"
          type="text"
          placeholder="请输入患者姓名"
        />
      </view>
      <view class="item">
        <view class="label">证件号码</view>
        <input
          v-model="patientInfo.idCard"
          type="idcard"
          placeholder="请输入患者证件号码"
          @blur="checkIdCard"
        />
      </view>
      <view class="item">
        <view class="label" style="margin-right: 70rpx">出生日期</view>
        <picker
          mode="date"
          :value="patientInfo.birthday"
          :start="startDate"
          :end="endDate"
          @change="bindDateChange"
        >
          <view class="uni-input">{{ patientInfo.birthday }}</view>
        </picker>
      </view>
      <view class="item">
        <view class="label">手机号码</view>
        <input
          v-model="patientInfo.phone"
          type="number"
          placeholder="请输入手机号码"
          @blur="checkPhone"
        />
      </view>
      <view class="item">
        <view class="label">住址</view>
        <textarea
          v-model="patientInfo.address"
          auto-height
          :maxlength="-1"
          placeholder="请输入就诊人住址"
        ></textarea>
      </view>
    </view>
    <custom-button content="建档"></custom-button>
  </view>
</template>

<script setup lang="ts">
import CustomButton from "@/components/Custom-Button/index.vue";
import { IdentityCodeValid } from "./checkIdCard";

const patientInfo = ref({
  name: "",
  idCard: "",
  birthday: getDate({ format: true }),
  phone: "",
  address: "",
});

const startDate = getDate("start");
const endDate = getDate("end");

function getDate(type: any) {
  const date = new Date();
  let year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();

  if (type === "start") {
    year = year - 60;
  } else if (type === "end") {
    year = year + 2;
  }
  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  return `${year}-${month}-${day}`;
}

function bindDateChange(params: any) {
  patientInfo.value.birthday = params.detail.value;
}

function checkIdCard() {
  let idCard = patientInfo.value.idCard;
  if (IdentityCodeValid(idCard) === "成功通过了验证" && idCard.length === 18) {
    let birthday = idCard.slice(6, 14);
    let years = birthday.slice(0, 4);
    let month = birthday.slice(4, 6);
    let day = birthday.slice(6);
    let str = years + "-" + month + "-" + day;
    patientInfo.value.birthday = str;
  } else {
    uni.showToast({
      title: "身份证输入错误",
      icon: "none",
      duration: 2000,
    });
  }
}

function checkPhone() {
  const regex = /^1[3-9]\d{9}$/;
  if (!regex.test(patientInfo.value.phone)) {
    patientInfo.value.phone = "";
    uni.showToast({
      title: "手机号输入错误",
      icon: "none",
      duration: 2000,
    });
  }
}
</script>

<style lang="scss" scoped>
.add_patient {
  padding: 20rpx;

  .patient_info {
    margin-bottom: 50rpx;

    .item {
      min-height: 90rpx;
      display: flex;
      align-items: center;
      border-bottom: 1rpx solid #d7d7d7;
      padding: 20rpx;

      .label {
        margin-right: 50rpx;
        font-size: 34rpx;
        width: 150rpx;
      }

      input,
      textarea {
        background-color: transparent;
        flex: 1;
      }

      textarea {
        padding-bottom: 2px;
      }
    }
  }
}
</style>
