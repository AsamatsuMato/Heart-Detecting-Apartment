<template>
	<view class="patient_info">
		<view class="content">
            <view class="name">{{ patientInfo.name }}</view>
            <view class="qrcode">
				<tki-qrcode 
					ref="qrcode" 
					val="445102198712274554" 
					icon="../../static/images/WechatIMG302.png"
					:iconSize="100" 
					:onval="true"
					:size="400" 
					unit="rpx"
				/>
			</view>
            <view class="info_table">
                <view class="item">
                    <view class="label">门诊号</view>
                    <view class="val">{{ patientInfo.outpatientNo }}</view>
                </view>
                <view class="item">
                    <view class="label">身份证号</view>
                    <view class="val">{{ formattedIdCard }}</view>
                </view>
                <view class="item">
                    <view class="label">手机号</view>
                    <view class="val">{{ formattedPhone }}</view>
                </view>
                <view class="item">
                    <view class="label">住址</view>
                    <view class="val">{{ patientInfo.address }}</view>
                </view>
            </view>
        </view>
        <view class="tip">
            如若您输入建档信息有误，请先行解除该就诊人并重新进行建档，以免影响后续的就医诊疗。
        </view>
        <custom-button content="解除绑定" background="#FFF" border="1rpx solid #E6E6E6" color="#226BF3"></custom-button>
	</view>
</template>

<script setup lang="ts">
    import CustomButton from "@/components/Custom-Button/index.vue";
    import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";

	const qrcode = ref(tkiQrcode);

	onMounted(() => {
		qrcode.value._makeCode();
	})

    const patientInfo = ref({
        name: '张三',
        outpatientNo: '000140626800',
		idCard: '445102198712274554',
        phone: '18912345678',
        address: '广东省广州市'
    })

    const formattedIdCard = computed(() => {
		const firstFour = patientInfo.value.idCard.substring(0, 4);
		const lastFour = patientInfo.value.idCard.substring(14);

		const middleStars = '*'.repeat(patientInfo.value.idCard.length - 8);

		return `${firstFour}${middleStars}${lastFour}`;
	})

    const formattedPhone = computed(() => {
		const front = patientInfo.value.phone.substring(0, 3);
		const back = patientInfo.value.phone.substring(7);

		const middleStars = '*'.repeat(patientInfo.value.phone.length - 4);

		return `${front}${middleStars}${back}`;
	})
</script>

<style lang="scss" scoped>
	.patient_info {
        padding: 20rpx;
        min-height: 96vh;
        background: linear-gradient(to bottom, #226BF3, #F5F5F5 500rpx);

        .content {
            background-color: #FFF;
            border-radius: 10px;
            padding: 20rpx 20rpx 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;

            .name, .qrcode {
                margin-bottom: 40rpx;
            }

            .name {
                font-weight: bold;
                font-size: 36rpx;
            }

            .info_table {
                width: 100%;

                .item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1rpx solid #E1E1E1;
                    padding: 20rpx;
                    height: 70rpx;
                }

                .item:nth-last-child(1) {
                    border: none;
                }
            }
        }

        .tip {
            background-color: #FFF;
            line-height: 1.5em;
            font-weight: bold;
            border-radius: 10px;
            padding: 30rpx 20rpx;
            margin: 40rpx 0;
        }
    }
</style>