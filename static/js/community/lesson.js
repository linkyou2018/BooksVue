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
	el: '#lesson',
	data: {
		openid: '',
		userLocal: null,
		lessonId: '',
		lessonObj: {
			cover: '../../img/community/group-cover-07.jpg',
			lessonPic: '',
			lessonName: '',
			lessonDesc: '',
			lessonLabel: '',
			lessonPrice: '0',
			lessonTeacher: '',
			teacherHeadPic: '',
			lessonTeacherDesc: '',
			lessonLongDesc: '',
			isbn: '',
			audio_url: ''
		},
		isHideIntro: true,
		lessonTabIndex: 0,
		lessonTab: [
			{
				name: '简介',
				state: false
			},
			{
				name: '课程',
				state: false
			}
		],
		lessonListData: [],
		minutes_total: '0:00',
		chapterId: '',
		chapterIndex: 0,
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
			var _url = window.location.href,
				params = param2Obj(_url);
			this.lessonId = params.id;
			this.reqLesson();
			this.reqLessonList();
			this.selectTable(0);
		},
		
		selectTable: function(i){
			this.lessonTab[this.lessonTabIndex].state = false;
			this.lessonTabIndex = i;
			this.lessonTab[this.lessonTabIndex].state = true;
			
			if(i == 1 && this.lessonListData.length == 0){
				//请求课程数据
				//this.reqLessonList();
			}
		},
		
		getListTag: function(t){
			var tag = [],
				t = t;
			if(t != ''){
				tag = t.split(',');
			}
			return tag;
		},
		
		reqLesson: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Lesson',
				data: {
					method: 'getLessonDetail',
					lessonId: _this.lessonId
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						var obj = data.lesson;
						for(var k in obj){
							_this.lessonObj[k] = obj[k];
						}
						if(obj.audio_url != ''){
							_this.reqAudioURL_lesson();
						}
						
						getJWeixinSDKSignature(window.location.href);
					} else {
						
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		reqLessonList: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Lesson',
				data: {
					method: 'getLessonDetailAll',
					lessonId: _this.lessonId
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.minutes_total = data.minutes_total;
						var arr = data.detailList;
						for(var i=0, l=arr.length; i<l; i++){
							var width = 2,
								audioTime = arr[i].minutes;
							width = parseInt(audioTime)/60;
							if(width < 2)width = 2;
							if(width > 10)width = 10;
							arr[i].audioWidth = width;
							_this.lessonListData.push(arr[i]);
						}
					} else {
						
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		showIntro: function(){
			this.isHideIntro = !this.isHideIntro;
		},
		
		selectBook: function(id){
			if(id == ''){
				window.location.href = '../booklist/booklist-sort.html?t=borrow&listId=31';
			} else {
				window.location.href = '../bookdetail/book-detail.html?id=' + id;
			}
		},
		
		showAudio: function(){
			if(Media){
				Media.pause();
			}
			this.isShowAudio = !this.isShowAudio;
		},
		
		showAudioBar: function(){
			if(this.lessonTabIndex == '1'){
				this.isShowAudio = false;
			} else {
				this.isShowAudio = true;
			}
		},
		
		reqAudio: function(id, i){
			var _this = this;
			
			if(!this.isLoaded){
				window.location.href = '../user/login.html?nextPage=' + window.location.href;
				return;
			}
			if(this.audioTips != ''){
				alert(this.audioTips);
				return;
			}
			if(id != undefined){
				this.playChapter(id, i);
				return;
			} else {
				var i = this.chapterIndex,
					id = this.lessonListData[i].id;
				this.playChapter(id, i);
				return;
			}
			
			return;
			if(this.audioURL != ''){
				this.playLesson();
				return;
			}
			
			this.reqAudioURL_lesson();
		},
		
		playLesson: function(){
			var _this = this;
			//重置播放器状态
			if(this.chapterId != ''){
				this.chapterId = '';
				Media.src = this.audioURL;
				Media.load();
				Media.pause();
				this.audioPlaying = false;
			}
			this.audioState();
		},
		
		playChapter: function(id, i){
			var _this = this;
			if(this.chapterId == id){
				playerTag();
				return;
			}
			this.reqAudioURL_chapter(id, i);
		},
		
		resetChapter: function(id, i, url){
			this.chapterId = id;
			this.chapterIndex = i;
			Media.src = url;
			Media.load();
			Media.pause();
			this.audioPlaying = false;
		},
		
		audioPlayEnded: function(){
			if(this.chapterId == '' || this.chapterIndex == this.lessonListData.length-1){
				return;
			}
			var i = this.chapterIndex + 1,
				id = this.lessonListData[i].id;
			this.reqAudioURL_chapter(id, i);
		},
		
		audioState: function(id, i, url){
			var _this = this;
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
										if(id != undefined)_this.resetChapter(id, i, url);
										playerTag();
									}
		        				} else {
		        					if(id != undefined)_this.resetChapter(id, i, url);
		        					playerTag();
		        				}
		    				}
						}
					WCGetNetworkType(netObj);
				} else {
					var c = confirm('未能识别网络类型，可能需要使用运营商流量，确定要继续播放吗？');
					if(c){
						_this.netConform = true;
						if(id != undefined)_this.resetChapter(id, i, url);
						playerTag();
					}
				}
			} else {
				if(id != undefined)_this.resetChapter(id, i, url);
				playerTag();
			}
			//this.showAudioBar();
		},
		
		reqAudioURL_lesson: function(){
			var _this = this;
			
			$.ajax({
				type: "GET",
				url: omdsUrl + 'Vedio',
				data: {
					method: 'playLesson',
					lessonId: _this.lessonId,
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
		},
		
		reqAudioURL_chapter: function(id, i){
			var _this = this;
			
			if(this.lessonListData[i].vedio_url == ''){
				this.chapterIndex = i;
				this.audioPlayEnded();
				return;
			}
			
			$.ajax({
				type: "GET",
				url: omdsUrl + 'Vedio',
				data: {
					method: 'playLessonDetail',
					lessonId: _this.lessonId,
					detailId: id,
					openId: _this.openid
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.audioState(id, i, data.vedioURL);
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
		},
		
		setWCShareObj: function(){
			var _this = this,
				obj = {
					title: _this.lessonObj.lessonName + '精华解读',
				    desc: _this.lessonObj.lessonDesc,
				    link: window.location.href,
				    imgUrl: _this.lessonObj.lessonPic
				}
			WCOnMenuShare(obj);
		}
	}
});
