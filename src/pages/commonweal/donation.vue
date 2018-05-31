<template>
    <div>

        <!-- 头部 -->
        <div class="header">
            <div class="header-bg">
                <!-- 返回按钮 -->
                <a href="javascript:void(0)" @click="$router.go(-1)" class="back">
                    <i class="arrow arrow-left"></i>
                </a>
                <!-- 返回按钮 end -->
                <span class="header-title font-size-34">捐款</span>
            </div>
        </div>
        <!-- 头部end -->
        <div class="od-content" v-scroll>
            <div style="height: 2.472rem;"></div>
            <div class="chongContent">
                <p class="tit">请选择捐赠金额</p>
                <div class="panel jinepanel">
                    <ul>
                        <li>
                            <a href="javascript:;">50元</a>
                        </li>
                        <li>
                            <a href="javascript:;">100元</a>
                        </li>
                        <li>
                            <a href="javascript:;">200元</a>
                        </li>
                        <li>
                            <a href="javascript:;">500元</a>
                        </li>
                        <li>
                            <a href="javascript:;">1000元</a>
                        </li>
                        <li class="input">
                            <a href="javascript:;"><input class="weui-input" type="number" pattern="[0-9]*" placeholder="其他金额"></a>
                        </li>
                    </ul>
                </div>
                <p class="tit">请选择捐赠方式</p>
                <div class="panel chongStyle">
                    <div class="flexcenter">
                        <div class="flex_hd">
                            <img src="/static/img/commonweal/weixin.png" alt="微信捐赠">
                        </div>
                        <div class="flex_bd">
                            <P class="ellipsis font-size-32">微信捐赠</P>
                        </div>
                        <div class="flex_ft">
                            <img src="/static/img/commonweal/check.png" alt="选中">
                        </div>
                    </div>
                </div>
                <div class="bd-content-button font-size-34">
                    <div>确认捐赠</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{

        }
    }

}
</script>

<style scoped>
@import '../../../static/css/commonweal/commonweal.css';

</style>
