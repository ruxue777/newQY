<template>
	<view class="main">
		<view class="top-title">
			<view class="shoplist-name">
				<view class="title">领取核销</view>
				<u-icon name="arrow-left" color="#ffffff" size="40" @click="back"></u-icon>
			</view>
		</view>
		
		<view class="middle">
			<view class="content">
				<view class="orderdetails">
					<text class="left">赠品品名</text>
					<view class="right">{{OrderDetails.BPD_Name}}</view> 
				</view>
				<view class="orderdetails">
					<text class="left">剩余可领取数量</text>
					<view class="right">{{parseInt(OrderDetails.BPRD_ValidCount)}}</view> 
				</view>
				<view class="orderdetails">
					<text class="left">领取最大数量</text>
					<view class="right">{{parseInt(OrderDetails.BPD_PerCount)}}/月</view> 
				</view>
				<view class="orderdetails">
					<text class="left">本次领取数量</text>
					<view class="right">{{parseInt(OrderDetails.BPRDL_OrderCount)}}</view> 
				</view>
				<view class="orderdetails">
					<text class="left">领取时间</text>
					<view class="right">{{OrderDetails.BPRDL_Time}}</view> 
				</view>
				<view class="orderdetails">
					<text class="left">商家名称</text>
					<view class="right">{{OrderDetails.BusinessName}}</view> 
				</view>
				<view class="orderdetails">
					<text class="left">商家地址</text>
					<view class="right">{{OrderDetails.Address}}</view> 
				</view>
				<view class="orderdetails" @click="call(OrderDetails.Phone)">
					<text class="left">商家电话</text>
					<view class="right">
						{{OrderDetails.Phone}}
						<u-icon name="phone-fill" style="margin-left: 10rpx;"></u-icon>
					</view> 
				</view>
				<view class="orderdetails">
					<text class="left">商家营业时间</text>
					<view class="right">{{OrderDetails.BusinessTime}}</view> 
				</view>
			</view>
		</view>
	
		<view class="bottom" @click="popup = true">出示核销二维码</view>
			
		
	<!-- 反馈组件 -->
	<u-popup v-model="popup" mode="bottom" border-radius="20">
		<view class="popup-cont">
			<view class="popup-top">出示核销二维码</view>
			<image :src="QrCode"></image>
		</view>
	</u-popup>
	</view>
</template>

<script>
import {request} from '@/api/request.js';
//二维码生成组件
import Qr from '@/SDK/wxqrcode.js';		
	export default {
		data() {
			return {
				//预约订单id
				orderId:'',
				//订单详情
				OrderDetails:[],
				//核销二维码弹窗
				popup:false,
				//核销二维码
				QrCode:''
			};
		},
		onLoad(e) {
			this.orderId = e.orderId
			
			this.getOrderDetails()
		},
		methods:{
			getOrderDetails(){
				request('API_GetInfo_BusinessProductRecordDetailLogs',{ID:this.orderId}).then(res=>{
					this.OrderDetails = res
					this.QrCode = Qr.createQrCodeImg(`${res.id},RecordDetailLogs`)
				})
			},
			call(phoneNumber){
				uni.makePhoneCall({
					phoneNumber: phoneNumber
				});
			},
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
.main{
	.top-title{
		width: 100%;
		height: 140rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.shoplist-name{
			width: 100%;
			height: 140rpx;
			background-color: #2b85e4;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			
			.title{
				color: #FFFFFF;
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
	}
	
	.middle{
		width: 100%;
		height: 900rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.content{
			width: 690rpx;
			height: 900rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			.orderdetails{
				width: 100%;
				height: 100rpx;
				border-bottom: 1rpx solid #dddddd;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				
				.right{
					width: 300rpx;
					height: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}	
		}
	}
	
	.bottom{
		width: 100%;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
		position: fixed;
		bottom: 0;
		color: #FFFFFF;
		background-color: #2b85e4;
		font-weight: bold;
		letter-spacing: 1rpx;
	}

	.popup-cont{
		width: 100%;
		height: 1000rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		
		.popup-top{
			width: 100%;
			height: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
			background-color: #2b85e4;
			position: absolute;
			top: 0;
		}
		
		image{
			width: 450rpx;
			height: 450rpx;
		}
	}
}
</style>
