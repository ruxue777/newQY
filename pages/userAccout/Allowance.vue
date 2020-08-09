<template>
	<view class="main">
		<view class="top-background">
			<view class="top-title">
				<view class="title-content" >
					<u-icon name="arrow-left" size="40" @click="back"></u-icon>
					<p>津贴账户</p>
					<u-icon name="question-circle" size="42"></u-icon>
				</view>
			</view>
			<view class="top-account-balance">
				<view class="balance-content">
					<view class="title">津贴账户(元)</view>
					<view class="accout">0.00</view>
				</view>
			</view>
		</view>
		
		<view class="allowance-interest">
			<view class="interest-content">
				
				<view class="left">
					<image src="../../static/image/money.png"></image>
					<view class="acc-cont">
						<view class="top-account-name">
							津贴权益
						</view>
						<view class="bottom-account-amount">
							500.00
						</view>
					</view>
				</view>
				
				<view class="right">
					<view class="cont">
						<p>每日奖励收益</p>
						<view class="button">
							去看看
						</view>
					</view>
				</view>
			</view>
			
		</view>
	
		<view class="features">
			<view class="recharge">
				<view class="left">
					<image src="../../static/image/Recharge-A.png"></image>
				</view>
				<view class="right">
					<p>充值</p>
					<u-icon name="arrow-right" size="32"></u-icon>
				</view>
			</view>
			<view class="withdraw">
				<view class="left">
					<image src="../../static/image/withdraw-A.png"></image>
				</view>
				<view class="right">
					<p>提现</p>
					<u-icon name="arrow-right" size="32"></u-icon>
				</view>
			</view>
			<view class="transfer">
				<view class="left">
					<image src="../../static/image/Transfer-A.png"></image>
				</view>
				<view class="right">
					<p>转账</p>
					<u-icon name="arrow-right" size="32"></u-icon>
				</view>
			</view>
		</view>
		
		<view class="background">
			<p class="title">津贴账单:</p>
		</view>
		
		<view class="account-details">
			<view class="details-content">
				<view class="middle">
					<view class="left">
						<view class="cont-top"></view>
						<view class="cont-bottom"></view>
					</view>
					<view class="right"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				//账户数据
				LogsUserProfit:[],
				//账户金额
				ProfitAmount:0.00,
				BonusAmount:0.00,
				//页面数
				Index:1
			};
		},
		onLoad(options)  
		{
		
		},
		onReachBottom() {
		
		},
		methods:
		{
			back(){
				uni.navigateBack({})
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
	.top-background{
		width: 100%;
		height: 400rpx;
		background-color: RGBA(255, 229, 14, 1);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.top-title{
			width: 100%;
			height: 150rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.title-content{
				width: 640rpx;
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				top: 20rpx;
				
				p{
					width:125rpx;
					height:29rpx;
					font-size:30rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(0,0,0,1);
				}
			}
		}
		
		.top-account-balance{
			width: 100%;
			height: 250rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.balance-content{
				width: 180rpx;
				height: 140rpx;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: space-around;
				position: relative;
				left: -225rpx;
				
				.title{
					width:151rpx;
					height:25rpx;
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(77,77,77,1);
				}
				.accout{
					width:170rpx;
					height:70rpx;
					font-size:70rpx;
					font-family:PingFang SC;
					font-weight:600;
					color:rgba(51,51,51,1);
				}
			}
		}
	}
	
	.allowance-interest{
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow:0rpx 0rpx 3rpx 0rpx rgba(35,31,1,0.1);
		
		.interest-content{
			width: 690rpx;
			height: 65rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.left{
				width: 215rpx;
				height: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				border-right: 4rpx solid rgba(250,250,250,1);
				
				.acc-cont{
					width: 110rpx;
					height: 65rpx;
					
					.top-account-name{
						width: 115rpx;
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(0,0,0,1);
					}
					
					.bottom-account-amount{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(247,76,50,1);
					}
				}
				image{
					width: 46rpx;
					height: 46rpx;
				}
			}
			.right{
				width: 475rpx;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.cont{
					width: 450rpx;
					height: 45rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					p{
						width:150rpx;
						height:23rpx;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(102,102,102,1);
					}
					
					.button{
						width:110rpx;
						height:42rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background:linear-gradient(90deg,rgba(253,244,227,1),rgba(254,234,235,1));
						border-radius:20rpx;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(247,76,50,1);
					}
				}
			}
		}
	}
	
	.features{
		width: 100%;
		height: 270rpx;
		border-top: 10rpx solid #fafafa;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		margin-bottom: -20rpx;
		
		.recharge,.withdraw,.transfer{
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.left{
				width: 100rpx;
				height: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				image{
					width: 46rpx;
					height: 46rpx;
				}
			}
			.right{
				width: 650rpx;
				height: 70rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2rpx solid #fafafa;
				
				p{
					font-size:30rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(0,0,0,1);
				}
				u-icon{
					position: relative;
					right: 45rpx;
				}
			}
		}
	}
	
	.background{
		width: 100%;
		height: 75rpx;
		background-color: #fafafa;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		
		p{
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
			position: relative;
			left: 30rpx;
		}
	}
	
	.account-details{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		
		.details-content{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.middle{
				width: 690rpx;
				height: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.left{
					
				}
			}
		}
	}
}
</style>
