var JWeixinSDKConfigBack = function(){
	var obj = {
		title: '使用指引',
	    desc: '借还书、共享书指引，收费规则，押金如何退还',
	    link: window.location.href,
	    imgUrl: 'http://www.1mks.com/wx/img/vip/vip-add-06-00.jpg'
	}
	WCOnMenuShare(obj);
}

var vm = new Vue({
	el: '#guide_info',
	data: {
		tableIndex: 0,
		sortTableActive: [false, false, false],
		sortTable: [
			{
				title: '借书'
			},
			{
				title: '还书'
			},
			{
				title: '共享书'
			}
		]
	},

	created: function() {
		this.$nextTick(function () {
			getJWeixinSDKSignature(window.location.href);
			this.selectSortTable(0);
		});
	},

	methods: {
		selectSortTable: function(i){
			this.tableIndex = i;
			this.sortTableActive = [false, false, false];
			this.sortTableActive[i] = true;
			
			var top = $("#tab_" + i).offset().top - $(".header").height();
			$("html,body").animate({scrollTop: top}, 0);
		}
	}
});
