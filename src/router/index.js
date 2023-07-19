import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
	history: createWebHashHistory(),
	// path -> components
	routes: [
		// 重定向
		{ path: "/", redirect: "/home" },
		{ path: "/home", component: () => import("../views/home/home.vue") },
		{ path: "/order", component: () => import("../views/order/order.vue") },
		{ path: "/message", component: () => import("../views/message/message.vue") },
		{ path: "/favor", component: () => import("../views/favor/favor.vue") },
		{ path: "/city", component: () => import("../views/city/city.vue"), meta: { hideTabbar: true } },
		{ path: "/search", component: () => import("../views/search/search.vue"), meta: { hideTabbar: true } },
		// 动态的路由
		{ path: "/detail/:id", component: () => import("../views/details/details.vue"), meta: { hideTabbar: true } },
	]
})
export default router