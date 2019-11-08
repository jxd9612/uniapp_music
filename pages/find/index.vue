<template>
	<view class="container">
		<view v-if="bannerList">
			<!-- banner -->
			<swiper class="card-swiper" :circular="true" :autoplay="true" @change="cardSwiper">
				<swiper-item v-for="(item, index) in bannerList" :key="index" :class="cardCur == index ? 'cur' : ''">
					<view class="swiper-item"><image :src="item.imageUrl || item.pic" mode="aspectFill"></image></view>
				</swiper-item>
			</swiper>
			<!-- 菜单 -->
			<view class="menu">
				<!-- 导航列表 -->
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
						<view class="head-more" @click="clickMore">
							<text>更多</text>
							<text class="iconfont icon-arrowFill-right"></text>
						</view>
					</view>
					<view class="menu-playlist-content">
						<view class="content-item" v-for="(item, index) in personalized" :key="index" @click="toPlayList(item.id)">
							<view class="item-img">
								<view></view>
								<image :src="item.picUrl" mode="aspectFill"></image>
							</view>
							<text>{{ item.name }}</text>
							<view class="item-playcount">
								<text class="iconfont icon-bofang"></text>
								<text>{{ item.playCount | playCount }}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 新唱片 -->
				<view class="menu-record"></view>
			</view>
		</view>

		<view class="loading-wrapper" v-else><loading></loading></view>
	</view>
</template>

<script>
import { getBanner, getPersonalized } from 'api/find.js';
import Loading from 'components/loading/loading.vue';

export default {
	name: 'find',
	data() {
		return {
			cardCur: 0 // 默认轮播索引
		};
	},
	props: {
		bannerList: {
			type: Array,
			default() {
				return null;
			}
		},
		personalized: {
			type: Array,
			default() {
				return null;
			}
		}
	},
	methods: {
		// 轮播用
		cardSwiper(e) {
			this.cardCur = e.detail.current;
		},
		// 点击更多
		clickMore() {
			uni.navigateTo({
				url: `../find/playList/morePlayList`
			});
		},
		// 点击歌单，跳转到歌单详情页面
		toPlayList(id) {
			uni.navigateTo({
				url: `../find/playList/playListDetail?id=${id}`
			});
		}
	},
	filters: {
		playCount(count) {
			return count >= 10000 ? (count / 10000).toFixed(1) + '万' : count;
		}
	},
	components: { Loading }
};
</script>

<style lang="scss" scoped>
.container {
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
				&:active {
					opacity: 0.7;
					transform: translate(1upx, 1upx);
				}
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
					&:active {
						opacity: 0.7;
						transform: translate(1upx, 1upx);
					}
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
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					margin: 0 10upx 35upx 10upx;
					&:active {
						opacity: 0.7;
						transform: translate(1upx, 1upx);
					}
					.item-playcount {
						position: absolute;
						display: flex;
						align-items: center;
						top: 10upx;
						right: 10upx;
						font-size: $font-size-sm;
						color: $text-inverse;
						text {
							&:first-child {
								font-weight: bold;
								margin-right: 5upx;
							}
						}
					}
					& > text {
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
					.item-img {
						position: relative;
						width: 100%;
						height: 210upx;
						view {
							width: 100%;
							height: 100%;
							background-color: rgba(0, 0, 0, 0.3);
							border-radius: 10upx;
						}
						image {
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							border-radius: 10upx;
							z-index: -1;
						}
					}
				}
			}
		}
		.menu-record {
		}
	}
	.loading-wrapper {
		position: fixed;
		top: 30%;
		left: 50%;
		transform: translateY(-50%);
	}
}
</style>
