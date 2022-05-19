<template>
  <qs-page class="page">
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
    <u-gap height="20"></u-gap>
    <view class="u-m-l-20 u-m-r-20">
      <u-row gutter="0" justify="space-between">
        <u-col span="6" @click="drawerVisible = true">
          <view class="u-font-lg">
            <b>
              <i class="u-m-r-10"
                ><u-icon
                  name="liebiaozhankai"
                  custom-prefix="customicon"
                  size="30"
                ></u-icon
              ></i>
              {{ coinInfo.symbol }}
            </b>
          </view>
        </u-col>
        <u-col span="6" text-align="right">
          <view @click="$tools.routerTo('/pages/exchange/kline')">
            <i
              ><u-icon
                name="indexhome"
                custom-prefix="customicon"
                size="30"
              ></u-icon></i
            >K线图
          </view>
        </u-col>
      </u-row>
    </view>
    <view class="content">
      <view class="trade">
        <view class="trade-inner">
          <view class="tab">
            <view
              class="buy uni-bg-up"
              :class="tradetype == 2 ? 'normal' : ''"
              @click="onChangeType(1)"
              >买入</view
            >
            <view
              class="sell uni-bg-down"
              :class="tradetype == 1 ? 'normal' : ''"
              @click="onChangeType(2)"
              >卖出</view
            >
            <view class="parallelogram"></view>
          </view>
          <view v-show="tradetype == 1">
            <view class="biaoti">限价委托</view>
            <view class="trade-inner price-input">
              <input
                class="uni-input personbuy_input"
                type="digit"
                placeholder=""
                v-model="buy_price"
              />
              <view class="opt">价格</view>
            </view>
            <view style="height: 10upx; width: 100%; overflow: hidden"></view>
            <view class="trade-inner price-input">
              <input
                class="uni-input personbuy_input"
                type="digit"
                placeholder="数量"
                v-model="buynum"
                @input="buynumChange()"
              />
              <view class="opt">{{ coinInfo.goodsunit }}</view>
            </view>
            <view class="autoselectnum">
              <u-row gutter="0" justify="space-between">
                <u-col span="3">
                  <view class="tabsx buy" @click="buynumChange('0.25')"
                    >25%</view
                  >
                </u-col>
                <u-col span="3">
                  <view class="tabsx buy" @click="buynumChange('0.5')"
                    >50%</view
                  >
                </u-col>
                <u-col span="3">
                  <view class="tabsx buy" @click="buynumChange('0.75')"
                    >75%</view
                  >
                </u-col>
                <u-col span="3">
                  <view class="tabsx buy last" @click="buynumChange('1')"
                    >100%</view
                  >
                </u-col>
              </u-row>
            </view>
            <view class="unih5 uni-text-gray"
              >可用 {{ (userCoin.name2_available_balance * 1).toFixed(4) }}
              {{ userCoin.name2_coinunit }}</view
            >
            <view class="unih5"
              >交易额 {{ jiaoyi_bE }} {{ coinInfo.coinunit }}</view
            >
            <button class="btn uni-bg-up" @tap="dobuy">
              买入 {{ coinInfo.goodsunit }}
            </button>
          </view>
          <view v-show="tradetype == 2">
            <view class="biaoti">限价委托</view>
            <view class="trade-inner price-input">
              <input
                class="uni-input personsell_input"
                type="digit"
                placeholder=""
                v-model="sell_price"
              />
              <view class="opt">价格</view>
            </view>
            <view style="height: 10upx; width: 100%; overflow: hidden"></view>
            <view class="trade-inner price-input">
              <input
                class="uni-input personsell_input"
                type="digit"
                placeholder="数量"
                v-model="sellnum"
                @input="sellnumChange()"
              />
              <view class="opt">{{ coinInfo.goodsunit }}</view>
            </view>
            <view class="autoselectnum">
              <u-row gutter="0" justify="space-between">
                <u-col span="3">
                  <view class="tabsx sell" @click="sellnumChange('0.25')"
                    >25%</view
                  >
                </u-col>
                <u-col span="3">
                  <view class="tabsx sell" @click="sellnumChange('0.5')"
                    >50%</view
                  >
                </u-col>
                <u-col span="3">
                  <view class="tabsx sell" @click="sellnumChange('0.75')"
                    >75%</view
                  >
                </u-col>
                <u-col span="3">
                  <view class="tabsx sell last" @click="sellnumChange('1')"
                    >100%</view
                  >
                </u-col>
              </u-row>
            </view>
            <view class="unih5 uni-text-gray"
              >可用 {{ (userCoin.name1_available_balance * 1).toFixed(4) }}
              {{ userCoin.name1_coinunit }}</view
            >

            <view class="unih5"
              >交易额 {{ jiaoyi_sE }} {{ coinInfo.coinunit }}</view
            >
            <button class="btn uni-bg-down" @tap="dosell">
              卖出 {{ coinInfo.goodsunit }}
            </button>
          </view>
        </view>
      </view>
      <view class="position">
        <positionList
          :translist="transList"
          :exchangelist="exchangelist"
          @evententrus="gaibianChange"
        ></positionList>
      </view>
    </view>

    <entrustOrderList :translist="transList"></entrustOrderList>

    <u-popup v-model="drawerVisible" mode="left" width="300rpx">
      <marketDrawer
        @change="changeCoin"
        :areaList="areaList"
        :marketList="marketList"
        @coinclass="coinclassChange"
      ></marketDrawer>
    </u-popup>
  </qs-page>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import uniDrawer from "../../components/exchange/uni-drawer.vue";
import positionList from "../../components/exchange/positionList.vue";
import entrustOrderList from "../../components/exchange/entrustOrderList.vue";
import marketDrawer from "../../components/exchange/marketDrawer.vue";

export default {
  onReady() {},
  components: {
    positionList,
    entrustOrderList,
    uniDrawer,
    marketDrawer,
  },
  data() {
    return {
      loadStatus: "loadmore",
      loadstatus: false,
      symbol: "",
      market: {},
      drawerVisible: false,
      scrollLeft: 0,
      areaList: [],
      marketList: [],
      depthValue: 1,
      type: 1,
      coinInfo: {},
      coinboxid: 1,
      transList: {},
      exchangelist: {
        code: 0,
      },
      userCoin: {},
      tradetype: 1,
      buy_price: "0",
      buynum: "0",
      sell_price: "0",
      sellnum: "0",
      jiaoyi_bE: "0",
      jiaoyi_sE: "0",
    };
  },
  onLoad(options) {
    this.getcoininfo(this.coinboxid);
  },
  onShow() {},
  onHide() {},
  onNavigationBarButtonTap(e) {},

  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.areaList = [
      { id: 2, name: "USDT" },
      { id: 3, name: "BTC" },
    ];
    this.getcoininfo(this.coinboxid);
    this.changeCoin(2);
  },
  methods: {
    onNavigationBarButtonTap: function (e) {
      console.log(JSON.stringify(e));
      if (e.index == 0) {
        this.openDrawer();
      }
    },

    onChangeType(e) {
      this.tradetype = e;
    },
    buynumChange(e) {
      if (e == "" || e == undefined) {
        this.jiaoyi_bE = (this.buy_price * this.buynum).toFixed(4);
      } else {
        this.buynum = (
          (this.userCoin.name2_available_balance * e) /
          this.buy_price
        ).toFixed(4);
        this.jiaoyi_bE = (this.userCoin.name2_available_balance * e).toFixed(4);
      }
    },
    sellnumChange(e) {
      if (e == "" || e == undefined) {
        this.jiaoyi_sE = (this.sellnum * this.sell_price).toFixed(4);
      } else {
        this.sellnum = (this.userCoin.name1_available_balance * e).toFixed(4);
        this.jiaoyi_sE = (
          this.userCoin.name1_available_balance *
          e *
          this.sell_price
        ).toFixed(4);
      }
    },

    coinclassChange(e) {
      this.drawerVisible = false;
      this.symbol = e.symbol;
      this.coinboxid = e.id;
      this.getcoininfo(e.id);
    },
    gaibianChange(e) {
      console.log("a");
    },
    getcoininfo(id) {
      this.loadstatus = true;
      this.$api("ex.coin2coin_info", {
        coinboxid: id,
      })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.coinInfo = res.data.coininfo;
            this.buy_price = this.coinInfo.best_buy;
            this.sell_price = this.coinInfo.best_sell;
            this.symbol = this.coinInfo.symbol;
            uni.setNavigationBarTitle({
              title: this.coinInfo.symbol,
            });
            this.transList = res.data;
            this.userCoin = res.data.coin;
          }
          this.loadstatus = false;
        })
        .catch((e) => {});
    },

    changeCoin(id) {
      this.$api("ex.coin2coin_pair_list", {
        pairid: id,
      })
        .then((res) => {
          if (res.code == 200) {
            this.marketList = res.data.coinlist;
          }
        })
        .catch((e) => {});
    },
    dobuy() {
      var postdata = {
        price: this.buy_price,
        num: this.buynum,
        typeboxid: this.coinInfo.id,
        flag: 1, //1为买
      };

      this.$api("ex.guandan", postdata)
        .then((res) => {
          console.log(res);
          if (res.code == "200") {
            this.buynum = 0;
            this.getcoininfo(this.coinboxid);
          }
          this.$u.toast(res.data.msg);
        })
        .catch((e) => {});
    },
    dosell() {
      var postdata = {
        price: this.sell_price,
        num: this.sellnum,
        typeboxid: this.coinInfo.id,
        flag: 0, //1为买
      };
      this.$api("ex.guandan", postdata)
        .then((res) => {
          console.log(res);
          if (res.code == "200") {
            this.sellnum = 0;
            this.getcoininfo(this.coinboxid);
          }
          this.$u.toast(res.data.msg);
        })
        .catch((e) => {});
    },
  },
};
</script>

<style lang="scss">
$uni-exchange-buy: #51ad96; //交易所 买
$uni-exchange-sell: #d04c74; //交易所 卖

.page {
  background: #ffffff;
}
.content {
  padding-top: 20upx;
  padding-bottom: 20rpx;
  display: flex;
}
.content .trade {
  width: 60%;
  padding-left: 20upx;
  padding-right: 20upx;
  padding-bottom: 20upx;
}
.content .position {
  width: 40%;
}
.unih5 {
  display: flex;
  height: 40rpx;
  line-height: 40rpx;
}

.uni-bg-up {
  background: $uni-exchange-buy;
}
.uni-bg-down {
  background: $uni-exchange-sell;
}

.trade-inner {
  .tab {
    position: relative;
    display: flex;
    text-align: center;
    .buy {
      color: #ffffff;
      font-weight: bold;
      width: 50%;
      height: 70upx;
      line-height: 70upx;
      border-radius: 10rpx 0rpx 0rpx 10rpx;
    }
    .sell {
      color: #ffffff;
      font-weight: bold;
      width: 50%;
      height: 70upx;
      line-height: 70upx;
      border-radius: 0rpx 10rpx 10rpx 0rpx;
    }
    .normal {
      background: #f7f6fb;
      color: #96a0aa;
      font-weight: bold;
    }
    .parallelogram {
      position: absolute;
      left: calc(50% - 11upx);
      top: -2upx;
      transform: translate(-50%, -50%);
      width: 22upx;
      height: 78upx;
      background: #ffffff;
      -webkit-transform: skew(-15deg);
      -moz-transform: skew(-15deg);
      -o-transform: skew(-15deg);
      transform: skew(-15deg);
    }
  }
  .biaoti {
    margin: 20rpx auto 10rpx auto;
  }
  .btn {
    height: 74upx;
    line-height: 74upx;
    color: #fff;
    font-size: 28upx;
    font-weight: bold;
    margin-top: 30upx;
  }
  .price-input {
    position: relative;
    margin-bottom: 10rpx;
    input {
      height: 58rpx;
      line-height: 58rpx;
    }
    .uni-input {
      padding-left: 20rpx;
      &.personbuy_input {
        border-radius: 16upx;
        border: #d2d2d2 solid 1px;
      }

      &.personsell_input {
        border-radius: 16upx;
        border: #d2d2d2 solid 1px;
      }
    }
    .opt {
      display: flex;
      position: absolute;
      top: 2upx;
      right: 0;
      width: 80rpx;
      height: 58rpx;
      line-height: 58rpx;
    }
  }
}

.autoselectnum {
  margin-bottom: 20rpx;
  .tabsx {
    text-align: center;
    color: #ffffff;
    border-radius: 6rpx;
    margin-right: 10rpx;
    &.buy {
      background: #c2ddc5;
    }
    &.sell {
      background: #f5c3c5;
    }
    &.last {
      margin-right: 0rpx;
    }
  }
}
</style>
