import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";
import useMain from "@/store/modules/main";
const mainStore = useMain()

class hxc {
	// 接受参数
	constructor(BASE_URL, timeout = 5000) {
		this.instance = axios.create({
			// 属性是 baseURL
			baseURL: BASE_URL,
			timeout
		})
		// 拦截器
		this.instance.interceptors.request.use(config => {
			mainStore.isLoading = true
			return config
		}, err => {
			mainStore.isLoading = true
			return err
		})

		this.instance.interceptors.response.use(config => {
			mainStore.isLoading = false
			return config
		}, err => {
			mainStore.isLoading = false
			return err
		})

	}



	request(config) {
		return new Promise((resolve, reject) => {
			this.instance.request(config).then(res => {
				// console.log(res.data)
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		})
	}
	get(config) {
		return this.request({ ...config, method: 'get' })
	}
	post(config) {
		return this.request({ ...config, method: 'post' })
	}
}

export default new hxc(BASE_URL, TIMEOUT)