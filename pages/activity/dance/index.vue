<template>
	<view class="main">
		<view class="top-title">
			<u-navbar  title="舞动全城,秀出你的美" :background="background" title-width="350" back-icon-color="#ffffff" title-color="#ffffff"></u-navbar>
		</view>
		
		<view class="right-content">
			<view class="activity-rule">
				<text>活动规则</text>
			</view>
			<image class="music-img" src="../../../static/image/music.png"></image>
		</view>
		
		<view class="background-img">
			<image :src="DanceDetails.MSS_ImgUrl"></image>
		</view>
		
		<view class="dance-middle-box">
			<view class="dance-content">
				<view class="bonus-box">
					<view class="bonus-box-top">
						<image src="../../../static/image/bonus-box-img.png" class="bonus-box-img"></image>
						<text class="awarded-amount">团队奖{{DanceDetails.MSS_BusinessPrizeNums}}名，个人奖{{DanceDetails.MSS_ProductPrizeNums}}名</text>
					</view>
					<view class="bonus-box-bottom">
						<view class="prize-pool-amount">
							<text class="prize-pool-amount-text">奖金</text>
							
							<view class="prize-pool-amount-number" v-for="(item,index) in prize_Amount" :key="index">
								<view class="middle-amount">{{item}}</view>
							</view>
							
							<text class="prize-pool-amount-text">元</text>
						</view>
						<text>——— 瓜分金额根据打赏次数递增 ———</text>
					</view>	
				</view>
			
				<view class="countdown-box">
					<view class="countdown-middle">
						<view class="countdown-middle-time">
							<view class="time">{{countdownDetails.leftd}}</view>
							<text class="text">天</text>
							<view class="time">{{countdownDetails.lefth}}</view>
							<text class="text">时</text>
							<view class="time">{{countdownDetails.leftm}}</view>
							<text class="text">分</text>
							<view class="time">{{countdownDetails.lefts}}</view>
						</view>
						<view class="countdown-tips">投票活动进行中</view>
					</view>
				</view>
			
				<view class="seek-box">
					<view class="seek-middle">
						<view class="seek-middle-left">
							<u-icon name="search" size="36"></u-icon>
							<input type="text" placeholder="搜索团队名称或选手名称" v-model="player_name" />
						</view>
						
						<view class="seek-middle-right">
							<text>搜索</text>
						</view>
					</view>
				</view>
			
				<view class="rank-box">
					<view class="rank-top-select">
						<view class="rank-top-select-left" @click="cur = 0" :class="cur==0 ? 'selected':''">团队排行榜</view>
						<view class="rank-top-select-right" @click="cur = 1" :class="cur==1 ? 'selected':''">选手排行榜</view>
					</view>
					
					<view class="rank-middle" v-if="cur == 0" v-for="(item,index) in TeamDetails" :key="index" @click="toTeam(item.BusinessID)">
						<view class="player-box">
							<view class="ribbon">{{index+1}}</view>							
							<image :src="item.ImgUrl" ></image>
							<view class="player-content">
								<text class="player-name">{{item.BusinessName}}</text>
								<view class="Reward">
									<u-button ripple="true" ripple-bg-color="#dcdcdc" :custom-style="customStyle">打赏</u-button>
								</view>
								<text class="votes">{{item.MSSBR_Count}}票</text>
							</view>
						</view>
					</view>
					
					<view class="rank-middle" v-else v-for="(item,index1) in PersonalDetails" :key="index1" @click="toPersonal(item.ProductID,item.BusinessID,item.BP_Name)">
						<view class="player-box">
							<view class="ribbon">{{index1+1}}</view>							
							<image :src="item.BP_ImgUrl" ></image>
							<view class="player-content">
								<text class="player-name">{{item.BP_Name}}</text>
								<view class="Reward">
									<u-button :custom-style="customStyle" @click="toPersonal(item.ProductID,item.BusinessID,item.BP_Name)">打赏</u-button>
								</view>
								<text class="votes">{{item.MSSPR_Count }}票</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	
		<view class="bottom-navt-box">
			<view class="bottom-navt-content" >
				<view class="middle">
					<text class="amount-top">{{DanceDetails.MSS_BusinessNums}}</text>
					<text class="amount-bottom">参数团队(个)</text>
				</view> 
			</view>
			
			<view class="bottom-navt-content frame">
				<view class="middle">
					<text class="amount-top">{{DanceDetails.MSS_ProductNums}}</text>
					<text class="amount-bottom">参数选手(人)</text>
				</view>
			</view>
			
			<view class="bottom-navt-content" >
				<view class="middle">
					<text class="amount-top">{{DanceDetails.MSS_TotalCount}}</text>
					<text class="amount-bottom">打赏次数(次)</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {request} from '@/api/request.js'
	export default {
		data() {
			return {
				//顶部背景
				background:{
					backgroundColor: '#FB5C6A',
				},
				//按钮样式
				customStyle:{
					backgroundColor:'#FA5E6A',
					color:'#FFF'
				},
				cur:0,
				//活动详情数据
				DanceDetails:[],
				//奖池金额
				prize_Amount:0,
				//活动期数
				MSS_id:0,
				//倒计时
				countdownDetails:{},
				//团队数据
				TeamDetails:[],
				TeamIndex:1,
				//个人数据
				PersonalDetails:[],
				PersonalIndex:1
			};
		},
		onLoad() {
			this.getDanceDetails()
				
			//倒计时定时器
			setInterval(()=>{
				this.countdown()
			},1000)
		},
		methods:{
			getDanceDetails(){
				request('API_GetInfo_SpecialSubject_Reward',{MSS_id:0}).then(res=>{
					this.DanceDetails = res
					this.MSS_id = res.MSS_id
					let prize_Amount = Math.ceil(res.MSS_TotalAmount).toString() 
					this.prize_Amount = prize_Amount
				
					this.getTeamDetails(res.MSS_id);
					this.getPersonalDetails(res.MSS_id);
				})
			},
			getTeamDetails(MSS_id){
				request('API_GetList_SpecialSubject_BusinessRanking_Reward',{MSS_id:MSS_id,Keywords:'',pageSize:10,index:this.TeamIndex}).then(res=>{
					this.TeamDetails = res
				})
			},
			getPersonalDetails(MSS_id){
				request('API_GetList_SpecialSubject_ProductRanking_Reward',{MSS_id:MSS_id,BusinessID:0,Keywords:'',pageSize:10,index:this.PersonalIndex}).then(res=>{
					this.PersonalDetails = res
				})
			},
			toPersonal(ProductID,BP_Name){
				uni.navigateTo({
					url:`/pages/activity/dance/personal?ProductID=${ProductID}&BP_Name=${BP_Name}&MSS_id=${this.MSS_id}`
				})
			},
			//团队详情页
			toTeam(BusinessID){
				uni.navigateTo({
					url:`/pages/activity/dance/team?BusinessID=${BusinessID}&MSS_id=${this.MSS_id}`
				})
			},
			countdown(){
				//获得当前时间
				const nowtime = new Date();
				//结束时间
				const endtime = new Date(this.DanceDetails.MSS_CloseTime)
				
				const lefttime = endtime.getTime() - nowtime.getTime();  //距离结束时间的毫秒数
				let	leftd = Math.floor(lefttime/(1000*60*60*24));  //计算天数
				let	lefth = Math.floor(lefttime/(1000*60*60)%24);  //计算小时数
				let	leftm = Math.floor(lefttime/(1000*60)%60);  //计算分钟数
				let	lefts = Math.floor(lefttime/1000%60);  //计算秒数				
				
				this.countdownDetails = {leftd:leftd,lefth:lefth,leftm:leftm,lefts:lefts}
			},
		}
	}
</script>

<style lang="less">
page{
	background-color: #FB5C6A;
}
.main{
	position: relative;
	.right-content{
		width: 65rpx;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		right: 0;
		top: 230rpx;
		z-index: 119;
		
		.activity-rule{
			width: 60rpx;
			height: 210rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #EE3E60;
			border-radius: 20rpx 0rpx 0rpx 20rpx;
			text{
				width: 30rpx;
				height: 135rpx;
				font-size: 26rpx;
				color: #FFFFFF;
			}
		}
		
		.music-img{
			width: 40rpx;
			height: 40rpx;
			
			@keyframes rotation {
				from {
					transform: rotate(0deg);
				}
				to {
					transform: rotate(360deg);
				}
			}
			transform: rotate(360deg);
			animation: rotation 5s linear infinite;
		}
	}
	
	.background-img{
		width: 750rpx;
		height: 750rpx;
		image{
			width: 750rpx;
			height: 750rpx;
		}
	}

	.dance-middle-box{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.dance-content{
			width: 690rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;
			position: relative;
			top: -350rpx;
			
			
			.bonus-box{
				width: 100%;
				height: 305rpx;
				padding-top: 10rpx;
				border-bottom: 20rpx solid #f2f2f2;
				
				.bonus-box-top{
					width: 100%;
					height: 100rpx;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					
					.bonus-box-img{
						width: 660rpx;
						height: 100rpx;
					}
					
					.awarded-amount{
						position: absolute;
						top: 30rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #FFFFFF;
					}
				}
			
				.bonus-box-bottom{
					width: 100%;
					height: 180rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
					.prize-pool-amount{
						width: 660rpx;
						height: 120rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						
						.prize-pool-amount-text{
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: 600;
							color: #E32822;
						}
						.prize-pool-amount-number{
							height: 85rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							flex-direction: row;
							background-color: #FF7274;
							border-radius: 10rpx;
							
							.middle-amount{
								width: 60rpx;
								height: 70rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								background-color: #FFFFFF;
								font-size: 58rpx;
								font-family: PingFang SC;
								font-weight: 600;
								color: #E32822;
								border-radius: 10rpx;
								margin: 7rpx;
							}
						}
					}
					text{
						font-family: Adobe Heiti Std;
						font-weight: normal;
						margin-left: 20rpx;
						margin-right: 20rpx;
						color: #EE3E60;
						font-size: 24rpx;
					}
				}
			}
		
			.countdown-box{
				width: 100%;
				height: 155rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 20rpx solid #f2f2f2;
				
				.countdown-middle{
					width: 350rpx;
					height: 110rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
					.countdown-middle-time{
						width: 350rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						
						.time{
							width: 50rpx;
							height: 50rpx;
							background: #FC3644;
							font-size: 32rpx;
							font-family: SourceHanSansCN;
							font-weight: 500;
							color: #FFFFFF;
							line-height: 60rpx;
							text-align: center;
							line-height: 50rpx;
						}
						.text{
							width: 50rpx;
							height: 50rpx;
							font-size: 32rpx;
							font-family: SourceHanSansCN;
							font-weight: 500;
							color: #343434;
							line-height: 60rpx;
							text-align: center;
							line-height: 50rpx;
						}
					}
				
					.countdown-tips{
						width: 200rpx;
						height: 30rpx;
						font-size: 28rpx;
						font-family: SourceHanSansCN;
						font-weight: 400;
						color: #333333;
						margin-top: 15rpx;
					}
				}
			}
			
			.seek-box{
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 20rpx solid #f2f2f2;
				
				.seek-middle{
					width: 635rpx; 
					height: 60rpx;
					border:1rpx solid #FC3644;
					border-radius: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.seek-middle-left{
						width: 350rpx;
						height: 32rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-left: 20rpx;
					}
					
					.seek-middle-right{
						width: 150rpx;
						height: 100%;
						background-color: #FF7174;
						text-align: center;
						line-height: 60rpx;
						border-top-right-radius: 15rpx;
						border-bottom-right-radius: 20rpx;
						
						text{
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
						}
					}
				}
			}
		
			.rank-box{
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				.rank-top-select{
					width: 630rpx;
					height: 150rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.rank-top-select-left,.rank-top-select-right{
						width: 300rpx;
						height: 120rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 15rpx;
						-webkit-border-radius: 15rpx;
						-moz-border-radius: 15rpx;
						background-color: #F9ACB2;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #FFFFFF;
					}
					
					.selected{
						background-color: #F13C61;
					}
				}
			
				.rank-middle{
					width: 630rpx;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					margin: 20rpx 0;
					
					.player-box{
						width: 300rpx;
						height: 500rpx;
						border-radius: 10rpx;
						border: 2rpx solid #FF7172;
						margin-bottom: 30rpx;
						display: flex;
						flex-direction: column;
						justify-content: flex-start;
						align-items: center;
						padding: 10rpx;
						position: relative;
						
						.ribbon {
							-webkit-box-sizing: content-box;
							-moz-box-sizing: content-box;
							box-sizing: content-box;
							width: 0;
							height: 40rpx;
							border: 20rpx solid #FA5E6A;
							border-top: 0 solid;
							border-bottom: 15rpx solid rgba(0,0,0,0);
							font: normal 100%/normal Arial, Helvetica, sans-serif;
							color: #FFFFFF;
							-o-text-overflow: clip;
							text-overflow: clip;
							position: absolute;
							left: 30rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}
						
						image{
							width: 280rpx;
							height: 280rpx;
							border-radius: 10px;
						}
						
						.player-content{
							width: 200rpx;
							height: 180rpx;
							margin-top: 35rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							align-items: center;r
							
							.player-name{
								font-size: 30rpx;
								font-family: PingFang SC;
								font-weight: 600;
								color: #333333;
								line-height: 38rpx;
							}
							
							.Reward{
								width: 200rpx;
								height: 80rpx;
							}
							
							.votes{
								font-size: 30rpx;
								font-family: SourceHanSansCN;
								font-weight: 500;
								color: #FF1A1B;
								line-height: 38rpx;
							}
						}
					}
				}
			}
		}
	}

	.bottom-navt-box{
		width: 100%;
		height: 130rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		z-index: 165;
		border-top: 1rpx solid #e8e8e8;
		
		.bottom-navt-content{
			width: 250rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.middle{
				width: 160rpx;
				height: 80rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				
				.amount-top{
					font-size: 40rpx;
					font-family: SourceHanSansCN;
					font-weight: 400;
					color: #FF2A3A;
				}
				
				.amount-bottom{
					font-size: 24rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #343434;
				}
			}			
		}
		
		.frame{
			border-left: 1rpx solid #D8D8D8;
			border-right: 1rpx solid #D8D8D8;
		}
	}
}
</style>
