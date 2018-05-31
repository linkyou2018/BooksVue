<template>

<div class="header">
  <div class="header-bg">
    <!-- 返回按钮 -->
    <a href="javascript:void(0)" @click="$router.go(-1)" class="back">
      <i class="arrow arrow-left"></i>
    </a>
    <!-- 返回按钮 end -->
    <span class="header-title font-size-34">{{title}}</span>
  </div>
</div>
</template>

<script>
export default {
    name: "header-back",
    props:["title"]
}
</script>
