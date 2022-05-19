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
    <u-empty
      text="没有数据1"
      mode="data"
      :show="flow_list.length === 0"
    ></u-empty>

    <u-waterfall v-model="flow_list" ref="uWaterfall">
      <template v-slot:left="{ leftList }">
        <view
          class="demo-warter"
          v-for="(item, index) in leftList"
          :key="index"
          @click="$Router.push({ path: '/pages/shop/view', query: { aid: item.aid } })"
        >
          <!-- 微信小程序需要hx2.8.11版本才支持在template中引入其他组件，比如下方的u-lazy-load组件 -->
          <u-lazy-load
            threshold="-450"
            border-radius="10"
            :image="item.litpic"
            :index="index"
          ></u-lazy-load>
          <view class="demo-title">{{ item.title }}</view>
          <view class="demo-price">{{ item.users_price }}元</view>
          <view class="demo-shop">{{ item.seo_description }}</view>
        </view>
      </template>
      <template v-slot:right="{ rightList }">
        <view
          class="demo-warter"
          v-for="(item, index) in rightList"
          :key="index"
          @click="
            $Router.push({ path: '/pages/shop/view', query: { aid: item.aid } })
          "
        >
          <u-lazy-load
            threshold="-450"
            border-radius="10"
            :image="item.litpic"
            :index="index"
          ></u-lazy-load>
          <view class="demo-title">{{ item.title }}</view>
          <view class="demo-price">{{ item.users_price }}元</view>
          <view class="demo-shop">{{ item.seo_description }}</view>
        </view>
      </template>
    </u-waterfall>

    <view v-if="flow_list.length > 0">
      <u-loadmore :status="loadStatus" @loadmore="getflowlist"></u-loadmore>
    </view>
  </qs-page>
</template>

<script>
export default {
  data() {
    return {
      flow_list: [],
      loadStatus: "loadmore",
      loadstatus: true,
      page: 1,
      tid: 3,
    };
  },
  onLoad() {
    this.getflowlist();
  },
  onReachBottom() {
    this.loadStatus = "loading";
    setTimeout(() => {
      this.getflowlist();
      this.loadStatus = "loadmore";
    }, 0);
  },
  methods: {
    getflowlist() {
      return new Promise((resolve, reject) => {
        this.$api("shop.products_list", {
          page: this.page,
          limit: 10,
          tid: this.tid,
        })
          .then((res) => {
            if (res.code == 200) {
              let list = res.data.list;
              if (this.page <= res.data.pages) {
                for (let i = 0; i < list.length; i++) {
                  this.flow_list.push(list[i]);
                }
                this.page += 1;
              } else {
                this.loadStatus = "nomore";
              }
              this.loadstatus = false;
            }
          })
          .catch((e) => {
            resolve(false);
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f0f0f0;
}
.u-load-more-wrap {
  padding: 50rpx;
}
.demo-warter {
  border-radius: 8px;
  margin: 5px;
  background-color: #ffffff;
  padding: 8px;
  position: relative;
}

.u-close {
  position: absolute;
  top: 32rpx;
  right: 32rpx;
}

.demo-img-wrap {
}

.demo-image {
  width: 100%;
  border-radius: 4px;
}

.demo-title {
  font-size: 30rpx;
  margin-top: 5px;
  color: $u-main-color;
  word-break: break-all;
}

.demo-tag {
  display: flex;
  margin-top: 5px;
}

.demo-tag-owner {
  background-color: $u-type-error;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 4rpx 14rpx;
  border-radius: 50rpx;
  font-size: 20rpx;
  line-height: 1;
}

.demo-tag-text {
  border: 1px solid $u-type-primary;
  color: $u-type-primary;
  margin-left: 10px;
  border-radius: 50rpx;
  line-height: 1;
  padding: 4rpx 14rpx;
  display: flex;
  align-items: center;
  border-radius: 50rpx;
  font-size: 20rpx;
}

.demo-price {
  font-size: 30rpx;
  color: $u-type-error;
  margin-top: 5px;
}

.demo-shop {
  font-size: 22rpx;
  color: $u-tips-color;
  margin-top: 5px;
}
</style>
