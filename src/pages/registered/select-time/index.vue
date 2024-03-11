<template>
	<view class="select_time">
		<view class="doc_info">
            <view class="top">
                <image src="@/static/icon/about/default-head.svg" mode="widthFix"></image>
                <view class="details">
                    <view class="name">
                        <text>{{ docInfo.docName }}</text>
                        <text>{{ docInfo.position }}</text>
                    </view>
                    <view class="registered_quantity">月度累计挂号量: {{ docInfo.registeredQuantity }}</view>
                </view>
            </view>
            <view class="bottom">
                {{ docInfo.docIntro }}
            </view>
        </view>
        <view class="selector">
            <scroll-view 
                scroll-y="true" 
                class="left"
            >
                <view class="item" :class="item.isActive ? 'active' : ''" v-for="item in dateList" :key="item.week" @click="handleSelectDate(item)">{{ item.completeDate }} 周{{ item.week }}</view>
            </scroll-view>
            <scroll-view 
                scroll-y="true" 
                class="right"
            >
                <view class="item" v-for="item in timeList" :key="item.timePeriodId">
                    <view>{{ item.timePeriod }}</view>
                    <view v-if="item.remaining !== 0" style="color: #226BF3;" @click="goToConfirm">剩余{{ item.remaining }}</view>
                    <view v-else>约满</view>
                </view>
            </scroll-view>
        </view>
	</view>
</template>

<script setup lang="ts">
    import { getSevenDays } from '../select-doctor/getDate';

    onMounted(() => {
        dateList.value = getSevenDays();
    })

    const docInfo = ref({
        docName: "张甲佑",
        position: '副主任医师',
        registeredQuantity: 102,
        isCollect: false,
        docIntro: '从事临床、门诊诊疗工作47年。诊治大批危、疑、难患者，积累了丰富的临床经验，发表医学论文10余篇，获多项科技奖项。擅长外科，特别是泌尿外科病的诊治，如前列腺病、各种结石、肿瘤、男性病、不育症等',
    })

    const dateList = ref();

    function handleSelectDate(params: any) {
        dateList.value.forEach((item: any) => {
            if(params === item) {
                item.isActive = true;
            } else {
                item.isActive = false;
            }
        })
    }

    const timeList = ref([
        {
            timePeriodId: 1,
            timePeriod: '08:00-08:30',
            remaining: 0
        },
        {
            timePeriodId: 2,
            timePeriod: '08:30-09:00',
            remaining: 10
        },
        {
            timePeriodId: 3,
            timePeriod: '09:00-09:30',
            remaining: 40
        },
    ]);

    function goToConfirm() {
        uni.navigateTo({
            url: '/pages/registered/reg-confirm/index'
        })
    }
</script>

<style lang="scss" scoped>
	.select_time {
        padding: 20rpx 0;

        .doc_info {
            padding: 20rpx 40rpx;
            background-color: #FFF;

            .top {
                display: flex;
                align-items: center;

                image {
                    width: 150rpx;
                    margin-right: 20rpx;
                    margin-bottom: 30rpx;
                }

                .details {

                    .name {
                        margin-bottom: 10rpx;
                        text:nth-child(1) {
                            font-size: 36rpx;
                            margin-right: 20rpx;
                        }

                        text:nth-child(2) {
                            font-size: 32rpx;
                        }
                    }

                    .registered_quantity {
                        color: #877F7F;
                        font-size: 24rpx;
                        margin-top: 10rpx;
                    }
                }
            }

            .bottom {
                font-size: 32rpx;
                line-height: 1.5em;
                color: #877F7F;
            }
        }

        .selector {
            display: flex;
            margin-top: 20rpx;

            .left {
                width: 40vw;
                height: 100vh;
                background-color: #F2F2F2;

                .item {
                    height: 130rpx;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 28rpx;
                }

                .active {
                    color: #4186FB;
                    background-color: #FFF;
                }
            }

            .right {
                width: 60vw;
                height: 100vh;
                padding: 0 20rpx;
                background-color: #FFF;

                .item {
                    height: 130rpx;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1rpx solid #D7D7D7;
                    font-size: 28rpx;
                    padding: 0 20rpx;
                }
            }
        }
    }
</style>