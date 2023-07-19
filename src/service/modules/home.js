import hxcRequest from '../request/index.js'
export function getHomeHotCity() {
	return hxcRequest.get({
		url: '/home/hotSuggests'
	})
}

export function getHomeCategories() {
	return hxcRequest.get({
		url: '/home/categories'
	})
}

export function getHomeHouseList(currentPage) {
	return hxcRequest.get({
		url: '/home/houselist',
		params: {
			page: currentPage
		}
	})
}