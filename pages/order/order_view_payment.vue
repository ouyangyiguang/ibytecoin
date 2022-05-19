<template>
  <qs-page>
    <qs-navbar isBack="false" backUrl="/pages/order/order">
      <view class="u-flex"><h3>订单详情</h3></view>
      <view class="u-flex u-m-r-22"> </view>
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

    <view class="base-tonglan-box">
      <view class="htitle">
        <i><u-icon name="04" custom-prefix="customicon" size="30"></u-icon></i>
        {{ orderInfo.order_code }}
        <view class="right" style="float: right; padding-right: 20rpx;"> 总金额：{{ orderInfo.order_amount }} </view>
      </view>
      <view
        class="item g-item"
        v-for="(item, index) in orderInfo.order_detailed"
        :key="index"
      >
        <u-row gutter="0" justify="space-between">
          <u-col span="2"><image :src="item.litpic"></image></u-col>
          <u-col span="10">
            <view class="title clamp">{{ item.product_name }}</view>
            <!-- <view class="spec" v-if="item.data!=''">{{item.data}}</view> -->
            <view class="price-box">
              <text class="price">{{ item.product_price }}</text>
              <text class="number">* {{ item.num }}</text>
            </view>
          </u-col>
        </u-row>
      </view>
    </view>
    <view class="" v-if="orderInfo.order_status == 0">
      <u-gap height="16" bg-color="#f3f4f6"></u-gap>
      <view class="base-tonglan-box">
        <view class="item g-item">
          <u-row gutter="0" justify="space-between">
            <u-col span="3">余额可用:</u-col>
            <u-col span="9" text-align="left">
              {{ balancepay }}
            </u-col>
          </u-row>
        </view>
        <view class="item g-item">
          <u-row gutter="0" justify="space-between">
            <u-col span="3">需要支付:</u-col>
            <u-col span="9" text-align="left">
              {{ shifu_amount }}
            </u-col>
          </u-row>
        </view>
      </view>

      <view class="base-tonglan-box">
        <view class="htitle">
          <i
            ><u-icon
              name="youhuiquan"
              custom-prefix="customicon"
              size="30"
            ></u-icon
          ></i>
          优惠券
        </view>
        <view class="item" v-if="ticket_list.length > 0">
          <u-radio-group v-model="ticket_use" :wrap="true">
            <u-radio
              @change="ticket_change"
              class="ppradio"
              v-for="(item, index) in ticket_list"
              :key="index"
              :name="index"
            >
              {{ item.title }}
            </u-radio>
          </u-radio-group>
        </view>
        <view v-else class="u-padding-30">无可用优惠券</view>
      </view>
      <view class="base-tonglan-box">
        <view class="htitle">
          <i
            ><u-icon
              name="bankcard"
              custom-prefix="customicon"
              size="30"
            ></u-icon
          ></i>
          支付方式
        </view>
        <view class="item">
          <u-radio-group v-model="pay_coinclass" :wrap="true">
            <u-radio @change="coin_change" class="ppradio" v-for="(item, index) in coin_list" :key="index" :name="index">{{ item.name }}
			<text  v-if="orderInfo.order_total_amount != 0"  class="u-p-l-20 u-p-r-20" >
			{{((1 / item.price) * orderInfo.order_total_amount).toFixed(4)}}{{ item.unit }} / 可用：{{(item.balance_available * 1).toFixed(2)}}{{ item.unit }}</text></u-radio>
          </u-radio-group>
        </view>
      </view>

      <view class="u-padding-30"
        ><button type="primary" @tap="pay_submit()">支付订单</button></view
      >
    </view>
    <view v-else>
      <view class="u-text-center u-margin-30">
        {{
          orderInfo.order_status == 1
            ? "已付款(待发货)"
            : orderInfo.order_status == 2
            ? "已发货(待收货)"
            : orderInfo.order_status == 3
            ? "已完成(确认收货)"
            : orderInfo.order_status == 4
            ? "订单过期"
            : orderInfo.order_status == "-1"
            ? "订单取消(已关闭)"
            : "订单取消(已关闭)"
        }}
      </view>
    </view>
  </qs-page>
</template>


<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      orderInfo: [],
      hasLogin: false,
      loadStatus: "loadmore",
      loadstatus: false,
      loadstxt: "loading...",
      order_id: "",
      ticket_list: [],
      coin_list: [],
      pay_coinclass: "",
      ticket_use: "",
      shifu_amount: 0,
      balancepay: 0,
      select_ticket: [],
      select_coininfo: [],
      select_ticket_id: "",
      select_coininfo_id: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async onLoad(options) {
    let query;
    if (options.query) {
      query = JSON.parse(options.query);
      this.order_id = query.order_id;
    }
    console.log(this.order_id);
    this.hasLogin = this.$store.getters.loginFlag;
    this.getpagecontrac();
    if (1 == 1) {
      let tikstatus = await this.getticket();
      let coinstatus = await this.getcoin();
      if (tikstatus == true && coinstatus == true) {
        if (this.ticket_list != "") {
          this.select_ticket = this.ticket_list[0];
          this.select_ticket_id = this.select_ticket.id;
        }
        this.select_coininfo = this.coin_list[0];
        this.select_coininfo_id = this.select_coininfo.id;
        this.jsamount(this.select_coininfo, this.select_ticket);
      }
    }
  },

  methods: {
    ticket_change(e) {
      this.select_ticket = this.ticket_list[e];
      this.select_ticket_id = this.select_ticket.id;
      this.jsamount(this.select_coininfo, this.select_ticket);
    },
    coin_change(e) {
      this.select_coininfo = this.coin_list[e];
      this.select_coininfo_id = this.select_coininfo.id;
      this.jsamount(this.select_coininfo, this.select_ticket);
    },

    jsamount(coininfo, ticket) {
      this.balancepay = "0.00";
      this.shifu_amount = this.orderInfo.order_amount;
      if (ticket != "") {
        this.shifu_amount = this.shifu_amount - ticket.realmoney;
      }
      if (coininfo.id != 1) {
        this.shifu_amount = (
          this.shifu_amount /
          (coininfo.price * coininfo.cnyrate)
        ).toFixed(8);
      }
      if (this.shifu_amount > 0 && coininfo.balance_available > 0) {
        if (coininfo.balance_available > this.shifu_amount) {
          this.balancepay =
            (this.shifu_amount * 1).toFixed(8) + " " + coininfo.unit;
          this.shifu_amount = "0.0000" + " " + coininfo.unit;
        } else {
          this.balancepay = coininfo.balance_available + " " + coininfo.unit;
          this.shifu_amount =
            (this.shifu_amount - coininfo.balance_available).toFixed(8) +
            " " +
            coininfo.unit;
        }
      }
    },
    getcoin() {
      return new Promise((resolve, reject) => {
        this.$api("assets.coin_list", {})
          .then((res) => {
            if (res.code == 200) {
              this.coin_list = res.data.list;
            }
            resolve(true);
          })
          .catch((e) => {});
      });
    },
    getticket() {
      return new Promise((resolve, reject) => {
        this.$api("ticket", {
          page: 1,
          status: 1,
        })
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.ticket_list = res.data.list;
            }
            resolve(true);
          })
          .catch((e) => {});
      });
    },
    getpagecontrac() {
      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.$api("order.order_view", {
          order_id: this.order_id,
        })
          .then((res) => {
            if (res.code == 200) {
              this.orderInfo = res.data;
            }
            this.loadstatus = false;
          })
          .catch((e) => {
            this.loadstatus = false;
            resolve(false);
          });
      });
    },
    pay_submit() {
      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.$api("order.order_pay", {
          order_id: this.order_id,
          use_ticket_id: this.select_ticket_id,
          use_coininfo_id: this.select_coininfo_id,
        })
          .then((res) => {
            console.log(res);
            if (res.data.h5pay == 1) {
              window.location.href = res.data.h5url;
            } else {
              this.$u.toast(res.data.msg);
              setTimeout(() => {
                this.$Router.push({
                  path: "/pages/index/index",
                  query: {},
                });
              }, 1500);
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
.base-panel-box {
  .htitle {
    border-radius: 0rpx;
  }
  .item:last-child {
    border-radius: 0rpx;
  }
}
.g-item {
  position: relative;
  image {
    flex-shrink: 0;
    display: block;
    width: 100rpx;
    height: 100rpx;
    border-radius: 8upx;
    margin: 0rpx 20rpx 0rpx 0rpx;
  }
}
</style>
