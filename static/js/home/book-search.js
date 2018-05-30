var vm = new Vue({
	el: '#book_search',
	data: {
		inputValue: '',
		pageIndex: 1,
		pageSize: 5,
		contentData: [],
		noMore: false,
		loading: false,
		scrollTop: 0,
		sortData: [
			{
				name: '热门搜索图书',
				icon: '../../img/home/home-sort-icon-01.png',
				list: []
			},
			{
				name: '热门书单',
				icon: '../../img/home/home-sort-icon-02.png',
				list: []
			}
		]
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
			if(params.word != undefined){
				_this.inputValue = decodeURI(params.word);
				_this.reqBookLi(params.page, (parseInt(params.page, 10) + 1) * _this.pageSize, true);
			} else {
				_this.reqPopSort();
			}
		},
		
		dosubmit: function(page, size){
			var $inputNode = this.$refs.inputNode,
				value = this.inputValue;
			$inputNode.blur();
			this.noMore = false;
			this.contentData = [];
			setScrollTop(0);
			this.reqBookLi(page, size);
		},
		
		getMore: function(){
			if(this.contentData.length <= 0 || this.noMore || this.loading){
				return;
			}
			this.reqBookLi(this.pageIndex, this.pageSize);
		},
		
		reqPopSort: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Search',
				data: {
					method: 'searchKeyword'
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.sortData[0].list = data.keywordList;
						_this.sortData[1].list = data.bookListKey;
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		reqBookLi: function(page, size, isback){
			var value = this.inputValue;
			if(value == ''){
				//history.replaceState({}, document.title, 'book-search.html');
				//return;
			}
			history.replaceState({}, document.title, 'book-search.html?word=' + encodeURI(value) + '&page=' + page);
			
			this.loading = true;
			page = parseInt(page, 10) + 1;
			
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Search',
				data: {
					method: 'search',
					keywords: encodeURI(value),
					pageSize: size,
					pageNo: isback ? 1 : page
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.pageIndex = page;
						var arr = data.searchBookList;
						if(arr.length < size){
							_this.noMore = true;
						}
						for(var i=0, l=arr.length; i<l; i++){
							_this.contentData.push(arr[i]);
						}
						if(isback){
							_this.getScrollTop();
						}
					} else {
						//console.log(data.retmsg);
					}
					_this.loading = false;
				},
				error: function(reqObj, errorMsg, catchObj){
					_this.loading = false;
				}
			})
		},
		
		getScrollTop: function(){
			var scrollObj = sessionStorage.getItem('scrollTop');
			if(scrollObj){
				scrollObj = JSON.parse(scrollObj);
				this.scrollTop = scrollObj.bookSearch;
				scrollObj.bookSearch = 0;
				scrollObj = JSON.stringify(scrollObj);
				sessionStorage.setItem('scrollTop', scrollObj);
			}
			this.$nextTick(function () {
				setScrollTop(this.scrollTop);
			});
		},
		
		setScrollTop: function(){
			var scrollObj = sessionStorage.getItem('scrollTop');
			if(scrollObj){
				scrollObj = JSON.parse(scrollObj);
			} else {
				scrollObj = {};
			}
			scrollObj.bookSearch = document.body.scrollTop;
			scrollObj = JSON.stringify(scrollObj);
			sessionStorage.setItem('scrollTop', scrollObj);
		},
		
		selectBook: function(id){
			this.setScrollTop();
			window.location.href = '../bookdetail/book-detail.html?id=' + id;
		},
		
		selectBooklist: function(id){
			window.location.href = '../booklist/booklist-detail.html?id=' + id;
		},
		
		selectPop: function(n){
			this.inputValue = n;
			this.noMore = false;
			this.contentData = [];
			setScrollTop(0);
			this.reqBookLi(0, this.pageSize);
		},
		
		searchFocus: function(){
			setScrollTop(0);
		}
	}
});
