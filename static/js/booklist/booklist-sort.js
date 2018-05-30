var JWeixinSDKConfigBack = function(){
	vm.doShare();
}

var vm = new Vue({
	el: '#booklist_sort',
	data: {
		pageReady: false,
		tableIndex: null,
		sortTableActive: [],
		sortTable: [],
		sliderObj: null,
		sliderIndex: 0,
		firstIndex: null,
		secondIndex: null,
		thirdIndex: null,
		secondSelected: '',
		isFirstActive: [],
		isSecondActive: [],
		isThirdActive: [],
		introShow: '',
		isHideIntro: true,
		firstSortData: [],
		secondSortData: [],
		thirdSortData: [],
		busying: false,
		showMenu: 0,
		showWrapper: 0,
		hideWrapper: 1,
		showBackdrop: false,
		showButtonCover: false,
		contentData: {
			count: 0,
			list: []
		},
		pageIndex: 0,
		pageSize: 5,
		pageShowSize: 0,
		scrollTop: 0,
		listId: [],
		listIdStr: '',
		menuWrapperHeight: 0,
		showGuide: false
	},

	created: function() {
		this.$nextTick(function () {
			this.getParams();
		});
	},

	methods: {
		getParams: function(){
			getJWeixinSDKSignature(window.location.href);
			var _url = window.location.href,
				_this = this,
				params = param2Obj(_url);
			if(params.t == 'borrow'){
				this.showGuideAd();
			}
			this.getPage(params.listId);
			this.reqSortTable();
		},
		
		getPage: function(id){
			this.listIdStr = id;
			var _this = this,
				_listId = id.split('_');
			for(var i=0; i<4; i++){
				if(i > _listId.length-1){
					_this.listId.push('');
				} else {
					_this.listId.push(_listId[i]);
				}
			}
			this.reqSortLi();
		},
		
		setDefault: function(){
			var _this = this;
			if(_this.listId[1] == ''){
				_this.selectFirstSort(0);
			} else {
				var id_1 = _this.listId[1],
					data_1 = _this.firstSortData;
				for(var f1=0; f1<data_1.length; f1++){
					if(id_1 == data_1[f1].id){
						if(_this.listId[2] == ''){
							_this.selectFirstSort(f1);
						} else {
							var id_2 = _this.listId[2],
								data_2 = data_1[f1].list;
							for(var f2=0; f2<data_2.length; f2++){
								if(id_2 == data_2[f2].id){
									if(_this.listId[3] == ''){
										_this.selectFirstSort(f1, f2);
									} else {
										var id_3 = _this.listId[3],
											data_3 = data_2[f2].list;
										for(var f3=0; f3<data_3.length; f3++){
											if(id_3 == data_3[f3].list_id){
												_this.selectFirstSort(f1, f2, f3);
												break;
											}
										}
									}
									break;
								}
							}
						}
						break;
					}
				}
			}
		},
		
		setUrl: function(){
			var str = this.listId[0] + '_' + this.firstSortData[this.firstIndex].id + '_' + this.firstSortData[this.firstIndex].list[this.secondIndex].id + '_' + this.thirdSortData[this.thirdIndex].list_id;
			this.listIdStr = str;
			var guideState = this.showGuide ? '&t=borrow' : '';
			history.replaceState({}, document.title, 'booklist-sort.html?listId=' + str + guideState);
		},
		
		selectFirstSort: function(i, f2, f3){
			if(i == this.firstIndex){
				return;
			}
			this.setFirstSort(i, f2, f3);
		},
		
		selectSecondSort: function(b, s, f3){
			if(b == this.secondIndex && !s){
				this.toggleMenu();
				return;
			}
			this.secondIndex = b;
			this.isSecondActive = [];
			for (var j=0, l=this.secondSortData.length; j<l; j++) {
				this.isSecondActive[j] = false;
			}
			this.isSecondActive[this.secondIndex] = true;
			this.secondSelected = this.secondSortData[this.secondIndex].sort_by;
			this.thirdSortData = this.secondSortData[this.secondIndex].list;
			if(!s){
				this.toggleMenu();
			}
			
			var _this = this;
			this.$nextTick(function () {
				var i_f3 = f3 == undefined ? 0 : f3;
				_this.selectThirdSort(i_f3, true);
				_this.initSlider();
			});
		},
		
		selectThirdSort: function(i, s){
			if(i == this.thirdIndex && !s){
				return;
			}
			this.setThirdSort(i);
		},
		
		setFirstSort: function(i, f2, f3){
			this.firstIndex = i;
			for (var j=0, l=this.firstSortData.length; j<l; j++) {
				this.isFirstActive[j] = false;
			}
			this.isFirstActive[this.firstIndex] = true;
			this.setSecondSort(i, f2, f3);
		},
		
		setSecondSort: function(i, f2, f3){
			this.secondSortData = this.firstSortData[i].list;
			
			var _this = this;
			this.$nextTick(function () {
				var menuWrapperLength = _this.secondSortData.length;
				_this.menuWrapperHeight = menuWrapperLength * 2 + 1.5;
				var i_f2 = f2 == undefined ? (_this.secondIndex == null ? 0 : _this.secondIndex) : f2;
				_this.selectSecondSort(i_f2, true, f3);
			});
		},
		
		setThirdSort: function(i){
			this.thirdIndex = i;
			var page = sessionStorage.getItem('booklist_page');
			if(page){
				sessionStorage.removeItem('booklist_page');
				this.pageIndex = parseInt(page, 10);
			} else {
				this.pageIndex = 0;
			}
			this.pageShowSize = (this.pageIndex + 1) * this.pageSize;
			this.introShow = '';
			this.contentData.count = 0;
			if(this.thirdSortData.length <= 0){
				this.contentData.list = [];
				return;
			}
			
			for (var j=0, l=this.thirdSortData.length; j<l; j++) {
				this.isThirdActive[j] = false;
			}
			this.isThirdActive[this.thirdIndex] = true;
			this.introShow = this.thirdSortData[this.thirdIndex].introduce;
			this.doShare();
			
			var _this = this;
			this.$nextTick(function () {
				var id = _this.thirdSortData[_this.thirdIndex].list_id;
				_this.reqBookLi(id);
			});
		},
		
		setIntroShow: function(){
			this.isHideIntro = true;
			var _this = this,
				intro = document.getElementsByClassName('bl-sort-intro-text');
			setTimeout(function(){
				var inner = intro[0].firstChild.innerHTML;
			}, 10);
		},
		
		showIntro: function(){
			this.isHideIntro = !this.isHideIntro;
		},
	
		toggleMenu: function() {
			if (this.busying) {
				return false;
			}
			this.busying = true;
			var _this = this;
			if (this.showBackdrop) {
				this.showWrapper = 2;
				this.showMenu = 2;
				this.showButtonCover = false;
				setTimeout(function(){
					_this.hideWrapper = 1;
					_this.showBackdrop = false;
				}, 300);
			} else {
                this.setSortTop();
				this.showWrapper = 1;
				this.hideWrapper = 0;
				this.showMenu = 1;
				this.showButtonCover = true;
				this.showBackdrop = true;
			}
			setTimeout(function(){
				_this.busying = false;
			}, 300);
		},
		
		reqSortTable: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Index',
				data: {
					method: 'indexBookList'
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.sortTable = data.bookListArray;
						var i = 0;
						for (var j=0, l=_this.sortTable.length; j<l; j++) {
							if(_this.sortTable[j].title_id == _this.listId[0]){
								i = j;
								break;
							}
						}
						_this.selectSortTable(i, true);
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		reqSortLi: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Category',
				data: {
					method: 'getBookList',
					listId: _this.listId[0]
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.firstSortData = data.data;
						_this.setDefault();
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		reqBookLi: function(id){
			loadingIconShow();
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Category',
				data: {
					method: 'getBookFromList',
					listId: id
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.pageIndex = 0;
						_this.contentData.list = [];
						_this.contentData.count = data.data.total == undefined ? 0 : data.data.total;
						_this.contentData.list = data.data.contentList_json;
						if(_this.pageReady){
							_this.setSortTop();
						} else {
							_this.getScrollTop();
						}
						_this.pageReady = true;
					} else {
						//console.log(data.retmsg);
					}
					loadingIconHide();
				},
				error: function(reqObj, errorMsg, catchObj){
					loadingIconHide();
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
				if(scrollObj.booklist != undefined){
					this.scrollTop = scrollObj.booklist;
					scrollObj.booklist = 0;
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
			scrollObj.booklist = document.body.scrollTop;
			scrollObj = JSON.stringify(scrollObj);
			sessionStorage.setItem('scrollTop', scrollObj);
			sessionStorage.setItem('booklist_page', this.pageIndex);
		},
		
		selectBook: function(id){
			this.setUrl();
			this.setScrollTop();
			window.location.href = '../bookdetail/book-detail.html?id=' + id;
		},
		
		selectMoreList: function(){
			this.setUrl();
			window.location.href = 'booklist-list.html?listId=' + this.listIdStr;
		},
		
		initSlider: function(){
			var _this = this,
				width = Math.ceil(document.body.clientWidth * 0.304);
			this.sliderObj = null;
			this.sliderObj = new Swipe(document.getElementById("listSlider"), {
				addNum: 3,
				width: width,
				callback: function(event, index, elem){
					_this.sliderIndex = index;
				}
			})
		},
		
		showGuideAd: function(){
			this.showGuide = !this.showGuide;
		},
		
		setSortTop: function(){
			var top = $('.sort-table')[0].clientHeight + $('.sort-ad')[0].clientHeight;
			this.$nextTick(function () {
				setScrollTop(top);
			});
		},
		
		selectSortTable: function(i, s){
			if(this.tableIndex == i){
				return;
			}
			this.tableIndex = i;
			var _this = this,
				length = this.sortTable.length;
			for (var j=0; j<length; j++) {
				this.sortTableActive[j] = false;
			}
			this.sortTableActive[i] = true;
			
			if(!s){
				this.setSortTable();
			}
		},
		
		setSortTable: function(){
			var id = this.sortTable[this.tableIndex].title_id,
				guideState = this.showGuide ? '&t=borrow' : '';
			history.replaceState({}, document.title, 'booklist-sort.html?listId=' + id + guideState);
			this.pageReady = false;
			this.listId = [];
			this.firstIndex = null;
			this.secondIndex = null;
			this.thirdIndex = null;
			this.getPage(id);
		},
		
		doShare: function(){
			var id = this.listId[0] + '_' + this.firstSortData[this.firstIndex].id + '_' + this.firstSortData[this.firstIndex].list[this.secondIndex].id + '_' + this.thirdSortData[this.thirdIndex].list_id,
				guideState = this.showGuide ? '&t=borrow' : '',
				titleObj = {
					'31': '为孩子设计的分级阅读精选书单',
					'142': '职场必读书单推荐，让事业大不同',
					'111': '新青年必读书单推荐，让人生大不同'
				},
				descObj = {
					'31': '跟着书单读好书，爱上阅读，提升阅读力',
					'142': '职场进阶、经营管理、创意创新类好书，持续提升素质与能力',
					'111': '人文科学、家庭教育、提升视野类好书，做有为青年'
				},
				imgObj = {
					'31': 'http://www.1mks.com/wx/img/vip/vip-add-06-00.jpg',
					'142': 'http://www.1mks.com/wx/img/booklist/boolist-share-01.jpg',
					'111': 'http://www.1mks.com/wx/img/booklist/boolist-share-01.jpg'
				},
				obj = {
					title: titleObj[this.listId[0]] || '精选书单',
				    desc: descObj[this.listId[0]] || '跟着书单读好书，爱上阅读，提升阅读力',
				    link: 'http://www.1mks.com/wx/page/booklist/booklist-sort.html?listId=' + id + guideState,
				    imgUrl: imgObj[this.listId[0]] || 'http://www.1mks.com/wx/img/vip/vip-add-06-00.jpg'
				}
			WCOnMenuShare(obj);
		}
	}
});
