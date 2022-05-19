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
      text="没有数据"
      mode="data"
      :show="flow_list.length === 0"
      v-if="loadstatus == false"
    ></u-empty>

    <view class="u-p-t-10" v-if="flow_list.length > 0">
      <u-card :border="false" :show-head="false" :show-foot="false">
        <view
          slot="body"
          class=""
          v-for="(item, index) in flow_list"
          :key="index"
        >
          <view
            class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0"
            @click="
              $tools.routerTo(
                '/pages/news/view',
                'aid=' + item.aid + '&title=' + item.title
              )
            "
          >
            <image :src="item.litpic" mode="aspectFill"></image>
            <view class="u-body-item-title u-line-2">{{ item.title }}</view>
          </view>
        </view>
      </u-card>

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
      loadstatus: false,
      page: 1,
      tid: 179,
    };
  },
  onLoad() {
    this.getflowlist();
  },
  onReachBottom() {
    this.loadStatus = "loading";
    setTimeout(() => {
      this.loadStatus = "loadmore";
      this.getflowlist();
    }, 0);
  },
  methods: {
    getflowlist() {
      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.$api("archives.article_list", {
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
                if (this.page == res.data.pages) {
                  this.loadStatus = "nomore";
                }
                this.page += 1;
              } else {
                this.loadStatus = "nomore";
              }
              this.loadstatus = false;
            }
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
.u-load-more-wrap {
  padding: 50rpx;
}

.u-card-wrap {
  background-color: $u-bg-color;
  padding: 1px;
}

.u-body-item {
  font-size: 32rpx;
  color: #333;
  padding: 20rpx 10rpx;
}

.u-body-item image {
  width: 120rpx;
  flex: 0 0 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
  margin-right: 12rpx;
  margin-top: 12rpx;
}
</style>
