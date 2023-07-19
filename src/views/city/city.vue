<template>
	<div class="city">
		<div class="top">
			<van-search v-model="cityValue" placeholder="请输入搜索关键词" show-action @cancel="onCancel" shape="round" />
			<van-tabs v-model:active="active">
				<template v-for="(value, key, index) in cityAll" :key="key">
					<van-tab :title="value.title" :name="key"></van-tab>
				</template>
				<!-- <van-tab title="国内/港澳台"></van-tab>
			<van-tab title="国外"></van-tab> -->
			</van-tabs>
		</div>
		<div class="content">
			<template v-for="(value, key, index) in cityAll" :key="key">
				<city-msg :currentCity="value" v-show="active === key"></city-msg>
			</template>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { cityMessage } from '@/service/index';
import useCityStore from '@/store/modules/city'
import { storeToRefs } from 'pinia';
import CityMsg from './cpns/city-msg.vue'
const router = useRouter()
const cityValue = ref("")
const active = ref()

function onCancel() {
	router.back()
}
// 导入数据
// console.log(cityMessage())
// 再封装到store里
// const cityAll = ref({})
// cityMessage().then(res => {
// 	cityAll.value = res.data
// })
const cityStore = useCityStore()
// 调用actions才有数据
cityStore.fetchCityMessage()
const { cityAll } = storeToRefs(cityStore)
// console.log(cityTitle)
// 都是ref对象，然后传入key是为了拿到city值，name属性传入key，
// 这样的话上一层的active绑定的就是key，这样就拿到了city值
// 因为拿到值赋给变量失去了响应式，所以使用computed 保持动态，
// 默认值是undefined，所以在使用的时候在点前面加？，没有值就不填，有的话就输出
// 使用computed因为 cityAll.value[active.value] 已经被包裹了ref，ref直接就导出
// const currentCity = computed(() => cityAll.value[active.value])


</script>

<style lang="less" scoped>
.city {
	--van-tabs-bottom-bar-color: var(--primary-color);

	.top {
		position: relative;
		z-index: 9;
	}

	// 作用是减去top的高度，然后剩下的就是内容,auto有滚动条
	.content {
		height: calc(100vh - 98px);
		overflow: auto;
	}
}
</style>