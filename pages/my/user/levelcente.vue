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
    <view class="u-padding-20" v-if="!hasLogin">
      <u-empty text="请先登陆" mode="permission"></u-empty>
    </view>

    <view class="u-padding-20">
      <view class="base-panel-box u-m-b-30">
        <view class="htitle">
          <i
            ><u-icon
              name="bankcard"
              custom-prefix="customicon"
              size="30"
            ></u-icon
          ></i>
          会员类型
        </view>
        <view class="item">
          <u-radio-group v-model="level_value" :wrap="true">
            <u-radio
              class="ssradio"
              @change="levle_change"
              v-for="(item, index) in leveltypelist"
              :key="index"
              :name="item.type_id"
              active-color="#BD1E2C"
            >
              {{ item.type_name }} {{ item.price }} CNY/{{ item.limit_name }}
            </u-radio>
          </u-radio-group>
        </view>
      </view>
      <u-gap height="1"></u-gap>
      <view class="base-panel-box u-m-b-30">
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
            <u-radio @change="coin_change" class="ppradio" v-for="(item, index) in coin_list" :key="index" :name="item.id">{{ item.name }}<text v-if="price != 0" class="u-p-l-20 u-p-r-20">
			  {{ ((1 / item.price) * price).toFixed(4) }} {{ item.unit }}</text>
			  <text v-if="item.id == 1">【微信支付】</text>
            </u-radio>
          </u-radio-group>
        </view>
      </view>
      <u-button type="primary" @click="confirm()">确定</u-button>
    </view>
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
      leveltypelist: [],
      level_value: "1",
      coin_list: [],
      pay_coinclass: 1,
      price: 99, //等级1价
      platform: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  onLoad() {
    this.hasLogin = this.$store.getters.loginFlag;
    this.get_level_type();
    this.getcoin();
    // #ifdef MP-WEIXIN || MP
    this.platform = "weixin";
    // #endif
    // #ifdef H5
    this.platform = "h5";
    // #endif
    // #ifdef APP-PLUS
    this.platform = "app";
    // #endif
  },

  methods: {
    levle_change(e) {
      this.level_value = e;

      for (let i = 0; i < this.leveltypelist.length; i++) {
        console.log(this.leveltypelist);
        if (this.leveltypelist[i].type_id == this.level_value) {
          this.price = this.leveltypelist[i].price;
          break;
        }
      }
      console.log(this.price);
    },
    coin_change(e) {
      this.pay_coinclass = e;
    },
    get_level_type() {
      return new Promise((resolve, reject) => {
        this.$api("user.leveltypemanage", {})
          .then((res) => {
            this.leveltypelist = res.data;
          })
          .catch((e) => {});
      });
    },
    getcoin() {
      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.$api("assets.coin_list", {})
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.coin_list = res.data.list;
            }
            resolve(true);
            this.loadstatus = false;
          })
          .catch((e) => {
            this.loadstatus = false;
            resolve(false);
          });
      });
    },

    confirm() {
      if (this.level_value == "") {
        this.$u.toast("请选择一个会员类型");
      }

      if (this.pay_coinclass != 1) {
        this.confirm_ok();
        return;
      }
      uni.showModal({
        title: "温馨提示",
        content:
          "使用人民币支付，如现金余额不够，将会跳转到微信支付，支付成功后，需重新登陆。",
        success: (res) => {
          if (res.confirm) {
            setTimeout(() => {
              this.confirm_ok();
            }, 500);
          }
        },
      });
    },

    confirm_ok() {
      return new Promise((resolve, reject) => {
        this.$api("user.levelupgradepay", {
          users_id: this.user.userInfo.users_id,
          type_id: this.level_value,
          pay_coinclass: this.pay_coinclass,
          platform: this.platform,
        })
          .then((res) => {
            console.log(res);

            if (res.data.h5pay == 1) {
              window.location.href = res.data.h5url;
            } else {
              this.$store.dispatch("getUserInfo");
              this.$u.toast(res.data.msg);
              setTimeout(() => {
                uni.navigateBack(1);
                // this.$Router.push({
                // 	path: '/pages/my/my',
                // 	query: {}
                // });
              }, 1500);
            }
          })
          .catch((e) => {});
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.ssradio {
  border: solid 1px #2b85e4;
  padding: 10rpx 20rpx;
  margin: 10rpx 0rpx;
  border-radius: 20rpx;
}
.ppradio {
  padding: 5rpx 20rpx;
}
</style>
