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

    <view v-else>
      <view v-if="address_is_empty === true" class="empty">
        <navigator
          url="/pages/order/address/index?source=1"
          class="address-section bg_light"
        >
          <center>添加地址</center>
        </navigator>
      </view>
      <view v-else>
        <navigator
          url="/pages/order/address/index?source=1"
          class="address-section bg_light"
        >
          <view class="order-content">
            <text
              class="customicon customicon-dizhi"
              style="width: 60px; text-align: center"
            ></text>
            <view class="cen">
              <view class="top" style="text-align: left">
                <text class="name">{{ addressData.consignee }}</text>
                <text class="mobile">{{ addressData.mobile }}</text>
              </view>
              <text class="address" style="text-align: left"
                >{{ addressData.province_name }}{{ addressData.city_name
                }}{{ addressData.district_name }}{{ addressData.address }}</text
              >
            </view>
            <text
              class="customicon customicon-dibudaohanglan-"
              style="width: 50px; text-align: center"
            ></text>
          </view>
          <image
            class="a-bg"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"
          ></image>
        </navigator>
      </view>
      <u-empty
        text="没有数据"
        mode="data"
        :show="goodsList.length === 0"
        v-if="loadstatus == false"
      ></u-empty>
      <view class="u-padding-10" v-if="goodsList.length > 0">
        <view
          class="g-item b-b"
          v-for="(item, index) in goodsList"
          :key="index"
        >
          <u-row gutter="0" justify="space-between">
            <u-col span="2"><image :src="item.litpic"></image></u-col>
            <u-col span="10">
              <view class="title clamp">{{ item.product_name }}</view>
              <view class="spec" v-if="item.data != ''">{{ item.data }}</view>
              <view class="price-box right">
                <text class="price">{{ item.spec_price }}</text>
                <text class="number">* {{ item.product_num }}</text>
              </view>
            </u-col>
          </u-row>
        </view>

        <!-- 金额明细 -->
        <u-row
          gutter="0"
          justify="space-between"
          class="u-p-t-15 u-p-b-15 u-p-l-30 u-p-r-30 b-b"
        >
          <u-col span="2">金额</u-col>
          <u-col span="10" text-align="right">
            {{ totalmoney }}
          </u-col>
        </u-row>
        <u-row
          gutter="0"
          justify="space-between"
          class="u-p-t-15 u-p-b-15 u-p-l-30 u-p-r-30 b-b"
        >
          <u-col span="2">运费</u-col>
          <u-col span="10" text-align="right">
            {{ shipping_fee }}
          </u-col>
        </u-row>
        <u-row
          gutter="0"
          justify="space-between"
          class="u-p-t-15 u-p-b-15 u-p-l-30 u-p-r-30 b-b"
        >
          <u-col span="2">备注</u-col>
          <u-col span="10" text-align="left">
            <input
              class="desc"
              type="text"
              v-model="postscript"
              placeholder="请填写备注信息"
              placeholder-class="placeholder"
            />
          </u-col>
        </u-row>

        <!-- 底部 -->
        <view class="footer">
          <view class="price-content">
            <text>实付款</text>
            <text class="price-tip"></text>
            <text class="price">{{ realmoney }}</text>
          </view>
          <text class="submit" @click="submit">
            <button type="primary">提交订单</button>
          </text>
        </view>
      </view>
    </view>
  </qs-page>
</template>


<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      goodsList: [],
      hasLogin: false,
      loadStatus: "loadmore",
      loadstatus: false,
      loadstxt: "loading...",
      address_is_empty: true,
      addressData: [],
      totalmoney: 0,
      shipping_fee: "",
      realmoney: 0,
      postscript: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  onLoad() {
    this.hasLogin = this.$store.getters.loginFlag;
    this.getpagecontrac();

    this.$api("order.address_list", {})
      .then((res) => {
        if (res.code == 200) {
          console.log(res);
          if (Array.isArray(res.data)) {
            this.address_is_empty = false;
            this.addressData = res.data[0];
          }
        }
      })
      .catch((e) => {});
  },
  watch: {
    //显示空白页
    addressData(e) {
      let empty = e == undefined || e.length <= 0 ? true : false;
      if (this.address_is_empty !== empty) {
        this.address_is_empty = empty;
      }
    },
  },
  methods: {
    submit() {
      if (this.addressData == undefined || this.addressData.length == 0) {
		this.$u.toast("没有收货地址");
        return;
      }

      if (this.goodsList == undefined && this.goodsList.length == 0) {
		this.$u.toast("订单中没有商品");
        return;
      }

      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.loadstxt = "订单提交中";
        this.$api("shop.order_save", {
          createmode: "car",
          addrid: this.addressData.addr_id,
          postscript: this.postscript,
        })
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              //this.$tools.routerTo('/pages/order/order_view_payment','order_id='+res.data.order_id);
              this.$Router.push({
                path: "/pages/order/order_view_payment",
                query: { order_id: res.data.order_id },
              });
            }
            this.loadstatus = false;
          })
          .catch((e) => {
            this.loadstatus = false;
          });
      });
    },
    getpagecontrac() {
      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.loadstxt = "加载中";
        this.$api("shop.car_list", {})
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.totalmoney = res.data.totalmoney;
              this.shipping_fee = res.data.shipping_fee;
              this.realmoney = res.data.realmoney;
              this.goodsList = res.data.list;
            }
            this.loadstatus = false;
          })
          .catch((e) => {
            this.loadstatus = false;
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.address-section {
  padding: 30upx 0;
  position: relative;
  width: 100%;
  text-align: center;
  background: $u-tabbar-top-bg;

  .order-content {
    display: flex;
    align-items: center;
  }

  .icon-shouhuodizhi {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90upx;
    color: #888;
    font-size: 44upx;
  }

  .cen {
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: 28upx;
    color: $uni-text-color;
  }

  .name {
    font-size: 34upx;
    margin-right: 24upx;
  }

  .address {
    margin-top: 16upx;
    margin-right: 20upx;
    color: $uni-text-color;
  }

  .icon-you {
    font-size: 32upx;
    color: $uni-text-color;
    margin-right: 30upx;
  }

  .a-bg {
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 5upx;
  }
}

.g-item {
  position: relative;
  padding: 20rpx;
  image {
    flex-shrink: 0;
    display: block;
    width: 100rpx;
    height: 100rpx;
    border-radius: 4upx;
    margin: 10rpx;
  }
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 995;
  display: flex;
  align-items: center;
  width: 100%;
  height: 180rpx;
  justify-content: space-between;
  font-size: 30upx;
  z-index: 998;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  padding-bottom: 90rpx;
  padding-top: 60upx;

  .price-content {
    padding-left: 30upx;
  }
  .price-tip {
    color: #c40000;
    margin-left: 8upx;
  }
  .price {
    font-size: 36upx;
    color: #c40000;
  }
  .submit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300rpx;
    height: 80rpx;
    color: #fff;
    font-size: 32upx;
  }
}
</style>
