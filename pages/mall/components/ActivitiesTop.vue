<template>
	<view class="container">
		<!-- 轮播 -->
		<swiper class="swiper" :circular=true :autoplay=true :interval=2000 :current="swiperCurrent" @change="changeSwiper">
			<swiper-item v-for="(item,index) in CarouselImageSrc" :key="item">
				<image class="swiper-item" :src="item.ADR_ImgUrl" @click="to_Spxqsy(item.ADR_PageParam)" mode="widthFix"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		props:["CarouselImageSrc"],
		data() {			
			return {
			
			};
		},
		methods: {
			changeSwiper(e) {
				this.swiperCurrent = e.detail.current;
			},
			to_Spxqsy(ProductID)
			{	
				request('API_GetInfo_BusinessProductSearch',{ProductID:ProductID,Longitude:114.92085,Latitude:25.81751}).then(res=>{
					uni.navigateTo({
						url:`/pages/goodsdetails/goodsdetails?id=${ProductID}&CircleID=${res.CategoryID}&BusinessID=${res.BusinessID}&LatItude=25.81751&LongItude=114.92085`
					})
				})	
			}
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
		z-index: 2;
		.swiper {
			width: 100%;
			height: 350rpx;
			overflow: hidden;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			.swiper-item {
				width: 100%;
				height: 350rpx;
			}
		}
		.dots {
			position: absolute;
			left: 50%;
			// 这里一定要注意兼容不然很可能踩坑
			transform: translate(-50%, 0);
			-webkit-transform: translate(-50%, 0);			
			z-index: 99;
			display: flex;
			flex-direction: row;
			justify-content: center;
			
			margin-top: 20rpx;

			.dot {
				width: 24rpx;
				height: 8rpx;
				transition: all .6s;
				background: #BFBFBF;
				margin-right: 10rpx;
			}

			.active {
				width: 24rpx;
				height: 8rpx;
				background: #FBEDA0;
			}
		}
	}
</style>
