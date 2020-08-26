<template>
	<view class="main">
		<view class="top-shop-img">
			<image :src="MerchantData.ImgUrl"></image>
			<u-icon name="arrow-leftward" size="46" @click="back"></u-icon>
		</view>
		
		<view class="bottom-shopdetails">
			<view class="shop-name">
				<text class="name">{{MerchantData.BusinessName}}</text>
				<text class="distance">{{(MerchantData.Distance * 1).toFixed(2)}}km</text>
			</view>
			
			<view class="shop-details">
				<view class="content">
					<view class="left">行业:</view>
					<view class="right">{{MerchantData.T_Name}}</view>
				</view>
				
				<view class="content">
					<view class="left">营业时间:</view>
					<view class="right">{{MerchantData.BusinessTime}}</view>
				</view>
				
				<view class="content">
					<view class="left">商家电话:</view>
					<view class="right">
						<text>{{MerchantData.Phone}}</text>
						<view class="call" @click="call(MerchantData.Phone)">拨打电话</view>
					</view>
				</view>
				
				<view class="content">
					<view class="left">商家地址:</view>
					<view class="right">
						<text>{{MerchantData.Address}}</text>
						<image src="../../../static/image/area.png" @click="navigation(MerchantData.BusinessName,MerchantData.Latitude,MerchantData.Longitude)"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {location} from '@/api/location.js'
import QQMap_SDK from '@/SDK/qqmap-wx-jssdk.min.js'	
	export default {
		props:['MerchantData'],
		data() {
			return {
				
			};
		},
		methods:{
			call(phoneNumber){
				uni.makePhoneCall({
					phoneNumber: phoneNumber
				});
			},
			navigation(name,Latitude,Longitude){
				let locationData = location(Latitude,Longitude)
				
				const QQMapWx = new QQMap_SDK({
					key:'FXCBZ-4H36W-FBDR5-O6E6O-KGQ27-MHB6U'
				})
				
				QQMapWx.reverseGeocoder({
					location: {
						latitude: locationData.lats,
						longitude: locationData.lngs
					},
					success:(res)=>{
						//市
						let city =res.result.address_component.city
						//区
						let district = res.result.address_component.district
						
						const addr = `${city}${district}${name}`;
						
						wx.getLocation({
							type: 'gcj02', //返回可以用于wx.openLocation的经纬度
							success: function (res) {
								wx.openLocation({
									latitude: locationData.lats,
									longitude: locationData.lngs,
									scale: 20,
									name: "当前位置", //打开后显示的地址名称
									address:addr
								})
							}
						})
					},
					fail: function(res) {
						uni.showToast({
							title: '定位失败',
							duration: 2000,
							icon: "none"
						})
					}
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
	.top-shop-img{
		width: 100%;
		height: 700rpx;
		position: relative;
		
		image{
			width: 100%;
			height: 700rpx;
		}
		
		u-icon{
			position: absolute;
			top: 65rpx;
			left: 50rpx;
		}
	}
	
	.bottom-shopdetails{
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.shop-name{
			width: 670rpx;
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid #dddddd;
			
			.name{
				font-size: 40rpx;
				letter-spacing:2rpx;
				font-weight: bold;
			}
			
			.distance{
				font-size: 28rpx;
				color: #999999;
			}
		}
		
		.shop-details{
			width: 670rpx;
			height: 240rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 20rpx;
			
			.content{
				width: 100%;
				height: 55rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.left{
					width: 150rpx;
					height: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-weight: 500;
					font-size: 32rpx;
				}
				.right{
					width: 520rpx;
					height: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					color: #999999;
					position: relative;
					left: 20rpx;
					font-size: 26rpx;
					
					.call{
						width: 120rpx;
						height: 40rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 15rpx;
						background-color: red;
						font-size: 24rpx;
						color: #FFFFFF;
						margin-left: 20rpx;
					}
					
					image{
						width: 30rpx;
						height: 30rpx;
						margin-left: 20rpx;
					}
				}
			}
		}
	}
}
</style>
