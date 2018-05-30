var JWeixinSDKConfigBack = function(){
	var obj = {
		title: '贡献1本书，拥有一个图书馆',
	    desc: '闲置书共享换借书币，免费读万千好书',
	    link: window.location.href,
	    imgUrl: 'http://www.1mks.com/wx/img/vip/vip-add-06-00.jpg'
	}
	WCOnMenuShare(obj);
}

var vm = new Vue({
	el: '#caseresult',
	data: {
		accessToken: '',
		booklistData: [],
		caseCode: '',
		userLocal: null
	},

	created: function() {
		this.$nextTick(function () {
			getJWeixinSDKSignature(window.location.href);
		});
	},

	methods: {
		getUser: function(){
			var local = localStorage.getItem('userInfo');
			if(local){
				local = JSON.parse(decodeURIComponent(local));
				this.userLocal = local;
				this.getParams();
			} else {
				var url = window.location.href;
				//window.location.href = '../user/login.html?nextPage=' + url;
				window.location.href = url;//本地测试
			}
		},
		
		getParams: function(){
			var _url = window.location.href,
				params = param2Obj(_url),
				caseCode = params.groupQrCode;
			if(caseCode != undefined){
				this.caseCode = caseCode;
				this.reqOrder();
			}
		},
		
		reqOrder: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'OrderOnline',
				data: {
					method: 'preGetBook',
					tel: _this.userLocal.tel,
					imei: _this.userLocal.openId,
					openId: _this.userLocal.openId,
					groupQrCode: _this.caseCode
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.booklistData = data.boxList;
						_this.accessToken = data.accessToken;
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		reqGet: function(){
			var _this = this,
				code = '',
				caseNo = '',
				list = this.booklistData;
			for(var i=0; i<list.length; i++){
				if(code == ''){
					code += list[i].boxQrCode;
					caseNo += list[i].boxNo;
				} else {
					code += ',' + list[i].boxQrCode;
					caseNo += ',' + list[i].boxNo;
				}
			}
			$.ajax({
				type: "GET",
				url: omdsUrl + 'OrderOnline',
				data: {
					method: 'getBook',
					tel: _this.userLocal.tel,
					imei: _this.userLocal.openId,
					openId: _this.userLocal.openId,
					groupQrCode: _this.caseCode,
					accessToken: _this.accessToken
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						window.location.replace('../order/order-offline.html?caseNo=' + caseNo);
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		submit: function(){
			this.reqGet();
		},
		
		toShare: function(){
			var local = localStorage.getItem('userInfo');
			if(local){
				window.location.href = '../share/share-list.html';
			} else {
				var url = '../share/share-list.html';
				//window.location.href = '../user/login.html?nextPage=' + url;
				window.location.href = url;//本地测试
			}
		}
	}
});
