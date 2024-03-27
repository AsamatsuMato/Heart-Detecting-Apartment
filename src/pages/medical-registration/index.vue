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
        <picker
          mode="date"
          :value="userInfo.birthday"
          :start="startDate"
          :end="endDate"
          @change="bindDateChange"
        >
          <view>{{ userInfo.birthday }}</view>
        </picker>
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
          <radio-group class="radio_group" @change="radioChange($event, 1)">
            <label v-for="(item, index) in genderListItems" :key="index">
              <radio
                :value="item.value"
                :checked="item.checked ? true : false"
                style="transform: scale(0.9)"
              />
              <view>{{ item.name }}</view>
            </label>
          </radio-group>
        </view>
      </view>
      <view class="item">
        <text>婚姻状态</text>
        <view class="userInfo_radios">
          <radio-group class="radio_group" @change="radioChange($event, 2)">
            <label v-for="(item, index) in maritalStatusListItems" :key="index">
              <radio
                :value="item.value"
                :checked="item.checked ? true : false"
                style="transform: scale(0.9)"
              />
              <view>{{ item.name }}</view>
            </label>
          </radio-group>
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
            <radio-group class="radio_group" @change="radioChange($event, 3)">
              <label
                v-for="(item, index) in pastMedicalHistoryListItems"
                :key="index"
              >
                <radio
                  :value="item.value"
                  :checked="item.checked ? true : false"
                  style="transform: scale(0.9)"
                />{{ item.name }}
              </label>
            </radio-group>
          </view>
        </view>
        <view
          class="textarea_box"
          v-if="medicalHistory.pastMedicalHistory === '1'"
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
            <radio-group class="radio_group" @change="radioChange($event, 4)">
              <label
                v-for="(item, index) in allergicHistoryListItems"
                :key="index"
              >
                <radio
                  :value="item.value"
                  :checked="item.checked ? true : false"
                  style="transform: scale(0.9)"
                />{{ item.name }}
              </label>
            </radio-group>
          </view>
        </view>
        <view
          class="textarea_box"
          v-if="medicalHistory.allergicHistory === '1'"
        >
          <textarea
            v-model="medicalHistory.allergicHistoryContent"
            placeholder="请输入过敏史"
            auto-height
            maxlength="-1"
          ></textarea>
        </view>
      </view>
    </view>

    <custom-button content="提交" @click="" />
  </view>
</template>

<script setup lang="ts">
import { IdentityCodeValid } from "@/utils/checkIdCard";
import CustomButton from "@/components/Custom-Button/index.vue";

const userInfo = ref({
  name: "",
  idCard: "",
  birthday: getDate({ format: true }),
  phone: "",
  nation: "",
  gender: "1",
  maritalStatus: "0",
  birthPlace: "",
});

const medicalHistory = ref({
  pastMedicalHistory: "0",
  pastMedicalHistoryContent: "",
  allergicHistory: "0",
  allergicHistoryContent: "",
});

const formItems = ref({
  name: "姓名",
  idCard: "身份证号码",
  birthday: "出生日期",
  phone: "联系电话",
  nation: "民族",
  gender: "性别",
  maritalStatus: "婚姻状态",
  birthPlace: "出生地",
  pastMedicalHistoryContent: "既往病史内容",
  allergicHistoryContent: "过敏史内容",
});

const genderListItems = ref([
  {
    value: "1",
    name: "男",
    checked: "true",
  },
  {
    value: "2",
    name: "女",
  },
]);

const maritalStatusListItems = ref([
  {
    value: "0",
    name: "未婚",
    checked: "true",
  },
  {
    value: "1",
    name: "已婚",
  },
]);

const pastMedicalHistoryListItems = ref([
  {
    value: "0",
    name: "无",
    checked: "true",
  },
  {
    value: "1",
    name: "有",
  },
]);

const allergicHistoryListItems = ref([
  {
    value: "0",
    name: "无",
    checked: "true",
  },
  {
    value: "1",
    name: "有",
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

function radioChange(e: any, flag: number) {
  const { value } = e.detail;
  switch (flag) {
    case 1:
      userInfo.value.gender = value;
      break;
    case 2:
      userInfo.value.maritalStatus = value;
      break;
    case 3:
      medicalHistory.value.pastMedicalHistory = value;
      break;
    case 4:
      medicalHistory.value.allergicHistory = value;
      break;
  }
}

const startDate = getDate("start");
const endDate = getDate("end");

function getDate(type: any) {
  const date = new Date();
  let year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();

  if (type === "start") {
    year = year - 60;
  } else if (type === "end") {
    year = year + 2;
  }
  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  return `${year}-${month}-${day}`;
}

function bindDateChange(params: any) {
  userInfo.value.birthday = params.detail.value;
}
</script>

<style lang="scss" scoped>
.medical_registration {
  padding: 20rpx;
  background: linear-gradient(to bottom, #226bf3, #f5f5f5 300rpx);
  font-size: 32upx;
  font-family: "PingFang SC";

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
      }

      /* .interaction /deep/ .cl-select__icon {
        display: none;
      }

      .interaction /deep/ .cl-input {
        width: 450rpx;
      }

      .interaction /deep/ .cl-select {
        width: 400rpx;
        font-size: 32upx;
        padding: 0;
      }

      .interaction /deep/ .cl-select__placeholder {
        font-size: 32upx;
        color: #808080;
      } */

      .userInfo_radios {
        width: 400rpx;

        .radio_group {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          radio {
            margin-right: 20rpx;
          }

          label {
            display: flex;
            align-items: center;
          }

          view {
            width: 100rpx;
          }
        }
      }

      .medical_history_radios {
        width: 400rpx;
        display: flex;
        justify-content: flex-end;

        .radio_group {
          width: 250rpx;
          display: flex;
          justify-content: space-between;

          radio {
            margin-right: 20rpx;
          }

          view {
            width: 100rpx;
          }
        }
      }

      .tips {
        border: 1rpx solid #ff68a5;
        border-radius: 10rpx;
        color: #ff68a5;
        padding: 10rpx;
        background-color: #fff6fa;
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
        // color: #585858;
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
