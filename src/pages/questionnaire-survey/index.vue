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
        <radio-group @change="handleChange($event, item.qCode)">
          <label v-for="option in item.options">
            <view>
              <radio :value="option.value" :checked="option.isActive" />
            </view>
            <view>{{ option.key }}</view>
          </label>
        </radio-group>
      </view>
    </view>
    <custom-button content="提交" @click="handleSubmit"></custom-button>
  </view>
  <uni-fab
    :pattern="pattern"
    :popMenu="false"
    horizontal="right"
    vertical="bottom"
    @fabClick="backToTop"
  />
</template>

<script setup lang="ts">
import CustomButton from "@/components/Custom-Button/index.vue";
import {
  getQuestionnairesListApi,
  submitQuestionnairesApi,
} from "@/apis/questionnaire/index";
import { onLoad } from "@dcloudio/uni-app";
import { type QuestionnaireListInter } from "./types";
import { reLaunch } from "@/router";

onLoad(() => {
  getQuestionnairesList();
});

const questionnaireList = ref<Array<QuestionnaireListInter>>([]);

async function getQuestionnairesList() {
  try {
    const res: any = await getQuestionnairesListApi();
    res.forEach((item: any) => {
      item.options.forEach((deepItem: any, index: number) => {
        if (index === 0) {
          deepItem.isActive = true;
        } else {
          deepItem.isActive = false;
        }
      });
    });
    questionnaireList.value = res;
  } catch (err) {
    console.log(err);
  }
}

const pattern = ref({
  icon: "up",
});

function backToTop() {
  uni.pageScrollTo({
    scrollTop: 0,
  });
}

function handleChange({ detail: { value } }: any, qCode: string) {
  questionnaireList.value.forEach((item: QuestionnaireListInter) => {
    if (qCode === item.qCode) {
      item.options.forEach((deepItem: any) => {
        if (value === deepItem.value) {
          deepItem.isActive = true;
        } else {
          deepItem.isActive = false;
        }
      });
    }
  });
}

async function handleSubmit() {
  const result: any = [];
  questionnaireList.value.forEach((item: QuestionnaireListInter) => {
    item.options.forEach((deepItem: any) => {
      if (deepItem.isActive) {
        result.push({
          qCode: item.qCode,
          value: deepItem.value,
        });
      }
    });
  });
  const data = {
    result,
  };
  try {
    await submitQuestionnairesApi(data);
    reLaunch("/pages/home/index");
    uni.showToast({
      title: "问卷提交成功",
      icon: "success",
    });
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
