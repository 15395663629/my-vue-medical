<template>
	<el-container style="height: 100%;">
	    <el-header  height="86px" style="line-height: 86px;background-color: #409EFF ;color: #333;">
			<el-row type="flex" justify="space-between">
				<el-col :span="20">
					<router-link to="/home" style="font-size: 28px;font-weight: 900; color: white;">
						🍅🍅🐟医院管理系统
					</router-link>
				</el-col>
				<el-col :span="4">
					<el-form style="margin-top: 18px;margin-left: 100px;">
						<el-form-item label="">
							<el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
							<el-dropdown style="margin-left: 10px; font-size: 18px;">
								<span class="el-dropdown-link">
									管理员您好<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item>切换用户</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-header>
	    <el-container style="height: 100%;">
			<!-- 左边 -->
	        <el-aside width="200px" style="background-color: #D3DCE6;color: #333;">
				<el-menu
				 :uniqueOpened="true"
				      default-active="2"
				      class="el-menu-vertical-demo"
					  style="height: 100%;">
					  <el-submenu index="1">
					  	<template #title>
					          <i class="el-icon-s-home"></i>
					          <span>权限管理</span>
					  	</template>
					  	<el-menu-item-group>
					  		<el-menu-item @click="pushUrl('/yg')" index="/yg"><i class="el-icon-s-management"></i>员工管理</el-menu-item>
					  		<el-menu-item @click="pushUrl('/dept')" index="/dept"><i class="el-icon-s-order"></i>部门管理</el-menu-item>
							<el-menu-item @click="pushUrl('/keshi')" index="/keshi"><i class="el-icon-s-management"></i>科室管理</el-menu-item>
							<el-menu-item @click="pushUrl('/banci')" index="/banci"><i class="el-icon-s-order"></i>班次管理</el-menu-item>
							<el-menu-item @click="pushUrl('/paiban')" index="/paiban"><i class="el-icon-s-management"></i>排班管理</el-menu-item>
							<el-menu-item @click="pushUrl('/js')" index="/js"><i class="el-icon-s-order"></i>角色管理</el-menu-item>
					  	</el-menu-item-group>
					  </el-submenu>
					  
					  
					<el-submenu index="2">
						<template #title>
					        <i class="el-icon-location"></i>
					        <span>门诊管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item @click="pushUrl('/UserRegistration')" index="/UserRegistration"><i class="el-icon-user"></i>用户挂号</el-menu-item>
							<el-menu-item @click="pushUrl('/OPC')"  index="/OPC"><i class="el-icon-s-cooperation"></i>医生问诊</el-menu-item>
							<el-menu-item @click="pushUrl('/ProjectPayment')" index="/ProjectPayment"><i class="el-icon-s-finance"></i>项目缴费</el-menu-item>
							<el-menu-item @click="pushUrl('/ProjectObservation')" index="/ProjectObservation"><i class="el-icon-odometer"></i>项目检查</el-menu-item>
							<!-- <el-menu-item @click="pushUrl('/RecipePrice')" index="/RecipePrice"><i class="el-icon-odometer"></i>RecipePrice</el-menu-item> -->
							<el-menu-item @click="pushUrl('/OutpatientLibrary')" index="/OutpatientLibrary"><i class="el-icon-mobile"></i>门诊患者库</el-menu-item>
							<el-menu-item @click="pushUrl('/MedicalCard')" index="/MedicalCard"><i class="el-icon-bank-card"></i>医疗卡管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					
					<el-submenu index="3">
						<template #title>
					        <i class="el-icon-school"></i>
					        <span>住院管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item @click="pushUrl('/hospital')" index="/hospital"><i class="el-icon-s-management"></i>住院登记</el-menu-item>
							<el-menu-item @click="pushUrl('/paymanage')" index="/g"><i class="el-icon-edit-outline"></i>缴费管理</el-menu-item>
							<el-menu-item @click="pushUrl('/discharge')" index="/e"><i class="el-icon-office-building"></i>出院结算</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					
					<el-submenu index="4">
						<template #title>
					        <i class="el-icon-s-custom"></i>
					        <span>医生工作站</span>
						</template>
						<el-menu-item-group>
							<el-menu-item @click="pushUrl('/patientManage')" index="/patientManage"><i class="el-icon-s-management"></i>病人管理</el-menu-item>
							<el-menu-item @click="pushUrl('/medicaladvicemanage')" index="/b"><i class="el-icon-data-analysis"></i>医嘱管理</el-menu-item>
							<el-menu-item @click="pushUrl('/SSgl')" index="/ss"><i class="el-icon-date"></i>手术安排</el-menu-item>
							<el-menu-item @click="pushUrl('/ssxm')" index="/ssxm"><i class="el-icon-files"></i>手术项目</el-menu-item>
							<el-menu-item @click="pushUrl('/ssjl')" index="/ssjl"><i class="el-icon-files"></i>手术记录</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					
					
					<el-submenu index="5">
						<template #title>
					        <i class="el-icon-s-order"></i>
					        <span>护士工作站</span>
						</template>
						<el-menu-item-group>
							<el-menu-item @click="pushUrl('/bedManage')" index="/c"><i class="el-icon-s-grid"></i>病床管理</el-menu-item>
							<el-menu-item @click="pushUrl('/medicaladvice')" index="/d"><i class="el-icon-s-claim"></i>医嘱执行</el-menu-item>
							<!-- <el-menu-item @click="pushUrl('/bedManage')" index="/l"><i class="el-icon-finished"></i>耗材领取</el-menu-item> -->
						</el-menu-item-group>
					</el-submenu>
					
					<el-submenu index="6">
						<template #title>
					        <i class="el-icon-sugar"></i>
					        <span>药房药库管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item @click="pushUrl('/YF')" index="/YF"><i class="el-icon-first-aid-kit"></i>药库</el-menu-item>
							<el-menu-item @click="pushUrl('/MZ')" index="/XH"><i class="el-icon-folder-remove"></i>发药</el-menu-item>
							<el-menu-item @click="pushUrl('/CG')" index="/CG"><i class="el-icon-s-shop"></i>药品采购</el-menu-item>
							<el-menu-item @click="pushUrl('/RK')" index="/RK"><i class="el-icon-folder-add"></i>入库</el-menu-item>
							<el-menu-item @click="pushUrl('/CK')" index="/CK"><i class="el-icon-folder-remove"></i>出库</el-menu-item>
							<el-menu-item @click="pushUrl('/PD')" index="/PD"><i class="el-icon-folder-remove"></i>盘点</el-menu-item>
							<el-menu-item @click="pushUrl('/XH')" index="/XH"><i class="el-icon-folder-remove"></i>销毁</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					
					<el-submenu index="7">
						<template #title>
					        <i class="el-icon-first-aid-kit"></i>
					        <span>体检</span>
						</template>
						<el-menu-item-group>
							<el-menu-item @click="pushUrl('/TJ')" index="/TJ"><i class="el-icon-first-aid-kit"></i>预约审批</el-menu-item>
							<el-menu-item @click="pushUrl('/tjxm')" index="/tjxm"><i class="el-icon-first-aid-kit"></i>检查项目管理</el-menu-item>
							<el-menu-item @click="pushUrl('/TJry')" index="/tjry"><i class="el-icon-user-solid"></i>体检人员管理</el-menu-item>
							<el-menu-item @click="pushUrl('/TJtj')" index="/TJtj"><i class="el-icon-s-data"></i>统计分析</el-menu-item>
						</el-menu-item-group>
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
			 squareUrl: "../../../public/static/img/1000.png",
		}
	},
	methods:{
		pushUrl(path){
			this.$router.push(path);
		}
	}
}
</script>

<style scoped>
	a {
		color: #333333;
		text-decoration: none;
	}
	  .works{
		  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	  }
</style>
