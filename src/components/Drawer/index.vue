<template>
  <view
    v-show="visibility"
    class="mask"
    :style="{ background: maskBackground }"
    @click="maskClick"
  ></view>
  <view
    v-show="visibility"
    class="drawer"
    :style="{ height: `${props.height}rpx`, bottom: `${drawerBottom}rpx` }"
  >
    <view class="title">
      <slot name="title"></slot>
    </view>
    <view class="content">
      <slot name="content"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    default: 400,
  },
});

const visibility = ref(false);
const drawerBottom = ref(-props.height);
const maskBackground = ref("rgba(0, 0, 0, 0.4)");

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      visibility.value = val;
      drawerBottom.value += props.height;
      maskBackground.value = "rgba(0, 0, 0, 0.4)";
      emit("update:modelValue", visibility.value);
    } else {
      visibility.value = false;
      maskBackground.value = "rgba(0, 0, 0, 0)";
      emit("update:modelValue", visibility.value);
    }
  },
);

const emit = defineEmits(["update:modelValue"]);

function maskClick() {
  drawerBottom.value -= props.height;
  visibility.value = false;
  maskBackground.value = "rgba(0, 0, 0, 0)";
  emit("update:modelValue", visibility.value);
}
</script>

<style lang="scss" scoped>
.mask {
  position: absolute;
  top: 0;
  z-index: 998;
  width: 750rpx;
  height: 100vh;
  transition: all 0.2s ease-in-out;
}
.drawer {
  z-index: 999;
  background-color: #fff;
  position: fixed;
  bottom: -400rpx;
  width: 750rpx;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: all 0.2s ease-in-out;

  .title {
    width: 750rpx;
    // padding: 20rpx 0 50rpx;
    display: flex;
    justify-content: center;
    font-weight: bold;
  }

  .content {
    width: 750rpx;
    // padding: 0 30rpx;
  }
}
</style>
