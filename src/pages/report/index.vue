<template>
  <view class="report">
    <view class="item" v-for="item in reportList" :key="item.reportId">
      <view class="nav">
        <image
          class="logo"
          src="@/static/images/hospital/app-logo.jpg"
          mode="widthFix"
        ></image>
        <text>心检寓</text>
      </view>
      <view class="content">
        <view class="content_left">
          <view class="package_name">{{ item.packageName }}</view>
          <view class="name">
            <text>就诊人:</text>
            <text>{{ item.name }}</text>
          </view>
          <view class="date">
            <text>时&nbsp;&nbsp;&nbsp;间:</text>
            <text>{{ item.date }}</text>
          </view>
        </view>
        <view class="content_right">
          <view class="status pending" v-if="item.status === 0">待出结果</view>
          <view class="status fulfilled" v-else>结果已出</view>
          <button v-if="item.status !== 0" @click="viewReport">查看报告</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const reportList = ref([
  {
    reportId: "R100100",
    packageName: "女性基础检查",
    name: "张三",
    date: "2024-3-20 12:40:56",
    status: 0,
    reportUrl: null,
  },
  {
    reportId: "R100101",
    packageName: "女性常规检查 TCT+HPV",
    name: "李四",
    date: "2024-3-20 12:40:56",
    status: 1,
    reportUrl: null,
  },
]);

function viewReport() {
  uni.downloadFile({
    url: "https://www.wedone.net.cn/testImg/final-report/N240313001.pdf",
    success: (res) => {
      let tempFilePath = res.tempFilePath;
      uni.saveFile({
        tempFilePath,
        success: (res) => {
          let filePath = res.savedFilePath;
          uni.openDocument({
            filePath,
            showMenu: true,
            fail: (err) => {
              console.log(err);
            },
          });
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
    fail: (err) => {
      console.log(err);
    },
  });
}
</script>

<style lang="scss" scoped>
.report {
  min-height: 100vh;
  padding: 20rpx;
  background-color: #f6f6f6;

  .item {
    padding: 80rpx 40rpx 30rpx;
    margin-bottom: 20rpx;
    border-radius: 5px;
    background-color: #fff;
    height: 150rpx;
    position: relative;

    .nav {
      width: 200rpx;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #f7fbff;
      color: #666;
      padding: 10rpx 0;
      border-bottom-right-radius: 10px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      font-size: 28rpx;

      image {
        width: 50rpx;
        border-radius: 50%;
      }
    }

    .content {
      display: flex;
      justify-content: space-between;
      height: 100%;

      .content_left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .package_name {
          font-weight: bold;
          font-size: 34rpx;
        }

        .name,
        .date {
          font-size: 30rpx;
          text:nth-child(1) {
            color: #999999;
            margin-right: 20rpx;
          }
        }
      }

      .content_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;

        .status {
          font-size: 30rpx;
        }

        .pending {
          color: #ff6f31;
        }

        .fulfilled {
          color: #226bf3;
        }

        button {
          padding: 20rpx;
          width: 175rpx;
          height: 75rpx;
          font-size: 30rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #226bf3;
          color: #fff;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
