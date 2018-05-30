var JWeixinSDKConfigBack = function(){
	vm.setWCShareObj();
}
var showShare = function(){
	document.getElementById('share').style.display = 'block';
}
var shareCancel = function(){
	document.getElementById('share').style.display = 'none';
}

var vm = new Vue({
	el: '#bookdetail',
	data: {
		showBar: true,
		params: null,
		isHideIntro: true,
		cover: '../../img/bookdetail/bookdetail-cover-02.jpg',
		bookimg: '',
		bookname: '',
		author: '',
		press: '',
		tag: '',
		bookIntro: '',
		count: '0',
		score: '0',
		tabTag: '',
		rulePay: '',
		sendPay: '',
		canBorrow: '0',
		badge: '0',
		commentData: {
			count: '0',
			listData: []
		},
		booklistData: [],
		listId: '',
		userLocal: null,
		openid: '',
		isAddBag: false,
		showGlobalTips: false,
		globalTipsTime: -1,
		isShowAudio: false,
		audioURL: '',
		audioDuration: '',
		audioDurrentTime: '0:00',
		audioPlaying: false,
		isLoaded: true,
		netConform: false,
		audioTips: ''
	},

	created: function() {
		this.$nextTick(function () {
			this.getUser();
		});
	},

	methods: {
		getUser: function(){
			var id = getOpenidGlobal();
			if(id){
				this.openid = id;
			}
			var local = localStorage.getItem('userInfo');
			if(local){
				local = JSON.parse(decodeURIComponent(local));
				this.userLocal = local;
			}
			this.getParams();
		},
		
		getParams: function(){
			var _url = window.location.href;
			this.params = param2Obj(_url);
			this.reqBookdetail();
			this.reqScore();
			this.reqComment();
			this.reqBooklist();
			this.reqBagList();
		},
		
		setDetailStar: function(score){
			var star = [];
			var s = Math.ceil(parseFloat(score)/2);
			for(var i=0; i<5; i++){
				if(i < s)star[i] = true;
				else star[i] = false;
			}
			return star;
		},
		
		showHeaderBar: function(){
			this.showBar = !this.showBar;
		},
		
		showIntro: function(){
			this.isHideIntro = !this.isHideIntro;
		},
		
		showAudio: function(){
			if(Media){
				Media.pause();
			}
			this.isShowAudio = !this.isShowAudio;
		},
		
		getMoreComment: function(){
			window.location.href = 'book-comment.html?id=' + this.params.id;
		},
		
		getCatalog: function(){
			window.location.href = 'book-catalog.html?id=' + this.params.id;
		},
		
		submit: function(){
			if(this.userLocal == null){
				window.location.href = '../user/login.html?nextPage=' + window.location.href;
				return;
			}
			
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'OrderLive',
				data: {
					method: 'make',
					tel: _this.userLocal.tel,
					imei: _this.openid,
					openId: _this.openid,
					boxQrCode: _this.params.boxCode,
					accessToken: _this.params.token
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						window.location.replace('../order/order-offline.html?caseNo=' + data.boxNo);
					} else {
						var retObj = reqCallback_Retcode(data.retcode);
						alert(retObj.msg);
						if(retObj.url != ''){
							window.location.href = retObj.url;
						}
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		submitOnline: function(){
			this.setOrderOnline();
			window.location.href = '../order/order-online.html';
		},
		
		setOrderOnline: function(){
			var _this = this,
				orderOnline = sessionStorage.getItem('orderOnline');
			if(orderOnline){
				sessionStorage.removeItem('orderOnline');
			}
			orderOnline = [{
				"isbn": _this.params.id,
				"pop": _this.tabTag,
				"pay": _this.rulePay,
				"img": _this.bookimg,
				"name": _this.bookname,
				"author": _this.author
			}];
			orderOnline = encodeURIComponent(JSON.stringify(orderOnline));
			sessionStorage.setItem('orderOnline', orderOnline);
		},
		//传递记录
		showNotes: function(){
			window.location.href = 'book-notes.html';
		},
		showBag: function(){
			window.location.href = '../bag/bag.html';
		},
		
		showGTips: function(){
			var _this = this;
			this.showGlobalTips = true;
			clearTimeout(_this.globalTipsTime);
			this.globalTipsTime = setTimeout(function(){
				_this.showGlobalTips = false;
			}, 3000);
		},
		
		showRule: function(){
			window.location.href = '../home/payRule.html';
		},
		
		/*toBuycard: function(){
			var _url = window.location.href;
			window.location.replace('../vip/vip-buy.html?nextPage=' + _url);
		}, VIP借书*/
		
		addBag: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'UserFavorites',
				data: {
					method: 'add',
					isbn: _this.params.id,
					isbnName: _this.bookname,
					isbnAuthor: _this.author,
					isbnPicUrl: _this.bookimg,
					openId: _this.openid
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.showGTips();
						_this.isAddBag = true;
						_this.reqBagList();
						//_this.badge = data.bookAmount;
					} else {
						var retObj = reqCallback_Retcode(data.retcode);
						alert(retObj.msg);
						if(retObj.url != ''){
							window.location.href = retObj.url;
						}
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					alert('加入失败：' + errorMsg);
				}
			})
		},
		
		reqBagList: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'UserFavorites',
				data: {
					method: 'query',
					startIndex: '0',
					pageSize: '0',
					openId: _this.openid
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.badge = data.favInfo.bookAmount;
					} else {
						
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		reqBookdetail: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'BookDetail',
				data: {
					method: 'getBookDesc',
					isbn: _this.params.id
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						if(data.bookDesc.length <= 0){
							return;
						}
						var obj = data.bookDesc[0];
						_this.bookimg = obj.pic == undefined ? _this.bookimg : obj.pic;
						_this.bookname = obj.bookName == undefined ? _this.bookname : obj.bookName;
						_this.author = obj.author == undefined ? _this.author : obj.author;
						_this.press = obj.press == undefined ? _this.press : obj.press;
						_this.tag = obj.label == undefined ? _this.tag : obj.label;
						_this.bookIntro = obj.content == undefined ? _this.bookIntro : obj.content;
						_this.tag = _this.tag.split('#');
						if(obj.hadAudio == '1'){
							_this.isShowAudio = true;
							_this.reqAudio();
						}
						
						getJWeixinSDKSignature(window.location.href);
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},

		reqScore: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'BookDetail',
				data: {
					method: 'getBorrowNumAndFeeRule',
					isbn: _this.params.id
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						if(data.data.length <= 0){
							return;
						}
						var obj = data.data[0];
						_this.score = obj.score == undefined || obj.score == '' ? _this.score : obj.score;
						_this.count = obj.totalView == undefined || obj.totalView == '' ? _this.count : obj.totalView;
						_this.tabTag = obj.ruleName == undefined ? _this.tabTag : obj.ruleName;
						_this.rulePay = obj.ruleDescp == undefined ? _this.rulePay : obj.ruleDescp;
						_this.sendPay = obj.sendFee == undefined ? _this.sendPay : obj.sendFee;
						_this.canBorrow = obj.canBorrow == undefined ? _this.canBorrow : obj.canBorrow;
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		reqComment: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'BookDetail',
				data: {
					method: 'getComment',
					isbn: _this.params.id
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.commentData.count = data.data.totalComment;
						_this.commentData.listData = data.data.bookCommetList;
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		reqBooklist: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'BookDetail',
				data: {
					method: 'getRecommendBooks',
					isbn: _this.params.id
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.listId = data.recommendBook.list_id == undefined ? _this.listId : data.recommendBook.list_id;
						_this.booklistData = data.recommendBook.bookList;
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		setWCShareObj: function(){
			var tagState = '2',
				t = this.tag;
			for(var i=0; i<t.length; i++){
				if(t[i] == '童书'){
					tagState = '1';
					break;
				}
			}
			var _this = this,
				descObj = {
					'1': '幼儿园到初中上万本童书，分级分类书单推荐，给每个孩子最适合的书',
					'2': '万册精选图书随心借，每周读一本书，从优秀到卓越'
				},
				obj = {
					title: '【1元借书24小时送达】' + _this.bookname,
				    desc: descObj[tagState] || '一米看书，首个共享型图书馆，来感受一本书的力量',
				    link: window.location.href,
				    imgUrl: _this.bookimg
				}
			WCOnMenuShare(obj);
		},
		
		reqAudio: function(){
			var _this = this;
			
			/*if(!this.isLoaded){
				window.location.href = '../user/login.html?nextPage=' + window.location.href;
				return;
			} 未登录试听*/
			if(this.audioURL != ''){
				if(!this.netConform){
					var wx = isWX();
					if(wx){
						var netObj = {
								success: function (res) {
			        				var net = res.networkType;
			        				if(net != 'wifi'){
			        					var c = confirm('当前网络：' + net + '，确定要继续播放吗？');
										if(c){
											_this.netConform = true;
											playerTag();
										}
			        				} else {
			        					playerTag();
			        				}
			    				}
							}
						WCGetNetworkType(netObj);
					} else {
						var c = confirm('未能识别网络类型，可能需要使用运营商流量，确定要继续播放吗？');
						if(c){
							_this.netConform = true;
							playerTag();
						}
					}
				} else {
					playerTag();
				}
				return;
			} else if(this.audioTips != ''){
				alert(this.audioTips);
				return;
			}
			
			$.ajax({
				type: "GET",
				url: omdsUrl + 'Vedio',
				data: {
					method: 'play',
					isbn: _this.params.id,
					openId: _this.openid
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.audioURL = data.vedioURL;
						initMedia();
					} else if(data.retcode == '-5'){
						_this.isLoaded = false;
					} else {
						var retObj = reqCallback_Retcode(data.retcode);
						_this.audioTips = retObj.msg;
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		}
	}
});
