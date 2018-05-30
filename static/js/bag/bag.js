var getOpenIdSnsapiBase_callback = function(id, type){
	var openid = id;
	localStorage.setItem('openid', openid);
	vm.openid = openid;
	vm.reqBagList();
};

var vm = new Vue({
	el: '#bag_app',
	data: {
		duration: 0,
		transform: 0,
		sliderOpen: false,
		sliderIndex: 0,
		sliderOpenX: Math.ceil(document.body.clientWidth * 0.24),
		sliderOpenY: '8.5rem',
		listData: [{
			      mode: 'scaleToFill',
			      text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
			    }

		],//本地测试数据
		chechedData: [],
		openid: '',
		footerHeight: 0,
		footerBottom: 0,
		footerShow: false,
		pageIndex: 0,
		pageSize: 10,
		noMore: false,
		loading: false
	},

	created: function() {
		this.$nextTick(function () {
			this.getPage();
		});
	},

	methods: {
		getPage: function(){
			this.footerHeight = document.querySelector('.bag-footer').clientHeight;
			var id = getOpenidGlobal();
			if(id){
				this.openid = id;
				this.reqBagList();
			} else {
				var wx = isWX();
				if(wx){
					var params = param2Obj(window.location.href),
						code = params.code;
					if(code != undefined){
						getOpenIdSnsapiBase(code, 'fw');
					} else {
						openWeixinBase(window.location.href, 'fw');
					}
				}
			}
			this.setSliderOpenY();
		},
		
		setFooterHeight: function(){
			this.$nextTick(function () {
				var aftHeight = document.querySelector('.bag-footer').clientHeight;
				this.footerBottom = -(aftHeight - this.footerHeight);
			});
		},
		
		doListCheck: function(i){
			var can = this.listData[i].canBorrow;
			if(can == '0'){
				return;
			}
			
			this.listData[i].check = !this.listData[i].check;
			var check = this.listData[i].check;
			if(check){
				this.chechedData.unshift(this.listData[i]);
			} else {
				var length = this.chechedData.length,
					favId = this.listData[i].favId;
				for(var j=0; j<length; j++){
					var _favId = this.chechedData[j].favId;
					if(_favId == favId){
						this.chechedData.splice(j, 1);
						break;
					}
				}
			}
			
			this.setFooterHeight();
			this.setCheckData();
		},
		
		checkCancel: function(id, j){
			var length = this.listData.length,
				check = true;
			for(var i=0; i<length; i++){
				var favId = this.listData[i].favId;
				if(favId == id){
					check = false;
					this.doListCheck(i);
					break;
				}
			}
			if(check){
				this.chechedData.splice(j, 1);
				this.setFooterHeight();
				this.setCheckData();
			}
		},
		
		footerListShow: function(){
			this.footerShow = !this.footerShow;
		},
		
		getCheckData: function(arr){
			var data = localStorage.getItem('bagCheckData'),
				length = 0;
			if(data){
				data = JSON.parse(decodeURIComponent(data));
				length = data.length;
				//this.chechedData = data;
			}
			
			var list = arr;
			for(var i=0; i<list.length; i++){
				list[i].check = false;
				var i_favId = list[i].favId,
					can = list[i].canBorrow;
				for(var j=0; j<length; j++){
					var j_favId = data[j].favId;
					if(j_favId == i_favId && can != '0'){
						this.chechedData.push(data[j]);
						list[i].check = true;
					}
				}
				this.listData.push(list[i]);
			}
			this.setFooterHeight();
			this.setSliderOpenY();
		},
		
		setCheckData: function(){
			localStorage.removeItem('bagCheckData');
			var bookdata = encodeURIComponent(JSON.stringify(this.chechedData));
			localStorage.setItem('bagCheckData', bookdata);
		},
		
		doSubmit: function(){
			if(this.chechedData.length <= 0){
				alert('请选择图书');
				return;
			}
			var _this = this,
				orderOnline = sessionStorage.getItem('orderOnline'),
				orderData = [],
				list = this.chechedData;
			if(orderOnline){
				sessionStorage.removeItem('orderOnline');
			}
			for(var i=0; i<list.length; i++){
				var obj = list[i];
				var d = {
					"isbn": obj.isbn,
					"pop": '',
					"pay": '',
					"img": obj.isbnPicUrl,
					"name": obj.isbnName,
					"author": obj.isbnAuthor
				}
				orderData.push(d);
			}
			orderOnline = encodeURIComponent(JSON.stringify(orderData));
			sessionStorage.setItem('orderOnline', orderOnline);
			window.location.href = '../order/order-online.html';
		},
		
		reqBagList: function(i){
			this.loading = true;
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'UserFavorites',
				data: {
					method: 'query',
					startIndex: _this.pageIndex * _this.pageSize,
					pageSize: _this.pageSize,
					openId: _this.openid
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						var list = data.favInfo.bookList;
						if(list.length < _this.pageSize){
							_this.noMore = true;
						}
						_this.getCheckData(list);
					} else {
						
					}
					_this.loading = false;
					loadingIconHide();
				},
				error: function(reqObj, errorMsg, catchObj){
					_this.loading = false;
					loadingIconHide();
				}
			})
		},
		
		getMore: function(){
			if(this.noMore || this.loading){
				return;
			}
			this.pageIndex++;
			this.reqBagList();
		},
		
		setSliderOpenY: function(){
			this.$nextTick(function () {
				var botton = document.querySelector('.list-slider-button');
				if(botton != null){
					this.sliderOpenY = botton.clientHeight + 'px';
				}
			});
		},
		
		listSliderStart: function(ts, i){
			var e = ts.event;
			this.start = {
				pageX: e.touches[0].pageX,
				pageY: e.touches[0].pageY,
				time: Number(new Date())
			};
			this.isScrolling = undefined;
			this.deltaX = 0;
			this.duration = 0;
			this.clientWidth = - document.body.clientWidth / 3;
			if(this.sliderOpen){
				this.listSlide(false);
			} else {
				this.sliderIndex = i;
			}
		},
		
		listSliderMove: function(ts){
			if(this.sliderOpen){
				return;
			}
			var e = ts.event;
			if(e.touches.length>1 || e.scale && e.scale!==1){
				return;
			}
			this.deltaX = e.touches[0].pageX - this.start.pageX;
			if(typeof this.isScrolling == 'undefined'){
				this.isScrolling = !!(this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY))
			}
			if(!this.isScrolling){
				if(this.deltaX > 0){
					this.deltaX = 0;
				} else if(this.deltaX < this.clientWidth) {
					this.deltaX = this.clientWidth;
				}
				this.transform = this.deltaX;
				setSliderTransform();
			}
		},
		
		listSliderEnd: function(ts){
			if(this.sliderOpen){
				this.sliderOpen = false;
				return;
			}
			var e = ts.event;
			this.sliderOpen = Number(new Date()) - this.start.time < 250 && Math.abs(this.deltaX) > 20 || Math.abs(this.deltaX) > Math.abs(this.clientWidth)/2;
			if(!this.isScrolling){
				this.listSlide(this.sliderOpen);
			} else {
				this.sliderOpen = false;
			}
		},
		
		listSlide: function(s, n){
			this.duration = 300;
			if(s){
				this.transform = - this.sliderOpenX;
			} else {
				this.transform = 0;
			}
			setSliderTransform(n);
		},
		
		deleteList: function(i){
			var check = this.listData[i].check;
			if(check){
				this.doListCheck(i);
			}
			
			this.listSlide(false, 'delete');
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'UserFavorites',
				data: {
					method: 'delete',
					openId: _this.openid,
					favIds: _this.listData[i].favId
				},
				success: function(data){
					
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		}
	}
});
