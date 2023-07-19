<template>
	<div class="details" ref="elRef">
		<tab-control v-if="isTopTrue" @tabItemClick="tabClick" class="bar" :titles="['房屋设施', '房东介绍', '房客点评', '预购须知']"
			ref="tabControlRef" />

		<van-nav-bar title="房屋详情" left-text="返回" left-arrow @click-left="onClickLeft">
			<template #right>
				<van-icon name="search" size="18" />
			</template>
		</van-nav-bar>

		<div class="main" v-memo="[detailStore.mainPart?.dynamicModule]">
			<detail-swip></detail-swip>
			<detail-info :top-module="detailStore.mainPart?.topModule"></detail-info>
			<detail-facility :houseFacility="detailStore.mainPart?.dynamicModule?.facilityModule?.houseFacility"
				:ref="getSectionRef"></detail-facility>
			<detail-landlord :landlord="detailStore.mainPart?.dynamicModule?.landlordModule" :ref="getSectionRef" />
			<detail-comment :comment="detailStore.mainPart?.dynamicModule?.commentModule" :ref="getSectionRef" />
			<detail-rules :rules="detailStore.mainPart?.dynamicModule?.rulesModule" :ref="getSectionRef" />
		</div>
	</div>
	<action-bar :current-house="detailStore.detailInfos.currentHouse" />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import useDetail from '@/store/modules/detail';
import actionBar from './cpns/action-bar.vue';
import detailSwip from './cpns/detail-swip.vue'
import detailInfo from './cpns/detail-info.vue';
import detailFacility from './cpns/detail-facility.vue';
import detailLandlord from './cpns/detail-landlord.vue';
import detailComment from './cpns/detail-comment.vue'
import detailRules from './cpns/detail-rules.vue'
import scrollReachMsg from '@/hooks/scrollfunc'
import tabControl from '@/components/tab-control/tab-control.vue'
import { computed, ref, watch } from 'vue';

document.documentElement.scrollTo({
	top: 0
})


const detailStore = useDetail()
const route = useRoute()

if (detailStore.houseId === 0) {
	detailStore.houseId = route.params.id
	detailStore.fetchDetailInfos()
}

// const route = useRoute()
// console.log(route.params.id)
// detailStore.houseId = route.params.id

// 返回上一级
const router = useRouter()
function onClickLeft() {
	router.back()
}

// 滚动显示导航栏
// const elRef = ref()
const { scrollTop } = scrollReachMsg()
const isTopTrue = computed(() => {
	return scrollTop.value >= 300
})


let isShow = false
let current = -1
const sectionEls = []
// 这个value就是整个组件proxy，绑定函数才这样
// value.$el就是子组件的大标签
const getSectionRef = (value) => {
	if (!value) return
	sectionEls.push(value.$el)
}

function tabClick(index) {
	// isShow = true
	console.log(index) // 索引
	document.documentElement.scrollTo({
		top: sectionEls[index].offsetTop - 44,
		behavior: "smooth"
	})
	isShow = true
	// 记录点击之后的滑动距离
	current = sectionEls[index].offsetTop
	// console.log(current)
}


let tabControlRef = ref()
watch(scrollTop, (newValue) => {
	// current加了44
	if (newValue === current - 44) isShow = false
	// console.log(newValue, current)
	if (isShow) return

	const value = sectionEls.map(item => item.offsetTop)
	let index = value.length - 1
	for (let i = 0; i < value.length; i++) {
		if (value[i] > newValue + 44) {
			index = i - 1
			break
		}
	}
	// console.log(index)
	tabControlRef.value?.getCurrentIndex(index)

})




</script>

<style lang="less" scoped>
.details {


	.bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #fff;
	}
}
</style>