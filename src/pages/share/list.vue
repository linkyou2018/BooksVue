<template>
    <div id="share_list" v-cloak>
        <!-- 头部 -->
        <div class="header">
            <div class="header-bg">
                <!-- 返回按钮 -->
                <a href="javascript:goBack()" class="back">
                    <i class="arrow arrow-left"></i>
                </a>
                <!-- 返回按钮 end -->
            </div>
        </div>
        <!-- 头部end -->

        <!-- 列表 -->
        <div class="od-content">
            <ul>
                <li class="list-slider" v-for="(i, index) in listData">
                    <div class="list-slider-button" :style="{width: sliderOpenX + 'px', lineHeight: sliderOpenY}" @click="deleteList(index)">删除</div>
                    <div class="list-slider-cover" @touchstart.stop="listSliderStart(this, index)" @touchmove.stop="listSliderMove(this)" @touchend.stop="listSliderEnd(this)">
                        <div class="list-tabel list-nodata" v-if="i.author == '' && i.press == ''">
                            <div class="list-tabel-cell list-tabel-left">
                                <!--<div></div>-->
                                <img src="../../img/share/nobook-icon-01.png" />
                            </div>
                            <div class="list-tabel-cell">

                                <div class="list-input"><input type="text" placeholder="可手动输入书名" v-model="i.name" /></div>
                                <div class="font-size-24">已识别图书ISBN码，书名待更新</div>
                                <div class="list-id font-size-24">{{i.isbn}}</div>

                                <!--
									<div class="list-name font-size-34">
										<div v-if="i.name == ''"><img src="../../img/share/share-icon-02.png"/>无法识别的图书!</div>
										<div v-else>{{i.name}}</div>
									</div>
									<div class="font-size-24">你可以试试手动输入书名哦~</div>
									<div class="list-input"><input type="text" placeholder="输入书名" v-model="i.name"/></div>
									-->
                            </div>
                        </div>
                        <div class="list-tabel" v-else>
                            <div class="list-tabel-cell list-tabel-left">
                                <img :src="i.img" />
                            </div>
                            <div class="list-tabel-cell">
                                <div style="width: 13.8rem;">
                                    <div class="list-name ellipsis font-size-34">{{i.name == '' ? '无' : i.name}}</div>
                                    <div class="ellipsis font-size-24">{{i.author == '' ? i.isbn : i.author}}</div>
                                    <div class="ellipsis list-press font-size-24">{{i.press}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list-slider">
                    <div class="list-slider-cover">
                        <div class="list-tabel">
                            <div class="list-tabel-cell list-tabel-left" @click="getMoreBook()"><img src="../../img/share/share-icon-01.png" /></div>
                            <div class="list-tabel-cell">&nbsp;</div>
                            <!--
								<div class="list-tabel-cell list-tabel-scan">
									<div class="font-size-34">点左边+号，扫描图书背面条形码，添加图书信息</div>
								</div>
								-->
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 列表end -->

        <div class="footer">
            <div>
                <div class="share-count">共{{listData.length}}本</div>
                <div class="share-footer-button font-size-32">
                    <!--
						<div @click="getCaseCode()" v-if="caseCode == ''">扫码书柜</div>
						<div @click="submit()" v-else>提交</div>
						-->
                    <div @click="submit()">提交</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style src="../../../static/css/share/share-list.css"></style>
<script>
export default {}
</script>
