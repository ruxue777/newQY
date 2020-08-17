<template>
	<view class="main">
		<view class="top-title">
			<view class="content">
				<view class="middle" @click="back">
					<u-icon name="arrow-left" size="32"></u-icon>
					<text class="back">返回</text>
				</view>
			</view>
		</view>
	
		<view class="top-content">
			<view class="proxy">大余县代理,上午好~</view>
			<view class="proxy-img"></view>
		</view>
		
		<view class="middle-content">
			<view class="top">
				<view class="area-content">
					<image src="../../static/image/area.png"></image>
					<text>门店收益排行</text>
				</view>
				
				<view class="time-content">
					<view class="time-select">
						<text class="title">时间选择 :</text>
						<view class="time" @click="show = true">
							
							<view v-if="selectTime == false">
								{{time}}<u-icon name="arrow-down-fill" size="32"></u-icon>
							</view>
							
							<view v-else>
								<text class="time-style">{{time}}</text>
							</view>
							
						</view>
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="left">
					<view class="content">
						<view class="title">期间收益总额</view>
						<view class="amount">205,382.01</view>
					</view>
				</view>
				
				<view class="right btn">
					<view class="content">
						<view class="title">客户数量</view>
						<view class="amount" style="color: rgba(24,23,23,1);">99900</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="select-box">
			<view class="content" v-if="isHigh == true">
				<view class="high selected">高到低</view>
				<view class="low" @click="isHigh = false">低到高</view>
			</view>
			<view class="content" v-else>
				<view class="high" @click="isHigh = true">高到低</view>
				<view class="low selected">低到高</view>
			</view>
		</view>
		
		<view class="rank">
			<view class="content">
				<view class="middle">
					<view class="left">
						<image src="../../static/image/NO_1.png"></image>
						<view class="proxy-cont">
							<view class="proxy-name">大余县</view>
							<view class="proxy-client-amount">客户数量: 1233</view>
						</view>
					</view>
					
					<view class="right">
						<view class="lineProgress">
							<u-line-progress percent="70" striped="true" striped-active="true" active-color="#FF9900"></u-line-progress>
							<text class="amount">￥88881.99</text>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			
			<view class="content">
				<view class="middle">
					<view class="left">
						<image src="../../static/image/NO_2.png"></image>
						<view class="proxy-cont">
							<view class="proxy-name">大余县</view>
							<view class="proxy-client-amount">客户数量: 1233</view>
						</view>
					</view>
					
					<view class="right">
						<view class="lineProgress">
							<u-line-progress percent="50" striped="true" striped-active="true" active-color="#FF9900"></u-line-progress>
							<text class="amount">￥881.99</text>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			
			<view class="content">
				<view class="middle">
					<view class="left">
						<image src="../../static/image/NO_3.png"></image>
						<view class="proxy-cont">
							<view class="proxy-name">大余县</view>
							<view class="proxy-client-amount">客户数量: 123</view>
						</view>
					</view>
					
					<view class="right">
						<view class="lineProgress">
							<u-line-progress percent="25" striped="true" striped-active="true" active-color="#FF9900"></u-line-progress>
							<text class="amount">￥88881.99</text>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			
			<view class="content">
				<view class="middle">
					<view class="left">
						<view class="rank-no">4</view>
						<view class="proxy-cont">
							<view class="proxy-name">大余县</view>
							<view class="proxy-client-amount">客户数量: 123</view>
						</view>
					</view>
					
					<view class="right">
						<view class="lineProgress">
							<u-line-progress percent="10" striped="true" striped-active="true" active-color="#FF9900"></u-line-progress>
							<text class="amount">￥88881.99</text>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			
			<view class="content">
				<view class="middle">
					<view class="left">
						<view class="rank-no">5</view>
						<view class="proxy-cont">
							<view class="proxy-name">大余县</view>
							<view class="proxy-client-amount">客户数量: 123</view>
						</view>
					</view>
					
					<view class="right">
						<view class="lineProgress">
							<u-line-progress percent="3" striped="true" striped-active="true" active-color="#FF9900"></u-line-progress>
							<text class="amount">￥81.9</text>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>

		<!-- 反馈组件 -->
		<u-calendar v-model="show" mode="range" max-date="2050-01-01" @change="change"></u-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:`请选择时间`,
				show:false,
				isHigh:true,
				selectTime:false
			};
		},
		onLoad() {
			
		},
		methods:{
			back(){
				uni.navigateBack()
			},
			change(e){
				this.selectTime = true;
				this.time = `${e.startDate} 至 ${e.endDate}`				
			}
		}
	}
</script>

<style lang="less">
.main{
	.top-title{
		width: 100%;
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(255, 229, 13, 1);
		
		.content{
			width: 690rpx;
			height: 35rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			position: relative;
			top: 20rpx;
			
			.middle{
				display: flex;
				
				.back{
					display: flex;
					justify-content: center;
					align-items: center;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:18rpx;
				}
			}
		}
	}
	
	.top-content{
		width: 100%;
		height: 430rpx;
		background-color: rgba(255, 229, 13, 1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.proxy{
			width: 690rpx;
			height: 100rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 46rpx;
			font-weight: bold;
		}
		.proxy-img{
			width: 690rpx;
			height: 330rpx;
		}
	}
	
	.middle-content{
		width: 100%;
		height: 230rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-bottom: 5rpx solid #f7f7f7;
		
		.top{
			width: 690rpx;
			height: 70rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			
			.area-content{
				width: 190rpx;
				height: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				image{
					width: 32rpx;
					height: 28rpx;
				}
				text{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:600;
					color:rgba(102,102,102,1);
					line-height:12rpx;
				}
			}
		
			.time-content{
				width: 500rpx;
				height: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.time-select{
					width: 480rpx;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
				
					.title{
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:600;
						color:rgba(102,102,102,1);
						line-height:12rpx;
						position: relative;
						right: -20rpx;
					}
					
					.time{
						width: 350rpx;
						height: 50rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						position: relative;
						left: 30rpx;
						border-radius: 50rpx;
						background-color: RGBA(237, 237, 237, 1);
						
						.time-style{
							font-size: 24rpx;
						}
						u-icon{
							margin-left: 35rpx;
						}
					}
				}
			}
		}
		
		.bottom{
			width: 690rpx;
			height: 160rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.left,.right{
				width: 345rpx;
				height: 160rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.content{
					width: 100%;
					height: 125rpx;
					border-right: 2rpx solid #f7f7f7;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					
					.title{
						width:180rpx;
						height:35rpx;
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(102,102,102,1);
						line-height:18rpx;
					}
					
					.amount{
						width:270rpx;
						height:50rpx;
						font-size:48rpx;
						font-family:PingFang SC;
						font-weight:600;
						color:rgba(255,55,65,1);
						line-height:12rpx;
						position: relative;
						bottom: -20rpx;
					}
				}
			}			
			.btn{
				position: relative;
				left: 40rpx;	
			}
		}
	}
	
	.select-box{
		width: 100%;
		height: 95rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		border-bottom: 5rpx solid #fafafa;
		
		.content{
			width: 280rpx;
			height: 65rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			left: -20rpx;
			
			.high,.low{
				width: 120rpx;
				height: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height:12rpx;
			}
			.selected{
				width: 120rpx;
				height: 50rpx;
				background:rgba(255,229,14,1);
				border-radius:35rpx;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:12rpx;
			}
		}
	}

	.rank{
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		
		.content{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.middle{
				width: 710rpx;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.left{
					width: 250rpx;
					height: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.rank-no{
						width: 50rpx;
						height: 60rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size:38rpx;
						font-family:PingFang SC;
						font-weight:600;
						color:rgba(102,102,102,1);
						line-height:28rpx;
					}
					
					image{
						width: 50rpx;
						height: 60rpx;
					}
					
					.proxy-cont{
						width: 175rpx;
						height: 80rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						border-bottom: 5rpx solid #fafafa;
						
						.proxy-name{
							font-size:28rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(51,51,51,1);
							line-height:18rpx;
						}
						
						.proxy-client-amount{
							font-size:24rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(153,153,153,1);
							line-height:18rpx;
						}
					}
				}
				
				.right{
					width: 460rpx;
					height: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					border-bottom: 5rpx solid #fafafa;
					
					.lineProgress{
						width: 360rpx;
						height: 100%;
						position: relative;
						left: 15rpx;
						
						.amount{
							position: absolute;
							top: 50rpx;
							left: 115rpx;
							font-size:24rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(245,66,78,1);
							line-height:18rpx;
						}
					}
					u-icon{
						position: relative;
						left: 70rpx;
					}
				}
			}
		}
	}
}
</style>
