var vm = new Vue({
	el: '#group_list',
	data: {
		openid: '',
		pageSize: 10,
		tabelIndex: 0,
		tabelActive: [false, false],
		tabelData: [
			{
				name: '我的小组',
				scrollTop: 0,
				page: 0,
				noMore: false,
				loading: false,
				logout: false,
				listData: []
			},
			{
				name: '推荐小组',
				scrollTop: 0,
				page: 0,
				noMore: false,
				loading: false,
				logout: false,
				listData: []
			}
		]
	},

	created: function() {
		this.$nextTick(function () {
			this.getUser();
			this.getParams();
		});
	},

	methods: {
		getUser: function(){
			var openId = getOpenidGlobal();
			if(openId){
				this.openid = openId;
			}
		},
		
		getParams: function(){
			var _url = window.location.href,
				params = param2Obj(_url);
			if(params.tabId != undefined){
				this.tabelIndex = params.tabId;
			}
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
			if(isback){
				this.getScrollTop();
			} else {
				this.tabelData[this.tabelIndex].scrollTop = document.body.scrollTop;
			}
			
			this.tabelActive = [false, false];
			this.tabelActive[i] = true;
			
			var _this = this;
			setTimeout(function(){
				var top = _this.tabelData[i].scrollTop;
				setScrollTop(top);
			}, 0);
			
			this.tabelIndex = i;
			var page = this.tabelData[i].page;
				
			if(isback){
				this.reqGroup(page, (page + 1) * this.pageSize, isback);
			} else if(page == 0){
				this.reqGroup(page, this.pageSize);
			} else {
				history.replaceState({}, document.title, 'group-list.html?tabId=' + i + '&page=' + (page-1));
			}
		},
		
		reqGroup: function(page, size, isback){
			this.tabelData[this.tabelIndex].loading = true;
			history.replaceState({}, document.title, 'group-list.html?tabId=' + this.tabelIndex + '&page=' + page);
			
			var _this = this,
				_url = this.tabelIndex == 0 ? omdsUrl + 'UserQuery' : omqsUrl + 'Group',
				_data = this.tabelIndex == 0 ? {
					method: 'getMyGroup',
					openId: _this.openid
				} : {
					method: 'getGroupList',
					startIndex: isback ? 0 : page*size,
					pageSize: size
				};
				
			page++;
			
			$.ajax({
				type: "GET",
				url: _url,
				data: _data,
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.tabelData[_this.tabelIndex].page = page;
						var list = data.groupList;
						for(var i=0; i<list.length; i++){
							_this.tabelData[_this.tabelIndex].listData.push(list[i]);
						}
						if(list.length < size){
							_this.tabelData[_this.tabelIndex].noMore = true;
						}
					} else {
						if(data.retcode == '-5'){
							_this.tabelData[0].logout = true;
						}
					}
					_this.tabelData[_this.tabelIndex].loading = false;
				},
				error: function(reqObj, errorMsg, catchObj){
					_this.tabelData[_this.tabelIndex].loading = false;
				}
			})
		},
		
		getMore: function(){
			if(this.tabelData[this.tabelIndex].noMore || this.tabelData[this.tabelIndex].loading){
				return;
			}
			this.reqGroup(this.tabelData[this.tabelIndex].page, this.pageSize);
		},
		
		getScrollTop: function(){
			var scrollObj = sessionStorage.getItem('scrollTop');
			if(scrollObj){
				scrollObj = JSON.parse(scrollObj);
				this.tabelData[this.tabelIndex].scrollTop = scrollObj.grouplist;
				scrollObj.grouplist = 0;
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
			scrollObj.grouplist = document.body.scrollTop;
			scrollObj = JSON.stringify(scrollObj);
			sessionStorage.setItem('scrollTop', scrollObj);
		},
		
		selectGroup: function(n){
			this.setScrollTop();
			window.location.href = 'group.html?id=' + n;
		},
		
		groupMore: function(n){
			this.setScrollTop();
			window.location.href = 'group-sort.html?id=' + n;
		}
	}
});
