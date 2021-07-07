<template>
	<el-row> 
		<el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-col>
				<el-form-item label-width="0px">
					<el-input style="width: 300px;" placeholder="请输入你要查询的卡信息,或持有人信息"></el-input>
				</el-form-item>
			</el-col>
			<el-col>
				<el-form-item label-width="0px">
					<el-button type="primary" icon="el-icon-search">查询</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</el-row>
	<el-radio-group v-model="radio2" class=" my-radio-group"  size="mini">
	  <el-radio-button label="诊卡充值退款"></el-radio-button> 
	  <el-radio-button label="充值退款记录"></el-radio-button><!-- 当这里切换到退款记录时不能显示操作按钮 -->
	</el-radio-group>
	<el-table :data="rightTableData2" style="width: 100%" height="571" >
		<el-table-column label="日期" width="180">
		  <template #default="scope">
			<i class="el-icon-time"></i>
			<span style="margin-left: 10px">{{ scope.row.date }}</span>
		  </template>
		</el-table-column>
		<el-table-column label="姓名" width="180">
		  <template #default="scope">
			<el-popover effect="light" trigger="hover" placement="top">
			  <template #default>
				<p>姓名: {{ scope.row.name }}</p>
				<p>住址: {{ scope.row.address }}</p>
			  </template>
			  <template #reference>
				<div class="name-wrapper">
				  <el-tag size="medium">{{ scope.row.name }}</el-tag>
				</div>
			  </template>
			</el-popover>
		  </template>
		</el-table-column>
		
		<el-table-column label="操作">
		  <template #default="scope">
			<el-button
			size="mini"
			type="success"
			@click="isShow1=!isShow1">充值</el-button>
			<el-button
			size="mini"
			type="danger"
			@click="isShow2=!isShow2">退款</el-button>
		  </template>
		</el-table-column>
		
		<el-table-column prop="tag" label="标签"
		width="120" :filters="[{ text: '诊疗卡退款', value: '诊疗卡退款' }, { text: '诊疗卡充值', value: '诊疗卡充值' }]"
		:filter-method="filterTag"  filter-placement="bottom-end">
			<template #default="scope">
				<el-tag :type="scope.row.tag === '诊疗卡退款' ? 'primary' : 'success'" disable-transitions>
				{{scope.row.tag}}
				</el-tag>
			</template>
		</el-table-column>
		
	  </el-table>
	  
	  <el-pagination
	  	style="text-align: center; margin-top: 10px;"
	  	@size-change="totalCut"
	  	@current-change="pageCut"
	  	:current-page="1"
	  	:page-sizes="[2,4,6,8,10]"
	  	:page-size="size"
	  	layout="total, sizes, prev, pager, next, jumper"
	  	:total="total">
	  </el-pagination>
	  
	<el-dialog title="提示" v-model="isShow1" width="37%" center  ><!-- 诊疗卡充值窗口 -->
		<el-row><!-- :rules="rules" -->
			<el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-col>
					<el-form-item label="密码:" >
						<el-input placeholder="请输入您的密码"></el-input>
					</el-form-item>
				</el-col>
				<el-col>
					<el-form-item label="充值金额:" >
						<el-input placeholder="请输入您要充值的金额"></el-input>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
		<el-row>
			<el-form  status-icon ref="ruleForm" label-width="453px" style="margin-top: 30px;" class="demo-ruleForm">
				<el-col>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						<el-button @click="resetForm('ruleForm')">取消</el-button>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
	</el-dialog>
	
	
	<el-dialog title="提示" v-model="isShow2" width="37%" center  ><!-- 诊疗卡退款 -->
		<el-row><!-- :rules="rules" -->
			<el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-col>
					<el-form-item label="密码:" >
						<el-input placeholder="请输入您的密码"></el-input>
					</el-form-item>
				</el-col>
				<el-col>
					<el-form-item label="卡余额:" >
						<el-input disabled></el-input>
					</el-form-item>
				</el-col>
				
				<el-col>
					<el-form-item label="退款余额:" >
						<el-input placeholder="请输入您要退款金额数"></el-input>
					</el-form-item>
				</el-col>
				
				<el-col>
					<el-form-item label="" >
						<el-button style="width: 202px;" size="small" type="primary">一键退出所有余额</el-button>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
	</el-dialog>
	
	
</template>

<script>
	export default{
		data(){
			return{
				isShow1: false,
				isShow2: false,
				radio2:"诊卡充值退款",
				rightTableData2: [{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄',
						  tag:"诊疗卡退款",
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄',
						  tag:"诊疗卡充值",
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄',
						  tag:"诊疗卡退款",
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄',
						  tag:"诊疗卡充值",
				}]
			}
		},
		methods:{
			filterTag(value, row) {/* 复诊初诊标签方法 */
				return row.tag === value;
			},
		}
	}
</script>

<style>
</style>