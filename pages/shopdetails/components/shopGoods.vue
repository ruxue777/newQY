<template>
	<view class="main">
		<view class="middle">	
			<scroll-view class='wrapper' scroll-x="true">
				<view class='horizontal-scroll' v-for="(item,index) in BusinessData" :key="index" @click="toGoodsDetails(item.id,item.BusinessID,item.CategoryID)">
					<image class="goods-img" :src="item.BP_ImgUrl"></image>
					<view class="goods-name">{{item.BP_Name}}</view>
					<view class="goods-price">￥{{item.BP_Amount}}</view>
				</view>
			</scroll-view>
		</view>		
	</view>
</template>

<script>
	export default {
		props:['BusinessData','LatItude','LongItude'],
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
	margin-top: 10rpx;
	border-top: 6rpx solid #dfdfdf;
	border-bottom: 6rpx solid #dfdfdf;
	.middle{
		width: 100%;
		height: 380rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		
		.wrapper {
		  width: 100%;
		  height: 360rpx;
		  white-space: nowrap;
		  display: flex;
		  background-color: #FFFFFF;
		}
		.horizontal-scroll {
			width: 300rpx;
			height: 360rpx;
			margin: 0 5rpx 0 5rpx;
			background-color: #FFFFFF;
			display: inline-block;
			text-align: center;
			
			image{
				width: 280rpx;
				height: 280rpx;
				border-radius: 15rpx;
			}
			.goods-name{
				width: 275rpx;
				height: 40rpx;
				overflow:hidden;
				white-space:nowrap;
				text-overflow:ellipsis;
			}
			.goods-price{
				width: 280rpx;
				height: 40rpx;
				color: red;
			}
		}
	}
}
</style>
