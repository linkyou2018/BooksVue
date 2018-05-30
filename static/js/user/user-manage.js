var vm = new Vue({
	el: '#user_manage',
	data: {
		setTime: -1,
		loginError: '',
		openid: '',
		inputNickname: '',
		sex: '2',
		grade: '',
		gradeArr: ['成年', '幼儿园', '小一', '小二', '小三', '小四', '小五', '小六', '初一', '初二', '初三'],
		area: '',
		areaArr: ['福田', '罗湖', '南山'],
		reqState: 1
	},

	created: function() {
		/*this.$nextTick(function () {
			var openId = getOpenidGlobal();
			if(openId){
				this.openid = openId;
				reqUserInfoGlobal(openId);
			} else {
				window.location.href = 'login.html?nextPage=' + window.location.href;
			}
			loadingIconHide();
		});*/
	},

	methods: {
		initUserInfo: function(obj){
			this.inputNickname = obj.nickName;
			this.sex = obj.sex == '' ? '2' : obj.sex;
			this.grade = obj.grade;
			this.area = obj.area;
		},
		
		selectSex: function(i){
			this.sex = i;
		},
		
		errorTips: function(error){
			clearTimeout(this.setTime);
			var _this = this;
			this.loginError = '错误：' + error;
			this.setTime = setTimeout(function(){
				_this.loginError = '';
			}, 10000);
		},
		
		reqUserInfo: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'UserQuery',
				data: {
					method: 'updateUserInfoAndJoin',
					nickName: _this.inputNickname,
					sex: _this.sex,
					grade: _this.grade,
					city: '深圳',
					area: _this.area,
					headImg: '',
					openId: _this.openid
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.reqState = 2;
						reqUserInfoGlobal(_this.openid);
					} else {
						_this.errorTips(data.retmsg);
						loadingIconHide();
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					_this.errorTips(errorMsg);
					loadingIconHide();
				}
			})
		},
		
		doSubmit: function(){
			if(this.inputNickname == ''){
				alert('请输入昵称');
				return;
			}
			if(this.grade == ''){
				alert('请选择年级');
				return;
			}
			if(this.area == ''){
				alert('请选择区域');
				return;
			}
			loadingIconShow();
			this.reqUserInfo();
		},
		
		goNext: function(){
			loadingIconHide();
			var _url = window.location.href,
				params = param2Obj(_url);
			if(params.nextPage){
				window.location.replace(params.nextPage);
			} else {
				sessionStorage.setItem('indexTabel', 3);
				window.location.replace('../../index.html?tabIndex=3');
			}
		}
	}
});

var ReqUserInfoBack = function(obj){
	if(vm.reqState == 2){
		vm.goNext();
	} else {
		vm.initUserInfo(obj);
	}
}
