var getOpenIdSnsapiBase_callback = function(id, type){
	var openid = id;
	localStorage.setItem('openid', openid);
	vm.openid = openid;
};

var vm = new Vue({
	el: '#login',
	data: {
		codeState: 0,
		codeTime: 60,
		setTime: -1,
		buttonText: '获取验证码',
		inputTel: '',
		inputCode: '',
		loginError: '',
		openid: ''
	},

	created: function() {
		this.$nextTick(function () {
			var openid = getOpenidGlobal();
			
			if(openid){
				this.openid = openid;
			} else {
				var params = param2Obj(window.location.href),
					code = params.code;
				
				if(code != undefined){
					getOpenIdSnsapiBase(code, 'fw');
				} else {
					openWeixinBase(window.location.href, 'fw');
				}
			}
		});
	},

	methods: {
		getCode: function(){
			if(this.inputTel == ''){
				alert('请输入手机号');
				return;
			}
			if(this.codeState == 1){
				return;
			}
			
			this.codeState = 1;
			this.buttonText = '重新获取' + this.codeTime + 's';
			var _this = this,
				tel = GETMOBILEPHONE(this.inputTel);
			this.reqCode(tel);
			this.setTime = setInterval(function(){
				_this.setCodeState();
			}, 1000);
		},
		
		setCodeState: function(){
			if(this.codeTime > 0){
				this.codeTime--;
				this.buttonText = '重新获取' + this.codeTime + 's';
			} else {
				clearInterval(this.setTime);
				this.codeTime = 60;
				this.buttonText = '获取验证码';
				this.codeState = 0;
			}
		},
		
		errorTips: function(error){
			var _this = this;
			this.loginError = '错误：' + error;
			setTimeout(function(){
				_this.loginError = '';
			}, 10000);
		},
		
		reqCode: function(n){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'Login',
				data: {
					method: 'sendMsg',
					tel: _this.inputTel,
					md5Tel: n
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						
					} else {
						_this.errorTips(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					_this.errorTips(errorMsg);
				}
			})
		},
		
		reqLogin: function(n){
			var _this = this,
				_url = window.location.href,
				fromPoint = '',
				userFrom = sessionStorage.getItem('userFrom');
			if(userFrom){
				fromPoint = userFrom;
			}
			if(_url.indexOf('order-live.html') > -1){
				fromPoint = 'live';
			}
			
			$.ajax({
				type: "GET",
				url: omdsUrl + 'Login',
				data: {
					method: 'doLogin_wx',
					tel: _this.inputTel,
					md5Tel: n,
					smsCode: _this.inputCode,
					openId: _this.openid,
					fromPoint: fromPoint
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						//登录成功->跳转
						var userInfo = data.userInfo;
						userInfo = encodeURIComponent(JSON.stringify(userInfo));
						localStorage.setItem('userInfo', userInfo);
						_this.goNext();
					} else {
						_this.errorTips(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					_this.errorTips(errorMsg);
				}
			})
		},
		
		doSubmit: function(){
			if(this.inputTel == ''){
				alert('请输入手机号');
				return;
			}
			if(this.inputCode == ''){
				alert('请输入验证码');
				return;
			}
			var tel = GETMOBILEPHONE(this.inputTel);
			this.reqLogin(tel);
		},
		
		goNext: function(){
			var _url = window.location.href,
				params = param2Obj(_url);
			if(params.nextPage){
				window.location.replace(params.nextPage);
			} else {
				goBack();
			}
		}
	}
});
