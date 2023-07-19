<template>
	<div class="categories">
		<template v-for="(item, index) in homeCategories" :key="item">
			<div class="item" :class="{ active: currentIndex === index }" @click="btnClick(index)">
				<img :src="item.pictureUrl" alt="">
				<div class="text">{{ item.title }}</div>
			</div>
		</template>
	</div>
</template>

<script setup>
import useHotCity from '@/store/modules/hotCity';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const hotCityStore = useHotCity()
const currentIndex = ref(0)
const { homeCategories } = storeToRefs(hotCityStore)
function btnClick(index) {
	currentIndex.value = index
}

</script>

<style lang="less" scoped>
.active {
	// border-bottom: 3px solid var(--primary-color);
	position: relative;

	&::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 3px;
		background-color: var(--primary-color);
		border-radius: 2px;

	}

}

.categories {
	display: flex;
	padding: 10px 0 10px 0px;
	overflow-x: auto;
	box-sizing: border-box;

	&::-webkit-scrollbar {
		display: none;
	}

	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		// flex-shrink默认是1 ，就要压缩宽度
		flex-shrink: 0;
		width: 60px;
		padding: 10px 3px;



		img {
			width: 28px;
			height: 28px;
		}
	}
}
</style>