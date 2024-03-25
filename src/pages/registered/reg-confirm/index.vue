<template>
  <view class="reg_confirm">
    <view class="reg_info">
      <view class="item doc_info">
        <image
          src="@/static/icon/about/default-head.svg"
          mode="widthFix"
        ></image>
        <view>
          <text class="doc_name">张甲佑</text>
          <text class="doc_position">副主任医师</text>
        </view>
      </view>
      <view class="item">
        <view class="label">就诊科室</view>
        <view class="val">外科</view>
      </view>
      <view class="item">
        <view class="label">就诊日期</view>
        <view class="val">2024-03-11</view>
      </view>
      <view class="item">
        <view class="label">候诊时间</view>
        <view class="val">9:00-9:30</view>
      </view>
      <view class="item">
        <view class="label"
          >费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用</view
        >
        <view class="val" style="color: #f00">￥12</view>
      </view>
    </view>
    <view class="personal_info">
      <view class="item">
        <view class="label">就&nbsp;诊&nbsp;人</view>
        <view class="val">张三</view>
      </view>
      <view class="item">
        <view class="label">就诊卡号</view>
        <view class="val">00015890729</view>
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

function goToNotice() {
  uni.navigateTo({
    url: "/pages/registered/reg-notice/index",
  });
}

function goToConfirm() {
  uni.navigateTo({
    url: "/pages/registered/reg-result/index",
  });
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
