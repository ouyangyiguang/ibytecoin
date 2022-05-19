<template>
  <qs-page>
    <qs-navbar isBack="false" backUrl="/pages/my/my" @eventChange="test">
      <view class="u-flex"><h3>个人信息</h3></view>
      <view class="u-flex u-m-r-52"> </view>
    </qs-navbar>
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
    <view class="user-box">
      <u-cell-group :border="myinfo.border">
        <u-cell-item
          title="头像"
          :center="true"
          :border-bottom="myinfo.borderBottom"
          @tap="chooseAvatar"
        >
          <u-avatar :src="user.userInfo.avatar" mode="circle"></u-avatar>
        </u-cell-item>
        <u-cell-item
          title="用户名"
          :value="user.userInfo.username"
          :arrow="false"
          :border-bottom="myinfo.borderBottom"
        ></u-cell-item>
        <u-cell-item
          title="昵称"
          :value="user.userInfo.nickname"
          :border-bottom="myinfo.borderBottom"
          @click="nickname_show = true"
        ></u-cell-item>
      </u-cell-group>

      <u-cell-group :border="myinfo.border">
        <u-cell-item
          title="实名认证"
          :value="user.userInfo.realname"
          :border-bottom="myinfo.borderBottom"
          @click="$tools.routerTo('/pages/my/user/info/realname')"
        ></u-cell-item>
        <u-cell-item
          title="收款方式"
          :border-bottom="myinfo.borderBottom"
          @click="$tools.routerTo('/pages/my/user/info/paymentinfo')"
        ></u-cell-item>
        <u-cell-item
          title="收货地址"
          @click="$tools.routerTo('/pages/order/address/index')"
          :value="user.userInfo.sex"
          :border-bottom="myinfo.borderBottom"
        ></u-cell-item>
        <u-cell-item
          title="优惠券"
          @click="$tools.routerTo('/pages/my/ticket/index')"
          :value="user.userInfo.sex"
          :border-bottom="myinfo.borderBottom"
        ></u-cell-item>
      </u-cell-group>
    </view>
    <u-popup
      v-model="nickname_show"
      mode="bottom"
      border-radius="14"
      :custom-style="popupbottom"
      class="popupbottom"
    >
      <view class="content u-padding-35">
        <u-form-item
          class="form-item"
          label="昵称"
          prop="nickname"
          label-width="90"
        >
          <u-input
            v-model="user.userInfo.nickname"
            placeholder="英文姓名或中文名"
            type="text"
          />
        </u-form-item>

        <u-gap height="40"></u-gap>
        <u-button
          type="primary"
          @click="userlist_edit_submit('nickname', user.userInfo.nickname)"
          class="u-margin-bottom-50"
          >确认设置</u-button
        >
      </view>
    </u-popup>
    <u-gap height="60"></u-gap>
  </qs-page>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      loadstatus: false,
      loadstxt: "loadstxt",
      nickname_show: false,
      myinfo: {
        border: false,
        borderBottom: true,
      },
      popupbottom: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    // 监听从裁剪页发布的事件，获得裁剪结果
    uni.$on("uAvatarCropper", (path) => {
      this.$tools.uploadImage("User/uploadbase64avatar", path).then((res) => {
        console.log("upavatar", res);
        if (res.code == 200) {
          //this.$store.commit('USER_INFO',res.data);
          this.$store.dispatch("getUserInfo");
        }
      });

      /*
                    this.$api('uploadBase64', {
						    filePath:path,
							name: 'file',
					}).then(res => {
						 console.log('mofily....', res);
                    }).catch((e)=>{
                    });
*/
    });
  },
  async onShow() {},
  onLoad() {},
  methods: {
    test(e) {
      this.$Router.push({ path: e, query: {} });
      console.log("test=========", e);
    },
    chooseAvatar() {
      // 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
      uni.navigateTo({
        url:
          "/uview-ui/components/u-avatar-cropper/u-avatar-cropper?destWidth=300&rectWidth=200&fileType=jpg",
      });
    },
    userlist_edit_submit(fieldname, fieldvalue) {
      this.loadstatus = true;
      this.loadstxt = "数据更新中";
      return new Promise((resolve, reject) => {
        this.$api("user.usernick_edit", {
          nickname: fieldvalue,
        })
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              //this.$store.commit('USER_INFO',res.data);
              this.$store.dispatch("getUserInfo");
              this.nickname_show = false;
              //this.$tools.routerTo('/pages/my/user/user')
            }
            this.loadstatus = false;
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
.popupbottom {
  .content {
    height: 600rpx;
    background: $u-bg-color;
    border: none;
  }
}
</style>
