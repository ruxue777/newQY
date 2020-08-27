<template>
	<view class="content">
		<view class="tba_containa">
			<!-- 导航栏 -->
			<scroll-view class="tab" scroll-x :scroll-left="tabScroll" scroll-with-animation="true">
				<block v-for="(item, index) in menuList" :key="index">
					<view :class="['tab-item', currentTab == index ? 'active' : '']" :data-current="index" @click="clickMenu">
						{{ item.Main_title}}
					</view>
					
				</block>
			</scroll-view>
			<!-- 页面 -->
			<swiper class="list_content" duration="500" :current="currentTab" @change="changeContent">
				
				<!--优选-->
				<swiper-item class="content-item">
					<view class="chanp">
						<view class="chanpnk">
							<view class="lizi" v-for="(item,index) in goods_All" :key="index" @click="navItemClick(item.id,item.Latitude,item.Longitude,item.BusinessID)">
								<view class="cpt">
									<image :src="item.BP_ImgUrl"></image>
								</view>
								<view class="cpjs">
									<p class="spbt">{{item.BP_Name }}</p>
									<p class="spjg">¥{{item.BP_Amount}}</p>
								</view>
							</view> 
						</view>
					</view>
				</swiper-item>
				<!-- 可消费 -->
				<swiper-item class="content-item">
					<view class="chanp">
						<view class="chanpnk">
							<view class="lizi" v-for="(item,index) in goods_List" :key="index" @click="navItemClick(item.id,item.Latitude,item.Longitude,item.BusinessID)">
								<view class="cpt">
									<image :src="item.BP_ImgUrl"></image>
								</view>
								<view class="cpjs">
									<p class="spbt">{{item.BP_Name }}</p>
									<p class="spjg">¥{{item.BP_Amount}}</p>
								</view>
							</view> 
						</view>
					</view>
				</swiper-item>
				
				<swiper-item class="content-item">
					<view class="chanp">
						<view class="chanpnk">
							<view class="lizi" v-for="(item,index) in goods_List" :key="index" @click="navItemClick(item.id,item.Latitude,item.Longitude,item.BusinessID)">
								<view class="cpt">
									<image :src="item.BP_ImgUrl"></image>
								</view>
								<view class="cpjs">
									<p class="spbt">{{item.BP_Name }}</p>
									<p class="spjg">¥{{item.BP_Amount}}</p>
								</view>
							</view> 
						</view>
					</view>
				</swiper-item>
				
				
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props:['menuList','goods_All',"LongItude","LatItude"],
		data() {
			return {
				tabScroll: 0,
				currentTab: 0,
				goods_List:[]
			};
		},
		watch:{
			currentTab:function(){
				if(this.currentTab != 0){
					this.getNowGoodsList(this.currentTab)
				}
			}
		},
		methods:{
			getNowGoodsList(e){
				const _this = this;
				this.request({
				url:'https://api.xfgoo.com:60010/api/XFClientAPI_Json.asmx/API_GetList_BusinessProductExchange_V2',
				data:{
					CircleID:0,
					CategoryID:this.menuList[e].id,
					BusinessID:'',
					Keywords:'',
					Longitude:this.LongItude,
					Latitude:this.LatItude,
					orderState:0,
					IsFL:'',
					IsBP:'',
					pageSize:20,
					index:1
				},
				method:'GET',
				dataType:'json',
				header:{'content-type': 'application/x-www-form-urlencoded'} ,
				}).then(res=>{
					_this.goods_List = res
				})	
			},
			navItemClick(workerId,G_Latitude,G_Longitude,B_BusinessID){
				uni.navigateTo({
					url: '/pages/spxqsy/spxqsy?workerId=' + workerId 
							+ "&G_Latitude=" + G_Latitude + "&G_Longitude=" + G_Longitude + "&B_BusinessID=" + B_BusinessID 				
				});
			},
			//点击tab menu
			clickMenu: function(e) {
				var current = e.currentTarget.dataset.current; //获取当前tab的index
				// 导航tab共2个，获取一个的宽度
				var tabWidth = this.windowWidth / 1;
				this.tabScroll = (current - 1) * tabWidth; //使点击的tab始终在居中位置
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
				}
			},
			//活动menu 内容
			changeContent: function(e) {
				var current = e.detail.current; // 获取当前内容所在index,文档有
				var tabWidth = this.windowWidth / 4;
				this.currentTab = current;
				this.tabScroll = (current - 4) * tabWidth;
			},
			//放大图片
			chooseImage: function(e) {
				var urls = [e];
				uni.previewImage({
					urls: urls
				});
			},
			jz() {
				if (this.pages < this.list.length) {
					var pages = this.pages + 5;
					var list = this.list.slice(this.pages, pages);
					for (var i = 0; i < list.length; i++) {
						this.list_img.push(list[i]);
					}
					this.pages = pages;
				} else {
					this.pages_all = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.tba_containa{
			width: 100%;
			margin-top: 45rpx;
			position: sticky;
			top: 0;
			left: 0;
		}
		.spbt{
			width: 340rpx;
			height: 40rpx;
			font-size: 28rpx;
			margin-top: 20rpx;
			margin-left: 15rpx;
			max-width: 330rpx;
			max-height: 40rpx;
			overflow: hidden;
			word-break: break-all;  /* break-all(允许在单词内换行。) */
			text-overflow: ellipsis;  /* 超出部分省略号 */
			display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
			// -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 1; /** 显示的行数 **/
		}
		.spjg{
			width: 340rpx;
			height: 40rpx;
			font-size: 30rpx;
			font-weight: bold;
			margin-top: 40rpx;
			margin-left: 50rpx;
			display: flex;
			align-items: center;
			flex-direction: row;
		}
		.cpjs{
			width: 340rpx;
			height: 160rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.cpt{
			width: 340rpx;
			height: 300rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 340rpx;
				height: 340rpx;
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
			}
		}
		.lizi{
			width: 340rpx;
			height: 460rpx;
			background: white;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-top: 40rpx;
		}
		.chanpnk{
			width: 700rpx;
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			flex-wrap: wrap;
		}
		.chanp{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #EEEEEE;
			padding-bottom: 60rpx;
		}
		
	}
	
	//下面是滑动订单页默认样式不能修改！！！
	
	.content-item {
		width: 10%;
		margin: 0 auto;
		margin-bottom: 40upx;
		background: #f2f2f2;
	}
	
	sub_title
	
	.tba_contain {
		width: 100%;
		height: 100%;
	}
	
	.tab {
		width: 100%;
		height: 100rpx;
		white-space: nowrap;
		box-sizing: border-box;
		overflow: hidden;
		line-height: 100rpx;
		background: #f2f2f2;
		position: sticky;
		top: 0rpx;
		z-index: 9999;
	}
	
	.tab-item {
		display: inline-block;
		width: 20%;
		text-align: center;
		font-size: 14px;
	}
	
	.active {
		color: #ff8a21;
		font-size: 16px;
		font-weight: bold;
	}
	
	.list_content {
		box-sizing: border-box;
		text-align: center;
		font-size: 14px;
		min-height: 100vh;
	}
	
	.content-item {
		overflow-y: scroll;
		margin: 0 auto;
	}
	
	.list_img {
		width: 95%;
		margin: 0 auto;
		text-align: left;
		font-size: 16px;
		margin-top: 40rpx;
		border-bottom: solid 1px #ccc;
	}
	
	.list_img view {
		margin-bottom: 10px;
	}
	
	.list_img image {
		margin-bottom: 10px;
	}
	
	.list {
		width: 90%;
		margin: 0 auto;
		padding: 2.5%;
		text-align: left;
		font-size: 16px;
		margin-top: 20rpx;
		color: #333;
		padding-bottom: 80rpx;
		border-bottom: solid 1px #eee;
	}
	.sj-active {
		display: block;
		float: right;
		width: 40px;
		padding: 10rpx;
		text-align: center;
		color: #fff;
		font-size: 28rpx;
		background-color: #f2f2f2;
	}
	.list view:nth-child(1) {
		font-weight: bold;
	}
	.list view:nth-child(2) {
		padding-top: 10px;
		font-size: 16px;
		margin-bottom: 10px;
	}
	.tips {
		width: 180px;
		margin: 0 auto;
		margin-top: 30rpx;
		background: #666;
		line-height: 100rpx;
		text-align: center;
		color: #fff;
		font-size: 14px;
	}
	.tips2 {
		text-align: center;
		color: #cccccc;
		font-size: 14px;
		margin-top: 20px;
	}
	
</style>
