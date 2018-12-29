<template>
  <div class="teaminfo-wrap">
    <h3>有效团队的定义</h3>
    <p>（1）成功入驻保世界的被邀请团队视为有效团队，成功入驻保世界需要同时满足的条件是：</p>
    <p>— 被邀请人注册保世界，并且创建自己的团队。</p>
    <p>— 被邀请团队激活50个及以上新注册保世界的新用户（保世界新用户为该团队进入保世界之后新注册并且进入团队的用户）。</p>
    <p>（2）邀请码从被邀请人绑定之时30天内有效，30天内被邀请团队如果未能成功入驻保世界，则本次邀请失败，可再次邀请。</p>
    <p>（3）在邀请和获取抵用券的过程中，如存在违规行为（包括不限于利用系统漏洞、非真实设备等非正常方式），保世界将取消用户的获奖资格，视为无效团队，并有权从该违规用户的账户中收回因本活动获得的抵用券等奖励，以及停止违规用户账户的因本活动获得的免费工作台的使用权。</p>
    <p>（4）本次活动最终解释权归保世界所有</p>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../../../common/pxToRem.scss';
.teaminfo-wrap {
  height: 100%;
  padding: 0 pxToRem(30px);
  h3 {
    text-align: center;
    color: #03a9f4;
    margin: pxToRem(20px) 0;
  }
  p {
    font-size: pxToRem(26px);
    color: #9e9e9e;
    line-height: pxToRem(41px);
    margin:pxToRem(26px) 0;
  }
}
</style>

