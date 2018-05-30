<template>
    <div class="footer" >
        <div>
            <div v-for="(item, index) in footerTabData" class="footer-tab" 
            :class="{'footer-tab-active': footerTabState[index]}" @click="selectTabel(index)"  >
				<router-link :to="{ path:item.url }" >
 					<div class="footer-icon" :class="item.className"></div>
                	<div class="font-size-22" :class="item.btnName">{{item.name}}</div>
				</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default { 
	name:"footer-bar",
    data(){
        return{
		indexWidth: '100%',
		indexHeight: '100%',
		tabIndex: 0,
        footerTabState: [false, false, false, false, false],
   		footerTabData: [
			{
				className: 'footer-home',
				btnName: 'footer-name-home',
				name: '首页',
				url: '/',
				iframe: 'home'
			},
			{
				className: 'footer-bag',
				btnName: 'footer-name-bag',
				name: '书包',
				url: 'page/bag/bag.html',
				iframe: 'bag'
			},
			{
				className: 'footer-sort',
				btnName: 'footer-name-sort',
				name: '书单',
				url: 'page/sort/sort.html',
				iframe: 'sort'
			},
			{
				className: 'footer-message',
				btnName: 'footer-name-message',
				name: '社区',
				url: 'page/community/community.html',
				iframe: 'community'
			},
			{
				className: 'footer-user',
				btnName: 'footer-name-user',
				name: '我的',
				url: '/pages/user',
				iframe: 'user'
			}
		]

        }
    },
    methods:{
        getPage: function(){
			var height = this.$refs.footer.clientHeight;
			this.indexHeight = this.$el.clientHeight - height;
			this.indexWidth = this.$el.clientWidth;
			this.getParams();
		},
		getParams: function(){
			var index = sessionStorage.getItem('indexTabel');
			if(index){
				this.tabIndex = index;
			} else {
				var params = param2Obj(window.location.href),
					tab = params.tabIndex;
				if(tab != undefined){
					this.tabIndex = tab;
				}
			}
			this.selectTabel(this.tabIndex);
		},
		
		selectTabel: function(i){
			// if(i == 0){
			// 	var userFrom = sessionStorage.getItem('userFrom'),
			// 		params = param2Obj(window.location.href);
			// 	if(userFrom == 'zjyz' || params.from != undefined){
			// 		this.showHeaderBar();
			// 	}
			// } else {
			// 	this.GLOBAL.showBar = false;
			// }
			// if(i == 1){
			// 	window.location.href = this.footerTabData[i].url;
			// 	return;
			// }
			// this.tabIndex = i;
			// this.footerTabState = [false, false, false, false, false];
			// this.footerTabState[i] = true;
			// sessionStorage.setItem('indexTabel', i);
			
			// this.iframeHTML = '<iframe name="' + this.footerTabData[this.tabIndex].iframe + '" src="' + this.footerTabData[this.tabIndex].url + '" width="' + this.indexWidth + '" height="' + this.indexHeight + '" frameborder="0" scrolling="no"></iframe>';
		},
		showHeaderBar: function(){
			this.showBar = !this.showBar;
		}
	}

}
</script>


