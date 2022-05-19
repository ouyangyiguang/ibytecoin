<template>
	<view class="qs-navbar" :style="[navbarStyle]">
		<view class="qs-status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
		<view :style="[navbarInnerStyle]"></view>
	</view>
</template>

<script>
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();

export default {
	name: 'qs-gap-navbar',
	props: {
		// 背景，对象形式，因为用户可能定义一个纯色，或者线性渐变的颜色
		background: {
			type: Object,
			default() {
				return {
					backgroundColor: 'transparent'
				};
			}
		},
		// 导航栏高度，单位px，非rpx
		height: {
			type: [String, Number],
			default: ''
		}
	},
	data() {
		return {
			statusBarHeight: systemInfo.statusBarHeight
		};
	},
	computed: {
		// 导航栏的样式
		navbarStyle() {
			let style = {};
			// 合并用户传递的背景色对象
			Object.assign(style, this.background);
			return style;
		},
		// 导航栏内部盒子的样式
		navbarInnerStyle() {
			let style = {};
			// 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
			style.height = this.navbarHeight + 'px';
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
	}
};
</script>

<style scoped lang="scss">
.qs-navbar {
	width: 100%;
}

.qs-status-bar {
	width: 100%;
}
</style>
