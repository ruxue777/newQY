<template>
	<view class="content">
		<view class="dinbu">
			<view class="shanglan1">
				<u-icon name="arrow-left" size="40" @click="back"></u-icon>
			</view>
			<view class="shanglan2">
				<view class="ssk">
					<u-icon name="search" size="40"></u-icon>
					<span class="tp2"><input type="text" placeholder="搜索" v-model="ipt" @confirm="searchNow($event)" /></span>
				</view>
			</view>
			<view class="shanglan3">
			</view>
		</view>
		<view class="nr">
			<view class="hdias">
				<view class="lsss">
					<p>历史搜索</p>
					<p @click="clearKey">清除</p>
				</view>
			</view>
			<view class="neik">
				<view class="neik3" v-if="searchClose == 0">
					<p class="zw">暂无搜索记录</p>
				</view>
				<view class="nek2" v-else>
					<p class="shuju1" v-for="(item,index) in searchKey" :key="index" @click="record(item)"><span class="nl">{{item}}</span></p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				asd2:true,
				asd1:false,
				searchKey: [],
				ipt: '',
				searchClose: 1,
				LatItude:0,
				LongItude:0
			}
		},
		onLoad(e)
		{
			this.LatItude = e.LatItude
			this.LongItude = e.LongItude
		},
		onShow()
		{
			var vv = uni.getStorageSync('searchLocal');
			if( undefined == vv|| null == vv || '' == vv)
			{
				this.searchClose = 0
			}
			else
			{
				var arr = vv.split("-");
				this.searchKey = arr;
			}			
		},
		methods:{
			clearKey(){		
				uni.showModal({
					title:'提示',
					content: '删除所有历史信息?',
					success:(res=>{
						if(res.confirm)
						{
							this.searchKey =[]
							uni.setStorage({
								key:'searchLocal',
								data:this.searchKey
							});
						}
						else if(res.cancel)
						{
							return
						}
					})
				})
			},
			searchNow(e)
			{
				if(this.ipt == '')
				{
					uni.showToast({
						title: '未输入搜索关键字',
						icon: 'none',
						duration: 1000
					});
					return ;
				}
				var newArr = this.searchKey;
				newArr.push(this.ipt);
				this.searchKey = newArr;
				var newStr = newArr.join('-');
				uni.setStorage({
					key: 'searchLocal',
					data: newStr
				});
				
				uni.navigateTo({
					url:`/pages/seek/searchResults?ipt=${this.ipt}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
			},
			record(e)
			{
				uni.navigateTo({
					url:`/pages/seek/searchResults?ipt=${e}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
			},
			back(){	
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.zw{
			margin-left: 26rpx;
			color: #555555;
			font-size: 30rpx;
		}
		.hdias{
			width: 100%;
			height: 100rpx;
			margin-top: 180rpx;
			display: flex;
			align-items: cetner;
			justify-content: center;
			color: #555555;
		}
		.lsss{
			width: 700rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.nl{
			padding: 0 26rpx;
		}
		.shuju1{
			height: 54rpx;
			background: #D9D9D9;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 20rpx 20rpx 0;
			color: #555555;
		}	
		.nek3{
			width: 700rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			font-size: 30rpx;
			padding: 0 20rpx;
		}
		.nek2{
			width: 700rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			font-size: 30rpx;
			padding: 0 20rpx;
		}
		.neik{
			width: 100%;
			height: 800rpx;
		}
		.nr{
			width: 100%;
			height: 100vh;
			background: #f2f2f2;
		}
		.dinbu{
				width: 100%;
				height: 120rpx;
				padding-top: 60rpx;
				background: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: row;
				position: absolute;
				top: 0;
				left: 0;
				
			}
			.shanglan1{
				width: 60rpx;
				height: 120rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.shanglan2{
				width: 620rpx;
				height: 120rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				
			}
			.shanglan3{
				width: 60rpx;
				height: 120rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 36rpx;
					height: 36rpx;
					margin-top: 16rpx;
				}
			}
			.ssk{
				width: 500rpx;
				height: 80rpx;
				border-radius: 50rpx;
				display: flex;
				align-items: center;
				flex-direction: row;
				box-shadow:0 0 4px 1px #BBBBBB; 
				position: relative;
				
				u-icon{
					position: absolute;
					left: 20rpx;
				}
			}
			.tp{
				width: 70rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 30rpx;
			}
			.tp2{
				width: 420rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 50rpx;
				font-size: 36rpx;
				color: black;
				input{
					width: 380rpx;
					height: 80rpx;
				}
			}
	}
</style>
