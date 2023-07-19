import hxcRequest from '../request/index'

export function getDetailInfos(houseId) {
	return hxcRequest.get({
		url: '/detail/infos',
		params: {
			houseId
		}
	})
}