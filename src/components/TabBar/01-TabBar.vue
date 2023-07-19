<template>
	<div class="tab-bar">
		<!-- <h2>tabbar</h2> -->
		<!-- <router-link to="/home">首页</router-link>
		<router-link to="/favor">收藏</router-link>
		<router-link to="/order">订单</router-link>
		<router-link to="/message">消息</router-link> -->
		<template v-for="(item, index) in tabbarData" :key="index">
			<div class="tab-bar-item" @click="itemClick(index, item)" :class="{ active: currentIndex === index }">
				<img v-if="currentIndex !== index" :src="get_imgUrl(item.img)" alt="" class="pic">
				<img v-else :src="get_imgUrl(item.active_img)" alt="" class="pic">
				<span class="text">{{ item.text }}</span>
			</div>
		</template>
	</div>
</template>

<script setup>
import { tabbarData } from '@/assets/data/tabbarData'
import get_imgUrl from '@/utils/get_assets'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
// ref 是通过value拿值
const currentIndex = ref(0)
function itemClick(index, item) {
	currentIndex.value = index
	router.push(item.path)
}

</script>

<style lang="less" scoped>
.tab-bar {
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	border-top: 1px solid #f3f3f3;

	.tab-bar-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		// margin-top: 2px;
		padding: 2px 0;

		&.active {
			color: var(--primary-color);
		}

		.pic {
			width: 40px;
		}

		.text {
			font-size: 12px;
		}
	}


}
</style>