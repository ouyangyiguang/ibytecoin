 ## 说明

检测版本更新，并自动下载安装的组件

后台逻辑用户自定义，我的是java

联系QQ: 1397551270


## 用法

**父组件**

```html
<template>
	<view>
		<yomol-upgrade  :type="upgradeType" :url="upgradeUrl" title="发现新版本" :content="upgradeContent" ref="yomolUpgrade"></yomol-upgrade>
	</view>
</template>
```

```js
<script>
	import yomolUpgrade from '@/components/yomol-upgrade/yomol-upgrade.vue'
	export default {
		components:{
			yomolUpgrade
		},
		data() {
			return {
				upgradeType: 'pkg', //pkg 整包 wgt 升级包
				upgradeContent: '', //更新内容
				upgradeUrl: '', //更新地址
			}
		},
		methods: {
			/*
			* 检测版本升级
			*/
			checkVersionClick() {
				// 获取版本信息
				plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
					var platform = uni.getSystemInfoSync().platform
					//根据当前平台去后台检测版本号
					//这是我的逻辑，可自定义
					uni.request({
						url: 'https://www.cheshangji.cn/csj-web/app/check/' + platform,
						data: {
							version: widgetInfo.version,
							name: widgetInfo.name //没啥用
						},
						success: (res) => {
							console.log(res);
							if (res.data.status == 200 && res.data.data.update) {
								//我的后台会返回一个安装包地址（pkgUrl），升级包地址（wgtUrl）
								//判空来判断是非是整包升级还是资源包升级
								//content是版本更新内容 \n换行
								//ios用户pkgUrl是苹果市场App地址，android自定义下载地址
								if (res.data.data.pkgUrl != '' && res.data.data.wgtUrl == '') {
									this.upgradeType = 'pkg'
									this.upgradeContent = res.data.data.content
									this.upgradeUrl = res.data.data.pkgUrl
									this.$refs.yomolUpgrade.show()
								} else {
									this.upgradeType = 'wgt'
									this.upgradeContent = res.data.data.content
									this.upgradeUrl = res.data.data.wgtUrl
									this.$refs.yomolUpgrade.show()
								}
							} 
						},
						fail: (error) => {
							console.log(error);
						}
					});
				});
			},
		}
	}
</script>
```