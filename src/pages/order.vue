<template>
    <div id="order">
        <!-- 头部 -->
  <div class="header">
    <div class="header-bg">
      <!-- 返回按钮 -->
      <a href="javascript:void(0)" @click="$router.go(-1)" class="back">
        <i class="arrow arrow-left"></i>
      </a>
      <!-- 返回按钮 end -->
      
      <span class="header-title font-size-34">我的订单</span>
    </div>
    <div class="od-tabel font-size-32">
      <div>
        <div class="od-tabel-cell od-tabel-cell-active">全部</div>
        <div class="od-tabel-cell">待处理</div>
        <div class="od-tabel-cell">传递中</div>
        <div class="od-tabel-cell">已完成</div>
      </div>
    </div>
  </div>
  <!-- 头部end -->
        <div class="od-content" v-scroll>
            <div style="height: 5.5rem;"></div>
            <!-- <div class="od-tips font-size-24"><img src="../../img/vip/vip-icon-04.png"/>&nbsp;所借图书必须一次性归还后，才能进行下一次借阅</div> -->
            <div class="od-main">
                <!--全部 start-->
                <div class="tab-content" style="display: block;">
                    <div class="weui-panel font-size-30">
                        <div class="weui-panel_hd weui-cell">
                            <p class="weui-cell__bd">订单编号：20180522125841</p>
                            <span class="grey">已完成</span>
                        </div>
                        <a href="javascript:void(0);" class="weui-cell weui-cell_access">
                            <div class="weui-cell__bd">图书名称：《一片叶子》《我的祖国》《华夏文明》《法神传说》《她的世界》</div>
                            <span class="weui-cell__ft"></span>
                        </a>
                    </div>
                    <!--list end-->
                    <div class="weui-panel font-size-30">
                        <div class="weui-panel_hd weui-cell">
                            <p class="weui-cell__bd">订单编号：20180522125841</p>
                            <span class="hlight">传递中</span>
                        </div>
                        <a href="javascript:void(0);" class="weui-cell weui-cell_access">
                            <div class="weui-cell__bd">图书名称：《一片叶子》《我的祖国》《华夏文明》《法神传说》《她的世界》</div>
                            <span class="weui-cell__ft"></span>
                        </a>
                    </div>
                    <!--list end-->
                    <div class="weui-panel font-size-30">
                        <div class="weui-panel_hd weui-cell">
                            <p class="weui-cell__bd">订单编号：20180522125841</p>
                            <span class="hlight">待处理</span>
                        </div>
                        <a href="javascript:void(0);" class="weui-cell weui-cell_access">
                            <div class="weui-cell__bd">图书名称：《一片叶子》《我的祖国》</div>
                            <span class="weui-cell__ft"></span>
                        </a>
                    </div>
                    <!--list end-->
                </div>
                <!--全部 end-->
                <!--待处理 start-->
                <div class="tab-content">
                    <div class="weui-panel font-size-30">
                        <div class="weui-panel_hd weui-cell">
                            <p class="weui-cell__bd">订单编号：20180522125841</p>
                            <span class="hlight">待处理</span>
                        </div>
                        <div class="weui-cell weui-cell_access">
                            <p>数量：
                                <span class="hlight">2本</span>
                            </p>
                        </div>
                    </div>
                    <div class="weui-panel font-size-30">
                        <div class="weui-cell weui-cell_access">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" src="http://onemeter.b0.upaiyun.com/omms/isbn/1500520347242_9787533278878" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <div class="cur-li-name font-size-34">金老爷买钟</div>
                                <div class="cur-li-author font-size-28">作者:（美）哈群斯 编绘，陈太阳 译</div>
                                <div class="font-size-24 dcl_details">
                                    <p>
                                        <span class="green">王志强</span> 需要此书，请尽快邮寄给对方。</p>
                                    <p>手机号
                                        <span class="hlight">136-3254-1897</span>&nbsp;&nbsp;&nbsp;&nbsp;邮编：
                                        <span class="hlight">519000</span>
                                    </p>
                                    <p>地址：
                                        <span class="hlight">广东省珠海市斗门区白蕉路日富大厦三楼</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_access">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" src="http://onemeter.b0.upaiyun.com/omms/isbn/1499225874571_9787533259372" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <div class="cur-li-name font-size-34">信谊世界精选图画书：山姆和大卫去挖洞</div>
                                <div class="cur-li-author font-size-28">作者:（美）哈群斯 编绘，陈太阳 译</div>
                                <div class="font-size-24 dcl_details">
                                    <p>
                                        <span class="green">王志强</span> 需要此书，请尽快邮寄给对方。</p>
                                    <p>手机号
                                        <span class="hlight">136-3254-1897</span>&nbsp;&nbsp;&nbsp;&nbsp;邮编：
                                        <span class="hlight">519000</span>
                                    </p>
                                    <p>地址：
                                        <span class="hlight">广东省珠海市斗门区白蕉路日富大厦三楼</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--待处理 end-->
                <!--待处理 start-->
                <div class="tab-content">
                    <div class="weui-panel font-size-30">
                        <div class="weui-panel_hd weui-cell">
                            <p class="weui-cell__bd">订单编号：20180522125841</p>
                            <span class="hlight">待处理</span>
                        </div>
                        <div class="weui-cell weui-cell_access">
                            <p>数量：
                                <span class="hlight">2本</span>
                            </p>
                        </div>
                    </div>
                    <div class="weui-panel font-size-30">
                        <div class="weui-cell weui-cell_access">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" src="http://onemeter.b0.upaiyun.com/omms/isbn/1500520347242_9787533278878" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <div class="cur-li-name font-size-34">金老爷买钟</div>
                                <div class="cur-li-author font-size-28">作者:（美）哈群斯 编绘，陈太阳 译</div>
                                <div class="font-size-24 dcl_details">
                                    <p>本书由
                                        <span class="green">王志强</span>把书传递给你</p>
                                    <div class="expressBox">
                                        <a href="javascript:;" class="fullBtn">我已收到</a>
                                        <div class="font-size-26 weui-cell__bd">
                                            <p>快递公司：顺丰快递</p>
                                            <p>快递单号：4005848753</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_access">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" src="http://onemeter.b0.upaiyun.com/omms/isbn/1499251432235_9787533281748" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <div class="cur-li-name font-size-34">金老爷买钟</div>
                                <div class="cur-li-author font-size-28">作者:（美）哈群斯 编绘，陈太阳 译</div>
                                <div class="font-size-24 dcl_details">
                                    <p>本书由
                                        <span class="green">王志强</span>把书传递给你</p>
                                    <div class="expressBox">
                                        <a href="javascript:;" class="fullBtn">我已收到</a>
                                        <div class="font-size-26 weui-cell__bd">
                                            <p>快递公司：顺丰快递</p>
                                            <p>快递单号：4005848753</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--待处理 end-->
                <!--已完成  start-->
                <div class="tab-content">
                    <div class="weui-panel font-size-30">
                        <div class="weui-panel_hd weui-cell">
                            <p class="weui-cell__bd">订单编号：20180522125841</p>
                            <span class="grey">已完成</span>
                        </div>
                        <div class="weui-cell weui-cell_access">
                            <p>数量：
                                <span class="hlight">2本</span>
                            </p>
                        </div>
                    </div>
                    <div class="weui-panel font-size-30">
                        <div class="weui-cell weui-cell_access">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" src="http://onemeter.b0.upaiyun.com/omms/isbn/1500520347242_9787533278878" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <div class="cur-li-name font-size-34">金老爷买钟</div>
                                <div class="cur-li-author font-size-28">作者:（美）哈群斯 编绘，陈太阳 译</div>
                                <div class="font-size-24 dcl_details">
                                    <p>本书由
                                        <span class="green">王志强</span>把书传递给你</p>
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell weui-cell_access">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" src="http://onemeter.b0.upaiyun.com/omms/isbn/1499225874571_9787533259372" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <div class="cur-li-name font-size-34">信谊世界精选图画书：山姆和大卫去挖洞</div>
                                <div class="cur-li-author font-size-28">作者:（美）哈群斯 编绘，陈太阳 译</div>
                                <div class="font-size-24 dcl_details">
                                    <p>本书由
                                        <span class="green">王志强</span>把书传递给你</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--已完成  end-->
            </div>
        </div>
    </div>
</template>
 <style scoped>
@import '../../static/css/order/order.css';
</style>
<script>
import HeaderBack from '../components/headerBack'
export default {
  name: 'order',
  components: {
    HeaderBack
  },
  created() {}
}
</script>

