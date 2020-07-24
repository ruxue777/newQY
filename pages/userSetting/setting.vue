<template>
	<view class="main">
		<u-navbar  title="用户设置"></u-navbar>
		
		<view class="content">
			<u-grid :col="3">
				<u-grid-item >
					<u-icon name="phone" :size="46"></u-icon>
					<text class="grid-text">手机号</text>
					<view class="grid-text">15083574935</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="man-add" :size="46"></u-icon>
					<text class="grid-text">推荐人</text>
					<view class="grid-text">*</view>
				</u-grid-item>
				<u-grid-item @click="monitor('referrer')">
					<u-icon name="man-delete" :size="46"></u-icon>
					<view class="null">
						<view class="grid-text">推荐人修改</view>
					</view>	
				</u-grid-item>
				<u-grid-item @click="monitor('log')">
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">修改登陆密码</view>
				</u-grid-item>
				<u-grid-item @click="monitor('pay')">
					<u-icon name="lock-fill" :size="46"></u-icon>
					<view class="grid-text">修改支付密码</view>
				</u-grid-item>
				<u-grid-item @click="monitor('message')">
					<u-icon name="info-circle" :size="46"></u-icon>
					<view class="grid-text">关于平台</view>
				</u-grid-item>
				<u-grid-item @click="monitor('avatar')">
					<u-icon name="camera-fill " :size="46"></u-icon>
					<view class="grid-text">修改头像</view>
				</u-grid-item>
				<u-grid-item @click="monitor('location')">
					<u-icon name="car" size="46"></u-icon>
					<view class="grid-text">修改收货地址</view>
				</u-grid-item>
				<u-grid-item @click="monitor('exit')">
					<u-icon name="close-circle" color="" :size="46"></u-icon>
					<view class="grid-text">退出账户</view>
				</u-grid-item>
			</u-grid>
		</view>			
		
		
		<!-- 反馈组件 -->
		<u-toast ref="uToast" />
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
		
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
				<text class="title">登录密码修改</text>
				
				<view class="up-psd">
					
					<view class="cont">
						<u-icon name="lock" :size="46" ></u-icon>
						<input placeholder="设置新密码" type="password" v-model="newLogPsd" />
					</view>
					<view class="cont">
						<u-icon name="lock" :size="46" ></u-icon>
						<input placeholder="设置新密码" type="password" v-model="newLogPsd" />
					</view>
					<view class="bottom">
						<u-message-input breathe="true" width="50"></u-message-input>
						<u-button slot="right" type="success" size="mini" width="90rpx" @click="getCode">{{codeTips}}</u-button>
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
				show_0:false,
				show_1:false,
				//用户本地信息
				userInfo:{},
				referrer_mobile:'',
				codeTips: ''
			};
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
					case 'log':
						if(this.getUserInfo()==true){
							this.show_1 = true;
						}
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
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
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
	.content{
		padding: 35rpx;
		.grid-text {
			font-size: 26rpx;
			margin-top: 4rpx;
		}
		.null{
			width: 160rpx;
			height: 77rpx;
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
				justify-content: space-between;
				align-items: center;
				
				u-button{
					width: 100rpx;
					height: 60rpx;
					position: relative;
					left: -45rpx;
					top: 3rpx;
				}
			}
		}
	}
}
</style>
