<template>
	<view class="main">
		<view class="top-title">
			<view class="shoplist-name">
				<view class="title">全部商铺</view>
				<u-icon name="arrow-left" size="40" @click="back"></u-icon>
			</view>
			
			<view class="top-seek">
				<view class="seek-content" @click="toSeek()">
					<u-icon name="search" size="40"></u-icon>
					<view class="title">搜索店铺</view>
				</view>
			</view>
		</view>
		
		<view class="btt"></view>
		
		<view class="shop-list">
			<view class="content" v-for="(item,index) in ShopCategoryList" :key="index">
				<view class="left-img">
					<image :src="item.ImgUrl"></image>
				</view>
				
				<view class="right-shopdetails">
					<view class="shop-name">{{item.BusinessName}}</view>
					<view class="shop-type">{{item.T_Name}}</view>
					
					<view class="shop-location">
						<text class="left">{{item.Address}}</text>
						<text class="right">{{(item.Distance*1).toFixed(2)}}km</text>
					</view>
					
					<view class="shop-time">
						<text class="left">营业时间:{{item.BusinessTime}}</text>
						<text class="right btn">已售: {{item.OrderIsSell_Total}}</text>
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
				T_Name:'',
				LatItude:'',
				LongItude:'',
				Index:1,
				ShopCategoryList:[],
				loadStatus: 'loadmore'
			};
		},
		onLoad(e){
			this.T_Name = e.T_Name;
			this.LatItude = e.LatItude;
			this.LongItude = e.LongItude;
			
			this.getShopCategory()
		},
		onReachBottom() {
			if(this.ShopCategoryList.length<this.Index*10){
				this.loadStatus = 'nomore';
				return;
			}else{
				this.Index++;
				this.loadStatus = 'loading';
				// 模拟数据加载效果
				setTimeout(() => {
					this.getShopCategory();
					this.loadStatus = 'loadmore';
				}, 1000);
			}
		},
		methods:{
			getShopCategory(callBack)
			{
				request('API_GetList_BusinessSearch',{TradeID:0,Keywords:this.Keywords(),Longitude:this.LongItude,Latitude:this.LatItude,orderState:0,pageSize:10,index:this.Index}).then(res=>{
					
					if(res.length<10){
						this.loadStatus = 'nomore'
					}
					
					this.ShopCategoryList = [...this.ShopCategoryList,...res]
				
					callBack && callBack()
					
					if(this.ShopCategoryList.length==0)
					{
						uni.showToast({
							title:'暂无此店铺',
							icon:'none'
						})
					}
				})	
			},
			toSeek(){
				uni.navigateTo({
					url:`/pages/seek/seek?LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
			},
			back(){
				uni.navigateBack()
			},
			Keywords(){
				if(this.T_Name === "全部商铺"){
					return "";
				}else{
					return this.T_Name;
				}
			}
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
				margin-left: 10rpx;
				
				.shop-name{
					font-size: 30rpx;
					color: #000000;
				}
				
				.shop-type{
					width: 140rpx;
					height: 40rpx;
					font-size: 26rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 15rpx;
					background: linear-gradient(to right,#f9ac0f,#f39231);
					color: #FFFFFF;
				}
				
				.shop-location,.shop-time{
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 26rpx;
					color: #acacac;
					
					.btn{
						color: #ee1e1e;
						font-weight: bold;
					}
				}
			}
		}
	}
}
</style>
