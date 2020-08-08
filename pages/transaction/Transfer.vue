<template>
	<view class="main">
		<u-navbar title="充值"></u-navbar>
		
		<view class="middle">
			<view class="cont">
				<text class="symbol">￥</text>
				<input class="amount" placeholder="请输入充值金额" v-model="amount"/>
			</view>
		</view>
		
		<view class="accout">
			<view class="cont"  @click="show = true">
				<view class="title">充值账户类别:</view>
				<text class="sort">{{default_0}}</text>
			</view>
		</view>
		
		<view class="buttom">
			<view class="buttom-cont">
				<u-button type="primary" ripple="true" @click="recharge">确认充值</u-button>
			</view>
		</view>
			
		<u-toast ref="uToast" />
		<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
import {request,wxRequest} from '@/api/request.js';
import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				amount:'',
				list: [
					{
						value: 'Profit',
						label: '余额账户'
					},
					{
						value: 'Recharge', 
						label: '消费账户'
					}
				],
				user_id:'',
				default_0:'点击选择充值的账户',
				AmountType:'',
				show: false
			};
		},
		onLoad(e) {
			this.user_id = e.user_id
		},
		methods:{
			recharge(){
				if(this.$u.test.amount(this.amount) === true){
					if(this.AmountType != ''){
						request('API_AddDepositOrder_AmountType',{user_id:this.user_id,Amount:this.amount,AmountType:this.AmountType}).then(res=>{
							let OrderId = res.result_content
							if(res.result_code === "SUCCESS"){
								uni.login({
									success:(e=>{
										let code = e.code
										wxRequest('API_GetOpenid',{code:code}).then(result=>{
											wxRequest('API_GetWxpayTradeInfo_DepositOrder_Json',{OrderId:OrderId,openid:result.openid}).then(pay=>{
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
															title:'充值成功',
															type: 'success'
														})
														return;
													},
													fail:(err) => {
														this.$refs.uToast.show({
															title:'充值失败',
															type: 'error'
														})
														return;
													}
												})
											})
										})
									}) 
								})
							}else{
								this.$refs.uToast.show({
									title:res.result_content,
									type: 'error'
								})
								return;
							}
						})
					}
					else{
						this.$refs.uToast.show({
							title: '请选择账户类型',
							type: 'error'
						})
						return;
					}
				}else{
					this.$refs.uToast.show({
						title: '请输入正确金额',
						type: 'error'
					})
					return;
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
	.middle{
		width: 100%;
		height: 160rpx;
		
		.cont{
			width: 100%;
			height: 180rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			right: 20rpx;
			
			.symbol{
				font-size: 36rpx;
				font-weight: bold;
			}
			.amount{
				width: 500rpx;
				height: 100rpx;
				font-size: 42rpx;
				border-bottom: 2rpx solid #999999;
			}
		}
	}
	.accout{
		width: 100%;
		height: 86rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		padding: 0rpx 10rpx;
		.cont{
			width: 500rpx;
			height: 80rpx;
			display: flex;
			align-items: center;

			.title{
				font-size: 30rpx;
			}
			.sort{
				margin-left: 20rpx;
			}
			u-icon{
				position: relative;
				left: 380rpx;
			}
		}
	}	
	.buttom{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 60rpx;
		
		.buttom-cont{
			width: 500rpx;
			height: 60rpx;
		}
	}
}
</style>
