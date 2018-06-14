import { mapGetters, mapState } from 'vuex'
import command from '../../../src/api/command'
import wx from 'weixin-js-sdk'

export default {
    name:"user",
    data(){
        return{
        isLogin: false,
		headimg: '/static/img/icon-003.png',
		nickName: '书米',
		integral: '0',
		earnings: '￥0',
		orderCount: [
			'0',
			'0',
			'0',
			'0',
			'0'
		],
		tabelData: [
			{
				icon: 'user-table-icon-1',
				name: '待处理'
			},
			{
				icon: 'user-table-icon-2',
				name: '传递中'
			},
			{
				icon: 'user-table-icon-3',
				name: '已完成'
			},
			{
				icon: 'user-table-icon-5',
				name: '我的订单'
			}
		],
		listData: [
			/*{
				item: [
					{
						id: 'yue',
						icon: 'user-list-1',
						name: '我的余额',
						intro: '押金：￥0',
						tips: '余额：<span>¥0</span>'
					},
					{
						id: 'vip',
						icon: 'user-list-10',
						name: 'VIP借书',
						intro: '',
						tips: '未开通'
					},
					{
						id: 'bsn-vip',
						icon: 'user-list-10',
						name: '企业VIP',
						intro: '提升职场能量',
						tips: ''
					},
					{
						id: 'youhuiquan',
						icon: 'user-list-2',
						name: '我的优惠券',
						intro: '',
						tips: ''
					}
				]
			},*/
			{
				item: [
					{
						id: 'gongxiang',
						icon: 'user-list-3',
						name: '图书共享',
						intro: '',
						tips: '已共享<span>0</span>本',
						url:'share'
					},
					{
						id: 'yuyue',
						icon: 'user-list-4',
						name: '爱书公益',
						intro: '',
						tips: '',
						url:'commonweal'
					}
				]
			},
			{
				item: [
					{
						id: 'shuping',
						icon: 'user-list-5',
						name: '我的书评',
						intro: '',
						tips: '',
						url:'/user/usercomment'
					},
					{
						id: 'guizi',
						icon: 'user-list-6',
						name: '常用柜子',
						intro: '',
						tips: '',
						url:''
					}
				]
			},
			{
				item: [
					{
						id: 'zuji',
						icon: 'user-list-7',
						name: '我的足迹',
						intro: '',
						tips: '',
						url:''
					},
					{
						id: 'zhiyin',
						icon: 'user-list-8',
						name: '使用指引',
						intro: '',
						tips: '',
						url:'/user/guide'
					},
					{
						id: 'fankui',
						icon: 'user-list-9',
						name: '问题反馈',
						intro: '',
						tips: '',
						url:''
					}
				]
			}
		]
        }
	},
	methods:{
		toManage(){
			console.log(this.currentUser)
			this.$router.push({path:'/user/manage'})
		}
	},
	computed:{
		...mapGetters(['currentUser']),
		...mapState({
			
		})
	},
    created(){
		var code=this.$route.query.code;
		var that=this;
		command.weixinAuthorize(code,that)

		
		this.$store.dispatch({
			type:"getJssdkConfig",
			url:document.URL
		}).then(res=>{
			
			wx.config({
				debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: 'wx6d20bd01d7c0c730', // 必填，公众号的唯一标识
				timestamp:res.Timestamp	, // 必填，生成签名的时间戳
				nonceStr:res.NonceStr, // 必填，生成签名的随机串
				signature:res.Signature,// 必填，签名
				jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表
			});


			
		})

		this.$store.commit({
			type:"setIsFoot",
			value:true
		})


	
    }
}