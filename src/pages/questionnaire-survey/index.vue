<template>
  <view class="questionnaire_survey">
    <view class="title">心检寓门诊患者满意度调查</view>
    <view class="content">
      <view
        class="item"
        v-for="(item, index) in questionnaireList"
        :key="item.qCode"
      >
        <view class="question">{{ index + 1 }}. {{ item.question }}</view>
        <radio-group>
          <label v-for="(option, optionIndex) in item.options">
            <view>
              <radio
                :value="option.value"
                :checked="optionIndex === 0 ? true : false"
              />
            </view>
            <view>{{ option.key }}</view>
          </label>
        </radio-group>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getDepartmentListApi } from "@/apis/questionnaire/index";
import { onLoad } from "@dcloudio/uni-app";

onLoad(() => {
  getDepartmentList();
});

const questionnaireList = ref([]);

async function getDepartmentList() {
  try {
    const res: any = await getDepartmentListApi();
    questionnaireList.value = res;
  } catch (err) {
    console.log(err);
  }
}
</script>

<style lang="scss" scoped>
.questionnaire_survey {
  padding: 40rpx 20rpx;
  background-color: #f5f5f5;
  font-size: 30rpx;
  min-height: 97vh;

  .title {
    width: 100%;
    font-size: 36rpx;
    text-align: center;
    margin-bottom: 40rpx;
  }

  .content {
    .item {
      margin: 20rpx 0;
      padding: 20rpx 40rpx;
      background-color: #fff;
      border-radius: 5px;

      .question {
        height: 80rpx;
        display: flex;
        align-items: center;
      }

      radio-group {
        display: flex;
        flex-direction: column;
        label {
          width: 100%;
          height: 80rpx;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
