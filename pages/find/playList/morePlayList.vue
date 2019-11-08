<template>
	<view class="container">
		<!-- 歌单tab -->
		<view class="tab-wrapper">
			<scroll-view scroll-x class="tab" scroll-with-animation :scroll-left="scrollLeft">
				<view
					class="tab-item"
					:class="currentIndex == index ? 'active' : ''"
					v-for="(name, index) in tabList"
					:key="index"
					@click="tabClick(name, index)"
				>
					{{ name }}
				</view>
			</scroll-view>
			<text class="iconfont icon-fenlei"></text>
		</view>
		<view style="height: 80upx;"></view>
		
		<view class="content">
			<view class="content-screen">
				<text>全部</text>
				<view>
					<text class="iconfont icon-add"></text>
					<text>筛选</text>
				</view>
			</view>
			
			<!-- 歌单列表 -->
			<view class="content-playlist"></view>
		</view>
	</view>
</template>

<script>
import { getAllCat, getHotCat } from 'api/find.js';

export default {
	data() {
		return {
			currentIndex: 0,
			scrollLeft: 0,
			tabList: ['精品'],
			categories: null, // 总的类型 分类
			subList: null // 风格 分类
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		init() {
			// this.handleCatList();
			this.handleGetHotCat();
		},
		// 处理所有歌单分类
		async handleGetAllCat() {
			let cat = await getAllCat();
			console.log(cat);
		},
		// 处理热门歌单分类
		async handleGetHotCat() {
			let cat = await getHotCat();
			cat.map(item => {
				this.tabList.push(item.name);
			});
		},

		// 点击tab
		tabClick(name, index) {
			this.currentIndex = index;
			this.scrollLeft = (index - 1) * 100;
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.tab-wrapper {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		background-color: $bg-black;
		color: $text-inverse;
		overflow: hidden;
		.tab {
			width: 85%;
			font-size: $font-size-base;
			.tab-item {
				width: 140upx;
				display: inline-block;
				text-align: center;
				margin: 0 20upx 10upx 20upx;
			}
			.active {
				border-bottom: 5upx solid $bg-base;
				font-size: $font-size-lg;
			}
		}
		& > text {
			padding-right: 35upx;
			font-size: $font-size-base;
		}
	}
	.content {
		width: 700upx;
		margin-left: 25upx;
		.content-screen {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20upx 10upx;
			& > text {
				font-size: $font-size-lg-l;
				font-weight: bold;
			}
			& > view {
				display: flex;
				align-items: center;
				padding: 8upx 15upx;
				border: 2upx solid #1CBBB4;
				border-radius: 30upx;
			}
		}
	}
}
</style>
