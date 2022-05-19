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

    <view class="u-padding-20" v-else>
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
                  'aid=' + item.ContentID + '&title=' + item.Title
                )
              "
            >
              <image :src="item.UploadedImage" mode="aspectFill"></image>
              <view class="u-body-item-title u-line-2">{{ item.Title }}</view>
            </view>
          </view>
        </u-card>
      </view>
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
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  onLoad(options) {
    let query;
    if (options.query) {
      query = JSON.parse(options.query);
    }
    this.hasLogin = this.$store.getters.loginFlag;
    //this.getpagecontrac();
  },

  methods: {
    getpagecontrac() {
      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.loadstxt = "加载矿机中";

        this.$api("mining.contrac_list", {})
          .then((res) => {
            console.log(res);
            if (res.Code == 1) {
              this.flow_list = res.Data.ItemList;
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
</style>
