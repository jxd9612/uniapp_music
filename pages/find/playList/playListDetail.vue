<template>
	<view class="container">
		<!-- 数据加载完毕 -->
		<view v-if="playlist">
			<!-- 遮层 -->
			<view class="mask">
				<view></view>
				<image :src="playlist.coverImgUrl" mode="aspectFill"></image>
			</view>
			<!-- 头部显示部分 -->
			<view class="header" ref="header">
				<view class="header-img"><image :src="playlist.coverImgUrl" mode="aspectFill"></image></view>
				<view class="header-content">
					<view class="header-content-name">{{ playlist.name }}</view>
					<view class="header-content-creator">
						<view>
							<image :src="playlist.creator.avatarUrl" mode="aspectFill"></image>
							<text>{{ playlist.creator.nickname }}</text>
						</view>
						<text class="iconfont icon-arrow-right"></text>
					</view>
					<view class="header-content-desc">
						<text>{{ playlist.description }}</text>
						<text class="iconfont icon-arrow-right"></text>
					</view>
				</view>
			</view>
			<!-- 歌曲列表 -->
			<view class="content">
				<view class="content-option">
					<view class="content-option-play">
						<text class="iconfont icon-bofang"></text>
						<text>播放全部</text>
						<text>(共{{ playlist.trackCount }}首)</text>
					</view>
					<view class="content-option-collect">
						<text class="iconfont icon-add"></text>
						<!-- 用计算属性代替 -->
						<text>收藏({{ subscribedCount }})</text>
					</view>
				</view>

				<view class="content-item" v-for="(item, index) in playlist.tracks" :key="index">
					<view class="content-item-index">{{ index + 1 }}</view>
					<view class="content-item-detail">
						<view class="detail-name">
							<text>{{ item.name }}</text>
							<!-- 直接处理 -->
							<text>{{ item.alia.length == 0 ? '' : `(${item.alia[0]})` }}</text>
						</view>
						<view class="detail-desc">
							<text v-show="false">会员</text>
							<text v-show="item.copyright == 0">独家</text>
							<text v-show="false">无损</text>
							<!-- 没有过滤器，都这么处理了 -->
							<text>{{ item.ar[0].name }}-{{ item.al.name }}</text>
						</view>
					</view>
					<text class="iconfont icon-shipinbofang" style="right: 100upx;" v-show="item.mv != 0"></text>
					<text class="iconfont icon-liebiao" style="right: 30upx;"></text>
				</view>
			</view>
		</view>
		<!-- 未加载完毕 -->
		<view class="loading-wrapper" v-else><loading></loading></view>
	</view>
</template>

<script>
import { getPlayListDetail } from 'api/find.js';
import Loading from 'components/loading/loading.vue';

export default {
	data() {
		return {
			id: undefined, // 歌单id
			playlist: null // 歌单详情数据
		};
	},
	onLoad(options) {
		this.id = options.id;
		this.init();
	},
	methods: {
		init() {
			this.handlePlayListDetail();
		},
		// 处理歌单详情数据
		async handlePlayListDetail() {
			let reqData = {};
			reqData.id = this.id;
			this.playlist = await getPlayListDetail(reqData);
		},
		// 处理歌曲描述
		dealAlia(alia) {
			if (alia.length != 0) return `(${alia[0]})`;
		}
	},
	computed: {
		// 收藏数量，uniapp过滤器对小程序兼容的不好
		subscribedCount() {
			if (this.playlist) {
				return this.playlist.subscribedCount >= 10000
					? (this.playlist.subscribedCount / 10000).toFixed(1) + '万'
					: this.playlist.subscribedCount;
			}
		}
	},
	components: { Loading }
};
</script>

<style lang="scss" scoped>
.container {
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		view {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.3);
		}
		image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			filter: blur(30upx);
			transform: scale(1.2);
			z-index: -1;
		}
	}
	.header {
		width: 700upx;
		height: 250upx;
		margin: 20upx auto;
		position: relative;
		display: flex;
		color: $text-inverse;
		.header-img {
			width: 250upx;
			margin-right: 30upx;
			image {
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
		}
		.header-content {
			width: 420upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.header-content-name {
				font-weight: bold;
				font-size: $font-size-lg-ll;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.header-content-creator {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: $font-size-base;
				&:active {
					filter: blur(3upx);
					transform: translate(3upx, 3upx);
				}
				& > view {
					display: flex;
					align-items: center;
					justify-content: space-between;
					image {
						width: 60upx;
						height: 60upx;
						border-radius: 50%;
						margin-right: 15upx;
					}
				}
				& > text {
					font-size: $font-size-base;
				}
			}
			.header-content-desc {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: $font-size-sm;
				&:active {
					filter: blur(3upx);
					transform: translate(3upx, 3upx);
				}
				text {
					&:first-child {
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					&:last-child {
						font-size: $font-size-base;
					}
				}
			}
		}
	}
	.content {
		margin-top: 80upx;
		width: 100%;
		color: $text-inverse;
		position: relative;
		.content-option {
			padding: 0 40upx;
			margin-bottom: 30upx;
			display: flex;
			justify-content: space-between;
			view {
				display: flex;
				align-items: center;
			}
			.content-option-play {
				text {
					font-size: $font-size-lg;
					&:first-child {
						padding-right: 15upx;
						font-weight: bold;
					}
					&:last-child {
						padding-left: 5upx;
						opacity: 0.7;
					}
				}
			}
			.content-option-collect {
				background-color: #1cbbb4;
				border-radius: 40upx;
				padding: 20upx;
				text {
					font-size: $font-size-base;
					&:first-child {
						padding-right: 10upx;
					}
				}
				&:active {
					opacity: 0.7;
					transform: translate(1upx, 1upx);
				}
			}
		}
		.content-item {
			position: relative;
			display: flex;
			align-items: center;
			color: $text-inverse;
			margin: 20upx 0;
			&:active {
				opacity: 0.7;
				transform: translate(1upx, 1upx);
				background-color: rgba(0, 0, 0, 0.1);
			}
			& > text {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				font-size: $font-size-lg-l;
			}
			.content-item-index {
				width: 120upx;
				text-align: center;
			}
			.content-item-detail {
				height: 80upx;
				width: 450upx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				overflow: hidden;
				white-space: nowrap;
				.detail-name {
					text {
						font-size: $font-size-base;
						&:nth-child(1) {
							padding-right: 10upx;
						}
						&:nth-child(2) {
							opacity: 0.7;
						}
					}
				}
				.detail-desc {
					display: flex;
					align-items: center;
					text {
						font-size: $font-size-sm-ss;
						margin-right: 10upx;
						&:nth-child(1) {
							padding: 0 5upx;
							border-radius: 5upx;
							border: 2upx solid #f37b1d;
							color: #f37b1d;
						}
						&:nth-child(2) {
							padding: 0 5upx;
							border-radius: 5upx;
							border: 2upx solid #dd524d;
							color: #dd524d;
						}
						&:nth-child(3) {
							padding: 0 5upx;
							border-radius: 5upx;
							border: 2upx solid #f37b1d;
							color: #f37b1d;
						}
						&:nth-child(4) {
							font-size: $font-size-sm;
							opacity: 0.7;
						}
					}
				}
			}
		}
	}
	.loading-wrapper {
		position: fixed;
		top: 20%;
		left: 50%;
		transform: translateY(-50%);
	}
}
</style>
