<!--
  Im历史记录
  imHistory 代替 imHistoryData
-->
<template>
  <div class="imHistory">
    <mt-loadmore ref="loadmore" :top-method="loadTop" @top-status-change="handleTopChange" @translate-change="translateChange" v-if="$isZhongchuang">
      <ul>
        <div class="imHistory-type" v-if="!tips">无历史消息</div>
        <li v-for="item in subList" class="imHistory-li" ref="imHistoryLi">
          <div class="imHistory-timebox"><div class="imHistory-time" v-if="getTimeNum(item.date)">{{getTimeNum(item.date)}}</div></div>
          <div class="imHistory-box imHistoryFlex" v-if="item.fromAccount == id">
            <div class="imHistory-pic imHistory-picright"><img :src="item.avatar"></div>
            <div class="imHistory-right">
              <div class="imHistory-nickname imHistory-nameright">{{getTimeMouse(item.date)}} {{item.nickname}}</div>
              <div class="imHistory-content imHistory-contentright">{{item.body}}</div>
            </div>
          </div>
          <div class="imHistory-box" v-else>
            <div class="imHistory-pic imHistory-picleft"><img :src="item.avatar"></div>
            <div class="imHistory-right">
              <div class="imHistory-nickname imHistory-nameleft">{{item.nickname}} {{getTimeMouse(item.date)}}</div>
              <div class="imHistory-content imHistory-contentleft">{{item.body}}</div>
            </div>
          </div>
        </li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">加载更多</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
    </mt-loadmore>
    <div v-else>
      <ul>
        <div class="imHistory-tips" @click="loginData" v-if="tips">查看更多历史消息</div>
        <div class="imHistory-type" v-else>无历史消息</div>
        <li v-for="(item,index) in subList" :key="index" class="imHistory-li" ref="imHistoryLi">
          <div class="imHistory-timebox"><div class="imHistory-time" v-if="getTimeNum(item.date)">{{getTimeNum(item.date)}}</div></div>
          <div class="imHistory-box imHistoryFlex" v-if="item.fromAccount == id">
            <div class="imHistory-pic imHistory-picright"><img :src="item.avatar"></div>
            <div class="imHistory-right">
              <div class="imHistory-nickname imHistory-nameright">{{getTimeMouse(item.date)}} {{item.nickname}}</div>
              <div class="imHistory-content imHistory-contentright">{{item.body}}</div>
            </div>
          </div>
          <div class="imHistory-box" v-else>
            <div class="imHistory-pic imHistory-picleft"><img :src="item.avatar"></div>
            <div class="imHistory-right">
              <div class="imHistory-nickname imHistory-nameleft">{{item.nickname}} {{getTimeMouse(item.date)}}</div>
              <div class="imHistory-content imHistory-contentleft">{{item.body}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Loadmore } from 'mint-ui';
import { setInterval, setTimeout } from 'timers';
import { Indicator } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
export default {
  data () {
    return {
      topStatus: '',
      list: [],
      subList: [],
      id: '',
      search: {},
      flag: false,
      sessionId: '',
      type: '',
      tips: true,
      middle: '',
      str: ''
    }
  },
  methods: {
    getTimeMouse(num) {
      if(num && num !="" && num !="undefined") {
        let ary = num.split(' ')
        let minutes
        if(ary.length > 1) {
          minutes = ary[1].split(":")
        } else {
          minutes = ary[0].split(":")
        }
        return `${minutes[0]}:${minutes[1]}`
      }
    },
    getTimeNum(num) {
      if(num && num !="" && num !="undefined") {
        let ary = num.split(' ')
        if(ary.length > 1) {
          return ary[0]
        }
      }
    },
    loadTop () {
      this.flag = true
      Indicator.open()
      this.search.page = this.search.page+1
      this.getData(this.search, this.flag)
      this.$refs.loadmore.onTopLoaded() // 这是因为在加载数据后需要对组件进行一些重新定位的操作。
    },
    handleTopChange (status) {
      this.topStatus = status;
    },
    translateChange(translate) {
      // console.log(translate)
    },
    loginData () {
      this.flag = true
      Indicator.open()
      this.search.page = this.search.page+1
      this.getData(this.search, this.flag)
    },
    getData (search, flag) {
      this.$axios.post('/app/im/getRecord', {'sessionId': this.sessionId, 'type': this.type, ...search})
      .then(res => {
        const _data = res.data;
        if(_data.code === 0) {
          if(_data.data.length === 0) { this.$toast('没有数据了'); this.tips = false;  Indicator.close(); return }
          Indicator.close()
          if(flag) {
            this.list = _data.data.reverse().concat(this.list)
          } else {
            this.list = _data.data.reverse()
          }
          for(let i=0; i<this.list.length; i++) {
            let k = this.list[i]
            if(k.date && k.date !="" && k.date !="undefined") {
              let ksplit = k.date.split(' ')
              let thisTime = ksplit[0]
              if(thisTime == this.str) {
                k.date = ksplit[1]
              }
              this.str = thisTime
            }
          }
          this.subList = this.list
        } else {
          this.$toast('请求失败')
        }
      })
    }
  },
  created() {
    this.sessionId = window.sessionId
    this.type = window.type
    this.id = window.idname || sessionStorage.getItem('userId')
    this.search.page = 1
    this.getData(this.search)
    document.body.style.backgroundColor="#F5F5F5";
  },
  destroyed () {
    document.body.style.backgroundColor="";
  }
}
</script>

<style lang="scss">
@import "../../../common/pxToRem.scss";
.imHistory{
  width: auto;
  height: 100%;
  padding: 20px 15px;
  .imHistory-tips{
    width: 100%;
    text-align: center;
    color: #20A0FF;
  }
  .imHistory-timebox{
    width: 100%;
    text-align: center;
    overflow: hidden;
  }
  .imHistory-time{
    display: inline-block;
    border-radius: 5px;
    margin-bottom: 10px;
    color: #ffffff;
    background: #C5C5C5;
    font-size: 12px;
    padding: 5px 6px;
  }
  .imHistory-li{
    // overflow: -webkit-paged-y;
    // overflow: -webkit-paged-y;
    overflow: hidden;
    margin-top: 20px;
  }
  .imHistory-right{
    max-width: 100%;
  }
  .imHistoryFlex{
    // flex-direction: row-reverse;
  }
  .imHistory-type{
    color: #999;
    width: 100%;
    text-align: center;
  }
  .imHistory-box{
    overflow: initial;
    position: relative;
    .imHistory-pic{
      img{
        width: 42px;
        height: 42px;
        border-radius: 100%;
      }
    }
    .imHistory-picleft{
      position: absolute;
      left: 0;
      top: 0;
    }
    .imHistory-picright{
      position: absolute;
      right: 0;
      top: 0;
    }
    .imHistory-nickname{
      font-size: 12px;
      color: #959595;
      
    }
    .imHistory-nameleft{
      position: absolute;
      top: 0;
      left: 52px;
    }
    .imHistory-nameright{
      position: absolute;
      top: 0;
      right: 52px;
    }
    .imHistory-content{
      word-wrap: break-word;
      border-radius: 4px;
      padding: 11px 13px;
      background: #ffffff;
      color: #333333;
      max-width: 70%;
      font-size: 14px;
      display: block;
    }
    .imHistory-contentleft{
      float: left;
      margin-top: 30px;
      margin-left: 45px;
      // position: absolute;
      // top: 25px;
      // left: 52px;
    }
    .imHistory-contentright{
      // position: absolute;
      // top: 25px;
      // right: 52px;
      float: right;
      margin-top: 30px;
      margin-right: 45px;
      background: #20A0FF;
      color: #ffffff;
    }
  }
}
</style>
