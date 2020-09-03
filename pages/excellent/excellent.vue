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
		
		<view class="shopList">
			<view class="shopList-middle">
				<view class="shopList-middle-left">
					<image src="../../static/image/img2.jpg"></image>
				</view>
				<view class="shopList-middle-right">
					
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
			justify-content: center;
			align-items: center;
			
			.shopList-middle-left{
				image{
					width: 150rpx;
					height: 150rpx;
				}
			}
			
			.shopList-middle-right{
				width: 560rpx;
			}
		}
	}
}
</style>
