<template>
	<view class="wrap">
		
		<view class="demo-layout box-display">
			<image class="location-img" src="../../../static/image/location.png"></image>
			<view class="location-text">{{LocationData}}
				<image class="right-img" src="../../../static/image/small_rigth_pointer.png"></image>
			</view>
		</view>
		
		<u-row gutter="12">
			<u-col span="12" @click="to_Search()">
				<view class="seek">
					<image class="search-img" src="../../../static/image/search.png"></image>
					<text class="search-text">幸福山庄养生</text>
				</view>
			</u-col>
		</u-row>			 
	</view>
	
</template>

<script>
	export default {
		props:['LocationData'],
		data() {
			return {
				keyword:''
			}
		},
		methods: {
			to_Search(){
				console.log('去搜索页面')
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap {
	padding: 55rpx 20rpx 10rpx 20rpx;
	background-color: #FAE64F;
	width: 100%;
	height: 355rpx;
	margin-bottom: -120rpx;
}

.demo-layout {
	height: 55rpx;
	border-radius: 8rpx;
}
.right-img{
	height: 17rpx;
	width: 11rpx;
	margin-left: 20rpx;
}
.seek{
	height: 70rpx;
	width: 710rpx;
	border-radius: 10rpx;
	background:rgba(255,255,255,1);
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	top: 25rpx;
	
	.search-img{
		width: 36rpx;
		height: 36rpx;
		margin-right: 5rpx;
	}
	.search-text{
		font-size:28rpx;
		color:rgba(153,153,153,1);
	}
}
.box-display{
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.location-img{
	width: 28rpx;
	height: 34rpx;
}
.location-text{
	width: 560rpx;
	height: 45rpx;
	font-size:36rpx;
	font-weight: bold;
	margin-left: 12rpx;
	margin-top: -5rpx;
}
</style>
