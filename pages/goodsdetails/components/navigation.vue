<template>
	<view class="navigation">
		<view class="left">
			<view class="item">
				<image src="../../../static/image/toIndex.png"></image>
				<view class="text u-line-1">首页</view>
			</view>
			<view class="item">
				<image src="../../../static/image/call.png"></image>
				<view class="text u-line-1">联系商家</view>
			</view>
			<view class="item">
				<!-- <u-badge class="car-num" :count="9" type="error" :offset="[-3, -6]"></u-badge> -->
				<image src="../../../static/image/share_it.png"></image>
				<view class="text u-line-1">分享</view>
			</view>
		</view>
		<view class="right">
			<view class="btn">
				<u-button shape="circle" ripple="true" type="warning">马上购买</u-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			customStyle:{
				color: 'red'
			}
		};
	}
};
</script>

<style lang="less" scoped>
.navigation {
	width: 750rpx;
	display: flex;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 16rpx 0;
	
	.left {
		width: 375rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 20rpx;
		
		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			image{
				width: 42rpx;
				height: 42rpx;
			}
			
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}
	.right {
		width: 375rpx;
		display: flex;
		font-size: 28rpx;
		align-items: center;
		justify-content: center;
		.btn {
			width:330rpx;
			height:80rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(0,0,0,1);
			opacity:0.9;
			
			u-button{
				color: rgba(255, 186, 0, 1);
			}
		}
	}
}
</style>
