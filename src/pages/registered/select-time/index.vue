<template>
  <view class="select_time">
    <view class="doc_info">
      <view class="top">
        <image
          src="@/static/icon/about/default-head.svg"
          mode="widthFix"
        ></image>
        <view class="details">
          <view class="name">
            {{ docInfo.docName }}
          </view>
          <view class="position">{{ docInfo.position }}</view>
        </view>
      </view>
      <view class="bottom">
        {{ docInfo.docIntro }}
      </view>
    </view>
    <view class="selector">
      <scroll-view scroll-y="true" class="left">
        <view
          class="item"
          :class="item.isActive ? 'active' : ''"
          v-for="item in dateList"
          :key="item.week"
          @click="handleSelectDate(item.completeDate)"
          >{{ item.completeDate }} 周{{ item.week }}</view
        >
      </scroll-view>
      <scroll-view scroll-y="true" class="right">
        <view
          class="item"
          v-for="(item, index) in timeList"
          :key="index"
          @click="goToConfirm(item.time)"
        >
          <view>{{ item.time }}</view>
          <view v-if="item.remaining !== 0" style="color: #226bf3"
            >剩余{{ item.remaining }}</view
          >
          <view v-else>约满</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { getSevenDays } from "../select-doctor/getDate";
import { navigateTo } from "@/router/index";
import { getDoctorInfoApi, getSchedulingApi } from "@/apis/doctor/index";
import { type TimeListInter } from "./types";

const docCode = ref("");

onLoad(async (option: any) => {
  docCode.value = option.docCode;
  dateList.value = await getSevenDays();
  await getDoctorInfo(option.docCode);
  handleSelectDate(option.date);
});

async function getDoctorInfo(docCode: string) {
  try {
    const { docName, position, docIntro }: any =
      await getDoctorInfoApi(docCode);
    docInfo.value.docName = docName;
    docInfo.value.position = position;
    docInfo.value.docIntro = docIntro;
  } catch (err) {
    console.log(err);
  }
}

async function getScheduling(date: string) {
  timeList.value.length = 0;
  const data = {
    docCode: docCode.value,
    date,
  };
  try {
    const res: any = await getSchedulingApi(data);
    timeList.value = res;
  } catch (err) {
    console.log(err);
  }
}

const docInfo = ref({
  docName: "",
  position: "",
  isCollect: false,
  docIntro: "",
});

const dateList = ref();

watch(
  dateList,
  (newVal) => {
    newVal.forEach((item: any) => {
      if (item.isActive) {
        getScheduling(item.completeDate);
      }
    });
  },
  { deep: true, immediate: false }
);

function handleSelectDate(params: any) {
  dateList.value.forEach((item: any) => {
    if (params === item.completeDate) {
      item.isActive = true;
    } else {
      item.isActive = false;
    }
  });
}

const timeList = ref<Array<TimeListInter>>([]);

function goToConfirm(timePeriod: string) {
  const { completeDate } = dateList.value.find((item: any) => {
    return item.isActive === true;
  });
  navigateTo(
    `/pages/registered/reg-confirm/index?docCode=${docCode.value}&date=${completeDate}&timePeriod=${timePeriod}`
  );
}
</script>

<style lang="scss" scoped>
.select_time {
  padding: 20rpx 0;
  color: #313131;

  .doc_info {
    padding: 20rpx 40rpx;
    background-color: #fff;

    .top {
      display: flex;
      align-items: center;

      image {
        width: 150rpx;
        margin-right: 20rpx;
        margin-bottom: 30rpx;
      }

      .details {
        .name {
          margin-bottom: 10rpx;
          font-size: 36rpx;
          font-weight: bold;
        }

        .position {
          font-size: 28rpx;
          margin-top: 10rpx;
          color: #585858;
        }
      }
    }

    .bottom {
      font-size: 32rpx;
      line-height: 1.5em;
      color: #585858;
    }
  }

  .selector {
    display: flex;
    margin-top: 20rpx;
    max-height: calc(100vh - 580rpx);

    .left {
      width: 40vw;
      background-color: #f2f2f2;

      .item {
        height: 130rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28rpx;
      }

      .active {
        color: #4186fb;
        background-color: #fff;
      }
    }

    .right {
      width: 60vw;
      padding: 0 20rpx;
      background-color: #fff;

      .item {
        height: 130rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid #d7d7d7;
        font-size: 28rpx;
        padding: 0 20rpx;
      }
    }
  }
}
</style>
