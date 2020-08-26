<template>
	<view class="main">
		<scroll-view class='wrapper' scroll-x="true">
		  <view class='horizontal-scroll' v-for="(item,index) in dataList" :key="index">
		    <text>{{item.name}}</text>
		  </view>
		</scroll-view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[
				      {
				        name: '贾宝玉'
				      },
				      {
				        name: '林黛玉'
				      },
				      {
				        name: '薛宝钗'
				      },
				      {
				        name: '贾元春'
				      },
				      {
				        name: '贾迎春'
				      },
				      {
				        name: '贾探春'
				      },
				      {
				        name: '贾惜春'
				      }
				    ]
			};
		},
		onLoad() {
			this.data.dataList;
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
.main{
	.wrapper {
	  width: 100%;
	  white-space: nowrap;
	  display: flex;
	}
	.horizontal-scroll {
	  width: 100rpx;
	  height: 100rpx;
	  line-height: 100rpx;
	  background-color: green;
	  margin-right: 40rpx;
	  display: inline-block;
	  text-align: center;
	}
	.horizontal-scroll text {
	  font-size: 28rpx;
	  color: #fff;
	  text-align: center;
	}
}
</style>
