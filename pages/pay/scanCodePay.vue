<template>
	<view class="main">
		<view class="top-content">
			<image :src="shopDetails.ImgUrl"></image>
			<text>向 <text class="shop-name"> {{shopDetails.BusinessName}} </text> 付款</text>
		</view>
		
		<view class="middle-content">
			<view class="amount">
				￥<input  placeholder="0" v-model="price"/>
			</view>
		</view>
		
		<view class="bottom-content">
			<view class="button">
				<u-button type="error" shape="circle" ripple="true" ripple-bg-color="#bdbdbd" @click="Pay">确定</u-button>
			</view>			
		</view>
		
	<!-- 反馈组	 -->
	<u-toast ref="uToast" />
	<u-popup v-model="show" mode="bottom" border-radius="15" closeable="true" close-icon-pos="top-left">
		<view class="popup-content">
			<view class="top">
				<text class="top-title">付款详情</text>
				<text class="pay-amount">实付:￥<text class="btn">{{popup_Amount}}</text></text>
			</view>
			
			<view class="middle">
				<view class="subsidy">
					<view class="left-cont">
						<image src="../../static/image/coupon.png"></image>
						<text>{{DeductionTips}}</text>
						<view class="title">补贴抵扣</view>
					</view>
					<view class="right-cont">
						<u-switch v-model="deductionSwitch" size='40' active-color="#fa3534" :disabled="isDeduction"></u-switch>
					</view>
				</view>
				
				<view class="payment-method">
					<view class="payment-method-title">选择付款方式</view>
					<view class="payment-method-content">
						
						<view class="jt-account Selected" v-if="payment_Method === 0" >
							<view class="left">
								<image class="left-img-0" src="../../static/image/pop_moneyred.png"></image>
								<text>津贴账户</text>
							</view>
							<view class="right">
								<view class="account-amount">{{AccoutAmount.ProfitAmount}}</view>
								<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
							</view>
						</view>
						<view class="jt-account" v-else @click="select_Payment(0)">
							<view class="left">
								<image class="left-img-0" src="../../static/image/pop_money.png"></image>
								<text>津贴账户</text>
							</view>
							<view class="right">
								<view class="account-amount">{{AccoutAmount.ProfitAmount}}</view>
								<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
							</view>
						</view>
						
						
						<view class="bt-account Selected" v-if="payment_Method === 1">
							<view class="left">
								<image class="left-img-0" src="../../static/image/pop_homered.png"></image>
								<text>补贴账户</text>
							</view>
							<view class="right">
								<view class="account-amount">{{AccoutAmount.RechargeAmount}}</view>
								<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
							</view>								
						</view>
						<view class="bt-account" v-else @click="select_Payment(1)">
							<view class="left">
								<image class="left-img-0" src="../../static/image/pop_home.png"></image>
								<text>补贴账户</text>
							</view>
							<view class="right">
								<view class="account-amount">{{AccoutAmount.RechargeAmount}}</view>
								<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
							</view>								
						</view>
						
						
						<view class="wx-account Selected" v-if="payment_Method === 2">
							<view class="left">
								<image class="left-img-0" src="../../static/image/pop_wxred.png"></image>
								<text>微信支付</text>
							</view>
							<view class="right">
								<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
							</view>		
						</view>
						<view class="wx-account" v-else @click="select_Payment(2)">
							<view class="left">
								<image class="left-img-0" src="../../static/image/pop_wx.png"></image>
								<text>微信支付</text>
							</view>
							<view class="right">
								<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
							</view>		
						</view>
					</view>
				</view>
			</view>
			
			<view class="bottom">
				<view class="button" @click="Pay()">
					立即支付
				</view>
			</view>
		</view>
	</u-popup>
	<u-popup v-model="Pay_popup" mode="center" border-radius="15" closeable="true" close-icon-pos="top-left">
		<view class="cont">
			<text class="title">请输入支付密码</text>
			<input type="password" v-model="PayPwd"/>
			<text class="mini">忘记支付密码</text>
			<u-button shape="circle" size="medium" ripple="true"  type="warning" @click="virtual_Payment()">确认支付</u-button>
		</view>
	</u-popup>
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		data() {
			return {
				price:'',
				//商铺详情
				shopDetails:[],				
				//支付弹窗
				show:false,
				//弹窗金额
				popup_Amount:0.00,
				//支付方式
				payment_Method:4
			};
		},
		onLoad(e) {
			this.BusinessID = e.BusinessID
			this.getShopDetails()
		},
		methods:{
			Pay(){
				this.popup_Amount = this.price;
				this.show = true
				
			},
			getShopDetails(){
				request('API_GetInfo_BusinessSearch',{BusinessID:this.BusinessID,Longitude:'',Latitude:''}).then(res=>{
					this.shopDetails = res
				})
			},
			//选择支付方式
			select_Payment(e){
				this.payment_Method = e
			},
		}
	}
</script>

<style lang="less">
.main{
	.top-content{
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		image{
			width: 150rpx;
			height: 150rpx;
			border-radius: 15rpx;
		}
		text{
			margin-top: 25rpx;
			font-size: 34rpx;
			.shop-name{
				color: #2979FF;
			}
		}
	}
	
	.middle-content{
		width: 100%;
		height: 260rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		
		.amount{
			width: 640rpx;
			height: 60rpx;
			border-bottom: 5rpx solid #cbcbcb;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 50rpx;
			
			input{
				position: relative;
				left: 20rpx;
			}
		}
	}
	
	.bottom-content{
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.button{
			width: 640rpx;
			height: 70rpx;
		}
	}

	.popup-content{
		width: 100%;
		height: 1000rpx;
		background-color: #fff;
		
		.top{
			width: 100%;
			height: 210rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			
			.top-title{
				font-size:36rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(0,0,0,1);
			}
			
			.pay-amount{
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(0,0,0,1);
				
				.btn{
					font-size:50rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(0,0,0,1);
				}
			}
		}
		
		.middle{
			width: 100%;
			height: 580rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius:20px;
			-moz-box-shadow:0px 0px 10px #e1e1e1; -webkit-box-shadow:0px 0px 10px #e1e1e1; box-shadow:0px 0px 10px #e1e1e1;
			
			.subsidy{
				width: 670rpx;
				height: 80rpx;
				border-bottom: 4rpx solid rgba(250, 250, 250, 1);
				display: flex;
				justify-content: center;
				align-items: center;
				
				.left-cont{
					width: 520rpx;
					height: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					image{
						width: 40rpx;
						height: 30rpx;
					}
					
					text{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:300;
						color:rgba(255,48,0,1);
						line-height:46rpx;
					}
					
					.title{
						width:90rpx;
						height:25rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background:rgba(255,104,104,1);
						border-radius:5rpx 5rpx 5rpx 0rpx;						
						font-size:20rpx;
						font-family:Adobe Heiti Std;
						font-weight:normal;
						color:rgba(255,255,255,1);
						line-height:40rpx;
					}
				}
				
				.right-cont{
					width: 150rpx;
					height: 100%;
					display: flex;
					justify-content: flex-end;
					align-items: center;
				}
			}
			
			.payment-method{
				width: 670rpx;
				height: 500rpx;
				
				.payment-method-title{
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					font-size:30rpx;
					font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
					font-weight:500;
					color:rgba(51,51,51,1);
				}
				
				.payment-method-content{
					width: 100%;
					height: 420rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					image{
						width: 40rpx;
						height: 40rpx;
					}
					
					.jt-account,.bt-account,.wx-account{
						width:670rpx;
						height:80rpx;
						border:3rpx solid rgba(225,225,225,1);
						border-radius:40rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						
						.left{
							width: 215rpx;
							height: 40rpx;
							display: flex;
							justify-content: space-around;
							align-items: center;
							border-right: 2rpx solid #efefef;
						}
						
						.right{
							width: 360rpx;
							height: 50rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							position: relative;
							
							.account-amount{
								position: absolute;
								left: 20rpx;
								font-size:26rpx;
								font-family:PingFang SC;
								font-weight:400;
								color:rgba(102,102,102,1);
								line-height:40rpx;
							}
							
							.btn{
								position: absolute;
								right: 0;
							}
						}
					}
			
					.Selected{
						border:3rpx solid rgba(255, 48, 0, 1);
						color:rgba(255, 48, 0, 1);
					}
				}
			}
		}
		
		.bottom{
			width: 100%;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.button{
				width: 670rpx;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background:rgba(255,229,14,1);
				border-radius:40rpx;
				font-size:36rpx;
				font-family:PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
			}
		}
	}
	.cont{
		width: 500rpx;
		height: 500rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.title{
			width: 480rpx;
			height: 120rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			font-weight: bold;
		}
		input{
			width: 380rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1rpx solid #999999;
			font-size: 30rpx;
		}
		.mini{
			width: 480rpx;
			height: 120rpx;
			font-size: 24rpx;
			color: red;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
