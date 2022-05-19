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

    <view class="u-p-t-10 " v-if="flow_list.length > 0">

        <view 
          class="news"
          v-for="(item, index) in flow_list"
          :key="index"
          @click="
            $tools.routerTo(
              '/pages/info/view',
              'aid=' + item.aid + '&title=' + item.title
            )
          "
        >
			<view class="newspic" :style="'background:url('+item.litpic+');background-size:100% auto'"></view>
			<view class="title">{{ item.title }}</view>
        </view>


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
  onLoad(option) {
    let query = JSON.parse(option.query);
    let title = query.title;
    uni.setNavigationBarTitle({ title });
    this.tid = query.tid;
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
            console.log(res);
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
	.news{
		margin: 20rpx;
		border: solid 1px $u-border-color;
		border-radius: 20rpx;
		.newspic{
			width: 100%;
			height:300rpx;
			border-radius: 20rpx 20rpx 0rpx 0rpx;
		}
		.title{
			padding: 30rpx 20rpx;
		}
	}
</style>
