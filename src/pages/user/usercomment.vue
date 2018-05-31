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
                <span class="header-title font-size-34">我的书评</span>
            </div>
            <div class="od-tabel font-size-32">
                <div>
                    <div class="od-tabel-cell od-tabel-cell-active">已点评</div>
                    <div class="od-tabel-cell">待点评</div>
                </div>
            </div>
        </div>
        <!-- 头部end -->

        <div class="od-content" v-scroll>
            <div style="height: 5.5rem;"></div>
            <!-- <div class="od-tips font-size-24"><img src="/static/img/vip/vip-icon-04.png"/>&nbsp;所借图书必须一次性归还后，才能进行下一次借阅</div> -->
            <div class="od-main">
                <!--全部 start-->
                <div class="tab-content" style="display: block;">
                    <div class="bd-content-comment-list">
                        <ul>
                            <li>
                                <div class="bd-content-comment-right">
                                    <div class="flexcenter">
                                        <img src="http://onemeter.b0.upaiyun.com/omms/isbn/d23dcb50df3a4ab386ccd9adb189fc6e" class="bd-content-comment-left">
                                        <div class="bd-content-comment-name flex_bd font-size-22">
                                            张三&nbsp;<img src="/static/img/bookdetail/bookdetail-star-1.png" class="bd-content-bookdetail-star"><img src="/static/img/bookdetail/bookdetail-star-1.png" class="bd-content-bookdetail-star"><img src="/static/img/bookdetail/bookdetail-star-1.png" class="bd-content-bookdetail-star"><img src="/static/img/bookdetail/bookdetail-star-0.png" class="bd-content-bookdetail-star"><img src="/static/img/bookdetail/bookdetail-star-0.png" class="bd-content-bookdetail-star">
                                        </div>
                                        <span class="bd-content-comment-date font-size-22">2017-07-05</span>
                                    </div>
                                    <div class="bd-content-comment-note bl-sort-intro-text-hide">当当书很好 一直都在当当买书 每次都会买好多 而且当天买隔天就到 只是希望孩子会喜欢上阅读 热爱读书 养成一个好习惯 对孩子的一生都非常受益 这本书也是为了勾起宝宝读书的兴趣才买的 里面的小猩猩非常可爱 细节做的非常好 希望宝宝也会喜欢</div>
                                    <div class="bl-sort-intro-button">
                                        <span>展开</span>&nbsp;
                                        <i class="arrow arrow-down"></i>
                                    </div>
                                </div>
                                <div class="shujiContent">
                                    <a href="javascript:;">
                                        <div class="bookslist-left">
                                            <img src="http://onemeter.b0.upaiyun.com/omms/isbn/1500352960405_9787020072163"></div>
                                        <div class="bookslist-right">
                                            <div class="cur-li-name font-size-34">围城</div>
                                            <div class="cur-li-author font-size-24">作者:钱钟书 著</div>
                                            <div class="font-size-24 dcl_details">
                                                <p>本书由
                                                    <span class="green">王志强</span>把书传递给你</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="bd-content-comment-right">
                                    <div class="flexcenter">
                                        <img src="http://onemeter.b0.upaiyun.com/omms/isbn/d23dcb50df3a4ab386ccd9adb189fc6e" class="bd-content-comment-left">
                                        <div class="bd-content-comment-name flex_bd font-size-22">
                                            张三&nbsp;<img src="/static/img/bookdetail/bookdetail-star-1.png" class="bd-content-bookdetail-star"><img src="/static/img/bookdetail/bookdetail-star-1.png" class="bd-content-bookdetail-star"><img src="/static/img/bookdetail/bookdetail-star-1.png" class="bd-content-bookdetail-star"><img src="/static/img/bookdetail/bookdetail-star-0.png" class="bd-content-bookdetail-star"><img src="/static/img/bookdetail/bookdetail-star-0.png" class="bd-content-bookdetail-star">
                                        </div>
                                        <span class="bd-content-comment-date font-size-22">2017-07-05</span>
                                    </div>
                                    <div class="bd-content-comment-note bl-sort-intro-text-hide">当当书很好 一直都在当当买书 每次都会买好多 而且当天买隔天就到 只是希望孩子会喜欢上阅读 热爱读书 养成一个好习惯 对孩子的一生都非常受益 这本书也是为了勾起宝宝读书的兴趣才买的 里面的小猩猩非常可爱 细节做的非常好 希望宝宝也会喜欢</div>
                                    <div class="bl-sort-intro-button">
                                        <span>展开</span>&nbsp;
                                        <i class="arrow arrow-down"></i>
                                    </div>
                                </div>
                                <div class="shujiContent">
                                    <a href="javascript:;">
                                        <div class="bookslist-left"><img src="http://onemeter.b0.upaiyun.com/omms/isbn/1500352960405_9787020072163"></div>
                                        <div class="bookslist-right">
                                            <div class="cur-li-name font-size-34">围城</div>
                                            <div class="cur-li-author font-size-24">作者:钱钟书 著</div>
                                            <div class="font-size-24 dcl_details">
                                                <p>本书由
                                                    <span class="green">王志强</span>把书传递给你</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <!---->
                            <!---->
                            <!---->
                            <!---->
                            <!---->
                        </ul>
                    </div>
                </div>
                <!--全部 end-->
                <!--待处理 start-->
                <div class="tab-content">
                    <div class="bd-content-comment-list">
                        <ul>
                            <li>
                                <div class="shujiContent">
                                    <a href="javascript:;">
                                        <div class="bookslist-left"><img src="http://onemeter.b0.upaiyun.com/omms/isbn/1500520347242_9787533278878"></div>
                                        <div class="bookslist-right">
                                            <div class="cur-li-name font-size-34">金老爷买钟</div>
                                            <div class="cur-li-author font-size-24">作者:（美）哈群斯 编绘，陈太阳 译</div>
                                            <div class="font-size-24 dcl_details">
                                                <p>本书由
                                                    <span class="green">王志强</span>把书传递给你</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div class="addComment font-size-26">
                                    <a href="user-commentAdd.html">评价</a>
                                </div>
                            </li>
                            <li>
                                <div class="shujiContent">
                                    <a href="javascript:;">
                                        <div class="bookslist-left"><img src="http://onemeter.b0.upaiyun.com/omms/isbn/1500520347242_9787533278878"></div>
                                        <div class="bookslist-right">
                                            <div class="cur-li-name font-size-34">金老爷买钟</div>
                                            <div class="cur-li-author font-size-24">作者:（美）哈群斯 编绘，陈太阳 译</div>
                                            <div class="font-size-24 dcl_details">
                                                <p>本书由
                                                    <span class="green">王志强</span>把书传递给你</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div class="addComment font-size-26">
                                    <a href="user-commentAdd.html">评价</a>
                                </div>
                            </li>
                            <!---->
                            <!---->
                            <!---->
                            <!---->
                            <!---->
                        </ul>
                    </div>
                </div>
                <!--待处理 end-->
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
@import '../../../static/css/user/user-comment.css';
</style>
