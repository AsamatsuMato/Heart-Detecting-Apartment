<template>
  <view class="options-list">
    <view class="item" @click="goToPatientManagement">
      <view class="item_left">
        <image
          src="@/static/icon/outpatient-service/patient-management.png"
          mode="widthFix"
        ></image>
        <text>管理就诊人</text>
      </view>
      <view class="item_right">
        <image
          src="@/static/icon/about/arrow-right.svg"
          mode="widthFix"
        ></image>
      </view>
    </view>
    <view class="item" @click="goToRegistrationRecord">
      <view class="item_left">
        <image
          src="@/static/icon/outpatient-service/registration-record.png"
          mode="widthFix"
        ></image>
        <text>预约挂号记录</text>
      </view>
      <view class="item_right">
        <image
          src="@/static/icon/about/arrow-right.svg"
          mode="widthFix"
        ></image>
      </view>
    </view>
    <view class="item" @click="goToPrepaymentRecord">
      <view class="item_left">
        <image
          src="@/static/icon/outpatient-service/payment-record.png"
          mode="widthFix"
        ></image>
        <text>透析预缴记录</text>
      </view>
      <view class="item_right">
        <image
          src="@/static/icon/about/arrow-right.svg"
          mode="widthFix"
        ></image>
      </view>
    </view>
    <view class="item" @click="goToReport">
      <view class="item_left">
        <image
          src="@/static/icon/outpatient-service/report-query.svg"
          mode="widthFix"
        ></image>
        <text>体检预约查询</text>
      </view>
      <view class="item_right">
        <image
          src="@/static/icon/about/arrow-right.svg"
          mode="widthFix"
        ></image>
      </view>
    </view>
    <view class="item" @click="goToQuestionnaireSurvey">
      <view class="item_left">
        <image
          src="@/static/icon/about/satisfaction-survey.png"
          mode="widthFix"
        ></image>
        <text>满意度调查</text>
      </view>
      <view class="item_right">
        <image
          src="@/static/icon/about/arrow-right.svg"
          mode="widthFix"
        ></image>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { navigateTo } from "@/router";

function goToPatientManagement() {
  navigateTo("/pages/patient-management/index");
}

function goToRegistrationRecord() {
  navigateTo("/pages/registration-record/index");
}

function goToPrepaymentRecord() {
  navigateTo("/pages/prepayment-record/index");
}

function goToReport() {
  navigateTo("/pages/report/index");
}

function goToQuestionnaireSurvey() {
  navigateTo("/pages/questionnaire-survey/index");
}
</script>

<style lang="scss" scoped>
.options-list {
  border: 1rpx solid #d7d7d7;
  border-radius: 20rpx;
  margin: -50rpx 20rpx 50rpx 20rpx;
  background-color: #fff;

  .item {
    padding: 20rpx 30rpx;
    border-bottom: 1rpx solid #d7d7d7;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item_left {
      display: flex;
      align-items: center;
      image {
        width: 80rpx;
        margin-right: 30rpx;
      }
    }

    .item_right {
      image {
        width: 20rpx;
      }
    }

    &:nth-last-of-type(1) {
      border: none;
    }
  }
}
</style>
