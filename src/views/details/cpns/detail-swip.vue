<template>
	<div class="swip">
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<template v-for="(item, index) in swipData" :key="index">
				<van-swipe-item class="item">
					<img :src="item.url" alt="">
				</van-swipe-item>
			</template>
			<template #indicator="props">
				<div class="custom-indicator">{{ props.active }}/{{ swipData?.length }}/{{ props.total }}</div>
				<!-- <div class="custom-indicator">
					<template v-for="(item, index) in swipData" :key="index">
						<span class="item">{{ item.title }}</span>
					</template>
				</div> -->
			</template>
		</van-swipe>
	</div>
</template>

<script setup>
import useDetail from '@/store/modules/detail';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';


const detailStore = useDetail()
const { mainPart } = storeToRefs(detailStore)
// console.log()
const swipData = computed(() => mainPart.value?.topModule?.housePicture.housePics)


// for (const item of swipData) {
// 	let valueArray = swipDataId[item.enumPictureCategory]
// 	if (!valueArray) {
// 		valueArray = []
// 		swipDataId[item.enumPictureCategory] = valueArray
// 	}
// 	valueArray.push(item)
// }
// console.log(swipDataId)
// for (let item of swipData.value) {
// 	swipDataId[item.enumPictureCategory] = []
// }
// for (let item of swipData.value) {
// 	swipDataId[item.enumPictureCategory].push(item)
// }
// console.log(swipDataId)

</script>

<style lang="less" scoped>
.swip {
	.my-swipe {
		.item {
			img {
				width: 100%;
			}
		}
	}

	.custom-indicator {
		position: absolute;
		right: 5px;
		bottom: 5px;
		padding: 2px 5px;
		font-size: 12px;
		color: #fff;
		background: rgba(0, 0, 0, 0.8);
	}
}
</style>