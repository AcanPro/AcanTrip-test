import { onMounted, onUnmounted, ref } from "vue"

export default function scrollReachMsg(refs) {
	let el = window

	const isTrue = ref(false)
	const scrollClientHeight = ref(0)
	const scrollTop = ref(0)
	const scrollHeight = ref(0)
	const scrollComputed = () => {
		if (el === window) {
			// 当前页面最大px
			scrollClientHeight.value = document.documentElement.clientHeight
			// 滑动了多少
			scrollTop.value = document.documentElement.scrollTop
			// 可滚动的el元素
			scrollHeight.value = document.documentElement.scrollHeight
		} else {
			// 当前页面最大px
			scrollClientHeight.value = el.clientHeight
			// 滑动了多少
			scrollTop.value = el.scrollTop
			// console.log(scrollTop.value)
			// 可滚动的el元素
			scrollHeight.value = el.scrollHeight
		}

		if (scrollClientHeight.value + scrollTop.value >= scrollHeight.value) {
			console.log("滑到底部")
			isTrue.value = true
		}
	}
	onMounted(() => {
		if (refs) el = refs.value

		el.addEventListener('scroll', scrollComputed)
	})
	onUnmounted(() => {
		el.removeEventListener('scroll', scrollComputed)
	})



	return { isTrue, scrollClientHeight, scrollTop, scrollHeight }
}