import { cityMessage } from "@/service";
import { defineStore } from "pinia";

const useCityStore = defineStore("city", {
	state: () => ({
		cityAll: {},
		// 给个默认值
		citySelect: { cityName: "重庆" }
	}),
	actions: {
		async fetchCityMessage() {
			const res = await cityMessage()
			this.cityAll = res.data
		}
	}
})

export default useCityStore