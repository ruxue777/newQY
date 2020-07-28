<template>
	<view class="main">
		<u-navbar  title="银行卡设置"></u-navbar>
		<view class="Bankcardlist" v-if="this.showEmpty != 0">
			<view class="cont" v-for="(item,index) in BankCardList" :key="index" >
				<image :src="item.imgUrl" @click="test"></image>
				<view class="left" @click="test">
					<view class="conter">
						<text class="top-title">{{item.BankCnName}}</text>
						<text class="type">{{item.BankType}}</text>
						<text class="id">**** **** **** {{(item.CardID.substr(-4,4))}}</text>
					</view>
				</view>
				<u-icon name="minus-circle" color="#999999" size="48" @click="removeBankCard(item.id)"></u-icon>
			</view>
			
			<view class="button">
				<u-icon name="plus" color="#999999" size="60" @click="addBankCard()"></u-icon>
			</view>
			
		</view>
		<view class="notList" v-else>
			<u-empty text="暂无绑定银行卡" mode="list" ></u-empty>
		</view>
		
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default { 
		data() {
			return {
				showEmpty:0,
				user_id:'',
				BankCardList:[]
			};
		},
		onLoad(e) {
			this.user_id = e.user_id
			this.getBankCardList();
		},
		methods:{
			isType(category)
			{	
				//DC为储蓄卡，CC为信用卡
				if(category === "DC")
				{
					return "储蓄卡"
				}
				else if(category === "CC")
				{
					return "信用卡"
				}	
			},
			getBankCardList(){
				request('API_GetList_BankCard',{user_id:this.user_id}).then(res=>{
					this.showEmpty = res.length;
					
					let data = []
					for(let i=0;i<res.length;i++){
						data.push({BankCnName:res[i].BC_BankCnName,
						imgUrl:`/static/bankCard/${res[i].BC_BankEnName}.png`,
						BankType:res[i].BC_BankType,CardID:res[i].BC_CardID,id:res[i].id})
					}
					this.BankCardList = data 
				})
			},
			addBankCard(){
				uni.request({
					url:`https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardBinCheck=true&cardNo=${this.cardNumber}`,
					method:'GET',
					header:{'content-type': 'application/x-www-form-urlencoded'},
				}).then(res=>{
					let name = res.bank
					
				})
			},
			removeBankCard(CardID){
				uni.showModal({
					title:'您确定删除吗?',
					confirmText:'确认',
					success:(res=>{
						if(res.cancel)
						{
							return;
						}
						else if(res.confirm)
						{
							const _this = this
							request('API_DelBankCard',{BC_Id:CardID,user_id:_this.user_id}).then(res=>{
								if(res.result_code === "SUCCESS"){
									this.$refs.uToast.show({
										title: res.result_content,
										type: 'success'
									})
									this.getBankCardList()
								}
								else{
									this.$refs.uToast.show({
										title: res.result_content,
										type: 'error'
									})
								}
							})
						}
					})
				})
			},
			test(){
				console.log(123)
			}
		}
	}
</script>

<style lang="less">
.main{
	display: flex;
	justify-content: center;
	align-items: center;
	.Bankcardlist{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		position: relative;
		top: 180rpx;
		
		.cont{
			width: 650rpx;
			height: 200rpx;
			border: 1rpx solid #C0C0C0;
			border-radius: 15rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 20rpx;
			image{
					width: 70rpx;
					height: 70rpx;
				}
				.left{
					margin-top: 20rpx;
					.conter{
					width: 450rpx;
					height: 180rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					
					.top-title{
						width: 380;
						height: 60rpx;
						font-size: 36rpx;
					}
					.type{
						width: 380;
						height: 50rpx;
						margin-left: 30rpx;
						font-size: 28rpx;
					}
					.id{
						width: 500;
						height: 60rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 42rpx;
					}
				}
			}
			u-icon{
				width: 70rpx;
				height: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.button{
			position:fixed;
			bottom:20rpx;
			width:100%;
			height:100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.notList{
		width: 500rpx;
		height: 500rpx;
		margin-top: 350rpx;	
	}
}
</style>
