<template><!-- 药品缴费 -->
	<el-row>
		<el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-col :span="5">
				<el-form-item  label="缴费单号：">
					<el-input size="mini" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="姓名：">
					<el-input size="mini" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="性别：">
					<el-input size="mini" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="年龄：">
					<el-input size="mini" disabled></el-input>
				</el-form-item>
			</el-col >
			<el-row :span="4">
				<el-form-item >
					<el-button size="mini" @click="centerDialogVisible = true" type="primary">选择收费</el-button>
				</el-form-item>
			</el-row>
		</el-form>
	</el-row>
	<el-row >
		<el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-col :span="5">
				<el-form-item  label="科室：">
					<el-input size="mini" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="诊断医生：">
					<el-input size="mini" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="电话：">
					<el-input size="mini" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="挂号费：">
					<el-input size="mini" disabled></el-input>
				</el-form-item>
			</el-col >
			<el-row :span="4">
				<el-form-item >
					<el-button size="mini"  type="primary" @click="dialogVisible = true">收费打印</el-button>
				</el-form-item>
			</el-row>
		</el-form>
	</el-row>
	
	<el-table show-summary height="450" row-key="date" :data="tableData" >
		<el-table-column fixed  label="药品名称"  width="100"></el-table-column>
		<el-table-column fixed  label="计量"  width="60"></el-table-column>
		<el-table-column fixed  label="单位"  width="60"></el-table-column>
		<el-table-column fixed  label="频次"  width="60"></el-table-column>
		<el-table-column fixed  label="用法"  width="60"></el-table-column>
		<el-table-column fixed  label="是否皮试"  width="100"></el-table-column>
		<el-table-column fixed  label="输液分组"  width="100"></el-table-column>
		<el-table-column fixed  label="单价"  width="60"></el-table-column>
		<el-table-column fixed  label="计数"  width="130"></el-table-column>
		<el-table-column fixed  label="总量"  width="100"></el-table-column>
    <el-table-column label="嘱托" fixed width="200">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p>嘱托详情: {{ scope.row.address }}</p>
          </template>
          <template #reference>
            <div  class="name-wrapper">
              <el-tag  size="mini">{{ scope.row.address }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>
		<el-table-column fixed  label="金额"  width="100"></el-table-column>


	 </el-table>

	<!-- 阴影层======================================== -->
	<el-dialog title="项目缴费" v-model="centerDialogVisible"  top="30px" width="80%"  destroy-on-close center>
	 <el-row>
		 <el-col >
			<el-input size="small" style="width: 250px;" placeholder="请输入病人身份证或者就诊卡卡号" ></el-input>
			<el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
     </el-col>
	 </el-row>
	 <el-table size="mini" height="450" row-key="date"  :data="tableData" style="width: 100%">
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
				],
				
			};
		},
		 methods: {
		      filterTag(value, row) {
		        return row.tag === value;
		      },
		},
		
	};
</script>

<style>
</style>
