<template>
	<qs-page>
		<qs-navbar :isBack="false" backUrl="" :background="navbar">
			<view class="u-flex u-m-l-22"><text style="width: 130rpx;"></text></view>
			<view class="u-flex"><h3>C2C</h3></view>
			<view class="u-flex u-m-r-22">
				<view class="fabupost" @click="$tools.routerTo('/pages/otc/publish')">快捷发布</view>
			</view>
		</qs-navbar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		     <!--isFullScreen 可以实其全屏显示-->
		<ourLoading isFullScreen :active="loadstatus" :text="loadstxt" color="#63E5CB" textColor="#63E5CB"/>
		<view class="topfixbar">
			<u-gap height="10"></u-gap>
			
			<u-row gutter="16" justify="space-between">
				<u-col span="6" style="font-family: 黑体;">
					<u-tabs name="cate_name" :list="cateList" :is-scroll="false" :current="currentTab" @change="changeTab"
					 bg-color="#63E5CB"
					 inactive-color	="#ffffff"
					 :active-item-style="tabsstyle"
					 :show-bar="false"
					 active-color="#ffffff"></u-tabs>
				</u-col>
				<u-col span="6" @click="$tools.routerTo('/pages/otc/myorder')">
					<view class="u-text-right u-m-r-20"><i class="u-m-r-10"><u-icon name="jifenshangcheng" custom-prefix="customicon" size="30"></u-icon></i>订单</view>
				</u-col>
			</u-row>

			<u-gap height="40"></u-gap>

		</view>

		<view class="mybasebox">
			<view class="coinselectarea">
			<view style="width: 280rpx;margin-left: 20rpx;">
				<u-tabs class="tabscoinstyle" name="cate_name" :list="cointypeList" :is-scroll="false" :current="currentCoinTab" @change="changeCoinTab" 
				 bg-color="#ffffff"
				 inactive-color	="#000000"
				 font-size="24"
				 :bold="false"
				 height="60"
				 active-color="#52D3FF"></u-tabs>
			</view>
			</view>
			<u-empty text="没有数据" class="u-m-t-80" mode="data" :show="flow_list.length === 0" v-if="loadstatus==false"></u-empty>
			<view  class="u-p-t-50" v-if="flow_list.length>0">
				<view class="base-tonglan-box" >
					<view class="item " v-for="(item, index) in flow_list" :key="index" >
						<u-row gutter="16" justify="space-between">
							<u-col span="6" >
								<view>
									<image mode="scaleToFill" :src="item.avatar" class="avatar"></image>
									<b>{{item.nickname}}</b>
								</view>
								<view>数量：{{item.num}}</view>
								<view>
									<text  v-for="(ip, key) in item.paymethod" :key="key">
										<i class="u-m-r-10"><u-icon :name="ip.icon" custom-prefix="customicon" color="#ffcc00"></u-icon></i>
									</text>
								</view>
							</u-col>

							<u-col span="6" text-align="right">
								<view >
									单价：<text class="u-font-40 price" >{{item.price}}</text>
								</view>
								<view>
								<u-button size="medium" :hairLine="true" type="primary" @click="iwantbuy_pops(item.id)" style="height:50rpx">购买</u-button>
								</view>
							</u-col>
						</u-row>
					</view>
					
				</view>
			</view>
					<view v-if="flow_list.length>0">
						<u-loadmore :status="loadStatus" @loadmore="get_page"></u-loadmore>
					</view>
			
		</view>

		<u-popup v-model="iwantbuy_show" mode="bottom">
			<view class="pops">
				<view class="title u-m-b-20">
					<h3>购买 {{buy_item.namecode}}</h3>
					<text>单价:{{buy_item.price}}</text>
				</view>

				<u-tabs name="sell_fangsi" :list="sell_fangsiList" bar-width="140" :current="currentsellfangshi" @change="changeCoinTab" 
				 bg-color="#ffffff"
				 inactive-color	="#000000"
				 font-size="32"
				 height="70"
				 active-color="#2b85e4"></u-tabs>
			<u-form class="u-p-l-30 u-p-r-30">
				<u-form-item class="form-item">
					<u-input placeholder="请输入金额" type="text" v-model="input_nums" :custom-style="input" :focus="false" @input="js_total()"/>
					<text slot="right" style="font-size: 22rpx;">CNY</text>
					</u-form-item>
			
						<u-row gutter="0" justify="space-between" class="u-m-t-10">
							<u-col span="12" >
								限额：最低 {{(buy_item.mintransamout*buy_item.price).toFixed(2)}} CNY，最高 {{(buy_item.num*buy_item.price).toFixed(2)}} CNY
							</u-col>
							<u-col span="12"  text-align="right" class="u-type-primary">
								<view class="u-p-t-12">交易数量：{{buy_num}} {{buy_item.unit}}</view>
							</u-col>
						</u-row>
						<u-row gutter="0" justify="space-between" class="u-m-t-10">
							<u-col span="12"  text-align="right">
							实付款：<text class="u-type-primary u-font-lg">{{buy_cost}} CNY</text>
							</u-col>
						</u-row>
			</u-form>
			<view style="position: fixed; bottom: 60rpx;width:100%;">
				<view class="u-padding-20">
						<u-row gutter="16" justify="space-between" style="width:100%;">
							<u-col span="6" >
								<u-button type="">
									<u-count-down :timestamp="timestamp" :show-seconds="true" @end="iwantbuy_show = false;"></u-count-down>
								</u-button>
							</u-col>
							<u-col span="6" >
								<u-button type="primary" @click="confirmorder()">下单</u-button>
							</u-col>
						</u-row>
				</view>
			</view>
			</view>
		</u-popup>
			
	</qs-page>
</template>


<script>
import {mapState,mapMutations} from 'vuex';
export default {
	data(){
		return {
			flow_list:[],
			hasLogin:false,
			loadStatus: 'loadmore',
			loadstatus:false,
			loadstxt:'loading...',
			cateList:[
				{
					id:1,
					name:'我要买'
				},
				{
					id:2,
					name:'我要卖'
				}
			],
			navbar:{
					background:'#63E5CB',
					color:'#ffffff'
				},
			cointypeList:[
				{
					id:1,
					name:'USDT'
				},
				{
					id:2,
					name:'BTC'
				}
			],
			sell_fangsiList:[
				{
					name:'按金额购买'
				}
			],
				tabsstyle:{
					fontSize:'40rpx'
				},
				input:{
					fontSize:'50rpx',
				},
			currentTab:0,
			currentCoinTab:0,
			currentsellfangshi:0,
			transtype:'sell', //sell 我要买 buy 我要卖
			coinclassid:2, //2 usdt
			page:1,
			iwantbuy_show:false,
			timestamp:60,
			buy_item:[],
			buy_num:0,
			buy_cost:0,
			input_nums:0
		};
	},
	computed: {
	  ...mapState(['user']),
	},
	onLoad() {
		this.hasLogin=this.$store.getters.loginFlag;
		this.get_page();
	},
	onReachBottom() {
		this.loadStatus = 'loading';
		setTimeout(() => {
			this.get_page();
			this.loadStatus = 'loadmore';
		}, 50);
	},
	onPullDownRefresh() {
			this.flow_list = [];
			this.page=1;
			this.get_page();

		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 500);
			
		},
	methods: {
		changeTab(e) {
			this.currentCoinTab=0;
			this.currentTab=e;
			this.flow_list = [];
			this.page=1;
			if (this.currentTab == 1) {
				this.transtype='buy';
				this.coinclassid=3;
			} else if (this.currentTab == 0) {
				this.transtype='sell';
				this.coinclassid=2;
			}
			this.get_page();
		},
		changeCoinTab(e){
			this.currentCoinTab=e;
			this.flow_list = [];
			this.page=1;
			if (this.currentCoinTab == 1) {
                this.coinclassid=3;
			} else if (this.currentCoinTab == 0) {
                this.coinclassid=2;
			}
			this.get_page();
		},
		iwantbuy_pops(itemid){
			this.$api('otc.adrefresh', {
				adid:itemid,
			}).then(res => {
				if (res.code==200){
					this.iwantbuy_show=true;
					this.buy_item=res.data;
					this.input_nums=(this.buy_item.num*this.buy_item.price).toFixed(2);
					this.js_total();
				}
			}).catch((e)=>{
				resolve(false);
			});
		},
		js_total(){
			this.buy_num=(this.input_nums/this.buy_item.price).toFixed(2);
			this.buy_cost=this.input_nums;
		},
		get_page(){
                return new Promise((resolve, reject) => {
					this.loadstatus=true;
					this.loadstxt="加载中";
					
                    this.$api('otc.adlist', {
						page:this.page,
						limit:10,
						coinclass:this.coinclassid,
						transtype:this.transtype,
					}).then(res => {
						console.log(res)
						if (res.code==200){
							if (res.data.count>0){
							let list=res.data.list;
								if (this.page<=res.data.pages){
									for (let i = 0; i < list.length; i++) {
										this.flow_list.push(list[i]);
									}
									if (this.page==res.data.pages){this.loadStatus = 'nomore';}
									this.page+=1;
								}else{
									this.loadStatus = 'nomore';
								}
							}else{
								this.flow_list=[];
								this.loadStatus = 'nomore';
							}
							this.loadstatus=false;
						}
                    }).catch((e)=>{
						this.loadstatus=false;
                        resolve(false);
                    });
                })
		},
		confirmorder(){
                return new Promise((resolve, reject) => {
					this.loadstatus=true;
					
                    this.$api('otc.confirmbuyorder', {
						buy_num:this.buy_num,
						buy_cost:this.buy_cost,
						coinclassid:this.coinclassid,
						adid:this.buy_item.id
					}).then(res => {
						if (res.code==200){
							this.iwantbuy_show=false;
							 this.$router.push({
								path:'/pages/otc/myorder',
								query:{
									recordid:res.data.recordid,
								}
							})
						}else{
							this.$u.toast(res.msg);
						}
						this.loadstatus=false;
                    }).catch((e)=>{
						this.loadstatus=false;
                        resolve(false);
                    });
                })
		},
	},
};
</script>
<style lang="scss" scoped>
.price{
	color: $u-type-primary-disabled;
}
.topfixbar{
	background: $u-type-primary;
	color:#FFFFFF;
	top:70rpx;
	height: 170rpx;
	width: 100%;
	z-index: 1;
}
.tabscoinstyle{
	padding:0rpx;
}
.avatar{
	width: 40rpx;height: 40rpx;
	display:inline-block;vertical-align: middle;
	margin-right: 10rpx;
	border-radius: 100%;
}
.fabupost{
	border: solid 1px $u-border-color;
	border-radius: 30rpx;
	padding: 2rpx 20rpx;
}
.input{
	
}
.pops{
	background: #FFFFFF;
	height: 660rpx;
	.title{
		background: $u-type-primary-light;
		padding: 20rpx 30rpx;
	}
	}
</style>
