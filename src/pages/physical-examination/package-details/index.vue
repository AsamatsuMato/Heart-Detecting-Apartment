<template>
  <view class="package_details">
    <view class="nav">
      <view class="name item">{{ packageInfo.packageName }}</view>
      <view class="tags item">
        <text
          class="tag"
          v-for="(tag, index) in packageInfo.tags"
          :key="index"
          >{{ tag }}</text
        >
      </view>
      <view class="intro item">{{ packageInfo.packageIntro }}</view>
      <view class="price item">
        <view class="preferential_price">
          <text style="color: #999; margin-right: 10rpx">费用:</text>
          <text style="color: #7b81ff; font-size: 40rpx; font-weight: bold">{{
            packageInfo.preferentialPrice
          }}</text>
          <text style="color: #7b81ff">元</text>
        </view>
        <view class="original_price">￥{{ packageInfo.originalPrice }}</view>
      </view>
    </view>
    <view class="table">
      <uni-table emptyText="暂无更多数据">
        <uni-tr>
          <uni-th align="center">项目</uni-th>
          <uni-th align="center">项目意义</uni-th>
        </uni-tr>
        <uni-tr
          v-for="(item, index) in packageInfo.packageDetails"
          :key="index"
        >
          <uni-td align="center">{{ item.itemName }}</uni-td>
          <uni-td align="center">{{ item.itemSignificance }}</uni-td>
        </uni-tr>
      </uni-table>
    </view>
  </view>
  <view class="footer">
    <view class="price">
      <text>优惠价</text>
      <text>￥{{ packageInfo.preferentialPrice }}</text>
    </view>
    <button @click="handleBook">立 即 预 约</button>
  </view>
  <view class="calendar">
    <uni-calendar
      ref="calendar"
      :startDate="startDate"
      :endDate="endDate"
      :clear-date="true"
      :insert="false"
      :selected="packageScheduling"
      @confirm="confirm"
    />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import {
  getPhysicalExaminationListApi,
  getPhyExaSchedulingApi,
} from "@/apis/physicalExamination/index";
import { type PackageInfoInter } from "./types";
import { navigateTo } from "@/router/index";

const code = ref("");
onLoad(async (option: any) => {
  code.value = option.packageCode;
  await getPhysicalExaminationList();
});

const packageInfo = ref<PackageInfoInter>({
  packageName: "",
  tags: [],
  packageIntro: "",
  preferentialPrice: 0,
  originalPrice: 0,
  packageDetails: [],
});

async function getPhysicalExaminationList() {
  try {
    const res: any = await getPhysicalExaminationListApi(code.value);
    packageInfo.value = res;
  } catch (err) {
    console.log(err);
  }
}

const calendar = ref();

const packageScheduling = ref([]);

const startDate = ref("");
const endDate = ref("");

async function handleBook() {
  calendar.value.open();
  try {
    const res: any = await getPhyExaSchedulingApi();
    res.forEach((item: any, index: number) => {
      item.value = item.value.filter((deepItem: any) => {
        return deepItem.packageCode === code.value;
      });
      item.value = item.value[0].remaining;
      if (item.value !== 0) {
        item.info = "可预约";
      } else {
        item.info = "约满";
      }

      if (index === 0) {
        startDate.value = item.date;
      }

      if (index === res.length - 1) {
        endDate.value = item.date;
      }
    });
    packageScheduling.value = res;
  } catch (err) {
    console.log(err);
  }
}

function confirm(params: any) {
  packageScheduling.value.forEach((item: any) => {
    if (item.date === params.fulldate) {
      if (item.value > 0) {
        navigateTo(
          `/pages/physical-examination/medical-registration/index?packageCode=${code.value}&date=${params.fulldate}&price=${packageInfo.value.preferentialPrice}&packageName=${packageInfo.value.packageName}`
        );
      } else {
        uni.showToast({
          title: "该日期已约满",
          icon: "none",
        });
      }
    }
  });
}
</script>

<style lang="scss" scoped>
.package_details {
  padding: 20rpx 20rpx 130rpx;
  background: linear-gradient(to bottom, #7b81ff, #f2f3ff 50vh);
  font-size: 30rpx;
  min-height: 97vh;

  .nav {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 20rpx 30rpx 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .item {
      height: 60rpx;
      display: flex;
      align-items: center;
    }

    .name {
      font-size: 36rpx;
      font-weight: bold;
    }

    .tag {
      padding: 5rpx 10rpx;
      color: #7b81ff;
      margin-right: 10rpx;
      border-radius: 5rpx;
      background: rgba($color: #7b81ff, $alpha: 0.1);
      font-size: 20rpx;
    }

    .intro {
      font-size: 28rpx;
    }

    .price {
      display: flex;
      align-items: flex-end;
      height: 45rpx;
      .preferential_price {
        margin-right: 20rpx;
        display: flex;
        align-items: baseline;
      }

      .original_price {
        text-decoration: line-through;
        display: flex;
        align-items: flex-end;
        color: #999;
      }
    }
  }

  .table {
    margin: 20rpx 0;
    :deep(.uni-table-tr) {
      &:nth-child(odd) {
        background-color: #f8f8ff;
      }

      &:nth-child(even) {
        background-color: #f2f3ff;
      }

      .uni-table-th {
        color: #7b81ff;
      }

      .uni-table-td {
        font-size: 26rpx;
      }
    }
  }
}

.footer {
  position: fixed;
  bottom: 0;
  width: 670rpx;
  height: 150rpx;
  background-color: #fff;
  padding: 0 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .price {
    text:nth-child(1) {
      margin-right: 10rpx;
    }

    text:nth-child(2) {
      color: #7b81ff;
      font-size: 40rpx;
      font-weight: bold;
    }
  }

  button {
    background-color: #7b81ff;
    border-color: #7b81ff;
    color: #fff;
    width: 270rpx;
    border-radius: 5px;
  }
}

.calendar {
  :deep(.uni-calendar-item--isDay) {
    background-color: #7b81ff;

    .uni-calendar-item--extra {
      color: #fff;
    }
  }

  :deep(.uni-calendar-item--checked) {
    background-color: #7b81ff;

    .uni-calendar-item--extra {
      color: #fff;
    }
  }

  :deep(.uni-calendar-item__weeks-box) {
    .uni-calendar-item--isDay-text,
    .uni-calendar-item--extra {
      color: #7b81ff;
    }
    .uni-calendar-item--isDay {
      color: #fff;
    }
  }

  :deep(.uni-calendar-item--checked) {
    .uni-calendar-item__weeks-lunar-text {
      color: #fff;
    }
  }
}
</style>
