<template>
    <div class="community">
        <div class="home-header">
            <div id="sliderMain">
                <div class="slider-main">
                    <div class="slider-list" v-for="sliderItem in sliderData" @click="selectSlider(sliderItem.url)">
                    	<img :src="sliderItem.picUrl" :alt="sliderItem.title"/>
                    </div>
                </div>
            </div>
            <div class="home-search">
                <div class="home-search-border">
                    <div class="home-search-input">
                        <div class="home-search-left" @click="doSearch()">
                            <i></i>搜索图书、课堂、名字等</div>
                        <div class="home-search-right" @click="createButton()"></div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="lesson-group-title font-size-32">阅读小组
                <div class="font-size-24" @click="moreGroup()">查看更多</div>
            </div>
            <div class="lesson-group">
                <div class="lesson-group-list" @click="selectGroup(i.id)" v-for="(i, index) in groupData" v-if="index < 3">
                    <img :src="i.main_pic" />
                    <div class="lesson-group-list-name ellipsis font-size-26">{{i.name}}</div>
                    <div class="lesson-group-list-type font-size-24">{{i.groupType}}</div>
                </div>
            </div>
        </div>

        <div>
            <div class="lesson-list" v-for="(i, index) in listData">
                <div class="lesson-list-sort font-size-32" @click="moreLesson(i.categoryId, i.categoryName)">{{i.categoryName}}
                    <div>
                        <i class="arrow arrow-right"></i>
                    </div>
                </div>
                <div class="lesson-list-info" @click="selectLesson(i.lessonId)">
                    <div class="lesson-list-left">
                        <div v-if="i.lessonPic == ''"></div><img :src="i.lessonPic" v-else/></div>
                    <div class="lesson-list-right">
                        <div class="lesson-list-name ellipsis">{{i.lessonName}}</div>
                        <div class="lesson-list-desc font-size-26 ellipsis">&nbsp;{{i.lessonDesc}}</div>
                        <div class="lesson-list-teacher font-size-26 ellipsis">主讲人：{{i.lessonTeacher}}</div>
                        <div style="width: 10.888rem;">
                            <div class="lesson-list-tag font-size-22" v-for="t in getListTag(i.lessonLabel)">{{t}}</div>
                        </div>
                        <span class="lesson-list-pay font-size-32">{{i.lessonPrice == '0' ? '免费' : '￥' + i.lessonPrice}}</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'community',
  data(){
      return{
	sliderObj: null,
		sliderIndex: 0,
		sliderData: [
			{
				picUrl: '/static/img/community/group-cover-08.jpg',
				title: '',
				url: ''
			}
		],
		groupData: [],
		listData: [],
		openid: '',
		userTel: ''

      }
  }
}
</script>
<style scoped>
@import '../../../static/css/community/community-index.css';
</style>
