<template>
	<view class="main">
		<view class="top-title">
			<u-navbar  title="我的项目"></u-navbar>
		</view>
		
		<view class="middle">
			<view class="project-content" v-for="(item,index) in ProjectDetails" :key="index">
				<view class="top">
					<view class="project-name">
						<u-icon name="chat-fill" color="#fff"></u-icon>
						<text class="name">{{item.BusinessName}}</text>
					</view>
					
					<view class="project-fill">
						<view class="project-fill-top">
							<view>
								<u-icon name="gift" color="#fff"></u-icon>
								<text >收益总金额 (已自动转入总收益)</text>
							</view>
							<view >
								<u-icon name="gift" color="#fff"></u-icon>
								<text>昨日收益</text>
							</view>
						</view>
						<view class="project-fill-bottom">
							<text class="lump-sum">{{item.TotalProfitAmount}}</text>
							<text class="yesterday">{{item.BeforeDayProfitAmount}}</text>
						</view>
					</view>
				</view>
				<view class="bottom">
					<u-icon name="gift" color="#fff"></u-icon>
					<text>会员权益(份)</text>
					<text class="amount">{{item.BonusAmount}}</text>
					<text class="give-away" @click="Donate(item.id,item.BusinessName,item.BonusAmount)">转赠</text>
				</view>
			</view>
		</view>
	
	<!-- 反馈组件 -->
	<u-toast ref="uToast" />
	<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" ></u-loadmore>
	<u-popup v-model="show" mode="bottom" border-radius="15" closeable="true" close-icon-pos="top-left">
		<view class="donate-content">
			<view class="middle">
				<text class="tips">权益转赠为个人行为,请核对转赠人账号,避免造成财产损失</text>
				<view class="pop-project-name">项目名称:{{BusinessName}}</view>
				<view class="pop-project-amount">
					<text>可转赠权益数(份)</text>
					<text class="amount">{{BonusAmount}}</text>
				</view>
				<view class="input-box">
					<input placeholder="输入转赠份数" v-model="amount"/>
					<input placeholder="转赠人账号(用户名或手机号)" v-model="account"/>
					<input placeholder="输入支付密码" type="password" v-model="password"/>
				</view>
				
				<view class="button">
					<u-button type="primary" @click="income_Transfer">确认转赠</u-button>
				</view>
			</view>
		</view>
	</u-popup>
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		data() {
			return {
				show:false,
				user_id:'',
				Index:1,
				ProjectDetails:[],
				loadStatus: 'loadmore',
				amount:'',
				account:'',
				password:'',
				//分红权id
				id:'',
				BusinessName:'',
				BonusAmount:''
			};
		},
		onLoad(e) {
			this.user_id = e.user_id
			this.getProjectDetails()
		},
		onReachBottom() {
			if(this.ProjectDetails.length<this.Index*10){
				this.loadStatus = 'nomore';
				return;
			}else{
				this.Index++;
				this.loadStatus = 'loading';
				// 模拟数据加载效果
				setTimeout(() => {
					this.getProjectDetails();
					this.loadStatus = 'loadmore';
				}, 1000);
			}
		},
		methods:{
			Donate(id,BusinessName,BonusAmount){
				this.id = id
				this.BusinessName = BusinessName
				this.BonusAmount = BonusAmount
				this.show = true
			},
			income_Transfer(){
				if(this.account.length != 0 && this.amount.length!=0 && this.password.length != 0){
					request('API_AddTransferBonus',{user_id:this.user_id,PayPwd:this.password,UB_id:this.id,Bonus:this.amount,to_user_name:this.account}).then(res=>{
						if(res.result_code === 'SUCCESS'){
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'success',
							})
							this.show = false
							this.Index = 1
							this.ProjectDetails = []
							this.getProjectDetails()
						}else{
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'error',
							})
							return
						}	
					})
				}else{
					this.$refs.uToast.show({
						title: `请完善信息`,
						type: 'error',
					})
				}
			},
			getProjectDetails(callBack){
				request('API_GetList_UserBusinessBonus',{user_id:this.user_id,pageSize:10,index:this.Index}).then(res=>{
					if(res.length<10){
						this.loadStatus = 'nomore'
					}
					
					this.ProjectDetails = [...this.ProjectDetails,...res]
									
					callBack && callBack()
				})
			}
		}
	}
</script>

<style lang="less">
.main{
	.middle{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		
		.project-content{
			width: 100%;
			height: 240rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #96e4ca;
			margin-top: 20rpx;
			
			.top{
				width: 100%;
				height: 180rpx;
				border-bottom: 1rpx solid #FFFFFF;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				.project-name{
					width: 710rpx;
					height: 60rpx;
					display: flex;
					align-items: center;
					font-size: 34rpx;
					color: #FFFFFF;
				}
				
				.project-fill{
					width: 710rpx;
					height: 120rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
					.project-fill-top{
						width: 710rpx;
						height: 60rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 32rpx;
						color: #FFFFFF;
					}
					
					.project-fill-bottom{
						width: 710rpx;
						height: 60rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 36rpx;
						color: #FFFFFF;
					}
				}
			}
			.bottom{
				width: 100%;
				height: 60rpx;
				padding-left: 20rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				
				.give-away{
					margin-left: 20rpx;
					color: yellow;
				}
			}
		}
	}
	
	.donate-content{
		width: 100%;
		height: 1200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.middle{
			width: 690rpx;
			height: 1100rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			.tips{
				font-size: 26rpx;
				color: #afafaf;
				margin-bottom: 20rpx;
			}
			
			.pop-project-name{
				width: 100%;
				height: 100rpx;
				font-size: 38rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 20rpx;
			}
			
			.pop-project-amount{
				width: 100%;
				height: 100rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 20rpx;
				
				.amount{
					font-size: 34rpx;
					color: #000;
				}
				
				text{
					font-size: 24rpx;
					color: #afafaf;
				}
			}
			
			.input-box{
				width: 100%;
				height: 400rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align:center;
				vertical-align:middle;
				
				input{
					width: 100%;
					height: 100rpx;
					border: 1rpx solid #EEEEEE;
					border-radius: 20rpx;
					margin-bottom: 10rpx;
				}
			}
			
			.button{
				width: 100%;
				height: 80rpx;
			}
		}
	}
}
</style>
