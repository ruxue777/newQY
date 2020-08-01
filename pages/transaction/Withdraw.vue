<template>
	<view class="main">
		<u-navbar title="会员转账"></u-navbar>
	
		<view class="middle">
			<view class="amount">
				<text class="top-title">可用额度(元)</text>
				<text class="money">158.23</text>
			</view>
		</view>
		
		<view class="content">
			<view class="top">
				<input placeholder="输入充值金额"/>
			</view>
			<view class="cont">
				<input placeholder="用户名或手机号"/>
			</view>
			<view class="bottom">
				<input type="password" placeholder="输入支付密码"/>
			</view>
			<view class="button">
				<u-button type="primary" ripple="true" @click="withdraw">确定</u-button>
			</view>
		</view>
		
		
	<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_id:'',
				amount:'',
				mobile:'',
				Psd:''
				
			};
		},
		onLoad(e){
			this.user_id = e.user_id
		},
		methods:{
			withdraw(){
				if(this.amount !='' && this.mobile !='' && this.Psd !=''){
					
				}
				else{
					
				}
			}
		}
	}
</script>

<style lang="less">
.main{
	.middle{
		width: 100%;
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.amount{
			width: 300rpx;
			height: 100rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
				
			.top-title{
				font-size: 26rpx;
				color: #909399;
			}
			.money{
				font-size: 40rpx;
				letter-spacing:3rpx;
				margin-top: 5rpx;
			}
		}
	}
	.content{
		width: 100%;
		height: 350rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.top,.cont,.bottom{
			width: 450rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 20rpx;
			border: 1rpx solid #999999;
			margin-bottom: 20rpx;
		}
		.button{
			width: 450rpx;
			height: 50rpx;
			margin-top: 20rpx;
		}
	}
}
</style>
