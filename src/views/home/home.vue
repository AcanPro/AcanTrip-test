<template>
	<div class="home" ref="homeRef">
		<!-- <h2>home</h2> -->
		<home-nav-bar />
		<div class="pic">
			<img src="@/assets/img/home/banner.webp" alt="">
		</div>
		<home-location />
		<div v-show="searchIsTrue" class="home-top">
			<search-bar height="45px" key-word-font-size="14px" :search-icon="true" key-word="关键字/位置/民宿"
				@search-click="handleSearchClick"></search-bar>
		</div>
		<home-categories />
		<home-house-list />

	</div>
</template>

<script>
export default {
	name: "home"
}
</script>

<script setup>
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeLocation from './cpns/home-location.vue';
import HomeCategories from './cpns/home-categories.vue';
import HomeHouseList from './cpns/home-houseList.vue';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import scrollReachMsg from '@/hooks/scrollfunc';
import { watch, ref, onActivated } from 'vue';
import useHotCity from '@/store/modules/hotCity';
import mainStore from '@/store/modules/main'
import { storeToRefs } from 'pinia';
import { formatMonthDay } from '@/utils/get_date';
import { computed } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
// 把home标签称最大，然后拿取滚动的时候是在home里面滚动，而不是window，所以
// 获取home标签，监听拿到的滚动距离实现请求数据
const hotCityStore = useHotCity()
const homeRef = ref()
const { isTrue, scrollTop } = scrollReachMsg(homeRef)
watch(isTrue, (newValue) => {
	if (newValue) {
		// 因为要加载完成数据才改变值，async默认就是promise函数
		hotCityStore.fetchHomeHouseList().then(() => {
			isTrue.value = false
		})
	}
})

// 记录离开的位置
// 因为keep-alive，使用onActivated
onActivated(() => {
	homeRef.value.scrollTo({
		top: scrollTop.value
	})
})

const useStore = mainStore()
const { startDate, endDate } = storeToRefs(useStore)
const nowData = formatMonthDay(startDate.value, "MM.DD")
const newData = formatMonthDay(endDate.value, "MM.DD")
const handleSearchClick = () => {
	router.push({
		path: "/search",
		query: {
			address: "广州",
			cityId: 45,
			startDate: nowData,
			endDate: newData
		},
	});
};

const searchIsTrue = computed(() => {
	return scrollTop.value >= 350
})
</script>

<style lang="less" scoped>
.home {
	// 不让window滚动，自己滚动
	height: 100vh;
	overflow-y: auto;

	.pic {
		img {
			width: 100%;
		}
	}
}

.home-top {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	padding: 10px 16px 10px 16px;
	background-color: white;
	z-index: 100;
}
</style>