<template>
    <view class="Outpatient_Service">
        <view class="label">
            <view class="icon"></view>
            <text class="title">门诊服务</text>
        </view>
        <view class="top">
            <view class="register">
                <view class="title">
                    <text>我要挂号</text>
                    <text>在线挂号预约</text>
                </view>
                <view class="icon">
                    <image class="icon_img" src="@/static/icon/outpatient-service/register.png" mode="widthFix"></image>
                </view>
            </view>
            <view class="separation"></view>
            <view class="pay">
                <view class="title">
                    <text>门诊缴费</text>
                    <text>线上快捷缴费</text>
                </view>
                <view class="icon">
                    <image class="icon_img" src="@/static/icon/outpatient-service/pay.png" mode="widthFix"></image>
                </view>
            </view>
        </view>
        <view class="bottom">
            <view class="item">
                <image src="@/static/icon/outpatient-service/registration-record.png" mode="widthFix"></image>
                <text>挂号记录</text>
            </view>
            <view class="item">
                <image src="@/static/icon/outpatient-service/report-query.png" mode="widthFix"></image>
                <text>报告查询</text>
            </view>
            <view class="item">
                <image src="@/static/icon/outpatient-service/payment-record.png" mode="widthFix"></image>
                <text>缴费记录</text>
            </view>
            <view class="item">
                <image src="@/static/icon/outpatient-service/patient-management.png" mode="widthFix"></image>
                <text>就诊人管理</text>
            </view>
            <view class="item">
                <image src="@/static/icon/outpatient-service/dialysis-prepayment.png" mode="widthFix"></image>
                <text>透析预缴</text>
            </view>
            <view class="item">
                <image src="@/static/icon/outpatient-service/medical-registration.png" mode="widthFix"></image>
                <text>体检登记</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
	
</script>

<style lang="scss" scoped>
    .Outpatient_Service {
        margin: 50rpx 0;
        .label {
            margin: 20rpx 0;
            display: flex;
            align-items: center;

            .icon {
                background-color: #226BF3;
                width: 40rpx;
                height: 13rpx;
                border-radius: 10rpx;
                margin-right: 20rpx;
            }

            .title {
                font-size: 20px;
            }
        }

        .top {
            width: 100%;
            display: flex;
            margin-bottom: 10rpx;

            .separation {
                width: 20rpx;
            }

            .register {
                flex: 1;
                padding: 0 20rpx;
                border: 1rpx solid #FBDDDE;
                background-color: #FEEFEF;
                border-radius: 7rpx;
                height: 170rpx;
                display: flex;

                .title {
                    width: 70%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;

                    text {
                        color: #FF623E;
                    }

                    text:nth-child(1) {
                        font-size: 20px;
                    }

                    text:nth-child(2) {
                        font-size: 14px;
                    }
                }

                .icon {
                    width: 30%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .icon_img {
                        width: 80rpx
                    }
                }
            }

            .pay {
                flex: 1;
                padding: 0 20rpx;
                border: 1rpx solid #D1F4E2;
                background-color: #EAFBF1;
                border-radius: 7rpx;
                height: 170rpx;
                display: flex;

                .title {
                    width: 70%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;

                    text {
                        color: #08CE9A;
                    }

                    text:nth-child(1) {
                        font-size: 20px;
                    }
                    
                    text:nth-child(2) {
                        font-size: 14px;
                    }
                }

                .icon {
                    width: 30%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .icon_img {
                        width: 80rpx
                    }
                }
            }
        }

        .bottom {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            font-size: 14px;

            .item {
                height: 150rpx;
                padding: 10rpx 0;
                margin: 10rpx;
                display: flex;
                flex: 0 0 calc(25% - 25rpx);
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                border: 0.5rpx solid #EAEAEA;
                background-color: #FFF;
                border-radius: 7rpx;
                box-shadow: 0rpx 0rpx 20rpx 10rpx #F5F9FF;

                image {
                    width: 80rpx;
                }
            }
        }
    }
</style>