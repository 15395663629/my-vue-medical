<template>
	<el-container style="height: 100%;">
	    <el-header  height="40px" style="line-height: 86px;background-color: #409EFF ;color: #333;">
			<el-row type="flex" justify="space-between">
				<el-col :span="20" style="line-height: 40px">
					<router-link to="/home" style=" margin-top: 0px; font-size: 20px;font-weight: 900; color: white;">
						柿子医院管理系统
					</router-link>
				</el-col>
				<el-col :span="3">
					<el-form style="line-height: 40px; margin-left: 100px;">
						<el-form-item label="">
<!--							<el-avatar shape="square" style="margin-top: 5px" :size="30" :src="squareUrl"></el-avatar>-->
              <el-dropdown>
                  <span class="el-dropdown-link" style="font-size: 18px;color: #303133">
                   {{token.list.sname}}<i class="el-icon-arrow-down el-icon--right"></i>
                       </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="signout">切换用户</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-header>
	    <el-container style="max-height: 100%;overflow: hidden;">
			<!-- 左边 -->
        <el-aside width="200px">
          <el-menu router unique-opened
                   class="el-menu-vertical-demo">
            <el-submenu v-for="(menu,idx) in menus" :index="idx+''">
              <template #title>
                <i :class="menu.fctionIcon"></i>
                <span>{{menu.fctionAssembly}}</span>
              </template>
              <el-menu-item v-for="c in menu.list" :index="c.fctionSrc+''">
                <i :class="c.fctionIcon"></i>
                <template #title>{{c.fctionAssembly}}</template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
			<!-- 右边 -->
        <el-main style="padding: 0px 20px; color: #333;background-color: #E9EEF3">
					<crumb></crumb>
					<div class="works">
						<router-view></router-view>
					</div>
			</el-main>
	    </el-container>
	</el-container>
</template>

<script>
export default{
	data(){
		return{
		  token:[],
      menus:[],
      kslist:[],
      deptName:'',
      ksName:'',
			 squareUrl: "../../../public/static/img/1000.png",
		}
	},
	methods:{
	  getData(){
      this.axios.get('http://localhost:8089/ks-list').then((v)=>{
        this.kslist=v.data
        for (let i = 0 ; i<this.kslist.length ; i++){
          if(this.kslist[i].ksId === this.token.list.ksId){
            this.ksName=this.kslist[i].ksName
            return
          }
        }
        console.log(this.kslist)
      }).catch()
      this.axios({
        url:"gitee",
        params:{uId:this.token.uid}
      }).then((v)=>{
       this.deptName=v.data[0].role.rname;
      }).catch()

    },
		pushUrl(path){
			this.$router.push(path);
		},
    getMenus(){
      let userId = this.$store.state.token.uid;
      console.log(this.$store.state.token.uid)
      this.axios.get("home-menus",{params:{userId:userId}}).then((res)=>{
      this.menus = res.data
        console.log(this.menus)
  }).catch()
},
    signout(){
      window.sessionStorage.clear()
      this.$router.push('/')
    },
	},
  created() {
	  //取token值
    this.token = this.$store.state.token
    this.getMenus()
    this.getData()
  }
}
</script>

<style>
	a {
		color: #333333;
		text-decoration: none;
	}
  table{
    margin-top: 0px;
  }
	  .works{
		  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	  }
    .dome{
      font-size: 16px;
    }
</style>
