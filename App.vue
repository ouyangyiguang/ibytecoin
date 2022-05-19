<script>
import store from '@/common/store/index.js'
import socket from '@/plugins/socket';
// #ifdef H5
import { h5Login } from '@/plugins/html5Utils';
// #endif
	export default {
		onLaunch: function() {
		//取出缓存数据
		//store.commit('setCacheData');
		// #ifdef MP-WEIXIN
		if (store.state.user.tokenInfo) {
			socket.init();
		}
		// #endif
		// #ifdef H5
		if (store.state.user.tokenInfo) {
			socket.init();
		} else {
			h5Login('force', () => {
				socket.init();
			});
		}
		// #endif
		// #ifdef APP-PLUS
		if (store.state.user.tokenInfo) {
			socket.init();
		}
		//APPUpdate();
		// #endif
		},
		onShow: function(e) {
			//获取二维码携带的参数
			let scene = decodeURIComponent(e.query.scene);
			scene = scene.split('&');
			let data = {
				//场景值
				scene: e.scene
			};
			scene.forEach(item => {
				let arr = item.split('=');
				if (arr.length == 2) {
					data[arr[0]] = arr[1];
				}
			});
			store.commit('setChatScenesInfo', Object.assign(e.query, data));
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "static/font/custom-icon.css";
    /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	
	/* 引入 qs-ui 基础样式 */
	@import 'qs-ui/theme.scss';
	
/* H5的时候，隐藏滚动条 */
/* #ifdef H5 */
::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}
/* #endif */

/* #ifdef H5 */
body {
  padding-bottom: constant(safe-area-inset-bottom);/* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}
/* #endif */


@font-face {
    font-family: 'DIN Alternate';
    src: url('static/font/DINAlternate-Bold.woff2') format('woff2'),
        url('static/font/DINAlternate-Bold.woff') format('woff');
    font-style: normal;
    font-display: swap;
}

body{
	background: $u-bg-color; font-family: 'DIN Alternate'; 
}

/*深色风格下处理反色颜色*/
// .uni-scroll-view{
// 	color: #000000;
// 	.uni-input-input,.u-form-item,.u-form-item--left__content__label{
// 		color: #000000;
// 	}
// }
		.custombtn{
			background: linear-gradient(96.25deg, #168ADA 20.55%, #168ADA 78.85%);
			padding: 4rpx 30rpx;
		}
		.tips_txt{
			font-size: 22rpx;color: #C0C0C0
		}
		.svg-icon-tabbar{width: 50rpx;height: 50rpx;}
	 .mybasebox{
		 background:$u-bg-color;
		 padding-top: 20rpx;
		 border-radius: 20rpx 20rpx 0rpx 0rpx;
		 margin-top: -30rpx;
	 }
	.base-tonglan-box{
         .htitle_s2{
		 min-height: 80rpx;
		 line-height: 80rpx;
		 padding: 0rpx 20rpx;
		 }
         .htitle{
		 min-height: 80rpx;
		 line-height: 80rpx;
		 padding: 0rpx 20rpx;
		 background: $u-cell-hover;
		 font-weight: bold; font-style: normal;
		 border-bottom:1px solid $u-border-color-light;
		 font-size: 30rpx;
		 i{
			 display: inline-block;
			 width: 50rpx;height: 50rpx;line-height: 50rpx;
			 text-align: center;
			 margin: 20rpx 20rpx 20rpx 0rpx;
			 border-radius: 100%;
			 background:$u-cell-bg;
			 border: solid 1px $u-border-color-light;
			 .u-icon{
				 color: $u-type-primary-reverse;
				 
			 }
		 }
		 }
		.item{
			line-height: 50rpx;
			color: $u-content-color;
			position: relative;
			box-sizing: border-box;
			padding: 18rpx 40rpx;
		}
		.item:after {
		  position: absolute;
		  /* #ifndef APP-NVUE */
		  box-sizing: border-box;
		  content: " ";
		  pointer-events: none;
		  border-bottom: 0.4rpx solid $u-border-color;
		  /* #endif */
		  right: 0;
		  left: 0;
		  bottom: 0;
		}
		.item:last-child {
			&:after{
				border-bottom: 0px;
			}
		}
	}
	.base-panel-box{
		position: relative;
		border-radius: 24rpx;
		padding: 0rpx;
		border: 1px solid $u-border-color-light;
         .htitle_s2{
		 min-height: 80rpx;
		 line-height: 80rpx;
		 padding: 0rpx 20rpx;
		 }
		.htitle{ 
		 background: $u-cell-hover;
		 font-weight: bold; font-style: normal;
		 border-bottom:1px solid $u-border-color-light;
		 border-radius: 24rpx 24rpx 0rpx 0rpx;
		 font-size: 30rpx;
		 min-height: 80rpx;
		 line-height: 80rpx;
		 color: $u-content-color;
		 padding: 0rpx 20rpx;
		 i{
			 display: inline-block;
			 width: 50rpx;height: 50rpx;line-height: 50rpx;
			 text-align: center;
			 margin: 20rpx 20rpx 20rpx 0rpx;
			 border-radius: 100%;
			 background:$u-cell-bg;
			 border: solid 1px $u-border-color-light;
			 .u-icon{
				 color: $u-type-primary-reverse;
				 
			 }
		 }
		 .u-tag{padding: 4rpx 20rpx;background: #5338DD;}
		}
		.right{
			 float: right;line-height: 90rpx;height: 90rpx;margin-right: 20rpx;
		 }
		.item{
			/*border-left: solid 1px #EAECF7;
			border-right: solid 1px #EAECF7;*/
			line-height: 50rpx;
			color: $u-content-color;
			position: relative;
			box-sizing: border-box;
			padding: 18rpx 20rpx;
			&.yuan{
				border-radius:24rpx 24rpx 0rpx 0rpx ;
			}
		}
		.item:after {
		  position: absolute;
		  /* #ifndef APP-NVUE */
		  box-sizing: border-box;
		  content: " ";
		  pointer-events: none;
		  border-bottom: 0.4rpx solid $u-border-color;
		  /* #endif */
		  right: 0;
		  left: 0;
		  bottom: 0;
		}
		.item:last-child {
			border-radius: 0rpx 0rpx 30rpx 30rpx;
			&:after{
				border-bottom: 0px;
			}
		}
	}
	
	.u-load-more-wrap{
		padding: 50rpx;
	}

	.b-b {
		position: relative;
	}

	.b-b::after {
		position: absolute;
		z-index: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 0.5px;
		content: '';
		-webkit-transform: scaleY(.5);
		-ms-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: $u-border-color;
	}


</style>