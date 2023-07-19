<template>
	<div class="house" ref="homeRef">
		<h2 class="title">热门房屋</h2>
		<div class="content">
			<template v-for="item in homeHouseList" :key="item.data.houseId">
				<house-v3 v-if="item.discoveryContentType === 9" :item-data="item.data" @click="itemClick(item.data)"></house-v3>
				<house-v9 v-else-if="item.discoveryContentType === 3" :item-data="item.data"
					@click="itemClick(item.data)"></house-v9>
			</template>
		</div>
	</div>
</template>

<script setup>
import HouseV3 from '@/components/house-v3/index.vue'
import HouseV9 from '@/components/house-v9/index.vue'
import useHotCity from '@/store/modules/hotCity';
import scrollReachMsg from '@/hooks/scrollfunc';
import { watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import useDetail from '@/store/modules/detail'

const hotCityStore = useHotCity()
hotCityStore.fetchHomeHouseList()
const { homeHouseList } = storeToRefs(hotCityStore)
// function addMsg() {
// 	hotCityStore.fetchHomeHouseList()
// }

// const homeRef = ref()
// const { isTrue } = scrollReachMsg(homeRef)
// watch(isTrue, (newValue) => {
// 	if (newValue) {
// 		// 因为要加载完成数据才改变值，async默认就是promise函数
// 		hotCityStore.fetchHomeHouseList().then(() => {
// 			isTrue.value = false
// 		})
// 	}
// })


const router = useRouter()

const detailStore = useDetail()

function itemClick(item) {
	// console.log("itemClick", item.houseId)
	detailStore.houseId = item.houseId
	detailStore.fetchDetailInfos()
	router.push('/detail/' + item.houseId)
}

</script>

<style lang="less" scoped>
.house {
	padding: 10px;
	margin-bottom: 50px;

	.content {
		display: flex;
		flex-shrink: 0;
		flex-wrap: wrap;
	}
}
</style>