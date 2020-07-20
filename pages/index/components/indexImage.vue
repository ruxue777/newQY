<template>
	<view class="main">
		
		<image class="act-img" src="../../../static/image/activity.png"></image>
		<view class="hot">
			<image class="act-hot" src="../../../static/image/index_activity.png"></image>
			<view class="title">热门产品</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
.main{
	width: 100%;
	height: 220rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.act-img{
		width: 690rpx;
		height: 150rpx;
	}
	
	.hot{
		width: 400rpx;
		height: 50rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.act-hot{
			width: 336rpx;
			height: 25rpx;
			position: relative;
			top: 40rpx;
		}
		.title{
			width: 125rpx;
			height: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			font-weight: bold;
			position: relative;
			top: 10rpx;
		}
	}
	
}
</style>
