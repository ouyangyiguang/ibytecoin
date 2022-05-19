<template>
	<qs-page>
		<qs-navbar isBack="false" backUrl="/pages/my/my">
			<view class="u-flex"><h3>订单列表</h3></view>
			<view class="u-flex u-m-r-22">
			</view>
		</qs-navbar>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box"  style="height: 100%;width: 100%;" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						
						<view class="page-box">

							<view  v-if="isemtry[0]">
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>

							<view class="order" v-else v-for="(res, index) in orderList[0]" :key="res.order_id">
								<view class="top u-m-b-20">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.order_code }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.add_time }}</view>
								</view>
								<view class="item b-b" v-for="(item, index) in res.order_detailed" :key="index">
									<u-row gutter="0" justify="space-between">
										<u-col span="2" ><image :src="item.litpic"></image></u-col>
										<u-col span="10" >
											<view class="title clamp">{{item.product_name}}</view>
											<view class="spec" v-if="item.data!=''">{{item.data}}</view>
											<view class="price-box">
												<text class="price">{{item.product_price}}</text>
												<text class="number">* {{item.num}}</text>
											</view>
										</u-col>
									</u-row>
								</view>


								<view class="bottom">
									<view class="more">
										共 {{ totalNum(res.order_detailed) }} 件商品 合计:
										<text class="total-price">
											{{res.order_amount}}.
										</text>
									</view>
									<view class="logistics btn" v-if="res.order_status==1||res.order_status==2||res.order_status==3">物流</view>
									<view class="exchange btn" @click="deleteOrder(res.order_id,index)" v-else>删除</view>
									<view class="evaluate btn"
									@click="$Router.push({path:'/pages/order/order_view_payment',query:{order_id:res.order_id}})"
									>
									{{ res.order_status == 0 ? '付款' : res.order_status == 1 ? '待发货' : '查看' }}
									</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
							
							
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">

							<view  v-if="isemtry[1]">
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>

							<view class="order" v-else v-for="(res, index) in orderList[1]" :key="res.order_id">
								<view class="top u-m-b-20">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.order_code }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.add_time }}</view>
								</view>
								<view class="item b-b" v-for="(item, index) in res.order_detailed" :key="index">
									<u-row gutter="0" justify="space-between">
										<u-col span="2" ><image :src="item.litpic"></image></u-col>
										<u-col span="10" >
											<view class="title clamp">{{item.product_name}}</view>
											<view class="spec" v-if="item.data!=''">{{item.data}}</view>
											<view class="price-box">
												<text class="price">{{item.product_price}}</text>
												<text class="number">* {{item.num}}</text>
											</view>
										</u-col>
									</u-row>
								</view>


								<view class="bottom">
									<view class="more">
										共 {{ totalNum(res.order_detailed) }} 件商品 合计:
										<text class="total-price">
											{{res.order_amount}}.
										</text>
									</view>
									<view class="logistics btn" v-if="res.order_status==1||res.order_status==2||res.order_status==3">物流</view>
									<view class="exchange btn" @click="deleteOrder(res.order_id,index)" v-else>删除</view>
									<view class="evaluate btn" @click="$tools.routerTo('/pages/order/order_view_payment','order_id='+res.order_id)">
									{{ res.order_status == 0 ? '付款' : res.order_status == 1 ? '待发货' : '查看' }}
									</view>
								</view>
							</view>



							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">



							<view  v-if="isemtry[2]">
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>

							<view class="order" v-else v-for="(res, index) in orderList[2]" :key="res.order_id">
								<view class="top u-m-b-20">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.order_code }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.add_time }}</view>
								</view>
								<view class="item b-b" v-for="(item, index) in res.order_detailed" :key="index">
									<u-row gutter="0" justify="space-between">
										<u-col span="2" ><image :src="item.litpic"></image></u-col>
										<u-col span="10" >
											<view class="title clamp">{{item.product_name}}</view>
											<view class="spec" v-if="item.data!=''">{{item.data}}</view>
											<view class="price-box">
												<text class="price">{{item.product_price}}</text>
												<text class="number">* {{item.num}}</text>
											</view>
										</u-col>
									</u-row>
								</view>


								<view class="bottom">
									<view class="more">
										共 {{ totalNum(res.order_detailed) }} 件商品 合计:
										<text class="total-price">
											{{res.order_amount}}.
										</text>
									</view>
									<view class="logistics btn" v-if="res.order_status==1||res.order_status==2||res.order_status==3">物流</view>
									<view class="exchange btn" @click="deleteOrder(res.order_id,index)" v-else>删除</view>
									<view class="evaluate btn" @click="$tools.routerTo('/pages/order/order_view_payment','order_id='+res.order_id)">
									{{ res.order_status == 0 ? '付款' : res.order_status == 1 ? '待发货' : '查看' }}
									</view>
								</view>
							</view>


						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">


							<view  v-if="isemtry[3]">
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>

							<view class="order" v-else v-for="(res, index) in orderList[3]" :key="res.order_id">
								<view class="top u-m-b-20">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.order_code }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.add_time }}</view>
								</view>
								<view class="item b-b" v-for="(item, index) in res.order_detailed" :key="index">
									<u-row gutter="0" justify="space-between">
										<u-col span="2" ><image :src="item.litpic"></image></u-col>
										<u-col span="10" >
											<view class="title clamp">{{item.product_name}}</view>
											<view class="spec" v-if="item.data!=''">{{item.data}}</view>
											<view class="price-box">
												<text class="price">{{item.product_price}}</text>
												<text class="number">* {{item.num}}</text>
											</view>
										</u-col>
									</u-row>
								</view>


								<view class="bottom">
									<view class="more">
										共 {{ totalNum(res.order_detailed) }} 件商品 合计:
										<text class="total-price">
											{{res.order_amount}}.
										</text>
									</view>
									<view class="logistics btn" v-if="res.order_status==1||res.order_status==2||res.order_status==3">物流</view>
									<view class="exchange btn" @click="deleteOrder(res.order_id,index)" v-else>删除</view>
									<view class="evaluate btn" @click="$tools.routerTo('/pages/order/order_view_payment','order_id='+res.order_id)">
									{{ res.order_status == 0 ? '付款' : res.order_status == 1 ? '待发货' : '查看' }}
									</view>
								</view>
							</view>



							<u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
	</qs-page>
</template>

<script>
export default {
	data() {
		return {
			orderList: [[], [], [], []],
			isemtry:[false,false,false,false],
			page:[1,1,1,1],
			list: [
				{
					name: '全部',
					count: ''
				},
				{
					name: '待付款'
				},
				{
					name: '待发货'
				},
				{
					name: '待收货'
				},

			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
		};
	},
	onLoad() {
		this.getOrderList(0);
		this.getOrderList(1);
		this.getOrderList(2);
		this.getOrderList(3);
	},
	computed: {
		// 价格小数
		priceDecimal() {
			return val => {
				// if (val !== parseInt(val)) return val.slice(-2);
				// else return '00';
			};
		},
		// 价格整数
		priceInt() {
			return val => {
				// if (val !== parseInt(val)) return val.split('.')[0];
				// else return val;
			};
		}
	},
	methods: {
		reachBottom() {
			// 此tab为空数据
			if(this.current != 2) {
				this.loadStatus.splice(this.current,1,"loading")
				setTimeout(() => {
					this.getOrderList(this.current);
				}, 1200);
			}
		},
		deleteOrder(id,index){
				this.$api('order.order_del', {
					order_id:id
				}).then(res => {
					if (res.code==200){
						this.orderList[this.current].splice(index,1);
					}else{
						this.$tools.msg(res.msg)
					}
				}).catch((e)=>{});
		},
		// 页面数据
		getOrderList(idx) {
				this.loadstatus=true;
                return new Promise((resolve, reject) => {
                    this.$api('order.order_list', {
						p:this.page[idx],
						limit:10,
						idx:idx
					}).then(res => {
						this.loadstatus=false;
						console.log(res)
						if (res.code==200){
							if (res.data.list.length<=0)this.isemtry[idx]=true;
							let list=res.data.list;
							if (this.page[idx]<=res.data.pages){
								for (let i = 0; i < list.length; i++) {
									this.orderList[idx].push(list[i]);
								}
								if (this.page[idx]==res.data.pages){this.loadStatus.splice(this.current,1,"nomore")}
								this.page[idx]+=1;
							}else{
								//this.loadStatus = 'nomore';
								this.loadStatus.splice(this.current,1,"nomore")
							}
							console.log(idx,this.orderList[idx]);
							    this.loadstatus=false;
						}
                    }).catch((e)=>{});
                })
			
		},
		// 总价
		totalPrice(item) {
			// let price = 0;
			// item.map(val => {
			// 	price += parseFloat(val.product_price);
			// });
			// return price.toFixed(2);
		},
		// 总件数
		totalNum(item) {
			let num = 0;
			item.map(val => {
				num += val.num;
			});
			return num;
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
			this.getOrderList(index);
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.store {
				margin: 0 10rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.right {
			color: $u-type-warning-dark;
			float: right;
		}
	}
		.item {
			position: relative;
			padding: 20rpx 0rpx;
			image {
				flex-shrink: 0;
				display: block;
				width: 100rpx;
				height: 100rpx;
				border-radius: 8upx;
				margin: 0rpx 20rpx 0rpx 0rpx;
			}
			.spec{float: left;}
			.price-box{float: right;}
			}

	.bottom {
		
	.more {
		float: left;
	}
		margin-top: 20rpx;
		padding: 0 10rpx;
		height: 60rpx;
		justify-content: space-between;
		align-items: center;
		.btn {
			line-height: 52rpx;
			width: 120rpx;
			border-radius: 26rpx;
			border: 2rpx solid $u-border-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-type-info-dark;
			margin-left: 20rpx;
			float: right;
		}
		.evaluate {
			color: $u-type-warning-dark;
			border-color: $u-type-warning-dark;
		}
	}
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	image {
		width: 164rpx;
		height: 164rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
