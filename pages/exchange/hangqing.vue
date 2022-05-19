<template>
  <qs-page>
    <!-- 公共组件-每个页面必须引入 -->
    <public-module></public-module>
    <!--isFullScreen 可以实其全屏显示-->
    <ourLoading
      isFullScreen
      :active="loadstatus"
      :text="loadstxt"
      color="#63E5CB"
      textColor="#63E5CB"
    />

    <view class="base-panel-box" style="border: 0rpx">
      <view class="item text-center" v-if="jiaoyidui.length === 0">加载中</view>
      <view class="item">
        <u-row gutter="0" justify="space-between">
          <u-col span="4" text-align="left"
            ><b style="padding-left: 40rpx">资产</b></u-col
          >
          <u-col span="4" text-align="center"><b>最新价</b></u-col>
          <u-col span="4" text-align="center"
            ><b class="u-p-l-38">跌涨幅</b></u-col
          >
        </u-row>
      </view>
      <view class="item" v-for="(item, index) in jiaoyidui" :key="index">
        <u-row gutter="0" justify="space-between" v-if="item.P">
          <u-col span="1" text-align="right">
            <image
              mode="scaleToFill"
              :src="
                'http://robot.ibytecoin.com/static/icon/128/' +
                item.s.replace('USDT', '').toLowerCase() +
                '.png'
              "
              style="width: 40rpx; height: 40rpx; display: flex"
            ></image>
          </u-col>
          <u-col span="3">{{ item.s.replace("USDT", "") }}</u-col>
          <u-col span="4">
            <view style="line-height: 130%">{{ item.c }}</view>
            <view
              style="line-height: 130%"
              class="u-font-xs u-type-info-disabled"
              >≈ {{ (item.c * 6.41).toFixed(2) }} CNY</view
            >
          </u-col>
          <u-col span="4">
            <text class="zf" :class="item.P > 0 ? 'blue' : 'red'"
              >{{ item.P }}%</text
            >
          </u-col>
        </u-row>
      </view>
    </view>
    <u-gap height="50"></u-gap>
  </qs-page>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import socket from "@/plugins/socket.js";
export default {
  data() {
    return {
      flow_list: [],
      hasLogin: false,
      loadStatus: "loadmore",
      loadstatus: false,
      loadstxt: "loading...",
      jiaoyidui: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    let _this = this;
    socket.acceptMessage = function (res) {
      console.log(res);
      if (res.type == "binan") {
        _this.jiaoyidui = res.binancelist;
		uni.setStorageSync("hangqingcache", res.binancelist);
      }
    };
  },
  onLoad(options) {
    socket.init(function () {});
    let cachehq = uni.getStorageSync("hangqingcache");
    if (cachehq != "") this.jiaoyidui = cachehq;
  },

  methods: {
    getpagecontrac() {
      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.loadstxt = "加载矿机中";

        this.$api("mining.contrac_list", {})
          .then((res) => {
            console.log(res);
            if (res.Code == 1) {
              this.flow_list = res.Data.ItemList;
            }
            this.loadstatus = false;
          })
          .catch((e) => {
            this.loadstatus = false;
            resolve(false);
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.zf {
  padding: 0rpx 10rpx;
  color: #ffffff;
  width: 140rpx;
  float: right;
  text-align: center;
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 10rpx;
}
.blue {
  background: #18b566;
}
.red {
  background: #f5222d;
}
</style>
