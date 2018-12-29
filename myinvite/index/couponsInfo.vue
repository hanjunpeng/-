<!--抵用券使用规则页面-->
<template>
  <div class="couponsinfo-wrap">
    <h4>1、抵用券是什么？</h4>
    <p>抵用券是保世界赠送的免费定制或者使用工作台权益的电子抵用券。每张抵用券只有一次免费使用的机会，不能重复使用，不能转让，不得兑换。</p>
    <h4>2、抵用券如何使用？</h4>
    <p>您将添加保世界客服了解抵用券的使用方法。</p>
    <h4>3、抵用券的有效期为多长？</h4>
    <p>本活动赠送的抵用券有效期为6个月，从充入账户之日起计算，过期不得使用。</p>
    <h4>4、抵用券兑换的免费工作台能用多久？</h4>
    <p>本活动抵用券兑换的免费定制工作台体验时间为30天，从添加之日起计算。</p>
    <h4>5、违规说明</h4>
    <p>在邀请和获取抵用券的过程中，如存在违规行为（包括不限于利用系统漏洞、非真实设备等非正常方式），保世界将取消用户的获奖资格，并有权从该违规用户的账户中收回因本活动获得的抵用券等奖励，以及停止违规用户账户的因本活动获得的免费工作台的使用权。</p>
    <h4>6、本次活动最终解释权归保世界所有</h4>
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
.couponsinfo-wrap {
  height: 100%;
  padding: 0 pxToRem(30px);
  p {
    font-size: pxToRem(26px);
    color: #9e9e9e;
    line-height: pxToRem(41px);
    margin:pxToRem(26px) 0;
  }
  h4 {
    color: #03a9f4;
    margin: pxToRem(20px) 0;
  }
}
</style>

