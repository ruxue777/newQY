<template>
	<view class="wrap">
		
		<view class="demo-layout box-display">
			<image class="location-img" src="../../../static/image/location.png"></image>
			<view class="location-text">{{LocationData}}
				<image class="right-img" src="../../../static/image/small_rigth_pointer.png"></image>
			</view>
		</view>
		
		<u-row gutter="12">
			<u-col span="12" >
				<view class="seek">
					<view class="left" @click="scanCode()">
						<u-icon name="scan" size="48"></u-icon>
					</view>
					
					<view class="right" @click="to_Search()">
						<view class="middle">
							<image class="search-img" src="../../../static/image/search.png"></image>
							<p class="search-text">幸福山庄养生</p>
						</view>
					</view>
				</view>
			</u-col>
		</u-row>			 
	
	<!-- 反馈组件 -->
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
						<image src="../../../static/image/coupon.png"></image>
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
						
						<view class="wx-account Selected" v-if="payment_Method === 2">
							<view class="left">
								<image class="left-img-0" src="../../../static/image/pop_wxred.png"></image>
								<text>微信支付</text>
							</view>
							<view class="right">
								<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
							</view>		
						</view>
						<view class="wx-account" v-else @click="select_Payment(2)">
							<view class="left">
								<image class="left-img-0" src="../../../static/image/pop_wx.png"></image>
								<text>微信支付</text>
							</view>
							<view class="right">
								<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
							</view>		
						</view>
						
						<view class="jt-account Selected" v-if="payment_Method === 0" >
							<view class="left">
								<image class="left-img-0" src="../../../static/image/pop_moneyred.png"></image>
								<text>津贴账户</text>
							</view>
							<view class="right">
								<view class="account-amount">{{AccoutAmount.ProfitAmount}}</view>
								<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
							</view>
						</view>
						<view class="jt-account" v-else @click="select_Payment(0)">
							<view class="left">
								<image class="left-img-0" src="../../../static/image/pop_money.png"></image>
								<text>津贴账户</text>
							</view>
							<view class="right">
								<view class="account-amount">{{AccoutAmount.ProfitAmount}}</view>
								<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
							</view>
						</view>
											
						<view class="bt-account Selected" v-if="payment_Method === 1">
							<view class="left">
								<image class="left-img-0" src="../../../static/image/pop_homered.png"></image>
								<text>补贴账户</text>
							</view>
							<view class="right">
								<view class="account-amount">{{AccoutAmount.RechargeAmount}}</view>
								<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
							</view>								
						</view>
						<view class="bt-account" v-else @click="select_Payment(1)">
							<view class="left">
								<image class="left-img-0" src="../../../static/image/pop_home.png"></image>
								<text>补贴账户</text>
							</view>
							<view class="right">
								<view class="account-amount">{{AccoutAmount.RechargeAmount}}</view>
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
			<u-button shape="circle" size="medium" ripple="true" :loading="loading" type="warning" @click="virtual_Payment()">确认支付</u-button>
		</view>
	</u-popup>
	</view>
</template>

<script>
import {request,wxRequest,payment} from '@/api/request.js';
import md5Libs from "uview-ui/libs/function/md5";
	export default {
		props:['LocationData','LatItude','LongItude'],
		data() {
			return {
				//支付弹窗
				show:false,
				//支付方式
				payment_Method:4,
				//账户金额
				AccoutAmount:[],
				//订单详情
				orderDetails:[],
				//抵扣开关
				deductionSwitch:true,
				//抵扣禁用开关
				isDeduction:false,
				//支付金额
				popup_Amount:'',
				//抵扣提示
				DeductionTips:'',
				//虚拟银行支付账户类别
				AmountType:'',
				//账户中文名称
				AmountTypeCh:'',
				//密码弹窗
				Pay_popup:false,
				//虚拟银行密码
				PayPwd:'',
				loading:false
			}
		},
		watch:{
			deductionSwitch(val){
				if(val == false){
					this.DeductionTips = '不使用或不支持抵扣'
					
				 	this.popup_Amount =  this.orderDetails.CR_AppAmount
				}else{
					
					this.DeductionTips = `补贴账户已抵扣￥${this.orderDetails.CR_OffsetAmount}`;
					
					this.popup_Amount = (this.orderDetails.CR_AppAmount - this.orderDetails.CR_OffsetAmount).toFixed(2)
				}
			}	
		},
		methods: {
			Pay(){
				if(this.payment_Method !== 4){				
					switch(this.payment_Method){
						case 0:
							this.AmountType = 'Profit';
							this.AmountTypeCh = '津贴账户'
							this.Pay_popup = true
						break;
						case 1:
							this.AmountType = 'Recharge';
							this.AmountTypeCh = '补贴账户'
							this.Pay_popup = true
						break;
						case 2:
							this.wx_Payment(this.orderDetails.OrderId);
						break;
					} 				 
				}else{
					this.$refs.uToast.show({
						title: `请选择支付方式~`,
						type: 'warning',
					})
					return;
				}
			},
			//扫码方法
			scanCode(){
				const userInfo = uni.getStorageSync("globalUser");
				if(!userInfo){
					this.$refs.uToast.show({
						title: `当前未登录哦~`,
						type: 'warning',
					})
					return;
				}
				else{
					this.userInfo = userInfo;
					this.getAccoutAmount()
					
					uni.scanCode({
						success: (res) => {
				
							let Title = res.result.replace(/[^a-zA-Z]/g,'')
							
							let Int = res.result.replace(/[^\d]/g,'')
							
							if(Title == "FixedCashier"){
								uni.navigateTo({
									url:`/pages/pay/scanCodePay?BusinessID=${Int}&user_id=${this.userInfo.user_id}`
								})
							}
							else if(Title == "TempCashier")
							{								
								this.getOrderDetails(Int)
								this.show = true;
							}
							else{
								uni.showToast({
									title:'暂不支持识别外部二维码',
									icon:'none' 
								})
								return
							}
						 }
					})
				}
			},
			async getOrderDetails(OrderId){
				await request('API_AddCashierRecord_Step2_V2',{user_id:this.userInfo.user_id,OrderId:OrderId}).then(res=>{
					
					this.orderDetails = res 
					
					if(res.CR_OffsetAmount == 0){
						this.isDeduction = true;
						this.DeductionTips = '不使用或不支持抵扣';
						
						this.popup_Amount = (res.CR_AppAmount * 1).toFixed(2)
						this.show = true
					}else{
						this.DeductionTips = `补贴账户已抵扣￥${res.CR_OffsetAmount}`;
						
						this.popup_Amount = (res.CR_AppAmount - res.CR_OffsetAmount).toFixed(2)
						this.show = true
					}						
				})
			},
			//虚拟银行支付
			virtual_Payment(){
				if(this.PayPwd != '' && this.PayPwd.length != 0){
					
					this.loading = true
					
					payment('API_Payment_CashierQRCode_V2_Json',{OrderId:this.orderDetails.OrderId,AmountType:this.AmountType,PayPwd:this.PayPwd,IsOffset:this.isDeductions()}).then(res=>{
						if(res.result_code === 'SUCCESS'){
							this.$refs.uToast.show({
								title: `支付成功`,
								type: 'success',
								url:`/pages/pay/paySuccess?AmountType=${this.AmountTypeCh}&Amount=${this.popup_Amount}&orderId=${this.orderDetails.OrderId}&BusinessName=商家账户`
							})
							this.loading = false
							return;
						}
						else
						{
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'error'
							})
							this.loading = false
							return;
						}
					})
				}else{
					this.$refs.uToast.show({
						title: `请输入支付密码`,
						type: 'error',
					})
					return;
				}
			},
			wx_Payment(OrderId){
				uni.login({
					success:(e=>{
						let code = e.code
						wxRequest('API_GetOpenid',{code:code}).then(result=>{
							wxRequest('API_GetWxpayTradeInfo_CashierQRPayment_V2_Json',{OrderId:OrderId,openid:result.openid,IsOffset:this.isDeductions()}).then(pay=>{
								let obj = JSON.parse(pay.RequestStr);
								const {appId,timeStamp,nonceStr,paySign} = obj
								const Zpackage = obj.package
								
								let md5Data = md5Libs.md5(`appId=${appId}&nonceStr=${nonceStr}&package=${Zpackage}&signType=MD5
									&timeStamp=${timeStamp}&key=78fe4b2343ec3cc7fa3a46e858e5e7bf`).toUpperCase();
								uni.requestPayment({
									provider:'wxpay',
									timeStamp:timeStamp,
									nonceStr:nonceStr,
									package:Zpackage,
									signType:'MD5',
									paySign:paySign,
									success:(success) => {
										this.$refs.uToast.show({
											title:'支付成功',
											type: 'success',
											url:`/pages/pay/paySuccess?AmountType=${this.AmountTypeCh}&Amount=${this.popup_Amount}&orderId=${this.orderDetails.OrderId}&BusinessName=商家账户`
										})
										this.page_Init()
										return;
									},
									fail:(err) => {
										this.$refs.uToast.show({
											title:'支付失败',
											type: 'error'
										})
										return;
									}
								})
							})
						})
					}) 
				})
			},
			isDeductions(){
				if(this.deductionSwitch == true && this.isDeduction == false){
					return 1;
				}else{
					return 0;
				}
			},
			//获得账户金额
			getAccoutAmount(){
				request('API_GetAccountAmount',{user_id:this.userInfo.user_id}).then(res=>{
					this.AccoutAmount = res
				})
			},
			//选择支付方式
			select_Payment(e){
				this.payment_Method = e
			},
			to_Search(){
				uni.navigateTo({
					url:`/pages/seek/seek?LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
			},
			page_Init(){
				this.show = false;
				this.Pay_popup = false;
				this.orderDetails = [];
				this.PayPwd = '';
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap {
	padding: 55rpx 20rpx 10rpx 20rpx;
	background-color: #FAE64F;
	width: 100%;
	height: 355rpx;
	margin-bottom: -120rpx;
}

.demo-layout {
	height: 55rpx;
	border-radius: 8rpx;
}
.right-img{
	height: 17rpx;
	width: 11rpx;
	margin-left: 20rpx;
}
.seek{
	height: 70rpx;
	width: 710rpx;
	border-radius: 10rpx;
	background:rgba(255,255,255,1);
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	top: 25rpx;
	
	.left{
		width: 70rpx;
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.right{
		height: 70rpx;
		width: 620rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.middle{
			position: relative;
			left: -25rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.search-img{
				width: 36rpx;
				height: 36rpx;
				margin-right: 5rpx;
			}	
			.search-text{
				font-size:28rpx;
				color:rgba(153,153,153,1);
			}
		}
	}
}
.box-display{
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.location-img{
	width: 28rpx;
	height: 34rpx;
}
.location-text{
	width: 560rpx;
	height: 45rpx;
	font-size:36rpx;
	font-weight: bold;
	margin-left: 12rpx;
	margin-top: -5rpx;
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
	background-color: #FFFFFF;
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
</style>
