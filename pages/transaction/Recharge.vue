<template>
	<view class="main">
		<u-navbar  title="用户提现"></u-navbar>
		
		<view class="Bank-card">
			<view class="cont">
				<view class="left">提现到银行卡</view>
				<view class="right" @click="pickBankCard">
					<image :src="imgUrl || '../../static/bankCard/UnionPay.png'"></image>
					<view class="title">{{title}}</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		
		<view class="accout">
			<view class="cont"  @click="show_0 = true">
				<view class="title">账户类别:</view>
				<text class="sort">{{default_0}}</text>
			</view>
		</view>
		
		<view class="amount">
			<view class="top">
				<p>提现金额</p>
			</view>
			<view class="bottom">
				<view class="xk">
				<p>¥</p><input v-model="amount" type="text" />
				</view>
			</view>
		</view>		
		<view class="bottom-button">
			<u-button shape="circle" size="medium" ripple="true"  type="warning" @click="withdraw">预计24小时内到账,确认提现</u-button>
		</view>
		
		<u-toast ref="uToast" />
		<u-select v-model="show_0" :list="list" @confirm="confirm_0"></u-select>
		<u-select v-model="show_1" :list="BankCardList" @confirm="confirm_1"></u-select>
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
import {request} from "@/api/request.js"	
	export default {
		data() {
			return {
				show_0: false,
				show_1: false,
				user_id:0,
				default_0:'点击选择提现的账户',
				title:'请选择银行卡',
				imgUrl:'../../static/image/Bankcard.png',
				list: [
					{
						value: 'Profit',
						label: '余额账户'
					},
					{
						value: 'Credit', 
						label: '商家账户'
					}
				],
				//银行卡列表
				BankCardList:[],
				amount:'',
				isBankCard:false,
				isList:false,
				BC_ID:'',
				AmountType:'',
				popup:false,
				Psd:''
			};
		},
		onLoad(e) {
			this.user_id = e.user_id
		},
		methods:{
			pickBankCard(){
				request('API_GetList_BankCard',{user_id:this.user_id}).then(res=>{
					if(res.length!=0){
						let BankCardList = []
						for(var i = 0;i<res.length;i++){
							BankCardList.push({value: res[i].BC_CardID,label:`${res[i].BC_BankCnName}尾号${res[i].BC_CardID.substr(-4,4)}`,extra:res[i].BC_BankEnName})
						}
						this.BankCardList = BankCardList
						this.show_1 = true
					}
					else{
						uni.showModal({
							title:'您还没有绑定银行卡哦',
							confirmText:'去添加',
							success:(res=>{
								if(res.cancel)
								{
									return
								}
								else if(res.confirm)
								{
									uni.navigateTo({
										url:`/pages/userSetting/bankCardSettings?user_id=${this.user_id}`
									})
								}
							}) 
						})
					}
				})
			},
			withdraw(){
				if(this.isBankCard == true && this.isList==true){
					if(this.amount && this.amount!=0){
						if(this.amount<300){
							this.$refs.uToast.show({
								title: '提现金额大于300才能提现',
								type: 'error'
							})
							return;
						}
						else
						{
							this.popup = true;	
						}
					}else{
						this.$refs.uToast.show({
							title: '请输入提现金额',
							type: 'error'
						})
						return;
					}
				}else{
					this.$refs.uToast.show({
						title: '请选择银行卡或账户',
						type: 'error'
					})
				}
			},
			Pay(){
				if(this.Psd != '' && this.Psd.length !=0){
					request('API_WithdrawMoney',{Amount:this.amount,BC_ID:this.BC_ID,PayPwd:this.Psd,user_id:this.user_id,AmountType:this.AmountType}).then(res=>{
						if(res.result_code === "SUCCESS"){
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'success'
							})
							uni.navigateBack({})
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
			//提现账户选择
			confirm_0(e){
				this.isList = true
				this.default_0 = JSON.parse(JSON.stringify(e))[0].label
				this.AmountType = JSON.parse(JSON.stringify(e))[0].value
			},
			//提现到的银行卡选择
			confirm_1(e){
				const data = JSON.parse(JSON.stringify(e))
				this.isBankCard = true
				this.title = data[0].label
				this.BC_ID = data[0].value
				
				this.imgUrl = `../../static/bankCard/${data[0].extra}.png`
			}
		}
	}
</script>

<style lang="less">
.main{
	
	.Bank-card{
		width: 100%;
		height: 140rpx;
		padding: 10rpx 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #e4e3e8;
		.cont{
			width: 100%;
			height: 120rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			.left{
				width: 200rpx;
				height: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30rpx;
				font-weight: bold;
			}
			
			.right{
				width: 430rpx;
				height: 65rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				left: 50rpx;
				image{
					width: 55rpx;
					height: 50rpx;
				}				
			}
		}
	}
	.accout{
		width: 100%;
		height: 86rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 5rpx solid #e4e3e8;
		padding: 0rpx 10rpx;
		.cont{
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;
			position: relative;
			left: 60rpx;
			
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
	.amount{
		width: 100%;
		height: 240rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		
		.top{
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;
			flex-direction: row;
			p{
				font-size: 28rpx;
				font-weight: bold;
				margin-left: 30rpx;
			}
		}
		.bottom{
			width: 100%;
			height: 160rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			p{
				font-size: 56rpx;
				font-weight: bold;
			}
			input{
				width: 600rpx;
				height: 60rpx;
				margin-left: 20rpx;
			}
			.xk{
				display: flex;
				align-items: center;
				flex-direction: row;
				border-bottom:2rpx solid #f2f2f2;
				padding-bottom: 30rpx;
			}
		}
	}
	.bottom-button{
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	u-popup{
		width: 550rpx;
		height: 500rpx;
		display: flex;
		justify-content: center;
		align-items: center;
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
}
</style>
