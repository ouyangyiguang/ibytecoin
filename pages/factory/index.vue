<template>
  <qs-page>
    <qs-navbar :isBack="false" backUrl="">
      <view class="u-flex u-m-l-42"><text style="width: 150rpx"></text></view>
      <view class="u-flex"><h3>矿机</h3></view>
      <view class="u-flex u-m-r-22">
        <view
          class="fabupost"
          @click="$tools.routerTo('/pages/factory/mining')"
        >
          <i class="u-m-r-10"
            ><u-icon
              name="zichanguanli"
              custom-prefix="customicon"
              size="30"
            ></u-icon
          ></i>
          收益记录
        </view>
      </view>
    </qs-navbar>
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
    <view class="u-padding-20" v-if="!hasLogin">
      <u-empty text="请先登陆" mode="permission"></u-empty>
    </view>

    <view class="u-padding-20" v-else>
      <u-empty
        text="没有数据"
        mode="data"
        :show="flow_list.length === 0"
        v-if="loadstatus == false"
      ></u-empty>
      <!-- 			<view>
				挖矿时间：{{flow_list.config.starttime}}至{{flow_list.config.endtime}}<br>
				收矿时间：{{flow_list.config.shouhuostarttime}}至{{flow_list.config.shouhuoendtime}}<br>
				{{workstatus}}
				<view @click="shouhuo()">收取</view>
			</view> -->

      <view class="trace-panel-box">
        <u-row gutter="16" justify="space-between">
          <u-col span="4" text-align="center">
            <view class="u-font-xl">{{ flow_list.suanli }}</view>
            <view class="u-font-xs u-m-t-10">您的总算力</view>
          </u-col>
          <u-col span="4" text-align="center">
            <view class="u-font-xl">{{ flow_list.allsuanli }}</view>
            <view class="u-font-xs u-m-t-10">在线总算力</view>
          </u-col>
          <u-col span="4" text-align="center">
            <view class="u-font-xl">{{ flow_list.yuqishouyi }} iBC</view>
            <view class="u-font-xs u-m-t-10">当日预期收益</view>
          </u-col>
        </u-row>
        <u-row gutter="16" justify="space-between" class="u-m-t-50">
          <u-col span="4" text-align="center">
            <view class="u-font-xl">{{ flow_list.config.oneDayNum }} iBC</view>
            <view class="u-font-xs u-m-t-10">今日预产量</view>
          </u-col>
          <u-col span="4" text-align="center">
            <view class="u-font-xl">{{ flow_list.config.sum }} iBC</view>
            <view class="u-font-xs u-m-t-10">累计产币总量</view>
          </u-col>
          <u-col span="4" text-align="center">
            <view class="u-font-xl">{{ flow_list.myfactorycount }}</view>
            <view class="u-font-xs u-m-t-10">我的矿机数</view>
          </u-col>
        </u-row>
      </view>

      <view class="u-p-t-10" v-if="flow_list.list.length > 0">
        <view
          v-for="(item, index) in flow_list.list"
          :key="index"
          class="base-panel-box u-m-b-30"
        >
          <view class="htitle">
            <i
              ><u-icon
                name="zichanguanli"
                custom-prefix="customicon"
                size="30"
              ></u-icon
            ></i>
            {{ item.name }}
            <view class="right u-font-xs">
              <u-button
                type="primary"
                size="mini"
                :hair-line="false"
                @click="buyfactory(item)"
                >购买</u-button
              >
            </view>
          </view>
          <view class="item">
            <u-row gutter="16" justify="space-between">
              <u-col span="6">总量：{{ item.num }}</u-col>
              <u-col span="6">剩余：{{ item.remain }}</u-col>
              <u-col span="6">使用寿命：{{ item.shouming }}天</u-col>
              <u-col span="6"
                >雇佣价：{{ item.price }}{{ item.namecode }}</u-col
              >
            </u-row>
          </view>
        </view>
      </view>
    </view>

    <u-popup v-model="iwantbuy_show" mode="bottom">
      <view class="pops">
        <view class="title u-m-b-20">
          <h3>购买 {{ factoryinfo.name }}</h3>
          <text>价格:{{ factoryinfo.price }} {{ factoryinfo.namecode }}</text>
        </view>

        <u-form-item
          class="u-p-l-30 u-p-r-30 u-m-b-30"
          label="购买数量"
          label-position="left"
          label-width="160"
        >
          <u-number-box
            :min="1"
            :max="factoryinfo.remain"
            :value="buynum"
            v-model="buynum"
          >
          </u-number-box>
        </u-form-item>

        <u-row gutter="0" justify="space-between" class="u-p-l-30 u-p-r-30">
          <u-col span="3"> 使用天数 </u-col>
          <u-col span="9"> {{ factoryinfo.shouming }} 天 </u-col>
        </u-row>
        <view style="position: fixed; bottom: 60rpx; width: 100%">
          <view class="u-padding-20">
            <u-row gutter="16" justify="space-between" style="width: 100%">
              <u-col span="12">
                <u-button type="primary" @click="confirmbuy(factoryinfo.id)"
                  >购买</u-button
                >
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
      flow_list: {
        config: {
          oneDayNum: 0,
          sum: 0,
        },
        list: [],
      },
      hasLogin: false,
      loadStatus: "loadmore",
      loadstatus: false,
      loadstxt: "loading...",
      workstatus: "",
      iwantbuy_show: false,
      factoryinfo: [],
      buynum: 1,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  onLoad(options) {
    this.hasLogin = this.$store.getters.loginFlag;
    this.getpagecontrac();
    this.$api("factory.mining", {})
      .then((res) => {
        if (res.code == 200) {
          this.workstatus = res.data.msg;
        }
      })
      .catch((e) => {});
  },

  methods: {
    buyfactory(item) {
      this.iwantbuy_show = true;
      this.factoryinfo = item;
    },
    confirmbuy(factory_id) {
      this.$api("factory.buy_factory", {
        factory_id: factory_id,
        num: this.buynum,
      })
        .then((res) => {
          this.iwantbuy_show = false;
          if (res.code == 200) {
            this.$u.toast("购买成功");
            setTimeout(() => {
              this.getpagecontrac();
            }, 500);
          }
        })
        .catch((e) => {});
    },
    shouhuo() {
      this.$api("factory.shou_huo", {})
        .then((res) => {
          if (res.code == 200) {
            this.$u.toast(res.data.msg);
          }
        })
        .catch((e) => {});
    },
    getpagecontrac() {
      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.loadstxt = "加载矿机中";

        this.$api("factory.list_factory", {})
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.flow_list = res.data;
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
.trace-panel-box {
  border-radius: 20rpx;
  background: $u-type-primary;
  color: $u-light-color;
  padding: 50rpx 0rpx;
  margin-bottom: 20rpx;
  .card-main {
  }
}

.pops {
  background: #ffffff;
  height: 560rpx;
  .title {
    background: $u-type-primary-light;
    padding: 20rpx 30rpx;
  }
}
.fabupost {
  border: solid 1px $u-type-primary;
  border-radius: 30rpx;
  padding: 2rpx 20rpx;
  color: $u-type-primary;
}
</style>
