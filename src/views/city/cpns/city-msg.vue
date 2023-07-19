<template>
	<div class="city-msg">
		<van-index-bar highlight-color="#ff9854" :index-list="index">
			<!-- 热门 -->
			<van-index-anchor index="热门" />
			<div class="hotList">
				<template v-for="(item, index) in currentCity.hotCities">
					<div class="hotCity" @click="cityClick(item)">
						{{ item.cityName }}
					</div>
				</template>
			</div>
			<template v-for="item in currentCity.cities" :key="item">
				<van-index-anchor :index="item.group" />
				<template v-for="iten in item.cities" :key="iten">
					<van-cell :title="iten.cityName" @click="cityClick(iten)"></van-cell>
				</template>
				<!-- <div div class=" groupItem">
						<h2>{{ item.group }}</h2>
						<template v-for="iten in item.cities" :key="iten">
							<div class="list">
								{{ iten.cityName }}
							</div>
						</template>
	</div> -->
			</template>
		</van-index-bar>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import useCityStore from '@/store/modules/city';
import { storeToRefs } from 'pinia';
// 需要定一个变量接收数据 ，才能使用，否则只能在{{ }}里面使用
const props = defineProps({
	currentCity: {
		type: Object,
		default: () => ({})
	}
})
// 右边索引列表
const index = computed(() => {
	const listGroup = props.currentCity.cities.map(group => group.group)
	listGroup.unshift("#")
	return listGroup
})
// 把点击的数据转入到citystore里面
const router = useRouter()
const citySore = useCityStore()
// 结构出来失去响应式
const { citySelect } = storeToRefs(citySore)
function cityClick(item) {
	// console.log(item)
	citySelect.value = item
	router.back()
}

</script>

<style lang="less" scoped>
.hotList {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	margin-right: 30px;

	.hotCity {
		width: 70px;
		height: 28px;
		border-radius: 15px;
		font-size: 12px;
		color: #333;
		text-align: center;
		line-height: 28px;
		background-color: #fff4ec;
		margin: 10px 0 10px 10px;
	}
}
</style>