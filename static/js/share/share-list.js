var JWeixinSDKConfigBack = function(){
	if(vm.listData.length <= 0){
		vm.getMoreBook();
	}
}

var vm = new Vue({
	el: '#share_list',
	data: {
		duration: 0,
		transform: 0,
		sliderOpen: false,
		sliderIndex: 0,
		sliderOpenX: Math.ceil(document.body.clientWidth * 0.24),
		sliderOpenY: '6.15rem',
		listData: [
		/*
			{
				img: 'http://onemeter.b0.upaiyun.com/omms/isbn/1498633432084_9787530763919',
				name: '国际大奖小说注音版——天使雕像',
				author: '作者:【美】E.L.柯尼斯伯格',
				press: '新蕾出版社',
				isbn: '9787530763919'
			},
			{
				img: '',
				name: '',
				author: '',
				press: '',
				isbn: '9787550239975'
			}
		*/
		],
		caseCode: '',
		userLocal: null
	},

	created: function() {
		/*this.$nextTick(function () {
			this.getPage();
			getJWeixinSDKSignature(window.location.href);
			this.setSliderOpenY();
		}); 注释掉登录页*/
	},

	methods: {
		getPage: function(){
			var data = localStorage.getItem('shareBookData');
			if(data){
				data = JSON.parse(decodeURIComponent(data));
				this.listData = data;
			}
			loadingIconHide();
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
			this.clientWidth = - Math.ceil(document.body.clientWidth / 3);
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
			this.listSlide(false, 'delete');
		},
		
		setSliderTransformCB: function(){
			localStorage.removeItem('shareBookData');
			var bookdata = encodeURIComponent(JSON.stringify(this.listData));
			localStorage.setItem('shareBookData', bookdata);
		},
		
		reqBookdetail: function(id){
			loadingIconShow();
			var _this = this;
			$.ajax({
				type: "GET",
				url: 'http://www.1mks.com/omms/isbn/getByIsbn',
				data: {
					isbn: id
				},
				success: function(data){
					var data = JSON.parse(data);
					//if(data.retcode == '1'){
						var bookObj = {
							img: data.picture == undefined ? '' : data.picture,
							name: data.title == undefined ? '' : data.title,
							author: data.author == undefined ? '' : data.author,
							press: data.publisher == undefined ? '' : data.publisher,
							isbn: id
						}
						_this.listData.push(bookObj);
						_this.setSliderOpenY();
						
						localStorage.removeItem('shareBookData');
						var bookdata = encodeURIComponent(JSON.stringify(_this.listData));
						localStorage.setItem('shareBookData', bookdata);
					//} else {
					//	alert(data.retmsg);
					//}
					loadingIconHide();
				},
				error: function(reqObj, errorMsg, catchObj){
					loadingIconHide();
					alert(errorMsg);
				}
			})
		},
		
		getMoreBook: function(){
			var _this = this;
			var WCScanParams = {
				needResult: 1,
				scanType: ["barCode"],
				success: function (res) {
					var result = res.resultStr,
						indexOf = result.indexOf(','),
						code = '';
					if(indexOf > -1){
						code = result.split(',');
						code = code[code.length-1];
					} else {
						code = result;
					}
					_this.reqBookdetail(code);
				}
			}
			WCScanRequest(WCScanParams);
		},
		
		getCaseCode: function(){
			var _this = this;
			var WCScanParams = {
				needResult: 1,
				scanType: ["qrCode"],
				success: function (res) {
					var result = res.resultStr,
						code = param2Obj(result);
					if(code.groupQrCode != undefined){
						_this.caseCode = code.groupQrCode;
					} else if(code.boxQrCode != undefined){
						_this.caseCode = code.boxQrCode.substring(0, 8);
					} else {
						alert('二维码有误，请扫书柜二维码');
					}
				}
			}
			WCScanRequest(WCScanParams);
		},
		
		submit: function(){
			if(this.listData.length <= 0){
				alert('请点击 + 号，扫描图书背面ISBN码，添加图书');
				return;
			}
			/*
			var _this = this,
				data = this.listData;
			for(var i=0, l=data.length; i<l; i++){
				if(data[i].name == ''){
					alert('无法识别的图书，你可以手动输入书名，或者向左滑动列表删除。')
					break;
				}
			}
			*/
			localStorage.removeItem('shareBookData');
			var bookdata = encodeURIComponent(JSON.stringify(this.listData));
			localStorage.setItem('shareBookData', bookdata);
			
			var params = param2Obj(window.location.href),
				type = params.type;
			if(type == 'metro'){
				window.location.replace('share-metro.html');
			} else {
				window.location.replace('share-online.html');
			}
		}
	}
});
