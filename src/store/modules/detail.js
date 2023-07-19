import { getDetailInfos } from '@/service/index'
import { defineStore } from 'pinia'
const useDetail = defineStore('detail', {
	state: () => ({
		detailInfos: [],
		houseId: 0,
		mainPart: [],
		pricePart: []
	}),
	actions: {
		async fetchDetailInfos() {
			const res = await getDetailInfos(this.houseId)
			this.detailInfos = res.data
			this.mainPart = this.detailInfos?.mainPart
			this.pricePart = this.detailInfos?.pricePart
		}
	}
})
export default useDetail