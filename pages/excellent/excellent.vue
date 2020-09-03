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
					<view class="shop">店铺</view>
					<view class="goods">商品</view>
				</view>
			</view>
			<view class="select-box-bottom">
				<view class="default">默认排序</view>
				<view class="sales">销量最高</view>
				<view class="distance">距离最近</view>
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
	.top-title{
		
	}
	
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
			}
		}
		
		.select-box-bottom{
			width: 100%;
			height: 65rpx;
			display: flex;
			align-items: center;
			
			.default,.sales,.distance{
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
}
</style>
