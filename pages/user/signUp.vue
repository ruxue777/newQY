<template>
	<view class="main">
		<view class="arrow-leftward" @click="back">
			<u-icon name="arrow-leftward" size="46"></u-icon>
		</view>
		
		<view class="cont">
			<view class="top-title">注册账户</view>
				
			<view class="middle">
				<view class="cellphone">
					<view class="content">
						<image src="../../static/image/phone.png"></image>
						<input placeholder="请输入手机号" v-model="mobile"/>
						<text class="getcode" @click="getSmsCode">获得验证码</text>
					</view>
				</view>
				
				<view class="code">
					<view class="content">
						<image src="../../static/image/tick.png"></image>
						<input placeholder="请输入验证码" v-model="code"/>
					</view>
				</view>
				
				<view class="password">
					<view class="content">
						<image src="../../static/image/psd.png"></image>
						<input placeholder="请输入密码" type="password" v-model="Psd"/>
					</view>
				</view>
				
				<view class="referrer">
					<view class="content">
						<image src="../../static/image/adduser.png"></image>
						<input placeholder="请输入推荐人(选填)" v-model="referrer"/>
					</view>
				</view>
				  
				<view class="bottom-button">
					<u-button type="warning" ripple="true" size="default" @click="signUp">注册</u-button>
					<text>注册即视为同意注册条款</text>
				</view>
			</view>
		</view>
	
		<!-- 反馈组件 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import {request} from '@/api/request.js'
import md5Libs from "uview-ui/libs/function/md5";	
	export default {
		data() {
			return {
				mobile:'',
				code:'',
				Psd:'',
				referrer:''
			};
		},
		onLoad() {
			
		},
		methods:{
			getSmsCode(){
				if(this.$u.test.mobile(this.mobile) === true){
					request('API_GetRegisterSMSCode',{mobile:this.mobile,pubKey:md5Libs.md5(this.mobile + "XFC@2019#2020")}).then(res=>{
						if(res.result_code == "SUCCESS"){
							this.$refs.uToast.show({
								title: '已发送',
								type: 'success'
							})
						}
						else{
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'error'
							})
						}
					})
				}
				else{
					this.$refs.uToast.show({
						title: '发送失败,请稍后再试',
						type: 'error'
					})
				}
			},
			signUp(){
				
			},
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
.main{
	width: 100%;
	height: 1000rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	
	.arrow-leftward{
		position: absolute;
		top: 65rpx;
		left: 50rpx;
	}
	
	.cont{
		width: 100%;
		height: 800rpx;
		display:flex;
		align-items: center;
		flex-direction: column;
		position: relative;
		top: 100rpx;
		
		.top-title{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 42rpx;
			font-weight: bold;
			letter-spacing: 5rpx
		}
		.middle{
			width: 100%;
			height: 700rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.cellphone,.code,.password,.referrer{
				width: 100%;
				height: 150rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.content{
					width: 550rpx;
					height: 120rpx;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					border-bottom: 1rpx solid #999999;
					
					.getcode{
						display: flex;
						justify-content: center;
						align-items: center;		
						font-size: 24rpx;
						background: linear-gradient(to right, #ffaa00, red);
						-webkit-background-clip: text;
						color: transparent;
					}
					image{
						width: 60rpx;
						height: 60rpx;
						margin-right: 20rpx;
					}
				}
			}
			.bottom-button{
				width: 550rpx;
				height: 100rpx;
				margin-top: 40rpx;
		
				text{
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 20rpx;
					font-size: 24rpx;
					background: linear-gradient(to right, yellow, red);
					-webkit-background-clip: text;
					color: transparent;
				}
			}
		}
	}
}
</style>
