import { mapGetters,mapState } from 'vuex'

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
				},
				{
					url: '/commonweal',
					img: '/static/img/home/home-btn-icon-gy.png',
					txt: '爱书公益'
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
		...mapGetters(['currentUser']),
		...mapState({
			catalogBookList:state=>state.home.catalogBookList
		})
	},
	created() {
		var that=this;
		this.$store.commit({
			type: "setIsFoot",
			value: true
		})

		this.$store.dispatch({
			type:'GetBookIndex'
		})

		// this.$api.get('omqs/Index?method=indexBookList', null, r => {
		// 	this.contentData = r.bookListArray;
		// 	console.log(this.contentData)
		// }, f => {
		// 	console.log(f)
		// })

		// this.$store.dispatch({
		// 	type: 'login',
		// 	openId:'123',
		// })

		// this.$store.dispatch({
		// 	type:'getMember',
		// })


	}
};