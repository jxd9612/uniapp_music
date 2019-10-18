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
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {}
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
}
</style>
