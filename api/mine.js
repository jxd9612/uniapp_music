import {
	requestGet,
	requestPost
} from './request.js'
import {
	SUCCESS
} from './config.js'

// 调用此接口 , 可获取 banner( 轮播图 ) 数据
export async function getBanner(reqData) {
	try {
		let res = await requestPost('/banner', reqData);
		if (res.data.code == SUCCESS) {
			return res.data.banners;
		} else {
			throw new Error();
		}
	} catch (e) {
		// 接口问题 或 网络问题
		console.log('getBanner接口异常', e);
	}
}
