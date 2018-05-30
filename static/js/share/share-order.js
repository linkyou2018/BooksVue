var vm = new Vue({
	el: '#share_order',
	data: {
		openid: '',
		scrollTop: 0,
		listData: [],
		localData:[]
	},

	created: function() {
		this.$nextTick(function () {
			this.getPage();
		});
	},

	methods: {
		getPage: function(){
			var data = localStorage.getItem('shareBookData');
			if(data){
				data = JSON.parse(decodeURIComponent(data));
				this.localData = data;
			}
			
			var id = getOpenidGlobal();
			if(id){
				this.openid = id;
				this.reqOrder();
			}
		},
		
		reqOrder: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'UserQuery',
				data: {
					method: 'shareOrderQuery',
					openId: _this.openid
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.listData = data.orderList;
					} else {
						alert(data.retmsg);
					}
					loadingIconHide();
				},
				error: function(reqObj, errorMsg, catchObj){
					loadingIconHide();
				}
			})
		},
		
		getScrollTop: function(){
			var scrollObj = sessionStorage.getItem('scrollTop');
			if(scrollObj){
				scrollObj = JSON.parse(scrollObj);
				this.scrollTop = scrollObj.shareOrder;
				scrollObj.shareOrder = 0;
				scrollObj = JSON.stringify(scrollObj);
				sessionStorage.setItem('scrollTop', scrollObj);
			} else {
				this.scrollTop = document.body.scrollTop;
			}
		},
		
		setScrollTop: function(){
			var scrollObj = sessionStorage.getItem('scrollTop');
			if(scrollObj){
				scrollObj = JSON.parse(scrollObj);
			} else {
				scrollObj = {};
			}
			scrollObj.shareOrder = document.body.scrollTop;
			scrollObj = JSON.stringify(scrollObj);
			sessionStorage.setItem('scrollTop', scrollObj);
		},
		
		selectOrder: function(n){
			//this.setScrollTop();
			//window.location.href = 'share-detail.html?id=' + n;
		},
		
		reqCasecode: function(id, i){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'ShareBook',
				data: {
					method: 'rePutin',
					openId: _this.openid,
					orderNo: id
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.listData[i].isOverdue = '0';
						_this.listData[i].putin_code = '';
					} else {
						alert(data.retmsg);
					}
					loadingIconHide();
				},
				error: function(reqObj, errorMsg, catchObj){
					loadingIconHide();
				}
			})
		},
		
		submit: function(){
			sessionStorage.setItem('indexTabel', '0');
			window.location.href = '../../index.html';
		},
		
		goSubmit: function(){
			window.location.href = 'share-list.html';
		}
	}
});
