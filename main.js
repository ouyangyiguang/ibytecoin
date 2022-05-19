import Vue from 'vue'
import App from './App'
import router from '@/common/router'
import store from '@/common/store'
import tools from '@/common/utils/tools'
import uView from "uview-ui";



import {
	RouterMount
} from 'uni-simple-router'
import api from '@/common/request/index'


Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$tools = tools;


// Vue.prototype.$saoker = {
// 	prePage
// };


//判断是否登录
import { judgeLogin } from '@/plugins/applogin';
Vue.prototype.judgeLogin = judgeLogin;

// ..加载动画....
import ourLoading from '@/components/our-loading/our-loading.vue'
Vue.component('ourLoading', ourLoading)
// ......

import publicModule from "@/components/common/public-module.vue";
Vue.component("public-module", publicModule);

// import  svg  from '@/static/svg.js';
// Vue.use(svg)

// 引入语言包
import zh from '@/common/locales/zh.js';
import en from '@/common/locales/en.js';
// 引入并使用vue-i18n
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// 构造i18n对象
const i18n = new VueI18n({
	locale: (() => {
		try {
			const lang = uni.getStorageSync("locale");
			if (lang=='zh'){
				lang='zh';
			}
			if (lang) {
				return lang
			} else {
				uni.setStorageSync('locale', 'zh');
				return 'zh'
			}
		} catch (e) {
			uni.setStorageSync('locale', 'zh');
			return 'zh'
		}
	})(), //初始化,保证刷新页面也保留
	// 引入语言文件
	messages: {
		'zh': zh, // 这里为上面通过import引入的语言包
		'en': en,
	},
	silentTranslationWarn: true,
})
// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
Vue.prototype._i18n = i18n

// 引入uView提供的对vuex的简写法文件
// let vuexStore = require('@/common/$u.mixin.js');
// Vue.mixin(vuexStore);

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(uView);

const app = new Vue({
	i18n,
    store,
    ...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

Vue.mixin({
	onLoad: function() {
		const lang = this.$i18n.locale;
		uni.setTabBarItem({
			index: 0,
			text: this.$t('tabbar.tab0')
		});
		uni.setTabBarItem({
			index: 1,
			text: this.$t('tabbar.tab2')
		});
		uni.setTabBarItem({
			index: 2,
			text: this.$t('tabbar.tab3')
		});
		uni.setTabBarItem({
			index: 3,
			text: this.$t('tabbar.tab4')
		});
	}
})