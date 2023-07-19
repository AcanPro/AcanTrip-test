<template>
	<div class="tab-bar">
		<!-- <template v-for="(item, index) in tabbarData" :key="index">
			<div class="tab-bar-item" @click="itemClick(index, item)" :class="{ active: currentIndex === index }">
				<img v-if="currentIndex !== index" :src="get_imgUrl(item.img)" alt="" class="pic">
				<img v-else :src="get_imgUrl(item.active_img)" alt="" class="pic">
				<span class="text">{{ item.text }}</span>
			</div>
		</template> -->

		<van-tabbar v-model="currentIndex" active-color="#ff9854">
			<template v-for="(item, index) in tabbarData" :key="index">
				<van-tabbar-item :to="item.path">
					<span>{{ item.text }}</span>
					<template #icon>
						<img v-if="currentIndex !== index" :src="get_imgUrl(item.img)" alt="" class="pic">
						<img v-else :src="get_imgUrl(item.active_img)" alt="" class="pic">
					</template>
				</van-tabbar-item>
			</template>
		</van-tabbar>
	</div>
</template>

<script setup>
import { tabbarData } from '@/assets/data/tabbarData'
import get_imgUrl from '@/utils/get_assets'
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
// ref 是通过value拿值
const currentIndex = ref(0)
// 在地址栏输入路由时进去。而导航栏不会变到相应的位置，所以
const route = useRoute()
// console.log(route.path)
watch(route, (newRoute) => {
	// 在tabbarData里面寻找newroute相对应的index
	const index = tabbarData.findIndex(item => item.path === newRoute.path)
	if (index === -1) return
	currentIndex.value = index
})

</script>

<style lang="less" scoped>
.tab-bar {

	// 如果是字体图标 就直接使用这个 常量来定义
	// --van-tabbar-item-font-size: 30px;
	// width: 30px;
	// 深度穿透子组件 重写css样式
	:deep(.van-tabbar-item__icon img) {
		height: 30px;
	}

}
</style>