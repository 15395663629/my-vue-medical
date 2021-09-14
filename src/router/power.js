import axios from 'axios'

//初始化菜单
export const initMenu = (router,store)=>{
	//如果vuex的状态管理中存在路由信息，则不需要再次请求
	if(store.state.children.length > 0){
		window.console.log("状态管理器中存在路由信息.....")
		return;
	}
	//获取用户信息
	console.log(JSON.parse(sessionStorage.getItem("token")))
	if(JSON.parse(sessionStorage.getItem("token")) != null || store.state.token != ''){
		axios.get("menus",{params:{userId:uid}}).then(resp=>{
			if (resp && resp.status == 200) {
			    let res = resp.data;
			    if(res.length>0){
			        //1、对后台查询到的菜单信息，就行格式化，主要目的是：要符合Vue的路由的要求
			        var fmtRoutes = formatRoutes(res);
			        //2、将菜单信息，添加到路由对象中
			        router.addRoutes(fmtRoutes);
			        //3、调用./src/store/index.js中的方法initMenu，参数是格式化之后的菜单数组
			        window.console.log("路由提交成功1");
			        store.commit('initMenu',fmtRoutes);
			        window.console.log("路由提交成功");
			    }else{
			        router.replace({path: '/login'});
			    }
			}
		})
	}
}

//格式化路由
const formatRoutes = (routes)=> {
    let fmRoutes = [];
    routes.forEach(router=> {
        let {
            path,
            name,
            component,
            meta,
            children
        } = router;//取数据库的数据
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {};
		if (router.path == null){
			fmRouter = {
			    name: name,
			    meta: meta,
			    children: children	
			}
		}else{
			fmRouter = {
			    path: path,
			    name: name,
			    component(resolve){
			        require(['../components/' + component], resolve)
			    },
			    meta: meta,
			    children: children
			}
		}
        fmRoutes.push(fmRouter);
    });
    return fmRoutes;
}