<template><!-- 药品缴费 -->
	<el-row>
		<el-form  status-icon  ref="ruleForm" label-width="150px" class="demo-ruleForm">
			<el-col :span="5">
				<el-form-item  label="缴费单号：">
					<el-input disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="姓名：">
					<el-input disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="性别：">
					<el-input disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="年龄：">
					<el-input disabled></el-input>
				</el-form-item>
			</el-col >
			<el-row :span="4">
				<el-form-item >
					<el-button @click="centerDialogVisible = true" type="primary">选择收费</el-button>
				</el-form-item>
			</el-row>
		</el-form>
	</el-row>
	<el-row >
		<el-form  status-icon  ref="ruleForm" label-width="150px" class="demo-ruleForm">
			<el-col :span="5">
				<el-form-item  label="科室：">
					<el-input disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="诊断医生：">
					<el-input disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="电话：">
					<el-input disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="挂号费：">
					<el-input disabled></el-input>
				</el-form-item>
			</el-col >
			<el-row :span="4">
				<el-form-item >
					<el-button  type="primary" @click="dialogVisible = true">收费打印</el-button>
				</el-form-item>
			</el-row>
		</el-form>
	</el-row>
	
	<el-table show-summary height="600" row-key="date"  :data="tableData" style="width: 100%">
		<el-table-column fixed  label="药品名称"  width="120"></el-table-column>
		<el-table-column fixed  label="计量"  width="120"></el-table-column>
		<el-table-column fixed  label="单位"  width="120"></el-table-column>
		<el-table-column fixed  label="频次"  width="120"></el-table-column>
		<el-table-column fixed  label="用法"  width="120"></el-table-column>
		<el-table-column fixed  label="是否皮试"  width="120"></el-table-column>
		<el-table-column fixed  label="输液分组"  width="120"></el-table-column>
		<el-table-column fixed  label="嘱托"  width="260" align="center"></el-table-column>
		<el-table-column fixed  label="单价"  width="120"></el-table-column>
		<el-table-column fixed  label="计数"  width="120"></el-table-column>
		<el-table-column fixed  label="总量"  width="120"></el-table-column>
		<el-table-column fixed  label="金额"  width="120"></el-table-column>
		<el-table-column prop="drugType" label="标签"
		width="100" :filters="[{ text: '西药', value: '西药' }, { text: '检验', value: '检验' },{text:'中药',value:'中药'}]"
		:filter-method="filterTag2"  filter-placement="bottom-end">
			<template #default="scope">
		        <el-tag :type="scope.row.drugType === '检验' ? 'primary' : (scope.row.drugType === '中药'?'success':'danger')" disable-transitions>
				{{scope.row.drugType}}
				</el-tag>
			</template>
		</el-table-column>
	 </el-table>
	
	<!-- 阴影层======================================== -->
	<el-dialog title="项目缴费" v-model="centerDialogVisible" 
	 width="80%"  destroy-on-close center>
	 <el-row>
		 <el-col :span="5">
			<el-input style="width: 200px;" placeholder="请输入你要查询的内容" ></el-input> 
			<el-button type="primary" icon="el-icon-search">查询</el-button>
		</el-col>
	 </el-row>
	 <el-table height="500" row-key="date"  :data="tableData" style="width: 100%">
		<el-table-column fixed  label="单据编号"  width="120"></el-table-column>
		<el-table-column fixed  label="操作"  width="120">
			<el-button type="success" size="mini">
				选择
			</el-button>
		</el-table-column>
		<el-table-column prop="tag" label="标签"
		width="100" :filters="[{ text: '药品缴费', value: '药品缴费' }, { text: '项目缴费', value: '检验缴费' }]"
		:filter-method="filterTag"  filter-placement="bottom-end">
			<template #default="scope">
		        <el-tag :type="scope.row.tag === '项目缴费' ? 'primary' : 'success'" disable-transitions>
				{{scope.row.tag}}
				</el-tag>
			</template>
		</el-table-column>
	 </el-table>
	 <div class="block">
	     <span class="demonstration"></span>
	     <el-pagination
	       @size-change="handleSizeChange"
	       @current-change="handleCurrentChange"
	       v-model:currentPage="currentPage3"
	       :page-size="100"
	       layout="prev, pager, next, jumper"
	       :total="1000">
	     </el-pagination>
	   </div>
	</el-dialog>
	
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
					drugType:'中药'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					tag: '药品缴费',
					drugType:'检验'
				}],
				
			};
		},
		 methods: {
		      filterTag(value, row) {
		        return row.tag === value;
		      },
			  filterTag2(value, row) {
			    return row.drugType === value;
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
