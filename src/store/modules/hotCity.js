import { defineStore } from "pinia";
import { getHomeHotCity, getHomeCategories, getHomeHouseList } from "@/service";
const useHotCity = defineStore("hotCity", {
	state: () => ({
		hotList: [],
		homeCategories: [],
		currentPage: 1,
		homeHouseList: [],
	}),
	actions: {
		async fetchHotCity() {
			const res = await getHomeHotCity()
			this.hotList = res.data
		},
		async fetchHomeCategories() {
			const res = await getHomeCategories()
			this.homeCategories = res.data
		},
		async fetchHomeHouseList() {
			const res = await getHomeHouseList(this.currentPage)
			this.homeHouseList.push(...res.data)
			this.currentPage++
		}
	}
})

export default useHotCity