<template>
	<view class="main">
		<view class="top-title">
			<p>更多好物</p>
		</view>
		<view class="middle">
			<view class="moreGoods">
				<view class="goods-img">
					<image src="../../../static/image/goodsimg.png"></image>
				</view>
				
				<view class="goodsDetails">
					<view class="content">
						<view class="title">户外必备驱蚊神器华东师实打实的收到收到是打的收到收到是打的收到收到是打的收到收到是123123打</view>
						
						<view class="amount">
							<p class="img">￥</p>
							<p class="goods-amount">399.99</p>
							<p class="payment">120人付款</p>
						</view>
					</view>
				</view>
			</view>
			
			<view class="moreGoods">
				<view class="goods-img">
					<image src="../../../static/image/goodsimg.png"></image>
				</view>
				
				<view class="goodsDetails">
					<view class="content">
						<view class="title">户外必备驱蚊神器华东师实打实的收到收到是打的收到收到是打的收到收到是打的收到收到是123123打</view>
						
						<view class="amount">
							<p class="img">￥</p>
							<p class="goods-amount">399.99</p>
							<p class="payment">120人付款</p>
						</view>
					</view>
				</view>
			</view>
			
			<view class="moreGoods">
				<view class="goods-img">
					<image src="../../../static/image/goodsimg.png"></image>
				</view>
				
				<view class="goodsDetails">
					<view class="content">
						<view class="title">户外必备驱蚊神器华东师实打实的收到收到是打的收到收到是打的收到收到是打的收到收到是123123打</view>
						
						<view class="amount">
							<p class="img">￥</p>
							<p class="goods-amount">399.99</p>
							<p class="payment">120人付款</p>
						</view>
					</view>
				</view>
			</view>
			
			<view class="moreGoods">
				<view class="goods-img">
					<image src="../../../static/image/goodsimg.png"></image>
				</view>
				
				<view class="goodsDetails">
					<view class="content">
						<view class="title">户外必备驱蚊神器华东师实打实的收到收到是打的收到收到是打的收到收到是打的收到收到是123123打</view>
						
						<view class="amount">
							<p class="img">￥</p>
							<p class="goods-amount">399.99</p>
							<p class="payment">120人付款</p>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="filling"></view>
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	top: -30rpx;
	
	.top-title{
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		p{
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(0,0,0,1);
			border-bottom: 5rpx solid rgba(255, 221, 0, 1);
		}
	}
	
	.middle{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		
		.moreGoods{
			width: 350rpx;
			height: 520rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: 10rpx 10rpx 0 0;
			margin: 10rpx;
			-moz-box-shadow:0px 0px 10px #e3e3e3; -webkit-box-shadow:0px 0px 10px #e3e3e3; box-shadow:0px 0px 10px #e3e3e3;
			
			.goods-img{
				width: 350rpx;
				height: 350rpx;
				image{
					width: 350rpx;
					height: 350rpx;
					border-radius: 10rpx 10rpx 0 0;
				}
			}
			
			.goodsDetails{
				width: 100%;
				height: 170rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.content{
					width: 275rpx;
					height: 130rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					
					.title{
						width: 275rpx;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(0,0,0,1);
						line-height:32rpx;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;  //  两行。。。  限制的行数
						-webkit-box-orient: vertical;
						word-break: break-all;
						overflow: hidden;
						display: -webkit-box;
					}
					
					.amount{
						width: 100%;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						
						.img{
							font-size:20rpx;
							font-family:PingFang SC;
							font-weight:500;
							color:rgba(253,63,0,1);
						}
						.goods-amount{
							font-size:36rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(254,73,13,1);
						}
						.payment{
							position: relative;
							left: 5rpx;
							top: 5rpx;
							font-size:20rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(153,153,153,1);
						}
					}
				}
			}
		}
	}
	
	.filling{
		width: 100%;
		height: 100rpx;
	}
}
</style>
