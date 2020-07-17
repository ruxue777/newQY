<template>
	<view class="main">
		<view class="cent">
			<view class="cent-top">
				<view class="shop">
					<image class="shop-img"></image>
					<text class="shop-name">第一家店</text>
				</view>
				
				<view class="shop">
					<image class="shop-img"></image>
					<text class="shop-name">第一家店</text>
				</view>
				
				<view class="shop">
					<image class="shop-img"></image>
					<text class="shop-name">第一家店</text>
				</view>
				
				<view class="shop">
					<image class="shop-img"></image>
					<text class="shop-name">第一家店</text>
				</view>
			</view>
			
			<view class="cent-top">
				<view class="shop">
					<image class="shop-img-2"></image>
					<text class="shop-name">第二家店</text>
				</view>
				
				<view class="shop">
					<image class="shop-img-2"></image>
					<text class="shop-name">第二家店</text>
				</view>
				
				<view class="shop">
					<image class="shop-img-2"></image>
					<text class="shop-name">第二家店</text>
				</view>
				
				<view class="shop">
					<image class="shop-img-2"></image>
					<text class="shop-name">第二家店</text>
				</view>
			</view>
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
	height: 340rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.cent{
		width: 750rpx;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.cent-top{
			width: 710rpx;
			height: 280rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			.shop{
				width: 100rpx;
				height: 108rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				.shop-img{
					width: 88rpx;
					height: 88rpx;
					border-radius: 15rpx;
					background-color: #74BEFF;
				}
				.shop-img-2{
					width: 88rpx;
					height: 88rpx;
					border-radius: 15rpx;
					background-color: #E18D63;
				}
				.shop-name{
					width: 98rpx;
					height: 20rpx;
					font-size:24rpx;
				}
			}
			
		}
	}
}
</style>
