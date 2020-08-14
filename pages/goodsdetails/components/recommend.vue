<template>
	<view class="main">
		<view class="middle">
			<view class="top-title">
				<p>推荐商品</p>
			</view>
			<view class="bottom-content">
				<view class="goods-cont">
					<image src="../../../static/image/goodsimg.png"></image>
					<view class="goods-data">
						<view class="goods-details">日本进口洗面奶非常好用的洗面奶，美....</view>
						<view class="goods-price">￥50.88</view>
					</view>
				</view>
				
				<view class="goods-cont">
					<image src="../../../static/image/goodsimg.png"></image>
					<view class="goods-data">
						<view class="goods-details">日本进口洗面奶非常好用的洗面奶，美....</view>
						<view class="goods-price">￥50.88</view>
					</view>
				</view>
				
				<view class="goods-cont">
					<image src="../../../static/image/goodsimg.png"></image>
					<view class="goods-data">
						<view class="goods-details">日本进口洗面奶非常好用的洗面奶，美....</view>
						<view class="goods-price">￥50.88</view>
					</view>
				</view>
				
				<view class="goods-cont">
					<image src="../../../static/image/goodsimg.png"></image>
					<view class="goods-data">
						<view class="goods-details">日本进口洗面奶非常好用的洗面奶，美....</view>
						<view class="goods-price">￥50.88</view>
					</view>
				</view>
				
				<view class="goods-cont">
					<image src="../../../static/image/goodsimg.png"></image>
					<view class="goods-data">
						<view class="goods-details">日本进口洗面奶非常好用的洗面奶，美....</view>
						<view class="goods-price">￥50.88</view>
					</view>
				</view>
				
				<view class="goods-cont">
					<image src="../../../static/image/goodsimg.png"></image>
					<view class="goods-data">
						<view class="goods-details">日本进口洗面奶非常好用的洗面奶，美....</view>
						<view class="goods-price">￥50.88</view>
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
	height: 820rpx;
	margin-top: 60rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.middle{
		width: 670rpx;
		height: 760rpx;
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
		
		.bottom-content{
			width: 100%;
			height: 680rpx;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: space-around;
			
			.goods-cont{
				width: 200rpx;
				height: 330rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				
				image{
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
				
				.goods-data{
					width: 200rpx;
					height: 110rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					
					.goods-details{
						width:200rpx;
						height:40rpx;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(0,0,0,1);
						line-height:30rpx;
						overflow:hidden;
						white-space:nowrap;
						text-overflow:ellipsis;
					}
					.goods-price{
						width:150rpx;
						height:35rpx;
						font-size:30rpx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(245,58,42,1);
						line-height:40rpx;
						opacity:0.9;
					}
				}
			}
		}
	}
}
</style>
