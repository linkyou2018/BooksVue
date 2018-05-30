var JWeixinSDKConfigBack = function(){
	var obj = {
		title: vm.contentData.name,
	    desc: vm.contentData.intro,
	    link: window.location.href,
	    imgUrl: 'http://www.1mks.com/wx/img/vip/vip-add-06-00.jpg'
	}
	WCOnMenuShare(obj);
}

var vm = new Vue({
	el: '#booklist_dets',
	data: {
		listId: '',
		isHideIntro: true,
		contentData: {
			name: '',
			intro: '',
			count: 0,
			list: []
		},
		pageIndex: 0,
		pageSize: 5,
		pageShowSize: 5,
		scrollTop: 0
	},

	created: function() {
		this.$nextTick(function () {
			this.getParams();
		});
	},

	methods: {
		getParams: function(){
			var _url = window.location.href,
				params = param2Obj(_url);
			this.listId = params.id;
			var page = sessionStorage.getItem('booklist_detail_page');
			if(page){
				sessionStorage.removeItem('booklist_detail_page');
				this.pageIndex = parseInt(page, 10);
				this.pageShowSize = (this.pageIndex + 1) * this.pageSize;
			}
			this.reqBookLi();
		},
		
		showIntro: function(){
			this.isHideIntro = !this.isHideIntro;
		},
		
		reqBookLi: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Category',
				data: {
					method: 'getBookFromList',
					listId: _this.listId
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						if(data.data.name != undefined)_this.contentData.name = data.data.name;
						if(data.data.introduce != undefined)_this.contentData.intro = data.data.introduce;
						if(data.data.total != undefined)_this.contentData.count = data.data.total;
						_this.contentData.list = data.data.contentList_json;
						_this.getScrollTop();
						
						getJWeixinSDKSignature(window.location.href);
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		getMore: function(){
			if(this.contentData.list.length <= this.pageShowSize){
				return;
			}
			this.pageIndex++;
			this.pageShowSize = (this.pageIndex + 1) * this.pageSize;
		},
		
		getScrollTop: function(){
			var scrollObj = sessionStorage.getItem('scrollTop');
			if(scrollObj){
				scrollObj = JSON.parse(scrollObj);
				if(scrollObj.booklist_detail != undefined){
					this.scrollTop = scrollObj.booklist_detail;
					scrollObj.booklist_detail = 0;
					scrollObj = JSON.stringify(scrollObj);
					sessionStorage.setItem('scrollTop', scrollObj);
				}
			}
			
			var _this = this;
			setTimeout(function(){
				setScrollTop(_this.scrollTop);
			}, 0);
		},
		
		setScrollTop: function(){
			var scrollObj = sessionStorage.getItem('scrollTop');
			if(scrollObj){
				scrollObj = JSON.parse(scrollObj);
			} else {
				scrollObj = {};
			}
			scrollObj.booklist_detail = document.body.scrollTop;
			scrollObj = JSON.stringify(scrollObj);
			sessionStorage.setItem('scrollTop', scrollObj);
			sessionStorage.setItem('booklist_detail_page', this.pageIndex);
		},
		
		selectBook: function(id){
			this.setScrollTop();
			window.location.href = '../bookdetail/book-detail.html?id=' + id;
		}
	}
});
