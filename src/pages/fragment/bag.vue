<template>
    <div class="bag">
        <!-- 头部 -->
        <div class="header">
            <div class="header-bg">
                <!-- 返回按钮 -->
                <a @click="$router.go(-1)" href="javascript:void(0)" class="back">
                    <i class="arrow arrow-left"></i>
                </a>
                <!-- 返回按钮 end -->
                <span class="header-title font-size-34">书包</span>
            </div>
        </div>
        <!-- 头部end -->
        <!-- 列表 -->
        <div v-scroll>
            <div style="height: 2.472rem;"></div>

            <!-- <div class="list-nodata font-size-30" v-show="listData.length <= 0">还没有添加图书<br/>在图书详情页面可以将图书添加到书包<br/>一次借阅多本图书</div> -->

            <div style="height: 3.861rem;"></div>
        </div>
        <!-- 列表end -->

        <div class="bag-footer-button font-size-34">借书</div>
    </div>
</template>
<script>
export default {
  name: 'bag',
  data() {
    return {
      duration: 0,
      transform: 0,
      sliderOpen: false,
      sliderIndex: 0,
      sliderOpenX: Math.ceil(document.body.clientWidth * 0.24),
      sliderOpenY: '8.5rem',
      listData: [
        {
          mode: 'scaleToFill',
          text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
        }
      ], //本地测试数据
      chechedData: [],
      openid: '',
      footerHeight: 0,
      footerBottom: 0,
      footerShow: false,
      pageIndex: 0,
      pageSize: 10,
      noMore: false,
      loading: false
    }
  },
  created() {
    this.$store.commit({
      type: 'setIsFoot',
      value: false
    })
  }
}
</script>
<style scoped>
@import '../../../static/css/bag/bag.css';
</style>
