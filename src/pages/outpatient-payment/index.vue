<template>
  <view class="outpatient_payment">
    <view class="label">待缴费项目</view>
    <view class="content">
      <view class="item" v-for="item in paymentList" :key="item.peiId">
        <view class="item_left">
          <text class="project_name">{{ item.projectName }}</text>
          <view class="project_info">
            <text class="dept">{{ item.projectDept }}</text>
            <text class="doc_name">{{ item.doctor }}</text>
          </view>
          <text class="date">{{ item.date }}</text>
        </view>
        <view class="item_right">
          <text class="price">{{ item.price }}</text>
          <button @click="goToPayDetails">去缴费</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const paymentList = ref([
  {
    peiId: "PID100100",
    projectName: "西药费",
    projectDept: "消化内科",
    doctor: "蒋峰",
    date: "2024-03-20 15:30",
    price: 120,
  },
  {
    peiId: "PID100101",
    projectName: "检验费",
    projectDept: "消化内科",
    doctor: "蒋峰",
    date: "2024-03-20 15:30",
    price: 60,
  },
  {
    peiId: "PID100102",
    projectName: "预约挂号",
    projectDept: "消化内科",
    doctor: "蒋峰",
    date: "2024-03-20 15:30",
    price: 10,
  },
]);

function goToPayDetails() {
  uni.navigateTo({
    url: "/pages/outpatient-payment/payment-confirm/index",
  });
}
</script>

<style lang="scss" scoped>
.outpatient_payment {
  padding: 20rpx;
  background-color: #f5f5f5;

  .label {
    font-size: 36rpx;
    font-weight: bold;
  }

  .content {
    .item {
      background-color: #fff;
      border-radius: 5px;
      padding: 30rpx 40rpx;
      margin-top: 20rpx;
      height: 150rpx;
      display: flex;
      justify-content: space-between;
      font-size: 32rpx;

      .item_left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .project_name {
          font-weight: bold;
        }

        .project_info,
        .date {
          color: #585858;
          font-size: 26rpx;
        }

        .project_info {
          .dept {
            margin-right: 20rpx;
          }
        }
      }

      .item_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        .price {
          color: #ee0509;
          font-weight: bold;

          &::before {
            content: "￥";
          }
        }

        button {
          background-color: #226bf3;
          font-size: 26rpx;
          color: #fff;
          width: 180rpx;
          height: 70rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          border-color: #226bf3;
        }
      }
    }
  }
}
</style>
