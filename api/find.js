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
		let res = await requestGet('/banner', reqData);
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

// 获取推荐歌单，limit：取出数量，默认30条
export async function getPersonalized(reqData) {
	try {
		let res = await requestGet('/personalized', reqData);
		if (res.data.code == SUCCESS) {
			return res.data.result;
		} else {
			throw new Error();
		}
	} catch (e) {
		// 接口问题 或 网络问题
		console.log('getPersonalized接口异常', e);
	}
}

// 获取歌单详情，id：歌单id
export async function getPlayListDetail(reqData) {
	try {
		let res = await requestGet('/playlist/detail', reqData);
		if (res.data.code == SUCCESS) {
			return res.data.playlist;
		} else {
			throw new Error();
		}
	} catch (e) {
		// 接口问题 或 网络问题
		console.log('getPlayListDetail接口异常', e);
	}
}
