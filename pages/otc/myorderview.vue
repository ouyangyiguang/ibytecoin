<template>
  <qs-page>
    <!-- 公共组件-每个页面必须引入 -->
    <public-module></public-module>
    <!--isFullScreen 可以实其全屏显示-->
    <qs-navbar :isBack="false">
      <view class="u-flex u-m-l-22" @tap="BackPage">
        <u-icon
          name="jiantouzuo"
          custom-prefix="customicon"
          class="u-m-r-10"
        ></u-icon>
      </view>
      <view class="u-flex"><h3></h3></view>
      <view class="u-flex u-m-r-22">
        <view @click="chat_linkTo()">
          <u-icon
            name="chat"
            size="30"
            :custom-style="{ padding: '6rpx' }"
          ></u-icon>
          <text>联系对方</text>
        </view>
      </view>
    </qs-navbar>
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
        :show="order_info.length === 0"
        v-if="loadstatus == false"
      ></u-empty>

      <u-gap height="90"></u-gap>
      <view class="u-text-center">
        <h3>向卖家付款</h3>
        <h1 class="u-padding-35">{{ order_info.cost }}</h1>
        <text v-if="order_info.buyer_zt == '1'"
          >交易剩余时间：<u-count-down
            v-if="order_info.buyer_zt == '1'"
            :timestamp="timestamp"
            :show-seconds="true"
            @end="autocancelorder('-1', '-1', '')"
          ></u-count-down
        ></text>
        <view
          >正在向卖家 {{ order_info.hisname }} 购买 {{ order_info.amount
          }}{{ order_info.unit }}</view
        >
        <view class="u-margin-30"
          ><h3>{{ order_info.showzt }}</h3></view
        >
        <view
          v-if="
            order_info.seller_status == '1' && order_info.transtype == 'mysell'
          "
          >等待买家付款</view
        >
      </view>

      <view class="base-panel-box">
        <view class="htitle">
          <i
            ><u-icon
              name="bankcard"
              custom-prefix="customicon"
              size="30"
            ></u-icon
          ></i>
          收款方式
          <view class="right u-font-xs"
            >收款人:{{ order_info.hisrealname }}</view
          >
        </view>
        <view class="item" v-for="(ip, key) in order_info.paymethod" :key="key">
          <u-row gutter="16" justify="space-between">
            <u-col span="3">
              <i class="u-m-r-10"
                ><u-icon
                  :name="ip.icon"
                  custom-prefix="customicon"
                  color="green"
                ></u-icon></i
              >{{ ip.name }}
            </u-col>
            <u-col span="9">
              {{ ip.value }}
            </u-col>
          </u-row>
        </view>
      </view>
      <u-gap height="30"></u-gap>
      <view class="u-text-center">请认真核准收款人姓名帐号</view>
      <center>注意：不要填写转帐备注</center>

      <u-gap height="60"></u-gap>
      <view
        v-if="order_info.buyer_zt == '10' && order_info.transtype == 'mybuy'"
      >
        <u-button type="success" :disabled="dis">
          <u-count-down
            :timestamp="timestamp"
            :show-seconds="true"
            @end="dis == false"
            @click="iodd_buy()"
          ></u-count-down>
          我未收到对方放行</u-button
        >
      </view>
      <u-button
        type="success"
        @click="ipayok()"
        v-if="order_info.buyer_zt == '1' && order_info.transtype == 'mybuy'"
        >我已付款成功</u-button
      >
      <u-button
        type=""
        @click="iodd_sell()"
        v-if="
          order_info.seller_status == '10' && order_info.transtype == 'mysell'
        "
        >我没有收到款，进入申诉</u-button
      >
      <u-gap height="30"></u-gap>
      <u-button
        type="success"
        @click="iacceptok()"
        v-if="
          order_info.seller_status == '10' && order_info.transtype == 'mysell'
        "
        >确认已收到款</u-button
      >
      <u-gap height="30"></u-gap>
      <u-button
        type=""
        @click="ilongtime()"
        v-if="
          order_info.seller_status == '1' &&
          order_info.transtype == 'mysell' &&
          timestamp > 0
        "
        >我没有收到款，延长等待{{ order_info.timelimit }}分钟</u-button
      >
    </view>
    <u-gap height="120"></u-gap>

    <u-popup
      v-model="return_pops_show"
      mode="center"
      width="88%"
      border-radius="20"
    >
      <view class="return_pops">
        <view class="u-padding-30">
          <h3>确认离开支付</h3>
          <u-gap height="20"></u-gap>
          <h5>如您已经支付，请务必先点击“我已付款成功”</h5>

          <u-gap height="20"></u-gap>
          <view
            ><i
              ><u-icon
                name="zhifuchenggong"
                custom-prefix="customicon"
                size="30"
                color="blue"
              ></u-icon></i
            >我确认还没有付款给对方</view
          >
        </view>
        <view style="position: absolute; bottom: 10rpx; width: 100%">
          <view class="u-padding-20">
            <u-row gutter="16" justify="space-between" style="width: 100%">
              <u-col span="6">
                <u-button type="" @click="isback()">暂时离开</u-button>
              </u-col>
              <u-col span="6">
                <u-button type="primary" @click="cancelorder()"
                  >确认离开取消订单</u-button
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
      dis: true,
      order_info: [],
      hasLogin: false,
      loadStatus: "loadmore",
      loadstatus: false,
      loadstxt: "loading...",
      recordid: "",
      timestamp: "", //倒计时
      return_pops_show: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  onLoad(options) {
    let query;
    if (options.query) {
      query = JSON.parse(options.query);
      this.recordid = query.recordid;
    }
    this.hasLogin = this.$store.getters.loginFlag;
    this.getpagecontrac();
  },
  onPullDownRefresh() {
    this.getpagecontrac();
    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 500);
  },
  methods: {
    isback() {
      uni.navigateBack({
        deta: 1,
      });
    },
    chat_linkTo() {
      let room_id = this.order_info.buyuid + this.order_info.selluid;
      let client_uesrs_id;
      if (this.order_info.transtype == "mybuy") {
        client_uesrs_id = this.order_info.selluid;
      }
      if (this.order_info.transtype == "mysell") {
        client_uesrs_id = this.order_info.buyuid;
      }
      this.$Router.push({
        path: "/pages/chat/chat",
        query: { messageId: room_id, fromUserId: client_uesrs_id },
      });
    },
    BackPage() {
      if (
        (this.order_info.buyer_zt == 1 || this.order_info.seller_status == 1) &&
        this.order_info.buyuid == this.user.userInfo.users_id
      ) {
        this.return_pops_show = true;
      } else {
        this.isback();
      }
    },
    cancelorder() {
      let msg = this.autocancelorder("-100", "-100", "1"); //我已确认付款
      //this.$u.toast('交易已取消');
      setTimeout(() => {
        this.$Router.push({
          path: "/pages/otc/index",
          query: {},
        });
      }, 500);
    },
    autocancelorder(zt, status, uptime) {
      //if (this.order_info.buyer_zt>=10) return;
      this.$api("otc.setadrecord", {
        recordid: this.recordid,
        buyer_zt: zt,
        seller_status: status,
        updatetime: uptime,
      })
        .then((res) => {
          this.$u.toast(res.data.msg);
          if (zt == "-1" || status == "-1") {
            setTimeout(() => {
              this.$Router.push({
                path: "/pages/otc/index",
                query: {},
              });
            }, 500);
          } else {
            return this.res.data.msg;
          }
        })
        .catch((e) => {});
    },
    ipayok() {
      uni.showModal({
        title: "温馨提示",
        content: "是否确定已付款？",
        success: (res) => {
          if (res.confirm) {
            let msg = this.autocancelorder("10", "10", "1"); //我已确认付款
            this.$u.toast(msg);
            setTimeout(() => {
              this.getpagecontrac();
            }, 500);
          }
        },
      });
      return true;
    },
    iodd_sell() {
      //卖方未收到放款   1111卖方投诉
      uni.showModal({
        title: "温馨提示",
        content: "是否进入投诉？",
        success: (res) => {
          if (res.confirm) {
            this.autocancelorder("11", "11", ""); //我已确认付款
            setTimeout(() => {
              this.getpagecontrac();
            }, 500);
          }
        },
      });
    },
    iodd_buy() {
      //买方未收到货物    1212 买方投诉
      uni.showModal({
        title: "温馨提示",
        content: "是否进入投诉？",
        success: (res) => {
          if (res.confirm) {
            this.autocancelorder("12", "12", ""); //我已确认付款
            setTimeout(() => {
              this.getpagecontrac();
            }, 500);
          }
        },
      });
    },
    ilongtime() {
      this.autocancelorder("", "", "1");
      setTimeout(() => {
        this.getpagecontrac();
      }, 500);
    },
    iacceptok() {
      uni.showModal({
        title: "温馨提示",
        content: "是否确定已收到款？",
        success: (res) => {
          if (res.confirm) {
            let msg = this.autocancelorder("100", "100", ""); //我已确认付款

            this.$api("otc.releasecoin", {
              //去放款
              recordid: this.recordid,
            })
              .then((res) => {
                setTimeout(() => {
                  this.getpagecontrac();
                }, 500);
              })
              .catch((e) => {});
          }
        },
      });
      return true;
    },
    getpagecontrac() {
      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.$api("otc.myorderview", {
          recordid: this.recordid,
        })
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.order_info = res.data;
              console.log(new Date().getTime());
              console.log(res.data.add_time * 1000);
              this.timestamp = res.data.times_countdown;
              if (this.timestamp <= 0) this.dis = false; //时间到，买家按钮投䜠对方未付款可用
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
.return_pops {
  border-radius: 50rpx;
  height: 350rpx;
  position: relative;
}
</style>
