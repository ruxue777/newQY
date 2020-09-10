<template>
	<view class="main">
		<view class="top-navigation">
			<view class="left-cont" @click="back">
				<text>返回</text>
			</view>
			<text>{{TeamDetails.BusinessName}}队</text>
		</view>
		
		<view class="top-image-box">
			<image :src="TeamDetails.ImgUrl"></image>
			<view class="team-description">
				<text class="team-name">{{TeamDetails.BusinessName}}</text>
				
				<view class="team-details">{{TeamDetails.BusinessDesc}}</view>	
			</view>
		</view>
		
		<view class="amount-box">
			<view class="left-amount-box">
				<view class="content-box">
					<view class="top" style="color: #FB5C69;">
						{{TeamRank.MSSBR_Count}}
						<text>次</text>
					</view>
					<text class="bottom">打赏次数</text>
				</view>
			</view>
			<view class="right-rank-box">
				<view class="content-box">
					<view class="top">
						{{TeamRank.OrderID}}
						<text>名</text>
					</view>
					<text class="bottom">团队排名</text>
				</view>
			</view>
		</view>
	
		<view class="teamdetails-box">
			<view class="TeamDetails-middle">
				<view class="select-box">
					<view class="left-personal" style="border-right: 1rpx solid #f1f1f1;">
						<view class="content" @click="cur = 0" :class="cur==0 ? 'unselect':''">
							参数队员
						</view>
					</view>
					<view class="right-team">
						<view class="content" @click="cur = 1" :class="cur==1 ? 'unselect':''">
							团队展示
						</view>
					</view>
				</view>
			
				<view v-if="cur == 0">
					<view class="top-three-box">
						<view class="title">
							<text>选手巅峰榜</text>
						</view>
						<view class="middle-content">
							<view class="left-one">
								<view class="middle">
									<view class="ribbon">1</view>	
									<image :src="top_Three[0].BP_ImgUrl"></image>
									<view class="votes-box">
										<text>{{top_Three[0].BP_Name}}</text>
										<text>{{top_Three[0].MSSPR_Count}}票</text>
									</view>
								</view>
							</view>
							
							<view class="right-two-three">
								<view class="two-three-box" >
									<view class="item-cont" v-if="!top_Three[1].data">
										<view class="ribbon">2</view>
										<image :src="top_Three[1].BP_ImgUrl"></image>
										<view class="votes-box">
											<text>{{top_Three[1].BP_Name}}</text>
											<text>{{top_Three[1].MSSPR_Count}}票</text>
										</view>
									</view>
									
									<u-empty v-else text="虚位以待" mode="list" icon-size="64"></u-empty>
								</view>
								
								<view class="two-three-box" >
									<view class="item-cont" v-if="!top_Three[2].data">
										<view class="ribbon">3</view>
										<image :src="top_Three[2].BP_ImgUrl"></image>
										<view class="votes-box">
											<text>{{top_Three[2].BP_Name}}</text>
											<text>{{top_Three[2].MSSPR_Count}}票</text>
										</view>
									</view>
									
									<u-empty v-else text="虚位以待" mode="list" icon-size="64"></u-empty>
								</view>
							</view>
						</view>
					</view>
				
					<view class="others-box">
						<view class="title">
							<text>其他队员:</text>
						</view>
						
						<view class="personal-box">
							<view class="personal-item">
								<view class="top-image">
									<view class="ribbon">3</view>
									<image src="../../../static/image/img1.jpg"></image>
								</view>
								
								<view class="team-box">
									<text class="team-name">团队2</text>
									<view class="button">
										<u-button ripple="true" ripple-bg-color="#dcdcdc" :custom-style="customStyle">打赏</u-button>
									</view>
									<text class="votes-amount">8979票</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			
				<view v-else>
					<u-parse :html="TeamDetails.BusinessContent"></u-parse>
				</view>
						
			</view>			
		</view>
	</view>
</template>

<script>
import {request} from '@/api/request.js';
	export default {
		data() {
			return {
				BusinessID:'',
				MSS_id:'',
				//团队详情数据
				TeamDetails:[],
				cur:0,
				//按钮样式
				customStyle:{
					backgroundColor:'#FA5E6A',
					color:'#FFF'
				},
				//团队排名
				TeamRank:[],
				//团队内排名
				TeamRanking:[],
				//前三数据
				top_Three:[]
			};
		},
		onLoad(e) {
			this.BusinessID = e.BusinessID
			this.MSS_id = e.MSS_id
			this.getTeamDetails()
			this.getTeamRank();
			this.getTeamRanking()
		},
		methods:{
			getTeamDetails(){
				request('API_GetInfo_BusinessSearch',{BusinessID:this.BusinessID,Longitude:114,Latitude:25}).then(res=>{
					this.TeamDetails = res
				})
			},
			getTeamRank(){
				request('API_GetInfo_SpecialSubject_BusinessRanking_Reward',{MSS_id:this.MSS_id,BusinessID:this.BusinessID}).then(res=>{
					this.TeamRank = res
				})
			},
			getTeamRanking(){
				request('API_GetList_SpecialSubject_ProductRanking_Reward',{MSS_id:this.MSS_id,BusinessID:this.BusinessID,Keywords:'',pageSize:10,index:1}).then(res=>{
					//this.TeamRanking = res
					
					let topThreeArray = []
					
					let length = res.length;
					
					const data = {data:'nullData'}
					
					if(length<3 && length==1){
						topThreeArray.push(res[0]);
						topThreeArray.push(data,data);
					}else if(length<3 && length==2){
						topThreeArray.push(res[0]);
						topThreeArray.push(data);
					}else{
						topThreeArray.push(res[0],res[1],res[2]);
					}
					
					this.top_Three = topThreeArray
					// for(let i = 0;i<2;i++){
						
					// }
					
				})
			},
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
page{
	background-color: #FA5E6A;
}	
.main{
	.top-navigation{
		width: 100%;
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		z-index: 199;
		
		.left-cont{
			width: 100rpx;
			height: 35rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 36rpx;
			color: #FFFFFF;
			position: absolute;
			left: 40rpx;
		}
		text{
			font-size: 36rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #FFFFFF;
		}
	}

	.top-image-box{
		width: 100%;
		height: 750rpx;
		position: relative;
		background-color: #FFFFFF;
		
		image{
			width: 100%;
			height: 750rpx;
		}
		
		.team-description{
			width: 100%;
			height: 170rpx;
			position: absolute;
			bottom: 0;
			background-color: rgba(0,0,0,0.3);
			
			.team-name{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 38rpx;
				position: relative;
				left: 30rpx;
				top: 20rpx;
			}
			
			.team-details{
				width: 690rpx;
				height: 60rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				position: relative;
				left: 30rpx;
				top: 25rpx;
				overflow:hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
	
	.amount-box{
		width: 100%;
		height: 130rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		
		.left-amount-box,.right-rank-box{
			width: 375rpx;
			height: 130rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.content-box{
				width: 155rpx;
				height: 100rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				
				.top{
					height: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 42rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #000000;
					
					text{
						font-size: 32rpx;
					}
				}
				
				.bottom{		
					font-size: 24rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #808080;
				}
			}
		}
	}
	
	.teamdetails-box{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #F95C69;
		
		.TeamDetails-middle{
			width: 690rpx;
			margin: 30rpx 25rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;		
			border-radius: 20rpx;
			background-color: #FFFFFF;
			
			.select-box{
				width: 100%;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.left-personal,.right-team{
					width: 315rpx;
					height: 70%;
					display: flex;
					justify-content: center;
					align-items: center;	
					
					.content{
						width: 280rpx;
						height: 60rpx;
						display: flex;
						justify-content: center;
						align-items: center;	
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 38rpx;
					}
					
					.unselect{
						border-bottom: 3rpx solid #F75B68;
					}			
				}
			}
		
			.top-three-box{
				width: 690rpx;
				height: 360rpx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				
				.title{
					width: 100%;
					height: 60rpx;
					position: relative;
					
					text{
						position: absolute;
						left: 30rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 38rpx;
					}
				}
				
				.middle-content{
					width: 100%;
					height: 300rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					
					.left-one{
						width: 290rpx;
						height: 300rpx;
						border: 5rpx solid #FA5E6A;
						border-radius: 10rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						box-shadow:0px 0px 10px #d4d4d4;
						
						.middle{
							width: 270rpx;
							height: 280rpx;
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
								width: 270rpx;
								height: 280rpx;
								border-radius: 10rpx;
							}
							
							.votes-box{
								width: 270rpx;
								height: 70rpx;
								position: absolute;
								bottom: 0;
								background-color: rgba(0,0,0,0.3);
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: space-around;							
								font-size: 26rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #FFFFFF;
							}
						}
					}
					
					.right-two-three{
						width: 290rpx;
						height: 300rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						
						.two-three-box{
							width: 290rpx;
							height: 140rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							border: 5rpx solid #FA5E6A;
							box-shadow:0px 0px 10px #d4d4d4;
							border-radius: 10rpx;
							
							.item-cont{
								width: 280rpx;
								height: 130rpx;
								position: relative;
								
								image{
									width: 280rpx;
									height: 130rpx;
									border-radius: 10rpx;
								}
								
								.ribbon {
									-webkit-box-sizing: content-box;
									-moz-box-sizing: content-box;
									box-sizing: content-box;
									width: 0;
									height: 28rpx;
									border: 14rpx solid #FA5E6A;
									border-top: 0 solid;
									border-bottom: 10rpx solid rgba(0,0,0,0);
									font: normal 100%/normal Arial, Helvetica, sans-serif;
									color: #FFFFFF;
									-o-text-overflow: clip;
									text-overflow: clip;
									position: absolute;
									left: 20rpx;
									display: flex;
									justify-content: center;
									align-items: center;									
									font-size: 20rpx;
								}
								
								.votes-box{
									width: 100%;
									height: 65rpx;
									position: absolute;
									bottom: 0;
									background-color: rgba(0,0,0,0.3);
									display: flex;
									flex-direction: column;
									justify-content: space-around;							
									font-size: 24rpx;
									font-family: PingFang SC;
									font-weight: 500;
									color: #FFFFFF;
									text{
										margin-left: 10rpx;
									}
								}
							}
						}
					}
				}
			}
		
			.others-box{
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				.title{
					width: 100%;
					height: 60rpx;
					position: relative;
					
					text{
						position: absolute;
						top: 10rpx;
						left: 30rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 38rpx;
					}
				}
			
				.personal-box{
					width: 630rpx;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					
					.personal-item{
						width: 300rpx;
						height: 510rpx;
						border: 5rpx solid #FA5E6A;
						border-radius: 10rpx;
						margin-bottom: 40rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						
						.top-image{
							width: 100%;
							height: 300rpx;
							display: flex;
							justify-content: center;
							align-items: center;
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
								top: 0;
								left: 20rpx;
								display: flex;
								justify-content: center;
								align-items: center;									
								font-size: 20rpx;
							}
							
							image{
								width: 280rpx;
								height: 280rpx;
								border-radius: 10rpx;
							}
						}
						
						.team-box{
							width: 100%;
							height: 210rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							align-items: center;
							
							.team-name{
								font-size: 30rpx;
								font-family: PingFang SC;
								font-weight: 600;
								color: #333333;
							}
							
							.button{
								width: 200rpx;
								height: 60rpx;
							}
							
							.votes-amount{
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
}
</style>
