<template>
	<view class="my-box">
		<!-- 用户 -->
		<view v-if="userMode == 'panel'" class="user-panel-box">
			<!-- 未登录 -->
			<view v-if="!vuex_user.hasLogin" class="u-flex" @click="openPage('account/login/pwd-login')">
				<view class="u-m-r-20"><u-avatar size="120"></u-avatar></view>
				<view class="u-flex-1"><view class="u-font-lg">登录 / 注册</view></view>
				<view><u-icon name="arrow-right" color="#969799" size="28"></u-icon></view>
			</view>
			<!-- 已登录 -->
			<view v-if="vuex_user.hasLogin" class="u-flex" @click="openPage('my/user/user')">
				<view class="u-m-r-20"><u-avatar :src="list.model.user.userFace" mode="circle" size="120"></u-avatar></view>
				<view class="u-flex-1">
					<view class="u-font-lg">{{ list.model.user.nickName }}</view>
					<view class="u-m-t-10">
						<u-tag v-for="(item, index) in list.model.user.userTag" :key="index" :text="item" mode="plain" type="info" size="mini" class="u-m-r-10" />
					</view>
				</view>
				<view><u-icon name="arrow-right" color="#969799" size="28"></u-icon></view>
			</view>
		</view>
		<u-gap v-if="userMode == 'card'" height="20"></u-gap>
		<view v-if="userMode == 'card'" class="user-card-box">
			<!-- 未登录 -->
			<view v-if="!vuex_user.hasLogin" class="u-flex" @click="openPage('account/login/pwd-login')">
				<view class="u-m-r-20"><u-avatar size="120"></u-avatar></view>
				<view class="u-flex-1"><view class="u-font-lg">登录 / 注册</view></view>
				<view><u-icon name="arrow-right" color="#969799" size="28"></u-icon></view>
			</view>
			<!-- 已登录 -->
			<view v-if="vuex_user.hasLogin" class="u-flex" @click="openPage('my/user/user')">
				<view class="u-m-r-20"><u-avatar :src="list.model.user.userFace" mode="circle" size="120"></u-avatar></view>
				<view class="u-flex-1">
					<view class="u-font-lg">{{ list.model.user.nickName }}</view>
					<view class="u-m-t-10">
						<u-tag v-for="(item, index) in list.model.user.userTag" :key="index" :text="item" mode="plain" type="info" size="mini" class="u-m-r-10" />
					</view>
				</view>
				<view><u-icon name="arrow-right" color="#969799" size="28"></u-icon></view>
			</view>
		</view>

		<!-- 跟踪 -->
		<view v-if="userMode == 'panel'" class="trace-panel-box">
			<u-grid :col="4" :border="false" class="card-main">
				<u-grid-item @click="openPage('my/trace/product')">
					<view class="u-font-xl">{{ list.model.trace.product }}</view>
					<view class="u-font-xs u-m-t-10">商品关注</view>
				</u-grid-item>
				<u-grid-item @click="openPage('my/trace/brand')">
					<view class="u-font-xl">{{ list.model.trace.brand }}</view>
					<view class="u-font-xs u-m-t-10">品牌关注</view>
				</u-grid-item>
				<u-grid-item @click="openPage('my/trace/activity')">
					<view class="u-font-xl">{{ list.model.trace.activity }}</view>
					<view class="u-font-xs u-m-t-10">活动关注</view>
				</u-grid-item>
				<u-grid-item @click="openPage('my/trace/history')">
					<view class="u-font-xl">{{ list.model.trace.history }}</view>
					<view class="u-font-xs u-m-t-10">浏览记录</view>
				</u-grid-item>
			</u-grid>
		</view>
		<u-gap v-if="userMode == 'card'" height="20"></u-gap>
		<view v-if="userMode == 'card'" class="trace-card-box">
			<u-grid :col="4" :border="false" class="card-main">
				<u-grid-item @click="openPage('my/trace/product')">
					<view class="u-font-xl">{{ list.model.trace.product }}</view>
					<view class="u-font-xs u-m-t-10">商品关注</view>
				</u-grid-item>
				<u-grid-item @click="openPage('my/trace/brand')">
					<view class="u-font-xl">{{ list.model.trace.brand }}</view>
					<view class="u-font-xs u-m-t-10">品牌关注</view>
				</u-grid-item>
				<u-grid-item @click="openPage('my/trace/activity')">
					<view class="u-font-xl">{{ list.model.trace.activity }}</view>
					<view class="u-font-xs u-m-t-10">活动关注</view>
				</u-grid-item>
				<u-grid-item @click="openPage('my/trace/history')">
					<view class="u-font-xl">{{ list.model.trace.history }}</view>
					<view class="u-font-xs u-m-t-10">浏览记录</view>
				</u-grid-item>
			</u-grid>
		</view>

		<u-gap height="20"></u-gap>

		<!-- 订单 -->
		<view v-if="serviceOrderMode == 'panel'" class="panel-box">
			<view class="panel-header"><u-section title="我的工单" sub-title="查看全部工单" :bold="false" @click="openPage('my/serviceOrder/serviceOrder')"></u-section></view>
			<u-grid :col="4" :border="false" class="panel-main">
				<u-grid-item @click="openPage('my/serviceOrder/serviceOrder')">
					<u-icon name="order" label="匹配中" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon>
				</u-grid-item>
				<u-grid-item @click="openPage('my/serviceOrder/serviceOrder')">
					<u-icon name="order" label="待付款" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon>
				</u-grid-item>
				<u-grid-item @click="openPage('my/serviceOrder/serviceOrder')">
					<u-icon name="order" label="服务中" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon>
				</u-grid-item>
				<u-grid-item @click="openPage('my/serviceOrder/serviceOrder')">
					<u-icon name="order" label="待评价" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon>
				</u-grid-item>
			</u-grid>
		</view>
		<view v-if="serviceOrderMode == 'card'" class="card-box">
			<u-grid :col="5" :border="false">
				<u-grid-item @click="openPage('my/serviceOrder/serviceOrder')">
					<u-icon name="order" label="匹配中" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon>
				</u-grid-item>
				<u-grid-item @click="openPage('my/serviceOrder/serviceOrder')">
					<u-icon name="order" label="待付款" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon>
				</u-grid-item>
				<u-grid-item @click="openPage('my/serviceOrder/serviceOrder')">
					<u-icon name="order" label="服务中" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon>
				</u-grid-item>
				<u-grid-item @click="openPage('my/serviceOrder/serviceOrder')">
					<u-icon name="order" label="待评价" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon>
				</u-grid-item>
				<u-grid-item class="all-order" @click="openPage('my/serviceOrder/serviceOrder')">
					<image class="cut-off-line" src="/static/user/cut_off_line.png" mode=""></image>
					<u-icon name="order" label="我的工单" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon>
				</u-grid-item>
			</u-grid>
		</view>

		<u-gap height="20"></u-gap>

		<!-- 钱包 -->
		<view v-if="walletMode == 'card'" class="card-box">
			<u-grid :col="5" :border="false">
				<u-grid-item @click="openPage('my/wallet/integral')">
					<view class="u-font-xl">{{ list.model.wallet.integral }}</view>
					<view class="u-font-xs u-m-t-10">积分</view>
				</u-grid-item>
				<u-grid-item @click="openPage('my/wallet/coupon')">
					<view class="u-font-xl">{{ list.model.wallet.coupon }}</view>
					<view class="u-font-xs u-m-t-10">优惠券</view>
				</u-grid-item>
				<u-grid-item @click="openPage('my/wallet/redPacket')">
					<view class="u-font-xl">{{ list.model.wallet.redPacket }}</view>
					<view class="u-font-xs u-m-t-10">红包</view>
				</u-grid-item>
				<u-grid-item @click="openPage('my/wallet/money')">
					<view class="u-font-xl">{{ list.model.wallet.money }}</view>
					<view class="u-font-xs u-m-t-10">余额</view>
				</u-grid-item>
				<u-grid-item class="all-order" @click="openPage('my/wallet/wallet')">
					<image class="cut-off-line" src="/static/user/cut_off_line.png" mode=""></image>
					<u-icon name="order" label="我的钱包" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon>
				</u-grid-item>
			</u-grid>
		</view>
		<view v-if="walletMode == 'panel'" class="panel-box">
			<view class="panel-header"><u-section title="我的钱包" sub-title="查看全部" :bold="false" @click="openPage('my/wallet/wallet')"></u-section></view>
			<u-grid :col="4" :border="false" class="panel-main">
				<u-grid-item @click="openPage('my/wallet/integral')">
					<view class="u-font-xl">{{ list.model.wallet.integral }}</view>
					<view class="u-font-xs u-m-t-10">积分</view>
				</u-grid-item>
				<u-grid-item @click="openPage('my/wallet/coupon')">
					<view class="u-font-xl">{{ list.model.wallet.coupon }}</view>
					<view class="u-font-xs u-m-t-10">优惠券</view>
				</u-grid-item>
				<u-grid-item @click="openPage('my/wallet/redPacket')">
					<view class="u-font-xl">{{ list.model.wallet.redPacket }}</view>
					<view class="u-font-xs u-m-t-10">红包</view>
				</u-grid-item>
				<u-grid-item @click="openPage('my/wallet/money')">
					<view class="u-font-xl">{{ list.model.wallet.money }}</view>
					<view class="u-font-xs u-m-t-10">余额</view>
				</u-grid-item>
			</u-grid>
		</view>

		<u-gap height="20"></u-gap>

		<!-- 其它 -->
		<view v-if="mode == 'card'" class="other-card-box">
			<u-cell-group :border="border">
				<view class="panel-main">
					<u-cell-item
						:title="item.title"
						:value="item.value"
						@click="openPage(item.path)"
						:border-bottom="borderBottom"
						v-for="(item, index) in cells"
						:key="index"
					></u-cell-item>
				</view>
			</u-cell-group>
		</view>
		<view v-if="mode == 'panel'" class="other-panel-box">
			<u-cell-group :border="border">
				<view class="panel-main">
					<u-cell-item
						:title="item.title"
						:value="item.value"
						@click="openPage(item.path)"
						:border-bottom="borderBottom"
						v-for="(item, index) in cells"
						:key="index"
					></u-cell-item>
				</view>
			</u-cell-group>
		</view>

		<u-gap height="40"></u-gap>
	</view>
</template>

<script>
export default {
	name: 'my-service',
	props: {
		// 是否显示边框
		border: {
			type: Boolean,
			default: false
		},
		// 是否显示内边框
		borderBottom: {
			type: Boolean,
			default: false
		},
		// 用户模式
		userMode: {
			type: String,
			default: 'panel'
		},
		// 工单模式
		serviceOrderMode: {
			type: String,
			default: 'panel'
		},
		// 钱包模式
		walletMode: {
			type: String,
			default: 'card'
		},
		// 模式
		mode: {
			type: String,
			default: 'card'
		}
	},
	data() {
		return {
			cells: [
				{
					title: '设置',
					value: '',
					path: 'my/setting/setting'
				},
				{
					title: '帮助与反馈',
					value: '',
					path: ''
				},
				{
					title: '关于',
					value: 'v1.0.0',
					path: ''
				}
			],
			list: {
				model: {
					user: {
						/* 图像 */
						userFace: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
						/* 昵称 */
						nickName: '青松有道',
						/* 标签 */
						userTag: ['钻石会员', '达人']
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
					wallet: {
						/* 积分 */
						integral: '0',
						/* 优惠券 */
						coupon: '0',
						/* 红包 */
						redPacket: '0.00',
						/* 余额 */
						money: '0.00'
					}
				}
			}
		};
	},
	methods: {
		openPage(path) {
			this.$Router.push({
				path: '/pages/' + path
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.my-box {
	.user-panel-box {
		background-color: #ffffff;
		padding: 40rpx 32rpx 0 32rpx;
	}

	.user-card-box {
		margin: 0 12rpx;
		padding: 20rpx 20rpx;
		border-radius: 16rpx;
		background-color: #ffffff;
	}

	.trace-panel-box {
		background-color: #ffffff;
		padding: 0 10rpx 10rpx 10rpx;
	}

	.trace-card-box {
		margin: 0 12rpx;
		padding: 10rpx 10rpx;
		border-radius: 16rpx;
		background-color: #ffffff;
	}

	.panel-box {
		margin: 0 12rpx;
		padding: 10rpx 0;
		border-radius: 16rpx;
		background-color: #ffffff;

		.panel-header {
			padding: 20rpx 32rpx 20rpx 32rpx;
			border-bottom: 1rpx solid $qs-border-color-light;
		}

		.panel-main {
			padding: 10rpx 0;
		}
	}

	.card-box {
		margin: 0 12rpx;
		padding: 10rpx 0;
		border-radius: 16rpx;
		background-color: #ffffff;

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
			padding: 10rpx 0;
		}
	}

	.other-card-box {
		margin: 0 12rpx;
		padding: 10rpx 0;
		border-radius: 16rpx;
		background-color: #ffffff;
	}
}
</style>
