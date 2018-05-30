var JWeixinSDKConfigBack = function(){
	var obj = {
		title: '使用指引',
	    desc: '借还书、共享书指引，收费规则，押金如何退还',
	    link: window.location.href,
	    imgUrl: 'http://www.1mks.com/wx/img/vip/vip-add-06-00.jpg'
	}
	WCOnMenuShare(obj);
}
var getCurPos_Baidu_CB = function(s, t, lng, lat){
	if(s === 0){
	    var res = {
	    	longitude: lng,
			latitude: lat
		}
	    vm.reqCaseLi(res);
	} else {
		vm.caseInfo = null;
		alert(t);
	}
}

var vm = new Vue({
	el: '#guide',
	data: {
		showBar: false,
		caseInfo: '',
		caseInfoList: [],
		locationLoading: false,
		locationCancel: false
	},

	created: function() {
		this.$nextTick(function () {
			getJWeixinSDKSignature(window.location.href);
			var params = param2Obj(window.location.href),
				isfrom = params.from;
			if(isfrom != undefined){
				this.showHeaderBar();
			}
			var localCase = localStorage.getItem('caseInfo');
			if(localCase){
				localCase = JSON.parse(decodeURIComponent(localCase));
				var _case = {name: localCase.name, address: localCase.address};
				this.caseInfo = _case;
			}
		});
	},
	
	methods: {
		showHeaderBar: function(){
			this.showBar = !this.showBar;
		},
		
		searchCase: function(){
			top.location.href = '../user/bookcase.html?nextPage=' + top.location.href;
		},
		
		getNearCase: function(){
			this.locationLoading = true;
			var _this = this;
			loadScript_Baidu();
			
			return;
			wx.getLocation({
			    type: 'wgs84',
			    success: function (res) {
			        _this.reqCaseLi(res);
			    },
			    cancel: function (res) {
			    	_this.locationCancel = true;
			    },
			    fail: function (res) {
			    	_this.caseInfo = null;
			    }
			})
		},
		
		reqCaseLi: function(obj){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'OrderOnline_ecase',
				data: {
					method: 'queryECase',
					searchKey: '',
					lng: obj.longitude,
					lat: obj.latitude,
					startIndex: '0',
					pageSize: '3'
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						var list = data.caseList;
						if(list.length > 0){
							_this.caseInfoList = list;
						} else {
							_this.caseInfo = null;
						}
					} else {
						_this.caseInfo = null;
					}
					_this.locationLoading = false;
				},
				error: function(reqObj, errorMsg, catchObj){
					_this.locationLoading = false;
					_this.caseInfo = null;
				}
			})
		}
	}
});
