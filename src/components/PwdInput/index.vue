<template>
  <view>
    <view class="password-input-warp fcc">
      <view
        class="password-input_item fcc"
        :style="{
          width: width + 'rpx',
          height: height + 'rpx',
          backgroundColor: backgroundColor,
        }"
        @click="focus = true"
        v-for="(item, index) in length"
        :key="index"
      >
        <view
          class="num"
          :class="txtStatus ? 'txtColor' : ''"
          :style="{ fontWeight: bold ? 'bold' : 'normal' }"
          v-if="password.length > index"
        >
          {{ showVal ? password[index] : placeholder }}
        </view>
        <view class="line animation" v-if="password.length == index">|</view>
      </view>

      <input
        class="input"
        type="number"
        :focus="focus"
        v-model="password"
        :maxlength="length"
        @focus="focus = true"
        @blur="focus = false"
        @input="passwordInput"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
const focus = ref(false);
const password = ref("");

const props = defineProps({
  width: {
    type: [Number, String],
    default: 100,
  },
  height: {
    type: [Number, String],
    default: 100,
  },
  backgroundColor: {
    type: String,
    default: "#FFF",
  },
  bold: {
    // 是否加粗
    type: Boolean,
    default: true,
  },
  showVal: {
    // 是否明文
    type: Boolean,
    default: true,
  },
  placeholder: {
    // 占位
    type: String,
    default: "●",
  },
  length: {
    // 密码框长度
    type: Number,
    default: 6,
  },
  txtStatus: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

function passwordInput(e: any) {
  emit("update:modelValue", password.value);
  if (e.detail.value.length === props.length) {
    focus.value = false;
    emit("confirm");
  }
}
</script>

<style lang="scss" scoped>
.password-input-warp {
  margin: 20rpx;
  position: relative;
  display: flex;
  .password-input_item {
    margin-right: 10rpx;
    text-align: center;
    line-height: 100rpx;
    // @include sc(40rpx, $fc3);
    border-radius: 14rpx;
    border: 1rpx solid #efefef;
    box-shadow: 0px 1px 2px 1px rgba(16, 24, 40, 0.05);

    &:last-child {
      margin-right: 0;
    }

    .num {
      height: 100rpx;
      line-height: 1rem;
    }
    .txtColor {
      color: #f52622;
    }

    .line {
      font-weight: normal;
      font-size: 40rpx;
      height: 100rpx;
      line-height: 1rem;
    }

    .animation {
      opacity: 0;
      animation-name: line;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-duration: 0.5s;
      animation-direction: alternate;
    }

    @keyframes line {
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    }
  }

  .input {
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    opacity: 0;
    color: transparent;
  }
}
</style>
