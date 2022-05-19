<template>

	
<qs-page class="page">

		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image
							:src="item.image_url" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!--  分享 -->
		<view class="share-section" v-if="goodsInfo.ticheng_amount>0">
			<view class="share-icon">
				<text class="iconfont icon-jiangli" style="color:#ffffff;"></text>
				返利
			</view>
			<text class="tit">该商品可领现金收益[团队会员可购买]</text>
			<text class="iconfont icon-jiangpin"></text>
		</view>
		<view class="introduce-section"> 
			<text class="title">{{goodsInfo.title}}</text>
			<view class="price-box">
				<text class="price">{{goodsInfo.users_price}}</text>
			</view>
			<view class="bot-row ">
				<text>库存: {{goodsInfo.stock_count}}</text>
			</view>
		</view>

	<view>
		<!-- && JSON.stringify(gspecList)!='{}'-->
		<specificationsnew @submitSukid="update" v-if="JSON.stringify(goodsInfo)!='{}' && JSON.stringify(gspecList)!='{}'" :goodsInfo="goodsInfo" :gspecList="gspecList" :attrList="attrList" ref="mychild"></specificationsnew>
	</view>
	
		<view class="c-list">
			<view class="c-row b-b" @click="selectSukid">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text">{{selected_skutitlename}}</text>
				</view>
				<text class="iconfont icon-dibudaohanglan-"></text>
			</view>

			<view class="c-row">
				<text class="tit">配送服务</text>
				<view class="con-list">
					<text>免费包邮</text>
				</view>
			</view>

		</view>
		
		<view class="u-content">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<u-parse :html="goodscontent" :selectable="true" :tag-style="contentstyle"></u-parse>
		</view>

<view class="navigation">
	<u-row gutter="16" justify="space-between">
		<u-col span="2" text-align="center">
			<navigator url="/pages/index/index" open-type="switchTab" class="item">
				<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">首页</view>
			</navigator>
		</u-col>
		<u-col span="2" text-align="center">
			<view class="item car" @click="$tools.routerTo('/pages/shop/cart')">
				<u-badge class="car-num" :count="cart_num" type="error" :offset="[-3, -6]"></u-badge>
				<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">购物车</view>
			</view>
		</u-col>
		<u-col span="4" >
			<view class="cart btn u-line-1" @click="addcart()">加入购物车</view>
		</u-col>
		<u-col span="4" >
			<view class="buy btn u-line-1" @click="buy()">立即购买</view>
		</u-col>
	</u-row>

		
	</view>
	</qs-page>
</template>


<script>
import {mapState,mapMutations} from 'vuex';
import specificationsnew from '@/components/specificationsnew.vue';
export default {
	components: {
		specificationsnew
	},
	data() {
		return {
				goodsInfo:[],
				goodscontent:"",
				contentstyle:{
					img:'width:100%'
				},
				imgList: [],
				goods_specvalueid:null,
				selected_skutitlename:'无',
				gspecList:{},
				attrList:{},
				cart_num:'0',
				value_id:'',
				arr_id:'',
				hasLogin:false,
		};
	},
	computed: {
	  ...mapState(['user']),
	},
	onLoad(option){
	   this.hasLogin=this.$store.getters.loginFlag;
	   let query=JSON.parse(option.query);
	   let aid=query.aid;
    //if(query.q){
    //  let q = decodeURIComponent(query.q);
    //aid = this.app.getQueryString(q, 's');
	//  console.log(q);
    //}

                    this.$api('shop.products_view', {
						aid:aid
					}).then(res => {
						if (res.code==200){
							console.log(res);
							this.goodsInfo=res.data;
							this.goodscontent=this.goodsInfo.content;
							this.imgList=res.data.image_list;
								this.cart_num=res.data.cart_num;
								//可选规格组
								//this.spec = Array.isArray(res.data.data.spec) ? res.data.data.spec : [];
								this.goods_specvalueid=res.data.spec_value_id;
							if (Array.isArray(res.data.gspec_list.goods_spec)){
								setTimeout(() => {
								this.gspecList    =res.data.gspec_list;
								console.log('aaaa',this.gspecList);
								}, 200);
							}
							
							// if (Array.isArray(res.data.attr_select)){
							// 	this.attrList.attr    =res.data.attr_select;
							// }

						}
                    }).catch((e)=>{
                        resolve(false);
                    });



	},

	methods: {
		/**
		 * 显示规格弹窗
		 */
		selectSukid:function(){
			if(JSON.stringify(this.goodsInfo)!='{}' && (JSON.stringify(this.gspecList)!='{}'||JSON.stringify(this.attrList)!='{}')){
			this.$refs.mychild.toggleSpec();
			}else{
				 uni.showToast({
					title: "无可选项目",
					mask: false,
					duration: 1500
				});
			}
		},
		/**
		 * 父元素接受子元素（规格）
		 * 
		 */
		update:function(e){
			this.goods_specvalueid=e.specid;
			this.selected_skutitlename=e.specname;
			this.arr_id=e.arr_id;
			this.arr_serialize=e.arr_serialize;
			this.addcart();
		},
		buy(){
			uni.setStorageSync('gocart','gocart');
			this.addcart();
		},
		addcart(add_status){
			var add_status= uni.getStorageSync('gocart')?uni.getStorageSync('gocart'):"";
			if(!this.hasLogin){
				this.$u.toast('请先登陆');
				return;
			}
			
			if (this.goods_specvalueid==''){ //||(JSON.stringify(this.attrList.attr)!='[]'&&this.arr_id=='')
				this.$refs.mychild.toggleSpec();
				return;
			}
		console.log('bbb')
		/*加入购物车*/
                    this.$api('shop.add_cart', {
					serialize:this.arr_serialize,
					arr_id:this.arr_id,
					spec_value_id:this.goods_specvalueid,
					aid:this.goodsInfo.aid,
					num:1
					}).then(res => {
						console.log('ok',res);
						if (res.code==200){
							this.cart_num=res.data.num;
							this.$u.toast(res.data.msg);
							if (add_status=='gocart'){
								uni.setStorageSync('gocart','');
								uni.navigateTo({url: `/pages/shop/cart`});
							}
						}
                    }).catch((e)=>{});
		
		/*加入购物车*/
		uni.setStorageSync('gocart','');
			
		}
	},
};
</script>

<style lang="scss" scoped>
	
	.carousel {
		height: 460upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.attr-list {
		display: flex;
		flex-direction: column;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.item-list {
		padding: 20upx 0 0;
		display: flex;
		flex-wrap: wrap;
		text {
			display: flex;
			align-items: center;
			justify-content: center;
			background: #eee;
			margin-right: 20upx;
			margin-bottom: 20upx;
			border-radius: 100upx;
			min-width: 60upx;
			height: 60upx;
			padding: 0 20upx;
		}
		.selected {
			background: #fbebee;
			color: $uni-color-primary;
		}
		.noneActive {
			color: $uni-color-primary;
			background-color: rgba(0, 0, 0, 0.8);
		}
	}
	

	/* 标题简介 */
	.introduce-section{
		padding: 20upx 30upx;

		.title{
			font-size: 32upx;
			height: 50upx;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
		}
		.m-price{
			margin:0 12upx;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			text{
				flex: 1;
			}
		}
	}
	
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid #ddd;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -26upx;
				top: -12upx;
				position:absolute;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
		}
		.icon-you{
			margin-left: 4upx;
		}
	}
	
	.c-list{
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			.selected-text{
				margin-right: 10upx;
			}
		}

		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			line-height: 40upx;
		}
		.red{
			color: red;
		}
	}	
	
	/*  详情 */
	.u-content{
		padding: 30rpx;
		color: $u-content-color;
		background: #FFFFFF;
		font-size: 32rpx;
		line-height: 1.8;
		margin-top: 16upx;
		padding-bottom: 150upx;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		.d-header{
			display: flex;
			z-index: 0;
			justify-content: center;
			align-items: center;
			height: 80upx;
			color: $uni-text-color;
			position: relative;
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
	}
		
	
.navigation {
    position:fixed;
	width: 100%;
	bottom: 0rpx;
	border: solid 2rpx #f2f2f2;
	background: rgba(255,255,255,.9);
	padding: 16rpx 0rpx 30rpx 16rpx;
		.item {
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}

		.btn {
			line-height: 66rpx;
			padding: 0 30rpx;
			border-radius: 36rpx;
			color: #ffffff;
			text-align: center;
		}
		.cart {
			background-color: #ed3f14;
			margin-left: 30rpx;
		}
		.buy {
			background-color: #ff7900;
			margin-left: 15rpx;
			margin-right: 20rpx;
		}

}
</style>
