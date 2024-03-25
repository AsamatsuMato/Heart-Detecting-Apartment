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
          @click="handleSelectDate(item)"
          >{{ item.completeDate }} 周{{ item.week }}</view
        >
      </scroll-view>
      <scroll-view scroll-y="true" class="right">
        <view class="item" v-for="item in timeList" :key="item.timePeriodId">
          <view>{{ item.timePeriod }}</view>
          <view
            v-if="item.remaining !== 0"
            style="color: #226bf3"
            @click="goToConfirm"
            >剩余{{ item.remaining }}</view
          >
          <view v-else>约满</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getSevenDays } from "../select-doctor/getDate";

onMounted(() => {
  dateList.value = getSevenDays();
});

const docInfo = ref({
  docName: "张甲佑",
  position: "副主任医师",
  isCollect: false,
  docIntro:
    "从事临床、门诊诊疗工作47年。诊治大批危、疑、难患者，积累了丰富的临床经验，发表医学论文10余篇，获多项科技奖项。擅长外科，特别是泌尿外科病的诊治，如前列腺病、各种结石、肿瘤、男性病、不育症等",
});

const dateList = ref();

function handleSelectDate(params: any) {
  dateList.value.forEach((item: any) => {
    if (params === item) {
      item.isActive = true;
    } else {
      item.isActive = false;
    }
  });
}

const timeList = ref([
  {
    timePeriodId: 1,
    timePeriod: "08:00-08:30",
    remaining: 0,
  },
  {
    timePeriodId: 2,
    timePeriod: "08:30-09:00",
    remaining: 10,
  },
  {
    timePeriodId: 3,
    timePeriod: "09:00-09:30",
    remaining: 40,
  },
]);

function goToConfirm() {
  uni.navigateTo({
    url: "/pages/registered/reg-confirm/index",
  });
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
