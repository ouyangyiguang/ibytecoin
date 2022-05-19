// .env.js 文件
// 不同环境访问不同的路径
// import store from '@/common/store/index'

//登录接口
//http://robot.ibytecoin.com/index.php/vueapi/
//http://127.0.0.1:5555/index.php/vueapi/
const ENV_LOGIN_URL = {
	development: 'http://127.0.0.1:5555/index.php/vueapi/', //开发环境
	production: 'http://robot.ibytecoin.com/index.php/vueapi/', //生产环境
	serverurl:'http://robot.ibytecoin.com',
}

//项目接口
const ENV_API_URL = {
	development: 'http://127.0.0.1:5555/index.php/vueapi/', //开发环境
	production: 'http://test.dcdy.com/index.php/vueapi/', //生产环境
	serverurl:'http://robot.ibytecoin.com',
}

//图片上传
const CMS_IMG_URL ='http://cdn.nccnt.com/';

//高德地图
const GAODE_URL ='https://restapi.amap.com/';

// process.env.NODE_ENV

	// export const LOGIN_URL = ENV_LOGIN_URL['development']; //后台根域名
	// export const API_URL = ENV_API_URL['development']; //后台接口域名

	export const LOGIN_URL = ENV_LOGIN_URL['production']; //后台根域名
	export const API_URL = ENV_API_URL['production']; //后台接口域名


export const SERVER_URL = ENV_API_URL['serverurl']; //后台接口域名
export const SOCKET_URL="ws://robot.ibytecoin.com:2348";
export const MAP_URL = GAODE_URL; //地图接口
export const IMG_URL = CMS_IMG_URL; //CMS图片地址
export const PUBLICAPPID = 'wxad277991b1e31287';