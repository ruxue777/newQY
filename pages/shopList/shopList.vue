<template>
	<view class="main">
		<view class="top-title">
			<view class="shoplist-name">
				<view class="title">全部商铺</view>
				<u-icon name="arrow-left" size="40"></u-icon>
			</view>
			
			<view class="top-seek">
				<view class="seek-content">
					<u-icon name="search" size="40"></u-icon>
					<view class="title">搜索店铺</view>
				</view>
			</view>
		</view>
		
		<view class="btt"></view>
		
		<view class="shop-list">
			<view class="content">
				<view class="left-img">
					<image src="../../static/image/img4.jpg"></image>
				</view>
				
				<view class="right-shopdetails">
					<view class="shop-name">水上乐园哈哈哈</view>
					<view class="shop-type">夏日乐园</view>
					
					<view class="shop-location">
						<text class="left">江西省赣州市章贡区水南大道</text>
						<text class="right">2.8km</text>
					</view>
					
					<view class="shop-time">
						<text class="left">营业时间:12：00-22：00</text>
						<text class="right">已售 79</text>
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
	.top-title{
		width: 100%;
		height: 240rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position:fixed;
		top:0;
		z-index: 120;
		
		.shoplist-name{
			width: 100%;
			height: 140rpx;
			background-color: rgba(255, 229, 14, 1);
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			
			.title{
				font-size: 34rpx;
				font-weight: bold;
				position: absolute;
				top: 80rpx;
			}
			
			u-icon{
				position: absolute;
				top: 80rpx;
				left: 40rpx;
			}
		}
		
		.top-seek{
			width: 100%;
			height: 100rpx;
			background-color:#FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.seek-content{
				width: 710rpx;
				height: 80rpx;
				background-color: #e8e8e8;
				border-radius: 15rpx;
				display: flex;
				align-items: center;
				position: relative;
				
				u-icon{
					position: absolute;
					left: 30rpx;
				}
				
				.title{
					color: #b5b5b5;
					position: absolute;
					left: 80rpx;
				}
			}
		}
	}
	
	.btt{
		width: 100%;
		height: 240rpx;
	}
	
	.shop-list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		
		.content{
			width: 710rpx;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-bottom: 1rpx solid #d4d4d4;
			
			.left-img{
				width: 180rpx;
				height: 180rpx;
				border-radius: 15rpx;
				
				image{
					width: 180rpx;
					height: 180rpx;
					border-radius: 15rpx;
				}
			}
			.right-shopdetails{
				width: 530rpx;
				height: 180rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				//align-items: center;
				
				.shop-name{
					font-size: 30rpx;
					color: #000000;
				}
				
				.shop-type{
					width: 200rpx;
					height: 50rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 20rpx;
					background-color: #ff9900;
					color: #FFFFFF;
				}
			}
		}
	}
}
</style>
