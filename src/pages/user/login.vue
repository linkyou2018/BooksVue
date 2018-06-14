<template>
    <div  class="login" >
        <div class="header">
            <div class="header-bg">
                <a @click="$router.go(-1)" href="javascript:void(0)" class="back">
                    <i class="arrow arrow-left"></i>
                </a>
            </div>
        </div>
        <div class="login-tips">欢迎来到一米少儿英语!</div>
        <div class="login-form">
            <div class="login-form-li font-size-34"> 手机号码
                <input id="tel" type="tel" maxlength="15" placeholder="请输入" class="login-input font-size-34">
            </div>
            <div class="login-form-li font-size-34"> 验证码
                <input id="code" type="tel" maxlength="6" placeholder="请输入" class="login-input font-size-34">
                <span class="login-code font-size-30">获取验证码</span>
            </div>
            <div class="login-error font-size-24" style="display: none;"></div>
        </div>
        <div class="bd-content-button font-size-34">
            <div>登录</div>
        </div>
        <div class="login-bottom font-size-24">注册表明您同意
            <a href="#">一米书屋用户协议</a>
        </div>
    </div>
</template>
<style scoped>
@import "../../../static/css/user/login.css";
</style>
<script>
export default {
    name:'login',
    created(){

       //sessionStorage.setItem("code","")
      var code= this.$route.query.code;
      if(code==undefined)
      {
        var url = encodeURIComponent(window.location.href);
        var appid="wx6d20bd01d7c0c730";
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid +
        '&redirect_uri=' + url + '&response_type=code&scope=snsapi_base&state=#wechat_redirect';
      }
      else{
        this.$store.dispatch({
          type: 'getOpenId',
          code:code
        })
        
      }
      console.log(code);
        // this.$store.commit({
		// 	type:"setIsFoot",
		// 	value:false
		// })
    }
}
</script>


