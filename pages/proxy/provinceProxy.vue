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
			<view class="proxy">{{proxyData[0].Aera_Name}}代理,{{Welcome_Message}}~</view>
			<view class="proxy-img">
				<image src="../../static/image/proxytopimg.png"></image>
				<view class="top">
					<view class="left">
						<image src="../../static/image/proxy-shop.png"></image>
						<view class="shop-amount">
							<text class="title">门店数量(家)</text>
							<text class="amount">{{proxyData[0].Agent_BusinessNums}}</text>
						</view>
					</view>
					<view class="right">
						<text>累计客户数量 :{{proxyData[0].Agent_UserNums}}</text>
					</view>
				</view>
				
				<view class="bottom">
					<view class="left">
						<view class="top-cont">
							<text>累计收益</text>
						</view>
						
						<view class="amount"><text>{{proxyData[0].Agent_Total_All_Amount}}</text></view>
						
						<view class="tips"><text>截至{{proxyData[0].updateTime}}日</text></view>
					</view>
					
					<view class="right">
						<view class="top-cont">
							<text>当月收益</text>
						</view>
						
						<view class="amount"><text style="color:rgba(255,56,66,1);">{{proxyData[0].Agent_Total_Now_Amount}}</text></view>
						
						<view class="tips"><text>当月至{{Day}}结算数据</text></view>
					</view>
				</view> 
			</view>
		</view>
		
		<view class="middle-content">
			<view class="top">
				<view class="area-content">
					<image src="../../static/image/area.png"></image>
					<text>{{proxyDetails.Agent_Title}}</text>
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
						<view class="amount">{{proxyDetails.Agent_Total_All_Amount}}</view>
					</view>
				</view>
				
				<view class="right btn">
					<view class="content">
						<view class="title">客户数量</view>
						<view class="amount" style="color: rgba(24,23,23,1);">{{proxyDetails.Agent_UserNums}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="select-box">
			<view class="content" v-if="isHigh == true">
				<view class="high selected">高到低</view>
				<view class="low" @click="isHigh = false,orderState=1,this.getProxyData()">低到高</view>
			</view>
			<view class="content" v-else>
				<view class="high" @click="isHigh = true,orderState=0,this.getProxyData()">高到低</view>
				<view class="low selected">低到高</view>
			</view>
		</view>
		
		<view class="rank">
			<view class="content">
				<view class="middle" v-for="(item,index) in proxyDetails.DataList_Detail" :key="index" @click="toproxy(item.AeraID)">
					<view class="left">
						<image v-if="index <=2" :src="getRankimgUrl(index+1)"></image>
						<view v-else class="rank-no">{{index+1}}</view>
						<view class="proxy-cont">
							<view class="proxy-name">{{item.Aera_Name}}</view>
							<view class="proxy-client-amount">客户数量: {{item.Agent_UserNums}}</view>
						</view>
					</view>
					
					<view class="right">
						<view class="lineProgress">
							<u-line-progress :percent="item.PercentAge*100" striped="true" striped-active="true" active-color="#FF9900"></u-line-progress>
							<text class="amount">￥{{item.Agent_Total_All_Amount}}</text>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>		
		</view>

		<!-- 反馈组件 -->
		<u-picker mode="time" v-model="show_0" :params="params" @confirm="confirm_0"></u-picker>
		<u-picker mode="time" v-model="show_1" :params="params" @confirm="confirm_1"></u-picker>
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
				orderState:0,
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
				Day:'',
				user_id:'',
				proxyData:[],
				proxyDetails:[],
				Welcome_Message:''
			};
		},
		onLoad(options) {
			this.proxyData = JSON.parse(decodeURIComponent(options.proxyData));
			this.user_id = options.user_id;
			this.page_Init()
			this.getHour()
			this.getDay()
		},
		methods:{
			getProxyData(){
				request('API_GetList_Agent_Info_AeraInfo',{user_id:this.user_id,AeraID:this.proxyData[0].AeraID,BusinessID:'',
					Start_SettlementTime:this.requestTime(this.StartTime),End_SettlementTime:this.requestTime(this.EndTime),orderState:this.orderState,pageSize:10,index:1}).then(res=>{
						this.proxyDetails = res
				})
			},
			page_Init(){				
				this.EndTime = `${new Date().getFullYear()}-${new Date().getMonth()+1}`
				this.StartTime = `${new Date().getFullYear()}-${new Date().getMonth()+1}`
				request('API_GetList_Agent_Info_AeraInfo',{user_id:this.user_id,AeraID:this.proxyData[0].AeraID,BusinessID:'',
					Start_SettlementTime:this.requestTime(this.StartTime),End_SettlementTime:this.requestTime(this.EndTime),orderState:this.orderState,pageSize:10,index:1}).then(res=>{
						this.proxyDetails = res
				})
			},
			requestTime(time){
				return `${time}-01`
			},
			toproxy(AeraID){
				uni.navigateTo({
					url:`/pages/proxy/proxy?proxyData=${encodeURIComponent(JSON.stringify(res))}&user_id=${this.user_id}`
				})
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
				this.getProxyData()	
			},
			getMonth(){
				//返回月份日期,2020-8-17
				return `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
			},
			getDay(){
				this.Day = `${new Date().getMonth()+1}月${new Date().getDate()}日`
			},
			getRankimgUrl(No){
				return `/static/image/NO_${No}.png`
			},
			getHour(){
				//取得当前时间的小时
			    let timeNow = new Date().getHours();
			    //判断当前时间是否在  06:00-18:00 之间
			    if(timeNow >= 6 && timeNow < 11){
			        this.Welcome_Message = '上午好'
			    }else if(timeNow >= 11 && timeNow < 13){
					this.Welcome_Message = '中午好'
				}else if(timeNow >= 13 && timeNow < 18){
					this.Welcome_Message = '下午好'
				}else if(timeNow >= 18 && timeNow < 22){
					this.Welcome_Message = '晚上好'
				}else{
					this.Welcome_Message = '夜深了,休息吧'
				}
			},
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
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			
			.top{
				width: 640rpx;
				height: 100rpx;
				position: absolute;
				top: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.left{
					width: 320rpx;
					height: 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;
					
					image{
						width: 60rpx;
						height: 60rpx;
					}
					.shop-amount{
						width: 140rpx;
						height: 70rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						position: relative;
						left: -30rpx;
						
						.title{
							font-size:24rpx;
							font-family:PingFang SC;
							font-weight:600;
							color:rgba(241,241,241,1);
							line-height:12rpx;
						}
						.amount{
							font-size:30rpx;
							font-family:PingFang SC;
							font-weight:600;
							color:rgba(241,241,241,1);
							line-height:12rpx;
						}
					}
				}
				
				.right{
					width: 320rpx;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					
					text{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:600;
						color:rgba(241,241,241,1);
						line-height:12rpx;
					}
				}
			}
			
			.bottom{
				width: 670rpx;
				height: 215rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				bottom: 15rpx;
				
				.left,.right{
					width: 335rpx;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					position: relative;
					left: 20rpx;
					
					.top-cont{
						width: 300rpx;
						height: 60rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:600;
						color:rgba(102,102,102,1);
						line-height:12rpx;
					}
					
					.amount{
						width: 300rpx;
						height: 60rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						
						text{
							font-size:42rpx;
							font-family:PingFang SC;
							font-weight:600;
							color:rgba(24,24,24,1);
							line-height:12rpx;
						}
					}
					
					.tips{
						width: 300rpx;
						height: 35rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						text{
							font-size:24rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(153,153,153,1);
							line-height:12rpx;
						}
					}
				}
			}
			
			image{
				width: 690rpx;
				height: 330rpx;
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
			flex-wrap: wrap;
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
