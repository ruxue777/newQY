<template>
	<view class="main">
		<view class="top">
			<view class="content">
				<view class="middle" @click="back">
					<u-icon name="arrow-left" size="32" color="#ffffff"></u-icon>
					<text class="back">返回</text>
				</view>
			</view>
		
			<image class="top-background-img" :src="shopDatails.ImgUrl"></image>
		
			<view class="shop-datails">
				<view class="middle">
					<view class="top">
						<view class="shop-content">
							<view class="shop-name">
								<text>{{shopDatails.BusinessName}}</text>
								<view class="category">{{shopDatails.T_Name}}</view>
							</view>
							<view class="shop-data">
								<view class="top-shop">
									<text>累计客户数:{{ProxyShopDatails[0].Agent_UserNums}} (人)</text>
								</view>
								
								<view class="middle-shop">
									<image style="width: 26rpx;height: 26rpx;" src="../../static/image/proxy_shop.png"></image>
									<text>营业中,{{shopDatails.BusinessTime}}</text>
								</view>
								
								<view class="bottom-shop">
									<u-icon name="map-fill"></u-icon>
									<text style="margin-left: 10rpx;">{{shopDatails.Address}}</text>
								</view>
							</view>
						</view>
						<view class="shop-top-img">
							<image :src="shopDatails.ImgUrl"></image>
							<view class="bottom-img">
								<u-icon name="phone-fill" size="42" color="RGBA(255, 229, 14, 1)"></u-icon>
								<u-icon name="car-fill" size="42" color="RGBA(255, 229, 14, 1)"></u-icon>
							</view>
						</view>
					</view>
					
					<view class="bottom">
						<view class="left-Grand-total">
							<view class="top-title">累计收益</view>
							<text class="Amount">{{ProxyShopDatails[0].Agent_Total_All_Amount}}</text>
							<text class="tips">截至{{`${new Date().getFullYear()}-${new Date().getMonth()+1}`}}</text>
						</view>
						<view class="right-month-amount">
							<view class="top-title">当月收益</view>
							<text class="Amount btn">{{ProxyShopDatails[0].Agent_Total_Now_Amount}}</text>
							<text class="tips">当月至{{Day}}结算数据</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="middle-content">
			<view class="top">
				<view class="area-content">
					<image src="../../static/image/area.png"></image>
					<text>{{proxy_Init.Agent_Title}}</text>
				</view>
				
				<view class="time-content">
					<view class="time-title">时间选择:</view>
						
					<view class="time-select">
						<view class="left" @click="show_0 = true">
							{{StartTime}}
							<u-icon style="margin-left: 5rpx;" name="arrow-down-fill"></u-icon>
						</view>
						<view class="time-span">
							{{timeSpan}}
						</view>
						<view class="right" @click="show_1 = true">
							{{EndTime}}
							<u-icon style="margin-left: 5rpx;" name="arrow-down-fill"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="left">
					<view class="content">
						<view class="title">期间收益总额</view>
						<view class="amount">{{proxy_Init.Agent_Total_All_Amount}}</view>
					</view>
				</view>
				
				<view class="right btn">
					<view class="content">
						<view class="title">客户数量</view>
						<view class="amount" style="color: rgba(24,23,23,1);">{{proxy_Init.Agent_UserNums}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="select-box">
			<view class="content" v-if="isHigh == true">
				<view class="high selected">高到低</view>
				<view class="low" @click="isHigh = false,orderState=1,this.Init(),this.getProxyData()">低到高</view>
			</view>
			<view class="content" v-else>
				<view class="high" @click="isHigh = true,orderState=0,this.Init(),this.getProxyData()">高到低</view>
				<view class="low selected">低到高</view>
			</view>
		</view>
		
		<view class="rank_content">
			<view class="middle" v-for="(item,index) in proxyList" :key="index">
				<view class="left">
					<image v-if="index <=2" :src="getRankimgUrl(index+1)"></image>
					<view v-else class="rank-no">{{index+1}}</view>
					<view class="proxy-cont">
						<view class="proxy-name">{{(item.SettlementTime.slice(0,item.SettlementTime.length-3))}}</view>
						<view class="proxy-client-amount">客户数量: {{item.Agent_UserNums}}</view>
					</view>
				</view>
				
				<view class="right">
					<view class="lineProgress">
						<u-line-progress :percent="Math.floor(item.PercentAge*100)" striped="true" striped-active="true" active-color="#FF9900"></u-line-progress>
						<text class="amount">￥{{item.Agent_Total_All_Amount}}</text>
					</view>
				</view>
			</view>
		</view>	

		<!-- 反馈组件 -->
		<u-picker mode="time" v-model="show_0" :params="params" @confirm="confirm_0"></u-picker>
		<u-picker mode="time" v-model="show_1" :params="params" @confirm="confirm_1"></u-picker>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus"  />
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		data() {
			return {
				time:`请选择时间`,
				show_0:false,
				show_1:false,
				isHigh:true,
				loadStatus:'loadmore',
				Day:'',
				user_id:'',
				BusinessID:'',
				AeraID:'',
				StartTime:"2020-08",
				EndTime:"2020-08",
				params:{
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				timeSpan:'1月',
				Index:1,
				orderState:0,
				ProxyShopDatails:[],
				proxy_Init:[],
				shopDatails:[],
				proxyList:[]
			};
		},
		onLoad(options) {
			this.BusinessID = options.BusinessID
			this.user_id = options.user_id;
			this.AeraID = options.AeraID
			
			this.getProxyShopDatails()
			this.getShopDatails()
			this.page_Init()
			
			this.getDay()
		},
		onReachBottom() {
			if(this.proxyList.length<this.Index*10){
				this.loadStatus = 'nomore';
				return;
			}else{
				this.Index++;
				this.loadStatus = 'loading';
				// 模拟数据加载效果
				setTimeout(() => {
					this.getProxyData();
					this.loadStatus = 'loadmore';
				}, 1000);
			}
		},
		methods:{
			getProxyShopDatails(){
				request('API_GetList_Agent_Info',{user_id:this.user_id,AeraID:this.AeraID,BusinessID:this.BusinessID}).then(res=>{
					this.ProxyShopDatails = res
				})
			},
			getShopDatails(){
				request('API_GetInfo_BusinessSearch',{BusinessID:this.BusinessID,Longitude:0,Latitude:0}).then(res=>{
					this.shopDatails = res
				})
			},
			page_Init(){
				this.EndTime = `${new Date().getFullYear()}-${new Date().getMonth()+1}`
				this.StartTime = `${new Date().getFullYear()}-${new Date().getMonth()+1}`
				request('API_GetList_Agent_Info_AeraInfo',{user_id:this.user_id,AeraID:this.AeraID,BusinessID:this.BusinessID,
					Start_SettlementTime:this.getMonth(),End_SettlementTime:this.getMonth(),orderState:this.orderState,pageSize:10,index:this.Index}).then(res=>{
						this.proxy_Init = res
						this.proxyList = res.DataList_Detail
				})
			},
			getProxyData(callBack){
				request('API_GetList_Agent_Info_AeraInfo',{user_id:this.user_id,AeraID:this.AeraID,BusinessID:this.BusinessID,
					Start_SettlementTime:this.requestTime(this.StartTime),End_SettlementTime:this.requestTime(this.EndTime),orderState:this.orderState,pageSize:10,index:this.Index}).then(res=>{
						
						let proxyList = res.DataList_Detail
						
						if(proxyList<10){
							this.loadStatus = 'nomore'
						}
						this.proxyList = [...this.proxyList,...proxyList]
						callBack && callBack()
				})
			},
			requestTime(time){
				return `${time}-01`
			},
			//初始化方法
			Init(){
				this.Index = 1;
				this.proxyList = []
			},
			getRankimgUrl(No){
				return `/static/image/NO_${No}.png`
			},
			getMonth(){
				//返回月份日期,2020-8-17
				return `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
			},
			getDay(){
				this.Day = `${new Date().getMonth()+1}月${new Date().getDate()}日`
			},
			back(){
				uni.navigateBack()
			},
			confirm_0(e){
				
				this.StartTime = `${e.year}-${e.month}`
				let moment_0 = this.StartTime.split('-');
				let date1 = parseInt(moment_0[0]) * 12 + parseInt(moment_0[1]);
				
				let moment_1 = this.EndTime.split('-');	
				let	date2 = parseInt(moment_1[0]) * 12 + parseInt(moment_1[1]);
					
				let m = Math.abs(date1 - date2); 
				this.timeSpan = `${m}月`
				
				this.Init()			
				this.getProxyData()			
				
			},
			confirm_1(e){
				this.EndTime = `${e.year}-${e.month}`		
				
				let moment_0 = this.StartTime.split('-');
				let date1 = parseInt(moment_0[0]) * 12 + parseInt(moment_0[1]);
				
				let moment_1 = this.EndTime.split('-');	
				let	date2 = parseInt(moment_1[0]) * 12 + parseInt(moment_1[1]);
					
				let m = Math.abs(date1 - date2); 
				
				this.timeSpan = `${m}月`
				
				this.Init()	
				this.getProxyData()	
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
								font-size:30rpx;
								font-family:PingFang SC;
								font-weight:600;
							}
							.category{
								width: 160rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								border-radius: 5rpx;
								background-color: RGBA(109, 177, 254, 1);
								font-size:26rpx;
								font-family:PingFang SC;
								font-weight:400;
								color: #FFFFFF;
								position: relative;
								left: 20rpx;
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
				justify-content: space-between;
				align-items: center;
				position: relative;
				left: 20rpx;
				
				.time-title{
					width: 120rpx;
					height: 60rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:600;
					color:rgba(102,102,102,1);
					line-height:13rpx;
				}
				
				.time-select{
					width: 380rpx;
					height: 60rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					
					.left,.right{
						width:140rpx;
						height:55rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background:rgba(238,238,238,1);
						border-radius:20rpx;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(102,102,102,1);
						line-height:13rpx;
					}
					
					.time-span{
						width: 100rpx;
						height: 60rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-bottom: 2rpx solid #eeeeee;
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

	.rank_content{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		
		.middle{
			width: 710rpx;
			height: 100rpx;
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
					width: 180rpx;
					height: 100rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					border-bottom: 5rpx solid #fafafa;
					
					.proxy-name{
						width: 180rpx;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(51,51,51,1);
						text-overflow: ellipsis;
						-webkit-line-clamp: 1;  //  两行限制的行数
						-webkit-box-orient: vertical;
						word-break: break-all;
						overflow: hidden;
						display: flex;
						justify-content: flex-start;
						align-items: center;
					}
					
					.proxy-client-amount{
						font-size:22rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(153,153,153,1);
						line-height:18rpx;
						margin-top: 5rpx;
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
</style>
