<template>
    <div class="index" style="height: 100%" id="index_app" v-cloak>
        <header-bar  ></header-bar>
        <router-view/>
        <footer-bar v-show="$store.state.index.isFoot" ></footer-bar>
    </div>
</template>
<script src="../../static/js/index.js"></script>
<style src="../../static/css/global.css"></style>
<style>
html, body{
			height: 100%;
			overflow-x: hidden;
			overflow-y: auto;
    	}
        
        .left{
			width: 14.4%;
			height: 100%;
			background-image: url(../../static/img/icon-cancel-02.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: .916rem .916rem;
		}
		.center{
			line-height: 1.2;
			color: #fff;
			padding-left: 2.444rem;
			background-image: url(../../static/img/logo-01.png);
			background-position: center left;
			background-repeat: no-repeat;
			background-size: 1.777rem 1.777rem;
		}
		.center span{
			color: #969696;
		}
		.right{
			width: 28.8%;
			line-height: 2.444rem;
			color: #fff;
			text-align: center;
			background-color: #95ae62;
		}
</style>

