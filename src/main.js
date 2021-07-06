import { createApp } from 'vue'
import App from './App.vue'

//导包axios--------------------------------
import VueAxios from 'vue-axios'
import axios from 'axios'

//引入路由--------------------------------
import router from './router/index.js'
//面包屑组件
import crumb from './components/utils/Breadcrumb.vue'
//引入ElementUI--------------------------------
import ElementUI from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
//ElementUI改中文
import locale from "element-plus/lib/locale/lang/zh-cn"

import newDateOPC from "./components/yy/newDate.vue"
import opcTable1 from "./components/yy/OPC/OPC_table1.vue"
import opcTable2 from "./components/yy/OPC/OPC_table2.vue"
import opcTable3 from "./components/yy/OPC/OPC_table3.vue"
import opcTable4 from "./components/yy/OPC/OPC_table4.vue"

//统一的跨域前缀--------------------------------
axios.defaults.baseURL = 'http://localhost:8888/';
//设置默认的请求超时时间。例如超过了5s，就会告知用户当前请求超时，请刷新等。
axios.defaults.timeout = 5000;

createApp(App)
.use(router)
.use(VueAxios,axios)
.use(ElementUI,{locale})
.component('newDateOPC',newDateOPC)
.component('opcTable1',opcTable1)
.component("opcTable2",opcTable2)
.component("opcTable3",opcTable3)
.component("opcTable4",opcTable4)
.component('crumb',crumb)
.mount('#app')
