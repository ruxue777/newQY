<template>
	<view class="main">
		<u-navbar  title="联系我们"></u-navbar>
		
		<view class="top-image">
			<image :src="ADdata[1].ADR_ImgUrl"></image>
		</view>
		
		<view class="middle">
			<view class="content">
				<view class="item">
					<text class="left-text">官方网站:</text>
					<view class="right-text">
						<text>www.xfgoo.com</text>
					</view>
				</view>
				<view class="item">
					<text class="left-text">QQ邮箱:</text>
					<view class="right-text">
						<text>824499057@QQ.com</text>
					</view>
				</view>
				<view class="item">
					<text class="left-text">经理电话:</text>
					<view class="right-text" >
						<text>15374361127</text>
						<u-icon name="phone" size="36" @click="call('15374361127')"></u-icon>
					</view>
				</view>
				<view class="item">
					<text class="left-text">客服电话:</text>
					<view class="right-text">
						<text>0797-8185000</text>
						<u-icon name="server-man" size="36" @click="call('0797-8185000')"></u-icon>
					</view>
				</view>
				<view class="item">
					<text class="left-text">公司地址:</text>
					<view class="right-text">
						<text>赣州市章贡区文清路80号</text>
						<u-icon name="map" size="36" @click="navigation()"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {request} from '@/api/request.js';
import {location} from '@/api/location.js'
import QQMap_SDK from '@/SDK/qqmap-wx-jssdk.min.js'
	export default {
		data() {
			return {
				ADdata:[]
			};
		},
		onLoad() {
			this.getimg()
		},
		methods:{
			getimg(){
				request('API_GetList_ADRecord_CallIndex',{CallIndex:'ad0009'}).then(res=>{
					this.ADdata = res
				})
			},
			call(phoneNumber){
				uni.makePhoneCall({
					phoneNumber: phoneNumber
				});
			},
			navigation(){
				let locationData = location(25.867740,114.946902)
				
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
						
						const addr = `${city}${district}江西立众天信息科技有限公司`;
						
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
	.top-image{
		width: 100%;
		height: 300rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		image{
			width: 400rpx;
			height: 400rpx;
		}
	}
	.middle{
		width: 100%;
		height: 450rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.content{
			width: 690rpx;
			height: 450rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-top: 1rpx solid #ebebeb;
			
			.item{
				width: 100%;
				height: 90rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				border-bottom: 1rpx solid #ebebeb;
				
				.left-text{
					width: 150rpx;
					height: 90rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
				
				.right-text{
					width: 450rpx;
					height: 90rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					u-icon{
						margin-right: -45rpx;
					}
				}
			}
		}
	}
}
</style>
