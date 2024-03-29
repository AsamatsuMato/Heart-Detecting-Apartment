<template>
  <view class="hospital_introduction">
    <view class="label">
      <view class="icon"></view>
      <text class="title">本院介绍</text>
    </view>
    <view class="intro_details" v-html="props.hospitalInfo.introduce"> </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  hospitalInfo: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.hospital_introduction {
  margin: 20rpx 0;
  .label {
    margin: 20rpx 0;
    display: flex;
    align-items: center;

    .icon {
      background-color: #226bf3;
      width: 40rpx;
      height: 13rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
    }

    .title {
      font-size: 20px;
    }
  }

  .intro_details {
    font-size: 14px;
  }
}
</style>
