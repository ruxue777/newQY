<template>
	<view class="content">
		
		<view class="tobeij">
			<image class="back_img" :src="ADdata[0].ADR_ImgUrl"></image>
			<view class="wc">
				<navigator url="/pages/index/index" open-type="switchTab" hover-class="other-navigator-hover">
					<p>完成</p>
				</navigator>
			</view>
			<view class="logo" >
				<image :src="ADdata[1].ADR_ImgUrl"></image>
			</view>
			<view class="zfcg">
				<p>支付成功</p>
			</view>
			
			<view class="lakuang">
				<view class="beiban"></view>
			</view>
		</view>
		<view class="zhanshik">
			<view class="neik" >
				<view class="nr1">
					<span>¥</span><p>{{Amount}}</p>
				</view>
				<view class="xuxian"><p></p></view>
				<view class="jybh">
					<span class="jybh2">交易编号：</span><span class="jybhnr">{{orderId}}</span>
				</view>
				<view class="jybh">
					<span class="fksj">付款时间：</span><span class="fksjnr">{{date}}</span>
				</view>
				<view class="jybh">
					<span class="zffs">支付方式：</span><span class="zffsnr">{{ModePay}}</span>
				</view>
				<view class="jybh">
					<span class="skf">收款方：</span><span class="skfnr">{{BusinessName}}</span>
				</view>
			</view>
		</view>
		<view class="bottom_image">
			<image :src="ADdata[2].ADR_ImgUrl"></image>
		</view>
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default{
		data(){
			return{
				//Time
				date:'',
				//支付方式
				ModePay:'暂无',
				Amount:0,
				orderId:'',
				BusinessName:'',
				//广告数据
				ADdata:[]
			}
		},	
		onLoad(option) {
			const {AmountType,Amount,orderId,BusinessName} = option
			
			this.ModePay = AmountType
			this.Amount = Amount
			this.orderId = orderId
			this.BusinessName = BusinessName
			
			this.getTime();
			this.getADdata();
		},
		methods:{
			getADdata()
			{	
				request('API_GetList_ADRecord_CallIndex',{CallIndex:'ad0009'}).then(res=>{
					this.ADdata = res
				})
			},
			getTime()
			{
			   var formatDateTime = function (date) {
					var y = date.getFullYear();
					var m = date.getMonth() + 1;
					m = m < 10 ? ('0' + m) : m;
					var d = date.getDate();
					d = d < 10 ? ('0' + d) : d;
					var h = date.getHours();
					h=h < 10 ? ('0' + h) : h;
					var minute = date.getMinutes();
					minute = minute < 10 ? ('0' + minute) : minute;
					var second=date.getSeconds();
					second=second < 10 ? ('0' + second) : second;
					return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
			   };
			   let time = formatDateTime(new Date())
			   this.date = time
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.skfnr{
			font-size: 38rpx;
		}
		.gg1{
			width: 670rpx;
			height:	180rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			img{
				width: 670rpx;
				height: 150rpx;
				border-radius: 20rpx;
			}
		}
		.guanggao{
			width: 100%;
			height: 360rpx;
			margin-top: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.tobeij{
			width: 100%;
			height: 460rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.back_img{
				width: 100%;
				height: 460rpx;
			}
		}
		.wc{
			width: 100%;
			height: 50rpx;
			display: flex;
			align-items: center;
			margin-top: 60rpx;
			margin-left: 50rpx;
			font-weight: bold;
			color: #000000;
			font-size: 34rpx;
			position: fixed;
			
		}
		.logo{
			width: 240rpx;
			height: 240rpx;
			position: absolute;
			top: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 220rpx;
				height: 220rpx;
			}
		}
		.zfcg{
			width: 100%;
			height: 120rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #000000;
			font-weight: bold;
			font-size: 46rpx;
			position: absolute;
			top: 255rpx;
		}
		.lakuang{
			width: 100%;
			height: 30rpx;
			position:relative;
			top: -35rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: -30rpx;
		}
		.beiban{
			width: 690rpx;
			height: 30rpx;
			background: #548D0D;
			
			border-radius: 20rpx;
		}
		.zhanshik{
			width: 100%;
			height: 500rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: -48rpx;
		}
		
		.bottom_image{
			height: 300rpx;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			image{
				margin-top: 15rpx;
				width: 680rpx;
				height: 200rpx;
				border-radius: 20rpx;
			}
		}
		
		.neik{
			width: 670rpx;
			height: 500rpx;
			background: #FFFFFF;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			 box-shadow:#9D9D9D 0px 0px 10px;
			 z-index: 300;
		}
		.nr1{
			width: 100%;
			height: 120rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			p{
				font-size: 54rpx;
				font-weight: bold;
				margin-left: 8rpx;
			}
			span{
				margin-top: 10rpx;
				font-weight: bold;
			}
		}
		.xuxian{
			width: 100%;
			height: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			p{
				width: 626rpx;
				height: 1px;
				background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
				background-size: 11px 1px;
				background-repeat: repeat-x;
			}
		}
		.jybh{
			width: 630rpx;
			height: 70rpx;
			display: flex;
			align-items: center;
			flex-direction: row;
			
		}
		.jybh2{
			width: 180rpx;
		}
		.jybhnr{
			margin-left: -30rpx;
		}
	}
</style>
