const get_imgUrl = (image) => {
	// 参数一：传入的数据，相对路径
	// 参数二：当前文件的路径
	// vite这样使用 webpack使用require
	return new URL(`../assets/img/tabbar/${image}`, import.meta.url)
}
export default get_imgUrl