<template>
	<view>
		<view class="main-0" v-if="isNight==false">
			<view class="arrow-leftward">
				<u-icon name="arrow-leftward" size="46"></u-icon>
			</view>
			
			<view class="head-portrait">
				<image src="../../static/image/morn.png" class="morn-img"></image>
			
				<view class="title">
					<view class="h1">您好,欢迎来到虔易</view>
					<view class="h2">WeLcome</view>
				</view>
				
				<view class="userInfo">
					<view class="cellphone">
						<u-icon name="phone-fill"  size="32"></u-icon>
						<!-- <text class="text">手机号</text> -->
						<input v-model="mobile" placeholder="请输入手机号" />
					</view>
					
					<view class="psd">
						<u-icon name="lock-fill"  size="32"></u-icon>
						<!-- <text>密码</text> -->
						<input v-model="password" type="password" placeholder="请输入密码" />
					</view>
				</view>
				
				<u-button :ripple="true" shape="circle" type="warning" ripple-bg-color="#f3f3f3" @click="userLogin">登录</u-button>
				<u-toast ref="uToast" />
			</view>
		</view>
		
		<view class="main-1" v-if="isNight==true">
			<view class="arrow-leftward">
				<u-icon name="arrow-leftward" color="#f3f3f3" size="46"></u-icon>
			</view>
			<view class="head-portrait">
				<image src="../../static/image/night.png" class="morn-img"></image>
			
				<view class="title">
					<view class="h1">晚上好,欢迎来到虔易</view>
					<view class="h2">WeLcome</view>
				</view>
				
				<view class="userInfo">
					<view class="cellphone">
						<u-icon name="phone-fill" color="#ffffff" size="32"></u-icon>
						<input v-model="mobile" placeholder="请输入手机号" />
					</view>
					
					<view class="psd">
						<u-icon name="lock-fill" color="#ffffff" size="32"></u-icon>
						<input v-model="password" type="password" style="color: white" placeholder="请输入密码" />
					</view>
				</view>
				
				<u-button :ripple="true" shape="circle"  ripple-bg-color="#bdbdbd" @click="userLogin">登录</u-button>
				<u-toast ref="uToast" />
			</view>
		</view>
	</view>
	
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		data() {
			return {
				mobile:'',
				password:'',
				isNight:true
			};
		},
		onLoad() {
			this.getTime()
		},
		methods:{
			userLogin(){
				if(!this.mobile){
					this.$refs.uToast.show({
						title: '请输入手机号',
						type: 'error '
					})
					return;
				}else if(!this.password){
					this.$refs.uToast.show({
						title: '请输入密码',
						type: 'error '
					})
					return;
				}else{
					request('API_CheckLogin',{loginName:this.mobile,loginPsw:this.password}).then(res=>{
						if(res.result_code === "SUCCESS"){
							console.log(123)
						}else{
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'error '
							})
							return;
						}
					})					
				}
			},
			getTime(){
				//取得当前时间的小时
			    let timeNow = new Date().getHours();
			    //判断当前时间是否在  09:00-12:00 13:00-16:00 之间
			    if(timeNow >= 6 && timeNow < 18 ){
			        this.isNight = false
			    }else{
					this.isNight = true
				}
			}
		}
	}
</script>

<style lang="less">
.main-0{
	width: 100%;
	height: 1500rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	
	.arrow-leftward{
		position: absolute;
		top: 65rpx;
		left: 50rpx;
	}
	.head-portrait{
		width: 710rpx;
		height: 1200rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		
		
		.morn-img{
			width: 320rpx;
			height: 320rpx;
		}
		
		.title{
			width: 600rpx;
			height: 150rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			
			.h1{
				font-size: 46rpx;
				letter-spacing: 3rpx;
				font-weight: bold;
			}
			
			.h2{
				font-size: 26rpx;
				letter-spacing: 2rpx;
				color: #999999;
			}
		}
		
		.userInfo{
			width: 600rpx;
			height: 200rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			
			.cellphone{
				width: 560rpx;	
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				
				input{
					outline-style: none ;
					border-bottom: 1rpx solid #ccc; ;
					border-radius: 3rpx;
					padding: 14rpx 14rpx;
					width: 500rpx;
					font-size: 30rpx;
					font-family: "Microsoft soft";
				}
			}
			
			.psd{
				width: 560rpx;	
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				
				input{
					outline-style: none ;
					border-bottom: 1rpx solid #ccc; ;
					border-radius: 3rpx;
					padding: 14rpx 14rpx;
					width: 500rpx;
					font-size: 30rpx;
					font-family: "Microsoft soft";
				}
			}
			
			.psd{
				width: 560rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
			}
		}
		u-button{
			width: 430rpx;
			height: 85rpx;
			position: relative;
			top: 45rpx;
		}
	}
	
	.test{
		background-color: pink;
	}
}

.main-1{
	width: 100%;
	height: 1500rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(#3f3d56,#2f2e41);
	
	.arrow-leftward{
		position: absolute;
		top: 65rpx;
		left: 50rpx;
	}
	.head-portrait{
		width: 710rpx;
		height: 1200rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		
		
		.morn-img{
			width: 340rpx;
			height: 320rpx;
		}
		
		.title{
			width: 600rpx;
			height: 150rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			
			.h1{
				font-size: 46rpx;
				letter-spacing: 3rpx;
				font-weight: bold;
				color: #f3f3f3;
			}
			
			.h2{
				font-size: 26rpx;
				letter-spacing: 2rpx;
				color: #999999;
			}
		}
		
		.userInfo{
			width: 600rpx;
			height: 200rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			
			.cellphone{
				width: 560rpx;	
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				
				input{
					outline-style: none ;
					border-bottom: 1rpx solid #ccc; ;
					border-radius: 3rpx;
					padding: 14rpx 14rpx;
					width: 500rpx;
					font-size: 30rpx;
					font-family: "Microsoft soft";
					color: #f3f3f3;
				}
			}
			
			.psd{
				width: 560rpx;	
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				
				input{
					outline-style: none ;
					border-bottom: 1rpx solid #ccc; ;
					border-radius: 3rpx;
					padding: 14rpx 14rpx;
					width: 500rpx;
					font-size: 30rpx;
					font-family: "Microsoft soft";
				}
			}
			
			.psd{
				width: 560rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
			}
		}
		u-button{
			width: 430rpx;
			height: 85rpx;
			position: relative;
			top: 45rpx;
		}
	}
	
	.test{
		background-color: pink;
	}
}
</style>
