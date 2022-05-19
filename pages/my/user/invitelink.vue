<template>
	<qs-page  class="page">
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		     <!--isFullScreen 可以实其全屏显示-->
		<ourLoading isFullScreen :active="loadstatus" :text="loadstxt" color="#63E5CB" textColor="#63E5CB"/>
		<canvas canvas-id="poster" class="poster_canvas" style="width: 450rpx; height: 900rpx;"></canvas>
<!-- 		<view class="bgbox">
		<image mode="widthFix" src="/static/image/yaoqing.png" class="bgpic"></image>
		</view> -->
		
		
		<view class="inivt">
			<view style="background: #FFFFFF;border-radius: 30rpx;  text-align: center;padding: 60rpx;"><image mode="widthFix" :src="invite.replace(/[\r\n]/g,'')"></image></view>
			<view class="u-padding-20">
			<u-row gutter="16" justify="space-between">
				<u-col span="6">
					邀请码：{{user.userInfo.salt}}
				</u-col>
				<u-col span="6" text-align="right">
					成功邀请：100
				</u-col>
			</u-row>
			</view>
		</view>
			<view style="padding:20rpx 40rpx 0rpx 40rpx;">
				<view style="font-size: 40rpx; color: red; text-align: center;">推荐码：{{user.userInfo.salt}}</view>
			</view>
<!-- 			<view class="onSave" @click="onSaveImg">
				<view class="save">
				<image src="/static/ic_weixin.png" mode="aspectFit" style="width: 40rpx;height: 40rpx;"></image><br>
				<text>保存图片</text>
				</view>
			</view> -->
			
			<view class="onCopy" @click="clipboardcopy">
				<view class="copy">
				<image src="/static/ic_weixin.png" mode="aspectFit" style="width: 40rpx;height: 40rpx;"></image><br>
				<text>复制链接</text>
				</view>
			</view>
			
		</view>
		<!-- #ifdef H5 -->
		<view class="h5_press_save" v-if="h5SaveImg" @click="h5SaveImg = ''">
			<img :src="h5SaveImg" mode="widthFix"></img>
			<button class="download">长按图片保存图片</button>
		</view>
		<!-- #endif -->
	</qs-page>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import { SERVER_URL } from "@/env";
import clipboard from "@/components/ican-clipBoard.js";
// 文字换行
function drawtext(text, maxWidth) {
  let textArr = text.split("");
  let len = textArr.length;
  // 上个节点
  let previousNode = 0;
  // 记录节点宽度
  let nodeWidth = 0;
  // 文本换行数组
  let rowText = [];
  // 如果是字母，侧保存长度
  let letterWidth = 0;
  // 汉字宽度
  let chineseWidth = 21;
  // otherFont宽度
  let otherWidth = 10.5;
  for (let i = 0; i < len; i++) {
    if (/[\u4e00-\u9fa5]|[\uFE30-\uFFA0]/g.test(textArr[i])) {
      if (letterWidth > 0) {
        if (nodeWidth + chineseWidth + letterWidth * otherWidth > maxWidth) {
          rowText.push({
            type: "text",
            content: text.substring(previousNode, i),
          });
          previousNode = i;
          nodeWidth = chineseWidth;
          letterWidth = 0;
        } else {
          nodeWidth += chineseWidth + letterWidth * otherWidth;
          letterWidth = 0;
        }
      } else {
        if (nodeWidth + chineseWidth > maxWidth) {
          rowText.push({
            type: "text",
            content: text.substring(previousNode, i),
          });
          previousNode = i;
          nodeWidth = chineseWidth;
        } else {
          nodeWidth += chineseWidth;
        }
      }
    } else {
      if (/\n/g.test(textArr[i])) {
        rowText.push({
          type: "break",
          content: text.substring(previousNode, i),
        });
        previousNode = i + 1;
        nodeWidth = 0;
        letterWidth = 0;
      } else if (textArr[i] == "\\" && textArr[i + 1] == "n") {
        rowText.push({
          type: "break",
          content: text.substring(previousNode, i),
        });
        previousNode = i + 2;
        nodeWidth = 0;
        letterWidth = 0;
      } else if (/[a-zA-Z0-9]/g.test(textArr[i])) {
        letterWidth += 1;
        if (nodeWidth + letterWidth * otherWidth > maxWidth) {
          rowText.push({
            type: "text",
            content: text.substring(previousNode, i + 1 - letterWidth),
          });
          previousNode = i + 1 - letterWidth;
          nodeWidth = letterWidth * otherWidth;
          letterWidth = 0;
        }
      } else {
        if (nodeWidth + otherWidth > maxWidth) {
          rowText.push({
            type: "text",
            content: text.substring(previousNode, i),
          });
          previousNode = i;
          nodeWidth = otherWidth;
        } else {
          nodeWidth += otherWidth;
        }
      }
    }
  }
  if (previousNode < len) {
    rowText.push({
      type: "text",
      content: text.substring(previousNode, len),
    });
  }
  return rowText;
}
let settingWritePhotosAlbum = false;
export default {
  data() {
    return {
      canvasW: 0, // 画布宽
      canvasH: 0, // 画布高
      SystemInfo: {}, // 设备信息
      invite: "",
      avatar: "",
      hasLogin: false,
      loadStatus: "loadmore",
      loadstatus: false,
      loadstxt: "loading...",
      h5SaveImg: "",
      platformName: "",
      posterImgs: [],
    };
  },
  //第一次加载

  computed: {
    ...mapState(["user"]),
  },
  onLoad(e) {
    //this.platformName = this.$base.platformName;
    if (e.objId) {
      this.objId = e.objId;
    }
    // 获取设备信息，主要获取宽度，赋值给canvasW 也就是宽度：100%
    //this.SystemInfo = await this.getSystemInfo();
    //this.canvasW = this.SystemInfo.windowWidth; // 画布宽度
    //this.canvasH = this.SystemInfo.windowHeight - 60; //this.goodsImg.height + this.ewmW + 10;  // 画布高度
    this.$api("user.invite", {})
      .then((res) => {
        if (res.code == 200) {
          this.invite = "data:image/png;base64," + res.data.qrcode;
          this.avatar = "data:image/png;base64," + res.data.avatar;
        }
      })
      .catch((e) => {});
  },

  methods: {
    clipboardcopy() {
      console.log("SERVER_URL" + SERVER_URL);
      let that = this;
      uni.setClipboardData({
        data: SERVER_URL + "/c/?s=" + that.user.userInfo.salt,
        success: function (data) {
          that.$u.toast("邀请链接复制成功");
        },
        fail: function (err) {},
        complete: function (res) {},
      });
    },
    // 创建海报
    createPoster() {
      return new Promise((resolve, reject) => {
        uni.showLoading({
          title: "海报生成中",
        });
        const ctx = uni.createCanvasContext("poster");
        //ctx.fillRect(0, 0, 600, 1299);
        ctx.setFillStyle("#2C405A");
        ctx.fillRect(0, 0, 450, 900); // fillRect(x,y,宽度，高度)
        // 1.填充背景色，白色

        //ctx.drawImage('/static/shareqrcode_bg.png?2', 0, 0, 600, 1500);
        ctx.drawImage(this.invite, 60, 90, 100, 100);
        let textTop = 200;
        ctx.setFontSize(15);
        ctx.setFillStyle("#f00");
        ctx.fillText("推荐码:" + this.user.userInfo.salt, 60, textTop + 30);

        // 长按识别二维码访问
        ctx.setFontSize(6);
        ctx.setFillStyle("#ddd");
        ctx.fillText("长按识别二维码访问", 60, textTop + 40);

        // 头像
        ctx.drawImage(this.avatar, 88, 330, 50, 50);
        ctx.draw(true, () => {
          // canvas画布转成图片并返回图片地址
          uni.canvasToTempFilePath({
            canvasId: "poster",
            width: 450,
            height: 900,
            success: (res) => {
              console.log("海报制作成功！");
              resolve(res.tempFilePath);
            },
            fail: () => {
              uni.hideLoading();
              reject();
            },
          });
        });
        // uni.downloadFile({
        // 	url: this.invite,
        // 	success: (res) => {
        // 		if (res.statusCode === 200) {
        // 			//二维码
        // 			ctx.drawImage(res.tempFilePath, 200, 600, 200, 200);
        // 			uni.downloadFile({
        // 				url: this.user.userInfo.avatar,
        // 				success: (res2) => {
        // 					if (res.statusCode === 200) {

        // 					} else {
        // 						uni.hideLoading();
        // 						uni.showToast({
        // 							title: '海报制作失败，图片下载失败',
        // 							icon: 'none'
        // 						});
        // 					}
        // 				},
        // 				fail: err => {
        // 					uni.hideLoading();
        // 					uni.showToast({
        // 						title: '海报制作失败，图片下载失败',
        // 						icon: 'none'
        // 					});
        // 				}
        // 			});
        // 		}else{
        // 			uni.hideLoading();
        // 			uni.showToast({
        // 				title: '海报制作失败，图片下载失败',
        // 				icon: 'none'
        // 			});
        // 		}
        // 		},
        // 	fail: err => {
        // 		uni.hideLoading();
        // 		uni.showToast({
        // 			title: '海报制作失败，图片下载失败',
        // 			icon: 'none',
        // 			})
        // 		}
        // 	});
      });
    },
    // 获取设备信息
    getSystemInfo() {
      return new Promise((req, rej) => {
        uni.getSystemInfo({
          success: function (res) {
            req(res);
          },
        });
      });
    },
    // 保存图片
    async onSaveImg() {
      let imgUrl = "";

      //imgUrl = this.invite;
      imgUrl = await this.createPoster();

      // #ifdef H5
      this.h5SaveImg = imgUrl;
      uni.hideLoading();
      // #endif

      // #ifdef MP-WEIXIN
      uni.showLoading({
        title: "海报下载中",
      });
      if (settingWritePhotosAlbum) {
        uni.getSetting({
          success: (res) => {
            if (res.authSetting["scope.writePhotosAlbum"]) {
              uni.saveImageToPhotosAlbum({
                filePath: imgUrl,
                success: () => {
                  uni.hideLoading();
                  uni.showToast({
                    title: "保存成功",
                  });
                },
              });
            } else {
              uni.showModal({
                title: "提示",
                content: "请先在设置页面打开“保存相册”使用权限",
                confirmText: "去设置",
                cancelText: "算了",
                success: (data) => {
                  if (data.confirm) {
                    uni.hideLoading();
                    uni.openSetting();
                  }
                },
              });
            }
          },
        });
      } else {
        settingWritePhotosAlbum = true;
        uni.authorize({
          scope: "scope.writePhotosAlbum",
          success: () => {
            uni.saveImageToPhotosAlbum({
              filePath: imgUrl,
              success: () => {
                uni.hideLoading();
                uni.showToast({
                  title: "保存成功",
                });
              },
            });
          },
        });
      }
      // #endif
      // #ifdef APP-PLUS
      uni.showLoading({
        title: "海报下载中",
      });
      uni.saveImageToPhotosAlbum({
        filePath: imgUrl,
        success: () => {
          uni.hideLoading();
          uni.showToast({
            title: "保存成功",
          });
        },
      });
      // #endif
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  background: url(@/static/image/yaoqing.png?2) no-repeat top center;
  background-size: 100% auto;
  padding-top: 200upx;
}

.bgbox {
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  .bgpic {
    width: 100%;
    position: relative;
  }
}

.inivt {
  width: 96%;
  border-radius: 32rpx;
  background: #fe5c47;
  margin: 0rpx auto 20rpx auto;
  color: #ffffff;
  image {
    width: 400rpx;
    height: 400rpx;
  }
}
.poster_canvas {
  position: fixed;
  top: -10000rpx;
  left: 0rpx;
}
.onSave {
  text-align: center;
  position: fixed;
  bottom: 40rpx;
  width: 50%;
  left: 5%;
  .save {
    width: 180rpx;
    margin: auto;
    background: #fff;
    padding: 10rpx;
    border-radius: 20rpx;
  }
}
.onCopy {
  text-align: center;
  position: fixed;
  bottom: 120rpx;
  width: 50%;
  margin: auto 25%;
  .copy {
    width: 180rpx;
    margin: auto;
    background: $u-bg-color;
    border: solid 1px $u-border-color-light;
    padding: 10rpx;
    border-radius: 20rpx;
  }
}
.h5_copy_save {
}

.h5_press_save {
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 80rpx;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 100;
  -webkit-touch-callout: default;
  image,
  img {
    width: 100%;
  }
  .download {
    font-size: 24rpx;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    padding: 5rpx 30rpx;
    border-radius: 40rpx;
    bottom: 30rpx;
    left: 50%;
    transform: translateX(-50%);
    &:before {
      content: "";
      //@include bis('/static/demo/icon_download.png');
      background-image: url("/static/icon_download.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      width: 24rpx;
      height: 24rpx;
      margin-right: 15rpx;
    }
  }
}
</style>
