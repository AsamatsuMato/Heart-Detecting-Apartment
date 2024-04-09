<template>
  <view class="record_details">
    <view class="content">
      <view class="item">
        <view class="label">就诊人</view>
        <view class="value">{{ detailsInfo.patientName }}</view>
      </view>
      <view class="item">
        <view class="label">就诊卡号</view>
        <view class="value">{{ detailsInfo.medicalCardNo }}</view>
      </view>
      <view class="item">
        <view class="label">就诊医生</view>
        <view class="value">{{ detailsInfo.docName }}</view>
      </view>
      <view class="item">
        <view class="label">就诊科室</view>
        <view class="value">{{ detailsInfo.deptName }}</view>
      </view>
      <view class="item">
        <view class="label">就诊日期</view>
        <view class="value"
          >{{ detailsInfo.date }} {{ detailsInfo.timePeriod }}</view
        >
      </view>
      <view class="item">
        <view class="label">费用</view>
        <view class="value" style="color: #f00">￥{{ detailsInfo.price }}</view>
      </view>
      <view class="item">
        <view class="label">预约时间</view>
        <view class="value">{{ detailsInfo.appointmentTime }}</view>
      </view>
    </view>
    <view class="btn_group" v-if="detailsInfo.status === 1">
      <custom-button content="去 缴 费" />
      <custom-button
        content="取 消 预 约"
        background="#E5F0FE"
        border="1rpx solid #226BF3"
        color="#226BF3"
        @click="cancelAppointment"
      ></custom-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import {
  getRegisteredRecordApi,
  cancelAppointmentApi,
} from "@/apis/registered/index";
import { type RecordListInter } from "../types";
import CustomButton from "@/components/Custom-Button/index.vue";

const code = ref("");
onLoad((option: any) => {
  code.value = option.regCode;
  getRegisteredRecord();
});

async function getRegisteredRecord() {
  const data = {
    medicalCardNo: uni.getStorageSync("medicalCardNo"),
    regCode: code.value,
  };
  try {
    const res: any = await getRegisteredRecordApi(data);
    detailsInfo.value = res;
  } catch (err) {
    console.log(err);
  }
}

const detailsInfo = ref({
  patientName: "",
  medicalCardNo: "",
  docName: "",
  deptName: "",
  date: "",
  timePeriod: "",
  price: 0,
  appointmentTime: "",
  status: 0,
});

function cancelAppointment() {
  uni.showModal({
    title: "提示",
    content: "是否取消预约",
    success: async (res) => {
      if (res.confirm) {
        try {
          const res: any = await cancelAppointmentApi(code.value);
          uni.reLaunch({
            url: "/pages/home/index",
          });
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
.record_details {
  padding: 20rpx;
  background-color: #f5f5f5;
  font-size: 28rpx;
  min-height: 97vh;

  .content {
    padding: 20rpx;
    border-radius: 5px;
    background-color: #fff;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80rpx;

      .label {
        color: #999;
      }
    }
  }

  .btn_group {
    margin-top: 50rpx;

    :deep(.custom_button) {
      margin: 20rpx 0;
    }
  }
}
</style>
