<script setup>
import TabBar from './components/TabBar/TabBar.vue'
import loading from '@/components/loading/loading.vue'
import { useRoute } from 'vue-router';
const route = useRoute()
// route 才能拿到方法
</script>

<template>
	<div class="app">
		<router-view v-slot="props">
			<keep-alive include="home">
				<component :is="props.Component"></component>
			</keep-alive>
		</router-view>
		<tab-bar v-if="!route.meta.hideTabbar"></tab-bar>
		<loading />
	</div>
</template>

<style scoped></style>
