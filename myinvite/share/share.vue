
<template>
  <div class="share-wrap">
    <img class="bg" src="../img/inviteimg/my03_icon.png">
    <section class="card">
      <img  src="../img/inviteimg/my07_icon_1.png">
      <p class="from-name"><i>来自</i><b>"{{uName && uName.length>lens? uName.substring(0,lens)+'...':uName}}"</b><i>邀请</i></p>
    </section>
    <section class="input-wrap">
      <div class="user-input">
        <p><em>手机号</em><input type="number" v-model="phone"></p>
      </div>
      <div class="user-input">
        <p><em>验证码</em><input type="number" v-model="captcha"></p>
        <section :class="['send-btn',isSending?'sending':'']" @click="handleSendCode" ><i v-if="isSending">{{leftTime}}</i><i>{{sendTxt}}</i></section></div>
      <p class="tips">{{tips}}</p>
    </section>
    <div class="submit" @click="submitNext">下一步</div>
     <img class="bg" src="../img/inviteimg/my06_icon.png">
  </div>
</template>
<script>
import {getUrlArgs} from "../../../common/utils.js"
export default {
  data(){
    return {
      uName:window.$name||"保世界",
     isSending:false,
     leftTime:60,
     timer:null,
      code:this.getQueryString("code"),
      phone:"",
      captcha:"",
      tips:""
    }
  },
  computed:{
    sendTxt(){
         return this.isSending?"秒后发送":"获取验证码"
    },
    lens(){
      let _w=window.innerWidth;
      return _w>390?14:_w>340?12:10;
    }
  },
  watch:{
    phone(val){
      this.phone=val.replace(/[^\d]/g,'')
    },
    captcha(val){
      this.captcha=val.replace(/[^\d]/g,'')
    }
  },
  methods:{
    getQueryString(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            return  (r!=null?unescape(r[2]):null); 
   },
   //发送验证码倒计时
   setLeftTime(){
     this.timer=setInterval(()=>{
        this.leftTime--;
        if(this.leftTime==0){
          this.isSending=false;
          this.leftTime=60;
          clearInterval(this.timer)
        }
     },1000)
   },
   checkPhoneNumber(){
    if(!(/^1[3456789]\d{9}$/.test(this.phone))){
          this.tips=("请输入正确的手机号！")
          return false;
    }
    return true;
  },
   handleSendCode(){
     if(!this.checkPhoneNumber()) return;
     if(this.isSending) return;
     this.$axios.post("/api/user/sms/send",{
      phone:this.phone,
      usage:6
     }).then((res)=>{
       this.tips="";
      const _data=res.data;
       if(_data.code==0){
           this.setLeftTime();
           this.isSending=true;
           this.$toast("发送成功，请注意查收")
       }else{
         this.$toast(_data.message)
       }
     })
   },
   submitNext(){
     if(!this.checkPhoneNumber()){
          return;
     }
     if(this.captcha.replace(/\s+/,'')==""){
        this.tips=("请输入验证码")
        return;
     }
     this.$axios.post("/api/activity/activity/inviteRegister",{
         phone:this.phone,
         captcha:this.captcha,
         code:this.code
       }).then((res)=>{
        const _data=res.data;
        if(_data.code==0){
            this.$toast(_data.message)
             setTimeout(()=> {
               window.location.href=window.$zhongchuang_url+"/html/myinvite/index?#/guid";
           },2000)
        }else{
           this.$toast(_data.message)
        }
       })
   }
  }
}
</script>
<style lang="scss">
@import '../../../common/reset.css';
@import '../../../common/pxToRem.scss';
.share-wrap{
background-color: #529cfe;
position: relative;
padding-bottom:pxToRem(40px); 
.bg{
  width: 100%
}

.card{
  position: absolute;
  top:pxToRem(257px);
  margin: 0 auto;
  left:0;
  img{
    width: 100%;
    display: block;

  }
  .from-name{
    position: absolute;
    top:pxToRem(135px);
     width: pxToRem(580px); 
     left: 0;
     right: 0;
  margin:0 auto;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  i{
     font-size: 16px;
     color: #ce8e13;
  }
  b{
    color: #3d8af5;
    font-size: 16px;
  }
  }
}
.input-wrap{
  margin-top: pxToRem(240px); 
}
.tips{
  line-height: 14px;
  height: 14px;
  color: #fff;
  padding-left:pxToRem(68px); 
  font-size: 12px; 
}
.user-input{
  height:pxToRem(92px);
  border-radius: pxToRem(92px);
  padding-left: pxToRem(30px); 
  width:pxToRem(670px); 
  margin:0 auto;
  margin-bottom: pxToRem(30px); 
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  p{
    color: #9099a6;
    font-size: 14px;
    em{
     padding-right: 5px;
    }
  }
  input{
     height:pxToRem(88px);
     line-height:pxToRem(88px); 
     width: pxToRem(370px);
     font-size: 14px;
  }
  &:nth-of-type(2){
    margin-bottom: pxToRem(26px); 
    input{
      width: pxToRem(200px);
    }
  }
  .send-btn{
    height:32px;
    padding: 0 pxToRem(24px);
    background-color:#2679ff;
    text-align: center;
    line-height:32px;  
    color: #fff;
    border-radius: 32px;
    margin-right: pxToRem(14px);
  }
}
.submit{
  height:pxToRem(80px);
  line-height:pxToRem(80px); 
  width:pxToRem(670px); 
  margin:0 auto;
  border-radius: pxToRem(14px); 
  background-color: #ff5a69;
  color: #fff;
  text-align: center;
  margin-bottom: pxToRem(46px); 
  margin-top: pxToRem(46px); 
}
}
</style>


