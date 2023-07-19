<template>
	<div class="location">
		<div class="city">{{ citySelect.cityName }}</div>
		<div class="position" @click="positonClick">
			<span class="text">我的位置</span>
			<img src="@/assets/img/home/icon_location.png" alt="">
		</div>
	</div>
	<div class="item date-range bottom-gray-line" @click="showCalendar = true">
		<div class="start">
			<div class="date">
				<span class="tip">入住</span>
				<span class="time"> {{ startDate }} </span>
			</div>
			<div class="stay">共{{ stayDate }}晚</div>
		</div>
		<div class="end">
			<div class="date">
				<span class="tip">离店</span>
				<span class="time"> {{ endDate }} </span>
			</div>
		</div>
	</div>
	<div class="calendar">
		<van-calendar v-model:show="showCalendar" type="range" @confirm="onConfirm" :round="false" :show-confirm="false" />
	</div>
	<div class="item price-counter bottom-gray-line">
		<div class="start">价格不限</div>
		<div class="end">人数不限</div>
	</div>
	<div class="item keyword bottom-gray-line">关键字/位置/民宿名</div>
	<div class="item hot-suggest">
		<template v-for="(item, index) in hotList" :key="index">
			<span class="tag">{{ item.tagText.text }}</span>
		</template>
	</div>
	<div class="item search-btn">
		<div class="btn" @click="startSearch">开始搜索</div>
	</div>
	<!-- <h2 v-if="searchIsTrue">hahahahahahahklsdj</h2> -->
</template>

<script setup>
import useCityStore from '@/store/modules/city';
import useHotCity from '@/store/modules/hotCity'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { formatMonthDay, getdiffdate } from '@/utils/get_date'
import scrollReachMsg from '@/hooks/scrollfunc';
import useMain from '@/store/modules/main';


const router = useRouter()
// 首先获取经纬度，然后获取定位 
function positonClick() {
	navigator.geolocation.getCurrentPosition(res => {
		console.log("成功的", res)
	}, err => {
		console.log(err)
	}, {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	})
	// 进入city页面
	router.push('/city')
}
// 回显选中城市
const cityStore = useCityStore()
const { citySelect } = storeToRefs(cityStore)


// 显示入住日期
// dayjs 可以传入new Date() ，也可以传入时间戳
// new Date 有set get 方法
const mainStore = useMain()
const { startDate: nowdate, endDate: newdate } = storeToRefs(mainStore)
// const nowdate = new Date()
// const newdate = new Date()

// const nowAddOne = newdate.setDate(newdate.getDate() + 1)
const startDate = computed(() => formatMonthDay(nowdate.value))
// 传入的是时间戳 ,setDate 弄成时间戳
const endDate = computed(() => formatMonthDay(newdate.value))
const stayDate = ref(getdiffdate(nowdate.value, newdate.value))
// console.log(date.getDate())
// console.log(date.setDate(date.getDate() + 1))

// 显示日历
const showCalendar = ref(false)
function onConfirm(value) {
	// console.log(value)
	const nowTime = value[0]
	const futureTime = value[1]
	// console.log(nowTime, futureTime)
	// console.log(formatMonthDay(nowTime), formatMonthDay(futureTime))
	mainStore.nowdate = nowTime
	mainStore.newdate = futureTime
	stayDate.value = getdiffdate(nowTime, futureTime)
	showCalendar.value = false
}

// 热门城市建议
// 在service请求数据，在store管理数据
const hotCityStore = useHotCity()
hotCityStore.fetchHotCity()
hotCityStore.fetchHomeCategories()


const { hotList } = storeToRefs(hotCityStore)

// 进入搜索页面
const firstData = formatMonthDay(nowdate.value, "MM.DD")
const secondData = formatMonthDay(newdate.value, "MM.DD")
const startSearch = () => {
	router.push({
		path: "/search",
		query: {
			address: "广州",
			cityId: 45,
			startDate: firstData,
			endDate: secondData
		},
	});
};

// 刚开始scrollTop为0为false ，到100的时候赋值给scrolltop就为true
// const { scrollTop } = scrollReachMsg()
// const searchIsTrue = computed(() => {
// 	return scrollTop.value >= 100
// })


</script>

<style lang="less" scoped>
.location {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 44px;
	padding: 0 15px;

	.city {
		flex: 1;
	}

	.position {
		display: flex;
		justify-content: center;
		align-items: center;

		.text {
			position: relative;
			font-size: 12px;
			top: 2px;
			margin-right: 10px;
		}

		img {
			width: 20px;
		}
	}
}

.hot-suggest {
	margin: 10px 0;

	.tag {
		font-size: 12px;
		padding: 4px 8px;
		margin: 3px;
		border-radius: 14px;
		color: #3f4954;
		background-color: #f1f3f5;
	}
}

.search-btn {
	.btn {
		width: 342px;
		height: 38px;
		max-height: 50px;
		font-weight: 500;
		font-size: 18px;
		line-height: 38px;
		text-align: center;
		border-radius: 20px;
		color: #fff;
		background-image: var(--tjc-theme-linear-gradient);
	}
}

.date-range {
	height: 44px;

	.stay {
		flex: 1;
		text-align: center;
		font-size: 12px;
		color: #666;
	}
}

.price-counter {
	height: 44px;

	.start {
		border-right: 1px solid f8f9f9;
	}
}

.keyword {
	height: 44px;
}

.item {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	padding: 0 20px;
	color: #999;

	.start {
		flex: 1;
		display: flex;
		height: 44px;
		align-items: center;
	}

	.end {
		min-width: 30%;
		padding-left: 20px;
	}

	.date {
		display: flex;
		flex-direction: column;

		.tip {
			font-size: 12px;
			color: #999;
		}

		.time {
			margin-top: 3px;
			color: #333;
			font-size: 15px;
			font-weight: 500;
		}
	}
}

.calendar {
	--van-calendar-popup-height: 100%;
}
</style>