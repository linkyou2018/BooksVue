var getOpenIdSnsapiBase_callback = function(id, type){
	vm.openid = id;
	localStorage.setItem('openid', id);
	reqUserInfoGlobal(id);
	vm.getPage();
};
var ReqUserInfoBack = function(obj){
	vm.userTel = obj.tel;
	vm.reqGroup();
}

var vm = new Vue({
	el: '#comm_app',
	data: {
		sliderObj: null,
		sliderIndex: 0,
		sliderData: [
			{
				picUrl: '../../img/community/group-cover-08.jpg',
				title: '',
				url: ''
			}
		],
		groupData: [],
		listData: [],
		openid: '',
		userTel: ''
	},

	created: function() {
		this.$nextTick(function () {
			this.initSlider();
			var openId = getOpenidGlobal();
			if(openId){
				this.openid = openId;
				reqUserInfoGlobal(openId);
				this.getPage();
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
				} else {
					this.reqGroupList(3);
					this.getPage();
				}
			}
			
		});
	},
	
	methods: {
		getPage: function(){
			this.reqList();
		},
		
		initSlider: function(){
			var _this = this;
			this.sliderObj = new Swipe(document.getElementById("sliderMain"), {
				auto: 4000,
				callback: function(event, index, elem){
					_this.sliderIndex = index;
				}
			})
		},
		
		reqGroup: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'UserQuery',
				data: {
					method: 'getMyGroup',
					openId: _this.openid
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						var arr = data.groupList;
						if(arr.length > 0){
							var groupObj = arr[0];
							groupObj.groupType = '我的小组';
							_this.groupData.push(groupObj);
							_this.reqGroupList(2);
						} else {
							_this.reqGroupList(3);
						}
					} else {
						_this.reqGroupList(3);
						//alert(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					_this.reqGroupList(3);
				}
			})
		},
		
		reqGroupList: function(n){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Group',
				data: {
					method: 'getGroupList',
					startIndex: 0,
					pageSize: n,
					tel: _this.userTel
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						var arr = data.groupList;
						for(var i=0, l=arr.length; i<l; i++){
							arr[i].groupType = '推荐小组';
							_this.groupData.push(arr[i]);
						}
					} else {
						//alert(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		reqList: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Lesson',
				data: {
					method: 'queryByCategory'
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.listData = data.lessonIndex;
					} else {
						//alert(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		getListTag: function(t){
			var tag = [],
				t = t;
			if(t != ''){
				tag = t.split(',');
			}
			return tag;
		},
		
		selectSlider: function(url){
			if(url != '' && url != undefined){
				top.location.href = url;
			}
		},
		
		doSearch: function(){
			alert('版本更新中…');
		},
		
		createButton: function(){
			//alert('版本更新中…');
			top.location.href = 'group-new.html';
		},
		
		moreGroup: function(){
			//alert('版本更新中…');
			top.location.href = 'group-list.html';
		},
		
		selectGroup: function(id){
			top.location.href = 'group.html?id=' + id;
		},
		
		selectLesson: function(id){
			top.location.href = 'lesson.html?id=' + id;
		},
		
		moreLesson: function(id, name){
			top.location.href = 'lesson-list.html?id=' + id + '&name=' + encodeURIComponent(name);
		}
	}
});
