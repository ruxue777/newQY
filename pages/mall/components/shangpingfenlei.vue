<template>
	<view class="content">
		<view class="youxu">
			<view class="youxunk">
				<view class="youxunks">
					<p>优选好店</p>
				</view>
				<view class="youxunkx">
					<view class="lizx" v-for="(item,index) in GoodShops" :key="index" @click="toShopdetail(item.id)">
						<image :src="item.ImgUrl" ></image>
						<p>{{item.BusinessName}}</p>
					</view>
					<view class="lizx" @click="toAll_Shop()">
						<image src="../../../static/image/AllShop.png"></image>
						<p>全部店铺</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:["GoodShops","LongItude","LatItude"],
		data(){
			return{
				
			}
		},
		methods:{
			toShopdetail(id){
				uni.navigateTo({
					url:`/pages/dianpuleibie/dianpu?BusinessID=${id}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})				
			},
			toAll_Shop(){
				uni.navigateTo({
					url:`/pages/youxuan/youxuan?LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		margin-top: 20rpx;
		.lizx{
			width: 120rpx;
			height: 160rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			image{
				width: 100rpx;
				height: 100rpx;
				border-radius: 20rpx;
			}
			p{
				font-size: 20rpx;
				font-weight: bold;
				max-width: 120rpx;
				max-height: 40rpx;
				overflow: hidden;
				word-break: break-all;  /* break-all(允许在单词内换行。) */
				text-overflow: ellipsis;  /* 超出部分省略号 */
				display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 1; /** 显示的行数 **/
			}
		}
		.youxunkx{
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			flex-wrap: wrap;
		}	
		.youxunks{
			width: 100%;
			height: 70rpx;
			display: flex;
			align-items: center;
			flex-direction: row;
			p{
				margin-left: 20rpx;
				font-weight: bold;
				font-size: 30rpx;
			}
		}
		.youxunk{
			width: 94%;
			display: flex;
			flex-direction: column;
			border-radius: 20rpx;
			background: #f2f2f2;
		}
		.youxu{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
