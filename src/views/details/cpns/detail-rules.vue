<template>
	<div class="rules-area">
		<house-section header-text="预订须知">
			<div class="notice">
				<template v-for="(item, index) in rules.orderRules">
					<div class="item">
						<span class="title">{{ item.title }}</span>
						<span class="intro">{{ item.introduction }}</span>
						<span class="tip" v-if="item.tips">查看说明</span>
					</div>
				</template>
			</div>
		</house-section>
	</div>
</template>

<script setup>
import HouseSection from '@/components/house-section/index.vue'

defineProps({
	rules: {
		type: Object,
		default: () => ({})
	}
})

</script>

<style scoped>
.rules-area {
	padding: 10px 0;

	.notice {
		padding: 10px 0;


		.item {
			padding: 10px 0;
			display: flex;


			.title {
				width: 60px;
				margin-right: 15px;
			}

		}
	}
}
</style>