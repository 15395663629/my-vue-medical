<template>
<div class="common-layout">
  
  <el-container>
    <el-header height="200px">	
	
	</el-header>
    <el-container>
      <el-aside width="200px">
		<el-row class="tac">
		  
		  <el-col >
		    
		    <el-menu
		      default-active="2"
		      class="el-menu-vertical-demo"
		      @open="handleOpen"
		      @close="handleClose">
		      <el-menu-item index="1">
		        <i class="el-icon-setting"></i>
		        <template #title><router-link to="/yg">员工管理</router-link></template>
		      </el-menu-item>
			  <el-menu-item index="2">
			    <i class="el-icon-setting"></i>
			    <template #title><router-link to="/dept">部门管理</router-link></template>
			  </el-menu-item>
			  <el-menu-item index="3">
			    <i class="el-icon-setting"></i>
			    <template #title><router-link to="/keshi">科室管理</router-link></template>
			  </el-menu-item>
			  <el-menu-item index="4">
			    <i class="el-icon-setting"></i>
			    <template #title><router-link to="/banci">班次管理</router-link></template>
			  </el-menu-item>
			  <el-menu-item index="5">
			    <i class="el-icon-setting"></i>
			    <template #title><router-link to="/paiban">排班管理</router-link></template>
			  </el-menu-item>
			  <el-menu-item index="6">
			    <i class="el-icon-setting"></i>
			    <template #title><router-link to="/js">角色管理</router-link></template>
			  </el-menu-item>
		    </el-menu>
				 </el-col>
				</el-row>
	  </el-aside>
      <el-main>
		 <router-view></router-view>
	  </el-main>
    </el-container>
  </el-container>

 
</div>
</template>

<script>
     export default {
		 data() {
		 	return{
				exposed:"",
				type:{},
				value1:""
			}
		 },
       methods: {
		   getTime(){
			   this.value1=new Date(new Date().setHours(23, 59, 59, 59));
		   },
         handleOpen(key, keyPath) {
           console.log(key, keyPath);
         },
         handleClose(key, keyPath) {
           console.log(key, keyPath);
         }
       },
	    mounted() {
	       let that = this;
	       that.getTime()
	     }
     }
</script>

<style>

/* .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 800px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 	60px; */
  }

  body > .el-container {
    margin-bottom: 40px;
  } */

 /* .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  } */

  /* .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  } */
</style>
