<template>
	<view class="main">
		<view class="line"></view>
		<view class="middle">
			<view class="main-shop">
				<view class="left">
					<image src="../../../static/bankCard/BOC.png"></image>
					<p>法国饰品店</p>
				</view>
				<view class="right">
					进店逛逛 >
				</view>
			</view>
			<view class="write-off">
				<view class="top">
					<view class="shop-name">法国饰品店</view>
					<view class="img">
						<image class="phone-img" src="../../../static/image/phone_1.png"></image>
						<image src="../../../static/image/navigation.png"></image>
					</view>
				</view>
				<view class="bottom">
					<view class="shop-time">
						<p>· 17:00-24:00</p>
					</view>
					<view class="shop-location">
						<p>· 江西省赣州市章贡区80号</p>
					</view>
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
	height: 300rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	top: -80rpx;
	
	.line{
		width: 100%;
		height: 10rpx;
		background-color: #f0f0f0;
	}
	.middle{
		width: 670rpx;
		height: 260rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.main-shop{
			width: 100%;
			height: 110rpx;
			border-bottom: 1rpx solid #f0f0f0;
			display: flex;
			justify-content: space-between;	
			align-items: center;
			
			.left{
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
				}
			}
			.right{
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	
		.write-off{
			width: 100%;
			
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #f0f0f0;
			
			.top{
				width: 100%;
				height: 70rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.shop-name{
					width:200rpx;
					height:30rpx;
					font-size:30rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(0,0,0,1);
				}
				.img{
					display: flex;
					justify-content: center;
					align-items: center;
					.phone-img{
						margin-right: 25rpx;
					}
					image{
						width: 46rpx;
						height: 46rpx;
					}
				}
			}
			.bottom{
				width: 100%;
				height: 85rpx;
				
				.shop-time,.shop-location{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			}
		}
	}
}
</style>
