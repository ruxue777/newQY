<template>
	<view>
		<view class="main-0" v-if="isNight==false">
			<view class="arrow-leftward" @click="back">
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
				
				<view class="operating">
					<view class="left" @click="tosignIn">注册</view> 
					<view class="right">忘记密码</view>
				</view>
				
				<u-button :ripple="true" shape="circle" type="warning" ripple-bg-color="#f3f3f3" @click="userLogin">登录</u-button>
				<u-toast ref="uToast" />
			</view>
		</view>
		
		<view class="main-1" v-if="isNight==true">
			<view class="arrow-leftward" @click="back">
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
				
				<view class="operating">
					<view class="left" @click="tosignIn">注册</view>
					<view class="right">忘记密码</view>
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
				isNight:false
			};
		},
		onLoad() {
			this.getTime()
		},
		methods:{
			tosignIn(){
				uni.navigateTo({
					url:'/pages/user/signUp'
				})
			},
			userLogin(){
				if(!this.mobile){
					this.$refs.uToast.show({
						title: '请输入手机号',
						type: 'error ',
						icon: true
					})
					return;
				}else if(!this.password){
					this.$refs.uToast.show({
						title: '请输入密码',
						type: 'error ',
						icon: true
					})
					return;
				}else{
					request('API_CheckLogin',{loginName:this.mobile,loginPsw:this.password}).then(res=>{
						if(res.result_code === "SUCCESS"){
							//放入本地缓存
							uni.setStorageSync("globalUser",res);
							this.$refs.uToast.show({
								title: "登录成功,欢迎",
								type: 'success',
								isTab:true,
								url: '/pages/user/user'
							})
						}else{
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'error ',
								icon: true
							})
							return;
						}
					})					
				}
			},
			getTime(){
				//取得当前时间的小时
			    let timeNow = new Date().getHours();
			    //判断当前时间是否在  06:00-18:00 之间
			    if(timeNow >= 6 && timeNow < 18 ){
			        this.isNight = false
			    }else{
					this.isNight = true
				}
			},
			back(){
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="less">
.main-0{
	width: 100%;
	height: 1200rpx;
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
		height: 900rpx;
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
		
		.operating{
			width: 550rpx;
			height: 60rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			.left{
				position: relative;
				left: -35rpx;
			}
			.right{
				position: relative;
				right: -35rpx;
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
	height: 1700rpx;
	display: flex;
	align-items: flex-start;
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
		position: relative;
		top: 200rpx;
		
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
		.operating{
			width: 550rpx;
			height: 60rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			.left{
				color: #f3f3f3;
				position: relative;
				left: -35rpx;
			}
			.right{
				color:#f3f3f3;
				position: relative;
				right: -35rpx;
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
		}
		u-button{
			width: 430rpx;
			height: 85rpx;
			position: relative;
			top: 45rpx;
		}
	}
}
</style>
