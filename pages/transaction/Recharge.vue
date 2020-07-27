<template>
	<view class="main">
		<u-navbar  title="用户提现"></u-navbar>
		
		<view class="Bank-card">
			<view class="cont">
				<view class="left">提现到银行卡</view>
				<view class="right" @click="pickBankCard">
					<image :src="imgUrl"></image>
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
	</view>
</template>

<script>
import {request} from "@/api/request.js"	
	export default {
		data() {
			return {
				show_0: false,
				show_1: false,
				default_0:'点击选择提现的账户',
				title:'请选择银行卡',
				imgUrl:'../../static/image/Bankcard.png',
				list: [
					{
						value: '1',
						label: '余额账户'
					},
					{
						value: '2',
						label: '商家账户'
					}
				],
				//银行卡列表
				BankCardList:[],
				amount:''
			};
		},
		onLoad() {
		
		},
		methods:{
			pickBankCard(){
				request('API_GetList_BankCard',{user_id:8565}).then(res=>{
					if(res.length!=0){
						let BankCardList = []
						for(var i = 0;i<res.length;i++){
							BankCardList.push({value: i+1,label:`${res[i].BC_BankCnName}尾号${res[i].BC_CardID.substr(-4,4)}`,extra:res[i].BC_BankEnName})
						}
						this.BankCardList = BankCardList
						this.show_1 = true
					}
					else{
						uni.showModal({
							title:'您还没有绑定银行卡哦',
							confirmText:'去添加',
							success:function(res){
								if(res.cancel)
								{
									return
								}
								else if(res.confirm)
								{
									console.log('去添加银行卡')
								}
							}
						})
					}
				})
			},
			withdraw(){
				if(this.amount && this.amount!=0){
					console.log(123)
					
				}else{
					this.$refs.uToast.show({
						title: '请输入提现金额',
						type: 'error'
					})
					return;
				}
			},
			//提现账户选择
			confirm_0(e){
				this.default_0 = JSON.parse(JSON.stringify(e))[0].label
			},
			//提现到的银行卡选择
			confirm_1(e){
				const data = JSON.parse(JSON.stringify(e))
				this.title = data[0].label
				if(data[0].extra){
					this.imgUrl = `../../static/bankCard/${data[0].extra}.png`
				}
				else{
					this.imgUrl = `../../static/bankCard/UnionPay.png`
				}
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
				left: 70rpx;
				image{
					width: 55rpx;
					height: 50rpx;
				}
				u-icon{
					margin-left: 10rpx;
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
}
</style>
