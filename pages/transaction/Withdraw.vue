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
						<text>￥59159.2</text>
					</view>
				</view>
				
				<view class="subsidy">
					<view class="accout-name">
						<u-icon name="rmb-circle-fill" size="42"></u-icon>
						<text class="name">补贴账户</text>
					</view>
					
					<view class="accout-amount">
						<text>￥59159.2</text>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="tips">
			<text class="tips-cont">转账为个人行为,请核对对方真实姓名与账号,避免造成财产损失</text>
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
}
</style>
