<template>
	<view class="wrap">
		<u-row gutter="12">
			<u-col span="8">
				<view class="demo-layout box-display">
					<image class="location-img" src="../../../static/image/location.png"></image>
					<text class="location-text">赣州市渡口路啊啊啊</text>
				</view>
			</u-col>
			<u-col span="2">
				<view class="demo-layout "></view>
			</u-col>
			<u-col span="2">
				<view class="demo-layout "></view>
			</u-col>
		</u-row>
		
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
		data() {
			return {
				keyword:''
			}
		},
		methods: {
			to_Search(){
				
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap {
	padding: 25rpx 20rpx 10rpx 20rpx;
	background-color: #FAE64F;
}

.u-row {
	margin: 40rpx 0;
}

.demo-layout {
	height: 55rpx;
	border-radius: 8rpx;
}
.seek{
	height: 70rpx;
	margin-top: -25rpx;
	border-radius: 10rpx;
	background:rgba(255,255,255,1);
	display: flex;
	justify-content: center;
	align-items: center;
	
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
	width: 360rpx;
	height: 45rpx;
	font-size:36rpx;
	font-weight: bold;
	margin-left: 12rpx;
}
</style>
