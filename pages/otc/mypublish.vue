<template>
  <account-page :title="title" :desc="desc">
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

    <view class="" v-else>
      <u-empty
        text="没有数据"
        mode="data"
        :show="flow_list.length === 0"
        v-if="loadstatus == false"
      ></u-empty>
      <view class="u-p-t-10" v-if="flow_list.length > 0">
        <view class="base-panel-box u-m-b-30">
          <view class="item" v-for="(item, index) in flow_list" :key="index">
            <u-row gutter="16" justify="space-between">
              <u-col span="6"
                ><b>{{ item.nickname }}</b></u-col
              >
              <u-col span="6" text-align="right" class="u-font-xs">{{
                item.add_time
              }}</u-col>
              <u-col span="6">数量</u-col>
              <u-col span="6" text-align="right" class="u-font-xs">单价</u-col>
              <u-col span="6">{{ item.num }}</u-col>
              <u-col
                span="6"
                text-align="right"
                class="u-type-primary u-font-lg"
                >{{ item.price }}</u-col
              >
              <u-col span="6">
                <text v-for="(ip, key) in item.paymethod" :key="key">
                  <i class="u-m-r-10"
                    ><u-icon
                      :name="ip.icon"
                      custom-prefix="customicon"
                      color="green"
                    ></u-icon
                  ></i>
                </text>
              </u-col>
              <u-col span="6" text-align="right">
                <u-button
                  size="mini"
                  type="primary"
                  @click="iwant_cancelorder(item.id)"
                  >取消发布</u-button
                >
              </u-col>
            </u-row>
          </view>
        </view>
      </view>
      <view v-if="flow_list.length > 0">
        <u-loadmore
          :status="loadStatus"
          @loadmore="getpagecontrac"
        ></u-loadmore>
      </view>
    </view>
  </account-page>
</template>


<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      title: "我的发布",
      desc: "自已发布的购买和出售广告",
      flow_list: [],
      hasLogin: false,
      loadStatus: "loadmore",
      loadstatus: false,
      loadstxt: "loading...",
      page: 1,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  onLoad() {
    this.hasLogin = this.$store.getters.loginFlag;
    this.getpagecontrac();
  },
  onReachBottom() {
    this.loadStatus = "loading";
    setTimeout(() => {
      this.getpagecontrac();
      this.loadStatus = "loadmore";
    }, 50);
  },
  methods: {
    getpagecontrac() {
      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.$api("otc.adlist", {
          page: this.page,
          limit: 10,
          see_users_id: this.user.userInfo.users_id,
        })
          .then((res) => {
            console.log(res.data);
            if (res.code == 200) {
              if (res.data.count > 0) {
                let list = res.data.list;
                if (this.page <= res.data.pages) {
                  for (let i = 0; i < list.length; i++) {
                    this.flow_list.push(list[i]);
                  }
                  this.page += 1;
                } else {
                  this.loadStatus = "nomore";
                }
              } else {
                this.flow_list = [];
                this.loadStatus = "nomore";
              }
            }
            this.loadstatus = false;
          })
          .catch((e) => {
            this.loadstatus = false;
            resolve(false);
          });
      });
    },
    iwant_cancelorder(adid) {
      this.$api("otc.cancelorder", {
        adid: adid,
      })
        .then((res) => {
          console.log(res.data);
          if (res.code == 200) {
            this.$u.toast("取消成功");
            this.getpagecontrac();
          }
          this.loadstatus = false;
        })
        .catch((e) => {
          this.loadstatus = false;
          resolve(false);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
