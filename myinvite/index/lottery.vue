<!--我的抵用券 css前缀统一用lottery-->

<template>
  <div class="lottery-wrap">
    <section v-if="list.length>0?true:false" class="lottery-top">
      <div class="lottery-title">
        <router-link tag="span" to="/couponsInfo" class="lottery-right">如果使用?</router-link>
      </div>
      <div class="lottery-item" v-for="(item,index) in list" :key="index" >
        <div class="item-title">工作台定制服务抵用券</div>
        <div class="item-font1">抵用券编号：<span>{{item.ic_sn}}</span></div>
        <div class="item-font2">有效期：<span>{{handleTime(item.ic_startTime)}}-{{handleTime(item.ic_endTime)}}</span></div>
      </div>
    </section>
    <section class="lottery-empty" v-else>
      <img src="../img/inviteimg/my09_icon.png" alt="">
      <p>暂无抵用券</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    //处理时间
    handleTime(time) {
      if (time) {
        let preTime = time.split(" ")[0];
        return preTime.replace(/\-/g, ".");
      }
    },
    //获取数据
    getRequestData() {
      this.$axios
        .post("/api/activity/activity/inviteCard", { page: 1, pagenum: 999 })
        .then(resp => {
          let _data = resp.data;
          if (typeof _data != "undefined" && _data.code == "0" && _data.data instanceof Array && _data.data.length > 0) {
            this.list = _data.data;
          }else{
            document.body.style.backgroundColor="#ffffff"
          }
        });
    }
  },
  created() {
    this.getRequestData();
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/pxToRem.scss";
body {
  background: #f5f5f5;
}
.lottery-wrap {
  height: 100%;
  background: #f5f5f5;
  padding: 0 pxToRem(20px);
  .lottery-title {
    width: 100%;
    height: pxToRem(100px);
    line-height: pxToRem(100px);
    font-size: pxToRem(24px);
    color: #36adff;
    .lottery-right {
      float: right;
    }
  }
  .lottery-item {
    width: 100%;
    height: pxToRem(243px);
    background: url("../img/itemBg.png") no-repeat center;
    background-size: cover;
    color: #959595;
    font-size: pxToRem(20px);
    box-sizing: border-box;
    padding: pxToRem(34px) 0;
    margin-top: pxToRem(20px);
    .item-title {
      font-size: pxToRem(45px);
      color: #ea2d49;
      margin-left: pxToRem(140px);
      font-weight: bold;
    }
    .item-font1 {
      margin: pxToRem(20px) 0 0 pxToRem(140px);
    }
    .item-font2 {
      margin: pxToRem(20px) 0 0 pxToRem(140px);
    }
  }
  .lottery-empty{
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    width: 100%;
    text-align: center;
    color:#959595;
    font-size:pxToRem(30px);
  }
  .lottery-empty img {
    width: pxToRem(290px);
    height: pxToRem(202px);
    margin: 0 auto;
    padding-bottom: pxToRem(37px);
    display: block;
    
  }
}
</style>