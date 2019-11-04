<template>
	<view class="container">
		<!-- tab -->
		<view class="tab">
			<view class="tab-mine">我的</view>
			<view class="tab-find active">发现</view>
			<view class="tab-video">视频</view>
		</view>
		<view style="height: 100upx;"></view>
		<!-- banner -->
		<swiper class="card-swiper" :circular="true" :autoplay="true" @change="cardSwiper">
			<swiper-item v-for="(item, index) in bannerList" :key="index" :class="cardCur == index ? 'cur' : ''">
				<view class="swiper-item"><image :src="item.imageUrl" mode="aspectFill"></image></view>
			</swiper-item>
		</swiper>
		<!-- 菜单 -->
		<view class="menu">
			<!-- 菜单导航列表 -->
			<view class="menu-nav">
				<view class="menu-nav-item">
					<image src="/static/images/meirituijian.png"></image>
					<text>每日推荐</text>
				</view>
				<view class="menu-nav-item">
					<image src="/static/images/musicList.png"></image>
					<text>音乐列表</text>
				</view>
				<view class="menu-nav-item">
					<image src="/static/images/rankingList.png"></image>
					<text>排行榜</text>
				</view>
				<view class="menu-nav-item">
					<image src="/static/images/musicRadio.png"></image>
					<text>音乐电台</text>
				</view>
				<view class="menu-nav-item">
					<image src="/static/images/musicVedeo.png"></image>
					<text>音乐视频</text>
				</view>
			</view>
			<!-- 推荐歌单 -->
			<view class="menu-playlist">
				<view class="menu-playlist-head">
					<view class="head-title"><text>推荐歌单</text></view>
					<view class="head-more">
						<text>更多</text>
						<text class="iconfont icon-arrowFill-right"></text>
					</view>
				</view>
				<view class="menu-playlist-content">
					<view
						class="content-item"
						v-if="personalized"
						v-for="(item, index) in personalized"
						:key="index"
						@click="toPlayList(item.id)"
					>
						<image :src="item.picUrl" mode="aspectFill"></image>
						<text>{{ item.name }}</text>
					</view>
					<view class="content-none" v-else>没有数据下显示</view>
				</view>
			</view>
			<!-- 新唱片 -->
			<view class="menu-record"></view>
		</view>
	</view>
</template>

<script>
import { getBanner, getPersonalized } from 'api/find.js';
import Loading from 'components/loading/loading.vue'

export default {
	data() {
		return {
			cardCur: 0, // 默认轮播索引
			bannerList: null, // banner数据列表
			limit: 6, // 获取推荐歌单的数量参数
			personalized: null // 推荐歌单列表
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		init() {
			this.handleBanner();
			this.handlePersonalized();
		},
		// 处理banner信息
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
			this.bannerList = await getBanner(reqData);
		},
		// 处理推荐歌单信息
		async handlePersonalized() {
			let reqData = {};
			reqData.limit = this.limit;
			this.personalized = await getPersonalized(reqData);
		},
		cardSwiper(e) {
			this.cardCur = e.detail.current;
		},
		// 点击歌单，跳转到歌单详情页面
		toPlayList(id) {
			uni.navigateTo({
				url: `../find/playList/playList?id=${id}`
			});
		}
	},
	components: { Loading }
};
</script>

<style lang="scss" scoped>
.container {
	.tab {
		position: fixed;
		width: 100%;
		z-index: 9;
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
			justify-content: space-around;
			padding-bottom: 30upx;
			border-bottom: 2upx solid $border-base;
			.menu-nav-item {
				width: 140upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				image {
					width: 80upx;
					height: 80upx;
				}
				text {
					margin-top: 10upx;
					font-size: $font-size-sm;
				}
			}
		}
		.menu-playlist {
			width: 100%;
			padding-top: 30upx;
			.menu-playlist-head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				text-align: center;
				padding: 0 10upx 20upx 10upx;
				.head-title {
					font-size: $font-size-lg-l;
					font-weight: bold;
					color: $text-base;
				}
				.head-more {
					display: flex;
					align-items: center;
					color: $text-grey;
					text {
						font-size: $font-size-sm;
					}
				}
			}
			.menu-playlist-content {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.content-item {
					width: 210upx;
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					margin: 0 10upx 35upx 10upx;
					text {
						margin-top: 15upx;
						font-size: $font-size-sm;
						color: $text-grey;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					image {
						width: 100%;
						height: 210upx;
						border-radius: 10upx;
					}
				}
			}
		}
		.menu-record {
		}
	}
}
</style>
