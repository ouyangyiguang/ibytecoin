<template>
  <view v-if="show">
    <swiper class="guide_pages_swiper">
      <swiper-item>
        <view class="guide_pages_bg1"></view>
      </swiper-item>
      <swiper-item>
        <view class="guide_pages_bg2"></view>
      </swiper-item>
      <swiper-item>
        <view class="guide_pages_bg3"></view>
        <button
          v-if="screenHeight > 667"
          class="guide_pages_close close_1624"
          @click="onClose"
        >
          进入
        </button>
        <button v-else class="guide_pages_close close_1334" @click="onClose">
          进入
        </button>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      screenHeight: 667,
      show: false,
    };
  },
  created() {
    //uni.setStorageSync('guidePages', '');
    if (uni.getStorageSync("guidePages") != 2) {
      this.show = true;
    }
    let systemInfo = uni.getSystemInfoSync();
    this.screenHeight = systemInfo.screenHeight;
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    onClose() {
      uni.setStorageSync("guidePages", 2);
      this.show = false;
      let hasLogin = this.$store.getters.loginFlag;
      console.log("guidpages.......hasLogin=" + hasLogin);
      if (!hasLogin) {
        uni.navigateTo({
          url: "/pages/account/login/pwd-login",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.guide_pages_swiper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 999;
  image {
    width: 100vw;
    height: 100vh;
  }
  .guide_pages_bg1 {
    width: 100vw;
    height: 100vh;
    background-color: #4cd964;
    background: url(http://test.dcdy.com/uploads/welcome_1.jpg) no-repeat top;
    background-size: 100% auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 60rpx;
    font-weight: bold;
  }
  .guide_pages_bg2 {
    width: 100vw;
    height: 100vh;
    background-color: #007aff;
    background: url(http://test.dcdy.com/uploads/welcome_2.jpg) no-repeat top;
    background-size: 100% auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 60rpx;
    font-weight: bold;
  }
  .guide_pages_bg3 {
    width: 100vw;
    height: 100vh;
    background-color: #004fe9;
    background: url(http://test.dcdy.com/uploads/welcome_3.jpg) no-repeat top;
    background-size: 100% auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 60rpx;
    font-weight: bold;
  }
  .guide_pages_close {
    border: 2rpx solid #fff;
    color: #fff;
    line-height: 68rpx;
    height: 68rpx;
  }
  .close_1334 {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 290rpx;
    height: 68rpx;
    transform: translateX(-50%) translateY(438rpx);
    background-color: transparent;
  }
  .close_1624 {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 290rpx;
    height: 68rpx;
    background-color: transparent;
    transform: translateX(-50%) translateY(412rpx);
  }
}
</style>
