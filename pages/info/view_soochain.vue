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
    <view class="u-content">
      <center>
        <text style="font-size: 20rpx">本资讯由搜链soochain.com友情供稿.</text>
      </center>
      <u-parse :html="content" :selectable="true"></u-parse>
    </view>
  </qs-page>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      loadStatus: "loadmore",
      loadstatus: false,
    };
  },
  onLoad(option) {
    let query = JSON.parse(option.query);
    let title = query.title;
    uni.setNavigationBarTitle({ title });
    let aid = query.aid;
    this.articleview(aid);
  },

  methods: {
    articleview(aid) {
      this.loadstatus = true;
      return new Promise((resolve, reject) => {
        uni.request({
          url: "http://www.soochain.com/vueapi/article/view/",
          data: {
            aid: aid,
          },
          success: (res) => {
            if (res.statusCode == 200) {
              this.content = res.data.info.content;
            }
            this.loadstatus = false;
          },
          fail: (error) => {
            this.loadstatus = false;
            resolve(false);
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.u-content {
  padding: 30rpx;
  color: $u-content-color;
  font-size: 32rpx;
  line-height: 1.8;
  background: #ffffff;

  // 标签形式无效
  p {
    color: $u-tips-color;
  }
}
</style>
