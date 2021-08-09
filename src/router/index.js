import {createRouter,createWebHistory} from "vue-router"

//定义组件，定义路由
const routes = [
	//一级路由
	//登录一级路由
	{
		name:'login',
		path:'/login',
		component:()=>import("/src/components/stair/login.vue"),
		meta:'登入'
	},
	//医嘱操作一级路由
	{
		name:'MAMOperation',//命名路由
		path:'/MAMOperation',
		component:()=>import("/src/components/inhospital/MAMOperation.vue"),
		meta:'登入'
	},
	//医嘱执行一级路由
	{
		name:'MedicalAdvice',
		path:'/medicaladvice',
		component:() => import('/src/components/inhospital/MedicalAdvice.vue'),
		meta:{title:'医嘱执行', noCache: true },
	},
	//opc门诊的一级路由
	{
			name:'OPC',
			path:'/opc',
			component:()=>import("/src/components/outpatient/OPC.vue"),
			meta:{title:'门诊管理', noCache: true },
	},
	{
		name:'Home',
		path:'/home',//默认路径，登入就进来
		component:()=>import("/src/components/stair/Home.vue"),
		meta:{title:'主页', noCache: true },
		//二级
		children:[
				/* ======================================================outpatient 二级 门诊路由====================================================== */
				{
					name:'UserRegistration',
					path:'/UserRegistration',
					component:()=>import("/src/components/outpatient/UserRegistration.vue"),
					meta:{title:'用户挂号', noCache: true },
				},
			
				{
					name:'ProjectPayment',
					path:'/ProjectPayment',
					component:()=>import("/src/components/outpatient/ProjectPayment.vue"),
					meta:{title:'医疗缴费', noCache: true },
					children:[//门诊问诊三级路由------------------
						{
							name:'DrugPayment',
								path:'/DrugPayment',
								component:()=>import("/src/components/outpatient/DrugPayment.vue"),
								meta:{title:'药品缴费', noCache: true },
						},
						{
								name:'ProjectPrice',
								path:'/ProjectPrice',
								component:()=>import("/src/components/outpatient/ProjectPrice.vue"),
								meta:{title:'项目缴费', noCache: true },
						},]
				},
				{
					name:'card',
					path:'/card',
					component:()=>import("/src/components/outpatient/Card.vue"),
					meta:{title:'医疗卡管理', noCache: true },
					children:[//门诊问诊三级路由------------------
						{
								name:'MedicalCard',
								path:'/MedicalCard',
								component:()=>import("/src/components/outpatient/card/MedicalCard.vue"),
								meta:{title:'修改挂失', noCache: true },
						},
						{
								name:'UpPremium',
								path:'/UpPremium',
								component:()=>import("/src/components/outpatient/card/UpPremium.vue"),
								meta:{title:'充值退费', noCache: true },
						},]
				},
				{
					name:'ProjectObservation',
					path:'/ProjectObservation',
					component:()=>import("/src/components/outpatient/ProjectObservation.vue"),
					meta:{title:'项目检查', noCache: true },
				},
				{
					name:'OutpatientLibrary',
					path:'/OutpatientLibrary',
					component:()=>import("/src/components/outpatient/OutpatientLibrary.vue"),
					meta:{title:'门诊患者库', noCache: true },
				},
			/* ======================================================inhospital  二级 住院路由===================================================== */
				{
					name:'Hsospital',
					path:'/hospital',
					component: () => import('/src/components/inhospital/hospitalManage.vue'),
					meta:{title:'住院登记', noCache: true },
				},
				{
					name:'BedManage',
					path:'/bedManage',
					component: () => import('/src/components/inhospital/bedManage.vue'),
					meta:{title:'病床管理', noCache: true },
				},
				{
					name:'Discharge',
					path:'/discharge',
					component: () => import('/src/components/inhospital/discharge.vue'),
					meta:{title:'出院结算', noCache: true },
				},
				{
					name:'MedicalAdviceManage',
					path:'/medicaladvicemanage',
					component:() => import('/src/components/inhospital/MedicalAdviceManage.vue'),
					meta:{title:'医嘱管理', noCache: true },
				},
				{
					name:'PayManage',
					path:'/paymanage',
					component:() => import('/src/components/inhospital/payManage.vue'),
					meta:{title:'缴费管理', noCache: true },
				},
				{
					name:'applyHospital',
					path:'/applyhospital',
					component:() => import('/src/components/inhospital/applyHospital.vue'),
					meta:{title:'住院申请管理', noCache: true },
				},
				{
					name:'patientManage',
					path:'/patientManage',
					component:() => import('/src/components/inhospital/patientManage.vue'),
					meta:{title:'病人管理', noCache: true },
				},
			
				/* ======================================================jurisdiction 二级 权限路由===================================================== */
				{
					name:'HomeWork',
					path:'',//默认路径，登入就进来
					component:()=>import("/src/components/stair/HomeWork.vue"),
					meta:{title:'工作台', noCache: true },
				},
				{
					name:'Yuangong',//命名路由
					path:'/yg',
					component:()=>import("/src/components/jurisdiction/YuanGong.vue"),
					meta:{title:'员工', noCache: true },
				},

				
				{
					name:'dept',//命名路由
					path:'/dept',
					component:()=>import("/src/components/jurisdiction/Dept.vue"),
					meta:{title:'部门', noCache: true },
				},
				{
					name:'keshi',//命名路由
					path:'/keshi',
					component:()=>import("/src/components/jurisdiction/KeiShi.vue"),
					meta:{title:'科室', noCache: true },
				},
				{
					name:'banci',//命名路由
					path:'/banci',
					component:()=>import("/src/components/jurisdiction/Banci.vue"),
					meta:{title:'班次', noCache: true },
				},
				{
					name:'paiban',//命名路由
					path:'/paiban',
					component:()=>import("/src/components/jurisdiction/PanBan.vue"),
					meta:{title:'排班', noCache: true },
				},
				{
					name:'js',//命名路由
					path:'/js',
					component:()=>import("/src/components/jurisdiction/JueSe.vue"),
					meta:{title:'角色', noCache: true },
				},
			/* ======================================================pharmacy 二级 药房路由===================================================== */
				{
					name:'YF',
					path:'/YF',
					component:()=>import("/src/components/pharmacy/Pharmacy.vue"),
					meta:{title:'药品信息管理', noCache: true },
				},
				{
					name:'YaoKu',
					path:'/YaoKu',
					component:()=>import("/src/components/pharmacy/DrugStorage.vue"),
					meta:{title:'药库', noCache: true },
				},
				{
					name:'Haocai',
					path:'/Haocai',
					component:()=>import("/src/components/pharmacy/Consumable.vue"),
					meta:{title:'耗材', noCache: true },
				},
				{
					name:'MZ',
					path:'/MZ',
					component:()=>import("/src/components/pharmacy/Outpatient.vue"),
					meta:{title:'发药', noCache: true },
				},
				{
					name:'CG',
					path:'/CG',
					component:()=>import("/src/components/pharmacy/Purchase.vue"),
					meta:{title:'采购', noCache: true },
				},
				{
					name:'RK',
					path:'/RK',
					component:()=>import("/src/components/pharmacy/Storage.vue"),
					meta:{title:'入库', noCache: true },
				},
				{
					name:'CK',
					path:'/CK',
					component:()=>import("/src/components/pharmacy/Delivery.vue"),
					meta:{title:'出库', noCache: true },
				},
				{
					name:'PD',
					path:'/PD',
					component:()=>import("/src/components/pharmacy/Check.vue"),
					meta:{title:'盘点', noCache: true },
				},
				{
					name:'XH',
					path:'/XH',
					component:()=>import("/src/components/pharmacy/Destroy.vue"),
					meta:{title:'销毁', noCache: true },
				},
				{
					name:'GYS',
					path:'/GYS',
					component:()=>import("/src/components/pharmacy/Supplier.vue"),
					meta:{title:'供应商管理', noCache: true },
				},
			/* =======================================================checkout 二级 体检管理===================================================== */
				{	
					name:'TJ',
					path:'/TJ',
					component:()=>import("/src/components/checkout/operation.vue"),
					meta:{title:'体检预约审批', noCache: true },
				},
				{
					name:'TJtj',
					path:'/tjtj',
					component:()=>import("/src/components/checkout/tjperson.vue"),
					meta:{title:'统计', noCache: true },
				},
				{
					name:'tjxm',
					path:'/tjxm',
					component:()=>import("/src/components/checkout/tjxm.vue"),
					meta:{title:'体检项目', noCache: true },
				},
				{
					name:'ssxm',
					path:'/ssxm',
					component:()=>import("/src/components/checkout/ssxm.vue"),
					meta:{title:'手术项目', noCache: true },
				},
				{
					name:'TJry',
					path:'/tjry',
					component:()=>import("/src/components/checkout/phy.vue"),
					meta:{title:'体检结果', noCache: true },
				},
				{
					name:'SSgl',
					path:'/SSgl',
					component:()=>import("/src/components/checkout/opert.vue"),
					meta:{title:'手术管理', noCache: true },
				},
				{
					name:'ssjl',
					path:'/ssjl',
					component:()=>import("/src/components/checkout/ssjl.vue"),
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
router.beforeEach((to,from,next)=>{
	if(to.path=='/login' || sessionStorage.getItem('token')){
		// console.log("123")
		next()
	}else{
		// console.log("456")
			next('/login');
	}
})
// router.beforeEach(function (to,from,next){
// 	const  state=JSON.parse(sessionStorage.getItem("state"))
// 	if(to.name!=="/"&& state==null || to.name!=="/"&& !state.token.isValidate){}
// })
//给路由定义一个对外的引用（注入路由）就是起别名一样
export default router