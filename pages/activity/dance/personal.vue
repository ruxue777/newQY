<template>
	<view class="main">
		<u-navbar :title="PersonalDetails.BP_Name" :background="background" title-width="350" back-icon-color="#ffffff" title-color="#ffffff"></u-navbar>
		<view class="top-team-name">《{{PersonalDetails.BusinessName}}》成员</view>
		<view class="personal-box">
			<view class="personal-details-box">
				<text class="player-profile">选手资料:</text>
				
				<view class="player-profile-middle">
					<text class="personal-name">{{PersonalDetails.BP_Name}}</text>
					<image :src="PersonalDetails.BP_ImgUrl"></image>
					<view class="personal-desc">
						{{PersonalDetails.BP_Desc}}。
					</view>
				</view>
			
				<view class="player-ranking">
					<view class="ranking-item">
						<view class="ranking-item-content">
							<view class="top-text">
								<text class="amount">{{PersonalRank.BusinessOrderID}}</text><text>名</text>
							</view>
							<text class="bottom-text">团队内排名</text>
						</view>
					</view>
					<view class="ranking-item btn">
						<view class="ranking-item-content ">
							<view class="top-text middle">
								<text class="amount" style="color: #FB5C6A;">{{PersonalRank.MSSPR_Count}}</text><text class="frequency" style="color: #FB5C6A;">次</text>
							</view>
							<text class="bottom-text">打赏次数</text>
						</view>
					</view>
					<view class="ranking-item">
						<view class="ranking-item-content">
							<view class="top-text">
								<text class="amount">{{PersonalRank.OrderID}}</text><text>名</text>
							</view>
							<text class="bottom-text">选手排名</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="personal-display-box">
				<text class="player-profile">个人展示:</text>
				
				<view class="personal-display-H5">
					<u-parse :html="PersonalDetails.BP_Content"></u-parse>
				</view>
			</view>
		</view>
			
		<view class="bottom-navigation-box">
			<view class="index" @click="back">
				<image src="../../../static/image/toIndex.png"></image>
				<text>投票首页</text>
			</view>
			<view class="share-it" @click="pop_share = true">
				<image src="../../../static/image/share_it.png"></image>
				<text>分享(为ta加油)</text>
			</view>
			<view class="reward-box">
				<view class="button">
					<u-button shape="circle" ripple="true" ripple-bg-color="#dcdcdc" :custom-style="customStyle" @click="rewardPresonal">马上打赏</u-button>
				</view>
			</view>
		</view>	
	
	<!-- 反馈组件 -->
	<u-toast ref="uToast" />
	<u-popup v-model="show" mode="center" border-radius="10" closeable=true>
		<view class="popup-middle">
						
			<view class="pop-top">
				<view class="head-img">
					<image :src="PersonalDetails.BP_ImgUrl"></image>
				</view>
				
				<view class="text-box">
					<text class="top">向{{PersonalDetails.BP_Name}}打赏</text>
					<text class="bottom">每投票一次需打赏{{PersonalDetails.BP_Amount}}元</text>
				</view>
			</view>
			
			<view class="pop-middle">
				<text>打赏金额</text>
				<view class="amount-select">
					<image src="../../../static/image/sub.png" @click="reward_Amount--"></image>
					<input type="text" v-model="reward_Amount"/>
					<image src="../../../static/image/add.png" @click="reward_Amount++"></image>
				</view>
			</view>
			
			<view class="pop-bottom">
				<view class="button">
					<u-button shape="circle" ripple="true" ripple-bg-color="#dcdcdc" :custom-style="customStyle" @click="sunmitOrder">立即打赏{{(PersonalDetails.BP_Amount * reward_Amount).toFixed(2)}}元</u-button>
				</view>
			</view>
		</view>
	</u-popup>
	
	<u-popup v-model="pop_pay" mode="bottom" border-radius="15" closeable="true" close-icon-pos="top-left">
		<view class="popup-content">
			<view class="top">
				<text class="top-title">付款详情</text>
				<text class="pay-amount">实付:￥<text class="btn">{{popup_Amount}}</text></text>
			</view>
			
			<view class="middle">
				<view class="subsidy">
					<view class="left-cont">
						<image src="../../../static/image/coupon.png"></image>
						<text>{{DeductionTips}}</text>
						<view class="title">补贴抵扣</view>
					</view>
					<view class="right-cont">
						<u-switch v-model="deductionSwitch" size='40' active-color="#fa3534" :disabled="isDeduction"></u-switch>
					</view>
				</view>
				
				<view class="payment-method">
					<view class="payment-method-title">选择付款方式</view>
					<view class="payment-method-content">						
						<view class="wx-account Selected">
							<view class="left">
								<image class="left-img-0" src="../../../static/image/pop_wxred.png"></image>
								<text>微信支付</text>
							</view>
							<view class="right">
								<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
							</view>		
						</view>
					</view>
				</view>
			</view>
			
			<view class="bottom">
				<view class="button" @click="wxPay">
					立即支付
				</view>
			</view>
		</view>
	</u-popup>
	
	<u-popup v-model="pop_paySuccess" mode="center" >
		<view class="pop_paySuccess">			
			<image :src="successImg"></image>
			<view class="pop_paySuccess-content">
				<!-- <image :src="successImg"></image> -->
				
				<view class="success-tips">
					<text class="top">恭喜您,打赏成功!</text>
					<text class="bottom">谢谢你的支持和打赏~</text>
				</view>
				
				<view class="button" @click="pop_paySuccess = false">好的</view>
			</view>		
		</view>
	</u-popup>
	
	<u-popup v-model="pop_share" mode="bottom" border-radius="20">
		<view class="pop-share">
			<view class="top">分享</view>
			<view class="bottom">
				<view class="popup-left">
					<u-icon name="weixin-fill" size="56" color="#18b566"></u-icon>
					<text>分享给微信好友</text>
					<button class="share" open-type="share"></button>
				</view>
				<view class="popup-right" @click="sharePoster">
					<u-icon name="download" size="56" color="#f29100"></u-icon>
					<text>保存图片到本地</text>
				</view>
			</view>
		</view>
	</u-popup>
	
	<qrcode-poster ref="poster" :title="PersonalDetails.BP_Name" :subTitle="PersonalDetails.BP_Desc" :headerImg="PersonalDetails.BP_ImgUrl" :abImg="AdSubimg"></qrcode-poster>
	</view>
</template>

<script>
import {request,wxRequest} from '@/api/request.js';
import md5Libs from "uview-ui/libs/function/md5";
import QrcodePoster from '@/components/zhangyu-qrcode-poster/activicy-canvas.vue'
	export default {
		components:{
			QrcodePoster:QrcodePoster
		},
		data() {
			return {
				//顶部背景
				background:{
					backgroundColor: '#FB5C6A',
				},
				//按钮样式
				customStyle:{
					backgroundColor:'#FFBA00',
					color:'#000000'
				},
				//分享弹窗
				pop_share:false,
				//弹窗
				show:false,
				//用户信息
				userInfo:[],
				//选手详情
				PersonalDetails:[],
				//选手排名
				PersonalRank:[],
				//打赏次数
				reward_Amount:1,
				//支付弹窗
				pop_pay:false,
				//抵扣开关
				isDeduction:false,
				//支付弹窗付款金额
				popup_Amount:0.00,
				DeductionTips:'',
				//订单详情
				orderDetails:[],
				//支付成功弹窗
				pop_paySuccess:false,
				ProductID:'',
				BP_Name:'',
				MSS_id:'',
				//小程序二维码
				wxQrCode:'',
				AdSubimg:'',
				successImg:''
			};
		},
		watch:{
			reward_Amount(){
				if(this.reward_Amount <1){
					this.reward_Amount = 1;
					
					this.$refs.uToast.show({
						title:'不能小于1哦',
						type: 'warning'
					})				
				}
			}
		},
		onLoad(e) {
			let scene = decodeURIComponent(e.scene);
			if(null != scene && '' != scene && undefined != scene && scene != 'undefined'){
				let array = scene.split(',');
				
				this.ProductID = array[0];
				this.MSS_id = array[1];
			}else{
				this.ProductID = e.ProductID;
				this.MSS_id = e.MSS_id;
			}
				
			this.getPersonalDetails();
			this.getPersonalRank();
			this.getPersonal_wxQrCode();
			this.getAdSubimg();
		},
		//分享
		onShareAppMessage(res) {
			return {
				title: this.PersonalDetails.BP_Desc,
				path:`/pages/activity/dance/personal?ProductID=${this.ProductID}&MSS_id=${this.MSS_id}`,
				imageUrl: this.PersonalDetails.BP_ImgUrl
			};
		},
		methods:{
			getPersonalDetails(){
				request('API_GetInfo_BusinessProductSearch',{ProductID:this.ProductID,Longitude:114,Latitude:25}).then(res=>{
					this.PersonalDetails = res
				})
			},
			getPersonalRank(){
				request('API_GetInfo_SpecialSubject_ProductRanking_Reward',{MSS_id:this.MSS_id,ProductID:this.ProductID}).then(res=>{
					this.PersonalRank = res
				})
			},
			rewardPresonal(){
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
									url:'/pages/user/signIn'
								})
							}
						})
					})
				}
				else{
					this.userInfo = userInfo;
					this.show = true
				}
			},
			sunmitOrder(){
				request('API_AddBusinessProduct_V4',{user_id:this.userInfo.user_id,ProductID:this.ProductID,Count:this.reward_Amount,UserName:'',
					Mobile:this.userInfo.mobile,Address:'',ReceiveType:0,IsIntegralConsume:this.PersonalDetails.IsOffset}).then(res=>{
						
						if(res.result_code === 'SUCCESS'){
							this.popup_Amount = (res.BPR_AppAmount - res.BPR_OffsetAmount).toFixed(2); 							
							this.orderDetails = res
							
							if(res.BPR_OffsetAmount == 0){
								this.DeductionTips = '不使用或不支持抵扣'
								this.isDeduction = true
								this.pop_pay = true
							}else{
								this.isDeductions()
								this.pop_pay = true
							}
						}
						else{
							this.$refs.uToast.show({
								title:res.result_content,
								type: 'error'
							})
						}	
				})	
			},
			//判断是否开启抵扣
			isDeductions(){
				if(this.deductionSwitch == true && this.isDeduction == false){
					this.DeductionTips = `补贴账户已抵扣￥${this.reward_Amount * this.PersonalDetails.BPR_OffsetAmount}`
				}else{
					this.DeductionTips = `不使用或不支持抵扣`
				}
			},
			wxPay(){
				uni.login({
					success:(e=>{
						let code = e.code
						wxRequest('API_GetOpenid',{code:code}).then(result=>{
							wxRequest('API_GetWxpayTradeInfo_BusinessProductRecord_V2_Json',{OrderId:this.orderDetails.OrderId,openid:result.openid,IsOffset:this.isDeductions()}).then(pay=>{
								let obj = JSON.parse(pay.RequestStr);
								const {appId,timeStamp,nonceStr,paySign} = obj
								const Zpackage = obj.package
								
								let md5Data = md5Libs.md5(`appId=${appId}&nonceStr=${nonceStr}&package=${Zpackage}&signType=MD5
									&timeStamp=${timeStamp}&key=78fe4b2343ec3cc7fa3a46e858e5e7bf`).toUpperCase();
								uni.requestPayment({
									provider:'wxpay',
									timeStamp:timeStamp,
									nonceStr:nonceStr,
									package:Zpackage,
									signType:'MD5',
									paySign:paySign,
									success:(success) => {
										this.$refs.uToast.show({
											title:'支付成功',
											type: 'success'
										})
										this.pop_pay = false;
										this.show = false;
										//刷新
										this.getPersonalDetails()
										this.pop_paySuccess = true;
									},
									fail:(err) => {
										this.$refs.uToast.show({
											title:'支付失败',
											type: 'error'
										})
										return;
									}
								})
							})
						})
					}) 
				})
			},
			getPersonal_wxQrCode(){
				wxRequest('API_GetWxappQR',{scene:`${this.ProductID},${this.MSS_id}`,page:'pages/activity/dance/personal'}).then(res=>{
					this.wxQrCode = res.result_content
				})
			},
			//不能分享未发布的页面
			sharePoster(){
				this.pop_share = false
				//获取带参数二维码并传递
				this.$refs.poster.showCanvas(this.wxQrCode)
			},
			getAdSubimg(){
				request('API_GetList_ADRecord_CallIndex',{CallIndex:"ad0099"}).then(res=>{
					this.AdSubimg = res[2].ADR_ImgUrl
					this.successImg = res[3].ADR_ImgUrl
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
	background-color: #FB5C69;
}	
.main{
	.top-team-name{
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FA868F;
		font-size: 38rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #FFFFFF;
		line-height: 52rpx;
	}
	
	.personal-box{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.personal-details-box{
			width: 690rpx;
			height: 950rpx;
			background-color: #FFFFFF;			
			border-radius: 20rpx;
			margin-top: 30rpx;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.player-profile{	
				position: absolute;
				top: 40rpx;
				left: 40rpx;
				font-size: 34rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #1A1A1A;
			}
			
			.player-profile-middle{
				width: 580rpx;
				height: 680rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				
				.personal-name{
					font-size: 32rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #333333;
					line-height: 38rpx;
				}
				
				image{
					width: 490rpx;
					height: 490rpx;
				}
				
				.personal-desc{
					width: 580rpx;
					height: 110rpx;	
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #333333;
					line-height: 38rpx;
				}
			}
		
			.player-ranking{
				width: 100%;
				height: 130rpx;
				position: absolute;
				bottom: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.ranking-item{
					width: 100%;
					height: 75%;
					display: flex;
					justify-content: center;
					align-items: center;
					
					.ranking-item-content{
						width: 130rpx;
						height: 110rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						
						.top-text{
							.amount{							
								font-size: 50rpx;
								font-family: Adobe Heiti Std;
								font-weight: normal;
								color: #3B3B3B;
							}
							
							.frequency{
								font-size: 24rpx;
								font-family: Adobe Heiti Std;
								font-weight: normal;
								color: #3B3B3B;
							}
						}
						
						.bottom-text{						
							font-size: 24rpx;
							font-family: Adobe Heiti Std;
							font-weight: normal;
							color: #808080;
						}
					}
				}
			
				.btn{
					border-left: 1rpx solid #D8D8D8;
					border-right: 1rpx solid #D8D8D8;
				}
			}
		}
		
		.personal-display-box{
			width: 690rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			margin-top: 30rpx;
			margin-bottom: 120rpx;
			position: relative;
			
			.player-profile{
				position: absolute;
				left: 40rpx;
				top: 35rpx;				
				font-size: 34rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #1A1A1A;	
			}
			
			.personal-display-H5{
				padding: 20rpx;
				margin-top: 100rpx;
			}
		}
	}
	
	.bottom-navigation-box{
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		border-top: 1rpx solid #e5e5e5;
		
		.index,.share-it{
			width: 175rpx;
			height: 80rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			
			image{
				width: 50rpx;
				height: 50rpx;
			}
			
			text{
				font-size: 20rpx;
				font-family: PingFang TC;
				font-weight: 400;
				color: #333333;
			}
		}
		
		.reward-box{
			width: 400rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.button{
				width: 335rpx;
				height: 80rpx;
			}
		}
	}

	.popup-middle{
		width: 580rpx;
		height: 830rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		background-color: #FFFFFF;
		
		.pop-top{
			width: 100%;
			height: 325rpx;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.head-img{
				width: 280rpx;
				height: 280rpx;
				position: absolute;
				top: -120rpx;
				left: 28%;
				border-radius: 50%;
				background-color: #FFFFFF;
				padding: 15rpx;
				z-index: 20202;
				image{
					width: 250rpx;
					height: 250rpx;
					border-radius: 50%;
					z-index: 20202;
				}
			}
			
			.text-box{
				width: 450rpx;
				height: 110rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				position: absolute;
				top: 180rpx;
				
				.top{
					font-size: 42rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #343434;
					line-height: 39rpx;
				}
				
				.bottom{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 39rpx;
				}
			}
		}
		
		.pop-middle{
			width: 540rpx;
			height: 190rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			border-radius: 10rpx;
			box-shadow:0 0 10rpx #dcdcdc;
			
			text{
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #000000;
			}
			
			.amount-select{
				width: 480rpx;
				height: 110rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				input{
					width: 260rpx;
					height: 70rpx;
					text-align:center;
					background: #F2F2F2;
					border-radius: 10rpx;
					margin-left: -10rpx;
					margin-right: -10rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;
				}
				
				image{
					width: 110rpx;
					height: 110rpx;
				}
			}
		}
		
		.pop-bottom{
			width: 100%;
			height: 190rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.button{
				width: 460rpx;
				height: 90rpx;
			}
		}
	}
	
	.popup-content{
		width: 100%;
		height: 1000rpx;
		background-color: #fff;
		
		.top{
			width: 100%;
			height: 210rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			
			.top-title{
				font-size:36rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(0,0,0,1);
			}
			
			.pay-amount{
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(0,0,0,1);
				
				.btn{
					font-size:50rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(0,0,0,1);
				}
			}
		}
		
		.middle{
			width: 100%;
			height: 580rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius:20px;
			-moz-box-shadow:0px 0px 10px #e1e1e1; -webkit-box-shadow:0px 0px 10px #e1e1e1; box-shadow:0px 0px 10px #e1e1e1;
			
			.subsidy{
				width: 670rpx;
				height: 80rpx;
				border-bottom: 4rpx solid rgba(250, 250, 250, 1);
				display: flex;
				justify-content: center;
				align-items: center;
				
				.left-cont{
					width: 520rpx;
					height: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					image{
						width: 40rpx;
						height: 30rpx;
					}
					
					text{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:300;
						color:rgba(255,48,0,1);
						line-height:46rpx;
					}
					
					.title{
						width:90rpx;
						height:25rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background:rgba(255,104,104,1);
						border-radius:5rpx 5rpx 5rpx 0rpx;						
						font-size:20rpx;
						font-family:Adobe Heiti Std;
						font-weight:normal;
						color:rgba(255,255,255,1);
						line-height:40rpx;
					}
				}
				
				.right-cont{
					width: 150rpx;
					height: 100%;
					display: flex;
					justify-content: flex-end;
					align-items: center;
				}
			}
			
			.payment-method{
				width: 670rpx;
				height: 500rpx;
				
				.payment-method-title{
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					font-size:30rpx;
					font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
					font-weight:500;
					color:rgba(51,51,51,1);
				}
				
				.payment-method-content{
					width: 100%;
					height: 420rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					image{
						width: 40rpx;
						height: 40rpx;
					}
					
					.jt-account,.bt-account,.wx-account{
						width:670rpx;
						height:80rpx;
						border:3rpx solid rgba(225,225,225,1);
						border-radius:40rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						
						.left{
							width: 215rpx;
							height: 40rpx;
							display: flex;
							justify-content: space-around;
							align-items: center;
							border-right: 2rpx solid #efefef;
						}
						
						.right{
							width: 360rpx;
							height: 50rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							position: relative;
							
							.account-amount{
								position: absolute;
								left: 20rpx;
								font-size:26rpx;
								font-family:PingFang SC;
								font-weight:400;
								color:rgba(102,102,102,1);
								line-height:40rpx;
							}
							
							.btn{
								position: absolute;
								right: 0;
							}
						}
					}
			
					.Selected{
						border:3rpx solid rgba(255, 48, 0, 1);
						color:rgba(255, 48, 0, 1);
					}
				}
			}
		}
		
		.bottom{
			width: 100%;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.button{
				width: 670rpx;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background:rgba(255,229,14,1);
				border-radius:40rpx;
				font-size:36rpx;
				font-family:PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
			}
		}
	}

	.pop_paySuccess{
		width: 720rpx;
		height: 700rpx;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		
		image{
			width: 720rpx;
			height: 510rpx;
			z-index: 900;
			position: absolute;
			top: -50rpx;
		}
		
		.pop_paySuccess-content{
			width: 480rpx;
			height: 510rpx;
			position: absolute;
			top: 150rpx;
			background-color: #FFFFFF;			
			box-shadow: 0rpx 20rpx 40rpx 0rpx rgba(28, 23, 47, 0.2);
			border-radius: 28rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			image{
				width: 460rpx;
				height: 460rpx;
				z-index: 900;
				position: absolute;
				top: -175rpx;
			}
			
			.success-tips{
				width: 310rpx;
				height: 100rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				position: absolute;
				top: 210rpx;
				
				.top{
					font-size: 36rpx;
					color: #FB606C;
				}
				
				.bottom{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #AAAFB5;
				}
			}
		
			.button{
				width: 400rpx;
				height: 80rpx;
				background: #FB606C;
				border-radius: 44rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FEFEFE;
				position: absolute;
				top: 375rpx;
			}
		}
	}
	
	.pop-share{
		width: 100%;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.top{
			width: 100%;
			height: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			background-color: #f4f4f4;
		}
		
		.bottom{
			width: 100%;
			height: 160rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			.popup-left,.popup-right{
				width: 260rpx;
				height: 130rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: relative;
				
				.share{
					width: 260rpx;
					height: 130rpx;
					position: absolute;
					z-index: 1;
					opacity: 0;
				}
			}
		}
	}
}
</style>
