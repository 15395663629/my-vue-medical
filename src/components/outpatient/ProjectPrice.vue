<template >
	<el-row>
		<el-form  status-icon  ref="ruleForm" label-width="150px" class="demo-ruleForm">
			<el-col >
				<el-form-item label-width="0px">
					<el-input placeholder="请输入你要查询的患者"></el-input>
				</el-form-item>
			</el-col>
			<el-col>
				<el-form-item label-width="0px">
					<el-button  type="primary">搜索</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</el-row>

	<el-table  height="662" row-key="date"  :data="tableData" style="width: 100%">
		<el-table-column fixed  label="药品名称"  width="120"></el-table-column>
		<el-table-column fixed  label="计量"  width="120"></el-table-column>
		<el-table-column fixed  label="单位"  width="120"></el-table-column>
		<el-table-column fixed  label="频次"  width="120"></el-table-column>
		<el-table-column fixed  label="用法"  width="120"></el-table-column>
		<el-table-column fixed  label="是否皮试"  width="120"></el-table-column>
		<el-table-column fixed  label="输液分组"  width="120"></el-table-column>
		<el-table-column fixed  label="嘱托"  width="130" align="center"></el-table-column>
		<el-table-column fixed  label="单价"  width="120"></el-table-column>
		<el-table-column fixed  label="计数"  width="120"></el-table-column>
		<el-table-column fixed  label="总量"  width="120"></el-table-column>
		<el-table-column fixed  label="金额"  width="120"></el-table-column>
		<el-table-column fixed  label="操作"  width="120">
			<template #default="scope">
			  <el-button
			    size="mini"
				type="success"
			    @click="handleEdit(scope.$index, scope.row)">打印小票</el-button>
			</template>
		</el-table-column>
		<el-table-column prop="tag" label="标签"
		width="100" :filters="[{ text: '药品缴费', value: '药品缴费' }, { text: '项目缴费', value: '项目缴费' }]"
		:filter-method="filterTag"  filter-placement="bottom-end">
			<template #default="scope">
		        <el-tag :type="scope.row.tag === '项目缴费' ? 'primary' : 'success'" disable-transitions>
				{{scope.row.tag}}
				</el-tag>
			</template>
		</el-table-column>
	 </el-table>
</template>

<script>
	export default {
		data() {
			return {
				textarea:"",
				dialogVisible: false,
				centerDialogVisible: false,
				currentPage3: 5,
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					tag: '项目缴费',
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					tag: '药品缴费',
				}],
				
			};
		},
		 methods: {
		      filterTag(value, row) {
		        return row.tag === value;
		      },
			 
			  handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			  },
			  handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			  },
		},
		
	};
</script>

<style>
	
</style>
