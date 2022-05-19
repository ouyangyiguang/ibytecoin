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

    <view class=" " v-else>
      <u-tabs
        name="cate_name"
        :list="tabslist"
        :is-scroll="false"
        :current="current"
        @change="change"
        inactive-color="#919FAC"
        :active-item-style="tabsstyle"
        :bar-style="bartype"
        bar-width="108"
        active-color="#2864E8"
        duration="0"
      >
      </u-tabs>

      <view class="u-p-t-10" v-if="current == 0">
        <u-empty
          text="没有数据"
          mode="data"
          :show="flow_list.length === 0"
          v-if="loadstatus == false"
        ></u-empty>
        <view class="base-panel-box u-m-b-30" v-if="flow_list.length > 0">
          <view class="item" v-for="(item, index) in flow_list" :key="index">
            <u-row gutter="0" justify="space-between">
              <u-col span="6" text-align="center">
                <view>
                  {{ item.num }}
                </view>
              </u-col>
              <u-col span="6" text-align="center">
                <view class="bg-purple-light u-font-xs">{{
                  item.createtime
                }}</view>
              </u-col>
            </u-row>
          </view>
        </view>
        <view v-if="flow_list.length > 0">
          <u-loadmore :status="loadStatus" @loadmore="getflowlist"></u-loadmore>
        </view>
      </view>

      <view class="u-padding-20" v-if="current == 1">
        <u-empty
          text="没有矿机"
          mode="data"
          :show="my_factory.length === 0"
          v-if="loadstatus == false"
        ></u-empty>

        <view
          v-for="(item, index) in my_factory"
          :key="index"
          class="base-panel-box u-m-b-30"
        >
          <view class="htitle">
            <i
              ><u-icon
                name="zichanguanli"
                custom-prefix="customicon"
                size="30"
              ></u-icon
            ></i>
            {{ item.name }}
          </view>
          <view class="item">
            <u-row gutter="16" justify="space-between">
              <u-col span="6">数量：{{ item.num }}</u-col>
              <u-col span="6">使用寿命：{{ item.shouming }}天</u-col>
            </u-row>
          </view>
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
      hasLogin: false,
      loadStatus: "loadmore",
      loadstatus: false,
      loadstxt: "loading...",
      page: 1,
      tabslist: [
        {
          cate_name: "收益记录",
        },
        {
          cate_name: "我的矿机",
        },
      ],
      current: 0,
      tabsstyle: {
        borderRadius: "0rpx",
      },
      bartype: {
        marginBottom: "-3px",
      },
      my_factory: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  onLoad(options) {
    this.hasLogin = this.$store.getters.loginFlag;
    this.getpagecontrac();
  },

  methods: {
    change(index) {
      this.current = index;
      if (index == 0) {
        this.page = 1;
        this.flow_list = [];
        this.getpagecontrac();
      }
      if (index == 1) {
        this.myfactory();
      }
    },
    myfactory() {
      this.$api("factory.my_factory", {})
        .then((res) => {
          if (res.code == 200) {
            console.log(res);
            this.my_factory = res.data.list;
          }
        })
        .catch((e) => {});
    },
    getpagecontrac() {
      return new Promise((resolve, reject) => {
        this.loadstatus = true;
        this.$api("factory.list_income", {
          page: this.page,
          limit: 10,
        })
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
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
.base-panel-box {
  .item:last-child {
    border-radius: 0rpx;
  }
}
</style>
