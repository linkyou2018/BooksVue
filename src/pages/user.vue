<template>
		<div id="user_app" v-cloak>
			<!-- 头部 
			<div id="header" class="header user-header header-transparent">
				<div class="user-setup font-size-30">设置</div>
			</div>
			 头部end -->
			
			<div class="user-info">
				<div class="user-setup font-size-30" @click="toManage()">设置</div>
				<div>
					<div class="user-info-headimg" @click="toManage()"><img :src="headimg"/></div>
					<div>
						<div v-if="isLogin">
							<div class="user-info-name" @click="toManage()">{{nickName}}</div>
							<div class="user-info-int font-size-22" @click="toManage()"><div>当前积分{{integral}}</div></div>
						</div>
						<div class="user-info-login font-size-26" v-else><div @click="doLogin()">登录 / 注册</div></div>
					</div>
				</div>
			</div>
			
			<div class="user-content user-table font-size-30">
				<div>
					<div class="user-table-cell" v-for="(item, index) in tabelData" :class="{'user-table-cell-last': index == tabelData.length-1}" @click="selectTabel(index)">
						<span class="user-table-icon" :class="item.icon">
							<span class="user-table-badge font-size-22" v-show="orderCount[index] > 0">{{orderCount[index]}}</span>
						</span>
						<span>{{item.name}}</span>
					</div>
				</div>
			</div>
			
			<div class="user-content user-list" v-for="item in listData">
				<div v-for="i in item.item" @click="selectList(i.id)">
					<div class="user-list-cell user-list-left" :class="i.icon"><div></div></div>
					<div class="user-list-cell user-list-center font-size-30">{{i.name}}<span class="font-size-28" v-html="i.intro" v-if="i.intro != ''"></span></div>
					<div class="user-list-cell user-list-tips" v-html="i.tips"></div>
					<!--<div class="user-list-cell user-list-right"><i class="arrow arrow-right"></i></div>-->
				</div>
			</div>
		</div>
</template>
<script src="../../static/js/user/user.js"></script>
<style src="../../static/css/user/user.css"></style>

