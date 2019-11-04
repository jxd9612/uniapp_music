<template>
	<view class="container">
		<!-- 遮层 -->
		<view class="mask">
			<view></view>
			<image :src="playlist.coverImgUrl" mode="aspectFill"></image>
		</view>

		<!-- 数据加载完毕 -->
		<view v-if="playlist">
			<!-- 头部显示部分 -->
			<view class="header">
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
				<view class="content-item">
					<view class="content-item-index">1</view>
					<view class="content-item-detail">
						<view class="detail-name">
							<text>叶子</text>
							<text>(电视剧《蔷薇之恋》片尾曲)</text>
						</view>
						<view class="detail-desc">
							<text v-show="true">会员</text>
							<text v-show="true">独家</text>
							<text v-show="true">无损</text>
							<text>阿桑-受了点伤</text>
						</view>
					</view>
					<text class="iconfont icon-shipinbofang" style="right: 100upx;" v-show="true"></text>
					<text class="iconfont icon-liebiao" style="right: 30upx;"></text>
				</view>
			</view>
		</view>

		<!-- 未加载完毕 -->
		<view v-else>加载中...</view>
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
		z-index: -1;
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
		display: flex;
		color: $text-inverse;
		.header-img {
			width: 250upx;
			margin-right: 30upx;
			position: relative;
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
		.content-item {
			position: relative;
			display: flex;
			align-items: center;
			color: $text-inverse;
			& > text {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				font-size: $font-size-lg-l;
			}
			.content-item-index {
				padding: 0 40upx;
			}
			.content-item-detail {
				height: 100upx;
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
						margin-right: 5upx;
						&:nth-child(1) {
							padding: 0 5upx;
							border-radius: 5upx;
							border: 2upx solid #F37B1D;
							color: #F37B1D;
						}
						&:nth-child(2) {
							padding: 0 5upx;
							border-radius: 5upx;
							border: 2upx solid #DD524D;
							color: #DD524D;
						}
						&:nth-child(3) {
							padding: 0 5upx;
							border-radius: 5upx;
							border: 2upx solid #F37B1D;
							color: #F37B1D;
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
}
</style>
