<template>
	<view class="main">
		<view class="title">
			<p>商品详情</p>
		</view>
		<view class="u-content">
			<u-parse :html="GoodsData.BP_Content"></u-parse>
		</view>
		
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
		props:['GoodsData'],
		data() {
			return {
			
			};
		}
	}
</script>

<style lang="less">
.main{
	position: relative;
	top: -60rpx;
	.title{
		display: flex;
		justify-content: center;
		align-items: center;
		p{
			width:125rpx;
			height:40rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(0,0,0,1);
			border-bottom: 5rpx solid rgba(255, 221, 0, 1);
		}
	}	
}	

.u-content {
	padding: 24rpx;
	font-size: 32rpx;
	line-height: 1.6;
}
.line{
	width: 100%;
	height: 10rpx;
	background-color: #f2f2f2;
}
</style>
