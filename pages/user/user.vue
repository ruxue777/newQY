<template>
	<view>
		<view class="back-img">
			<image class="cont-img" src="/static/image/background-image.png"></image>
		</view>
		
		<view class="avatar">
			<u-avatar :src="userInfo.WM_headimgurl" mode="circle" size="150"></u-avatar>
			<image class="grade-img" src="../../static/image/grade.png"></image>
			<text class="grade-cont">{{userInfo.Grade}}</text>
		</view>
		<view class="user-activity">
			<view >
				<view class="cont">
					<image class="cont-img" src="../../static/image/shopService.png"></image>
					<text class="cont-title">商家服务</text>
				</view>
				<view class="cont">
					<image class="cont-img" src="../../static/image/withdrawal.png"></image>
					<text class="cont-title">提现申请</text>
				</view>
				<view class="cont">
					<image class="cont-img" src="../../static/image/myPartner.png"></image>
					<text class="cont-title">我的推荐</text>
				</view>
				<view class="cont">
					<image class="cont-img" src="../../static/image/myQRcode.png"></image>
					<text class="cont-title">推荐码</text>
				</view>
			</view>
		</view>
		
		<view class="wrap">
			<u-row gutter="16">
				<u-col span="4">
					<view class="demo-layout bg-color0" @click="toUserAccout('Bonus')">
						<view class="cont">
							<view class="account-name" >津贴权益</view>
							<view class="account-amount">{{AccoutAmount.BonusAmount}}</view>
						</view>
					</view>
				</u-col>
				<u-col span="4">
					<view class="demo-layout bg-color1" @click="toUserAccout('Integral')">
						<view class="cont">
							<view class="account-name">补贴账户</view>
							<view class="account-amount">{{AccoutAmount.IntegralAmount}}</view>
						</view>
					</view>
				</u-col>
				<u-col span="4">
					<view class="demo-layout bg-color2">
						<view class="cont">
							<view class="account-name">消费账户</view>
							<view class="account-amount">{{AccoutAmount.RechargeAmount}}</view>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="wrap">
			
			<u-row gutter="16" >
				<u-col span="4">
					<view class="demo-layout bg-color3">
						<view class="cont">
							<view class="account-name">余额</view>
							<view class="account-amount">{{AccoutAmount.ProfitAmount}}</view>
						</view>	
					</view>
				</u-col>
				<u-col span="4">
					<view class="demo-layout bg-color4">
						<view class="cont">
							<view class="account-name">商家账户</view>
							<view class="account-amount">{{AccoutAmount.CreditAmount}}</view>
						</view>	
					</view>
				</u-col>
				<u-col span="4"></u-col>
				
			</u-row>
		</view>
		
		<view class="bottom">		
			<!-- <u-row gutter="12">
				<u-col span="2">
					<view class="demo-layout1 ">
						<image src="../../static/image/amount.png"></image>
					</view>
				</u-col>
				<u-col span="8">
					<view class="demo-layout ">
						账户说明
					</view>
					<u-line color="#e4e7ed" />
				</u-col>
				
				<u-col span="2">
					<view class="demo-layout ">
						<u-icon name="arrow-right" size="36"></u-icon>
					</view>
				</u-col>
			</u-row> -->
			
			<u-row gutter="12">
				<u-col span="2">
					<view class="demo-layout1 ">
						<image src="../../static/image/lotter.png"></image>
					</view>
				</u-col>
				<u-col span="8">
					<view class="demo-layout ">
						我的奖券
					</view>
					<u-line color="#e4e7ed" />
				</u-col>
				
				<u-col span="2">
					<view class="demo-layout ">
						<u-icon name="arrow-right" size="36"></u-icon>
					</view>
				</u-col>
			</u-row>
			
			<u-row gutter="12">
				<u-col span="2">
					<view class="demo-layout1 ">
						<image src="../../static/image/bill.png"></image>
					</view>
				</u-col>
				<u-col span="8">
					<view class="demo-layout ">
						我的账单
					</view>
					<u-line color="#e4e7ed" />
				</u-col>
				
				<u-col span="2">
					<view class="demo-layout ">
						<u-icon name="arrow-right" size="36"></u-icon>
					</view>
				</u-col>
			</u-row>
			
			<u-row gutter="12">
				<u-col span="2">
					<view class="demo-layout1 ">
						<image src="../../static/image/project.png"></image>
					</view>
				</u-col>
				<u-col span="8">
					<view class="demo-layout ">
						我的项目
					</view>
					<u-line color="#e4e7ed" />
				</u-col>
				
				<u-col span="2">
					<view class="demo-layout ">
						<u-icon name="arrow-right" size="36"></u-icon>
					</view>
				</u-col>
			</u-row>
			
			<u-row gutter="12" >
				<u-col span="2">
					<view class="demo-layout1 ">
						<image src="../../static/image/setting.png"></image>
					</view>
				</u-col>
				<u-col span="8" @click="toSetting">
					<view class="demo-layout ">
						设置
					</view>
					<u-line color="#e4e7ed" />
				</u-col>
				
				<u-col span="2">
					<view class="demo-layout ">
						<u-icon name="arrow-right" size="36"></u-icon>
					</view>
				</u-col>
			</u-row>
		</view>
		
	</view>
</template>

<script>
import {request} from "@/api/request.js"	
	export default {
		data() {
			return {
				userInfo:{},
				AccoutAmount:[]
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
					}
				}
			},
			toSetting(){
				uni.navigateTo({
					url:'../userSetting/setting'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.back-img{
		width: 100%;
		height: 450rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.cont-img{
			width: 100%;
			height: 450rpx;
		}
	}
	
	.avatar{
		
		width: 100%;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 160rpx;
		
		.grade-img{
			width: 240rpx;
			height: 50x;
			position: relative;
			top: -20rpx;
		}
		.grade-cont{
			position: absolute;
			top: 136rpx;
			color: #F1F1F1;
		}
		
	}
	
	.user-activity{
		width: 100%;
		height: 180rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -15rpx;
		
		view{
			width: 710rpx;
			height: 185rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			.cont{
				width: 150rpx;
				height: 160rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.cont-img{
					width: 85rpx;
					height: 85rpx;
				}
				.cont-title{
					margin-top: -20rpx;
				}
			}
		}
	}

	.wrap {
			padding: 15rpx;
		}
	
		.u-row {
			margin: 40rpx 0;
			background-color: #FFFFFF;
		}
	
		.demo-layout {
			height: 110rpx;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			font-size: 30rpx;
			
			.cont{
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
				left: 20rpx;
				top: 5rpx;
				.account-name{
					width: 180rpx;
					height: 50rpx;
					color: #FFFFFF;
					font-size: 28rpx;
					font-weight: bold;
					margin-bottom: -10rpx;
				}
				
				.account-amount{
					width: 180rpx;
					height: 50rpx;
					color: #FFFFFF;
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}
	
		.bg-color0{
			background-image: linear-gradient(to right, #6CACFF,#8DEBFF );
		}
		.bg-color1{
			background-image: linear-gradient(to right, #A16BFE,#DEB0DF );
		}
		.bg-color3{
			background-image: linear-gradient(to right, #f35670,#ff80a5 );
		}
		.bg-color2{
			background-image: linear-gradient(to right, #ff4a46,#ff7562 );
		}
		.bg-color4{
			background-image: linear-gradient(to right, #5583EE,#41D8DD );
		}
		
	.bottom{
		padding: 15rpx;
	}	
	.demo-layout1{
		width: 110rpx;
		height: 110rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 50rpx;
			height: 50rpx;
		}
	}
.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}
</style>