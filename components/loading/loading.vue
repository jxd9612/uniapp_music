<template>
	<view class="loader">
		<view class="outer"></view>
		<view class="middle"></view>
		<view class="inner"></view>
	</view>
</template>

<script></script>

<style lang="scss" scoped>
.loader {
	position: relative;
	.outer,
	.middle,
	.inner {
		border: 6upx solid transparent;
		border-top-color: #F37B1D;
		border-right-color: #F37B1D;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
	}
	.outer {
		width: 100upx;
		height: 100upx;
		margin-left: -50upx;
		margin-top: -50upx;
		animation: spin 2s linear infinite;
	}
	.middle {
		width: 70upx;
		height: 70upx;
		margin-left: -35upx;
		margin-top: -35upx;
		animation: spin 1.75s linear reverse infinite;
	}
	.inner {
		width: 40upx;
		height: 40upx;
		margin-left: -20upx;
		margin-top: -20upx;
		animation: spin 1.5s linear infinite;
	}
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
