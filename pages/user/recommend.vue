<template>
	<view class="main">
		<u-navbar  title="我的推荐"></u-navbar>
		
		<view class="cont">
			
			<view class="content" v-for="(item,index) in RecommendData" :key="index">
				<view class="img">
					<image :src="item.WM_headimgurl "></image>
				</view>
				<view class="middle">
					<view class="top">
						<text class="name">{{item.user_name}}</text>
						<view class="type">{{item.GradeInfo}}</view>
					</view>
					<view class="bottom">
						<text>{{item.mobile}}</text>
					</view>
				</view>
				<text class="time">{{item.reg_time}}</text>
			</view>
			
		</view>
	
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus"  />	
	
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		data() {
			return {
				Index:1,
				loadStatus: 'loadmore',
				user_id:'',
				RecommendData:[]
			};
		},
		onLoad(e) {
			this.user_id = e.user_id;
			this.getRecommend()
		},
		onReachBottom() {
			if(this.RecommendData.length<this.Index*10){
				this.loadStatus = 'nomore';
				return;
			}else{
				this.Index++;
				this.loadStatus = 'loading';
				// 模拟数据加载效果
				setTimeout(() => {
					this.getRecommend();
					this.loadStatus = 'loadmore';
				}, 1000);
			}
		},
		methods:{
			getRecommend(callBack){
				request('API_GetList_MyPerson',{user_id:this.user_id,pageSize:10,index:this.Index}).then(res=>{
					if(res.length<10){
						this.loadStatus = 'nomore'
					}
					this.RecommendData = [...this.RecommendData,...res]
					callBack && callBack()
				})
			}
		}
	}
</script>

<style lang="less">
.main{
	.cont{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.content{
			width: 100%;
			height: 180rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			border-bottom: 1rpx solid #999999;
			
			.img{
				width: 100rpx;
				height: 100rpx;
				position: relative;
				left: 30rpx;
				image{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50rpx;
				}
			}
			.middle{
				width: 400rpx;
				height: 160rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-start;
				position: relative;
				left: 30rpx;
				
				.top{
					width: 400rpx;
					height: 80rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					
					.name{
						width: 250rpx;
						height: 50rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						font-size: 32rpx;
					}
					
					.type{
						width: 150rpx;
						height: 50rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						background-color: #ffaa00;
						color: #FFFFFF;
						font-size: 22rpx;
						border-radius: 15rpx;
						position: relative;
						left: -15rpx;
					}
				}
				.bottom{
					width: 400rpx;
					height: 50rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size: 26rpx;
					color: #C0C0C0;
				}
			}
			.time{
				width: 200rpx;
				height: 35rpx;
				font-size: 24rpx;
				position: relative;
				top: 40rpx;
			}
		}
	}
}
</style>
