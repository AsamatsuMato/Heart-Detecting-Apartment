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
  </view>
</template>

<script lang="ts" setup>
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
import { onLoad } from "@dcloudio/uni-app";
import { getReservedDetailsApi } from "@/apis/physicalExamination/index";

const phyExaCode = ref("");
const flag = ref("");

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
</script>

<style lang="scss" scoped>
.container {
  padding: 0 20rpx 20rpx;
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

  .back {
    margin-top: 50rpx;
    background-color: #7b81ff;
    color: #fff;
  }
}
</style>
