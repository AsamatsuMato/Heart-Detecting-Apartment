<template>
  <view class="outpatient_payment">
    <view class="content">
      <view class="item" v-for="item in paymentList" :key="item._id">
        <view class="item_left">
          <view class="project_name">
            <template v-if="item.regCode"> 挂号费 </template>
            <template v-if="item.peiCode"> 体检费 </template>
            <template v-if="item.HosCode"> 住院费 </template>
          </view>
          <view class="project_info">
            <text class="dept">{{ item.deptName }}</text>
            <text class="doc_name">{{ item.docName }}</text>
          </view>
          <text class="date">{{ item.appointmentTime }}</text>
        </view>
        <view class="item_right">
          <text class="price">{{ item.price }}</text>
          <button @click="goToPayDetails">查 看 详 情</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { navigateTo } from "@/router/index";
import { getRegisteredRecordApi } from "@/apis/registered/index";
import { onLoad } from "@dcloudio/uni-app";

onLoad(() => {
  getRegisteredRecord();
});

async function getRegisteredRecord() {
  try {
    const data = {
      medicalCardNo: uni.getStorageSync("medicalCardNo"),
      status: 1,
    };
    const res: any = await getRegisteredRecordApi(data);
    res.forEach((item: any) => {
      paymentList.value.push(item);
    });
  } catch (err) {
    console.log(err);
  }
}

const paymentList: any = ref([]);

function goToPayDetails() {
  navigateTo("/pages/outpatient-payment/payment-confirm/index");
}
</script>

<style lang="scss" scoped>
.outpatient_payment {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 97vh;

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
