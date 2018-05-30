var vm = new Vue({
	el: '#bookcomment',
	data: {
		params: null,
		commentData: {
			count: '0',
			listData: []
		},
		pageIndex: 1,
		pageSize: 10
	},

	created: function() {
		this.$nextTick(function () {
			this.getParams();
		});
	},

	methods: {
		getParams: function(){
			var _url = window.location.href;
			this.params = param2Obj(_url);
			this.reqComment();
		},
		
		setDetailStar: function(score){
			var star = [];
			var s = Math.ceil(parseFloat(score)/2);
			for(var i=0; i<5; i++){
				if(i < s)star[i] = true;
				else star[i] = false;
			}
			return star;
		},
		
		getMore: function(){
			this.pageIndex++;
			this.pageSize = this.pageSize * this.pageIndex;
		},
		
		reqComment: function(){
			var _this = this;
			$.ajax({
				type: "GET",
				url: omqsUrl + 'BookDetail',
				data: {
					method: 'getComment',
					isbn: _this.params.id
				},
				success: function(data){
					var data = JSON.parse(data);
					if(data.retcode == '1'){
						_this.commentData.count = data.data.totalComment;
						_this.commentData.listData = data.data.bookCommetList;
					} else {
						//console.log(data.retmsg);
					}
				},
				error: function(reqObj, errorMsg, catchObj){
					
				}
			})
		}
	}
});
