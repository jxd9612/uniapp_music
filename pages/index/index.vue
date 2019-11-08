<template>
	<view class="container">
		<!-- tab -->
		<view class="tab">
			<view class="tab-item" :class="currentIndex == 0 ? 'active' : ''" @click="tabClick(0)">
				<text>我的</text>
				<text class="iconfont icon-arrowFill-top"></text>
			</view>
			<view class="tab-item" :class="currentIndex == 1 ? 'active' : ''" @click="tabClick(1)">
				<text>发现</text>
				<text class="iconfont icon-arrowFill-top"></text>
			</view>
			<view class="tab-item" :class="currentIndex == 2 ? 'active' : ''" @click="tabClick(2)">
				<text>视频</text>
				<text class="iconfont icon-arrowFill-top"></text>
			</view>
		</view>
		<view style="height: 80upx;"></view>

		<view v-show="currentIndex == 0"><mine></mine></view>
		<view v-show="currentIndex == 1"><find :bannerList="bannerList" :personalized="personalized"></find></view>
		<view v-show="currentIndex == 2"><videos></videos></view>
	</view>
</template>

<script>
import { getBanner, getPersonalized } from 'api/find.js';
import Loading from 'components/loading/loading.vue';
import Find from '../find/index.vue';
import Mine from '../mine/index.vue';
import Videos from '../video/index.vue';

// 获取推荐歌单的数量
const LIMIT = 6;
// 0-pc、1-android、2-iphone、3-ipad,统一 安卓
const TYPE = 1;

export default {
	data() {
		return {
			bannerList: null, // banner数据列表
			personalized: null, // 推荐歌单列表
			currentIndex: 1
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		init() {
			this.initFindData();
		},
		// 初始化发现模块的数据
		initFindData() {
			this.handleBanner();
			this.handlePersonalized();
		},
		// 处理banner信息
		async handleBanner() {
			let reqData = {};
			reqData.type = TYPE;
			this.bannerList = await getBanner(reqData);
		},
		// 处理推荐歌单信息
		async handlePersonalized() {
			let reqData = {};
			reqData.limit = LIMIT;
			this.personalized = await getPersonalized(reqData);
		},
		// 切换tab
		tabClick(index) {
			this.currentIndex = index;
			switch (index) {
				case 0:
					break;
				case 1:
					break;
				case 2:
					break;
			}
		}
	},
	components: { Loading, Find, Mine, Videos }
};
</script>

<style lang="scss" scoped>
.container {
	.tab {
		width: 100%;
		height: 80upx;
		position: fixed;
		display: flex;
		z-index: 9;
		background-color: $bg-black;
		.tab-item {
			flex: 1;
			position: relative;
			display: flex;
			flex-direction: column;
			text-align: center;
			padding-top: 10upx;
			text {
				font-size: $font-size-lg;
				color: $text-inverse;
				transition: all 0.1s ease;
				&:last-child {
					position: absolute;
					bottom: -15%;
					left: 50%;
					transform: translateX(-50%);
					opacity: 0;
				}
			}
		}
		.active {
			text {
				&:first-child {
					transform: scale(1.2);
				}
				&:last-child {
					opacity: 1;
				}
			}
		}
	}
}
</style>
