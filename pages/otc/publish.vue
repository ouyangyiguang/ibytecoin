<template>
	<qs-page>
		<qs-navbar :isBack="true" backUrl="" :background="navbar">
			<view class="u-flex  u-m-l-46"><h3>法币交易</h3></view>
			<view class="u-flex u-m-r-22">
				<view class="fabupost" @click="$tools.routerTo('/pages/otc/index')">自选区</view>
			</view>
		</qs-navbar>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		     <!--isFullScreen 可以实其全屏显示-->
		<ourLoading isFullScreen :active="loadstatus" :text="loadstxt" color="#63E5CB" textColor="#63E5CB"/>
		<view class="topfixbar">
			<u-gap height="10"></u-gap>
			<u-row gutter="16" justify="space-between">
				<u-col span="6" >
					<u-tabs name="cate_name" :list="cateList" :is-scroll="false" :current="currentTab" @change="changeTab"
					 bg-color="#63E5CB"
					 inactive-color	="#ecf5ff"
					 :active-item-style="tabsstyle"
					 :show-bar="false"
					 active-color="#ffffff"></u-tabs>
				</u-col>
				<u-col span="6"  @click="$tools.routerTo('/pages/otc/mypublish')">
					<view class="u-text-right u-m-r-20"><i class="u-m-r-10"><u-icon name="jifenshangcheng" custom-prefix="customicon" size="30"></u-icon></i>我的发布</view>
				</u-col>
			</u-row>

			<u-gap height="40"></u-gap>
			<view class="coinselectarea">
			<view style="width: 280rpx;margin-left: 20rpx;padding-top: 10rpx;">
				<u-tabs class="tabscoinstyle" name="cate_name" :list="cointypeList" :is-scroll="false" :current="currentCoinTab" @change="changeCoinTab" 
				 bg-color="#ffffff"
				 inactive-color	="#999999"
				 font-size="24"
				 :bold="false"
				 height="60"
				 active-color="#52D3FF"></u-tabs>
			</view>
			</view>
		</view>
		<u-gap height="2"></u-gap>
		<view class="u-padding-20">
			<u-form class="u-m-b-20 numinput">
				<u-form-item class="form-item" label="出售数量" label-position="top">
					<u-input placeholder="请输入数量" v-model="sellnum" type="text" :custom-style="input" />
					<text slot="right" style="font-size: 22rpx;">
					{{coininfo.namecode}} / 可用：{{(coininfo.balance_available*1).toFixed(2)}}
					</text>
				</u-form-item>
			</u-form>
			<u-row gutter="0" justify="space-between">
				<u-col span="9" style="color: #888888;">价格约为: {{(hangqing.info.c * hangqing.cnyrate).toFixed(2)}} CNY / {{coininfo.namecode}}</u-col>
				<u-col span="3" ></u-col>
			</u-row>
			<view class="u-m-t-50">
				<u-button type="primary" @click="submit_1()">0手续费出售</u-button>
			</view>
		
		</view>


		<view style="position: fixed;bottom: 120rpx;text-align: center;width:100%;">
			点击出售即表示您已同意<text class="u-type-success-dark">《一键买卖交易协议》</text>
		</view>
		
		
	<u-popup v-model="iwantsell_show" mode="bottom">
		<view class="pops">
			<view class="title u-m-b-20">
				<h3>出售 {{coininfo.namecode}}</h3>
				<text>参考单价:{{(hangqing.info.c * hangqing.cnyrate).toFixed(2)}} CNY</text>
			</view>

		<u-form class="u-p-l-30 u-p-r-30">

				<u-form-item class="form-item" label="出售数量" label-position="left" label-width="160">
					<u-input v-model="sellnum" />
					<text slot="right" style="font-size: 22rpx;">
					{{coininfo.namecode}}
					</text>
				</u-form-item>
				<u-form-item class="form-item" label="最少购买量" label-position="left" label-width="160">
					<u-input v-model="mintransamout"/>
				</u-form-item>
				<u-form-item class="form-item" label="出售价格" label-position="left" label-width="160">
					<u-row gutter="0" justify="space-between">
						<u-col span="7">
							<u-input v-model="sell_price" :disabled="is_price" placeholder="输入价格或浮动价格"/>
						</u-col>
						<u-col span="3" text-align="right">
							<view class="u-font-xs">动态价格</view>
						</u-col>
						<u-col span="1">
							<view class=" u-p-t-12" text-align="right">
								<u-switch v-model="is_price"  size="30"></u-switch>
								</view>
						</u-col>
					</u-row>
				</u-form-item>
				<u-gap height="10"></u-gap>
				<view class="u-p-t-10">
					<u-row gutter="0" justify="space-between">
						<u-col span="2"><view>微信</view></u-col>
						<u-col span="8"><view v-if="user.userInfo.wechatID!=''">{{user.userInfo.wechatID}}</view><view v-else>未设置</view></u-col>
						<u-col span="2"><u-switch v-model="is_wx" size="30"></u-switch></u-col>
						</u-col>
					</u-row>
				</view>
				<view class="u-p-t-10">
					<u-row gutter="0" justify="space-between">
						<u-col span="2"><view>支付宝</view></u-col>
						<u-col span="8"><view v-if="user.userInfo.alipayID!=''">{{user.userInfo.alipayID}}</view><view v-else>未设置</view></u-col>
						<u-col span="2"><u-switch v-model="is_al"  size="30"></u-switch></u-col>
						</u-col>
					</u-row>
				</view>
				<view class="u-p-t-10">
					<u-row gutter="0" justify="space-between">
						<u-col span="2"><view v-if="user.userInfo.bankAccount!=''">{{user.userInfo.bankName}}</view><view v-else>收款银行</view></u-col>
						<u-col span="8"><view v-if="user.userInfo.bankAccount!=''">{{user.userInfo.bankAccount}}</view><view v-else>未设置</view></u-col>
						<u-col span="2"><u-switch v-model="is_bnk"  size="30"></u-switch></u-col>
						</u-col>
					</u-row>
				</view>
				<view class="tips_txt u-p-t-10">注意：收款方式一旦设定不可更改</view>

				

	
		</u-form>
		<view style="position: fixed; bottom: 60rpx;width:100%;">
			<view class="u-padding-20">
					<u-row gutter="16" justify="space-between" style="width:100%;">
						<u-col span="6" >
							<u-button type="" @click="iwantsell_show = false;">
								取消
							</u-button>
						</u-col>
						<u-col span="6" >
							<u-button type="primary" @click="confirmorder()">委托下单</u-button>
						</u-col>
					</u-row>
			</view>
		</view>
		</view>
	</u-popup>
		
		
		
		
	</qs-page>
</template>


<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      flow_list: [],
      hasLogin: false,
      loadStatus: "loadmore",
      loadstatus: false,
      loadstxt: "loading...",
      navbar: {
        background: "#63E5CB",
      },
      input: {
        fontSize: "50rpx",
      },
      cateList: [
        {
          id: 1,
          name: "我要买",
        },
        {
          id: 2,
          name: "我要卖",
        },
      ],
      cointypeList: [
        {
          id: 1,
          name: "USDT",
        },
        {
          id: 2,
          name: "BTC",
        },
      ],
      tabsstyle: {
        fontSize: "40rpx",
      },
      currentTab: 1,
      transtype: "sell",
      currentCoinTab: 0,
      coinclassid: 2,
      coininfo: {
        namecode: "",
      },
      hangqing: {
        info: {
          price: "",
        },
        cnyrate: "",
      },
      sellnum: "",
      iwantsell_show: false,
      mintransamout: "",
      sell_price: "",
      is_price: true,
      is_wx: true,
      is_al: true,
      is_bnk: true,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  onLoad() {
    this.hasLogin = this.$store.getters.loginFlag;
    this.getcoininfo();
    if (this.user.userInfo.wechatID == "") this.is_wx = false;
    if (this.user.userInfo.alipayID == "") this.is_al = false;
    if (this.user.userInfo.bankAccount == "") this.is_bnk = false;
  },

  methods: {
    changeTab(e) {
      this.currentCoinTab = 0;
      this.currentTab = e;
      if (this.currentTab == 1) {
        this.transtype = "sell";
      } else if (this.currentTab == 0) {
        this.transtype = "buy";
      }
    },
    changeCoinTab(e) {
      this.currentCoinTab = e;
      if (this.currentCoinTab == 1) {
        this.coinclassid = 3;
      } else if (this.currentCoinTab == 0) {
        this.coinclassid = 2;
      }
      this.getcoininfo();
    },

    submit_1() {
      this.iwantsell_show = true;
    },
    confirmorder() {
      if (this.sellnum < 0 || this.sellnum == "") {
        this.$u.toast("请输入数量");
        return;
      }
      if (this.sellnum > this.coininfo.balance_available) {
        this.$u.toast("超出拥有数额");
        return;
      }

      return new Promise((resolve, reject) => {
        this.loadstatus = true;

        this.$api("otc.sellorder", {
          sellnum: this.sellnum,
          sell_price: this.sell_price,
          coinclassid: this.coinclassid,
          mintransamout: this.mintransamout,
          is_price: this.is_price,
          is_wx: this.is_wx,
          is_al: this.is_al,
          is_bnk: this.is_bnk,
          transtype: this.transtype,
        })
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.iwantsell_show = false;
              this.$router.push({
                path: "/pages/otc/index",
                query: {
                  recordid: res.data.recordid,
                },
              });
            } else {
              this.$u.toast(res.msg);
            }
            this.loadstatus = false;
          })
          .catch((e) => {
            this.loadstatus = false;
            resolve(false);
          });
      });
    },
    getcoininfo() {
      return new Promise((resolve, reject) => {
        this.$api("assets.coin_detail", {
          coinclass: this.coinclassid,
        })
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.coininfo = res.data;
              this.mintransamout = this.coininfo.sell_min_default;
              return new Promise((resolve, reject) => {
                this.$api("assets.gethangqing", {
                  coinname: this.coininfo.namecode,
                })
                  .then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                      this.hangqing = res.data;
                    }
                  })
                  .catch((e) => {});
              });
            }
          })
          .catch((e) => {});
      });
    },
  },
};
</script>
<style lang="scss" scoped>

.topfixbar {
  top: 70rpx;
  background: $u-type-primary;
  height: 170rpx;
  width: 100%;
  margin-top: -2rpx;
  z-index: 10000;
}
.tabscoinstyle {
  padding: 0rpx;
}

.fabupost {
  border: solid 1px $u-cell-bg;
  border-radius: 30rpx;
  padding: 2rpx 20rpx;
  color: $u-cell-bg;
}

.coinselectarea {
  width: 100%;
  background: $u-bg-color;
  border-radius: 20rpx 20rpx 0rpx 0rpx;
}
.numinput {
  .u-border-bottom {
    border-bottom: solid 1px #2b85e4;
  }
}
.pops {
  background: #ffffff;
  height: 900rpx;
  .title {
    background: $u-type-primary-light;
    padding: 20rpx 30rpx;
  }
}
.iwantsell_show {
}
</style>
