<template>
	<view class="main">
		<view class="top-content">
			<view class="top-title">
				<view class="title">搜索结果</view>
				<u-icon name="arrow-left" size="40" @click="back"></u-icon>				
			</view>
			<view class="top-seek">
				<view class="seek-content">
					<u-icon name="search" size="40"></u-icon>
					<view class="title">搜索店铺</view>
				</view>
				
				<view v-if="isGoods == true" class="select">
					<view class="seek-goods btn">商品</view>
					<view class="seek-shop" @click="isGoods = false,shopSeekResult=[],getShopSeekDetails()">商铺</view>
				</view>
				<view v-else class="select">
					<view class="seek-goods" @click="isGoods = true">商品</view>
					<view class="seek-shop btn">商铺</view>
				</view>
			</view>
		</view>
		<view class="btt"></view>
		
		<view class="seek-goods-content" v-if="isGoods == true">	
			<view class="middle" v-for="(item,index) in goodsSeekResult" :key="index" @click="toGoodsDetails(item.id,item.CircleID,item.BusinessID)">
				<view class="left">
					<image :src="item.BP_ImgUrl"></image>
				</view>
				
				<view class="right">
					<view class="goods-top">
						<view class="goods-name">{{item.BP_Name}}</view>
						<view class="goods-type">
							<view class="cont">{{item.C_Name}}</view>
						</view>
					</view>
					<view class="goods-bottom">
						<view class="goods-sales">
							<text class="sales">已售: {{item.BP_OrderIsSell}} 仅剩: {{item.BP_OrderStock - item.BP_OrderIsSell}}</text>
							<text class="distance">{{(item.Distance*1).toFixed(2)}}km</text>
						</view>
						<view class="goods-price">
							<view class="price-cont">
								<text class="price">￥{{item.BP_Amount}}</text>
								<text class="original-price">{{item.BP_MarketAmount}}</text>
							</view>
							
							<view class="button">购买</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	
		<view class="seek-shop-content" v-else>
			<view class="middle" v-for="(item,index) in shopSeekResult" :key="index" @click="toShopDetails(item.id)">
				<view class="left">
					<image :src="item.ImgUrl"></image>
				</view>
				<view class="right">
					<view class="shop-top">
						<view class="shop-name">{{item.BusinessName}}</view>
						<view class="shop-location">
							<text class="locations">{{item.AeraAllName}}</text>
							<text class="distance">{{(item.Distance *1).toFixed(2)}}km</text>
						</view>
					</view>
					<view class="shop-bottom">
						<view class="shop-type">
							<view class="cont">{{item.T_Name}}</view>
							<view class="sales">总销售: {{item.OrderIsSell_Total}}</view>
						</view>
						<view class="shop-time">营业时间:{{item.BusinessTime}}</view>
					</view>
				</view>
			</view>
			
		</view>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" ></u-loadmore>
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		data() {
			return {
				//是否显示商品
				isGoods:true,
				//搜索值
				ipt:'',
				LatItude:'',
				LongItude:'',
				//商品inde
				goodsIndex:1,
				//商铺inde
				shopIndex:1,
				loadStatus: 'loadmore',
				//商品搜索结果
				goodsSeekResult:[],
				//商铺搜索结果
				shopSeekResult:[]
			};
		},
		onLoad(e) {
			this.ipt = e.ipt;
			this.LatItude = e.LatItude
			this.LongItude = e.LongItude
			
			this.getGoodsSeekDetails()
		},
		onReachBottom() {
			if(this.goodsSeekResult.length<this.Index*10){
				this.loadStatus = 'nomore';
				return;
			}else{
				this.Index++;
				this.loadStatus = 'loading';
				// 模拟数据加载效果
				setTimeout(() => {
					this.getGoodsSeekDetails();
					this.loadStatus = 'loadmore';
				}, 1000);
			}
		},
		methods:{
			getGoodsSeekDetails(callBack){
				request('API_GetList_BusinessProductSearch_V2',{CircleID:0,CategoryID:0,BusinessID:0,Keywords:this.ipt,Longitude:this.LongItude,Latitude:this.LatItude,
					orderState:2,IsFL:-1,IsBP:-1,pageSize:10,index:this.goodsIndex}).then(res=>{
						if(res.length<10){
							this.loadStatus = 'nomore'
						}
						this.goodsSeekResult = [...this.goodsSeekResult,...res]
						callBack && callBack()
					})
			},
			getShopSeekDetails(callBack){
				request('API_GetList_BusinessSearch_V2',{CircleID:0,TradeID:0,Keywords:this.ipt,Longitude:this.LongItude,Latitude:this.LatItude,
					orderState:2,pageSize:10,index:this.shopIndex,ProductPageSize:0}).then(res=>{
						if(res.length<10){
							this.loadStatus = 'nomore'
						}
						this.shopSeekResult = [...this.shopSeekResult,...res]
						callBack && callBack()
					})
			},
			//店铺详情页面
			toShopDetails(BusinessID){
				uni.navigateTo({
					url:`/pages/shopdetails/shopdetails?BusinessID=${BusinessID}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
			},
			//商品详情页面
			toGoodsDetails(id,CircleID,BusinessID){
				uni.navigateTo({
					url:`/pages/goodsdetails/goodsdetails?id=${id}&CircleID=${CircleID}&BusinessID=${BusinessID}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
			},
			back(){ 
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
.main{
	.top-content{
		width: 100%;
		height: 240rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position:fixed;
		top:0;
		z-index: 120;
		
		.top-title{
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
			justify-content: space-around;
			align-items: center;
			
			.seek-content{
				width: 520rpx;
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
			
			.select{
				width: 180rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
			}
			
			.seek-goods,.seek-shop{
				width: 80rpx;
				height: 80rpx;
				background-color: #e8e8e8;
				border-radius: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
			}
			
			.btn{
				background-color: rgba(150, 128, 247, 1);
				color: #FFFFFF;
			}
		}
	}

	.btt{
		width: 100%;
		height: 240rpx;
	}

	.seek-goods-content{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		
		.middle{
			width: 690rpx;
			height: 210rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-bottom: 1rpx solid #e2e2e2;
			
			.left{
				width: 200rpx;
				height: 180rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				image{
					width: 180rpx;
					height: 180rpx;
					border-radius: 15rpx;
				}
			}
			
			.right{
				width: 510rpx;
				height: 200rpx;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				margin-left: 10rpx;
				
				.goods-top{
					width: 100%;
					height: 100rpx;
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					
					.goods-name{
						width: 100%;
						height: 100rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;
					}
					
					.goods-type{
						width: 100%;
						height: 45rpx;
						display: flex;
						justify-content: flex-start;
						
						.cont{
							width: 160rpx;
							height: 40rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							border: 1rpx solid red;
							border-radius: 20rpx;
							color: red;
						}
					}
				}
				
				.goods-bottom{
					width: 100%;
					height: 100rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					
					.goods-sales{
						width: 100%;
						height: 40rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 24rpx;
						color: #b5b5b5;
						
						.distance{
							position: relative;
							right: 40rpx;
						}
					}
					
					.goods-price{
						width: 100%;
						height: 50rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						position: relative;
						
						.price-cont{
							display: flex;
							justify-content: center;
							align-items: center;
							
							.price{
								font-size:32rpx;
								font-family:PingFang SC;
								font-weight:500;
								color:rgba(245,52,34,1);
							}
							
							.original-price{
								margin-left: 15rpx;
								font-size:24rpx;
								font-family:PingFang SC;
								font-weight:500;
								text-decoration:line-through;
								color:rgba(154,154,154,1);
							}
						}
						
						.button{
							width: 80rpx;
							height: 40rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24rpx;
							border-radius: 15rpx;
							color: #FFFFFF;
							background: linear-gradient(to right,#f9ac0f,#f39231);
							position: relative;
							right: 40rpx;
						}
					}
				}
			}
		}	
	}

	.seek-shop-content{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		
		.middle{
			width: 690rpx;
			height: 210rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-bottom: 2rpx solid #e2e2e2;
			
			.left{
				width: 200rpx;
				height: 180rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				image{
					width: 180rpx;
					height: 180rpx;
					border-radius: 15rpx;
				}
			}
			
			.right{
				width: 510rpx;
				height: 200rpx;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				margin-left: 10rpx;
				
				.shop-top{
					width: 100%;
					height: 100rpx;
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					
					.shop-name{
						font-size: 30rpx;
						font-weight: bold;
					}
					
					.shop-location{
						font-size: 24rpx;
						color: #b5b5b5;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
				}
				
				.shop-bottom{
					width: 100%;
					height: 100rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					
					.shop-type{
						width: 100%;
						height: 45rpx;
						display: flex;
						justify-content: space-between;
						
						.sales{
							color: red;
						}
						
						.cont{
							width: 150rpx;
							height: 40rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24rpx;
							border-radius: 15rpx;
							color: #FFFFFF;
							background: linear-gradient(to right,#f9ac0f,#f39231);
						}
					}
					.shop-time{
						color: #b5b5b5;
					}
				}
			}
		}
	}
}
</style>
