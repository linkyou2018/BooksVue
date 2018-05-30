var JWeixinSDKConfigBack = function(){
	vm.doShare();
}

var vm = new Vue({
	el: '#lesson_list',
	data: {
		pageReady: false,
		sortId: 'all',
		sortIndex: 0,
		sortData: [],
		categoryId: '',
		categoryName: '',
		contentData: [],
		pageIndex: 0,
		pageSize: 10,
		pageShowSize: 0,
		scrollTop: 0,
		noMore: false,
		loading: false
	},

	created: function() {
		this.$nextTick(function () {
			this.getParams();
		});
	},

	methods: {
		getParams: function(){
			var _url = window.location.href,
				_this = this,
				params = param2Obj(_url);
			this.categoryName = decodeURIComponent(params.name);
			this.categoryId = params.id;
			if(params.sortId != undefined)this.sortId = params.sortId;
			var idObj = {
				'10': '31',
				'11': '142'
			}
			if(idObj[params.id] != undefined){
				this.reqSortLi(idObj[params.id]);
			} else {
				this.reqLessonList();
			}
			getJWeixinSDKSignature(window.location.href);
		},
		
		getListTag: function(t){
			var tag = [],
				t = t;
			if(t != ''){
				tag = t.split(',');
			}
			return tag;
		},
		
		setUrl: function(){
			history.replaceState({}, document.title, 'lesson-list.html?id=' + this.categoryId + '&name=' + encodeURIComponent(this.categoryName) + '&sortId=' + this.sortId);
		},
		
		selectSort: function(i){
			if(i == undefined){
				if(this.sortId != 'all'){
					this.sortData[this.sortIndex].active = false;
					this.sortId = 'all';
					this.resetContentData();
					this.reqLessonList();
				}
				return
			}
			if(this.sortId == this.sortData[i].id){
				return;
			}
			if(this.sortId != 'all'){
				this.sortData[this.sortIndex].active = false;
			}
			this.sortId = this.sortData[i].id;
			this.sortData[i].active = true;
			this.sortIndex = i;
			this.resetContentData();
			this.reqLessonList();
		},
		
		resetContentData: function(){
			this.pageIndex = 0;
			this.noMore = false;
			this.contentData = [];
		},
		
		reqSortLi: function(id){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Category',
				data: {
					method: 'getBookList',
					listId: id
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						var list = data.data;
						for(var i=0, l=list.length; i<l; i++){
							list[i].active = false;
							if(_this.sortId == list[i].id){
								_this.sortIndex = i;
								list[i].active = true;
							}
							_this.sortData.push(list[i]);
						}
						_this.reqLessonList();
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		reqLessonList: function(){
			this.loading = true;
			loadingIconShow();
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Lesson',
				data: {
					method: 'getLessonList',
					categoryId: _this.categoryId,
					listCategoryId: _this.sortId,
					startIndex: _this.pageIndex * _this.pageSize,
					pageSize: _this.pageSize
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						var list = data.lessonList;
						if(list.length < _this.pageSize){
							_this.noMore = true;
						}
						for(var i=0, l=list.length; i<l; i++){
							_this.contentData.push(list[i]);
						}
						
						if(!_this.pageReady){
							_this.pageReady = true;
							//_this.getScrollTop();
						}
					} else {
						//console.log(data.retmsg);
					}
					loadingIconHide();
					_this.loading = false;
				},
				error: function(reqObj, errorMsg, catchObj){
					loadingIconHide();
					_this.loading = false;
				}
			})
		},
		
		getMore: function(){
			if(this.noMore || this.loading){
				return;
			}
			this.pageIndex++;
			this.reqLessonList();
		},
		
		getScrollTop: function(){
			var scrollObj = sessionStorage.getItem('scrollTop');
			if(scrollObj){
				scrollObj = JSON.parse(scrollObj);
				if(scrollObj.lessonlist != undefined){
					this.scrollTop = scrollObj.lessonlist;
					scrollObj.lessonlist = 0;
					scrollObj = JSON.stringify(scrollObj);
					sessionStorage.setItem('scrollTop', scrollObj);
				}
			}
			
			var _this = this;
			this.$nextTick(function () {
				setScrollTop(_this.scrollTop);
			});
		},
		
		setScrollTop: function(){
			var scrollObj = sessionStorage.getItem('scrollTop');
			if(scrollObj){
				scrollObj = JSON.parse(scrollObj);
			} else {
				scrollObj = {};
			}
			scrollObj.lessonlist = document.body.scrollTop;
			scrollObj = JSON.stringify(scrollObj);
			sessionStorage.setItem('scrollTop', scrollObj);
			sessionStorage.setItem('lessonlist_page', this.pageIndex);
		},
		
		selectLesson: function(id){
			this.setUrl();
			//this.setScrollTop();
			window.location.href = 'lesson.html?id=' + id;
		},
		
		doShare: function(){
			var _this = this,
				titleObj = {
					'10': '精选儿童绘本故事在线听'
				},
				descObj = {
					'10': '绘声绘色的经典绘本故事，把孩子带入美好的故事情节'
				},
				obj = {
					title: titleObj[this.categoryId] || _this.categoryName,
				    desc: descObj[this.categoryId] || _this.categoryName,
				    link: window.location.href,
				    imgUrl: 'http://www.1mks.com/wx/img/vip/vip-add-06-00.jpg'
				}
			WCOnMenuShare(obj);
		}
	}
});
