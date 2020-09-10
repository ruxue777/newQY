<template>
	<view class="main">
		<view class="top">
			<image class="background-img" src="../../static/image/background-image.png"></image>
			
			<view class="userInfo">			
				<view class="userInfo-content">
					<view class="userInfo-left">
						<view class="user-avatar">
							<image v-if="userInfo != ''" :src="userInfo.WM_headimgurl"></image>
							<image v-else src="../../static/image/img4.jpg" @click="tosignIn"></image>
						</view>
						
						<view class="user-cont" v-if="userInfo != ''">
							<view class="user-name">{{userInfo.nick_name}}</view>
							<view class="user-level">{{userInfo.Grade}}</view>
							<view class="invitation-code" >
								<text>邀请码:{{userInfo.user_name}}</text>
								<view class="invitation-button" @click="copy">复制</view>
							</view>
						</view>
					
						<view class="notLogin" v-else>
							<view class="title">请点击头像登录哦~</view>
						</view>
					
					</view>
					
					<view class="userInfo-right">
						<view class="userinfo-cont">
							个人资料 >
						</view>
						
						<view class="user-invite" @click="getWxappQR">
							<image src="../../static/image/wxqr.png"></image>
							<text>邀请好友</text>
						</view>
					</view>
				</view>				
			</view>
			
			<view class="navigation-bar">
				<view class="navigation-bar-middle">
					<view class="topbar-left">
						<image class="v-img" src="../../static/image/v.png"></image>
						<text class="left-title">{{userInfo.Grade}}</text>
					</view>
					<view class="topbar-middle">
						<text class="title">会员尊享权益</text>
					</view>
					<view class="topbar-right">
						<text class="title">立即查看</text>
					</view>
				</view>
			</view> 
		</view>
		
		<view class="common">
			<view class="middle">
				<view class="top-title">
					<text>常用功能</text>
				</view>
				<view class="bottom-cont">
					<view class="commom-cont" @click="toShopservice">
						<image class="icon" src="../../static/image/shopService.png"></image>
						<text class="common-name">商家服务</text>
					</view>
					<view class="commom-cont" @click="toRecharge">
						<image class="icon" src="../../static/image/withdrawal.png"></image>
						<text class="common-name">提现申请</text>
					</view>
					<view class="commom-cont" @click="toRecommend">
						<image class="icon" src="../../static/image/myPartner.png"></image>
						<text class="common-name">我的邀请</text>
					</view>
					<view class="commom-cont" @click="toWithdraw">
						<image class="icon" src="../../static/image/user_Transfer.png"></image>
						<text class="common-name">转账</text>
					</view>
					<view class="commom-cont" @click="getWxappQR">
						<image class="icon" src="../../static/image/myQRcode.png"></image>
						<text class="common-name">推荐码</text>
					</view>
				</view>
			</view>
		</view>	
		
		<view class="accout">
			<view class="middle">
				<view class="top-title">
					<text>我的账户</text>
				</view>
				
				<view class="bottom-accout">
					
					<view class="user-accout">
						<view class="left-allowance" @click="toAllowance">
							<view class="left-cont">
								<view class="accout-name">津贴账户</view>
								<view class="accout-amount">{{AccoutAmount.ProfitAmount}}</view>
							</view>
							<view class="right-cont">
								<!-- <text class="today-earning">+13211.8</text> -->
							</view>
						</view>
						
						<view class="right-subsidy" @click="toSubsidy">
							<view class="left-cont">
								<view class="accout-name">补贴账户</view>
								<view class="accout-amount newColor">{{AccoutAmount.RechargeAmount}}</view>
							</view>
							<view class="right-cont">
								<!-- <text class="today-earning">+13211.8</text> -->
							</view>
						</view>
					</view>
					
					<view class="shop-accout">
						<view class="left-cont" v-if="userInfo.IsBusinessMaster == 1" @click="toCredit">
							<view class="accout-name">商家账户</view>
							<view class="accout-amount">{{AccoutAmount.CreditAmount}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottom">
			<view class="bottom-common">
				<view class="top-title">
					<text>常用功能</text>
				</view>
				<view  class="bottom-middle">
					<view class="common-cont" @click="toBill">
						<image src="../../static/image/amount.png"></image>
						<text class="name">账单</text>
					</view>
					<view class="common-cont" @click="tobankCard">
						<image style="width: 80rpx;" src="../../static/image/bill.png"></image>
						<text class="name">银行卡管理</text>
					</view>
					<view class="common-cont" @click="toProject">
						<image src="../../static/image/project.png"></image>
						<text class="name">我的项目</text>
					</view>
					<view class="common-cont">
						<image style="width: 80rpx;" src="../../static/image/lotter.png"></image>
						<text class="name">我的卡券</text>
					</view>
					<view class="common-cont" @click="toProxy">
						<image src="../../static/image/proxy.png"></image>
						<text class="name">代理</text>
					</view>
					<view class="common-cont" @click="toSetting">
						<image src="../../static/image/setting.png"></image>
						<text class="name">设置</text>
					</view>
					
					<!-- 占位 -->
					<view class="common-cont"></view>
					<view class="common-cont"></view>
				</view>
			</view>
		</view>
		
		<!-- 反馈组件 -->
		<u-toast ref="uToast" />
		<u-popup v-model="show" mode="center" border-radius="14" >
			<view class="wxQRimg">
				<image class="qr-img" :src="WxappQR"></image>
			</view>
		</u-popup>
		<u-popup v-model="proxyShow" mode="bottom" border-radius="14" >
			<view class="proxy-popup">
				<view class="button" v-for="(item,index) in proxyData" :key="index">
					<u-button type="primary" @click="selectProxy(item.AeraID,item.Aera_Name)">{{item.Aera_Name}}</u-button>
				</view>
			</view>
		</u-popup>		
	</view>
</template>

<script>
import {request,wxRequest} from "@/api/request.js"	
	export default {
		data() {
			return {
				userInfo:'',
				AccoutAmount:[],
				show:false,
				proxyShow:false,
				proxyData:[],
				WxappQR:''
			}
		},
		onShow() {
			this.getUserInfo()
		},
		onPullDownRefresh() {
			this.getUserInfo()
					
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		methods:{
			getUserInfo(){
				const userInfo = uni.getStorageSync("globalUser");
				if(!userInfo){
					uni.showModal({
						title:'您还没有登录哦',
						confirmText:'去登录',
						success:(res=>{
							if(res.cancel)
							{
								return
							}
							else if(res.confirm)
							{
								uni.navigateTo({
									url:'./signIn'
								})
							}
						})
					})
				}
				else{
					this.userInfo = userInfo;
					this.getAccoutAmount()
				}
			},
			getAccoutAmount(){
				request('API_GetAccountAmount',{user_id:this.userInfo.user_id}).then(res=>{
					this.AccoutAmount = res
				})
			},
			getWxappQR(){
				// uni.request({
				// 	url:'https://api.xfgoo.com:60020/WxappService.asmx/API_GetWxappQR',
				// 	data:{
				// 		scene:this.userInfo.mobile,
				// 		page:"pages/user/signUp"
				// 	},
				// 	method:'GET',
				// 	header:{'content-type': 'application/x-www-form-urlencoded'},
				// }).then(res=>{
				// 	this.show = true
					
				// 	let data = res[1].data
				// 	this.WxappQR = data.result_content
				// })
				
				wxRequest('API_GetWxappQR',{scene:this.userInfo.mobile,page:"pages/user/signUp"}).then(res=>{
					this.show = true
					
					this.WxappQR = res.result_content
				})
			},
			toUserAccout(AccoutType){
				const userInfo = uni.getStorageSync("globalUser");
				if(!userInfo){
					uni.showModal({
						title:'您还没有登录哦',
						confirmText:'去登录',
						success:function(res){
							if(res.cancel)
							{
								return
							}
							else if(res.confirm)
							{
								uni.navigateTo({
									url:'./signIn'
								})
							}
						}
					})
				}
				else{
					switch(AccoutType){
						case "Bonus":
							uni.navigateTo({
								url:`/pages/userAccout/Bonus?user_id=${this.userInfo.user_id}&accoutAmount=${this.AccoutAmount.BonusAmount}`,
							})
						break;
						case "Integral":
							uni.navigateTo({
								url:`/pages/userAccout/Integral?user_id=${this.userInfo.user_id}&accoutAmount=${this.AccoutAmount.IntegralAmount}`,
							})
						break;
						case "Recharge":
							uni.navigateTo({
								url:`/pages/userAccout/Recharge?user_id=${this.userInfo.user_id}&accoutAmount=${this.AccoutAmount.RechargeAmount}`,
							})
						break;
						case "Profit":
							uni.navigateTo({
								url:`/pages/userAccout/Profit?user_id=${this.userInfo.user_id}&accoutAmount=${this.AccoutAmount.ProfitAmount}`,
							})
						break;
						case "Credit":
							uni.navigateTo({
								url:`/pages/userAccout/Credit?user_id=${this.userInfo.user_id}&accoutAmount=${this.AccoutAmount.CreditAmount}`,
							})
						break;
					}
				}
			},
			copy(){
				uni.setClipboardData({
					data:this.userInfo.user_name,
					success: () => {
						uni.showToast({
							title:'复制成功'
						})
					}
				})
			},
			selectProxy(AeraID,Aera_Name){
				if(Aera_Name.substr(Aera_Name.length-1,1) === '市'){
					request('API_GetList_Agent_Info',{user_id:this.userInfo.user_id,AeraID:AeraID,BusinessID:0}).then(res=>{
						this.$refs.uToast.show({
							title: `尊贵的${res[0].Aera_Name}代理,欢迎您`,
							type: 'success',
							url: `/pages/proxy/proxy?proxyData=${encodeURIComponent(JSON.stringify(res))}&user_id=${this.userInfo.user_id}`
						})
						return;
					})
				}
				else if(Aera_Name.substr(Aera_Name.length-1,1) === '省' ){
					request('API_GetList_Agent_Info',{user_id:this.userInfo.user_id,AeraID:AeraID,BusinessID:0}).then(res=>{
						this.$refs.uToast.show({
							title: `尊贵的${res[0].Aera_Name}代理,欢迎您`,
							type: 'success',
							url: `/pages/proxy/provinceProxy?proxyData=${encodeURIComponent(JSON.stringify(res))}&user_id=${this.userInfo.user_id}`
						})
						return;
					})
				}
				else if(Aera_Name.substr(Aera_Name.length-1,1) === '区' || '县'){
					this.$refs.uToast.show({
						title: `尊贵的${Aera_Name}代理,欢迎您`,
						type: 'success',
						url: `/pages/proxy/areaProxy?user_id=${this.userInfo.user_id}&AeraID=${AeraID}&Aera_Name=${Aera_Name}`
					})
					return;
				}
				
			},
			toSetting(){
				uni.navigateTo({
					url:'../userSetting/setting'
				})
			},
			tosignIn(){
				uni.navigateTo({
					url:'signIn'
				})
			},
			toRecharge(){
				uni.navigateTo({
					url:`/pages/transaction/Recharge?user_id=${this.userInfo.user_id}`
				})
			},
			toWithdraw(){
				uni.navigateTo({
					url:`/pages/transaction/Withdraw?user_id=${this.userInfo.user_id}`
				})
			},
			toRecommend(){
				uni.navigateTo({
					url:`/pages/user/recommend?user_id=${this.userInfo.user_id}`
				})
			},
			toBill(){
				uni.navigateTo({
					url:`/pages/user/userbill?user_id=${this.userInfo.user_id}`
				})
			},
			toProject(){
				uni.navigateTo({
					url:`/pages/user/project?user_id=${this.userInfo.user_id}`
				})
			},
			toAllowance(){
				uni.navigateTo({
					url:`/pages/userAccout/Allowance?AccountAmount=${encodeURIComponent(JSON.stringify(this.AccoutAmount))}`
				})
			},
			toSubsidy(){
				uni.navigateTo({
					url:`/pages/userAccout/Subsidy?AccountAmount=${encodeURIComponent(JSON.stringify(this.AccoutAmount))}`
				})
			},
			toCredit(){
				uni.navigateTo({
					url:`/pages/userAccout/Credit?user_id=${this.userInfo.user_id}&accoutAmount=${this.AccoutAmount.CreditAmount}`
				})
			},
			tobankCard(){
				uni.navigateTo({
					url:`../userSetting/bankCardSettings?user_id=${this.userInfo.user_id}`
				})
			},
			toProxy(){
				request('API_GetList_Agent_Info',{user_id:this.userInfo.user_id,AeraID:0,BusinessID:0}).then(res=>{
					if(res.length != 0){
						if(res.length ==1){
							//判断是市代理或者是区域代理
							let Area_Name = res[0].Aera_Name
							if(Area_Name.substr(Area_Name.length-1,1) === '市'){
								this.$refs.uToast.show({
									title: `尊贵的${res[0].Aera_Name}代理,欢迎您`,
									type: 'success',
									url: `/pages/proxy/proxy?proxyData=${encodeURIComponent(JSON.stringify(res))}&user_id=${this.userInfo.user_id}`
								})
								return;
							}
							else if(Area_Name.substr(Area_Name.length-1,1) === '省' ){
								request('API_GetList_Agent_Info',{user_id:this.userInfo.user_id,AeraID:AeraID,BusinessID:0}).then(result=>{
									this.$refs.uToast.show({
										title: `尊贵的${res[0].Area_Name}代理,欢迎您`,
										type: 'success',
										url: `/pages/proxy/provinceProxy?proxyData=${encodeURIComponent(JSON.stringify(result))}&user_id=${this.userInfo.user_id}`
									})
									return;
								})
							}
							else if(Area_Name.substr(Area_Name.length-1,1) === '区' || '县'){
								this.$refs.uToast.show({
									title: `尊贵的${res[0].Aera_Name}代理,欢迎您`,
									type: 'success',
									url: `/pages/proxy/areaProxy?user_id=${this.userInfo.user_id}&AeraID=${res[0].AeraID}&Aera_Name=${res[0].Aera_Name}`
								})
								return;
							}
						}
						else{
							this.proxyShow = true;
							this.proxyData = res
						}
					}
					else{
						this.$refs.uToast.show({
							title: '您还不是代理,请致电加入我们',
							type: 'warning'
						})
						return;
					}
				})
			},
			toShopservice(){
				this.$refs.uToast.show({
					title: '小程序暂不开放此功能',
					type: 'warning'
				})
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
	background-color: #f5f5f5;
	.top{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f5f5f5;
		.background-img{
			width: 100%;
			height: 400rpx;
		}
		.userInfo{
			width: 100%;
			height: 150rpx;
			position: relative;
			top: -270rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.userInfo-content{
				width: 710rpx;
				height: 150rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.userInfo-left{
					width: 470rpx;
					height: 150rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					
					.user-avatar{
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 120rpx;
							height: 120rpx;
							border-radius: 10rpx;
						}
					}
					.user-cont{
						width: 350rpx;
						height: 150rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						position: relative;
						left: 20rpx;
						
						.user-name{
							font-size: 36rpx;
							color: rgba(0, 0, 0, 1);
							font-family:PingFang SC;
							font-weight:600;
						}
						.user-level{
							font-size:24rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(77,77,77,1);
						}
						.invitation-code{
							width: 350rpx;
							height: 35rpx;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							text{
								width: 200rpx;
								font-size:24rpx;
								font-family:PingFang SC;
								font-weight:400;
								color:rgba(77,77,77,1);
							}
							.invitation-button{
								width:70rpx;
								height:30rpx;
								border:2rpx solid rgba(124,118,81,1);
								border-radius:10rpx;
								font-size:22rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								position: relative;
								left: 30rpx;
							}
						}
					}
				
					.notLogin{
						width: 300rpx;
						height: 60rpx;
						position: relative;
						left: 50rpx;
					}
				}
				
				.userInfo-right{
					width: 240rpx;
					height: 150rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					position: relative;
					top: 25rpx;
					
					.userinfo-cont{
						width:143rpx;
						height:40rpx;
						background:rgba(255,255,255,1);
						border-radius:20rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:300;
						color:rgba(26,26,26,1);
					}
					.user-invite{
						display: flex;
						align-items: center;
						flex-direction: column;
						justify-content: space-around;
						image{
							width: 40rpx;
							height: 40rpx;
						}
						text{
							color: rgba(77, 77, 77, 1);
							font-size: 20rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}			
		}
		.navigation-bar{
			width: 100%;
			height: 50rpx;
			position: relative;
			top: -215rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.navigation-bar-middle{
				width: 710rpx;
				height: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				
				.topbar-left{
					width: 185rpx;
					height: 30rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					
					.v-img{
						width: 25rpx;
						height: 25rpx;
						margin-right: 5rpx;
					}
					.left-title{
						display: flex;
						justify-content: center;
						align-items: center;
						font-size:30rpx;
						font-family:Adobe Heiti Std;
						font-weight:normal;
						color:rgba(252,234,96,1);
					}
				}
				
				.topbar-middle{
					width: 145rpx;
					height: 25rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.title{
						font-size:24rpx;
						font-family:Adobe Heiti Std;
						font-weight:normal;
						color:rgba(255,255,255,1);
					}
				}
				
				.topbar-right{
					width:130rpx;
					height:45rpx;
					background:linear-gradient(174deg,rgba(242,222,79,1),rgba(248,238,149,1));
					border-radius:20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					
					.title{
						font-size:24rpx;
						font-family:Adobe Heiti Std;
						font-weight:normal;
						color:rgba(0,0,0,1);
					}
				}
			}
		}
	}
	
	.common{
		width: 100%;
		height: 230rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		top: -180rpx;
		background-color: #f5f5f5;
		
		.middle{
			width: 710rpx;
			height: 210rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			
			.top-title{
				width: 100%;
				height: 65rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				
				text{
					font-size:30rpx;
					font-family:Adobe Heiti Std;
					font-weight:bold;
					color:rgba(0,0,0,1);
					position: relative;
					left: 30rpx;
				}
			}
			.bottom-cont{
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.commom-cont{
					width: 142rpx;
					height: 160rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
					.icon{
						width: 76rpx;
						height: 76rpx;
						position: relative;
						bottom: 13rpx;
					}
					text{
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(51,51,51,1);
					}
				}
			}
		}
	}
	
	.accout{
		width: 100%;
		height: 330rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		top: -180rpx;
		
		.middle{
			width: 710rpx;
			height: 310rpx;
			border-radius: 10rpx;
			background: #FFFFFF;
			
			.top-title{
				width: 100%;
				height: 65rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				border-bottom: 1rpx solid #f5f5f5;
				
				text{
					font-size:30rpx;
					font-family:Adobe Heiti Std;
					font-weight:bold;
					color:rgba(0,0,0,1);
					position: relative;
					left: 30rpx;
				}
			}
			
			.bottom-accout{
				width: 100%;
				height: 245rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				
				.user-accout{
					width: 100%;
					height: 122.5rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-bottom: 1rpx solid #f5f5f5;
					
					.left-allowance,.right-subsidy{
						width: 355rpx;
						height: 100%;
						border-right: 1rpx solid #f5f5f5;
						display: flex;
						justify-content: center;
						align-items: center;
						
						.left-cont{
							width: 195rpx;
							height: 100%;
							display: flex;
							flex-direction: column;
							align-items: flex-start;
							justify-content: center;
							position: relative;
							left: 30rpx;
							
							.accout-name{
								font-size:28rpx;
								font-family:PingFang SC;
								font-weight:400;
								color:rgba(0,0,0,1);
							}	
							.accout-amount{
								font-size:42rpx;
								font-family:PingFang SC;
								font-weight:600;
								color:rgba(255,56,66,1);
							}
							.newColor{
								color: rgba(74, 95, 196, 1);
							}				
						}
						.right-cont{
							width: 195rpx;
							height: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							
							.today-earning{
								display: flex;
								justify-content: center;
								align-items: center;
								font-size:28rpx;
								font-family:PingFang SC;
								font-weight:400;
								color:rgba(208,78,31,1);
								position: relative;
								top: 20rpx;
								left: 15rpx;
							}
						}
					}
				}
				
				.shop-accout{
					width: 100%;
					height: 122.5rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					
					.left-cont{
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: center;
						position: relative;
						left: 30rpx;
						
						.accout-name{
							font-size:28rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(0,0,0,1);
						}	
						.accout-amount{
							font-size:28rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(102,102,102,1);
						}				
					}
				}
			}
		}
	}

	.bottom{
		width: 100%;
		height: 320rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		top: -95rpx;
		
		.bottom-common{
			width: 710rpx;
			border-radius: 10rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			.top-title{
				width: 100%;
				height: 76rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				border-bottom: 1rpx solid #f5f5f5;
				
				text{
					font-size:30rpx;
					font-family:Adobe Heiti Std;
					font-weight:bold;
					color:rgba(0,0,0,1);
					position: relative;
					left: 30rpx;
				}
			}
			.bottom-middle{
				width: 100%;
				display: flex;
				flex-flow: row wrap;
				justify-content: center;
				align-items: center;
				
				.common-cont{
					width: 177.5rpx;
					height: 200rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
					image{
						width: 69rpx;
						height: 69rpx;
						position: relative;
						bottom: 14rpx;
					}
					.name{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(102,102,102,1);
					}
				}
			}
		}
	}
}	

	.wxQRimg{
		background-color: #FFFFFF;
		.qr-img{
			width: 450rpx;
			height: 450rpx;
		}
	}
	.proxy-popup{
		height: 450rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
		.button{
			width: 700rpx;
			margin: 20rpx;
		}
	}
</style>