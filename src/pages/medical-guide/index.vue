<template>
  <view class="nav">
    <uni-section type="line">
      <uni-notice-bar
        show-icon
        scrollable
        text="需要挂号的用户请先到就诊人管理页进行建档立卡操作"
      />
    </uni-section>
  </view>
  <view class="medical_guide">
    <view class="item">
      <view class="title">挂号流程</view>
      <view class="mar"
        >一、点击首页“在线挂号预约”-选择科室-选择日期-选择医生-选择时间段-确认预约。</view
      >
      <view class="mar"
        >二、点击首页“线上快捷缴费”-筛选挂号-进入挂号详情-点击“去缴费”按钮进行支付，完成预约挂号流程。</view
      >
      <view class="mar"
        >三、点击首页“挂号记录”即可查看您所有预约挂号的状态记录与详情，点击进入详情页可取消预约挂号。</view
      >
    </view>
    <view class="item">
      <view class="title">体检登记流程</view>
      <view class="mar"
        >一、点击首页“体检登记”-选择套餐-选择日期-填写个人信息-点击“提交”按钮完成体检预约登记。</view
      >
      <view class="mar"
        >二、点击首页“线上快捷缴费”-筛选体检-进入体检预约登记详情-点击“缴费”按钮进行支付，完成体检预约登记流程。</view
      >
      <view class="mar"
        >三、点击首页“报告查询”即可查看您所有体检预约登记的状态记录与详情，“已完成”状态的记录可点击右下角“查看报告”按钮进行体检报告的查看，点击进入详情页可取消体检预约登记。</view
      >
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.nav {
  :deep(.uni-section) {
    .uni-section-header {
      display: none;
    }
  }
}
.medical_guide {
  padding: 0 20rpx;
  background-color: #f5f5f5;
  min-height: 97vh;

  .item {
    margin: 20rpx 0;
    padding: 20rpx 30rpx;
    background-color: #fff;
    border-radius: 10px;

    .mar {
      margin: 20rpx 0;
    }

    .title {
      font-size: 36rpx;
      font-weight: bold;
    }
  }
}
</style>
