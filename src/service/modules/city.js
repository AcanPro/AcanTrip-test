import hxcRequest from '../request/index.js'
export function cityMessage() {
	return hxcRequest.get({
		url: "/city/all"
	})
}