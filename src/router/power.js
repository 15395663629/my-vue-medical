import axios from 'axios'

//初始化菜单
export const initMenu = (router,store)=>{
	//如果vuex的状态管理中存在路由信息，则不需要再次请求
	console.log(store.state,"获取")
	console.log(store.state.token.uid+"用户编号")

	//如果vuex的状态管理中存在路由信息，则不需要再次请求
	if(store.state.children.length > 0){
		window.console.log("状态管理器中存在路由信息.....")
		return;
	}
	//获取用户信息
	if(JSON.parse(sessionStorage.getItem("token")) != null && store.state.token != ''){
		window.console.log(sessionStorage.getItem("token")+"-*-*-*-*")
		axios.get("/home-menus",{params:{userId:store.state.token.uid}}).then(v=>{
			window.console.log(v.data+"动态路由")
		}).catch()
	}
	// if(JSON.parse(sessionStorage.getItem("token")) != null && store.state.token != ''){
	// 	axios.get("/home-menus",{params:{userId:store.state.token.uid}}).then(resp=>{
	// 		window.console.log(resp.data+"----111")
	// 		if (resp && resp.status == 200) {
	// 			let res = resp.data;
	// 			let arr = [];
	// 			console.log(res + "------")
	// 			// 1、对后台查询到的菜单信息，就行格式化，主要目的是：要符合Vue的路由的要求
	// 			var fmtRoutes = formatRoutes(res.data);
	// 			console.log(fmtRoutes)
	// 			if (res.data.length > 0) {
	// 				console.log(res.data, "---")
	// 				//1、对后台查询到的菜单信息，就行格式化，主要目的是：要符合Vue的路由的要求
	// 				var fmtRoutes = formatRoutes(res.data);
	// 				//2、将菜单信息，添加到路由对象中,因为home是顶级的路由，所以直接写死
	// 				router.routes = fmtRoutes;
	// 				console.log("格式化", fmtRoutes);
	// 				fmtRoutes.forEach(row => {
	// 					row.children.forEach(r => {
	// 						console.log(r)
	// 						router.addRoute("/home", r);
	// 					})
	// 					//
	// 					arr.push(row);
	//
	// 				})
	// 				//router.addRoute("HomePage",fmtRoutes[0]);
	// 				//3、调用./src/store/index.js中的方法initMenu，参数是格式化之后的菜单数组
	// 				console.log(fmtRoutes, "存路由")
	// 				store.commit('initMenu', fmtRoutes);
	// 				console.log("所有的路由是：", router.getRoutes())
	//
	// 				next({...to, replace: true})
	//
	// 				/*}else{
    //                     console.log(9)
    //                     router.replace({path: '/login'});
    //                 }*/
	// 			}
	// 		}
	// 	})
	// }

}
//批量导入
const modules = import.meta.glob('../**/**.vue')
//组装路由
export const formatRoutes = (routes) => {
	let fmRoutes = [];
	routes.forEach(router => {
		let {
			fctionSrc,
			// qxZjm,
			fctionAssembly,
			fctionIcon,
			list
		} = router; //取数据库的数据

		if (list && list instanceof Array) {
			list = formatRoutes(list);
		}
		let fmRouter = {};
		if (router.qxZjm == null) {
			fmRouter = {
				name: qxName,
				// path: '/',
				// meta: meta,
				// component:modules[`../components/${qxLj}.vue`],
				children: list
			}
		} else {
			console.log(fctionSrc);
			fmRouter = {
				path: qxZjm,
				name: qxName,
				component: modules[`../components/${fctionSrc}.vue`],
				// meta: meta,
				children: list
			}
		}

		fmRoutes.push(fmRouter);
	});

	return fmRoutes;
}