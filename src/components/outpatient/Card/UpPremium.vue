<template>
	<el-row style="height: 40px">
		<el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-col>
				<el-form-item  label-width="0px">
					<el-input size="small" style="width: 300px;" placeholder="请输入你要查询的卡信息,或持有人信息"></el-input>
				</el-form-item>
			</el-col>
			<el-col>
				<el-form-item label-width="0px">
					<el-button  size="small" type="primary" icon="el-icon-search">查询</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</el-row>
	<el-radio-group v-model="radio1" class=" my-radio-group"  size="mini">
	  <el-radio-button label="诊卡充值退款" ></el-radio-button>
	  <el-radio-button label="充值退款记录"></el-radio-button><!-- 当这里切换到退款记录时不能显示操作按钮 -->
	</el-radio-group>

	
</template>

<script>
	export default{
		data(){
			return{
				isShow1: false,
				isShow2: false,
				radio1:"诊卡充值退款",
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

		}
	}
</script>

<style>
</style>