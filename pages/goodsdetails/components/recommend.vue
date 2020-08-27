<template>
	<view class="main">
		<view class="middle">
			<view class="top-title">
				<p>推荐商品</p>
			</view>
			<view class="bottom-content">
				<view class="goods-cont" v-if="BusinessData.length>1" v-for="(item,index) in BusinessData" :key="index" @click="toGoodsDetails(item.id,item.BusinessID,item.CategoryID)">
					<image :src="item.BP_ImgUrl"></image>
					<view class="goods-data">
						<view class="goods-details">{{item.BP_Name}}</view>
						<view class="goods-price">￥{{item.BP_Amount}}</view>
					</view>
				</view>
				<view class="goods-cont" v-if="BusinessData.length == 2 || BusinessData.length == 5"></view>
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		props:['BusinessData',"LatItude" ,"LongItude"],
		data() {
			return {
				
			};
		},
		methods:{
			toGoodsDetails(id,BusinessID,CategoryID){
				uni.navigateTo({
					url:`/pages/goodsdetails/goodsdetails?id=${id}&BusinessID=${BusinessID}&CategoryID=${CategoryID}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
			}
		}
	}
</script>

<style lang="less">
.main{
	width: 100%;
	margin-top: 60rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.middle{
		width: 670rpx;
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
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: space-between;
			.goods-cont{
				width: 200rpx;
				height: 330rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				align-content: flex-start;
				
				
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
