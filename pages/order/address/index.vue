<template>
  <qs-page>
    <u-empty
      text="地址列表"
      mode="page"
      v-if="addressList.length === 0"
    ></u-empty>

    <view
      v-for="(res, index) in addressList"
      :key="res.id"
      class="base-panel-box u-margin-20"
      @click="checkAddress(res)"
    >
      <view class="htitle">
        <i
          ><u-icon name="dizhi" custom-prefix="customicon" size="30"></u-icon
        ></i>
        {{ res.consignee }}
        <view class="right"
          ><u-icon
            name="edit-pen"
            color="#999999"
            @click="toAddSite('edit', res)"
          ></u-icon
        ></view>
      </view>
      <view class="item">
        <u-row gutter="16" justify="space-between">
          <u-col span="12">{{ res.mobile }}</u-col>
          <u-col span="12"
            >{{ res.province_name }}{{ res.city_name }}{{ res.area_name }}
            {{ res.address }}</u-col
          >
          <u-col span="12" v-if="res.is_default">
            <view class="tag">
              <text class="red">默认</text>
            </view>
          </u-col>
        </u-row>
      </view>
    </view>

    <view class="addSite" @tap="toAddSite('add')">
      <view class="add">
        <u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon
        >新建收货地址
      </view>
    </view>
  </qs-page>
</template>

<script>
export default {
  data() {
    return {
      addressList: [],
      source: 0,
    };
  },
  onLoad(option) {
    this.source = option.source;
  },
  onShow() {
    this.refreshList();
  },
  methods: {
    //添加或修改成功之后回调
    refreshList(data, type) {
      this.$api("order.address_list", {})
        .then((res) => {
          if (res.code == 200) {
            this.addressList = Array.isArray(res.data) ? res.data : [];
          }
        })
        .catch((e) => {});
    },
    toAddSite(type, item) {
      this.$Router.push({
        path: "/pages/order/address/addsite",
        query: {
          type: type,
          item: item,
        },
      });
      // uni.navigateTo({
      //     url: '/pages/order/address/addsite'
      // });
    },
    checkAddress(item) {
      if (this.source == 1) {
        let pages = getCurrentPages();
        let prePage = pages[pages.length - 2];
        // #ifdef H5
        prePage.addressData = item;
        // #endif
        prePage.$vm.addressData = item;

        uni.navigateBack(1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  padding: 40rpx 20rpx;
  .top {
    display: flex;
    font-weight: bold;
    font-size: 34rpx;
    .phone {
      margin-left: 60rpx;
    }
    .tag {
      display: flex;
      font-weight: normal;
      align-items: center;
      text {
        display: block;
        width: 60rpx;
        height: 34rpx;
        line-height: 34rpx;
        color: #ffffff;
        font-size: 20rpx;
        border-radius: 6rpx;
        text-align: center;
        margin-left: 30rpx;
        background-color: rgb(49, 145, 253);
      }
      .red {
        background-color: red;
      }
    }
  }
  .bottom {
    display: flex;
    margin-top: 20rpx;
    font-size: 28rpx;
    justify-content: space-between;
    color: #999999;
  }
}
.addSite {
  display: flex;
  justify-content: space-around;
  width: 600rpx;
  line-height: 100rpx;
  position: absolute;
  bottom: 120rpx;
  left: 80rpx;
  background-color: red;
  border-radius: 60rpx;
  font-size: 30rpx;
  .add {
    display: flex;
    align-items: center;
    color: #ffffff;
    .icon {
      margin-right: 10rpx;
    }
  }
}
</style>
