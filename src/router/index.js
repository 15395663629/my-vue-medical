import {createRouter,createWebHistory} from "vue-router"

//定义组件，定义路由
const routes = [
	//一级路由
	//登录一级路由
	{
		name:'login',
		path:'/',
		component:()=>import("/src/components/stair/login.vue"),
		meta:'登入'
	},
	//医嘱操作一级路由
	{
		name:'MAMOperation',//命名路由
		path:'/MAMOperation',
		component:()=>import("/src/components/xhy/MAMOperation.vue"),
		meta:'登入'
	},
	//opc门诊的一级路由
	{
			name:'OPC',
			path:'/OPC',
			component:()=>import("/src/components/yy/OPC.vue"),
			meta:{title:'门诊管理', noCache: true },
	},
	{
		name:'Home',
		path:'/home',//默认路径，登入就进来
		component:()=>import("/src/components/stair/Home.vue"),
		meta:'主页',
		//二级
		children:[
				/* ======================================================yy 二级 门诊路由====================================================== */
				{
					name:'UserRegistration',
					path:'/UserRegistration',
					component:()=>import("/src/components/yy/UserRegistration.vue"),
					meta:{title:'用户挂号', noCache: true },
				},
				{
					name:'ProjectPayment',
					path:'/ProjectPayment',
					component:()=>import("/src/components/yy/ProjectPayment.vue"),
					meta:{title:'医疗缴费', noCache: true },
					children:[//门诊问诊三级路由------------------
						{
							name:'DrugPayment',
								path:'/DrugPayment',
								component:()=>import("/src/components/yy/DrugPayment.vue"),
								meta:{title:'药品缴费', noCache: true },
						},
						{
								name:'ProjectPrice',
								path:'/ProjectPrice',
								component:()=>import("/src/components/yy/ProjectPrice.vue"),
								meta:{title:'项目缴费', noCache: true },
						},]
				},
				{
					name:'Card',
					path:'/Card',
					component:()=>import("/src/components/yy/Card.vue"),
					meta:{title:'医疗卡管理', noCache: true },
					children:[//门诊问诊三级路由------------------
						{
								name:'MedicalCard',
								path:'/MedicalCard',
								component:()=>import("/src/components/yy/Card/MedicalCard.vue"),
								meta:{title:'修改挂失', noCache: true },
						},
						{
								name:'UpPremium',
								path:'/UpPremium',
								component:()=>import("/src/components/yy/Card/UpPremium.vue"),
								meta:{title:'充值退费', noCache: true },
						},]
				},
				{
					name:'ProjectObservation',
					path:'/ProjectObservation',
					component:()=>import("/src/components/yy/ProjectObservation.vue"),
					meta:{title:'项目检查', noCache: true },
				},
				{
					name:'OutpatientLibrary',
					path:'/OutpatientLibrary',
					component:()=>import("/src/components/yy/OutpatientLibrary.vue"),
					meta:{title:'门诊患者库', noCache: true },
				},
			/* ======================================================xhy  二级 住院路由===================================================== */
				{
					name:'Hsospital',
					path:'/hospital',
					component: () => import('/src/components/xhy/hospitalManage.vue'),
					meta:{title:'住院登记', noCache: true },
				},
				{
					name:'BedManage',
					path:'/bedManage',
					component: () => import('/src/components/xhy/bedManage.vue'),
					meta:{title:'病床管理', noCache: true },
				},
				{
					name:'Discharge',
					path:'/discharge',
					component: () => import('/src/components/xhy/discharge.vue'),
					meta:{title:'出院结算', noCache: true },
				},
				{
					name:'MedicalAdvice',
					path:'/medicaladvice',
					component:() => import('/src/components/xhy/MedicalAdvice.vue'),
					meta:{title:'医嘱执行', noCache: true },
				},
				{
					name:'MedicalAdviceManage',
					path:'/medicaladvicemanage',
					component:() => import('/src/components/xhy/MedicalAdviceManage.vue'),
					meta:{title:'医嘱管理', noCache: true },
				},
				{
					name:'PayManage',
					path:'/paymanage',
					component:() => import('/src/components/xhy/payManage.vue'),
					meta:{title:'缴费管理', noCache: true },
				},
				{
					name:'applyHospital',
					path:'/applyhospital',
					component:() => import('/src/components/xhy/applyHospital.vue'),
					meta:{title:'住院申请管理', noCache: true },
				},
				{
					name:'patientManage',
					path:'/patientManage',
					component:() => import('/src/components/xhy/patientManage.vue'),
					meta:{title:'病人管理', noCache: true },
				},
			
				/* ======================================================ljw 二级 权限路由===================================================== */
				{
					name:'HomeWork',
					path:'',//默认路径，登入就进来
					component:()=>import("/src/components/stair/HomeWork.vue"),
					meta:{title:'工作台', noCache: true },
				},
				{
					name:'Yuangong',//命名路由
					path:'/yg',
					component:()=>import("/src/components/ljw/YuanGong.vue"),
					meta:{title:'员工', noCache: true },
				},
				
				{
					name:'dept',//命名路由
					path:'/dept',
					component:()=>import("/src/components/ljw/Dept.vue"),
					meta:{title:'部门', noCache: true },
				},
				{
					name:'keshi',//命名路由
					path:'/keshi',
					component:()=>import("/src/components/ljw/KeiShi.vue"),
					meta:{title:'科室', noCache: true },
				},
				{
					name:'banci',//命名路由
					path:'/banci',
					component:()=>import("/src/components/ljw/Banci.vue"),
					meta:{title:'班次', noCache: true },
				},
				{
					name:'paiban',//命名路由
					path:'/paiban',
					component:()=>import("/src/components/ljw/PanBan.vue"),
					meta:{title:'排班', noCache: true },
				},
				{
					name:'js',//命名路由
					path:'/js',
					component:()=>import("/src/components/ljw/JueSe.vue"),
					meta:{title:'角色', noCache: true },
				},
			/* ======================================================jl 二级 药房路由===================================================== */
				{
					name:'YF',
					path:'/YF',
					component:()=>import("/src/components/jl/Pharmacy.vue"),
					meta:{title:'药房', noCache: true },
				},
				{
					name:'MZ',
					path:'/MZ',
					component:()=>import("/src/components/jl/Outpatient.vue"),
					meta:{title:'发药', noCache: true },
				},
				{
					name:'CG',
					path:'/CG',
					component:()=>import("/src/components/jl/Purchase.vue"),
					meta:{title:'采购', noCache: true },
				},
				{
					name:'RK',
					path:'/RK',
					component:()=>import("/src/components/jl/Storage.vue"),
					meta:{title:'入库', noCache: true },
				},
				{
					name:'CK',
					path:'/CK',
					component:()=>import("/src/components/jl/Delivery.vue"),
					meta:{title:'出库', noCache: true },
				},
				{
					name:'PD',
					path:'/PD',
					component:()=>import("/src/components/jl/Check.vue"),
					meta:{title:'盘点', noCache: true },
				},
				{
					name:'XH',
					path:'/XH',
					component:()=>import("/src/components/jl/Destroy.vue"),
					meta:{title:'销毁', noCache: true },
				},
			/* =======================================================dqw 二级 体检管理===================================================== */
				{	
					name:'TJ',
					path:'/TJ',
					component:()=>import("/src/components/dqw/operation.vue"),
					meta:{title:'体检预约审批', noCache: true },
				},
				{
					name:'TJtj',
					path:'/tjtj',
					component:()=>import("/src/components/dqw/tjperson.vue"),
					meta:{title:'统计', noCache: true },
				},
				{
					name:'tjxm',
					path:'/tjxm',
					component:()=>import("/src/components/dqw/tjxm.vue"),
					meta:{title:'体检项目', noCache: true },
				},
				{
					name:'ssxm',
					path:'/ssxm',
					component:()=>import("/src/components/dqw/ssxm.vue"),
					meta:{title:'手术项目', noCache: true },
				},
				{
					name:'TJry',
					path:'/tjry',
					component:()=>import("/src/components/dqw/phy.vue"),
					meta:{title:'体检结果', noCache: true },
				},
				{
					name:'SSgl',
					path:'/SSgl',
					component:()=>import("/src/components/dqw/opert.vue"),
					meta:{title:'手术管理', noCache: true },
				},
				{
					name:'ssjl',
					path:'/ssjl',
					component:()=>import("/src/components/dqw/ssjl.vue"),
					meta:{title:'手术记录', noCache: true },
				},
				
				
				
			
		]
	}
]


//创建Router路由实列
const router = createRouter({
	history:createWebHistory(),
	routes //这里是把上面的routes赋到这里来
})
//路由
// router.beforeEach((to,from,next)=>{
//   if(to.path=='/login' || sessionStorage.getItem('token')){
//     next();
//   }else{
//     //Message.error('请重新登录');
//     next('/login');
//   }
// })
//给路由定义一个对外的引用（注入路由）就是起别名一样
export default router