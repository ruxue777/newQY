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
			<view class="shopList-middle" v-for="(item,index) in shopList" :key="index">
				<view class="shopList-middle-left">
					<image :src="item.ImgUrl"></image>
				</view>
				<view class="shopList-middle-right">
					<view class="top-content" @click="toShopDetails(item.id)">
						<text class="shop-name">{{item.BusinessName}}</text>
						<view class="rate">
							<text>5.0</text>
							<u-rate :count="count" v-model="starAmount" active-color="#FFE50E" disabled="true"></u-rate>
						</view>
						<view class="shop-type">
							<view class="left">{{item.T_Name}}</view>
							<text class="distance">{{(item.Distance*1).toFixed(2)}}km</text>
						</view>
					</view>
					<view class="bottom-content" v-if="item.ProductList_Detail.length != 0" v-for="(list,index1) in item.ProductList_Detail" :key="index1" @click="toGoodsDetails(list.id,list.BusinessID,list.CategoryID)">
						<view class="left-goods-amount">
							<text class="amount">{{list.BP_Amount}}元</text>
							<text class="name">特惠价</text>
						</view>
						<view class="right-goods-discount">
							<view class="discount"> {{list.BP_Name}}</view>
							<text>已售 {{list.BP_OrderIsSell}}</text>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
	
		<view class="goodsList" v-else>
			<view class="goodsList-middle">
				<view class="goods-content" v-for="(item,index) in goodsList" :key="index" @click="toGoodsDetails(item.id,item.BusinessID,item.CategoryID)">
					<view class="top-goods-image">
						<image :src="item.BP_ImgUrl"></image>
					</view>
					<view class="bottom-goods-cont">
						<text class="goods-title">{{item.BP_Name}}</text>
						<view class="goods-details btnn">{{item.BP_Desc}}</view>
						<view class="goods-bottom-content">
							<view class="goods-amount">
								<text class="goods-amount-left">￥{{item.BP_MarketAmount}}</text>
								<text class="goods-amount-right">{{item.BP_OrderIsSell }}人付款</text>
							</view>
							<view class="subsidy-box" v-if="item.IsOffset != 0">
								<view class="subsidy-box-left">补贴</view>
								<view class="subsidy-box-right">可抵扣{{item.BPR_OffsetAmount}}元</view>
							</view>
							<u-icon name="shopping-cart" color="red"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
	<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" ></u-loadmore>
	</view>
</template>

<script>
import {request} from '@/api/request.js';	
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
				loadStatus: 'loadmore',
				//头部名称
				//商圈id
				CircleID:'',
				//类别id
				CategoryID:'',
				//店铺类别id
				TradeID:'',
				name:'',
				//头部图片
				imgUrl:'',
				LatItude:'',
				LongItude:'',
				//商品index
				goods_index:1,
				//商品排序
				orderState_Goods:0,
				//商品数据
				goodsList:[],
				//商铺index
				shop_index:1,
				//商铺排序
				orderState_Shop:0,
				//商铺数据
				shopList:[]
			};
		},
		onLoad(e) {
			this.CircleID = e.CircleID;
			this.CategoryID = e.CategoryID;
			this.TradeID = e.TradeID
			this.name = e.name;
			this.imgUrl = e.imgUrl
			this.LatItude = e.LatItude
			this.LongItude = e.LongItude
			
			this.getGoodsList()
			this.getShopList()
		},
		onReachBottom() {
			if(this.isShop == true){
				if(this.shopList.length<this.shop_index*10){
					this.loadStatus = 'nomore';
					return;
				}else{
					this.shop_index++;
					this.loadStatus = 'loading';
					// 模拟数据加载效果
					setTimeout(() => {
						this.getShopList();
						this.loadStatus = 'loadmore';
					}, 1000);
				}
			}else{
				if(this.goodsList.length<this.goods_index*10){
					this.loadStatus = 'nomore';
					return;
				}else{
					this.goods_index++;
					this.loadStatus = 'loading';
					// 模拟数据加载效果
					setTimeout(() => {
						this.getGoodsList();
						this.loadStatus = 'loadmore';
					}, 1000);
				}
			}
		},
		methods:{
			getGoodsList(callBack){
				request('API_GetList_BusinessProductExchange_V2',{CircleID:this.CircleID,CategoryID:this.CategoryID,BusinessID:0,Keywords:'',
					Longitude:this.LongItude,Latitude:this.LatItude,orderState:this.orderState_Goods,IsFL:'',IsBP:'',pageSize:10,		
						index:this.goods_index}).then(res=>{
							if(res.length<10){
								this.loadStatus = 'nomore'
							}
							this.goodsList = [...this.goodsList,...res]
							callBack && callBack()
						})	
			},
			getShopList(callBack){
				request('API_GetList_BusinessSearch_V2',{CircleID:this.CircleID,TradeID:this.TradeID,Keywords:'',Longitude:this.LongItude,Latitude:this.LatItude,
					orderState:this.orderState_Shop,pageSize:10,index:this.shop_index,ProductPageSize:5}).then(res=>{
						if(res.length<10){
							this.loadStatus = 'nomore'
						}
						this.shopList = [...this.shopList,...res]
						callBack && callBack()
					})									
			},
			toGoodsDetails(id,BusinessID,CategoryID){
				uni.navigateTo({
					url:`/pages/goodsdetails/goodsdetails?id=${id}&BusinessID=${BusinessID}&CategoryID=${CategoryID}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
			},
			toShopDetails(BusinessID){
				uni.navigateTo({
					url:`/pages/shopdetails/shopdetails?BusinessID=${BusinessID}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
			}
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
			border-radius: 15rpx;
			-moz-box-shadow:0px 0px 8rpx #cacaca; -webkit-box-shadow:0px 0px 8rpx #cacaca; box-shadow:0px 0px 8rpx #cacaca;
			padding: 10rpx;
			
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
					border-top: 1rpx solid #d1d1d1;
					
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
							width: 340rpx;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 32rpx;
							text-overflow: ellipsis;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							word-break: break-all;
							overflow: hidden; 
							display: -webkit-box;
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
		justify-content: space-between;
		padding: 40rpx;
		
		.goods-content{
			width: 325rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			-moz-box-shadow:0px 0px 8rpx #cacaca; -webkit-box-shadow:0px 0px 8rpx #cacaca; box-shadow:0px 0px 8rpx #cacaca;
			
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
				padding-left: 20rpx;
				
				.goods-title,.goods-details{
					width: 275rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 32rpx;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					word-break: break-all;
					overflow: hidden; 
					display: -webkit-box;
				}
				
				.btnn{
					font-size: 22rpx;
					color: #c3c3c3;
				}
				
				.goods-bottom-content{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					position: relative;
					
					.goods-amount{
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						position: relative;
						bottom: 15rpx;
						
						.goods-amount-left{
							font-size: 32rpx;
							color: red;
						}
						
						.goods-amount-right{
							font-size: 24rpx;
							color: #c3c3c3;
						}
					}
					
					u-icon{
						position: absolute;
						top: 40rpx;
						left: 250rpx;
					}
					
					.subsidy-box{						
						width: 240rpx;
						background: #ffffff;
						display: -webkit-box;
						display: -webkit-flex;
						display: flex;
						-webkit-box-align: center;
						-webkit-align-items: center;
						align-items: center;

						
						.subsidy-box-left{
							font-size: 22rpx;
							color: red;
							width: 60rpx;
							height: 36rpx;
							background: #fff1e4;
							border: 1rpx solid #f88c8c;
							display: -webkit-box;
							display: -webkit-flex;
							display: flex;
							-webkit-box-pack: center;
							-webkit-justify-content: center;
							justify-content: center;
							-webkit-box-align: center;
							-webkit-align-items: center;
							align-items: center;
							border-top-left-radius: 5rpx;
							border-bottom-left-radius: 5rpx;
							border-right: 1px dashed #f88c8c;
						}
						
						.subsidy-box-right{
							width: 170rpx;
							height: 36rpx;
							font-size: 22rpx;
							color: #eb544d;
							background-color: #FFFFFF;
							border: 1rpx solid #f88c8c;
							display: -webkit-box;
							display: -webkit-flex;
							display: flex;
							-webkit-box-pack: center;
							-webkit-justify-content: center;
							justify-content: center;
							-webkit-box-align: center;
							-webkit-align-items: center;
							align-items: center;
							border-top-right-radius: 5rpx;
							border-bottom-right-radius: 5rpx;
							border-style: solid;
							border-left: 1rpx dashed #f88c8c;
						}
					}
				}
			}
		}
	}
}
</style>
