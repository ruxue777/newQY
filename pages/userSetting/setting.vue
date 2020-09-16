<template>
	<view class="main">
		<u-navbar  title="用户设置"></u-navbar>
		
		<view class="content">
			<u-grid :col="3">
				<u-grid-item >
					<u-icon name="phone" :size="46"></u-icon>
					<view class="middle">
						<text class="grid-text">手机号</text>
						<view class="grid-text">{{userInfo.mobile || '暂无'}}</view>
					</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="man-add" :size="46"></u-icon>
					<view class="middle">
						<text class="grid-text">推荐人</text>
						<view class="grid-text">{{userInfo.p_user_name || '暂无'}}</view>
					</view>
				</u-grid-item>
				<u-grid-item @click="monitor('referrer')">
					<u-icon name="man-delete" :size="46"></u-icon>
					<view class="null">
						<view class="grid-text">推荐人修改</view>
					</view>	
				</u-grid-item>
				<u-grid-item @click="monitor('login')">
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">修改登陆密码</view>
				</u-grid-item>
				<u-grid-item @click="monitor('pay')">
					<u-icon name="lock-fill" :size="46"></u-icon>
					<view class="grid-text">修改支付密码</view>
				</u-grid-item>
				<u-grid-item @click="monitor('location')">
					<u-icon name="car" size="46"></u-icon>
					<view class="grid-text">修改收货地址</view>
				</u-grid-item>
				<u-grid-item @click="monitor('bankcard')">
					<image src="../../static/image/card.png" style="width: 46rpx;height: 46rpx;"></image>
					<view class="grid-text">银行卡管理</view>
				</u-grid-item>
				<u-grid-item @click="monitor('avatar')">
					<u-icon name="camera-fill " :size="46"></u-icon>
					<view class="grid-text">修改头像</view>
				</u-grid-item>
				<u-grid-item @click="monitor('updatalog')">
					<u-icon name="bookmark" :size="46"></u-icon>
					<view class="grid-text">更新日志</view>
				</u-grid-item>
				<u-grid-item @click="monitor('message')">
					<u-icon name="info-circle" :size="46"></u-icon>
					<view class="grid-text">联系我们</view>
				</u-grid-item>
				<u-grid-item @click="monitor('exit')">
					<u-icon name="close-circle" color="" :size="46"></u-icon>
					<view class="grid-text">退出账户</view>
				</u-grid-item>
			</u-grid>
		</view>			
		
		
		<!-- 反馈组件 -->
		<u-toast ref="uToast" />
		<u-verification-code seconds="120" ref="uCode" @change="codeChange"></u-verification-code>
		
		<u-popup v-model="show_0" mode="center" border-radius="14" closeable="true" close-icon-pos="top-left">
			<view class="popup-cont">
				<text class="title">推荐人修改</text>
				<view class="up-cell">
					<u-icon name="phone" :size="46" ></u-icon>
					<input placeholder="推荐人账户(用户名或手机号)" v-model="referrer_mobile" />
				</view>
				<u-button type="success" shape="circle" ripple="true" ripple-bg-color="#909399" @click="upReferrer_mobile">确认修改</u-button>
			</view>
		</u-popup>
		
		<u-popup v-model="show_1" mode="center" border-radius="14" closeable="true" close-icon-pos="top-left">
			<view class="popup-cont-1">
				<text class="title" v-if="psdType==='loginpwd_smscode'">登录密码修改</text>
				<text class="title" v-else>支付密码修改</text>
				<view class="up-psd">
					
					<view class="cont">
						<u-icon name="lock" :size="46" ></u-icon>
						<input placeholder="设置新登录密码" v-if="psdType==='loginpwd_smscode'" type="password" v-model="newLogPsd0" />
						<input placeholder="设置新支付密码" v-else type="password" v-model="newLogPsd0"/>
					</view>
					<view class="cont">
						<u-icon name="lock" :size="46" ></u-icon>
						<input placeholder="确认新密码" type="password" v-model="newLogPsd1" />
					</view>
					<view class="bottom">
						<u-message-input breathe="false" mode="bottomLine" font-size="30" width="50" :maxlength="maxlength" @finish="finish"></u-message-input>
						<!-- <u-button slot="right" type="success" size="mini" width="90rpx" @click="getCode">{{codeTips}}</u-button> -->
					</view>
				</view>
				<u-button type="success" shape="circle" ripple="true" ripple-bg-color="#909399" @click="getCodeAndupPsd" :disabled="disabled">{{initText}}</u-button>
			</view>
		</u-popup>	
		
		<u-popup v-model="show_2" mode="center" border-radius="15" closeable="true" close-icon-pos="top-left">
			<view class="updata-middle">
				<view class="top-title">
					3.0.1更新
				</view>
				<text class="content">新增活动,解决页面展示会出现的bug.</text>
				<text style="font-size: 30rpx;">2020/9/10</text>
			</view>
		</u-popup>	
	</view>
</template>

<script>
import {request} from '@/api/request.js';
import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				show_0:false,
				show_1:false,
				show_2:false,
				//用户本地信息
				userInfo:{
				},
				referrer_mobile:'',
				codeTips: '',
				psdType:'',
				maxlength:4,
				initText:'发送验证码',
				//按键禁用
				disabled:false,
				newLogPsd0:'',
				newLogPsd1:''
			};
		},
		onLoad() {
			const userInfo = uni.getStorageSync("globalUser");
			this.userInfo = userInfo
		},
		methods:{
			monitor(e){
				switch(e){
					//修改推荐人
					case 'referrer': 
						if(this.getUserInfo()==true){
							this.show_0 = true;
						}
					break;
					//修改登录密码
					case 'login':
						if(this.getUserInfo()==true){
							this.show_1 = true;
							this.psdType =  "loginpwd_smscode"
						}
					break;
					//修改支付密码
					case 'pay':
						if(this.getUserInfo()==true){
							this.show_1 = true;
							this.psdType = "paypwd_smscode"
						}
					break;
					case 'bankcard':
						uni.navigateTo({
							url:`/pages/userSetting/bankCardSettings?user_id=${this.userInfo.user_id}`
						})
					break;
					case 'exit':
						this.exit()
					break;
					//日志
					case 'updatalog':
						this.show_2 = true;
					break;
					case 'message':
						uni.navigateTo({
							url:'/pages/userSetting/contactus'
						})
					break;
				}
			},
			upReferrer_mobile(){
				if(this.referrer_mobile && '' != this.referrer_mobile && undefined != this.referrer_mobile){
							
					request('API_EditParentUser',{user_id:this.userInfo.user_id,ParentUserName:this.referrer_mobile}).then(res=>{
						if(res.result_code === "SUCCESS"){
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'success'
							})
						}else{
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'error'
							})
						}
					})
				}
				else
				{
					this.$refs.uToast.show({
						title: '请输入推荐人账户',
						type: 'error'
					})
					return;
				}
			},
			getUserInfo(){
				const userInfo = uni.getStorageSync("globalUser");
				if(!userInfo){
					this.$refs.uToast.show({
						title: '用户未登录',
						type: 'error'
					})
					return;
				}
				else{
					this.userInfo = userInfo
					return true;
				}
			},
			getCodeAndupPsd(e) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码',
					mask: true
				})
				if(this.psdType === "loginpwd_smscode"){
					request('API_GetForgetLoginPwdSMSCode',{mobile:this.userInfo.mobile,pubKey:md5Libs.md5(this.userInfo.mobile + "XFC@2019#2020")}).then(res=>{
						if(res.result_code == 'SUCCESS'){
							this.maxlength = res.result_content.length
							this.initText = '输入验证码完成修改'
							this.disabled = true
						}else{
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'error'
							})
						}
					})
				}
				else if(this.psdType === "paypwd_smscode"){
					request('API_GetForgetPayPwdSMSCode',{mobile:this.userInfo.mobile,pubKey:md5Libs.md5(this.userInfo.mobile + "XFC@2019#2020")}).then(res=>{
						if(res.result_code == 'SUCCESS'){
							this.maxlength = res.result_content.length
							this.initText = '输入验证码完成修改'
							this.disabled = true
						}else{
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'error'
							})
						}
					})
				}	
				setTimeout(() => {
					uni.hideLoading();
					
					this.$u.toast('验证码已发送');
				}, 1500);
			},
			finish(code){
				if(this.newLogPsd0 !== this.newLogPsd1){
					this.initText = '重新输入验证码来完成修改'
					this.$refs.uToast.show({
						title: '两次密码不一致',
						type: 'error'
					})
				}
				else if(this.newLogPsd0 == '' || this.newLogPsd1 == ' ' || this.newLogPsd0 == undefined || this.newLogPsd1 == undefined){
					this.initText = '重新输入验证码来完成修改'
					this.$refs.uToast.show({
						title: '请输入密码',
						type: 'error'
					})
				}else{
					request('API_EditPwdBySMS',{mobile:this.userInfo.mobile,smscode:code,NewPwd:this.newLogPsd1, smscodeType:this.psdType}).then(res=>{
						if(res.result_code == 'SUCCESS'){
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'success'
							})
							this.initText = '发送验证码'
							this.disabled = false
							this.show_1 = false
							this.psdType = ''
							this.newLogPsd0 = ''
							this.newLogPsd1 = ''
						}else{
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'error'
							})
						}
					})
				}
			},
			exit(){
				uni.showModal({
					title:'您确定退出此账户吗?',
					confirmText:'确认',
					success:function(res){
						if(res.cancel)
						{
							return;
						}
						else if(res.confirm)
						{
							uni.clearStorageSync();
							uni.navigateTo({
								url:"/pages/user/signIn"
							})
						}
					}
				})
			},
			codeChange(text) {
				this.codeTips = text;
			}
		}
	}
</script>

<style lang="less">
.main{
	.arrow-leftward{
		position: absolute;
		top: 65rpx;
		left: 50rpx;
	}
	.middle{
		height: 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.content{
		padding: 35rpx;
		.grid-text {
			font-size: 26rpx;
			margin-top: 4rpx;
		}
		.null{
			width: 160rpx;
			height: 81rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.popup-cont{
		width: 480rpx;
		height: 550rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		
		.up-cell{
			padding: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			top: -40rpx;
			input{
				width: 400rpx;
				height: 100rpx;
				font-size: 30rpx;
				border-bottom: 2rpx solid #C8C7CC;
				margin-left: 10rpx;
			}	
		}
		.title{
			font-size: 32rpx;
			position: relative;
			top: -105rpx;
		}		
		u-button{
			margin-top: 40rpx;
		}
	}
	.popup-cont-1{
		width: 560rpx;
		height: 600rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		
		.title{
			position: relative;
			top: 25rpx;
		}
		u-button{
			position: relative;
			top: -50rpx;
		}
		.up-psd{
			width: 450rpx;
			height: 480rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			
			.cont{
				width: 420rpx;
				height: 120rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				input{
					width: 400rpx;
					height: 100rpx;
					font-size: 30rpx;
					border-bottom: 2rpx solid #C8C7CC;
					margin-left: 10rpx;
				}
			}
			.bottom{
				width: 450rpx;
				height: 120rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
			}
		}
	}
	.updata-middle{
		width: 560rpx;		height: 300rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.top-title{
			font-weight: bold;
			font-size: 38rpx;
		}
		.content{
			font-size: 34rpx;
		}
	}
}
</style>
