<template>
  <div class="guid-wrap">
    <div class="h1">如何成为保世界用户</div>
    <div class="font">
        <div class="h2">1、点击下方“马上去注册”按钮下载APP。</div>
        <div class="h2">2、登录APP进行账号注册。</div>
        <div class="h2">3、登录官网创建团队，并成功邀请6名成员。</div>
    </div>
    <div class="h1">PC端创建团队</div>
    <div class="h2 margin-top">打开官方网址：<a class="alink" href="//www.inswindows.com">www.inswindows.com</a> 点击“企业注册”</div>
    <img src="../img/guidBg.jpg" alt="图片">
    <div class="h2 margin-top">更详细的操作说明，可在保世界APP中，我的-学习中心了解</div>
    <a class="input_block" :href="url">下一步</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url:window.$zhongchuang_url + '/html/download/index'
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/pxToRem.scss";
.guid-wrap {
  height: 100%;
  padding: pxToRem(40px) pxToRem(30px);
  .h1{
    font-size:pxToRem(30px);
    color:#353535;
    font-weight:bold
  }
  .font{
    width:100%;
    height:pxToRem(110px);
    margin:pxToRem(30px) 0 pxToRem(54px) 0;
    line-height:pxToRem(42px);
    .h2{
      font-size:pxToRem(24px);
      color:#959595;
    }
  }
  .h2{
    font-size:pxToRem(24px);
    color:#959595;
  }
  .margin-top{
    margin:pxToRem(24px) 0;
    line-height:pxToRem(41px);
    .alink{
      text-decoration:underline;
      color:#551A99;
    }
  }
  .input_block{
    width:100%;
    height: pxToRem(90px);
    line-height:pxToRem(90px);
    text-align:center;
    background:#40b5f6;
    color:#fff;
    font-size:pxToRem(36px);
    margin-top:pxToRem(214px);
    border-radius: 10px;
    margin-bottom:pxToRem(75px);
    display:block;
    text-decoration:none;
  }
}
</style>
