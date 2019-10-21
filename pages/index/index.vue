<template>
	<view class="container">
		<!-- 头部分 -->
		<view class="head">
			<view class="head-info"><text class="iconfont icon-persion-info"></text></view>
			<view class="head-flag">
				<text class="iconfont icon-yinle1"></text>
				<text class="iconfont icon-xingzhuang"></text>
			</view>
			<view class="head-search"><text class="iconfont icon-search"></text></view>
		</view>
		<!-- tab部分 -->
		<view class="tab">
			<view class="tab-mine active">我的</view>
			<view class="tab-find">发现</view>
			<view class="tab-video">视频</view>
		</view>
		<!-- banner -->
		<swiper class="card-swiper" :circular="true" :autoplay="true" @change="cardSwiper">
			<swiper-item v-for="(item, index) in bannerList" :key="index" :class="cardCur == index ? 'cur' : ''">
				<view class="swiper-item"><image :src="item.imageUrl" mode="aspectFit"></image></view>
			</swiper-item>
		</swiper>
		<!-- 菜单 -->
		<view class="menu">
			<!-- 菜单导航列表 -->
			<view class="menu-nav">
				<view class="menu-nav-item">
					<image src="../../static/images/meirituijian.png"></image>
					<text>每日推荐</text>
				</view>
				<view class="menu-nav-item">
					<image src="../../static/images/musicList.png"></image>
					<text>音乐列表</text>
				</view>
				<view class="menu-nav-item">
					<image src="../../static/images/rankingList.png"></image>
					<text>排行榜</text>
				</view>
				<view class="menu-nav-item">
					<image src="../../static/images/musicRadio.png"></image>
					<text>音乐电台</text>
				</view>
				<view class="menu-nav-item">
					<image src="../../static/images/musicVedeo.png"></image>
					<text>音乐视频</text>
				</view>
			</view>
			<!-- 音乐风格 -->
			<view class="menu-style"></view>
			<!-- 新唱片 -->
			<view class="menu-record"></view>
		</view>
	</view>
</template>

<script>
import { getBanner } from '../../api/mine.js';

export default {
	data() {
		return {
			cardCur: 0,
			bannerList: []
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		init() {
			this.handleBanner();
		},
		async handleBanner() {
			// 0-pc、1-android、2-iphone、3-ipad
			let reqData = {};
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					reqData.type = 1;
					break;
				case 'ios':
					reqData.type = 2;
					break;
				default:
					reqData.type = 0;
					break;
			}
			let data = await getBanner(reqData);
			console.log(data);
			if (data) {
				this.bannerList = data;
			}
		},
		cardSwiper(e) {
			this.cardCur = e.detail.current;
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.head {
		height: 80upx;
		line-height: 80upx;
		background-color: $bg-black;
		display: flex;
		.head-info,
		.head-flag,
		.head-search {
			color: $text-icon;
			text-align: center;
			& > text {
				font-size: $img-size-base;
			}
		}
		.head-info {
			flex: 1;
		}
		.head-flag {
			flex: 3;
			color: $text-inverse;
		}
		.head-search {
			flex: 1;
		}
	}
	.tab {
		height: 100upx;
		line-height: 100upx;
		background-color: $bg-black;
		display: flex;
		& > view {
			color: $text-inverse;
			font-size: $font-size-lg;
			flex: 1;
			text-align: center;
			margin: 0 50upx;
		}
		.tab-mine {
		}
		.tab-find {
		}
		.tab-video {
		}
		.active {
		}
	}
	.menu {
		width: 700upx;
		margin-left: 25upx;
		.menu-nav {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding-bottom: 30upx;
			border-bottom: 2upx solid $border-base;
			.menu-nav-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				image {
					width: 100upx;
					height: 100upx;
				}
				text {
					margin-top: 15upx;
					font-size: $text-base;
				}
			}
		}
	}
}
</style>
