<template>
  <view class="reg_confirm">
    <view class="reg_info">
      <view class="item doc_info">
        <image
          src="@/static/icon/about/default-head.svg"
          mode="widthFix"
        ></image>
        <view>
          <text class="doc_name">{{ detailsInfo.docName }}</text>
          <text class="doc_position">{{ detailsInfo.position }}</text>
        </view>
      </view>
      <view class="item">
        <view class="label">就诊科室</view>
        <view class="val">{{ detailsInfo.deptName }}</view>
      </view>
      <view class="item">
        <view class="label">就诊日期</view>
        <view class="val">{{ detailsInfo.date }}</view>
      </view>
      <view class="item">
        <view class="label">就诊时段</view>
        <view class="val">{{ detailsInfo.timePeriod }}</view>
      </view>
      <view class="item">
        <view class="label"
          >费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用</view
        >
        <view class="val" style="color: #f00">￥{{ detailsInfo.price }}</view>
      </view>
    </view>
    <view class="personal_info">
      <view class="item">
        <view class="label">就&nbsp;&nbsp;诊&nbsp;&nbsp;人</view>
        <view class="val">{{ detailsInfo.patientName }}</view>
      </view>
      <view class="item">
        <view class="label">就诊卡号</view>
        <view class="val">{{ detailsInfo.medicalCardNo }}</view>
      </view>
    </view>
    <view class="notice">
      <text>确认预约前请仔细阅读</text>
      <text @click="goToNotice">《挂号须知》</text>
    </view>
    <custom-button content="确 认 预 约" @click="goToConfirm"></custom-button>
  </view>
</template>

<script setup lang="ts">
import CustomButton from "@/components/Custom-Button/index.vue";
import { navigateTo } from "@/router/index";
import {
  getRegisteredConfirmInfoApi,
  confirmRegisteredApi,
} from "@/apis/registered/index";
import { onLoad } from "@dcloudio/uni-app";

const doctorCode = ref("");
onLoad((option: any) => {
  const { docCode, date, timePeriod } = option;
  doctorCode.value = docCode;
  getRegisteredConfirmInfo(docCode);
  detailsInfo.value.date = date;
  detailsInfo.value.timePeriod = timePeriod;
});

async function getRegisteredConfirmInfo(docCode: string) {
  try {
    const res: any = await getRegisteredConfirmInfoApi(docCode);
    const { docName, position, price, deptName } = res;
    detailsInfo.value.docName = docName;
    detailsInfo.value.position = position;
    detailsInfo.value.price = price;
    detailsInfo.value.deptName = deptName;
  } catch (err) {
    console.log(err);
  }
}

const detailsInfo = ref({
  docName: "",
  position: "",
  price: 0,
  deptName: "",
  patientName: uni.getStorageSync("patientName"),
  medicalCardNo: uni.getStorageSync("medicalCardNo") as string,
  date: "",
  timePeriod: "",
});

function goToNotice() {
  navigateTo("/pages/registered/reg-notice/index");
}

async function goToConfirm() {
  const { date, timePeriod, price, medicalCardNo } = detailsInfo.value;
  const data = {
    docCode: doctorCode.value,
    date,
    timePeriod,
    price,
    medicalCardNo,
  };
  try {
    await confirmRegisteredApi(data);
    navigateTo("/pages/registered/reg-result/index");
  } catch (err) {
    console.log(err);
  }
}
</script>

<style lang="scss" scoped>
.reg_confirm {
  padding: 20rpx;
  min-height: 100vh;
  background-color: #f5f5f5;

  .reg_info,
  .personal_info {
    background-color: #fff;
    border-radius: 5px;
    padding: 0 30rpx;
    margin-bottom: 20rpx;

    .item {
      height: 120rpx;
      display: flex;
      align-items: center;
      border-bottom: 1rpx solid #cdcdcd;

      &:nth-last-child(1) {
        border: none;
      }

      .label {
        margin-right: 40rpx;
        font-size: 30rpx;
      }

      .val {
        font-size: 30rpx;
      }
    }

    .doc_info {
      image {
        width: 100rpx;
        margin-right: 20rpx;
      }

      view {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100%;
        .doc_name {
          font-size: 34rpx;
          margin-right: 20rpx;
          font-weight: bold;
        }

        .doc_position {
          font-size: 24rpx;
          color: #585858;
        }
      }
    }
  }

  .notice {
    margin-top: 100rpx;
    margin-bottom: 20rpx;
    color: #aaaaaa;
    font-size: 26rpx;
    text-align: center;

    text:nth-child(2) {
      margin-left: 20rpx;
      color: #226bf3;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #226bf3;
    color: #fff;
  }
}
</style>
