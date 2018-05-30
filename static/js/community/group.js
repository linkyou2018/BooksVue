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
	el: '#group_dets',
	data: {
		openid: '',
		groupId: '',
		groupObj: {
			cover: '../../img/community/group-cover-07.jpg',
			img: '',
			name: '',
			intro: '',
			area: '',
			member: '0'
		},
		isInto: false,
		isSign: false,
		isHideIntro: true,
		groupTableIndex: 0,
		groupTable: [
			{
				name: '书单',
				state: false,
				list: []
			},
			{
				name: '',
				state: false,
				list: []
			},
			{
				name: '',
				state: false,
				list: {
					addlist: [],
					postlist:[]
				}
			}
			/*,
			{
				name: '课程',
				state: false,
				list: []
			},
			{
				name: '贴子',
				state: false,
				list: {
					addlist: [
						{
							id: '1',
							type_name: '课程',
							name: '天文地理，民俗民风之典范——山海经',
							num: '36'
						},
						{
							id: '2',
							type_name: '课程',
							name: '欧美哲学通史辅导课程之—经验信息交流课',
							num: '20'
						}
					],
					postlist:[
						{
							id: '3',
							pop: '0',
							headerImg: '../../img/booklist/booklist-list-01.png',
							nickname: '一只特立独行的猪',
							desc: '如果你也爱王小波，正如他所说做一个有趣的人，拥有一个有趣的灵魂',
							img: 'http://onemeter.b0.upaiyun.com/omms/isbn/1498380024481_9787550239975',
							num: '6',
							createdate: '1小时前更新'
						},
						{
							id: '4',
							pop: '1',
							headerImg: '../../img/booklist/booklist-list-01.png',
							nickname: '一只特立独行的猪',
							desc: '和很多爸爸一样猪爸爸麦洛普先生爱动脑钻研爱动手鼓捣些小玩意，还经常搞出些大家伙，还经常搞出些大家伙',
							img: '',
							num: '256',
							createdate: '06-28'
						}
					]
				}
			}
			*/
		],
		showCoverState: false,
		showCoverText: ''
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
			if(params.id != undefined){
				this.groupId = params.id;
				this.reqGroup();
			}
			if(params.tabId != undefined){
				this.groupTableIndex = params.tabId;
			}
			this.selectTable(this.groupTableIndex);
		},
		
		selectTable: function(i){
			if(i != 0){
				return;
			}
			this.groupTable[this.groupTableIndex].state = false;
			this.groupTableIndex = i;
			this.groupTable[this.groupTableIndex].state = true;
			history.replaceState({}, document.title, 'group.html?id=' + this.groupId + '&tabId=' + this.groupTableIndex);
			
			if(i == 0 && this.groupTable[0].list.length == 0){
				this.reqBooklist();
			} else if(i == 1 && this.groupTable[1].list.length == 0){
				this.reqLesson();
			}
		},
		
		inGroup: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'Group',
				data: {
					method: 'join',
					groupId: _this.groupId,
					openId: _this.openid
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						//_this.isInto = true;
						_this.reqGroup();
						alert('加入小组成功');
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
		
		reqGroup: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'Group',
				data: {
					method: 'get',
					groupId: _this.groupId
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						var obj = data.group;
						if(obj.main_pic != '')_this.groupObj.img = obj.main_pic;
						if(obj.name != '')_this.groupObj.name = obj.name;
						if(obj.descp != '')_this.groupObj.intro = obj.descp;
						if(obj.area != '')_this.groupObj.area = obj.area;
						if(obj.userList != undefined){
							_this.groupObj.member = obj.userList.length;
							for(var i=0, l=obj.userList.length; i<l; i++){
								var _id = obj.userList[i].user_openid;
								if(_this.openid == _id){
									_this.isInto = true;
									break;
								}
							}
						}
						getJWeixinSDKSignature(window.location.href);
					} else {
						
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
				url: omdsUrl + 'Group',
				data: {
					method: 'queryBookList',
					groupId: _this.groupId
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.groupTable[0].list = data.bookListArray;
					} else {
						
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		reqLesson: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'Group',
				data: {
					method: 'queryLessonList',
					groupId: _this.groupId
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.groupTable[1].list = data.lessonListArray;
					} else {
						
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		showMember: function(){
			window.location.href = 'group-member.html?id=' + this.groupId;
		},
		
		signIn: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omdsUrl + 'Group',
				data: {
					method: 'sign',
					groupId: _this.groupId,
					openId: _this.openid
				},
				success: function(data){
					_this.isSign = !_this.isSign;
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.showCoverText = '打卡成功';
					} else {
						_this.showCoverText = data.retmsg;
					}
					_this.showCover();
				},
				error: function(reqObj, errorMsg, catchObj){
					alert(errorMsg);
				}
			})
		},
		
		showCover: function(){
			this.showCoverState = !this.showCoverState;
		},
		
		showIntro: function(){
			this.isHideIntro = !this.isHideIntro;
		},
		
		moreBooklist: function(id){
			window.location.href = '../booklist/booklist-detail.html?id=' + id;
		},
		
		selectBook: function(id){
			window.location.href = '../bookdetail/book-detail.html?id=' + id;
		},
		
		getListTag: function(t){
			var tag = [],
				t = t;
			if(t != ''){
				tag = t.split(',');
			}
			return tag;
		},
		
		setWCShareObj: function(){
			var _this = this,
				obj = {
					title: '邀请加入：' + _this.groupObj.name,
				    desc: _this.groupObj.intro,
				    link: window.location.href,
				    imgUrl: _this.groupObj.img
				}
			WCOnMenuShare(obj);
		}
	}
});
