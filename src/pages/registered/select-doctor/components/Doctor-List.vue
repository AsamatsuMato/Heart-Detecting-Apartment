<template>
	<view class="doctor_list">
		<view class="label">
            坐诊医生
        </view>
		<view class="list">
            <view class="item" v-for="item in docList" :key="item.docId">
                <image src="@/static/icon/about/default-head.svg"></image>
            </view>
        </view>
	</view>
</template>

<script setup lang="ts">
    const docList = ref([
        {
            docId: 'Doc1000',
            docName: '邓庆权',
            position: '副主任医师',
            registeredQuantity: 93,
            docIntro: '从事泌尿外科专业19年。擅长治疗泌尿系肿瘤、结石、前列腺疾患',
            price: 12,
            remaining: 50
        },
        {
            docId: 'Doc1001',
            docName: '张甲佑',
            position: '副主任医师',
            registeredQuantity: 102,
            docIntro: '从事临床、门诊诊疗工作47年。诊治大批危、疑、难患者，积累了丰富的临床经验，发表医学论文10余篇，获多项科技奖项。擅长外科，特别是泌尿外科病的诊治，如前列腺病、各种结石、肿瘤、男性病、不育症等',
            price: 12,
            remaining: 36
        },
    ])
</script>

<style lang="scss" scoped>
	.doctor_list {
        padding: 20rpx;

        .label {
            margin-bottom: 40rpx;
        }

        .list {

            .item {
                border: 1rpx solid #D7D7D7;
                border-radius: 5px;
                height: 200rpx;
                margin-bottom: 20rpx;

                image {
                    width: 100rpx;
                }
            }
        }
    }
</style>