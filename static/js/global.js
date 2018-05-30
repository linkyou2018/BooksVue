/*
localStorage.setItem('userInfo', userInfo);
userInfo: {
	balance:"0.1",
	deposit:"1",
	head_img:"",
	head_img_wx:"",
	nickName:"",
	openId:"12345",
	score:"100",
	tel:"13418669679"
}
*/


var omqsUrl = 'http://www.1mks.com/omqs/',
	omdsUrl = 'http://www.1mks.com/omds/';

/*是否微信内*/
var isWX = function(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger"){
		return true; 
	} else {
		return false;
	}
}

/*返回键：没有历史返回首页*/
var goBack = function(){
	if((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
        if(history.length > 0){
            window.history.back();
        } else {
        	sessionStorage.setItem('indexTabel', '0');
            window.location.replace('../../index.html');
        }  
    } else {
        if (navigator.userAgent.indexOf('Firefox') >= 0 ||  
            navigator.userAgent.indexOf('Opera') >= 0 ||  
            navigator.userAgent.indexOf('Safari') >= 0 ||  
            navigator.userAgent.indexOf('Chrome') >= 0 ||  
            navigator.userAgent.indexOf('WebKit') >= 0){
  
            if(window.history.length > 1){
                window.history.back();
            } else {
            	sessionStorage.setItem('indexTabel', '0');
                window.location.replace('../../index.html');
            }  
        } else {
            window.history.back();
        }
    }
}

/*获取URL参数*/
var param2Obj = function(params){
	var obj = {};
	if(params.indexOf("?") > -1){
		params = params.substring(params.indexOf("?") + 1, params.length);
		var arr = params.split("&");
		for(var i = 0, l = arr.length; i < l; i++){
			var pair = arr[i];
			var indexOf = pair.indexOf("=");
			if(indexOf != -1){
				var name = pair.substring(0, indexOf);
				var val = "";

				if(indexOf != pair.length-1){
					val = pair.substring(indexOf + 1);
				}
				eval("obj." + name + "='" + val + "';")
			} else {
				eval("obj." + pair + "='';");
			}
		}
	}
	return obj;
};

/*加载动画*/
var loadingIconShow = function(){
	document.getElementById('loadingCover').style.display = 'block';
}
var loadingIconHide = function(){
	document.getElementById('loadingCover').style.display = 'none';
}

/*手机号加密*/
var GETMOBILEPHONE = function(n){
	var num = n,
		str = 'meter'
		strASCII = '',
		numStr = '',
		fst = num[num.length-2],
		sec = num[num.length-1];
	num = parseInt(num);
	for(var i=0; i<str.length; i++){
		strASCII += str.charCodeAt(i).toString(16);
	}
	strASCII = '0x' + strASCII;
	strASCII = parseInt(strASCII);
	numStr = (num + strASCII) * 5;
	numStr = numStr.toString(16);
	fst = '7' + fst;
	fst = String.fromCharCode(fst);
	sec = '7' + sec;
	sec = String.fromCharCode(sec);
	numStr = numStr.replace(/(.{4})/, '$1' + fst) + sec;
	numStr = numStr.toUpperCase();
	return numStr;
}

/*set scrollTop*/
var setScrollTop = function(y){
	document.body.scrollTop = y;
	document.documentElement.scrollTop = y;
	window.pageYOffset = y;
}

/*set openid*/
var setOpenidGlobal = function(){
	var params = param2Obj(window.location.href),
		openid = params.openid;
	if(openid != undefined){
		localStorage.setItem('openid', openid);
	}
}
setOpenidGlobal();

/*get openid*/
var getOpenidGlobal = function(){
	var params = param2Obj(window.location.href),
		openid = params.openid;
	if(openid != undefined){
		return openid;
	} else {
		openid = localStorage.getItem('openid');
		if(openid){
			return openid;
		} else {
			return false;
		}
	}
}

/*get user info*/
var reqUserInfoGlobal = function(id, next){
	$.ajax({
		type: "GET",
		url: omdsUrl + 'Login',
		data: {
			method: 'getLoginInfo',
			openId: id
		},
		success: function(data){
			var data = JSON.parse(data);
			if(data.retcode == '1'){
				var userInfo = data.userInfo;
				userInfo = encodeURIComponent(JSON.stringify(userInfo));
				localStorage.setItem('userInfo', userInfo);
				
				if(next == '支付成功'){
					alert(next);
					var _params = param2Obj(window.location.href),
	        			nextPage = _params.nextPage;
	        		if(nextPage != undefined){
						window.location.replace(nextPage);
						return;
					}
				}
				if(typeof ReqUserInfoBack === "function"){
					ReqUserInfoBack(data.userInfo);
				}
			} else {
				localStorage.removeItem('userInfo');
				if(typeof ReqUserInfoERR === "function"){
					ReqUserInfoERR(data.retcode);
				}
			}
		},
		error: function(reqObj, errorMsg, catchObj){
			alert(errorMsg);
		}
	})
}

/*后台回调状态参数处理*/
var reqCallback_Retcode = function(code){
	var state = code, 
		obj = {
			msg: '',
			url: ''
		};
		
	switch(state){
		case '1':
			obj.msg = '成功';
			break;
		case '-1':
			obj.msg = '请求方法不存在';
			break;
		case '-2':
			obj.msg = '非法参数';
			break;
		case '-3':
			obj.msg = '系统异常';
			break;
		case '-4':
			obj.msg = '参数不够';
			break;
		case '-5':
			obj.msg = '需要登录';
			obj.url = '../user/login.html?nextPage=' + window.location.href;
			break;
		case '-6':
			obj.msg = '没交押金';
			obj.url = '../user/cash-pledge.html?nextPage=' + window.location.href;
			break;
		case '-7':
			obj.msg = '余额不足';
			obj.url = '../user/recharge.html?nextPage=' + window.location.href;
			break;
		case '-8':
			obj.msg = '您有订单未归还';
			break;
		case '-9':
			obj.msg = '箱门为空';
			break;
		case '-10':
			obj.msg = '优惠券不可用';
			break;
		case '-11':
			obj.msg = '图书库存为0';
			break;
		case '-12':
			obj.msg = '登录验证码短信1分钟只能发1次';
			break;
		case '-13':
			obj.msg = '登录验证码短信1天只能发5次';
			break;
		case '-14':
			obj.msg = '登录验证码错误';
			break;
		case '-15':
			obj.msg = '调用微信支付异常';
			break;
		case '-16':
			obj.msg = '调用支付宝支付异常';
			break;
		case '-17':
			obj.msg = '现场取线上借的书超时';
			break;
		case '-18':
			obj.msg = '现场扫码借书超时';
			break;
		case '-19':
			obj.msg = '借书数量超出限制';
			break;
		case '-20':
			obj.msg = '有未投放的共享单';
			break;
		case '-21':
			obj.msg = '购买借书卡超出限制';
			break;
		case '-22':
			obj.msg = '优惠券不可用';
			break;
		case '-23':
			obj.msg = '优惠券已领完或超出限制';
			break;
		case '-24':
			obj.msg = 'vip用户才能使用资源';
			break;
		case '-35':
			obj.msg = '最多只能加入4个群';
			break;
		default:
			break;
	}
	return obj;
}

/*自定义指令*/
Vue.directive('focus', {
	inserted: function (el){
    	el.focus();
	}
});
Vue.directive('scroll', {
	bind: function (el){
		window.addEventListener('scroll', function () {
			if(document.body.scrollTop + window.innerHeight >= el.clientHeight - 15) {
				vm.getMore();
			}
		});
	}
});

//生成JSSDK-js签名
var getJWeixinSDKSignature = function(url){
	var JWeixinSDKSignatureObj = {
		url : encodeURIComponent(url)
	}
	$.ajax({
		type: "GET",
		url: omdsUrl + 'wechat_pay_js_sdk_parameter',
		data: JWeixinSDKSignatureObj,
		success: function(data){
			var data = JSON.parse(data);
			if(data.retcode == "1"){
				JWeixinSDKConfig(data.data);
				if(typeof JWeixinSDKSignatureBack === "function"){
					JWeixinSDKSignatureBack();
				}
			} else {
				//alert('SDK_' + data.retmsg);
			}
		},
		error: function(reqObj, errorMsg, catchObj){
			//alert('SDK_' + errorMsg);
		}
	})
}
//注入权限验证配置
var JWeixinSDKConfig = function(obj){
	wx.config({
		debug: false,
		appId: obj.appId,
		timestamp: obj.timestamp,
		nonceStr: obj.nonceStr,
		signature: obj.signature,
		jsApiList: [
			'chooseWXPay',
			'scanQRCode',
			'getLocation',
			'getNetworkType',
			'hideOptionMenu',
			'showOptionMenu',
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo'
		]
	});
	//签名成功验证后执行
	wx.ready(function(){
		if(typeof JWeixinSDKConfigBack === "function"){
			JWeixinSDKConfigBack();
		}
	});
	//签名验证失败执行
	wx.error(function(res){
		if(typeof JWeixinSDKConfigError === "function"){
			JWeixinSDKConfigError(res);
		}
		/*
		var openid = getOpenidGlobal();
		if(openid == 'oS60Q07PBRgqNcwBbKvrUH0NHAUM' || openid == 'oS60Q0y9zq2YAyhqKP8O7lrpRPuE'){
			alert(res.errMsg + ' \n' + JSON.stringify(obj));
		}
		*/
	});
}

/*微信支付*/
/*
var WCPayParams = {
	"appId" : , //公众号名称，由商户传入
	"timeStamp" : , //时间戳
	"nonceStr" : , //随机串
	"package" : ,//扩展包
	"signType" : , //微信签名方式:1.sha1
	"paySign" :  //微信签名
};
*/
var getWCPayParams = function(id, fee, subject, goodtype){
	var _data = {
		openid: id,
		totalFee: fee,
		payDesc: subject,
		tradeType: 'JSAPI',
		fromType: '1',
		goodType: goodtype
	}
	
	$.ajax({
		type: "GET",
		url: omdsUrl + 'wechat_pay',
		data: _data,
		success: function(data){
			var data = JSON.parse(data);
			if(data.retcode == "1"){
				var signParams = data.data,
					WCPayParams = {
						appId : signParams.appId,
						timestamp : signParams.timestamp,
						nonceStr : signParams.nonceStr,
						package : signParams.package,
						signType : signParams.signType,
						paySign : signParams.paySign,
						success: function (res) {
							var _id = localStorage.getItem('openid');
							reqUserInfoGlobal(_id, '支付成功');
						},
						cancel: function(res) {
							alert('已取消');
						},
						fail: function(res) {
							alert('支付失败:\n' + res.errMsg);
						}
					};
				
				if (typeof WeixinJSBridge === "undefined"){
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', WCPayRequest(WCPayParams), false);
					}
				} else {
					WCPayRequest(WCPayParams);
				}
			} else {
				alert("支付失败:\n" + data.retmsg);
			}
		},
		error: function(reqObj, errorMsg, catchObj){
			alert("支付失败:\n" + errorMsg);
		}
	})
}
var getWCPayParamsForCard = function(openId, id){
	var _data = {
		id: id,
		tradeType: 'JSAPI',
		openId: openId,
		fromType: '1'
	}
	
	$.ajax({
		type: "GET",
		url: omdsUrl + 'buy_borrow_book_card',
		data: _data,
		success: function(data){
			var data = JSON.parse(data);
			if(data.retcode == "1"){
				var signParams = data.data,
					WCPayParams = {
						appId : signParams.appId,
						timestamp : signParams.timestamp,
						nonceStr : signParams.nonceStr,
						package : signParams.package,
						signType : signParams.signType,
						paySign : signParams.paySign,
						success: function (res) {
							alert('购买成功');
							vm.goNext();
						},
						cancel: function(res) {
							alert('已取消');
						},
						fail: function(res) {
							alert('支付失败:\n' + res.errMsg);
						}
					};
				
				if (typeof WeixinJSBridge === "undefined"){
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', WCPayRequest(WCPayParams), false);
					}
				} else {
					WCPayRequest(WCPayParams);
				}
			} else {
				alert("支付失败:\n" + data.retmsg);
			}
		},
		error: function(reqObj, errorMsg, catchObj){
			alert("支付失败:\n" + errorMsg);
		}
	})
}
var WCPayRequest = function(obj){
	wx.chooseWXPay(obj);
}

/*微信扫一扫*/
/*
var WCScanParams = {
	needResult: 1, //默认0:微信处理结果；1:自定义处理
	scanType: ["qrCode","barCode"], //二维码,条形码
	success: function (res) {
		//{'resultStr':'','errMsg':'scanQRCode:ok'}
		//alert(JSON.stringify(res));
		var result = res.resultStr,
			indexOf = result.indexOf(',');
		if(indexOf > -1){ //条形码处理方法
			var code = result.split(',');
			code = code[code.length-1];
			alert(code);
		} else { //二维码直接跳转
			window.location.href = result;
		}
	}
}
*/
var WCScanRequest = function(obj){
	wx.scanQRCode(obj);
}

/*微信获取地理位置*/
/*
wx.getLocation({
    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
        vm.locationObj.lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        vm.locationObj.lng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        vm.locationObj.speed = res.speed; // 速度，以米/每秒计
        vm.locationObj.acc = res.accuracy; // 位置精度
    }
});
var WCGetLocation = function(obj){
	wx.getLocation(obj);
}
*/

/*获取网络状态接口*/
/*
wx.getNetworkType({
    success: function (res) {
        var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
    }
});
 */
var WCGetNetworkType = function(obj){
	wx.getNetworkType(obj);
}

/*分享*/
/*
var WCOnMenuShareParams = {
	title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
}
 */
var WCOnMenuShare = function (obj){
	wx.onMenuShareAppMessage(obj);
	wx.onMenuShareTimeline(obj);
	wx.onMenuShareQQ(obj);
	wx.onMenuShareWeibo(obj);
}

//微信授权--静默
var getOpenIdSnsapiBase = function(id, type){
	$.ajax({
		type: "GET",
		url: omdsUrl + 'wechat_user_access_token',
		data: {
			code: id,
			type: type
		},
		success: function(data){
			var data = JSON.parse(data);
			if(data.retcode == "1"){
				if(data.data.openid != undefined){
					if(typeof getOpenIdSnsapiBase_callback === "function"){
						getOpenIdSnsapiBase_callback(data.data.openid, type);
					}
				} else {
					alert(data.data.errmsg);
				}
			} else {
				alert(data.retmsg);
			}
		},
		error: function(reqObj, errorMsg, catchObj){
			alert('access_' + errorMsg);
		}
	})
}

var openWeixinBase = function(url, type){
	var url = encodeURIComponent(url),
		appid = type == 'dy' ? 'wx7559a17314538664' : 'wx0010e9102deaf64b';
	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + url + '&response_type=code&scope=snsapi_base&state=#wechat_redirect';
}

//获取当前时间
var getNowFormatDate = function(t){
    var date = new Date(),
    	seperator1 = "-",
    	seperator2 = ":",
    	seperator3 = " ",
    	month = date.getMonth() + 1,
    	strDate = date.getDate(),
    	hours = date.getHours();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
    if(t == 1){
    	var currentdate = date.getFullYear().toString() + month.toString() + strDate.toString() + hours.toString();
   		return currentdate;
    }
}

//浏览记录
var saveBrowseGlobal = function(){
	var id = getOpenidGlobal(),
		openid = '',
		_from = '',
		userFrom = sessionStorage.getItem('userFrom'),
		_date = getNowFormatDate(1),
		_key = GETMOBILEPHONE(_date);
	if(id){
		openid = id;
	}
	if(userFrom){
		_from = userFrom;
	}
	
	$.ajax({
		type: "GET",
		url: omdsUrl + 'Login',
		data: {
			method: 'doBrowse',
			openId: openid,
			browseURL: window.location.href,
			fromPoint: _from,
			signKey: _key
		},
		success: function(data){
			
		},
		error: function(reqObj, errorMsg, catchObj){
			
		}
	})
}
var saveBrowseTime = -1;
clearTimeout(saveBrowseTime);
saveBrowseTime = setTimeout(function(){
	saveBrowseGlobal();
}, 1000);

//列表左滑动-删除
var setSliderTransform = function(n){
	var __slider = document.querySelectorAll('.list-slider-cover')[vm.sliderIndex];
	__slider.style.transition = 'webkit-transform ' + vm.duration + 'ms ease';
	__slider.style.webkitTransition = vm.duration + 'ms ease';
	__slider.style.transform = 'translate(' + vm.transform + 'px,0)';
	__slider.style.webkitTransform = 'translate(' + vm.transform + 'px,0)';
	if(n == 'delete'){
		var __list = document.querySelectorAll('.list-slider')[vm.sliderIndex];
		__list.style.transition = 'webkit-transform ' + vm.duration + 'ms ease';
		__list.style.webkitTransition = vm.duration + 'ms ease';
		__list.style.opacity = 0;
		setTimeout(function(){
			vm.duration = 0;
			__list.style.transition = 'webkit-transform ' + vm.duration + 'ms ease';
			__list.style.webkitTransition = vm.duration + 'ms ease';
			__list.style.opacity = 1;
			vm.sliderOpen = false;
			vm.listData.splice(vm.sliderIndex, 1);
			if(typeof vm.setSliderTransformCB === "function"){
				vm.setSliderTransformCB();
			}
		}, vm.duration);
	}
}

//初始化播放器
var mediaTimeout = -1,
	mediaInterval = -1,
	Media = null;
var initMedia = function(m){
	Media = new Audio(m);
	Media.addEventListener("canplay", function(){
		var duration = setAudioDuration(Media.duration);
		vm.audioDuration = duration;
		getDurrentTime();
	});
	Media.addEventListener("ended", function(){
		clearInterval(mediaInterval);
		vm.audioDurrentTime = '0:00';
		vm.audioPlaying = false;
		if(typeof vm.audioPlayEnded === "function"){
			vm.audioPlayEnded();
		}
	});
}
var playMedia = function(){
	clearTimeout(mediaTimeout);
	mediaTimeout = setTimeout(function(){
		if(Media.paused){
			Media.play();
			playMedia();
			vm.audioPlaying = true;
		}
	}, 1000);
}
var playerTag = function(){
	if(Media.src == ''){
		Media.src = vm.audioURL;
	}
	if(Media.paused){
		Media.play();
		playMedia();
		vm.audioPlaying = true;
	} else {
		Media.pause();
		vm.audioPlaying = false;
	}
}
var getDurrentTime = function(d){
	clearInterval(mediaInterval);
	mediaInterval = setInterval(function(){
		var current = Media.currentTime;
		vm.audioDurrentTime = setAudioDuration(current);
	}, 1000);
}
var setAudioDuration = function(d){
	var duration = d,
			mm = 0,
			ss = 0;
		duration = parseInt(duration);
		mm = parseInt(duration/60);
		ss = duration%60;
		if(ss < 10)ss = '0' + ss;
	return mm + ':' + ss;
}

//获取用户当前位置信息
function loadScript_Baidu(){
	var script = document.createElement("script");
	script.src = "http://api.map.baidu.com/api?v=2.0&ak=6438425e440bb4e00538df27a8d1bc93&callback=getCurPos_Baidu";
	document.body.appendChild(script);
}
function getCurPos_Baidu(){
	if(navigator.geolocation){
		var __myLocation = new BMap.Geolocation();
		__myLocation.getCurrentPosition(
			function(r){
				var status = this.getStatus(),
					lng = '',
					lat = '',
					txt = '';
				switch(status){
					case 0:
						lng = r.point.lng;
						lat = r.point.lat;
						txt = '定位成功';
						break;
					case 2:
						//定位失败，位置不可知
						txt = '定位失败，位置不可知';
						break;
					case 6:
					case 7:
						//请确认位置共享服务是否开启
						txt = '请确认位置共享服务是否开启';
						break;
					case 8:
						//请求超时，请重试
						txt = '请求超时，请重试';
						break;
					default:
						//定位失败
						txt = '定位失败';
						break;
				}
				getCurPos_Baidu_CB(status, txt, lng, lat);
			},
			{
				timeout:30000
			}
		);
	} else {
		//浏览器不支持HTML5定位
		getCurPos_Baidu_CB(-1, '浏览器不支持HTML5定位', '', '');
	}
}



window.Swipe=function(element,options){
	if(!element)return null;
	var _this=this;
	this.options=options||{};
	this.index=this.options.startSlide||0;
	this.speed=this.options.speed||300;
	this.callback=this.options.callback||function(){};
	this.delay=this.options.auto||0;
	this.container=element;
	this.element=this.container.children[0];
	this.container.style.overflowX=this.options.overflowX||'hidden';
	this.container.style.overflowY=this.options.overflowY||'auto';
	this.element.style.listStyle='none';
	this.element.style.margin=0;
	this.align = this.options.align||'top';
	this.addNum = this.options.addNum||1;
	this.setup();
	this.begin();
	if(this.element.addEventListener){
		this.element.addEventListener('touchstart',this,false);
		this.element.addEventListener('touchmove',this,false);
		this.element.addEventListener('touchend',this,false);
		this.element.addEventListener('touchcancel',this,false);
		this.element.addEventListener('webkitTransitionEnd',this,false);
		this.element.addEventListener('msTransitionEnd',this,false);
		this.element.addEventListener('oTransitionEnd',this,false);
		this.element.addEventListener('transitionend',this,false);
		window.addEventListener('resize',this,false)
	}
};
Swipe.prototype={
	setup:function(){
		this.slides=this.element.children;
		this.length=this.slides.length;
		if(this.length<2){
			//return null;
		}
		this.width=this.options.width||this.container.offsetWidth;
		if(!this.width)return null;
		var origVisibility=this.container.style.visibility;
		this.container.style.visibility='hidden';
		this.element.style.width=Math.ceil(this.slides.length*this.width)+'px';
		var index=this.slides.length;
		while(index--){
			var el=this.slides[index];
			el.style.width=this.width+'px';
		}
		this.slide(this.index,0);
		this.container.style.visibility=origVisibility
	},
	slide:function(index,duration){
		var style=this.element.style;
		if(duration==undefined){
			duration=this.speed
		}
		style.webkitTransitionDuration=style.MozTransitionDuration=style.msTransitionDuration=style.OTransitionDuration=style.transitionDuration=duration+'ms';
		style.MozTransform=style.webkitTransform='translate3d('+ -(index*this.width)+'px,0,0)';
		style.msTransform=style.OTransform='translateX('+ -(index*this.width)+'px)';
		this.index=index
	},
	getPos:function(){
		return this.index
	},
	prev:function(delay){
		this.delay=delay||0;
		clearTimeout(this.interval);
		if(this.index)this.slide(this.index-1,this.speed);
		else this.slide(this.length-1,this.speed)
	},
	next:function(delay){
		this.delay=delay||0;
		clearTimeout(this.interval);
		if(this.index<this.length-1)this.slide(this.index+1,this.speed);
		else this.slide(0,this.speed)
	},
	gotoIndex:function(index){
		this.index=index||0;
		clearTimeout(this.interval);
		this.slide(this.index,this.speed)
	},
	begin:function(){
		var _this=this;
		this.interval=(this.delay)?setTimeout(function(){_this.next(_this.delay)},this.delay):0
	},
	stop:function(){
		this.delay=0;
		clearTimeout(this.interval)
	},
	resume:function(){
		this.delay=this.options.auto||0;
		this.begin()
	},
	handleEvent:function(e){
		switch(e.type){
			case'touchstart':
				this.onTouchStart(e);
				break;
			case'touchmove':
				this.onTouchMove(e);
				break;
			case'touchcancel':
			case'touchend':
				this.onTouchEnd(e);
				break;
			case'webkitTransitionEnd':
			case'msTransitionEnd':
			case'oTransitionEnd':
			case'transitionend':
				this.transitionEnd(e);
				break;
			case'resize':
				this.setup();
				break
		}
	},
	transitionEnd:function(e){
		if(this.delay)this.begin();
		this.callback(e,this.index,this.slides[this.index])
	},
	onTouchStart:function(e){
		this.start={
			pageX:e.touches[0].pageX,
			pageY:e.touches[0].pageY,
			time:Number(new Date())
		};
		this.isScrolling=undefined;
		this.deltaX=0;
		this.element.style.MozTransitionDuration=this.element.style.webkitTransitionDuration=0;
		e.stopPropagation()
	},
	onTouchMove:function(e){
		if(e.touches.length>1||e.scale&&e.scale!==1)return;
		this.deltaX=e.touches[0].pageX-this.start.pageX;
		if(typeof this.isScrolling=='undefined'){
			this.isScrolling=!!(this.isScrolling||Math.abs(this.deltaX)<Math.abs(e.touches[0].pageY-this.start.pageY))
		}
		if(!this.isScrolling){
			e.preventDefault();
			clearTimeout(this.interval);
			this.deltaX=this.deltaX/((!this.index&&this.deltaX>0||Math.floor(this.index/this.addNum)==Math.floor((this.length-1)/this.addNum)&&this.deltaX<0)?(Math.abs(this.deltaX)/this.width+1):1);
			this.element.style.MozTransform=this.element.style.webkitTransform='translate3d('+(this.deltaX-this.index*this.width)+'px,0,0)';
			e.stopPropagation()
		}
	},
	onTouchEnd:function(e){
		var isValidSlide=Number(new Date())-this.start.time<250&&Math.abs(this.deltaX)>20||Math.abs(this.deltaX)>this.width/2,isPastBounds=!this.index&&this.deltaX>0||Math.floor(this.index/this.addNum)==Math.floor((this.length-1)/this.addNum)&&this.deltaX<0;
		if(!this.isScrolling){
			this.slide(this.index+(isValidSlide&&!isPastBounds?(this.deltaX<0?this.addNum:-this.addNum):0),this.speed)
		}
		e.stopPropagation()
	}
};



var _mui = (function(document, undefined) {
	var readyRE = /complete|loaded|interactive/;
	var idSelectorRE = /^#([\w-]+)$/;
	var classSelectorRE = /^\.([\w-]+)$/;
	var tagSelectorRE = /^[\w-]+$/;
	var translateRE = /translate(?:3d)?\((.+?)\)/;
	var translateMatrixRE = /matrix(3d)?\((.+?)\)/;

	var $ = function(selector, context) {
		context = context || document;
		if (!selector)
			return wrap();
		if (typeof selector === 'object')
			if ($.isArrayLike(selector)) {
				return wrap($.slice.call(selector), null);
			} else {
				return wrap([selector], null);
			}
		if (typeof selector === 'function')
			return $.ready(selector);
		if (typeof selector === 'string') {
			try {
				selector = selector.trim();
				if (idSelectorRE.test(selector)) {
					var found = document.getElementById(RegExp.$1);
					return wrap(found ? [found] : []);
				}
				return wrap($.qsa(selector, context), selector);
			} catch (e) {}
		}
		return wrap();
	};

	var wrap = function(dom, selector) {
		dom = dom || [];
		Object.setPrototypeOf(dom, $.fn);
		dom.selector = selector || '';
		return dom;
	};
	/**
	 * extend(simple)
	 * @param {type} target
	 * @param {type} source
	 * @param {type} deep
	 * @returns {unresolved}
	 */
	$.extend = function() { //from jquery2
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		if (typeof target === "boolean") {
			deep = target;

			target = arguments[i] || {};
			i++;
		}

		if (typeof target !== "object" && !$.isFunction(target)) {
			target = {};
		}

		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];

					if (target === copy) {
						continue;
					}

					if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && $.isArray(src) ? src : [];

						} else {
							clone = src && $.isPlainObject(src) ? src : {};
						}

						target[name] = $.extend(deep, clone, copy);

					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		return target;
	};
	/**
	 * mui slice(array)
	 */
	$.slice = [].slice;

	$.type = function(obj) {
		return obj == null ? String(obj) : class2type[{}.toString.call(obj)] || "object";
	};
	/**
	 * mui isArray
	 */
	$.isArray = Array.isArray ||
		function(object) {
			return object instanceof Array;
		};
	/**
	 * mui isArrayLike 
	 * @param {Object} obj
	 */
	$.isArrayLike = function(obj) {
		var length = !!obj && "length" in obj && obj.length;
		var type = $.type(obj);
		if (type === "function" || $.isWindow(obj)) {
			return false;
		}
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;
	};
	/**
	 * mui isWindow(需考虑obj为undefined的情况)
	 */
	$.isWindow = function(obj) {
		return obj != null && obj === obj.window;
	};
	/**
	 * mui isObject
	 */
	$.isObject = function(obj) {
		return $.type(obj) === "object";
	};
	/**
	 * mui isPlainObject
	 */
	$.isPlainObject = function(obj) {
		return $.isObject(obj) && !$.isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
	};
	/**
	 * mui isFunction
	 */
	$.isFunction = function(value) {
		return $.type(value) === "function";
	};
	/**
	 * mui querySelectorAll
	 * @param {type} selector
	 * @param {type} context
	 * @returns {Array}
	 */
	$.qsa = function(selector, context) {
		context = context || document;
		return $.slice.call(classSelectorRE.test(selector) ? context.getElementsByClassName(RegExp.$1) : tagSelectorRE.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
	};
	/**
	 * ready(DOMContentLoaded)
	 * @param {type} callback
	 * @returns {_L6.$}
	 */
	$.ready = function(callback) {
		if (readyRE.test(document.readyState)) {
			callback($);
		} else {
			document.addEventListener('DOMContentLoaded', function() {
				callback($);
			}, false);
		}
		return this;
	};
	/**
	 * 将 fn 缓存一段时间后, 再被调用执行
	 * 此方法为了避免在 ms 段时间内, 执行 fn 多次. 常用于 resize , scroll , mousemove 等连续性事件中;
	 * 当 ms 设置为 -1, 表示立即执行 fn, 即和直接调用 fn 一样;
	 * 调用返回函数的 stop 停止最后一次的 buffer 效果
	 * @param {Object} fn
	 * @param {Object} ms
	 * @param {Object} context
	 */
	$.buffer = function(fn, ms, context) {
		var timer;
		var lastStart = 0;
		var lastEnd = 0;
		var ms = ms || 150;

		function run() {
			if (timer) {
				timer.cancel();
				timer = 0;
			}
			lastStart = $.now();
			fn.apply(context || this, arguments);
			lastEnd = $.now();
		}

		return $.extend(function() {
			if (
				(!lastStart) || // 从未运行过
				(lastEnd >= lastStart && $.now() - lastEnd > ms) || // 上次运行成功后已经超过ms毫秒
				(lastEnd < lastStart && $.now() - lastStart > ms * 8) // 上次运行或未完成，后8*ms毫秒
			) {
				run.apply(this, arguments);
			} else {
				if (timer) {
					timer.cancel();
				}
				timer = $.later(run, ms, null, $.slice.call(arguments));
			}
		}, {
			stop: function() {
				if (timer) {
					timer.cancel();
					timer = 0;
				}
			}
		});
	};
	/**
	 * each
	 * @param {type} elements
	 * @param {type} callback
	 * @returns {_L8.$}
	 */
	$.each = function(elements, callback, hasOwnProperty) {
		if (!elements) {
			return this;
		}
		if (typeof elements.length === 'number') {
			[].every.call(elements, function(el, idx) {
				return callback.call(el, idx, el) !== false;
			});
		} else {
			for (var key in elements) {
				if (hasOwnProperty) {
					if (elements.hasOwnProperty(key)) {
						if (callback.call(elements[key], key, elements[key]) === false) return elements;
					}
				} else {
					if (callback.call(elements[key], key, elements[key]) === false) return elements;
				}
			}
		}
		return this;
	};
	/**
	 * trigger event
	 * @param {type} element
	 * @param {type} eventType
	 * @param {type} eventData
	 * @returns {_L8.$}
	 */
	$.trigger = function(element, eventType, eventData) {
		element.dispatchEvent(new CustomEvent(eventType, {
			detail: eventData,
			bubbles: true,
			cancelable: true
		}));
		return this;
	};
	/**
	 * getStyles
	 * @param {type} element
	 * @param {type} property
	 * @returns {styles}
	 */
	$.getStyles = function(element, property) {
		var styles = element.ownerDocument.defaultView.getComputedStyle(element, null);
		if (property) {
			return styles.getPropertyValue(property) || styles[property];
		}
		return styles;
	};
	/**
	 * setTimeout封装
	 * @param {Object} fn
	 * @param {Object} when
	 * @param {Object} context
	 * @param {Object} data
	 */
	$.later = function(fn, when, context, data) {
		when = when || 0;
		var m = fn;
		var d = data;
		var f;
		var r;

		if (typeof fn === 'string') {
			m = context[fn];
		}

		f = function() {
			m.apply(context, $.isArray(d) ? d : [d]);
		};

		r = setTimeout(f, when);

		return {
			id: r,
			cancel: function() {
				clearTimeout(r);
			}
		};
	};
	$.now = Date.now || function() {
		return +new Date();
	};
	var class2type = {};
	$.each(['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'], function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});
	if (window.JSON) {
		$.parseJSON = JSON.parse;
	}
	/**
	 * $.fn
	 */
	$.fn = {
		each: function(callback) {
			[].every.call(this, function(el, idx) {
				return callback.call(el, idx, el) !== false;
			});
			return this;
		}
	};

	/**
	 * 兼容 AMD 模块
	 **/
	if (typeof define === 'function' && define.amd) {
		define('_mui', [], function() {
			return $;
		});
	}

	return $;
})(document);

(function($, window) {
    var CLASS_ACTIVE = 'mui-active';
    var rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/;
    var getColor = function(colorStr) {
        var matches = colorStr.match(rgbaRegex);
        if (matches && matches.length === 5) {
            return [
                matches[1],
                matches[2],
                matches[3],
                matches[4]
            ];
        }
        return [];
    };
    var Transparent = function(element, options) {
        this.element = element;
        this.options = $.extend({
            top: 0, //距离顶部高度(到达该高度即触发)
            offset: 150, //滚动透明距离档设定top值后offset也会随着top向下延伸
            duration: 16, //过渡时间
            scrollby: window
        }, options || {});

        this.scrollByElem = this.options.scrollby || window;
        if (!this.scrollByElem) {
            throw new Error("监听滚动的元素不存在");
        }
        this.isNativeScroll = false;
        if (this.scrollByElem === window) {
            this.isNativeScroll = true;
        } else if (!~this.scrollByElem.className.indexOf('mui-scroll-wrapper')) {
            this.isNativeScroll = true;
        }

        this._style = this.element.style;
        this._bgColor = this._style.backgroundColor;
        var color = getColor(_mui.getStyles(this.element, 'backgroundColor'));
        if (color.length) {
            this._R = color[0];
            this._G = color[1];
            this._B = color[2];
            this._A = parseFloat(color[3]);
            this.lastOpacity = this._A;
            this._bufferFn = $.buffer(this.handleScroll, this.options.duration, this);
            this.initEvent();
        } else {
            throw new Error("元素背景颜色必须为RGBA");
        }
    };

    Transparent.prototype.initEvent = function() {
        this.scrollByElem.addEventListener('scroll', this._bufferFn);
        if (this.isNativeScroll) { //原生scroll
            this.scrollByElem.addEventListener($.EVENT_MOVE, this._bufferFn);
        }
    }
    Transparent.prototype.handleScroll = function(e) {
        var y = window.scrollY;
        if (!this.isNativeScroll && e && e.detail) {
            y = -e.detail.y;
        }
        var opacity = (y - this.options.top) / this.options.offset + this._A;
        opacity = Math.min(Math.max(this._A, opacity), 1);
        this._style.backgroundColor = 'rgba(' + this._R + ',' + this._G + ',' + this._B + ',' + opacity + ')';
        if (opacity > this._A) {
            this.element.classList.add(CLASS_ACTIVE);
        } else {
            this.element.classList.remove(CLASS_ACTIVE);
        }
        if (this.lastOpacity !== opacity) {
            $.trigger(this.element, 'alpha', {
                alpha: opacity
            });
            this.lastOpacity = opacity;
        }
    };
    Transparent.prototype.destory = function() {
        this.scrollByElem.removeEventListener('scroll', this._bufferFn);
        this.scrollByElem.removeEventListener($.EVENT_MOVE, this._bufferFn);
        this.element.style.backgroundColor = this._bgColor;
        this.element.mui_plugin_transparent = null;
    };
    $.fn.transparent = function(options) {
        options = options || {};
        var transparentApis = [];
        this.each(function() {
            var transparentApi = this.mui_plugin_transparent;
            if (!transparentApi) {
                var top = this.getAttribute('data-top');
                var offset = this.getAttribute('data-offset');
                var duration = this.getAttribute('data-duration');
                var scrollby = this.getAttribute('data-scrollby');
                if (top !== null && typeof options.top === 'undefined') {
                    options.top = top;
                }
                if (offset !== null && typeof options.offset === 'undefined') {
                    options.offset = offset;
                }
                if (duration !== null && typeof options.duration === 'undefined') {
                    options.duration = duration;
                }
                if (scrollby !== null && typeof options.scrollby === 'undefined') {
                    options.scrollby = document.querySelector(scrollby) || window;
                }
                transparentApi = this.mui_plugin_transparent = new Transparent(this, options);
            }
            transparentApis.push(transparentApi);
        });
        return transparentApis.length === 1 ? transparentApis[0] : transparentApis;
    };
    $.ready(function() {
        $('.header-transparent').transparent();
    });
})(_mui, window);
