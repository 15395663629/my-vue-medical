<template>
	  <el-tabs v-model="activeName" type="card" @tab-click="handleClick"><!-- 三级路由调转 -->
			<el-tab-pane  label="充值退费" name="/UpPremium"><!-- 重置退费 -->
			</el-tab-pane>
      <el-tab-pane label="修改挂失" name="/MedicalCard"><!-- 修改挂失 -->
      </el-tab-pane>
	  </el-tabs>
	  <div>
			<router-view  ></router-view>
	  </div>
</template>

<script>
	export default{
		data() {

		  return {
		    activeName: '/UpPremium',
		  }

		},
		methods: {
		  handleClick(tab, event) {//页面跳转
		    console.log(tab);
			this.$router.push(tab.props.name);
		  },
		  pushUrl(){//默认进入卡片修改
		  	this.$router.push('/UpPremium');
		  }
		},
		created() {
			this.pushUrl()
		}
	}
</script>

<style>
</style>