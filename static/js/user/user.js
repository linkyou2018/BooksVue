
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
						intro: '可获赠阅读币',
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
						url:''
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
		

	},
    created(){
		this.$store.commit({
			type:"setIsFoot",
			value:true
		})
    },
    updated(){
   
    }
}