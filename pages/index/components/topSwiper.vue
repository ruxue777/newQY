<template>
	<view class="wrap">
		<u-swiper :list="swiperData" name="ADR_ImgUrl" :effect3d="true" duration="2000" :circular="true" mode="dot"></u-swiper>
	</view>
</template>

<script>
	export default {
		props:['swiperData'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
.wrap {
	padding: 0rpx 20rpx;
}
</style>
