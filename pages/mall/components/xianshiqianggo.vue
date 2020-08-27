<template>
	<view class="content">
		<view class="wwwwwwk">
			<view class="wwwwwwknk">
				<view class="lizi" v-for="(item,index) in Districts" :key="index" @click="toDistricts(item.id,item.BC_Name,item.BC_ImgUrl)">
					<image class="img" :src="item.BC_LogoUrl"></image>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
	 export default {
	 	props:['Districts','LongItude','LatItude'],
		
		data() {			
	 		return {				
	 			
	 		};
	 	},
	 	methods: {
	 		toDistricts(id,name,imgUrl){
				uni.navigateTo({
					url:`/pages/youxuan/nanmk?id=${id}&name=${name}&imgUrl=${imgUrl}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
			}
	 	}
	 }
</script>

<style lang="scss" scoped>
.content {
	margin-top: 20rpx;
	.lizi{
		width: 150rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 15rpx;
		.img{
			width: 150rpx;
			height: 80rpx;
			border-radius: 15rpx;
		}
	}
	.wwwwwwknk{
		width: 94%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.wwwwwwk{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
