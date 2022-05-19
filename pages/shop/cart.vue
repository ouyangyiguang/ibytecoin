<template>
	<qs-page>
	<qs-navbar isBack="false" backUrl="/pages/shop/index">
		<view class="u-flex"><h3>购物车</h3></view>
		<view class="u-flex u-m-r-22">
		</view>
	</qs-navbar>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				 {{$t('nodata')}}
				<navigator class="navigator" v-if="hasLogin" url="../mall/category" open-type="switchTab"> {{$t('walkaround')}}></navigator>
			</view>
			<view v-else class="empty-tips">
				 {{$t('nodata')}}
				<view class="navigator" @click="navToLogin"> {{$t('gotologin')}}></view>
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			
			<view  class="u-padding-20" v-if="cartList.length>0">
				<view v-for="(item, index) in cartList" :key="index" class="base-panel-box u-p-t-10 u-m-b-30">
					<view class="htitle">
						<text class="clamp title">{{item.product_name}}</text>
							<!-- <text class="customicon customicon-zhifuchenggong checkbox"
								:class="{checked: item.checked}"
								@click="check('item', index)"
							></text> -->
							<text class="del-btn customicon customicon-guanbi" @click="deleteCartItem(index)"></text>
					</view>
					<view class="item">
						<u-row gutter="0" justify="space-between">
							<u-col span="2" >
								<image :src="item.litpic" 
									:class="[item.loaded]"
									lazy-load 
									@load="onImageLoad('cartList', index)" 
									@error="onImageError('cartList', index)"
									style="width:90rpx;height:90rpx;border-radius:50%;"
								></image>
							</u-col>
							<u-col span="10" >
								<text class="attr" v-if="item.data!=''">{{item.data}}<br></text>
								<text class="price">价格：{{item.spec_price}}</text>
<!-- 	<uni-number-box
		class="step"
		:min="1" 
		:max="item.reserve"
		:value="item.product_num>item.reserve?item.reserve:item.product_num"
		:isMax="item.product_num>=item.reserve?true:false"
		:isMin="item.product_num===1"
		:index="index"
		@eventChange="numberChange"
	></uni-number-box> -->
	<u-number-box class="step"
	 :min="1"
	 :max="item.reserve"
	 :value="item.product_num>item.reserve?item.reserve:item.product_num"
	 :isMax="item.product_num>=item.reserve?true:false"
	 :isMin="item.product_num===1"
	 :index="index"
	 @change="numberChange"></u-number-box>
							</u-col>


						</u-row>
					</view>
					
					
					
					
				</view>
			</view>
			

	
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image 
						:src="allChecked?'/static/selected.png':'/static/select.png'" 
						mode="aspectFit"
						@click="check('all')"
					></image>
					<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						{{$t('clear')}}
					</view>
				</view>
				<view class="total-box">
					<text class="price">{{total}}</text>
					<!--text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text-->
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去支付</button>
			</view>
		</view>
	</view>
	</qs-page>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
	    computed:{
			...mapState(['user']),
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				loginuserinfo:'',
				userinfo:null,
			};
		},
		onLoad(){
			this.hasLogin=this.$store.getters.loginFlag;
			this.loadData();
		},
		watch:{
			//显示空白页
			cartList(e){
				let empty = e.length === 0 ? true: false;
				if(this.empty !== empty){
					this.empty = empty;
				}
			}
		},

		methods: {
			//请求数据
			loadData(){
                return new Promise((resolve, reject) => {
					this.loadstatus=true;
                    this.$api('shop.car_list', {}).then(res => {
						console.log(res);
						if (res.code==200){
							let list=res.data.list;
							let cartList = list.map(item=>{
								item.checked = true;
								return item;
							});
							this.cartList = cartList;
							this.calcTotal();  //计算总价
						}
                    }).catch((e)=>{
                        resolve(false);
                    });
                })
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			navToLogin(){
				uni.navigateTo({
					url: '/pages/user/login'
				})
			},
			 //选中状态处理
			check(type, index){
				if(type === 'item'){
					this.cartList[index].checked = !this.cartList[index].checked;
				}else{
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item=>{
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data){
				console.log(data)
                    this.$api('shop.cart_uni_algorithm', {
						cart_id:this.cartList[data.index].cart_id,
						num:data.value
					}).then(res => {
						if (res.code==200){}
                    }).catch((e)=>{});
				this.cartList[data.index].product_num = data.value;
				this.calcTotal();
			},
			//删除
			deleteCartItem(index){
				let list = this.cartList;
				let row = list[index];
				let id = row.id;
                    this.$api('shop.cart_del', {
						cart_id:list[index].cart_id,
					}).then(res => {
						if (res.code==200){}
                    }).catch((e)=>{});
				this.cartList.splice(index, 1);
				this.calcTotal();
				uni.hideLoading();
			},
			//清空
			clearCart(){
				uni.showModal({
					content: '清空',
					success: (e)=>{
						if(e.confirm){
							this.cartList = [];
						}
					}
				})
			},
			//计算总价
			calcTotal(){
				let list = this.cartList;
				if(list.length === 0){
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item=>{
					if(item.checked === true){
						total += item.spec_price * item.product_num;
					}else if(checked === true){
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createOrder(){
				let list = this.cartList;
				let goodsData = [];
				list.forEach(item=>{
					if(item.checked){
						goodsData.push({
							attr_val: item.attr_val,
							number: item.product_num
						})
					}
				})

				uni.navigateTo({
					url: `/pages/order/createorder`
				})
				//this.$api.msg('跳转下一页 sendData');
			}
		}
	}
</script>

<style lang='scss' scoped>

	.container{
		padding-bottom: 134rpx;
		/* 空白页 */
		.empty{
			position:fixed;
			left: 0;
			top:0;
			width: 100%;
			height: 100vh;
			padding-bottom:100rpx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 240rpx;
				height: 160rpx;
				margin-bottom:30rpx;
			}
			.empty-tips{
				display:flex;
				color: #cccccc;
				.navigator{
					color: $uni-color-primary;
					margin-left: 16rpx;
				}
			}
		}
	}
	/* 购物车列表项 */
	.base-panel-box{
		position:relative;
		.checkbox{
			position:absolute;
			left:-16rpx;
			top: -16rpx;
			z-index: 8;
			font-size: 44rpx;
			line-height: 1;
			padding: 4rpx;
			color: #cccccc;
			background:#fff;
			border-radius: 50px;
		}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,.checkbox.checked{color: $uni-color-primary;}
		.del-btn{
			padding:4rpx 10rpx;
			font-size:34rpx; 
			height: 50rpx;
			position:absolute;
			right:16rpx;
			top: 4rpx;
		}



	}


		.item-right{
			display:flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position:relative;
			padding-left: 30rpx;
			.title,.price{
				color: $uni-text-color;
				height: 40rpx;
				line-height: 40rpx;
			}
			.attr{
				height: 50rpx;
				line-height: 50rpx;
				overflow:hidden;
			}
			.price{
				height: 50rpx;
				line-height:50rpx;
			}
		}


	/* 底部栏 */
	.action-section{
		/* #ifdef H5 */
		margin-bottom:30rpx;
		/* #endif */
		position:fixed;
		left: 30rpx;
		bottom:30rpx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690rpx;
		height: 100rpx;
		padding: 0 30rpx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20rpx 0 rgba(0,0,0,.5);
		border-radius: 16rpx;
		.checkbox{
			height:52rpx;
			position:relative;
			image{
				width: 52rpx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
		}
		.clear-btn{
			position:absolute;
			left: 26rpx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52rpx;
			line-height: 52rpx;
			padding-left: 38rpx;
			background: #cccccc;
			border-radius:0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			&.show{
				opacity: 1;
				width: 120rpx;
			}
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40rpx;
			.price{
				color: $uni-text-color;
			}
			.coupon{
				text{
					color: $uni-text-color;
				}
			}
		}
		.confirm-btn{
			padding: 0 38rpx;
			margin: 0;
			border-radius: 100rpx;
			height: 76rpx;
			line-height: 76rpx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}
	.step{float: right;}

</style>
