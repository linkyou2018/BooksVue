<template>
  <div class="header" style="background-color: transparent;" v-if="showBar">
    	<div class="header-bar">
   	  <div class="header-bar-cover"></div>
        <div class="header-bar-table">
            <div class="header-bar-cell left" @click="showHeaderBar()"></div>
            <div class="header-bar-cell center">
                <div>一米看书 1元借书<br/><span class="font-size-22">图书24小时送达</span></div>
            </div>
            <div class="header-bar-cell right font-size-30">
                <a href="page/vip/app-qr.html">关注公众号</a>
            </div>
        </div>
    	</div>
  </div>
</template>
<script>
export default {
  name: "header-bar",
  data() {
    return {
      showBar:false ,
    };
  }
};
</script>
