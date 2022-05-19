import Vue from 'vue'
import Router from 'uni-simple-router'
import store from '@/common/store'

Vue.use(Router)
//初始化
const router = new Router({
	APP: {
		animation: {
			animationType: 'pop-in',
			animationDuration: 300
		}
	},
	encodeURI: true,
	routes: ROUTES //路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
    // console.log('前置守卫Yoooooooooo')
    console.log('to',to)
    console.log('----willGo----',to.path)
    
    // 有两个个判断条件,一个是token,还有一个路由元信息
    let tokenFlag = store.getters.loginFlag;
    if(to.path!='/pages/account/login/pwd-login'){
        uni.setStorageSync('fromLogin',{path: to.path,query: to.query})
    }
    
    let guidepages = uni.getStorageSync('guidePages');
    //if (to.meta && to.meta.auth && !tokenFlag) {
		console.log('我要登录'+store.state.user.userInfo.users_id);
	if (!tokenFlag||store.state.user.userInfo.users_id==undefined) {
		
	        if (to.path !== '/pages/account/login/pwd-login'
			 && to.path !== '/pages/account/register/username-register'
			 && to.path !== '/pages/account/register/mobile-register'
			  && to.path !== '/pages/account/findPassword/mobile-findPassword'
			   && to.path !== '/pages/account/login/sms-login'
				&& guidepages==2) {
				console.log('i 要登录');
	            return next({
                   path:'/pages/account/login/pwd-login',
                   NAVTYPE:'push'
                });
			 next();
	        }else{
				next();
			}

    } else {
        console.log('正常跳转页面',to);
        next();
    }
    
})

// 全局路由后置守卫
router.afterEach((to, from) => {
    
})

export default router;
