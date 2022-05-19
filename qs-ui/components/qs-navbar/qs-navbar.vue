<template>
	<view class="qs-navbar-wrap">
		<view class="qs-navbar" :style="[navbarStyle]" :class="{ 'qs-navbar-fixed': isFixed, 'qs-border-bottom': borderBottom }">
			<view class="qs-status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="qs-navbar-inner" :style="[navbarInnerStyle]">
				<view class="u-flex u-m-l-22" @click="BackPage" v-if="isBack">
					<u-icon name="jiantouzuo" custom-prefix="customicon" class="u-m-r-10"></u-icon>
					<slot name="backText"></slot>
				</view>
				<slot>
				</slot>
			</view>
		</view>
		<!-- 解决fixed定位后导航栏塌陷的问题 -->
		<view class="qs-navbar-placeholder" v-if="isFixed" :style="{ width: '100%', height: Number(navbarHeight) + statusBarHeight + 'px' }"></view>
	</view>
</template>

<script>
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
let menuButtonInfo = {};
// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif

export default {
	name: "qs-navbar",
	props: {
		// 背景，对象形式，因为用户可能定义一个纯色，或者线性渐变的颜色
		background: {
			type: Object,
			default() {
				return {
					
				}
			}
		},
		isBack: {
				type: [Boolean, String],
				default: false
			},
		backUrl:{
			type: [String, Number],
			default: ''
		},
		// 导航栏高度，单位px，非rpx
		height: {
			type: [String, Number],
			default: ''
		},
		// 导航栏是否固定在顶部
		isFixed: {
			type: Boolean,
			default: true
		},
		// 是否显示导航栏的下边框
		borderBottom: {
			type: Boolean,
			default: true
		},
		zIndex: {
			type: [String, Number],
			default: ''
		}
	},
	data() {
		return {
			menuButtonInfo: menuButtonInfo,
			statusBarHeight: systemInfo.statusBarHeight
		};
	},
	computed: {
		// 整个导航栏的样式
		navbarStyle() {
			let style = {};
			style.zIndex = this.zIndex ? this.zIndex : this.$u.zIndex.navbar;
			// 合并用户传递的背景色对象
			Object.assign(style, this.background);
			return style;
		},
		// 导航栏内部盒子的样式
		navbarInnerStyle() {
			let style = {};
			// 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
			style.height = this.navbarHeight + 'px';
			// // 如果是各家小程序，导航栏内部的宽度需要减少右边胶囊的宽度
			// #ifdef MP
			let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left;
			style.marginRight = rightButtonWidth + 'px';
			// #endif
			return style;
		},
		// 转换字符数值为真正的数值
		navbarHeight() {
			// #ifdef APP-PLUS || H5
			return this.height ? this.height : 44;
			// #endif
			// #ifdef MP
			// 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
			// 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
			// return menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2;//导航高度
			let height = systemInfo.platform == 'ios' ? 44 : 48;
			return this.height ? this.height : height;
			// #endif
		}
	},
		methods: {
			BackPage() {
				
				if (this.backUrl==''){
					uni.navigateBack({
						deta: 1
					});
				}else{
					
//this.$emit('eventChange',this.backUrl);
// #ifdef APP-PLUS
	uni.navigateBack({
		deta: 1
	});
// #endif

// #ifdef H5
					this.$Router.push({
						path: this.backUrl,
						query: {}
					});
// #endif
				}

			}
		}
};
</script>

<style scoped lang="scss">
.qs-navbar {
	width: 100%;
	background: $u-tabbar-top-bg;
	color: $u-tabbar-top-text;
}

.qs-navbar-fixed {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 991;
}

.qs-status-bar {
	width: 100%;
}

.qs-navbar-inner {
	display: flex;
	justify-content: space-between;
	position: relative;
	align-items: center;
}
</style>
