<template>
<div  >
<header-back title="爱心公益" ></header-back>
<div class="od-content" v-scroll>
  <div style="height: 2.472rem;"></div>
  <div class="gy_banner">
    <div class="hd">
      <p class="tit">总捐赠善款</p>
      <p class="pricebox"><span class="price">9000000</span>元</p>
    </div>
    <div class="navbox">
      <ul class="flexcenter">
        <li>
          <span class="tit">个人捐款</span>
          <p class="pricebox"><span class="price">1000000</span>元</p>
        </li>
        <li>
          <span class="tit">学校捐款</span>
          <p class="pricebox"><span class="price">3000000</span>元</p>
        </li>
        <li>
          <span class="tit">企业捐款</span>
          <p class="pricebox"><span class="price">5000000</span>元</p>
        </li>
      </ul>
    </div>
  </div>
  <div class="flex_access flex_cell gyList">
    <a class="flexcenter" href="commonweal-sort.html">
      <div class="flex_hd">
        <img src="/static/img/commonweal/icon_paihang.png" alt="爱心捐赠排行榜">
      </div>
      <h2 class="flex_bd">爱心捐赠排行榜（前20名）</h2>
      <span class="flex__ft"></span>
    </a>
  </div>
  <div class="flex_access flex_cell gyList">
    <a class="flexcenter"  href="commonweal-record.html">
      <div class="flex_hd">
        <img src="/static/img/commonweal/icon_jilu.png" alt="爱心捐赠记录">
      </div>
      <h2 class="flex_bd">爱心捐赠记录</h2>
      <span class="flex__ft"></span>
    </a>
  </div>
  <div class="gyContent">
    <ul class="navbar flexcenter">
      <li>
        <a href="javascript:;" class="tabitem active">爱书公益介绍</a>
      </li>
      <li>
        <a href="commonweal-news-list.html" class="tabitem">最新动态</a>
      </li>
    </ul>
    <div class="tab-bd">
      <div class="tab-bd_item">
        <div class="details">
          <div class="logobox">
            <img src="/static/img/commonweal/gy_logo.png" class="gy_logo">
          </div>
          <p style="text-indent: 2em;">爱书公益是珠海市慈善总会与珠海北师大附小五年级学生贾贾发起，于2018年6月创立以共享图书为主题的公益基金，爱书基金以"共享书籍，以书为媒，结交朋友，传递爱心"为愿景，搭建专业透明的图书共享公益平台，专注于共享图书捐赠与图书运输快递费用支付、贫困儿童的关怀与发展、公益支持与创新三大领域，致力于成为中国图书公益的开拓者、创新者和推动者。</p>
   <p style="margin:5px 0"><img src="/static/img/commonweal/LOGO1.jpg" ></p>
          <p style="text-indent: 2em;">2008年10月，为了保证公益项目更高效地实施，在中国红十字总会、上海市民政局等多方管理机构的指导和支持下，上海李连杰壹基金公益基金会以非公募基金会的形式注册成立。作为"中国红十字会李连杰壹基金计划"的执行机构，上海李连杰壹基金公益基金会严格按照《基金会管理条例》开展各项业务活动，向"中国红十字会李连杰壹基金计划"进行专项的汇报与结算，并接受年度审计。</p>
          <div class="zhubanbox">
            <P class="item">
              <span>主办单位：</span>
              <span class="flex_bd">珠海市慈善总会•爱书公益基金</span>
            </P>
            <P class="item">
              <span>赞助单位：</span>
              <span class="flex_bd"> 珠海市孝爱科技有限公司<br/>
              珠海市横琴住娘家酒店管理有限公司<br/>
              珠海市北师大附小<br/>
              珠海市旭日华府房地产投资有限公司
                             </span>
            </P>
          </div>
        </div>
      </div>
      <div class="tab-bd_item" style="display: none;"></div>
    </div>
  </div>
  <div class="footerfix"></div>
  <footer class="tabbar">
    <div class="tabbar_bd">
      <router-link :to="'/commonweal/donation'" class="myMoney" title="我要捐款" >我要捐款</router-link>
      <a href="javascript:;" onclick="$('#share').show()" class="friendMoney" title="邀请朋友一起捐款">邀请朋友一起捐款</a>
    </div>
  </footer>
  <!--share start-->
  <div id="share" style="display:none;">
    <div class="shareCancel" onclick="$('#share').hide()">取消</div>
    <div class="shareArrow"></div>
    <div class="content-share">
      <div><div class="shareDes">点击右上角分享</div><div class="shareIcon" style="background-image:url(/static/img/shareIcon_1.png);"></div></div>
    </div>
  </div>
  <!--share end-->
</div>
</div>
</template>
<style scoped >
@import '../../../static/css/commonweal/commonweal.css';
</style>
<script>
import HeaderBack from '../../components/headerBack'
export default {
    components:{
        HeaderBack
    }
}
</script>

