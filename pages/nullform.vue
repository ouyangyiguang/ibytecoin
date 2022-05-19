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
    <view class="account-form-box">
      <u-form ref="uForm" :errorType="form.errorType">
        <u-form-item
          class="form-item"
          label="真实姓名"
          prop="realname"
          :label-position="form.labelPosition"
        >
          <u-input
            v-model="realname"
            placeholder="英文姓名或中文名"
            type="text"
            :custom-style="input"
          />
        </u-form-item>
      </u-form>

      <u-gap height="40"></u-gap>

      <u-button type="primary" @click="submit">确认设置</u-button>
    </view>

    <u-gap height="40"></u-gap>
  </account-page>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      loadstatus: false,
      loadstxt: "loadstxt",
      title: "修改",
      desc: "修改用户信息",
      form: {
        errorType: ["message"],
        labelPosition: "top",
      },
      input: {},

      realname: "",

      rules: {
        realname: [
          {
            required: true,
            message: "请输入真实姓名",
            trigger: ["change", "blur"],
          },
          {
            min: 2,
            max: 10,
            message: "姓名名长度在4到20个字符",
            trigger: ["change", "blur"],
          },
          {
            pattern: /^[\u0391-\uFFE5A-Za-z]+$/,
            transform(value) {
              return String(value);
            },
            message: "用户名为字母或数字",
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  onLoad() {},
  methods: {
    submit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.loadstatus = true;
          this.loadstxt = "数据更新中";
          return new Promise((resolve, reject) => {
            this.$api("user.userlist_edit", {})
              .then((res) => {
                this.loadstatus = false;
                console.log("edit", res);
                if (res.code == 200) {
                } else {
                  this.$tools.msg(res.msg);
                }
              })
              .catch((e) => {
                this.loadstatus = false;
                resolve(false);
              });
          });
        } else {
          console.log("验证失败");
        }
      });
    },
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
};
</script>

<style lang="scss" scoped>
.account-form-box {
  padding: 0 32rpx;
}
</style>
