<template>
	<view class="main">
		<view class="top">
			<view class="content">
				<view class="middle" @click="back">
					<u-icon name="arrow-left" size="32" color="#ffffff"></u-icon>
					<text class="back">返回</text>
				</view>
			</view>
		
			<image class="top-background-img" src="../../static/image/goodsimg.png"></image>
		
			<view class="shop-datails">
				<view class="middle">
					<view class="top">
						<view class="shop-content">
							<view class="shop-name">
								<text>幸福山庄(渡口路店)</text>
								<view class="category">餐饮业</view>
							</view>
							<view class="shop-data">
								<view class="top-shop">
									<text>累计客户数:896597 (人)</text>
								</view>
								
								<view class="middle-shop">
									<image style="width: 26rpx;height: 26rpx;" src="../../static/image/proxy_shop.png"></image>
									<text>营业中,8：00-22：00</text>
								</view>
								
								<view class="bottom-shop">
									<u-icon name="map-fill"></u-icon>
									<text style="margin-left: 10rpx;">江西省赣州市章贡区渡口路44号</text>
								</view>
							</view>
						</view>
						<view class="shop-top-img">
							<image src="../../static/image/img4.jpg"></image>
							<view class="bottom-img">
								<u-icon name="phone-fill" size="42" color="RGBA(255, 229, 14, 1)"></u-icon>
								<u-icon name="car-fill" size="42" color="RGBA(255, 229, 14, 1)"></u-icon>
							</view>
						</view>
					</view>
					
					<view class="bottom">
						<view class="left-Grand-total">
							<view class="top-title">累计收益</view>
							<text class="Amount">205,328.01</text>
							<text class="tips">截至2020.8</text>
						</view>
						<view class="right-month-amount">
							<view class="top-title">当月收益</view>
							<text class="Amount btn">205,328.01</text>
							<text class="tips">当月至12日结算</text>
						</view>
					</view>
				</view>
			</view>
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
	.top{
		width: 100%;
		height: 600rpx;
		position: relative;
		
		.content{
			width: 120rpx;
			height: 35rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			position: absolute;
			top: 85rpx;
			left: 50rpx;
			
			.middle{
				display: flex;
				z-index: 180;
				.back{
					display: flex;
					justify-content: center;
					align-items: center;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:#FFFFFF;
					line-height:18rpx;
				}
			}
		}
		
		.top-background-img{
			width: 100%;
			height: 450rpx;
			
			-webkit-filter: blur(10rpx);
			-moz-filter: blur(3rpx);
			-ms-filter: blur(3rpx);    
			filter: blur(3rpx);
		}
		
		.shop-datails{
			width: 100%;
			height: 450rpx;
			position: absolute;
			top: 130rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.middle{
				width: 710rpx;
				height: 430rpx;
				background-color: #FFFFFF;
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				-moz-box-shadow:0 10rpx 20rpx #b5b5b5; -webkit-box-shadow:0 10rpx 20rpx #b5b5b5; box-shadow:0 10rpx 20rpx #b5b5b5;
			
				.top{
					width: 670rpx;
					height: 260rpx;
					border-bottom: 2rpx solid #f5f5f5;
					display: flex;
					justify-content: center;
					align-items: center;
					
					.shop-content{
						width: 480rpx;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						//align-items: center;
						
						.shop-name{
							width: 400rpx;
							height: 60rpx;
							display: flex;
							justify-content:flex-start;
							align-items: center;
							position: relative;
							left: 10rpx;
							top: 10rpx;
							
							text{
								font-size:32rpx;
								font-family:PingFang SC;
								font-weight:600;
							}
							.category{
								display: flex;
								justify-content: center;
								align-items: center;
								border-radius: 5rpx;
								margin-left: 20rpx;
								background-color: RGBA(109, 177, 254, 1);
								font-size:26rpx;
								font-family:PingFang SC;
								font-weight:400;
								color: #FFFFFF;
							}
						}
						
						.shop-data{
							width: 100%;
							height: 180rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							position: relative;
							left: 10rpx;
							
							.top-shop{
								font-size: 26rpx;
								color: RGBA(112, 112, 112, 1);
							}
							
							.middle-shop{
								text{
									font-size: 26rpx;
									color: RGBA(112, 112, 112, 1);
									margin-left: 10rpx;
								}
							}
							
							.bottom-shop{
								font-size: 26rpx;
								color: RGBA(112, 112, 112, 1);
							}
						}
					}
					.shop-top-img{
						width: 190rpx;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						
						image{
							width: 115rpx;
							height: 115rpx;
							border-radius: 50%;
						}
						
						.bottom-img{
							width: 100%;
							height: 60rpx;
							display: flex;
							justify-content: space-around;
							align-items: center;
							margin-top: 20rpx;
						}
					}
				}
				.bottom{
					width: 100%;
					height: 170rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					
					.left-Grand-total,.right-month-amount{
						width: 300rpx;
						height: 135rpx;
						position: relative;
						left: 30rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						
						.top-title{
							font-size: 26rpx;
							font-weight:600;
							color: RGBA(102, 102, 102, 1);
						}
							
						.Amount{
							font-size: 38rpx;
							font-weight:600;
							color: RGBA(24, 24, 24, 1);
						}
						.btn{
							color: RGBA(255, 56, 66, 1);
						}
							
						.tips{
							font-size: 26rpx;
							color: RGBA(102, 102, 102, 1);
						}
					}
				}
			}
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
