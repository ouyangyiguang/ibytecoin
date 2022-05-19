<template>
  <qs-page>
    <!-- 公共组件-每个页面必须引入 -->
    <public-module></public-module>
    <!--isFullScreen 可以实其全屏显示-->
    <ourLoading
      isFullScreen
      :active="loadstatus"
      text="loading..."
      color="#63E5CB"
      textColor="#63E5CB"
    />
    <!-- #ifdef APP-PLUS -->
    <yomol-upgrade
      :type="upgradeType"
      :url="upgradeUrl"
      title="发现新版本"
      :content="upgradeContent"
      ref="yomolUpgrade"
    ></yomol-upgrade>
    <!-- #endif -->
    <qs-navbar :isBack="false" backUrl="">
      <view class="u-flex u-m-l-8">
        <image
          src="../../static/image/icon_search.png"
          mode=""
          style="width: 130rpx; height: 100rpx"
        ></image>
      </view>
      <view class="u-flex u-m-r-50"><h3>首页</h3></view>
      <view class="u-flex u-m-r-22">
        <view @click="$tools.routerTo('/pages/chat/home')">
          <image
            class="svg-icon-tabbar"
            src="../../static/image/icon_msg.png"
            mode=""
          ></image>
          <u-badge
            size="mini"
            type="error"
            :count="msgnum"
            :offset="offset"
          ></u-badge>
        </view>
        <!-- <u-icon name="xiaoxi" size="38"  custom-prefix="customicon" :custom-style="{'padding': '16rpx'}" ></u-icon> -->
        <!-- <u-icon name="scan" size="38" :custom-style="{'padding': '16rpx'}"></u-icon> -->
      </view>
    </qs-navbar>
    <!-- #ifdef MP-WEIXIN -->
    <!-- <button type="primary" @click="onAppletsLogin">小程序登录</button> -->
    <!-- #endif -->

    <!-- 		<view class="input_form_box">
			<view class="input_box btm_line">
				<view class="name">支付（统一分配方法）</view>
				<view class="select_info" @click="onPay">
					<view class="select">点击支付</view>
				</view>
			</view>
			<view class="input_box btm_line">
				<view class="name">APP微信支付</view>
				<view class="select_info" @click="onAppWxPay('wxpay')">
					<view class="select">点击支付</view>
				</view>
			</view>
			<view class="input_box btm_line">
				<view class="name">APP支付宝支付</view>
				<view class="select_info" @click="onAppWxPay('alipay')">
					<view class="select">点击支付</view>
				</view>
			</view>
			<view class="input_box btm_line">
				<view class="name">微信小程序支付</view>
				<view class="select_info" @click="onAppWxPay('smallPay')">
					<view class="select">点击支付</view>
				</view>
			</view>
			<view class="input_box btm_line">
				<view class="name">微信公众号支付</view>
				<view class="select_info" @click="onWxPublicPay">
					<view class="select">点击支付</view>
				</view>
			</view>
		</view> -->

    <view class="carousel">
      <u-swiper :list="initdata.Slide" :border-radius="20"></u-swiper>
    </view>

    <view class="card-main u-m-t-30 u-m-b-30">
      <u-row gutter="16" justify="center">
        <u-col span="3">
          <view
            @click="$tools.routerTo('/pages/shop/index')"
            style="text-align: center"
            class="indexbg index1"
          >
            <!-- <svg class="svg-icon"><use xlink:href="#iconCC"></use></svg> -->
            <image src="/static/index1.png"></image>
          </view>
          <view style="text-align: center"><h3>乐购</h3></view>
        </u-col>
        <u-col span="3">
          <view
            @click="$tools.routerTo('/pages/exchange/hangqing')"
            style="text-align: center"
            class="indexbg index2"
          >
            <image mode="scaleToFill" src="/static/index2.png"></image>
          </view>
          <view style="text-align: center"><h3>行情</h3></view>
        </u-col>
        <u-col span="3">
          <view
            @click="$tools.routerTo('/pages/exchange/index')"
            style="text-align: center"
            class="indexbg index3"
          >
            <image mode="scaleToFill" src="/static/index3.png"></image>
          </view>
          <view style="text-align: center"><h3>交易</h3></view>
        </u-col>
        <u-col span="3">
          <view
            @click="$tools.routerTo('/pages/robot/index')"
            style="text-align: center"
            class="indexbg index4"
          >
            <image mode="scaleToFill" src="/static/index4.png"></image>
          </view>
          <view style="text-align: center"><h3>量化</h3></view>
        </u-col>
      </u-row>
    </view>

    <u-gap height="16" bg-color="#f3f4f6"></u-gap>
    <view class=" ">
      <h3 class="u-m-l-30 u-m-t-30">搜链快讯</h3>
      <view class="item u-m-l-30 u-m-t-30" v-if="newslist.length <= 0">
        加载中...
      </view>
      <view class="dapp-box u-m-b-30">
        <view
          class="itemnew"
          v-for="(item, index) in newslist"
          :key="index"
          @click="
            $tools.routerTo(
              '/pages/info/view_soochain',
              'aid=' + item.aid + '&title=' + item.title
            )
          "
        >
          <view class="times">{{ item.add_time }}</view>
          <view class="textcont">{{ item.title }}</view>
        </view>
      </view>
    </view>
  </qs-page>
</template>

<script>
// #ifdef MP-WEIXIN
import { onLogin } from "@/plugins/applogin";
// #endif

import { setPay, setPayAssign } from "@/plugins/wxutils";
// #ifdef H5
import { wxPublicPay } from "@/plugins/html5Utils";
// #endif
// #ifdef APP-PLUS
import yomolUpgrade from "@/components/yomol-upgrade/yomol-upgrade.vue";
// #endif
import socket from "@/plugins/socket";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    // #ifdef APP-PLUS
    yomolUpgrade,
    // #endif
  },
  data() {
    return {
      loadstatus: false,
      initdata: {
        Slide: ["/static/adzw.png?1"],
      },
      upgradeType: "pkg", //pkg 整包 wgt 升级包
      upgradeContent: "", //更新内容
      upgradeUrl: "", //更新地址
      newslist: [],
      msgnum: "",
      offset: [10, 5], //消息数字角标位置
    };
  },
  created() {
    let _this = this;

    socket.acceptMessage = function (res) {
      console.log("页面接收到数据",res);
      if (res.type == "ping") {
        _this.$store.commit("setChatmsgnoread", res.isnoread);
        //_this.msgnum=res.isnoread;
      }
      if (res.type == "binan") {
        uni.setStorageSync("hangqingcache", res.binancelist);
      }
    };
  },
  onLoad() {
    this.msgnum = this.user.chatmsgnoread;
    // #ifdef APP-PLUS
    this.checkVersionClick();
    // #endif

    this.soochainnews();

    //this.message=this.$tools.unzip('H4sIAAAAAAAAAKtWKi5JLCktVrIy01FKK81zzk9JVbJSqiqPT0xJUdKBMazMagEMFsdxKgAAAA')
  },
  computed: {
    ...mapState(["user"]),
  },
  async onShow() {
    //async+await+Promise 让<if判断>在<getWeatherList返回结果后>执行
    //let flag = await this.getWeatherList();
  },
  methods: {
    onAppletsLogin() {
      // 第一个参数强制登录，尝试登录
      // try 为尝试登录，当第一次登录，没有用户登录权限的时候不弹出登录框
      // judge 询问登录，当第一次登录，没有用户登录权限的时候先弹出提示是否要去登录
      onLogin("judge", () => {
        console.log("登录成功");
      });
    },

    soochainnews(page) {
      return new Promise((resolve, reject) => {
        uni.request({
          url: "http://www.soochain.com/vueapi/article/index/",
          data: {
            tid: 80,
            p: 1,
            limit: 10,
          },
          success: (res) => {
            console.log(res);
            if (res.statusCode == 200) {
              this.newslist = res.data.list;
            }
          },
          fail: (error) => {
            resolve(false);
          },
        });
      });
    },
    onPay() {
      setPayAssign(
        {
          price: 8, // 价格，
          title: "商品订单", // 标题
          orderNo: "6546541654122317", // 订单编号
        },
        (res) => {
          // 小程序支付的回调
          if (res.success) {
            uni.showToast({
              title: "支付成功",
              icon: "none",
            });
          } else {
            uni.showToast({
              title: "支付失败，" + res.data,
              icon: "none",
            });
          }
        }
      );
    },
    onAppWxPay(type) {
      setPay({
          type: type, // APP微信支付=wxpay，APP支付宝支付=alipay，微信小程序支付=smallPay
          price: 8, // 价格，
          title: "商品订单", // 标题
          orderNo: "6546541654122316", // 订单编号
        },(res) => {
          // 小程序支付的回调
          if (res.success) {
            uni.showToast({
              title: "支付成功",
              icon: "none",
            });
          } else {
            uni.showToast({
              title: "支付失败，" + res.data,
              icon: "none",
            });
          }
        }
      );
    },
    // 公众号支付
    onWxPublicPay() {
      // #ifdef APP-PLUS
      wxPublicPay({
        orderNo: "6546541654122315", // 订单编号
      });
      // #endif
      // #ifndef APP-PLUS
      uni.showToast({
        title: "请在微信公众号环境使用",
        icon: "none",
      });
      // #endif
    },

    /*
     * 检测版本升级
     */
    checkVersionClick() {
      // 检测升级
      var that = this;
      plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
        var platform = uni.getSystemInfoSync().platform;

        that.version = widgetInfo.version; //获取当前版本号
        //that.version = plus.runtime.version;
        //根据当前平台去后台检测版本号
        //这是我的逻辑，自己自定义
        uni.request({
          url: "http://test.dcdy.com/vueapi/tools/check_update_ib",
          data: {
            appid: plus.runtime.appid,
            clientVersion: that.version,
            user_agent: platform,
            imei: plus.device.imei,
          },
          success: (res) => {
            console.log(res);
            if (res.data.code == 200) {
              //我的后台会返回一个安装包地址（pkgUrl），升级包地址（wgtUrl）
              //判空来判断是非是整包升级还是资源包升级
              //content是版本更新内容 \n换行
              //ios用户pkgUrl是苹果市场App地址，android自定义下载地址
              if (res.data.pkgUrl != "" && res.data.wgtUrl == "") {
                this.upgradeType = "pkg";
                this.upgradeContent = res.data.content;
                this.upgradeUrl = res.data.pkgUrl;
                this.$refs.yomolUpgrade.show();
              } else {
                this.upgradeType = "wgt";
                this.upgradeContent = res.data.content;
                this.upgradeUrl = res.data.wgtUrl;
                this.$refs.yomolUpgrade.show();
              }
            }
          },
          fail: (error) => {
            console.log(error);
          },
        });
      });
    },
  },
};
</script>

<style lang="scss">
.ugap {
  background: red;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.carousel {
  margin: 20rpx 20rpx 0rpx 20rpx;
}

.card-main {
  .indexbg {
    width: 80rpx;
    height: 80rpx;
    border-radius: 100%;
    margin: auto auto 10rpx auto;
    padding: 20rpx;
    &.index1 {
      background: #cde9f4;
    }
    &.index2 {
      background: #ffe8c2;
    }
    &.index3 {
      background: #ffe1e7;
    }
    &.index4 {
      background: #d7d6dc;
    }
  }
  image {
    width: 40rpx;
    height: 40rpx;
  }
  h3 {
    font-size: 30rpx;
    font-weight: bold;
    font-style: normal;
  }
}

.dapp-box {
  margin-top: 20rpx;
  .itemnew {
    background: url(@/static/image/dotlinec.png) no-repeat top left;
    background-position: 26rpx 0rpx;
    padding-left: 70rpx;
    padding-right: 30rpx;
    min-height: 200rpx;
    .times {
      line-height: 200%;
      color: #cccccc;
      width: 100%;
    }
    .textcont {
      margin: 20rpx auto 30rpx auto;
      width: 100%;
      line-height: 180%;
      display: inline-block;
      color: #68727b;
    }
  }
  .itemnew:first-child {
    background: url(@/static/image/dotline.png) no-repeat top left;
    background-position: 26rpx 0rpx;
    padding-left: 70rpx;
  }
}
</style>
