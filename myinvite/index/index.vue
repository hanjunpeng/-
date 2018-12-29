<!--
  我的邀请页面
  css 最外层myinvite-wrap
  埋点:
      邀请记录 op_inv_rec
      我的抵用券 op_inv_voucher
      面对面邀请  op_inv_inviteimg
      复制邀请码  op_inv_invitecode
      去分享 op_inv_invite
-->

<template>
  <div class="myinvite-wrap">
    <router-link tag="div" to="/rulesInfo" class="invite-top arrow-right">邀请规则</router-link>
    <router-link tag="div" to="/listrecord" class="invite-title" @click="recordBtnEvet">
        <img src="../img/inviteimg/my03_icon.png" class="bgImg" alt="图片">
        <img src="../img/inviteimg/my01_icon.png" class="bg_title" alt="图片">
        <div class="tel">{{initObj.phone}}</div>
        <div class="myinvite-show arrow-right arrow-left">邀请记录</div>
    </router-link>
    <section class="myinvite-center">
        <div class="font">
            <p class="font_1">你的邀请将为好友团队赢得免费定制工作台权益</p>
            <p class="font_2">您将同时获得免费定制的机会</p>
            <router-link tag="p" to="/lottery" class="font_3" @click="lotteryBtnEvet">我的抵用券</router-link>
        </div>
        <div class="btnList">
          <div class="btnCenter">
              <div class="shareBtn left" @click="qcodeBtnEvent()">
                  <img src="../img/inviteimg/my05_icon.png" alt="图片">
              </div>
              <div class="shareBtn right" @click="copyText()">
                  <img src="../img/inviteimg/my04_icon.png" alt="图片">
              </div>
          </div>
        </div>
    </section>
    <section class="myinvite-block" @click="goShareBtn"><p>立即邀请好友</p></section>
    <!--遮罩层Start-->
    <div class="myinvite-maskLayer" v-show="maskShow" @click="maskShow=!maskShow">
      <div class="qcode"><img :src="initObj.qrCode" alt="二维码" ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maskShow: false,
      initObj: {}
    };
  },
  methods: {
    //邀请记录埋点
    recordBtnEvet() {
      if (typeof MtaH5 != "undefined") {
        MtaH5.clickStat("op_inv_rec");
      }
    },
    //我的抵用券
    lotteryBtnEvet() {
      if (typeof MtaH5 !== "undefined") MtaH5.clickStat("op_inv_voucher");
    },
    //面对面邀请
    qcodeBtnEvent() {
      if (typeof MtaH5 != "undefined") {
        MtaH5.clickStat("op_inv_inviteimg");
      }
      if(this.initObj.qrCode){
        this.maskShow = true;
      }else{
        this.$toast('获取二维码失败，请重新进入')
      }
    },
    //复制浏览器连接
    copyText() {
      if (typeof MtaH5 != "undefined") {
        MtaH5.clickStat("op_inv_invitecode");
      }
      if (typeof CustomJS != "undefined") {
        try {
          CustomJS.copy(this.initObj.url);
        } catch (err) {}
      } else {
        this.$toast('请下载app')
      }
    },
    //去分享
    goShareBtn() {
      if (typeof MtaH5 != "undefined") {
        MtaH5.clickStat("op_inv_invite");
      }
      if (typeof CustomJS != "undefined") {
        try {
          var shareTitle = "保世界，为保险人而生";
          var linkUrl = this.initObj.url;
          var shareImgUrl =window.$baseUrl+"/crowdsource/apph5/myinvite/img/shareIcon.png";
          var center = this.initObj.name + "邀请你加入保世界，并送你和他一样的团队权益，更有免费定制个性化工作台的机会在等你!";
          var shareContent = "";
          if (center > 23) {
            shareContent = center.substring(23) + "...";
          } else {
            shareContent = center;
          };
          if(this.initObj.url){
            CustomJS.share('{"title":"' + shareTitle + '","content": "' + shareContent + '","imgUrl":"' + shareImgUrl + '","shortlink":"' + linkUrl + '","platfrom":""}');
          }
        } catch(err){}
      } else {
        this.$toast('请下载app')
      }
    },
    //请求数据
    gotoRequireData() {
      this.$axios
      .post("/api/activity/activity/invite")
      .then(resp => {
        let _data = resp.data;
        if (typeof _data != "undefined" && _data.code == "0") {
          this.initObj = _data.data;
        }
      });
    }
  },
  created() {
    this.gotoRequireData();
    document.body.style.backgroundColor="#529cfe";
  },
  destroyed () {
    document.body.style.backgroundColor="";
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/pxToRem.scss";
.arrow-right{
  position: relative;
  padding-right: 14px;
  &:after{
   content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #fff;
    border-style: solid;
    -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
    transform: matrix(.71,.71,-.71,.71,0,0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 2px;
  }
}
.arrow-left{
   position: relative;
  padding-left: 14px;
  &:before{
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #fff;
    border-style: solid;
    -webkit-transform: matrix(-.71,.71,.71,.71,0,0);
    transform: matrix(-.71,.71,.71,.71,0,0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    left: 2px;
  }
}
.myinvite-wrap {
  width: 100%;
  height: 100%;
  // position: absolute;
  // z-index: 1;
  // top:0;
  // left: 0;
  // right: 0;
  // min-height: pxToRem(1334px);
  margin: 0 auto;
  background: rgba(82, 156, 254, 1);
  // padding-bottom: pxToRem(120px);
  .invite-top {
    // width: pxToRem(136px);
    height: pxToRem(44px);
    line-height: pxToRem(44px);
    color: #3d84f8;
    box-sizing: border-box;
    padding-left: pxToRem(16px);
    font-size: pxToRem(24px);
    position: absolute;
    right: 0;
    top: pxToRem(34px);
    background: #deebff;
    border-radius: 13px 0px 0px 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:after{
      border-color: #7195d0;
       right: 5px;
       border-width: 1px 1px 0 0;
    }
    // &::after {
    //   content: "";
    //   position: absolute;
    //   top: 50%;
    //   margin-top: -3.5px;
    //   width: 7px;
    //   height: 7px;
    //   border-top: 1px solid #3d84f8;
    //   border-right: 1px solid #3d84f8;
    //   transform: rotate(45deg);
    //   -webkit-transform: rotate(45deg);
    // }
  }
  .invite-title {
    width: 100%;
    img {
      width: 100%;
    }
    .bg_title {
      width: 100%;
      height: pxToRem(432px);
      position: absolute;
      top: pxToRem(245px);
      left: 0;
      z-index: 2;
    }
    .tel {
      font-size: pxToRem(37px);
      color: #fff;
      text-align: center;
      font-weight: bold;
      position: absolute;
      top: pxToRem(420px);
      left: pxToRem(210px);
      z-index: 3;
    }
    .myinvite-show {
      font-size: pxToRem(32px);
      color: #fff6e6;
      text-align: center;
      font-weight: bold;
      position: absolute;
      top: pxToRem(470px);
      left: pxToRem(224px);
      z-index: 3;
    }
  }
  .myinvite-center {
    padding: 0 pxToRem(30px);
    margin-top: pxToRem(216px);
    // margin-bottom: pxToRem(100px);
    .font {
      width: 100%;
      text-align: center;
      font-size: pxToRem(24px);
      line-height: pxToRem(52px);
      display: flex;
      flex-direction: column;
      align-items: center;
      .font_1 {
        font-size: pxToRem(30px);
        color: #fff;
      }
      .font_2 {
        font-size: pxToRem(24px);
        color: #fff;
      }
      .font_3 {
        width: pxToRem(238px);
        height: pxToRem(58px);
        line-height: pxToRem(58px);
        background: url("../img/inviteimg/my08_icon.png") no-repeat;
        background-size: 100%;
        font-size: pxToRem(30px);
        color: #fff;
        margin-top: pxToRem(10px);
      }
    }
    .btnList {
      width: 100%;
      margin-top: pxToRem(23px);
      // margin-top: pxToRem(43px);
      .btnCenter {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .left {
          width: pxToRem(240px);
          height: pxToRem(241px);
          margin-right: pxToRem(45px);
        }
        .right {
          width: pxToRem(255px);
          height: pxToRem(243px);
        }
        .shareBtn img {
          width: 100%;
        }
      }
    }
  }
  .myinvite-block {
    // position: fixed;
    // bottom: 0;
    width: 100%;
    display: flex;
    margin-top: pxToRem(26px);
    margin-bottom:pxToRem(36px);
    p {
      display: inline-block;
      color: #fff;
      width: 92%;
      text-align: center;
      font-size: pxToRem(31px);
      background: #ff5a69;
      border-radius: 5px;
      height: pxToRem(80px);
      line-height: pxToRem(80px);
      margin: 0 auto;
    }
  }
  .myinvite-maskLayer {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    // opacity: 0.8;
    // -moz-opacity: 0.8;
    // filter: alpha(opacity=80);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
    .qcode {
      position: fixed;
      width: pxToRem(394px);
      height: pxToRem(394px);
      top: 50%;
      left: 0;
      right: 0;
      margin:0 auto;
      transform: translateY(-50%);
      z-index: 9999;
      background-color: #fff;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
