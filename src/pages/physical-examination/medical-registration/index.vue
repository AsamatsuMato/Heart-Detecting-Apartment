<template>
  <view class="medical_registration">
    <view class="userInfo">
      <view class="title">
        <view class="title_font">体检用户信息</view>
      </view>
      <view class="item">
        <text>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</text>
        <input
          class="interaction"
          v-model="userInfo.name"
          :border="false"
          placeholder="请输入体检用户姓名"
          placeholder-class="placeholderFont"
        />
      </view>
      <view class="item">
        <text>身份证号</text>
        <input
          class="interaction"
          type="idcard"
          v-model="userInfo.idCard"
          :border="false"
          placeholder="请输入身份证号码"
          @blur="loseIdCardFocus(userInfo.idCard)"
        />
      </view>
      <view class="item">
        <text>出生日期</text>
        <uni-datetime-picker
          type="date"
          :clear-icon="false"
          :border="false"
          v-model="userInfo.birthday"
          placeholder="请选择出生日期"
        />
      </view>
      <view class="item">
        <text>联系电话</text>
        <input
          class="interaction"
          type="number"
          v-model="userInfo.phone"
          :border="false"
          placeholder="请输入联系电话"
          @blur="checkPhone(userInfo.phone)"
        />
      </view>
      <view class="item">
        <text>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</text>
        <view class="userInfo_radios">
          <uni-data-checkbox
            v-model="userInfo.gender"
            :localdata="genderListItems"
            selectedColor="#7b81ff"
          ></uni-data-checkbox>
        </view>
      </view>
      <view class="item">
        <text>婚姻状态</text>
        <view class="userInfo_radios">
          <uni-data-checkbox
            v-model="userInfo.maritalStatus"
            :localdata="maritalStatusListItems"
            selectedColor="#7b81ff"
          ></uni-data-checkbox>
        </view>
      </view>
      <view class="textarea_birthPlace">
        <text>出&nbsp;&nbsp;生&nbsp;&nbsp;地</text>
        <textarea
          v-model="userInfo.birthPlace"
          placeholder="请输入出生地址"
          auto-height
          maxlength="-1"
        />
      </view>
    </view>

    <view class="medical_history">
      <view class="title">
        <view class="title_font">过敏/既往病史</view>
      </view>
      <view class="item flex_special">
        <view class="flex_special_top">
          <text>既往病史</text>
          <view class="medical_history_radios">
            <uni-data-checkbox
              v-model="medicalHistory.pastMedicalHistory"
              :localdata="pastMedicalHistoryListItems"
              selectedColor="#7b81ff"
            ></uni-data-checkbox>
          </view>
        </view>
        <view
          class="textarea_box"
          v-if="medicalHistory.pastMedicalHistory === 1"
        >
          <textarea
            v-model="medicalHistory.pastMedicalHistoryContent"
            placeholder="请输入既往病史"
            auto-height
            maxlength="-1"
          ></textarea>
        </view>
      </view>
      <view class="item flex_special" style="border-bottom: none">
        <view class="flex_special_top">
          <text>过敏史</text>
          <view class="medical_history_radios">
            <uni-data-checkbox
              v-model="medicalHistory.allergicHistory"
              :localdata="allergicHistoryListItems"
              selectedColor="#7b81ff"
            ></uni-data-checkbox>
          </view>
        </view>
        <view class="textarea_box" v-if="medicalHistory.allergicHistory === 1">
          <textarea
            v-model="medicalHistory.allergicHistoryContent"
            placeholder="请输入过敏史"
            auto-height
            maxlength="-1"
          ></textarea>
        </view>
      </view>
    </view>

    <custom-button content="提交" background="#7b81ff" @click="submit" />
  </view>
</template>

<script setup lang="ts">
import { IdentityCodeValid } from "@/utils/checkIdCard";
import CustomButton from "@/components/Custom-Button/index.vue";
import moment from "moment";
import { bookPhysicalExaminationApi } from "@/apis/physicalExamination/index";
import { onLoad } from "@dcloudio/uni-app";
import { navigateTo } from "@/router";

const packageCode = ref("");
const packageName = ref("");
const date = ref("");
const price = ref(0);
onLoad((option: any) => {
  packageCode.value = option.packageCode;
  packageName.value = option.packageName;
  date.value = option.date;
  price.value = option.price;
});

const userInfo = ref({
  name: "",
  idCard: "",
  birthday: moment().format("YYYY-MM-DD"),
  phone: "",
  gender: 1,
  maritalStatus: 0,
  birthPlace: "",
});

const medicalHistory = ref({
  pastMedicalHistory: 0,
  pastMedicalHistoryContent: "",
  allergicHistory: 0,
  allergicHistoryContent: "",
});

const genderListItems = ref([
  {
    value: 1,
    text: "男",
  },
  {
    value: 0,
    text: "女",
  },
]);

const maritalStatusListItems = ref([
  {
    value: 0,
    text: "未婚",
  },
  {
    value: 1,
    text: "已婚",
  },
]);

const pastMedicalHistoryListItems = ref([
  {
    value: 0,
    text: "无",
  },
  {
    value: 1,
    text: "有",
  },
]);

const allergicHistoryListItems = ref([
  {
    value: 0,
    text: "无",
  },
  {
    value: 1,
    text: "有",
  },
]);

function loseIdCardFocus(params: string) {
  if (params) {
    let idCard = params;
    if (
      IdentityCodeValid(idCard) === "成功通过了验证" &&
      idCard.length === 18
    ) {
      let birthday = idCard.slice(6, 14);
      let years = birthday.slice(0, 4);
      let month = birthday.slice(4, 6);
      let day = birthday.slice(6);
      let str = years + "-" + month + "-" + day;
      userInfo.value.birthday = str;
    } else {
      uni.showToast({
        title: "身份证输入错误",
        icon: "none",
        duration: 2000,
      });
    }
  }
}

function checkPhone(params: string) {
  if (params) {
    const regex = /^1[3-9]\d{9}$/;
    if (!regex.test(params)) {
      uni.showToast({
        title: "手机号输入错误",
        icon: "none",
        duration: 2000,
      });
    }
  }
}

async function submit() {
  const { name, idCard, birthday, phone, gender, maritalStatus, birthPlace } =
    userInfo.value;
  const {
    pastMedicalHistory,
    pastMedicalHistoryContent,
    allergicHistory,
    allergicHistoryContent,
  } = medicalHistory.value;
  const data = {
    packageCode: packageCode.value,
    packageName: packageName.value,
    date: date.value,
    price: price.value,
    name,
    idCard,
    birthday,
    phone,
    gender,
    maritalStatus,
    birthPlace,
    ...(pastMedicalHistory === 1 ? { pastMedicalHistoryContent } : {}),
    ...(allergicHistory === 1 ? { allergicHistoryContent } : {}),
    allergicHistoryContent,
  };
  try {
    const res: any = await bookPhysicalExaminationApi(data);
    navigateTo(
      `/pages/physical-examination/result/index?phyExaCode=${res}&flag=1`
    );
  } catch (err) {
    console.log(err);
  }
}
</script>

<style lang="scss" scoped>
.medical_registration {
  padding: 20rpx;
  background: linear-gradient(to bottom, #7b81ff, #f2f3ff 50vh);
  font-size: 32upx;

  .userInfo,
  .medical_history,
  .unit_info {
    background-color: #fff;
    padding: 0 40rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;

    .title,
    .item {
      min-height: 120rpx;
      border-bottom: 1rpx solid #e7e7e7;
      display: flex;
      align-items: center;

      text {
        width: 180rpx;
        display: flex;
        align-items: center;
        font-size: 32upx;
      }

      img {
        width: 30rpx;
        height: 30rpx;
      }

      .title_font {
        font-weight: bold;
      }

      .interaction {
        width: 400rpx;
        padding: 0;
      }

      :deep(.uniui-calendar) {
        display: none;
      }

      :deep(.uni-date__x-input) {
        font-size: 32upx;
        color: #000;
      }

      .userInfo_radios {
        width: 400rpx;

        :deep(.checklist-group) {
          .checklist-box {
            margin-left: 5rpx;
            margin-right: 60rpx;

            .radio__inner {
              width: 32upx;
              height: 32upx;

              .radio__inner-icon {
                width: 20upx;
                height: 20upx;
              }
            }

            .checklist-text {
              font-size: 32upx;
              color: #000;
            }
          }
        }
      }

      .medical_history_radios {
        width: 400rpx;
        display: flex;
        justify-content: flex-end;

        :deep(.checklist-group) {
          .checklist-box {
            margin-left: 5rpx;
            margin-right: 60rpx;

            .radio__inner {
              width: 32upx;
              height: 32upx;

              .radio__inner-icon {
                width: 20upx;
                height: 20upx;
              }
            }

            .checklist-text {
              font-size: 32upx;
              color: #000;
            }
          }
        }
      }

      .textarea {
        width: 100%;
        background-color: #f5f5f5;
        border-radius: 10rpx;
        padding: 0 20rpx;
      }
    }

    .flex_between {
      display: flex;
      justify-content: space-between;
    }

    .flex_special {
      padding: 10rpx 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .flex_special_top {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .textarea_box {
        width: 100%;
        background-color: #f5f5f5;
        margin-top: 20rpx;
        border-radius: 10rpx;
        display: flex;
        align-items: center;

        textarea {
          padding: 20rpx;
          width: 100%;
          background-color: transparent;
        }
      }

      input {
        width: 100%;
        height: auto;
        background-color: #f5f5f5;
        border-radius: 10rpx;
        padding: 0 20rpx;
      }
    }

    .textarea_birthPlace {
      min-height: 170rpx;
      display: flex;
      align-items: flex-start;
      padding: 30rpx 0;

      text {
        width: 180rpx;
        font-size: 32upx;
      }

      textarea {
        width: 400rpx;
      }
    }

    .flex_unit {
      display: flex;
      justify-content: space-between;
    }
  }

  :deep(.custom_button) {
    margin: 50rpx 0;
  }
}
</style>
