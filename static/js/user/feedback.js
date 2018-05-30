var vm = new Vue({
	el: '#feedback',
	data: {
		openid: '',
		inputArea: ''
	},

	created: function() {
		/*this.$nextTick(function () {
			var openId = getOpenidGlobal();
			if(openId){
				this.openid = openId;
			} else {
				window.location.href = 'login.html?nextPage=' + window.location.href;
			}
			loadingIconHide();
		});本地测试注释掉登录页*/
	},

	methods: {
		doSubmit: function(){
			if(this.inputArea == ''){
				alert('请输入您的问题');
				return;
			}
			loadingIconShow();
			
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'FAQ',
				data: {
					method: 'doSubmit',
					content_FAQ: _this.inputArea,
					openId: _this.openid
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.goNext();
					} else {
						loadingIconHide();
						alert(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					loadingIconHide();
					alert(errorMsg);
				}
			})
		},
		
		goNext: function(){
			loadingIconHide();
			alert('提交成功\n请在“我的-客服”查看回复');
			var _url = window.location.href,
				params = param2Obj(_url);
			if(params.nextPage){
				window.location.replace(params.nextPage);
			} else {
				sessionStorage.setItem('indexTabel', 4);
				window.location.replace('../../index.html?tabIndex=4');
			}
		}
	}
});
