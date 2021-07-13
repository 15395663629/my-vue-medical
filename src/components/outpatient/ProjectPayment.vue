<template>
	  <el-tabs v-model="activeName" type="card" @tab-click="handleClick"><!-- 三级路由调转 -->
	    <el-tab-pane label="医疗缴费" name="/DrugPayment"><!-- 药品缴费 -->
		</el-tab-pane>
		<!-- 项目缴费 -->
	    <el-tab-pane  label="缴费查询" name="/ProjectPrice">
		</el-tab-pane>
	  </el-tabs>
	  <div>
			<router-view  ></router-view>
	  </div> 
</template>

<script>
	export default {
	    data() {
	      return {
	        activeName: '/DrugPayment',
	      }
	    },
	    methods: {
	      handleClick(tab, event) {//页面跳转
	        console.log(tab);
			this.$router.push(tab.props.name);
	      },
		  pushUrl(){//默认进入药品缴费
		  	this.$router.push('/DrugPayment');
		  }
	    },
		created() {
			this.pushUrl()
		}
	  }
</script>

<style>
</style>
