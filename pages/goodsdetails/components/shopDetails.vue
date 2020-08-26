<template>
	<view class="main">
		<view class="line"></view>
		<view class="middle">
			<view class="main-shop">
				<view class="left">
					<image :src="MerchantData.ImgUrl"></image>
					<p>{{MerchantData.BusinessName}}</p>
				</view>
				<view class="right" @click="toShopDetails(MerchantData.id)">
					进店逛逛 >
				</view>
			</view>
			<view class="write-off">
				<view class="top">
					<view class="shop-name">{{MerchantData.BusinessName}}</view>
					<view class="img">
						<image class="phone-img" src="../../../static/image/phone_1.png" @click="call(MerchantData.Phone)"></image>
						<image src="../../../static/image/navigation.png" @click="navigation(MerchantData.BusinessName,MerchantData.Latitude,MerchantData.Longitude)"></image>
					</view>
				</view>
				<view class="bottom">
					<view class="shop-time">
						<p>· {{MerchantData.BusinessTime}}</p>
					</view>
					<view class="shop-location">
						<p>· {{MerchantData.Address}}</p>
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
		props:['MerchantData',"LatItude" ,"LongItude"],
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
			//商铺详情页
			toShopDetails(id){
				uni.navigateTo({
					url:`/pages/shopdetails/shopdetails?BusinessID=${this.MerchantData.id}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
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
			}
		}
	}
</script>

<style lang="less">
.main{
	width: 100%;
	height: 300rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	.line{
		width: 100%;
		height: 10rpx;
		background-color: #f0f0f0;
	}
	.middle{
		width: 670rpx;
		height: 260rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.main-shop{
			width: 100%;
			height: 110rpx;
			border-bottom: 1rpx solid #f0f0f0;
			display: flex;
			justify-content: space-between;	
			align-items: center;
			
			.left{
				width: 500rpx;
				height: 100rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				image{
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
				}
			}
			.right{
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	
		.write-off{
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #f0f0f0;
			
			.top{
				width: 100%;
				height: 70rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.shop-name{
					width:300rpx;
					height:75rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(0,0,0,1);
				}
				.img{
					display: flex;
					justify-content: center;
					align-items: center;
					.phone-img{
						margin-right: 25rpx;
					}
					image{
						width: 46rpx;
						height: 46rpx;
					}
				}
			}
			.bottom{
				width: 100%;
				height: 85rpx;
				
				.shop-time,.shop-location{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			}
		}
	}
}
</style>
