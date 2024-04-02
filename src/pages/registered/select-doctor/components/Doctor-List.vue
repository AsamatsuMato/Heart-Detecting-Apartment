<template>
  <view class="doctor_list">
    <view class="label"> 坐诊医生 </view>
    <view class="list">
      <view class="item" v-for="item in docList" :key="item.docCode">
        <image
          src="@/static/icon/about/default-head.svg"
          mode="widthFix"
        ></image>
        <view class="doc_info">
          <view class="top">
            <view class="name_position">
              <text style="font-weight: bold">{{ item.docName }}</text>
              <text>{{ item.position }}</text>
            </view>
            <button
              :class="item.remaining === 0 ? 'disabled' : ''"
              :disabled="item.remaining === 0"
              @click="goToSelectTime(item.docCode)"
            >
              <view class="price">￥{{ item.price }}</view
              >|
              <view class="remaining">{{
                item.remaining === 0 ? "约满" : `剩余${item.remaining}`
              }}</view>
            </button>
          </view>
          <view class="bottom">
            {{ item.docIntro }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { navigateTo } from "@/router/index";
import $bus from "@/bus/index";
import { getDoctorListApi } from "@/apis/doctor/index";
import { type DocListInter } from "./types";

onMounted(() => {
  $bus.on("dateSelect", (params: any) => {
    date.value = params;
  });
});

const deptCode = ref("");
const date = ref("");

watch(date, () => {
  nextTick(() => {
    getDoctorList();
  });
});

async function getDoctorList() {
  docList.value.length = 0;
  const data = {
    deptCode: deptCode.value,
    date: date.value,
  };
  try {
    const res: any = await getDoctorListApi(data);
    docList.value = res;
  } catch (err) {
    console.log(err);
  }
}

const docList = ref<Array<DocListInter>>([]);

function goToSelectTime(docCode: string) {
  navigateTo(`/pages/registered/select-time/index?docCode=${docCode}`);
}

defineExpose({
  deptCode,
});
</script>

<style lang="scss" scoped>
.doctor_list {
  padding: 20rpx;

  .label {
    margin-bottom: 40rpx;
  }

  .list {
    .item {
      background-color: #fff;
      border-radius: 5px;
      margin-bottom: 20rpx;
      padding: 20rpx;
      display: flex;
      align-items: center;

      image {
        width: 120rpx;
        margin-right: 20rpx;
      }

      .doc_info {
        height: 130rpx;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .name_position {
            text {
              &:nth-child(1) {
                font-size: 32rpx;
                margin-right: 10rpx;
              }

              &:nth-child(2) {
                font-size: 26rpx;
              }
            }
          }

          button {
            padding: 20rpx;
            min-width: 170rpx;
            height: 64rpx;
            font-size: 24rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #226bf3;
            color: #fff;
            border-radius: 5px;
            border: none;

            .price {
              margin-right: 10rpx;
            }

            .remaining {
              margin-left: 10rpx;
            }
          }

          .disabled {
            background: rgba($color: #226bf3, $alpha: 0.4);
          }
        }

        .bottom {
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          font-size: 26rpx;
          color: #877f7f;
        }
      }
    }
  }
}
</style>
