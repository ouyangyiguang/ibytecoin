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
      <view class="team-box">
        <u-row gutter="0" justify="space-between" style="padding-bottom: 30rpx">
          <u-col span="6" style="border-right: solid 1rpx #ffffff">
            <view class="u-text-center">
              <u-count-to
                :start-val="0"
                :end-val="teaminfo.totalcount"
              ></u-count-to> </view
            ><view class="u-text-center">总人数</view>
          </u-col>
          <u-col span="6">
            <view class="u-text-center">0</view
            ><view class="u-text-center">已激活数</view>
          </u-col>
        </u-row>
        <u-row
          gutter="0"
          justify="space-between"
          style="border-top: solid 1rpx #ffffff; padding-top: 30rpx"
        >
          <u-col span="6" style="border-right: solid 1rpx #ffffff">
            <view class="u-text-center">0</view
            ><view class="u-text-center">社区总盈利</view>
          </u-col>
          <u-col span="6">
            <view class="u-text-center">0</view
            ><view class="u-text-center">社区今日盈利</view>
          </u-col>
        </u-row>
      </view>

      <view style="width: 400rpx; margin: 10rpx auto 30rpx auto">
        <u-tabs
          :list="tabslist"
          :is-scroll="false"
          bg-color="#ffffff"
          inactive-color="#cccccc"
		  active-color="#63E5CB"
          :current="tabscurrent"
          @change="change"
        ></u-tabs>
      </view>

      <view v-if="tabscurrent == 1">
        <view v-if="upuid != ''" class="u-margin-20" style="float: right">
          <u-button
            @click="gotonextpage(upuid, 'previous')"
            type="info"
            size="mini"
            >返回上层</u-button
          >
        </view>
        <center>
          <view
            style="
              background: #63E5CB;
              border-radius: 100%;
              width: 140rpx;
              height: 140rpx;
              margin: 30rpx;
              border: solid 2px #ffffff;
              color: #f7f8f9;
              padding: 20rpx 10rpx 5rpx 10rpx;
            "
          >
            <text style="font-size: 40rpx">{{ currentlevel }}</text>
            <view><text style="font-size: 22rpx">当前层级</text></view>
          </view>
        </center>
      </view>

      <u-empty
        text="没有数据"
        mode="data"
        :show="flow_list.length === 0"
        v-if="loadstatus == false"
      ></u-empty>
      <view class="" v-if="flow_list.length > 0">
        <view class="base-panel-box" v-if="tabscurrent == 0">
          <view class="htitle">
            <view class="">团队列表</view>
          </view>
          <view class="item" v-for="(item, index) in flow_list" :key="index">
            <u-row gutter="0" justify="space-between">
              <u-col
                span="2"
                @click="$tools.routerTo('/pages/chat/businessCard')"
              >
                <image
                  mode="scaleToFill"
                  :src="item.avatar"
                  style="width: 80rpx; height: 80rpx"
                ></image>
              </u-col>
              <u-col span="6" text-align="left">
                <view class="demo-layout bg-purple-light">
                  <view class="u-font-md u-type-error-dark">{{
                    item.nickname
                  }}</view>
                  <view class="u-font-sm">下级数：{{ item.belownum }}</view>
                </view>
                <view>所属层数：{{ item.level_relatively }}</view>
              </u-col>
              <u-col span="4">
                <view
                  ><text class="u-font-sm">{{ item.add_time }}</text></view
                >
                <view @tap="chatTo(item)"
                  ><u-icon
                    name="chat"
                    size="38"
                    :custom-style="{ padding: '16rpx' }"
                  ></u-icon
                ></view>
              </u-col>
            </u-row>
          </view>
        </view>

        <view class="base-panel-box" v-if="tabscurrent == 1">
          <view class="htitle">
            <view class="">团队列表</view>
          </view>
          <view class="item" v-for="(item, index) in flow_list" :key="index">
            <u-row gutter="0" justify="space-between">
              <u-col
                span="2"
                @click="$tools.routerTo('/pages/chat/businessCard')"
              >
                <image
                  mode="scaleToFill"
                  :src="item.avatar"
                  style="width: 80rpx; height: 80rpx"
                ></image>
              </u-col>
              <u-col span="6" text-align="left">
                <view class="demo-layout bg-purple-light">
                  <view class="u-font-md u-type-error-dark">{{
                    item.nickname
                  }}</view>
                  <view class="u-font-sm">下级数：{{ item.belownum }}</view>
                </view>
                <view @click="gotonextpage(item.users_id, 'next')"
                  >查看下级</view
                >
              </u-col>
              <u-col span="4">
                <view
                  ><text class="u-font-sm">{{ item.add_time }}</text></view
                >
                <view @tap="chatTo(item)"
                  ><u-icon
                    name="chat"
                    size="38"
                    :custom-style="{ padding: '16rpx' }"
                  ></u-icon
                ></view>
              </u-col>
            </u-row>
          </view>
        </view>

        <view v-if="flow_list.length > 0">
          <u-loadmore :status="loadStatus" @loadmore="getflowlist"></u-loadmore>
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
      flow_list: [],
      teaminfo: {
        totalcount: 0,
      },
      hasLogin: false,
      loadStatus: "loadmore",
      loadstatus: false,
      loadstxt: "loading...",
      page: 1,
      tabscurrent: 0,
      tabslist: [
        {
          name: "最新列表",
        },
        {
          name: "层级显示",
        },
      ],
      tabactivestyle: {},
      find_users_id: "",
      type: "",
      upuid: "",
      currentlevel: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  onLoad(options) {
    // let query;
    // if(options.query){
    //       query=JSON.parse(options.query);
    // }
    this.hasLogin = this.$store.getters.loginFlag;
    this.find_users_id = this.user.userInfo.users_id;
    this.getteaminfo();
    this.getpagecontrac();
  },
  onReachBottom() {
    this.loadStatus = "loading";
    setTimeout(() => {
      this.getpagecontrac();
      this.loadStatus = "loadmore";
    }, 50);
  },
  onPullDownRefresh() {
    this.flow_list = [];
    this.page = 1;
    this.getpagecontrac();

    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 500);
  },
  methods: {
    change(index) {
      this.tabscurrent = index;
      this.page = 1;
      this.flow_list = [];
      this.upuid = "";
      if (index == 0) {
        this.type = "";
        this.find_users_id = this.user.userInfo.users_id;
      }
      if (index == 1) {
        if (this.type == "") this.type = "next";
      }

      this.getpagecontrac();
    },
    gotonextpage(uid, fs) {
      this.find_users_id = uid;
      this.type = fs;
      this.change(1);
    },
    chatTo({ username, avatar, users_id }) {
      let room_id = users_id + this.user.userInfo.users_id;
      this.$Router.push({
        path: "/pages/chat/chat",
        query: {
          messageId: room_id,
          fromUserId: users_id,
          client_avatar: avatar,
          client_name: username,
        },
      });
    },
    getteaminfo() {
      this.$api("user.teaminfo", {})
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.teaminfo = res.data.teaminfo;
          }
        })
        .catch((e) => {});
    },
    getpagecontrac() {
      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.loadstxt = "加载中..";
        this.$api("user.team", {
          page: this.page,
          limit: 10,
          find_users_id: this.find_users_id,
          type: this.type,
          upuid: this.upuid,
        })
          .then((res) => {
            if (res.code == 200) {
              this.upuid = res.data.upuid;
              this.currentlevel = res.data.currentlevel;
              if (res.data.count > 0) {
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
              } else {
                this.flow_list = [];
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
.team-box {
  background: $u-type-primary;
  color: $u-light-color;
  padding: 50rpx;
  border-radius: 20rpx;
}
</style>
