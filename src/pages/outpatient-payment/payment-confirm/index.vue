<template>
  <view class="payment_confirm">
    <view class="payment_info">
      <view class="item">
        <text class="label">就诊科室</text>
        <text class="value">消化内科</text>
      </view>
      <view class="item">
        <text class="label">医生姓名</text>
        <text class="value">蒋峰</text>
      </view>
      <view class="item">
        <text class="label">就&nbsp;&nbsp;诊&nbsp;&nbsp;人</text>
        <text class="value">张三</text>
      </view>
      <view class="item">
        <text class="label">就诊卡号</text>
        <text class="value">0129837089213</text>
      </view>
    </view>
    <view class="payment_details">
      <view class="title">
        <text class="label">费用明细</text>
      </view>
      <view class="item" v-for="item in projectList" :key="item.projectId">
        <view class="item_left">
          <text class="project_name">{{ item.projectName }}</text>
          <view class="price_num">
            <text class="price">单价: {{ item.price }}</text>
            <text class="num">数量: {{ item.num }}</text>
          </view>
        </view>
        <text class="total_price">{{ item.totalPrice }}</text>
      </view>
    </view>
  </view>
  <view class="footer">
    <view class="left">
      合计: <text class="total_price">{{ totalPrice }}</text>
    </view>
    <view class="right" @click="pay">立即支付</view>
  </view>
  <Drawer v-model="payDrawer" :height="500">
    <template #title>
      <text>请选择支付方式</text>
    </template>
    <template #content>
      <view class="item" @click="goToPay">
        <view class="left">
          <image
            src="@/static/icon/outpatient-payment/alipay.svg"
            mode="widthFix"
          ></image>
          <text>支付宝支付</text>
        </view>
        <view class="right">
          <image
            src="@/static/icon/about/arrow-right.svg"
            mode="widthFix"
          ></image>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image
            src="@/static/icon/outpatient-service/dialysis-prepayment.png"
            mode="widthFix"
          ></image>
          <text>预交金支付</text>
        </view>
        <view class="right">
          <image
            src="@/static/icon/about/arrow-right.svg"
            mode="widthFix"
          ></image>
        </view>
      </view>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import Drawer from "@/components/Drawer/index.vue";
const projectList = ref([
  {
    projectId: "3016",
    projectName: "抽血检测",
    price: 60,
    num: 1,
    totalPrice: 60,
  },
  {
    projectId: "3017",
    projectName: "X光检查",
    price: 50,
    num: 1,
    totalPrice: 50,
  },
  {
    projectId: "3018",
    projectName: "中药项目",
    price: 150,
    num: 2,
    totalPrice: 300,
  },
  {
    projectId: "3019",
    projectName: "西药项目",
    price: 196,
    num: 1,
    totalPrice: 196,
  },
]);

const totalPrice = computed(() => {
  let price = 0;
  projectList.value.forEach((item: any) => {
    price += item.totalPrice;
  });
  return price;
});

const payDrawer = ref(false);
function pay() {
  payDrawer.value = true;
}

function goToPay() {
  uni.navigateTo({
    url: "/pages/outpatient-payment/payment-result/index",
  });
}
</script>

<style lang="scss" scoped>
.payment_confirm {
  padding: 20rpx 20rpx 140rpx;
  background-color: #f5f5f5;
  font-size: 32rpx;

  .payment_info,
  .payment_details {
    background-color: #fff;
    border-radius: 5px;
    padding: 0 40rpx;
  }

  .payment_info {
    margin-bottom: 20rpx;
    .item {
      border-bottom: 1rpx solid #cdcdcd;
      height: 120rpx;
      display: flex;
      align-items: center;

      .label {
        margin-right: 80rpx;
        color: #585858;
      }

      .value {
        color: #313131;
      }

      &:nth-last-child(1) {
        border: none;
      }
    }
  }

  .payment_details {
    .title {
      height: 120rpx;
      display: flex;
      align-items: center;
      font-weight: bold;
      border-bottom: 1rpx solid #cdcdcd;
      color: #313131;
    }

    .item {
      height: 150rpx;
      display: flex;
      justify-content: space-between;
      border-bottom: 1rpx solid #cdcdcd;

      &:nth-last-child(1) {
        border: none;
      }

      .item_left {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        color: #585858;

        .price_num {
          font-size: 28rpx;
          .price {
            margin-right: 30rpx;
          }
        }
      }

      .total_price {
        height: 100%;
        display: flex;
        align-items: center;
        font-weight: bold;

        &::before {
          content: "￥";
        }
      }
    }
  }
}

.footer {
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  height: 120rpx;
  background-color: #fff;

  .left,
  .right {
    width: 50%;
    padding: 0 50rpx;
    display: flex;
    align-items: center;
  }

  .left {
    .total_price {
      color: #ee0509;
      margin-left: 20rpx;
      font-weight: bold;

      &::before {
        content: "￥";
      }
    }
  }

  .right {
    background-color: #3678f4;
    color: #fff;
    justify-content: center;
  }
}

.drawer {
  .item {
    border-bottom: 1rpx solid #cdcdcd;
    width: 90%;
    height: 120rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      image {
        width: 60rpx;
        margin-right: 30rpx;
      }
    }

    .right {
      image {
        width: 20rpx;
      }
    }
  }
}
</style>
