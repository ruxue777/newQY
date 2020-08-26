<template>
	<view class="mian">
		<view class="top-shop-img">
			<image src="../../../static/image/activity.png"></image>
			<u-icon name="arrow-leftward" size="46"></u-icon>
		</view>
		
		<view class="bottom-shopdetails">
			<view class="shop-name">
				<text class="name">菲尔雪九方店</text>
				<text class="distance">2.3km</text>
			</view>
			
			<view class="shop-details">
				<view class="content">
					<view class="left">行业:</view>
					<view class="right">菲尔学</view>
				</view>
				
				<view class="content">
					<view class="left">营业时间:</view>
					<view class="right">12：00-22：00</view>
				</view>
				
				<view class="content">
					<view class="left">商家电话:</view>
					<view class="right">1509999999</view>
				</view>
				
				<view class="content">
					<view class="left">商家地址:</view>
					<view class="right">九方菲尔学</view>
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
	.top-shop-img{
		width: 100%;
		height: 700rpx;
		position: relative;
		
		image{
			width: 100%;
			height: 700rpx;
		}
		
		u-icon{
			position: absolute;
			top: 65rpx;
			left: 50rpx;
		}
	}
	
	.bottom-shopdetails{
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.shop-name{
			width: 670rpx;
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid #dddddd;
			
			.name{
				font-size: 40rpx;
				letter-spacing:2rpx;
				font-weight: bold;
			}
			
			.distance{
				font-size: 28rpx;
				color: #999999;
			}
		}
		
		.shop-details{
			width: 670rpx;
			height: 240rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 20rpx;
			
			.content{
				width: 100%;
				height: 55rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.left{
					width: 150rpx;
					height: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-weight: 500;
					font-size: 32rpx;
				}
				.right{
					width: 520rpx;
					height: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					color: #999999;
					position: relative;
					left: 20rpx;
					font-size: 26rpx;
				}
			}
		}
	}
}
</style>
