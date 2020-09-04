<template>
	<view class="main">
		<view class="top-title">
			<u-navbar  :title="name" :background="background"></u-navbar>
		</view>
		<view class="top-img">
			<image :src="imgUrl"></image>
		</view>
		
		<view class="select-box">
			<view class="select-box-top">
				<view class="left">{{name}}</view>
				<view class="select-cont">
					<view  @click="isShop = true" :class="{btn:isShop == true}">店铺</view>
					<view  @click="isShop = false" :class="{btn:isShop == false}">商品</view>
				</view>
			</view>
			<view class="select-box-bottom">
				<view @click="cur = 0" :class="cur == 0 ? 'selected':'Unselected'">默认排序</view>
				<view @click="cur = 1" :class="cur == 1 ? 'selected':'Unselected'">销量最高</view>
				<view @click="cur = 2" :class="cur == 2 ? 'selected':'Unselected'">距离最近</view>
			</view>
		</view>
		
		<view class="shopList" v-if="isShop == true">
			<view class="shopList-middle">
				<view class="shopList-middle-left">
					<image src="../../static/image/img2.jpg"></image>
				</view>
				<view class="shopList-middle-right">
					<view class="top-content">
						<text class="shop-name">哒哒哒哒哒哒哒哒哒阿达的按</text>
						<view class="rate">
							<text>5.0</text>
							<u-rate :count="count" v-model="starAmount" active-color="#FFE50E" disabled="true"></u-rate>
						</view>
						<view class="shop-type">
							<view class="left">酒水饮料</view>
							<text class="distance">3.5km</text>
						</view>
						
					</view>
					<view class="bottom-content">
						<view class="left-goods-amount">
							<text class="amount">500.00元</text>
							<text class="name">特惠价</text>
						</view>
						<view class="right-goods-discount">
							<view class="discount"> 500元通用小风景哈哈哈</view>
							<text>已售 90</text>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
					
				</view>
			</view>
			
			
		</view>
	
		<view class="goodsList" v-else>
			<view class="goodsList-middle">
				<view class="goods-content">
					<view class="top-goods-image">
						<image src="../../static/image/img1.jpg"></image>
					</view>
					<view class="bottom-goods-cont">
						<text class="goods-title">鲁格作案法国接口原装好久3只礼盒装</text>
						<view class="goods-details">鲁格作案法国接口原装好久3只礼盒装鲁格作案法国接口原装好久3只礼盒装</view>
						<view class="goods-bottom-content">
							
						</view>
					</view>
				</view>
				
				<view class="goods-content">
					<view class="top-goods-image">
						<image src="../../static/image/img1.jpg"></image>
					</view>
					<view class="bottom-goods-cont">
						<text class="goods-title">鲁格作案法国接口原装好久3只礼盒装</text>
						<view class="goods-details">鲁格作案法国接口原装好久3只礼盒装鲁格作案法国接口原装好久3只礼盒装</view>
						<view class="goods-bottom-content">
							
						</view>
					</view>
				</view>
				
				<view class="goods-content">
					<view class="top-goods-image">
						<image src="../../static/image/img1.jpg"></image>
					</view>
					<view class="bottom-goods-cont">
						<text class="goods-title">鲁格作案法国接口原装好久3只礼盒装</text>
						<view class="goods-details">鲁格作案法国接口原装好久3只礼盒装鲁格作案法国接口原装好久3只礼盒装</view>
						<view class="goods-bottom-content">
							
						</view>
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
				background:{
					backgroundColor: '#FFE50E',
				},
				isShop:true,
				cur:0,
				//星星最大数量
				count: 5,
				//星星当前数量
				starAmount:5,
				//头部名称
				name:'',
				//头部图片
				imgUrl:'',
				LatItude:'',
				LongItude:''
			};
		},
		onLoad(e) {
			this.name = e.name;
			this.imgUrl = e.imgUrl
			this.LatItude = e.LatItude
			this.LongItude = e.LongItude
		}
	}
</script>

<style lang="less">
.main{
	.top-img{
		width: 100%;
		height: 340rpx;
		
		image{
			width: 100%;
			height: 340rpx;
		}
	}
	
	.select-box{
		width: 100%;
		height: 130rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-left: 20rpx;	
		padding-right: 20rpx;	
			
		.select-box-top{
			width: 100%;
			height: 65rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.left{
				font-size: 36rpx;
				font-weight: bold;
			}
			
			.select-cont{
				width: 200rpx;
				height: 60rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				
				.btn{
					font-weight: bold;
					padding-bottom: 2px;
					border-bottom:  3px solid #FF9900;
				}
			}
		}
		
		.select-box-bottom{
			width: 100%;
			height: 65rpx;
			display: flex;
			align-items: center;
			
			.selected{
				width: 120rpx;
				height: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 20rpx;
				background-color: #ff9900;
				font-size: 22rpx;
				margin: 5rpx;	
			}
			
			.Unselected{
				width: 120rpx;
				height: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 20rpx;
				background-color: #cecece;
				font-size: 22rpx;
				margin: 5rpx;	
			}
		}
	}

	.shopList{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		
		.shopList-middle{
			width: 710rpx;
			display: flex;
			justify-content: space-between;
			margin-bottom: 10rpx;
			
			.shopList-middle-left{
				image{
					width: 150rpx;
					height: 150rpx;
					border-radius: 10rpx;
				}
			}
			
			.shopList-middle-right{
				width: 520rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				
				.top-content{
					width: 100%;
					height: 150rpx;
					border-bottom: 1rpx solid #d1d1d1;
					
					.shop-name{
						font-size: 30rpx;
						font-weight: bold;
					}
					
					.rate{
						width: 250rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
					
					.shop-type{
						width: 100%;
						height: 60rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						
						.left{
							width: 150rpx;
							height: 40rpx;
							font-size: 26rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 15rpx;
							background: linear-gradient(to right,#f9ac0f,#f39231);
							color: #FFFFFF;
						}
					}
				}
			
				.bottom-content{
					width: 100%;
					height: 120rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					border-bottom: 1rpx solid #d1d1d1;
					
					.left-goods-amount{
						display: flex;
						align-items: center;
						flex-direction: column;
						
						.amount{
							color: red;
							margin-bottom: 10rpx;
						}
						
						.name{
							width: 100rpx;
							height: 40rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 20rpx;
							border: 1rpx solid red;
							background-color: #FFFFFF;
							color: red;
						}
					}
					
					.right-goods-discount{
						display: flex;
						align-items: center;
						flex-direction: column;
						
						.discount{
							margin-bottom: 10rpx;
						}
					}
				}
			}
		}
	}
	
	.goodsList-middle{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
		padding: 10rpx;
		background-color: #e2e2e2;
		
		.goods-content{
			width: 320rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			margin: 10rpx;
			
			.top-goods-image{
				width: 100%;
				height: 320rpx;
				image{
					width: 100%;
					height: 320rpx;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
				}
			}
			
			.bottom-goods-cont{
				width: 100%;
				height: 320rpx;
				padding: 10rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				
			}
		}
	}
}
</style>
