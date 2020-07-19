<template>
	<view class="main">
		<view class="cent">
			<view class="cent-top" >
				<view class="shop" v-for="(item,index) in ShopListData" :key="index">
					<image class="shop-img" :src="item.T_ImgUrl"></image>
					<text class="shop-name">{{item.T_Name}}</text>
				</view>
				
				<view class="shop">
					<image class="shop-img"></image>
					<text class="shop-name">全部商铺</text>
				</view>
			
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['ShopListData'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
.main{
	width: 100%;
	height: 200rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: -30rpx;
	.cent{
		width: 750rpx;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.cent-top{
			width: 710rpx;
			height: 180rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			.shop{
				width: 108rpx;
				height: 108rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				.shop-img{
					width: 94rpx;
					height: 98rpx;
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
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					top: 15rpx;
				}
			}
		}
	}
}
</style>
