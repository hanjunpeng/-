<template>
  <div class="listrecord-wrap">
    <div v-if="empty">
      <section class="listrecord-title">
        <span class="left">已邀请<span>{{list.totalNum}}</span>个团队，有效团队<span>{{list.effectNum}}</span>个</span>
        <router-link tag="span" to="/teamInfo" class="right">什么是有效团队></router-link>
      </section>
      <table class="listrecord-custom">
          <thead>
            <tr>
                <th>我的邀请</th>
                <th>是否注册</th>
                <th>团队成员</th>
                <th>是否有效</th>
            </tr>
          </thead>
          <tr v-for="(item,index) in list.list" :key="index" v-if="list.list.length > 0">
              <td v-text="item.i_phone">183****1111</td>
              <td>
                {{item.i_isRegister==0?'未注册':'已注册'}}
              </td>
              <td><span>{{item.company_num}}</span>人</td>
              <td>
                  <span class="red" v-if="item.i_status == 0">无效</span>
                  <span class="red" v-if="item.i_status == 1">有效</span>
              </td>
          </tr>
      </table>
    </div>
    <div class="listrecord-empty" v-else>
      <img src="../img/inviteimg/my10_icon.png" alt="">
      <p>暂无相关内容</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      empty:true,
      list:[]
    };
  },
  methods: {
    //请求数据
    getRequestData() {
      this.$axios
      .post("/api/activity/activity/inviteRecord",{"pagenum":'999'})
      .then(resp => {
        let _data = resp.data;
        if(typeof(_data) != "undefined" && _data.code == "0"){
          this.list = _data.data;
        }else{
          this.empty = false
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
.listrecord-wrap {
  height: 100%;
  padding: 0 pxToRem(20px);
  table{
    color: #959595;
  }
  .listrecord-title {
    width: 100%;
    height: pxToRem(100px);
    line-height: pxToRem(100px);
    font-size: pxToRem(30px);
    color: #353535;
    .left {
      float: left;
    }
    .right {
      float: right;
      font-size: pxToRem(24px);
      color: #36adff;
    }
  }
  .listrecord-custom {
    width: 100%;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    box-shadow: 0 1px 1px #e5e5e5;
    th:last-child{
      border-radius: 0 6px 0 0;
    }
    tr:last-child td:first-child{
      border-radius: 0 0 0 6px;
    }
    tr:last-child td:last-child{
      border-radius: 0 0 6px 0;
    }
    tr:hover {
      background-color: #fff;
      transition: all 0.1s ease-in-out;
    }
    th {
      border-left: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;
      text-align: left;
      text-align: center;
      background-color: #fff;
      border-top:none;
      line-height: pxToRem(80px);
      height: pxToRem(80px);
    }
    td {
      border-left: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;
      text-align: left;
      text-align: center;
      color: #696486;
      line-height: pxToRem(80px);
      height: pxToRem(80px);
      .red{
        color:#fa533d;
      }
    }
  }
  .listrecord-custom td:first-child, .listrecord-custom th:first-child{
    border-left: none;
  }
  .listrecord-empty{
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
    img{
      width: pxToRem(290px);
      height: pxToRem(237px);
      margin: 0 auto;
      padding-bottom: pxToRem(37px);
      display: block;
    }
  }
}
</style>