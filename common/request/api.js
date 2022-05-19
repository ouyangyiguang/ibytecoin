/**
 * 接口列表文件
 * auth代表接口是否需要token
 */
export default {

	/** 初始化 ↓ **/
	init: {
		url: 'Index/init',
		auth: false,
		method: 'GET',
		// desc: '初始化数据',
	},

	/** 上传Base64图片 ↓ **/
	uploadBase64: {
		url: 'User/uploadbase64avatar',
		auth: true,
		method: 'POST',
		// desc: '上传Base64位图片',
	},

	/** 用户 ↓ **/
	user: {
		userinfo: {
			url: 'User/userinfo',
			auth: true,
			method: 'POST',
			// desc: '用户信息',
		},
		clientuserinfo: {
			url: 'User/get_clientuserinfo',
			auth: true,
			method: 'POST',
		},
		login: {
			url: 'User/login',
			auth: false,
			method: 'POST',
		},
		appletslogin: {
			url: 'Wechat/login_applets',
			auth: false,
			method: 'POST',
		},
		register: {
			url: 'User/register',
			auth: false,
			method: 'POST',
		},
		getsmscode: {
			url: 'Tools/sendverifycode',
			auth: false,
			method: 'POST',
		},
		userlist_edit: {
			url: 'User/userlist_edit',
			auth: true,
			method: 'POST',
		},
		usernick_edit: {
			url: 'User/usernick_edit',
			auth: true,
			method: 'POST',
		},
		setpwd: {
			url: 'User/setpwd',
			auth: true,
			method: 'POST',
		},
		bindmobile:{
			url: 'User/bindmobile',
			auth: true,
			method: 'POST',
		},
		invite:{
			url: 'Tools/invite',
			auth: true,
			method: 'GET',
		},
		userlog:{
			url: 'User/user_log',
			auth: true,
			method: 'GET',
		},
		team:{
			url: 'Team/list_new',
			auth: true,
			method: 'GET',
		},
		ckuser:{
			url: 'User/user_check',
			auth: true,
			method: 'GET',
		},
		leveltypemanage:{
			url: 'Team/level_type_manage',
			auth: true,
			method: 'GET',
		},
		levelupgradepay:{
			url: 'Team/level_upgrade_pay',
			auth: true,
			method: 'GET',
		},
		teaminfo:{
			url:'Team/team_info',
			auth: true,
			method: 'GET',
		},
		feedbackadd:{
			url:'List/feedback_add',
			auth: true,
			method: 'GET',
		},
		feedbacklist:{
			url:'List/feedback_list',
			auth: true,
			method: 'GET',
		},
		

	},
	pay:{
		small_pay_sign_wx:{
			url:'Wechat/pay_small_sign_wx',
			auth:true,
			method:'POST',
		}
	},
	
	/** 短信 ↓ **/
	sms: {
		send: {
			url: 'Sms/send',
			auth: false,
			method: 'POST',
			// desc: '发送短信',
		},
	},
	/** 场外交易 ↓ **/
	 otc: {
		adlist: {
			url: 'Otc/ad_list',
			auth: true,
			method: 'POST',
		},
		adrefresh: {
			url: 'Otc/ad_refresh',
			auth: true,
			method: 'POST',
		},
		confirmbuyorder: {
			url: 'Otc/confirm_buyorder',
			auth: true,
			method: 'POST',
		},
		myorder: {
			url: 'Otc/order_list',
			auth: true,
			method: 'POST',
		},
		myorderview: {
			url: 'Otc/myorder_view',
			auth: true,
			method: 'POST',
		},
		setadrecord: {
			url: 'Otc/set_adrecord',
			auth: true,
			method: 'POST',
		},
		sellorder: {
			url: 'Otc/confirm_sellorder',
			auth: true,
			method: 'POST',
		},
		cancelorder:{
			url: 'Otc/cancel_order',
			auth: true,
			method: 'POST',
		},
		releasecoin:{
			url: 'Otc/release_coin',
			auth: true,
			method: 'POST',
		}
	},
	chat: {
		room: {
			url: 'Chat/get_roomgroup',
			auth: true,
			method: 'POST'
		},
		sendmsg: {
			url: 'Chat/send_msg',
			auth: true,
			method: 'POST'
		},
		listmsg: {
			url: 'Chat/get_msg_list',
			auth: true,
			method: 'POST'
		},
	},
	/** 订单  **/
	 order: {
		address_add: {
			url: 'Order/user_address_add',
			auth: true,
			method: 'POST'
		},
		address_list: {
			url: 'Order/user_address_list',
			auth: true,
			method: 'POST'
		},
		order_list: {
			url: 'Order/order_alist',
			auth: true,
			method: 'POST'
		},
		order_view: {
			url: 'Order/order_view',
			auth: true,
			method: 'POST'
		},
		order_pay:{
			url:'Order/order_pay',
			auth: true,
			method: 'POST'
		},
		order_del:{
			url:'Order/order_del',
			auth: true,
			method: 'POST'
		}
	},
	/** 资产  **/
	  assets: {
		coin_list: {
			url: 'Assets/coin_list',
			auth: true,
			method: 'POST'
		},
		coin_detail: {
			url: 'Assets/coin_detail',
			auth: true,
			method: 'POST'
		},
		coinflow_list: {
			url: 'Assets/coinflow_list',
			auth: true,
			method: 'POST'
		},
		zhuan_zhang: {
			url: 'Assets/zhuan_zhang',
			auth: true,
			method: 'POST'
		},
		ti_bi: {
			url: 'Assets/ti_bi',
			auth: true,
			method: 'POST'
		},
		ti_bi_log: {
			url: 'Assets/ti_bi_log',
			auth: true,
			method: 'POST'
		},
		gethangqing: {
			url: 'Assets/hangqing',
			auth: true,
			method: 'POST'
		},
		autodiscover:{
			url: 'Assets/auto_discover_wallet',
			auth: true,
			method: 'POST'
		}
	},
	/** 文档调用  **/
	  archives: {
		article_list: {
			url: 'Artice/list',
			auth: false,
			method: 'POST'
		},
		article_view: {
			url: 'Artice/view',
			auth: false,
			method: 'POST'
		},
	},
	/** 产品调用  **/
	  shop: {
		products_list: {
			url: 'Shop/list',
			auth: false,
			method: 'POST'
		},
		products_view: {
			url: 'Shop/view',
			auth: false,
			method: 'POST'
		},
		add_cart:{
			url: 'Shop/addcart',
			auth: true,
			method: 'POST'
		},
		car_list:{
			url: 'Shop/carlist',
			auth: true,
			method: 'POST'
		},
		cart_uni_algorithm:{
			url: 'Shop/cart_uni_algorithm',
			auth: true,
			method: 'POST'
		},
		cart_del:{
			url: 'Shop/cart_del',
			auth: true,
			method: 'POST'
		},
		order_save:{
			url: 'Shop/order_save',
			auth: true,
			method: 'POST'
		},
	},
    ticket: {
    	url: 'Order/ticket_list',
    	auth: true,
    	method: 'GET',
    },
	ex:{
		coin2coin_info:{
			url:'Exchange/coin2coin_info',
			auth:true,
			method:'POST',
		},
		coin2coin_pair_list:{
			url:'Exchange/coin2coin_pair_list',
			auth:true,
			method:'POST',
		},
		transaction_list:{
			url:'Exchange/transaction_list',
			auth:true,
			method:'POST',
		},
		guandan:{
			url:'Exchange/guan_dan',
			auth:true,
			method:'POST',
		},
		cancel:{
			url:'Exchange/cancel_intrust',
			auth:true,
			method:'POST',
		}
	},
    factory: {
		list_factory:{
			url: 'Factory/list_factory',
			auth: true,
			method: 'GET',
		},
		mining:{
			url: 'Factory/mining',
			auth: true,
			method: 'GET',
		},
		shou_huo:{
			url: 'Factory/shou_huo',
			auth: true,
			method: 'GET',
		},
		buy_factory:{
			url: 'Factory/buy_factory',
			auth: true,
			method: 'GET',
		},
		list_income:{
			url: 'Factory/list_income',
			auth: true,
			method: 'GET',
		},
		my_factory:{
			url: 'Factory/my_factory',
			auth: true,
			method: 'GET',
		}
    },
};
