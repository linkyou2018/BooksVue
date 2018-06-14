<template>
	<div id="home_app" v-cloak>
		<div class="home-header">
			<div id="sliderMain">
				<swipe class="my-swipe">
					<swipe-item v-for="(item,key,index) in sliderData" :key="item.title" class="slider-list">
						<img :src="item.picUrl">
					</swipe-item>
				</swipe>
			</div>
			<div class="home-search">
				<div class="home-search-border">
					<div class="home-search-input">
						<div class="home-search-left" @click.stop="homeScan()"></div>
						<div class="home-search-right" @click="doSearch()">
							<i></i>搜索书名或作者
			
						</div>
					</div>
				</div>
			</div>
			<div class="home-button-ul">
				<div class="home-button-li" v-for="(buttonItem, index) in buttonData" @click="selectButton(index)">
					<router-link :to="{path:buttonItem.url}">
						<img :src="buttonItem.img" />
						<div class="home-button-li-txt ellipsis">{{buttonItem.txt}}</div>
					</router-link>
				</div>
			</div>
			<div class="home-main-add-tab">
				<img class="home-main-add-left" src="/static/img/home/home-main-ad-03.jpg" @click="goGuide()" />
				<img class="home-main-add-right" src="/static/img/home/home-main-ad-04.jpg" @click="gotoBooklist('111')" />
			</div>
			<div class="home-content" v-for="(contentItem, index) in catalogBookList">
				<img class="home-main-add" src="/static/img/home/index-ad-11.jpg" v-if="index == 1" />
				<div class="home-content-title">
					<i></i><img :src="contentIcon[index].img" :style="{'width': contentIcon[index].width + 'rem'}" />
					<span class="font-size-32">{{contentItem.Title}}</span>
					<i></i>
				</div>
				<div :class="{'home-content-bottom': sdx == 2 || sdx == contentItem.ChildCatalogBookList.length-1}" v-for="(sortItem, sdx) in contentItem.ChildCatalogBookList">
					<img class="home-main-add" style="margin-bottom: .888rem;" src="/static/img/home/index-ad-13.jpg" v-if="index == 0 && sdx == 3" />
					<div class="home-content-main">
						<div class="home-content-sort">{{sortItem.Title}}
							<span class="font-size-24" @click="gotoBooklist(sortItem.path)">更多书单</span>
						</div>
						<ul>
							<li class="home-content-li" :class="{'home-content-li-more': idx > 2}" v-for="(listItem, idx) in sortItem.TagTypeList">
								<div @click="selectBooklist(listItem.Id)">
									<img class="home-content-li-img" :src="listItem.PhotoPath">
									<div class="home-content-li-txt font-size-26 ellipsis">{{listItem.Name}}</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<br>
	</div>
</template>
<script src="../../../static/js/home/home.js"></script>
<style scoped>
@import '../../../static/css/home/home.css';
@import 'vue-swipe/dist/vue-swipe.css';
.mint-swipe-indicators {
	display: none;
}
</style>
<style scoped>
.my-swipe {
	height: 11rem;
	color: #fff;
	font-size: 30px;
	text-align: center;
}
</style>


