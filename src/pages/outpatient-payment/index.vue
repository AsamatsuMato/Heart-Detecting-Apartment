<template>
  <view class="outpatient_payment">
    <view class="selector">
      <uni-data-checkbox
        v-model="selectType"
        :localdata="typeList"
        mode="button"
        selectedColor="#226bf3"
        @change="changeType"
      ></uni-data-checkbox>
    </view>
    <view class="content">
      <template v-if="selectType === 'gh' || selectType === 'all'">
        <view class="item" v-for="item in registeredList" :key="item._id">
          <view class="item_left">
            <view class="project_name"> 挂号费 </view>
            <view class="project_info">
              <text class="dept">{{ item.deptName }}</text>
              <text class="doc_name">{{ item.docName }}</text>
            </view>
            <text class="date">{{ item.appointmentTime }}</text>
          </view>
          <view class="item_right">
            <text class="price">{{ item.price }}</text>
            <button @click="goToPayDetails(item.regCode, 'gh')">
              查 看 详 情
            </button>
          </view>
        </view>
      </template>
      <template v-if="selectType === 'tj' || selectType === 'all'">
        <view class="item" v-for="item in reservedList" :key="item._id">
          <view class="item_left">
            <view class="project_name"> 体检费 </view>
            <view class="project_info">
              <text class="dept">{{ item.packageName }}</text>
            </view>
            <text class="date">{{ item.appointmentTime }}</text>
          </view>
          <view class="item_right">
            <text class="price">{{ item.price }}</text>
            <button @click="goToPayDetails(item.phyExaCode, 'tj')">
              查 看 详 情
            </button>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import { navigateTo } from "@/router/index";
import { getRegisteredRecordApi } from "@/apis/registered/index";
import { getReservedListApi } from "@/apis/physicalExamination/index";
import { onLoad } from "@dcloudio/uni-app";

onLoad(async () => {
  await getRegisteredRecord();
  await getReservedList();
});

const selectType = ref("all");
const typeList = ref([
  {
    text: "全部",
    value: "all",
  },
  {
    text: "挂号",
    value: "gh",
  },
  {
    text: "体检",
    value: "tj",
  },
]);

async function getRegisteredRecord() {
  try {
    const data = {
      medicalCardNo: uni.getStorageSync("medicalCardNo"),
      status: 1,
    };
    const res: any = await getRegisteredRecordApi(data);
    registeredList.value = res;
  } catch (err) {
    console.log(err);
  }
}

async function getReservedList() {
  try {
    const res: any = await getReservedListApi(1);
    reservedList.value = res;
  } catch (err) {
    console.log(err);
  }
}

const registeredList: any = ref([]); // 挂号列表
const reservedList: any = ref([]); // 体检预约列表

function goToPayDetails(params: string, type: string) {
  switch (type) {
    case "gh":
      navigateTo(
        `/pages/registration-record/record-details/index?regCode=${params}`
      );
      break;
    case "tj":
      navigateTo(
        `/pages/physical-examination/result/index?phyExaCode=${params}&flag=1`
      );
      break;
  }
}

async function changeType(params: any) {
  const { value } = params.detail;
  if (value === "gh") {
    getRegisteredRecord();
  } else if (value === "tj") {
    getReservedList();
  } else {
    await getRegisteredRecord();
    await getReservedList();
  }
}
</script>

<style lang="scss" scoped>
.outpatient_payment {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 97vh;

  .selector {
    :deep(.checklist-group) {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .content {
    .item {
      background-color: #fff;
      border-radius: 5px;
      padding: 30rpx 40rpx;
      margin-top: 20rpx;
      height: 150rpx;
      display: flex;
      justify-content: space-between;
      font-size: 32rpx;

      .item_left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .project_name {
          font-weight: bold;
        }

        .project_info,
        .date {
          color: #585858;
          font-size: 26rpx;
        }

        .project_info {
          .dept {
            margin-right: 20rpx;
          }
        }
      }

      .item_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        .price {
          color: #ee0509;
          font-weight: bold;

          &::before {
            content: "￥";
          }
        }

        button {
          background-color: #226bf3;
          font-size: 26rpx;
          color: #fff;
          width: 180rpx;
          height: 70rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          border-color: #226bf3;
        }
      }
    }
  }
}
</style>
