<template>
	<view class="wrap">
		<u-swiper :list="swiperData" name="ADR_ImgUrl" :effect3d="true" duration="2000" :circular="true" mode="dot" @click="toDatails()"></u-swiper>
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		props:['swiperData','LatItude','LongItude'],
		data() {
			return {
				
			};
		},
		methods:{
			//根据轮播图下标得到商品id,查询出数据后跳转
			toDatails(index){
				switch(this.swiperData[index].ADR_Page){
					case "HttpUrl": 
						uni.navigateTo({
							url:`/pages/web/web?webUrl=${encodeURIComponent(JSON.stringify(this.swiperData[index].ADR_PageParam))}`
						})
					break;
					case "ProductID":
						request('API_GetInfo_BusinessProductSearch',{ProductID:this.swiperData[index].ADR_PageParam,Longitude:this.LongItude,Latitude:this.LatItude}).then(res=>{
							uni.navigateTo({
								url:`/pages/goodsdetails/goodsdetails?id=${res.id}&BusinessID=${res.BusinessID}&CategoryID=${res.CategoryID}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
							})
						})
					break;
					case "BusinessID":
						uni.navigateTo({
							url:`/pages/shopdetails/shopdetails?BusinessID=${this.swiperData[index].ADR_PageParam}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
						})
					break;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap {
	padding: 0rpx 20rpx;
}
</style>
