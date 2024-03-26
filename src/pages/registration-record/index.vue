<template>
  <view class="registration_record">
    <view class="item" v-for="item in recordList" :key="item.recordId">
      <view class="nav">
        <view class="left">
          <text>{{ item.department }}</text>
          <text>{{ item.doctorName }}</text>
        </view>
        <view class="right">
          <text>预约成功</text>
        </view>
      </view>
      <view class="content">
        <view class="line">
          <text>就诊科室</text>
          <text>{{ item.department }}</text>
        </view>
        <view class="line">
          <text>就诊时间</text>
          <text>{{ item.date }}</text>
        </view>
        <view class="line">
          <text>就&nbsp;&nbsp;诊&nbsp;&nbsp;人</text>
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const statusList = [
  {
    key: -1,
    value: "已退号",
  },
  {
    key: 0,
    value: "预约失败",
  },
  {
    key: 1,
    value: "预约成功",
  },
  {
    key: 2,
    value: "已完成",
  },
];
const recordList = ref([
  {
    recordId: "R100100",
    department: "肿瘤科",
    doctorName: "张甲佑",
    date: "2024-03-20 9:30",
    name: "张三",
    status: 1,
  },
  {
    recordId: "R100101",
    department: "肿瘤科",
    doctorName: "张甲佑",
    date: "2024-03-22 14:30",
    name: "李四",
    status: 2,
  },
]);
</script>

<style lang="scss" scoped>
.registration_record {
  padding: 20rpx;
  background-color: #f5f5f5;
  font-size: 28rpx;

  .item {
    background-color: #fff;
    border-radius: 5px;
    padding: 0 40rpx;
    margin-bottom: 20rpx;

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1rpx solid #cdcdcd;
      height: 100rpx;

      .left {
        text:nth-child(1) {
          margin-right: 20rpx;
        }
      }

      .right {
        color: #999;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      height: 250rpx;
      justify-content: space-evenly;

      .line {
        text:nth-child(1) {
          margin-right: 20rpx;
          color: #999;
        }
      }
    }
  }
}
</style>
