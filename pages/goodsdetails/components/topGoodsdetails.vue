<template>
	<view class="main">
		<view class="goods-img">
			<image src="../../../static/image/goodsimg.png"></image>
		</view>
		
		<view class="goods-cont">
			<view class="goods-price">
				<view class="goods-price-content">
					<view class="left-content">
						<text class="commodity-price">￥166.90</text>
						<text class="original-price">￥166.90</text>
					</view>
					
					<view class="right-content">
						<p class="stock">已售 3 ・ 仅剩 999999</p>
					</view>
				</view>
			</view>
			
			<view class="goods-describe">
				<view class="goods-describe-content">
					<p class="goods-titile">
						微软（Microsoft）Surface Book 2 创意商用设计二合一平板电脑笔记本 13.5英寸（Intel i5 8G内存 256G存储）
                    </p>
					
					<p class="goods-details">
					   这款属于略高端的一款床垫，面料选用的都是全棉面料 ，填充物是的吧
					   竹炭纤维和防螨帝人棉 床垫的防螨效果估计都是大家最在意的吧我
					   们的质检报告显示可以有效防螨99.9%
					</p>
				</view>
			</view>
			<view class="goods-service">
				<view class="goods-service-content">
					<view class="top">
						<view class="cont"></view>
					</view>
					<view class="bottom"></view>
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
	.goods-img{
		width: 100%;
		height: 750rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		image{
			width: 750rpx;
			height: 750rpx;
		}
	}
	
	.goods-cont{
		width: 100%;
		height: 710rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.goods-price{
			width: 100%;
			height: 95rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.goods-price-content{
				width: 670rpx;
				height: 100%;
				border-bottom: 4rpx solid #E5E5E5;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.left-content{
					width: 236rpx;
					height: 30rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					
					.commodity-price{
						font-size:36rpx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(245,51,34,1);
					}
					
					.original-price{
						position: relative;
						top: 10rpx;
						left: 10rpx;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:500;
						text-decoration:line-through;
						color:rgba(153,153,153,1);
					}
				}
				
				.right-content{
					width: 200rpx;
					height: 25rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					
					.stock{
						width: 200rpx;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(153,153,153,1);
					}
				}
			}
		}
		.goods-describe{ 
			width: 100%;
			height: 280rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.goods-describe-content{
				width: 670rpx;
				height: 200rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-content: center;
				position: relative;
				top: -30rpx;
				
				.goods-titile{
					width:660rpx;
					font-size:28rpx;
					font-family:PingFang TC;
					font-weight:500;
					color:rgba(0,0,0,1);
				}
				
				.goods-details{
					width:660rpx;
					font-size:22rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(102,102,102,1);
				}
			}
		}
		.goods-service{
			width: 100%;
			height: 300rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.goods-service-content{
				width: 670rpx;
				height: 275rpx;
				background:rgba(255,255,255,1);
				border-radius:10rpx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				position: relative;
				top: -20rpx;
				-moz-box-shadow:0px 0px 10rpx #e4e4e4;
				-webkit-box-shadow:0px 0px 10rpx #e4e4e4;
				box-shadow:0px 0px 10rpx #e4e4e4;
				
				.top{
					width: 100%;
					height: 150rpx;
				}
				
				.bottom{
					width: 100%;
					height: 125rpx;
				}
			}
		}
	}
}
</style>
