<template>
	<qs-page>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<qs-navbar>
			<view class="u-flex u-m-l-22">
				<!-- <u-icon name="setting" size="38" :custom-style="{'padding': '16rpx'}"></u-icon> -->
				<image @click="onJudgeLogin('my/setting/setting')" class="svg-icon-tabbar" src="../../static/image/icon_set.png" mode=""></image>
			</view>
			<view class="u-flex"><h3>用户中心</h3></view>
			<view class="u-flex u-m-r-22">
				<view  @click="$tools.routerTo('/pages/chat/home')">
					<image class="svg-icon-tabbar" src="../../static/image/icon_msg.png" mode=""></image>
					<u-badge size="mini" type="error" :count="msgnum" :offset="offset"></u-badge>
				</view>
			</view>
		</qs-navbar>
		<view class="my-box"> 
			<!-- 用户 -->
			<view class="user-panel-box">
				<view class="bg">
				<!-- 未登录 -->
				<view v-if="!hasLogin" class="u-flex"  @click="onJudgeLogin('account/login/login')">
					<view class="u-m-r-20"><u-avatar size="120"></u-avatar></view>
					<view class="u-flex-1"><view class="u-font-lg">登录 / 注册</view></view>
					<view><u-icon name="arrow-right" color="#969799" size="28"></u-icon></view>
				</view>
				<!-- 已登录 -->
				<view v-if="hasLogin" class="u-flex">
					<view class="u-m-r-20"><u-avatar :src="myinfo.userInfo.avatar" mode="circle" size="120"></u-avatar></view>
					<view class="u-flex-1">
						<view class="u-font-lg loginname">
						{{ myinfo.userInfo.nickname }}
						<text v-if="myinfo.userInfo.is_mobile=='1'"><i><u-icon name="bangdingshouji" custom-prefix="customicon" color="yellow"></u-icon></i></text>
						</view>
						<view class="u-m-t-10 membercode"  @click="onJudgeLogin('my/user/levelcente')">
							<text class="u-m-r-20">{{myinfo.userInfo.level_name}} </text>
							<text v-if="myinfo.userInfo.maturity_code==3">剩余</text>
							<text>{{myinfo.userInfo.maturity_date}}</text>
						</view>
						<view v-if="myinfo.userInfo.is_mobile!=1" class="u-m-t-10 membercode" style="color:yellow"  @click="onJudgeLogin('account/bindMobile/bindMobile')">
							绑定手机号码<i><u-icon name="bangdingshouji" custom-prefix="customicon" size="30"></u-icon></i>
						</view>
					</view>

						<!-- <u-icon name="arrow-right" color="#969799" size="28"></u-icon> -->

<!-- 					<view><u-button class="custombtn"  size="mini"  :hair-line="false" :custom-style="customStyle" @click="onJudgeLogin('my/user/invitelink')">
					<i><u-icon name="fenxiang" custom-prefix="customicon" size="30"></u-icon></i>
					邀请好友
					</u-button></view> -->
				</view>
				</view>
			</view>

			<view class="trace-panel-box  u-p-t-40 u-m-b-10">

			<u-row gutter="0" justify="center">
				<u-col span="4">
					<view class="item u-m-l-20 u-m-r-10">
					<view  @click="$tools.routerTo('/pages/my/assets/index')" style="text-align: center;">
						<i><image class="svg-icon" src="../../static/image/uc1.png" mode=""></image></i>
					</view>
					<view style="text-align: center;"><h3>资产</h3></view>
					</view>
				</u-col>
				<u-col span="4">
					<view class="item u-m-l-10 u-m-r-10">
					<view @click="$tools.routerTo('/pages/my/team/index')" style="text-align: center;">
							<i><image class="svg-icon" src="../../static/image/uc2.png" mode=""></image></i>
					</view>
					<view  style="text-align: center;"><h3>团队</h3></view>
					</view>
				</u-col>
				<u-col span="4">
					<view class="item  u-m-l-10 u-m-r-20">
					<view @click="$tools.routerTo('/pages/my/user/log')" style="text-align: center;">
							<i><image class="svg-icon" src="../../static/image/uc3.png" mode=""></image></i>
					</view>
					<view style="text-align: center;"><h3>日志</h3></view>
					</view>
				</u-col>
			</u-row>
				
			</view>
			
			<view class="u-p-l-20 u-p-r-20 " @click="onJudgeLogin('my/user/invitelink')">
				<image src="../../static/image/invite-banner.png" mode="aspectFit" style="width: 100%; height: 180rpx;"></image>
			</view>

<!-- 			<view class="base-panel-box">
				<view  class="htitle">
					<i><u-icon name="yingyong" custom-prefix="customicon" size="30"></u-icon></i>我的设置
					</view>
			</view>

			<!-- 跟踪 -->
<!-- 			<view class="trace-panel-box">
				<u-grid :col="4" :border="false" class="card-main">
					<u-grid-item>
						<view class="u-font-xl">{{ myinfo.trace.product }}</view>
						<view class="u-font-xs u-m-t-10">商品关注</view>
					</u-grid-item>
					<u-grid-item>
						<view class="u-font-xl">{{ myinfo.trace.brand }}</view>
						<view class="u-font-xs u-m-t-10">品牌关注</view>
					</u-grid-item>
					<u-grid-item>
						<view class="u-font-xl">{{ myinfo.trace.activity }}</view>
						<view class="u-font-xs u-m-t-10">活动关注</view>
					</u-grid-item>
					<u-grid-item>
						<view class="u-font-xl">{{ myinfo.trace.history }}</view>
						<view class="u-font-xs u-m-t-10">浏览记录</view>
					</u-grid-item>
				</u-grid>
			</view>
			 <u-gap height="20"></u-gap>
			 -->

			

			<!-- 订单 -->
<!-- 			<view class="panel-box">
				<view class="panel-header">
					<u-section title="我的订单" sub-title="查看全部订单" :bold="true" :show-line="true" color="#e5e5e5"></u-section>
				</view>
				<u-grid :col="4" :border="false" class="panel-main"  bg-color="#222045">
					<u-grid-item bg-color="#222045"><u-icon name="dianshangzhuce" custom-prefix="customicon" label="待付款" size="48" label-size="22" margin-top="14" label-pos="bottom" label-color="#f5f5f5"></u-icon></u-grid-item>
					<u-grid-item bg-color="#222045"><u-icon name="order" label="待发货" size="48" label-size="22" margin-top="14" label-pos="bottom" label-color="#f5f5f5"></u-icon></u-grid-item>
					<u-grid-item bg-color="#222045"><u-icon name="order" label="待收货" size="48" label-size="22" margin-top="14" label-pos="bottom" label-color="#f5f5f5"></u-icon></u-grid-item>
					<u-grid-item bg-color="#222045"><u-icon name="order" label="退款/售后" size="48" label-size="22" margin-top="14" label-pos="bottom" label-color="#f5f5f5"></u-icon></u-grid-item>
				</u-grid>
			</view>
			<u-gap height="20"></u-gap> -->

			<!-- 钱包 -->
<!-- 			<view class="card-box">
				<u-grid :col="4" :border="false">
					<u-grid-item bg-color="#222045">
						<view class="u-font-xl">{{ myinfo.userInfo.integral }}</view>
						<view class="u-font-xs u-m-t-10">{{$t('common.integral')}}</view>
					</u-grid-item>
					<u-grid-item  bg-color="#222045" @click="$tools.routerTo('/pages/my/ticket/index')">
						<view class="u-font-xl">{{ myinfo.userInfo.coupon }}</view>
						<view class="u-font-xs u-m-t-10">优惠券</view>
					</u-grid-item>
					<u-grid-item bg-color="#222045">
						<view class="u-font-xl">{{ myinfo.userInfo.totalassets }}</view>
						<view class="u-font-xs u-m-t-10">总资产折合约</view>
					</u-grid-item>
					<u-grid-item  bg-color="#222045" class="all-order"  @click="$tools.routerTo('/pages/my/assets/index')">
						<image class="cut-off-line" src="/static/user/cut_off_line.png" mode=""></image>
						<u-icon name="order" label="我的钱包" size="48" label-size="22" margin-top="14" label-pos="bottom" label-color="#f5f5f5"></u-icon>
					</u-grid-item>
				</u-grid>
			</view>
			<u-gap height="20"></u-gap> -->

			<!-- 订单 -->
<!-- 			<view class="panel-box">
				<view class="panel-header" @click="$tools.routerTo('/pages/my/income/index')">
					<u-section title="我的收益" sub-title="" :bold="true" :show-line="true"  color="#e5e5e5"></u-section>
				</view>
				<u-grid :col="3" :border="false" class="panel-main" bg-color="#222045">
					<u-grid-item bg-color="#222045">
						<view class="u-font-xl">{{ myinfo.userInfo.integral }}</view>
						<view class="u-font-xs u-m-t-10">全部收益</view>
					</u-grid-item>
					<u-grid-item bg-color="#222045">
						<view class="u-font-xl">{{ myinfo.userInfo.coupon }}</view>
						<view class="u-font-xs u-m-t-10">直属收益</view>
					</u-grid-item>
					<u-grid-item bg-color="#222045">
						<view class="u-font-xl">{{ myinfo.userInfo.totalassets }}</view>
						<view class="u-font-xs u-m-t-10">非直属收益</view>
					</u-grid-item>
				</u-grid>
			</view>
			<u-gap height="20"></u-gap> -->

<!-- 			<view class="panel-box">
				<view class="panel-header">
					<u-section title="我的团队" sub-title="" :bold="true" :show-line="true" color="#e5e5e5"></u-section>
				</view>
				<u-grid :col="3" :border="false" class="panel-main">
					<u-grid-item bg-color="#222045">
						<view class="u-font-xl">{{ myinfo.userInfo.integral }}</view>
						<view class="u-font-xs u-m-t-10">全部成员</view>
					</u-grid-item>
					<u-grid-item bg-color="#222045">
						<view class="u-font-xl">{{ myinfo.userInfo.coupon }}</view>
						<view class="u-font-xs u-m-t-10">直属成员</view>
					</u-grid-item>
					<u-grid-item bg-color="#222045">
						<view class="u-font-xl">{{ myinfo.userInfo.totalassets }}</view>
						<view class="u-font-xs u-m-t-10">非直属成员</view>
					</u-grid-item>
				</u-grid>
			</view>
			<u-gap height="20"></u-gap> -->


			<!-- 其它 -->
			<view class="u-p-l-20 u-p-r-20">
				<u-cell-group :border="myinfo.border">
					<view class="panel-main">
						<u-cell-item
							title="用户信息" @click="onJudgeLogin('my/user/user')"
							:border-bottom="myinfo.borderBottom"
							:border-top="false"
							icon="yonghuxinxi"
							custom-prefix="customicon"
						></u-cell-item>
						<u-cell-item
							title="我的订单" @click="$tools.routerTo('/pages/order/order')"
							:border-bottom="myinfo.borderBottom"
							:border-top="false"
							icon="haiwaigongyingshangdingdan"
							custom-prefix="customicon"
						></u-cell-item>
						<u-cell-item
							title="帮助中心" @click="$tools.routerTo('/pages/info/help','tid=179&title=帮助')"
							:border-bottom="myinfo.borderBottom"
							icon="bangzhu"
							custom-prefix="customicon"
						></u-cell-item>
						<u-cell-item
							:title="item.title"
							:value="item.value"
							@click="onJudgeLogin(item.path)"
							:border-bottom="false"
							v-for="(item, index) in cells"
							:key="index"
							:icon="item.icons"
							custom-prefix="customicon"
						></u-cell-item>
<!-- 						<u-cell-item
							:title="this.$t('common.lang_select')" @click="switchLang()"
							:border-bottom="myinfo.borderBottom"
							icon="yuyanchuli___"
							custom-prefix="customicon"
						></u-cell-item> -->
					</view>
				</u-cell-group>
			</view>

			<!-- <u-gap height="20" bg-color="#16116B"></u-gap> -->


			
		<u-popup v-model="langboxStatus" mode="center">
			 <view class="selectlanguage">
				 <view @click="setLang('zh')">{{$t('common.lang_cn')}}</view>
				 <view  @click="setLang('en')">{{$t('common.lang_en')}}</view>
			 </view>
		</u-popup>
			
		</view>
	</qs-page>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
	data() {
		return {
			hasLogin:false,
			langboxStatus:false,
	customStyle: {
		border:'0rpx',
		color:'#ffffff'
	},
			cells: [
				{
					title: '设置',
					value: '',
					path: 'my/setting/setting',
					icons:'shezhi'
				},
			],
			myinfo: {
				border: false,
				borderBottom: true,
				userInfo: {
						/* 图像 */
						head_pic: '',
						/* 昵称 */
						username: '',
						/* 标签 */
						userTag: ['钻石会员', '达人'],
						/* 积分 */
						integral: '0',
						/* 优惠券 */
						coupon: '0',
						/* 总资产 */
						totalassets: '0.00'
					
				},
					trace: {
						/* 商品关注 */
						product: '0',
						/* 品牌关注 */
						brand: '0',
						/* 活动关注 */
						activity: '0',
						/* 浏览记录 */
						history: '0'
					},
			},
				msgnum:'',
				offset:[10,5],//消息数字角标位置
		};
	},
	computed: {
	  ...mapState(['user']),
	},

	onShow() {
		console.log(this.user);
		this.hasLogin=this.$store.getters.loginFlag;
		if (this.hasLogin){
			this.myinfo.userInfo=this.user.userInfo;
		}
		this.msgnum=this.user.chatmsgnoread;
	},
	methods: {
		switchLang(){
				this.langboxStatus=!this.langboxStatus
		},
		setLang(item){
				 this.$i18n.locale = item;
				 uni.setStorageSync('locale',item)
				 this.langboxStatus=!this.langboxStatus;
				const lang = this.$i18n.locale;
				uni.setTabBarItem({
					index: 0,
					text: this.$t('tabbar.tab0'),
				});
				uni.setTabBarItem({
					index: 1,
					text: this.$t('tabbar.tab2'),
				});	 
				uni.setTabBarItem({
					index: 2,
					text: this.$t('tabbar.tab3'),
				});	 
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabbar.tab4'),
				});
			},

		onJudgeLogin(url) {
			this.judgeLogin(() => {
				//用户已登录，接下来可以处理用户的功能了
				console.log('url',url)
				if (url!=''){
					this.$Router.push({path: '/pages/'+url});
				}
			}, "judge"); // judge:（默认值） 如果未登录询问是否登录  force：未登录直接强制登录
			

		},
		tip() {
			return this.$u.toast('暂未开通');
		}
	},
	onLoad() {

	}
};
</script>

<style lang="scss" scoped>

.my-box {
	.user-panel-box {
		
		//background: linear-gradient($u-type-primary, #62D8E6 99.92%);
		.bg{
			padding: 50rpx 32rpx 0rpx 32rpx;
		// background: url(@/static/indexbg.png) no-repeat top right;
		// background-size:auto 100%;
		// -o-background-size: auto  100%;
		// -webkit-background-size: auto  100%;
		// background-position:right 0rpx;
		}

		// background:#ffffff url(@/static/usercenter_bg.png) no-repeat bottom right;
		// background-size:100% 100%;
		// -o-background-size: 100%  100%;
		// -webkit-background-size:100%  100%;

		
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		
		.loginname{
			font-size: 38rpx;
		}
		.membercode{

		}
		.u-avatar{border: solid 6rpx #63E5CB;}
		
	}

	.trace-panel-box {
		image{
			width: 70rpx;
			height: 60rpx;
		}
		.item{
			background: $u-type-primary;
			color: #FFFFFF;
			padding: 20rpx;
			border-radius: 10rpx;
		}
	}

	.trace-card-box {
		margin: 0 12rpx;
		padding: 10rpx 10rpx;
		border-radius: 16rpx;
		background-color: $u-border-color;
	}

	.panel-box {
		background-color:$u-border-color;
		color: $u-main-color;

		.panel-header {
			padding: 30rpx 32rpx 20rpx 32rpx;
			/*border-bottom: 1rpx solid $qs-border-color-light;*/
		}

		.panel-main {
			padding: 10rpx 0;
		}
	}

	.card-box {
		padding: 10rpx 0;
		background-color: $u-bg-color;

		.all-order {
			position: relative;
			.cut-off-line {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 0rpx;
				width: 30rpx;
				height: 160rpx;
			}
		}
	}

	.other-panel-box {
		.panel-main {

		}
	}

	.other-card-box {
		margin: 0 12rpx;
		padding: 10rpx 0;
		border-radius: 16rpx;
		background-color: $u-bg-color;
	}
	 .selectlanguage view{
		 height: 100rpx;
		 width: 600rpx;
		 line-height: 100rpx;
		 color: #EABB76;
	 }
	 
	 .usercenteritem{

		// background:$u-bg-color  url(@/static/dot-bg.png) no-repeat top right;
		// background-size:auto auto;
		// -o-background-size: auto auto;
		// -webkit-background-size: auto auto;
		// background-position:right 2rpx;
			background: #FFFFFF;
			border: 1px solid #EAECF7;
			border-radius: 8px;
			margin: 20rpx;
		i{
			width: 100rpx;
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 100%;
			background: $u-type-primary;
			display: inline-block;
			text-align: center;
			color: $u-type-primary-reverse;
			.svg-icon{
				width: 60rpx;
				height: 60rpx;
				margin: 20rpx;
			}
			
		}


		h3{
			font-size: 28rpx;
			font-weight: normal;
			padding: 10rpx 10rpx 0rpx 10rpx;
		}
	 }
	 

	 
}
</style>
