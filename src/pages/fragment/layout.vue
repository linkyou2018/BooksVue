<template>
    <div class="index" style="height: 100%" id="index_app" v-cloak>
        <header-bar  ></header-bar>
        <router-view/>
        <footer-bar v-show="$store.state.home.isFoot" ></footer-bar>
    </div>
</template>
<script src="../../../static/js/index.js"></script>