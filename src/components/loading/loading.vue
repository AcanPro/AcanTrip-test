<template>
	<div class="loading" v-show="mainStore.isLoading">
		<div class="content">
			<img src="@/assets/img/home/full-screen-loading.gif" alt="">
		</div>
	</div>
</template>

<script setup>
import useMain from '@/store/modules/main.js'
const mainStore = useMain()

</script>

<style lang="less" scoped>
.loading {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .5);
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 999;
	display: flex;
	justify-content: center;
	align-items: center;

	.content {
		width: 104px;
		height: 104px;
		background: url(../../assets/img/home/loading-bg.png) no-repeat center;
		background-position: 0 0;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;


		img {
			width: 70px;
			height: 70px;
			margin-bottom: 10px;
		}
	}
}
</style>