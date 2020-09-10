<template>
	<view class="main">
		<u-navbar title="会员转账"></u-navbar>
	
		<view class="top">
			<view class="title">
				<text>转账可用额度</text>
			</view>
			
			<view class="middle">			
				<view class="allowance">
					<view class="accout-name">
						<u-icon name="rmb-circle" size="42"></u-icon>
						<text class="name">津贴账户</text>
					</view>
					
					<view class="accout-amount">
						<text>￥{{AccoutAmount.ProfitAmount}}</text>
					</view>
				</view>
				
				<view class="subsidy">
					<view class="accout-name">
						<u-icon name="rmb-circle-fill" size="42"></u-icon>
						<text class="name">补贴账户</text>
					</view>
					
					<view class="accout-amount">
						<text>￥{{AccoutAmount.RechargeAmount}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="tips">
			<text class="tips-cont">转账为个人行为,请核对对方真实姓名与账号,避免造成财产损失</text>
		</view>
		
		<view class="input-box">
			<view class="cont">
				<input placeholder="请输入转账金额" v-model="amount"/>
			</view>
			
			<view class="cont">
				<input placeholder="对方账户(用户名或手机号)" v-model="from_user_id"/>
			</view>
			
			<view class="cont">
				<view class="middle"  @click="show = true">
					<view class="title">充值账户类别:</view>
					<text class="sort">{{default_0}}</text>
				</view>
			</view>
		</view>
		
		<view class="button">
			<view class="cont">
				<u-button type="primary" ripple="true" @click="Transfer">下一步</u-button>
			</view>
		</view>
		
	<!-- 反馈组件 -->
	<u-toast ref="uToast" />
	<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
	<u-popup v-model="popup" mode="center" border-radius="15" closeable="true" close-icon-pos="top-left">
		<view class="cont">
			<text class="title">请输入支付密码</text>
			<input type="password" v-model="Psd"/>
			<text class="mini">忘记支付密码</text>
			<u-button shape="circle" size="medium" ripple="true"  type="warning" @click="Pay">确认支付</u-button>
		</view>
	</u-popup>
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		data() {
			return {
				user_id:'',
				AccoutAmount:[],
				amount:'',
				from_user_id:'',
				Psd:'',
				list: [
					{
						value: 'Profit',
						label: '津贴账户'
					},
					{
						value: 'Recharge', 
						label: '补贴账户'
					}
				],
				show: false,
				popup:false,
				default_0:'点击选择充值的账户',
				AmountType:''
			};
		},
		onLoad(e){
			this.user_id = e.user_id
			this.getAccoutAmount()
		},
		methods:{
			getAccoutAmount(){
				request('API_GetAccountAmount',{user_id:this.user_id}).then(res=>{
					this.AccoutAmount = res
				})
			},
			Transfer(){
				if(this.amount != '' && this.from_user_id != '' && this.AmountType!= '' ){
					this.popup = true
				}
				else{
					this.$refs.uToast.show({
						title: "请完善信息",
						type: 'error'
					})
				}
			},
			getRequestUrl(AmountType){
				
				if(AmountType === "Recharge")
				{
					return "API_AddRechargeByRecharge"
				}
				else if(AmountType === "Profit")
				{
					return "API_AddRechargeByProfit"
				}
			},
			Pay(){
				if(this.Psd != '' && this.Psd.length !=0){
					
					request(this.getRequestUrl(this.AmountType),{from_user_id:this.user_id,PayPwd:this.Psd,
						Amount:this.amount,to_user_name:this.from_user_id}).then(res=>{
						
							if(res.result_code === "SUCCESS"){
								this.$refs.uToast.show({
									title: res.result_content,
									type: 'success'
								})
								this.getAccoutAmount()
								this.popup = false;
								this.Psd = ''
							}else{
								this.$refs.uToast.show({
									title: res.result_content,
									type: 'error'
								})
							}
						})
				}
				else{
					this.$refs.uToast.show({
						title: '请输入密码',
						type: 'error'
					})
				}
			},
			confirm(e){
				this.default_0 = JSON.parse(JSON.stringify(e))[0].label
				this.AmountType = JSON.parse(JSON.stringify(e))[0].value
			}
		}
	}
</script>

<style lang="less">
.main{
	.top{
		width: 100%;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.title{
			width: 100%;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			border-bottom: 1rpx solid #f5f5f5;
			text{
				position: relative;
				left: 30rpx;
				font-size: 26rpx;
			}
		}
		.middle{
			width: 100%;
			height: 150rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.allowance,.subsidy{
				width: 375rpx;
				height: 100%;
				.accout-name{
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					top: 30rpx;
					
					.name{
						font-size: 30rpx;
						position: relative;
						left: 10rpx;
					}
				}
				.accout-amount{
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					
					text{
						font-size: 38rpx;
					}
				}
			}
		}
	}
	
	.tips{
		width: 100%;
		height: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.tips-cont{
			font-size: 24rpx;
			color: #cccccc;
		}
	}
	
	.input-box{
		width: 100%;
		height: 320rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		position: relative;
		top: 30rpx;
		
		.cont{
			width: 600rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1rpx solid #C0C0C0;
			border-radius: 15rpx;
			input{
				width: 350rpx;
			}
			
			.middle{
				width: 500rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.title{
					font-size: 30rpx;
				}
				.sort{
					margin-left: 20rpx;
				}
			}
		}
	}
	
	.button{
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		top: 100rpx;
		
		.cont{
			width: 600rpx;
			height: 80rpx;
		}
	}
	u-popup{
		width: 550rpx;
		height: 500rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.cont{
			width: 480rpx;
			height: 480rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #FFFFFF;
			
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
}
</style>
