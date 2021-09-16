import { createApp } from 'vue'
import App from './App.vue'

//导包axios--------------------------------
import VueAxios from 'vue-axios'
import axios from 'axios'
import qs from 'qs'

//引入路由--------------------------------
import router from './router/index.js'

//引入store--------------------------
import store from './store/index.js'
//面包屑组件
import crumb from './components/utils/Breadcrumb.vue'
//引入ElementUI--------------------------------
import ElementUI from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
//ElementUI改中文
import 'dayjs/locale/zh-cn'
import locale from "element-plus/lib/locale/lang/zh-cn"


//引入opc的对应表格
import newDateOPC from "./components/outpatient/newDate.vue"// 时间
import opcTable1 from "./components/outpatient/opc/OPCTable1.vue"// 问诊
import opcTable2 from "./components/outpatient/opc/OPCTable2.vue"
import opcTable3 from "./components/outpatient/opc/OPCTable3.vue"
import opcTable4 from "./components/outpatient/opc/OPCTable4.vue"
import opcTable5 from "./components/outpatient/opc/OPCTable5.vue"
import cardTable1 from "./components/outpatient/card/CardTable1.vue"// 诊疗卡
import cardTable2 from "./components/outpatient/card/CardTable2.vue"
import upTable1 from "./components/outpatient/card/UpTable1.vue"
import upTable2 from "./components/outpatient/card/UpTable2.vue"
import regDialog1 from "./components/outpatient/reg/RegDialog1.vue"// 挂号
import regDialog2 from "./components/outpatient/reg/RegDialog2.vue"



//统一的跨域前缀--------------------------------
axios.defaults.baseURL = 'http://localhost:8089/';
//设置默认的请求超时时间。例如超过了5s，就会告知用户当前请求超时，请刷新等。
axios.defaults.timeout = 5000;

createApp(App)
.use(router)
.use(VueAxios,axios)
.use(ElementUI,{locale})
.use(store)
.component('newDateOPC',newDateOPC)
.component('opcTable1',opcTable1)
.component("opcTable2",opcTable2)
.component("opcTable3",opcTable3)
.component("opcTable4",opcTable4)
.component("opcTable5",opcTable5)

.component("cardTable1",cardTable1)
.component("cardTable2",cardTable2)
.component("upTable1",upTable1)
.component("upTable2",upTable2)
.component('crumb',crumb)

.component("regDialog1",regDialog1)
.component("regDialog2",regDialog2)
.mount('#app')
