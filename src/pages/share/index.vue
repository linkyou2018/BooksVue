<template>
    <div id="share_order" v-cloak>

        <header-back title="我的共享图书" ></header-back>
        <div class="od-content">
            <div style="height: 2.472rem;"></div>
            <div class="od-main">

                <!-- 未提交的共享单 -->
                <div class="od-content-list" v-show="localData.length > 0">
                    <div class="od-code">
                        <div>
                            <div class="od-code-left">未提交的共享单</div>
                            <div class="od-code-center">
                                <div class="list-casecode font-size-36">
                                    <span @click="goSubmit()">继续提交</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="od-list">
                        <div v-for="i in localData">
                            <div class="od-list-left"><img :src="i.img == '' ? '../../img/share/nobook-icon-01.png' : i.img" /></div>
                            <div class="od-list-center">
                                <div class="od-list-name ellipsis-2 font-size-32">{{i.name == '' ? '无' : i.name}}</div>
                                <div class="ellipsis-2 font-size-24">{{i.author == '' ? i.isbn : i.author}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="od-count">数量&nbsp;&nbsp;{{localData.length}}</div>
                </div>
                <!-- 未提交的共享单end -->

                <div class="od-content-list" v-for="(item, index) in listData" @click="selectOrder(item.order_no)">
                    <div class="od-code">
                        <div>
                            <div class="od-code-left">
                                <div>共享单号&nbsp;&nbsp;{{item.order_no}}</div>
                                <div>提交时间&nbsp;&nbsp;{{item.create_time.substring(0, 16)}}</div>
                            </div>
                            <div class="od-code-center">
                                <div v-if="item.state == '0'">
                                    <div v-if="item.isOverdue == '1'">
                                        <div class="font-size-24">预约已失效</div>
                                        <div class="list-casecode font-size-36">
                                            <span @click="reqCasecode(item.order_no, index)">重新获取</span>
                                        </div>
                                    </div>
                                    <div v-else-if="item.putin_code == '-1'">
                                        <div class="font-size-24">箱满</div>
                                        <div class="list-casecode font-size-36">
                                            <span @click="reqCasecode(item.order_no, index)">重新获取</span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="font-size-24">开箱码</div>
                                        <div class="list-casecode font-size-36">{{item.putin_code == '' || item.putin_code == 'null' ? '短信发送' : item.putin_code}}</div>
                                    </div>
                                </div>
                                <div v-else-if="item.state == '1'">
                                    <div class="font-size-24">已投入书柜</div>
                                    <div class="list-casecode font-size-36">
                                        <span>待取出</span>
                                    </div>
                                </div>
                                <div v-else-if="item.state == '2'">
                                    <div class="list-casecode font-size-36">
                                        <span>待审核</span>
                                    </div>
                                </div>
                                <div v-else-if="item.state == '3'">
                                    <div class="list-casecode font-size-36">
                                        <span>审核通过</span>
                                    </div>
                                </div>
                                <div v-else-if="item.state == '31'">
                                    <div class="list-casecode font-size-36">
                                        <span>部分通过</span>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="list-casecode font-size-36">
                                        <span>待处理</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="od-list">
                        <div v-for="i in item.detailList">
                            <div class="od-list-left"><img :src="i.isbn_pic_url == '' ? '../../img/share/nobook-icon-01.png' : i.isbn_pic_url" /></div>
                            <div class="od-list-center">
                                <div class="od-list-name ellipsis-2 font-size-32">{{i.isbn_name == '' ? '无' : i.isbn_name}}</div>
                                <div class="ellipsis-2 font-size-24">{{i.isbn_author == '' ? i.isbn : i.isbn_author}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="od-count">数量&nbsp;&nbsp;{{item.detailList.length}}</div>
                </div>
            </div>
        </div>
        <div class="od-foo-button font-size-34" v-show="listData.length > 0">
            <div @click="submit()">返回首页</div>
        </div>
    </div>

</template>
<style src="../../../static/css/share/share-order.css"></style>
<script>
import HeaderBack from '../../components/headerBack'
export default {
  components: {
    HeaderBack
  },
  data() {
    return {
      openid: '',
      scrollTop: 0,
      listData: [],
      localData: []
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
