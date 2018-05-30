var JWeixinSDKConfigBack = function(){
	var obj = {
		title: '为孩子设计的分级阅读精选书单',
	    desc: '跟着书单读好书，爱上阅读，提升阅读力',
	    imgUrl: 'http://www.1mks.com/wx/img/vip/vip-add-06-00.jpg'
	}
	WCOnMenuShare(obj);
}

var vm = new Vue({
	el: '#sort_app',
	data: {
		tableIndex: null,
		sortTableActive: [],
		sortTable: [],
		firstIndex: null,
		isFirstActive: [],
		firstSortData: [],
		secondSortData: [],
		listId: [],
		listIdStr: ''
	},

	created: function() {
		this.$nextTick(function () {
			this.getParams();
		});
	},

	methods: {
		getParams: function(){
			var page = top.location.href.indexOf("page");
			if(page > -1){
				getJWeixinSDKSignature(window.location.href);
			}
			this.getPage();
			this.reqSortTable();
		},
		
		getPage: function(){
			var id = sessionStorage.getItem('booklistSortId'),
				_this = this;
			if(id){
				this.listIdStr = id;
			}
			var _listId = this.listIdStr.split('_');
			
			for(var i=0; i<2; i++){
				if(i > _listId.length-1){
					_this.listId.push('');
				} else {
					_this.listId.push(_listId[i]);
				}
			}
		},
		
		setDefault: function(){
			var _this = this;
			if(_this.listId[1] == ''){
				_this.selectFirstSort(0);
			} else {
				var id_1 = _this.listId[1],
					data_1 = _this.firstSortData;
				for(var f1=0; f1<data_1.length; f1++){
					if(id_1 == data_1[f1].id){
						_this.selectFirstSort(f1);
						break;
					}
				}
			}
		},
		
		selectFirstSort: function(i){
			if(i == this.firstIndex){
				return;
			}
			this.setFirstSort(i);
		},
		
		setFirstSort: function(i){
			var id = this.sortTable[this.tableIndex].title_id + '_' + this.firstSortData[i].id;
			sessionStorage.setItem('booklistSortId', id);
			this.listIdStr = id;
			
			this.firstIndex = i;
			for (var j=0, l=this.firstSortData.length; j<l; j++) {
				this.isFirstActive[j] = false;
			}
			this.isFirstActive[this.firstIndex] = true;
			
			//设置右侧数据
			this.secondSortData = this.firstSortData[i].list;
		},
		
		reqSortTable: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Index',
				data: {
					method: 'indexBookList'
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.sortTable = data.bookListArray;
						var i = 0;
						for (var j=0, l=_this.sortTable.length; j<l; j++) {
							if(_this.sortTable[j].title_id == _this.listId[0]){
								i = j;
								break;
							}
						}
						_this.selectSortTable(i, true);
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		reqSortLi: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'Category',
				data: {
					method: 'getBookList',
					listId: _this.listId[0] == '' ? _this.sortTable[0].title_id : _this.listId[0]
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.firstSortData = data.data;
						_this.setDefault();
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		},
		
		selectSortTable: function(i, s){
			if(this.tableIndex == i){
				return;
			}
			this.tableIndex = i;
			var _this = this,
				length = this.sortTable.length;
			for (var j=0; j<length; j++) {
				this.sortTableActive[j] = false;
			}
			this.sortTableActive[i] = true;
			this.setSortTable(s);
		},
		
		setSortTable: function(s){
			if(!s){
				var id = this.sortTable[this.tableIndex].title_id;
				sessionStorage.setItem('booklistSortId', id);
				this.listId = [];
				this.firstIndex = null;
				this.getPage();
			}
			this.reqSortLi();
		},
		
		selectBooklist: function(i, j){
			var str = this.listIdStr + '_' + this.secondSortData[i].id + '_' + this.secondSortData[i].list[j].list_id;
			top.location.href = '../booklist/booklist-sort.html?listId=' + str;
		}
	}
});
