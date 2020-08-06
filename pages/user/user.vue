<template>
	<view class="main">
		<view class="top">
			<image class="background-img" src="../../static/image/background-image.png"></image>
			
			<view class="userInfo">			
				<view class="userInfo-content">
					<view class="userInfo-left">
						<view class="user-avatar">
							<image src="../../static/image/night.png"></image>
						</view>
						
						<view class="user-cont">
							<view class="user-name">哈哈哈</view>
							<view class="user-level">消费合伙人</view>
							<view class="invitation-code">
								<text>邀请码:12312332</text>
								<view class="invitation-button">复制</view>
							</view>
						</view>
					</view>
					
					<view class="userInfo-right">
						<view ></view>
					</view>
				</view>				
			</view>
			
			<view class="navigation-bar"></view> 
		</view>
		
			
		
		
		<!-- 反馈组件 -->
		<u-toast ref="uToast" />
		<u-popup v-model="show" mode="center" border-radius="14" >
			<view class="wxQRimg">
				<image class="qr-img" :src="WxappQR"></image>
			</view>
		</u-popup>	
	</view>
</template>

<script>
import {request} from "@/api/request.js"	
	export default {
		data() {
			return {
				userInfo:{},
				AccoutAmount:[],
				show:false,
				WxappQR:''
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods:{
			getUserInfo(){
				const userInfo = uni.getStorageSync("globalUser");
				if(!userInfo){
					uni.showModal({
						title:'您还没有登录哦',
						confirmText:'去登录',
						success:function(res){
							if(res.cancel)
							{
								return
							}
							else if(res.confirm)
							{
								uni.navigateTo({
									url:'./signIn'
								})
							}
						}
					})
				}
				else{
					this.userInfo = userInfo;
					this.getAccoutAmount()
				}
			},
			getAccoutAmount(){
				request('API_GetAccountAmount',{user_id:this.userInfo.user_id}).then(res=>{
					this.AccoutAmount = res
				})
			},
			getWxappQR(){
				uni.request({
					url:'https://api.xfgoo.com:60020/WxappService.asmx/API_GetWxappQR',
					data:{
						scene:this.userInfo.mobile,
						page:"pages/user/signUp"
					},
					method:'GET',
					header:{'content-type': 'application/x-www-form-urlencoded'},
				}).then(res=>{
					this.show = true
					
					let data = res[1].data
					this.WxappQR = data.result_content
				})
			},
			toUserAccout(AccoutType){
				const userInfo = uni.getStorageSync("globalUser");
				if(!userInfo){
					uni.showModal({
						title:'您还没有登录哦',
						confirmText:'去登录',
						success:function(res){
							if(res.cancel)
							{
								return
							}
							else if(res.confirm)
							{
								uni.navigateTo({
									url:'./signIn'
								})
							}
						}
					})
				}
				else{
					switch(AccoutType){
						case "Bonus":
							uni.navigateTo({
								url:`/pages/userAccout/Bonus?user_id=${this.userInfo.user_id}&accoutAmount=${this.AccoutAmount.BonusAmount}`,
							})
						break;
						case "Integral":
							uni.navigateTo({
								url:`/pages/userAccout/Integral?user_id=${this.userInfo.user_id}&accoutAmount=${this.AccoutAmount.IntegralAmount}`,
							})
						break;
						case "Recharge":
							uni.navigateTo({
								url:`/pages/userAccout/Recharge?user_id=${this.userInfo.user_id}&accoutAmount=${this.AccoutAmount.RechargeAmount}`,
							})
						break;
						case "Profit":
							uni.navigateTo({
								url:`/pages/userAccout/Profit?user_id=${this.userInfo.user_id}&accoutAmount=${this.AccoutAmount.ProfitAmount}`,
							})
						break;
						case "Credit":
							uni.navigateTo({
								url:`/pages/userAccout/Credit?user_id=${this.userInfo.user_id}&accoutAmount=${this.AccoutAmount.CreditAmount}`,
							})
						break;
					}
				}
			},
			toSetting(){
				uni.navigateTo({
					url:'../userSetting/setting'
				})
			},
			toRecharge(){
				uni.navigateTo({
					url:`/pages/transaction/Recharge?user_id=${this.userInfo.user_id}`
				})
			},
			toRecommend(){
				uni.navigateTo({
					url:`/pages/user/recommend?user_id=${this.userInfo.user_id}`
				})
			},
			toShopservice(){
				this.$refs.uToast.show({
					title: '小程序暂不开放此功能',
					type: 'warning '
				})
			}
		}
	}
</script>

<style lang="less" scoped>
page{
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
}	
.main{
	.top{
		width: 100%;	
		display: flex;
		flex-direction: column;
		align-items: center;
		.background-img{
			width: 100%;
			height: 400rpx;
		}
		.userInfo{
			width: 100%;
			height: 150rpx;
			position: relative;
			top: -270rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.userInfo-content{
				width: 710rpx;
				height: 150rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.userInfo-left{
					width: 470rpx;
					height: 150rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					
					.user-avatar{
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 120rpx;
							height: 120rpx;
						}
					}
					.user-cont{
						width: 350rpx;
						height: 150rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						
						.user-name{
							font-size: 36rpx;
							color: rgba(0, 0, 0, 1);
							font-family:PingFang SC;
							font-weight:600;
						}
						.user-level{
							font-size:24rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(77,77,77,1);
						}
						.invitation-code{
							width: 350rpx;
							height: 35rpx;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							text{
								width: 190rpx;
								font-size:24rpx;
								font-family:PingFang SC;
								font-weight:400;
								color:rgba(77,77,77,1);
							}
							.invitation-button{
								width:70rpx;
								height:30rpx;
								border:2rpx solid rgba(124,118,81,1);
								border-radius:10rpx;
								font-size:22rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								position: relative;
								left: 30rpx;
							}
						}
					}
				}
				
				.userInfo-right{
					width: 240rpx;
					height: 150rpx;
					background-color: #4CD964;
				}
			}
			
		}
		.navigation-bar{
			width: 100%;
			height: 50rpx;
			position: relative;
			top: -215rpx;
		}
	}
}	

	.wxQRimg{
		.qr-img{
			width: 450rpx;
			height: 450rpx;
		}
	}
</style>