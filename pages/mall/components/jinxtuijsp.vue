<template>
	<view class="content">		
		<view class="xiak" v-for="(item,index) in adData" :key="index">
			<view class="jn" @click="getADR_Page(item.ADR_Page,item.ADR_PageParam)">
				<image class="img" :src="item.ADR_ImgUrl"></image>
			</view>
		</view>
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default{
		props:["adData","LongItude","LatItude"],
		data(){
			return{
				
			}
		},
		methods:{
			getADR_Page(ADR_Page,ADR_PageParam){
				switch(ADR_Page){
					case "HttpUrl":
					    uni.showToast({
					    	title:'跳转Http失败',
							icon:'none'
					    })
					    break;
					case "Page":
					    uni.showToast({
					    	title:'跳转指定页失败',
					    	icon:'none'
					    })
					    break;
					case "ProductID":
					    this.tospxqsy(ADR_PageParam);
					    break;
					case "BusinessID":
					    this.toShopdetail(ADR_PageParam);
					    break;
				}
			},
			tospxqsy(ADR_PageParam){
				request('API_GetInfo_BusinessProductSearch',{ProductID:ADR_PageParam,Longitude:this.LongItude,Latitude:this.LatItude}).then(res=>{
					uni.navigateTo({
						url:`/pages/goodsdetails/goodsdetails?id=${ADR_PageParam}&CircleID=${0}&BusinessID=${res.BusinessID}&LatItude=25.81751&LongItude=114.92085`
					})
				})
			},
			toShopdetail(id){
				// uni.navigateTo({
				// 	url:`/pages/dianpuleibie/dianpu?BusinessID=${id}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				// })				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		margin-top: 10rpx;
		.xia{
			width: 360rpx;
			height: 220rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: row;
		}
		.jn{
			width: 720rpx;
			height: 140rpx;
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 40rpx;
		}
		.img{
			width: 700rpx;
			height: 200rpx;
		}
		.xiak{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-bottom: 30rpx;
		}
		.wwwk{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
