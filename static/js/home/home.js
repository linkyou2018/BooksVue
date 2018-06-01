import { mapGetters } from 'vuex'

export default {
	name: "home",
	data() {
		return {
			sliderObj: null,
			sliderIndex: 0,
			sliderData: [
				{
					picUrl: "/static/img//home/ad-01.jpg",
					title: "新年福利",
					url: "../vip/add-12.html"
				},
				{
					picUrl: "/static/img//home/index-ad-19.jpg",
					title: "免费借书",
					url: "../vip/add-04.html"
				}
			],
			buttonData: [
				{
					url: "/pages/bookList",
					img: "/static/img//home/home-btn-icon-01.png",
					txt: "借书"
				},
				{
					url: "/pages/test",
					img: "/static/img//home/home-btn-icon-03.png",
					txt: "还书"
				},
				{
					url: "../scancode/caseresult.html",
					img: "/static/img//home/home-btn-icon-04.png",
					txt: "共享书"
				}
			],
			contentIcon: [
				{
					img: '/static/img//home/home-li-icon-11.png',
					width: '1.555'
				},
				{
					img: '/static/img//home/home-li-icon-12.png',
					width: '1.027'
				},
				{
					img: '/static/img//home/home-li-icon-11.png',
					width: '1.555'
				},
				{
					img: '/static/img//home/home-li-icon-12.png',
					width: '1.027'
				}
			],
			contentData: []
		};
	},
	methods: {
		goGuide: function () {

		}

	},
	computed:{
		...mapGetters(['currentUser'])
	},
	created() {
		console.log(this.currentUser);
		
		this.$store.commit({
			type: "setIsFoot",
			value: true
		})

		// this.$api.get('omqs/Index?method=indexBookList', null, r => {
		// 	this.contentData = r.bookListArray;
		// 	console.log(this.contentData)
		// }, f => {
		// 	console.log(f)
		// })

		this.$store.dispatch({
			type: 'login',
			openId:'123',
		}).then(res => {
			console.log("token success")
		  }, err => {
				console.log("token Error")
		})

		this.$store.dispatch({
			type:'getMember',
		}).then(res=>{
			console.log(res)
		},err=>{

		})

	}
};