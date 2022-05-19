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
      <u-form :model="model" ref="uForm" :errorType="form.errorType">
        <u-form-item
          class="form-item"
          label="真实姓名"
          prop="realname"
          :label-position="form.labelPosition"
        >
          <u-input
            v-model="model.realname"
            placeholder="英文姓名或中文名"
            type="text"
            :custom-style="input"
          />
        </u-form-item>
      </u-form>

      <view class="u-m-t-30 u-m-b-30"
        >身份证照片 ( 正面 )
        <u-row gutter="0" justify="space-between">
          <u-col span="5">
            <u-upload
              :max-size="8 * 1024 * 1024"
              max-count="1"
              :action="fileuploadaction"
              ref="uUpload"
              :auto-upload="true"
              :header="upheaderdata"
            ></u-upload>
          </u-col>
          <u-col span="7" align="left">
            <image
              :src="idCard1"
              mode="aspectFill"
              style="height: 220rpx; width: 300rpx"
            ></image>
          </u-col>
        </u-row>
        身份证照片 ( 背面 )
        <u-row gutter="16" justify="space-between">
          <u-col span="5">
            <u-upload
              :max-size="8 * 1024 * 1024"
              max-count="1"
              :action="fileuploadaction"
              ref="uUpload2"
              :auto-upload="true"
              :header="upheaderdata"
            ></u-upload>
          </u-col>
          <u-col span="7">
            <image
              :src="idCard2"
              mode="aspectFit"
              style="height: 220rpx; width: 300rpx"
            ></image>
          </u-col>
        </u-row>
      </view>

      <u-button type="primary" @click="submit">确认设置</u-button>
    </view>

    <u-gap height="40"></u-gap>
  </account-page>
</template>

<script>
import { API_URL } from "@/env";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      idCard1: "../../../../static/image/idcard1.png",
      idCard2: "../../../../static/image/idcard2.png",
      loadstatus: false,
      loadstxt: "loadstxt",
      title: "实名认证",
      desc: "填写真实姓名及上传身份证以审核",
      form: {
        errorType: ["message"],
        labelPosition: "top",
      },
      input: {},
      model: {
        /* 用户名 */
        realname: "",
      },
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
      fileuploadaction: API_URL + "tools/uploadbase64files",
      upheaderdata: {
        MemberToken: "",
        MemberId: "",
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  onLoad() {
    this.model.realname = this.user.userInfo.realname;
    this.upheaderdata.MemberToken = this.user.userInfo.access_token;
    this.upheaderdata.MemberId = this.user.userInfo.users_id;

    if (this.user.userInfo.idcard_1 != "") {
      this.idCard1 = this.user.userInfo.idcard_1;
    }
    if (this.user.userInfo.idcard_2 != "") {
      this.idCard2 = this.user.userInfo.idcard_2;
    }
  },
  methods: {
    submit() {
      let files = [];
      files = this.$refs.uUpload.lists.filter((val) => {
        return val.progress == 100;
      });

      let file1 = "";
      file1 =
        files.length === 0
          ? this.user.userInfo.idcard_1
          : files[0].response.data;

      let files2 = [];
      files2 = this.$refs.uUpload2.lists.filter((val) => {
        return val.progress == 100;
      });

      let file2 = "";
      file2 =
        files2.length === 0
          ? this.user.userInfo.idcard_2
          : files2[0].response.data;

      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.loadstatus = true;
          this.loadstxt = "数据更新中";
          return new Promise((resolve, reject) => {
            this.$api("user.userlist_edit", {
              realname: this.model.realname,
              idcard_1: file1,
              idcard_2: file2,
            })
              .then((res) => {
                if (res.code == 200) {
                  //this.$store.commit('USER_INFO',res.data);
                  this.$store.dispatch("getUserInfo");
                  uni.navigateBack(1);
                  //this.$tools.routerTo('/pages/my/user/user')
                }
                this.loadstatus = false;
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
