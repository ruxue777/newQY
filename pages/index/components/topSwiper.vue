<template>
	<view class="wrap">
		<u-swiper :list="swiperData" name="ADR_ImgUrl" :effect3d="true" duration="2000" :circular="true" mode="dot" @click="toGoodsDatails()"></u-swiper>
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
			toGoodsDatails(index){
				request('API_GetInfo_BusinessProductSearch',{ProductID:this.swiperData[index].ADR_PageParam,Longitude:this.LongItude,Latitude:this.LatItude}).then(res=>{
					uni.navigateTo({
						url:`/pages/goodsdetails/goodsdetails?id=${res.id}&BusinessID=${res.BusinessID}&CategoryID=${res.CategoryID}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
					})
				})
			}
		}
		
	}
</script>

<style lang="less" scoped>
.wrap {
	padding: 0rpx 20rpx;
}
</style>
