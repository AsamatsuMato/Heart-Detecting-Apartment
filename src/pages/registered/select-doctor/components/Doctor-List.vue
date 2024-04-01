<template>
  <view class="doctor_list">
    <view class="label"> 坐诊医生 </view>
    <view class="list">
      <view class="item" v-for="item in docList" :key="item.docId">
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
              @click="goToSelectTime"
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
const docList = ref([
  {
    docId: "Doc1000",
    docName: "邓庆权",
    position: "副主任医师",
    docIntro: "从事泌尿外科专业19年。擅长治疗泌尿系肿瘤、结石、前列腺疾患",
    price: 12,
    remaining: 50,
  },
  {
    docId: "Doc1001",
    docName: "张甲佑",
    position: "副主任医师",
    docIntro:
      "从事临床、门诊诊疗工作47年。诊治大批危、疑、难患者，积累了丰富的临床经验，发表医学论文10余篇，获多项科技奖项。擅长外科，特别是泌尿外科病的诊治，如前列腺病、各种结石、肿瘤、男性病、不育症等",
    price: 12,
    remaining: 0,
  },
]);

function goToSelectTime() {
  navigateTo("/pages/registered/select-time/index");
}
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
