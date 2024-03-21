<template>
  <button
    class="custom_button"
    :style="{
      background: props.background,
      color: props.color,
      border: props.border ? border : '',
      borderColor: props.background,
    }"
    @click="click"
  >
    {{ content }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  content: {
    type: String,
    default: "确认",
  },
  background: {
    type: String,
    default: "#226BF3",
  },
  color: {
    type: String,
    default: "#FFF",
  },
  border: {
    type: String,
  },
});

const emit = defineEmits(["click"]);

function click() {
  emit("click");
}
</script>

<style lang="scss" scoped>
.custom_button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 90rpx;
}
</style>
