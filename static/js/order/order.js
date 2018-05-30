/*
 * orderType:
 * 1 -- 待处理
 * 2 -- 待取书
 * 3 -- 待还书
 * 4 -- 客服
*/
var JWeixinSDKConfigBack = function(){
	var obj = {
		title: '借书免费？就当交个朋友咯',
	    desc: '一米看书，首个共享型图书馆，感受一本书的力量',
	    link: 'http://www.1mks.com/wx/page/share/borrow.html?uid=' + vm.openid + '&utel=' + vm.tel,
	    imgUrl: 'http://www.1mks.com/wx/img/vip/vip-add-06-00.jpg'
	}
	WCOnMenuShare(obj);
}

var vm = new Vue({
	el: '#order',
	data: {
		showGuide: false,
		openid: '',
		tel: '',
		pageSize: 5,
		tabelIndex: 0,
		tabelActive: [false, false, false, false, false],
		tabelData: [
			{
				name: '全部',
				scrollTop: 0,
				page: 0,
				noMore: false,
				loading: false
			},
			{
				name: '待处理',
				scrollTop: 0,
				page: 0,
				noMore: false,
				loading: false
			},
			{
				name: '待取书',
				scrollTop: 0,
				page: 0,
				noMore: false,
				loading: false
			},
			{
				name: '待还书',
				scrollTop: 0,
				page: 0,
				noMore: false,
				loading: false
			},
			{
				name: '客服',
				scrollTop: 0,
				page: 0,
				noMore: false,
				loading: false
			}
		],
		listData: [
			{
				list: []
			},
			{
				list: []
			},
			{
				list: []
			},
			{
				list: []
			},
			{
				list: []
			}
		]
	},

	created: function() {
		/*this.$nextTick(function () {
			this.getUser();
		}); 本地测试*/
	},

	methods: {
		getUser: function(){
			var userLocal = localStorage.getItem('userInfo'),
				_this = this;
			if(userLocal){
				userLocal = JSON.parse(decodeURIComponent(userLocal));
				_this.openid = userLocal.openId;
				_this.tel = userLocal.tel;
				getJWeixinSDKSignature(window.location.href);
				_this.getParams();
			} else {
				window.location.href = '../user/login.html?nextPage=' + window.location.href;
			}
		},
		
		getParams: function(){
			var _url = window.location.href,
				params = param2Obj(_url);
			this.tabelIndex = params.tabId;
			if(params.page != undefined){
				this.tabelData[this.tabelIndex].page = parseInt(params.page);
				this.selectTabel(this.tabelIndex, true);
			} else {
				this.selectTabel(this.tabelIndex);
			}
		},
		
		selectTabel: function(i, isback){
			if(this.tabelData[this.tabelIndex].loading){
				return;
			}
			this.tabelActive = [false, false, false, false, false];
			this.tabelActive[i] = true;
			if(isback){
				this.getScrollTop();
			} else {
				this.tabelData[this.tabelIndex].scrollTop = document.body.scrollTop;
			}
			
			var _this = this;
			setTimeout(function(){
				var top = _this.tabelData[i].scrollTop;
				setScrollTop(top);
			}, 0);
			
			this.tabelIndex = i;
			var page = this.tabelData[i].page;
			
			if(isback){
				this.reqOrder(page, (page + 1) * this.pageSize, isback);
			} else if(page == 0){
				if(i == 4){
					this.reqFeedback(page, this.pageSize);
				} else{
					this.reqOrder(page, this.pageSize);
				}
			}
		},
		
		setUrl: function(){
			var i = this.tabelIndex,
				p = this.tabelData[this.tabelIndex].page - 1;
			history.replaceState({}, document.title, 'order.html?tabId=' + i + '&page=' + p);
		},
		
		reqFeedback: function(page, size){
			this.tabelData[this.tabelIndex].loading = true;
			var _this = this;
			size = 10;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'FAQ',
				data: {
					method: 'doQueryOfUser',
					openId: _this.openid,
					startIndex: page * size,
					pageSize: size
				},
				success: function(data){
					_this.tabelData[_this.tabelIndex].loading = false;
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						var list = data.feedbackList;
						if(list.length < size){
							_this.tabelData[_this.tabelIndex].noMore = true;
						}
						if(list.length <= 0){
							return;
						}
						page++;
						_this.tabelData[_this.tabelIndex].page = page;
						for(var i=0; i<list.length; i++){
							_this.listData[_this.tabelIndex].list.push(list[i]);
						}
					} else {
						
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					_this.tabelData[_this.tabelIndex].loading = false;
				}
			})
		},
		
		reqOrder: function(page, size, isback){
			this.tabelData[this.tabelIndex].loading = true;
			var _this = this;
			page++;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'UserQuery',
				data: {
					method: 'borrowOrderQuery',
					openId: _this.openid,
					orderType: _this.tabelIndex,
					startPage: isback ? 1 : page,
					pageSize: size
				},
				success: function(data){
					_this.tabelData[_this.tabelIndex].loading = false;
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						var list = data.orderList;
						if(list.length < size){
							_this.tabelData[_this.tabelIndex].noMore = true;
						}
						if(list.length <= 0){
							return;
						}
						_this.tabelData[_this.tabelIndex].page = page;
						for(var i=0; i<list.length; i++){
							_this.listData[_this.tabelIndex].list.push(list[i]);
						}
					} else {
						
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					_this.tabelData[_this.tabelIndex].loading = false;
				}
			})
		},
		
		setListState: function(s){
			var state = s, txt = '';
			switch(state){
				case '0':
					txt = '在库';
					break;
				case '1':
					txt = '待投递';
					break;
				case '2':
					txt = '已投递';
					break;
				case '3':
					txt = '已取书';
					break;
				case '4':
					txt = '已归还待确认';
					break;
				case '5':
					txt = '已确认归还';
					break;
				case '9':
					txt = '遗失';
					break;
				case '11':
					txt = '部分待投递';
					break;
				case '21':
					txt = '已部分投递';
					break;
				case '31':
					txt = '已部分取书';
					break;
				case '32':
					txt = '待归还投递';
					break;
				case '41':
					txt = '部分归还';
					break;
				case '51':
					txt = '已确认部分归还';
					break;
				case '52':
					txt = '已回收待确认';
					break;
				default:
					txt = '已完成';
			}
			return txt;
		},
		
		getMore: function(){
			if(this.tabelData[this.tabelIndex].noMore || this.tabelData[this.tabelIndex].loading){
				return;
			}
			if(this.tabelIndex == 4){
				this.reqFeedback(this.tabelData[this.tabelIndex].page, this.pageSize);
			} else{
				this.reqOrder(this.tabelData[this.tabelIndex].page, this.pageSize);
			}
		},
		
		getScrollTop: function(){
			var scrollObj = sessionStorage.getItem('scrollTop');
			if(scrollObj){
				scrollObj = JSON.parse(scrollObj);
				this.tabelData[this.tabelIndex].scrollTop = scrollObj.order;
				scrollObj.order = 0;
				scrollObj = JSON.stringify(scrollObj);
				sessionStorage.setItem('scrollTop', scrollObj);
			} else {
				this.tabelData[this.tabelIndex].scrollTop = document.body.scrollTop;
			}
		},
		
		setScrollTop: function(){
			var scrollObj = sessionStorage.getItem('scrollTop');
			if(scrollObj){
				scrollObj = JSON.parse(scrollObj);
			} else {
				scrollObj = {};
			}
			scrollObj.order = document.body.scrollTop;
			scrollObj = JSON.stringify(scrollObj);
			sessionStorage.setItem('scrollTop', scrollObj);
		},
		
		selectOrder: function(n){
			this.setUrl();
			this.setScrollTop();
			window.location.href = 'order-detail.html?id=' + n;
		},
		
		selectReturn: function(n){
			this.setUrl();
			this.setScrollTop();
			window.location.href = 'order-rtn.html?id=' + n;
		},
		
		selectOrder_rtn: function(n){
			window.location.href = 'order-detail.html?id=' + n;
		},
		
		selectReturn_rtn: function(n){
			window.location.href = 'order-rtn.html?id=' + n;
		},
		
		showGuideAd: function(){
			this.showGuide = !this.showGuide;
		}
	}
});
